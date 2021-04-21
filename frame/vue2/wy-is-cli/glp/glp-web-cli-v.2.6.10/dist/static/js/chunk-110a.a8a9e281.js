(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-110a"],{

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

/***/ "8ES4":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "B3PF":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "DwpP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_025b91e3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8ES4");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_025b91e3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_025b91e3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_025b91e3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "OjFc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelTab_vue_vue_type_style_index_0_id_0525027a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("PSgT");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelTab_vue_vue_type_style_index_0_id_0525027a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelTab_vue_vue_type_style_index_0_id_0525027a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelTab_vue_vue_type_style_index_0_id_0525027a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "PSgT":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "QlEb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_consumerTab_vue_vue_type_style_index_0_id_6434f34e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("B3PF");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_consumerTab_vue_vue_type_style_index_0_id_6434f34e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_consumerTab_vue_vue_type_style_index_0_id_6434f34e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_consumerTab_vue_vue_type_style_index_0_id_6434f34e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "RJMg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_baseInfoTab_vue_vue_type_style_index_0_id_170cc0a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("z4JU");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_baseInfoTab_vue_vue_type_style_index_0_id_170cc0a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_baseInfoTab_vue_vue_type_style_index_0_id_170cc0a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_baseInfoTab_vue_vue_type_style_index_0_id_170cc0a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "rT5C":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/detail.vue?vue&type=template&id=025b91e3&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[(_vm.loading)?_c('div',{staticClass:"section"},[_c('el-tabs',{attrs:{"type":"border-card"},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{staticClass:"base-info-section",attrs:{"label":"活动信息","name":"first"}},[_c('baseInfoTab',{attrs:{"baseInfo":_vm.baseInfo}})],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"活动渠道","name":"second"}},[_c('channelTab',{attrs:{"baseInfo":_vm.baseInfo}})],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":"相关客户","name":"third"}},[_c('consumerTab',{attrs:{"baseInfo":_vm.baseInfo}})],1)],1)],1):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/detail.vue?vue&type=template&id=025b91e3&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/baseInfoTab.vue?vue&type=template&id=170cc0a2&scoped=true&
var baseInfoTabvue_type_template_id_170cc0a2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit,"placeholder":"请输入活动名称"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"ownerUserName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请选择拥有人","disabled":_vm.isCanEdit},model:{value:(_vm.ruleForm.ownerUserName ),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ownerUserName", $$v)},expression:"ruleForm.ownerUserName "}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动类型","prop":"type"}},[_c('el-select',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit},model:{value:(_vm.ruleForm.type),callback:function ($$v) {_vm.$set(_vm.ruleForm, "type", $$v)},expression:"ruleForm.type"}},_vm._l((_vm.dictTable.MARKET_ACTIVITY_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"活动地点","prop":"location"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":_vm.isCanEdit,"placeholder":"请输入活动地点"},model:{value:(_vm.ruleForm.location),callback:function ($$v) {_vm.$set(_vm.ruleForm, "location", $$v)},expression:"ruleForm.location"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"开始日期","prop":"startDate"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"type":"date","disabled":_vm.isCanEdit,"placeholder":"选择开始日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.startDate),callback:function ($$v) {_vm.$set(_vm.ruleForm, "startDate", $$v)},expression:"ruleForm.startDate"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"结束日期","prop":"endDate"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"picker-options":_vm.endPickerOptions,"type":"date","disabled":_vm.isCanEdit,"placeholder":"选择结束日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.endDate),callback:function ($$v) {_vm.$set(_vm.ruleForm, "endDate", $$v)},expression:"ruleForm.endDate"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"span":12,"label":"营销方案","prop":"plan"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":"","disabled":_vm.isCanEdit},model:{value:(_vm.ruleForm.plan),callback:function ($$v) {_vm.$set(_vm.ruleForm, "plan", $$v)},expression:"ruleForm.plan"}},_vm._l((_vm.dictTable.MARKET_ACTIVITY_PLAN),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{staticClass:"desTextarea",attrs:{"prop":"note","label":"活动描述"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"disabled":_vm.isCanEdit,"type":"textarea","rows":5,"maxlength":"300","show-word-limit":"","placeholder":"请输入活动描述"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'操作记录'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("信息创建:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.ruleForm.createUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.ruleForm.createTime))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("最后修改:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.ruleForm.updateUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.ruleForm.updateTime))])])],1)],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem}}),_vm._v(" "),(_vm.searchUserVisible)?_c('shareComponent',{attrs:{"show":_vm.searchUserVisible,"id":_vm.shareId},on:{"update:show":function($event){_vm.searchUserVisible=$event}}}):_vm._e()],1)}
var baseInfoTabvue_type_template_id_170cc0a2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/components/baseInfoTab.vue?vue&type=template&id=170cc0a2&scoped=true&

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// EXTERNAL MODULE: ./src/components/shareComponent/index.vue + 9 modules
var shareComponent = __webpack_require__("AxFn");

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/api/marketService.js
var marketService = __webpack_require__("2zWU");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/baseInfoTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var baseInfoTabvue_type_script_lang_js_ = ({
  name: "baseInfoTab",
  mixins: [listMixin["a" /* default */]],
  components: {
    shareComponent: shareComponent["a" /* default */]
  },
  props: {
    baseInfo: {
      type: Object
    }
  },
  data: function data() {
    return {
      SelectionOptions: consts["a" /* SelectionOptions */],
      deleteVisible: false,
      isCanEdit: true,
      searchUserVisible: false,
      shareValue: {},
      clientValue: {},
      routeQuery: {},
      shareId: null,
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
        share: {
          text: "共享",
          isSubmitting: false,
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
      dictTable: null, //字典表
      ListPath: "/market/index", //列表路由地址
      editPath: "/market/edit" //编辑路由地址
    };
  },

  watch: {
    baseInfo: function baseInfo(v) {
      this.ruleForm = v;
    }
  },
  created: function created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {
    this.ruleForm = this.baseInfo;
  },

  methods: {
    shareFunc: function shareFunc() {
      this.shareId = this.routeQuery.id;
      this.searchUserVisible = true;
    },
    relevanceFunc: function relevanceFunc() {
      debugger;
      this.clientVisible = true;
    },
    setShareValue: function setShareValue(data) {
      this.shareValue = data;
    },
    editFunc: function editFunc() {
      this.$router.push({
        path: this.editPath,
        query: { flag: "edit", id: this.routeQuery.id }
      });
    },
    cancelFunc: function cancelFunc() {
      //返回
      this.$router.push({
        path: this.ListPath
      });
    },
    deleteFunc: function deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u5220\u9664\u5E02\u573A\u6D3B\u52A8 \u201C" + this.ruleForm.name + "\u201D \u5417\uFF1F";
      this.rowItem = item;
    },
    getDelItem: function getDelItem(data) {
      var _this = this;

      //删除事件
      this.deleteVisible = false;
      var params = void 0;
      var message = "删除成功！";
      if (data.type == true) {
        params = { marketActivityReq: [this.rowItem.id] };
        marketService["a" /* default */].deleteMarket(params).then(function (res) {
          if (res.code == 200) {
            _this.$message({ type: "success", message: message });
            _this.$router.push({ path: _this.ListPath });
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
// CONCATENATED MODULE: ./src/views/market/components/baseInfoTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_baseInfoTabvue_type_script_lang_js_ = (baseInfoTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/components/baseInfoTab.vue?vue&type=style&index=0&id=170cc0a2&lang=scss&scoped=true&
var baseInfoTabvue_type_style_index_0_id_170cc0a2_lang_scss_scoped_true_ = __webpack_require__("RJMg");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/market/components/baseInfoTab.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_baseInfoTabvue_type_script_lang_js_,
  baseInfoTabvue_type_template_id_170cc0a2_scoped_true_render,
  baseInfoTabvue_type_template_id_170cc0a2_scoped_true_staticRenderFns,
  false,
  null,
  "170cc0a2",
  null
  
)

/* harmony default export */ var baseInfoTab = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/channelTab.vue?vue&type=template&id=0525027a&scoped=true&
var channelTabvue_type_template_id_0525027a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section"},[_c('Card',{attrs:{"title":'列表',"btn-opt":_vm.channelOperateOption}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem}})],1)}
var channelTabvue_type_template_id_0525027a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/components/channelTab.vue?vue&type=template&id=0525027a&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/channelTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var channelTabvue_type_script_lang_js_ = ({
  name: "channelTab",
  mixins: [listMixin["a" /* default */]],
  components: {},
  props: {
    baseInfo: {
      type: Object
    }
  },
  data: function data() {
    return {
      detailInfo: null,
      deleteVisible: false,
      theadData: [{ checked: true, key: "name", val: "渠道名称" }, {
        checked: true,
        key: "qrcodeUrl",
        val: "渠道二维码",
        isFormat: true,
        formatFn: this.qrcodeUrlToImg
      }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "200px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      serachParm: {
        activityId: null
      },
      channelOperateOption: {
        className: "el-icon-plus",
        name: "新建",
        func: this.channelAddFunc
      },
      getListUrl: "/glp-crm/marketActivity/channel/listPage", //市场活动-渠道-分页列表-接口地址

      ListPath: "/market/index", //市场活动列表路由地址
      channelDetailPath: "/market/channelDetail", //渠道详情路由地址
      channelAddPath: "/market/channelRedactAdd", //渠道新增路由地址
      channelEditPath: "/market/channelRedactEdit" //渠道编辑路由地址
    };
  },

  computed: {},
  created: function created() {},
  mounted: function mounted() {
    this.serachParm = { activityId: this.baseInfo.id };
    this.getList();
  },

  methods: {
    qrcodeUrlToImg: function qrcodeUrlToImg(item, row) {
      return "<img width=\"100\" src=\"" + row.qrcodeUrl + "\"/>";
    },
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({ name: "修改", type: "text", func: this.channelEditFunc });
      items.push({ name: "详情", type: "text", func: this.channelDetailFunc });
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
    channelAddFunc: function channelAddFunc() {
      this.$router.push({
        path: this.channelAddPath,
        query: {
          flag: "add",
          activityId: this.baseInfo.id,
          activityName: this.baseInfo.name
        }
      });
    },
    channelEditFunc: function channelEditFunc(row) {
      this.$router.push({
        path: this.channelEditPath,
        query: {
          flag: "edit",
          id: row.id,
          activityId: this.baseInfo.id,
          activityName: this.baseInfo.name
        }
      });
    },
    channelDetailFunc: function channelDetailFunc(row) {
      this.$router.push({
        path: this.channelDetailPath,
        query: {
          flag: "detail",
          id: row.id,
          activityId: this.baseInfo.id,
          activityName: this.baseInfo.name
        }
      });
    },
    cancelFunc: function cancelFunc() {
      //返回
      this.$router.push({
        path: this.ListPath
      });
    },
    deleteFunc: function deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u6D3B\u52A8\u6E20\u9053 \u201C" + item.name + "\u201D \u5417\uFF1F";
      this.rowItem = item;
    },
    getDelItem: function getDelItem(data) {
      var _this = this;

      this.deleteVisible = false;
      if (data.type == true) {
        // 确定删除
        var params = this.rowItem.id;
        marketService["a" /* default */].deleteChannel(params).then(function (res) {
          if (res.code == 200) {
            _this.$message({ type: "success", message: "删除成功！" });
            _this.onRefresh();
          } else {
            _this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    onRefresh: function onRefresh() {
      this.pageInfo.page = 1;
      this.getList();
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/components/channelTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_channelTabvue_type_script_lang_js_ = (channelTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/components/channelTab.vue?vue&type=style&index=0&id=0525027a&lang=scss&scoped=true&
var channelTabvue_type_style_index_0_id_0525027a_lang_scss_scoped_true_ = __webpack_require__("OjFc");

// CONCATENATED MODULE: ./src/views/market/components/channelTab.vue






/* normalize component */

var channelTab_component = Object(componentNormalizer["a" /* default */])(
  components_channelTabvue_type_script_lang_js_,
  channelTabvue_type_template_id_0525027a_scoped_true_render,
  channelTabvue_type_template_id_0525027a_scoped_true_staticRenderFns,
  false,
  null,
  "0525027a",
  null
  
)

/* harmony default export */ var channelTab = (channelTab_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/consumerTab.vue?vue&type=template&id=6434f34e&scoped=true&
var consumerTabvue_type_template_id_6434f34e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content"},[_c('div',{staticClass:"section"},[_c('Card',{attrs:{"title":'列表',"btn-opt":_vm.consumerOperateOption}},[_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1),_vm._v(" "),_c('commonDialogTemplate',{attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem}}),_vm._v(" "),(_vm.clientVisible)?_c('clientComponent',{attrs:{"show":_vm.clientVisible},on:{"update:show":function($event){_vm.clientVisible=$event},"listenEvent":_vm.setClientValue}}):_vm._e(),_vm._v(" "),(_vm.channelVisible)?_c('channelModal',{attrs:{"show":_vm.channelVisible,"marketActiveData":_vm.marketActiveData},on:{"update:show":function($event){_vm.channelVisible=$event},"listenEvent":_vm.setChannelTableRow}}):_vm._e()],1)}
var consumerTabvue_type_template_id_6434f34e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/components/consumerTab.vue?vue&type=template&id=6434f34e&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clientComponent/index.vue?vue&type=template&id=45b3d29c&scoped=true&
var clientComponentvue_type_template_id_45b3d29c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('el-dialog',{attrs:{"title":"查询客户","visible":_vm.visible,"width":"800px"},on:{"update:visible":function($event){_vm.visible=$event},"close":function($event){return _vm.$emit('update:show', false)}}},[_c('el-form',{staticClass:"demo-form-inline",attrs:{"inline":true,"model":_vm.serachParm,"label-width":"80px"}},[_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":"客户名称"}},[_c('el-input',{attrs:{"placeholder":"客户名称"},model:{value:(_vm.serachParm.customerName),callback:function ($$v) {_vm.$set(_vm.serachParm, "customerName", $$v)},expression:"serachParm.customerName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onSearchSubmit}},[_vm._v("查询")])],1)],1)],1)],1),_vm._v(" "),_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":true},on:{"listenSingleEvent":_vm.setSingleSelection}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.ok}},[_vm._v("确 定")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.visible = false}}},[_vm._v("取 消")])],1)],1):_vm._e()}
var clientComponentvue_type_template_id_45b3d29c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/clientComponent/index.vue?vue&type=template&id=45b3d29c&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/components/clientComponent/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var clientComponentvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "actionComponent",
  data: function data() {
    return {
      visible: this.show,
      SelectionOptions: consts["a" /* SelectionOptions */],
      serachParm: {
        //查询参数
        customerName: null
      },
      selectTableRow: {},
      theadData: [{ checked: true, key: "customerName", val: "客户名称" }, { checked: true, key: "activityName", val: "所属市场活动" }, { checked: true, key: "channelName", val: "市场活动渠道" }],
      getListUrl: "/glp-crm/activity/queryCustomer" //列表数据地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
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
        console.log(this.visible, "this.visible");
        return this.visible;
      },
      set: function set() {}
    }
  },
  created: function created() {
    this.getList();
  },

  methods: {
    onSearchSubmit: function onSearchSubmit() {
      this.getList();
    },
    setSingleSelection: function setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok: function ok() {
      this.visible = false;
      this.$emit("listenEvent", this.selectTableRow);
    }
  }
});
// CONCATENATED MODULE: ./src/components/clientComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clientComponentvue_type_script_lang_js_ = (clientComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/clientComponent/index.vue





/* normalize component */

var clientComponent_component = Object(componentNormalizer["a" /* default */])(
  components_clientComponentvue_type_script_lang_js_,
  clientComponentvue_type_template_id_45b3d29c_scoped_true_render,
  clientComponentvue_type_template_id_45b3d29c_scoped_true_staticRenderFns,
  false,
  null,
  "45b3d29c",
  null
  
)

/* harmony default export */ var clientComponent = (clientComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/components/consumerTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var consumerTabvue_type_script_lang_js_ = ({
  name: "consumerTab",
  mixins: [listMixin["a" /* default */]],
  components: { clientComponent: clientComponent },
  props: {
    baseInfo: {
      type: Object
    }
  },
  data: function data() {
    return {
      deleteVisible: false,
      clientVisible: false,
      channelVisible: false,
      clientValue: {},
      pageInfo: {
        total: 0,
        size: 10,
        page: 1
      },
      serachParm: {
        activityId: null
      },
      tableData: [],
      theadData: [{ checked: true, key: "customerName", val: "客户名称" }, {
        checked: true,
        key: "customerType",
        val: "客户类型",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return row.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";
        }
      }, { checked: true, key: "activityName", val: "所属市场活动" }, { checked: true, key: "channelName", val: "市场活动渠道" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setClientBtnItems(),
        width: "200px"
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      }],
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      consumerOperateOption: {
        className: "el-icon-plus",
        name: "关联",
        func: this.relevanceFunc
      },
      ListPath: "/market/index", //列表路由地址
      editPath: "/market/edit", //列表路由地址
      getListUrl: "/glp-crm/activity/queryCustomerRelated" //市场活动-相关客户-分页列表
    };
  },

  computed: {},
  created: function created() {
    this.serachParm = { activityId: this.baseInfo.id };
    this.getList();
  },
  mounted: function mounted() {},

  methods: {
    setChannelTableRow: function setChannelTableRow(data) {
      debugger;
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    setClientBtnItems: function setClientBtnItems() {
      //设置有权限的按钮
      var items = [];
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
    setClientValue: function setClientValue(data) {
      var _this = this;

      var req = {
        arketActivityChannelReq: {
          customerId: data.customerId, //客户id
          marketActivityId: this.baseInfo.id, //活动id
          marketActivityChannelId: "3" // 渠道id
        }
      };
      debugger;
      marketService["a" /* default */].createCustomer(req).then(function (res) {
        if (res.code == 200) {
          _this.$message({ type: "success", message: "关联成功！" });
          _this.onRefresh();
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    relevanceFunc: function relevanceFunc() {
      this.clientVisible = true;
    },
    deleteFunc: function deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u76F8\u5173\u5BA2\u6237 \u201C" + item.customerName + "\u201D \u5417\uFF1F";
      this.rowItem = item;
      debugger;
    },
    getDelItem: function getDelItem(data) {
      var _this2 = this;

      this.deleteVisible = false;
      if (data.type == true) {
        var params = {
          customerId: this.rowItem.customerId,
          marketActivityId: this.baseInfo.id //活动id
        };
        marketService["a" /* default */].deleteRelatedCustomer(params).then(function (res) {
          if (res.code == 200) {
            _this2.$message({ type: "success", message: "删除成功！" });
            _this2.onRefresh();
          } else {
            _this2.$message({
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
    onRefresh: function onRefresh() {
      this.pageInfo.page = 1;
      this.getList();
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/components/consumerTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_consumerTabvue_type_script_lang_js_ = (consumerTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/components/consumerTab.vue?vue&type=style&index=0&id=6434f34e&lang=scss&scoped=true&
var consumerTabvue_type_style_index_0_id_6434f34e_lang_scss_scoped_true_ = __webpack_require__("QlEb");

// CONCATENATED MODULE: ./src/views/market/components/consumerTab.vue






/* normalize component */

var consumerTab_component = Object(componentNormalizer["a" /* default */])(
  components_consumerTabvue_type_script_lang_js_,
  consumerTabvue_type_template_id_6434f34e_scoped_true_render,
  consumerTabvue_type_template_id_6434f34e_scoped_true_staticRenderFns,
  false,
  null,
  "6434f34e",
  null
  
)

/* harmony default export */ var consumerTab = (consumerTab_component.exports);
// EXTERNAL MODULE: ./src/utils/index.js
var utils = __webpack_require__("7Qib");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/detail.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
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
  components: {
    baseInfoTab: baseInfoTab,
    channelTab: channelTab,
    consumerTab: consumerTab
  },
  data: function data() {
    return {
      loading: false,
      activeName: "first",
      baseInfo: null,
      routeQuery: null
    };
  },

  computed: {},
  created: function created() {
    this.routeQuery = this.$route.query;
    this.getMarketDetail();
    if (this.routeQuery.activeName) {
      this.activeName = this.routeQuery.activeName;
    }
  },
  mounted: function mounted() {},

  methods: {
    getMarketDetail: function getMarketDetail() {
      var _this = this;

      marketService["a" /* default */].getMarketDetail(this.routeQuery.id).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          _this.baseInfo = extends_default()({}, ndata, {
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
          _this.loading = true;
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/detail.vue?vue&type=script&lang=js&
 /* harmony default export */ var market_detailvue_type_script_lang_js_ = (detailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/detail.vue?vue&type=style&index=0&id=025b91e3&lang=scss&scoped=true&
var detailvue_type_style_index_0_id_025b91e3_lang_scss_scoped_true_ = __webpack_require__("DwpP");

// CONCATENATED MODULE: ./src/views/market/detail.vue






/* normalize component */

var detail_component = Object(componentNormalizer["a" /* default */])(
  market_detailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "025b91e3",
  null
  
)

/* harmony default export */ var detail = __webpack_exports__["default"] = (detail_component.exports);

/***/ }),

/***/ "z4JU":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);