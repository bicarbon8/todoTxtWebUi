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
import { TodoTxt } from '../todo-txt';
import * as $ from 'jquery';
import { TodoTxtResources } from "./todo-txt-resources";
import { TodoTxtUtils } from "../helpers/todo-txt-utils";
import { FileDropEvent } from "../helpers/file-drop-event";
import { TodoTxtAttributes } from "../tasks/todo-txt-attributes";
import { TodoTxtVault } from "../storage/todo-txt-vault";

export module TodoTxtView {
    /**
     * function generates the DOM element for the passed in task
     * @param {TodoTxtTask} task - the task object to be converted to HTMLDivElement
     * @returns a {HTMLDivElement} from the passed in {Task}
     */
    export function generateTaskElement(task: TodoTxtTask): HTMLDivElement {
        var icon = "glyphicon-ok";
        var status = "btn-default";
        var htmlText = getMarkupForTask(task);
        if (!task.isActive) {
            icon = "glyphicon-remove";
            status = "btn-danger";
        }

        // Task element
        var element = document.createElement("div");
        element.className = "btn-group btn-block";
        element.id = task.id;

        // Close Task Button Icon
        let iconSpan: HTMLSpanElement = document.createElement('span');
        iconSpan.classList.add('glyphicon');
        iconSpan.classList.add(icon);
        
        // Close Task Button Icon container
        let statusToggleSpan: HTMLSpanElement = document.createElement('span');
        statusToggleSpan.classList.add('col-xs-2');
        statusToggleSpan.classList.add('btn');
        statusToggleSpan.classList.add('btn-lg');
        statusToggleSpan.classList.add(status);
        statusToggleSpan.onclick = (e) => {
            toggleTaskStatus(task.id);
            refreshUi();
        }
        statusToggleSpan.appendChild(iconSpan);

        // add Close Task Button to Task element
        element.appendChild(statusToggleSpan);

        // Task text display container
        let displayModalButton: HTMLButtonElement = document.createElement('button');
        displayModalButton.classList.add('col-xs-10');
        displayModalButton.classList.add('ellipsis');
        displayModalButton.classList.add('btn');
        displayModalButton.classList.add('btn-lg');
        displayModalButton.classList.add(status);
        displayModalButton.innerHTML = htmlText;
        displayModalButton.onclick = (e) => displayModalForTask(task.id);

        // add Task text container to Task element
        element.appendChild(displayModalButton);
        
        return element;
    }

    export function generateListElement(text: string): HTMLLIElement {
        var element = document.createElement("li");
        element.id = text;
        element.className = "list-group-item";
        element.onclick = function (e) {
            setFilters(text);
        };
        element.onmouseover = function (e) {
            element.className += " active";
        };
        element.onmouseout = function (e) {
            element.className = element.className.replace(/(( |^)active)/, "");
        };
        element.innerHTML = '<h4 class="ellipsis">' + text + '</h4>';

        return element;
    }

    /**
     * function will attempt to get all tasks and display them
     * in the DOM if any exist.  This will add to any existing tasks so you
     * will need to clear the DOM first if you want to update the entire list
     * instead of just appending to the list.
     */
    export function displayTasks(): void {
        // get the list of selected priorities from the filter
        let filter: string = (document.querySelector("#filter-input") as HTMLInputElement).value;

        // filter list by those matching selected filters
        let filteredTasks: TodoTxtTask[] = TodoTxt.getFilteredTaskArray(filter);

        let hideClosed: boolean = !TodoTxtVault.getConfig().showClosed;
        if (hideClosed) {
            // filter out closed tasks so they aren't in DOM
            let tasks: TodoTxtTask[] = filteredTasks.filter((t) => {
                return t.isActive;
            });
            filteredTasks = tasks;
        }

        if (filteredTasks && filteredTasks.length > 0) {
            // add tasks to DOM
            filteredTasks.forEach((t) => {
                displayTask(t);
            });
        }
    }

    export function displayTask(task: TodoTxtTask): void {
        // add task to DOM
        document.querySelector("#listContainer-div").appendChild(generateTaskElement(task));
    }

    export function removeTask(taskId: string): void {
        // delete the task from the DOM
        document.querySelector("#listContainer-div").removeChild(document.querySelector("#" + taskId));
    }

    /**
     * function opens the specified task in an editing window
     */
    export function displayModalForTask(taskId?: string): void {
        // populate the modal textarea with this task string
        let task: TodoTxtTask;
        let isNew: boolean = false;
        if(taskId) {
            task = TodoTxt.getTask(taskId);
        } else {
            task = new TodoTxtTask();
            isNew = true;
        }

        unbindControlEvents(mainEventHandlers);

        let modal: HTMLDivElement = generateModalElement(task, isNew);
        document.body.appendChild(modal);

        bindControlEvents(modalEventHandlers);

        $(modal).show(0);

        // place focus on the textarea
        (document.querySelector("#modalEdit-textarea") as HTMLElement).focus();
    }

    /**
     * creates a new DOM element to allow editing of an exiting {TodoTxtTask} or addition
     * of a new task
     * @param task {TodoTxtTask} the task object to be edited or null if new Task being added
     * @returns {HTMLDivElement} that allows editing of existing Task
     */
    function generateModalElement(task: TodoTxtTask, isNew: boolean): HTMLDivElement {
        /*************************************************************
         * START: modal header
         *************************************************************/
        // close button icon
        let closeButtonIcon: HTMLSpanElement = document.createElement('span');
        $(closeButtonIcon).attr('aria-hidden', 'true');
        closeButtonIcon.innerHTML = ' &times;';
        
        // close button
        let closeButton: HTMLButtonElement = document.createElement('button');
        closeButton.type = 'button';
        closeButton.id = 'modalEditClose-button';
        closeButton.classList.add('close');
        $(closeButton).attr('data-dismiss', 'modal');
        $(closeButton).attr('aria-label', TodoTxtResources.get('CLOSE'));
        closeButton.onclick = (e) => {
            removeModal();
        };
        closeButton.appendChild(closeButtonIcon);

        // modal title
        let modalTitle: HTMLHeadingElement = document.createElement('h4');
        modalTitle.classList.add('modal-title');
        modalTitle.id = 'modalEdit-label';
        
        // modal header container
        let modalHeader: HTMLDivElement = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalHeader.appendChild(closeButton);
        modalHeader.appendChild(modalTitle);
        /*************************************************************
         * END: modal header
         *************************************************************/

        /*************************************************************
         * START: modal body
         *************************************************************/
        // modal textarea
        let modalTextArea: HTMLDivElement = document.createElement('div');
        modalTextArea.id = 'modalEdit-textarea';
        modalTextArea.classList.add('textarea');
        modalTextArea.contentEditable = 'true';
        let htmlText: string = getMarkupForTask(task).replace(/hidden-xs/,"");
        modalTextArea.innerHTML = htmlText;

        //modal body container
        let modalBody: HTMLDivElement = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.appendChild(modalTextArea);
        /*************************************************************
         * END: modal body
         *************************************************************/

        /************************************************************* 
         * START: modal footer
         *************************************************************/
        // save button label
        let saveButtonLabel: HTMLSpanElement = document.createElement('span');
        saveButtonLabel.classList.add('hidden-xs');
        let txt: string = (isNew) ? TodoTxtResources.get('ADD') : TodoTxtResources.get('UPDATE');
        saveButtonLabel.innerText = ' ' + txt;

        // save button icon
        let saveButtonIcon: HTMLSpanElement = document.createElement('span');
        saveButtonIcon.classList.add('glyphicon');
        saveButtonIcon.classList.add('glyphicon-ok');

        // save button
        let saveButton: HTMLAnchorElement = document.createElement('a');
        saveButton.type = 'button';
        saveButton.id = 'modalEditSave-button';
        saveButton.classList.add('btn');
        saveButton.classList.add('btn-lg');
        saveButton.classList.add('btn-success');
        $(saveButton).attr('data-toggle', 'tooltip');
        $(saveButton).attr('data-placement', 'top');
        $(saveButton).attr('text', txt);
        saveButton.onclick = (e) => {
            saveOrUpdateTaskFromModal();
        };
        saveButton.appendChild(saveButtonIcon);
        saveButton.appendChild(saveButtonLabel);

        // preview button label
        let previewButtonLabel: HTMLSpanElement = document.createElement('span');
        previewButtonLabel.classList.add('hidden-xs');
        previewButtonLabel.innerText = ' ' + TodoTxtResources.get('PREVIEW');

        // preview button icon
        let previewButtonIcon: HTMLSpanElement = document.createElement('span');
        previewButtonIcon.classList.add('glyphicon');
        previewButtonIcon.classList.add('glyphicon-eye-open');

        // preview button
        let previewButton: HTMLAnchorElement = document.createElement('a');
        previewButton.type = 'button';
        previewButton.id = 'modalEditPreview-button';
        previewButton.classList.add('btn');
        previewButton.classList.add('btn-lg');
        previewButton.classList.add('btn-primary');
        $(previewButton).attr('data-toggle', 'tooltip');
        $(previewButton).attr('data-placement', 'top');
        $(previewButton).attr('text', TodoTxtResources.get('PREVIEW'));
        previewButton.onclick = (e) => {
            updateModalPreview();
        };
        previewButton.appendChild(previewButtonIcon);
        previewButton.appendChild(previewButtonLabel);

        // delete button label
        let deleteButtonLabel: HTMLSpanElement = document.createElement('span');
        deleteButtonLabel.classList.add('hidden-xs');
        deleteButtonLabel.innerText = ' ' + TodoTxtResources.get('DELETE');

        // delete button icon
        let deleteButtonIcon: HTMLSpanElement = document.createElement('span');
        deleteButtonIcon.classList.add('glyphicon');
        deleteButtonIcon.classList.add('glyphicon-floppy-remove');

        // delete button
        let deleteButton: HTMLAnchorElement = document.createElement('a');
        deleteButton.type = 'button';
        deleteButton.id = 'modalEditDelete-button';
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-lg');
        deleteButton.classList.add('btn-danger');
        $(deleteButton).attr('data-toggle', 'tooltip');
        $(deleteButton).attr('data-placement', 'top');
        $(deleteButton).attr('text', TodoTxtResources.get('DELETE'));
        deleteButton.onclick = (e) => {
            handleDeleteClick();
        }
        deleteButton.appendChild(deleteButtonIcon);
        deleteButton.appendChild(deleteButtonLabel);

        // footer button group
        let modalFooterButtonGroup: HTMLDivElement = document.createElement('div');
        modalFooterButtonGroup.classList.add('btn-group');
        modalFooterButtonGroup.classList.add('btn-group-justified');
        modalFooterButtonGroup.appendChild(saveButton);
        modalFooterButtonGroup.appendChild(previewButton);
        if (!isNew) {
            modalFooterButtonGroup.appendChild(deleteButton);
        }

        // modal footer container
        let modalFooter: HTMLDivElement = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalFooter.appendChild(modalFooterButtonGroup);
        /************************************************************* 
         * END: modal footer
         *************************************************************/
        
        /************************************************************* 
         * tertiary modal container
         *************************************************************/
        let modalContent: HTMLDivElement = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        
        /*************************************************************
         * secondary modal container
         *************************************************************/
        let modalDialog: HTMLDivElement = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.appendChild(modalContent);
        
        /*************************************************************
         * main modal container
         *************************************************************/
        let modal: HTMLDivElement = document.createElement('div');
        modal.classList.add('modal');
        modal.id = 'modalEdit-div';
        modal.tabIndex = -1;
        $(modal).attr('role', 'dialog');
        $(modal).attr('aria-labelledby', 'modalEdit-label');
        $(modal).attr('aria-hidden', 'true');
        $(modal).attr('task-id', task.id);
        modal.appendChild(modalDialog);

        return modal;
    }

    export function updateModalPreview(): void {
        var el = document.querySelector('#modalEdit-textarea');
        if (el) {
            var text = el.textContent;
            var task = new TodoTxtTask(text);
            el.innerHTML = getMarkupForTask(task);
        }
    }

    export function removeModal(): void {
        unbindControlEvents(modalEventHandlers);
        
        $('#modalEdit-div').remove();

        bindControlEvents(mainEventHandlers);

        refreshUi();
    }

    export const modalEventHandlers: any[] = [
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleAltEnter(e); } },
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleEsc(e); } },
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleAltP(e); } }
    ];

    export function displayPriorities(): void {
        let priList: Element = document.querySelector('#priorities-ul');
        TodoTxtAttributes.priorities.forEach((pri) => {
            // only display active
            if (pri || TodoTxtVault.getConfig().showClosed) {
                var element = generateListElement(pri);
                priList.appendChild(element);
            }
        });
    }

    export function clearPriorities(): void {
        document.querySelector('#priorities-ul').innerHTML = "";
    }

    export function displayProjects(): void {
        let projList: Element = document.querySelector('#projects-ul');
        TodoTxtAttributes.projects.forEach((proj) => {
            // only display active
            if (proj || TodoTxtVault.getConfig().showClosed) {
                var element = generateListElement(proj);
                projList.appendChild(element);
            }
        });
    }

    export function clearProjects(): void {
        document.querySelector('#projects-ul').innerHTML = "";
    }

    export function displayContexts(): void {
        let ctxList: Element = document.querySelector('#contexts-ul');
        TodoTxtAttributes.contexts.forEach((ctx) => {
            // only display active
            if (ctx || TodoTxtVault.getConfig().showClosed) {
                var element = generateListElement(ctx);
                ctxList.appendChild(element);
            }
        });
    }

    export function clearContexts(): void {
        document.querySelector('#contexts-ul').innerHTML = "";
    }

    export const mainEventHandlers: any[] = [
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleAltS(e); } },
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleAltC(e); } },
        { el: () => { return document; }, ev: "keydown", fn: (e: KeyboardEvent) => { handleAltT(e); } },
        { el: () => { return document.querySelector("#fileDrop-div"); }, ev: "dragover", fn: (e: DragEvent) => { handleDragOver(e); } },
        { el: () => { return document.querySelector("#fileDrop-div"); }, ev: "drop", fn: (e: FileDropEvent) => { handleDrop(e); } },
        { el: () => { return document.querySelector("#fileUpload-input"); }, ev: "change", fn: (e: Event) => { handleDrop(e as FileDropEvent); } },
        { el: () => { return document.querySelector("#showClosed-label"); }, ev: "click", fn: () => { 
            toggleShowClosedStatus();
            refreshUi();
        } },
        { el: () => { return document.querySelector("#addTaskButton-button"); }, ev: "click", fn: () => { displayModalForTask(); } },
        { el: () => { return document.querySelector("#saveFileButton-button"); }, ev: "click", fn: () => { exportTodoTxtFile(); } },
        { el: () => { return document.querySelector("#filter-input"); }, ev: "keyup", fn: () => { handleFilter(); } },
        { el: () => { return document.querySelector("#clearFilter-button"); }, ev: "click", fn: () => { refreshUi(); } },
        { el: () => { return document.querySelector("#priorities-div .panel-heading"); }, ev: "click", fn: () => { togglePanel('priorities-div'); } },
        { el: () => { return document.querySelector("#projects-div .panel-heading"); }, ev: "click", fn: () => { togglePanel('projects-div'); } },
        { el: () => { return document.querySelector("#contexts-div .panel-heading"); }, ev: "click", fn: () => { togglePanel('contexts-div'); } },
    ];

    export function bindControlEvents(handlers: any[]): void {
        handlers.forEach(function (handler) {
            var useCapture = false;
            if (handler.uc) {
                useCapture = handler.uc;
            }
            try {
                handler.el().addEventListener(handler.ev, handler.fn, useCapture);
            } catch (e) {
                console.error(e);
            }
        });
    }

    export function unbindControlEvents(handlers: any[]) {
        handlers.forEach(function (handler) {
            var useCapture = false;
            if (handler.uc) {
                useCapture = handler.uc;
            }
            try {
                handler.el().removeEventListener(handler.ev, handler.fn, useCapture);
            } catch (e) {
                console.error(e);
            }
        });
    }

    export function handleAltS(e: KeyboardEvent) {
        if (e.keyCode == 83 && e.altKey) { // Alt + s
            exportTodoTxtFile();
        }
    }

    export function handleAltC(e: KeyboardEvent) {
        if (e.keyCode == 67 && e.altKey) { // Alt + c
            refreshUi();
        }
    }

    export function handleAltT(e: KeyboardEvent) {
        if (e.keyCode == 84 && e.altKey) { // Alt + t
            displayModalForTask();
        }
    }

    export function handleDrop(e: FileDropEvent) {
        handleFileSelect(e);
    }

    export function handleAltEnter(e: KeyboardEvent): void {
        if ((e.keyCode && (e.keyCode === 13 && e.altKey))) { // Alt + Enter
            saveOrUpdateTaskFromModal();
        }
    }

    function saveOrUpdateTaskFromModal(): void {
        let modal: HTMLDivElement = (document.querySelector("#modalEdit-div") as HTMLDivElement);
        let taskId: string = $(modal).attr('task-id');
        let text: string = document.querySelector("#modalEdit-textarea").textContent;
        text = TodoTxtUtils.htmlUnencode(text);
        if (TodoTxt.updateTask(taskId, text)) {
            refreshUi();
            try {
                removeModal();
            } catch (ex) {
                // TODO: log this
            }
        } else {
            // TODO: display error toast
        }
    }

    export function handleEsc(e: KeyboardEvent): void {
        if (e.keyCode === 27 || e.keyCode === 0) { // Esc
            removeModal();
        }
    }

    export function handleDeleteClick(): void {
        let modal: HTMLDivElement = (document.querySelector("#modalEdit-div") as HTMLDivElement);
        let taskId: string = $(modal).attr('task-id');
        let task: TodoTxtTask = TodoTxt.getTask(taskId);
        if (task)
        {
            if (confirm(TodoTxtResources.get("DELETE_CONFIRM") + "\n\t\"" + task.text + "\"")) {
                if (TodoTxtVault.removeTask(taskId)) {
                    refreshUi();
                    try {
                        removeModal();
                    } catch (e) {
                        // TODO: log this
                    }
                } else {
                    // TODO: display error toast
                }
            }
        }
    }

    var filterTimeoutId: number;

    export function handleFilter(): void {
        if (filterTimeoutId) {
            window.clearTimeout(filterTimeoutId);
        }
        filterTimeoutId = window.setTimeout(() => {
            // get the list of selected priorities from the filter
            filterDisplayedTasks();
        }, 500);
    }

    export function handleAltP(e: KeyboardEvent): void {
        if ((e.keyCode && (e.keyCode === 80 && e.altKey))) { // Alt + p
            // update the markup of the displayed task in the Modal
            updateModalPreview();
        }
    }

    /**
     * function will reload the list of tasks from Storage to ensure it
     * is sorted and displaying properly
     */
    export function refreshUi(): void {
        setShowClosed(TodoTxtVault.getConfig().showClosed);

        // unbind any event handling
        unbindControlEvents(mainEventHandlers);

        // clear the UI list
        clearTasks();

        // clear the attributes
        clearPriorities();
        clearProjects();
        clearContexts();

        // clear filter input
        clearFilters();

        // now rebuild UI list from cache
        displayTasks();

        // update the DOM with task attributes
        displayPriorities();
        displayProjects();
        displayContexts();

        // enable keyboard shortcuts and click events for the controls area
        bindControlEvents(mainEventHandlers);
    }

    export function setFilters(filterStr: string): void {
        if (filterStr) {
            // set filter text input
            let input: HTMLInputElement = document.querySelector("#filter-input") as HTMLInputElement;
            input.value = filterStr;
            handleFilter();
        }
    }

    export function clearFilters(): void {
        // update filter input
        (document.querySelector("#filter-input") as HTMLInputElement).value = "";
    }

    export function clearTasks(): void {
        document.querySelector("#listContainer-div").innerHTML = "";
    }

    export function filterDisplayedTasks(): void {
        clearTasks();

        // honors any specified filters
        displayTasks();
    }

    export function toggleShowClosedStatus(): void {
        var el = document.querySelector('#showClosed-label');
        var active = el.className.match(/(( |^)btn-success)/) ? true : false;
        // if active toggle to inactive
        setShowClosed(!active);
    }

    export function setShowClosed(active: boolean): void {
        var el = document.querySelector('#showClosed-label');
        if (active) {
            el.className = el.className.replace(/(( |^)btn-danger)/, " btn-success");
        } else {
            el.className = el.className.replace(/(( |^)btn-success)/, " btn-danger");
        }
        TodoTxtVault.setConfig({showClosed: active});
    }

    export function togglePanel(name: string): void {
        var heading = document.querySelector('#' + name + ' .panel-heading') as HTMLElement;
        var body = document.querySelector('#' + name + ' .panel-body') as HTMLElement;
        var hidden = body.className.match(/(( |^)collapse)/) ? true : false;
        if (hidden) {
            showPanel(heading, body);
        } else {
            hidePanel(heading, body);
        }
    }

    export function showPanel(heading: HTMLElement, body: HTMLElement) {
        var indicator = heading.querySelector(".glyphicon");
        body.className = body.className.replace(/(( |^)collapse)/g, "");
        indicator.className = indicator.className.replace(/(( |^)glyphicon-chevron-down)/, " glyphicon-chevron-up");
    }

    export function hidePanel(heading: HTMLElement, body: HTMLElement) {
        var indicator = heading.querySelector(".glyphicon");
        body.className += " collapse";
        indicator.className = indicator.className.replace(/(( |^)glyphicon-chevron-up)/, " glyphicon-chevron-down");
    }

    export function toggleTaskStatus(taskId: string): void {
        var task = TodoTxt.getTask(taskId);
        if (task) {
            if (task.isActive) {
                TodoTxt.closeTask(taskId);
            } else {
                TodoTxt.activateTask(taskId);
            }
        }
    }

    /**
     * function will retrieve the todo.txt file from the passed in
     * fileName.
     *
     * @param fileName the String name of the todo.txt file to be opened
     * file.
     * EX: "todo.txt"
     */
    export async function getTodoTxtFile(fileName: string): Promise<void> {
        // load via AJAX call to local file system
        await new Promise((resolve, reject) => {
            try {
                $.ajax({
                    url: fileName,
                    cache: false,
                    //crossDomain: true,
                    error: (jqXHR, textStatus) => {
                        // TODO: display a proper error message
                        alert(textStatus);
                    },
                    success: (data) => {
                        // pass the response on to the next call
                        TodoTxt.parseTodoTxtFile(data);
                        refreshUi();
                        resolve();
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    export function handleFileSelect(e: FileDropEvent) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files; // FileList object.

        // files is a FileList of File objects.
        if (files.length > 0) {
            var f = files[0];

            // process using a FileReader
            var reader = new FileReader();

            // get the content as a String
            reader.onloadend = function (e: ProgressEvent<FileReader>) {
                if (confirm(TodoTxtResources.get("OVERWRITE_CONFIRM"))) {
                    TodoTxt.parseTodoTxtFile(e.target.result.toString());
                    refreshUi();
                }
            };
            reader.readAsText(f, "UTF-8");
        }
    }

    export function handleDragOver(e: DragEvent) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
    }

    /**
     * function will allow the user to download a copy of the todo.txt file
     */
    export function exportTodoTxtFile() {
        let tasks: TodoTxtTask[] = TodoTxt.getSortedTaskArray();
        let taskArray: string[] = [];
        
        for (var i=0; i<tasks.length; i++) {
            taskArray.push(tasks[i].text);
        }

        // create the output string to be written
        var content = taskArray.join("\n");

        // set datatype to text/csv to initiate download prompt
        var data = encodeURI("data:text/csv;charset=utf-8," + content);

        window.open(data);
    }

    /**
     * function will generate a html-markup version of the task
     * @param {TodoTxtTask} task - the task to generate for
     * @returns {string} the HTML marked up task text
     */
    export function getMarkupForTask(task: TodoTxtTask): string {
        let text: string = task.text || '';

        // make html compatible
        text = TodoTxtUtils.htmlEncode(text);

        // markup priority
        let priCls: string = getDisplayClassForTask(task);
        text = text.replace(task.priority, "<span class=\"" + priCls + "\"><b>" + task.priority + "</b></span>");

        // markup projects
        let projects: string[] = task.projects;
        projects.forEach((project) => {
            var regex = new RegExp(project.replace(/\+/g, "\\+") + "(?![0-9A-Za-z])", "g");
            text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + project + "</i></b></span>");
        });

        // markup contexts
        let contexts: string[] = task.contexts;
        contexts.forEach((ctx) => {
            var regex = new RegExp(ctx + "(?![0-9A-Za-z])", "g");
            text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + ctx + "</i></b></span>");
        });

        // markup created date
        let date: string = task.createdDate;
        if (date) {
            text = text.replace(date, "<span class=\"text-muted hidden-xs\"><b><i>" + date + "</i></b></span>");
        }

        return text;
    }

    /**
     * function returns the appropriate display classes for this task
     * 
     * @returns {string} the priority based class to apply to a Task element
     */
    export function getDisplayClassForTask(task: TodoTxtTask): string {
        // get a list of the current tasks and iterate through
        let cls: string = '';
        if (task.priority !== null && task.isActive) {
            if (task.priority === "(A)") {
                cls += " text-danger";
            }
            if (task.priority === "(B)") {
                cls += " text-warning";
            }
            if (task.priority === "(C)") {
                cls += " text-primary";
            }
        }

        return cls;
    }

    export function initializeElements(): void {
        /*jshint multistr: true */
        var baseElements = ' \
    <div class="container-fluid" id="fileDrop-div"> \
    <div class="col-md-9"> \
        <div class="row"> \
            <div class="btn-group btn-group-justified"> \
                <a class="btn btn-block btn-primary btn-lg btn-file ellipsis" data-toggle="tooltip" data-placement="top" text="' + TodoTxtResources.get("IMPORT") + '"> \
                    <span class="glyphicon glyphicon-save"></span> <span class="hidden-xs">' + TodoTxtResources.get("IMPORT") + '</span> <input id="fileUpload-input" type="file" placeholder="Select todo.txt File"> \
                </a> \
                <a id="addTaskButton-button" class="btn btn-lg btn-primary ellipsis" data-toggle="tooltip" data-placement="top" text="' + TodoTxtResources.get("ADD_TASK") + '"> \
                    <span class="glyphicon glyphicon-plus"></span> <span class="hidden-xs">' + TodoTxtResources.get("ADD_TASK") + '</span> \
                </a> \
                <a id="saveFileButton-button" class="btn btn-lg btn-primary ellipsis" data-toggle="tooltip" data-placement="top" text="' + TodoTxtResources.get("EXPORT") + '"> \
                    <span class="glyphicon glyphicon-open"></span> <span class="hidden-xs">' + TodoTxtResources.get("EXPORT") + '</span> \
                </a> \
                <a id="showClosed-label" class="btn btn-lg btn-danger ellipsis" data-toggle="tooltip" data-placement="top" text="' + TodoTxtResources.get("SHOW_CLOSED") + '"> \
                    <span class="glyphicon glyphicon-ok-circle"></span> <span class="hidden-xs">' + TodoTxtResources.get("SHOW_CLOSED") + '</span> \
                </a> \
            </div> \
        </div> \
        <div class="row"> \
            <div class="input-group input-group-lg"> \
                <input id="filter-input" type="text" class="form-control" placeholder="' + TodoTxtResources.get("FILTER_PLACEHOLDER_TEXT") + '"> \
                <span class="input-group-btn"> \
                    <button id="clearFilter-button" class="btn btn-primary" type="button" data-toggle="tooltip" data-placement="top" text="' + TodoTxtResources.get("CLEAR_FILTER") + '"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs">' + TodoTxtResources.get("CLEAR_FILTER") + '</span></button> \
                </span> \
            </div> \
        </div> \
        <div class="row"> \
            <div id="listContainer-div"></div> \
        </div> \
    </div> \
    <div class="col-md-3"> \
        <div id="priorities-div" class="panel panel-primary"> \
            <div class="panel-heading"> \
                <h3 class="panel-title"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> ' + TodoTxtResources.get("PRIORITIES") + '</h3> \
            </div> \
            <div class="panel-body"> \
                <ul id="priorities-ul" class="list-group"></ul> \
            </div> \
        </div> \
        <div id="projects-div" class="panel panel-primary"> \
            <div class="panel-heading"> \
                <h3 class="panel-title"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> ' + TodoTxtResources.get("PROJECTS") + '</h3> \
            </div> \
            <div class="panel-body"> \
                <ul id="projects-ul" class="list-group"></ul> \
            </div> \
        </div> \
        <div id="contexts-div" class="panel panel-primary"> \
            <div class="panel-heading"> \
                <h3 class="panel-title"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> ' + TodoTxtResources.get("CONTEXTS") + '</h3> \
            </div> \
            <div class="panel-body"> \
                <ul id="contexts-ul" class="list-group"></ul> \
            </div> \
        </div> \
    </div> \
    </div>';

        var container = document.getElementById('todotxt');
        if (container) {
            container.innerHTML = baseElements;
        }
    }
}