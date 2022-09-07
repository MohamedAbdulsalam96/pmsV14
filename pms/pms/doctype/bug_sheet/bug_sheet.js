// Copyright (c) 2017, Valiant Systems  and contributors
// For license information, please see license.txt
// function yu() {
//     var a;

//     frappe.call({
//         method: 'pms.pms.doctype.bug_sheet.bug_sheet.get_tree_data',
//         async: false,
//         callback: function(r) {
//             a = r.message;
//         }
//     })

//     function go_go(a) {
//         var arr = [];

//         var l = a.projects.length + 1;
//         var m = a.modules.length + a.projects.length;
//         for (var i = 0; i < a.projects.length; i++) {
//             var ab = i + 1;
//             arr.push({ id: ab, pId: 0, name: a.projects[i].Project_name, open: a.projects[i].open, type: a.projects[i].type, docname: a.projects[i].name })


//             for (var j = 0; j < a.modules.length; j++) {

//                 if (a.modules[j].project == a.projects[i].name) {

//                     arr.push({ id: l, pId: ab, name: a.modules[j].module_name, open: a.modules[j].open, type: a.modules[j].type, docname: a.modules[j].name })

//                     for (var k = 0; k < a.screens.length; k++) {

//                         if (a.screens[k].module == a.modules[j].name) {
//                             arr.push({ id: m, pId: l, name: a.screens[k].screen_name, open: a.screens[k].open, type: a.screens[k].type, docname: a.screens[k].name })
//                             m = m + 1;
//                         }

//                     }
//                     l = l + 1;

//                 }

//             }

//         }

//         return arr
//     }

//     var setting = {
//         view: {
//             dblClickExpand: false
//         },
//         data: {
//             simpleData: {
//                 enable: true
//             }
//         },
//         callback: {
//             beforeClick: beforeClick,
//             onClick: onClick
//         }
//     };
//     var zNodes = go_go(a);


//     function beforeClick(treeId, treeNode) {
//         // var check = (treeNode && !treeNode.isParent);
//         // if (!check) alert("Do not select province...");
//         // return check;
//     }

//     function onClick(e, treeId, treeNode) {

//         var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
//             nodes = zTree.getSelectedNodes(),
//             v = "";
//         console.log(nodes)


//         if (nodes.length > 1) {
//             var pro = [];
//             var mod = [];
//             var scr = [];
//             for (var j = 0; j < nodes.length; j++) {
//                 if (nodes[i].type == 'projects') {
//                     pro.push(treeNode.docname)
//                 }
//                 if (nodes[i].type == 'modules') {
//                     mod.push(treeNode.docname)
//                 }
//                 if (nodes[i].type == 'screens') {
//                     scr.push(treeNode.docname)
//                 }
//             }
//             console.log(pro)
//         } else if (nodes.length <= 1) {
//             var tu = '';
//             if (treeNode.type == 'projects') {
//                 tu = { "project": treeNode.docname }
//             }
//             if (treeNode.type == 'modules') {
//                 tu = {
//                     "project": treeNode.getParentNode().docname,
//                     "module": treeNode.docname
//                 }
//             }
//             if (treeNode.type == 'screens') {
//                 tu = {
//                     "project": treeNode.getParentNode().getParentNode().docname,
//                     "module": treeNode.getParentNode().docname,
//                     "screen": treeNode.docname
//                 }
//             }
//         }


//         nodes.sort(function compare(a, b) { return a.id - b.id; });
//         for (var i = 0, l = nodes.length; i < l; i++) {
//             v += nodes[i].name + ",";
//         }
//         if (v.length > 0) v = v.substring(0, v.length - 1);
//         var cityObj = $("#citySel");
//         if (treeNode.type == 'projects') {
//             v = 'Project: ' + v
//         }
//         if (treeNode.type == 'modules') {
//             v = 'Module: ' + v
//         }
//         if (treeNode.type == 'screens') {
//             v = 'Screen: ' + v
//         }
//         cityObj.attr("value", v);



//         frappe.call({
//             method: 'frappe.client.get_list',
//             args: {
//                 doctype: 'Bug Sheet',
//                 fields: ['name', 'bug_title'],
//                 filters: tu
//             },
//             callback: function(r) {
//                 console.log(r.message)
//                 var pop = '';
//                 if (r.message) {
//                     for (var i = 0; i < r.message.length; i++) {

//                         $('#menuContent').hide();
//                         $('#listContent').show();
//                         pop = pop + '<div href="#Form/Bug%20Sheet/' + r.message[i].name + '" \
//                                         data-link="Form/Bug%20Sheet/' + r.message[i].name + '" \
//                                         onclick="detailfield(this)" \
//                                         style="padding:12px; border-bottom: 1px solid #e6e2e2;" \
//                                         class="sel">\
//                                         <h2 style="font-size: 12px; font-weight: 500; margin: 0;  color: #333;">\
//                                         <strong>' + r.message[i].bug_title + '</strong>\
//                                         </h2> </div>'

//                     }
//                 }
//                 $('#listContent').html(pop);
//             }
//         })
//     }

//     function showMenutree() {
//         var cityObj = $("#citySel");
//         var cityOffset = $("#citySel").offset();
//         $("#menuContent").css({ left: 0 + "px", top: 25 + "px" }).slideDown("fast");

//         $("body").bind("mousedown", onBodyDown);
//     }

//     function hideMenu() {
//         $("#menuContent").fadeOut("fast");
//         $("body").unbind("mousedown", onBodyDown);
//     }

//     function onBodyDown(event) {
//         if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
//             hideMenu();
//         }
//     }

//     $('.filter_list').html('<input id="citySel" type="text" placeholder="Filters" readonly value="" style="width: 100%;margin-left: 0;border: 1px solid transparent;padding: 5px 10px;margin-top: 0px;border-right: 1px solid rgb(221, 221, 221);border-bottom: 1px solid rgb(221, 221, 221);border-left: 1px solid rgb(221, 221, 221);"/>');
//     $('.filter_list').append('<div id="menuContent" class="menuContent" style="display:none; position: absolute;"> <ul id="treeDemo" class="ztree" style="margin-top:0; width:100%;"></ul> </div>');
//     $('.filter_list').append('<div id="listContent" style="display:block; position: absolute; width: 100%;"></div>');
//     $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//     $('#citySel').click(function() {
//         $('#listContent').hide();
//         showMenutree();
//     });


// }
frappe.ui.form.on('Bug Sheet', {
    onload: function(frm) {
        cur_frm.set_query("module", function() {
          return {
              "filters": {
                  "project": frm.doc.project
              }
          };
        });

        cur_frm.set_query("screen", function() {
          return {
              "filters": {
                  "project": frm.doc.project,
                  "module": frm.doc.module
              }
          };
        });
        yu()
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Bug Sheet',
                fields: ['name', 'bug_title']
            },
            callback: function(r) {
                var pop = '';
                if (r.message) {
                    for (var i = 0; i < r.message.length; i++) {

                        $('#menuContent').hide();
                        $('#listContent').show();
                        pop = pop + '<div href="#Form/Bug%20Sheet/' + r.message[i].name + '" \
                                        data-link="Form/Bug%20Sheet/' + r.message[i].name + '" \
                                        onclick="detailfield(this)" \
                                        style="padding:12px; border-bottom: 1px solid #e6e2e2;" \
                                        class="sel">\
                                        <h2 style="font-size: 12px; font-weight: 500; margin: 0;  color: #333;">\
                                        <strong>' + r.message[i].bug_title + '</strong>\
                                        </h2> </div>'

                    }
                }
                $('#listContent').html(pop);
            }
        })
    },
    refresh: function(frm) {
        yu()
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Bug Sheet',
                fields: ['name', 'bug_title']
            },
            callback: function(r) {
                var pop = '';
                if (r.message) {
                    for (var i = 0; i < r.message.length; i++) {

                        $('#menuContent').hide();
                        $('#listContent').show();
                        pop = pop + '<div href="#Form/Bug%20Sheet/' + r.message[i].name + '" \
                                        data-link="Form/Bug%20Sheet/' + r.message[i].name + '" \
                                        onclick="detailfield(this)" \
                                        style="padding:12px; border-bottom: 1px solid #e6e2e2;" \
                                        class="sel">\
                                        <h2 style="font-size: 12px; font-weight: 500; margin: 0;  color: #333;">\
                                        <strong>' + r.message[i].bug_title + '</strong>\
                                        </h2> </div>'

                    }
                }
                $('#listContent').html(pop);
            }
        })
    }
});



frappe.ui.form.on("Bug Sheet", "validate", function(frm) {
    var data = frappe.datetime.now_date();
    if (frm.doc.status == "Fixed") {
        cur_frm.set_value("fixed_on", data);
    } else if (frm.doc.status == "Verified") {
        cur_frm.set_value("verified_on", data);
    }
});


frappe.ui.form.on("Bug Sheet", "assign", function(frm) {
    var arr = frm.doc.table_11;
    for (var i = 0; i < arr.length; i++) {
        $.ajax({
            url: window.location.origin + "/api/resource/DocShare",
            dataType: 'text',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "user": arr[i].assign_to,
                "share_doctype": frm.doc.doctype,
                "share_name": frm.doc.name,
                "read": 1,
                "write": 1,
                "share": 1
            }),
            beforeSend: function(xhr) {
                xhr.setRequestHeader(
                    'X-Frappe-CSRF-Token', frappe.csrf_token
                );
            },
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});