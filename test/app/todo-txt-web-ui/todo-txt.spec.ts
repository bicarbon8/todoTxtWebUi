/**********************************************************************
 * This javascript was created according to the specifications at
 * http://todotxt.com/ and is intended to allow users to access their
 * todo.txt files in a user-friendly and easy to visualize manner.
 *
 * Once initially uploaded, the todo.txt file will
 * be loaded into an HTML5 TodoTxtVault and managed from there.
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
import "jasmine";
import { TodoTxt } from '../../../src/app/todo-txt-web-ui/todo-txt';
import { TodoTxtTask } from '../../../src/app/todo-txt-web-ui/tasks/todo-txt-task';
import { TodoTxtVault } from '../../../src/app/todo-txt-web-ui/storage/todo-txt-vault';
import { TodoTxtTaskParser } from '../../../src/app/todo-txt-web-ui/tasks/todo-txt-task-parser';

describe('TodoTxt', () => {
    beforeAll(() => {
        TodoTxtVault._clear();
        try {
            document.querySelector('#todotxt').remove();
        } catch (e) {}
    });
    
    afterEach(() => {
        TodoTxtVault._clear();
    });

    afterAll(() => {
        TodoTxtVault._clear();
    });
    
    it('can add task to TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        let task: TodoTxtTask = TodoTxtTaskParser.get(text);
        expect(() => TodoTxtVault.getTask(task.id)).toThrowError(`no TodoTxtTask with ID of '${task.id}' could be found`);
        TodoTxt.addTask(task);
        let actual: TodoTxtTask = TodoTxtVault.getTask(task.id);
        expect(actual.text).toEqual(text);
    });

    it('can get task from TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        let task: TodoTxtTask = TodoTxtTaskParser.get(text);
        TodoTxtVault.addTasks(task);
        var actual = TodoTxt.getTask(task.id);
        expect(actual.id).toEqual(task.id);
        expect(actual.text).toEqual(task.text);
    });

    it('can create a task to add to TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        TodoTxt.createTask(text);
        var found = false;
        let tasks: TodoTxtTask[] = TodoTxtVault.getAllTasks();
        for (var i=0; i<tasks.length; i++) {
            if (tasks[i].text === text) {
                found = true;
                break;
            }
        }
        expect(found).toBeTrue();
    });

    it('can update an existing task in TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        let id: string = TodoTxt.createTask(text);
        let actualText: string = null;
        let tasks: TodoTxtTask[] = TodoTxtVault.getAllTasks();
        for (var i=0; i<tasks.length; i++) {
            if (tasks[i].text === text) {
                actualText = tasks[i].text;
                break;
            }
        }
        expect(actualText).toBeTruthy();
        let newText = "new text";
        TodoTxt.updateTask(id, newText);
        actualText = null;
        tasks = TodoTxtVault.getAllTasks();
        for (var i=0; i<tasks.length; i++) {
            if (tasks[i].text === newText) {
                actualText = tasks[i].text;
                break;
            }
        }
        expect(actualText).toEqual(newText);
    });

    it('can close an existing task in TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        let id: string = TodoTxt.createTask(text);
        let task: TodoTxtTask = TodoTxt.getTask(id);
        expect(task.isActive).toBeTrue();
        let actual: boolean = TodoTxt.closeTask(id);
        expect(actual).toBeTrue();
        let t: TodoTxtTask = TodoTxt.getTask(id);
        expect(t.isActive).toBeFalse();
        expect(t.text.match(/^(x )[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}( )/)).toBeTruthy();
    });

    it('can activate an existing closed task in TodoTxtVault', () => {
        let text: string = `sample task ${new Date().getTime()}`;
        var expectedText = text;
        let closedText: string = "x 1999-01-04 " + text;
        let id: string = TodoTxt.createTask(closedText);
        let task: TodoTxtTask = TodoTxt.getTask(id);
        expect(task.isActive).toBeFalse();
        var actual = TodoTxt.activateTask(id);
        expect(actual).toBeTrue();
        var t = TodoTxt.getTask(id);
        expect(t.isActive).toBeTrue();
        let actualText: string = t.text;
        expect(actualText).toEqual(expectedText);
    });

    /**
     * Data-driven tests
     */
    let cases: any[] = [
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15 is", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15 ask it", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "@note", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "+Task", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "+Task @note", expectFound: true },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "@note +Task", expectFound: false },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "John", expectFound: false },
        { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: ".*", expectFound: false },
    ];

    for (var i=0; i<cases.length; i++) {
        let c: any = cases[i];
        
        it(`can filter tasks: ${JSON.stringify(c)}`, () => {
            TodoTxtVault.removeAllTasks();

            // create task
            TodoTxt.createTask(c.str);
            var actual = TodoTxt.getFilteredTaskArray(c.filter);
            if (c.expectFound) {
                expect(actual.length).toEqual(1);
            } else {
                expect(actual.length).toEqual(0);
            }
        });
    }
});