<template>
<view>
<app-header>
  <view slot="right">
    <app-picker @changed="onDateChanged" range fields="day" :fromDate="params.queryBeginDate" :toDate="params.queryEndDate"></app-picker>
  </view>
  <view class="header-right-select">
    <app-filter-dialog :checkboxes="projectList" @selected="bindselected" tip="注意：最少选两项" @open="bindopen" @close="bindclose" title="项目筛选">
    </app-filter-dialog>
  </view> 
</app-header>
<app-section title="项目客流(人)" v-if="show">
  <app-echarts :options="options" height="600rpx"></app-echarts>
</app-section>
<app-section title="项目排名">
  <app-table :values="dataList" :columns="columns"></app-table>
</app-section>
</view>
</template>

<script>
const app = getApp();
import appHeader from "@/components/common/header";
import appPicker from "@/components/selector/datepicker";
import appEcharts from "@/components/echarts/echarts";
import appLengthways from "@/components/table/lengthways";
import appTable from "@/components/table/index";
import appSection from "@/components/container/section";
import appFilterDialog from "@/components/filter/dialog";

export default {
  data() {
    return {
      show: true,
      params: {
        bisProjectIds: "",
        queryEndDate: "",
        queryBeginDate: ""
      },
      options: {
        color: ["#EA6B00", "#3992BA", "#02DFFF", "#FFCE49", "#1EFBB8"],
        legend: {
          data: []
        },
        xAxis: {
          type: "category",
          data: [],
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
        series: [],
        grid: {
          top: 10,
          bottom: 70,
          left: 5,
          right: 5,
          containLabel: true
        },
        tb: true
      },
      legend: {
        data: []
      },
      xAxis: {
        type: "category",
        data: [],
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
      grid: {
        top: 10,
        bottom: 70,
        left: 5,
        right: 5,
        containLabel: true
      },
      projectList: [],
      columns: [{
        label: "排名"
      }, {
        label: "项目",
        key: "name",
        align: "left"
      }, {
        label: "客流（万人）",
        key: "total",
        sortable: true,
        align: "right",
        width: "220rpx"
      }, {
        label: "同比",
        key: "tb",
        sortable: true,
        align: "right"
      }]
    };
  },

  components: {
    appHeader,
    appPicker,
    appEcharts,
    appLengthways,
    appTable,
    appSection,
    appFilterDialog
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ["params.bisProjectIds"]: options.ids
    });
    let date = new Date();
    let pre = new Date(new Date() - 3600 * 24 * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let day = date.getDate() + 1 > 10 ? date.getDate() + 1 : "0" + date.getDate();
    let preyear = pre.getFullYear();
    let premonth = pre.getMonth() + 1 > 10 ? pre.getMonth() + 1 : "0" + (pre.getMonth() + 1);
    let preday = pre.getDate() + 1 > 10 ? pre.getDate() + 1 : "0" + pre.getDate();
    let end = year + "-" + month + "-" + day;
    let start = preyear + "-" + premonth + "-" + preday;
    this.setData({
      ["params.queryBeginDate"]: start,
      ["params.queryEndDate"]: end
    });
    this.getDataDetail();
    this.getKeliu();
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

    async getDataDetail() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfProjectHours.action", this.params);
      let legend = [];
      let series = [];
      res.data.values.forEach(item => {
        legend.push(item.name);
        series.push({
          type: "line",
          name: item.name,
          data: item.dataArr
        });
      });
      this.setData({
        ["dataList"]: res.data.values,
        ["options.xAxis.data"]: res.data.dataArr.map(item => item + "点"),
        ["options.legend.data"]: legend,
        ["options.series"]: series
      });
    },

    onDateChanged(e) {
      let {
        from,
        to
      } = e.detail.value;
      this.setData({
        "params.queryBeginDate": from,
        "params.queryEndDate": to
      });

      if (this.params.queryBeginDate && this.params.queryEndDate) {
        this.getDataDetail();
      }
    },

    async getKeliu() {
      let res = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!pfOfMonOrYear.action", {
        yearAndMonth: "2020-12",
        yearMonthDay: "2020-07-07",
        attrNew: 7,
        sortNew: "desc"
      });
      let list = res.data.pfOfMon.pfMon.map(item => {
        return {
          label: item[1],
          bisProjectId: item[0]
        };
      }).slice(1);
      this.setData({
        projectList: list
      });
    },

    bindselected(e) {
      let ids = e.detail.map(item => item.bisProjectId).join(",");
      this.setData({
        ["params.bisProjectIds"]: ids
      });
      this.getDataDetail();
    }

  }
};
</script>
<style>
@import "./timeframe.css";
</style>