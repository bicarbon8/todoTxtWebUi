import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TodoTxtUtils } from '../helpers/todo-txt-utils';
import { TodoTxtVault } from '../storage/todo-txt-vault';
import { TodoTxtTask } from '../tasks/todo-txt-task';
import { TodoTxtTaskParser } from '../tasks/todo-txt-task-parser';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  editingTask: string;

  constructor(private sanitiser: DomSanitizer) {

  }

  async click_MarkComplete(id: string): Promise<void> {
    let t: TodoTxtTask = TodoTxtVault.getTask(id);
    t.completedDate = TodoTxtUtils.formatDate(new Date());
    t.isActive = false;
    TodoTxtVault.addTasks(t);
  }

  async click_MarkActive(id: string): Promise<void> {
    let t: TodoTxtTask = TodoTxtVault.getTask(id);
    t.completedDate = undefined;
    t.isActive = true;
    TodoTxtVault.addTasks(t);
  }
  
  async click_EditTask(id: string): Promise<void> {
    this.editingTask = id;
  }

  async click_SaveTaskEdit(id: string): Promise<void> {
    let text: string = document.querySelector<HTMLDivElement>(`#textarea_${id}`).innerText;
    let task: TodoTxtTask = TodoTxtTaskParser.parseInput(text)[0];
    task.id = id;
    TodoTxtVault.addTasks(task);
    this.editingTask = null;
  }

  async click_CancelTaskEdit(): Promise<void> {
    this.editingTask = null;
  }

  async click_DeleteTask(id: string): Promise<void> {
    TodoTxtVault.removeTask(id);
    this.editingTask = null;
  }

  getTasks(): TodoTxtTask[] {
    let tasks: TodoTxtTask[] = TodoTxtVault.getAllTasks();
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
   getMarkupForTask(id: string): SafeHtml {
    let task: TodoTxtTask = TodoTxtVault.getTask(id);  
    let text: string = task.text || '';

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
