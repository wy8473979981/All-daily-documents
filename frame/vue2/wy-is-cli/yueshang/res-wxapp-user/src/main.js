import Vue from 'vue'
import App from './App'
import store from './store/index'
import { Icon, Popover } from 'vant';

Vue.use(Icon).use(Popover);

// js兼容性处理
import './assets/compatibility'

// 公共方法
import globalMethod from './assets/globalMethods'
Vue.use(globalMethod)

// 路由插件
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由集合
import routes from './assets/router'
const router = new VueRouter({
  routes
})

// 公共事件监听器
import eventHub from './assets/eventHub'
Vue.use(eventHub)

// 手势
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

// 组件库
import vantUI from 'vant-ui' //npm库 - 正式项目请用这个
// import vantUI from './vant-ui'; //本地库
Vue.use(vantUI)

// 框架样式
import '@/scss/index.scss'

// v-viewer图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

// 全局注册树子组件
import treeItem from "./components/treeItem"
Vue.component('treeItem', treeItem)
import dataTable from "@/components/dataTable"
Vue.component('dataTable', dataTable)
import download from "@/components/download"
Vue.component('download', download)
import pCol from "@/components/pCol"
Vue.component('pCol', pCol)
import customTags from "@/components/customTags"
Vue.component('customTags', customTags)
import ysSection from "@/components/section"
Vue.component('ysSection', ysSection)

import ysNSpjlStep from "@/components/ysNSpjlStep"
Vue.component('ysNSpjlStep', ysNSpjlStep)
import ysNMoreOperate from "@/components/ysNMoreOperate"
Vue.component('ysNMoreOperate', ysNMoreOperate)
import ysNPopup from "@/components/ysNPopup"
Vue.component('ysNPopup', ysNPopup)
// 全局注册过滤器
import * as filters from '@/utils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局注册vant弹框提示组件
import { Dialog, Toast } from 'vant'
Vue.use(Dialog)
Vue.use(Toast)

// 全局注册userInfo,通过vuex userInfo获取数据
Object.defineProperty(Vue.prototype, '$userInfo', {
  value: store.state.userInfo
})

// 全局定义模板内调用的api
import approval from '@/apis/apis/approval'
Vue.prototype.$approval = approval
import file from '@/apis/apis/file'
Vue.prototype.$file = file

// 数字转中文大写金额
Vue.prototype.convertCurrency = (money) => {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';
  //分离金额后用的数组，预定义
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

// 引入wxsdk并全局定义
import wx from 'weixin-js-sdk'
Vue.prototype.$wx = wx

import { Table, TableColumn } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)

Vue.config.productionTip = false

import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
