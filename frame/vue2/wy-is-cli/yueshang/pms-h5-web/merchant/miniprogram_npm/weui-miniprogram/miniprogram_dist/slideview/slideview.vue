<template>
<!-- slide-view/slide-view.wxml -->

<view :class="'weui-slideview weui-movable-view ' + (icon ? 'weui-slideview_icon' : '') + ' ' + extClass" style="width: 100%;height: 100%;">
    <view @transitionend="handler.transitionEnd" :show="show" :change:show="handler.showChange" :rebounce="rebounce" :change:rebounce="handler.rebounceChange" :duration="duration" :change:duration="handler.durationChange" :change:disable="handler.disableChange" :disable="disable" :change:prop="handler.sizeReady" :prop="size" @touchstart="handler.touchstart" @touchmove="handler.touchmove" @touchend="handler.touchend" class="weui-slideview__left left" style="width:100%;">
      <slot></slot>
    </view>
    <view class="weui-slideview__right right">
      <view class="weui-slideview__buttons" style="height:100%;width:100%;" v-if="buttons && buttons.length">
        <view v-for="(item, index) in buttons" :key="index" :class="'btn weui-slideview__btn__wrp ' + item.className + ' ' + item.extClass">
          <view @tap="handler.hideButton" :data-data="item.data" :data-index="index" class="weui-slideview__btn">
            <text v-if="!icon">{{item.text}}</text>
            <image class="weui-slideview__btn__icon" v-else :src="item.src"></image>
          </view>
        </view>
      </view>
    </view>
</view>
</template>

<script module="handler" lang="wxs" src="./slideview.wxs"></script>

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

  return __webpack_require__(__webpack_require__.s = 18);
  /******/
})(
/************************************************************************/

/******/
{
  /***/
  18: (
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      /**
       * 组件的属性列表
       */
      options: {
        addGlobalClass: true,
        multipleSlots: true
      },
      properties: {
        extClass: {
          type: String,
          value: ''
        },
        buttons: {
          type: Array,
          value: [],

          // type, data, text, src, extClass
          observer() {
            this.addClassNameForButton();
          }

        },
        disable: {
          type: Boolean,
          value: false
        },
        icon: {
          // 是否是icon
          type: Boolean,
          value: false
        },
        show: {
          type: Boolean,
          value: false
        },
        duration: {
          type: Number,
          value: 350 // 动画市场，单位ms

        },
        throttle: {
          type: Number,
          value: 40
        },
        rebounce: {
          type: Number,
          value: 0 // 回弹距离

        }
      },

      /**
       * 组件的初始数据
       */
      data: {
        size: null
      },

      /**
       * 组件的方法列表
       */
      ready() {
        // @ts-ignore
        this.updateRight();
        this.addClassNameForButton();
      },

      methods: {
        updateRight() {
          // 获取右侧滑动显示区域的宽度
          const data = this.data;
          const query = uni.createSelectorQuery().in(this);
          query.select('.left').boundingClientRect(res => {
            const btnQuery = uni.createSelectorQuery().in(this);
            btnQuery.selectAll('.btn').boundingClientRect(rects => {
              this.setData({
                size: {
                  buttons: rects,
                  button: res,
                  show: data.show,
                  disable: data.disable,
                  throttle: data.throttle,
                  rebounce: data.rebounce
                }
              });
            }).exec();
          }).exec();
        },

        addClassNameForButton() {
          // @ts-ignore
          const {
            buttons,
            icon
          } = this.data;
          buttons.forEach(btn => {
            if (icon) {
              btn.className = '';
            } else if (btn.type === 'warn') {
              btn.className = 'weui-slideview__btn-group_warn';
            } else {
              btn.className = 'weui-slideview__btn-group_default';
            }
          });
          this.setData({
            buttons
          });
        },

        buttonTapByWxs(data) {
          this.triggerEvent('buttontap', data, {});
        },

        hide() {
          this.triggerEvent('hide', {}, {});
        },

        show() {
          this.triggerEvent('show', {}, {});
        },

        transitionEnd() {}

      }
    });
    /***/
  })
  /******/

});

export default {
  data() {
    return {
      size: {},
      buttons: ""
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
  18:
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    Component({
      /**
       * 组件的属性列表
       */
      options: {
        addGlobalClass: true,
        multipleSlots: true
      },
      properties: {
        extClass: {
          type: String,
          value: ''
        },
        buttons: {
          type: Array,
          value: [],

          // type, data, text, src, extClass
          observer() {
            this.addClassNameForButton();
          }

        },
        disable: {
          type: Boolean,
          value: false
        },
        icon: {
          // 是否是icon
          type: Boolean,
          value: false
        },
        show: {
          type: Boolean,
          value: false
        },
        duration: {
          type: Number,
          value: 350 // 动画市场，单位ms

        },
        throttle: {
          type: Number,
          value: 40
        },
        rebounce: {
          type: Number,
          value: 0 // 回弹距离

        }
      },

      /**
       * 组件的初始数据
       */
      data: {
        size: null
      },

      /**
       * 组件的方法列表
       */
      ready() {
        // @ts-ignore
        this.updateRight();
        this.addClassNameForButton();
      },

      methods: {
        updateRight() {
          // 获取右侧滑动显示区域的宽度
          const data = this;
          const query = uni.createSelectorQuery().in(this);
          query.select('.left').boundingClientRect(res => {
            const btnQuery = uni.createSelectorQuery().in(this);
            btnQuery.selectAll('.btn').boundingClientRect(rects => {
              this.setData({
                size: {
                  buttons: rects,
                  button: res,
                  show: data.show,
                  disable: data.disable,
                  throttle: data.throttle,
                  rebounce: data.rebounce
                }
              });
            }).exec();
          }).exec();
        },

        addClassNameForButton() {
          // @ts-ignore
          const {
            buttons,
            icon
          } = this;
          buttons.forEach(btn => {
            if (icon) {
              btn.className = '';
            } else if (btn.type === 'warn') {
              btn.className = 'weui-slideview__btn-group_warn';
            } else {
              btn.className = 'weui-slideview__btn-group_default';
            }
          });
          this.setData({
            buttons
          });
        },

        buttonTapByWxs(data) {
          this.$emit('buttontap', {
            detail: data
          }, {});
        },

        hide() {
          this.$emit('hide', {
            detail: {}
          }, {});
        },

        show() {
          this.$emit('show', {
            detail: {}
          }, {});
        },

        transitionEnd() {}

      }
    });
    /***/
  }
  /******/
  ,
  methods: {}
};
</script>
