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
import { FileDropEvent } from "../helpers/file-drop-event";
export declare module TodoTxtView {
    /**
     * function generates the DOM element for the passed in task
     * @param {TodoTxtTask} task - the task object to be converted to HTMLDivElement
     * @returns a {HTMLDivElement} from the passed in {Task}
     */
    function generateTaskElement(task: TodoTxtTask): HTMLDivElement;
    function generateListElement(text: string): HTMLLIElement;
    /**
     * function will attempt to get all tasks and display them
     * in the DOM if any exist.  This will add to any existing tasks so you
     * will need to clear the DOM first if you want to update the entire list
     * instead of just appending to the list.
     */
    function displayTasks(): void;
    function displayTask(task: TodoTxtTask): void;
    function removeTask(taskId: string): void;
    /**
     * function opens the specified task in an editing window
     */
    function displayModalForTask(taskId?: string): void;
    function updateModalPreview(): void;
    function removeModal(): void;
    const modalEventHandlers: any[];
    function displayPriorities(): void;
    function clearPriorities(): void;
    function displayProjects(): void;
    function clearProjects(): void;
    function displayContexts(): void;
    function clearContexts(): void;
    const mainEventHandlers: any[];
    function bindControlEvents(handlers: any[]): void;
    function unbindControlEvents(handlers: any[]): void;
    function handleAltS(e: KeyboardEvent): void;
    function handleAltC(e: KeyboardEvent): void;
    function handleAltT(e: KeyboardEvent): void;
    function handleDrop(e: FileDropEvent): void;
    function handleAltEnter(e: KeyboardEvent): void;
    function handleEsc(e: KeyboardEvent): void;
    function handleDeleteClick(): void;
    function handleFilter(): void;
    function handleAltP(e: KeyboardEvent): void;
    /**
     * function will reload the list of tasks from Storage to ensure it
     * is sorted and displaying properly
     */
    function refreshUi(): void;
    function setFilters(filterStr: string): void;
    function clearFilters(): void;
    function clearTasks(): void;
    function filterDisplayedTasks(): void;
    function toggleShowClosedStatus(): void;
    function setShowClosed(active: boolean): void;
    function togglePanel(name: string): void;
    function showPanel(heading: HTMLElement, body: HTMLElement): void;
    function hidePanel(heading: HTMLElement, body: HTMLElement): void;
    function toggleTaskStatus(taskId: string): void;
    /**
     * function will retrieve the todo.txt file from the passed in
     * fileName.
     *
     * @param fileName the String name of the todo.txt file to be opened
     * file.
     * EX: "todo.txt"
     */
    function getTodoTxtFile(fileName: string): Promise<void>;
    function handleFileSelect(e: FileDropEvent): void;
    function handleDragOver(e: DragEvent): void;
    /**
     * function will allow the user to download a copy of the todo.txt file
     */
    function exportTodoTxtFile(): void;
    /**
     * function will generate a html-markup version of the task
     * @param {TodoTxtTask} task - the task to generate for
     * @returns {string} the HTML marked up task text
     */
    function getMarkupForTask(task: TodoTxtTask): string;
    /**
     * function returns the appropriate display classes for this task
     *
     * @returns {string} the priority based class to apply to a Task element
     */
    function getDisplayClassForTask(task: TodoTxtTask): string;
    function initializeElements(): void;
}
