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
[ResponsiveDemo](https://rawgit.com/bicarbon8/todoTxtWebUi/master/index.html)

FEATURES:
------------
- Can easily be added to any existing webpage by simply adding a ```<div id="todotxt"></div>``` element and the external dependencies
- Allows users to drag-and-drop in their todo.txt file (or select through a file dialog) for instant syncronization with existing task list
- Allows exporting of displayed tasks back out of the browser to the user's local filesystem thereby supporting saving of updates to the task list
- Stores the task list in the browser's localStorage cache so that changes are not lost between browser page reloads / refreshes.
- Allows editing of current task list
- Allows creating of new tasks
- Allows deleting of existing tasks
- Allows filtering of the displayed list of tasks by Priority, Project and Context
- Supports both mouse clicks and keyboard shortcuts for command and control such as adding new tasks, saving edits to tasks, deleting tasks currently being edited, and saving the task list to an external file
- Sorts the task list by Status (closed or active), Priority, Created Date, and then Completed Date with older items (those with an older created date) displaying higher than newer items

EXTERNAL DEPENDENCIES:
------------
- [Bootstrap 3.3.1](http://getbootstrap.com/)
- [JQuery 1.11.1](http://jquery.com/)

RUNNING LOCALLY:
------------
- download the latest from: [github](https://github.com/bicarbon8/todoTxtWebUi/archive/master.zip)
- extract the download and open the ```todoTxtWebUi-master``` folder
- open the ```index.html``` file in a Webkit compatible browser

KEYBOARD SHORTCUTS:
------------
- ```Alt-t``` add a new task
- ```Alt-Enter``` save an open task
- ```Alt-p``` preview changes to an open task
- ```Alt-s``` export tasks
- ```Alt-c``` clear any filters

INCLUDING IN OTHER WEBSITES:
------------
- download the latest bundle from [github](https://rawgit.com/bicarbon8/todoTxtWebUi/master/dist/bundle.js)
- ensure you have the following css and javascript references in your html file:
```html
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css" />
<link rel="stylesheet" type="text/css" href="dist/todo-txt.css" />
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="dist/bundle.js"></script>
```
- place a ```div``` element in your html body with an id of ```todotxt```. Ex: 
```html
<div id="todotxt"></div>
```
- open the webpage and the magic happens automatically :)

# NOTE:
- if you are tracking more than 1000 Tasks, the performance will start to degrade (~5 seconds per add / edit / delete operation)
- it is not recommended to track more than 5000 Tasks
- exporting your _todo-txt_ file will exclude all closed tasks so exporting and re-importing can serve as a way of keeping the number of tracked tasks under control