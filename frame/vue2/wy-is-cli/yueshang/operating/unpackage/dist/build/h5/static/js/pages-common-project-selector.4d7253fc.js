(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-common-project-selector"],{"0c66":function(t,e,r){"use strict";var n=r("4ea4");r("d81d"),r("13d5"),r("4e82"),r("b64b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r("96cf3");var o=n(r("1da1")),a=n(r("bbb7")),i=n(r("9178")),c=getApp(),u={data:function(){return{ready:!1,options:null,list:[]}},components:{appIndexList:i.default},props:{},onLoad:function(){var t=arguments,e=this;return(0,o.default)(a.default.mark((function r(){var n,o,i,u,l,s;return a.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:{},r.next=3,c.globalData.request.options({loading:!0,caching:5}).get("/open/bis-open-dict!selectProjectList.action",{operStatus:2});case 3:o=r.sent,i=c.globalData.cache.get("projectList"),i&&(i=JSON.parse(i)),u=i||o.data,l=u.reduce((function(t,e){var r=(e.projectShortName||e.pinyincode||"#")[0];return t[r]||(t[r]=[]),t[r].push(e),t}),{}),2!=c.globalData.grade&&(l["#"]=[{label:"全部",value:[{shortName:"全部"}]}]),s=Object.keys(l).sort().map((function(t){return{label:t,items:l[t].map((function(t){return{label:t.label||t.name||t.shortName,value:t}}))}})),e.setData({options:n,list:s,ready:!0});case 11:case"end":return r.stop()}}),r)})))()},methods:{onSelected:function(t){console.log(t.detail.label),"全部"===t.detail.label&&"false"!==this.options.disabledAll&&this.options.disabledAll?c.globalData.toast({title:"不能选择全部",icon:"none"}):(c.globalData.cache.set("project-selector-selected",t.detail),c.globalData.page.back())},onAllSelected:function(){this.onSelected({detail:{bisProjectId:"",shortName:"全部"}})}}};e.default=u},2790:function(t,e,r){"use strict";var n=r("4a1d"),o=r.n(n);o.a},2965:function(t,e,r){"use strict";r.r(e);var n=r("e504"),o=r("c49a");for(var a in o)"default"!==a&&function(t){r.d(e,t,(function(){return o[t]}))}(a);r("2790");var i,c=r("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"019bd296",null,!1,n["a"],i);e["default"]=u.exports},"42a9":function(t,e,r){"use strict";r.r(e);var n=r("bb2d"),o=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"4a1d":function(t,e,r){var n=r("f737");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=r("4f06").default;o("32c31f31",n,!0,{sourceMap:!1,shadowMode:!1})},"524e":function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var n={phoneDirectory:r("e962").default},o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticStyle:{width:"100%"}},[r("phone-directory",{staticStyle:{width:"100%"},attrs:{phones:t.component.list},on:{paramClick:function(e){arguments[0]=e=t.$handleEvent(e),t.onSelected.apply(void 0,arguments)}}})],1)},a=[]},9178:function(t,e,r){"use strict";r.r(e);var n=r("524e"),o=r("42a9");for(var a in o)"default"!==a&&function(t){r.d(e,t,(function(){return o[t]}))}(a);var i,c=r("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=u.exports},b636:function(t,e,r){var n=r("746f");n("asyncIterator")},bb2d:function(t,e,r){"use strict";var n=r("4ea4");r("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(r("5530")),a=n(r("e962")),i={data:function(){return{component:{list:[]}}},components:{phoneDirectory:a.default},props:{list:{type:Array,default:[]}},watch:{list:{handler:function(t){this.setData({"component.list":t.map((function(t){return(0,o.default)((0,o.default)({alpha:t.label},t),{},{subItems:t.items.map((function(t){return(0,o.default)({name:t.label},t)}))})}))})},immediate:!0,deep:!0}},methods:{onSelected:function(t){this.$emit("selected",{detail:t.detail})}}};e.default=i},bbb7:function(t,e,r){r("a4d3"),r("e01a"),r("b636"),r("d28b"),r("944a"),r("4160"),r("26e9"),r("fb6a"),r("0c47"),r("23dc"),r("3410"),r("131a"),r("d3b7"),r("25f0"),r("3ca3"),r("159b"),r("ddb0");(function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(G){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new N(n||[]);return a._invoke=_(t,r,i),a}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(G){return{type:"throw",arg:G}}}t.wrap=l;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",v={};function y(){}function b(){}function m(){}var g={};g[a]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(D([])));x&&x!==r&&n.call(x,a)&&(g=x);var L=m.prototype=y.prototype=Object.create(g);function j(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,a,i,c){var u=s(t[o],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;function a(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function _(t,e,r){var n=f;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw a;return P()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var u=s(t,e,r);if("normal"===u.type){if(n=r.done?p:d,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=p,r.method="throw",r.arg=u.arg)}}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=s(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function D(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}b.prototype=L.constructor=m,m.constructor=b,b.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},j(E.prototype),E.prototype[i]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},j(L),u(L,c,"Generator"),L[a]=function(){return this},L.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=D,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:D(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}}})(t.exports)},c49a:function(t,e,r){"use strict";r.r(e);var n=r("0c66"),o=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},e504:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticClass:"common-project-selector"},[r("v-uni-view",{staticClass:"selector-header"},[r("v-uni-view",{staticClass:"header-title"},[t._v("项目选择（在营）")])],1),r("app-index-list",{attrs:{list:t.list},on:{selected:function(e){arguments[0]=e=t.$handleEvent(e),t.onSelected.apply(void 0,arguments)}}})],1)},a=[]},f737:function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,".selected[data-v-019bd296]{padding:%?20?% %?20?% %?20?%;border-bottom:1px solid #ccc}.index-group__item[data-v-019bd296]{padding:%?30?% %?24?%;font-size:%?30?%}.common-project-selector[data-v-019bd296]{padding-top:45px}.selector-header[data-v-019bd296]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;line-height:44px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#fff;border-bottom:1px solid #dcdcdc;width:100%;position:fixed;top:0}.header-cancel[data-v-019bd296]{color:#1890ff;position:absolute;right:20px}",""]),t.exports=e}}]);