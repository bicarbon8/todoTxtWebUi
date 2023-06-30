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
import { TodoTxtTask } from '../../../../src/app/todo-txt-web-ui/tasks/todo-txt-task';
import { TodoTxtTaskParser } from '../../../../src/app/todo-txt-web-ui/tasks/todo-txt-task-parser';

let sampleTaskStrings: any[] = [
	{ str: "x 2015-01-03 this is a +Task with a +note in it", expectedStatus: false, expectedPriority: undefined, expectedCompleted: "2015-01-03", expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: [] },
	{ str: "2015-01-03 this is a @Task with a @note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: ["@Task","@note"] },
	{ str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", expectedStatus: false, expectedPriority: undefined, expectedCompleted: "2015-01-03", expectedCreated: "2015-01-01", expectedProjects: ["+Task"], expectedContexts: ["@note"] },
	{ str: "x this is a @Task with a +note in it", expectedStatus: false, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+note"], expectedContexts: ["@Task"] },
	{ str: "this is a @ Task with + a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: [] },
	{ str: "xthis is a T+ask with a note@ in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: [] },
	{ str: "(B) 2015-01-03 x this ++is a @Task with @@a +note in it", expectedStatus: true, expectedPriority: "(B)", expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: ["+note"], expectedContexts: ["@Task"] },
	{ str: "X 2015-01-03 this is+ a Task with a note in it +", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "(A) 2015-01-03 this is a Task with a not@e in it", expectedStatus: true, expectedPriority: "(A)", expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "A 2015-01-03 this is a Task with a note in it @", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "(Z) 2015-01-03 this is a @Task with a @note in it", expectedStatus: true, expectedPriority: "(Z)", expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: ["@Task","@note"] },
	{ str: "(A) this is a +Task with a +note in it", expectedStatus: true, expectedPriority: "(A)", expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: [] },
	{ str: "(A)this is a Task with a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: [] },
	{ str: "(1) this is a Task with a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: [] },
	{ str: "(a) 2015-01-03 this is a Task with a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: "2015-01-03", expectedProjects: [], expectedContexts: [] },
	{ str: "+Task with a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task"], expectedContexts: [] },
	{ str: "@Task with a note in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: ["@Task"] },
	{ str: "a @Task@Two with a +note+One in it", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: [], expectedContexts: [] },
	{ str: "(@Task with a @note) in it (+Task with a +note)", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "[@Task with a @note] in it [+Task with a +note]", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "{@Task with a @note} in it {+Task with a +note}", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "\"@Task with a @note\" in it \"+Task with a +note\"", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "'@Task with a @note' in it '+Task with a +note'", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task","+note"], expectedContexts: ["@Task","@note"] },
	{ str: "@Task @Tasks with a @Task in it and +note with a +note and +notes", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+note","+notes"], expectedContexts: ["@Task","@Tasks"] },
	{ str: "+Task with a @note", expectedStatus: true, expectedPriority: undefined, expectedCompleted: undefined, expectedCreated: undefined, expectedProjects: ["+Task"], expectedContexts: ["@note"] },
];

describe('TodoTxtTask', () => {
	it('each new task has a unique ID', () => {
		var count = 100;
		var ids = {};
		for (var i=0; i<count; i++) {
			var task: TodoTxtTask = TodoTxtTaskParser.get('');
			ids[task.id] = true;
		}
		var actual = 0;
		for (var j in ids) {
			actual++;
		}
		expect(actual).toEqual(count);
	});

	it('can parse all fields', () => {
		for (var i=0; i<sampleTaskStrings.length; i++) {
			let c = sampleTaskStrings[i];
			console.info(`checking parsing of '${c.str}'`);
			var t: TodoTxtTask = TodoTxtTaskParser.get(c.str);
			
			console.info(`expected status '${c.expectedStatus}', actual: '${t.isActive}'`);
			expect(t.isActive).toBe(c.expectedStatus);

			console.info(`expected priority '${c.expectedPriority}', actual: '${t.priority}'`);
			expect(t.priority).toBe(c.expectedPriority);

			console.info(`expected completed date '${c.expectedCompleted}', actual: '${t.completedDate}'`);
			expect(t.completedDate).toBe(c.expectedCompleted);

			console.info(`expected created date '${c.expectedCreated}', actual: '${t.createdDate}'`);
			expect(t.createdDate).toBe(c.expectedCreated);

			console.info(`expected projects [${c.expectedProjects?.join(',')}], actual: [${t.projects?.join(',')}]`);
			expect(t.projects).toEqual(c.expectedProjects);

			console.info(`expected contexts [${c.expectedContexts?.join(',')}], actual: [${t.contexts?.join(',')}]`);
			expect(t.contexts).toEqual(c.expectedContexts);
		}
	});
});
