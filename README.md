todoTxtWebUi ![build status](https://travis-ci.org/bicarbon8/todoTxtWebUi.svg)
============
@Created: 08/14/2012

@Author: Jason Holt Smith (<bicarbon8@gmail.com>)

DESCRIPTION:
------------
A web UI to use with a todo.txt file.  This project is an extention to the <http://www.todotxt.com> project
providing a rich web user interface for interacting with one's todo.txt file.  The requirements of this
project are that it only use HTML, Javascript and CSS to accomplish all functionality in a Webkit
compatible browser.  There must be no back-end server code, no local executables and no browser plugins
utilized in supporting the functionality of this project.

DEMO:
------------
[ResponsiveDemo](https://rawgit.com/bicarbon8/todoTxtWebUi/master/examples/mobile/index.html)

FEATURES:
------------
- Allows users to drag-and-drop in their todo.txt file (or select through a file dialog) for instant 
syncronization with existing task list
- Allows exporting of displayed tasks back out of the browser to the user's local filesystem thereby
supporting saving of updates to the task list
- Stores the task list in the browser's localStorage cache so that changes are not lost between browser
page reloads / refreshes.
- Allows editing of current task list
- Allows creating of new tasks
- Allows deleting of existing tasks
- Allows filtering of the displayed list of tasks by Priority, Project and Context
- Supports both mouse clicks and keyboard shortcuts for command and control such as adding new tasks, 
saving edits to tasks, deleting tasks currently being edited, and saving the task list to an external file
- Sorts the task list by Status (closed or active), Priority, Created Date, and then Completed Date with
older items (those with an older created date) displaying higher than newer items
