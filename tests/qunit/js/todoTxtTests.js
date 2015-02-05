/**********************************************************************
 * This javascript was created according to the specifications at
 * http://todotxt.com/ and is intended to allow users to access their
 * todo.txt files in a user-friendly and easy to visualize manner.
 *
 * Once initially uploaded, the todo.txt file will
 * be loaded into an HTML5 localStorage and managed from there.
 * The web page then allows downloading changes back to the user
 * in a txt format compliant with the todo.txt specifications, but
 * having re-sorted the tasks.
 *
 * @Created: 08/14/2012
 * @Author: Jason Holt Smith (bicarbon8@gmail.com)
 * @Version: 0.0.1
 * Copyright (c) 2012 Jason Holt Smith. todoTxtWebUi is distributed under
 * the terms of the GNU General Public License.
 *
 * This file is part of todoTxtWebUi.
 *
 * todoTxtWebUi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * todoTxtWebUi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with todoTxtWebUi.  If not, see <http://www.gnu.org/licenses/>.
 **********************************************************************/
var text = "";
var cases = [];
function setup() {
    text = "sample task" + new Date().getTime();
}
function teardown() {
    localStorage.clear();
}
QUnit.module("TodoTxt", { setup: setup, teardown: teardown });
QUnit.test("can add task to localStorage", function (assert) {
    var task = new TodoTxt.Task(text);
    var actual = localStorage.getItem(task.id);
    assert.equal(actual, null, "expected that localStorage did not already contain this task, but did.");
    TodoTxt.addTask(task);
    actual = localStorage.getItem(task.id);
    assert.equal(actual, text, "expected that localStorage contained task text, but was: " + actual);
});

/**
 * Data-driven tests
 */
cases = [
    { txt: "sample task" + new Date().getTime() },
    { txt: "" }
];
/*jshint loopfunc:true*/
for (var i=0; i<cases.length; i++) {
    (function (p) {
        QUnit.test("can get task from localStorage: " + JSON.stringify(p), function (assert) {
            var task = new TodoTxt.Task(p.txt);
            localStorage.setItem(task.id, p.txt);
            var actual = TodoTxt.getTask(task.id);
            assert.deepEqual(actual, task, "expected task was not returned: " + actual);
        });
    })(cases[i]);
}

QUnit.test("can delete task from localStorage", function (assert) {
    var task = new TodoTxt.Task(text);
    localStorage.setItem(task.id, text);
    var actual = TodoTxt.getTask(task.id);
    assert.deepEqual(actual, task, "expected task was not returned: " + actual);
    TodoTxt.deleteTask(task.id);
    actual = localStorage.getItem(task.id);
    assert.equal(actual, null, "expected task was not deleted.");
});
QUnit.test("can create a task to add to localStorage", function (assert) {
    TodoTxt.createTask(text);
    var found = false;
    for (var i in localStorage) {
        if (localStorage.getItem(i) === text) {
            found = true;
            break;
        }
    }
    assert.ok(found, "did not find newly created task.");
});
QUnit.test("can update an existing task in localStorage", function (assert) {
    TodoTxt.createTask(text);
    var found = null;
    for (var i in localStorage) {
        if (localStorage.getItem(i) === text) {
            found = i;
            break;
        }
    }
    assert.ok(found, "did not find newly created task.");
    text = "new text";
    TodoTxt.updateTask(found, text);
    found = null;
    for (var j in localStorage) {
        if (localStorage.getItem(j) === text) {
            found = j;
            break;
        }
    }
    assert.ok(found, "did not find updated task.");
});
QUnit.test("can close an existing task in localStorage", function (assert) {
    TodoTxt.createTask(text);
    var found = null;
    for (var i in localStorage) {
        if (localStorage.getItem(i) === text) {
            found = i;
            break;
        }
    }
    assert.ok(found, "did not find newly created task.");
    var actual = TodoTxt.closeTask(found);
    assert.ok(actual, true, "expected a true response when task is closed");
    var t = TodoTxt.getTask(found);
    assert.ok(!t.isActive, "task was not closed, but should have been");
    assert.ok(t.toString().match(/^(x )[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}( )/), "closed task did not match expected format");
});
QUnit.test("can activate an existing closed task in localStorage", function (assert) {
    var expectedText = text;
    text = "x 1999-01-04 " + text;
    TodoTxt.createTask(text);
    var found = null;
    for (var i in localStorage) {
        if (localStorage.getItem(i) === text) {
            found = i;
            break;
        }
    }
    assert.ok(found, "did not find newly created task.");
    var actual = TodoTxt.activateTask(found);
    assert.ok(actual, true, "expected a true response when task is activated");
    var t = TodoTxt.getTask(found);
    assert.ok(t.isActive, "task was not active, but should have been");
    assert.equal(t.toString(), expectedText, "activated task did not match expected format");
});

/**
 * Data-driven tests
 */
cases = [
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15 is", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "x 15 ask it", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "@note", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "+Task", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "+Task @note", expectFound: true },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "@note +Task", expectFound: false },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: "John", expectFound: false },
     { str: "x 2015-01-03 2015-01-01 this is a +Task with a @note in it", filter: ".*", expectFound: false },
];
/*jshint loopfunc:true*/
for (var i=0; i<cases.length; i++) {
    (function (p) {
        QUnit.test("can filter tasks: " + JSON.stringify(p), function (assert) {
            // create task
            TodoTxt.createTask(p.str);
            var actual = TodoTxt.getFilteredTaskArray(p.filter);
            if (p.expectFound) {
                assert.ok(actual.length === 1);
            } else {
                assert.ok(actual.length === 0);
            }
        });
    })(cases[i]);
}
