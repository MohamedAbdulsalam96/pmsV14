from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Requiment Gathering & Management"),
			"items": [
				{
					"type": "doctype",
					"name": "Project"
				},				
				{
					"type": "doctype",
					"name": "Module"
				},
				{
					"type": "doctype",
					"name": "Screen"
				},
				{
					"type": "doctype",
					"name": "Functionality"
				},
				{
					"type": "doctype",
					"name": "Website Workflow"
				}
			]
		},
		{
			"label": _("Bug & Error Tracking "),
			"items": [
				{
					"type": "doctype",
					"name": "Bug Sheet",
					"label": "Bug Sheet"
				},			
				{
					"type": "doctype",
					"name": "Test Case"
				},
		 		{
					"type": "page",
					"name": "employee-dashboard",
					"label": _("Dashboard"),
					"description": _("Dashboard")
				},
			]
		},
		{
			"label": _("Setup"),
			"items": [
				{
					"type": "doctype",
					"name": "Field Type"
				},			
				{
					"type": "doctype",
					"name": "Validation"
				},
				{
					"type": "doctype",
					"name": "Proposal"
				},
				{
					"type": "doctype",
					"name": "Proposal Template"
				},
				{
					"type": "doctype",
					"name": "Proposal Settings"
				}
			]
		},		
	] 