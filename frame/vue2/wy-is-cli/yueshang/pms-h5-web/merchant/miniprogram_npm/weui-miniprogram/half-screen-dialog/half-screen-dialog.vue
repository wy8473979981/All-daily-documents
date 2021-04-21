<template>
<view :class="show ? 'weui-show' :'weui-hidden'">
  <view class="weui-mask init" v-if="mask" @tap="close" catch:touchmove="onMaskMouseMove" data-type="tap"></view>
  <view :class="'weui-half-screen-dialog ' + extClass">
    <view class="weui-half-screen-dialog__hd">
      <view v-if="closabled" class="weui-half-screen-dialog__hd__side" @tap="close" data-type="close">
        <view class="weui-icon-btn weui-icon-btn_close" hover-class="weui-active">关闭</view>
      </view>
      <view class="weui-half-screen-dialog__hd__main">
        <block v-if="title">
          <text class="weui-half-screen-dialog__title">{{title}}</text>
          <text class="weui-half-screen-dialog__subtitle">{{subTitle}}</text>
        </block>
        <block v-else>
          <view class="weui-half-screen-dialog__title"><slot name="title"></slot></view>
        </block>
      </view>
      <view class="weui-half-screen-dialog__hd__side">
        <view class="weui-icon-btn weui-icon-btn_more" hover-class="weui-active">更多</view>
      </view>
    </view>
    <view class="weui-half-screen-dialog__bd">
      <block v-if="desc">
        <view class="weui-half-screen-dialog__desc">{{desc}}</view>
        <view class="weui-half-screen-dialog__tips">{{tips}}</view>
      </block>
      <slot name="desc" v-else></slot>
    </view>
    <view class="weui-half-screen-dialog__ft">
      <block v-if="buttons && buttons.length">
        <button v-for="(item, index) in buttons" :key="index" :type="item.type" :class="'weui-btn ' + item.className" :data-index="index" @tap="buttonTap">{{item.text}}</button>
      </block>
      <slot name="footer" v-else></slot>
    </view>
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

  return __webpack_require__(__webpack_require__.s = 17);
  /******/
})(
/************************************************************************/

/******/
{
  /***/
  17: (
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      options: {
        multipleSlots: true,
        // 在组件定义时的选项中启用多slot支持
        addGlobalClass: true
      },
      properties: {
        closabled: {
          // 是否具有关闭标签
          type: Boolean,
          value: true
        },
        title: {
          // 标题，也可以通过 slot 自定义
          type: String,
          value: ''
        },
        subTitle: {
          // 副标题，也可以通过 slot 自定义
          type: String,
          value: ''
        },
        extClass: {
          // 弹窗 class
          type: String,
          value: ''
        },
        desc: {
          type: String,
          value: ''
        },
        tips: {
          type: String,
          value: ''
        },
        maskClosable: {
          type: Boolean,
          value: true
        },
        mask: {
          // 是否需要 遮罩层
          type: Boolean,
          value: true
        },
        show: {
          // 是否开启弹窗
          type: Boolean,
          value: false,
          observer: '_showChange'
        },
        buttons: {
          type: Array,
          value: [] // {text, extClass}

        }
      },
      methods: {
        close(e) {
          const {
            type
          } = e.currentTarget.dataset;

          if (this.data.maskClosable || type === 'close') {
            this.setData({
              show: false
            }); // 关闭弹窗回调事件

            this.triggerEvent('close');
          }
        },

        buttonTap(e) {
          const {
            index
          } = e.currentTarget.dataset;
          this.triggerEvent('buttontap', {
            index,
            item: this.data.buttons[index]
          }, {});
        },

        onMaskMouseMove(e) {// do nothing
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
      show: false
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
  17:
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      options: {
        multipleSlots: true,
        // 在组件定义时的选项中启用多slot支持
        addGlobalClass: true
      },
      properties: {
        closabled: {
          // 是否具有关闭标签
          type: Boolean,
          value: true
        },
        title: {
          // 标题，也可以通过 slot 自定义
          type: String,
          value: ''
        },
        subTitle: {
          // 副标题，也可以通过 slot 自定义
          type: String,
          value: ''
        },
        extClass: {
          // 弹窗 class
          type: String,
          value: ''
        },
        desc: {
          type: String,
          value: ''
        },
        tips: {
          type: String,
          value: ''
        },
        maskClosable: {
          type: Boolean,
          value: true
        },
        mask: {
          // 是否需要 遮罩层
          type: Boolean,
          value: true
        },
        show: {
          // 是否开启弹窗
          type: Boolean,
          value: false,
          observer: '_showChange'
        },
        buttons: {
          type: Array,
          value: [] // {text, extClass}

        }
      },
      methods: {
        close(e) {
          const {
            type
          } = e.currentTarget.dataset;

          if (this.maskClosable || type === 'close') {
            this.setData({
              show: false
            }); // 关闭弹窗回调事件

            this.$emit('close');
          }
        },

        buttonTap(e) {
          const {
            index
          } = e.currentTarget.dataset;
          this.$emit('buttontap', {
            detail: {
              index,
              item: this.data.buttons[index]
            }
          }, {});
        },

        onMaskMouseMove(e) {// do nothing
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
@import "./half-screen-dialog.css";
</style>