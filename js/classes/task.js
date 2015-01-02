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
/**
 * this represents a Task Class to be used as a container for metadata 
 * about some type of object.  In this case that object is a
 * task.
 */
TodoTxt.Task = function () {
	this.id = TodoTxt.Utils.createId();
	this.priority = null;
	this.createdDate = null;
	this.completedDate = null;
	this.projects = [];
	this.contexts = [];
	this.isActive = true;
	this.text = "";
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
TodoTxt.Task.prototype.parseFromString = function (textLine) {
	// assign the text
	this.text = textLine;

	if (typeof textLine === "string") {
		// parse out the Active / Closed state (starts with "x " for closed)
		this.isActive = this.parseStatusFromString(textLine);

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
	}
	// return Task Object to caller
	return this;
};

TodoTxt.Task.prototype.parseStatusFromString = function (str) {
	if (str && str.match(/^(x )/)) {
		return false;
	}
	return true;
};

TodoTxt.Task.prototype.parsePriorityFromString = function (str) {
	var pri = null; // used to hold the priority if set
	if (str) {
		// parse out the priority RegEx: /\^([A-Z]\).*/ 
		// check for strings starting with something like "(A)"
		var priPattern = /^\([A-Z]\)/;
		var match = str.match(priPattern); // returns null if not found
		if (match) {
			// found an active match so get the priority
			pri = match[0];
		}
	}
	
	return pri;
};

TodoTxt.Task.prototype.parseCompletedDateFromString = function (str) {
	var completed = null;
	if (str) {
		// parse out the completedDate if closed (starts with "x ")
		if (!this.isActive) {
			var dates = this.parseDatesFromString(str);
			if (dates) {
				completed = dates[0];
			}			
		}
	}
	
	return completed;
};

TodoTxt.Task.prototype.parseCreatedDateFromString = function (str) {
	var created = null;
	if (str) {
		// parse out the createdDate (will be 2nd if item is closed)
		var dates = this.parseDatesFromString(str);
		if (!this.isActive && dates.length > 1) {
			created = dates[1];
		} else if (dates) {
			created = dates[0];
		}
	}
	
	return created;
};

TodoTxt.Task.prototype.parseDatesFromString = function (str) {
	var dates = null;
	if (str) {
		// check for strings with something like "2012-08-09"
		var datePattern = /(\d{4}-\d{2}-\d{2}\s)/g;
		match = str.match(datePattern); // returns null if not found
		if (match) {
			dates = match;
		}
	}
	
	return dates;
};

TodoTxt.Task.prototype.parseProjectsFromString = function (str) {
	var projArray = []; // used to hold the project if set
	if (str) {
		// parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
		// check for strings like "+ABC123"
		var projPattern = /\+[0-9A-Za-z]+/g;
		var match = str.match(projPattern); // returns null if not found
		if (match) {
			// found an active match so get the projects as an array of projects
			projArray = match;
		}
	}
	
	return projArray;
};

TodoTxt.Task.prototype.parseContextsFromString = function (str) {
	var ctxArray = []; // used to hold the context if set
	if (str) {
		// parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "+")
		// check for strings like "@ABC123"
		var ctxPattern = /\@[0-9A-Za-z]+/g;
		var match = str.match(ctxPattern); // returns null if not found
		if (match) {
			// found an active match so get the contexts as an array of contexts
			ctxArray = match;
		}
	}
	
	return ctxArray;
};

/**
 * override toString() to output the raw TodoTxt format
 */
TodoTxt.Task.prototype.toString = function () {
	return this.text;
};