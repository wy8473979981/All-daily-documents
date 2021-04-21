(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2abf"],{

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

/***/ "KVa0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_747c67f5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LnTK");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_747c67f5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_747c67f5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_747c67f5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "KexH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/add.vue?vue&type=template&id=747c67f5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isLoading),expression:"isLoading"}],staticClass:"content"},[_c('div',{staticClass:"section"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":_vm.pageTitle}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入活动名称"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"ownerUserName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请选择拥有人","disabled":true},model:{value:(_vm.ruleForm.ownerUserName ),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ownerUserName", $$v)},expression:"ruleForm.ownerUserName "}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.changOwnerFunc},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动类型","prop":"type"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.type),callback:function ($$v) {_vm.$set(_vm.ruleForm, "type", $$v)},expression:"ruleForm.type"}},_vm._l((_vm.dictTable.MARKET_ACTIVITY_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动地点","prop":"location"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入活动地点"},model:{value:(_vm.ruleForm.location),callback:function ($$v) {_vm.$set(_vm.ruleForm, "location", $$v)},expression:"ruleForm.location"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"开始日期","prop":"startDate"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"type":"date","placeholder":"选择开始日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.startDate),callback:function ($$v) {_vm.$set(_vm.ruleForm, "startDate", $$v)},expression:"ruleForm.startDate"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"结束日期","prop":"endDate"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"picker-options":_vm.endPickerOptions,"type":"date","placeholder":"选择结束日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.endDate),callback:function ($$v) {_vm.$set(_vm.ruleForm, "endDate", $$v)},expression:"ruleForm.endDate"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"营销方案","prop":"plan"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.plan),callback:function ($$v) {_vm.$set(_vm.ruleForm, "plan", $$v)},expression:"ruleForm.plan"}},_vm._l((_vm.dictTable.MARKET_ACTIVITY_PLAN),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{staticClass:"desTextarea",attrs:{"prop":"note","label":"活动描述"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"type":"textarea","rows":5,"maxlength":"300","show-word-limit":"","placeholder":"请输入活动描述"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1)],1)],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)],1),_vm._v(" "),(_vm.belongerVisible)?_c('belongerComponent',{attrs:{"show":_vm.belongerVisible},on:{"update:show":function($event){_vm.belongerVisible=$event},"listenEvent":_vm.setTableRow}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/add.vue?vue&type=template&id=747c67f5&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// EXTERNAL MODULE: ./src/components/belongerComponent/index.vue + 4 modules
var belongerComponent = __webpack_require__("YOAK");

// EXTERNAL MODULE: ./src/api/marketService.js
var marketService = __webpack_require__("2zWU");

// EXTERNAL MODULE: ./src/utils/index.js
var utils = __webpack_require__("7Qib");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/add.vue?vue&type=script&lang=js&

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





/* harmony default export */ var addvue_type_script_lang_js_ = ({
  components: {
    belongerComponent: belongerComponent["a" /* default */]
  },
  data: function data() {
    var self = this;
    return {
      pageTitle: "新建市场活动",
      belongerVisible: false,
      dateTypeString: "yyyy-MM-dd", //时间格式
      SelectionOptions: consts["a" /* SelectionOptions */],
      routeQuery: {},
      isLoading: false, //是否正在加载
      isSubmitting: false, //是否正在提交
      ruleForm: {
        name: "",
        ownerUserNo: "", //拥有人No 
        ownerUserName: "", //拥有人name
        type: "",
        startDate: "",
        endDate: "",
        location: "",
        note: "",
        plan: ""
      },
      rules: {
        //校验规则
        name: [{ required: true, message: "请输入活动名称", trigger: ["blur"] }, { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }],
        ownerUserName: [{ required: true, message: "请选择拥有人", trigger: "blur" }],
        type: [{
          required: true,
          message: "请选择活动类型",
          trigger: ["blur", "change"]
        }],
        startDate: [{
          required: true,
          message: "请选择开始日期",
          trigger: ["blur", "change"]
        }],
        endDate: [{
          required: true,
          message: "请选择结束日期",
          trigger: ["blur", "change"]
        }]
      },
      startPickerOptions: {
        disabledDate: function disabledDate(time) {
          var nowDate = new Date();
          return time.getTime() < nowDate.getTime() - 24 * 3600 * 1000;
        }
      },
      endPickerOptions: {
        disabledDate: function disabledDate(time) {
          var startDate = self.ruleForm.startDate || "";
          if (startDate) {
            var sdTime = new Date(startDate).getTime() + 24 * 3600 * 1000;
            return time.getTime() < sdTime;
          }
        }
      },
      btnsProps: {
        submit: {
          text: "保存",
          func: this.submitForm,
          isSubmitting: false
        },
        cancel: {
          text: "取消",
          func: this.cancelFunc
        }
      },
      dictTable: null, //字典表
      addUrl: "/glp-crm/activity/create", //新增url
      editUrl: "/warehouse/update", //编辑url
      saveDetailUrl: "", //保存数据地址
      ListPath: "/market/index" //列表路由地址
    };
  },

  computed: {},

  created: function created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
    debugger;
    if (this.routeQuery.flag == "edit") {
      this.pageTitle = "修改市场活动";
      this.getMarketDetail();
    }
  },
  mounted: function mounted() {},

  methods: {
    getMarketDetail: function getMarketDetail() {
      var _this = this;

      marketService["a" /* default */].getMarketDetail(this.routeQuery.id).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          _this.ruleForm = extends_default()({}, ndata, {
            name: ndata.name,
            ownerUserNo: ndata.ownerUserNo,
            ownerUserName: ndata.ownerUserName,
            type: ndata.type,
            startDate: utils["a" /* Utils */].timestampToTime(ndata.startDate, 1),
            endDate: utils["a" /* Utils */].timestampToTime(ndata.endDate, 1),
            location: ndata.location,
            note: ndata.note,
            plan: ndata.plan
          });
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    setTableRow: function setTableRow(data) {
      debugger;
      this.belongerVisible = false;
      this.ruleForm.ownerUserName = data.userName;
      this.ruleForm.ownerUserNo = data.userNo;
    },
    changOwnerFunc: function changOwnerFunc() {
      this.belongerVisible = true;
    },
    submitForm: function submitForm() {
      var _this2 = this;

      //前端校验表单
      debugger;
      this.$refs["ruleForm"].validate(function (valid) {
        if (_this2.routeQuery.flag == "edit") {
          marketService["a" /* default */].updateMarket(_this2.ruleForm).then(function (res) {
            if (res.code == 200) {
              debugger;
              _this2.$message({ type: "success", message: "更新成功！" });
              _this2.$router.push({ path: _this2.ListPath });
            } else {
              _this2.$message({
                type: "warning",
                message: res.message ? res.message : "系统异常请联系管理员！"
              });
            }
          });
        } else {
          marketService["a" /* default */].addMarket(_this2.ruleForm).then(function (res) {
            if (res.code == 200) {
              debugger;
              _this2.$message({ type: "success", message: "新建成功！" });
              _this2.$router.push({ path: _this2.ListPath });
            } else {
              _this2.$message({
                type: "warning",
                message: res.message ? res.message : "系统异常请联系管理员！"
              });
            }
          });
        }
      });
    },
    cancelFunc: function cancelFunc() {
      //返回
      this.$router.push({
        path: this.ListPath
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/add.vue?vue&type=script&lang=js&
 /* harmony default export */ var market_addvue_type_script_lang_js_ = (addvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/add.vue?vue&type=style&index=0&id=747c67f5&lang=scss&scoped=true&
var addvue_type_style_index_0_id_747c67f5_lang_scss_scoped_true_ = __webpack_require__("KVa0");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/market/add.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  market_addvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "747c67f5",
  null
  
)

/* harmony default export */ var add = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "LnTK":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);