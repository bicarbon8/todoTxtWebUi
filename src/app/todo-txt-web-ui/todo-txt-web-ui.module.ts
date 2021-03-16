import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoTxtWebUiRoutingModule } from './todo-txt-web-ui-routing.module';
import { TodoTxtWebUiComponent } from './todo-txt-web-ui.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [TodoTxtWebUiComponent, TaskListComponent],
  imports: [
    CommonModule,
    TodoTxtWebUiRoutingModule
  ]
})
export class TodoTxtWebUiModule { }
