<template>
<view>
<view v-if="mask" :class="'weui-mask ' + (show ? '' : 'weui-mask_hidden') + ' ' + maskClass" @tap="closeActionSheet"></view>
<view :class="'weui-actionsheet ' + (show ? 'weui-actionsheet_toggle' : '') + ' ' + extClass">
    <!-- 标题 -->
    <block v-if="title"> 
        <view class="weui-actionsheet__title">
            <view class="weui-actionsheet__title-text">{{title}}</view>
        </view>
    </block>
    <slot name="title" v-else></slot>
    <view v-for="(actionItem, index) in actions" :key="index" :class="!showCancel && index === actions.length-1 ? 'weui-actionsheet__action' : 'weui-actionsheet__menu'">
        <block v-if="utils.isNotSlot(actionItem)">
            <view v-for="(item, actionIndex) in actionItem" :key="actionIndex" :class="'weui-actionsheet__cell ' + (item.type === 'warn' ? 'weui-actionsheet__cell_warn' : '' )" hover-class="weui-active" :data-groupindex="index" :data-index="actionIndex" :data-value="item.value" @tap="buttonTap">
                {{item.text}}
            </view>  
        </block>
        
<!-- #ifdef H5 -->
<slot :name="actionItem" v-else></slot>
<!-- #endif -->

<!-- #ifndef H5 -->
<slot name="{{actionItem}}"></slot>
<!-- #endif -->


    </view>
    <!-- 取消按钮 -->
    <view class="weui-actionsheet__action" v-if="showCancel">
        <view class="weui-actionsheet__cell" hover-class="weui-active" data-type="close" id="iosActionsheetCancel" @tap="closeActionSheet">{{cancelText}}</view>
    </view>
</view>
</view>
</template>

<script module="utils" lang="wxs" src="./utils.wxs"></script>

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

  return __webpack_require__(__webpack_require__.s = 1);
  /******/
})(
/************************************************************************/

/******/
[, (
/* 0 */

/* 1 */

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
      title: {
        // 标题
        type: String,
        default: ''
      },
      showCancel: {
        // 是否显示取消按钮
        type: Boolean,
        default: true
      },
      cancelText: {
        // 取消按钮文案
        type: String,
        default: '取消'
      },
      maskClass: {
        // 遮罩层class
        type: String,
        default: ''
      },
      extClass: {
        // 弹出窗 class
        type: String,
        default: ''
      },
      maskClosable: {
        // 点击遮罩 关闭 actionsheet
        type: Boolean,
        default: true
      },
      mask: {
        // 是否需要 遮罩层
        type: Boolean,
        default: true
      },
      show: {
        // 是否开启 actionsheet
        type: Boolean,
        default: false
      },
      actions: {
        // actions 列表
        type: Array,
        default: []
      }
    },
    methods: {
      _groupChange(e) {
        // 支持 一维数组 写法
        if (e.length > 0 && typeof e[0] !== 'string' && !(e[0] instanceof Array)) {
          this.setData({
            actions: [this.data.actions]
          });
        }
      },

      buttonTap(e) {
        const {
          value,
          groupindex,
          index
        } = e.currentTarget.dataset;
        this.triggerEvent('actiontap', {
          value,
          groupindex,
          index
        });
      },

      closeActionSheet(e) {
        const {
          type
        } = e.currentTarget.dataset;

        if (this.data.maskClosable || type) {
          // 点击 action 里面的 取消
          this.setData({
            show: false
          }); // 关闭回调事件

          this.triggerEvent('close');
        }
      }

    }
  });
  /***/
}
/******/
)]);

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    title: {
      // 标题
      type: String,
      default: ''
    },
    showCancel: {
      // 是否显示取消按钮
      type: Boolean,
      default: true
    },
    cancelText: {
      // 取消按钮文案
      type: String,
      default: '取消'
    },
    maskClass: {
      // 遮罩层class
      type: String,
      default: ''
    },
    extClass: {
      // 弹出窗 class
      type: String,
      default: ''
    },
    maskClosable: {
      // 点击遮罩 关闭 actionsheet
      type: Boolean,
      default: true
    },
    mask: {
      // 是否需要 遮罩层
      type: Boolean,
      default: true
    },
    show: {
      // 是否开启 actionsheet
      type: Boolean,
      default: false
    },
    actions: {
      // actions 列表
      type: Array,
      default: []
    }
  },
  watch: {
    actions: {
      handler: '_groupChange',
      immediate: true,
      deep: true
    }
  },

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
  options: {
    multipleSlots: true,
    // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  methods: {
    groupChangeFun(e) {
      // 支持 一维数组 写法
      if (e.length > 0 && typeof e[0] !== 'string' && !(e[0] instanceof Array)) {
        this.setData({
          actions: [this.actions]
        });
      }
    },

    buttonTap(e) {
      const {
        value,
        groupindex,
        index
      } = e.currentTarget.dataset;
      this.$emit('actiontap', {
        detail: {
          value,
          groupindex,
          index
        }
      });
    },

    closeActionSheet(e) {
      const {
        type
      } = e.currentTarget.dataset;

      if (this.maskClosable || type) {
        // 点击 action 里面的 取消
        this.setData({
          show: false
        }); // 关闭回调事件

        this.$emit('close');
      }
    }

  }
};
</script>
<style>
@import "./actionsheet.css";
</style>