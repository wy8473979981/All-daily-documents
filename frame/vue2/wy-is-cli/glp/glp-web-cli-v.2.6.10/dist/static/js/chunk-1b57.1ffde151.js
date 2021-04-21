(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-1b57"],{

/***/ "EJeY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/edit.vue?vue&type=template&id=cce75764&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-info-section"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'附件信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"附件名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"附件类型","prop":"name"}},[_c('el-select',{staticClass:"form-input",model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},_vm._l((_vm.SelectionOptions.WarehouseTypeArray),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.key}})}),1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"已选文件","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1)],1)],1),_vm._v(" "),_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/consumer/components/accessory/edit.vue?vue&type=template&id=cce75764&scoped=true&

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/consumer/components/accessory/edit.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var editvue_type_script_lang_js_ = ({
  components: {},
  name: "baseInfo",
  data: function data() {
    return {
      addPath: "/consumer/add",
      SelectionOptions: consts["a" /* SelectionOptions */],
      activeName: "first",
      consumerDetailPath: '/consumer/detail',
      btnsProps: {
        submit: {
          text: "保存",
          func: this.submitFunc
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      ruleForm: {
        name: "",
        owner: ""
      },
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        owner: [{ required: true, message: "请输入仓库产权人", trigger: "blur" }]
      }
    };
  },
  watch: {},
  computed: {},
  created: function created() {},

  methods: {
    submitFunc: function submitFunc() {},
    cancelFunc: function cancelFunc() {
      this.$router.push({
        path: this.consumerDetailPath,
        query: { activeName: "second", viewType: 1 }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/consumer/components/accessory/edit.vue?vue&type=script&lang=js&
 /* harmony default export */ var accessory_editvue_type_script_lang_js_ = (editvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/consumer/components/accessory/edit.vue?vue&type=style&index=0&id=cce75764&lang=scss&scoped=true&
var editvue_type_style_index_0_id_cce75764_lang_scss_scoped_true_ = __webpack_require__("b76q");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/consumer/components/accessory/edit.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  accessory_editvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "cce75764",
  null
  
)

/* harmony default export */ var edit = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "b76q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_cce75764_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("qXLh");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_cce75764_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_cce75764_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_style_index_0_id_cce75764_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "qXLh":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);