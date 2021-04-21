(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-0edd"],{

/***/ "JnM+":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bx/i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_d4b93810_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("JnM+");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_d4b93810_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_d4b93810_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_d4b93810_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "iPpY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/detail.vue?vue&type=template&id=d4b93810&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-info-section"},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('label',[_vm._v("附件名称:")]),_vm._v(" "),_c('span',[_vm._v("附件名称")])]),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('label',[_vm._v("客户名称:")]),_vm._v(" "),_c('span',[_vm._v("客户名称")])]),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('label',[_vm._v("附件类型:")]),_vm._v(" "),_c('span',[_vm._v("附件类型")])]),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('label',[_vm._v("文件类型:")]),_vm._v(" "),_c('span',[_vm._v("文件类型")])]),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('label',[_vm._v("URL:")]),_vm._v(" "),_c('span',[_vm._v("URL")])])],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'操作记录'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("信息创建:")]),_vm._v(" "),_c('span',[_vm._v("云长")]),_vm._v(" "),_c('span',[_vm._v("2020-06-17 17:08:22")])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('label',[_vm._v("最后修改:")]),_vm._v(" "),_c('span',[_vm._v("云长")]),_vm._v(" "),_c('span',[_vm._v("2020-06-17 17:08:22")])])],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/accessory/detail.vue?vue&type=template&id=d4b93810&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/detail.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {},
  name: "baseInfoTab",
  data: function data() {
    return {
      addPath: "/consumer/add",
      consumerDetailPath: '/consumer/detail',
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      }
    };
  },
  watch: {},
  computed: {},
  created: function created() {},

  methods: {
    cancelFunc: function cancelFunc() {
      this.$router.push({
        path: this.consumerDetailPath,
        query: { activeName: "second", viewType: 1 }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/accessory/detail.vue?vue&type=script&lang=js&
 /* harmony default export */ var accessory_detailvue_type_script_lang_js_ = (detailvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/accessory/detail.vue?vue&type=style&index=0&id=d4b93810&lang=scss&scoped=true&
var detailvue_type_style_index_0_id_d4b93810_lang_scss_scoped_true_ = __webpack_require__("bx/i");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/consumer/components/accessory/detail.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  accessory_detailvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "d4b93810",
  null
  
)

/* harmony default export */ var detail = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);