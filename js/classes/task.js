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
var TodoTxtJs = TodoTxtJs || {};
/**
 * this represents a Task Class to be used as a container for metadata 
 * about some type of object.  In this case that object is a
 * task.
 */
TodoTxtJs.Task = function () {
	this.id = TodoTxtJs.Utils.createUUID();
	this.priority = null;
	this.createdDate = null;
	this.completedDate = null;
	this.projects = [];
	this.contexts = [];
	this.isActive = true;
	this.text = "";
};
/**
 * function generates the DOM element for this task
 */
TodoTxtJs.Task.prototype.getDomElement = function () {
	var element = document.createElement("li");
	element.id = this.id;
	element.className = this.getDisplayClassForTask();
	element.onclick = function () {
		TodoTxtJs.editTask(this.id);
	};
	element.innerHTML = this.text;

	return element;
};
/**
 * function returns the appropriate display classes for this task
 */
TodoTxtJs.Task.prototype.getDisplayClassForTask = function () {
	// get a list of the current tasks and iterate through
	var cls = "";
	if (this.priority != null && !this.text.match(/^(x\s)/)) {
		if (this.priority == "(A)") {
			cls += " a";
		}
		if (this.priority == "(B)") {
			cls += " b";
		}
		if (this.priority == "(C)") {
			cls += " c";
		}
	}
	if (!this.isActive) {
		cls += " closed";
	}
	
	return cls;
};
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
TodoTxtJs.Task.prototype.parseFromString = function (textLine) {
	// assign the text
	this.text = textLine;

	// get the priority of the task EX: (A)
	this.priority = this.parsePriorityFromString(textLine);
	
	// get the completed date of the task EX: 2012-09-23
	this.completedDate = this.parseCompletedDateFromString(textLine);
	
	// get the created date of the task EX: 2012-09-23
	this.createdDate = this.parseCreatedDateFromString(textLine);
	
	// parse out any Projects (items starting with "+" like "+ProjectName")
	this.projects = this.parseProjectsFromString(textLine);
	
	// parse out any Context (items starting with "@" like "@ContextName")
	this.contexts = this.parseContextsFromString(textLine);
	
	// parse out the Active / Closed state (starts with "x " for closed)
	if (textLine && textLine.match(/^(x\s)/)) {
		this.isActive = false;
	}
	
	// return Task Object to caller
	return this;
};

TodoTxtJs.Task.prototype.parsePriorityFromString = function (str) {
	var pri = null; // used to hold the priority if set
	if (str) {
		// parse out the priority RegEx: /\^([A-Z]\).*/ 
		// check for strings starting with something like "(A)"
		var priFoundPattern = /^\([A-Z]\)\s.*/;
		var match = str.match(priFoundPattern); // returns null if not found
		if (match != null && match.length > 0) {
			// found an active match so get the priority
			var priMatcher = /\([A-Z]\)/;
			pri = str.match(priMatcher);
		}
	}
	
	return pri;
};

TodoTxtJs.Task.prototype.parseCompletedDateFromString = function (str) {
	var completed = null;
	if (str) {
		// parse out the completedDate (if closed)
		// check for strings starting with something like "x (A) 2012-08-09 2012-08-01"
		var completedFoundPattern = /(x\s)(\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2}\s){1,2}.*/;
		match = str.match(completedFoundPattern); // returns null if not found
		if (match != null && match.length > 0) {
			// found a closed task with a completed date so parse
			var completedMatcher = /(\d{4}-\d{2}-\d{2}\s)/; // gets the first date in the string
			completed = str.match(completedMatcher);
		}
	}
	
	return completed;
};

TodoTxtJs.Task.prototype.parseCreatedDateFromString = function (str) {
	var created = null;
	if (str) {
		// parse out the createdDate
		// check for strings starting with something like "(A) 2012-08-01"
		var createdFoundPattern = /^(\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2}\s){1}.*/;
		match = str.match(createdFoundPattern); // returns null if not found
		if (match != null && match.length > 0) {
			// found a closed task with a completed date so parse
			var createdMatcher = /(\d{4}-\d{2}-\d{2}\s)/; // gets the first date in the string
			created = str.match(createdMatcher);
		}
	}
	
	return created;
};

TodoTxtJs.Task.prototype.parseProjectsFromString = function (str) {
	var projArray = []; // used to hold the project if set
	if (str) {
		// parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
		// check for strings like "+ABC123"
		var projFoundPattern = /\+[0-9A-Za-z]+\s/;
		var match = str.match(projFoundPattern); // returns null if not found
		if (match != null && match.length > 0) {
			// found an active match so get the projects as an array of projects
			var projMatcher = /\+[0-9A-Za-z]+\s/g;
			projArray = str.match(projMatcher);
		}
	}
	
	return projArray;
};

TodoTxtJs.Task.prototype.parseContextsFromString = function (str) {
	var ctxArray = []; // used to hold the context if set
	if (str) {
		// parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "+")
		// check for strings like "+ABC123"
		var ctxFoundPattern = /\@[0-9A-Za-z]+\s/;
		var match = str.match(ctxFoundPattern); // returns null if not found
		if (match != null && match.length > 0) {
			// found an active match so get the contexts as an array of contexts
			var ctxMatcher = /\@[0-9A-Za-z]+\s/g;
			ctxArray = str.match(ctxMatcher);
		}
	}
	
	return ctxArray;
};

/**
 * override toString() to output the raw TodoTxt format
 */
TodoTxtJs.Task.prototype.toString = function () {
	return this.text;
};