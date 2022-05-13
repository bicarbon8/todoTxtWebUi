# todoTxtWebUi ![build status](https://travis-ci.org/bicarbon8/todoTxtWebUi.svg)

@Created: 08/14/2012

@Author: Jason Holt Smith (<bicarbon8@gmail.com>)

## DESCRIPTION:

A web UI to use with a todo.txt file.  This project is an extention to the <http://www.todotxt.com> project
providing a rich web user interface for interacting with one's todo.txt file.  The requirements of this
project are that it only use HTML, Javascript and CSS to accomplish all functionality in a Webkit
compatible browser.  There must be no back-end server code, no local executables and no browser plugins
utilized in supporting the functionality of this project.

## DEMO:

[ResponsiveDemo](https://bicarbon8.github.io/todoTxtWebUi/)

## FEATURES:

- Allows exporting of displayed tasks back out of the browser to the user's local filesystem thereby supporting saving of updates to the task list
- Stores the task list in the browser's localStorage cache so that changes are not lost between browser page reloads / refreshes.
- Allows editing of current task list
- Allows creating of new tasks
- Allows deleting of existing tasks
- Allows filtering of the displayed list of tasks by Priority, Project and Context
- Supports both mouse clicks and keyboard shortcuts for command and control such as adding new tasks, saving edits to tasks, deleting tasks currently being edited, and saving the task list to an external file
- Sorts the task list by Status (closed or active), Priority, Created Date, and then Completed Date with older items (those with an older created date) displaying higher than newer items

## EXTERNAL DEPENDENCIES:

- [Angular.11](https://angular.io/)

## RUNNING LOCALLY:

- download the latest from: [github](https://github.com/bicarbon8/todoTxtWebUi/archive/master.zip)
- extract the download and open the `todoTxtWebUi-master` folder
- install dependencies using `npm install`
- install the Angular CLI using `npm i -g angular-cli`
- run using `ng serve`
- open your browser to http://localhost:4200

## KEYBOARD SHORTCUTS:

- `Enter` save an open task
- `Esc` discard edits to an open task

## INCLUDING IN OTHER WEBSITES:

- add this repository as a sub-module. (see: [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- from your Angular application's router module add the following:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  ...
  { path: 'todoTxtWebUi', loadChildren: () => import('todoTxtWebUi/src/app/todo-txt-web-ui/todo-txt-web-ui.module').then((m) => m.TodoTxtWebUiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
- within your running Angular application navigate to `http://your-app/todoTxtWebUi`

## NOTE:
- if you are tracking more than 1000 Tasks, the performance will start to degrade (~5 seconds per add / edit / delete operation)
- it is not recommended to track more than 5000 Tasks
- exporting your _todo-txt_ file will only include the currently visible tasks so exporting and re-importing can serve as a way of keeping the number of tracked tasks under control if you export when closed tasks are not visible

## Contributing to the Project:

- create a Fork of the repo in _GitHub_
- clone the code using `git clone https://github.com/<your-project-area>/todoTxtWebUi todoTxtWebUi` where `<your-project-area>` is replaced with the location of your Fork
- run `npm install` to install all dev dependencies
- build using `npm run build`
- test using `npm test:all`
- when you are happy with your changes and all tests pass, run `npm run build:prod` commit the generated `./docs` directory and submit a Pull Request back to the _master_ branch at `https://github.com/bicarbon8/todoTxtWebUi`
