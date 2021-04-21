<template>
<!--pages/xiaoshou/month/month.wxml-->
<view>
  <app-header>
    <app-project-selector disabled-all :selected="selected" @selected="onProjectSelected"></app-project-selector>
    <view slot="right">
      <app-picker :fromDate="params.year" fields="year" @changed="onDateChanged"></app-picker>
    </view>
    <view slot="right" style="margin-left:20rpx">
      <app-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose">
      </app-filter-dialog>
    </view>
  </app-header>
  <!-- <view class="updata-time">
    数据更新时间：2020-04-10 数据来源系统：PMS系统</view> -->
  <app-section title="平效（元/㎡）" :collapseable="true" v-if="show">
    <app-echarts :options="page.mainOps" canvasId="xiaoshou1"></app-echarts>
  </app-section>
  <app-section title="业态" v-if="show">
    <text class="title-unit" slot="head-title" v-if="mode === 'xse'">（万元）</text>
    <view slot="head-actions">
      <view class="list-mode">
        <text :class="'list-mode-item ' + (mode === 'xse' ? 'active' : '')" data-value="xse" @tap="onModeChanged">销售额</text>｜
        <text :class="'list-mode-item ' + (mode === 'zlb' ? 'active' : '')" data-value="zlb" @tap="onModeChanged">租售比</text>
      </view>
    </view>
    <app-echarts :options="page.kindOps" canvasId="xiaoshou2"></app-echarts>
  </app-section>
  <app-section title="商家销售排名">
    <view slot="head-actions">
      <view class="list-mode">
        <text :class="'list-mode-item ' + ( page.table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
        <text :class="'list-mode-item ' + ( page.table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
      </view>
    </view>
    <app-table :values="page.table.dataList" :columns="page.table.columns" @row-click="onRowClick"></app-table>
  </app-section>
</view>
</template>

<script>
// pages/xiaoshou/month/month.js
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const monthColumns = [{
  label: "商家",
  key: "projectName",
  align: "left",
  color: '#3B96BE'
}, {
  label: "平效",
  key: "px",
  sortable: true,
  width: "130rpx",
  align: "right"
}, {
  label: "租售比",
  key: "zsb",
  unit: "",
  width: "130rpx",
  sortable: true,
  align: "right"
}, {
  label: "销售额(万元)",
  key: "monthSales",
  width: "190rpx",
  sortable: true,
  align: "right"
}];
const yearColumns = [{
  label: "商家",
  key: "projectName",
  align: "left",
  color: '#3B96BE'
}, {
  label: "同比",
  key: "yty",
  width: "120rpx",
  align: "right"
}, {
  label: "销售额完成率",
  key: "salesBudgetTot",
  width: "200rpx",
  sortable: true,
  align: "right"
}, {
  label: "销售额(万元)",
  key: "yearSales",
  width: "180rpx",
  sortable: true,
  align: "right"
}];
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appProjectSelector from "@/components/selector/project";
import appPicker from "@/components/selector/datepicker";
import appHeader from "@/components/common/header";
import appEcharts from "@/components/echarts/echarts";

export default {
  data() {
    return {
      show: true,
      params: {
        bisProjectId: null,
        storeType: "",
        squareFlag: "",
        stage: "",
        operateArea: "",
        provinceCd: "",
        year: ""
      },
      layoutSalesArr: [],
      layoutZsbArr: [],
      groups: [],
      mode: "xse",
      page: {
        table: {
          mode: "month",
          columns: monthColumns,
          dataList: []
        },
        mainOps: {
          unit: "元/㎡",
          decimals: "xiaoshoupaiming",
          xAxis: {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            splitLine: {
              show: true,
              lineStyle: {
                color: "#C9CCDA",
                type: "dashed"
              }
            }
          },
          yAxis: {
            type: "value"
          },
          series: [{
            type: "line",
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#2D9FCB"
              }, {
                offset: 1,
                color: "rgba(255,255,255,0.48)"
              }])
            }
          }, {
            type: "line"
          }]
        },
        kindOps: {
          color: ["#EA6B00", "#3992BA", "#02DFFF", "#FFCE49", "#1EFBB8"],
          legend: {
            data: ["主力店", "餐饮", "服装", "配套", "儿童"]
          },
          xAxis: {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            splitLine: {
              show: true,
              lineStyle: {
                color: "#C9CCDA",
                type: "dashed"
              }
            }
          },
          yAxis: {
            type: "value"
          },
          series: [{
            type: "line",
            name: "主力店"
          }, {
            type: "line",
            name: "餐饮"
          }, {
            type: "line",
            name: "服装"
          }, {
            type: "line",
            name: "配套"
          }, {
            type: "line",
            name: "儿童"
          }]
        }
      },
      table: {
        mode: "month",
        columns: monthColumns,
        dataList: []
      },
      mainOps: {
        unit: "元/㎡",
        decimals: "xiaoshoupaiming",
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#C9CCDA",
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
          type: "line",
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#2D9FCB"
            }, {
              offset: 1,
              color: "rgba(255,255,255,0.48)"
            }])
          }
        }, {
          type: "line"
        }]
      },
      kindOps: {
        color: ["#EA6B00", "#3992BA", "#02DFFF", "#FFCE49", "#1EFBB8"],
        legend: {
          data: ["主力店", "餐饮", "服装", "配套", "儿童"]
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#C9CCDA",
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [{
          type: "line",
          name: "主力店"
        }, {
          type: "line",
          name: "餐饮"
        }, {
          type: "line",
          name: "服装"
        }, {
          type: "line",
          name: "配套"
        }, {
          type: "line",
          name: "儿童"
        }]
      },
      columns: ""
    };
  },

  components: {
    appSection,
    appTable,
    appFilterDialog,
    appProjectSelector,
    appPicker,
    appHeader,
    appEcharts
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      columns: this.monthColumns,
      ["params.year"]: this.getYear(options.yearMonth),
      ["params.bisProjectId"]: options.bisProjectId,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
      ["params.storeType"]: options.storeType
    });
    this.loadData();
    this.getStoreType();
  },
  methods: {
    onRowClick(e) {
      uni.navigateToMiniProgram({
        appId: 'wxa91ddcadeff6c927',
        target: "miniProgram",
        path: 'pages/sjgl/sjgl?name=' + e.detail.row.projectName,
        envVersion: 'release',

        success(res) {
          console.log(res);
        }

      });
    },

    /**
     * 选择项目
     */
    onProjectSelected(e) {
      let bisProjectId = e.detail.value ? e.detail.value.bisProjectId : "";

      if (bisProjectId) {
        this.setData({
          ["params.bisProjectId"]: bisProjectId
        });
        this.loadData();
      } else {
        uni.showToast({
          icon: "none",
          title: "不能选择全部"
        });
      }
    },

    bindopen() {
      this.setData({
        show: false
      });
    },

    bindclose() {
      this.setData({
        show: true
      });
    },

    /**
     * 筛选框选择数据
     */
    bindselected(e) {
      let arr = e.detail;
      let detais = {};
      arr.map((item, index) => {
        let key = item.split("-")[0];
        let val = item.split("-")[1];
        detais[key] = val;
      });

      for (const key in detais) {
        this.setData({
          [`params.${key}`]: detais[key]
        });
      }

      this.loadData();
    },

    /**
     * 选择筛选日期
     */
    onDateChanged(e) {
      let from = e.detail.value;
      this.setData({
        ["params.year"]: from
      });
      this.loadData();
    },

    /**
     * 切换 当月/年累计
     */
    onListModeChanged(e) {
      const mode = e.target.dataset.value;

      if (this.page.table.mode !== mode) {
        if (mode === "month") {
          this.setData({
            "page.table.mode": mode,
            "page.table.columns": monthColumns
          });
        } else {
          this.setData({
            "page.table.mode": mode,
            "page.table.columns": yearColumns
          });
        }
      }
    },

    onModeChanged(e) {
      const mode = e.target.dataset.value;
      const {
        layoutSalesArr,
        layoutZsbArr
      } = this;
      this.setData({
        mode: mode
      });

      if (mode === "xse") {
        this.setYtChartData(layoutSalesArr);
      } else {
        this.setYtChartData(layoutZsbArr);
      }
    },

    /**
     * 获取搜索物业类型枚举
     */
    async getStoreType() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-dict!chargeTypeList.action");
      let result = res.data.map(item => {
        return {
          label: item.name,
          value: "storeType-" + item.code,
          selected: item.code === this.params.storeType
        };
      });
      let group = {
        label: "物业类型",
        items: result,
        maxnum: 1
      };
      let groups = this.groups;
      groups.push(group);
      this.setData({
        groups
      });
    },

    getYear(year) {
      if (year) {
        return year.split("-")[0];
      }
    },

    /**
     * 按年图表
     */
    async loadData() {
      const {
        data: {
          chartData,
          ...res
        }
      } = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-project!salesOfMonByShop.action", this.params);
      const year = this.params.year;
      const lastYear = String(year - 1);
      const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"]; // 当年平效
      // const curYear = res.curYear;

      if (res.curYear) {
        res.curYear.splice(0, 1);
      }

      const curYear = res.curYear;
      let curYearData = []; // for (let month = 1; month <= 12; month++) {
      // 	let myItem = null;
      // 	for (let i = 0; i < curYear.length; i++) {
      // 		const item = curYear[i];
      // 		if (month === item.month) {
      // 			myItem = item;
      // 			break;
      // 		}
      // 	}
      // 	if (myItem) {
      // 		curYearData.push(myItem.px);
      // 	} else {
      // 		curYearData.push(null);
      // 	}
      // }

      curYearData = JSON.parse(res.curYearPxArr); // 上年平效
      // const prevYear = res.prevYear;

      let preYearData = []; // for (let month = 1; month <= 12; month++) {
      // 	let myItem = null;
      // 	for (let i = 0; i < prevYear.length; i++) {
      // 		const item = prevYear[i];
      // 		if (month === item.month) {
      // 			myItem = item;
      // 			break;
      // 		}
      // 	}
      // 	if (myItem) {
      // 		preYearData.push(myItem.px);
      // 	} else {
      // 		preYearData.push(null);
      // 	}
      // }

      preYearData = JSON.parse(res.prevYearPxArr); // 业态销售额

      const layoutSalesArr = res.layoutSalesArr;
      const layoutZsbArr = res.layoutZsbArr;
      this.setYtChartData(layoutSalesArr);
      this.setData({
        "page.mainOps.legend.data": legendData,
        "page.mainOps.series[0].name": legendData[0],
        "page.mainOps.series[0].data": curYearData,
        "page.mainOps.series[1].name": legendData[1],
        "page.mainOps.series[1].data": preYearData,
        "page.table.dataList": curYear,
        mode: "xse",
        layoutSalesArr: layoutSalesArr,
        layoutZsbArr: layoutZsbArr
      });
    },

    // 设置图表数据
    setYtChartData(value) {
      // 主力店
      let zldData = [];

      if (value.zld && value.zld.length > 3) {
        zldData = JSON.parse(value.zld);
      } // 餐饮


      let cyData = [];

      if (value.cy && value.cy.length > 3) {
        cyData = JSON.parse(value.cy);
      } // 服装


      let fzData = [];

      if (value.fz && value.fz.length > 3) {
        fzData = JSON.parse(value.fz);
      } // 配套


      let ptData = [];

      if (value.pt && value.pt.length > 3) {
        ptData = JSON.parse(value.pt);
      } // 儿童


      let etData = [];

      if (value.et && value.et.length > 3) {
        etData = JSON.parse(value.et);
      }

      this.setData({
        "page.kindOps.series[0].data": zldData,
        "page.kindOps.series[1].data": cyData,
        "page.kindOps.series[2].data": fzData,
        "page.kindOps.series[3].data": ptData,
        "page.kindOps.series[4].data": etData
      });
    }

  }
};
</script>
<style>
@import "./month.css";
</style>