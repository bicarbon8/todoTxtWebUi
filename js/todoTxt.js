/**********************************************************************
 * This javascript was created according to the specifications at
 * http://todotxt.com/ and is intended to allow users to access their
 * todo.txt files in a user-friendly and easy to visualize manner.
 *
 * Once initially uploaded, the todo.txt file will
 * be loaded into an HTML5 localStorage and managed from there.
 * The web page then allows downloading changes back to the user
 * in a txt format compliant with the todo.txt specifications, but
 * having re-sorted the tasks.
 * 
 * @Created: 08/14/2012
 * @Author: Jason Holt Smith (bicarbon8@gmail.com)
 * @Version: 0.0.1
 * Copyright (c) 2012 Jason Holt Smith. todoTxtWebUi is distributed under
 * the terms of the GNU General Public License.
 * 
 * This file is part of todoTxtWebUi.
 * 
 * todoTxtWebUi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * todoTxtWebUi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with todoTxtWebUi.  If not, see <http://www.gnu.org/licenses/>.
 **********************************************************************/
 
/*####--------------------BEGIN POJO'S--------------------####*/
/**
 * this function represents a Task Object similar to a POJO 
 * (Plain Old Java Object) used as a container for metadata 
 * about some type of object.  In this case that object is a
 * task.
 * @param pri an alphabetical String value [A-Z] representing the
 * priority of this task
 * @param created a String date value in the format YYYY-MM-DD
 * Ex: 2012-08-10
 * @param completed a String date value in the format YYYY-MM-DD
 * Ex: 2012-06-30
 * @param project an Array of Project values as referenced in the original task
 * @param ctx an Array of Context values as referenced in the original task
 * @param task the original task as listed in the todo.txt file
 */
function Task(pri, created, completed, proj, ctx, isActive, task) {
	this.id = createUUID();
	this.priority = pri;
	this.createdDate = created;
	this.completedDate = completed;
	this.projects = proj;
	this.contexts = ctx;
	this.isActive = isActive;
	this.taskString = task;
}

/**
 * this function represents a Filters tracking object used to
 * limit the list of Tasks displayed at any one time.
 */
function Filters() {
	this.priorityHashSet = {};
	this.projectHashSet = {};
	this.contextHashSet = {};
}
/*####---------------------END POJO'S---------------------####*/

/*####--------------------BEGIN GLOBALS--------------------####*/
var isDirty = false;		// used to signify that something has been modified
var filters = new Filters();
/*####---------------------END GLOBALS---------------------####*/

/**
 * this will load any items that need to be configured at page
 * load time such as event handlers, etc.
 */
$(document).ready(function() {
	// enable hiding and showing of the controls section
	$("#controlGridContainerToggle-div").click(function() {
		// update the button text
		if ($("#controlGridContainer-li").is(":visible") == true) { 
			$("#controlGridContainerToggle-div").text("Open Controls");
		} else {
			$("#controlGridContainerToggle-div").text("Close Controls");
		}
		
		// toggle display state with animation
		$("#controlGridContainer-li").toggle('blind');
		
		return false;
	});
	
	// enable canceling task edit by clicking outside the modalEdit-div
	$("#modalBorder-div").click(function() {
		// disable click handling
		unbindModalEvents();
		
		// and hide
		$("#modalBorder-div").toggle();
	}).children().click(function(e) {
		// ignore clicks in child elements
		return false;
	});
	
	// check for pre-existing tasks in localStorage on startup
	processTasksFromLocalStorage();
	
	// display any filters
	refreshFilters();
	
	// enable keyboard shortcuts and click events for the controls area
	bindControlEvents();
});

/**
 * function will attempt to get all localStorage tasks and display them
 * in the DOM if any exist.  This will add to any existing tasks so you
 * will need to clear the DOM first if you want to update the entire list
 * instead of just appending to the list.
 */
function processTasksFromLocalStorage() {
	var taskArray = getSortedTaskArrayFromLocalStorage();
	
	// process each item by id
	for (var i=0; i<taskArray.length; i++) {
		var id = taskArray[i].id;
		
		// verify this matches the currently selected (if any) priority filter
		var pri = taskArray[i].priority;
		var validPri = filterPriority(pri);
		
		// verify this matches the currently selected (if any) project filter
		var projArray = taskArray[i].projects;
		var validProj = filterProject(projArray);
		
		// verify this matches the currently selected (if any) context filter
		var ctxArray = taskArray[i].contexts;
		var validContext = filterContext(ctxArray);
		
		// TODO: check for filtering out of closed tasks
		
		// if this task doesn't already exist in the DOM
		if ($("#" + id).text() == "" && (validPri && validProj && validContext)) {
			// add it to the DOM
			addTaskToDom(taskArray[i]);
		}
	}
}

/**
 * function will check the passed in priority and see if it
 * matches the currently selected priorities.  If none are
 * selected (match all) then "true" will be returned.
 *
 * @return boolean of true if the priority matches the selected
 * priorities or no priority filters are selected, otherwise false.
 */
function filterPriority(pri) {
	// get the list of selected priorities from the filter
	var selectedOptions = $("#priority-select option:selected");
	var selectedValues = $.map(selectedOptions, function(option) {
		return option.value;
	});
	
	// nothing selected to filter by so don't filter
	if (selectedValues.length == 0) {
		return true;
	}
	
	// otherwise check for match
	for (var i=0; i<selectedValues.length; i++) {
		if (selectedValues[i] == pri) {
			return true;
		}
	}
	
	// no match found if we reach this point
	return false;
}

/**
 * function will check the passed in project Array and see if it
 * matches the currently selected projects.  If none are selected
 * (match all) then "true" will be returned.
 *
 * @return boolean of true if the project Array contains a match
 * with the selected projects or no projects are selected, otherwise
 * false
 */
function filterProject(projArray) {
	// get the list of selected projects from the filter
	var selectedOptions = $("#project-select option:selected");
	var selectedValues = $.map(selectedOptions, function(option) {
		return option.value;
	});
	
	// nothing selected to filter by so don't filter
	if (selectedValues.length == 0) {
		return true;
	}
	
	// otherwise check for match
	for (var i=0; i<selectedValues.length; i++) {
		for (var j=0; j<projArray.length; j++) {
			if (selectedValues[i] == $.trim(projArray[j])) {
				return true;
			}
		}
	}
	
	// no match found if we reach this point
	return false;
}

/**
 * function will check the passed in context Array and see if it
 * matches the currently selected contexts.  If none are selected
 * (match all) then "true" will be returned.
 *
 * @return boolean of true if the context Array contains a match
 * with the selected contexts or no contexts are selected, otherwise
 * false
 */
function filterContext(ctxArray) {
	// get the list of selected contexts from the filter
	var selectedOptions = $("#context-select option:selected");
	var selectedValues = $.map(selectedOptions, function(option) {
		return option.value;
	});
	
	// nothing selected to filter by so don't filter
	if (selectedValues.length == 0) {
		return true;
	}
	
	// otherwise check for match
	for (var i=0; i<selectedValues.length; i++) {
		for (var j=0; j<ctxArray.length; j++) {
			if (selectedValues[i] == $.trim(ctxArray[j])) {
				return true;
			}
		}
	}
	
	// no match found if we reach this point
	return false;
}

/**
 * function will return a sorted array of tasks as pulled from
 * localStorage.
 */
function getSortedTaskArrayFromLocalStorage() {
	// sort the list and then add it
	var taskArray = new Array();
	var index = 0;
	for (var key in localStorage) {
		taskArray[index++] = JSON.parse(localStorage.getItem(key));
	}
	taskArray.sort(compareTasks);
	
	return taskArray;
}

function handleFileSelect(e) {
	e.stopPropagation();
	e.preventDefault();

	var files = e.originalEvent.target.files || e.originalEvent.dataTransfer.files; // FileList object.

	// files is a FileList of File objects.
	if (files.length > 0) {
		var f = files[0];
		
		// process using a FileReader
		var reader = new FileReader();

		// get the content as a String
		reader.onloadend = function (e) {
			processTodoTxtFile(e.target.result);
		};
		reader.readAsText(f, "UTF-8");
	}
}

function handleDragOver(e) {
	e.stopPropagation();
	e.preventDefault();
	e.originalEvent.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}

/**
 * function will open and process the user's todo.txt file
 * based on what is referenced in the filename input.  This 
 * action will wipe out the existing tasks listed on the page
 * and replace them with a new list from the referenced todo.txt
 * file.
 */
function processTodoTxtFile(fileLines) {
	// confirm that the user really wants to wipe out the existing tasks and reload from disk
	if (confirm("Loading from a todo.txt file will overwrite any existing list displayed.  Are you sure you wish to proceed?")) {
		// clear the localStorage
		localStorage.clear();
		
		// clear the DOM
		refreshUi();
		
		// get the path and send to getTodoTxtFile function
		parseTodoTxtFile(fileLines);
	}
}

/**
 * function will retrieve the todo.txt file from the passed in
 * fileName.
 * 
 * @param fileName the String name of the todo.txt file to be opened
 * file.
 * EX: "todo.txt" 
 */
function getTodoTxtFile(fileName) {
	// load via AJAX call to local file system
	$.ajax({
		url: fileName,
		cache: false,
		//crossDomain: true,
		error: function(jqXHR, textStatus) {
			// TODO: display a proper error message
			alert(textStatus);
		},
		success: function(data) {
			// pass the response on to the next call
			parseTodoTxtFile(data);
		}
	});
}

/**
 * function will process each line of the todo.txt, sort by priority,
 * creationDate, and state (active or closed).  Processing of each
 * line and adding to DOM is handled in a separate function.
 *
 * @param todoTxt the AJAX response containing the contents of the
 * referenced todo.txt file
 */
function parseTodoTxtFile(todoTxt) {
	var lines = todoTxt.split("\n");
	$.each(lines, function(n, elem) {
		// ignore empty lines
		if (elem != null && elem != "") {
			// parse the individual line and return a Task
			var task = createTaskObjFromTextLine(elem);
			
			// add this taskObj to our global list in it's proper location
			addTaskToLocalStorage(task);
		}
	});
	
	// add task to DOM from localStorage
	processTasksFromLocalStorage();
	
	// display any filters
	refreshFilters();
}

/**
 * function will create a new taskObj populated with all it's data.
 * The format expected is as follows:
 * [closed("x")] [priority("(A)-(Z)")] [completed-date("YYYY-MM-DD")] [created-date("YYYY-MM-DD")] task text string
 * where a closed date should only exist if the task is closed
 * (otherwise the closed date will be parsed in as the created date)
 * 
 * @param textLine a single line from the todo.txt file to be parsed
 * into a Task Object
 */
function createTaskObjFromTextLine(textLine) {
	// get the priority of the task EX: (A)
	var pri = parsePriorityFromString(textLine);
	
	// get the completed date of the task EX: 2012-09-23
	var completed = parseCompletedDateFromString(textLine);
	
	// get the created date of the task EX: 2012-09-23
	var created = parseCreatedDateFromString(textLine);
	
	// parse out any Projects (items starting with "+" like "+ProjectName")
	var proj = parseProjectsFromString(textLine);
	
	// parse out any Context (items starting with "@" like "@ContextName")
	var ctx = parseContextsFromString(textLine);
	
	// parse out the Active / Closed state (starts with "x " for closed)
	var isActive = true;
	if (textLine.match(/^(x\s)/)) {
		isActive = false;
	}
	
	// create the Task Object
	var task = new Task(pri, created, completed, proj, ctx, isActive, textLine);
	
	// return Task Object to caller
	return task;
}

function parsePriorityFromString(str) {
	// parse out the priority RegEx: /\^([A-Z]\).*/ 
	var pri = null; // used to hold the priority if set
	
	// check for strings starting with something like "(A)"
	var priFoundPattern = /^\([A-Z]\)\s.*/;
	var match = str.match(priFoundPattern); // returns null if not found
	if (match != null && match.length > 0) {
		// found an active match so get the priority
		var priMatcher = /\([A-Z]\)/;
		pri = str.match(priMatcher);
	}
	
	return pri;
}

function parseCompletedDateFromString(str) {
	// parse out the completedDate (if closed)
	var completed = null;
	
	// check for strings starting with something like "x (A) 2012-08-09 2012-08-01"
	var completedFoundPattern = /(x\s)(\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2}\s){1,2}.*/;
	match = str.match(completedFoundPattern); // returns null if not found
	if (match != null && match.length > 0) {
		// found a closed task with a completed date so parse
		var completedMatcher = /(\d{4}-\d{2}-\d{2}\s)/; // gets the first date in the string
		completed = str.match(completedMatcher);
	}
	
	return completed;
}

function parseCreatedDateFromString(str) {
	// parse out the createdDate
	var created = null;
	
	// check for strings starting with something like "(A) 2012-08-01"
	var createdFoundPattern = /^(\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2}\s){1}.*/;
	match = str.match(createdFoundPattern); // returns null if not found
	if (match != null && match.length > 0) {
		// found a closed task with a completed date so parse
		var createdMatcher = /(\d{4}-\d{2}-\d{2}\s)/; // gets the first date in the string
		created = str.match(createdMatcher);
	}
	
	return created;
}

function parseProjectsFromString(str) {
	// parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
	var projArray = new Array(); // used to hold the project if set
	
	// check for strings like "+ABC123"
	var projFoundPattern = /\+[0-9A-Za-z]+\s/;
	var match = str.match(projFoundPattern); // returns null if not found
	if (match != null && match.length > 0) {
		// found an active match so get the projects as an array of projects
		var projMatcher = /\+[0-9A-Za-z]+\s/g;
		projArray = str.match(projMatcher);
	}
	
	return projArray;
}

function parseContextsFromString(str) {
	// parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "+")
	var ctxArray = new Array(); // used to hold the context if set
	
	// check for strings like "+ABC123"
	var ctxFoundPattern = /\@[0-9A-Za-z]+\s/;
	var match = str.match(ctxFoundPattern); // returns null if not found
	if (match != null && match.length > 0) {
		// found an active match so get the contexts as an array of contexts
		var ctxMatcher = /\@[0-9A-Za-z]+\s/g;
		ctxArray = str.match(ctxMatcher);
	}
	
	return ctxArray;
}

/**
 * function adds this task to the browser's local cache allowing for
 * retained data on subsequent reloads of the page
 */
function addTaskToLocalStorage(task) {
	localStorage.setItem(task.id, JSON.stringify(task));
}

/**
 * function will add the passed in task to the listContainer-ul setting
 * the appropriate 
 */
function addTaskToDom(task) {
	$("#listContainer-ul").append("<li id=\"" + task.id + "\"  class=\"" + getDisplayClassForTask(task) + "\" onclick=\"editTask('" + task.id + "');\">" + task.taskString + "</li>");
}

/**
 * function returns the appropriate display classes for this task
 */
function getDisplayClassForTask(task) {
	// get a list of the current tasks and iterate through
	var cls = "";
	if (task.priority != null && !task.taskString.match(/^(x\s)/)) {
		if (task.priority == "(A)") {
			cls += " a";
		}
		if (task.priority == "(B)") {
			cls += " b";
		}
		if (task.priority == "(C)") {
			cls += " c";
		}
	}
	if (!task.isActive) {
		cls += " closed";
	}
	
	return cls;
}

/**
 * function opens the selected task in an editing window
 */
function editTask(taskId) {
	// populate the modal textarea with this task string
	$("#modalEdit-textarea").val($("#" + taskId).text());
	
	// enable click and keyboard shortcut handling
	bindModalEvents(taskId);
	
	// TODO: add additional details of the task to the div for display
	
	// display the modal
	$("#modalBorder-div").toggle();
	
	// place focus on the textarea
	$("#modalEdit-textarea").focus();
}

/**
 * function updates the task and saves it to the local storage cache
 */
function updateTask(taskId) {
	// unbind the previous click handlers
	unbindModalEvents();
	
	// signify that something has been modified
	isDirty = true;
	
	// re-parse task
	var task = createTaskObjFromTextLine($("#modalEdit-textarea").val());
	task.id = taskId;
	
	// update local cache with new task details
	addTaskToLocalStorage(task);
	
	// update the DOM with the new task details and filter changes
	refreshUi();
	refreshFilters();
	
	// hide the modal
	$("#modalBorder-div").toggle();
}

/**
 * function will remove an existing task following confirmation from user
 */
function deleteTask(taskId) {
	// first confirm that the user really intended to delete this task
	if (confirm("Are you sure you want to delete task: \"" + localStorage.getItem(taskId) + "\"?")) {
		// unbind the previous click handlers
		unbindModalEvents();
		
		// delete the task from localStorage
		localStorage.removeItem(taskId);
		
		// delete the task from the DOM
		$("#" + taskId).remove();
		
		// update the Filters
		refreshFilters();
		
		// hide the modal
		$("#modalBorder-div").toggle();
	}
}

/**
 * function will allow the user to download a copy of the todo.txt file
 */
function downloadTodoTxtFile() {
	var taskArray = getSortedTaskArrayFromLocalStorage();
	
	// create the output string to be written
	var content = "";
	for (var i=0; i<taskArray.length; i++) {
		content += taskArray[i].taskString + "\n";
	}
	
	var data = "data:text;charset=utf-8," +
	encodeURI(content);
	
	window.location.href = data;
}

function bindControlEvents() {
	// enable processing of todo.txt file
	$("#getFileButton-div").click(function() {
		processTodoTxtFile();
	});
	
	// enable saving of todo.txt file
	$("#saveFileButton-div").click(function() {
		downloadTodoTxtFile();
	});
	// enable saving the todo.txt content through keyboard shortcut
	$(document).bind("keydown", function(e) {
		if (e.keyCode == 83 && e.altKey) { // Alt + s
			downloadTodoTxtFile();
		}
	});
	
	// enable adding new tasks to DOM
	$("#addTaskButton-div").click(function() {
		editTask(createUUID());
	});
	
	// enable priority filter handling by clicking in the priority multiselect
	$("#priority-select").mouseup(function(e) {
		refreshUi();
	});
	
	// enable project filter handling by clicking in the project multiselect
	$("#project-select").mouseup(function(e) {
		refreshUi();
	});
	
	// enable context filter handling by clicking in the context multiselect
	$("#context-select").mouseup(function(e) {
		refreshUi();
	});
	
	// enable adding new tasks through keyboard shortcut
	$(document).bind("keydown", function(e) {
		if (e.keyCode == 84 && e.altKey) { // Alt + t
			editTask(createUUID());
		}
	});
	
	// enable drag-and-drop handling of file uploads
	$("#fileDrop-div").bind("dragover", function(e) {
		handleDragOver(e);
	});
	$("#fileDrop-div").bind("drop", function(e) {
		handleFileSelect(e);
	});
	$("#fileUpload-input").bind("change", function(e) {
		handleFileSelect(e);
	});
}

function unbindControlEvents() {
	// disable adding new tasks through keyboard shortcut
	$(document).unbind("keydown");
}

function bindModalEvents(taskId) {
	// enable processing of changes for this task
	$("#updateTaskButton-div").bind("click", function() {
		updateTask(taskId);
	});
	$("#modalEdit-textarea").bind("keydown", function(e) {
		if (e.keyCode == 13 && e.altKey) { // Alt + Enter
			updateTask(taskId);
		}
	});
	// enable deletion of this task
	$("#deleteTaskButton-div").bind("click", function() {
		deleteTask(taskId);
	});
	$(document).bind("keyup", function(e) {
		if (e.keyCode == 46 && e.altKey) { // Alt + Delete
			deleteTask(taskId);
		}
	});
}

function unbindModalEvents() {
	$("#updateTaskButton-div").unbind("click");
	$("#modalEdit-textarea").unbind("keydown");
	$("#deleteTaskButton-div").unbind("click");
	$(document).unbind("keyup");
}

/**
 * function will reload the list of tasks from localStorage to ensure it
 * is sorted and displaying properly
 */
function refreshUi() {
	// clear the list
	$("#listContainer-ul").empty();
	
	// now rebuild from localStorage
	processTasksFromLocalStorage();
}

function refreshFilters() {
	// parse the list of tasks
	var tasks = getSortedTaskArrayFromLocalStorage();
	for (var i=0; i<tasks.length; i++) {
		// get the priority and add to global filter hashset
		var priority = tasks[i].priority;
		if (priority != null && priority != undefined) {
			filters.priorityHashSet[$.trim(priority)] = true;
		}
		
		// get each project and add to the global filter hashset
		var projects = tasks[i].projects;
		if (projects != null && projects != undefined) {
			for (var j=0; j<projects.length; j++) {
				filters.projectHashSet[$.trim(projects[j])] = true;
			}
		}
		
		// get each context and add to the global filter hashset
		var contexts = tasks[i].contexts;
		if (contexts != null && contexts != undefined) {
			for (var j=0; j<contexts.length; j++) {
				filters.contextHashSet[$.trim(contexts[j])] = true;
			}
		}
	}
	
	// update the filter options in the DOM
	$("#priority-select").empty();
	var priorities = Object.keys(filters.priorityHashSet);
	for (var i=0; i<priorities.length; i++) {
		var pri = priorities[i];
		$("#priority-select").append("<option value=\"" + pri + "\">" + pri + "</option>");
	}
	
	$("#project-select").empty();
	var projects = Object.keys(filters.projectHashSet);
	for (var i=0; i<projects.length; i++) {
		var proj = projects[i];
		$("#project-select").append("<option value=\"" + proj + "\">" + proj + "</option>");
	}
	
	$("#context-select").empty();
	var contexts = Object.keys(filters.contextHashSet);
	for (var i=0; i<contexts.length; i++) {
		var ctx = contexts[i];
		$("#context-select").append("<option value=\"" + ctx + "\">" + ctx + "</option>");
	}
}

/**
 * function will allow sorting of tasks by the following
 * criteria: (1) active vs. closed (2) priority (3) created date
 * (4) completed date
 */
function compareTasks(taskA, taskB) {
	var aActive = taskA.isActive;
	var bActive = taskB.isActive;
	var aPri = taskA.priority;
	var bPri = taskB.priority;
	var aCreated = taskA.createdDate;
	var bCreated = taskB.createdDate;
	var aCompleted = taskA.completedDate;
	var bCompleted = taskB.completedDate;
	
	// (1) compare active vs. closed
	if (aActive != bActive) {
		// prioritize active over closed
		if (aActive) {
			return -1;
		} else {
			return 1;
		}
	} else { // (2) compare priority
		if (aPri != bPri) {
			// order by priority, but favor having priority over not
			if (bPri == null || aPri < bPri) {
				return -1;
			} else if (aPri == null || aPri > bPri) {
				return 1;
			}
		} else { // (3) compare created date
			if (aCreated != bCreated) {
				// order by created date ascending (oldest ones first)
				if (aCreated < bCreated) {
					return -1;
				} else {
					return 1;
				}
			} else { // (4) compare completed date
				if (aCompleted != bCompleted) {
					// order by completed date descending (latest ones first)
					if (aCompleted > bCompleted) {
						return -1;
					} else {
						return 1;
					}
				}
			}
		}
	}
	
	// objects are equivalent
	return 0;
}
 
/**
 * function will generate a GUID for use in dynamic DOM ID's
 * code taken from: Kevin Hakanson at http://stackoverflow.com/a/873856
 */
function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}