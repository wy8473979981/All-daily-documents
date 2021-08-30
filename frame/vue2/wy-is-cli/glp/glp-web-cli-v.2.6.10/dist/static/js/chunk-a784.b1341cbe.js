(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-a784"],{

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

/***/ "45Sh":
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

/***/ "U34/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/index.vue?vue&type=template&id=45c432f0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content consumer"},[_c('div',{staticClass:"section search-section"},[_c('Card',{attrs:{"show-header":false}},[_c('el-form',{ref:"searchForm",staticClass:"form-section",attrs:{"model":_vm.serachParm,"inline":true,"size":"small","label-width":"100px"}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":24}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户筛选","prop":"departmentCode"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.serachParm.departmentCode),callback:function ($$v) {_vm.$set(_vm.serachParm, "departmentCode", $$v)},expression:"serachParm.departmentCode"}},_vm._l((_vm.SelectionOptions.departmentType),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.value}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户类型","prop":"customerType"}},[_c('el-select',{attrs:{"clearable":"","placeholder":"请选择"},model:{value:(_vm.serachParm.customerType),callback:function ($$v) {_vm.$set(_vm.serachParm, "customerType", $$v)},expression:"serachParm.customerType"}},_vm._l((_vm.dictTable.CUSTOMER_TYPE),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.label,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"是否渠道客户","prop":"ifChannel"}},[_c('el-checkbox',{model:{value:(_vm.serachParm.ifChannel),callback:function ($$v) {_vm.$set(_vm.serachParm, "ifChannel", $$v)},expression:"serachParm.ifChannel"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":24}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"创建日期","prop":"createTime"}},[_c('el-date-picker',{attrs:{"type":"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:(_vm.serachParm.createTime),callback:function ($$v) {_vm.$set(_vm.serachParm, "createTime", $$v)},expression:"serachParm.createTime"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-item",attrs:{"placeholder":"请输入"},model:{value:(_vm.serachParm.name),callback:function ($$v) {_vm.$set(_vm.serachParm, "name", $$v)},expression:"serachParm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"拥有人","prop":"ownerName"}},[_c('el-input',{staticClass:"form-item",attrs:{"placeholder":"请输入"},model:{value:(_vm.serachParm.ownerName),callback:function ($$v) {_vm.$set(_vm.serachParm, "ownerName", $$v)},expression:"serachParm.ownerName"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":24}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{staticClass:"form-item-div",attrs:{"label":"最近修改日期","prop":"updateTime"}},[_c('el-date-picker',{attrs:{"type":"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:(_vm.serachParm.updateTime),callback:function ($$v) {_vm.$set(_vm.serachParm, "updateTime", $$v)},expression:"serachParm.updateTime"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticClass:"row-item",attrs:{"gutter":0}},[_c('el-col',{attrs:{"span":24,"align":"center"}},[_c('el-button',{staticClass:"btn-twofont",attrs:{"type":"primary","size":"small"},on:{"click":_vm.submitSearch}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{staticClass:"btn-twofont",attrs:{"size":"small"},on:{"click":function($event){return _vm.clearData('searchForm')}}},[_vm._v("重置")])],1)],1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"section table-section"},[_c('Card',{attrs:{"btn-opt":_vm.operateOption,"el-icon-class":'el-icon-plus',"checkbox-data":_vm.theadData,"table-list-name":_vm.tableListName,"title":'列表'},on:{"setTheadItem":_vm.getTheadItem},scopedSlots:_vm._u([{key:"btns",fn:function(){return [_c('el-button',{staticClass:"btn-button",attrs:{"disabled":_vm.multiBool,"size":"small","type":"primary"},on:{"click":_vm.batchReceiveFunc}},[_vm._v("批量领用")]),_vm._v(" "),_c('el-button',{staticClass:"btn-button",attrs:{"disabled":_vm.multiBool,"size":"small","type":"primary"},on:{"click":_vm.batchTransferFunc}},[_vm._v("批量转让")]),_vm._v(" "),_c('el-button',{staticClass:"btn-button",attrs:{"disabled":_vm.multiBool,"size":"small","type":"primary"},on:{"click":_vm.batchReleaseFunc}},[_vm._v("批量释放")]),_vm._v(" "),_c('el-button',{staticClass:"btn-button",attrs:{"disabled":_vm.multiBool,"size":"small","type":"primary"},on:{"click":_vm.batchDeletedFunc}},[_vm._v("批量删除")])]},proxy:true}])},[_vm._v(" "),_c('tableTemplate',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isGetList),expression:"isGetList"}],attrs:{"thead-data":_vm.theadData,"table-data":_vm.tableData,"selection":true,"checkbox":true},on:{"listenMultiEvent":_vm.setMultipleSelection}}),_vm._v(" "),_c('paginationTemplate',{attrs:{"pageInfo":_vm.pageInfo},on:{"getPageChange":_vm.getPageChange}})],1)],1),_vm._v(" "),_c('commonDialogTemplate',{staticClass:"body-center",attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.deleteVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[_c('p',[_vm._v("共计"+_vm._s(_vm.batchTotal)+"条")])]:_vm._e()]},proxy:true}])}),_vm._v(" "),_c('commonDialogTemplate',{staticClass:"body-center",attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.receiveVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getReceiveDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[_c('p',[_vm._v("共计"+_vm._s(_vm.batchTotal)+"条")])]:_vm._e()]},proxy:true}])}),_vm._v(" "),_c('commonDialogTemplate',{staticClass:"body-center",attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.transferVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getTransferDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[_c('p',[_vm._v("共计"+_vm._s(_vm.batchTotal)+"条")])]:_vm._e()]},proxy:true}])}),_vm._v(" "),_c('commonDialogTemplate',{staticClass:"body-center",attrs:{"appendToBody":false,"show-width":_vm.showWidth,"dialog-visible":_vm.releaseVisible,"dialog-title":_vm.dialogTitle,"dialog-txt":_vm.dialogTxt},on:{"eventDelItem":_vm.getReleaseDelItem},scopedSlots:_vm._u([{key:"content",fn:function(){return [(_vm.batch)?[(_vm.batchReleaseVisible)?_c('p',[_vm._v("共计"+_vm._s(_vm.batchTotal)+"条到")]):_vm._e(),_vm._v(" "),_c('el-select',{staticClass:"liberum",attrs:{"placeholder":"请选择"},model:{value:(_vm.departmentCode),callback:function ($$v) {_vm.departmentCode=$$v},expression:"departmentCode"}},_vm._l((_vm.LiberumOptions),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.poolDesc,"value":item.poolType}})}),1)]:_vm._e()]},proxy:true}])}),_vm._v(" "),_c('clientTypeModal',{attrs:{"show":_vm.clientTypeModalVisible},on:{"update:show":function($event){_vm.clientTypeModalVisible=$event}}}),_vm._v(" "),(_vm.searchUserVisible)?_c('shareComponent',{attrs:{"show":_vm.searchUserVisible,"id":_vm.shareId},on:{"update:show":function($event){_vm.searchUserVisible=$event}}}):_vm._e(),_vm._v(" "),(_vm.belongerVisible)?_c('belongerModal',{attrs:{"show":_vm.belongerVisible},on:{"update:show":function($event){_vm.belongerVisible=$event},"listenEvent":_vm.setBelongerTableRow}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/index.vue?vue&type=template&id=45c432f0&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("m1cH");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/components/shareComponent/index.vue + 9 modules
var shareComponent = __webpack_require__("AxFn");

// EXTERNAL MODULE: ./src/components/belongerComponent/index.vue + 4 modules
var belongerComponent = __webpack_require__("YOAK");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/clientTypeModal.vue?vue&type=template&id=3f6ffb8e&
var clientTypeModalvue_type_template_id_3f6ffb8e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('el-dialog',{staticClass:"clientTypeModal",attrs:{"title":"请选择客户类型","visible":_vm.visible,"width":"400px"},on:{"update:visible":function($event){_vm.visible=$event},"close":function($event){return _vm.$emit('update:show', false)}}},[_c('el-form',{staticClass:"demo-form-inline",attrs:{"model":_vm.form}},[_c('el-row',[_c('el-col',{attrs:{"span":24}},[_c('el-form-item',{attrs:{"label":""}},[_c('el-radio-group',{model:{value:(_vm.form.type),callback:function ($$v) {_vm.$set(_vm.form, "type", $$v)},expression:"form.type"}},[_c('el-radio',{attrs:{"label":"ENTERPRISE"}},[_vm._v("企业客户")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('el-radio',{attrs:{"label":"INDIVIDUAL"}},[_vm._v("个人客户")])],1)],1)],1)],1)],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.visible = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.ok}},[_vm._v("确 定")])],1)],1):_vm._e()}
var clientTypeModalvue_type_template_id_3f6ffb8e_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/clientTypeModal.vue?vue&type=template&id=3f6ffb8e&

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/clientTypeModal.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var clientTypeModalvue_type_script_lang_js_ = ({
  components: {},
  name: "clientTypeModal",
  data: function data() {
    return {
      visible: this.show,
      SelectionOptions: consts["a" /* SelectionOptions */],
      form: {
        type: ""
      },
      addPath: "/consumer/add"
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
  created: function created() {},

  methods: {
    ok: function ok() {
      debugger;
      this.visible = false;
      this.$router.push({
        path: this.addPath,
        query: {
          type: this.form.type
        }
      });
      // this.$emit("listenEvent", this.form);
    }
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/clientTypeModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_clientTypeModalvue_type_script_lang_js_ = (clientTypeModalvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/clientTypeModal.vue?vue&type=style&index=0&lang=scss&
var clientTypeModalvue_type_style_index_0_lang_scss_ = __webpack_require__("nf5y");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/consumer/components/clientTypeModal.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_clientTypeModalvue_type_script_lang_js_,
  clientTypeModalvue_type_template_id_3f6ffb8e_render,
  clientTypeModalvue_type_template_id_3f6ffb8e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var clientTypeModal = (component.exports);
// EXTERNAL MODULE: ./src/js/mixins/listMixin.js
var listMixin = __webpack_require__("0YUH");

// EXTERNAL MODULE: ./src/api/consumerService.js
var consumerService = __webpack_require__("LERC");

// EXTERNAL MODULE: ./src/utils/index.js
var utils = __webpack_require__("7Qib");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var consumervue_type_script_lang_js_ = ({
  mixins: [listMixin["a" /* default */]],
  components: {
    shareComponent: shareComponent["a" /* default */],
    clientTypeModal: clientTypeModal,
    belongerModal: belongerComponent["a" /* default */]
  },
  data: function data() {
    var self = this;
    return {
      belongerVisible: false,
      searchUserVisible: false,
      shareId: null,
      clientTypeModalVisible: false,
      deleteVisible: false, //删除
      receiveVisible: false, //领用
      transferVisible: false, //转让
      batchTransferBtn: false, //是否点击批量转让
      releaseVisible: false, //释放
      batchReleaseVisible: false, //是否点击的是批量释放按钮
      batch: false, //批量
      batchTotal: 0,
      shareValue: {},
      SelectionOptions: consts["a" /* SelectionOptions */],
      LiberumOptions: [], //公海部门
      departmentCode: null, //部门code
      theadData: [{ checked: true, key: "name", val: "客户名称" }, {
        checked: true,
        key: "customerType",
        val: "客户类型",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return row.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";
        }
      }, { checked: true, key: "ownerUserName", val: "拥有人" }, {
        checked: true,
        key: "createTime",
        val: "创建日期",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return utils["a" /* Utils */].timestampToTime(row.createTime, 1);
        }
      }, {
        checked: true,
        key: "updateTime",
        val: "最近修改日期",
        isFormat: true,
        formatFn: function formatFn(item, row) {
          return utils["a" /* Utils */].timestampToTime(row.updateTime, 1);
        }
      }, { checked: true, key: "certificateId", val: "证件号" }, {
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
        departmentCode: null, //部门编码
        customerType: null, //客户类型
        ifChannel: null, //是否渠道客户
        createTime: null, //创建日期
        updateTime: null, //修改日期
        ownerName: null, //拥有人
        name: null, //客户名称
        createTimeBegin: null,
        createTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null
      },
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      delKeyword: "客户",
      multipleSelection: [],
      CUSTOMER_TYPE: null, //客户类型
      userDetail: null,
      dictTable: null, //字典表
      getListUrl: "/glp-crm/customer/listPage", //列表数据地址
      delListUrl: "/warehouse/del", //删除数据地址
      detailPath: "/consumer/detail", //详情页路由地址
      addPath: "/consumer/add", //新增页路由地址
      editPath: "/consumer/edit" //编辑页路由地址
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
    this.getList();
    this.dictTable = JSON.parse(sessionStorage.getItem("dict_assemble"));
  },

  methods: {
    batchReceiveFunc: function batchReceiveFunc(row) {
      this.receiveVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量领用选中客户？";
      this.batchTotal = this.multipleSelection.length;
    },
    batchTransferFunc: function batchTransferFunc() {
      this.belongerVisible = true;
      this.batchTransferBtn = true;
    },
    batchReleaseFunc: function batchReleaseFunc() {
      this.departmentCode = null;
      this.batchReleaseVisible = true;
      this.releaseVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量释放选中客户？";
      this.batchTotal = this.multipleSelection.length;
      this.getLiberumByCurrentUser();
    },
    releaseFunc: function releaseFunc(row) {
      this.departmentCode = null;
      this.releaseVisible = true;
      this.batchReleaseVisible = false;
      this.batch = true;
      this.rowItem = row;
      this.dialogTxt = "\u786E\u5B9A\u91CA\u653E\u5BA2\u6237 \u201C" + row.name + "\u201D \u5230";
      this.getLiberumByCurrentUser();
    },
    getLiberumByCurrentUser: function getLiberumByCurrentUser() {
      var _this = this;

      consumerService["a" /* default */].getLiberumByCurrentUser().then(function (res) {
        if (res.code == 200) {
          var _ref = res || [],
              data = _ref.data;

          _this.LiberumOptions = data;
        }
      });
    },
    getReleaseDelItem: function getReleaseDelItem(data) {
      var _this2 = this;

      this.releaseVisible = false;
      var params = void 0;
      var message = "批量释放成功！";
      if (data.type == true) {
        if (this.batch) {
          this.batch = false;
          params = {
            customerIds: [].concat(toConsumableArray_default()(this.multipleSelection)),
            departmentCode: this.departmentCode
          };
        } else {
          params = {
            customerIds: [this.rowItem.id],
            departmentCode: this.departmentCode
          };
          message = "释放成功！";
        }
        consumerService["a" /* default */].batchReleaseConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this2.$message({ type: "success", message: message });
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
    receiveFunc: function receiveFunc(row) {
      this.receiveVisible = true;
      this.batch = false;
      this.rowItem = row;
      this.dialogTxt = "确认领用选中客户？";
    },
    transferFunc: function transferFunc() {
      this.belongerVisible = true;
      this.batchTransferBtn = false;
    },
    addFunc: function addFunc() {
      this.clientTypeModalVisible = true;
    },
    setBelongerTableRow: function setBelongerTableRow(data) {
      this.userDetail = data;
      this.transferVisible = true;
      if (this.batchTransferBtn) {
        this.batch = true;
        this.dialogTxt = "确认批量转让选中客户？";
        this.batchTotal = this.multipleSelection.length;
      } else {
        this.batch = false;
        this.dialogTxt = "确认转让选中客户？";
      }
    },
    setBtnItems: function setBtnItems() {
      //设置有权限的按钮
      var items = [];
      items.push({ name: "领用", type: "text", func: this.receiveFunc });
      items.push({ name: "转让", type: "text", func: this.transferFunc });
      items.push({ name: "释放", type: "text", func: this.releaseFunc });
      items.push({ name: "共享", type: "text", func: this.shareFunc });
      items.push({ name: "修改", type: "text", func: this.editFunc });
      items.push({ name: "查看", type: "text", func: this.detailFunc });
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
    editFunc: function editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: { id: item.id, type: item.customerType, flag: "edit" }
      });
    },
    detailFunc: function detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: { id: item.id, type: item.customerType }
      });
    },
    shareFunc: function shareFunc(row) {
      this.searchUserVisible = true;
      this.shareId = row.id;
    },
    submitSearch: function submitSearch() {
      // 查询市场活动列表
      this.serachParm = extends_default()({}, this.serachParm, {
        createTimeBegin: this.serachParm.createTime && this.serachParm.createTime[0],
        createTimeEnd: this.serachParm.createTime && this.serachParm.createTime[1],
        updateTimeBegin: this.serachParm.updateTime && this.serachParm.updateTime[0],
        updateTimeEnd: this.serachParm.updateTime && this.serachParm.updateTime[1]
      });
      this.toSearch();
    },
    formatFn: function formatFn(item) {
      return item;
    },
    setMultipleSelection: function setMultipleSelection(val) {
      this.multipleSelection = val && val.map(function (item) {
        return item.id;
      });
    },
    setShareValue: function setShareValue(data) {
      this.shareValue = data;
      console.log(this.shareValue, "shareValue");
    },
    deleteFunc: function deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = "\u786E\u5B9A\u8981\u5220\u9664 \u201C" + item.name + "\u201D \u5417\uFF1F";
      this.rowItem = item;
    },
    batchDeletedFunc: function batchDeletedFunc(row) {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.rowItem = row;
      this.batchTotal = this.multipleSelection.length;
    },
    getDelItem: function getDelItem(data) {
      var _this3 = this;

      //删除事件
      this.deleteVisible = false;
      var params = void 0;
      var message = "批量删除成功！";
      if (data.type == true) {
        if (this.batch) {
          this.batch = false;
          params = this.multipleSelection;
        } else {
          params = [this.rowItem.id];
          message = "删除成功！";
        }
        consumerService["a" /* default */].deleteConsumerById(params).then(function (res) {
          if (res.code == 200) {
            _this3.$message({ type: "success", message: message });
            _this3.onRefresh();
          } else {
            _this3.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    getReceiveDelItem: function getReceiveDelItem(data) {
      var _this4 = this;

      //领用
      this.receiveVisible = false;
      var params = [];
      var message = "批量领用成功！";
      if (data.type == true) {
        if (this.batch) {
          this.batch = false;
          params = this.multipleSelection;
        } else {
          params = [this.rowItem.id];
          message = "领用成功！";
        }
        consumerService["a" /* default */].batchReceiveConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this4.$message({ type: "success", message: message });
            _this4.onRefresh();
          } else {
            _this4.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    getTransferDelItem: function getTransferDelItem(data) {
      var _this5 = this;

      // 转让
      this.transferVisible = false;
      this.belongerVisible = false;
      this.batchTransferBtn = false;
      if (data.type == true) {
        //批量转让
        var params = void 0;
        var message = "批量转让成功！";
        if (this.batch) {
          this.batch = false;
          params = {
            customerIds: this.multipleSelection,
            toUserNo: this.userDetail.userNo
          };
        } else {
          message = "转让成功！";
          params = {
            customerIds: [this.rowItem.id],
            toUserNo: this.userDetail.userNo
          };
        }
        consumerService["a" /* default */].batchTransferConsumer(params).then(function (res) {
          if (res.code == 200) {
            _this5.$message({ type: "success", message: message });
            _this5.onRefresh();
          } else {
            _this5.$message({
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
// CONCATENATED MODULE: ./src/views/consumer/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_consumervue_type_script_lang_js_ = (consumervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/index.vue?vue&type=style&index=0&lang=scss&
var consumervue_type_style_index_0_lang_scss_ = __webpack_require__("iZ5F");

// CONCATENATED MODULE: ./src/views/consumer/index.vue






/* normalize component */

var consumer_component = Object(componentNormalizer["a" /* default */])(
  views_consumervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var consumer = __webpack_exports__["default"] = (consumer_component.exports);

/***/ }),

/***/ "ZlGe":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "iZ5F":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ZlGe");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "nf5y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_clientTypeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("45Sh");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_clientTypeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_clientTypeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_clientTypeModal_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);