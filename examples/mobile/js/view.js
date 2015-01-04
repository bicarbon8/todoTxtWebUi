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
var TodoTxt = TodoTxt || {};
TodoTxt.View = { 
	/**
	 * function generates the DOM element for the passed in task
	 */
	generateTaskElement: function (task) {
		var element = document.createElement("li");
		element.id = task.id;
		element.className = "list-group-item" + TodoTxt.View.getDisplayClassForTask(task);
		element.onclick = function () {
			TodoTxt.View.displayModalForTask(task.id);
		};
		element.onmouseover = function () {
			element.className += " active";
		};
		element.onmouseout = function () {
			element.className = element.className.replace(/( active)/, "");
		};
		element.innerHTML = task.text;
		
		return element;
	},

	/**
	 * function returns the appropriate display classes for this task
	 */
	getDisplayClassForTask: function (task) {
		// get a list of the current tasks and iterate through
		var cls = "";
		if (task.priority != null && !task.text.match(/^(x\s)/)) {
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
	},

	/**
	 * function will attempt to get all localStorage tasks and display them
	 * in the DOM if any exist.  This will add to any existing tasks so you
	 * will need to clear the DOM first if you want to update the entire list
	 * instead of just appending to the list.
	 */
	displayTasks: function () {
		// get the list of selected priorities from the filter
		var filterStr = document.querySelector("#filter-input").value;
		
		// filter list by those matching selected filters
		var filteredTasks = TodoTxt.getFilteredTaskArray(filterStr);

		// add tasks to DOM
		filteredTasks.forEach(function (t) {
			TodoTxt.View.displayTask(t);
		});
	},

	displayTask: function (task) {
		// add task to DOM
		document.querySelector("#listContainer-ul").appendChild(TodoTxt.View.generateTaskElement(task));
	},

	removeTask: function (taskId) {
		// delete the task from the DOM
		document.querySelector("#listContainer-ul").removeChild(document.querySelector("#" + taskId));
	},

	/**
	 * function opens the specified task in an editing window
	 */
	displayModalForTask: function (taskId) {
		// populate the modal textarea with this task string
		var task = TodoTxt.getTask(taskId) || new TodoTxt.Task();
		
		var modalText = document.createElement("textarea");
		modalText.id = "#modalEdit-textarea";
		modalText.innerHTML = task.toString();
		var updateButton = document.createElement("button");
		updateButton.className = "btn btn-lg btn-primary";
		updateButton.innerHTML = "Update Task (Alt + Enter)";
		var cancelButton = document.createElement("button");
		cancelButton.className = "btn btn-lg btn-primary";
		cancelButton.innerHTML = "Cancel Edit (Esc)";
		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-lg btn-primary";
		deleteButton.innerHTML = "Delete Task";
		var modalBody = document.createElement("div");
		modalBody.className = "panel-body";
		modalBody.appendChild(modalText);
		modalBody.appendChild(updateButton);
		modalBody.appendChild(cancelButton);
		modalBody.appendChild(deleteButton);
		var modalTitle = document.createElement("h3");
		modalTitle.className = "panel-title";
		modalTitle.innerHTML = "Edit Task";
		var modalHeader = document.createElement("div");
		modalHeader.className = "panel-heading";
		modalHeader.appendChild(modalTitle);
		var modalContainer = document.createElement("div");
		modalContainer.className = "panel panel-primary";
		modalContainer.appendChild(modalHeader);
		modalContainer.appendChild(modalBody);
		var modalBackground = document.createElement("div");
		modalBackground.className = "modalBorder";
		modalBackground.appendChild(modalContainer);

		function update() {
			if (TodoTxt.updateTask(task.id, modalText.value)) {
				TodoTxt.View.refreshUi();
				try {
					document.body.removeChild(modalBackground);
				} catch (e) {
					// TODO: log this
				}
			} else {
				// TODO: display error toast
			}
		}

		updateButton.onclick = update;
		// enable submitting update via keyboard shortcut
		document.addEventListener("keydown", function(e) {
			if (e.keyCode == 13 && e.altKey) { // Alt + Enter
	      		update();
			}
		}, false);
		cancelButton.onclick = function () {
			document.body.removeChild(modalBackground);
		};
		// enable cancelling update via keyboard shortcut
		document.addEventListener("keydown", function(e) {
			if (e.keyCode == 27) { // Esc
	      		update();
			}
		}, false);
		deleteButton.onclick = function () {
			if (TodoTxt.deleteTask(taskId)) {
				update();
			} else {
				// TODO: display error toast
			}
		};

		document.body.appendChild(modalBackground);
		
		// TODO: add additional details of the task to the div for display
		
		// place focus on the textarea
		modalText.focus();
	},

	bindControlEvents: function () {
		// enable saving the todo.txt content through keyboard shortcut
		document.addEventListener("keydown", TodoTxt.View.handleAltS, false);

		// enable clearing of filters through keyboard shortcut
		document.addEventListener("keydown", TodoTxt.View.handleAltC, false);
		
		// enable adding new tasks through keyboard shortcut
		document.addEventListener("keydown", TodoTxt.View.handleAltT, false);
		
		// enable drag-and-drop handling of file uploads
		document.querySelector("#fileDrop-div").addEventListener("dragover", TodoTxt.View.handleDragOver, false);
		document.querySelector("#fileDrop-div").addEventListener("drop", TodoTxt.View.handleDrop, false);
		document.querySelector("#fileUpload-input").addEventListener("change", TodoTxt.View.handleDrop, false);
	},

	handleAltS: function(e) {
		if (e.keyCode == 83 && e.altKey) { // Alt + s
			TodoTxt.exportTodoTxtFile();
		}
	},

	handleAltC: function(e) {
		if (e.keyCode == 67 && e.altKey) { // Alt + c
      		TodoTxt.View.refreshUi();
		}
	},

	handleAltT: function(e) {
		if (e.keyCode == 84 && e.altKey) { // Alt + t
			TodoTxt.View.displayModalForTask();
		}
	},

	handleDragOver: function (e) {
		TodoTxt.View.handleDragOver(e);
	},

	handleDrop: function (e) {
		TodoTxt.View.handleFileSelect(e);
	},

	unbindControlEvents: function () {
		// disable adding new tasks through keyboard shortcut
		document.removeEventListener("keydown", TodoTxt.View.handleAltS, false);
		document.removeEventListener("keydown", TodoTxt.View.handleAltC, false);
		document.removeEventListener("keydown", TodoTxt.View.handleAltT, false);

		document.querySelector("#fileDrop-div").removeEventListener("dragover", TodoTxt.View.handleDragOver, false);
		document.querySelector("#fileDrop-div").removeEventListener("drop", TodoTxt.View.handleDrop, false);
		document.querySelector("#fileUpload-input").removeEventListener("change", TodoTxt.View.handleDrop, false);
	},

	/**
	 * function will reload the list of tasks from localStorage to ensure it
	 * is sorted and displaying properly
	 */
	refreshUi: function () {
		// unbind any event handling
		TodoTxt.View.unbindControlEvents();

		// clear the list
		TodoTxt.View.clearTasks();

		// reset filters
		TodoTxt.View.refreshFilters();
		
		// now rebuild from localStorage
		TodoTxt.View.displayTasks();
	
		// update the DOM with the new task details and filter changes
		TodoTxt.View.refreshFilters();

		// enable keyboard shortcuts and click events for the controls area
		TodoTxt.View.bindControlEvents();
	},

	refreshFilters: function () {
		// update filter input
		document.querySelector("#filter-input").value = "";
		
		// update the filter options in the DOM
		var datalist = document.querySelector("#filters");
		datalist.innerHTML = "";

		for (var i in TodoTxt.Filters.priorities) {
			var f = document.createElement("option");
			f.value = i;
			datalist.appendChild(f);
		}
		
		for (var i in TodoTxt.Filters.projects) {
			var f = document.createElement("option");
			f.value = i;
			datalist.appendChild(f);
		}
		
		for (var i in TodoTxt.Filters.contexts) {
			var f = document.createElement("option");
			f.value = i;
			datalist.appendChild(f);
		}
	},

	clearTasks: function () {
		document.querySelector("#listContainer-ul").innerHTML = "";
	},

	filterDisplay: function () {
		TodoTxt.View.clearTasks();

		// honors any selected filters
		TodoTxt.View.displayTasks();
	},

	/**
	 * function will retrieve the todo.txt file from the passed in
	 * fileName.
	 * 
	 * @param fileName the String name of the todo.txt file to be opened
	 * file.
	 * EX: "todo.txt" 
	 */
	getTodoTxtFile: function (fileName) {
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
				(function () {
					TodoTxt.parseTodoTxtFile(data);
					TodoTxt.View.refreshUi();
				})();
			}
		});
	},

	handleFileSelect: function (e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.target.files || e.dataTransfer.files; // FileList object.

		// files is a FileList of File objects.
		if (files.length > 0) {
			var f = files[0];
			
			// process using a FileReader
			var reader = new FileReader();

			// get the content as a String
			reader.onloadend = function (e) {
				TodoTxt.parseTodoTxtFile(e.target.result);
				TodoTxt.View.refreshUi();
			};
			reader.readAsText(f, "UTF-8");
		}
	},

	handleDragOver: function (e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
	},
};