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
var TodoTxt = TodoTxt || {};

/**
 * this function represents a Filters tracking object used to
 * limit the list of Tasks displayed at any one time.
 */
TodoTxt.Filters = {
	priorities: {},
	projects: {},
	contexts: {},
};

/**
 * function will return a sorted array of tasks as pulled from
 * localStorage.
 */
TodoTxt.getSortedTaskArray = function () {
	// sort the list and then add it
	var taskArray = [];
	for (var key in localStorage) {
		var regex = new RegExp("^(" + TodoTxt.Resources.get("NAMESPACE") + ")");
		if (key.match(regex)) {
			var t = TodoTxt.getTask(key);
			t.id = key;
			taskArray.push(t);
			TodoTxt.updateFilters(t);
		}
	}
	taskArray.sort(TodoTxt.compareTasks);
	
	return taskArray;
},

/**
 * function will return a filtered array of tasks based on the passed in
 * filter string.  Matching uses an ordered fuzzy match so for the following:
 * "(A) 2014-03-02 don't forget to file @report with +John" a passed in filter
 * string of "for John" will match, but "John report" will not match
 */
TodoTxt.getFilteredTaskArray = function (filterStr) {
	var filteredTasks = TodoTxt.getSortedTaskArray();
	if (filterStr && filterStr !== "") {
		// create the regex matcher
		var filters = filterStr.split(" ");
		var rStr = "[\.]*";
		for (var i=0; i<filters.length; i++) {
			var filter = filters[i].replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
			rStr += "(" + filter + ")[\.]*";
		}
		var regex = new RegExp(rStr, "i");
		var tasks = filteredTasks.filter(function (t) {
			return t.toString().match(regex);
		});
		filteredTasks = tasks;
	}
	
	return filteredTasks;
},

/**
 * function will get a specified task from localstorage by id
 * @returns null if task not found
 */
TodoTxt.getTask = function (taskId) {
	var task, 
		text = localStorage.getItem(taskId);
	if (text) {
		task = new TodoTxt.Task().parseFromString(text);
		task.id = taskId;
	}
	return task;
};

/**
 * function adds this task to the browser's local cache allowing for
 * retained data on subsequent reloads of the page
 */
TodoTxt.addTask = function (task) {
	localStorage.setItem(task.id, task.toString());
};

/**
 * function will process each line of the todo.txt, sort by priority,
 * creationDate, and state (active or closed).
 *
 * @param todoTxt the "\n" delimited lines from a todo.txt file
 * @param append a boolean indicating if existing tasks should be cleared
 * first or just appended to with the new file
 */
TodoTxt.parseTodoTxtFile = function (todoTxt, append) {
	if (!append) {
		// confirm that the user really wants to wipe out the existing tasks load file
		if (confirm(TodoTxt.Resources.get("OVERWRITE_CONFIRM"))) {
			// clear the localStorage
			localStorage.clear();
		}
	}
	var lines = todoTxt.split("\n");
	for (var i in lines) {
		if (typeof lines[i] === "string") {
			var line = lines[i];
			// ignore empty lines
			if (line && line !== "") {
				// parse the individual line and return a Task
				var task = new TodoTxt.Task().parseFromString(line);
				
				// add this taskObj to our global list in it's proper location
				TodoTxt.addTask(task);
			}
		}
	};
};

/**
 * function creates a new task
 */
TodoTxt.createTask = function (textStr) {
	var text = textStr || "";
	TodoTxt.updateTask(TodoTxt.Utils.createId(), text);
};

/**
 * function updates the task and saves it to the local storage cache
 */
TodoTxt.updateTask = function (taskId, newText) {
	// re-parse task
	var task = new TodoTxt.Task().parseFromString(newText);
	task.id = taskId;

	// overwrite localstorage with updated task
	TodoTxt.addTask(task);
	
	return true;
};

TodoTxt.updateFilters = function (task) {
	// get the priority and add to global filter hashset
	if (task.priority) {
		TodoTxt.Filters.priorities[task.priority] = true;
	}
	
	// get each project and add to the global filter hashset
	for (var j in task.projects) {
		if (typeof task.projects[j] === "string") {
			TodoTxt.Filters.projects[task.projects[j]] = true;
		}
	}
	
	// get each context and add to the global filter hashset
	for (var j in task.contexts) {
		if (typeof task.contexts[j] === "string") {
			TodoTxt.Filters.contexts[task.contexts[j]] = true;
		}
	}
};

/**
 * function will remove an existing task following confirmation from user
 */
TodoTxt.deleteTask = function (taskId) {
	// first confirm that the user really intended to delete this task
	if (confirm(TodoTxt.Resources.get("DELETE_CONFIRM") + "\n\t\"" + TodoTxt.getTask(taskId).toString() + "\"")) {
		// delete the task from localStorage
		localStorage.removeItem(taskId);
		
		return true;
	}
};

/**
 * function will allow the user to download a copy of the todo.txt file
 */
TodoTxt.exportTodoTxtFile = function () {
	var taskArray = TodoTxt.getSortedTaskArray();
	
	// create the output string to be written
	var content = "";
	for (var i in taskArray) {
		if (taskArray[i] instanceof TodoTxt.Task) {
			var t = taskArray[i];
			content += t.toString() + "\n";
		}
	}
	
	// set datatype to text/csv to initiate download prompt
	var data = encodeURI("data:text/csv;charset=utf-8," + content);
	
	window.open(data);
};

/**
 * function will allow sorting of tasks by the following
 * criteria: (1) active vs. closed (2) priority (3) created date
 * (4) completed date
 */
TodoTxt.compareTasks = function (taskA, taskB) {
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