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
var sampleTaskStrings = [
	{ str: "x 2015-01-03 this is a +Task with a +note in it", expectedStatus: false, expectedPriority: null, expectedCompleted: "2015-01-03", expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: [] },
	{ str: "2015-01-03 this is a @Task with a @note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: ["@Task","@note"] },
	{ str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", expectedStatus: false, expectedPriority: null, expectedCompleted: "2015-01-03", expectedCreated: "2015-01-01", expectedProjects: ["+Task"], expectedContexts: ["@note"] },
	{ str: "x this is a @Task with a +note in it", expectedStatus: false, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+note"], expectedContexts: ["@Task"] },
	{ str: "this is a @ Task with + a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: [] },
	{ str: "xthis is a T+ask with a note@ in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: [] },
	{ str: "(B) 2015-01-03 x this ++is a @Task with @@a +note in it", expectedStatus: true, expectedPriority: "(B)", expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: ["+note"], expectedContexts: ["@Task"] },
	{ str: "X 2015-01-03 this is+ a Task with a note in it +", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "(A) 2015-01-03 this is a Task with a not@e in it", expectedStatus: true, expectedPriority: "(A)", expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "A 2015-01-03 this is a Task with a note in it @", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "(Z) 2015-01-03 this is a @Task with a @note in it", expectedStatus: true, expectedPriority: "(Z)", expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: ["@Task","@note"] },
	{ str: "(A) this is a +Task with a +note in it", expectedStatus: true, expectedPriority: "(A)", expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: [] },
	{ str: "(A)this is a Task with a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: [] },
	{ str: "(1) this is a Task with a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: [] },
	{ str: "(a) 2015-01-03 this is a Task with a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "+Task with a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task"], expectedContexts: [] },
	{ str: "@Task with a note in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: ["@Task"] },
	{ str: "a @Task@Two with a +note+One in it", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: [], expectedContexts: [] },
	{ str: "(@Task with a @note) in it (+Task with a +note)", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "[@Task with a @note] in it [+Task with a +note]", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "{@Task with a @note} in it {+Task with a +note}", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "\"@Task with a @note\" in it \"+Task with a +note\"", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "'@Task with a @note' in it '+Task with a +note'", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "@Task @Tasks with a @Task in it and +note with a +note and +notes", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+note","+notes"], expectedContexts: ["@Task","@Tasks"] },
	{ str: "+Task with a @note", expectedStatus: true, expectedPriority: null, expectedCompleted: null, expectedCreated: null, expectedProjects: ["+Task"], expectedContexts: ["@note"] },
];

QUnit.module("TodoTxt.Task");
QUnit.test("can create new with no parameters", function (assert) {
	var actual = new TodoTxt.Task();
	assert.ok(actual);
	assert.ok(actual instanceof TodoTxt.Task, "expected task to be an instance of 'TodoTxt.Task', but was not");
});
QUnit.test("each new task has a unique ID", function (assert) {
	var count = 100;
	var ids = {};
	for (var i=0; i<count; i++) {
		var t = new TodoTxt.Task();
		ids[t.id] = true;
	}
	var actual = 0;
	for (var j in ids) {
		actual++;
	}
	assert.equal(actual, count, "expected " + count + " unique ids to be created, but was: " + actual);
});

/**
 * Data-driven tests
 */
/*jshint loopfunc:true*/
for (var i=0; i<sampleTaskStrings.length; i++) {
	(function (p) {
		QUnit.test("can parse status from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parseStatusFromString(p.str);
			var actual = t.isActive;
			assert.equal(actual, p.expectedStatus, "task.isActive did not match expectedStatus");
		});
		QUnit.test("can parse priority from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parsePriorityFromString(p.str);
			var actual = t.priority;
			assert.equal(actual, p.expectedPriority, "task.priority did not match expectedPriority");
		});
		QUnit.test("can parse completed date from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parseStatusFromString(p.str); // needed for completed date
			t._parseCompletedDateFromString(p.str);
			var actual = t.completedDate;
			assert.equal(actual, p.expectedCompleted, "task.completedDate did not match expectedCompleted");
		});
		QUnit.test("can parse created date from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parseStatusFromString(p.str); // needed for created date
			t._parseCreatedDateFromString(p.str);
			var actual = t.createdDate;
			assert.equal(actual, p.expectedCreated, "task.createdDate did not match expectedCreated");
		});
		QUnit.test("can parse projects from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parseProjectsFromString(p.str);
			var actual = t.projects;
			assert.deepEqual(actual, p.expectedProjects, "task.projects: " + JSON.stringify(actual) + " did not match expectedProjects: " + JSON.stringify(p.expectedProjects));
		});
		QUnit.test("can parse contexts from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task();
			t._parseContextsFromString(p.str);
			var actual = t.contexts;
			assert.deepEqual(actual, p.expectedContexts, "task.projects: " + JSON.stringify(actual) + " did not match expectedContexts: " + JSON.stringify(p.expectedContexts));
		});
		QUnit.test("can create from string: " + JSON.stringify(p), function (assert) {
			var t = new TodoTxt.Task(p.str);
			var actual;
			actual = t.createdDate;
			assert.equal(actual, p.expectedCreated, "task.createdDate did not match expectedCreated");
			actual = t.completedDate;
			assert.equal(actual, p.expectedCompleted, "task.completedDate did not match expectedCompleted");
			actual = t.priority;
			assert.equal(actual, p.expectedPriority, "task.priority did not match expectedPriority");
			actual = t.isActive;
			assert.equal(actual, p.expectedStatus, "task.isActive did not match expectedStatus");
			actual = t.projects;
			assert.deepEqual(actual, p.expectedProjects, "task.projects: " + JSON.stringify(actual) + " did not match expectedProjects: " + JSON.stringify(p.expectedProjects));
			actual = t.contexts;
			assert.deepEqual(actual, p.expectedContexts, "task.projects: " + JSON.stringify(actual) + " did not match expectedContexts: " + JSON.stringify(p.expectedContexts));
		});
	})(sampleTaskStrings[i]);
}
