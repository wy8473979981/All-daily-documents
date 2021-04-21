(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-7fe7"],{

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

/***/ "E33s":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "Ks6c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "Rk8K":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "W0lC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e0ee99fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Rk8K");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e0ee99fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e0ee99fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_e0ee99fe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "X7bD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualClient_vue_vue_type_style_index_0_id_a5591bec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("k69z");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualClient_vue_vue_type_style_index_0_id_a5591bec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualClient_vue_vue_type_style_index_0_id_a5591bec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_individualClient_vue_vue_type_style_index_0_id_a5591bec_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c2tI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/add.vue?vue&type=template&id=d1d033da&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isLoading)?_c('div',{staticClass:"content"},[_c('div',{staticClass:"section"},[(_vm.type=='ENTERPRISE')?[_c('corporateClient',{attrs:{"baseInfo":_vm.baseInfo}})]:[_c('individualClient',{attrs:{"baseInfo":_vm.baseInfo}})]],2)]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/add.vue?vue&type=template&id=d1d033da&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/corporateClient.vue?vue&type=template&id=57cf87e8&scoped=true&
var corporateClientvue_type_template_id_57cf87e8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"corporateClient"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"clearable":""},on:{"change":_vm.nameChange},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchBusinessFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户类型","prop":"customerTypeName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.customerTypeName ),callback:function ($$v) {_vm.$set(_vm.ruleForm, "customerTypeName", $$v)},expression:"ruleForm.customerTypeName "}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户简称","prop":"shortName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.shortName ),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "shortName", $$v)},expression:"ruleForm.enterprise.shortName "}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"ownerUserName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.ownerUserName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ownerUserName", $$v)},expression:"ruleForm.ownerUserName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件类型","prop":"certificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.certificateType),callback:function ($$v) {_vm.$set(_vm.ruleForm, "certificateType", $$v)},expression:"ruleForm.certificateType"}},_vm._l((_vm.dictTable.ENT_CERTIFICATE_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"是否GLP关联方","prop":"glpRelated"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.glpRelated),callback:function ($$v) {_vm.$set(_vm.ruleForm, "glpRelated", $$v)},expression:"ruleForm.glpRelated"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{staticClass:"tip-box",attrs:{"span":8}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"dark","content":"请输入客户社会信用代码或者注册号","placement":"top-start"}},[_c('i',{staticClass:"el-icon-info"})]),_vm._v(" "),_c('el-form-item',{attrs:{"span":12,"label":"证件号码","prop":"certificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.certificateId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "certificateId", $$v)},expression:"ruleForm.certificateId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"overdueFlag","label":"是否存在逾期/代偿记录"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.overdueFlag),callback:function ($$v) {_vm.$set(_vm.ruleForm, "overdueFlag", $$v)},expression:"ruleForm.overdueFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"industry","label":"所属行业"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.enterprise.industry),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "industry", $$v)},expression:"ruleForm.enterprise.industry"}},_vm._l((_vm.dictTable.INDUSTRY),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"channelFlag","label":"是否渠道客户"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.channelFlag),callback:function ($$v) {_vm.$set(_vm.ruleForm, "channelFlag", $$v)},expression:"ruleForm.channelFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"companyScale","label":"企业规模"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.enterprise.companyScale),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyScale", $$v)},expression:"ruleForm.enterprise.companyScale"}},_vm._l((_vm.SelectionOptions.companyScale),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"id","label":"ECIF客户ID"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.ecifId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ecifId", $$v)},expression:"ruleForm.ecifId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"financingScale","label":"融资规模"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.enterprise.financingScale),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "financingScale", $$v)},expression:"ruleForm.enterprise.financingScale"}},_vm._l((_vm.SelectionOptions.financingScale),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityName","label":"所属市场活动"}},[_c('el-input',{staticClass:"form-input",attrs:{"clearable":"","disabled":""},on:{"change":_vm.activityNameChange},model:{value:(_vm.ruleForm.activityName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "activityName", $$v)},expression:"ruleForm.activityName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchActionFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"companyFinancingAry","label":"融资需求"}},[_c('el-select',{attrs:{"multiple":"","clearable":"","placeholder":"请选择"},on:{"change":_vm.companyFinancingFunc},model:{value:(_vm.companyFinancingAry),callback:function ($$v) {_vm.companyFinancingAry=$$v},expression:"companyFinancingAry"}},_vm._l((_vm.SelectionOptions.financingNeeds),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityChannelName","label":"市场活动渠道"}},[_c('el-input',{staticClass:"form-input",attrs:{"clearable":"","disabled":""},on:{"change":_vm.activityChannelChange},model:{value:(_vm.ruleForm.activityChannelName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "activityChannelName", $$v)},expression:"ruleForm.activityChannelName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchChannelFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"fundUse","label":"资金用途"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.fundUse),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "fundUse", $$v)},expression:"ruleForm.enterprise.fundUse"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"authStatus","label":"实名状态"}},[_c('el-select',{attrs:{"disabled":""},model:{value:(_vm.ruleForm.authStatus),callback:function ($$v) {_vm.$set(_vm.ruleForm, "authStatus", $$v)},expression:"ruleForm.authStatus"}},_vm._l((_vm.dictTable.AUTH_STATUS),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"yearOperationRevenue","label":"年营业收入"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.enterprise.yearOperationRevenue),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "yearOperationRevenue", $$v)},expression:"ruleForm.enterprise.yearOperationRevenue"}},_vm._l((_vm.SelectionOptions.yearOperationRevenue),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"customerSource","label":"市场部获客来源"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.customerSource),callback:function ($$v) {_vm.$set(_vm.ruleForm, "customerSource", $$v)},expression:"ruleForm.customerSource"}},_vm._l((_vm.dictTable.MARKET_CUSTOMER_SOURCE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"roadTransportationLicenseNo","label":"道路运输经营许可证"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.roadTransportationLicenseNo),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "roadTransportationLicenseNo", $$v)},expression:"ruleForm.enterprise.roadTransportationLicenseNo"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"recommendUserName","label":"推荐人"}},[_c('el-input',{staticClass:"form-input",attrs:{"clearable":"","disabled":""},on:{"change":_vm.recommendUserNameChange},model:{value:(_vm.ruleForm.recommendUserName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "recommendUserName", $$v)},expression:"ruleForm.recommendUserName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchBelongerFun},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{directives:[{name:"show",rawName:"v-show",value:(_vm.companyFinancingFlag),expression:"companyFinancingFlag"}],attrs:{"title":'运费垫付补充信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"运输货物类型","prop":"cargoTypeAry"}},[_c('el-select',{attrs:{"clearable":"","multiple":"","placeholder":"请选择"},on:{"change":_vm.cargoTypeFunc},model:{value:(_vm.cargoTypeAry),callback:function ($$v) {_vm.cargoTypeAry=$$v},expression:"cargoTypeAry"}},_vm._l((_vm.SelectionOptions.cargoType),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"运输车辆总数","prop":"vehicleSum"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.vehicleSum),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "vehicleSum", $$v)},expression:"ruleForm.enterprise.vehicleSum"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"物流类型","prop":"logisticsType"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.enterprise.logisticsType),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "logisticsType", $$v)},expression:"ruleForm.enterprise.logisticsType"}},_vm._l((_vm.SelectionOptions.logisticsType),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"其中自有车辆占比","prop":"vehicleScale"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.enterprise.vehicleScale),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "vehicleScale", $$v)},expression:"ruleForm.enterprise.vehicleScale"}},_vm._l((_vm.SelectionOptions.proportionOwnedVehicles),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"主要客户名称","prop":"primeCustomerName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.primeCustomerName),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "primeCustomerName", $$v)},expression:"ruleForm.enterprise.primeCustomerName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"线上信息化水平","prop":"onlineInfo"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.enterprise.onlineInfo),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "onlineInfo", $$v)},expression:"ruleForm.enterprise.onlineInfo"}},_vm._l((_vm.SelectionOptions.onlineInfo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"产品","prop":"productName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.productName),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "productName", $$v)},expression:"ruleForm.enterprise.productName"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'联系信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业邮箱","prop":"enterpriseEmail"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.enterpriseEmail),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "enterpriseEmail", $$v)},expression:"ruleForm.enterprise.enterpriseEmail"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"传真","prop":"enterpriseFax"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.enterpriseFax),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "enterpriseFax", $$v)},expression:"ruleForm.enterprise.enterpriseFax"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"邮编","prop":"enterpriseZipCode"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.enterprise.enterpriseZipCode),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "enterpriseZipCode", $$v)},expression:"ruleForm.enterprise.enterpriseZipCode"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'  工商信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业类型","prop":"companyOrgType"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyOrgType),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyOrgType", $$v)},expression:"ruleForm.enterprise.companyOrgType"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"组织机构代码","prop":"companyOrgCode"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyOrgCode),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyOrgCode", $$v)},expression:"ruleForm.enterprise.companyOrgCode"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"法定代表人","prop":"companyLawPerson"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyLawPerson),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyLawPerson", $$v)},expression:"ruleForm.enterprise.companyLawPerson"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"登记机关","prop":"companyRegisterOrg"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyRegisterOrg),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyRegisterOrg", $$v)},expression:"ruleForm.enterprise.companyRegisterOrg"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"企业状态","prop":"companyBusinessState"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyBusinessState),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyBusinessState", $$v)},expression:"ruleForm.enterprise.companyBusinessState"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"注册资本","prop":"companyRegisterCaptial"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyRegisterCaptial),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyRegisterCaptial", $$v)},expression:"ruleForm.enterprise.companyRegisterCaptial"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"地址","prop":"companyAddress"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyAddress),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyAddress", $$v)},expression:"ruleForm.enterprise.companyAddress"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"认缴资本","prop":"companyActualRegisterCaptial"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyActualRegisterCaptial),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyActualRegisterCaptial", $$v)},expression:"ruleForm.enterprise.companyActualRegisterCaptial"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"成立日期","prop":"companyEstablishTime"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyEstablishTime),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyEstablishTime", $$v)},expression:"ruleForm.enterprise.companyEstablishTime"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"经营期限","prop":"companyBusinessTerm"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.enterprise.companyBusinessTerm),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyBusinessTerm", $$v)},expression:"ruleForm.enterprise.companyBusinessTerm"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":"一般经营范围","prop":"companyBusinessScope"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"disabled":"","type":"textarea","rows":5,"maxlength":"300","show-word-limit":""},model:{value:(_vm.ruleForm.enterprise.companyBusinessScope),callback:function ($$v) {_vm.$set(_vm.ruleForm.enterprise, "companyBusinessScope", $$v)},expression:"ruleForm.enterprise.companyBusinessScope"}})],1)],1)],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1),_vm._v(" "),(_vm.businessVisible)?_c('businessModal',{attrs:{"show":_vm.businessVisible},on:{"update:show":function($event){_vm.businessVisible=$event},"listenEvent":_vm.setBusinessTableRow}}):_vm._e(),_vm._v(" "),(_vm.actionVisible)?_c('actionModal',{attrs:{"show":_vm.actionVisible,"activeChannelData":_vm.activeChannelData},on:{"update:show":function($event){_vm.actionVisible=$event},"listenEvent":_vm.setActionTableRow}}):_vm._e(),_vm._v(" "),(_vm.channelVisible)?_c('channelModal',{attrs:{"show":_vm.channelVisible,"marketActiveData":_vm.marketActiveData},on:{"update:show":function($event){_vm.channelVisible=$event},"listenEvent":_vm.setChannelTableRow}}):_vm._e(),_vm._v(" "),(_vm.belongerVisible)?_c('belongerModal',{attrs:{"show":_vm.belongerVisible},on:{"update:show":function($event){_vm.belongerVisible=$event},"listenEvent":_vm.setBelongerTableRow}}):_vm._e()],1)}
var corporateClientvue_type_template_id_57cf87e8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/corporateClient.vue?vue&type=template&id=57cf87e8&scoped=true&

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/businessComponent/index.vue?vue&type=template&id=e0ee99fe&scoped=true&
var businessComponentvue_type_template_id_e0ee99fe_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.show)?_c('el-dialog',{attrs:{"title":"查询工商信息","visible":_vm.visible,"width":"800px"},on:{"update:visible":function($event){_vm.visible=$event},"close":function($event){return _vm.$emit('update:show', false)}}},[_c('el-form',{staticClass:"demo-form-inline",attrs:{"inline":true,"model":_vm.serachParm,"label-width":"80px"}},[_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":"企业名称"}},[_c('el-input',{attrs:{"placeholder":"企业名称"},model:{value:(_vm.serachParm.identification),callback:function ($$v) {_vm.$set(_vm.serachParm, "identification", $$v)},expression:"serachParm.identification"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onSearchSubmit}},[_vm._v("查询")])],1)],1)],1)],1),_vm._v(" "),_c('tableTemplate',{attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":false,"checkbox":false},on:{"listenEvent":_vm.setSingleSelection}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.visible = false}}},[_vm._v("关闭")])],1)],1):_vm._e(),_vm._v(" "),_c('el-dialog',{attrs:{"title":"工商信息详情","visible":_vm.infoVisible,"width":"800px"},on:{"update:visible":function($event){_vm.infoVisible=$event}}},[_c('div',{staticClass:"base-info-section"},[_c('el-row',{staticClass:"row-item base-info-section",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("企业名称:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.name))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("社会信用代码:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.uniscid))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("企业类型:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.entType))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("组织机构代码:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.licid))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("法定代表人:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.legalPerson))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("登记机关:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.regOrg))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("企业状态:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.entstatus))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("注册资本:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.regCapital))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("地址:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.address))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("认缴资本:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.actualPay))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("成立日期:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.esDate))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("经营期限:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.operationDate))])]),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('label',[_vm._v("一般经营范围:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.enterpriseDetail.operationScope))])])],1)],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.ok}},[_vm._v("回填信息")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.visible = false}}},[_vm._v("取 消")])],1)])],1)}
var businessComponentvue_type_template_id_e0ee99fe_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/businessComponent/index.vue?vue&type=template&id=e0ee99fe&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/api/common.js
var common = __webpack_require__("KTTK");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/components/businessComponent/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var businessComponentvue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {},
  name: "businessComponent",
  data: function data() {
    return {
      visible: this.show,
      infoVisible: false,
      SelectionOptions: consts["a" /* SelectionOptions */],
      serachParm: {
        identification: ""
      },
      selectTableRow: {},
      enterpriseDetail: {
        actualPay: null, //认缴资本
        address: null, //地址
        entType: null, //企业类型
        entstatus: null, //企业状态
        esDate: null, //成立日期
        legalPerson: null, //法人
        licid: null, //组织机构代码
        name: null, //企业名称
        operationDate: null, //经营期限
        operationScope: null, //一般经营范围
        regCapital: null, //注册资本
        regOrg: null, // 登记机关
        uniscid: null //统一社会信用代码(证件号)
      },
      theadData: [{ checked: true, key: "name", val: "企业名称" }, {
        checked: true,
        key: "isBtns",
        val: "操作",
        checkRight: false,
        btnItems: this.setBtnItems(),
        width: "200px"
      }],
      getListUrl: "/glp-crm/customer/graph/ent/list" //列表数据地址
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
    getList: function getList() {
      var _this = this;

      //获取列表数据
      if (this.isGetList == true) {
        return;
      }
      this.isGetList = true;
      var params = extends_default()({}, this.serachParm, {
        page: this.pageInfo.page,
        size: this.pageInfo.size
      });
      common["a" /* default */].post(this.getListUrl, params).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          _this.tableData = ndata || [];
          _this.pageInfo.total = ndata.totalNum || 0;
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this.isGetList = false;
      }, function (err) {
        _this.isGetList = false;
      });
    },
    setBtnItems: function setBtnItems() {
      var items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc
      });
      return items;
    },
    detailFunc: function detailFunc(item) {
      var _this2 = this;

      var detailUrl = "/glp-crm/customer/graph/ent/info/" + item.id;
      common["a" /* default */].get(detailUrl).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          _this2.enterpriseDetail = ndata;
          _this2.infoVisible = true;
        } else {
          _this2.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this2.isGetList = false;
      }, function (err) {
        _this2.isGetList = false;
      });
    },
    submitForm: function submitForm(formName) {
      var _this3 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          console.log(_this3.transferAry, _this3.form, "submitForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSearchSubmit: function onSearchSubmit() {
      console.log(this.formInline, "submit!");
    },
    setSingleSelection: function setSingleSelection(data) {
      debugger;
      this.selectTableRow = data;
    },
    ok: function ok() {
      debugger;
      this.infoVisible = false;
      this.visible = false;
      this.$emit("listenEvent", this.enterpriseDetail);
    }
  }
});
// CONCATENATED MODULE: ./src/components/businessComponent/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_businessComponentvue_type_script_lang_js_ = (businessComponentvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/businessComponent/index.vue?vue&type=style&index=0&id=e0ee99fe&lang=scss&scoped=true&
var businessComponentvue_type_style_index_0_id_e0ee99fe_lang_scss_scoped_true_ = __webpack_require__("W0lC");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/businessComponent/index.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_businessComponentvue_type_script_lang_js_,
  businessComponentvue_type_template_id_e0ee99fe_scoped_true_render,
  businessComponentvue_type_template_id_e0ee99fe_scoped_true_staticRenderFns,
  false,
  null,
  "e0ee99fe",
  null
  
)

/* harmony default export */ var businessComponent = (component.exports);
// EXTERNAL MODULE: ./src/components/actionComponent/index.vue + 4 modules
var actionComponent = __webpack_require__("zD1F");

// EXTERNAL MODULE: ./src/components/channelComponent/index.vue + 4 modules
var channelComponent = __webpack_require__("dts1");

// EXTERNAL MODULE: ./src/components/belongerComponent/index.vue + 4 modules
var belongerComponent = __webpack_require__("YOAK");

// EXTERNAL MODULE: ./src/api/consumerService.js
var consumerService = __webpack_require__("LERC");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/corporateClient.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var corporateClientvue_type_script_lang_js_ = ({
  components: {
    businessModal: businessComponent,
    actionModal: actionComponent["a" /* default */],
    channelModal: channelComponent["a" /* default */],
    belongerModal: belongerComponent["a" /* default */]
  },
  name: "corporateClient",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      transferAry: {},
      SelectionOptions: consts["a" /* SelectionOptions */],
      businessVisible: false,
      actionVisible: false,
      channelVisible: false,
      belongerVisible: false,
      companyFinancingFlag: false, //融资需求是否选择运费垫付
      companyFinancingAry: [], //融资需求数组
      cargoTypeAry: [], //运输货物类型
      routeQuery: {}, //查询参数
      ruleForm: {
        id: null, //客户id 必填
        name: null, //客户名称 必填
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
        activityId: null, //所属市场活动
        activityName: null, //所属市场活动名称
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
          companyActualRegisterCaptial: null, //认缴资本
          companyAddress: null, //住所
          companyBusinessTerm: null, //营业期限
          companyBusinessScope: null, //一般经营范围
          companyBusinessState: null, //企业状态
          companyEstablishTime: null, //成立日期
          companyFinancing: "", //融资需求
          companyIndustry: null, //所在行业
          companyLawPerson: null, //法定代表人
          companyOrgCode: null, //组织机构代码
          companyOrgType: null, //企业类型
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
      }, //表单字段
      rules: {
        //校验规则
        name: [{ required: true, message: "请输入客户名称", trigger: ["blur"] }, { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }],
        certificateType: [{ required: true, message: "必选", trigger: "blur" }],
        certificateId: [{ required: true, message: "请输入证件号码", trigger: ["blur"] }, { min: 4, max: 50, message: "请至少输入4位", trigger: "blur" }],
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
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
      userInfo: {}, //登录人信息
      addUrl: "/warehouse/add", //新增url
      editUrl: "/warehouse/update", //编辑url
      saveDetailUrl: "", //保存数据地址
      ListPath: "/consumer/index" //列表路由地址
    };
  },

  computed: {},

  created: function created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {
    try {
      if (this.routeQuery.flag == "edit") {
        this.ruleForm = this.baseInfo;
        //融资需求
        var companyFinancing = this.ruleForm.enterprise.companyFinancing && this.ruleForm.enterprise.companyFinancing.split(",");
        // 运输货物类型
        var cargoType = this.ruleForm.enterprise.cargoType && this.ruleForm.enterprise.cargoType.split(",");
        this.companyFinancingAry = companyFinancing.map(Number);
        this.cargoTypeAry = cargoType.map(Number);

        debugger;
        this.ruleForm.customerTypeName = "企业客户";
        console.log(this.cargoTypeAry, "----");
      } else {
        this.ruleForm.ownerUserName = this.userInfo.name;
        this.ruleForm.ownerUserNo = this.userInfo.userNo;
      }
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    baseInfo: function baseInfo(v) {
      this.ruleForm = v;
    }
  },
  methods: {
    nameChange: function nameChange(value) {
      if (!value) {
        this.ruleForm.name = null; //客户名称
      }
    },
    activityNameChange: function activityNameChange(value) {
      if (!value) {
        this.ruleForm.activityId = null; //所属市场活动
        this.ruleForm.activityName = null; //所属市场活动名称
      }
    },
    activityChannelChange: function activityChannelChange(value) {
      if (!value) {
        this.ruleForm.activityChannelId = null; //市场活动渠道
        this.ruleForm.activityChannelName = null; //市场活动渠道名称
      }
    },
    recommendUserNameChange: function recommendUserNameChange(value) {
      if (!value) {
        this.ruleForm.recommendUserNo = null; //推荐人编号
        this.ruleForm.recommendUserName = null; //推荐人名称
      }
    },
    cargoTypeFunc: function cargoTypeFunc(data) {
      //  运输货物类型
      this.ruleForm.enterprise.cargoType = data.join();
      this.cargoTypeAry = data;
    },
    companyFinancingFunc: function companyFinancingFunc(data) {
      if (data.includes(0)) {
        // 展示运费垫付补充信息
        this.companyFinancingFlag = true;
      } else {
        this.companyFinancingFlag = false;
      }
      this.ruleForm.enterprise.companyFinancing = data.join(); //融资需求
      this.companyFinancingAry = data; //融资需求
    },
    searchActionFun: function searchActionFun() {
      debugger;
      this.actionVisible = true;
    },
    setBusinessTableRow: function setBusinessTableRow(data) {
      this.ruleForm.name = data.entType; //企业名称（客户名称）
      this.ruleForm.enterprise.companyOrgType = data.entType; //企业类型
      this.ruleForm.enterprise.companyOrgCode = data.licid; //组织机构代码
      this.ruleForm.enterprise.companyLawPerson = data.legalPerson; //法定代表人
      this.ruleForm.enterprise.companyRegisterOrg = data.regOrg; //登记机关

      this.ruleForm.enterprise.companyBusinessState = data.entstatus; //企业状态

      this.ruleForm.enterprise.companyRegisterCaptial = data.regCapital; //注册资本
      this.ruleForm.enterprise.companyAddress = data.address; //地址
      this.ruleForm.enterprise.companyActualRegisterCaptial = data.actualPay; //认缴资本
      this.ruleForm.enterprise.companyEstablishTime = data.esDate; //成立日期
      this.ruleForm.enterprise.companyBusinessTerm = data.operationDate; //经营期限
      this.ruleForm.enterprise.companyBusinessScope = data.operationScope; //一般经营范围
      debugger;
    },
    setActionTableRow: function setActionTableRow(data) {
      this.ruleForm.activityId = data.id; //所属市场活动
      this.ruleForm.activityName = data.name; //所属市场活动名称
      this.marketActiveData = data; //已选的市场活动
    },
    setChannelTableRow: function setChannelTableRow(data) {
      debugger;
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    setBelongerTableRow: function setBelongerTableRow(data) {
      this.ruleForm.recommendUserNo = data.userNo; //推荐人编号
      this.ruleForm.recommendUserName = data.userName; //推荐人名称
    },
    searchBelongerFun: function searchBelongerFun() {
      this.belongerVisible = true;
      debugger;
    },
    searchBusinessFun: function searchBusinessFun() {
      this.businessVisible = true;
      debugger;
    },
    searchChannelFun: function searchChannelFun() {
      this.channelVisible = true;
      debugger;
    },
    setTransferValue: function setTransferValue(data) {
      this.transferAry = data;
      // console.log(this.transferAry, "this.transferAry");
    },
    submitForm: function submitForm() {
      var _this = this;

      debugger;
      //前端校验表单
      this.$refs["ruleForm"].validate(function (valid) {
        if (valid) {
          debugger;
          if (_this.routeQuery.flag == "edit") {
            consumerService["a" /* default */].updateConsumer(_this.ruleForm).then(function (res) {
              if (res.code == 200) {
                _this.$message({ type: "success", message: "更新成功！" });
                _this.$router.push({ path: _this.ListPath });
              } else {
                _this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          } else {
            consumerService["a" /* default */].createConsumer(_this.ruleForm).then(function (res) {
              if (res.code == 200) {
                debugger;
                _this.$message({ type: "success", message: "新建成功！" });
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
// CONCATENATED MODULE: ./src/views/consumer/components/corporateClient.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_corporateClientvue_type_script_lang_js_ = (corporateClientvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/corporateClient.vue?vue&type=style&index=0&id=57cf87e8&lang=scss&scoped=true&
var corporateClientvue_type_style_index_0_id_57cf87e8_lang_scss_scoped_true_ = __webpack_require__("sLzv");

// CONCATENATED MODULE: ./src/views/consumer/components/corporateClient.vue






/* normalize component */

var corporateClient_component = Object(componentNormalizer["a" /* default */])(
  components_corporateClientvue_type_script_lang_js_,
  corporateClientvue_type_template_id_57cf87e8_scoped_true_render,
  corporateClientvue_type_template_id_57cf87e8_scoped_true_staticRenderFns,
  false,
  null,
  "57cf87e8",
  null
  
)

/* harmony default export */ var corporateClient = (corporateClient_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/individualClient.vue?vue&type=template&id=a5591bec&scoped=true&
var individualClientvue_type_template_id_a5591bec_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"corporateClient"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},on:{"change":_vm.nameChange},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchBusinessFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户类型","prop":"customerTypeName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.customerTypeName ),callback:function ($$v) {_vm.$set(_vm.ruleForm, "customerTypeName", $$v)},expression:"ruleForm.customerTypeName "}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"曾用名","prop":"usedName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.usedName ),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "usedName", $$v)},expression:"ruleForm.individual.usedName "}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"拥有人","prop":"ownerUserName"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.ownerUserName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ownerUserName", $$v)},expression:"ruleForm.ownerUserName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件类型","prop":"certificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.certificateType),callback:function ($$v) {_vm.$set(_vm.ruleForm, "certificateType", $$v)},expression:"ruleForm.certificateType"}},_vm._l((_vm.dictTable.IND_CERTIFICATE_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"是否GLP关联方","prop":"glpRelated"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.glpRelated),callback:function ($$v) {_vm.$set(_vm.ruleForm, "glpRelated", $$v)},expression:"ruleForm.glpRelated"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{staticClass:"tip-box",attrs:{"span":8}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"dark","content":"请输入客户社会信用代码或者注册号","placement":"top-start"}},[_c('i',{staticClass:"el-icon-info"})]),_vm._v(" "),_c('el-form-item',{attrs:{"span":12,"label":"证件号码","prop":"certificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.certificateId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "certificateId", $$v)},expression:"ruleForm.certificateId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"overdueFlag","label":"是否存在逾期/代偿记录"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.overdueFlag),callback:function ($$v) {_vm.$set(_vm.ruleForm, "overdueFlag", $$v)},expression:"ruleForm.overdueFlag"}},_vm._l((_vm.SelectionOptions.optionYesOrNo),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"证件有效期起始日","prop":"validTermBegin"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"type":"date","placeholder":"选择开始日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.individual.validTermBegin),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "validTermBegin", $$v)},expression:"ruleForm.individual.validTermBegin"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"id","label":"ECIF客户ID"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":true,"placeholder":"请输入"},model:{value:(_vm.ruleForm.ecifId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "ecifId", $$v)},expression:"ruleForm.ecifId"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"证件有效期截止日","prop":"validTermEnd"}},[_c('el-date-picker',{staticClass:"form-input",attrs:{"picker-options":_vm.endPickerOptions,"type":"date","placeholder":"选择结束日期","value-format":_vm.dateTypeString},model:{value:(_vm.ruleForm.individual.validTermEnd),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "validTermEnd", $$v)},expression:"ruleForm.individual.validTermEnd"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityName","label":"所属市场活动"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.activityName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "activityName", $$v)},expression:"ruleForm.activityName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchActionFun},slot:"suffix"})])],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"certificateAuthority","label":"证件签发机关"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.certificateAuthority),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "certificateAuthority", $$v)},expression:"ruleForm.individual.certificateAuthority"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"activityChannelName","label":"市场活动渠道"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.activityChannelName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "activityChannelName", $$v)},expression:"ruleForm.activityChannelName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchChannelFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"gender","label":"性别"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.individual.gender),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "gender", $$v)},expression:"ruleForm.individual.gender"}},_vm._l((_vm.SelectionOptions.gender),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"authStatus","label":"实名状态"}},[_c('el-select',{attrs:{"disabled":""},model:{value:(_vm.ruleForm.authStatus),callback:function ($$v) {_vm.$set(_vm.ruleForm, "authStatus", $$v)},expression:"ruleForm.authStatus"}},_vm._l((_vm.dictTable.AUTH_STATUS),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"race","label":"民族"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.race),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "race", $$v)},expression:"ruleForm.individual.race"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"customerSource","label":"市场部获客来源"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.customerSource),callback:function ($$v) {_vm.$set(_vm.ruleForm, "customerSource", $$v)},expression:"ruleForm.customerSource"}},_vm._l((_vm.dictTable.MARKET_CUSTOMER_SOURCE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"birthday","label":"出生日期"}},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择日期"},model:{value:(_vm.ruleForm.individual.birthday),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "birthday", $$v)},expression:"ruleForm.individual.birthday"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"recommendUserName","label":"推荐人"}},[_c('el-input',{staticClass:"form-input",attrs:{"disabled":""},model:{value:(_vm.ruleForm.recommendUserName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "recommendUserName", $$v)},expression:"ruleForm.recommendUserName"}},[_c('i',{staticClass:"el-input__icon el-icon-search cursor",attrs:{"slot":"suffix"},on:{"click":_vm.searchBelongerFun},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"prop":"dwellingStatus","label":"居住状况"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.individual.dwellingStatus),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "dwellingStatus", $$v)},expression:"ruleForm.individual.dwellingStatus"}},_vm._l((_vm.SelectionOptions.dwellingStatus),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'联系信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"手机号码","prop":"contactMobile"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.contactMobile),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "contactMobile", $$v)},expression:"ruleForm.individual.contactMobile"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"微信","prop":"contactWechat"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.contactWechat),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "contactWechat", $$v)},expression:"ruleForm.individual.contactWechat"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"固定电话","prop":"contactTelephone"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.contactTelephone),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "contactTelephone", $$v)},expression:"ruleForm.individual.contactTelephone"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"QQ","prop":"contactQq"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.contactQq),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "contactQq", $$v)},expression:"ruleForm.individual.contactQq"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"个人邮箱","prop":"contactEmail"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.contactEmail),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "contactEmail", $$v)},expression:"ruleForm.individual.contactEmail"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'教育信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"教育水平","prop":"eduLevel"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.individual.eduLevel),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "eduLevel", $$v)},expression:"ruleForm.individual.eduLevel"}},_vm._l((_vm.SelectionOptions.eduLevel),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业学校","prop":"graduateSchool"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.graduateSchool),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "graduateSchool", $$v)},expression:"ruleForm.individual.graduateSchool"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业年份","prop":"graduationYear"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.graduationYear),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "graduationYear", $$v)},expression:"ruleForm.individual.graduationYear"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'婚姻信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"婚姻状况","prop":"maritalStatus"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.ruleForm.individual.maritalStatus),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "maritalStatus", $$v)},expression:"ruleForm.individual.maritalStatus"}},_vm._l((_vm.SelectionOptions.maritalStatus),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件类型","prop":"spouseCertificateType"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.individual.spouseCertificateType),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "spouseCertificateType", $$v)},expression:"ruleForm.individual.spouseCertificateType"}},_vm._l((_vm.SelectionOptions.personCertificateTypeArr),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶姓名","prop":"spouseName"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.spouseName),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "spouseName", $$v)},expression:"ruleForm.individual.spouseName"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件号码","prop":"spouseCertificateId"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.spouseCertificateId),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "spouseCertificateId", $$v)},expression:"ruleForm.individual.spouseCertificateId"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'收入信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"家庭月收入","prop":"householdMonthlyIncome"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.householdMonthlyIncome),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "householdMonthlyIncome", $$v)},expression:"ruleForm.individual.householdMonthlyIncome"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"本人月收入","prop":"monthlyIncome"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.monthlyIncome),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "monthlyIncome", $$v)},expression:"ruleForm.individual.monthlyIncome"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'工作信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"实际从业年限","prop":"workingSeniority"}},[_c('el-select',{staticClass:"form-input",attrs:{"clearable":""},model:{value:(_vm.ruleForm.individual.workingSeniority),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "workingSeniority", $$v)},expression:"ruleForm.individual.workingSeniority"}},_vm._l((_vm.SelectionOptions.actualYearsEmployment),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位","prop":"company"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.company),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "company", $$v)},expression:"ruleForm.individual.company"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"公司总机","prop":"companySwitchboard"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.companySwitchboard),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "companySwitchboard", $$v)},expression:"ruleForm.individual.companySwitchboard"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位所属行业","prop":"companyIndustry"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.individual.companyIndustry),callback:function ($$v) {_vm.$set(_vm.ruleForm.individual, "companyIndustry", $$v)},expression:"ruleForm.individual.companyIndustry"}})],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'备注信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"desTextarea",attrs:{"prop":"note","label":"备注"}},[_c('el-input',{staticClass:"form-input",staticStyle:{"width":"800px"},attrs:{"type":"textarea","rows":5,"maxlength":"300","show-word-limit":"","placeholder":"请输入"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1)],1)],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1),_vm._v(" "),(_vm.businessVisible)?_c('businessModal',{attrs:{"show":_vm.businessVisible},on:{"update:show":function($event){_vm.businessVisible=$event},"listenEvent":_vm.setBusinessTableRow}}):_vm._e(),_vm._v(" "),(_vm.actionVisible)?_c('actionModal',{attrs:{"show":_vm.actionVisible,"activeChannelData":_vm.activeChannelData},on:{"update:show":function($event){_vm.actionVisible=$event},"listenEvent":_vm.setActionTableRow}}):_vm._e(),_vm._v(" "),(_vm.channelVisible)?_c('channelModal',{attrs:{"show":_vm.channelVisible,"marketActiveData":_vm.marketActiveData},on:{"update:show":function($event){_vm.channelVisible=$event},"listenEvent":_vm.setChannelTableRow}}):_vm._e(),_vm._v(" "),(_vm.belongerVisible)?_c('belongerModal',{attrs:{"show":_vm.belongerVisible},on:{"update:show":function($event){_vm.belongerVisible=$event},"listenEvent":_vm.setBelongerTableRow}}):_vm._e()],1)}
var individualClientvue_type_template_id_a5591bec_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/individualClient.vue?vue&type=template&id=a5591bec&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/individualClient.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var individualClientvue_type_script_lang_js_ = ({
  components: {
    businessModal: businessComponent,
    actionModal: actionComponent["a" /* default */],
    channelModal: channelComponent["a" /* default */],
    belongerModal: belongerComponent["a" /* default */]
  },
  name: "corporateClient",
  data: function data() {
    var self = this;
    return {
      transferAry: {},
      SelectionOptions: consts["a" /* SelectionOptions */],
      businessVisible: false,
      actionVisible: false,
      channelVisible: false,
      belongerVisible: false,
      routeQuery: {}, //查询参数
      dictTable: null, //字典表

      ruleForm: {
        glpRelated: null, //是否GLP关联方
        ecifId: null, //ECIF客户ID
        name: null, //客户名称 必填
        overdueFlag: null, //是否存在逾期/代偿记录
        recommendUserNo: null, //推荐人编号
        recommendUserName: null, //推荐人名称
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
        activityId: null, //所属市场活动
        activityName: null, //所属市场活动名称
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
      }, //表单字段
      rules: {
        //校验规则
        name: [{ required: true, message: "请输入客户名称", trigger: ["blur"] }, { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }],
        certificateType: [{ required: true, message: "必选", trigger: "blur" }],
        certificateId: [{ required: true, message: "请输入证件号码", trigger: ["blur"] }, { min: 4, max: 50, message: "请至少输入4位", trigger: "blur" }],
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
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
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
      userInfo: {}, //登录人信息
      addUrl: "/warehouse/add", //新增url
      editUrl: "/warehouse/update", //编辑url
      saveDetailUrl: "", //保存数据地址
      ListPath: "/consumer/index" //列表路由地址
    };
  },

  computed: {},

  created: function created() {
    this.routeQuery = this.$route.query;
    this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
    this.ruleForm.ownerUserName = this.userInfo.name;
    this.ruleForm.ownerUserNo = this.userInfo.userNo;
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },
  mounted: function mounted() {},

  methods: {
    nameChange: function nameChange(value) {
      if (!value) {
        this.ruleForm.name = null; //客户名称
      }
    },
    searchActionFun: function searchActionFun() {
      debugger;
      this.actionVisible = true;
    },
    setBusinessTableRow: function setBusinessTableRow(data) {
      this.ruleForm.name = data.entType; //企业名称（客户名称）
      debugger;
    },
    setActionTableRow: function setActionTableRow(data) {
      this.ruleForm.activityId = data.id; //所属市场活动
      this.ruleForm.activityName = data.name; //所属市场活动名称
      this.marketActiveData = data; //已选的市场活动
    },
    setChannelTableRow: function setChannelTableRow(data) {
      debugger;
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    setBelongerTableRow: function setBelongerTableRow(data) {
      this.ruleForm.recommendUserNo = data.userNo; //推荐人编号
      this.ruleForm.recommendUserName = data.userName; //推荐人名称
    },
    searchBelongerFun: function searchBelongerFun() {
      this.belongerVisible = true;
      debugger;
    },
    searchBusinessFun: function searchBusinessFun() {
      this.businessVisible = true;
      debugger;
    },
    searchChannelFun: function searchChannelFun() {
      this.channelVisible = true;
      debugger;
    },
    setTransferValue: function setTransferValue(data) {
      this.transferAry = data;
      // console.log(this.transferAry, "this.transferAry");
    },
    submitForm: function submitForm() {
      var _this = this;

      //前端校验表单
      this.$refs["ruleForm"].validate(function (valid) {
        if (valid) {
          debugger;
          if (_this.routeQuery.flag == "edit") {
            consumerService["a" /* default */].updateConsumer(_this.ruleForm).then(function (res) {
              if (res.code == 200) {
                _this.$message({ type: "success", message: "更新成功！" });
                _this.$router.push({ path: _this.ListPath });
              } else {
                _this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          } else {
            consumerService["a" /* default */].createConsumer(_this.ruleForm).then(function (res) {
              if (res.code == 200) {
                debugger;
                _this.$message({ type: "success", message: "新建成功！" });
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
// CONCATENATED MODULE: ./src/views/consumer/components/individualClient.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_individualClientvue_type_script_lang_js_ = (individualClientvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/individualClient.vue?vue&type=style&index=0&id=a5591bec&lang=scss&scoped=true&
var individualClientvue_type_style_index_0_id_a5591bec_lang_scss_scoped_true_ = __webpack_require__("X7bD");

// CONCATENATED MODULE: ./src/views/consumer/components/individualClient.vue






/* normalize component */

var individualClient_component = Object(componentNormalizer["a" /* default */])(
  components_individualClientvue_type_script_lang_js_,
  individualClientvue_type_template_id_a5591bec_scoped_true_render,
  individualClientvue_type_template_id_a5591bec_scoped_true_staticRenderFns,
  false,
  null,
  "a5591bec",
  null
  
)

/* harmony default export */ var individualClient = (individualClient_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/add.vue?vue&type=script&lang=js&
//
//
//
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
    corporateClient: corporateClient,
    individualClient: individualClient
  },
  data: function data() {
    return {
      routeQuery: null,
      type: null,
      isLoading: false, //是否正在加载
      baseInfo: null
    };
  },

  computed: {},

  created: function created() {
    this.routeQuery = this.$route.query;
    this.type = this.routeQuery.type;
    if (this.routeQuery.flag == "edit") {
      this.getDetailById();
    } else {
      this.isLoading = true;
    }
  },
  mounted: function mounted() {},

  methods: {
    getDetailById: function getDetailById(data) {
      var _this = this;

      consumerService["a" /* default */].consumerDetailById(this.routeQuery.id).then(function (res) {
        if (res.code == 200) {
          debugger;
          var _data = res.data;

          _this.baseInfo = _data;
          _this.isLoading = true;
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
// CONCATENATED MODULE: ./src/views/consumer/add.vue?vue&type=script&lang=js&
 /* harmony default export */ var consumer_addvue_type_script_lang_js_ = (addvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/add.vue?vue&type=style&index=0&id=d1d033da&lang=scss&scoped=true&
var addvue_type_style_index_0_id_d1d033da_lang_scss_scoped_true_ = __webpack_require__("vnJP");

// CONCATENATED MODULE: ./src/views/consumer/add.vue






/* normalize component */

var add_component = Object(componentNormalizer["a" /* default */])(
  consumer_addvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d1d033da",
  null
  
)

/* harmony default export */ var add = __webpack_exports__["default"] = (add_component.exports);

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

/***/ "k69z":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "sLzv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_corporateClient_vue_vue_type_style_index_0_id_57cf87e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Ks6c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_corporateClient_vue_vue_type_style_index_0_id_57cf87e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_corporateClient_vue_vue_type_style_index_0_id_57cf87e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_corporateClient_vue_vue_type_style_index_0_id_57cf87e8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "vnJP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_d1d033da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("E33s");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_d1d033da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_d1d033da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_d1d033da_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);