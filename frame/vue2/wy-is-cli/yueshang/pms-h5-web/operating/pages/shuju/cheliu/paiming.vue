<template>
<view class="shuju-cheliu-paiming">
  <app-header>
    <!-- <app-project-selector bind:selected="onProjectSelected" /> -->
    <view class="flex" slot="right">
      <app-picker fields="month" @changed="onDateChanged" :fromDate="query.yearMonth"></app-picker>
      <!-- <app-filter-dialog groups="{{ groups }}" class="block--right-30rpx" bindselected="bindselected" title="筛选" /> -->
    </view>
  </app-header>

  <app-section title="车流量" collapseable>
    <app-echarts :options="page.charts.main.options"></app-echarts>
  </app-section>

  <app-section title="项目排名">
    
    <app-table :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow"></app-table>

    <view slot="head-actions">
      <view class="list-mode">
        <text :class="'list-mode-item ' + (page.table.mode === 'day' ? 'active' : '')" @tap="onListModeChanged" data-value="day">昨日</text>｜
        <text :class="'list-mode-item ' + (page.table.mode === 'month' ? 'active' : '')" @tap="onListModeChanged" data-value="month">当月</text>｜
        <text :class="'list-mode-item ' + (page.table.mode === 'year' ? 'active' : '')" @tap="onListModeChanged" data-value="year">年累计</text>
      </view>
    </view>
  </app-section>
</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const fixedColumns = [{
  label: "序号",
  width: "100rpx"
}, {
  label: "项目",
  key: "shortName",
  align: "left"
}];
const monthColumns = [{
  label: "周转率",
  key: "turnoverMonthRate",
  sortable: true,
  align: "right"
}, {
  label: "车流",
  key: "monthFlowStr",
  align: "right",
  sortable: true
}];
const yearColumns = [{
  label: "周转率",
  key: "turnoverYearRate",
  align: "right",
  sortable: true
}, {
  label: "车流",
  key: "yearFlowStr",
  align: "right",
  sortable: true
}];
const dayColumns = [{
  label: "昨日车流",
  key: "yesterdayFlowStr",
  align: "right",
  sortable: true
}, {
  label: "环比",
  key: "yesterdayHb",
  align: "right",
  sortable: true
}, {
  label: "达成率",
  key: "yesterdayFinishRate",
  align: "right",
  sortable: true
}];
import appHeader from "@/components/common/header";
import appPicker from "@/components/selector/datepicker";
import appSection from "@/components/container/section";
import appFilterDialog from "@/components/filter/dialog";
import appProjectSelector from "@/components/selector/project";
import appTable from "@/components/table/index";
import appEcharts from "@/components/echarts/echarts";

export default {
  data() {
    return {
      query: {
        yearMonth: [app.globalData.today.year, app.globalData.today.month].join("-")
      },
      page: {
        table: {
          mode: "month",
          columns: [...fixedColumns, ...monthColumns]
        },
		charts: {
			main: {}
		}
      },
      table: {
        mode: "month",
        columns: [...fixedColumns, ...monthColumns]
      },
      groups: []
    };
  },

  components: {
    appHeader,
    appPicker,
    appSection,
    appFilterDialog,
    appProjectSelector,
    appTable,
    appEcharts
  },
  props: {},
  onLoad: function (options) {
    this.setData({
      "query.yearMonth": options.yearMonth || [app.globalData.today.year, app.globalData.today.month].join("-")
    });
    this.loadData(); // this.getStage()
    // this.getplanList()
  },
  methods: {
    yearMonth() {
		return [app.globalData.today.year, app.globalData.today.month].join("-")
	},

    //筛选框选择数据
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
          [`query.${key}`]: detais[key]
        });
      }

      this.loadData();
    },

    // 获取区域枚举
    async getplanList() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!zsPlanListPage.action", this.params);
      let groups = this.groups;

      for (let i = 0; i < groups.length; i++) {
        if (groups[i].label == "项目区域" || groups[i].label == "省份") {
          groups.splice(i, 1);
          i--;
        }
      }

      let area = res.data.operateAreaList.map(item => {
        return {
          label: item.operateArea,
          value: "operateArea-" + item.index
        };
      });
      let provice = res.data.proviceList.map(item => {
        return {
          label: item.province,
          value: "provinceCd-" + item.index
        };
      });
      area.unshift({
        label: "全部",
        value: "operateArea-" + ""
      });
      provice.unshift({
        label: "全部",
        value: "provinceCd-" + ""
      });
      let area_group = {
        label: "项目区域",
        items: area,
        maxnum: 1
      };
      let provice_group = {
        label: "省份",
        items: provice,
        maxnum: 1
      };
      groups.push(provice_group);
      this.setData({
        groups
      });
    },

    // 获取项目阶段枚举
    async getStage() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-dict!stageList.action");
      let result = res.data.map(item => {
        return {
          label: item.name,
          value: "stage-" + item.code
        };
      });
      let group = {
        label: "项目阶段",
        items: result,
        maxnum: 1
      };
      let groups = this.groups;
      groups.push(group);
      this.setData({
        groups
      });
    },

    loadData: async function () {
      const {
        data: {
          chartData,
          ...res
        }
      } = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!trafficInfoNew.action", this.query);
      const rows = res.list.map((item, itemi) => {
        return { ...item
        };
      });
      const totalRow = rows.shift();
      let year = this.query.yearMonth.split("-")[0];
      let prevYear = this.query.yearMonth.split("-")[0] - 1 + "";
      year = year.substring(year.length - 2) + "年度";
      prevYear = prevYear.substring(prevYear.length - 2) + "年度";
      let yearChart = [];
      let prevChart = [];
      let label = this.query.yearMonth && this.query.yearMonth.split("-")[0] || "2020";
      const legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
      chartData.forEach(item => {
        yearChart.push(item.yearFlow);
        prevChart.push(item.prevYearFlow);
      });
      const setdata = {
        "page.charts.main.options": {
          unit: "万",
          decimals: "xiaoshoupaiming",
          legend: {
            // data: [year, prevYear]
            data: legendData
          },
          xAxis: {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
          },
          yAxis: {
            type: "value"
          },
          series: [{
            type: "line",
            // name: year,
            name: legendData[0],
            data: yearChart,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#CFDFFE"
              }, {
                offset: 1,
                color: "#ffffff"
              }])
            }
          }, {
            type: "line",
            // name: prevYear,
            name: legendData[1],
            data: prevChart
          }]
        },
        "page.table": {
          mode: "month",
          columns: [...fixedColumns, ...monthColumns],
          totalRow,
          rows: rows.map((item, itemi) => {
            return { // rank: itemi + 1,
              ...item
            };
          })
        }
      };
      this.setData(setdata);
    },

    onDateChanged(e) {
      this.setData({
        "query.yearMonth": e.detail.value
      });
      this.loadData();
    },

    onListModeChanged(e) {
      const mode = e.target.dataset.value;

      if (this.page.table.mode !== mode) {
        this.setData({
          "page.table.mode": mode,
          "page.table.columns": [...fixedColumns, ...(mode === "year" ? yearColumns : mode === "month" ? monthColumns : dayColumns)]
        });
      }
    }

  }
};
</script>
<style>
@import "./paiming.css";
</style>