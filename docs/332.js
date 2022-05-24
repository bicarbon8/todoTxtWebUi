(self.webpackChunktodoTxtWebUi=self.webpackChunktodoTxtWebUi||[]).push([[332,94],{94:(ee,J,N)=>{N.r(J),N.d(J,{TodoTxtWebUiModule:()=>ie});var O,D,x,P,c,U,S=N(643),l=N(464);function K(c,g,i,a,f,h,b){try{var T=c[h](b),M=T.value}catch(I){return void i(I)}T.done?g(M):Promise.resolve(M).then(a,f)}function C(c){return function(){var g=this,i=arguments;return new Promise(function(a,f){var h=c.apply(g,i);function b(M){K(h,a,f,b,T,"next",M)}function T(M){K(h,a,f,b,T,"throw",M)}b(void 0)})}}!function(c){function T(){return(T=C(function*(){let[m]=yield window.showOpenFilePicker();const _=yield m.getFile();return{text:yield _.text(),name:_.name,path:_.webkitRelativePath,size:_.size}})).apply(this,arguments)}function I(){return(I=C(function*(m){const _={suggestedName:m.name||"todo.txt",types:[{description:"ToDo.txt file",accept:{"text/plain":[".txt"]}}]},p=yield(yield window.showSaveFilePicker(_)).createWritable();yield p.write(m.text||""),yield p.close()})).apply(this,arguments)}c.formatDate=function g(m){var _=m.getFullYear(),u=(m.getMonth()+1).toString();u=u.length<2?"0"+u:u;var p=m.getDate().toString();return p=p.length<2?"0"+p:p,String(_+"-"+u+"-"+p)},c.getLanguage=function i(){return(window.navigator.userLanguage||window.navigator.language).toLowerCase()},c.guid=function a(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(m){var _=16*Math.random()|0;return("x"==m?_:3&_|8).toString(16)})},c.htmlEncode=function f(m){return String(m).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\s{2}/g," &nbsp;")},c.htmlUnencode=function h(m){return String(m).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&nbsp;/g," ")},c.readFile=function b(){return T.apply(this,arguments)},c.saveToFile=function M(m){return I.apply(this,arguments)}}(O||(O={})),function(c){var g=new Map,i={showClosed:!1},a=0;function _(){try{let d={tasks:Array.from(g.values()),config:i};localStorage.setItem("todo-txt",JSON.stringify(d))}catch(d){0==a&&(alert("WARNING: unable to store Tasks in localStorage; ensure you export your tasks before you close the browser or they will be lost!"),console.error(`TodoTxt unable to cache data in localStorage due to: ${d}`),a++)}}function u(){try{let k=localStorage.getItem("todo-txt");if(k){let A=JSON.parse(k);if(A.tasks){g.clear();for(var d=0;d<A.tasks.length;d++)g.set(A.tasks[d].id,A.tasks[d]);i=A.config}}}catch(k){0==a&&console.info(`TodoTxt unable to load cache from localStorage due to: ${k}`)}}c.addTasks=function f(...d){if(d)for(var k=0;k<d.length;k++){let A=d[k];g.set(A.id,A),_()}},c.removeTask=function h(d){let k=!1;return g.has(d)&&(g.delete(d),k=!0),_(),k},c.removeAllTasks=function b(){g=new Map,_()},c.getTask=function T(d){if(u(),g.has(d))return g.get(d);throw new Error(`no TodoTxtTask with ID of '${d}' could be found`)},c.getAllTasks=function M(){u();let d=[];return g.forEach(k=>{d.push(k)}),d},c.getConfig=function I(){return u(),i},c.setConfig=function m(d){i=d,_()},c._clear=function p(){g=new Map,i={showClosed:!1},localStorage.removeItem("todo-txt")}}(D||(D={})),function(c){function g(m){return{id:O.guid(),text:m,isActive:a(m),priority:f(m),completedDate:h(m),createdDate:b(m),projects:M(m),contexts:I(m)}}function a(m){let _=m.match(/^(x )/);return!(_&&_.length>0)}function f(m){let _;if(m){var u=m.match(/^(\([A-Z]\)[\s]+)/);u&&(_=u[0].replace(/[\s]*/g,""))}return _}function h(m){var _;if(!a(m)){let u=T(m);u&&(_=u[0]?u[0].replace(/[\s]*/g,""):void 0)}return _}function b(m){var _;let u=T(m);return u&&(a(m)?_=u[0]?u[0].replace(/[\s]*/g,""):void 0:u.length>1&&(_=u[1]?u[1].replace(/[\s]*/g,""):void 0)),_}function T(m){var _=[];if(m){let d=m.match(/(?:\s|^)(\d{4}-\d{2}-\d{2})(?=\s)/g);if(d)for(var u=0;u<d.length;u++)_.push(d[u])}return _}function M(m){var _=new Set;if(m){var p=m.match(/((\s|^)[\(\{\["']?\+[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g);if(p)for(var d=0;d<p.length;d++){var k=p[d].replace(/[\s]*/g,"").replace(/[\(\{\[\)\}\]"']/g,"");_.add(k)}}return Array.from(_)}function I(m){var _=new Set;if(m){var p=m.match(/((\s|^)[\(\{\["']?\@[0-9A-Za-z]+[\)\}\]"']?(?=\s|$))/g);if(p)for(var d=0;d<p.length;d++){var k=p[d].replace(/[\s]*/g,"").replace(/[\(\{\[\)\}\]"']/g,"");_.add(k)}}return Array.from(_)}c.get=g,c.getMany=function i(...m){let _=[];if(m)for(var u=0;u<m.length;u++)_.push(g(m[u]));return _}}(x||(x={})),(c=P||(P={})).priorities=new Set,c.projects=new Set,c.contexts=new Set,c.reset=function g(){c.priorities=new Set,c.projects=new Set,c.contexts=new Set},function(c){function f(u){let d=x.get(u||"");return T(d),d.id}function h(u){return D.getTask(u)}function b(u,p){let d=x.get(p);return d.id=u,c.addTask(d),!0}function T(u){D.addTasks(u),m(u)}function m(u){(u.isActive||D.getConfig().showClosed)&&(u.priority&&P.priorities.add(u.priority),u.projects.forEach(p=>{p&&P.projects.add(p)}),u.contexts.forEach(p=>{p&&P.contexts.add(p)}))}function _(u,p){var d=u.isActive,A=u.priority,W=p.priority,X=u.createdDate,Q=p.createdDate,q=u.completedDate,ne=p.completedDate;if(d!==p.isActive)return d?-1:1;if(A!==W){if(!W||A<W)return-1;if(!A||A>W)return 1}else{if(X!==Q)return X<Q?-1:1;if(q!==ne)return q>ne?-1:1}return 0}c.getSortedTaskArray=function g(){let u=D.getAllTasks();P.reset();for(var p=0;p<u.length;p++)m(u[p]);return u.sort(_),u},c.getFilteredTaskArray=function i(u){var p=c.getSortedTaskArray();if(u&&""!==u){let W=u.split(" "),X="";for(var d=0;d<W.length;d++)X+=".*("+W[d].replace(/([-\(\)\[\]\{\}+\?*\.$\^\|,:#<\!\\])/g,"\\$1").replace(/\x08/g,"\\x08")+").*";var A=new RegExp(X,"i");p=p.filter(function(q){return q.text.match(A)})}return p},c.parseTodoTxtFile=function a(u,p){p||D.removeAllTasks();var d=u.split("\n");for(var k in d)if("string"==typeof d[k]){let A=d[k];A&&""!==A&&f(A)}},c.createTask=f,c.getTask=h,c.updateTask=b,c.addTask=T,c.closeTask=function M(u){var p=h(u);if(p&&p.isActive){var d=p.text;return p.priority&&(d=d.replace(p.priority,"")),d="x "+O.formatDate(new Date)+" "+d,b(p.id,d),!0}return!1},c.activateTask=function I(u){var p=h(u);if(p&&!p.isActive){let d=p.text;return d=d.replace(/^(x )/,"").replace(p.completedDate+" ",""),b(p.id,d),!0}return!1}}(U||(U={}));var y=N(441),t=N(802),F=N(481);function E(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",39),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext(2).$implicit;return t.\u0275\u0275nextContext().click_MarkComplete(f.id)}),t.\u0275\u0275element(1,"i",40),t.\u0275\u0275elementEnd()}}function R(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",41),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext(2).$implicit;return t.\u0275\u0275nextContext().click_MarkActive(f.id)}),t.\u0275\u0275element(1,"i",42),t.\u0275\u0275elementEnd()}}function G(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",35),t.\u0275\u0275template(1,E,2,0,"button",36),t.\u0275\u0275template(2,R,2,0,"button",37),t.\u0275\u0275elementStart(3,"button",38),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext().$implicit;return t.\u0275\u0275nextContext().click_StartEditTask(f.id)}),t.\u0275\u0275elementEnd()()}if(2&c){const i=t.\u0275\u0275nextContext().$implicit,a=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",i.isActive),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!i.isActive),t.\u0275\u0275advance(1),t.\u0275\u0275classMapInterpolate1("btn btn-lg ",i.isActive?"btn-light":"btn-outline-success"," text-start w-100"),t.\u0275\u0275property("innerHTML",a.getMarkupForTask(i.text),t.\u0275\u0275sanitizeHtml)}}function Z(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",50),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext(2).$implicit;return t.\u0275\u0275nextContext().click_DeleteTask(f.id)}),t.\u0275\u0275element(1,"i",51),t.\u0275\u0275elementStart(2,"span",8),t.\u0275\u0275text(3," Delete Task"),t.\u0275\u0275elementEnd()()}}function V(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div")(1,"div",43),t.\u0275\u0275listener("keydown.enter",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext().$implicit;return t.\u0275\u0275nextContext().click_SaveTaskEdit(f.id)})("keydown.esc",function(){return t.\u0275\u0275restoreView(i),t.\u0275\u0275nextContext(2).click_CancelTaskEdit()}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(2,"div",44)(3,"button",45),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(i);const f=t.\u0275\u0275nextContext().$implicit;return t.\u0275\u0275nextContext().click_SaveTaskEdit(f.id)}),t.\u0275\u0275element(4,"i",46),t.\u0275\u0275elementStart(5,"span",8),t.\u0275\u0275text(6),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(7,"button",47),t.\u0275\u0275listener("click",function(){return t.\u0275\u0275restoreView(i),t.\u0275\u0275nextContext(2).click_CancelTaskEdit()}),t.\u0275\u0275element(8,"i",48),t.\u0275\u0275elementStart(9,"span",8),t.\u0275\u0275text(10," Discard Changes"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(11,Z,4,0,"button",49),t.\u0275\u0275elementEnd()()}if(2&c){const i=t.\u0275\u0275nextContext().$implicit,a=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275propertyInterpolate1("id","textarea_",i.id,""),t.\u0275\u0275property("innerHTML",a.getMarkupForTask(i.text),t.\u0275\u0275sanitizeHtml),t.\u0275\u0275advance(5),t.\u0275\u0275textInterpolate1(" ",a.isAddingNew?"Save":"Update"," Task"),t.\u0275\u0275advance(5),t.\u0275\u0275property("ngIf",!a.isAddingNew)}}function B(c,g){if(1&c&&(t.\u0275\u0275elementStart(0,"div"),t.\u0275\u0275template(1,G,4,6,"div",33),t.\u0275\u0275template(2,V,12,4,"div",34),t.\u0275\u0275elementEnd()),2&c){const i=g.$implicit,a=t.\u0275\u0275nextContext();t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",a.editingTaskId!=i.id),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",a.editingTaskId==i.id)}}function z(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",52),t.\u0275\u0275listener("click",function(){const h=t.\u0275\u0275restoreView(i).$implicit,b=t.\u0275\u0275nextContext(),T=t.\u0275\u0275reference(27);return b.keyup_UpdateFilter(h),T.value=h}),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()}if(2&c){const i=g.$implicit;t.\u0275\u0275propertyInterpolate1("title","Filter by priority: ",i,""),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",i,"")}}function L(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",52),t.\u0275\u0275listener("click",function(){const h=t.\u0275\u0275restoreView(i).$implicit,b=t.\u0275\u0275nextContext(),T=t.\u0275\u0275reference(27);return b.keyup_UpdateFilter(h),T.value=h}),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()}if(2&c){const i=g.$implicit;t.\u0275\u0275propertyInterpolate1("title","Filter by project: ",i,""),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",i,"")}}function Y(c,g){if(1&c){const i=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",52),t.\u0275\u0275listener("click",function(){const h=t.\u0275\u0275restoreView(i).$implicit,b=t.\u0275\u0275nextContext(),T=t.\u0275\u0275reference(27);return b.keyup_UpdateFilter(h),T.value=h}),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()}if(2&c){const i=g.$implicit;t.\u0275\u0275propertyInterpolate1("title","Filter by context: ",i,""),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",i,"")}}const te=[{path:"",component:(()=>{class c{constructor(i,a){this.sanitiser=i,this.changeDetector=a,this.requiredFileType=".txt",this.isDirty=!1,this.showClosed=D.getConfig().showClosed,this.downloadFileName="todo.txt"}toggleShowClosed(){var i=this;return C(function*(){let a=D.getConfig();a.showClosed=!a.showClosed,i.showClosed=a.showClosed,D.setConfig(a)})()}click_OpenToDoFile(){var i=this;return C(function*(){const a=yield O.readFile().catch(f=>{if("AbortError"!=f.name)return console.warn(`unable to use File System API so falling back to legacy mode: ${f}`),document.getElementById("file-input").click(),null});if(a){i.fileName=a.name;let f=a.text?.split("\n")||[];D.addTasks(...x.getMany(...f))}})()}processToDoFile(i){var a=this;return C(function*(){if(i){let f=i.target?.files;if(f&&f.length>0){let h=f[0];if(h){D.removeAllTasks(),a.fileName=h.name;let T=(yield h.text()).split("\n");D.addTasks(...x.getMany(...T))}}}})()}click_AddTask(){var i=this;return C(function*(){i.isAddingNew=!0;let a=x.get("");return U.addTask(a),i.isDirty=!0,yield i.click_StartEditTask(a.id)})()}click_SaveTasks(){var i=this;return C(function*(){let a=i.getTasks().map(f=>f.text?.trim())?.join("\n");a&&(yield O.saveToFile({text:a,name:i.fileName}).catch(f=>{if("AbortError"!=f.name){console.warn(`unable to use File System API so falling back to legacy mode: ${f}`);let h=new Blob([a],{type:"data:attachment/text; charset=utf-8"});(0,y.saveAs)(h,i.downloadFileName)}})),i.isDirty=!1})()}keyup_UpdateFilter(i){var a=this;return C(function*(){a.filterStr=i})()}click_ClearFilter(i){var a=this;return C(function*(){a.filterStr=null,i.target.value=void 0})()}click_MarkComplete(i){return C(function*(){U.closeTask(i)})()}click_MarkActive(i){return C(function*(){U.activateTask(i)})()}click_StartEditTask(i){var a=this;return C(function*(){return a.editingTaskId=i,a.changeDetector.detectChanges(),yield a.setFocus(i)})()}setFocus(i){return C(function*(){let a=document.getElementById(`textarea_${i}`);return a?(console.info(`setting focus on element 'textarea_${i}'`),a.focus(),i):Promise.reject(`unable to find element 'textarea_${i}'`)})()}click_SaveTaskEdit(i){var a=this;return C(function*(){let f=document.querySelector(`#textarea_${i}`).innerText;return U.updateTask(i,f),a.isDirty=!0,a.doneEditing(),f})()}click_CancelTaskEdit(){var i=this;return C(function*(){i.isAddingNew&&i.click_DeleteTask(i.editingTaskId),i.doneEditing()})()}click_DeleteTask(i){var a=this;return C(function*(){D.removeTask(i),a.isDirty=!0,a.doneEditing()})()}doneEditing(){this.editingTaskId=null,this.isAddingNew=!1,this.changeDetector.detectChanges()}getTasks(){let i=U.getFilteredTaskArray(this.filterStr);if(!D.getConfig().showClosed){let f=[];for(var a=0;a<i.length;a++)i[a].isActive&&f.push(i[a]);i=f}return i}getMarkupForTask(i){let a=x.get(i);i=O.htmlEncode(i);let f=this.getDisplayClassForTask(a);i=i.replace(a.priority,'<span class="'+f+'"><b>'+a.priority+"</b></span>"),a.projects.forEach(M=>{var I=new RegExp(M.replace(/\+/g,"\\+")+"(?![0-9A-Za-z])","g");i=i.replace(I,'<span class="text-muted"><b><i>'+M+"</i></b></span>")}),a.contexts.forEach(M=>{var I=new RegExp(M+"(?![0-9A-Za-z])","g");i=i.replace(I,'<span class="text-muted"><b><i>'+M+"</i></b></span>")});let T=a.createdDate;return T&&(i=i.replace(T,'<span class="text-muted hidden-xs"><b><i>'+T+"</i></b></span>")),this.sanitiser.bypassSecurityTrustHtml(i)}getDisplayClassForTask(i){let a="";return null!==i.priority&&i.isActive&&("(A)"===i.priority&&(a+=" text-danger"),"(B)"===i.priority&&(a+=" text-warning"),"(C)"===i.priority&&(a+=" text-primary")),a}getPriorities(){return Array.from(P.priorities)}getProjects(){return Array.from(P.projects)}getContexts(){return Array.from(P.contexts)}}return c.\u0275fac=function(i){return new(i||c)(t.\u0275\u0275directiveInject(F.H7),t.\u0275\u0275directiveInject(t.ChangeDetectorRef))},c.\u0275cmp=t.\u0275\u0275defineComponent({type:c,selectors:[["app-todo-txt-web-ui"]],hostBindings:function(i,a){1&i&&t.\u0275\u0275listener("keydown.esc",function(){return a.click_CancelTaskEdit()})},decls:53,vars:11,consts:[[1,"container","py-1"],[1,"row"],[1,"col-md-9"],[1,"d-flex","flex-row","justify-content-evenly","pb-1"],[1,"d-flex","flex-column","flex-grow-1"],[1,"btn-group","btn-group-justified"],["aria-label","upload file","data-bs-toggle","tooltip","data-bs-placement","top","title","Import todo.txt file",1,"file-upload","btn","btn-secondary","btn-lg",3,"click"],[1,"bi","bi-cloud-upload"],[1,"fw-light","d-none","d-lg-inline"],["aria-label","add task","id","addtask_button","data-bs-toggle","tooltip","data-bs-placement","top","title","New task",1,"btn","btn-lg","btn-primary",3,"click"],[1,"bi","bi-clipboard-plus"],["aria-label","save tasks to file","data-bs-toggle","tooltip","data-bs-placement","top","title","Export tasks",3,"click"],[1,"bi","bi-save"],[1,"d-flex","flex-column","p-2"],["data-bs-toggle","tooltip","data-bs-placement","top","title","Show closed tasks",1,"form-check","form-switch"],["type","checkbox","id","flexSwitchCheckDefault",1,"form-check-input",3,"checked","change"],["for","flexSwitchCheckDefault",1,"form-check-label","d-none","d-lg-inline"],["id","file-input","type","file",1,"file-input","visually-hidden",3,"accept","change"],["fileUpload",""],[1,"input-group","input-group-lg"],["type","text","placeholder","Type filter(s)","aria-label","task filter","aria-describedby","button-addon2",1,"form-control",3,"keyup"],["todoTxtFilter",""],["type","button","id","button-addon2","data-bs-toggle","tooltip","data-bs-placement","top","title","Clear filter",1,"btn","btn-primary",3,"click"],[1,"bi","bi-x-circle"],["aria-label","clear filter",1,"fw-light","d-none","d-lg-inline"],[4,"ngFor","ngForOf"],[1,"d-none","d-md-inline","col-md-3"],[1,"container"],[1,"row","pt-2"],[1,"card","p-0"],[1,"card-header"],[1,"btn-group-vertical"],["class","btn btn-outline-secondary list-group-item","data-bs-toggle","tooltip","data-bs-placement","top",3,"title","click",4,"ngFor","ngForOf"],["class","btn-group d-flex flex-nowrap pt-1","role","group",4,"ngIf"],[4,"ngIf"],["role","group",1,"btn-group","d-flex","flex-nowrap","pt-1"],["class","col-xs-2 btn btn-lg btn-light","aria-label","mark as complete","data-bs-toggle","tooltip","data-bs-placement","top","title","Mark complete",3,"click",4,"ngIf"],["class","col-xs-2 btn btn-lg btn-success","aria-label","mark as incomplete","data-bs-toggle","tooltip","data-bs-placement","top","title","Unmark / Make active",3,"click",4,"ngIf"],["aria-label","edit task","data-bs-toggle","tooltip","data-bs-placement","top","title","Edit task",3,"innerHTML","click"],["aria-label","mark as complete","data-bs-toggle","tooltip","data-bs-placement","top","title","Mark complete",1,"col-xs-2","btn","btn-lg","btn-light",3,"click"],[1,"bi","bi-circle"],["aria-label","mark as incomplete","data-bs-toggle","tooltip","data-bs-placement","top","title","Unmark / Make active",1,"col-xs-2","btn","btn-lg","btn-success",3,"click"],[1,"bit","bi-check-circle"],["tabindex","0","contenteditable","true",1,"textarea","btn","btn-lg","pt-1","text-start","w-100",3,"id","innerHTML","keydown.enter","keydown.esc"],["role","group",1,"btn-group","d-flex","flex-wrap","pt-1"],["aria-label","save changes","data-bs-toggle","tooltip","data-bs-placement","top","title","Save Changes (Enter)","data-bs-toggle","tooltip","data-bs-placement","top","title","Save changes",1,"btn","btn-success",3,"click"],[1,"bi","bi-check"],["aria-label","discard changes","data-bs-toggle","tooltip","data-bs-placement","top","title","Discard Changes (Esc)","data-bs-toggle","tooltip","data-bs-placement","top","title","Discard changes",1,"btn","btn-warning",3,"click"],[1,"bi","bi-x"],["class","btn btn-danger","aria-label","delete task","data-bs-toggle","tooltip","data-bs-placement","top","title","Delete task",3,"click",4,"ngIf"],["aria-label","delete task","data-bs-toggle","tooltip","data-bs-placement","top","title","Delete task",1,"btn","btn-danger",3,"click"],[1,"bi","bi-trash"],["data-bs-toggle","tooltip","data-bs-placement","top",1,"btn","btn-outline-secondary","list-group-item",3,"title","click"]],template:function(i,a){if(1&i){const f=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"button",6),t.\u0275\u0275listener("click",function(){return a.click_OpenToDoFile()}),t.\u0275\u0275element(7,"i",7),t.\u0275\u0275elementStart(8,"span",8),t.\u0275\u0275text(9),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(10,"button",9),t.\u0275\u0275listener("click",function(){return a.click_AddTask()}),t.\u0275\u0275element(11,"i",10),t.\u0275\u0275elementStart(12,"span",8),t.\u0275\u0275text(13," New Task"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(14,"button",11),t.\u0275\u0275listener("click",function(){return a.click_SaveTasks()}),t.\u0275\u0275element(15,"i",12),t.\u0275\u0275elementStart(16,"span",8),t.\u0275\u0275text(17," Export Tasks"),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275elementStart(18,"div",13)(19,"div",14)(20,"input",15),t.\u0275\u0275listener("change",function(){return a.toggleShowClosed()}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(21,"label",16),t.\u0275\u0275text(22),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275elementStart(23,"input",17,18),t.\u0275\u0275listener("change",function(b){return a.processToDoFile(b)}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(25,"div",19)(26,"input",20,21),t.\u0275\u0275listener("keyup",function(){t.\u0275\u0275restoreView(f);const b=t.\u0275\u0275reference(27);return a.keyup_UpdateFilter(b.value)}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(28,"button",22),t.\u0275\u0275listener("click",function(b){t.\u0275\u0275restoreView(f);const T=t.\u0275\u0275reference(27);return a.click_ClearFilter(b),T.value=""}),t.\u0275\u0275element(29,"span",23),t.\u0275\u0275elementStart(30,"span",24),t.\u0275\u0275text(31," Clear Filter"),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275template(32,B,3,2,"div",25),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(33,"div",26)(34,"div",27)(35,"div",28)(36,"div",29)(37,"div",30),t.\u0275\u0275text(38," Priorities"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(39,"div",31),t.\u0275\u0275template(40,z,2,2,"button",32),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(41,"div",28)(42,"div",29)(43,"div",30),t.\u0275\u0275text(44," Projects"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(45,"div",31),t.\u0275\u0275template(46,L,2,2,"button",32),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(47,"div",28)(48,"div",29)(49,"div",30),t.\u0275\u0275text(50," Contexts"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(51,"div",31),t.\u0275\u0275template(52,Y,2,2,"button",32),t.\u0275\u0275elementEnd()()()()()()()}2&i&&(t.\u0275\u0275advance(9),t.\u0275\u0275textInterpolate1(" ",a.fileName||"Import todo.txt File",""),t.\u0275\u0275advance(5),t.\u0275\u0275classMapInterpolate1("btn btn-lg ",a.isDirty?"btn-warning":"btn-success",""),t.\u0275\u0275advance(6),t.\u0275\u0275property("checked",a.showClosed),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(a.showClosed?"Hide Closed Tasks":"Show Closed Tasks"),t.\u0275\u0275advance(1),t.\u0275\u0275property("accept",a.requiredFileType),t.\u0275\u0275advance(9),t.\u0275\u0275property("ngForOf",a.getTasks()),t.\u0275\u0275advance(8),t.\u0275\u0275property("ngForOf",a.getPriorities()),t.\u0275\u0275advance(6),t.\u0275\u0275property("ngForOf",a.getProjects()),t.\u0275\u0275advance(6),t.\u0275\u0275property("ngForOf",a.getContexts()))},directives:[S.NgForOf,S.NgIf],styles:["div.textarea[_ngcontent-%COMP%]{border:dashed 2px;border-radius:4px}"]}),c})()}];let oe=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=t.\u0275\u0275defineNgModule({type:c}),c.\u0275inj=t.\u0275\u0275defineInjector({imports:[[l.RouterModule.forChild(te)],l.RouterModule]}),c})(),ie=(()=>{class c{}return c.\u0275fac=function(i){return new(i||c)},c.\u0275mod=t.\u0275\u0275defineNgModule({type:c}),c.\u0275inj=t.\u0275\u0275defineInjector({imports:[[S.CommonModule,oe]]}),c})()},441:function(ee,J){var l;void 0!==(l=function(){"use strict";function C(y,t,F){var E=new XMLHttpRequest;E.open("GET",y),E.responseType="blob",E.onload=function(){U(E.response,t,F)},E.onerror=function(){console.error("could not download file")},E.send()}function O(y){var t=new XMLHttpRequest;t.open("HEAD",y,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function D(y){try{y.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),y.dispatchEvent(t)}}var x="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,P=x.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),U=x.saveAs||("object"!=typeof window||window!==x?function(){}:"download"in HTMLAnchorElement.prototype&&!P?function(y,t,F){var E=x.URL||x.webkitURL,R=document.createElement("a");R.download=t=t||y.name||"download",R.rel="noopener","string"==typeof y?(R.href=y,R.origin===location.origin?D(R):O(R.href)?C(y,t,F):D(R,R.target="_blank")):(R.href=E.createObjectURL(y),setTimeout(function(){E.revokeObjectURL(R.href)},4e4),setTimeout(function(){D(R)},0))}:"msSaveOrOpenBlob"in navigator?function(y,t,F){if(t=t||y.name||"download","string"!=typeof y)navigator.msSaveOrOpenBlob(function K(y,t){return typeof t>"u"?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(y.type)?new Blob(["\ufeff",y],{type:y.type}):y}(y,F),t);else if(O(y))C(y,t,F);else{var E=document.createElement("a");E.href=y,E.target="_blank",setTimeout(function(){D(E)})}}:function(y,t,F,E){if((E=E||open("","_blank"))&&(E.document.title=E.document.body.innerText="downloading..."),"string"==typeof y)return C(y,t,F);var R="application/octet-stream"===y.type,G=/constructor/i.test(x.HTMLElement)||x.safari,Z=/CriOS\/[\d]+/.test(navigator.userAgent);if((Z||R&&G||P)&&typeof FileReader<"u"){var V=new FileReader;V.onloadend=function(){var L=V.result;L=Z?L:L.replace(/^data:[^;]*;/,"data:attachment/file;"),E?E.location.href=L:location=L,E=null},V.readAsDataURL(y)}else{var B=x.URL||x.webkitURL,z=B.createObjectURL(y);E?E.location=z:location.href=z,E=null,setTimeout(function(){B.revokeObjectURL(z)},4e4)}});x.saveAs=U.saveAs=U,ee.exports=U}.apply(J,[]))&&(ee.exports=l)},481:(ee,J,N)=>{N.d(J,{H7:()=>ce});var S=N(643),l=N(802);typeof window<"u"&&window;let ce=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275prov=l.\u0275\u0275defineInjectable({token:o,factory:function(e){let r=null;return r=e?new(e||o):l.\u0275\u0275inject(ue),r},providedIn:"root"}),o})(),ue=(()=>{class o extends ce{constructor(e){super(),this._doc=e}sanitize(e,r){if(null==r)return null;switch(e){case l.SecurityContext.NONE:return r;case l.SecurityContext.HTML:return(0,l.\u0275allowSanitizationBypassAndThrow)(r,"HTML")?(0,l.\u0275unwrapSafeValue)(r):(0,l.\u0275_sanitizeHtml)(this._doc,String(r)).toString();case l.SecurityContext.STYLE:return(0,l.\u0275allowSanitizationBypassAndThrow)(r,"Style")?(0,l.\u0275unwrapSafeValue)(r):r;case l.SecurityContext.SCRIPT:if((0,l.\u0275allowSanitizationBypassAndThrow)(r,"Script"))return(0,l.\u0275unwrapSafeValue)(r);throw new Error("unsafe value used in a script context");case l.SecurityContext.URL:return(0,l.\u0275getSanitizationBypassType)(r),(0,l.\u0275allowSanitizationBypassAndThrow)(r,"URL")?(0,l.\u0275unwrapSafeValue)(r):(0,l.\u0275_sanitizeUrl)(String(r));case l.SecurityContext.RESOURCE_URL:if((0,l.\u0275allowSanitizationBypassAndThrow)(r,"ResourceURL"))return(0,l.\u0275unwrapSafeValue)(r);throw new Error("unsafe value used in a resource URL context (see https://g.co/ng/security#xss)");default:throw new Error(`Unexpected SecurityContext ${e} (see https://g.co/ng/security#xss)`)}}bypassSecurityTrustHtml(e){return(0,l.\u0275bypassSanitizationTrustHtml)(e)}bypassSecurityTrustStyle(e){return(0,l.\u0275bypassSanitizationTrustStyle)(e)}bypassSecurityTrustScript(e){return(0,l.\u0275bypassSanitizationTrustScript)(e)}bypassSecurityTrustUrl(e){return(0,l.\u0275bypassSanitizationTrustUrl)(e)}bypassSecurityTrustResourceUrl(e){return(0,l.\u0275bypassSanitizationTrustResourceUrl)(e)}}return o.\u0275fac=function(e){return new(e||o)(l.\u0275\u0275inject(S.DOCUMENT))},o.\u0275prov=l.\u0275\u0275defineInjectable({token:o,factory:function(e){let r=null;return r=e?new e:function Te(o){return new ue(o.get(S.DOCUMENT))}(l.\u0275\u0275inject(l.Injector)),r},providedIn:"root"}),o})()}}]);