# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "pms"
app_title = "PMS"
app_publisher = "Valiant Systems "
app_description = "App for managing projects "
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "vigneshwaran@valiantsystems.com"
app_license = "MIT"

# Includes in <head>
# ------------------
fixtures = ["Custom Field"]

# include js, css files in header of desk.html
# app_include_css = "/assets/pms/css/pms.css"
# app_include_js = "/assets/pms/js/pms.js"

# include js, css files in header of web template
# web_include_css = "/assets/pms/css/pms.css"
# web_include_js = "/assets/pms/js/pms.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "pms.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "pms.install.before_install"
# after_install = "pms.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "pms.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"Project": {
# 		"before_insert": "pms.pms.controller",
# 		"on_update": "method",
# 		# "on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
# 	"all": [
# 		"pms.tasks.all"
# 	],
    "cron": {
        # "0/10 * * * *": [
        #     "library_management.task.run_every_ten_mins"
        # ],
        "30 19 * * *": [
            "pms.pms.doctype.proposal.proposal.schedulemail"
        ]
    },
	"daily": [
		"pms.pms.controller.senddailytask"
	],
# 	"hourly": [
# 		"pms.tasks.hourly"
# 	],
# 	"weekly": [
# 		"pms.tasks.weekly"
# 	]
# 	"monthly": [
# 		"pms.tasks.monthly"
# 	]
}

# Testing
# -------

# before_tests = "pms.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "pms.event.get_events"
# }

