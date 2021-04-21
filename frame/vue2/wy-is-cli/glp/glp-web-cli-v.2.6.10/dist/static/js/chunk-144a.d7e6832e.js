(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-144a"],{

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

/***/ "2zWU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("WDT+");

/* harmony default export */ __webpack_exports__["a"] = ({

    // 市场活动- 批量删除、删除
    deleteMarket: function deleteMarket(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/deleteByIds', data, header);
    },

    // 市场活动-新增
    addMarket: function addMarket(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/create', data, header);
    },

    // 市场活动-修改
    updateMarket: function updateMarket(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/update', data, header);
    },

    // 市场活动-共享列表-查询
    shareMarket: function shareMarket(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/queryShare', data, header);
    },

    // 市场活动-共享-新建
    shareCreateMarket: function shareCreateMarket(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/createShare', data, header);
    },

    // 市场活动-共享-弹窗列表-删除
    shareDeleteMarket: function shareDeleteMarket(id, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/activity/deleteShare/' + id, header);
    },

    // 市场活动-详情
    getMarketDetail: function getMarketDetail(id, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/activity/detail/' + id, header);
    },

    // 市场活动-渠道-新增
    addChannel: function addChannel(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/marketActivity/channel/create', data, header);
    },
    // 市场活动-渠道-修改
    updateChannel: function updateChannel(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/marketActivity/channel/update', data, header);
    },
    // 市场活动-渠道-详情
    getChannelDetail: function getChannelDetail(id, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/marketActivity/channel/detail/' + id, header);
    },
    // 市场活动-渠道-删除
    deleteChannel: function deleteChannel(id, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/marketActivity/channel/delete/' + id, header);
    },

    // 市场活动-客户-关联建立
    createCustomer: function createCustomer(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/createCustomerRelated', data, header);
    },

    // 市场活动-相关客户列表-删除
    deleteRelatedCustomer: function deleteRelatedCustomer(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/activity/deleteCustomerRelated', data, header);
    },

    post: function post(url, data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])(url, data, header);
    },
    get: function get(url, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])(url, header);
    }
});

/***/ }),

/***/ "Hc9d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "PvUs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a766a062_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Hc9d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a766a062_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a766a062_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a766a062_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "wHRP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/index.vue?vue&type=template&id=a766a062&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section search-section"},[_c('Card',{attrs:{"show-header":false}},[_c('el-form',{ref:"searchForm",staticClass:"form-section",attrs:{"model":_vm.serachParm,"inline":true,"size":"small","label-width":"100px"}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":0}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"活动筛选","prop":"chooseFlag"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择活动"},model:{value:(_vm.serachParm.chooseFlag),callback:function ($$v) {_vm.$set(_vm.serachParm, "chooseFlag", $$v)},expression:"serachParm.chooseFlag"}},_vm._l((_vm.SelectionOptions.ActivityScreening),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"活动类型","prop":"type"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择活动类型"},model:{value:(_vm.serachParm.type),callback:function ($$v) {_vm.$set(_vm.serachParm, "type", $$v)},expression:"serachParm.type"}},_vm._l((_vm.dictTable.MARKET_ACTIVITY_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"活动日期","prop":"time"}},[_c('el-date-picker',{attrs:{"type":"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:(_vm.serachParm.time),callback:function ($$v) {_vm.$set(_vm.serachParm, "time", $$v)},expression:"serachParm.time"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":0}},[_c('el-col',{attrs:{"span":24,"align":"center"}},[_c('el-button',{staticClass:"btn-twofont",attrs:{"type":"primary","size":"small"},on:{"click":_vm.submitSearch}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{staticClass:"btn-twofont",attrs:{"size":"small"},on:{"click":function($event){return _vm.clearData('searchForm')}}},[_vm._v("重置")])],1)],1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"section table-section"},[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'列表'},on:{"setTheadItem":_vm.getTheadItem},scopedSlots:_vm._u([{key:"btns",fn:function(){return [_c('el-button',{staticClass:"btn-button",attrs:{"size":"small","type":"primary","disabled":_vm.multiBool},on:{"click":_vm.toDelete}},[_vm._v("批量删除")])]},proxy:true}])},[_vm._v(" "),_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":true,"checkbox":true},on:{"listenMultiEvent":_vm.setMultipleSelection}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1)],1),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[_c('p',[_vm._v("共计"+_vm._s(_vm.batchTotal)+"条")])]:_vm._e()]},proxy:true}])}),_vm._v(" "),(_vm.searchUserVisible)?_c('shareComponent',{attrs:{"show":_vm.searchUserVisible,"id":_vm.shareId},on:{"update:show":function($event){_vm.searchUserVisible=$event}}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/index.vue?vue&type=template&id=a766a062&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/components/shareComponent/index.vue + 9 modules
var shareComponent = __webpack_require__("AxFn");

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// EXTERNAL MODULE: ./src/api/marketService.js
var marketService = __webpack_require__("2zWU");

// EXTERNAL MODULE: ./src/utils/index.js
var utils = __webpack_require__("7Qib");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/index.vue?vue&type=script&lang=js&

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






/* harmony default export */ var marketvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {
    shareComponent: shareComponent["a" /* default */]
  },
  data: function data() {
    var self = this;
    return {
      searchUserVisible: false,
      batchDeleteVisible: false,
      shareValue: {},
      shareId: null,
      SelectionOptions: consts["a" /* SelectionOptions */],
      deleteVisible: false,
      batch: false, //批量
      batchTotal: 0, //批量删除条数
      theadData: [{ checked: true, key: "name", val: "活动名称" }, {
        checked: true,
        key: "type",
        val: "活动类型",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          var current = null;
          consts["a" /* SelectionOptions */].ActivityType.map(function (item, index, array) {
            if (item.key == row.type) {
              current = item;
            }
          });
          return current.name;
        }
      }, { checked: true, key: "createUserName", val: "拥有人" }, {
        checked: true,
        key: "startDate",
        val: "开始日期",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return utils["a" /* Utils */].timestampToTime(row.startDate, 1);
        }
      }, {
        checked: true,
        key: "endDate",
        val: "结束日期",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return utils["a" /* Utils */].timestampToTime(row.endDate, 1);
        }
      }, { checked: true, key: "plan", val: "营销方案" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "200px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      serachParm: {
        //查询参数
        chooseFlag: 0,
        type: null,
        time: null,
        startDate: null,
        endDate: null,
        userNo: "001"
      },
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      delKeyword: "活动",
      dictTable: null, //字典表
      multipleSelection: [],
      getListUrl: "/glp-crm/activity/queryList", //列表数据地址
      delListUrl: "/glp-crm/activity/deleteByIds", //批量删除数据地址
      detailPath: "/market/detail", //详情页路由地址
      addPath: "/market/add", //新增、编辑页路由地址
      editPath: "/market/edit" //新增、编辑页路由地址
    };
  },

  computed: {
    multiBool: {
      get: function get() {
        return this.multipleSelection.length == 0;
      },
      set: function set() {}
    }
  },
  created: function created() {
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {
    this.getList();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "共享",
        type: "text",
        func: this.shareFunc
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "详情",
        type: "text",
        func: this.detailFunc
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: function checkFunc(row) {
          return true;
        }
      });
      return items;
    },
    shareFunc: function shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = row.id;
    },
    submitSearch: function submitSearch() {
      // 查询市场活动列表
      this.serachParm = extends_default()({}, this.serachParm, {
        startDate: this.serachParm.time && this.serachParm.time[0],
        endDate: this.serachParm.time && this.serachParm.time[1]
      });
      this.toSearch();
    },
    formatFn: function formatFn(item) {
      return item;
    },
    setMultipleSelection: function setMultipleSelection(val) {
      debugger;
      this.multipleSelection = val && val.map(function (item) {
        return item.id;
      });
      console.log(this.multipleSelection, "this.multipleSelection");
    },
    toDelete: function toDelete(row) {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.rowItem = row;
      this.batchTotal = this.multipleSelection.length;
    },
    deleteFunc: function deleteFunc(row) {
      this.deleteVisible = true;
      this.dialogTxt = "确认删除选中数据？";
      this.rowItem = row;
    },
    getDelItem: function getDelItem(data) {
      var _this = this;

      //删除事件
      this.deleteVisible = false;
      var params = void 0;
      var message = "批量删除成功！";
      if (data.type == true) {
        if (this.batch) {
          this.batch = false;
          params = { marketActivityReq: this.multipleSelection };
        } else {
          params = { marketActivityReq: [this.rowItem.id] };
          message = "删除成功！";
        }
        marketService["a" /* default */].deleteMarket(params).then(function (res) {
          if (res.code == 200) {
            _this.$message({ type: "success", message: message });
            _this.pageInfo.page = 1;
            _this.getList();
          } else {
            _this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_marketvue_type_script_lang_js_ = (marketvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/index.vue?vue&type=style&index=0&id=a766a062&lang=scss&scoped=true&
var marketvue_type_style_index_0_id_a766a062_lang_scss_scoped_true_ = __webpack_require__("PvUs");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/market/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_marketvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "a766a062",
  null
  
)

/* harmony default export */ var market = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);