<template>
<view class="duibi">
  <app-header>
    <view slot="right">
      <app-picker @changed="onDateChanged" fields="month" :fromDate="params.queryDate"></app-picker>
    </view>
  </app-header>
  <app-section>
    <view slot="head-title">
      <app-chartdialog :title="title" :items="itemList" @chartselected="bindchartselected"></app-chartdialog>
    </view>
    <view class="registered-channels">
      <app-echarts :height="chartHeight" :options="options"></app-echarts>
    </view>
  </app-section>
  <app-section title="商家信息对比">
    <app-lengthways :values="dataList" :cross="cross"></app-lengthways>
  </app-section>
</view>
</template>

<script>
// pages/sjbj/sjbj.js\
import * as echarts from '../../packages/ec-canvas/echarts';
const app = getApp();
const itemList = [{
  title: '当月租金',
  value: 'rentMoney',
  unit: '万元'
}, {
  title: '当月物管',
  value: 'managementMoney',
  unit: '万元'
}, {
  title: '上月销售',
  value: 'sales',
  unit: '万元'
}, {
  title: '月平效',
  value: 'monthsEffect',
  unit: '元'
}, {
  title: '总欠费',
  value: 'totalOwe',
  unit: '万'
}, {
  title: '租售比',
  value: 'rentRatio',
  unit: '%'
}];
const options = {
  color: ['#EA6B00', '#1890FF', '#02DFFF', '#FFCE49', '#1EFBB8'],
  legend: {
    selectedMode: true,
    data: [],
    itemHeight: 12,
    y: 'bottom',
    bottom: '0',
    type: 'scroll'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      let res = '';

      if (params.length > 0) {
        res += params[0].axisValue + '\n<br/>';
      }

      for (var i = 0, l = params.length; i < l; i++) {
        if (!(params[i].value == null)) {
          res += params[i].seriesName + ' : ' + params[i].value + '\n<br/>';
        } else {
          res += params[i].seriesName + ' : -' + '\n<br/>';
        }
      }

      return res;
    },
    padding: [8, 10, 8, 10],
    borderColor: 'rgba(45, 159, 203, 1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    textStyle: {
      color: '#333333',
      fontSize: 11
    }
  },
  grid: {
    right: '5%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisPointer: {
      type: 'shadow'
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: '12'
      },
      interval: 0
    },
    axisLine: {
      show: false
    },
    nameLocation: 'end' //坐标轴名称显示位置。

  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      //y轴刻度线
      show: false
    }
  },
  series: []
};
import appSection from "../../components/container/section";
import appLengthways from "../../components/table/lengthways";
import appHeader from "../../components/common/header";
import appPicker from "../../components/selector/datepicker";
import appEcharts from "../../components/echarts/echarts";
import appChartdialog from "../../components/filter/chartdialog";

export default {
  data() {
    return {
      dataList: [],
      cross: [{
        key: 'merchantsChineseName'
      }, {
        label: '当月租金(万)',
        key: 'rentMoney'
      }, {
        label: '当月物管(万)',
        key: 'managementMoney'
      }, {
        label: '上月销售(万)',
        key: 'sales'
      }, {
        label: '月平效(元/㎡)',
        key: 'monthsEffect'
      }, {
        label: '总欠费(万)',
        key: 'totalOwe'
      }, {
        label: '租售比',
        key: 'rentRatio'
      }],
      params: {
        bisShopId: [],
        limit: 20,
        offset: 1,
        queryDate: app.globalData.getDefaultDate('month')
      },
      itemList,
      title: '当月租金(万)',
      options: options,
      chartHeight: '500rpx'
    };
  },

  components: {
    appSection,
    appLengthways,
    appHeader,
    appPicker,
    appEcharts,
    appChartdialog
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ids = options.ids;
    console.log(ids);
    this.setData({
      'params.bisShopId': ids
    });
    setTimeout(_ => {
      this.getDataList();
      this.getChartList('rentMoney');
    });
  },
  methods: {
    async getDataList(bisShopId) {
      let params = this.params;
      let res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/shangguans/bismerchantsummarybigs/list', params);
      this.setData({
        dataList: res.data.list
      });
    },

    async getChartList(value) {
      const res = await app.globalData.request.options({
        loading: true
      }).get('/api/v1/report/shangguans/bismerchantsummarybigs/listLineChart', this.params);
      const {
        list
      } = res.data;
      let shopList = [],
          seriesInfo = {},
          seriesList;
      list.forEach(item => {
        let {
          merchantsChineseName
        } = item;

        if (!seriesInfo[merchantsChineseName]) {
          seriesInfo[merchantsChineseName] = {
            merchantsChineseName,
            data: []
          };
        }

        seriesInfo[merchantsChineseName].data.push(item[value]);
      });
      shopList = Object.keys(seriesInfo);
      seriesList = Object.values(seriesInfo);
      const series = seriesList.map(item => ({
        name: item.merchantsChineseName,
        type: 'line',
        data: item.data,
        barWidth: 10,
        barGap: '0%'
      }));
      console.log(series);
      options.legend.data = shopList;
      options.series = series;
      this.setData({
        options
      });
    },

    onDateChanged(e) {
      this.setData({
        'params.queryDate': e.detail.value
      });
      this.getDataList();
    },

    bindchartselected(e) {
      console.log(e);
      let title = `${e.detail.title}(${e.detail.unit})`;
      const value = e.detail.value;
      this.getChartList(value);
      this.setData({
        title
      });
    }

  }
};
</script>
<style>
@import "./sjbj.css";
</style>