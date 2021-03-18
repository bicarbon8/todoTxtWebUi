import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoTxtWebUiRoutingModule } from './todo-txt-web-ui-routing.module';
import { TodoTxtWebUiComponent } from './todo-txt-web-ui.component';


@NgModule({
  declarations: [TodoTxtWebUiComponent],
  imports: [
    CommonModule,
    TodoTxtWebUiRoutingModule
  ]
})
export class TodoTxtWebUiModule { }
