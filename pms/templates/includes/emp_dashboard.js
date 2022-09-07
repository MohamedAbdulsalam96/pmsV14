$(document).ready(function() {
    var a;
    $.ajax({
        async: false,
        url: window.location.origin+"/api/method/pms.pms.doctype.bug_sheet.bug_sheet.get_tree_data", 
        success: function(r){
        a = r.message;
        }
    });
    console.log(a);
        var zTreeObj;
        function myOnClick(event, treeId, treeNode) {
            
                    $('[data-fieldname="project"]').val(null);
                    $('[data-fieldname="module"]').val(null);
                    $('[data-fieldname="screen"]').val(null);
                if(treeNode.type == 'project')
                    {
                         
                         frappe.set_route("List", cur_list.doctype, {
                                'project': treeNode.idname,
                                'module': null,
                                'screen': null
                         });   

                    }
                if(treeNode.type == 'module')
                    {    
                         
                         frappe.set_route("List", cur_list.doctype, {
                                'project': treeNode.getParentNode().idname,
                                'module': treeNode.idname,
                                'screen': null
                         });                          

                    }
                if(treeNode.type == 'screen')
                    {
                         
                         frappe.set_route("List", cur_list.doctype, {
                                'project': treeNode.getParentNode().getParentNode().idname,
                                'module': treeNode.getParentNode().idname,
                                'screen': treeNode.idname,
                         });                              

                    }
                else{
                    return null;
                }
        };
        var setting = {
            callback: {
                onClick: myOnClick
            }
        };

        function go(a) {
            var arr = [];

                for (var i=0; i<a.projects.length; i++) {
                  arr.push({'name': a.projects[i].Project_name, 'open': a.projects[i].open,
                            'children': construct_modules(a.projects[i].name, a),
                            'type': 'project', 'idname': a.projects[i].name
                            })
                }

            return arr    
        }

        function construct_modules(u,a){
            var arr1 = [];
            for (var i = 0; i < a.modules.length; i++) {
                if (a.modules[i].project == u) {
                    arr1.push({'name': a.modules[i].module_name, 'open': a.modules[i].open,
                            'children': construct_screens(a.modules[i].name, a),
                            'type': 'module', 'idname': a.modules[i].name
                            })
                }
            }
            return arr1
        }

        function construct_screens(u,a) {
            var arr2 = [];
            for (var i = 0; i < a.screens.length; i++) {
                if (a.screens[i].module == u) {
                    arr2.push({'name': a.screens[i].screen_name, 'open': a.screens[i].open,
                            'type': 'screen', 'idname': a.screens[i].name
                            })
                }
            }
            return arr2
        }

        function construct_bugs(u,a) {
            var arr3 = [];
            for (var i = 0; i < a.bugs.length; i++) {
                if (a.bugs[i].screen == u) {
                    arr3.push({'name': a.bugs[i].bug_title,
                             'type': 'bug', 'idname': a.bugs[i].name
                             })
                }
            }
            return arr3
        }


        var zNodes = go(a)

    $(".treediv").html('<ul id="treeDemo" class="ztree"></ul>');
    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);    

});