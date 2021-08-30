<template>
<view class="kaiye-index">
  <app-header @tab-changed="onTabChanged">
    <view v-if="recovery.show">
      纠错编辑
    </view>
    <!-- <app-project-selector bindselected="onProjectSelected" /> -->
    <view slot="right" v-if="!recovery.show">
      <app-picker :fromDate="params.yearMonthDay" fields="day" @changed="onDateChanged"></app-picker>
    </view>
    <view slot="right" style="margin-left: 20rpx" v-if="!recovery.show">
      <app-filter-dialog :groups="groups" @selected="bindselected" title="筛选"></app-filter-dialog>
    </view>
    <view slot="right" style="margin-left: 20rpx;" v-if="!recovery.show">
      <view class="flex" @tap="onRecoveryClick">
        纠错
        <image src="/static/assets/images/icon-find-recovery.png" style="width:32rpx;height:32rpx;margin-left:10rpx;"></image>
      </view>
    </view>
  </app-header>
  <!-- <view class="updata-time">
    数据更新时间：2020-04-10 数据来源系统：PMS系统</view> -->
  <app-section title="开业率(%)" collapseable v-if="!recovery.show">
    <app-echarts :options="page.charts.main.options"></app-echarts>
  </app-section>

  <view class="paiming">
    <app-section title="项目排名">
      <app-table :fixednum="2" :values="dataList" :columns="columns" :totalRow="totalRow" :selected="tableSelected" @row-column-click="onRowColumnClick"></app-table>
    </app-section>
  </view>

  <!-- <view class="btm-btn" bind:tap="skip" wx:if="{{ !recovery.show }}">招商计划</view> -->
  <view class="recovery-actions" v-if="recovery.show">
    <view class="recovery-actions__action" @tap="cancelRecovery">取消</view>
    <view class="recovery-actions__action recovery-actions__action--priamry" @tap="postRecovery">提交</view>
  </view>
</view>
</template>

<script>
const app = getApp();
import regeneratorRuntime from "@/utils/runtime";
const columns = [{
  label: "序号",
  width: "90rpx"
}, {
  label: "项目",
  key: "shortName",
  color: "#3992BA",
  width: "200rpx",
  align: "left"
}, {
  label: "计租面积(㎡)",
  key: "allSquare",
  sortable: true,
  align: "right",
  width: "220rpx"
}, {
  label: "空铺面积(㎡)",
  key: "emptySquare",
  color: "#3992BA",
  sortable: true,
  align: "right",
  width: "200rpx"
}, {
  label: "出租率",
  key: "rentRate",
  width: "160rpx",
  sortable: true,
  align: "right"
}, {
  label: "开业率",
  key: "openRate",
  width: "160rpx",
  sortable: true,
  align: "right"
}, {
  label: "开业率指标",
  key: "indexSquare",
  width: "180rpx",
  sortable: true,
  align: "right"
}, {
  label: "达成率",
  key: "indexRate",
  width: "160rpx",
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
      recovery: {
        show: false,
        selected: {},
        current: {}
      },
      selected: {},
      current: {},
      tableSelected: {
        key: "bisProjectId",
        keysMap: {}
      },
      keysMap: {},
      params: {
        storeType: "",
        squareFlag: "",
        stage: "",
        operateArea: "",
        provinceCd: "",
        queryBeginDate: "",
        queryEndDate: "",
        yearMonthDay: app.globalData.getDefaultDate("yesterday")
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
      columns,
      groups: [],
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
    appPicker,
    appHeader,
    appEcharts
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let begDate = "";

    if (options.yearMonth) {
      let year = options.yearMonth.split("-")[0];
      let month = options.yearMonth.split("-")[1];
      begDate = year - 1 + "-" + month;
    }

    this.setData({
      ["params.queryBeginDate"]: begDate,
      ["params.queryEndDate"]: options.yearMonth,
      ["params.storeType"]: options.storeType
    }); // this.getNowDate()

    this.loadData();
    this.getStoreType(); // this.getplanList()
  },
  methods: {
    yearMonthDay() {
		return app.globalData.getDefaultDate("yesterday")
	},

    getNowDate() {
      let date = new Date();
      let queryBeginDate = date.getFullYear() - 1 + "-" + (date.getMonth() + 1);
      let queryEndDate = date.getFullYear() + "-" + (date.getMonth() + 1);
      this.setData({
        ["params.queryBeginDate"]: queryBeginDate,
        ["params.queryEndDate"]: queryEndDate
      });
    },

    getYear(year) {
      if (year) {
        return year.split("-")[0];
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
      }).get("/open/bis-open-report!kyTotal.action", this.params);
      let year = this.getYear(this.params.queryEndDate);
      let prevYear = this.getYear(this.params.queryBeginDate);
      if(year) {
		  year = year.substring(year.length - 2);
	  }
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
            name: year + "年度",
            data: JSON.parse(res.initChar.openRateChar).map(num => num),
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
            data: JSON.parse(res.initChar.openPrevRateChar).map(num => num)
          }]
        }
      };
      const {
        params
      } = this;
      await app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-mark-info!findPageMarkInfoList.action", { ...params,
        pageType: "kyl",
        bizProjectId: "",
        pageSource: getCurrentPages().pop().route
      }).then(res => {
        const keysMap = res.data.reduce((result, item) => {
          result[item.markX] = item.markY.split(",");
          return result;
        }, {});
        setdata["recovery.selected"] = keysMap;
        setdata["tableSelected.keysMap"] = keysMap;
      });
      this.setData(setdata);

      if (res.list.length) {
        this.setData({
          dataList: res.list.slice(0, -1).map((item, index) => {
            return { ...item,
              ranking: index + 1
            };
          }),
          totalRow: res.list.slice(-1)[0]
        });
      } else {
        this.setData({
          dataList: [],
          totalRow: null
        });
      }
    },

    //选择筛选日期
    onDateChanged(e) {
      let from = e.detail.value;
      this.setData({
        ["params.queryBeginDate"]: this.getYear(from) - 1 + "-" + from.split("-")[1],
        ["params.queryEndDate"]: from.split("-").slice(0, -1).join("-"),
        ["params.yearMonthDay"]: from
      });
      this.loadData();
    },

    // 点击行查看详情跳转 更改为 点击单项跳转详情或者空铺信息
    onRowColumnClick(e) {
      console.log(e); //判断当点击空铺面积时跳转

      if (e.detail.column.key == "emptySquare") {
        let bisProjectId = e.detail.row.bisProjectId;
        let projectName = e.detail.row.shortName;
        uni.navigateTo({
          url: `./kongpu/kongpu?bisProjectId=${bisProjectId}&projectName=${projectName}&yearMonth=${this.params.queryEndDate}&storeType=${this.params.storeType}`
        });
      } else {
        const {
          show,
          selected
        } = this.recovery;

        if (show) {
          const {
            row,
            column
          } = e.detail;
          const rowKey = this.tableSelected.key;

          if (!selected[row[rowKey]]) {
            selected[row[rowKey]] = [];
          }

          if (selected[row[rowKey]].includes(column.key)) {
            selected[row[rowKey]].splice(selected[row[rowKey]].indexOf(column.key), 1);
          } else {
            selected[row[rowKey]].push(column.key);
          }

          this.setData({
            "tableSelected.keysMap": selected
          });
          return;
        }

        let bisProjectId = e.detail.row.bisProjectId;
        let projectName = e.detail.row.shortName;
        uni.navigateTo({
          url: `./details/details?bisProjectId=${bisProjectId}&projectName=${projectName}&yearMonth=${this.params.queryEndDate}&storeType=${this.params.storeType}`
        });
      }
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
      groups.push(area_group, provice_group);
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

    onRecoveryClick() {
      this.setData({
        "recovery.show": true,
        "recovery.current": JSON.parse(JSON.stringify(this.recovery.selected))
      });
    },

    postRecovery() {
      const {
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
        bisProjectId: "",
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
	  this.getStoreType(); // this.getplanList()
    },

    // 跳转
    skip() {
      app.globalData.page.go("../zhaoshang/index", {
        yearMonth: this.params.queryEndDate,
        storeType: this.params.storeType
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>