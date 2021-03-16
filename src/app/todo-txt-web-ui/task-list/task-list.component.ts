import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { Key } from 'selenium-webdriver';
import { TodoTxtUtils } from '../helpers/todo-txt-utils';
import { TodoTxtConfig } from '../storage/todo-txt-config';
import { TodoTxtVault } from '../storage/todo-txt-vault';
import { TodoTxtTask } from '../tasks/todo-txt-task';
import { TodoTxtTaskParser } from '../tasks/todo-txt-task-parser';
import { TodoTxt } from '../todo-txt';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  requiredFileType: string = '.txt';
  fileName: string;
  downloadFileName: string;
  isDirty: boolean;
  showClosed: boolean;
  downloadUrl: SafeUrl;
  filterStr: string;
  editingTaskId: string;
  isAddingNew: boolean;

  constructor(private sanitiser: DomSanitizer) {
    this.isDirty = false;
    this.showClosed = TodoTxtVault.getConfig().showClosed;
    this.downloadFileName = 'todo.txt';
  }

  async toggleShowClosed(): Promise<void> {
    let cfg: TodoTxtConfig = TodoTxtVault.getConfig();
    cfg.showClosed = !cfg.showClosed;
    this.showClosed = cfg.showClosed;
    TodoTxtVault.setConfig(cfg);
  }
  
  async processToDoFile(event: any): Promise<void> {
    if (event) {
      let files: File[] = event.target?.files;
      if (files && files.length > 0) {
        let file: File = files[0];
        if (file) {
          TodoTxtVault.removeAllTasks();
          this.fileName = file.name;
          this.downloadFileName = this.fileName;
          let text: string = await file.text();
          let lines: string[] = text.split('\n');
          TodoTxtVault.addTasks(...TodoTxtTaskParser.parseMany(...lines));
        }
      }
    }
  }

  @HostListener('keydown.alt.t')
  async click_AddTask(): Promise<boolean> {
    this.isAddingNew = true;
    let t: TodoTxtTask = TodoTxtTaskParser.parse('');
    TodoTxt.addTask(t);
    this.click_StartEditTask(t.id);
    this.isDirty = true;
    return false;
  }

  async click_SaveTasks(): Promise<void> {
    let data: string = this.getTasks().map((t) => t.text?.trim())?.join('\n');
    if (data) {
      let blob = new Blob([data], { type: 'data:attachment/text; charset=utf-8' });
      saveAs(blob, this.downloadFileName);
    }
    this.isDirty = false;
  }

  async keyup_UpdateFilter(filter: string): Promise<void> {
    this.filterStr = filter;
  }

  async click_ClearFilter(event: any): Promise<void> {
    this.filterStr = null;
    event.target.value = undefined;
  }

  async click_MarkComplete(id: string): Promise<void> {
    TodoTxt.closeTask(id);
  }

  async click_MarkActive(id: string): Promise<void> {
    TodoTxt.activateTask(id);
  }
  
  async click_StartEditTask(id: string): Promise<void> {
    this.editingTaskId = id;
  }

  @HostListener('keydown.alt.enter')
  async click_SaveTaskEdit(id: string): Promise<boolean> {
    let text: string = document.querySelector<HTMLDivElement>(`#textarea_${id}`).innerText;
    TodoTxt.updateTask(id, text);
    this.isDirty = true;
    this.doneEditing();
    return false;
  }

  @HostListener('keydown.alt.esc')
  async click_CancelTaskEdit(): Promise<boolean> {
    if (this.isAddingNew) {
      this.click_DeleteTask(this.editingTaskId);
    }
    this.doneEditing();
    return false;
  }

  async click_DeleteTask(id: string): Promise<void> {
    TodoTxtVault.removeTask(id);
    this.isDirty = true;
    this.doneEditing();
  }

  doneEditing(): void {
    this.editingTaskId = null;
    this.isAddingNew = false;
  }

  getTasks(): TodoTxtTask[] {
    let tasks: TodoTxtTask[] = TodoTxt.getFilteredTaskArray(this.filterStr);
    if (!TodoTxtVault.getConfig().showClosed) {
      let active: TodoTxtTask[] = [];
      for (var i=0; i<tasks.length; i++) {
        if (tasks[i].isActive) {
          active.push(tasks[i]);
        }
      }
      tasks = active;
    }
    return tasks;
  }

  /**
   * function will generate a html-markup version of the task
   * @param {TodoTxtTask} task - the task to generate for
   * @returns {string} the HTML marked up task text
   */
   getMarkupForTask(text: string): SafeHtml {
      let task: TodoTxtTask = TodoTxtTaskParser.parse(text);
      // make html compatible
      text = TodoTxtUtils.htmlEncode(text);

      // markup priority
      let priCls: string = this.getDisplayClassForTask(task);
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

      return this.sanitiser.bypassSecurityTrustHtml(text);
  }
  
  getDisplayClassForTask(task: TodoTxtTask): string {
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
}
