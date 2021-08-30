(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-7357"],{

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

/***/ "6DHN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumerImport/index.vue?vue&type=template&id=1a1af37a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section table-section"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'导入步骤说明'}},[_c('p',[_vm._v("\n          1. 按照模版要求整理要导入的数据，\n          "),_c('el-link',{attrs:{"type":"primary"}},[_vm._v("点击下载模版")])],1),_vm._v(" "),_c('p',[_vm._v("2. 查询并选择需要关联的市场活动、来源渠道（可以留空，导入后需逐个关联）")]),_vm._v(" "),_c('p',[_vm._v("3. 点击选择文件，选择要导入的文件(注意： 只支持xls格式的文件)")]),_vm._v(" "),_c('p',[_vm._v("4. 单击“开始导入”按钮，完成数据导入")]),_vm._v(" "),_c('el-divider'),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"所属市场活动","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('el-button',{attrs:{"slot":"append"},on:{"click":_vm.searchActionFun},slot:"append"},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"市场活动渠道","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('el-button',{attrs:{"slot":"append"},on:{"click":_vm.searchChannelFun},slot:"append"},[_vm._v("查询")])],1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"选择需要导入的数据文件：","prop":"name"}},[_c('el-button',{on:{"click":_vm.searchChannelFun}},[_vm._v("选择文件")])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-button',{on:{"click":_vm.searchChannelFun}},[_vm._v("开始导入")]),_vm._v(" "),_c('el-button',{on:{"click":_vm.searchChannelFun}},[_vm._v("清空文件")])],1)],1)],1)],1)],1),_vm._v(" "),_c('actionModal',{attrs:{"show":_vm.actionVisible},on:{"update:show":function($event){_vm.actionVisible=$event},"listenEvent":_vm.setActionTableRow}}),_vm._v(" "),_c('channelModal',{attrs:{"show":_vm.channelVisible},on:{"update:show":function($event){_vm.channelVisible=$event},"listenEvent":_vm.setChannelTableRow}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumerImport/index.vue?vue&type=template&id=1a1af37a&scoped=true&

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/components/actionComponent/index.vue + 4 modules
var actionComponent = __webpack_require__("zD1F");

// EXTERNAL MODULE: ./src/components/channelComponent/index.vue + 4 modules
var channelComponent = __webpack_require__("dts1");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumerImport/index.vue?vue&type=script&lang=js&
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




/* harmony default export */ var consumerImportvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {
    actionModal: actionComponent["a" /* default */],
    channelModal: channelComponent["a" /* default */]
  },
  data: function data() {
    var self = this;
    return {
      actionVisible: false,
      channelVisible: false,
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      ruleForm: {
        name: "",
        owner: ""
      },
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        owner: [{ required: true, message: "请输入仓库产权人", trigger: "blur" }]
      },
      getListUrl: "/warehouse/list", //列表数据地址
      delListUrl: "/warehouse/del", //删除数据地址
      detailPath: "/detail/view", //详情页路由地址
      editPath: "/table/add" //编辑页路由地址
    };
  },
  created: function created() {
    this.getList();

    this.mockData();
  },

  methods: {
    setActionTableRow: function setActionTableRow(data) {
      debugger;
    },
    setChannelTableRow: function setChannelTableRow(data) {
      debugger;
    },
    searchChannelFun: function searchChannelFun() {
      this.channelVisible = true;
      debugger;
    },
    searchActionFun: function searchActionFun() {
      debugger;
      this.actionVisible = true;
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
// CONCATENATED MODULE: ./src/views/consumerImport/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_consumerImportvue_type_script_lang_js_ = (consumerImportvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumerImport/index.vue?vue&type=style&index=0&id=1a1af37a&lang=scss&scoped=true&
var consumerImportvue_type_style_index_0_id_1a1af37a_lang_scss_scoped_true_ = __webpack_require__("Y+YV");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/consumerImport/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_consumerImportvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1a1af37a",
  null
  
)

/* harmony default export */ var consumerImport = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "Y+YV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1a1af37a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jQWb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1a1af37a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1a1af37a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1a1af37a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "dts1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/channelComponent/index.vue?vue&type=template&id=56f68c47&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('el-dialog',{attrs:{"title":"查询渠道","visible":_vm.visible,"width":"800px"},on:{"update:visible":function($event){_vm.visible=$event},"close":function($event){return _vm.$emit('update:show', false)}}},[_c('el-form',{staticClass:"demo-form-inline",attrs:{"inline":true,"model":_vm.serachParm,"label-width":"80px"}},[_c('el-row',[_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"渠道名称"}},[_c('el-input',{attrs:{"placeholder":"渠道名称"},model:{value:(_vm.serachParm.name),callback:function ($$v) {_vm.$set(_vm.serachParm, "name", $$v)},expression:"serachParm.name"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onSearchSubmit}},[_vm._v("查询")])],1)],1)],1)],1),_vm._v(" "),_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":true},on:{"listenSingleEvent":_vm.setSingleSelection}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.visible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.ok}},[_vm._v("确 定")])],1)],1):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/channelComponent/index.vue?vue&type=template&id=56f68c47&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/components/channelComponent/index.vue?vue&type=script&lang=js&

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


/* harmony default export */ var channelComponentvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "channelComponent",
  data: function data() {
    return {
      visible: this.show,
      serachParm: {
        //查询参数
        name: null,
        id: null //已选的市场活动ID
      },
      selectTableRow: {},
      theadData: [{ checked: true, key: "name", val: "渠道名称" }],
      getListUrl: "/glp-crm/marketActivity/channel/listPage" //市场活动-渠道-分页列表-接口地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    marketActiveData: {
      type: Object,
      default: null
    }
  },
  watch: {
    show: function show() {
      this.visible = this.show;
    }
  },
  computed: {
    isShow: {
      get: function get() {
        return this.visible;
      },
      set: function set() {}
    }
  },
  created: function created() {
    this.serachParm = extends_default()({}, this.serachParm, {
      id: this.marketActiveData && this.marketActiveData.id || null
    });
    this.getList();
  },

  methods: {
    submitForm: function submitForm(formName) {
      var _this = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          console.log(_this.transferAry, _this.form, "submitForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSearchSubmit: function onSearchSubmit() {
      this.serachParm = extends_default()({}, this.serachParm);
      this.getList();
    },
    setSingleSelection: function setSingleSelection(data) {
      debugger;
      this.selectTableRow = data;
    },
    ok: function ok() {
      debugger;
      this.visible = false;
      this.$emit("listenEvent", this.selectTableRow);
    }
  }
});
// CONCATENATED MODULE: ./src/components/channelComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_channelComponentvue_type_script_lang_js_ = (channelComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/channelComponent/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_channelComponentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "56f68c47",
  null
  
)

/* harmony default export */ var channelComponent = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "jQWb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);