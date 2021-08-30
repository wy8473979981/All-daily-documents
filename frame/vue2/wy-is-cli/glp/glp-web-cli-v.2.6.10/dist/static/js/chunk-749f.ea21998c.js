(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-749f"],{

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

/***/ "E5+b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_enterpriseBusinessInfoTab_vue_vue_type_style_index_0_id_8b9c6a14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("VREw");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_enterpriseBusinessInfoTab_vue_vue_type_style_index_0_id_8b9c6a14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_enterpriseBusinessInfoTab_vue_vue_type_style_index_0_id_8b9c6a14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_enterpriseBusinessInfoTab_vue_vue_type_style_index_0_id_8b9c6a14_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "LERC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("WDT+");

/* harmony default export */ __webpack_exports__["a"] = ({

  // 客户 - 新增
  createConsumer: function createConsumer(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/create', data, header);
  },

  // 客户 - 编辑
  updateConsumer: function updateConsumer(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/update', data, header);
  },

  // 客户 - 删除
  deleteConsumerById: function deleteConsumerById(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/del', data, header);
  },

  // 客户 - 领用
  batchReceiveConsumer: function batchReceiveConsumer(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/claim', data, header);
  },

  // 客户 - 批转让
  batchTransferConsumer: function batchTransferConsumer(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/transfer', data, header);
  },

  // 客户 - 释放
  batchReleaseConsumer: function batchReleaseConsumer(data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/glp-crm/customer/release', data, header);
  },

  // 客户 - 详情
  consumerDetailById: function consumerDetailById(id, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/customer/info/' + id, header);
  },

  // 客户 - 根据当前登录用户获取公海信息
  getLiberumByCurrentUser: function getLiberumByCurrentUser(id, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/glp-crm/customer/poolInfo', header);
  },

  post: function post(url, data, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])(url, data, header);
  },
  get: function get(url, header) {
    return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])(url, header);
  }
});

/***/ }),

/***/ "LeVl":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "VREw":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "Vjij":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualBusinessInfoTab_vue_vue_type_style_index_0_id_28cc6c2c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LeVl");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualBusinessInfoTab_vue_vue_type_style_index_0_id_28cc6c2c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualBusinessInfoTab_vue_vue_type_style_index_0_id_28cc6c2c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualBusinessInfoTab_vue_vue_type_style_index_0_id_28cc6c2c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "cKd/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vMZ8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "qW6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/detail.vue?vue&type=template&id=020e1026&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content comsumer-detail"},[(_vm.loading)?_c('div',{staticClass:"section"},[_c('el-tabs',{attrs:{"type":"border-card"},on:{"tab-click":_vm.handleTabClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":"基本信息","name":"first"}},[(_vm.type=='ENTERPRISE')?[_c('enterpriseBusinessInfoTab',{attrs:{"baseInfo":_vm.baseInfo}})]:[_c('individualBusinessInfoTab',{attrs:{"baseInfo":_vm.baseInfo}})],_vm._v(" "),_c('Card',{attrs:{"title":'图谱和视图'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_c('el-link',{attrs:{"type":"primary"},on:{"click":_vm.cnsumerMap}},[_vm._v("查看客户图谱>>")])],1)]),_vm._v(" "),(_vm.baseInfo.ecifId)?_c('el-col',{attrs:{"span":12}},[_c('label',[_c('el-link',{attrs:{"type":"primary"},on:{"click":_vm.linesView}},[_vm._v("查看额度视图>>")])],1)]):_vm._e()],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],2),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"相关附件","name":"second"}},[_c('accessoryTab')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"联系人","name":"third"}},[_c('contactPersonTab')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"地址信息","name":"four"}},[_c('addressInfoTab')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"法定代表及实控人","name":"five"}},[_c('legalControlTab')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"商机","name":"six"}},[_c('businessTab')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"拜访","name":"seven"}},[_c('visitTab')],1)],1)],1):_vm._e(),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem}}),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.receiveVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getReceiveDelItem}}),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.transferVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getTransferDelItem}}),_vm._v(" "),_c('commonDialogTemplate',{staticClass:"body-center",attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.releaseVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getReleaseDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[_c('el-select',{staticClass:"liberum",attrs:{"placeholder":"请选择"},model:{value:(_vm.departmentCode),callback:function ($$v) {_vm.departmentCode=$$v},expression:"departmentCode"}},_vm._l((_vm.LiberumOptions),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.poolDesc,"value":item.poolType}})}),1)]:_vm._e()]},proxy:true}])}),_vm._v(" "),(_vm.belongerVisible)?_c('belongerModal',{attrs:{"show":_vm.belongerVisible},on:{"update:show":function($event){_vm.belongerVisible=$event},"listenEvent":_vm.setBelongerTableRow}}):_vm._e(),_vm._v(" "),(_vm.searchUserVisible)?_c('shareComponent',{attrs:{"show":_vm.searchUserVisible,"id":_vm.shareId},on:{"update:show":function($event){_vm.searchUserVisible=$event}}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/detail.vue?vue&type=template&id=020e1026&

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/components/shareComponent/index.vue + 9 modules
var shareComponent = __webpack_require__("AxFn");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/enterpriseBusinessInfoTab.vue?vue&type=template&id=8b9c6a14&scoped=true&
var enterpriseBusinessInfoTabvue_type_template_id_8b9c6a14_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-info-section corporateClient"},[_c('el-form',{ref:"form",staticClass:"form-section block-form",attrs:{"model":_vm.form,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户类型","prop":"customerTypeName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.customerTypeName ),callback:function ($$v) {_vm.$set(_vm.form, "customerTypeName", $$v)},expression:"form.customerTypeName "}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户简称","prop":"shortName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.shortName ),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "shortName", $$v)},expression:"form.enterprise.shortName "}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"owner"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.owner),callback:function ($$v) {_vm.$set(_vm.form, "owner", $$v)},expression:"form.owner"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件类型","prop":"certificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.certificateType),callback:function ($$v) {_vm.$set(_vm.form, "certificateType", $$v)},expression:"form.certificateType"}},_vm._l((_vm.dictTable.ENT_CERTIFICATE_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"是否GLP关联方","prop":"glpRelated"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.glpRelated),callback:function ($$v) {_vm.$set(_vm.form, "glpRelated", $$v)},expression:"form.glpRelated"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{staticClass:"tip-box",attrs:{"span":8}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"dark","content":"请输入客户社会信用代码或者注册号","placement":"top-start"}},[_c('i',{staticClass:"el-icon-info"})]),_vm._v(" "),_c('el-form-item',{attrs:{"span":12,"label":"证件号码","prop":"certificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.certificateId),callback:function ($$v) {_vm.$set(_vm.form, "certificateId", $$v)},expression:"form.certificateId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"overdueFlag","label":"是否存在逾期/代偿记录"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.overdueFlag),callback:function ($$v) {_vm.$set(_vm.form, "overdueFlag", $$v)},expression:"form.overdueFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"industry","label":"所属行业"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.industry),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "industry", $$v)},expression:"form.enterprise.industry"}},_vm._l((_vm.dictTable.INDUSTRY),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"channelFlag","label":"是否渠道客户"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.channelFlag),callback:function ($$v) {_vm.$set(_vm.form, "channelFlag", $$v)},expression:"form.channelFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"companyScale","label":"企业规模"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyScale),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyScale", $$v)},expression:"form.enterprise.companyScale"}},_vm._l((_vm.SelectionOptions.companyScale),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"id","label":"ECIF客户ID"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.ecifId),callback:function ($$v) {_vm.$set(_vm.form, "ecifId", $$v)},expression:"form.ecifId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"financingScale","label":"融资规模"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.financingScale),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "financingScale", $$v)},expression:"form.enterprise.financingScale"}},_vm._l((_vm.SelectionOptions.financingScale),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityId","label":"所属市场活动"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.activityId),callback:function ($$v) {_vm.$set(_vm.form, "activityId", $$v)},expression:"form.activityId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"companyFinancingAry","label":"融资需求"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"multiple":"","placeholder":"请选择"},model:{value:(_vm.companyFinancingAry),callback:function ($$v) {_vm.companyFinancingAry=$$v},expression:"companyFinancingAry"}},_vm._l((_vm.SelectionOptions.financingNeeds),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityChannelId","label":"市场活动渠道"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.activityChannelId),callback:function ($$v) {_vm.$set(_vm.form, "activityChannelId", $$v)},expression:"form.activityChannelId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"fundUse","label":"资金用途"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.fundUse),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "fundUse", $$v)},expression:"form.enterprise.fundUse"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"authStatus","label":"实名状态"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.authStatus),callback:function ($$v) {_vm.$set(_vm.form, "authStatus", $$v)},expression:"form.authStatus"}},_vm._l((_vm.dictTable.AUTH_STATUS),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"yearOperationRevenue","label":"年营业收入"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.enterprise.yearOperationRevenue),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "yearOperationRevenue", $$v)},expression:"form.enterprise.yearOperationRevenue"}},_vm._l((_vm.SelectionOptions.yearOperationRevenue),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"customerSource","label":"市场部获客来源"}},[_c('el-select',{attrs:{"placeholder":"请选择","disabled":_vm.isCanEdit},model:{value:(_vm.form.customerSource),callback:function ($$v) {_vm.$set(_vm.form, "customerSource", $$v)},expression:"form.customerSource"}},_vm._l((_vm.dictTable.MARKET_CUSTOMER_SOURCE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"roadTransportationLicenseNo","label":"道路运输经营许可证"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.roadTransportationLicenseNo),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "roadTransportationLicenseNo", $$v)},expression:"form.enterprise.roadTransportationLicenseNo"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"recommendUserName","label":"推荐人"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.recommendUserName),callback:function ($$v) {_vm.$set(_vm.form, "recommendUserName", $$v)},expression:"form.recommendUserName"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'运费垫付补充信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"运输货物类型","prop":"cargoTypeAry"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"multiple":"","placeholder":"请选择"},model:{value:(_vm.cargoTypeAry),callback:function ($$v) {_vm.cargoTypeAry=$$v},expression:"cargoTypeAry"}},_vm._l((_vm.SelectionOptions.cargoType),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"运输车辆总数","prop":"vehicleSum"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.vehicleSum),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "vehicleSum", $$v)},expression:"form.enterprise.vehicleSum"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"物流类型","prop":"logisticsType"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.enterprise.logisticsType),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "logisticsType", $$v)},expression:"form.enterprise.logisticsType"}},_vm._l((_vm.SelectionOptions.logisticsType),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"其中自有车辆占比","prop":"vehicleScale"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.enterprise.vehicleScale),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "vehicleScale", $$v)},expression:"form.enterprise.vehicleScale"}},_vm._l((_vm.SelectionOptions.proportionOwnedVehicles),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"主要客户名称","prop":"primeCustomerName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.primeCustomerName),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "primeCustomerName", $$v)},expression:"form.enterprise.primeCustomerName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"线上信息化水平","prop":"onlineInfo"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.enterprise.onlineInfo),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "onlineInfo", $$v)},expression:"form.enterprise.onlineInfo"}},_vm._l((_vm.SelectionOptions.onlineInfo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"产品","prop":"productName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.productName),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "productName", $$v)},expression:"form.enterprise.productName"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'联系信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业邮箱","prop":"enterpriseEmail"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.enterpriseEmail),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "enterpriseEmail", $$v)},expression:"form.enterprise.enterpriseEmail"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"传真","prop":"enterpriseFax"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.enterpriseFax),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "enterpriseFax", $$v)},expression:"form.enterprise.enterpriseFax"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"邮编","prop":"enterpriseZipCode"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.enterpriseZipCode),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "enterpriseZipCode", $$v)},expression:"form.enterprise.enterpriseZipCode"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'  工商信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业类型","prop":"companyOrgType"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyOrgType),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyOrgType", $$v)},expression:"form.enterprise.companyOrgType"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"组织机构代码","prop":"companyOrgCode"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyOrgCode),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyOrgCode", $$v)},expression:"form.enterprise.companyOrgCode"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"法定代表人","prop":"companyLawPerson"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyLawPerson),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyLawPerson", $$v)},expression:"form.enterprise.companyLawPerson"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"登记机关","prop":"companyRegisterOrg"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyRegisterOrg),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyRegisterOrg", $$v)},expression:"form.enterprise.companyRegisterOrg"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业状态","prop":"companyRegisterOrg"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyRegisterOrg),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyRegisterOrg", $$v)},expression:"form.enterprise.companyRegisterOrg"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"注册资本","prop":"companyRegisterCaptial"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyRegisterCaptial),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyRegisterCaptial", $$v)},expression:"form.enterprise.companyRegisterCaptial"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"地址","prop":"companyAddress"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyAddress),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyAddress", $$v)},expression:"form.enterprise.companyAddress"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"认缴资本","prop":"companyActualRegisterCaptial"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyActualRegisterCaptial),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyActualRegisterCaptial", $$v)},expression:"form.enterprise.companyActualRegisterCaptial"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"成立日期","prop":"companyEstablishTime"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyEstablishTime),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyEstablishTime", $$v)},expression:"form.enterprise.companyEstablishTime"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"经营期限","prop":"companyBusinessEndTime"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.enterprise.companyBusinessEndTime),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyBusinessEndTime", $$v)},expression:"form.enterprise.companyBusinessEndTime"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"经营范围","prop":"companyBusinessScope"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"disabled":_vm.isCanEdit,"type":"textarea","rows":5,"maxlength":"300","show-word-limit":""},model:{value:(_vm.form.enterprise.companyBusinessScope),callback:function ($$v) {_vm.$set(_vm.form.enterprise, "companyBusinessScope", $$v)},expression:"form.enterprise.companyBusinessScope"}})],1)],1)],1)],1)],1)],1)}
var enterpriseBusinessInfoTabvue_type_template_id_8b9c6a14_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/enterpriseBusinessInfoTab.vue?vue&type=template&id=8b9c6a14&scoped=true&

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/enterpriseBusinessInfoTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var enterpriseBusinessInfoTabvue_type_script_lang_js_ = ({
  components: {},
  name: "enterpriseBusinessInfoTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      SelectionOptions: consts["a" /* SelectionOptions */],
      isCanEdit: true,
      companyFinancingAry: [], //融资需求数组
      cargoTypeAry: [], //运输货物类型
      userInfo: {}, //登录人信息
      addPath: "/consumer/add",
      dictTable: null, //字典表
      form: {
        name: null, //客户名称 必填
        activityChannelId: null, //市场活动渠道
        activityId: null, //所属市场活动
        certificateId: null, //证件号码 必填
        channelFlag: null, //是否渠道客户
        customerSource: null, //市场部获客来源
        customerSubType: null,
        customerType: "ENTERPRISE", //客户类型
        customerTypeName: "企业客户", //客户类型名称
        glpRelated: null, //是否GLP关联方
        ecifId: null, //ECIF客户ID
        overdueFlag: null, //是否存在逾期/代偿记录
        recommendUserNo: null, //推荐人编号
        recommendUserName: null, //推荐人名称
        ownerUserName: null, //拥有人名称
        ownerUserNo: null, //拥有人No
        certificateType: null, //证件类型 必填
        authStatus: null, //实名状态
        enterprise: {
          cargoType: null, //运输货物类型
          companyActualRegisterCaptial: null, //实收资本
          companyAddress: null, //住所
          companyBusinessEndTime: null, //营业期限截止日期
          companyBusinessScope: null, //经营范围
          companyBusinessState: null, //经营状态
          companyEstablishTime: null, //成立日期
          companyFinancing: [], //融资需求
          companyIndustry: null, //所在行业
          companyLawPerson: null, //法定代表人
          companyOrgCode: null, //组织机构代码
          companyOrgType: null, //企业（机构）类型
          companyProvince: null, //所在省份
          companyRegisterCaptial: null, //注册资本
          companyRegisterNo: null, //注册号
          companyRegisterOrg: null, //登记机关
          companyScale: null, //企业规模
          customerId: null,
          enterpriseEmail: null, //企业邮箱
          enterpriseFax: null, //传真
          enterpriseZipCode: null, //邮编
          financingScale: null, //融资规模
          fundUse: null, //资金用途
          industry: null, //所属行业
          logisticsType: null, //物流类型
          onlineInfo: null, //线上信息化水平
          primeCustomerName: null, //主要客户名称
          productName: null, //产品
          roadTransportationLicenseNo: null, //道路运输经营许可证
          shortName: null, //客户简称
          vehicleScale: null, //其中自有车辆占比
          vehicleSum: null, //运输车辆总数
          yearOperationRevenue: null //年营业收入
        }
      }
    };
  },
  computed: {},
  created: function created() {
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {
    try {
      this.form = this.baseInfo;
      this.form.customerTypeName = "企业客户";
      //融资需求
      var companyFinancing = this.form.enterprise.companyFinancing && this.form.enterprise.companyFinancing.split(",");
      // 运输货物类型
      var cargoType = this.form.enterprise.cargoType && this.form.enterprise.cargoType.split(",");
      this.companyFinancingAry = companyFinancing.map(Number);
      this.cargoTypeAry = cargoType.map(Number);
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    baseInfo: function baseInfo(v) {
      this.form = v;
    }
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/views/consumer/components/enterpriseBusinessInfoTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_enterpriseBusinessInfoTabvue_type_script_lang_js_ = (enterpriseBusinessInfoTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/enterpriseBusinessInfoTab.vue?vue&type=style&index=0&id=8b9c6a14&lang=scss&scoped=true&
var enterpriseBusinessInfoTabvue_type_style_index_0_id_8b9c6a14_lang_scss_scoped_true_ = __webpack_require__("E5+b");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/consumer/components/enterpriseBusinessInfoTab.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_enterpriseBusinessInfoTabvue_type_script_lang_js_,
  enterpriseBusinessInfoTabvue_type_template_id_8b9c6a14_scoped_true_render,
  enterpriseBusinessInfoTabvue_type_template_id_8b9c6a14_scoped_true_staticRenderFns,
  false,
  null,
  "8b9c6a14",
  null
  
)

/* harmony default export */ var enterpriseBusinessInfoTab = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/individualBusinessInfoTab.vue?vue&type=template&id=28cc6c2c&scoped=true&
var individualBusinessInfoTabvue_type_template_id_28cc6c2c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-info-section corporateClient"},[_c('el-form',{ref:"form",staticClass:"form-section block-form",attrs:{"model":_vm.form,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.name),callback:function ($$v) {_vm.$set(_vm.form, "name", $$v)},expression:"form.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户类型","prop":"customerTypeName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.customerTypeName ),callback:function ($$v) {_vm.$set(_vm.form, "customerTypeName", $$v)},expression:"form.customerTypeName "}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"曾用名","prop":"usedName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.usedName ),callback:function ($$v) {_vm.$set(_vm.form.individual, "usedName", $$v)},expression:"form.individual.usedName "}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"owner"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.owner),callback:function ($$v) {_vm.$set(_vm.form, "owner", $$v)},expression:"form.owner"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件类型","prop":"certificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.certificateType),callback:function ($$v) {_vm.$set(_vm.form, "certificateType", $$v)},expression:"form.certificateType"}},_vm._l((_vm.dictTable.IND_CERTIFICATE_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"是否GLP关联方","prop":"glpRelated"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.glpRelated),callback:function ($$v) {_vm.$set(_vm.form, "glpRelated", $$v)},expression:"form.glpRelated"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{staticClass:"tip-box",attrs:{"span":8}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"dark","content":"请输入客户社会信用代码或者注册号","placement":"top-start"}},[_c('i',{staticClass:"el-icon-info"})]),_vm._v(" "),_c('el-form-item',{attrs:{"span":12,"label":"证件号码","prop":"certificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.certificateId),callback:function ($$v) {_vm.$set(_vm.form, "certificateId", $$v)},expression:"form.certificateId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"overdueFlag","label":"是否存在逾期/代偿记录"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.overdueFlag),callback:function ($$v) {_vm.$set(_vm.form, "overdueFlag", $$v)},expression:"form.overdueFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"证件有效期起始日","prop":"validTermBegin"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"type":"date","disabled":_vm.isCanEdit,"placeholder":"选择开始日期","value-format":_vm.dateTypeString},model:{value:(_vm.form.individual.validTermBegin),callback:function ($$v) {_vm.$set(_vm.form.individual, "validTermBegin", $$v)},expression:"form.individual.validTermBegin"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"id","label":"ECIF客户ID"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.ecifId),callback:function ($$v) {_vm.$set(_vm.form, "ecifId", $$v)},expression:"form.ecifId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"证件有效期截止日","prop":"validTermEnd"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"picker-options":_vm.endPickerOptions,"type":"date","disabled":_vm.isCanEdit,"placeholder":"选择结束日期","value-format":_vm.dateTypeString},model:{value:(_vm.form.individual.validTermEnd),callback:function ($$v) {_vm.$set(_vm.form.individual, "validTermEnd", $$v)},expression:"form.individual.validTermEnd"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityId","label":"所属市场活动"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.activityId),callback:function ($$v) {_vm.$set(_vm.form, "activityId", $$v)},expression:"form.activityId"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"certificateAuthority","label":"证件签发机关"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.certificateAuthority),callback:function ($$v) {_vm.$set(_vm.form.individual, "certificateAuthority", $$v)},expression:"form.individual.certificateAuthority"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityChannelId","label":"市场活动渠道"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.activityChannelId),callback:function ($$v) {_vm.$set(_vm.form, "activityChannelId", $$v)},expression:"form.activityChannelId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"gender","label":"性别"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.individual.gender),callback:function ($$v) {_vm.$set(_vm.form.individual, "gender", $$v)},expression:"form.individual.gender"}},_vm._l((_vm.SelectionOptions.gender),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"authStatus","label":"实名状态"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.authStatus),callback:function ($$v) {_vm.$set(_vm.form, "authStatus", $$v)},expression:"form.authStatus"}},_vm._l((_vm.dictTable.AUTH_STATUS),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"race","label":"民族"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.race),callback:function ($$v) {_vm.$set(_vm.form.individual, "race", $$v)},expression:"form.individual.race"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"customerSource","label":"市场部获客来源"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.customerSource),callback:function ($$v) {_vm.$set(_vm.form, "customerSource", $$v)},expression:"form.customerSource"}},_vm._l((_vm.dictTable.MARKET_CUSTOMER_SOURCE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"birthday","label":"出生日期"}},[_c('el-date-picker',{attrs:{"disabled":_vm.isCanEdit,"type":"date","placeholder":"选择日期"},model:{value:(_vm.form.individual.birthday),callback:function ($$v) {_vm.$set(_vm.form.individual, "birthday", $$v)},expression:"form.individual.birthday"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"recommendUserNo","label":"推荐人"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.recommendUserNo),callback:function ($$v) {_vm.$set(_vm.form, "recommendUserNo", $$v)},expression:"form.recommendUserNo"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"dwellingStatus","label":"居住状况"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.individual.dwellingStatus),callback:function ($$v) {_vm.$set(_vm.form.individual, "dwellingStatus", $$v)},expression:"form.individual.dwellingStatus"}},_vm._l((_vm.SelectionOptions.dwellingStatus),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'联系信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"手机号码","prop":"contactMobile"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.contactMobile),callback:function ($$v) {_vm.$set(_vm.form.individual, "contactMobile", $$v)},expression:"form.individual.contactMobile"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"微信","prop":"contactWechat"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.contactWechat),callback:function ($$v) {_vm.$set(_vm.form.individual, "contactWechat", $$v)},expression:"form.individual.contactWechat"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"固定电话","prop":"contactTelephone"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.contactTelephone),callback:function ($$v) {_vm.$set(_vm.form.individual, "contactTelephone", $$v)},expression:"form.individual.contactTelephone"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"QQ","prop":"contactQq"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.contactQq),callback:function ($$v) {_vm.$set(_vm.form.individual, "contactQq", $$v)},expression:"form.individual.contactQq"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"个人邮箱","prop":"contactEmail"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.contactEmail),callback:function ($$v) {_vm.$set(_vm.form.individual, "contactEmail", $$v)},expression:"form.individual.contactEmail"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'教育信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"教育水平","prop":"eduLevel"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.individual.eduLevel),callback:function ($$v) {_vm.$set(_vm.form.individual, "eduLevel", $$v)},expression:"form.individual.eduLevel"}},_vm._l((_vm.SelectionOptions.eduLevel),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业学校","prop":"graduateSchool"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.graduateSchool),callback:function ($$v) {_vm.$set(_vm.form.individual, "graduateSchool", $$v)},expression:"form.individual.graduateSchool"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业年份","prop":"graduationYear"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.graduationYear),callback:function ($$v) {_vm.$set(_vm.form.individual, "graduationYear", $$v)},expression:"form.individual.graduationYear"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'婚姻信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"婚姻状况","prop":"maritalStatus"}},[_c('el-select',{attrs:{"disabled":_vm.isCanEdit,"placeholder":"请选择"},model:{value:(_vm.form.individual.maritalStatus),callback:function ($$v) {_vm.$set(_vm.form.individual, "maritalStatus", $$v)},expression:"form.individual.maritalStatus"}},_vm._l((_vm.SelectionOptions.maritalStatus),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件类型","prop":"spouseCertificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.spouseCertificateType),callback:function ($$v) {_vm.$set(_vm.form.individual, "spouseCertificateType", $$v)},expression:"form.individual.spouseCertificateType"}},_vm._l((_vm.SelectionOptions.personCertificateTypeArr),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶姓名","prop":"spouseName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.spouseName),callback:function ($$v) {_vm.$set(_vm.form.individual, "spouseName", $$v)},expression:"form.individual.spouseName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件号码","prop":"spouseCertificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.spouseCertificateId),callback:function ($$v) {_vm.$set(_vm.form.individual, "spouseCertificateId", $$v)},expression:"form.individual.spouseCertificateId"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'收入信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"家庭月收入","prop":"householdMonthlyIncome"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.householdMonthlyIncome),callback:function ($$v) {_vm.$set(_vm.form.individual, "householdMonthlyIncome", $$v)},expression:"form.individual.householdMonthlyIncome"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"本人月收入","prop":"monthlyIncome"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.monthlyIncome),callback:function ($$v) {_vm.$set(_vm.form.individual, "monthlyIncome", $$v)},expression:"form.individual.monthlyIncome"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'工作信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"实际从业年限","prop":"workingSeniority"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":"","disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.workingSeniority),callback:function ($$v) {_vm.$set(_vm.form.individual, "workingSeniority", $$v)},expression:"form.individual.workingSeniority"}},_vm._l((_vm.SelectionOptions.actualYearsEmployment),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位","prop":"company"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.company),callback:function ($$v) {_vm.$set(_vm.form.individual, "company", $$v)},expression:"form.individual.company"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"公司总机","prop":"companySwitchboard"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.companySwitchboard),callback:function ($$v) {_vm.$set(_vm.form.individual, "companySwitchboard", $$v)},expression:"form.individual.companySwitchboard"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位所属行业","prop":"companyIndustry"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.form.individual.companyIndustry),callback:function ($$v) {_vm.$set(_vm.form.individual, "companyIndustry", $$v)},expression:"form.individual.companyIndustry"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'备注信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"desTextarea",attrs:{"prop":"note","label":"备注"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"type":"textarea","rows":5,"disabled":_vm.isCanEdit,"maxlength":"300","show-word-limit":""},model:{value:(_vm.form.note),callback:function ($$v) {_vm.$set(_vm.form, "note", $$v)},expression:"form.note"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'操作记录'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("信息创建:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.form.createUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.form.createTime))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("最后修改:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.form.updateUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.form.updateTime))])])],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'图谱和视图'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("查看客户图谱>>")])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("查看额度视图>>")])])],1)],1)],1)],1)}
var individualBusinessInfoTabvue_type_template_id_28cc6c2c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/individualBusinessInfoTab.vue?vue&type=template&id=28cc6c2c&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/individualBusinessInfoTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var individualBusinessInfoTabvue_type_script_lang_js_ = ({
  components: {},
  name: "individualBusinessInfoTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      SelectionOptions: consts["a" /* SelectionOptions */],
      isCanEdit: true,
      addPath: "/consumer/add",
      routeQuery: {}, //查询参数
      dictTable: null, //字典表
      form: {
        glpRelated: null, //是否GLP关联方
        ecifId: null, //ECIF客户ID
        name: null, //客户名称 必填
        overdueFlag: null, //是否存在逾期/代偿记录
        recommendUserNo: null, //推荐人
        activityChannelId: null, //市场活动渠道
        activityId: null, //所属市场活动
        certificateId: null, //证件号码 必填
        certificateType: null, //证件类型 必填
        channelFlag: 0,
        customerSource: null, //市场部获客来源
        customerSubType: null,
        customerType: "INDIVIDUAL", //客户类型
        customerTypeName: "个人客户", //客户类型名称
        ownerUserName: null, //拥有人名称
        ownerUserNo: null, //拥有人No
        authStatus: null, //实名状态
        note: null, //备注
        individual: {
          birthday: null, //出生日期
          certificateAuthority: null, //证件签发机关
          company: null, //工作单位
          companyIndustry: null, //工作单位所属行业
          companySwitchboard: null, //公司总机
          contactEmail: null, //个人邮箱
          contactMobile: null, //手机号码
          contactQq: null, //QQ
          contactTelephone: null, //固定电话
          contactWechat: null, //微信
          dwellingAddressZipCode: null,
          dwellingStatus: null, //居住状况
          eduLevel: null, //教育水平
          gender: null, //性别
          graduateSchool: null, //毕业学校
          graduationYear: null, //毕业年份
          householdMonthlyIncome: null, //家庭月收入
          maritalStatus: null, //婚姻状况
          monthlyIncome: null, //本人月收入
          race: null, //民族
          spouseCertificateId: null, //配偶证件号码
          spouseCertificateType: null, //配偶证件类型
          spouseMobile: null,
          spouseName: null, //配偶姓名
          usedName: null, //曾用名
          validTermBegin: null, //证件有效期起始日
          validTermEnd: null, //证件有效期截止日
          workingSeniority: null //实际从业年限
        }
      },
      btnsProps: {
        receive: {
          text: "领用",
          func: this.receiveFunc
        },
        transfer: {
          text: "转让",
          func: this.transferFunc
        },
        release: {
          text: "释放",
          func: this.releaseFunc
        },
        share: {
          text: "共享",
          func: this.shareFunc
        },
        edit: {
          text: "修改",
          func: this.editFunc
        },
        delete: {
          text: "删除",
          func: this.deleteFunc
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate: function disabledDate(time) {
          var nowDate = new Date();
          return time.getTime() < nowDate.getTime() - 24 * 3600 * 1000;
        }
      },
      endPickerOptions: {
        disabledDate: function disabledDate(time) {
          var startDate = self.ruleForm.validTermBegin || "";
          if (startDate) {
            var sdTime = new Date(startDate).getTime() + 24 * 3600 * 1000;
            return time.getTime() < sdTime;
          }
        }
      }
    };
  },
  computed: {},
  created: function created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {
    this.form = this.baseInfo;
  },

  watch: {
    baseInfo: function baseInfo(v) {
      this.form = v;
    }
  },
  methods: {}
});
// CONCATENATED MODULE: ./src/views/consumer/components/individualBusinessInfoTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_individualBusinessInfoTabvue_type_script_lang_js_ = (individualBusinessInfoTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/individualBusinessInfoTab.vue?vue&type=style&index=0&id=28cc6c2c&lang=scss&scoped=true&
var individualBusinessInfoTabvue_type_style_index_0_id_28cc6c2c_lang_scss_scoped_true_ = __webpack_require__("Vjij");

// CONCATENATED MODULE: ./src/views/consumer/components/individualBusinessInfoTab.vue






/* normalize component */

var individualBusinessInfoTab_component = Object(componentNormalizer["a" /* default */])(
  components_individualBusinessInfoTabvue_type_script_lang_js_,
  individualBusinessInfoTabvue_type_template_id_28cc6c2c_scoped_true_render,
  individualBusinessInfoTabvue_type_template_id_28cc6c2c_scoped_true_staticRenderFns,
  false,
  null,
  "28cc6c2c",
  null
  
)

/* harmony default export */ var individualBusinessInfoTab = (individualBusinessInfoTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/index.vue?vue&type=template&id=6cf710b3&scoped=true&
var accessoryvue_type_template_id_6cf710b3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'附件列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var accessoryvue_type_template_id_6cf710b3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/accessory/index.vue?vue&type=template&id=6cf710b3&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var accessoryvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "accessoryTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "附件名称" }, { checked: true, key: "type", val: "附件类型" }, { checked: true, key: "code", val: "文件类型后缀" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      getListUrl: "/glp-crm/material/queryList",
      accessoryAddPath: "/consumer/accessoryAdd",
      accessoryEditPath: "/consumer/accessoryEdit",
      accessoryDetailPath: "/consumer/accessoryDetail",
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {
      this.$router.push({
        path: this.accessoryAddPath,
        query: { flag: "add", viewType: 1 }
      });
    },
    editFunc: function editFunc() {
      this.$router.push({
        path: this.accessoryEditPath,
        query: { flag: "edit", viewType: 1 }
      });
    },
    detailFunc: function detailFunc() {
      this.$router.push({
        path: this.accessoryDetailPath,
        query: { flag: "detail", viewType: 1 }
      });
    },
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/accessory/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_accessoryvue_type_script_lang_js_ = (accessoryvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/accessory/index.vue





/* normalize component */

var accessory_component = Object(componentNormalizer["a" /* default */])(
  components_accessoryvue_type_script_lang_js_,
  accessoryvue_type_template_id_6cf710b3_scoped_true_render,
  accessoryvue_type_template_id_6cf710b3_scoped_true_staticRenderFns,
  false,
  null,
  "6cf710b3",
  null
  
)

/* harmony default export */ var accessory = (accessory_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/contactPersonTab.vue?vue&type=template&id=164faa52&scoped=true&
var contactPersonTabvue_type_template_id_164faa52_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'联系人列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var contactPersonTabvue_type_template_id_164faa52_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/contactPersonTab.vue?vue&type=template&id=164faa52&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/contactPersonTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var contactPersonTabvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "contactPersonTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "手机" }, { checked: true, key: "code", val: "邮箱" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {},
    editFunc: function editFunc() {},
    detailFunc: function detailFunc() {},
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/contactPersonTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_contactPersonTabvue_type_script_lang_js_ = (contactPersonTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/contactPersonTab.vue





/* normalize component */

var contactPersonTab_component = Object(componentNormalizer["a" /* default */])(
  components_contactPersonTabvue_type_script_lang_js_,
  contactPersonTabvue_type_template_id_164faa52_scoped_true_render,
  contactPersonTabvue_type_template_id_164faa52_scoped_true_staticRenderFns,
  false,
  null,
  "164faa52",
  null
  
)

/* harmony default export */ var contactPersonTab = (contactPersonTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/addressInfoTab.vue?vue&type=template&id=c1c6c278&scoped=true&
var addressInfoTabvue_type_template_id_c1c6c278_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'地址列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var addressInfoTabvue_type_template_id_c1c6c278_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/addressInfoTab.vue?vue&type=template&id=c1c6c278&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/addressInfoTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var addressInfoTabvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "addressInfoTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "手机" }, { checked: true, key: "code", val: "邮箱" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {},
    editFunc: function editFunc() {},
    detailFunc: function detailFunc() {},
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/addressInfoTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_addressInfoTabvue_type_script_lang_js_ = (addressInfoTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/addressInfoTab.vue





/* normalize component */

var addressInfoTab_component = Object(componentNormalizer["a" /* default */])(
  components_addressInfoTabvue_type_script_lang_js_,
  addressInfoTabvue_type_template_id_c1c6c278_scoped_true_render,
  addressInfoTabvue_type_template_id_c1c6c278_scoped_true_staticRenderFns,
  false,
  null,
  "c1c6c278",
  null
  
)

/* harmony default export */ var addressInfoTab = (addressInfoTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/legalControlTab.vue?vue&type=template&id=68e3cf17&scoped=true&
var legalControlTabvue_type_template_id_68e3cf17_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'法定代表及实控人列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var legalControlTabvue_type_template_id_68e3cf17_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/legalControlTab.vue?vue&type=template&id=68e3cf17&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/legalControlTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var legalControlTabvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "legalControlTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "手机" }, { checked: true, key: "code", val: "邮箱" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {},
    editFunc: function editFunc() {},
    detailFunc: function detailFunc() {},
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/legalControlTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_legalControlTabvue_type_script_lang_js_ = (legalControlTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/legalControlTab.vue





/* normalize component */

var legalControlTab_component = Object(componentNormalizer["a" /* default */])(
  components_legalControlTabvue_type_script_lang_js_,
  legalControlTabvue_type_template_id_68e3cf17_scoped_true_render,
  legalControlTabvue_type_template_id_68e3cf17_scoped_true_staticRenderFns,
  false,
  null,
  "68e3cf17",
  null
  
)

/* harmony default export */ var legalControlTab = (legalControlTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/businessTab.vue?vue&type=template&id=77fb40da&scoped=true&
var businessTabvue_type_template_id_77fb40da_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'商机列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var businessTabvue_type_template_id_77fb40da_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/businessTab.vue?vue&type=template&id=77fb40da&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/businessTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var businessTabvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "businessTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "手机" }, { checked: true, key: "code", val: "邮箱" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {},
    editFunc: function editFunc() {},
    detailFunc: function detailFunc() {},
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/businessTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_businessTabvue_type_script_lang_js_ = (businessTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/businessTab.vue





/* normalize component */

var businessTab_component = Object(componentNormalizer["a" /* default */])(
  components_businessTabvue_type_script_lang_js_,
  businessTabvue_type_template_id_77fb40da_scoped_true_render,
  businessTabvue_type_template_id_77fb40da_scoped_true_staticRenderFns,
  false,
  null,
  "77fb40da",
  null
  
)

/* harmony default export */ var businessTab = (businessTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/visitTab.vue?vue&type=template&id=2044b02e&scoped=true&
var visitTabvue_type_template_id_2044b02e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'拜访列表'},on:{"setTheadItem":_vm.getTheadItem}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var visitTabvue_type_template_id_2044b02e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/visitTab.vue?vue&type=template&id=2044b02e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/visitTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var visitTabvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "visitTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [{ checked: true, key: "name", val: "姓名" }, { checked: true, key: "owner", val: "手机" }, { checked: true, key: "code", val: "邮箱" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "300px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      serachParm: {}
    };
  },
  watch: {},
  computed: {},
  created: function created() {
    this.getList(this.serachParm);
    this.mockData();
  },

  methods: {
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc
      });
      items.push({
        name: "查看",
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
    addFunc: function addFunc() {},
    editFunc: function editFunc() {},
    detailFunc: function detailFunc() {},
    deleteFunc: function deleteFunc() {},
    cancelFunc: function cancelFunc() {}
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/visitTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_visitTabvue_type_script_lang_js_ = (visitTabvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/consumer/components/visitTab.vue





/* normalize component */

var visitTab_component = Object(componentNormalizer["a" /* default */])(
  components_visitTabvue_type_script_lang_js_,
  visitTabvue_type_template_id_2044b02e_scoped_true_render,
  visitTabvue_type_template_id_2044b02e_scoped_true_staticRenderFns,
  false,
  null,
  "2044b02e",
  null
  
)

/* harmony default export */ var visitTab = (visitTab_component.exports);
// EXTERNAL MODULE: ./src/api/consumerService.js
var consumerService = __webpack_require__("LERC");

// EXTERNAL MODULE: ./src/components/belongerComponent/index.vue + 4 modules
var belongerComponent = __webpack_require__("YOAK");

// EXTERNAL MODULE: ./node_modules/js-cookie/src/js.cookie.js
var js_cookie = __webpack_require__("p46w");
var js_cookie_default = /*#__PURE__*/__webpack_require__.n(js_cookie);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/detail.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//














/* harmony default export */ var detailvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {
    shareComponent: shareComponent["a" /* default */],
    enterpriseBusinessInfoTab: enterpriseBusinessInfoTab,
    individualBusinessInfoTab: individualBusinessInfoTab,
    accessoryTab: accessory,
    contactPersonTab: contactPersonTab,
    addressInfoTab: addressInfoTab,
    legalControlTab: legalControlTab,
    businessTab: businessTab,
    visitTab: visitTab,
    belongerModal: belongerComponent["a" /* default */]
  },
  data: function data() {
    return {
      loading: false,
      activeName: "first",
      routeQuery: {},
      type: null,
      baseInfo: null,
      ListPath: "/consumer/index", //列表路由地址
      detailPath: "/consumer/edit",
      deleteVisible: false, //删除
      receiveVisible: false, //领用
      transferVisible: false, //转让
      releaseVisible: false, //释放
      belongerVisible: false, //用户查询
      userDetail: null, //选择的转让客户
      searchUserVisible: false, //共享
      departmentCode: null, //部门code
      LiberumOptions: [], //公海部门
      shareId: null,
      btnsProps: {
        receive: {
          text: "领用",
          func: this.receiveFunc
        },
        transfer: {
          text: "转让",
          func: this.transferFunc
        },
        release: {
          text: "释放",
          func: this.releaseFunc
        },
        share: {
          text: "共享",
          func: this.shareFunc
        },
        edit: {
          text: "修改",
          func: this.editFunc
        },
        delete: {
          text: "删除",
          func: this.deleteFunc
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      }
    };
  },

  computed: {},
  created: function created() {
    this.routeQuery = this.$route.query;
    this.type = this.routeQuery.type;
    if (this.routeQuery.activeName) {
      this.activeName = this.routeQuery.activeName;
    }
    this.getDetailById();
  },
  mounted: function mounted() {},

  methods: {
    cnsumerMap: function cnsumerMap() {
      var token = js_cookie_default.a.get("token");
      var url = "http://172.16.6.18:58011/home?token=" + token + "&certificateId=" + this.baseInfo.certificateId;
      window.open(url);
    },
    linesView: function linesView() {
      var url = "http://172.16.6.100:8080/?target=creditView&ecifId=" + this.baseInfo.ecifId;
      window.open(url);
    },
    receiveFunc: function receiveFunc() {
      this.receiveVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u9886\u7528\u5BA2\u6237 \u201C" + this.baseInfo.name + "\u201D \u5417\uFF1F";
    },
    getReceiveDelItem: function getReceiveDelItem(data) {
      var _this = this;

      //领用
      this.receiveVisible = false;
      var message = "领用成功！";
      if (data.type == true) {
        var params = [this.baseInfo.id];
        consumerService["a" /* default */].batchReceiveConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this.$message({ type: "success", message: message });
          } else {
            _this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    transferFunc: function transferFunc() {
      this.belongerVisible = true;
    },
    setBelongerTableRow: function setBelongerTableRow(data) {
      this.userDetail = data;
      this.transferVisible = true;
      this.dialogTxt = "确认转让选中选中客户？";
    },
    getTransferDelItem: function getTransferDelItem(data) {
      var _this2 = this;

      // 转让
      this.transferVisible = false;
      this.belongerVisible = false;
      if (data.type == true) {
        var params = {
          customerIds: [this.baseInfo.id],
          toUserNo: this.userDetail.userNo
        };
        var message = "转让成功！";
        consumerService["a" /* default */].batchTransferConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this2.$message({ type: "success", message: message });
          } else {
            _this2.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    releaseFunc: function releaseFunc() {
      this.departmentCode = null;
      this.releaseVisible = true;
      this.batch = true;
      this.dialogTxt = "\u786E\u5B9A\u91CA\u653E\u5BA2\u6237 \u201C" + this.baseInfo.name + "\u201D \u5230";
      this.getLiberumByCurrentUser();
    },
    getLiberumByCurrentUser: function getLiberumByCurrentUser() {
      var _this3 = this;

      consumerService["a" /* default */].getLiberumByCurrentUser().then(function (res) {
        if (res.code == 200) {
          var _ref = res || [],
              data = _ref.data;

          _this3.LiberumOptions = data;
        }
      });
    },
    getReleaseDelItem: function getReleaseDelItem(data) {
      var _this4 = this;

      this.releaseVisible = false;
      var message = "释放成功！";
      if (data.type == true) {
        var params = {
          customerIds: [this.baseInfo.id],
          departmentCode: this.departmentCode
        };
        consumerService["a" /* default */].batchReleaseConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this4.$message({ type: "success", message: message });
          } else {
            _this4.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    shareFunc: function shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = this.baseInfo.id;
    },
    editFunc: function editFunc() {
      this.$router.push({
        path: this.detailPath,
        query: {
          id: this.baseInfo.id,
          type: this.baseInfo.customerType,
          flag: "edit"
        }
      });
    },
    deleteFunc: function deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u5220\u9664\u5BA2\u6237 \u201C" + this.baseInfo.name + "\u201D \u5417\uFF1F";
    },
    getDelItem: function getDelItem(data) {
      var _this5 = this;

      //删除事件
      this.deleteVisible = false;
      var message = "删除成功！";
      if (data.type == true) {
        var params = [this.baseInfo.id];
        consumerService["a" /* default */].deleteConsumerById(params).then(function (res) {
          if (res.code == 200) {
            _this5.$message({ type: "success", message: message });
            _this5.cancelFunc();
          } else {
            _this5.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    cancelFunc: function cancelFunc() {
      //返回
      this.$router.push({
        path: this.ListPath
      });
    },
    getDetailById: function getDetailById(data) {
      var _this6 = this;

      consumerService["a" /* default */].consumerDetailById(this.routeQuery.id).then(function (res) {
        if (res.code == 200) {
          var _data = res.data;

          _this6.baseInfo = _data;
          _this6.loading = true;
        } else {
          _this6.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    handleTabClick: function handleTabClick(tab, event) {
      console.log(tab, event);
    }
  }
});
// CONCATENATED MODULE: ./src/views/consumer/detail.vue?vue&type=script&lang=js&
 /* harmony default export */ var consumer_detailvue_type_script_lang_js_ = (detailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/detail.vue?vue&type=style&index=0&lang=scss&
var detailvue_type_style_index_0_lang_scss_ = __webpack_require__("cKd/");

// CONCATENATED MODULE: ./src/views/consumer/detail.vue






/* normalize component */

var detail_component = Object(componentNormalizer["a" /* default */])(
  consumer_detailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var detail = __webpack_exports__["default"] = (detail_component.exports);

/***/ }),

/***/ "vMZ8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);