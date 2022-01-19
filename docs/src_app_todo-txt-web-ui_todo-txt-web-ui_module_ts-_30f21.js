(self["webpackChunktodoTxtWebUi"] = self["webpackChunktodoTxtWebUi"] || []).push([["src_app_todo-txt-web-ui_todo-txt-web-ui_module_ts-_30f21"],{

/***/ 4414:
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/helpers/todo-txt-utils.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtUtils": () => (/* binding */ TodoTxtUtils)
/* harmony export */ });
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
/**
 * Utility methods used by the project library
 * @namespace
 */
var TodoTxtUtils;
(function (TodoTxtUtils) {
    /**
     * function will format a Date object to a string of YYYY-MM-DD
     * @returns {string} formatted date
     */
    function formatDate(dateObj) {
        var yyyy = dateObj.getFullYear();
        var mm = (dateObj.getMonth() + 1).toString(); // getMonth() is zero-based
        mm = mm.length < 2 ? "0" + mm : mm;
        var dd = (dateObj.getDate()).toString();
        dd = dd.length < 2 ? "0" + dd : dd;
        return String(yyyy + "-" + mm + "-" + dd); // Leading zeros for mm and dd
    }
    TodoTxtUtils.formatDate = formatDate;
    /**
     * function will get the current browser language-locale
     * @returns {string} a ISO language-locale for the browser
     */
    function getLanguage() {
        var langLocale = window.navigator["userLanguage"] || window.navigator.language;
        return langLocale.toLowerCase();
    }
    TodoTxtUtils.getLanguage = getLanguage;
    /**
     * function generates a GUID
     * @returns {string} a GUID (NNNNNNNN-NNNN-NNNN-NNNN-NNNNNNNNNNNN)
     */
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    TodoTxtUtils.guid = guid;
    /**
     * function will strip out any characters from the passed in string that are
     * not compatible with html and replace with html-friendly versions
     * @param {string} str - the string to be html encoded
     * @returns {string} a html encoded version of the string that can be used safely
     * within a html page
     */
    function htmlEncode(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/\s{2}/g, ' &nbsp;');
    }
    TodoTxtUtils.htmlEncode = htmlEncode;
    /**
     * function will strip out any characters from the passed in string that are
     * html character entities and replace with standard string versions
     * @param {string} str - the string to be html unencoded
     * @returns {string} a version of the string that can contains non-html-friendly
     * strings
     */
    function htmlUnencode(str) {
        return String(str)
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&nbsp;/g, ' ');
    }
    TodoTxtUtils.htmlUnencode = htmlUnencode;
})(TodoTxtUtils || (TodoTxtUtils = {}));


/***/ }),

/***/ 8885:
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/storage/todo-txt-vault.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtVault": () => (/* binding */ TodoTxtVault)
/* harmony export */ });
var TodoTxtVault;
(function (TodoTxtVault) {
    var _tasks = new Map();
    var config = { showClosed: false };
    var cacheError = 0;
    function addTasks(...tasks) {
        if (tasks) {
            for (var i = 0; i < tasks.length; i++) {
                let task = tasks[i];
                _tasks.set(task.id, task);
                persist();
            }
        }
    }
    TodoTxtVault.addTasks = addTasks;
    function removeTask(taskId) {
        let found = false;
        if (_tasks.has(taskId)) {
            _tasks.delete(taskId);
            found = true;
        }
        persist();
        return found;
    }
    TodoTxtVault.removeTask = removeTask;
    function removeAllTasks() {
        _tasks = new Map();
        persist();
    }
    TodoTxtVault.removeAllTasks = removeAllTasks;
    function getTask(taskId) {
        load();
        if (_tasks.has(taskId)) {
            return _tasks.get(taskId);
        }
        throw new Error(`no TodoTxtTask with ID of '${taskId}' could be found`);
    }
    TodoTxtVault.getTask = getTask;
    function getAllTasks() {
        load();
        let ts = [];
        _tasks.forEach((value) => {
            ts.push(value);
        });
        return ts;
    }
    TodoTxtVault.getAllTasks = getAllTasks;
    function getConfig() {
        load();
        return config;
    }
    TodoTxtVault.getConfig = getConfig;
    function setConfig(cfg) {
        config = cfg;
        persist();
    }
    TodoTxtVault.setConfig = setConfig;
    function persist() {
        try {
            let cache = { tasks: Array.from(_tasks.values()), config: config };
            localStorage.setItem('todo-txt', JSON.stringify(cache));
        }
        catch (e) {
            if (cacheError == 0) {
                // TODO: move this to TodoTxtView and present as Modal on startup
                alert('WARNING: unable to store Tasks in localStorage; ensure you export your tasks before you close the browser or they will be lost!');
                console.error(`TodoTxt unable to cache data in localStorage due to: ${e}`);
                cacheError++;
            }
        }
    }
    function load() {
        try {
            let persistance = localStorage.getItem('todo-txt');
            if (persistance) {
                let cache = JSON.parse(persistance);
                if (cache.tasks) {
                    _tasks.clear();
                    for (var i = 0; i < cache.tasks.length; i++) {
                        _tasks.set(cache.tasks[i].id, cache.tasks[i]);
                    }
                    config = cache.config;
                }
            }
        }
        catch (e) {
            if (cacheError == 0) {
                console.info(`TodoTxt unable to load cache from localStorage due to: ${e}`);
            }
        }
    }
    /**
     * WARNING!! removes all cached data including tasks and configuration.
     * only to be used after you've exported your tasks to a file
     */
    function _clear() {
        _tasks = new Map();
        config = { showClosed: false };
        localStorage.removeItem('todo-txt');
    }
    TodoTxtVault._clear = _clear;
})(TodoTxtVault || (TodoTxtVault = {}));


/***/ }),

/***/ 1986:
/*!**************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/tasks/todo-txt-attributes.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtAttributes": () => (/* binding */ TodoTxtAttributes)
/* harmony export */ });
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
var TodoTxtAttributes;
(function (TodoTxtAttributes) {
    TodoTxtAttributes.priorities = new Set();
    TodoTxtAttributes.projects = new Set();
    TodoTxtAttributes.contexts = new Set();
    function reset() {
        TodoTxtAttributes.priorities = new Set();
        TodoTxtAttributes.projects = new Set();
        TodoTxtAttributes.contexts = new Set();
    }
    TodoTxtAttributes.reset = reset;
})(TodoTxtAttributes || (TodoTxtAttributes = {}));


/***/ }),

/***/ 6157:
/*!***************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/tasks/todo-txt-task-parser.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtTaskParser": () => (/* binding */ TodoTxtTaskParser)
/* harmony export */ });
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/todo-txt-utils */ 4414);

var TodoTxtTaskParser;
(function (TodoTxtTaskParser) {
    function get(text) {
        let task = {
            id: _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_0__.TodoTxtUtils.guid(),
            text: text,
            isActive: getIsActive(text),
            priority: getPriority(text),
            completedDate: getCompletedDate(text),
            createdDate: getCreatedDate(text),
            projects: getProjects(text),
            contexts: getContexts(text)
        };
        return task;
    }
    TodoTxtTaskParser.get = get;
    function getMany(...texts) {
        let tasks = [];
        if (texts) {
            for (var i = 0; i < texts.length; i++) {
                tasks.push(get(texts[i]));
            }
        }
        return tasks;
    }
    TodoTxtTaskParser.getMany = getMany;
    function getIsActive(str) {
        // check for strings starting with something like "x "
        let match = str.match(/^(x )/);
        if (match && match.length > 0) {
            return false;
        }
        return true;
    }
    function getPriority(str) {
        let pri;
        if (str) {
            // parse out the priority RegEx: /\^([A-Z]\).*/ 
            // check for strings starting with something like "(A) "
            let priPattern = /^(\([A-Z]\)[\s]+)/;
            var match = str.match(priPattern); // returns null if not found
            if (match) {
                // found an active match so get the priority
                pri = match[0].replace(/[\s]*/g, "");
            }
        }
        return pri;
    }
    function getCompletedDate(str) {
        var completed;
        // parse out the completedDate if closed (starts with "x ")
        if (!getIsActive(str)) {
            let dates = getDatesFromText(str);
            if (dates) {
                completed = dates[0] ? dates[0].replace(/[\s]*/g, "") : undefined;
            }
        }
        return completed;
    }
    function getCreatedDate(str) {
        var created;
        // parse out the createdDate (will be 2nd if item is closed)
        let dates = getDatesFromText(str);
        if (dates) {
            if (!getIsActive(str)) {
                if (dates.length > 1) { // we have created and completed
                    created = dates[1] ? dates[1].replace(/[\s]*/g, "") : undefined;
                }
                // only 1 date and is completed so no created date
            }
            else {
                created = dates[0] ? dates[0].replace(/[\s]*/g, "") : undefined;
            }
        }
        return created;
    }
    function getDatesFromText(str) {
        var dates = [];
        if (str) {
            // check for strings with something like "2012-08-09"
            let datePattern = /(?:\s|^)(\d{4}-\d{2}-\d{2})(?=\s)/g;
            let match = str.match(datePattern); // returns null if not found
            if (match) {
                for (var i = 0; i < match.length; i++) {
                    dates.push(match[i]);
                }
            }
        }
        return dates;
    }
    function getProjects(str) {
        var tmpSet = new Set(); // used to hold the project if set
        if (str) {
            // parse out the projects RegEx: /\+[0-9A-Za-z]+\s/ (words starting with "+")
            // check for strings like "+ABC123"
            var projPattern = /((\s|^)[\(\{\["']?\+[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
            var match = str.match(projPattern); // returns null if not found
            if (match) {
                // only store one instance of duplicate project entries
                for (var i = 0; i < match.length; i++) {
                    var p = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");
                    ;
                    tmpSet.add(p);
                }
            }
        }
        return Array.from(tmpSet);
    }
    function getContexts(str) {
        var tmpSet = new Set(); // used to hold the context if set
        if (str) {
            // parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "@")
            // check for strings like "@ABC123"
            var ctxPattern = /((\s|^)[\(\{\["']?\@[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g;
            var match = str.match(ctxPattern); // returns null if not found
            if (match) {
                // only store one instance of duplicate project entries
                for (var i = 0; i < match.length; i++) {
                    var c = match[i].replace(/[\s]*/g, "").replace(/[\(\{\[\)\}\]"']/g, "");
                    ;
                    tmpSet.add(c);
                }
            }
        }
        return Array.from(tmpSet);
    }
})(TodoTxtTaskParser || (TodoTxtTaskParser = {}));


/***/ }),

/***/ 354:
/*!*******************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtWebUiRoutingModule": () => (/* binding */ TodoTxtWebUiRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 3464);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-txt-web-ui.component */ 2565);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 8802);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_2__);




const routes = [
    { path: '', component: _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__.TodoTxtWebUiComponent }
];
class TodoTxtWebUiRoutingModule {
}
TodoTxtWebUiRoutingModule.ɵfac = function TodoTxtWebUiRoutingModule_Factory(t) { return new (t || TodoTxtWebUiRoutingModule)(); };
TodoTxtWebUiRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TodoTxtWebUiRoutingModule });
TodoTxtWebUiRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TodoTxtWebUiRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule] }); })();


/***/ }),

/***/ 2565:
/*!**************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtWebUiComponent": () => (/* binding */ TodoTxtWebUiComponent)
/* harmony export */ });
/* harmony import */ var _Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/todo-txt-utils */ 4414);
/* harmony import */ var _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/todo-txt-vault */ 8885);
/* harmony import */ var _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks/todo-txt-task-parser */ 6157);
/* harmony import */ var _todo_txt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todo-txt */ 8739);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! file-saver */ 5226);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tasks/todo-txt-attributes */ 1986);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 8802);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 1643);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_angular_common__WEBPACK_IMPORTED_MODULE_8__);











function TodoTxtWebUiComponent_div_32_div_1_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r11.click_MarkComplete(t_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}

function TodoTxtWebUiComponent_div_32_div_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r14.click_MarkActive(t_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}

function TodoTxtWebUiComponent_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, TodoTxtWebUiComponent_div_32_div_1_button_1_Template, 2, 0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, TodoTxtWebUiComponent_div_32_div_1_button_2_Template, 2, 0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r19);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r17.click_StartEditTask(t_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", t_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !t_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMapInterpolate1"]("btn btn-lg ", t_r6.isActive ? "btn-light" : "btn-outline-success", " text-start w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", ctx_r7.getMarkupForTask(t_r6.text), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
  }
}

function TodoTxtWebUiComponent_div_32_div_2_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_button_11_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r22.click_DeleteTask(t_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Delete Task");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}

function TodoTxtWebUiComponent_div_32_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keydown.enter", function TodoTxtWebUiComponent_div_32_div_2_Template_div_keydown_enter_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r25.click_SaveTaskEdit(t_r6.id);
    })("keydown.esc", function TodoTxtWebUiComponent_div_32_div_2_Template_div_keydown_esc_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return ctx_r28.click_CancelTaskEdit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return ctx_r29.click_SaveTaskEdit(t_r6.id);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "i", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return ctx_r31.click_CancelTaskEdit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "i", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, " Discard Changes");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, TodoTxtWebUiComponent_div_32_div_2_button_11_Template, 4, 0, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("id", "textarea_", t_r6.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", ctx_r8.getMarkupForTask(t_r6.text), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r8.isAddingNew ? "Save" : "Update", " Task");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r8.isAddingNew);
  }
}

function TodoTxtWebUiComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, TodoTxtWebUiComponent_div_32_div_1_Template, 4, 6, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, TodoTxtWebUiComponent_div_32_div_2_Template, 12, 4, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.editingTaskId != t_r6.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.editingTaskId == t_r6.id);
  }
}

function TodoTxtWebUiComponent_button_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_40_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r35);
      const p_r33 = restoredCtx.$implicit;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);

      ctx_r34.keyup_UpdateFilter(p_r33);
      return _r1.value = p_r33;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const p_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("title", "Filter by ", p_r33, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r33, "");
  }
}

function TodoTxtWebUiComponent_button_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_46_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r38);
      const p_r36 = restoredCtx.$implicit;
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);

      ctx_r37.keyup_UpdateFilter(p_r36);
      return _r1.value = p_r36;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const p_r36 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("title", "Filter by ", p_r36, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r36, "");
  }
}

function TodoTxtWebUiComponent_button_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_52_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r41);
      const p_r39 = restoredCtx.$implicit;
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);

      ctx_r40.keyup_UpdateFilter(p_r39);
      return _r1.value = p_r39;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const p_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("title", "Filter by ", p_r39, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r39, "");
  }
}

class TodoTxtWebUiComponent {
  constructor(sanitiser) {
    this.sanitiser = sanitiser;
    this.requiredFileType = '.txt';
    this.isDirty = false;
    this.showClosed = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.getConfig().showClosed;
    this.downloadFileName = 'todo.txt';
  }

  toggleShowClosed() {
    var _this = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let cfg = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.getConfig();
      cfg.showClosed = !cfg.showClosed;
      _this.showClosed = cfg.showClosed;
      _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.setConfig(cfg);
    })();
  }

  processToDoFile(event) {
    var _this2 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (event) {
        let files = event.target?.files;

        if (files && files.length > 0) {
          let file = files[0];

          if (file) {
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.removeAllTasks();
            _this2.fileName = file.name;
            _this2.downloadFileName = _this2.fileName;
            let text = yield file.text();
            let lines = text.split('\n');
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.addTasks(..._tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__.TodoTxtTaskParser.getMany(...lines));
          }
        }
      }
    })();
  }

  click_AddTask() {
    var _this3 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.isAddingNew = true;
      let t = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__.TodoTxtTaskParser.get('');
      _todo_txt__WEBPACK_IMPORTED_MODULE_4__.TodoTxt.addTask(t);

      _this3.click_StartEditTask(t.id);

      _this3.isDirty = true;
      return false;
    })();
  }

  click_SaveTasks() {
    var _this4 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let data = _this4.getTasks().map(t => t.text?.trim())?.join('\n');

      if (data) {
        let blob = new Blob([data], {
          type: 'data:attachment/text; charset=utf-8'
        });
        (0,file_saver__WEBPACK_IMPORTED_MODULE_5__.saveAs)(blob, _this4.downloadFileName);
      }

      _this4.isDirty = false;
    })();
  }

  keyup_UpdateFilter(filter) {
    var _this5 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this5.filterStr = filter;
    })();
  }

  click_ClearFilter(event) {
    var _this6 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this6.filterStr = null;
      event.target.value = undefined;
    })();
  }

  click_MarkComplete(id) {
    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _todo_txt__WEBPACK_IMPORTED_MODULE_4__.TodoTxt.closeTask(id);
    })();
  }

  click_MarkActive(id) {
    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _todo_txt__WEBPACK_IMPORTED_MODULE_4__.TodoTxt.activateTask(id);
    })();
  }

  click_StartEditTask(id) {
    var _this7 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this7.editingTaskId = id;
      setTimeout(() => _this7.setFocus(id), 0);
    })();
  }

  setFocus(id) {
    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let div = document.getElementById(`textarea_${id}`);

      if (div) {
        console.info(`found element 'textarea_${id}'`);
        div.focus(); // let s = window.getSelection();
        // let r = document.createRange();
        // r.setStart(div, 0);
        // r.setEnd(div, 0);
        // s.removeAllRanges();
        // s.addRange(r);
      } else {
        console.warn(`unable to find element 'textarea_${id}'`);
      }
    })();
  }

  click_SaveTaskEdit(id) {
    var _this8 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let text = document.querySelector(`#textarea_${id}`).innerText;
      _todo_txt__WEBPACK_IMPORTED_MODULE_4__.TodoTxt.updateTask(id, text);
      _this8.isDirty = true;

      _this8.doneEditing();

      return false;
    })();
  }

  click_CancelTaskEdit() {
    var _this9 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this9.isAddingNew) {
        _this9.click_DeleteTask(_this9.editingTaskId);
      }

      _this9.doneEditing();

      return false;
    })();
  }

  click_DeleteTask(id) {
    var _this10 = this;

    return (0,_Users_smija8k_Documents_git_github_todoTxtWebUi_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.removeTask(id);
      _this10.isDirty = true;

      _this10.doneEditing();
    })();
  }

  doneEditing() {
    this.editingTaskId = null;
    this.isAddingNew = false;
  }

  getTasks() {
    let tasks = _todo_txt__WEBPACK_IMPORTED_MODULE_4__.TodoTxt.getFilteredTaskArray(this.filterStr);

    if (!_storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__.TodoTxtVault.getConfig().showClosed) {
      let active = [];

      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].isActive) {
          active.push(tasks[i]);
        }
      }

      tasks = active;
    }

    return tasks;
  }
  /**
   * function will generate a html-markup version of the task
   * @param {TodoTxtTask} task - the task to generate for
   * @returns {string} the HTML marked up task text
   */


  getMarkupForTask(text) {
    let task = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__.TodoTxtTaskParser.get(text); // make html compatible

    text = _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_1__.TodoTxtUtils.htmlEncode(text); // markup priority

    let priCls = this.getDisplayClassForTask(task);
    text = text.replace(task.priority, "<span class=\"" + priCls + "\"><b>" + task.priority + "</b></span>"); // markup projects

    let projects = task.projects;
    projects.forEach(project => {
      var regex = new RegExp(project.replace(/\+/g, "\\+") + "(?![0-9A-Za-z])", "g");
      text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + project + "</i></b></span>");
    }); // markup contexts

    let contexts = task.contexts;
    contexts.forEach(ctx => {
      var regex = new RegExp(ctx + "(?![0-9A-Za-z])", "g");
      text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + ctx + "</i></b></span>");
    }); // markup created date

    let date = task.createdDate;

    if (date) {
      text = text.replace(date, "<span class=\"text-muted hidden-xs\"><b><i>" + date + "</i></b></span>");
    }

    return this.sanitiser.bypassSecurityTrustHtml(text);
  }

  getDisplayClassForTask(task) {
    let cls = '';

    if (task.priority !== null && task.isActive) {
      if (task.priority === "(A)") {
        cls += " text-danger";
      }

      if (task.priority === "(B)") {
        cls += " text-warning";
      }

      if (task.priority === "(C)") {
        cls += " text-primary";
      }
    }

    return cls;
  }

  getPriorities() {
    return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__.TodoTxtAttributes.priorities);
  }

  getProjects() {
    return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__.TodoTxtAttributes.projects);
  }

  getContexts() {
    return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__.TodoTxtAttributes.contexts);
  }

}

TodoTxtWebUiComponent.ɵfac = function TodoTxtWebUiComponent_Factory(t) {
  return new (t || TodoTxtWebUiComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer));
};

TodoTxtWebUiComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: TodoTxtWebUiComponent,
  selectors: [["app-todo-txt-web-ui"]],
  hostBindings: function TodoTxtWebUiComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keydown.esc", function TodoTxtWebUiComponent_keydown_esc_HostBindingHandler() {
        return ctx.click_CancelTaskEdit();
      });
    }
  },
  decls: 53,
  vars: 11,
  consts: [[1, "container", "py-1"], [1, "row"], [1, "col-md-9"], [1, "d-flex", "flex-row", "justify-content-evenly", "pb-1"], [1, "d-flex", "flex-column", "flex-grow-1"], [1, "btn-group", "btn-group-justified"], ["aria-label", "upload file", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Import todo.txt file", 1, "file-upload", "btn", "btn-secondary", "btn-lg", 3, "click"], [1, "bi", "bi-cloud-upload"], [1, "fw-light", "d-none", "d-lg-inline"], ["aria-label", "add task", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "New task", 1, "btn", "btn-lg", "btn-primary", 3, "click"], [1, "bi", "bi-clipboard-plus"], ["aria-label", "save tasks to file", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Export tasks", 3, "click"], [1, "bi", "bi-save"], [1, "d-flex", "flex-column", "p-2"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Show closed tasks", 1, "form-check", "form-switch"], ["type", "checkbox", "id", "flexSwitchCheckDefault", 1, "form-check-input", 3, "checked", "change"], ["for", "flexSwitchCheckDefault", 1, "form-check-label", "d-none", "d-lg-inline"], ["type", "file", 1, "file-input", "visually-hidden", 3, "accept", "change"], ["fileUpload", ""], [1, "input-group", "input-group-lg"], ["type", "text", "placeholder", "Type filter(s)", "aria-label", "task filter", "aria-describedby", "button-addon2", 1, "form-control", 3, "keyup"], ["todoTxtFilter", ""], ["type", "button", "id", "button-addon2", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Clear filter", 1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-x-circle"], ["aria-label", "clear filter", 1, "fw-light", "d-none", "d-lg-inline"], [4, "ngFor", "ngForOf"], [1, "d-none", "d-md-inline", "col-md-3"], [1, "container"], [1, "row", "pt-2"], [1, "card", "p-0"], [1, "card-header"], [1, "btn-group-vertical"], ["class", "btn btn-outline-secondary list-group-item", "data-bs-toggle", "tooltip", "data-bs-placement", "top", 3, "title", "click", 4, "ngFor", "ngForOf"], ["class", "btn-group d-flex flex-nowrap pt-1", "role", "group", 4, "ngIf"], [4, "ngIf"], ["role", "group", 1, "btn-group", "d-flex", "flex-nowrap", "pt-1"], ["class", "col-xs-2 btn btn-lg btn-light", "aria-label", "mark as complete", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Mark complete", 3, "click", 4, "ngIf"], ["class", "col-xs-2 btn btn-lg btn-success", "aria-label", "mark as incomplete", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Unmark / Make active", 3, "click", 4, "ngIf"], ["aria-label", "edit task", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Edit task", 3, "innerHTML", "click"], ["aria-label", "mark as complete", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Mark complete", 1, "col-xs-2", "btn", "btn-lg", "btn-light", 3, "click"], [1, "bi", "bi-circle"], ["aria-label", "mark as incomplete", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Unmark / Make active", 1, "col-xs-2", "btn", "btn-lg", "btn-success", 3, "click"], [1, "bit", "bi-check-circle"], ["tabindex", "0", "contenteditable", "true", 1, "textarea", "btn", "btn-lg", "pt-1", "text-start", "w-100", 3, "id", "innerHTML", "keydown.enter", "keydown.esc"], ["role", "group", 1, "btn-group", "d-flex", "flex-wrap", "pt-1"], ["aria-label", "save changes", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Save Changes (Enter)", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Save changes", 1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-check"], ["aria-label", "discard changes", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Discard Changes (Esc)", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Discard changes", 1, "btn", "btn-warning", 3, "click"], [1, "bi", "bi-x"], ["class", "btn btn-danger", "aria-label", "delete task", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Delete task", 3, "click", 4, "ngIf"], ["aria-label", "delete task", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Delete task", 1, "btn", "btn-danger", 3, "click"], [1, "bi", "bi-trash"], ["data-bs-toggle", "tooltip", "data-bs-placement", "top", 1, "btn", "btn-outline-secondary", "list-group-item", 3, "title", "click"]],
  template: function TodoTxtWebUiComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_6_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42);

        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](24);

        return _r0.click();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "i", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_10_listener() {
        return ctx.click_AddTask();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "i", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, " New Task");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_14_listener() {
        return ctx.click_SaveTasks();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "i", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, " Export Tasks");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "input", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function TodoTxtWebUiComponent_Template_input_change_20_listener() {
        return ctx.toggleShowClosed();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "input", 17, 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function TodoTxtWebUiComponent_Template_input_change_23_listener($event) {
        return ctx.processToDoFile($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "input", 20, 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keyup", function TodoTxtWebUiComponent_Template_input_keyup_26_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42);

        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);

        return ctx.keyup_UpdateFilter(_r1.value);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "button", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_28_listener($event) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42);

        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27);

        ctx.click_ClearFilter($event);
        return _r1.value = "";
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "span", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "span", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](31, " Clear Filter");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](32, TodoTxtWebUiComponent_div_32_Template, 3, 2, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "div", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](38, " Priorities");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](40, TodoTxtWebUiComponent_button_40_Template, 2, 2, "button", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "div", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](44, " Projects");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](46, TodoTxtWebUiComponent_button_46_Template, 2, 2, "button", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](47, "div", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](49, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](50, " Contexts");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "div", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](52, TodoTxtWebUiComponent_button_52_Template, 2, 2, "button", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx.fileName || "Import todo.txt File", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMapInterpolate1"]("btn btn-lg ", ctx.isDirty ? "btn-warning" : "btn-success", "");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("checked", ctx.showClosed);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.showClosed ? "Hide Closed Tasks" : "Show Closed Tasks");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("accept", ctx.requiredFileType);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.getTasks());
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.getPriorities());
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.getProjects());
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.getContexts());
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf],
  styles: ["div.textarea[_ngcontent-%COMP%] {\r\n    border: dashed 2px;\r\n    border-radius: 4px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8tdHh0LXdlYi11aS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJ0b2RvLXR4dC13ZWItdWkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImRpdi50ZXh0YXJlYSB7XHJcbiAgICBib3JkZXI6IGRhc2hlZCAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn0iXX0= */"]
});

/***/ }),

/***/ 8966:
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxtWebUiModule": () => (/* binding */ TodoTxtWebUiModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 1643);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-txt-web-ui-routing.module */ 354);
/* harmony import */ var _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo-txt-web-ui.component */ 2565);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 8802);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_angular_core__WEBPACK_IMPORTED_MODULE_3__);




class TodoTxtWebUiModule {
}
TodoTxtWebUiModule.ɵfac = function TodoTxtWebUiModule_Factory(t) { return new (t || TodoTxtWebUiModule)(); };
TodoTxtWebUiModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: TodoTxtWebUiModule });
TodoTxtWebUiModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule,
            _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__.TodoTxtWebUiRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](TodoTxtWebUiModule, { declarations: [_todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_2__.TodoTxtWebUiComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule,
        _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__.TodoTxtWebUiRoutingModule] }); })();


/***/ }),

/***/ 8739:
/*!*********************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoTxt": () => (/* binding */ TodoTxt)
/* harmony export */ });
/* harmony import */ var _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks/todo-txt-attributes */ 1986);
/* harmony import */ var _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks/todo-txt-task-parser */ 6157);
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/todo-txt-utils */ 4414);
/* harmony import */ var _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/todo-txt-vault */ 8885);
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




var TodoTxt;
(function (TodoTxt) {
    /**
     * function will return a sorted array of tasks as pulled from
     * localStorage.
     * @returns {array} a sorted list of tasks from localStorage
     */
    function getSortedTaskArray() {
        // sort the list and then add it
        let taskArray = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__.TodoTxtVault.getAllTasks();
        _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__.TodoTxtAttributes.reset();
        for (var i = 0; i < taskArray.length; i++) {
            updateAttributes(taskArray[i]);
        }
        taskArray.sort(compareTasks);
        return taskArray;
    }
    TodoTxt.getSortedTaskArray = getSortedTaskArray;
    /**
     * function will return a filtered array of tasks based on the passed in
     * filter string.  Matching uses an ordered fuzzy match so for the following:
     * "(A) 2014-03-02 don't forget to file @report with +John" a passed in filter
     * string of "for John" will match, but "John report" will not match
     * @param {string} filterStr - a string containing characters to match against the existing tasks
     * @returns {array} a sorted list of tasks matching the passed in <b><i>filterStr</i></b>
     */
    function getFilteredTaskArray(filterStr) {
        var filteredTasks = TodoTxt.getSortedTaskArray();
        if (filterStr && filterStr !== "") {
            // create the regex matcher
            let filters = filterStr.split(" ");
            let rStr = '';
            for (var i = 0; i < filters.length; i++) {
                var filter = filters[i].replace(/([-\(\)\[\]\{\}+\?*\.$\^\|,:#<\!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
                rStr += ".*(" + filter + ").*";
            }
            var regex = new RegExp(rStr, "i");
            let tasks = filteredTasks.filter(function (t) {
                return t.text.match(regex);
            });
            filteredTasks = tasks;
        }
        return filteredTasks;
    }
    TodoTxt.getFilteredTaskArray = getFilteredTaskArray;
    /**
     * function will process each line of the todo.txt, sort by priority,
     * creationDate, and state (active or closed).
     *
     * @param {string} todoTxt - the "\n" delimited lines from a todo.txt file
     * @param {boolean} append - a boolean indicating if existing tasks should be cleared
     * first or just appended to with the new file
     */
    function parseTodoTxtFile(todoTxt, append) {
        if (!append) {
            // clear the Storage
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__.TodoTxtVault.removeAllTasks();
        }
        var lines = todoTxt.split("\n");
        for (var i in lines) {
            if (typeof lines[i] === "string") {
                let line = lines[i];
                // ignore empty lines
                if (line && line !== "") {
                    // create new Task and add to our global list in it's proper location
                    createTask(line);
                }
            }
        }
    }
    TodoTxt.parseTodoTxtFile = parseTodoTxtFile;
    /**
     * function creates a new task and saves to {TodoTxtVault}
     * @param {string} textStr - a string representing a raw task
     * @returns {string} the ID of the newly created {TodoTxt.Task}
     */
    function createTask(textStr) {
        let text = textStr || '';
        let t = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__.TodoTxtTaskParser.get(text);
        addTask(t);
        return t.id;
    }
    TodoTxt.createTask = createTask;
    /**
     * function will get a specified task from TodoTxtVault by id
     * @param {string} taskId - the unique id of the task to be returned
     * @returns {TodoTxtTask} a task or null if task not found
     */
    function getTask(taskId) {
        let task = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__.TodoTxtVault.getTask(taskId);
        return task;
    }
    TodoTxt.getTask = getTask;
    /**
     * function updates the task and saves it to the TodoTxtVault cache
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @param {string} newText - a string representing the updated, raw task text
     * @returns {boolean} true if task could be updated otherwise false
     */
    function updateTask(taskId, newText) {
        let task = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__.TodoTxtTaskParser.get(newText);
        task.id = taskId;
        // overwrite storage with updated task
        TodoTxt.addTask(task);
        return true;
    }
    TodoTxt.updateTask = updateTask;
    /**
     * function adds this task to the browser's local cache allowing for
     * retained data on subsequent reloads of the page
     * @param {TodoTxtTask} task - a task to be added to Storage
     */
    function addTask(task) {
        _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__.TodoTxtVault.addTasks(task);
        updateAttributes(task);
    }
    TodoTxt.addTask = addTask;
    /**
     * function will append an "x YYYY-MM-DD " to a stored
     * task if not already closed and will remove any priority
     * declarations in the text of the Task
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be closed, otherwise false
     */
    function closeTask(taskId) {
        var task = getTask(taskId);
        if (task && task.isActive) {
            var text = task.text;
            if (task.priority) {
                text = text.replace(task.priority, "");
            }
            text = "x " + _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_2__.TodoTxtUtils.formatDate(new Date()) + " " + text;
            updateTask(task.id, text);
            return true;
        }
        return false;
    }
    TodoTxt.closeTask = closeTask;
    /**
     * function will remove "x YYYY-MM-DD " from a stored
     * task if not already active
     * @param {string} taskId - unique ID used to retrieve the task from Storage
     * @returns {boolean} true if task could be activated, otherwise false
     */
    function activateTask(taskId) {
        var task = getTask(taskId);
        if (task && !task.isActive) {
            let text = task.text;
            text = text.replace(/^(x )/, "").replace(task.completedDate + " ", "");
            updateTask(task.id, text);
            return true;
        }
        return false;
    }
    TodoTxt.activateTask = activateTask;
    /** @ignore */
    function updateAttributes(task) {
        if (task.isActive || _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__.TodoTxtVault.getConfig().showClosed) {
            // get the priority and add to global filter hashset
            if (task.priority) {
                _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__.TodoTxtAttributes.priorities.add(task.priority);
            }
            // get each project and add to the global filter hashset
            task.projects.forEach((project) => {
                if (project) {
                    _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__.TodoTxtAttributes.projects.add(project);
                }
            });
            // get each context and add to the global filter hashset
            task.contexts.forEach((context) => {
                if (context) {
                    _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__.TodoTxtAttributes.contexts.add(context);
                }
            });
        }
    }
    /** @ignore */
    function compareTasks(taskA, taskB) {
        // function will allow sorting of tasks by the following
        // criteria: (1) active vs. closed (2) priority (3) created date
        // (4) completed date
        var aActive = taskA.isActive;
        var bActive = taskB.isActive;
        var aPri = taskA.priority;
        var bPri = taskB.priority;
        var aCreated = taskA.createdDate;
        var bCreated = taskB.createdDate;
        var aCompleted = taskA.completedDate;
        var bCompleted = taskB.completedDate;
        // (1) compare active vs. closed
        if (aActive !== bActive) {
            // prioritize active over closed
            if (aActive) {
                return -1;
            }
            else {
                return 1;
            }
        }
        else { // (2) compare priority
            if (aPri !== bPri) {
                // order by priority, but favor having priority over not
                if (!bPri || aPri < bPri) {
                    return -1;
                }
                else if (!aPri || aPri > bPri) {
                    return 1;
                }
            }
            else { // (3) compare created date
                if (aCreated !== bCreated) {
                    // order by created date ascending (oldest ones first)
                    if (aCreated < bCreated) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                else { // (4) compare completed date
                    if (aCompleted !== bCompleted) {
                        // order by completed date descending (latest ones first)
                        if (aCompleted > bCompleted) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
            }
        }
        // objects are equivalent
        return 0;
    }
})(TodoTxt || (TodoTxt = {}));


/***/ }),

/***/ 5226:
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});



/***/ }),

/***/ 4497:
/*!******************************************************************************!*\
  !*** ./node_modules/@angular/platform-browser/fesm2020/platform-browser.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ɵgetDOM": () => (/* reexport safe */ _angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"]),
/* harmony export */   "BrowserModule": () => (/* binding */ BrowserModule),
/* harmony export */   "BrowserTransferStateModule": () => (/* binding */ BrowserTransferStateModule),
/* harmony export */   "By": () => (/* binding */ By),
/* harmony export */   "DomSanitizer": () => (/* binding */ DomSanitizer),
/* harmony export */   "EVENT_MANAGER_PLUGINS": () => (/* binding */ EVENT_MANAGER_PLUGINS),
/* harmony export */   "EventManager": () => (/* binding */ EventManager),
/* harmony export */   "HAMMER_GESTURE_CONFIG": () => (/* binding */ HAMMER_GESTURE_CONFIG),
/* harmony export */   "HAMMER_LOADER": () => (/* binding */ HAMMER_LOADER),
/* harmony export */   "HammerGestureConfig": () => (/* binding */ HammerGestureConfig),
/* harmony export */   "HammerModule": () => (/* binding */ HammerModule),
/* harmony export */   "Meta": () => (/* binding */ Meta),
/* harmony export */   "Title": () => (/* binding */ Title),
/* harmony export */   "TransferState": () => (/* binding */ TransferState),
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "disableDebugTools": () => (/* binding */ disableDebugTools),
/* harmony export */   "enableDebugTools": () => (/* binding */ enableDebugTools),
/* harmony export */   "makeStateKey": () => (/* binding */ makeStateKey),
/* harmony export */   "platformBrowser": () => (/* binding */ platformBrowser),
/* harmony export */   "ɵBrowserDomAdapter": () => (/* binding */ BrowserDomAdapter),
/* harmony export */   "ɵBrowserGetTestability": () => (/* binding */ BrowserGetTestability),
/* harmony export */   "ɵDomEventsPlugin": () => (/* binding */ DomEventsPlugin),
/* harmony export */   "ɵDomRendererFactory2": () => (/* binding */ DomRendererFactory2),
/* harmony export */   "ɵDomSanitizerImpl": () => (/* binding */ DomSanitizerImpl),
/* harmony export */   "ɵDomSharedStylesHost": () => (/* binding */ DomSharedStylesHost),
/* harmony export */   "ɵHammerGesturesPlugin": () => (/* binding */ HammerGesturesPlugin),
/* harmony export */   "ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS": () => (/* binding */ INTERNAL_BROWSER_PLATFORM_PROVIDERS),
/* harmony export */   "ɵKeyEventsPlugin": () => (/* binding */ KeyEventsPlugin),
/* harmony export */   "ɵNAMESPACE_URIS": () => (/* binding */ NAMESPACE_URIS),
/* harmony export */   "ɵSharedStylesHost": () => (/* binding */ SharedStylesHost),
/* harmony export */   "ɵTRANSITION_ID": () => (/* binding */ TRANSITION_ID),
/* harmony export */   "ɵescapeHtml": () => (/* binding */ escapeHtml),
/* harmony export */   "ɵflattenStyles": () => (/* binding */ flattenStyles),
/* harmony export */   "ɵinitDomAdapter": () => (/* binding */ initDomAdapter),
/* harmony export */   "ɵshimContentAttribute": () => (/* binding */ shimContentAttribute),
/* harmony export */   "ɵshimHostAttribute": () => (/* binding */ shimHostAttribute)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 1643);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 8802);
/**
 * @license Angular v13.2.1
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */




/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

class GenericBrowserDomAdapter extends _angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵDomAdapter"] {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = true;
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */

/* tslint:disable:requireParameterType no-console */


class BrowserDomAdapter extends GenericBrowserDomAdapter {
  static makeCurrent() {
    (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵsetRootDomAdapter"])(new BrowserDomAdapter());
  }

  onAndCancel(el, evt, listener) {
    el.addEventListener(evt, listener, false); // Needed to follow Dart's subscription semantic, until fix of
    // https://code.google.com/p/dart/issues/detail?id=17406

    return () => {
      el.removeEventListener(evt, listener, false);
    };
  }

  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }

  remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }

  createHtmlDocument() {
    return document.implementation.createHTMLDocument('fakeTitle');
  }

  getDefaultDocument() {
    return document;
  }

  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */


  getGlobalEventTarget(doc, target) {
    if (target === 'window') {
      return window;
    }

    if (target === 'document') {
      return doc;
    }

    if (target === 'body') {
      return doc.body;
    }

    return null;
  }

  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }

  resetBaseElement() {
    baseElement = null;
  }

  getUserAgent() {
    return window.navigator.userAgent;
  }

  getCookie(name) {
    return (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵparseCookieValue"])(document.cookie, name);
  }

}

let baseElement = null;

function getBaseElementHref() {
  baseElement = baseElement || document.querySelector('base');
  return baseElement ? baseElement.getAttribute('href') : null;
} // based on urlUtils.js in AngularJS 1


let urlParsingNode;

function relativePath(url) {
  urlParsingNode = urlParsingNode || document.createElement('a');
  urlParsingNode.setAttribute('href', url);
  const pathName = urlParsingNode.pathname;
  return pathName.charAt(0) === '/' ? pathName : `/${pathName}`;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */


const TRANSITION_ID = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('TRANSITION_ID');

function appInitializerFactory(transitionId, document, injector) {
  return () => {
    // Wait for all application initializers to be completed before removing the styles set by
    // the server.
    injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationInitStatus).donePromise.then(() => {
      const dom = (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])();
      const styles = document.querySelectorAll(`style[ng-transition="${transitionId}"]`);

      for (let i = 0; i < styles.length; i++) {
        dom.remove(styles[i]);
      }
    });
  };
}

const SERVER_TRANSITION_PROVIDERS = [{
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TRANSITION_ID, _angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector],
  multi: true
}];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class BrowserGetTestability {
  static init() {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.setTestabilityGetter)(new BrowserGetTestability());
  }

  addToWindow(registry) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].getAngularTestability = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);

      if (testability == null) {
        throw new Error('Could not find testability for element.');
      }

      return testability;
    };

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].getAllAngularTestabilities = () => registry.getAllTestabilities();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].getAllAngularRootElements = () => registry.getAllRootElements();

    const whenAllStable = (callback
    /** TODO #9100 */
    ) => {
      const testabilities = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].getAllAngularTestabilities();
      let count = testabilities.length;
      let didWork = false;

      const decrement = function (didWork_
      /** TODO #9100 */
      ) {
        didWork = didWork || didWork_;
        count--;

        if (count == 0) {
          callback(didWork);
        }
      };

      testabilities.forEach(function (testability
      /** TODO #9100 */
      ) {
        testability.whenStable(decrement);
      });
    };

    if (!_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].frameworkStabilizers) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].frameworkStabilizers = [];
    }

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].frameworkStabilizers.push(whenAllStable);
  }

  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }

    const t = registry.getTestability(elem);

    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }

    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }

    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }

}
/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */


class BrowserXhr {
  build() {
    return new XMLHttpRequest();
  }

}

BrowserXhr.ɵfac = function BrowserXhr_Factory(t) {
  return new (t || BrowserXhr)();
};

BrowserXhr.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: BrowserXhr,
  factory: BrowserXhr.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BrowserXhr, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */


const EVENT_MANAGER_PLUGINS = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */

class EventManager {
  /**
   * Initializes an instance of the event-manager service.
   */
  constructor(plugins, _zone) {
    this._zone = _zone;
    this._eventNameToPlugin = new Map();
    plugins.forEach(p => p.manager = this);
    this._plugins = plugins.slice().reverse();
  }
  /**
   * Registers a handler for a specific element and event.
   *
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns  A callback function that can be used to remove the handler.
   */


  addEventListener(element, eventName, handler) {
    const plugin = this._findPluginFor(eventName);

    return plugin.addEventListener(element, eventName, handler);
  }
  /**
   * Registers a global handler for an event in a target view.
   *
   * @param target A target for global event notifications. One of "window", "document", or "body".
   * @param eventName The name of the event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns A callback function that can be used to remove the handler.
   * @deprecated No longer being used in Ivy code. To be removed in version 14.
   */


  addGlobalEventListener(target, eventName, handler) {
    const plugin = this._findPluginFor(eventName);

    return plugin.addGlobalEventListener(target, eventName, handler);
  }
  /**
   * Retrieves the compilation zone in which event listeners are registered.
   */


  getZone() {
    return this._zone;
  }
  /** @internal */


  _findPluginFor(eventName) {
    const plugin = this._eventNameToPlugin.get(eventName);

    if (plugin) {
      return plugin;
    }

    const plugins = this._plugins;

    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];

      if (plugin.supports(eventName)) {
        this._eventNameToPlugin.set(eventName, plugin);

        return plugin;
      }
    }

    throw new Error(`No event manager plugin found for event ${eventName}`);
  }

}

EventManager.ɵfac = function EventManager_Factory(t) {
  return new (t || EventManager)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](EVENT_MANAGER_PLUGINS), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone));
};

EventManager.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: EventManager,
  factory: EventManager.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](EventManager, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [EVENT_MANAGER_PLUGINS]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone
    }];
  }, null);
})();

class EventManagerPlugin {
  constructor(_doc) {
    this._doc = _doc;
  }

  addGlobalEventListener(element, eventName, handler) {
    const target = (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])().getGlobalEventTarget(this._doc, element);

    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }

    return this.addEventListener(target, eventName, handler);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


class SharedStylesHost {
  constructor() {
    /** @internal */
    this._stylesSet = new Set();
  }

  addStyles(styles) {
    const additions = new Set();
    styles.forEach(style => {
      if (!this._stylesSet.has(style)) {
        this._stylesSet.add(style);

        additions.add(style);
      }
    });
    this.onStylesAdded(additions);
  }

  onStylesAdded(additions) {}

  getAllStyles() {
    return Array.from(this._stylesSet);
  }

}

SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) {
  return new (t || SharedStylesHost)();
};

SharedStylesHost.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: SharedStylesHost,
  factory: SharedStylesHost.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SharedStylesHost, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], null, null);
})();

class DomSharedStylesHost extends SharedStylesHost {
  constructor(_doc) {
    super();
    this._doc = _doc; // Maps all registered host nodes to a list of style nodes that have been added to the host node.

    this._hostNodes = new Map();

    this._hostNodes.set(_doc.head, []);
  }

  _addStylesToHost(styles, host, styleNodes) {
    styles.forEach(style => {
      const styleEl = this._doc.createElement('style');

      styleEl.textContent = style;
      styleNodes.push(host.appendChild(styleEl));
    });
  }

  addHost(hostNode) {
    const styleNodes = [];

    this._addStylesToHost(this._stylesSet, hostNode, styleNodes);

    this._hostNodes.set(hostNode, styleNodes);
  }

  removeHost(hostNode) {
    const styleNodes = this._hostNodes.get(hostNode);

    if (styleNodes) {
      styleNodes.forEach(removeStyle);
    }

    this._hostNodes.delete(hostNode);
  }

  onStylesAdded(additions) {
    this._hostNodes.forEach((styleNodes, hostNode) => {
      this._addStylesToHost(additions, hostNode, styleNodes);
    });
  }

  ngOnDestroy() {
    this._hostNodes.forEach(styleNodes => styleNodes.forEach(removeStyle));
  }

}

DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) {
  return new (t || DomSharedStylesHost)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

DomSharedStylesHost.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: DomSharedStylesHost,
  factory: DomSharedStylesHost.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DomSharedStylesHost, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();

function removeStyle(styleNode) {
  (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])().remove(styleNode);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const NAMESPACE_URIS = {
  'svg': 'http://www.w3.org/2000/svg',
  'xhtml': 'http://www.w3.org/1999/xhtml',
  'xlink': 'http://www.w3.org/1999/xlink',
  'xml': 'http://www.w3.org/XML/1998/namespace',
  'xmlns': 'http://www.w3.org/2000/xmlns/',
  'math': 'http://www.w3.org/1998/MathML/'
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;

function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}

function flattenStyles(compId, styles, target) {
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i];

    if (Array.isArray(style)) {
      flattenStyles(compId, style, target);
    } else {
      style = style.replace(COMPONENT_REGEX, compId);
      target.push(style);
    }
  }

  return target;
}

function decoratePreventDefault(eventHandler) {
  // `DebugNode.triggerEventHandler` needs to know if the listener was created with
  // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
  // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
  // the listener (see below).
  return event => {
    // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
    // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
    // can inspect the listener toString contents for the existence of this special token. Because
    // the token is a string literal, it is ensured to not be modified by compiled code.
    if (event === '__ngUnwrap__') {
      return eventHandler;
    }

    const allowDefaultBehavior = eventHandler(event);

    if (allowDefaultBehavior === false) {
      // TODO(tbosch): move preventDefault into event plugins...
      event.preventDefault();
      event.returnValue = false;
    }

    return undefined;
  };
}

let hasLoggedNativeEncapsulationWarning = false;

class DomRendererFactory2 {
  constructor(eventManager, sharedStylesHost, appId) {
    this.eventManager = eventManager;
    this.sharedStylesHost = sharedStylesHost;
    this.appId = appId;
    this.rendererByCompId = new Map();
    this.defaultRenderer = new DefaultDomRenderer2(eventManager);
  }

  createRenderer(element, type) {
    if (!element || !type) {
      return this.defaultRenderer;
    }

    switch (type.encapsulation) {
      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.Emulated:
        {
          let renderer = this.rendererByCompId.get(type.id);

          if (!renderer) {
            renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
            this.rendererByCompId.set(type.id, renderer);
          }

          renderer.applyToHost(element);
          return renderer;
        }
      // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an enum
      // value that is not known (but previously was the value for ViewEncapsulation.Native)

      case 1:
      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.ShadowDom:
        // TODO(FW-2290): remove the `case 1:` fallback logic and the warning in v12.
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && // @ts-ignore TODO: Remove as part of FW-2290. TS complains about us dealing with an
        // enum value that is not known (but previously was the value for
        // ViewEncapsulation.Native)
        !hasLoggedNativeEncapsulationWarning && type.encapsulation === 1) {
          hasLoggedNativeEncapsulationWarning = true;
          console.warn('ViewEncapsulation.Native is no longer supported. Falling back to ViewEncapsulation.ShadowDom. The fallback will be removed in v12.');
        }

        return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

      default:
        {
          if (!this.rendererByCompId.has(type.id)) {
            const styles = flattenStyles(type.id, type.styles, []);
            this.sharedStylesHost.addStyles(styles);
            this.rendererByCompId.set(type.id, this.defaultRenderer);
          }

          return this.defaultRenderer;
        }
    }
  }

  begin() {}

  end() {}

}

DomRendererFactory2.ɵfac = function DomRendererFactory2_Factory(t) {
  return new (t || DomRendererFactory2)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](EventManager), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](DomSharedStylesHost), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID));
};

DomRendererFactory2.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: DomRendererFactory2,
  factory: DomRendererFactory2.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DomRendererFactory2, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: EventManager
    }, {
      type: DomSharedStylesHost
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID]
      }]
    }];
  }, null);
})();

class DefaultDomRenderer2 {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.data = Object.create(null);
    this.destroyNode = null;
  }

  destroy() {}

  createElement(name, namespace) {
    if (namespace) {
      // TODO: `|| namespace` was added in
      // https://github.com/angular/angular/commit/2b9cc8503d48173492c29f5a271b61126104fbdb to
      // support how Ivy passed around the namespace URI rather than short name at the time. It did
      // not, however extend the support to other parts of the system (setAttribute, setAttribute,
      // and the ServerRenderer). We should decide what exactly the semantics for dealing with
      // namespaces should be and make it consistent.
      // Related issues:
      // https://github.com/angular/angular/issues/44028
      // https://github.com/angular/angular/issues/44883
      return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }

    return document.createElement(name);
  }

  createComment(value) {
    return document.createComment(value);
  }

  createText(value) {
    return document.createTextNode(value);
  }

  appendChild(parent, newChild) {
    parent.appendChild(newChild);
  }

  insertBefore(parent, newChild, refChild) {
    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }

  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }

  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) : selectorOrNode;

    if (!el) {
      throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    }

    if (!preserveContent) {
      el.textContent = '';
    }

    return el;
  }

  parentNode(node) {
    return node.parentNode;
  }

  nextSibling(node) {
    return node.nextSibling;
  }

  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ':' + name;
      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }

  removeAttribute(el, name, namespace) {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];

      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }

  addClass(el, name) {
    el.classList.add(name);
  }

  removeClass(el, name) {
    el.classList.remove(name);
  }

  setStyle(el, style, value, flags) {
    if (flags & (_angular_core__WEBPACK_IMPORTED_MODULE_1__.RendererStyleFlags2.DashCase | _angular_core__WEBPACK_IMPORTED_MODULE_1__.RendererStyleFlags2.Important)) {
      el.style.setProperty(style, value, flags & _angular_core__WEBPACK_IMPORTED_MODULE_1__.RendererStyleFlags2.Important ? 'important' : '');
    } else {
      el.style[style] = value;
    }
  }

  removeStyle(el, style, flags) {
    if (flags & _angular_core__WEBPACK_IMPORTED_MODULE_1__.RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = '';
    }
  }

  setProperty(el, name, value) {
    NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
    el[name] = value;
  }

  setValue(node, value) {
    node.nodeValue = value;
  }

  listen(target, event, callback) {
    NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');

    if (typeof target === 'string') {
      return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
    }

    return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
  }

}

const AT_CHARCODE = (() => '@'.charCodeAt(0))();

function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}

class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, appId) {
    super(eventManager);
    this.component = component;
    const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
    sharedStylesHost.addStyles(styles);
    this.contentAttr = shimContentAttribute(appId + '-' + component.id);
    this.hostAttr = shimHostAttribute(appId + '-' + component.id);
  }

  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, '');
  }

  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, '');
    return el;
  }

}

class ShadowDomRenderer extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component) {
    super(eventManager);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({
      mode: 'open'
    });
    this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = flattenStyles(component.id, component.styles, []);

    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement('style');
      styleEl.textContent = styles[i];
      this.shadowRoot.appendChild(styleEl);
    }
  }

  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }

  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }

  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }

  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }

  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }

  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


class DomEventsPlugin extends EventManagerPlugin {
  constructor(doc) {
    super(doc);
  } // This plugin should come last in the list of plugins, because it accepts all
  // events.


  supports(eventName) {
    return true;
  }

  addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler, false);
    return () => this.removeEventListener(element, eventName, handler);
  }

  removeEventListener(target, eventName, callback) {
    return target.removeEventListener(eventName, callback);
  }

}

DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) {
  return new (t || DomEventsPlugin)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

DomEventsPlugin.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: DomEventsPlugin,
  factory: DomEventsPlugin.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DomEventsPlugin, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines supported modifiers for key events.
 */


const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const DOM_KEY_LOCATION_NUMPAD = 3; // Map to convert some key or keyIdentifier values to what will be returned by getEventKey

const _keyMap = {
  // The following values are here for cross-browser compatibility and to match the W3C standard
  // cf https://www.w3.org/TR/DOM-Level-3-Events-key/
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  'Del': 'Delete',
  'Esc': 'Escape',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Menu': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'Win': 'OS'
}; // There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...

const _chromeNumKeyPadMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6',
  'G': '7',
  'H': '8',
  'I': '9',
  'J': '*',
  'K': '+',
  'M': '-',
  'N': '.',
  'O': '/',
  '\x60': '0',
  '\x90': 'NumLock'
};
/**
 * Retrieves modifiers from key-event objects.
 */

const MODIFIER_KEY_GETTERS = {
  'alt': event => event.altKey,
  'control': event => event.ctrlKey,
  'meta': event => event.metaKey,
  'shift': event => event.shiftKey
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */

class KeyEventsPlugin extends EventManagerPlugin {
  /**
   * Initializes an instance of the browser plug-in.
   * @param doc The document in which key events will be detected.
   */
  constructor(doc) {
    super(doc);
  }
  /**
   * Reports whether a named key event is supported.
   * @param eventName The event name to query.
   * @return True if the named key event is supported.
   */


  supports(eventName) {
    return KeyEventsPlugin.parseEventName(eventName) != null;
  }
  /**
   * Registers a handler for a specific element and key event.
   * @param element The HTML element to receive event notifications.
   * @param eventName The name of the key event to listen for.
   * @param handler A function to call when the notification occurs. Receives the
   * event object as an argument.
   * @returns The key event that was registered.
   */


  addEventListener(element, eventName, handler) {
    const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
    const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
    return this.manager.getZone().runOutsideAngular(() => {
      return (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
    });
  }

  static parseEventName(eventName) {
    const parts = eventName.toLowerCase().split('.');
    const domEventName = parts.shift();

    if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
      return null;
    }

    const key = KeyEventsPlugin._normalizeKey(parts.pop());

    let fullKey = '';
    MODIFIER_KEYS.forEach(modifierName => {
      const index = parts.indexOf(modifierName);

      if (index > -1) {
        parts.splice(index, 1);
        fullKey += modifierName + '.';
      }
    });
    fullKey += key;

    if (parts.length != 0 || key.length === 0) {
      // returning null instead of throwing to let another plugin process the event
      return null;
    } // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
    //       The code must remain in the `result['domEventName']` form.
    // return {domEventName, fullKey};


    const result = {};
    result['domEventName'] = domEventName;
    result['fullKey'] = fullKey;
    return result;
  }

  static getEventFullKey(event) {
    let fullKey = '';
    let key = getEventKey(event);
    key = key.toLowerCase();

    if (key === ' ') {
      key = 'space'; // for readability
    } else if (key === '.') {
      key = 'dot'; // because '.' is used as a separator in event names
    }

    MODIFIER_KEYS.forEach(modifierName => {
      if (modifierName != key) {
        const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];

        if (modifierGetter(event)) {
          fullKey += modifierName + '.';
        }
      }
    });
    fullKey += key;
    return fullKey;
  }
  /**
   * Configures a handler callback for a key event.
   * @param fullKey The event name that combines all simultaneous keystrokes.
   * @param handler The function that responds to the key event.
   * @param zone The zone in which the event occurred.
   * @returns A callback function.
   */


  static eventCallback(fullKey, handler, zone) {
    return (event
    /** TODO #9100 */
    ) => {
      if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
        zone.runGuarded(() => handler(event));
      }
    };
  }
  /** @internal */


  static _normalizeKey(keyName) {
    // TODO: switch to a Map if the mapping grows too much
    switch (keyName) {
      case 'esc':
        return 'escape';

      default:
        return keyName;
    }
  }

}

KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) {
  return new (t || KeyEventsPlugin)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

KeyEventsPlugin.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: KeyEventsPlugin,
  factory: KeyEventsPlugin.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](KeyEventsPlugin, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();

function getEventKey(event) {
  let key = event.key;

  if (key == null) {
    key = event.keyIdentifier; // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
    // Safari cf
    // https://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces

    if (key == null) {
      return 'Unidentified';
    }

    if (key.startsWith('U+')) {
      key = String.fromCharCode(parseInt(key.substring(2), 16));

      if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
        // There is a bug in Chrome for numeric keypad keys:
        // https://code.google.com/p/chromium/issues/detail?id=155654
        // 1, 2, 3 ... are reported as A, B, C ...
        key = _chromeNumKeyPadMap[key];
      }
    }
  }

  return _keyMap[key] || key;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
  BrowserGetTestability.init();
}

function errorHandler() {
  return new _angular_core__WEBPACK_IMPORTED_MODULE_1__.ErrorHandler();
}

function _document() {
  // Tell ivy about the global document
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetDocument"])(document);
  return document;
}

const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID,
  useValue: _angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵPLATFORM_BROWSER_ID"]
}, {
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_INITIALIZER,
  useValue: initDomAdapter,
  multi: true
}, {
  provide: _angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT,
  useFactory: _document,
  deps: []
}];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */

const platformBrowser = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.createPlatformFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_1__.platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
const BROWSER_MODULE_PROVIDERS = [{
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵINJECTOR_SCOPE"],
  useValue: 'root'
}, {
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ErrorHandler,
  useFactory: errorHandler,
  deps: []
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: DomEventsPlugin,
  multi: true,
  deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone, _angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID]
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: KeyEventsPlugin,
  multi: true,
  deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
}, {
  provide: DomRendererFactory2,
  useClass: DomRendererFactory2,
  deps: [EventManager, DomSharedStylesHost, _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID]
}, {
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.RendererFactory2,
  useExisting: DomRendererFactory2
}, {
  provide: SharedStylesHost,
  useExisting: DomSharedStylesHost
}, {
  provide: DomSharedStylesHost,
  useClass: DomSharedStylesHost,
  deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
}, {
  provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Testability,
  useClass: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Testability,
  deps: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone]
}, {
  provide: EventManager,
  useClass: EventManager,
  deps: [EVENT_MANAGER_PLUGINS, _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone]
}, {
  provide: _angular_common__WEBPACK_IMPORTED_MODULE_0__.XhrFactory,
  useClass: BrowserXhr,
  deps: []
}];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */

class BrowserModule {
  constructor(parentModule) {
    if (parentModule) {
      throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
    }
  }
  /**
   * Configures a browser-based app to transition from a server-rendered app, if
   * one is present on the page.
   *
   * @param params An object containing an identifier for the app to transition.
   * The ID must match between the client and server versions of the app.
   * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
   */


  static withServerTransition(params) {
    return {
      ngModule: BrowserModule,
      providers: [{
        provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID,
        useValue: params.appId
      }, {
        provide: TRANSITION_ID,
        useExisting: _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID
      }, SERVER_TRANSITION_PROVIDERS]
    };
  }

}

BrowserModule.ɵfac = function BrowserModule_Factory(t) {
  return new (t || BrowserModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](BrowserModule, 12));
};

BrowserModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: BrowserModule
});
BrowserModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: BROWSER_MODULE_PROVIDERS,
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationModule]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BrowserModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      providers: BROWSER_MODULE_PROVIDERS,
      exports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.CommonModule, _angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationModule]
    }]
  }], function () {
    return [{
      type: BrowserModule,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.SkipSelf
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [BrowserModule]
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */


function createMeta() {
  return new Meta((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
}
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */


class Meta {
  constructor(_doc) {
    this._doc = _doc;
    this._dom = (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])();
  }
  /**
   * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * If an existing element is found, it is returned and is not modified in any way.
   * @param tag The definition of a `<meta>` element to match or create.
   * @param forceCreation True to create a new element without checking whether one already exists.
   * @returns The existing element with the same attributes and values if found,
   * the new element if no match is found, or `null` if the tag parameter is not defined.
   */


  addTag(tag, forceCreation = false) {
    if (!tag) return null;
    return this._getOrCreateElement(tag, forceCreation);
  }
  /**
   * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
   * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
   * values in the provided tag definition, and verifies that all other attribute values are equal.
   * @param tags An array of tag definitions to match or create.
   * @param forceCreation True to create new elements without checking whether they already exist.
   * @returns The matching elements if found, or the new elements.
   */


  addTags(tags, forceCreation = false) {
    if (!tags) return [];
    return tags.reduce((result, tag) => {
      if (tag) {
        result.push(this._getOrCreateElement(tag, forceCreation));
      }

      return result;
    }, []);
  }
  /**
   * Retrieves a `<meta>` tag element in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching element, if any.
   */


  getTag(attrSelector) {
    if (!attrSelector) return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
  /**
   * Retrieves a set of `<meta>` tag elements in the current HTML document.
   * @param attrSelector The tag attribute and value to match against, in the format
   * `"tag_attribute='value string'"`.
   * @returns The matching elements, if any.
   */


  getTags(attrSelector) {
    if (!attrSelector) return [];

    const list
    /*NodeList*/
    = this._doc.querySelectorAll(`meta[${attrSelector}]`);

    return list ? [].slice.call(list) : [];
  }
  /**
   * Modifies an existing `<meta>` tag element in the current HTML document.
   * @param tag The tag description with which to replace the existing tag content.
   * @param selector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   * If not supplied, matches a tag with the same `name` or `property` attribute value as the
   * replacement tag.
   * @return The modified element.
   */


  updateTag(tag, selector) {
    if (!tag) return null;
    selector = selector || this._parseSelector(tag);
    const meta = this.getTag(selector);

    if (meta) {
      return this._setMetaElementAttributes(tag, meta);
    }

    return this._getOrCreateElement(tag, true);
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param attrSelector A tag attribute and value to match against, to identify
   * an existing tag. A string in the format `"tag_attribute=`value string`"`.
   */


  removeTag(attrSelector) {
    this.removeTagElement(this.getTag(attrSelector));
  }
  /**
   * Removes an existing `<meta>` tag element from the current HTML document.
   * @param meta The tag definition to match against to identify an existing tag.
   */


  removeTagElement(meta) {
    if (meta) {
      this._dom.remove(meta);
    }
  }

  _getOrCreateElement(meta, forceCreation = false) {
    if (!forceCreation) {
      const selector = this._parseSelector(meta); // It's allowed to have multiple elements with the same name so it's not enough to
      // just check that element with the same name already present on the page. We also need to
      // check if element has tag attributes


      const elem = this.getTags(selector).filter(elem => this._containsAttributes(meta, elem))[0];
      if (elem !== undefined) return elem;
    }

    const element = this._dom.createElement('meta');

    this._setMetaElementAttributes(meta, element);

    const head = this._doc.getElementsByTagName('head')[0];

    head.appendChild(element);
    return element;
  }

  _setMetaElementAttributes(tag, el) {
    Object.keys(tag).forEach(prop => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
    return el;
  }

  _parseSelector(tag) {
    const attr = tag.name ? 'name' : 'property';
    return `${attr}="${tag[attr]}"`;
  }

  _containsAttributes(tag, elem) {
    return Object.keys(tag).every(key => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
  }

  _getMetaKeyMap(prop) {
    return META_KEYS_MAP[prop] || prop;
  }

}

Meta.ɵfac = function Meta_Factory(t) {
  return new (t || Meta)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

Meta.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: Meta,
  factory: function Meta_Factory(t) {
    let r = null;

    if (t) {
      r = new t();
    } else {
      r = createMeta();
    }

    return r;
  },
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Meta, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root',
      useFactory: createMeta,
      deps: []
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();
/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */


const META_KEYS_MAP = {
  httpEquiv: 'http-equiv'
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Factory to create Title service.
 */

function createTitle() {
  return new Title((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */


class Title {
  constructor(_doc) {
    this._doc = _doc;
  }
  /**
   * Get the title of the current HTML document.
   */


  getTitle() {
    return this._doc.title;
  }
  /**
   * Set the title of the current HTML document.
   * @param newTitle
   */


  setTitle(newTitle) {
    this._doc.title = newTitle || '';
  }

}

Title.ɵfac = function Title_Factory(t) {
  return new (t || Title)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

Title.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: Title,
  factory: function Title_Factory(t) {
    let r = null;

    if (t) {
      r = new t();
    } else {
      r = createTitle();
    }

    return r;
  },
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](Title, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root',
      useFactory: createTitle,
      deps: []
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const CAMEL_CASE_REGEXP = /([A-Z])/g;
const DASH_CASE_REGEXP = /-([a-z])/g;

function camelCaseToDashCase(input) {
  return input.replace(CAMEL_CASE_REGEXP, (...m) => '-' + m[1].toLowerCase());
}

function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
/**
 * Exports the value under a given `name` in the global property `ng`. For example `ng.probe` if
 * `name` is `'probe'`.
 * @param name Name under which it will be exported. Keep in mind this will be a property of the
 * global `ng` object.
 * @param value The value to export.
 */


function exportNgVar(name, value) {
  if (typeof COMPILED === 'undefined' || !COMPILED) {
    // Note: we can't export `ng` when using closure enhanced optimization as:
    // - closure declares globals itself for minified names, which sometimes clobber our `ng` global
    // - we can't declare a closure extern as the namespace `ng` is already used within Google
    //   for typings for angularJS (via `goog.provide('ng....')`).
    const ng = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].ng = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵglobal"].ng || {};
    ng[name] = value;
  }
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const win = typeof window !== 'undefined' && window || {};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class ChangeDetectionPerfRecord {
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }

}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */


class AngularProfiler {
  constructor(ref) {
    this.appRef = ref.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationRef);
  } // tslint:disable:no-console

  /**
   * Exercises change detection in a loop and then prints the average amount of
   * time in milliseconds how long a single round of change detection takes for
   * the current state of the UI. It runs a minimum of 5 rounds for a minimum
   * of 500 milliseconds.
   *
   * Optionally, a user may pass a `config` parameter containing a map of
   * options. Supported options are:
   *
   * `record` (boolean) - causes the profiler to record a CPU profile while
   * it exercises the change detector. Example:
   *
   * ```
   * ng.profiler.timeChangeDetection({record: true})
   * ```
   */


  timeChangeDetection(config) {
    const record = config && config['record'];
    const profileName = 'Change Detection'; // Profiler is not available in Android browsers without dev tools opened

    const isProfilerAvailable = win.console.profile != null;

    if (record && isProfilerAvailable) {
      win.console.profile(profileName);
    }

    const start = performanceNow();
    let numTicks = 0;

    while (numTicks < 5 || performanceNow() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }

    const end = performanceNow();

    if (record && isProfilerAvailable) {
      win.console.profileEnd(profileName);
    }

    const msPerTick = (end - start) / numTicks;
    win.console.log(`ran ${numTicks} change detection cycles`);
    win.console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }

}

function performanceNow() {
  return win.performance && win.performance.now ? win.performance.now() : new Date().getTime();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const PROFILER_GLOBAL_NAME = 'profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */

function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
/**
 * Disables Angular tools.
 *
 * @publicApi
 */


function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function escapeHtml(text) {
  const escapedText = {
    '&': '&a;',
    '"': '&q;',
    '\'': '&s;',
    '<': '&l;',
    '>': '&g;'
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

function unescapeHtml(text) {
  const unescapedText = {
    '&a;': '&',
    '&q;': '"',
    '&s;': '\'',
    '&l;': '<',
    '&g;': '>'
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */


function makeStateKey(key) {
  return key;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */


class TransferState {
  constructor() {
    this.store = {};
    this.onSerializeCallbacks = {};
  }
  /** @internal */


  static init(initState) {
    const transferState = new TransferState();
    transferState.store = initState;
    return transferState;
  }
  /**
   * Get the value corresponding to a key. Return `defaultValue` if key is not found.
   */


  get(key, defaultValue) {
    return this.store[key] !== undefined ? this.store[key] : defaultValue;
  }
  /**
   * Set the value corresponding to a key.
   */


  set(key, value) {
    this.store[key] = value;
  }
  /**
   * Remove a key from the store.
   */


  remove(key) {
    delete this.store[key];
  }
  /**
   * Test whether a key exists in the store.
   */


  hasKey(key) {
    return this.store.hasOwnProperty(key);
  }
  /**
   * Register a callback to provide the value for a key when `toJson` is called.
   */


  onSerialize(key, callback) {
    this.onSerializeCallbacks[key] = callback;
  }
  /**
   * Serialize the current state of the store to JSON.
   */


  toJson() {
    // Call the onSerialize callbacks and put those values into the store.
    for (const key in this.onSerializeCallbacks) {
      if (this.onSerializeCallbacks.hasOwnProperty(key)) {
        try {
          this.store[key] = this.onSerializeCallbacks[key]();
        } catch (e) {
          console.warn('Exception in onSerialize callback: ', e);
        }
      }
    }

    return JSON.stringify(this.store);
  }

}

TransferState.ɵfac = function TransferState_Factory(t) {
  return new (t || TransferState)();
};

TransferState.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: TransferState,
  factory: TransferState.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TransferState, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], null, null);
})();

function initTransferState(doc, appId) {
  // Locate the script tag with the JSON data transferred from the server.
  // The id of the script tag is set to the Angular appId + 'state'.
  const script = doc.getElementById(appId + '-state');
  let initialState = {};

  if (script && script.textContent) {
    try {
      // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
      initialState = JSON.parse(unescapeHtml(script.textContent));
    } catch (e) {
      console.warn('Exception while restoring TransferState for app ' + appId, e);
    }
  }

  return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */


class BrowserTransferStateModule {}

BrowserTransferStateModule.ɵfac = function BrowserTransferStateModule_Factory(t) {
  return new (t || BrowserTransferStateModule)();
};

BrowserTransferStateModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: BrowserTransferStateModule
});
BrowserTransferStateModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: TransferState,
    useFactory: initTransferState,
    deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID]
  }]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BrowserTransferStateModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      providers: [{
        provide: TransferState,
        useFactory: initTransferState,
        deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, _angular_core__WEBPACK_IMPORTED_MODULE_1__.APP_ID]
      }]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */


class By {
  /**
   * Match all nodes.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
   */
  static all() {
    return () => true;
  }
  /**
   * Match elements by the given CSS selector.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
   */


  static css(selector) {
    return debugElement => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  /**
   * Match nodes that have the given directive present.
   *
   * @usageNotes
   * ### Example
   *
   * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
   */


  static directive(type) {
    return debugNode => debugNode.providerTokens.indexOf(type) !== -1;
  }

}

function elementMatches(n, selector) {
  if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_0__["ɵgetDOM"])().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }

  return false;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Supported HammerJS recognizer event names.
 */


const EVENT_NAMES = {
  // pan
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  // pinch
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  // press
  'press': true,
  'pressup': true,
  // rotate
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  // swipe
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  // tap
  'tap': true,
  'doubletap': true
};
/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */

const HAMMER_GESTURE_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */

const HAMMER_LOADER = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */

class HammerGestureConfig {
  constructor() {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](https://hammerjs.github.io/).
     */
    this.events = [];
    /**
     * Maps gesture event names to a set of configuration options
     * that specify overrides to the default values for specific properties.
     *
     * The key is a supported event name to be configured,
     * and the options object contains a set of properties, with override values
     * to be applied to the named recognizer event.
     * For example, to disable recognition of the rotate event, specify
     *  `{"rotate": {"enable": false}}`.
     *
     * Properties that are not present take the HammerJS default values.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](https://hammerjs.github.io/).
     *
     */

    this.overrides = {};
  }
  /**
   * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
   * and attaches it to a given HTML element.
   * @param element The element that will recognize gestures.
   * @returns A HammerJS event-manager object.
   */


  buildHammer(element) {
    const mc = new Hammer(element, this.options);
    mc.get('pinch').set({
      enable: true
    });
    mc.get('rotate').set({
      enable: true
    });

    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }

    return mc;
  }

}

HammerGestureConfig.ɵfac = function HammerGestureConfig_Factory(t) {
  return new (t || HammerGestureConfig)();
};

HammerGestureConfig.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: HammerGestureConfig,
  factory: HammerGestureConfig.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HammerGestureConfig, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], null, null);
})();
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */


class HammerGesturesPlugin extends EventManagerPlugin {
  constructor(doc, _config, console, loader) {
    super(doc);
    this._config = _config;
    this.console = console;
    this.loader = loader;
    this._loaderPromise = null;
  }

  supports(eventName) {
    if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
      return false;
    }

    if (!window.Hammer && !this.loader) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` + `loaded and no custom loader has been specified.`);
      }

      return false;
    }

    return true;
  }

  addEventListener(element, eventName, handler) {
    const zone = this.manager.getZone();
    eventName = eventName.toLowerCase(); // If Hammer is not present but a loader is specified, we defer adding the event listener
    // until Hammer is loaded.

    if (!window.Hammer && this.loader) {
      this._loaderPromise = this._loaderPromise || this.loader(); // This `addEventListener` method returns a function to remove the added listener.
      // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
      // than remove anything.

      let cancelRegistration = false;

      let deregister = () => {
        cancelRegistration = true;
      };

      this._loaderPromise.then(() => {
        // If Hammer isn't actually loaded when the custom loader resolves, give up.
        if (!window.Hammer) {
          if (typeof ngDevMode === 'undefined' || ngDevMode) {
            this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
          }

          deregister = () => {};

          return;
        }

        if (!cancelRegistration) {
          // Now that Hammer is loaded and the listener is being loaded for real,
          // the deregistration function changes from canceling registration to removal.
          deregister = this.addEventListener(element, eventName, handler);
        }
      }).catch(() => {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          this.console.warn(`The "${eventName}" event cannot be bound because the custom ` + `Hammer.JS loader failed.`);
        }

        deregister = () => {};
      }); // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
      // can change the behavior of `deregister` once the listener is added. Using a closure in
      // this way allows us to avoid any additional data structures to track listener removal.


      return () => {
        deregister();
      };
    }

    return zone.runOutsideAngular(() => {
      // Creating the manager bind events, must be done outside of angular
      const mc = this._config.buildHammer(element);

      const callback = function (eventObj) {
        zone.runGuarded(function () {
          handler(eventObj);
        });
      };

      mc.on(eventName, callback);
      return () => {
        mc.off(eventName, callback); // destroy mc to prevent memory leak

        if (typeof mc.destroy === 'function') {
          mc.destroy();
        }
      };
    });
  }

  isCustomEvent(eventName) {
    return this._config.events.indexOf(eventName) > -1;
  }

}

HammerGesturesPlugin.ɵfac = function HammerGesturesPlugin_Factory(t) {
  return new (t || HammerGesturesPlugin)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](HAMMER_GESTURE_CONFIG), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵConsole"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](HAMMER_LOADER, 8));
};

HammerGesturesPlugin.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: HammerGesturesPlugin,
  factory: HammerGesturesPlugin.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HammerGesturesPlugin, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }, {
      type: HammerGestureConfig,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [HAMMER_GESTURE_CONFIG]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵConsole"]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [HAMMER_LOADER]
      }]
    }];
  }, null);
})();
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */


class HammerModule {}

HammerModule.ɵfac = function HammerModule_Factory(t) {
  return new (t || HammerModule)();
};

HammerModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: HammerModule
});
HammerModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  providers: [{
    provide: EVENT_MANAGER_PLUGINS,
    useClass: HammerGesturesPlugin,
    multi: true,
    deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, HAMMER_GESTURE_CONFIG, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵConsole"], [new _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional(), HAMMER_LOADER]]
  }, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerGestureConfig,
    deps: []
  }]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HammerModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      providers: [{
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT, HAMMER_GESTURE_CONFIG, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵConsole"], [new _angular_core__WEBPACK_IMPORTED_MODULE_1__.Optional(), HAMMER_LOADER]]
      }, {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: HammerGestureConfig,
        deps: []
      }]
    }]
  }], null, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */


class DomSanitizer {}

DomSanitizer.ɵfac = function DomSanitizer_Factory(t) {
  return new (t || DomSanitizer)();
};

DomSanitizer.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: DomSanitizer,
  factory: function DomSanitizer_Factory(t) {
    let r = null;

    if (t) {
      r = new (t || DomSanitizer)();
    } else {
      r = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](DomSanitizerImpl);
    }

    return r;
  },
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DomSanitizer, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root',
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => DomSanitizerImpl)
    }]
  }], null, null);
})();

function domSanitizerImplFactory(injector) {
  return new DomSanitizerImpl(injector.get(_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
}

class DomSanitizerImpl extends DomSanitizer {
  constructor(_doc) {
    super();
    this._doc = _doc;
  }

  sanitize(ctx, value) {
    if (value == null) return null;

    switch (ctx) {
      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.NONE:
        return value;

      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.HTML:
        if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵallowSanitizationBypassAndThrow"])(value, "HTML"
        /* Html */
        )) {
          return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunwrapSafeValue"])(value);
        }

        return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵ_sanitizeHtml"])(this._doc, String(value)).toString();

      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.STYLE:
        if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵallowSanitizationBypassAndThrow"])(value, "Style"
        /* Style */
        )) {
          return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunwrapSafeValue"])(value);
        }

        return value;

      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.SCRIPT:
        if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵallowSanitizationBypassAndThrow"])(value, "Script"
        /* Script */
        )) {
          return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunwrapSafeValue"])(value);
        }

        throw new Error('unsafe value used in a script context');

      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.URL:
        const type = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵgetSanitizationBypassType"])(value);

        if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵallowSanitizationBypassAndThrow"])(value, "URL"
        /* Url */
        )) {
          return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunwrapSafeValue"])(value);
        }

        return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵ_sanitizeUrl"])(String(value));

      case _angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.RESOURCE_URL:
        if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵallowSanitizationBypassAndThrow"])(value, "ResourceURL"
        /* ResourceUrl */
        )) {
          return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵunwrapSafeValue"])(value);
        }

        throw new Error('unsafe value used in a resource URL context (see https://g.co/ng/security#xss)');

      default:
        throw new Error(`Unexpected SecurityContext ${ctx} (see https://g.co/ng/security#xss)`);
    }
  }

  bypassSecurityTrustHtml(value) {
    return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵbypassSanitizationTrustHtml"])(value);
  }

  bypassSecurityTrustStyle(value) {
    return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵbypassSanitizationTrustStyle"])(value);
  }

  bypassSecurityTrustScript(value) {
    return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵbypassSanitizationTrustScript"])(value);
  }

  bypassSecurityTrustUrl(value) {
    return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵbypassSanitizationTrustUrl"])(value);
  }

  bypassSecurityTrustResourceUrl(value) {
    return (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵbypassSanitizationTrustResourceUrl"])(value);
  }

}

DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) {
  return new (t || DomSanitizerImpl)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT));
};

DomSanitizerImpl.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: DomSanitizerImpl,
  factory: function DomSanitizerImpl_Factory(t) {
    let r = null;

    if (t) {
      r = new t();
    } else {
      r = domSanitizerImplFactory(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
    }

    return r;
  },
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](DomSanitizerImpl, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable,
    args: [{
      providedIn: 'root',
      useFactory: domSanitizerImplFactory,
      deps: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector]
    }]
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_0__.DOCUMENT]
      }]
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @publicApi
 */


const VERSION = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.Version('13.2.1');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 1670:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ })

}])
//# sourceMappingURL=src_app_todo-txt-web-ui_todo-txt-web-ui_module_ts-_30f21.js.map