(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-dev-maliangjie-index"],{"0d6b":function(e,t,a){var i=a("c1a9");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("cc010c4e",i,!0,{sourceMap:!1,shadowMode:!1})},"15c8":function(e,t,a){"use strict";var i=a("4ea4");a("4de4"),a("4160"),a("d81d"),a("a9e3"),a("b64b"),a("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("ade3")),o=i(a("5530")),l={data:function(){return{component:{opened:!1,disabled:!1,checkboxes:[],groups:[],selected:{}}}},components:{},props:{overlay:{type:Boolean,default:!0},type:{type:String,default:"normal"},title:{type:String},tip:{type:String},checkboxes:{type:Array,default:function(){return[]}},groups:{type:Array,default:function(){return[]}},maxnum:{type:Number,default:0}},watch:{checkboxes:{handler:function(e){this.setData({"component.checkboxes":e.map((function(e){return{label:e.label,value:JSON.stringify(e.value||e)}}))})},immediate:!0,deep:!0},groups:{handler:function(e){var t={},a=e.map((function(e,a){return(0,o.default)((0,o.default)({maxnum:0,id:"group-".concat(a)},e),{},{items:e.items.map((function(e){var i=e.value||e;return!0===e.selected&&(t[i]="group-".concat(a)),{label:e.label,value:i}})),$index:a})}));this.setData({"component.groups":a,"component.selected":t})},immediate:!0,deep:!0}},methods:{open:function(){this.setData({"component.opened":!0}),this.$emit("open")},close:function(){this.setData({"component.opened":!1}),this.$emit("close")},onGroupItemClick:function(e){var t=this.component.selected,a=JSON.parse(e.target.dataset.group),i=JSON.parse(e.target.dataset.value),o=(0,n.default)({},"component.groups[".concat(a.$index,"].disabled"),!1);if(t[i])delete t[i];else{if(1===this.maxnum)return void this.setData({"component.selected":[i]});1===a.maxnum&&Object.keys(t).forEach((function(e){t[e]===a.id&&delete t[e]})),this.component.disabled||!this.component.groups[a.$index]||this.component.groups[a.$index].disabled||(t[i]=a.id),a.maxnum>1&&Object.keys(t).filter((function(e){return t[e]===a.id})).length>=a.maxnum&&(o["component.groups[".concat(a.$index,"].disabled")]=!0)}o["component.disabled"]=this.maxnum&&Object.keys(t).length>=this.maxnum,o["component.selected"]=t,this.setData(o),this.$forceUpdate()},onCheckboxClick:function(e){var t=this.component.selected,a=e.target.dataset.value;t[a]?delete t[a]:(1===this.maxnum&&Object.keys(t).forEach((function(e){delete t[e]})),this.component.disabled||(t[a]=!0)),this.setData({"component.disabled":this.maxnum>1&&Object.keys(t).length>=this.maxnum,"component.selected":t})},ok:function(){this.close(),this.$emit("selected",{detail:Object.keys(this.component.selected).map((function(e){try{return JSON.parse(e)}catch(t){return e}}))})}}};t.default=l},1811:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"app-datepicker"},[a("v-uni-picker",{attrs:{mode:"date",fields:e.fields,value:e.fromDate},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onFromDateChanged.apply(void 0,arguments)}}},[e._v(e._s(e.component.from||(e.range?"开始日期":"选择日期")))]),e.range?[a("v-uni-text",{staticClass:"app-datepicker-split"},[e._v("~")]),a("v-uni-picker",{attrs:{mode:"date",fields:e.fields,value:e.toDate},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onToDateChanged.apply(void 0,arguments)}}},[e._v(e._s(e.component.to||"结束日期"))])]:e._e(),a("v-uni-image",{staticClass:"app-datepicker-icon",attrs:{src:"/static/assets/images/icon-calendar.png"}})],2)},o=[]},"31dd":function(e,t,a){var i=a("695e");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("5e7a7e85",i,!0,{sourceMap:!1,shadowMode:!1})},"38ee":function(e,t,a){"use strict";a.r(t);var i=a("f53f"),n=a("8115");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("6f25");var l,r=a("f0c5"),c=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"3bcb80ea",null,!1,i["a"],l);t["default"]=c.exports},4079:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"maliangjie-index-page"},[a("app-header",{attrs:{tabs:[{label:"购物列表"},{label:"项目排名"}]},on:{"tab-changed":function(t){arguments[0]=t=e.$handleEvent(t),e.onTabChanged.apply(void 0,arguments)}}},[a("app-project-selector",{on:{selected:function(t){arguments[0]=t=e.$handleEvent(t),e.onProjectSelected.apply(void 0,arguments)}}}),a("v-uni-view",{attrs:{slot:"right"},slot:"right"},[a("app-picker",{attrs:{range:!0,"from-date":"2020-10-12"},on:{changed:function(t){arguments[0]=t=e.$handleEvent(t),e.onDateChanged.apply(void 0,arguments)}}})],1)],1),a("app-section",[a("v-uni-view",{attrs:{slot:"head-title"},slot:"head-title"},[e._v("123")]),a("v-uni-view",{attrs:{slot:"head-actions"},slot:"head-actions"},[a("app-filter-dialog",{attrs:{type:"primary",tip:"筛选指标（注：最多可选3项）",maxnum:"1",checkboxes:e.checkboxes},on:{selected:function(t){arguments[0]=t=e.$handleEvent(t),e.onSelectedChanged.apply(void 0,arguments)}}},[e._v("复选框过滤")]),a("app-filter-dialog",{staticClass:"action",attrs:{groups:e.groups,maxnum:"3"},on:{selected:function(t){arguments[0]=t=e.$handleEvent(t),e.onSelectedChanged.apply(void 0,arguments)}}},[e._v("分组过滤")])],1),a("v-uni-view",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClick.apply(void 0,arguments)}}},[e._v("发送请求")])],1),a("app-section",{attrs:{title:"测试收起模式",collapseable:!0}},[e._v("测试收起模式")])],1)},o=[]},"40d0":function(e,t,a){"use strict";a.r(t);var i=a("deef"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},"5d16":function(e,t,a){"use strict";a.r(t);var i=a("1811"),n=a("de51");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("b8f1");var l,r=a("f0c5"),c=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"18b82a6a",null,!1,i["a"],l);t["default"]=c.exports},"624c":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,"/* pages/dev/maliangjie/index.wxss */",""]),e.exports=t},"695e":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,".app-datepicker[data-v-18b82a6a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.app-datepicker .app-datepicker-split[data-v-18b82a6a]{padding:0 %?10?%}.app-datepicker .app-datepicker-icon[data-v-18b82a6a]{margin-left:%?10?%;width:%?30?%;height:%?30?%}",""]),e.exports=t},"6a78":function(e,t,a){"use strict";var i=a("cb0e"),n=a.n(i);n.a},"6f25":function(e,t,a){"use strict";var i=a("0d6b"),n=a.n(i);n.a},8115:function(e,t,a){"use strict";a.r(t);var i=a("15c8"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},"8db8":function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("ade3")),o={data:function(){return{component:{from:null,to:null}}},components:{},props:{fields:{type:String,default:"day"},range:{type:Boolean,default:!1},fromKey:{type:String,default:"from"},toKey:{type:String,default:"to"},fromDate:{type:String},toDate:{type:String}},watch:{fromDate:{handler:function(e){this.setData({"component.from":e})},immediate:!0},toDate:{handler:function(e){this.setData({"component.to":e})},immediate:!0}},methods:{onFromDateChanged:function(e){var t=e.detail.value;this.setData({"component.from":t});var a,i={value:t};this.range&&(i.value=(a={},(0,n.default)(a,this.fromKey,t),(0,n.default)(a,this.toKey,this.component.to),a));this.$emit("changed",{detail:i})},onToDateChanged:function(e){var t=e.detail.value;this.setData({"component.to":t});var a,i={value:t};this.range&&(i.value=(a={},(0,n.default)(a,this.fromKey,this.component.from),(0,n.default)(a,this.toKey,t),a));this.$emit("changed",{detail:i})}}};t.default=o},"96cf":function(e,t,a){"use strict";a.r(t);var i=a("4079"),n=a("40d0");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("6a78");var l,r=a("f0c5"),c=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"519ea5da",null,!1,i["a"],l);t["default"]=c.exports},"980a":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAq1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9oaGhpaWlzc3N2dnaCgoKOjo6ioqKrq6vHx8fm5ubn5+fx8fH8/Pz9/f3///8PMjlbAAAAKnRSTlMAAQYHCRIUHB4nP0VMTVFobHGOkZOcsLG6xdDR0tXc3t/h5evv8PH4/f7HcgHDAAACD0lEQVRYw8WZ6VbCMBCFAwIiiFD2vRWKLO5a9b7/k1kQFVvSTNrL8f5MT7+TtJOZyY1SySpVG+3+yJ0vl3N31G83qiWVXoVac7hCRKths1ZIQ8tVOgtotOhUcpa4s/oUiZrWz2zW6sxg1MwRr/zShUjupQhX7kKsbtnMu/JhIf/KgMu31rDSupVP4hUHsNagqOedT5BCk3Md7+IaqXR9oZlfSl5IPDrH4gSpNTnyHfMDZNAg/q9byKRWLJ7X2YDrSISXfWSU/3cX9pBZvT/5BQQd5J6CywC6v/nRAUXOT76fcYCz76pQB0n1fX2bsoDTr1pYAU2VHbDDA3Z2MXPDAy62kVPTP397fI0Pvjx96N+ohcCm9un7w+Y+Rny53Tzrgc0QONQ/Dl+OEo8MHWoY9msrWBANPKxKqpr4lbeAQM4DqqoBOdHMQ0O1ISZGpntUbdWHlCjhoa/GEBJFPIyVBxlRxoOn5hAR72Q8zNUSMqKMhyUfSF+yy/0pLjtsRvzApm892+QQmJKDdfoKDOnLmGCDxIF4gjWVgMA4FCkBhiIV2BepxDIapCijhQW50NNbEX6zRG/n6A0nvyWmN+38YwX94KNUNzuve9rDI/14yz+A8y0CuonBt1n4RhDfquKbaXy7j29IbnehheXSK/+HqXsC25lvjO+te+1R/8beuj/B5cLh9cfY215/eGPJ9ccnVJw2j2y4/P4AAAAASUVORK5CYII="},b8f1:function(e,t,a){"use strict";var i=a("31dd"),n=a.n(i);n.a},c1a9:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,"app-filter-dialog + app-filter-dialog[data-v-3bcb80ea]{margin-left:%?15?%}.app-filter[data-v-3bcb80ea]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.app-filter .app-filter-icon[data-v-3bcb80ea]{margin-left:%?10?%;width:%?34?%;height:%?28?%}.app-filter.app-filter--primary[data-v-3bcb80ea]{color:#3992ba}.app-filter-dialog[data-v-3bcb80ea]{position:fixed;top:0;bottom:0;left:0;width:100%;z-index:100;color:#333}.app-filter-dialog.overlay[data-v-3bcb80ea]{background-color:rgba(0,0,0,.5)}.app-filter-dialog .app-filter-dialog__main[data-v-3bcb80ea]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;position:absolute;bottom:0;width:100%;max-height:80%;padding:%?30?% %?30?%;box-sizing:border-box;background-color:#fff;z-index:1;overflow:visible}.app-filter-dialog .app-filter-dialog__main .app-filter-dialog__main__close[data-v-3bcb80ea]{position:absolute;top:-60px;left:50%;width:%?80?%;height:%?80?%;background-color:#fff;border-radius:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.app-filter-dialog .app-filter-dialog__main__tip[data-v-3bcb80ea]{margin-bottom:%?30?%;font-size:%?28?%;color:#757575}.app-filter-dialog .app-filter-dialog__main__body[data-v-3bcb80ea]{-webkit-box-flex:1;-webkit-flex:1;flex:1;margin-bottom:%?30?%;overflow:auto}.app-filter-dialog .app-filter-dialog__main__body .checkbox-item[data-v-3bcb80ea]{margin-bottom:%?30?%}.app-filter-dialog .app-filter-dialog__main__body .group__title[data-v-3bcb80ea]{padding:%?10?%;font-size:%?28?%;color:#757575}.app-filter-dialog .app-filter-dialog__main__body .group__items[data-v-3bcb80ea]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?10?%}.app-filter-dialog .app-filter-dialog__main__body .group__items .group-item[data-v-3bcb80ea]{white-space:nowrap;padding:%?10?% %?20?%;margin-right:%?20?%;margin-bottom:%?20?%;background-color:#e3e3e3;color:#333}.app-filter-dialog .app-filter-dialog__main__body .group__items .group-item.selected[data-v-3bcb80ea]{background-color:#3a96bd;color:#fff}.app-filter-dialog .app-filter-dialog__main__body .group__items .group-item.disabled[data-v-3bcb80ea]{opacity:.5}.app-filter-dialog .app-filter-dialog__main__actions[data-v-3bcb80ea]{-webkit-flex-shrink:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:flex}.app-filter-dialog .app-filter-dialog__main__actions uni-button[data-v-3bcb80ea]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.app-filter-dialog .app-filter-dialog__main__actions uni-button + uni-button[data-v-3bcb80ea]{margin-left:%?20?%}",""]),e.exports=t},cb0e:function(e,t,a){var i=a("624c");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("24ff4594",i,!0,{sourceMap:!1,shadowMode:!1})},de51:function(e,t,a){"use strict";a.r(t);var i=a("8db8"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},deef:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("86dc")),o=i(a("5d16")),l=i(a("1b7d")),r=i(a("38ee")),c=i(a("f8fa")),d=(getApp(),{data:function(){return{checkboxes:[{label:"面积",key:"square",unit:"%",width:"120rpx"},{label:"招商率",key:"zsRate",unit:"%",width:"120rpx"},{label:"开业率",key:"kyRate",unit:"%",width:"120rpx"},{label:"日均客流(万/天)",key:"actualFlowDay",width:"220rpx",align:"right"},{label:"客流密度(人/㎡/天)",key:"permeability",width:"220rpx",align:"right"},{label:"租金收缴率",key:"zjRate",width:"220rpx",align:"right"}],groups:[{label:"分组一",maxnum:1,items:[{label:"分组一：数据1"},{label:"分组一：数据2"}]},{label:"分组二",maxnum:2,items:[{label:"分组二：数据1"},{label:"分组二：数据2"},{label:"分组二：数据3"}]}]}},components:{appHeader:n.default,appPicker:o.default,appSection:l.default,appFilterDialog:r.default,appProjectSelector:c.default},props:{},onLoad:function(){},methods:{onClick:function(){uni.showActionSheet({itemList:["A","B","C"]})},onProjectSelected:function(e){console.log("onProjectSelected",e)},onSelectedChanged:function(e){console.log(e)},onTabChanged:function(e){console.log(e)},onDateChanged:function(e){console.log(e)}}});t.default=d},f53f:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{class:"app-filter app-filter--"+e.type,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.open.apply(void 0,arguments)}}},[e._v(e._s(e.title)),e.title?i("v-uni-image",{staticClass:"app-filter-icon",attrs:{src:"/static/assets/images/icon-filter.png"}}):e._e(),e._t("default")],2),e.component.opened?i("v-uni-view",{staticClass:"app-filter-dialog overlay"},[i("v-uni-view",{staticClass:"app-filter-dialog__main"},[i("v-uni-image",{staticClass:"app-filter-dialog__main__close",attrs:{src:a("980a").replace(/^\./,"")},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.close.apply(void 0,arguments)}}}),e.tip?i("v-uni-view",{staticClass:"app-filter-dialog__main__tip"},[e._v(e._s(e.tip))]):e._e(),i("v-uni-view",{staticClass:"app-filter-dialog__main__body"},[e.component.groups.length?e._l(e.component.groups,(function(t,a){return i("v-uni-view",{key:a,staticClass:"group"},[i("v-uni-view",{staticClass:"group__title"},[e._v(e._s(t.label))]),i("v-uni-view",{staticClass:"group__items"},e._l(t.items,(function(a,n){return i("v-uni-view",{key:n,class:"group-item "+(e.component.selected[a.value]?"selected":"")+" "+(e.component.selected[a.value]||!t.disabled&&!e.component.disabled?"":"disabled"),attrs:{"data-value":JSON.stringify(a.value),"data-group":JSON.stringify(t)},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onGroupItemClick.apply(void 0,arguments)}}},[e._v(e._s(a.label))])})),1)],1)})):e._l(e.component.checkboxes,(function(t,a){return i("v-uni-view",{key:a,staticClass:"checkbox-item"},[i("v-uni-label",{staticClass:"checkbox",attrs:{"data-value":t.value},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onCheckboxClick.apply(void 0,arguments)}}},[i("v-uni-checkbox",{attrs:{checked:e.component.selected[t.value],disabled:!e.component.selected[t.value]&&e.component.disabled,"data-value":t.value},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.onCheckboxClick.apply(void 0,arguments)}}}),e._v(e._s(t.label))],1)],1)}))],2),i("v-uni-view",{staticClass:"app-filter-dialog__main__actions"},[i("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ok.apply(void 0,arguments)}}},[e._v("确定")])],1)],1)],1):e._e()],1)},o=[]}}]);