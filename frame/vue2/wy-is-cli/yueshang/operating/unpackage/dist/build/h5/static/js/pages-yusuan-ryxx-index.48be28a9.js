(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-yusuan-ryxx-index"],{"1ff5":function(e,t,a){"use strict";a.r(t);var n=a("f503"),o=a("3f98");for(var r in o)"default"!==r&&function(e){a.d(t,e,(function(){return o[e]}))}(r);a("d19d");var i,l=a("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"0d39e7ee",null,!1,n["a"],i);t["default"]=c.exports},"3ea4":function(e,t,a){"use strict";var n=a("4ea4");a("7db0"),a("d81d"),a("b64b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf3");var o=n(a("1da1")),r=a("9a6c"),i=n(a("bbb7")),l=n(a("86dc")),c=n(a("1b7d")),u=n(a("edc0")),s=n(a("0fa9")),d=n(a("e754")),p=getApp(),f=[{label:"编制类型",key:"staffingType",width:"150rpx",align:"left"},{label:"岗位类型",key:"stationType",width:"150rpx",align:"left"},{label:"出入口类型",key:"inletOutletType",width:"160rpx",align:"left"},{label:"总编制数",key:"headcount",width:"150rpx",align:"right",numberPrecision:0,numberFormat:!0},{label:"实际在岗人数",key:"realcount",width:"200rpx",align:"right",numberPrecision:0,numberFormat:!0},{label:"出入口个数",key:"inletOutletCount",width:"200rpx",align:"right",numberPrecision:0,numberFormat:!0}],h={data:function(){return{showSelector:!0,query:{bean:{budgetInstanceSheetId:null},pageNum:1,pageSize:1e3},bean:{budgetInstanceSheetId:null},page:{table:{}},table:{},opened:!1,projectName:"全部",projectId:null,menuItems:[]}},onShow:function(){this.showSelector=!0},onHide:function(){this.showSelector=!1},components:{appHeader:l.default,appSection:c.default,appProjectSelector:u.default,appTable:s.default,yusuanDialog:d.default},props:{},onLoad:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.setData({"query.bean.budgetInstanceSheetId":e.id,projectName:e.projectName,projectId:e.projectId}),this.loadMenu()},methods:{loadData:function(){var e=(0,o.default)(i.default.mark((function e(){var t,a,n;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.globalData.request.options({loading:!0}).post("http://pms.powerlong.com/budget/open/collecttarget/queryPage",this.query);case 2:t=e.sent,a=Object.assign({},t.data),n={"page.table":{columns:f,rows:a.list}},this.setData(n);case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),loadMenu:function(){var e=(0,o.default)(i.default.mark((function e(){var t,a,n,o,l;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.globalData.request.options({loading:!0}).post("http://pms.powerlong.com/budget/open/getBudgetInstanceSheet",{projectId:this.projectId});case 2:t=e.sent,a=t.data.map((function(e){return{label:e.name,value:e}})),n="/".concat(this.route),o=Object.keys(r.projectPageMap).find((function(e){var t=r.projectPageMap[e];return t[1]===n})),l=t.data.find((function(e){return e.budgetSheetId==o})),this.setData({"query.bean.budgetInstanceSheetId":(l||{}).id,menuItems:a}),this.loadData();case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onProjectSelected:function(e){this.setData({projectId:e.detail.value.mallId,projectName:e.detail.value.shortName}),this.loadMenu()},openSelector:function(){this.setData({opened:!0})},onSelectorClosed:function(){this.setData({opened:!1})}}};t.default=h},"3f98":function(e,t,a){"use strict";a.r(t);var n=a("3ea4"),o=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=o.a},cf63:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,".selector[data-v-0d39e7ee]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#3992ba}.selector uni-image[data-v-0d39e7ee]{margin-left:%?10?%;width:%?24?%;height:%?12?%}",""]),e.exports=t},d19d:function(e,t,a){"use strict";var n=a("d97c"),o=a.n(n);o.a},d97c:function(e,t,a){var n=a("cf63");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=a("4f06").default;o("d16da296",n,!0,{sourceMap:!1,shadowMode:!1})},f503:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"yusuan-ryxx"},[a("app-header",[e.showSelector?a("app-project-selector",{attrs:{selected:{label:e.projectName}},on:{selected:function(t){arguments[0]=t=e.$handleEvent(t),e.onProjectSelected.apply(void 0,arguments)}}}):e._e()],1),a("app-section",[a("v-uni-view",{attrs:{slot:"head-title"},slot:"head-title"},[a("v-uni-view",{staticClass:"selector",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openSelector.apply(void 0,arguments)}}},[e._v("基础信息-人员信息"),a("v-uni-image",{attrs:{src:"/static/assets/images/icon-selector-arrow-blue.svg"}})],1)],1),a("app-table",{attrs:{fixednum:2,columns:e.page.table.columns,values:e.page.table.rows,"total-row":e.page.table.totalRow}})],1),a("yusuan-dialog",{attrs:{items:e.menuItems,projectName:e.projectName,projectId:e.projectId,opened:e.opened},on:{closed:function(t){arguments[0]=t=e.$handleEvent(t),e.onSelectorClosed.apply(void 0,arguments)}}})],1)},r=[]}}]);