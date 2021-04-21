(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-0aff"],{

/***/ "0YUH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QbLZ");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_tableTpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("iPXD");
/* harmony import */ var _components_paginationTpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Cxom");
/* harmony import */ var _components_CommonDialogTpl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("XQ5x");
/* harmony import */ var _api_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("KTTK");
/* harmony import */ var _js_common_businessLayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("0sTm");

/**
 * author   lut000
 * date     2019/08/21
 * purpose  表格公用js
 * */





/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            isGetList: false,
            serachParm: {//查询字段
            },
            dateTypeString: 'yyyy/MM/dd', //时间格式

            pageInfo: {
                total: 0,
                size: 10,
                page: 1
            },
            multipleSelection: [],
            tableData: [], //表格数据
            lastName: '',
            theadData: [//表格头部信息

            ],

            rowItem: null, //当前选中的列表项
            showWidth: '420px', //设置弹出框宽度
            dialogVisible: false, //设置弹出框显示
            dialogTitle: '提示', //设置弹出框标题
            dialogTxt: '', //设置弹出框提示内容
            delKeyword: '仓库', //设置弹出框提示关键词

            localDataParentName: 'global_table_list', //本地存储列表数据键名
            tableListName: '', //列表名字

            getListUrl: '' //列表接口url地址
        };
    },


    components: {
        tableTemplate: _components_tableTpl__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
        paginationTemplate: _components_paginationTpl__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
        commonDialogTemplate: _components_CommonDialogTpl__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
    },
    created: function created() {

        this.setTheadCheckbox();
    },

    methods: {
        setTheadCheckbox: function setTheadCheckbox() {
            //设置表格简化数据
            var routePath = this.$route.path || '';
            // 定义本地存储名称
            this.tableListName = routePath;

            var hideTheadData = [];
            if (routePath != '') {
                var localThead = _js_common_businessLayer__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getLocalData(this.localDataParentName, this.tableListName);
                hideTheadData = localThead || [];
            }
            this.theadData.forEach(function (item) {
                var checkItem = hideTheadData.find(function (nitem) {
                    return nitem.key == item.key;
                });
                if (checkItem) {
                    item.checked = false;
                }
            });
        },
        getTheadItem: function getTheadItem(data) {
            //监听表格列变化
            this.theadData = data;
        },
        getList: function getList() {
            var _this = this;

            //获取列表数据
            if (this.isGetList == true) {
                return;
            }
            this.isGetList = true;
            var params = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.serachParm, {
                page: this.pageInfo.page,
                size: this.pageInfo.size
            });
            _api_common__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].post(this.getListUrl, params).then(function (res) {
                if (res.code == 200) {
                    var ndata = res.data || {};
                    _this.tableData = ndata.items || [];
                    _this.pageInfo.total = ndata.totalNum || 0;
                    debugger;
                } else {
                    _this.$message({
                        type: 'warning',
                        message: res.message ? res.message : '系统异常请联系管理员！'
                    });
                }
                _this.isGetList = false;
            }, function (err) {
                _this.isGetList = false;
            });
        },
        mockData: function mockData() {
            var _this2 = this;

            var arr = [];

            var _loop = function _loop(i, len) {
                var obj = {};
                _this2.theadData.forEach(function (item, index) {
                    obj[item.key] = item.val + i;
                });
                arr.push(obj);
            };

            for (var i = 0, len = 2; i < len; i++) {
                _loop(i, len);
            };
            this.tableData = arr;
            console.log(this.tableData, 'tableData');

            this.pageInfo.total = 30;
        },
        getPageChange: function getPageChange(data) {
            this.pageInfo.page = data.currentPage;
            this.getList();
        },
        toSearch: function toSearch() {
            //搜索
            this.pageInfo.page = 1;
            this.pageInfo.total = 0;
            this.getList();
        },
        clearData: function clearData(formName) {
            //重置
            this.$refs[formName].resetFields();
        },
        addFunc: function addFunc() {
            debugger; //新增列表
            this.$router.push({
                path: this.addPath,
                query: {
                    // viewType:1              //1=新增
                }
            });
        },
        editFunc: function editFunc(item) {
            debugger; //编辑
            this.$router.push({
                path: this.editPath,
                query: {
                    id: item.id,
                    flag: 'edit'
                    // viewType:2,
                    // isApprove:item.readOnly==1?1:2                //readOnly=1,审批中
                }
            });
        },
        detailFunc: function detailFunc(item) {
            //查看
            debugger;
            this.$router.push({
                path: this.detailPath,
                query: {
                    id: item.id,
                    viewType: 1
                }
            });
        },
        getDelItem: function getDelItem(data) {
            debugger; //监听删除事件
            this.dialogVisible = false;
            if (data.type == true) {
                // 确定删除
                var params = {
                    id: this.rowItem.id
                };
                this.saveDelete(params);
            }
        },
        saveDelete: function saveDelete(params) {
            var _this3 = this;

            //删除列表数据
            if (this.isGetList == true) {
                return;
            }
            this.isGetList = true;
            _api_common__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].post(this.delListUrl, params).then(function (res) {
                _this3.isGetList = false;
                if (res.code == 200) {
                    _this3.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    _this3.pageInfo.page = 1;
                    _this3.getList();
                } else {
                    _this3.$message({
                        type: 'warning',
                        message: res.message ? res.message : '系统异常请联系管理员！'
                    });
                }
            }, function (err) {
                // this.$message({
                //     type:'error',
                //     message:'网络似乎出现了问题，请稍后再试'
                // })
                _this3.isGetList = false;
            });
        },
        deleteFunc: function deleteFunc(item) {
            debugger; //获取删除对象
            this.dialogVisible = true;
            this.dialogTxt = '确定要删除' + this.delKeyword + '“' + item.name + '”吗？';
            this.rowItem = item;
        }
    }
});

/***/ }),

/***/ "AS6G":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_36b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("usbF");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_36b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_36b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_36b27166_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "gw2F":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/legalControl/index.vue?vue&type=template&id=36b27166&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section search-section"},[_c('Card',{attrs:{"show-header":false}},[_c('el-form',{ref:"searchForm",staticClass:"form-section block-form",attrs:{"model":_vm.serachParm,"inline":true,"size":"small"}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":0}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"人员类型","prop":"chooseFlag"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.serachParm.chooseFlag),callback:function ($$v) {_vm.$set(_vm.serachParm, "chooseFlag", $$v)},expression:"serachParm.chooseFlag"}},_vm._l((_vm.SelectionOptions.ActivityScreening),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"客户名称","prop":"type"}},[_c('el-input',{staticClass:"form-item",attrs:{"placeholder":"请输入"},model:{value:(_vm.serachParm.owner),callback:function ($$v) {_vm.$set(_vm.serachParm, "owner", $$v)},expression:"serachParm.owner"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":0}},[_c('el-col',{attrs:{"span":24,"align":"center"}},[_c('el-button',{staticClass:"btn-twofont",attrs:{"type":"primary","size":"small"},on:{"click":_vm.submitSearch}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{staticClass:"btn-twofont",attrs:{"size":"small"},on:{"click":function($event){return _vm.clearData('searchForm')}}},[_vm._v("重置")])],1)],1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"section table-section"},[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"num":this.pageInfo.total,"title":'仓库列表'},on:{"setTheadItem":_vm.getTheadItem},scopedSlots:_vm._u([{key:"btns",fn:function(){return [_c('el-button',{staticClass:"btn-button",attrs:{"size":"small","type":"primary"},on:{"click":_vm.deletedFun}},[_vm._v("批量删除")])]},proxy:true}])},[_vm._v(" "),_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":true,"checkbox":true},on:{"listenEvent":_vm.setMultipleSelection}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1)],1),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.dialogVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/legalControl/index.vue?vue&type=template&id=36b27166&scoped=true&

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/legalControl/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var legalControlvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  data: function data() {
    var self = this;
    return {
      SelectionOptions: consts["a" /* SelectionOptions */],
      multipleSelection: [],
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "客户名称" }, { checked: true, key: "code", val: "类型" }, { checked: true, key: "code", val: "证件号码" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "150px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],

      serachParm: {
        //查询参数
        name: "",
        owner: "",
        code: "",
        createUser: "",
        createTimeStart: "",
        createTimeEnd: ""
      },
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },

      getListUrl: "/warehouse/list", //列表数据地址
      delListUrl: "/warehouse/del", //删除数据地址
      detailPath: "/more/legalControlIndex/detail", //详情页路由地址
      addPath: "/more/legalControlIndex/add", //新增页路由地址
      editPath: "/more/legalControlIndex/edit" //编辑页路由地址
    };
  },

  components: {},
  created: function created() {
    this.getList();

    this.mockData();
  },

  methods: {
    deletedFun: function deletedFun() {
      debugger;
      console.log(this.multipleSelection, "this.multipleSelection");
    },
    setMultipleSelection: function setMultipleSelection(val) {
      debugger;
      this.multipleSelection = val;
    },
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮

      var items = [];

      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc
      });
      items.push({
        name: "编辑",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: function checkFunc(row) {
          console.log(111111);
          return true;
        }
      });

      return items;
    },
    addFunc: function addFunc() {
      debugger;
      this.$router.push({
        path: this.addPath,
        query: { activeName: "second", viewType: 1 }
      });
    },
    editFunc: function editFunc() {
      this.$router.push({
        path: this.editPath,
        query: { activeName: "first", viewType: 1 }
      });
    },
    detailFunc: function detailFunc() {
      this.$router.push({
        path: this.detailPath,
        query: { activeName: "first", viewType: 1 }
      });
    },
    submitSearch: function submitSearch() {
      //提交搜索按钮
      if (this.serachParm.createTimeStart && this.serachParm.createTimeEnd) {
        if (this.serachParm.createTimeStart > this.serachParm.createTimeEnd) {
          this.$message({
            type: "warning",
            message: "开始时间必须大于结束时间"
          });
        } else {
          this.toSearch();
        }
      } else {
        this.toSearch();
      }
    },
    formatFn: function formatFn(item) {
      return item;
    }
  }
});
// CONCATENATED MODULE: ./src/views/legalControl/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_legalControlvue_type_script_lang_js_ = (legalControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/legalControl/index.vue?vue&type=style&index=0&id=36b27166&lang=scss&scoped=true&
var legalControlvue_type_style_index_0_id_36b27166_lang_scss_scoped_true_ = __webpack_require__("AS6G");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/legalControl/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_legalControlvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "36b27166",
  null
  
)

/* harmony default export */ var legalControl = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "usbF":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);