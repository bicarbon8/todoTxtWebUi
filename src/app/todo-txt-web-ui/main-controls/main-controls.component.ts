import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { TodoTxtConfig } from '../storage/todo-txt-config';
import { TodoTxtVault } from '../storage/todo-txt-vault';
import { TodoTxtTaskParser } from '../tasks/todo-txt-task-parser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-main-controls',
  templateUrl: './main-controls.component.html',
  styleUrls: ['./main-controls.component.css']
})
export class MainControlsComponent implements OnInit {
  requiredFileType: string = '.txt';
  fileName: string;
  downloadFileName: string;
  isDirty: boolean;
  showClosed: boolean;
  downloadUrl: SafeUrl;

  constructor() {
    this.isDirty = false;
    this.showClosed = TodoTxtVault.getConfig().showClosed;
    this.downloadFileName = 'todo.txt';
  }

  ngOnInit(): void {
    
  }

  async toggleShowClosed(): Promise<void> {
    let cfg: TodoTxtConfig = TodoTxtVault.getConfig();
    cfg.showClosed = !cfg.showClosed;
    this.showClosed = cfg.showClosed;
    TodoTxtVault.setConfig(cfg);
  }
  
  async processToDoFile(event): Promise<void> {
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
          TodoTxtVault.addTasks(...TodoTxtTaskParser.parseInput(...lines));
        }
      }
    }
  }

  async click_AddTask(): Promise<void> {
    // TODO: display modal
    this.isDirty = true;
  }

  async click_SaveTasks(): Promise<void> {
    let data: string = TodoTxtVault.getAllTasks()?.map((t) => t.text)?.join('\n');
    if (data) {
      let blob = new Blob([data], { type: 'data:attachment/text; charset=utf-8' });
      saveAs(blob, this.downloadFileName);
    }
    this.isDirty = false;
  }
}
