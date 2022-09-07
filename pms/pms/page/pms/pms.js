frappe.pages['pms'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Requirment',
		single_column: true
	});

	page.add_menu_item(__('Projects'), function() {
	});


	page.add_menu_item(__('Modules'), function() {
	});


	page.add_menu_item(__('Screens'), function() {
	});	

	page.wrapper.html(frappe.render_template('abc'));
	$(document).ready(function(){
		// alert("Works")
	});

}