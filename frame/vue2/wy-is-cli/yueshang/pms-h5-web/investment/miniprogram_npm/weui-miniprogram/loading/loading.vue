<template>
<view :style="'display:' + displayStyle + ';'" :class="'wx_loading_view ' + extClass" :animation="animationData" id="wx_loading_view">
    <view v-if="type==='dot-white'" class="loading wx_dot_loading wx_dot_loading_white">
    </view>
    <view v-else-if="type==='dot-gray'" class="loading wx_dot_loading"></view>
    <view v-else-if="type==='circle'" class="weui-loadmore">
        <view class="weui-loading"></view>
        <view class="weui-loadmore__tips">{{tips}}</view>
    </view>
</view>
</template>

<script>
module.exports =
/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __webpack_require__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __webpack_require__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __webpack_require__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __webpack_require__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = 14);
  /******/
})(
/************************************************************************/

/******/
{
  /***/
  14: (
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      options: {
        addGlobalClass: true
      },
      properties: {
        extClass: {
          type: String,
          value: ''
        },
        show: {
          // 默认显示出来
          type: Boolean,
          value: true,

          observer(newValue) {
            this._computedStyle(newValue, this.data.animated);
          }

        },
        animated: {
          type: Boolean,
          value: false,

          observer(newValue) {
            this._computedStyle(this.data.show, newValue);
          }

        },
        duration: {
          // 过渡动画时间
          type: Number,
          value: 350
        },
        type: {
          type: String,
          value: 'dot-gray' // 取值dot-white、dot-gray、circle

        },
        tips: {
          // type是circle的时候才有效
          type: String,
          value: '加载中'
        }
      },
      data: {
        animationData: {},
        animationInstance: {},
        displayStyle: 'none'
      },
      methods: {
        _computedStyle(show, animated) {
          if (!show) {
            if (!animated) {
              this.setData({
                displayStyle: 'none'
              });
            } else {
              this._startAnimation();
            }
          } else {
            this.setData({
              displayStyle: ''
            });
          }
        },

        _startAnimation() {
          setTimeout(() => {
            const data = this.data;
            const animation = data.animationInstance;
            animation.height(0).step();
            this.setData({
              animationData: animation.export()
            });
          }, 0);
        }

      },
      lifetimes: {
        attached() {
          const data = this.data;
          const animationInstance = uni.createAnimation({
            duration: data.duration,
            timingFunction: 'ease'
          });
          this.setData({
            animationInstance
          });

          this._computedStyle(this.data.show, this.data.animated);
        }

      }
    });
    /***/
  })
  /******/

});

export default {
  data() {
    return {
      displayStyle: "",
      animationData: "",
      animationInstance: ""
    };
  },

  components: {},
  props: {},

  /******/
  i: moduleId,

  /******/
  l: false,

  /******/
  exports: {}
  /******/
  ,
  enumerable: true,
  get: getter,
  value: 'Module',
  value: true,
  enumerable: true,
  value: value,

  /***/
  14:
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      options: {
        addGlobalClass: true
      },
      properties: {
        extClass: {
          type: String,
          value: ''
        },
        show: {
          // 默认显示出来
          type: Boolean,
          value: true,

          observer(newValue) {
            this._computedStyle(newValue, this.animated);
          }

        },
        animated: {
          type: Boolean,
          value: false,

          observer(newValue) {
            this._computedStyle(this.show, newValue);
          }

        },
        duration: {
          // 过渡动画时间
          type: Number,
          value: 350
        },
        type: {
          type: String,
          value: 'dot-gray' // 取值dot-white、dot-gray、circle

        },
        tips: {
          // type是circle的时候才有效
          type: String,
          value: '加载中'
        }
      },
      data: {
        animationData: {},
        animationInstance: {},
        displayStyle: 'none'
      },
      methods: {
        _computedStyle(show, animated) {
          if (!show) {
            if (!animated) {
              this.setData({
                displayStyle: 'none'
              });
            } else {
              this._startAnimation();
            }
          } else {
            this.setData({
              displayStyle: ''
            });
          }
        },

        _startAnimation() {
          setTimeout(() => {
            const data = this;
            const animation = data.animationInstance;
            animation.height(0).step();
            this.setData({
              animationData: animation.export()
            });
          }, 0);
        }

      },
      lifetimes: {
        attached() {
          const data = this;
          const animationInstance = uni.createAnimation({
            duration: data.duration,
            timingFunction: 'ease'
          });
          this.setData({
            animationInstance
          });

          this._computedStyle(this.show, this.animated);
        }

      }
    });
    /***/
  }
  /******/
  ,
  methods: {}
};
</script>
<style>
@import "./loading.css";
</style>