import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => loadRemoteModule({
    type: 'module',
    remoteEntry: './remoteEntry.js',
    exposedModule: './Module'
  }).then((m) => m.TodoTxtWebUiModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
