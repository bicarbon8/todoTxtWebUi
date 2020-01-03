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
import { TodoTxtAttributes } from './tasks/todo-txt-attributes';
import { TodoTxtTask } from './tasks/todo-txt-task';
import { TodoTxtUtils } from './helpers/todo-txt-utils';
import { TodoTxtVault } from './storage/todo-txt-vault';

export module TodoTxt {
    /**
     * function will return a sorted array of tasks as pulled from
     * localStorage.
     * @returns {array} a sorted list of tasks from localStorage
     */
    export function getSortedTaskArray(): TodoTxtTask[] {
        // sort the list and then add it
        let taskArray: TodoTxtTask[] = TodoTxtVault.getAllTasks();
        TodoTxtAttributes.reset();
        for (var i=0; i<taskArray.length; i++) {
            updateAttributes(taskArray[i]);
        }
        taskArray.sort(compareTasks);

        return taskArray;
    }

    /**
     * function will return a filtered array of tasks based on the passed in
     * filter string.  Matching uses an ordered fuzzy match so for the following:
     * "(A) 2014-03-02 don't forget to file @report with +John" a passed in filter
     * string of "for John" will match, but "John report" will not match
     * @param {string} filterStr - a string containing characters to match against the existing tasks
     * @returns {array} a sorted list of tasks matching the passed in <b><i>filterStr</i></b>
     */
    export function getFilteredTaskArray(filterStr: string) {
        var filteredTasks = TodoTxt.getSortedTaskArray();
        if (filterStr && filterStr !== "") {
            // create the regex matcher
            let filters: string[] = filterStr.split(" ");
            let rStr: string = '';
            for (var i=0; i<filters.length; i++) {
                var filter = filters[i].replace(/([-\(\)\[\]\{\}+\?*\.$\^\|,:#<\!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
                rStr += ".*(" + filter + ").*";
            }
            var regex = new RegExp(rStr, "i");
            let tasks: TodoTxtTask[] = filteredTasks.filter(function (t) {
                return t.text.match(regex);
            });
            filteredTasks = tasks;
        }

        return filteredTasks;
    }

    /**
     * function will process each line of the todo.txt, sort by priority,
     * creationDate, and state (active or closed).
     *
     * @param {string} todoTxt - the "\n" delimited lines from a todo.txt file
     * @param {boolean} append - a boolean indicating if existing tasks should be cleared
     * first or just appended to with the new file
     */
    export function parseTodoTxtFile(todoTxt: string, append?: boolean) {
        if (!append) {
            // clear the Storage
            TodoTxtVault.removeAllTasks();
        }
        var lines = todoTxt.split("\n");
        for (var i in lines) {
            if (typeof lines[i] === "string") {
                let line: string = lines[i];
                // ignore empty lines
                if (line && line !== "") {
                    // create new Task and add to our global list in it's proper location
                    createTask(line);
                }
            }
        }
    }

    /**
     * function creates a new task and saves to {TodoTxtVault}
     * @param {string} textStr - a string representing a raw task
     * @returns {string} the ID of the newly created {TodoTxt.Task}
     */
    export function createTask(textStr: string): string {
        let text: string = textStr || '';
        let t: TodoTxtTask = new TodoTxtTask(text);
        addTask(t);
        return t.id;
    }

    /**
     * function will get a specified task from TodoTxtVault by id
     * @param {string} taskId - the unique id of the task to be returned
     * @returns {TodoTxtTask} a task or null if task not found
     */
    export function getTask(taskId: string): TodoTxtTask {
        let task: TodoTxtTask = TodoTxtVault.getTask(taskId);
        return task;
    }

    /**
     * function updates the task and saves it to the TodoTxtVault cache
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @param {string} newText - a string representing the updated, raw task text
     * @returns {boolean} true if task could be updated otherwise false
     */
    export function updateTask(taskId: string, newText: string): boolean {
        // re-parse task
        let task: TodoTxtTask;
        try {
            task = getTask(taskId);
        } catch (e) {
            task = new TodoTxtTask();
        }
        task.parseInput(newText);

        // overwrite storage with updated task
        TodoTxt.addTask(task);

        return true;
    }

    /**
     * function adds this task to the browser's local cache allowing for
     * retained data on subsequent reloads of the page
     * @param {TodoTxtTask} task - a task to be added to Storage
     */
    export function addTask(task: TodoTxtTask) {
        TodoTxtVault.addTask(task);
        updateAttributes(task);
    }

    /**
     * function will append an "x YYYY-MM-DD " to a stored
     * task if not already closed and will remove any priority
     * declarations in the text of the Task
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be closed, otherwise false
     */
    export function closeTask(taskId: string): boolean {
        var task = getTask(taskId);

        if (task && task.isActive) {
            var text = task.text;
            if (task.priority) {
                text = text.replace(task.priority, "");
            }
            text = "x " + TodoTxtUtils.formatDate(new Date()) + " " + text;
            updateTask(task.id, text);
            return true;
        }
        
        return false;
    }

    /**
     * function will remove "x YYYY-MM-DD " from a stored
     * task if not already active
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be activated, otherwise false
     */
    export function activateTask(taskId: string): boolean {
        var task = getTask(taskId);
        if (task && !task.isActive) {
            let text: string = task.text;
            text = text.replace(/^(x )/, "").replace(task.completedDate + " ", "");
            updateTask(task.id, text);
            return true;
        }
        
        return false;
    }

    /** @ignore */
    function updateAttributes(task: TodoTxtTask): void {
        if (task.isActive || TodoTxtVault.getConfig().showClosed) {
            // get the priority and add to global filter hashset
            if (task.priority) {
                TodoTxtAttributes.priorities.add(task.priority);
            }

            // get each project and add to the global filter hashset
            task.projects.forEach((project) => {
                if (project) {
                    TodoTxtAttributes.projects.add(project);
                }
            });

            // get each context and add to the global filter hashset
            task.contexts.forEach((context) => {
                if (context) {
                    TodoTxtAttributes.contexts.add(context);
                }
            });
        }
    }

    /** @ignore */
    function compareTasks(taskA: TodoTxtTask, taskB: TodoTxtTask) {
        // function will allow sorting of tasks by the following
        // criteria: (1) active vs. closed (2) priority (3) created date
        // (4) completed date
        var aActive = taskA.isActive;
        var bActive = taskB.isActive;
        var aPri = taskA.priority;
        var bPri = taskB.priority;
        var aCreated = taskA.createdDate;
        var bCreated = taskB.createdDate;
        var aCompleted = taskA.completedDate;
        var bCompleted = taskB.completedDate;

        // (1) compare active vs. closed
        if (aActive !== bActive) {
            // prioritize active over closed
            if (aActive) {
                return -1;
            } else {
                return 1;
            }
        } else { // (2) compare priority
            if (aPri !== bPri) {
                // order by priority, but favor having priority over not
                if (!bPri || aPri < bPri) {
                    return -1;
                } else if (!aPri || aPri > bPri) {
                    return 1;
                }
            } else { // (3) compare created date
                if (aCreated !== bCreated) {
                    // order by created date ascending (oldest ones first)
                    if (aCreated < bCreated) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else { // (4) compare completed date
                    if (aCompleted !== bCompleted) {
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
}