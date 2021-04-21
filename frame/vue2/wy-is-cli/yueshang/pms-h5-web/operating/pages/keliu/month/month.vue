<template>
<view>
<app-header>
  <app-project-selector :selected="selectedProj" @selected="onProjectSelected"></app-project-selector>
  <view slot="right" style="display: flex;">
    <app-date-picker :fromDate="queryModel.yearAndMonth" fields="year" @changed="onDateChanged"></app-date-picker>
  </view>
</app-header>

<!-- <view class="updata-time">数据更新时间：{{ updateTime }} 数据来源系统：PMS系统</view> -->

<view class="wrapper">
  <app-section :collapseable="collapseable">
    <view class="head-actions_left_view" slot="head-actions_left">
      <app-filter-chartdialog :title="chartsTitle" :items="items" @chartselected="onChartSelectedChange">
      </app-filter-chartdialog>
    </view>
    <app-echarts height="400rpx" :options="lineOpations"></app-echarts>
  </app-section>
</view>

<view class="wrapper" style="margin-top: 12rpx;margin-bottom: 120rpx;">
  <app-section title="月客流排名（单位：万人）">
    <view slot="head-actions">
      <view class="list-mode">
        <text :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
        <text :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
      </view>
    </view>
    <app-table :fixednum="1" :values="table.dataList" :columns="table.columns">
    </app-table>
  </app-section>
</view>

<view class="bottom-bar">
  <view class="bottom-button" @tap="gotoJiankong">客流监控</view>
</view>
</view>
</template>

<script>
// pages/shuju/keliu/paiming.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const monthColumns = [{
  label: "月份",
  key: "month",
  width: "140",
  align: "left"
}, {
  label: "工作日",
  key: "gzr",
  sortable: true,
  width: "140",
  align: "right"
}, {
  label: "节假日",
  key: "jjr",
  sortable: true,
  width: "140",
  align: "right"
}, {
  label: "客流密度",
  key: "stl",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "日均客流",
  key: "rpj",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "客流",
  key: "kl",
  sortable: true,
  width: "140",
  align: "right"
}, {
  label: "同比",
  unit: "%",
  key: "tb",
  width: "130",
  sortable: true,
  align: "right"
}, {
  label: "达成率",
  key: "dcl",
  width: "130",
  sortable: true,
  align: "right"
}];
const yearColumns = [{
  label: "月份",
  key: "month",
  align: "left",
  width: "150"
}, {
  label: "客流",
  key: "kl",
  sortable: true,
  width: "200",
  align: "right"
}, {
  label: "日均客流",
  key: "rpj",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "同比",
  unit: "%",
  key: "tb",
  width: "200",
  sortable: true,
  align: "right"
}, {
  label: "达成率",
  key: "dcl",
  width: "200",
  sortable: true,
  align: "right"
}];
import appHeader from "@/components/common/header";
import appProjectSelector from "@/components/selector/project";
import appSection from "@/components/container/section";
import appEcharts from "@/components/echarts/echarts";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appDatePicker from "@/components/selector/datepicker";
import appFilterChartdialog from "@/components/filter/chartdialog";

export default {
  data() {
    return {
      chartsType: 'kl',
      chartsTitle: "客流密度(人/天/㎡)",
      items: [{
        'title': '客流密度',
        'type': 'kl',
        'value': '',
        'unit': '人/天/㎡'
      }, {
        'title': '项目客流',
        'type': 'xm',
        'value': '',
        'unit': '人'
      }],
      queryModel: {
        bisProjectId: null,
        yearAndMonth: null
      },
      updateTime: null,
      collapseable: true,
      lineops: {
        decimals: "paiming",
        unit: "%",
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: {
          type: "value",
          boundaryGap: false
        },
        series: [{
          type: "line",
          lineStyle: {
            color: "#3AABFF"
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#CFDFFE"
            }, {
              offset: 1,
              color: "#FFFFFF"
            }])
          }
        }, {
          type: "line",
          lineStyle: {
            color: "#9BB3C6"
          }
        }]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
      },
      yAxis: {
        type: "value",
        boundaryGap: false
      },
      lineStyle: {
        color: "#3AABFF"
      },
      areaStyle: {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#CFDFFE"
        }, {
          offset: 1,
          color: "#FFFFFF"
        }])
      },
      lineStyle: {
        color: "#9BB3C6"
      },
      lineopsXm: {
        decimals: "paiming",
        tb: true,
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
        },
        yAxis: {
          type: "value",
          boundaryGap: false
        },
        series: [{
          type: "line",
          lineStyle: {
            color: "#3AABFF"
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#CFDFFE"
            }, {
              offset: 1,
              color: "#FFFFFF"
            }])
          }
        }, {
          type: "line",
          lineStyle: {
            color: "#9BB3C6"
          }
        }]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
      },
      yAxis: {
        type: "value",
        boundaryGap: false
      },
      lineStyle: {
        color: "#3AABFF"
      },
      areaStyle: {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#CFDFFE"
        }, {
          offset: 1,
          color: "#FFFFFF"
        }])
      },
      lineStyle: {
        color: "#9BB3C6"
      },
      table: {
        mode: "month",
        columns: monthColumns,
        dataList: []
      },
      monthData: [],
      yearData: [],
      selectedProj: {},
      lineOpations: ""
    };
  },

  components: {
    appHeader,
    appProjectSelector,
    appSection,
    appEcharts,
    appTable,
    appFilterDialog,
    appDatePicker,
    appFilterChartdialog
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // const date = new Date()
    this.setData({
      // updateTime: (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()),
      selectedProj: {
        label: options.projectName,
        value: options.bisProjectId
      },
      "queryModel.bisProjectId": options.bisProjectId,
      "queryModel.yearAndMonth": options.yearMonth,
      "queryModel.yearMonth": options.yearAndMonth,
      //默认显示客流密度信息
      'lineOpations': { ...this.lineops
      }
    });
    this.queryData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    onProjectSelected(e) {
      // console.log(e)
      if (e.detail.label !== "全部") {
        this.setData({
          "queryModel.bisProjectId": e.detail.value.bisProjectId
        });
        this.queryData();
      }
    },

    onDateChanged(e) {
      console.log(e);
      this.setData({
        "queryModel.yearAndMonth": e.detail.value
      });
      this.queryData();
    },

    onListModeChanged(e) {
      const mode = e.target.dataset.value;

      if (this.table.mode !== mode) {
        this.setData({
          "table.mode": mode,
          "table.columns": mode === "month" ? monthColumns : yearColumns,
          "table.dataList": mode === "month" ? this.monthData : this.yearData
        });
      }
    },

    // clickRow(e) {
    //   console.log(e)
    //   app.page.go('../jiankong/jiankong', {
    //     bisProjectId: this.data.queryModel.bisProjectId,
    //     quickDate: e.detail.id
    //   })
    // },
    gotoJiankong() {
      app.globalData.page.go("../jiankong/jiankong", {
        bisProjectId: this.queryModel.bisProjectId,
        projectName: this.selectedProj.label
      });
    },

    queryData() {
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfMon.action", this.queryModel).then(res => {
        const data = res.data;
        const date = JSON.parse(data.date);
        const year = date[0].substring(0, 4);
        let preYear = Number(year) - 1 + "";
        const legendData = [year.substring(2) + "年度", preYear.substring(2) + "年度"]; // let stlchart = JSON.parse(data.stlchart)
        // const len = 12 - stlchart.length
        // if (len && len > 0) {
        //   for (let i = 0; i < len; i++) {
        //     stlchart.push(null)
        //   }
        // }
        // console.log(stlchart)
        // 数据

        const pf = data.pf; // 月数据

        let mData = []; // 年数据

        let yData = [];

        for (let i = 0, len = pf.length; i < len; i++) {
          const arr = pf[i];
          mData.push({
            month: arr[16],
            gzr: arr[10],
            jjr: arr[11],
            stl: arr[12],
            kl: arr[4],
            tb: arr[6],
            dcl: arr[8],
            rpj: arr[18]
          });
          yData.push({
            month: arr[16],
            kl: arr[5],
            tb: arr[7],
            dcl: arr[9],
            rpj: arr[18]
          });
        }

        let preStlchart = [];

        if (data.preStlchart && data.preStlchart.length > 5) {
          preStlchart = JSON.parse(data.preStlchart);
        }

        this.setData({
          "lineOpations.legend.data": legendData,
          "lineOpations.series[0].name": legendData[0],
          "lineOpations.series[0].data": JSON.parse(data.stlchart),
          "lineOpations.series[1].name": legendData[1],
          "lineOpations.series[1].data": preStlchart,
          monthData: mData,
          yearData: yData,
          "table.dataList": mData
        });
      });
    },

    //获取项目客流图表
    getXMKL() {
      let params = {
        provinceCd: "",
        attrNew: 7,
        attrNew2: "",
        sortNew: "desc",
        sortNew2: "",
        operateArea: "",
        stage: "",
        yearAndMonth: this.queryModel.yearMonth
      };
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfMonOrYear.action", params).then(res => {
        const data = res.data;
        const chartData = data.chartData;
        const legendData = ['今日', '昨日'];
        this.setData({
          // options,
          "lineOpations.legend.data": legendData,
          "lineOpations.series[0].name": legendData[0],
          "lineOpations.series[0].data": chartData.pro_currentDay,
          "lineOpations.series[1].name": legendData[1],
          "lineOpations.series[1].data": chartData.pro_yesterDay
        });
      });
    },

    //图表左上角切换选项
    async onChartSelectedChange(e) {
      let selected = null;
      this.items.forEach(item => {
        if (item.title === e.detail.title) {
          selected = item;
          this.setData({
            "chartsTitle": e.detail.title + "(" + e.detail.unit + ")",
            'chartsType': item.type
          });
        }
      }); //根据选择图表类别 切换更新图表数据

      if (selected.type == 'xm') {
        await this.setData({
          lineOpations: this.lineopsXm
        });
        this.getXMKL();
      } else if (selected.type == 'kl') {
        await this.setData({
          lineOpations: this.lineops
        });
        this.queryData();
      }
    }

  }
};
</script>
<style>
@import "./month.css";
</style>