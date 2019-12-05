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
import { TodoTxtTask } from "../tasks/todo-txt-task";
import { TodoTxtConfig } from "./todo-txt-config";
import { TodoTextPersistance as TodoTextCache } from "./todo-txt-cache";

export module TodoTxtVault {
    var tasks: Map<string, TodoTxtTask> = new Map<string, TodoTxtTask>();
    var config: TodoTxtConfig = { showClosed: false };
    var cacheError: number = 0;

    export function addTask(task: TodoTxtTask): void {
        if (tasks.has(task.id)) {
            tasks.delete(task.id);
        }
        tasks.set(task.id, task);

        persist();
    }

    export function removeTask(taskId: string): boolean {
        let found: boolean = false;
        if (tasks.has(taskId)) {
            tasks.delete(taskId);
            found = true;
        }

        persist();

        return found;
    }

    export function removeAllTasks(): void {
        tasks = new Map<string, TodoTxtTask>();

        persist();
    }

    export function getTask(taskId: string): TodoTxtTask {
        load();
        
        if (tasks.has(taskId)) {
            return tasks.get(taskId);
        }
        throw new Error(`no TodoTxtTask with ID of '${taskId}' could be found`);
    }

    export function getAllTasks(): TodoTxtTask[] {
        load();

        let ts: TodoTxtTask[] = [];
        tasks.forEach((value: TodoTxtTask) => {
            ts.push(value);
        });
        return ts;
    }

    export function getConfig(): TodoTxtConfig {
        load();

        return config;
    }

    export function setConfig(cfg: TodoTxtConfig): void {
        config = cfg;

        persist();
    }

    function persist(): void {
        try {
            let cache: TodoTextCache = new TodoTextCache(tasks, config);
            localStorage.setItem('todo-txt', JSON.stringify(cache));
        } catch (e) {
            if (cacheError == 0) {
                // TODO: move this to TodoTxtView and present as Modal on startup
                alert('WARNING: unable to store Tasks in localStorage; ensure you export your tasks before you close the browser or they will be lost!');
                console.error(`TodoTxt unable to cache data in localStorage due to: ${e}`);
                cacheError++;
            }
        }
    }

    function load(): void {
        try {
            let persistance: string = localStorage.getItem('todo-txt');
            if (persistance) {
                let cache: TodoTextCache = JSON.parse(persistance) as TodoTextCache;
                if (cache.tasks) {
                    tasks.clear();
                    for (var i=0; i<cache.tasks.length; i++) {
                        let t = cache.tasks[i];
                        if (t['text'] && t['id']) {
                            let task: TodoTxtTask = new TodoTxtTask(t.text);
                            task.id = t.id;
                            tasks.set(task.id, task);
                        }
                    }
                    config = cache.config;
                }
            }
        } catch (e) {
            if (cacheError == 0) {
                console.info(`TodoTxt unable to load cache from localStorage due to: ${e}`);
            }
        }
    }

    /**
     * WARNING!! removes all cached data including tasks and configuration.
     * only to be used after you've exported your tasks to a file
     */
    export function _clear(): void {
        tasks = new Map<string, TodoTxtTask>();
        config = {showClosed: false};
        localStorage.removeItem('todo-txt');
    }
}