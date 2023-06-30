import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoTxtWebUiComponent } from './todo-txt-web-ui.component';

const routes: Routes = [
  { path: '', component: TodoTxtWebUiComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoTxtWebUiRoutingModule { }
