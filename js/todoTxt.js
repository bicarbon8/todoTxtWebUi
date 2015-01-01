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

/**
 * Project container
 */
var TodoTxtJs = TodoTxtJs || {};

/**
 * this function represents a Filters tracking object used to
 * limit the list of Tasks displayed at any one time.
 */
TodoTxtJs.Filters = {
	priorityHashSet: {},
	projectHashSet: {},
	contextHashSet: {},
};

/** used to signify that something has been modified */
TodoTxtJs.isDirty = false;

/**
 * function will attempt to get all localStorage tasks and display them
 * in the DOM if any exist.  This will add to any existing tasks so you
 * will need to clear the DOM first if you want to update the entire list
 * instead of just appending to the list.
 */
TodoTxtJs.processTasksFromLocalStorage = function () {
	var taskArray = TodoTxtJs.getSortedTaskArray();
	
	// process each item by id
	var filteredTasks = taskArray.filter(function (t) {
		return TodoTxtJs.filterPriority(t.priority) && 
			   TodoTxtJs.filterProject(t.projects) && 
			   TodoTxtJs.filterContext(t.contexts);
	});

	filteredTasks.forEach(function (t) {
		document.querySelector("#listContainer-ul").appendChild(t.getDomElement());
	});
},

/**
 * function will check the passed in priority and see if it
 * matches the currently selected priorities.  If none are
 * selected (match all) then "true" will be returned.
 *
 * @return boolean of true if the priority matches the selected
 * priorities or no priority filters are selected, otherwise false.
 */
TodoTxtJs.filterPriority = function (pri) {
	// get the list of selected priorities from the filter
	var selectedOptions = document.querySelectorAll("#priority-select option[selected]");
	var selectedValues = [].map.call(selectedOptions, function(option) {
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
},

/**
 * function will check the passed in project Array and see if it
 * matches the currently selected projects.  If none are selected
 * (match all) then "true" will be returned.
 *
 * @return boolean of true if the project Array contains a match
 * with the selected projects or no projects are selected, otherwise
 * false
 */
TodoTxtJs.filterProject = function (projArray) {
	// get the list of selected projects from the filter
	var selectedOptions = document.querySelectorAll("#project-select option[selected]");
	var selectedValues = [].map.call(selectedOptions, function(option) {
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
},

/**
 * function will check the passed in context Array and see if it
 * matches the currently selected contexts.  If none are selected
 * (match all) then "true" will be returned.
 *
 * @return boolean of true if the context Array contains a match
 * with the selected contexts or no contexts are selected, otherwise
 * false
 */
TodoTxtJs.filterContext = function (ctxArray) {
	// get the list of selected contexts from the filter
	var selectedOptions = document.querySelectorAll("#context-select option[selected]");
	var selectedValues = [].map.call(selectedOptions, function(option) {
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
},

/**
 * function will return a sorted array of tasks as pulled from
 * localStorage.
 */
TodoTxtJs.getSortedTaskArray = function () {
	// sort the list and then add it
	var taskArray = [];
	for (var key in localStorage) {
		var t = TodoTxtJs.getTask(key);
		t.id = key;
		taskArray.push(t);
	}
	taskArray.sort(TodoTxtJs.compareTasks);
	
	return taskArray;
},

/**
 * function will get a specified task from localstorage by id
 * @throws exception if task not found
 */
TodoTxtJs.getTask = function (taskId) {
	var t = new TodoTxtJs.Task().parseFromString(localStorage.getItem(taskId));
	t.id = taskId;
	return t;
};

/**
 * function adds this task to the browser's local cache allowing for
 * retained data on subsequent reloads of the page
 */
TodoTxtJs.addTask = function (task) {
	localStorage.setItem(task.id, task.toString());
};

/**
 * function will open and process the user's todo.txt file
 * based on what is referenced in the filename input.  This 
 * action will wipe out the existing tasks listed on the page
 * and replace them with a new list from the referenced todo.txt
 * file.
 */
TodoTxtJs.processTodoTxtFile = function (fileLines) {
	// confirm that the user really wants to wipe out the existing tasks and reload from disk
	if (confirm("Loading from a todo.txt file will overwrite any existing list displayed.  Are you sure you wish to proceed?")) {
		// clear the localStorage
		localStorage.clear();
		
		// clear the DOM
		TodoTxtJs.refreshUi();
		
		// get the path and send to getTodoTxtFile function
		TodoTxtJs.parseTodoTxtFile(fileLines);
	}
},

/**
 * function will retrieve the todo.txt file from the passed in
 * fileName.
 * 
 * @param fileName the String name of the todo.txt file to be opened
 * file.
 * EX: "todo.txt" 
 */
TodoTxtJs.getTodoTxtFile = function (fileName) {
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
			TodoTxtJs.parseTodoTxtFile(data);
		}
	});
};

/**
 * function will process each line of the todo.txt, sort by priority,
 * creationDate, and state (active or closed).  Processing of each
 * line and adding to DOM is handled in a separate function.
 *
 * @param todoTxt the AJAX response containing the contents of the
 * referenced todo.txt file
 */
TodoTxtJs.parseTodoTxtFile = function (todoTxt) {
	var lines = todoTxt.split("\n");
	for (var i in lines) {
		var line = lines[i];
		// ignore empty lines
		if (line && line !== "") {
			// parse the individual line and return a Task
			var task = new TodoTxtJs.Task().parseFromString(line);
			
			// add this taskObj to our global list in it's proper location
			TodoTxtJs.addTask(task);
		}
	};
	
	// add task to DOM from localStorage
	TodoTxtJs.processTasksFromLocalStorage();
	
	// display any filters
	TodoTxtJs.refreshFilters();
};

/**
 * function creates a new task
 */
TodoTxtJs.createTask = function (taskId) {
	var task = new TodoTxtJs.Task();
	TodoTxtJs.addTask(task);
	TodoTxtJs.processTasksFromLocalStorage();
	task.getDomElement().onclick();
};

/**
 * function opens the selected task in an editing window
 */
TodoTxtJs.editTask = function (taskId) {
	// populate the modal textarea with this task string
	var task = TodoTxtJs.getTask(taskId);
	/*
		<div id="modalBorder-div" class="hidden modalBorder">
			<div id="modalEdit-div" class="modal">
				<textarea id="modalEdit-textarea"></textarea>
				<div id="updateTaskButton-div" class="stdButton">Update Task</div>
				<div id="deleteTaskButton-div" class="stdButton">Delete Task</div>
			</div>
		</div>
	*/
	var modalText = document.createElement("textarea");
	modalText.id = "#modalEdit-textarea";
	modalText.innerHTML = task.toString();
	var updateButton = document.createElement("div");
	updateButton.className = "stdButton";
	updateButton.innerHTML = "Update Task";
	var deleteButton = document.createElement("div");
	deleteButton.className = "stdButton";
	deleteButton.innerHTML = "Delete Task";
	var modalContainer = document.createElement("div");
	modalContainer.className = "modal";
	modalContainer.appendChild(modalText);
	modalContainer.appendChild(updateButton);
	modalContainer.appendChild(deleteButton);
	var modalBackground = document.createElement("div");
	modalBackground.className = "modalBorder";
	modalBackground.appendChild(modalContainer);

	updateButton.onclick = function () {
		if (TodoTxtJs.updateTask(taskId, modalText.value)) {
			document.body.removeChild(modalBackground);
		} else {
			// TODO: display error toast
		}
	};
	deleteButton.onclick = function () {
		if (TodoTxtJs.deleteTask(taskId)) {
			document.body.removeChild(modalBackground);
		} else {
			// TODO: display error toast
		}
	};

	document.body.appendChild(modalBackground);
	
	// TODO: add additional details of the task to the div for display
	
	// place focus on the textarea
	$("#modalEdit-textarea").focus();
};

/**
 * function updates the task and saves it to the local storage cache
 */
TodoTxtJs.updateTask = function (taskId, newText) {
	// signify that something has been modified
	isDirty = true;
	
	// re-parse task
	var task = new TodoTxtJs.Task().parseFromString(newText);
	task.id = taskId;
	
	// update local cache with new task details
	TodoTxtJs.addTask(task);
	
	// update the DOM with the new task details and filter changes
	TodoTxtJs.refreshFilters();
	TodoTxtJs.refreshUi();
	
	return true;
};

/**
 * function will remove an existing task following confirmation from user
 */
TodoTxtJs.deleteTask = function (taskId) {
	// first confirm that the user really intended to delete this task
	if (confirm("Are you sure you want to delete task: \"" + localStorage.getItem(taskId) + "\"?")) {
		// delete the task from localStorage
		localStorage.removeItem(taskId);
		
		// delete the task from the DOM
		$("#" + taskId).remove();
		
		// update the Filters
		TodoTxtJs.refreshFilters();
		
		return true;
	}
};

/**
 * function will allow the user to download a copy of the todo.txt file
 */
TodoTxtJs.downloadTodoTxtFile = function () {
	var taskArray = TodoTxtJs.getSortedTaskArray();
	
	// create the output string to be written
	var content = "";
	for (var i in taskArray) {
		var t = taskArray[i];
		content += t.toString() + "\n";
	}
	
	var data = "data:text;charset=utf-8," + encodeURI(content);
	
	window.location.href = data;
};

/**
 * function will clear all the filters currently set.
 */
TodoTxtJs.clearFilters = function () {
	TodoTxtJs.refreshFilters();
	TodoTxtJs.refreshUi();
};

TodoTxtJs.bindControlEvents = function () {
	// enable processing of todo.txt file
	$("#getFileButton-div").click(function() {
		TodoTxtJs.processTodoTxtFile();
	});
	
	// enable saving of todo.txt file
	$("#saveFileButton-div").click(function() {
		TodoTxtJs.downloadTodoTxtFile();
	});
	// enable saving the todo.txt content through keyboard shortcut
	$(document).bind("keydown", function(e) {
		if (e.keyCode == 83 && e.altKey) { // Alt + s
			TodoTxtJs.downloadTodoTxtFile();
		}
	});
	
	// enable clearing of filters without having to refresh page
	$("#clearFilterButton-div").click(function() {
		TodoTxtJs.clearFilters();
	});

	// enable clearing of filters through keyboard shortcut
	$(document).bind("keydown", function(e) {
		if (e.keyCode == 67 && e.altKey) { // Alt + c
      		TodoTxtJs.clearFilters();
		}
	});

	// enable priority filter handling by clicking in the priority multiselect
	$("#priority-select").mouseup(function(e) {
		TodoTxtJs.refreshUi();
	});
	
	// enable project filter handling by clicking in the project multiselect
	$("#project-select").mouseup(function(e) {
		TodoTxtJs.refreshUi();
	});
	
	// enable context filter handling by clicking in the context multiselect
	$("#context-select").mouseup(function(e) {
		TodoTxtJs.refreshUi();
	});
	
	// enable adding new tasks through keyboard shortcut
	$(document).bind("keydown", function(e) {
		if (e.keyCode == 84 && e.altKey) { // Alt + t
			TodoTxtJs.createTask();
		}
	});
	
	// enable drag-and-drop handling of file uploads
	$("#fileDrop-div").bind("dragover", function(e) {
		TodoTxtJs.Utils.handleDragOver(e);
	});
	$("#fileDrop-div").bind("drop", function(e) {
		TodoTxtJs.Utils.handleFileSelect(e);
	});
	$("#fileUpload-input").bind("change", function(e) {
		TodoTxtJs.Utils.handleFileSelect(e);
	});
};

TodoTxtJs.unbindControlEvents = function () {
	// disable adding new tasks through keyboard shortcut
	$(document).unbind("keydown");
};

/**
 * function will reload the list of tasks from localStorage to ensure it
 * is sorted and displaying properly
 */
TodoTxtJs.refreshUi = function () {
	// clear the list
	document.querySelector("#listContainer-ul").innerHTML = "";
	
	// now rebuild from localStorage
	TodoTxtJs.processTasksFromLocalStorage();
};

TodoTxtJs.refreshFilters = function () {
	// parse the list of tasks
	var tasks = TodoTxtJs.getSortedTaskArray();
	for (var i=0; i<tasks.length; i++) {
		// get the priority and add to global filter hashset
		var priority = tasks[i].priority;
		if (priority != null && priority != undefined) {
			TodoTxtJs.Filters.priorityHashSet[$.trim(priority)] = true;
		}
		
		// get each project and add to the global filter hashset
		var projects = tasks[i].projects;
		if (projects != null && projects != undefined) {
			for (var j=0; j<projects.length; j++) {
				TodoTxtJs.Filters.projectHashSet[$.trim(projects[j])] = true;
			}
		}
		
		// get each context and add to the global filter hashset
		var contexts = tasks[i].contexts;
		if (contexts != null && contexts != undefined) {
			for (var j=0; j<contexts.length; j++) {
				TodoTxtJs.Filters.contextHashSet[$.trim(contexts[j])] = true;
			}
		}
	}
	
	// update the filter options in the DOM
	$("#priority-select").empty();
	var priorities = Object.keys(TodoTxtJs.Filters.priorityHashSet);
	for (var i=0; i<priorities.length; i++) {
		var pri = priorities[i];
		$("#priority-select").append("<option value=\"" + pri + "\">" + pri + "</option>");
	}
	
	$("#project-select").empty();
	var projects = Object.keys(TodoTxtJs.Filters.projectHashSet);
	for (var i=0; i<projects.length; i++) {
		var proj = projects[i];
		$("#project-select").append("<option value=\"" + proj + "\">" + proj + "</option>");
	}
	
	$("#context-select").empty();
	var contexts = Object.keys(TodoTxtJs.Filters.contextHashSet);
	for (var i=0; i<contexts.length; i++) {
		var ctx = contexts[i];
		$("#context-select").append("<option value=\"" + ctx + "\">" + ctx + "</option>");
	}
};

/**
 * function will allow sorting of tasks by the following
 * criteria: (1) active vs. closed (2) priority (3) created date
 * (4) completed date
 */
TodoTxtJs.compareTasks = function (taskA, taskB) {
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
};