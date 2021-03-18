(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["todo-txt-web-ui-todo-txt-web-ui-module"],{

/***/ "6gkx":
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui.module.ts ***!
  \***********************************************************/
/*! exports provided: TodoTxtWebUiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtWebUiModule", function() { return TodoTxtWebUiModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-txt-web-ui-routing.module */ "p1Bm");
/* harmony import */ var _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo-txt-web-ui.component */ "S1do");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class TodoTxtWebUiModule {
}
TodoTxtWebUiModule.ɵfac = function TodoTxtWebUiModule_Factory(t) { return new (t || TodoTxtWebUiModule)(); };
TodoTxtWebUiModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: TodoTxtWebUiModule });
TodoTxtWebUiModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__["TodoTxtWebUiRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](TodoTxtWebUiModule, { declarations: [_todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_2__["TodoTxtWebUiComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _todo_txt_web_ui_routing_module__WEBPACK_IMPORTED_MODULE_1__["TodoTxtWebUiRoutingModule"]] }); })();


/***/ }),

/***/ "Iab2":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "S1do":
/*!**************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui.component.ts ***!
  \**************************************************************/
/*! exports provided: TodoTxtWebUiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtWebUiComponent", function() { return TodoTxtWebUiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/todo-txt-utils */ "aOL1");
/* harmony import */ var _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/todo-txt-vault */ "vn/f");
/* harmony import */ var _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks/todo-txt-task-parser */ "t5cd");
/* harmony import */ var _todo_txt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todo-txt */ "aomO");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! file-saver */ "Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tasks/todo-txt-attributes */ "bN3D");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");










function TodoTxtWebUiComponent_div_32_div_1_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r11.click_MarkComplete(t_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function TodoTxtWebUiComponent_div_32_div_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r14.click_MarkActive(t_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function TodoTxtWebUiComponent_div_32_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, TodoTxtWebUiComponent_div_32_div_1_button_1_Template, 2, 0, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, TodoTxtWebUiComponent_div_32_div_1_button_2_Template, 2, 0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r19); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r17.click_StartEditTask(t_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", t_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !t_r6.isActive);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMapInterpolate1"]("btn btn-lg ", t_r6.isActive ? "btn-light" : "btn-outline-success", " text-start w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", ctx_r7.getMarkupForTask(t_r6.text), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
} }
function TodoTxtWebUiComponent_div_32_div_2_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_button_11_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r22.click_DeleteTask(t_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "i", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, " Delete Task");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function TodoTxtWebUiComponent_div_32_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keydown.enter", function TodoTxtWebUiComponent_div_32_div_2_Template_div_keydown_enter_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r25.click_SaveTaskEdit(t_r6.id); })("keydown.esc", function TodoTxtWebUiComponent_div_32_div_2_Template_div_keydown_esc_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r28.click_CancelTaskEdit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27); const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r29.click_SaveTaskEdit(t_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "i", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_div_32_div_2_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r31.click_CancelTaskEdit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "i", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, " Discard Changes");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, TodoTxtWebUiComponent_div_32_div_2_button_11_Template, 4, 0, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("id", "textarea_", t_r6.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", ctx_r8.getMarkupForTask(t_r6.text), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r8.isAddingNew ? "Save" : "Update", " Task");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r8.isAddingNew);
} }
function TodoTxtWebUiComponent_div_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, TodoTxtWebUiComponent_div_32_div_1_Template, 4, 6, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, TodoTxtWebUiComponent_div_32_div_2_Template, 12, 4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.editingTaskId != t_r6.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.editingTaskId == t_r6.id);
} }
function TodoTxtWebUiComponent_button_40_Template(rf, ctx) { if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_40_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r35); const p_r33 = ctx.$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r34.keyup_UpdateFilter(p_r33); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r33, "");
} }
function TodoTxtWebUiComponent_button_46_Template(rf, ctx) { if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_46_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r38); const p_r36 = ctx.$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r37.keyup_UpdateFilter(p_r36); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r36 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r36, "");
} }
function TodoTxtWebUiComponent_button_52_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_button_52_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r41); const p_r39 = ctx.$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r40.keyup_UpdateFilter(p_r39); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", p_r39, "");
} }
class TodoTxtWebUiComponent {
    constructor(sanitiser) {
        this.sanitiser = sanitiser;
        this.requiredFileType = '.txt';
        this.isDirty = false;
        this.showClosed = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].getConfig().showClosed;
        this.downloadFileName = 'todo.txt';
    }
    toggleShowClosed() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let cfg = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].getConfig();
            cfg.showClosed = !cfg.showClosed;
            this.showClosed = cfg.showClosed;
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].setConfig(cfg);
        });
    }
    processToDoFile(event) {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (event) {
                let files = (_a = event.target) === null || _a === void 0 ? void 0 : _a.files;
                if (files && files.length > 0) {
                    let file = files[0];
                    if (file) {
                        _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].removeAllTasks();
                        this.fileName = file.name;
                        this.downloadFileName = this.fileName;
                        let text = yield file.text();
                        let lines = text.split('\n');
                        _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].addTasks(..._tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__["TodoTxtTaskParser"].parseMany(...lines));
                    }
                }
            }
        });
    }
    click_AddTask() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isAddingNew = true;
            let t = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__["TodoTxtTaskParser"].parse('');
            _todo_txt__WEBPACK_IMPORTED_MODULE_4__["TodoTxt"].addTask(t);
            this.click_StartEditTask(t.id);
            this.isDirty = true;
            return false;
        });
    }
    click_SaveTasks() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let data = (_a = this.getTasks().map((t) => { var _a; return (_a = t.text) === null || _a === void 0 ? void 0 : _a.trim(); })) === null || _a === void 0 ? void 0 : _a.join('\n');
            if (data) {
                let blob = new Blob([data], { type: 'data:attachment/text; charset=utf-8' });
                Object(file_saver__WEBPACK_IMPORTED_MODULE_5__["saveAs"])(blob, this.downloadFileName);
            }
            this.isDirty = false;
        });
    }
    keyup_UpdateFilter(filter) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.filterStr = filter;
        });
    }
    click_ClearFilter(event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.filterStr = null;
            event.target.value = undefined;
        });
    }
    click_MarkComplete(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _todo_txt__WEBPACK_IMPORTED_MODULE_4__["TodoTxt"].closeTask(id);
        });
    }
    click_MarkActive(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _todo_txt__WEBPACK_IMPORTED_MODULE_4__["TodoTxt"].activateTask(id);
        });
    }
    click_StartEditTask(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.editingTaskId = id;
            setTimeout(() => this.setFocus(id), 0);
        });
    }
    setFocus(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let div = document.getElementById(`textarea_${id}`);
            if (div) {
                console.info(`found element 'textarea_${id}'`);
                div.focus();
                // let s = window.getSelection();
                // let r = document.createRange();
                // r.setStart(div, 0);
                // r.setEnd(div, 0);
                // s.removeAllRanges();
                // s.addRange(r);
            }
            else {
                console.warn(`unable to find element 'textarea_${id}'`);
            }
        });
    }
    click_SaveTaskEdit(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let text = document.querySelector(`#textarea_${id}`).innerText;
            _todo_txt__WEBPACK_IMPORTED_MODULE_4__["TodoTxt"].updateTask(id, text);
            this.isDirty = true;
            this.doneEditing();
            return false;
        });
    }
    click_CancelTaskEdit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.isAddingNew) {
                this.click_DeleteTask(this.editingTaskId);
            }
            this.doneEditing();
            return false;
        });
    }
    click_DeleteTask(id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].removeTask(id);
            this.isDirty = true;
            this.doneEditing();
        });
    }
    doneEditing() {
        this.editingTaskId = null;
        this.isAddingNew = false;
    }
    getTasks() {
        let tasks = _todo_txt__WEBPACK_IMPORTED_MODULE_4__["TodoTxt"].getFilteredTaskArray(this.filterStr);
        if (!_storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_2__["TodoTxtVault"].getConfig().showClosed) {
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
        let task = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_3__["TodoTxtTaskParser"].parse(text);
        // make html compatible
        text = _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_1__["TodoTxtUtils"].htmlEncode(text);
        // markup priority
        let priCls = this.getDisplayClassForTask(task);
        text = text.replace(task.priority, "<span class=\"" + priCls + "\"><b>" + task.priority + "</b></span>");
        // markup projects
        let projects = task.projects;
        projects.forEach((project) => {
            var regex = new RegExp(project.replace(/\+/g, "\\+") + "(?![0-9A-Za-z])", "g");
            text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + project + "</i></b></span>");
        });
        // markup contexts
        let contexts = task.contexts;
        contexts.forEach((ctx) => {
            var regex = new RegExp(ctx + "(?![0-9A-Za-z])", "g");
            text = text.replace(regex, "<span class=\"text-muted\"><b><i>" + ctx + "</i></b></span>");
        });
        // markup created date
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
        return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__["TodoTxtAttributes"].priorities);
    }
    getProjects() {
        return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__["TodoTxtAttributes"].projects);
    }
    getContexts() {
        return Array.from(_tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_6__["TodoTxtAttributes"].contexts);
    }
}
TodoTxtWebUiComponent.ɵfac = function TodoTxtWebUiComponent_Factory(t) { return new (t || TodoTxtWebUiComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"])); };
TodoTxtWebUiComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: TodoTxtWebUiComponent, selectors: [["app-todo-txt-web-ui"]], hostBindings: function TodoTxtWebUiComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keydown.esc", function TodoTxtWebUiComponent_keydown_esc_HostBindingHandler() { return ctx.click_CancelTaskEdit(); });
    } }, decls: 53, vars: 11, consts: [[1, "container"], [1, "row"], [1, "col-md-9"], [1, "d-flex", "flex-row", "justify-content-evenly"], [1, "d-flex", "flex-column", "flex-grow-1"], [1, "btn-group", "btn-group-justified"], ["aria-label", "upload file", 1, "file-upload", "btn", "btn-secondary", "btn-lg", 3, "click"], [1, "bi", "bi-cloud-upload"], [1, "fw-light", "d-none", "d-lg-inline"], ["aria-label", "add task", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "New Task", 1, "btn", "btn-lg", "btn-primary", 3, "click"], [1, "bi", "bi-clipboard-plus"], ["aria-label", "save tasks to file", 3, "click"], [1, "bi", "bi-save"], [1, "d-flex", "flex-column", "p-2"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "flexSwitchCheckDefault", 1, "form-check-input", 3, "checked", "change"], ["for", "flexSwitchCheckDefault", 1, "form-check-label", "d-none", "d-lg-inline"], ["type", "file", 1, "file-input", "visually-hidden", 3, "accept", "change"], ["fileUpload", ""], [1, "input-group", "input-group-lg"], ["type", "text", "placeholder", "Type filter(s)", "aria-label", "task filter", "aria-describedby", "button-addon2", 1, "form-control", 3, "keyup"], ["todoTxtFilter", ""], ["type", "button", "id", "button-addon2", 1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-x-circle"], ["aria-label", "clear filter", 1, "fw-light", "d-none", "d-lg-inline"], [4, "ngFor", "ngForOf"], [1, "col-md-3"], [1, "row", "pt-2"], [1, "card"], [1, "card-header"], [1, "btn-group-vertical"], ["class", "btn btn-outline-secondary list-group-item", 3, "click", 4, "ngFor", "ngForOf"], ["class", "btn-group d-flex flex-nowrap pt-1", "role", "group", 4, "ngIf"], [4, "ngIf"], ["role", "group", 1, "btn-group", "d-flex", "flex-nowrap", "pt-1"], ["class", "col-xs-2 btn btn-lg btn-light", "aria-label", "mark as complete", 3, "click", 4, "ngIf"], ["class", "col-xs-2 btn btn-lg btn-success", "aria-label", "mark as incomplete", 3, "click", 4, "ngIf"], ["aria-label", "edit task", 3, "innerHTML", "click"], ["aria-label", "mark as complete", 1, "col-xs-2", "btn", "btn-lg", "btn-light", 3, "click"], [1, "bi", "bi-circle"], ["aria-label", "mark as incomplete", 1, "col-xs-2", "btn", "btn-lg", "btn-success", 3, "click"], [1, "bit", "bi-check-circle"], ["tabindex", "0", "contenteditable", "true", 1, "textarea", "btn", "btn-lg", "pt-1", "text-start", "w-100", 3, "id", "innerHTML", "keydown.enter", "keydown.esc"], ["role", "group", 1, "btn-group", "d-flex", "flex-wrap", "pt-1"], ["aria-label", "save changes", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Save Changes (Enter)", 1, "btn", "btn-success", 3, "click"], [1, "bi", "bi-check"], ["aria-label", "discard changes", "data-bs-toggle", "tooltip", "data-bs-placement", "top", "title", "Discard Changes (Esc)", 1, "btn", "btn-warning", 3, "click"], [1, "bi", "bi-x"], ["class", "btn btn-danger", "aria-label", "delete task", 3, "click", 4, "ngIf"], ["aria-label", "delete task", 1, "btn", "btn-danger", 3, "click"], [1, "bi", "bi-trash"], [1, "btn", "btn-outline-secondary", "list-group-item", 3, "click"]], template: function TodoTxtWebUiComponent_Template(rf, ctx) { if (rf & 1) {
        const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](24); return _r0.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_10_listener() { return ctx.click_AddTask(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "i", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, " Add Task");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_14_listener() { return ctx.click_SaveTasks(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, " Save Tasks");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function TodoTxtWebUiComponent_Template_input_change_20_listener() { return ctx.toggleShowClosed(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "input", 17, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("change", function TodoTxtWebUiComponent_Template_input_change_23_listener($event) { return ctx.processToDoFile($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](26, "input", 20, 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keyup", function TodoTxtWebUiComponent_Template_input_keyup_26_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r42); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](27); return ctx.keyup_UpdateFilter(_r1.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TodoTxtWebUiComponent_Template_button_click_28_listener($event) { return ctx.click_ClearFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "span", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](31, " Clear Filter");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](32, TodoTxtWebUiComponent_div_32_Template, 3, 2, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](37, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](38, " Priorities");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](40, TodoTxtWebUiComponent_button_40_Template, 2, 1, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](42, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](43, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](44, " Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](45, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](46, TodoTxtWebUiComponent_button_46_Template, 2, 1, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](47, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](48, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](49, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](50, " Contexts");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](51, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](52, TodoTxtWebUiComponent_button_52_Template, 2, 1, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx.fileName || "Select todo.txt File", "");
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
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"]], styles: ["div.textarea[_ngcontent-%COMP%] {\r\n    border: dashed 2px;\r\n    border-radius: 4px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8tdHh0LXdlYi11aS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJ0b2RvLXR4dC13ZWItdWkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImRpdi50ZXh0YXJlYSB7XHJcbiAgICBib3JkZXI6IGRhc2hlZCAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "aOL1":
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/helpers/todo-txt-utils.ts ***!
  \***********************************************************/
/*! exports provided: TodoTxtUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtUtils", function() { return TodoTxtUtils; });
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

/***/ "aomO":
/*!*********************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt.ts ***!
  \*********************************************/
/*! exports provided: TodoTxt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxt", function() { return TodoTxt; });
/* harmony import */ var _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks/todo-txt-attributes */ "bN3D");
/* harmony import */ var _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks/todo-txt-task-parser */ "t5cd");
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/todo-txt-utils */ "aOL1");
/* harmony import */ var _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/todo-txt-vault */ "vn/f");
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
        let taskArray = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__["TodoTxtVault"].getAllTasks();
        _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__["TodoTxtAttributes"].reset();
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
            _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__["TodoTxtVault"].removeAllTasks();
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
        let t = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__["TodoTxtTaskParser"].parse(text);
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
        let task = _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__["TodoTxtVault"].getTask(taskId);
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
        let task = _tasks_todo_txt_task_parser__WEBPACK_IMPORTED_MODULE_1__["TodoTxtTaskParser"].parse(newText);
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
        _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__["TodoTxtVault"].addTasks(task);
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
            text = "x " + _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_2__["TodoTxtUtils"].formatDate(new Date()) + " " + text;
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
        if (task.isActive || _storage_todo_txt_vault__WEBPACK_IMPORTED_MODULE_3__["TodoTxtVault"].getConfig().showClosed) {
            // get the priority and add to global filter hashset
            if (task.priority) {
                _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__["TodoTxtAttributes"].priorities.add(task.priority);
            }
            // get each project and add to the global filter hashset
            task.projects.forEach((project) => {
                if (project) {
                    _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__["TodoTxtAttributes"].projects.add(project);
                }
            });
            // get each context and add to the global filter hashset
            task.contexts.forEach((context) => {
                if (context) {
                    _tasks_todo_txt_attributes__WEBPACK_IMPORTED_MODULE_0__["TodoTxtAttributes"].contexts.add(context);
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

/***/ "bN3D":
/*!**************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/tasks/todo-txt-attributes.ts ***!
  \**************************************************************/
/*! exports provided: TodoTxtAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtAttributes", function() { return TodoTxtAttributes; });
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

/***/ "mrSG":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __spreadArray, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "p1Bm":
/*!*******************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/todo-txt-web-ui-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: TodoTxtWebUiRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtWebUiRoutingModule", function() { return TodoTxtWebUiRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-txt-web-ui.component */ "S1do");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    { path: '', component: _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__["TodoTxtWebUiComponent"] },
    { path: 'todoTxtWebUi', component: _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__["TodoTxtWebUiComponent"] },
    { path: 'todo-txt-web-ui', component: _todo_txt_web_ui_component__WEBPACK_IMPORTED_MODULE_1__["TodoTxtWebUiComponent"] }
];
class TodoTxtWebUiRoutingModule {
}
TodoTxtWebUiRoutingModule.ɵfac = function TodoTxtWebUiRoutingModule_Factory(t) { return new (t || TodoTxtWebUiRoutingModule)(); };
TodoTxtWebUiRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TodoTxtWebUiRoutingModule });
TodoTxtWebUiRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TodoTxtWebUiRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "t5cd":
/*!***************************************************************!*\
  !*** ./src/app/todo-txt-web-ui/tasks/todo-txt-task-parser.ts ***!
  \***************************************************************/
/*! exports provided: TodoTxtTaskParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtTaskParser", function() { return TodoTxtTaskParser; });
/* harmony import */ var _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/todo-txt-utils */ "aOL1");

var TodoTxtTaskParser;
(function (TodoTxtTaskParser) {
    function parse(text) {
        let task = {
            id: _helpers_todo_txt_utils__WEBPACK_IMPORTED_MODULE_0__["TodoTxtUtils"].guid(),
            text: text,
            isActive: parseStatus(text),
            priority: parsePriority(text),
            completedDate: parseCompletedDate(text),
            createdDate: parseCreatedDate(text),
            projects: parseProjects(text),
            contexts: parseContexts(text)
        };
        return task;
    }
    TodoTxtTaskParser.parse = parse;
    function parseMany(...texts) {
        let tasks = [];
        if (texts) {
            for (var i = 0; i < texts.length; i++) {
                tasks.push(parse(texts[i]));
            }
        }
        return tasks;
    }
    TodoTxtTaskParser.parseMany = parseMany;
    function parseStatus(str) {
        // check for strings starting with something like "x "
        let match = str.match(/^(x )/);
        if (match && match.length > 0) {
            return false;
        }
        return true;
    }
    function parsePriority(str) {
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
    function parseCompletedDate(str) {
        var completed;
        // parse out the completedDate if closed (starts with "x ")
        if (!parseStatus(str)) {
            let dates = getDatesFromText(str);
            if (dates) {
                completed = dates[0] ? dates[0].replace(/[\s]*/g, "") : null;
            }
        }
        return completed;
    }
    function parseCreatedDate(str) {
        var created;
        // parse out the createdDate (will be 2nd if item is closed)
        let dates = getDatesFromText(str);
        if (dates) {
            if (!parseStatus(str)) {
                if (dates.length > 1) { // we have created and completed
                    created = dates[1] ? dates[1].replace(/[\s]*/g, "") : null;
                }
            }
            else {
                created = dates[0] ? dates[0].replace(/[\s]*/g, "") : null;
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
    function parseProjects(str) {
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
    function parseContexts(str) {
        var tmpSet = new Set(); // used to hold the context if set
        if (str) {
            // parse out the contexts RegEx: /\@[0-9A-Za-z]+\s/ (words starting with "+")
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

/***/ "vn/f":
/*!***********************************************************!*\
  !*** ./src/app/todo-txt-web-ui/storage/todo-txt-vault.ts ***!
  \***********************************************************/
/*! exports provided: TodoTxtVault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoTxtVault", function() { return TodoTxtVault; });
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


/***/ })

}]);
//# sourceMappingURL=todo-txt-web-ui-todo-txt-web-ui-module.js.map