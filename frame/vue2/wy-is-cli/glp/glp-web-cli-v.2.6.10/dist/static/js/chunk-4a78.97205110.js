(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-4a78"],{

/***/ "4eew":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "DTg5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("EJiy");
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4d7F");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xOOu");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_3__);


/**
 * author   lut000
 * date     2019/09/11
 * purpose  通用层方法
 * */


/* harmony default export */ __webpack_exports__["a"] = ({
    saveImgFn: function saveImgFn() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments[1];

        var self = this;
        opt.src = 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/62594662-B45C-4344-9F70-FF6DAD268D5D.png';
        if (opt.src) {
            var oImg = new Image();
            oImg.setAttribute("crossOrigin", 'Anonymous');
            oImg.onload = function () {
                var canvas = self.setCanvas(this.width, this.height);
                // 画图
                self.drawCanvas(canvas, this);
                // 导出数据
                self.getCanvasData(canvas, opt.name, opt.type, callback);
            };
            oImg.onerror = function () {
                if (callback) {
                    callback('下载失败！');
                } else {
                    console.log('下载失败');
                }
            };
            oImg.src = opt.src;
        } else {
            if (callback) {
                callback('图片src为空！');
            } else {
                console.log('图片src为空！');
            }
        }
    },
    setCanvas: function setCanvas(w, h) {
        //创建canvas dom
        var canvas = null;
        if (document.body.querySelector('#canvas-download-dom')) {
            canvas = document.body.querySelector('#canvas-download-dom');
        } else {
            canvas = document.createElement('canvas');
            canvas.style.cssText = 'position:fixed;z-index:10;left:0;top:0';
            document.body.append(canvas);
        }
        canvas.width = w;
        canvas.height = h;
        return canvas;
    },
    drawCanvas: function drawCanvas(canvas, img) {
        //画canvas
        var w = canvas.width;
        var h = canvas.height;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
    },
    getCanvasData: function getCanvasData(canvas, name, type, callback) {
        //获取canvas数据
        var re = /\.(png|jpg|jpeg|gif|bmp)$/i;
        var reJpg = /image\/(jpg|jpeg)/i;
        var dataType = 'image/png'; //默认输出类型png
        var matchObj = name.match(re);
        // 文件名称
        var filename = '';
        if (!type) {
            var matchType = matchObj[1];
            if (reJpg.test(matchType)) {
                dataType = 'image/jpeg';
            }
        } else {
            if (reJpg.test(type)) {
                dataType = 'image/jpeg';
            }
        }
        if (matchObj) {
            filename = name;
        } else {
            filename = name + dataType.replace('image/', '.');
        }
        // let quality=1;


        var base64 = canvas.toDataURL(dataType);
        this.downloadCanvasFile(canvas, base64, filename);
    },

    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片数据
     * @param  {String} filename 文件名
     */
    downloadCanvasFile: function downloadCanvasFile(canvas, data, filename) {
        //下载
        try {
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        } catch (e) {
            if (canvas.msToBlob) {
                // 支持msToBlob
                // console.log("msToBlob下载");
                var blob = canvas.msToBlob(data);
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // 不支持msToBlob
                // console.log('服务器下载');
                // let form=document.createElement("form");
                // form.setAttribute("method","post");
                // form.setAttribute("target","");
                // form.setAttribute("action","/api/virtualsplsimulatedown/");
                // let input1=document.createElement("input");
                // input1.setAttribute("name","imgbody");
                // input1.value=data;
                // // let input2=document.createElement("input");
                // // input2.setAttribute("name","name");
                // // input2.value=filename;
                // form.appendChild(input1);
                // // form.appendChild(input2);
                // document.body.appendChild(form);
                // form.submit();//表单提交
            }
        }
    },
    downloadFileFn: function downloadFileFn(file, callback) {
        //下载单个文件
        // 请求对象
        function request(file) {
            // let url='https://glp168-account-test.oss-cn-shanghai.aliyuncs.com/ua/2019-9-10/AE58EFB6-5626-4EC7-8376-ED2014344E47.xlsx';
            var url = file.url;
            // console.log('下载地址：',url);
            var s = url.indexOf('?') != -1 ? '&' : '?';
            return fetch(url + s + 't=' + new Date().getTime(), {
                method: 'get',
                cache: 'no-cache' // *default, no-cache, reload, force-cache, only-if-cached
            }).then(function (res) {
                if (res.ok) {
                    var data = res.blob();
                    return data;
                }
            });
        }

        request(file).then(function (res) {
            file_saver__WEBPACK_IMPORTED_MODULE_3___default.a.saveAs(res, file.name);
            if (callback) {
                callback();
            }
        }, function (err) {
            if (callback) {
                callback(err);
            }
        });
    },
    downloadZipFn: function downloadZipFn(files, filesName, callback) {
        //下载zip压缩包
        var zip = new jszip__WEBPACK_IMPORTED_MODULE_2___default.a();
        // let a = document.querySelector("a");
        // 要下载的url数组
        var data = files || [{
            url: "https://glp-ps-route.oss-cn-shanghai.aliyuncs.com/110101999999446/20190710/GLP19071015473400249.pdf",
            name: 'GLP19071015473400249.pdf'
        }];
        // 请求对象
        function request(file) {
            // let url='https://glp168-account-test.oss-cn-shanghai.aliyuncs.com/ua/2019-9-10/AE58EFB6-5626-4EC7-8376-ED2014344E47.xlsx';
            var url = file.url;
            return fetch(url + '?t=' + new Date().getTime(), {
                method: 'get',
                cache: 'no-cache' // *default, no-cache, reload, force-cache, only-if-cached
            }).then(function (res) {
                if (res.ok) {
                    var _data = res.blob();

                    zip.file(file.name, _data);
                    return { url: url, data: _data };
                }
            });
        }

        // 利用Promise.all功能统一处理所有请求
        babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_1___default.a.all(data.map(function (item) {
            return request(item);
        })).then(function (response) {
            // 压缩为zip文件
            zip.generateAsync({
                type: "blob",
                comment: 'aaa'
            }).then(function (content) {
                filesName = filesName ? filesName : new Date().getTime();
                var filename = "glp-" + filesName + '.zip';
                file_saver__WEBPACK_IMPORTED_MODULE_3___default.a.saveAs(content, filename);

                if (callback) {
                    callback();
                }
            });
        }).catch(function (res) {
            callback(res);
        });
    },
    forFn: function forFn(ruleFn, callback) {
        var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
        //等待状态返回
        fn();
        function fn() {
            var timer = setTimeout(function () {
                clearTimeout(timer);
                if (!ruleFn()) {
                    fn();
                } else {
                    callback();
                }
            }, times);
        }
    },
    getSearchParams: function getSearchParams(key, str) {
        //查询字段值
        var t = str ? str : window.location.search;
        var val = '';
        if (t) {
            console.log(t);
            t = t.substr(1);
            var arr = t.split('&');
            console.log(arr);
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                if (item) {
                    var re = new RegExp(key + '=', 'i');
                    if (re.test(item)) {
                        val = item.replace(key + '=', '');
                        break;
                    }
                }
            }
        }
        return val;
    },
    deepClone: function deepClone(obj) {
        //深度克隆对象

        if (obj) {
            var newObj = Array.isArray(obj) ? [] : {};
            if (obj && (typeof obj === 'undefined' ? 'undefined' : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj)) === "object") {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        newObj[key] = obj && babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj[key]) === 'object' ? this.deepClone(obj[key]) : obj[key];
                    }
                }
            }
            return newObj;
        }
        return obj;
    },
    setMoneyString: function setMoneyString(str) {
        //金额分割
        var val = '';
        if (str) {
            str += '';
            var lastStr = '';
            if (str.indexOf('.') != -1) {
                var arr = str.split('.');
                str = arr[0];
                lastStr = '.' + arr[1];
            }
            str = str.split('').reverse().join('');
            var len = Math.ceil(str.length / 3);

            for (var i = 0; i < len; i++) {
                val += str.substr(i * 3, 3) + ',';
            }
            val = val.substr(0, val.length - 1);
            val = val.split('').reverse().join('');
            val += lastStr;
            this.totalPrice = val;
        }
        return val;
    }
});

/***/ }),

/***/ "K22w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("WDT+");
/*
	#author		lut000
    #date 		2019/11/07
    #purpose    业务逻辑接口
*/


/* harmony default export */ __webpack_exports__["a"] = ({
    // 获取省份
    initDetailWarehouse: function initDetailWarehouse(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])('/fontApi/province/list', data, header);
    },
    // 获取城市、区
    getDetailWarehouse: function getDetailWarehouse(data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])('/fontApi/province/citycounty', data, header);
    },

    post: function post(url, data, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* post */ "b"])(url, data, header);
    },
    get: function get(url, header) {
        return Object(_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[/* get */ "a"])(url, header);
    }
});

/***/ }),

/***/ "c7iF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_32c570c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4eew");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_32c570c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_32c570c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_sass_loader_dist_cjs_js_ref_10_3_node_modules_vue_loader_lib_index_js_vue_loader_options_add_vue_vue_type_style_index_0_id_32c570c0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "myE9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/legalControl/add.vue?vue&type=template&id=32c570c0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.isLoading),expression:"isLoading"}],staticClass:"content"},[_c('div',{staticClass:"section"},[_c('el-form',{ref:"ruleForm",staticClass:"form-section block-form",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"inline":"","size":"small"}},[_c('Card',{attrs:{"title":'基本信息'}},[_c('el-row',{staticClass:"row-item",attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"客户名称","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"姓名","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"人员类型","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"曾用名","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件类型","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"民族","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件有效期起始日","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"实名状态","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件有效期截止日","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"出生日期","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"证件签发机关","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'联系信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"手机号码","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"微信","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"固定电话","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"QQ","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"个人邮箱","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'居住信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"居住状况","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"省份","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"居住地","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"城市","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"邮编","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'教育信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"教育水平","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业学校","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"毕业年份","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'婚姻信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"婚姻状况","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件类型","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶姓名","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"配偶证件号码","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'收入信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"家庭月收入","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"本人月收入","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),_c('Card',{attrs:{"title":'工作信息'}},[_c('el-row',[_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"实际从业年限","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"公司总机","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":8}},[_c('el-form-item',{attrs:{"label":"工作单位所属行业","prop":"name"}},[_c('el-input',{staticClass:"form-input",attrs:{"placeholder":"请输入"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}},[_c('i',{staticClass:"el-input__icon el-icon-search",attrs:{"slot":"suffix"},on:{"click":_vm.pp},slot:"suffix"})])],1)],1)],1)],1),_vm._v(" "),(_vm.query.viewType!=3)?_c('Btns',{attrs:{"btnsProps":_vm.btnsProps}}):_c('Btns',{attrs:{"btnsProps":_vm.returnBackBtns}})],1)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/legalControl/add.vue?vue&type=template&id=32c570c0&scoped=true&

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("QbLZ");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("P2sY");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./src/components/Upload/index.vue + 20 modules
var Upload = __webpack_require__("x/Cv");

// EXTERNAL MODULE: ./src/js/common/consts.js
var consts = __webpack_require__("AD1K");

// EXTERNAL MODULE: ./src/api/common.js
var common = __webpack_require__("KTTK");

// EXTERNAL MODULE: ./src/api/business.js
var business = __webpack_require__("K22w");

// EXTERNAL MODULE: ./src/js/common/businessLayer.js
var businessLayer = __webpack_require__("0sTm");

// EXTERNAL MODULE: ./src/utils/formCheck.js
var formCheck = __webpack_require__("b85u");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib?cacheDirectory!./node_modules/vue-loader/lib??vue-loader-options!./src/views/legalControl/add.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      SelectionOptions: consts["a" /* SelectionOptions */],

      query: {
        //查询参数
      },
      isLoading: false, //是否正在加载

      isSubmitting: false, //是否正在提交

      ruleForm: {
        name: "",
        owner: "",
        ownerType: "",
        ownerCert: "",
        ownerOrgNo: "",
        code: "dyhbb1883838991hasg",
        type: "",
        typeDesc: "",
        tempType: [],
        bondedFlag: "",
        historicalInventoryCategory: "",
        provinceCode: "",
        cityCode: "",
        districtCode: "",
        address: "",

        contacts: "",
        position: "",
        telephone: "",
        mail: "",

        houseCerts: [],
        eiaReports: [],
        fireAcceptReports: []
      }, //表单字段
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        owner: [{ required: true, message: "请输入仓库产权人", trigger: "blur" }],
        ownerType: [{
          required: true,
          message: "请选择产权人类型",
          trigger: ["blur", "change"]
        }],
        ownerCert: [{
          pattern: formCheck["b" /* regex */].idCard,
          message: "请输入正确的身份证号",
          trigger: "blur"
        }],
        ownerOrgNo: [{
          validator: formCheck["a" /* checkFn */].validateCreditCode,
          msg: "请输入正确的统一社会信用代码",
          trigger: "blur"
        }],
        code: [{ required: true, message: "请输入仓库编号", trigger: "blur" }],
        type: [{
          required: true,
          message: "请选择仓库类型",
          trigger: ["blur", "change"]
        }],
        typeDesc: [{ required: true, message: "请输入仓库类型说明", trigger: "blur" }],
        tempType: [{
          required: true,
          message: "请选择温控类型",
          trigger: ["blur", "change"]
        }],
        bondedFlag: [{
          required: true,
          message: "请选择是否保税",
          trigger: ["blur", "change"]
        }],
        historicalInventoryCategory: [{ required: true, message: "请输入历史存货品类", trigger: "blur" }],
        // provinceCode :[
        //     {required:true,message:'请选择省份',trigger:['blur','change']}
        // ],
        // cityCode :[
        //     {required:true,message:'请选择城市',trigger:['blur','change']}
        // ],
        // districtCode :[
        //     {required:true,message:'请选择区县',trigger:['blur','change']}
        // ],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],

        telephone: [{
          pattern: formCheck["b" /* regex */].mobile,
          message: "请输入正确的手机号",
          trigger: "blur"
        }],
        mail: [{
          pattern: formCheck["b" /* regex */].email,
          message: "请输入正确的邮箱号",
          trigger: "blur"
        }],

        houseCerts: [{
          required: true,
          validator: this.checkUpload,
          message: "请上传仓库房产证",
          trigger: "blur"
        }]
      }, //校验规则

      filesArray: [
      //附件数组
      {
        label: "仓库房产证",
        key: "houseCerts",
        propKey: "houseCerts",
        accept: ".pdf, .word, .xls, .xlsx,image/*"
      }, {
        label: "仓库环评报告",
        key: "eiaReports",
        accept: ".pdf, .word, .xls, .xlsx"
      }, {
        label: "仓库消防验收报告",
        key: "fireAcceptReports",
        accept: ".pdf, .word, .xls, .xlsx",
        limit: 10
      }],

      btnsProps: {
        submit: {
          text: "保存",
          func: this.submitForm,
          isSubmitting: false
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      returnBackBtns: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },

      provinceData: [], //省份
      cityData: [], //城市
      districtData: [], //区县

      isDownload: false, //是否正在上传文件

      addUrl: "/warehouse/add", //新增url
      editUrl: "/warehouse/update", //编辑url
      saveDetailUrl: "", //保存数据地址
      ListPath: "/table/index" //列表路由地址
    };
  },

  computed: {
    isApprove: function isApprove() {
      return this.query.isApprove == 1 ? true : false;
    }
  },
  components: {
    UploadTpl: Upload["a" /* default */]
  },
  created: function created() {
    this.query = this.$route.query;

    // 生成仓库编号
    if (this.query.viewType == 1) {
      this.initData();
    } else if (this.query.viewType == 2) {
      this.getDetailData();
    } else if (this.query.viewType == 3) {
      this.getDetailData();
    }
  },
  mounted: function mounted() {
    this.saveDetailUrl = this.query.viewType == 1 ? this.addUrl : this.editUrl;
    this.getProvinceData();
  },

  methods: {
    initData: function initData() {
      var _this = this;

      //初始化数据

      business["a" /* default */].initDetailWarehouse().then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          _this.ruleForm.code = ndata.code || "";
          if (!_this.ruleForm.code) {
            _this.$message({
              type: "warning",
              message: "仓库编码为空，请刷新页面，重新生成仓库编码！"
            });
          }
        } else {
          _this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this.isLoading = false;
      }, function (err) {
        _this.isLoading = false;
      });
    },
    getDetailData: function getDetailData() {
      var _this2 = this;

      //请求详情
      var params = {
        id: this.query.id
      };
      business["a" /* default */].getDetailWarehouse(params).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || {};
          // this.ruleForm=ndata;
          assign_default()(_this2.ruleForm, ndata);
          _this2.getCityfn();
          _this2.getDistrictfn();

          businessLayer["a" /* default */].setShowFile(_this2.ruleForm.houseCerts);
          businessLayer["a" /* default */].setShowFile(_this2.ruleForm.eiaReports);
          businessLayer["a" /* default */].setShowFile(_this2.ruleForm.fireAcceptReports);
        } else {
          _this2.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this2.isLoading = false;
      }, function (err) {
        _this2.isLoading = false;
      });
    },
    getProvinceData: function getProvinceData() {
      //获取省份

      var localData = businessLayer["a" /* default */].getLocalData("global_static_data", "province");
      var localDataUpdate = businessLayer["a" /* default */].getLocalData("global_static_data", "province_update") || 0;
      var nowTimes = new Date().getTime();
      if (localData && localDataUpdate && nowTimes - localDataUpdate < 7 * 24 * 3600 * 1000) {
        this.provinceData = localData;
      } else {
        this.getProvincefn();
      }
    },
    getProvincefn: function getProvincefn() {
      var _this3 = this;

      //请求省份数据
      common["a" /* default */].getProvince().then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || [];
          _this3.provinceData = ndata;
          businessLayer["a" /* default */].setLocalData("global_static_data", "province", ndata);
          businessLayer["a" /* default */].setLocalData("global_static_data", "province_update", new Date().getTime());
        } else {
          _this3.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this3.isLoading = false;
      }, function (err) {
        _this3.isLoading = false;
      });
    },
    getProvinceChange: function getProvinceChange() {
      //监听省份变化
      this.ruleForm.cityCode = "";
      this.ruleForm.districtCode = "";
      this.districtData = [];
      this.cityData = [];
      if (this.ruleForm.provinceCode) {
        this.getCityfn();
      }
    },
    getCityfn: function getCityfn() {
      var _this4 = this;

      //请求城市数据
      var params = {
        provinceCode: this.ruleForm.provinceCode
      };
      common["a" /* default */].getCitys(params).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || [];
          _this4.cityData = ndata;
        } else {
          _this4.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this4.isLoading = false;
      }, function (err) {
        _this4.isLoading = false;
      });
    },
    getCityChange: function getCityChange() {
      //监听城市变化
      this.ruleForm.districtCode = "";
      this.districtData = [];
      if (this.ruleForm.cityCode) {
        this.getDistrictfn();
      }
    },
    getDistrictfn: function getDistrictfn() {
      var _this5 = this;

      //请求地区数据
      var params = {
        provinceCode: this.ruleForm.provinceCode,
        cityCode: this.ruleForm.cityCode
      };
      common["a" /* default */].getCitys(params).then(function (res) {
        if (res.code == 200) {
          var ndata = res.data || [];
          _this5.districtData = ndata;
        } else {
          _this5.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
        _this5.isLoading = false;
      }, function (err) {
        _this5.isLoading = false;
      });
    },
    submitForm: function submitForm() {
      var _this6 = this;

      //前端校验表单
      this.$refs["ruleForm"].validate(function (valid) {
        if (!valid) {
          console.log("前端校验失败！");
          // 页面滚动到错误位置
          businessLayer["a" /* default */].setInputFocus();
        } else {
          _this6.subFunc();
        }
      });
    },
    cancelFunc: function cancelFunc() {
      //返回
      this.$router.push({
        path: this.ListPath
      });
    },
    subFunc: function subFunc() {
      var _this7 = this;

      //提交表单

      if (this.isSubmitting == true) {
        return;
      }
      this.isSubmitting = true;
      this.btnsProps.submit.isSubmitting = this.isSubmitting;
      var params = extends_default()({}, this.ruleForm);
      // 文件处理
      var houseCerts = [],
          eiaReports = [],
          fireAcceptReports = [];
      houseCerts = businessLayer["a" /* default */].setFileParams(params.houseCerts, "houseCerts", 10);
      params.houseCerts = houseCerts;
      eiaReports = businessLayer["a" /* default */].setFileParams(params.eiaReports, "eiaReports", 10);
      params.eiaReports = eiaReports;
      fireAcceptReports = businessLayer["a" /* default */].setFileParams(params.fireAcceptReports, "fireAcceptReports", 10);
      params.fireAcceptReports = fireAcceptReports;

      // params.tempType=params.tempType.join('')*1;
      // params.provinceCode=params.provinceCode*1;
      // params.cityCode=params.cityCode*1;
      // params.districtCode=params.districtCode*1;
      // params.type=params.type*1;
      console.log("要提交的数据是：", params);

      business["a" /* default */].post(this.saveDetailUrl, params).then(function (res) {
        if (res.code == 200) {
          // let ndata=res.data || {};

          _this7.$message({
            type: "success",
            message: "保存成功！",
            onClose: function onClose() {
              _this7.isSubmitting = false;
              _this7.btnsProps.submit.isSubmitting = _this7.isSubmitting;
            }
          });
          // 跳转路由
          _this7.$router.push({
            path: _this7.ListPath
          });
        } else {
          _this7.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
          _this7.isSubmitting = false;
          _this7.btnsProps.submit.isSubmitting = _this7.isSubmitting;
        }
      }, function (err) {
        _this7.isSubmitting = false;
        _this7.btnsProps.submit.isSubmitting = _this7.isSubmitting;

        _this7.$router.push({
          path: _this7.ListPath
        });
      });
    },
    handleSuccess: function handleSuccess(data, files, key) {
      //监听上传对象赋值
      this.ruleForm[key] = files;
      if (key == "houseCerts") {
        this.$refs["ruleForm"].clearValidate("houseCerts");
      }
    },
    onPreview: function onPreview(a, b, c) {
      console.log(a, b, c);
    },
    onExceed: function onExceed(files, fileList) {
      //监听超出限制

      this.$message({
        type: "warning",
        message: "最多可以上传" + this.limit + "个文件"
      });
    },
    ownerTypeChange: function ownerTypeChange() {
      //检测仓库产权人类型
      this.ruleForm.ownerCert = "";
      this.ruleForm.ownerOrgNo = "";
      this.$refs["ruleForm"].clearValidate("ownerCert");
      this.$refs["ruleForm"].clearValidate("ownerOrgNo");
    },
    typeChange: function typeChange() {
      //检测仓库类型
      if (this.ruleForm.type != 10) {
        this.$refs["ruleForm"].clearValidate("typeDesc");
      }
    },
    checkUpload: function checkUpload(rule, val, callback) {
      //检测仓库房产证
      if (val.length <= 0) {
        callback(rule.message);
      } else {
        callback();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/views/legalControl/add.vue?vue&type=script&lang=js&
 /* harmony default export */ var legalControl_addvue_type_script_lang_js_ = (addvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/legalControl/add.vue?vue&type=style&index=0&id=32c570c0&lang=scss&scoped=true&
var addvue_type_style_index_0_id_32c570c0_lang_scss_scoped_true_ = __webpack_require__("c7iF");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/views/legalControl/add.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  legalControl_addvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "32c570c0",
  null
  
)

/* harmony default export */ var add = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);