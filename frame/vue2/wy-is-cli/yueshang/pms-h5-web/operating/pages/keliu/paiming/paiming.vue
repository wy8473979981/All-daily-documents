<template>
<view>
<app-header>
  <!-- <app-project-selector bindselected="onProjectSelected" /> -->
  <view slot="right" style="display: flex;">
    <app-date-picker :fromDate="queryModel.yearMonthDay" fields="day" @changed="onDateChanged"></app-date-picker>
    <!-- <app-filter-dialog style="margin-left: 32rpx;" groups="{{ options }}" title="筛选" bindselected="onSelectedChange"></app-filter-dialog> -->
  </view>
</app-header>

<!-- <view class="updata-time">数据更新时间：{{ updateTime }} 数据来源系统：PMS系统</view> -->

<view class="wrapper" v-if="!show">
  <app-section :collapseable="collapseable">
    <view class="head-actions_left_view" slot="head-actions_left">
      <app-filter-chartdialog :title="chartsTitle" :items="items" @chartselected="onChartSelectedChange">
      </app-filter-chartdialog>
    </view>
    <app-echarts height="400rpx" :options="lineOpations"></app-echarts>
  </app-section>
</view>

<view class="wrapper" style="margin-top: 12rpx;">
  <!-- <app-header tabs="{{ [{ label: '购物列表' }, { label: '项目排名' }] }}" bind:tab-changed="onTabChanged"></app-header> -->
  <app-section title="项目排名">
    <view slot="head-actions">
      <view class="list-mode">
        <text :class="'list-mode-item ' + (table.mode === 'day' ? 'active' : '')" @tap="onListModeChanged" data-value="day">当日</text>｜
        <text :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
        <text :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
      </view>
    </view>
    <app-table :values="table.dataList" :columns="table.columns" :totalRow="table.totalRow" :fixednum="2" @row-column-click="onRowColumnClick">
    </app-table>
  </app-section>
</view>
<app-filter-dialog :checkboxes="dataList" @selected="showComparisonList" v-if="params.type!=='dj'" tip="注意：最少选两项" @open="bindopen" @close="bindclose">
  <view class="comparison">
    对比
  </view>
</app-filter-dialog>
</view>
</template>

<script>
// pages/shuju/keliu/paiming.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const monthColumns = [{
  label: "序号",
  width: "90rpx",
  fixed: true
}, {
  label: "项目",
  key: "projectName",
  color: "#3992BA",
  width: "180",
  align: "left",
  fixed: true
}, {
  label: "客流密度",
  key: "stl",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "客流(万人)",
  key: "kl",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "同比",
  unit: "%",
  key: "tb",
  width: "140",
  sortable: true,
  align: "right"
}, {
  label: "达成率",
  unit: "%",
  key: "dcl",
  sortable: true,
  width: "120",
  align: "right"
}];
const yearColumns = [{
  label: "序号",
  width: "90rpx"
}, {
  label: "项目",
  key: "projectName",
  color: "#3992BA",
  width: "180",
  align: "left"
}, {
  label: "客流(万人)",
  key: "kl",
  sortable: true,
  width: "180",
  align: "right"
}, {
  label: "同比",
  unit: "%",
  key: "tb",
  width: "120",
  sortable: true,
  align: "right"
}, {
  label: "达成率",
  unit: "%",
  key: "dcl",
  width: "120",
  sortable: true,
  align: "right"
}];
const dayColumns = [{
  label: "序号",
  width: "90rpx",
  fixed: true
}, {
  label: "项目",
  key: "name",
  color: "#3992BA",
  width: "180",
  align: "left",
  fixed: true
}, {
  label: "当日客流（万）",
  key: "currDay",
  sortable: true,
  width: "240",
  align: "right"
}, {
  label: "昨日客流（万）",
  key: "preDay",
  sortable: true,
  width: "240",
  align: "right"
}, {
  label: "昨日环比",
  unit: "%",
  key: "preDayHb",
  width: "180",
  sortable: true,
  align: "right"
}];
import appHeader from "@/components/common/header";
import appSection from "@/components/container/section";
import appEcharts from "@/components/echarts/echarts";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appDatePicker from "@/components/selector/datepicker";
import appFilterChartdialog from "@/components/filter/chartdialog";
import * as echarts from "@/node_modules/echarts";

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
        provinceCd: "",
        attrNew: 7,
        attrNew2: "",
        sortNew: "desc",
        sortNew2: "",
        operateArea: "",
        stage: "",
        yearMonthDay: app.globalData.getDefaultDate("day")
      },
      show: false,
      dataList: [],
      updateTime: null,
      collapseable: true,
      lineOpations: {},
      lineops: {
        decimals: "paiming",
        unit: "%",
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#C9CCDA",
              type: "dashed"
            }
          },
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
        splitLine: {
          show: true,
          lineStyle: {
            color: "#C9CCDA",
            type: "dashed"
          }
        },
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
      //项目客流 以时间为单位
      lineopsXm: {
        decimals: "paiming",
        tb: true,
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#C9CCDA",
              type: "dashed"
            }
          },
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
        splitLine: {
          show: true,
          lineStyle: {
            color: "#C9CCDA",
            type: "dashed"
          }
        },
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
        mode: "day",
        columns: dayColumns,
        totalRow: null,
        dataList: []
      },
      mTotalRow: null,
      yTotalRow: null,
      monthData: [],
      yearData: [],
      dData: [],
      dTotalRow: {},
	  params: {}
    };
  },

  components: {
    appHeader,
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
	  console.log("options=",options)
    this.setData({
      // updateTime: yearAndMonth + date.getDate(),
      "queryModel.yearAndMonth": options.yearMonth,
      //默认显示客流密度信息
      'lineOpations': { ...this.lineops
      }
    });
    this.queryData();
  },
  methods: {
    yearMonthDay() {
		return app.globalData.getDefaultDate("day")
	},

    onProjectSelected(e) {
      // console.log(e)
      let provinceCd = "";

      if (e.detail.label !== "全部") {
        provinceCd = e.detail.label;
      }

      this.setData({
        "queryModel.provinceCd": provinceCd
      });
      this.queryData();
    },

    showComparisonList(e) {
      if (e.detail.length < 2) {
        uni.showToast({
          title: '最少选两项'
        });
        return;
      }

      let ids = e.detail.map(item => item.id).join(",");
      let params = {
        ids,
        type: "kl"
      };
      this.bindclose();
      uni.showLoading({
        mask: true
      });
      setTimeout(() => {
        uni.hideLoading();
        app.globalData.page.go("/pages/shouru/duibi/duibi", { ...this.queryModel,
          ...params
        });
      }, 2000);
    },

    onDateChanged(e) {
      // console.log(e)
      this.setData({
        "queryModel.yearAndMonth": e.detail.value,
        "queryModel.yearMonthDay": e.detail.value
      });
      this.queryData();
    },

    onSelectedChange(e) {
      // console.log(e)
      const detail = e.detail;

      if (detail.length === 0) {
        this.setData({
          "queryModel.provinceCd": "",
          "queryModel.operateArea": "",
          "queryModel.storeType": "",
          "queryModel.stage": ""
        });
      } else {
        let kv = {};
        detail.forEach(item => {
          const key = item.split("-")[0];
          const val = item.split("-")[1];
          kv[key] = val;
        });

        for (const key in kv) {
          this.setData({
            [`queryModel.${key}`]: kv[key]
          });
        }
      }

      this.queryData();
    },

    onListModeChanged(e) {
      const mode = e.target.dataset.value;

      if (this.table.mode !== mode) {
        if (mode === "month") {
          this.setData({
            "table.mode": mode,
            "table.columns": monthColumns,
            "table.totalRow": this.mTotalRow,
            "table.dataList": this.monthData
          });
        } else if (mode === "year") {
          this.setData({
            "table.mode": mode,
            "table.columns": yearColumns,
            "table.totalRow": this.yTotalRow,
            "table.dataList": this.yearData
          });
        } else {
          this.setData({
            "table.mode": mode,
            "table.columns": dayColumns,
            "table.totalRow": this.dTotalRow,
            "table.dataList": this.dData
          });
        }
      }
    },

    onRowColumnClick(e) {
      // console.log(e)
      const year = this.queryModel.yearAndMonth.split("-")[0]; // console.log(year)

      app.globalData.page.go("../month/month", {
        bisProjectId: e.detail.row.id,
        projectName: e.detail.row.projectName,
        yearMonth: year,
        yearAndMonth: this.queryModel.yearAndMonth
      });
    },

    //获取客流密度相关图表数据以及列表数据
    queryData() {
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfMonOrYear.action", this.queryModel).then(res => {
        const data = res.data;
        const chartData = data.chartData;
        const legendData = [chartData.year.substring(2) + "年度", chartData.prevYear.substring(2) + "年度"]; // 表格数据

        const pfMon = data.pfOfMon.pfMon; // 当月

        let mData = []; // 年累计

        let yData = [];
        let dData = res.data.pfDay.slice(1).map(item => {
          return { ...item,
            projectName: item.name,
            bisProjectId: item.id
          };
        });
        let dTotalRow = res.data.pfDay.slice(0, 1)[0];
        let mTotalRow = null;
        let yTotalRow = null;

        for (let i = 0, len = pfMon.length; i < len; i++) {
          const arr = pfMon[i];

          if (i === 0) {
            mTotalRow = {
              projectName: arr[1],
              stl: arr[8],
              kl: arr[2],
              tb: arr[4],
              dcl: arr[6]
            };
            yTotalRow = {
              projectName: arr[1],
              kl: arr[3],
              tb: arr[5],
              dcl: arr[7]
            };
          } else {
            mData.push({
              id: arr[0],
              projectName: arr[1],
              stl: arr[8],
              kl: arr[2],
              tb: arr[4],
              dcl: arr[6]
            });
            yData.push({
              id: arr[0],
              projectName: arr[1],
              kl: arr[3],
              tb: arr[5],
              dcl: arr[7]
            });
          }
        }

        let Adata = this.table.mode === "year" ? yData : this.table.mode === "month" ? mData : dData;
        let totalRow = this.table.mode === "year" ? yTotalRow : this.table.mode === "month" ? mTotalRow : dTotalRow;
        this.setData({
          // options,
          "lineOpations.legend.data": legendData,
          "lineOpations.series[0].name": legendData[0],
          "lineOpations.series[0].data": chartData.stlArr,
          "lineOpations.series[1].name": legendData[1],
          "lineOpations.series[1].data": chartData.stlPrevYearArr,
          monthData: mData,
          yearData: yData,
          dData: dData,
          mTotalRow,
          yTotalRow,
          dTotalRow,
          "table.totalRow": totalRow,
          "table.dataList": Adata,
          dataList: Adata.map(item => {
            return { ...item,
              label: item.projectName
            };
          })
        });
      });
    },

    //获取项目客流图表
    getXMKL() {
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfMonOrYear.action", this.queryModel).then(res => {
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

    bindopen() {
      this.setData({
        show: true
      });
    },

    bindclose() {
      this.setData({
        show: false
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
@import "./paiming.css";
</style>