(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-6170"],{

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

/***/ "Rr8w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/channelDetail.vue?vue&type=template&id=fdce77a2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isLoading),expression:"isLoading"}],staticClass:"content"},[_c('div',{staticClass:"section"},[_c('Card',{staticClass:"base-info-section",attrs:{"title":'渠道详情'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":24}},[_c('label',[_vm._v("渠道名称:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.baseInfo.name))])]),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('label',[_vm._v("所属活动:")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.baseInfo.activityName))])]),_vm._v(" "),_c('el-col',{attrs:{"span":24}},[_c('label',[_vm._v("渠道二维码:")]),_vm._v(" "),_c('img',{attrs:{"width":"100","src":_vm.baseInfo.qrcodeUrl}})])],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'操作记录'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("信息创建:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.baseInfo.createUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.baseInfo.createTime))])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("最后修改:")]),_vm._v(" "),_c('span',{staticClass:"mr"},[_vm._v(_vm._s(_vm.baseInfo.updateUserName))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.baseInfo.updateTime))])])],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/market/channelDetail.vue?vue&type=template&id=fdce77a2&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// EXTERNAL MODULE: ./src/api/marketService.js
var marketService = __webpack_require__("2zWU");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/market/channelDetail.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var channelDetailvue_type_script_lang_js_ = ({
  components: {},
  data: function data() {
    var self = this;
    return {
      belongerVisible: false,
      dateTypeString: "yyyy/MM/dd", //时间格式
      SelectionOptions: consts["a" /* SelectionOptions */],
      query: {
        //查询参数
      },
      isLoading: false, //是否正在加载
      isSubmitting: false, //是否正在提交
      btnsProps: {
        submit: {
          text: "修改",
          func: this.channelEditFunc,
          isSubmitting: false
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      baseInfo: {
        name: "",
        activityId: "",
        activityName: "",
        qrcodeName: "",
        qrcodeUrl: ""
      },
      routeQuery: {},
      detailPath: "/market/detail", //列表路由地址
      channelEditPath: "/market/channelRedactEdit" //渠道编辑路由地址
    };
  },

  computed: {},

  created: function created() {},
  mounted: function mounted() {
    this.routeQuery = this.$route.query;
    this.getChannelDetail();
  },

  methods: {
    getChannelDetail: function getChannelDetail() {
      var _this = this;

      marketService["a" /* default */].getChannelDetail(this.routeQuery.id).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          debugger;
          _this.baseInfo = extends_default()({}, ndata, {
            name: ndata.name,
            activityId: ndata.activityId,
            activityName: ndata.activityName,
            qrcodeName: ndata.qrcodeName,
            qrcodeUrl: ndata.qrcodeUrl
          });
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    channelEditFunc: function channelEditFunc(row) {
      this.$router.push({
        path: this.channelEditPath,
        query: {
          flag: "edit",
          id: this.baseInfo.id,
          activityId: this.routeQuery.activityId,
          activityName: this.routeQuery.activityName
        }
      });
    },
    cancelFunc: function cancelFunc() {
      debugger;
      this.$router.push({
        path: this.detailPath,
        query: { activeName: "second", id: this.routeQuery.activityId }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/market/channelDetail.vue?vue&type=script&lang=js&
 /* harmony default export */ var market_channelDetailvue_type_script_lang_js_ = (channelDetailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/market/channelDetail.vue?vue&type=style&index=0&id=fdce77a2&lang=scss&scoped=true&
var channelDetailvue_type_style_index_0_id_fdce77a2_lang_scss_scoped_true_ = __webpack_require__("l3DQ");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/market/channelDetail.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  market_channelDetailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "fdce77a2",
  null
  
)

/* harmony default export */ var channelDetail = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "l3DQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelDetail_vue_vue_type_style_index_0_id_fdce77a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vvAz");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelDetail_vue_vue_type_style_index_0_id_fdce77a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelDetail_vue_vue_type_style_index_0_id_fdce77a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_channelDetail_vue_vue_type_style_index_0_id_fdce77a2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "vvAz":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);