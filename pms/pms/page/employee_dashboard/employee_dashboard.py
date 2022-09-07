
from __future__ import unicode_literals
import frappe
import json
from frappe.model.document import Document
from frappe.share import add
from frappe import _, throw

options = ['Open', 'Working', 'Pending Review', 'Overdue', 'Closed', 'Cancelled']
bug_options = ['Fixed','Closed','Open','Re-open','Verified']
taskpriority = ['Low', 'Medium', 'High', 'Urgent']
bugpriority = ['High', 'Medium', 'Low']

@frappe.whitelist()
def get_data_screen(id, type, module, project):
	if type == "screen":
		data = frappe.db.get_list("Screen",
				filters={"name": id},
				fields=['screen_name', 'project', 'module', 'status', 'task', 'screen_description', 'development_task', 'testing_task'],
				limit_page_length=200)
		screenshots = frappe.db.get_list("File", 
						fields=['file_url'],
						filters={'attached_to_name': id},
						limit_page_length=200
						)
		functionality = frappe.db.get_list('Functionality',
						filters={'screen':id, 'module': module, 'project': project},
						fields=['subject','status','task','description','name'],
						limit_page_length=200
						)

		functionality_names = []

		for x in functionality:
			functionality_names.append(x.name)

		checkpoints = frappe.db.get_list('Functional Check Points',
						filters={"parent": ["in", functionality_names]},
						fields=['subject','status','task'],
						limit_page_length=200
						)
		
		functionality_task = []

		for x in functionality:
			functionality_task.append(x.task)

		checkpoints_tasks = []

		for y in checkpoints:
			checkpoints_tasks.append(y.task)

		tasks = []

		# if data[0].task:
		# 	tasks.append(data[0].task)
		# if data[0].development_task:
		# 	tasks.append(data[0].development_task)
		# if data[0].testing_task:
		# 	tasks.append(data[0].testing_task)

		if functionality_task:			
			for t in functionality_task:
				tasks.append(t)
		if checkpoints_tasks:
			for t in checkpoints_tasks:
				tasks.append(t)

		
		task_list = []

		for y in tasks:
			task_list.append({"name":y, "description":frappe.db.get_value("Task", y, "description"),
							"exp_start_date":frappe.db.get_value("Task", y, "exp_start_date"),
							"exp_end_date":frappe.db.get_value("Task", y, "exp_end_date"),
							 "priority":frappe.db.get_value("Task", y, "priority"),
							 "subject":frappe.db.get_value("Task", y, "subject"), "status":frappe.db.get_value("Task", y, "status"),
							  "created_date":frappe.db.get_value("Task", y, "creation").date()})

		bugs = frappe.db.get_list('Bug Sheet',
						filters={"project": project, "module": module, "screen": id},
						fields=['bug_title','name','category', 'priority', 'status', 'bug_description', 'creation'],
						limit_page_length=200
						)
		
	return {"data":data[0], "screenshots":screenshots, "options": options, "bug_options": bug_options, "bugpriority": bugpriority,
			"functionality": functionality,"task_list": task_list, "bugs": bugs, "taskpriority": taskpriority}

@frappe.whitelist()
def get_data_module(id, type, project):
	if type == "module":
		data = frappe.db.get_list("Module",
				filters={"name": id},
				fields=['module_name', 'project', 'status', 'task', 'module_description', 'name'],
				limit_page_length=200)

		screenshots = frappe.db.get_list("File", 
						fields=['file_url'],
						filters={'attached_to_name': id},
						limit_page_length=200
						)

		functionality = frappe.db.get_list('Functionality',
						filters={'module': id, 'project': project},
						fields=['subject','status','task','description','name'],
						limit_page_length=200
						)

		screens = frappe.db.get_list("Screen",
				filters={"project": project, "module": id},
				fields=['name', 'screen_name', 'project', 'module', 'status', 'task', 'screen_description', 'development_task', 'testing_task'],
				limit_page_length=200)
	

		functionality_names = []

		for x in functionality:
			functionality_names.append(x.name)

		checkpoints = frappe.db.get_list('Functional Check Points',
						filters={"parent": ["in", functionality_names]},
						fields=['subject','status','task'],
						limit_page_length=200
						)
		
		functionality_task = []

		for x in functionality:
			functionality_task.append(x.task)

		checkpoints_tasks = []

		for y in checkpoints:
			checkpoints_tasks.append(y.task)

		tasks = []
		# if screens:
		# 	for t in screens:
		# 		tasks.append(t.task)
		# 		tasks.append(t.development_task)
		# 		tasks.append(t.testing_task)
				
		# tasks.append(data[0].task)

		if functionality_task:			
			for t in functionality_task:
				tasks.append(t)
		if checkpoints_tasks:
			for t in checkpoints_tasks:
				tasks.append(t)

		
		task_list = []
		
		project_name = frappe.db.get_value("Project", data[0].project, "project_name")
		
		module_name = frappe.db.get_value("Module", data[0].name, "module_name")
		
		for y in tasks:
			task_list.append({"name":y, "description":frappe.db.get_value("Task", y, "description"),
							"exp_start_date":frappe.db.get_value("Task", y, "exp_start_date"),
							"exp_end_date":frappe.db.get_value("Task", y, "exp_end_date"),
							 "priority":frappe.db.get_value("Task", y, "priority"),
							 "subject":frappe.db.get_value("Task", y, "subject"), "status":frappe.db.get_value("Task", y, "status"),
							  "created_date":frappe.db.get_value("Task", y, "creation").date()})

		bugs = frappe.db.get_list('Bug Sheet',
						filters={"project": project, "module": id},
						fields=['bug_title','name','category', 'priority', 'status', 'bug_description', 'creation'],
						limit_page_length=200
						)
		
	return {"project": project, "module": id, "project_name": project_name, "module_name": module_name,
			"data":data[0], "screenshots":screenshots, "options": options, "bug_options": bug_options,
			"functionality": functionality,"task_list": task_list, "bugs": bugs, "screens": screens, "taskpriority": taskpriority, "bugpriority": bugpriority,}

@frappe.whitelist()
def get_data_project(id, type):
	if type == "project":
		data = frappe.db.get_list("Project",
				filters={"name": id},
				fields=['status', 'project_name', 'priority'],
				limit_page_length=200)
		
		screenshots = frappe.db.get_list("File", 
						fields=['file_url'],
						filters={'attached_to_name': id},
						limit_page_length=200
						)

		modules = frappe.db.get_list("Module",
				filters={"project": id},
				fields=['module_name', 'project', 'status', 'task', 'module_description'],
				limit_page_length=200)

		screens = frappe.db.get_list("Screen",
				filters={"project": id},
				fields=['screen_name', 'project', 'module', 'status', 'task', 'screen_description', 'development_task', 'testing_task'],
				limit_page_length=200)
	
		functionality = frappe.db.get_list('Functionality',
						filters={'project': id},
						fields=['subject','status','task','description','name'],
						limit_page_length=200
						)
		
		functionality_names = []

		for x in functionality:
			functionality_names.append(x.name)

		checkpoints = frappe.db.get_list('Functional Check Points',
						filters={"parent": ["in", functionality_names]},
						fields=['subject','status','task'],
						limit_page_length=200
						)
		
		functionality_task = []

		for x in functionality:
			functionality_task.append(x.task)

		checkpoints_tasks = []

		for y in checkpoints:
			checkpoints_tasks.append(y.task)

		tasks = []

		if modules:
			for t in modules:
				tasks.append(t.task)

		if screens:
			for t in screens:
				tasks.append(t.task)
				tasks.append(t.development_task)
				tasks.append(t.testing_task)		

		if functionality_task:			
			for t in functionality_task:
				tasks.append(t)
		if checkpoints_tasks:
			for t in checkpoints_tasks:
				tasks.append(t)

		task_list = []

		for y in tasks:
			task_list.append({"name":y, "description":frappe.db.get_value("Task", y, "description"),
							"exp_start_date":frappe.db.get_value("Task", y, "exp_start_date"),
							"exp_end_date":frappe.db.get_value("Task", y, "exp_end_date"),
							 "priority":frappe.db.get_value("Task", y, "priority"),
							 "subject":frappe.db.get_value("Task", y, "subject"), "status":frappe.db.get_value("Task", y, "status"),
							  "created_date":frappe.db.get_value("Task", y, "creation").date()})

		bugs = frappe.db.get_list('Bug Sheet',
						filters={"project": id},
						fields=['bug_title','name','category', 'priority', 'status', 'bug_description', 'creation'],
						limit_page_length=200
						)
		
	return {"data":data[0], "screenshots":screenshots, "task_list": task_list,"bug_options": bug_options,
			"bugs": bugs, "modules":modules, "screens":screens, "options": options, "bugpriority": bugpriority,}




