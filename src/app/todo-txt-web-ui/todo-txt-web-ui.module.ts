import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoTxtWebUiRoutingModule } from './todo-txt-web-ui-routing.module';
import { TodoTxtWebUiComponent } from './todo-txt-web-ui.component';
import { MainControlsComponent } from './main-controls/main-controls.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [TodoTxtWebUiComponent, MainControlsComponent, TaskFilterComponent, TaskListComponent],
  imports: [
    CommonModule,
    TodoTxtWebUiRoutingModule
  ]
})
export class TodoTxtWebUiModule { }
