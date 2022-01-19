(self["webpackChunktodoTxtWebUi"] = self["webpackChunktodoTxtWebUi"] || []).push([["src_app_todo-txt-web-ui_todo-txt-web-ui_module_ts-_30f20"],{

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
//# sourceMappingURL=src_app_todo-txt-web-ui_todo-txt-web-ui_module_ts-_30f20.js.map