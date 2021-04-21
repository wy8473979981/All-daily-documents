<template>
<view class="kaiye-details">
  <app-header @tab-changed="onTabChanged">
    <app-project-selector @selected="onProjectSelected" :selected="selected" disabled-all></app-project-selector>
    <view slot="right" style="margin-left:20rpx" v-if="!recovery.show">
      <app-filter-dialog :groups="groups" @selected="bindselected" title="筛选">
      </app-filter-dialog>
    </view>
    <view slot="right" style="margin-left: 20rpx" v-if="!recovery.show">
      <view class="flex" @tap="onRecoveryClick">
        纠错
        <image src="/static/assets/images/icon-find-recovery.png" style="width:32rpx;height:32rpx;margin-left:10rpx;"></image>
      </view>
    </view>
  </app-header>
  <!-- <view class="updata-time">
    数据更新时间：2020-04-10 数据来源系统：PMS系统</view> -->
  <app-section title="开业率(%)" v-if="!recovery.show">
    <app-echarts :options="page.charts.main.options"></app-echarts>
  </app-section>

  <app-section title="每月数据">
    <app-table :fixednum="1" :values="dataList" :columns="columns" :totalRow="totalRow" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
  </app-section>

  <!-- <view class="btm-btn" bindtap="skip" >招商计划</view> -->
  <view class="recovery-actions" v-if="recovery.show">
    <view class="recovery-actions__action" @tap="cancelRecovery">取消</view>
    <view class="recovery-actions__action recovery-actions__action--priamry" @tap="postRecovery">提交</view>
  </view>
</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
import appSection from "@/components/container/section";
import appTable from "@/components/table/index";
import appFilterDialog from "@/components/filter/dialog";
import appProjectSelector from "@/components/selector/project";
import appHeader from "@/components/common/header";
import appEcharts from "@/components/echarts/echarts";

export default {
  data() {
    return {
      recovery: {
        show: false,
        selected: {},
        current: {}
      },
      selected: {},
      current: {},
      tableSelected: {
        key: "month",
        keysMap: {}
      },
      keysMap: {},
      params: {
        bisProjectId: null,
        storeType: "",
        squareFlag: "",
        stage: "",
        operateArea: "",
        provinceCd: "",
        queryBeginDate: "",
        queryEndDate: ""
      },
      page: {
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
      columns: [{
        label: "月份",
        key: "monthSkip",
        width: "160rpx"
      }, {
        label: "开业率",
        key: "openRate",
        sortable: true,
        width: "160rpx",
        align: "right"
      }, {
        label: "开业率同比",
        key: "openRateTb",
        sortable: true,
        width: "200rpx",
        align: "right"
      }, {
        label: "出租率",
        key: "rentRate",
        width: "160rpx",
        sortable: true,
        align: "right"
      }, {
        label: "空铺面积",
        sortable: true,
        key: "emptyShopArea",
        align: "right",
        width: '220rpx'
      }],
      groups: [],
      group: {
        selected: []
      },
      dataList: [],
      //数据列表
      totalRow: null //合计数据

    };
  },

  components: {
    appSection,
    appTable,
    appFilterDialog,
    appProjectSelector,
    appHeader,
    appEcharts
  },
  props: {},
  onLoad: function (options) {
    console.log(options);
    this.setData({
      ["params.bisProjectId"]: options.bisProjectId,
      ["params.queryBeginDate"]: options.yearMonth,
      ["params.queryEndDate"]: options.yearMonth,
      ["selected.label"]: options.projectName,
      ["selected.value"]: options.bisProjectId,
      ["params.storeType"]: options.storeType
    });
    this.loadData();
    this.getStoreType();
  },
  methods: {
    onProjectSelected(e) {
      let bisProjectId = e.detail.value.bisProjectId;
      this.setData({
        ["params.bisProjectId"]: bisProjectId
      });
      this.loadData();
    },

    getYear(year) {
      if (year) {
        return Number(year.split("-")[0]);
      }
    },

    async loadData() {
      const {
        data: {
          chartData,
          ...res
        }
      } = await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!bisPassengerFlowProject.action", this.params);
      let prevYear = String(this.getYear(this.params.queryBeginDate) - 1);
      let year = String(this.getYear(this.params.queryEndDate));
      year = year.substring(year.length - 2);
      prevYear = prevYear.substring(prevYear.length - 2);
      const setdata = {
        "page.charts.main.options": {
          legend: {
            data: [year + "年度", prevYear + "年度"],
            icon: "circle",
            itemHeight: 7
          },
          unit: "%",
          xAxis: {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
          },
          yAxis: {
            type: "value"
          },
          series: [{
            type: "line",
            name: year + "年度",
            data: JSON.parse(res.curYearLayoutArr).map(num => num),
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
            name: prevYear + "年度",
            data: JSON.parse(res.prevYearLayoutArr).map(num => num)
          }]
        }
      };
      setdata.dataList = res.tableList;
      await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-mark-info!findPageMarkInfoList.action", { ...this.params,
        pageType: "kyl"
      }).then(res => {
        const keysMap = res.data.reduce((result, item) => {
          result[item.markX] = item.markY.split(",");
          return result;
        }, {});
        setdata["recovery.selected"] = keysMap;
        setdata["tableSelected.keysMap"] = keysMap;
      });
      this.setData(setdata);
    },

    // 获取搜索物业类型枚举
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
          [`params.${key}`]: detais[key]
        });
      }

      this.loadData();
    },

    onRowColumnClick(e) {
      const {
        show,
        selected
      } = this.recovery;

      if (show) {
        const {
          row,
          column
        } = e.detail;

        if (!selected[row.month]) {
          selected[row.month] = [];
        }

        if (selected[row.month].includes(column.key)) {
          selected[row.month].splice(selected[row.month].indexOf(column.key), 1);
        } else {
          selected[row.month].push(column.key);
        }

        this.setData({
          "tableSelected.keysMap": selected
        });
      }
    },

    onRecoveryClick() {
      this.setData({
        "recovery.show": true,
        "recovery.current": JSON.parse(JSON.stringify(this.recovery.selected))
      });
    },

    postRecovery() {
      const {
        bisProjectId,
        storeType
      } = this.params;
      const selectedMap = this.recovery.selected;
      const markInfos = Object.keys(selectedMap).filter(key => selectedMap[key].length).map(key => {
        return {
          markX: key,
          markY: selectedMap[key].join(","),
          notes: ""
        };
      });
      app.globalData.request.options({
        loading: true
      }).post("/open/bis-open-mark-info!clearAndSavePageMarkInfoList.action", {
        bisProjectId,
        storeType,
        markInfos,
        pageType: "kyl",
        pageSource: getCurrentPages().pop().route
      }).then(() => {
        this.cancelRecovery(false);
      });
    },

    cancelRecovery(reset = true) {
      const setdata = {
        "recovery.show": false,
        "recovery.selected": this.tableSelected.keysMap
      };

      if (reset !== false) {
        setdata["recovery.selected"] = this.recovery.current;
        setdata["tableSelected.keysMap"] = this.recovery.current;
      }

      this.setData(setdata);
	  this.loadData();
	  this.getStoreType();
    },

    // 跳转
    skip() {
      console.log(this.params);
      app.globalData.page.go("@/zhaoshang/index", {
        yearMonth: this.params.queryBeginDate,
        storeType: this.params.storeType
      });
    }

  }
};
</script>
<style>
@import "./details.css";
</style>