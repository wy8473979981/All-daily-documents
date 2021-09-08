import G6 from '@antv/g6';

import flowptionData from './flow.js';

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
          flow: function (id, option) {
            commonFn.call(this, id, flowptionData(option))
          }
        }
      }
    }
  })
}

export default {
  install
}