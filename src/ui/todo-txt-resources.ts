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
import { TodoTxtUtils } from "../helpers/todo-txt-utils";

export module TodoTxtResources {
    var recs: Map<string, any> = new Map<string, any>();

	export function register(langLocale: string, resourceObj: any): void {
		recs.set(langLocale, resourceObj);
    }
    
	export function get(key: string): string {
		let rec: any = recs.get(TodoTxtUtils.getLanguage());
		if (!rec) {
			rec = recs.get("en-us"); // fallback to en-US
		}
		let val: string = rec[key];
		if (!val) {
			throw `requested resource not found: ${key}`;
		}
		return val;
    }
}

TodoTxtResources.register("en-us", {
	OVERWRITE_CONFIRM: "This will overwrite any existing list.  Are you sure you wish to proceed?",
	DELETE_CONFIRM: "Are you sure you want to delete task?",
    IMPORT: "Import",
    ADD_TASK: "Add Task",
    EXPORT: "Export",
    SHOW_CLOSED: "Show Closed",
    FILTER_PLACEHOLDER_TEXT: "Type filter(s)",
    CLEAR_FILTER: "Clear Filter",
    PRIORITIES: "Priorities",
    PROJECTS: "Projects",
    CONTEXTS: "Contexts",
    CLOSE: "Close",
    EDIT_TASK_HEADER: "Edit Task",
    ADD: "Add",
    UPDATE: "Update",
    PREVIEW: "Preview",
    DELETE: "Delete",
});