<template>
<view class="shuju-qiankuan-list">
  <app-header :tabs="page.tabs" @tab-changed="onTabChanged" :tabActiveIndex="tabActiveIndex">
    <!-- <app-project-selector bind:selected="onProjectSelected" /> -->
    <view slot="right">
      <app-picker fields="month" @changed="onDateChanged" :from-date="query.yearMonth"></app-picker>
    </view>
    <view slot="right" class="block--right-30rpx">
      <app-filter-dialog :groups="groups" :selected="groupSelected" @selected="onGroupSelected" title="筛选" @open="bindopen" @close="bindclose"></app-filter-dialog>
    </view>
  </app-header>

  <app-section :title="page.activeTab" collapseable v-if="show">
    <app-echarts :options="page.charts.main.options"></app-echarts>
  </app-section>

  <app-section title="欠费排名">
    
    <app-table :fixednum="2" :columns="page.table.columns" :values="page.table.rows" :total-row="page.table.totalRow" transform-id="id" @row-click="onRowClick"></app-table>

    <view slot="head-actions">
      <view class="list-mode">
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
  width: 100
}, {
  label: "项目",
  key: "name",
  color: "#3992BA",
  align: "left",
  width: "200rpx"
}];
const monthColumns = [{
  label: "历史欠费（万元）",
  width: "240rpx",
  key: "lsqf",
  sortable: true,
  color: "#FD100E",
  align: "right"
}, {
  label: "欠费（万元）",
  key: "yqf",
  width: "200rpx",
  sortable: true,
  color: "#FD100E",
  align: "right"
}, {
  label: "清欠指标",
  width: "200rpx",
  key: "qqzb",
  sortable: true,
  align: "right"
}, {
  label: "清欠率",
  key: "yqql",
  width: "200rpx",
  sortable: true,
  color: "#FD100E",
  align: "right"
}];
const yearColumns = [{
  label: "历史欠费（万元）",
  width: "240rpx",
  key: "lsqf",
  sortable: true,
  color: "#FD100E",
  align: "right"
}, {
  label: "欠费（万元）",
  key: "nqf",
  width: "200rpx",
  sortable: true,
  color: "#FD100E",
  align: "right"
}, {
  label: "清欠指标",
  width: "200rpx",
  key: "qqzb",
  sortable: true,
  align: "right"
}, {
  label: "清欠率",
  key: "nqql",
  width: "200rpx",
  sortable: true,
  color: "#FD100E",
  align: "right"
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
        type: "zj",
        attr: 1,
        yearMonth: "2020-11",
        storeType: null
      },
      page: {
        activeTab: "租金欠费（万元）",
        tabs: [{
          label: "租金欠费",
          value: "zj"
        }, {
          label: "物管欠费",
          value: "wg"
        }],
        table: {
          mode: "month"
        },
		charts: {
			main: {}
		}
      },
      table: {
        mode: "month"
      },
      show: true,
      groups: [],
      groupSelected: [],
	  tabActiveIndex: 0
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
      "query.yearMonth": options.yearMonth || [app.globalData.today.year, app.globalData.today.month].join("-"),
      "query.storeType": options.storeType || null
    });
    this.loadData();
    this.loadFilters();
  },
  methods: {
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

    async loadFilters() {
      const res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-dict!chargeTypeList.action");
      const group = {
        label: "物业类型",
        items: res.data.map(item => {
          return {
            label: item.name,
            value: {
              storeType: item.code
            },
            selected: item.code === this.query.storeType
          };
        }),
        maxnum: 1
      };
      const groups = this.groups;
      groups.push(group);
      this.setData({
        groups
      });
    },

    loadData: async function () {
      const {
        data: res
      } = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!oweOfYear.action", this.query);
      let result = res.zjowe || res.wgowe;
      const rows = result.owe.map((item, itemi) => {
        const name = itemi === 0 ? item[1] : item[0];
        const id = itemi === 0 ? null : item[1];
        return {
          id,
          name,
          yqf: item[2],
          nqf: item[3],
          lsqf: item[6],
          qqzb: item[7],
          yqql: item[8],
          nqql: item[9]
        };
      });
      const totalRow = rows.shift();
      const legend = ["欠费"];
      const setdata = {
        "page.charts.main.options": {
          unit: "万元",
          color: ["#FD100E"],
          legend: {
            data: legend
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
            // name: res.tabulateData.yearMonth,
            name: legend[0],
            data: JSON.parse(res.initChart.oweChart).map(num => num),
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#FFE1E1"
              }, {
                offset: 1,
                color: "rgba(255,255,255,0.48)"
              }])
            }
          }]
        },
        "page.table": {
          mode: "month",
          columns: [...fixedColumns, ...monthColumns],
          totalRow,
          rows
        }
      };
	  console.log("setdata==",setdata);
      this.setData(setdata);
    },

    onTabChanged(e) {
      let title = "";
      if (e.detail.value === "wg") {
        title = "物管欠费（万元）";
		this.tabActiveIndex = 1
      } else {
        title = "租金欠费（万元）";
		this.tabActiveIndex = 0
      }

      this.setData({
        "query.type": e.detail.value,
        "page.activeTab": title
      });
      this.loadData();
    },

    onDateChanged(e) {
      this.setData({
        "query.yearMonth": e.detail.value
      });
      this.loadData();
    },

    onGroupSelected(e) {
      const setdata = {};
      console.log(e);
      e.detail.forEach(query => {
        Object.keys(query).forEach(key => {
          setdata[`query.${key}`] = query[key];
        });
      });
      this.setData(setdata);
      this.loadData();
    },

    onListModeChanged(e) {
      const mode = e.target.dataset.value;

      if (this.page.table.mode !== mode) {
        this.setData({
          "page.table.mode": mode,
          "page.table.columns": [...fixedColumns, ...(mode === "year" ? yearColumns : monthColumns)]
        });
      }
    },

    onRowClick(e) {
      app.globalData.page.go("/pages/shuju/qiankuan/details", {
        bisProjectId: e.detail.row.id,
        projectName: e.detail.row.name,
        yearMonth: this.query.yearMonth,
        type: this.query.type,
        storeType: this.query.storeType
      });
    }

  }
};
</script>
<style>
@import "./list.css";
</style>