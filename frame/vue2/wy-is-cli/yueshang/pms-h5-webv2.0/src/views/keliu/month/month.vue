<template>
  <div v-webTitle :data-title="`月客流`">
    <div class="header-top">
      <ys-n-nav-bar :title="`月客流`" />

      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selectedProj" @projeSelected="onProjectSelected"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year`" @selected="onDateChanged" :selected="queryModel.year"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="updata-time">数据更新时间：{{ updateTime }} 数据来源系统：PMS系统</div> -->

    <div class="wrapper">
      <ys-n-section :collapseable="collapseable">
        <div class="head-actions_left_view" slot="head-actions_left">
          <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchList" @search="onChartSelectedChange"> </ys-n-filter-chart-dialog>
        </div>
        <ys-n-echart :options="lineops"></ys-n-echart>
      </ys-n-section>
    </div>

    <div class="wrapper" style="margin-top: 12px; margin-bottom: 120px">
      <ys-n-section title="月客流排名（单位：万人）" :hasTable="true">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
          </div>
        </div>
        <ys-n-table :fixednum="1" :values="table.dataList" :columns="table.columns" :mode="table.mode"> </ys-n-table>
      </ys-n-section>
    </div>

    <div class="bottom-bar">
      <div class="bottom-button" @click="gotoJiankong">客流监控</div>
    </div>
  </div>
</template>

<script>

import { yearColumns, monthColumns } from '../columns/monthColumns'
export default {
  data() {
    return {
      routerParams: this.$route.query,
      chartsType: "xm",
      chartsTitle: "项目客流(人)",
      searchList: [
        {
          label: "",
          key: "detail",
          selectedCode: 'xm',
          values: [
            {
              name: "项目客流",
              code: "xm",
              value: "",
              unit: "人",
            },
            {
              name: "客流密度",
              code: "kl",
              value: "",
              unit: "人/天/㎡",
            },
          ],
        }
      ],
      queryModel: {
        projectId: null,
        projectName: null,
        year: null,
      },
      leaderDetail: {
        userName: '',
        resultList: '',
        attendWorkDate: '',
        mobilePhone: ''
      },
      updateTime: null,
      collapseable: true,
      lineops: {},
      table: {
        mode: "month",
        columns: monthColumns,
        dataList: [],
      },
      pro_currentDay: [],
      pro_yesterDay: [],
      stlchart: [],
      preStlchart: [],
      monthData: [],
      yearData: [],
      selectedProj: {},
    };
  },

  components: {},
  props: {},
  mounted() {
    try {
      this.setData({
        selectedProj: {
          label: this.routerParams.projectName,
          projectId: this.routerParams.projectId,
        },
        "queryModel.projectId": this.routerParams.projectId,
        "queryModel.projectName": this.routerParams.projectName,
        "queryModel.year": this.routerParams.yearMonth.split("-")[0],
      });
      this.getEchartData();
      this.getTableData();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async getEchartData() {
      try {
        // 查询具体项目数据 传递 projectId
        await this.$axios.keliuServe.queryPassengerFlowLineChart({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let previousData = [];
              let currentData = [];
              let legendData = [];
              let xAxis = [];

              if (this.chartsType == 'xm') {
                // 项目客流
                legendData = ["今日", "昨日"];
                xAxis = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

                previousData = res.data.passengerFlowOfYesterdayAndTodayList[0]['passengerFlow'];
                currentData = res.data.passengerFlowOfYesterdayAndTodayList[1]['passengerFlow'];
              } else if (this.chartsType == 'kl') {
                // 客流密度
                let label = (this.queryModel.year && this.queryModel.year) || "2020";
                legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
                xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

                previousData = res.data.passengerFlowDensityOfLastYearAndCurYearList[0]['passengerFlowDensity'];
                currentData = res.data.passengerFlowDensityOfLastYearAndCurYearList[1]['passengerFlowDensity'];
              }

              this.lineops = {
                precision: this.chartsType == 'xm' ? 0 : 2,
                type: "tb",
                legend: { data: legendData, icon: "circle", itemHeight: 7 },
                xAxis: { type: "category", data: xAxis, },
                yAxis: { type: "value" },
                unit: this.chartsType == 'xm' ? '人' : '人/天/㎡',
                series: [
                  {
                    type: "line",
                    name: legendData[0],
                    lineStyle: { color: "#3AABFF", },
                    data: currentData,
                    areaStyle: {
                      // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#CFDFFE", }, { offset: 1, color: "#FFFFFF", }]), 
                      normal: { //自定义颜色，渐变色填充折线图区域
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                          //渐变色 
                          [{
                            offset: 0,
                            color: '#2D9FCB'
                          }, {
                            offset: 0.62,
                            color: "#ffffff"
                          }]),
                      }
                    },
                  },
                  {
                    type: "line",
                    lineStyle: { color: "#9BB3C6", },
                    name: legendData[1],
                    data: previousData,
                  },
                ],
              };
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async getTableData() {
      try {
        await this.$axios.keliuServe.queryMonthlyPassengerFlowRanking({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let { mode } = this.table;
              let dataList = [];
              this.tableData = res.data;
              if (mode == 'year') {
                this.setData({
                  "table.dataList": this.tableData.yearlyPassengerFlow,
                });
              } else if (mode == 'month') {
                this.setData({
                  "table.dataList": this.tableData.monthlyPassengerFlow,
                });
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },

    onProjectSelected(item) {
      try {
        if (item.shortName !== "全部") {
          this.setData({
            ["queryModel.projectId"]: (item && item.projectId) || "",
            ["queryModel.projectName"]: (item && item.shortName) || "",
          });
          this.getEchartData();
          this.getTableData();
        }
      } catch (e) {
        console.log(e)
      }
    },
    onDateChanged(e) {
      try {
        this.setData({
          "queryModel.year": e,
        });
        this.getEchartData();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    },
    onListModeChanged(e) {
      try {
        const mode = e.target.dataset.value;
        const { yearlyPassengerFlow, monthlyPassengerFlow } = this.tableData;
        if (this.table.mode !== mode) {
          this.setData({
            "table.mode": mode,
            "table.columns": mode === "month" ? monthColumns : yearColumns,
            "table.dataList": mode === "month" ? monthlyPassengerFlow : yearlyPassengerFlow,
          });
        }
      } catch (e) {
        console.log(e)
      }
    },
    gotoJiankong() {
      try {
        let { chargeType, yearMonth, yearMonthDay } = this.routerParams;
        let { projectId, projectName, year } = this.queryModel;
        let params = { chargeType, projectId, year, yearMonth, yearMonthDay }
        this.$router.push({ path: '/keliu/jiankong', query: { ...params } })
      } catch (e) {
        console.log(e)
      }
    },

    //图表左上角切换选项
    async onChartSelectedChange(e) {
      try {
        console.log(e);
        let selected = null;
        let values = this.searchList[0].values;
        this.searchList[0].selectedCode = e.detail.code;
        values.map((item) => {
          if (item.name === e.detail.name) {
            selected = item;
            this.setData({
              chartsTitle: e.detail.name + "(" + e.detail.unit + ")",
              chartsType: item.code,
            });
          }
        });
        this.getEchartData();
      } catch (e) {
        console.log(e)
      }
    },

  },
};
</script>
<style type="span/css" lang="scss" scoped>
.wrapper {
  background-color: #fff;
}

.list-mode-item {
  font-size: 28px;
}

.list-mode-item.active {
  color: #3992ba;
  font-size: 32px;
  font-weight: bold;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  z-index: 101;
  width: 100%;
}

.bottom-button {
  margin: 16px 50px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
  background: linear-gradient(315deg, #1d5a87 0%, #3992ba 100%);
}
</style>
