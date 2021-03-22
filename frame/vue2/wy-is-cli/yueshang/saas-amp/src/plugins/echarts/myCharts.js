import echarts from 'echarts';

import pie1OptionData from './pie1.js';
import pie2OptionData from './pie2.js';
import pie3OptionData from './pie3.js';
import line1OptionData from './line1.js';
import line2OptionData from './line2.js';
import line3OptionData from './line3.js';
import bar1OptionData from './bar1.js';
import bar2OptionData from './bar2.js';

function commonFn (id, fn) {
  this.chart = echarts.init(document.getElementById(id));
  this.chart.clear();
  this.chart.setOption(fn);
}

//各种画echarts图表的方法都封装在这里
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          // 画圆圈
          pie1: function (id, option) {
            commonFn.call(this, id, pie1OptionData(option))
          },
          pie2: function (id, option) {
            commonFn.call(this, id, pie2OptionData(option))
          },
          pie3: function (id, option) {
            commonFn.call(this, id, pie3OptionData(option))
          },
          // 画折线图 1
          line1: function (id, option) {
            commonFn.call(this, id, line1OptionData(option))
          },
          line2: function (id, option) {
            commonFn.call(this, id, line2OptionData(option))
          },
          line3: function (id, option) {
            commonFn.call(this, id, line3OptionData(option))
          },
          // 画柱状图 1
          bar1: function (id, option) {
            commonFn.call(this, id, bar1OptionData(option))
          },
          bar2: function (id, option) {
            commonFn.call(this, id, bar2OptionData(option))
          }
        }
      }
    }
  })
}

export default {
  install
}