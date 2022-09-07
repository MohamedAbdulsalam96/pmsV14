frappe.pages['employee-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Dashboard',
        single_column: true
    });
    console.log(page)
    frappe.breadcrumbs.add("PMS");
    // $(frappe.render_template("dash", {content: frappe.session.user_fullname})).appendTo(page.body);
    $('.page-content').find('.layout-main').append(frappe.render_template("dash", {
                     content: frappe.session.user_fullname
                 })
    );   
}


frappe.pages['employee-dashboard'].refresh = function(wrapper) {

$('.main-sidebar a[href="#_menu22"]').tab('show');
$('.SCl').css({ 'width': "280px" });
$('.SCl').css({ 'left': "0px" });
$('.zm_apps').css({ 'display': "none" });
// $('.filter_list').css('height', $(window).height() - 100);
$('.filter_list').slimScroll({
height: ($(window).height() - 100)
});

$('#filterid').click(function() {
    $('.main-sidebar a[href="#_menu22"]').tab('show');
    $('.SCl').css({ 'width': "280px" });
    $('.SCl').css({ 'left': "0px" });
    $('.zm_apps').css({ 'display': "none" });
    // $('.filter_list').css('height', $(window).height() - 100);
    $('.filter_list').slimScroll({
    height: ($(window).height() - 100)
    });
})


	$(".filter_list").html('<ul id="treeDemo" class="ztree"></ul>');
    // $(frappe.render_template("dash", {content: frappe.session.user_fullname})).appendTo(page.main);
 //    $('.page-content').find('.layout-main').html('');
	// $('.page-content').find('.layout-main').html(frappe.render_template("dash", {
	// 					content: frappe.session.user_fullname
	// 				})
	// );

    var a;
    $.ajax({
        async: false,
        url: window.location.origin+"/api/method/pms.pms.doctype.bug_sheet.bug_sheet.get_tree_data", 
        success: function(r){
        a = r.message;
        }
    });
        var zTreeObj;
        function myOnClick(event, treeId, treeNode) {
            var ops = $(".maindiv ul.nav-tabs li.active").text().trim().split(' ')[0];
            var opslen = ops.length;
            
  			if (treeNode.type == "project") {
  				project_click(treeNode, ops, opslen)
  			}
  			if (treeNode.type == "module") {
  				module_click(treeNode, ops, opslen)
  			}  		
  			if (treeNode.type == "screen") {
  				screen_click(treeNode, ops, opslen)
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

    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);    
	

}
function project_click(treeNode) {
    return null;
    // frappe.call({
    //     method: "pms.pms.page.employee_dashboard.employee_dashboard.get_data_project",
    //     args:{
    //         type: treeNode.type,
    //         id: treeNode.idname,
    //     },
    //     callback: function(r) {
    //         console.log(r.message);
    //         $(".title-text").html(treeNode.name);
    //         $('.maindiv').html(frappe.render_template("project_dashboard_tab", {content: r.message}));
    //     }
    // });
}
function module_click(treeNode, ops, opslen) {
    frappe.call({
        method: "pms.pms.page.employee_dashboard.employee_dashboard.get_data_module",
        args:{
            project: treeNode.getParentNode().idname,
            type: treeNode.type,
            id: treeNode.idname,
        },
        callback: function(r) {
            // $("html").css("overflow-y", "hidden");
            console.log(r.message);
            $('.maindiv').html(frappe.render_template("module_detail_tab", {content: r.message, ops: ops, opslen: opslen}));
            // $(".title-text").append(treeNode.getParentNode().name+
            //     '<i class="fa fa-chevron-right mo" aria-hidden="true"></i>'+treeNode.name);

        }
    });
}
function screen_click(treeNode, ops, opslen) {
	frappe.call({
		method: "pms.pms.page.employee_dashboard.employee_dashboard.get_data_screen",
		args:{
			project: treeNode.getParentNode().getParentNode().idname,
			type: treeNode.type,
			id: treeNode.idname,
			module: treeNode.getParentNode().idname,
		},
		callback: function(r) {
			console.log(r.message);
            // $("html").css("overflow-y", "hidden");
            $('.maindiv').html(frappe.render_template("screen_detail_tab", {content: r.message, ops: ops, opslen: opslen}));
            // $(".title-text").append(treeNode.getParentNode().getParentNode().name+
            //     '<i class="fa fa-chevron-right mo" aria-hidden="true"></i>'+treeNode.getParentNode().name+
            //     '<i class="fa fa-chevron-right mo" aria-hidden="true"></i>'+treeNode.name);

		}
	});
}

