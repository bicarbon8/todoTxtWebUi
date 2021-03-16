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
import { TodoTxtTask } from '../../../src/app/todo-txt-web-ui/tasks/todo-txt-task';

let sampleTaskStrings: any[] = [
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

describe('TodoTxtTask', () => {
	it('can create new with no parameters', () => {
		var actual = new TodoTxtTask();
		expect(actual).not.toBeUndefined();
		expect(actual).not.toBeNull();
		expect(actual).toBeInstanceOf(TodoTxtTask);
	});

	it('each new task has a unique ID', () => {
		var count = 100;
		var ids = {};
		for (var i=0; i<count; i++) {
			var t = new TodoTxtTask();
			ids[t.id] = true;
		}
		var actual = 0;
		for (var j in ids) {
			actual++;
		}
		expect(actual).toEqual(count);
	});

	for (var i=0; i<sampleTaskStrings.length; i++) {
		let c = sampleTaskStrings[i];
		it(`can parse status from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			var actual = t.isActive;
			expect(actual).toBe(c.expectedStatus);
		});

		it(`can parse priority from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			var actual = t.priority;
			expect(actual).toBe(c.expectedPriority);
		});

		it(`can parse completed date from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			var actual = t.completedDate;
			expect(actual).toBe(c.expectedCompleted);
		});

		it(`can parse created date from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			var actual = t.createdDate;
			expect(actual).toBe(c.expectedCreated);
		});

		it(`can parse projects from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			let actual: string[] = Array.from(t.projects.values());
			expect(actual).toEqual(c.expectedProjects);
		});

		it(`can parse contexts from string: ${JSON.stringify(c)}`, () => {
			var t = new TodoTxtTask(c.str);
			let actual: string[] = Array.from(t.contexts.values());
			expect(actual).toEqual(c.expectedContexts);
		});
	}
});
