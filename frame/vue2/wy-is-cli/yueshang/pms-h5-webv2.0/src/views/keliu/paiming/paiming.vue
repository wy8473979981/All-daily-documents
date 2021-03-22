<template>
  <div v-webTitle :data-title="`客流排名`">
    <div class="header-top">
      <ys-n-nav-bar :title="`客流排名`" />

      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`date`" @selected="onDateChanged" :selected="queryModel.yearMonthDay"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper" v-if="!show">
      <ys-n-section :collapseable="collapseable">
        <div class="head-actions_left_div" slot="head-actions_left">
          <ys-n-filter-chart-dialog :label="chartsTitle" :searchList="searchList" @search="onChartSelectedChange"> </ys-n-filter-chart-dialog>
        </div>
        <ys-n-echart :options="lineops"></ys-n-echart>
      </ys-n-section>
    </div>

    <div class="wrapper" style="margin-top: 12px">
      <ys-n-section title="项目排名" :hasTable="true">
        <div slot="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (table.mode === 'day' ? 'active' : '')" @click="onListModeChanged" data-value="day">当日</span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>
            <span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
          </div>
        </div>
        <ys-n-table :fixednum="2" :values="table.dataList" :columns="table.columns" :totalRow="table.totalRow" @row-column-click="onRowColumnClick" :mode="table.mode"> </ys-n-table>
      </ys-n-section>
    </div>

    <ys-n-filter-dialog :checkboxes="table.dataList" @selected="showComparisonList" tip="注意：最少选两项" @open="bindopen">
      <div class="comparison"> 对比 </div>
    </ys-n-filter-dialog>
  </div>
</template>

<script>

import { yearColumns, monthColumns, dayColumns } from '../columns/columns'

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
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        feeType: "",//费项,1租金,物管,3多经
        provinceCd: "",
        attrNew: 7,
        attrNew2: "",
        sortNew: "desc",
        sortNew2: "",
        operateArea: "",
        stage: "",
        yearMonth: "",
        yearMonthDay: "",
      },
      show: false,
      dataList: [],
      updateTime: null,
      collapseable: true,
      lineops: {},
      lineOpations: {},
      table: {
        mode: "day",
        columns: dayColumns,
        totalRow: null,
        dataList: [],
      },
      tableData: [],
      mTotalRow: null,
      yTotalRow: null,
      monthData: [],
      yearData: [],
      dData: [],
      dTotalRow: {},
      params: {},
      firstLoad: true
    };
  },

  components: {},
  props: {},
  mounted() {
    try {
      this.setData({
        "queryModel.yearMonth": this.routerParams.yearMonth,
        "queryModel.chargeType": this.routerParams.chargeType,
        "queryModel.yearMonthDay": this.$util.getDefaultDate("day"),
      });

      // this.onChartSelectedChange({ detail: { name: "项目客流", code: "xm", unit: "人", value: "", }, });

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
                let label = (this.queryModel.yearMonth && this.queryModel.yearMonth.split("-")[0]) || "2020";
                legendData = [label.substring(2) + "年度" + "", (parseInt(label) - 1 + "").substring(2) + "年度" + ""];
                xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

                previousData = res.data.passengerFlowDensityOfLastYearAndCurYearList[0]['passengerFlowDensity'];
                currentData = res.data.passengerFlowDensityOfLastYearAndCurYearList[1]['passengerFlowDensity'];
              }

              this.lineops = {
                precision: this.chartsType == 'xm' ? 0 : 2,
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
                      //color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#CFDFFE", }, { offset: 1, color: "#FFFFFF", }]), 
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
        await this.$axios.keliuServe.queryPassengerFlowForPassengerFlowRanking({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let { mode } = this.table;
              let dataList = [];
              this.tableData = res.data;
              if (mode == 'year') {
                this.setData({
                  "table.dataList": this.tableData.passengerFlowWhenCurYearForPassengerFlowComparisonList.slice(0, -1),
                  "table.totalRow": this.tableData.passengerFlowWhenCurYearForPassengerFlowComparisonList.slice(-1)[0],
                });
              } else if (mode == 'month') {
                this.setData({
                  "table.dataList": this.tableData.passengerFlowWhenCurMonthForPassengerFlowComparisonList.slice(0, -1),
                  "table.totalRow": this.tableData.passengerFlowWhenCurMonthForPassengerFlowComparisonList.slice(-1)[0],
                });
              } else if (mode == 'day') {
                this.setData({
                  "table.dataList": this.tableData.passengerFlowWhenCurDayForPassengerFlowComparisonList.slice(0, -1),
                  "table.totalRow": this.tableData.passengerFlowWhenCurDayForPassengerFlowComparisonList.slice(-1)[0],
                });
              }
            }
            console.log(this.table.dataList, 'table.dataList')
          });
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
    onDateChanged(e) {
      try {
        // console.log(e)
        this.setData({
          "queryModel.yearMonth": e,
          "queryModel.yearMonthDay": e,
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
        if (this.table.mode !== mode) {
          if (mode == 'year') {
            this.setData({
              "table.mode": mode,
              "table.columns": yearColumns,
              "table.dataList": this.tableData.passengerFlowWhenCurYearForPassengerFlowComparisonList.slice(0, -1),
              "table.totalRow": this.tableData.passengerFlowWhenCurYearForPassengerFlowComparisonList.slice(-1)[0],
            });
          } else if (mode == 'month') {
            this.setData({
              "table.mode": mode,
              "table.columns": monthColumns,
              "table.dataList": this.tableData.passengerFlowWhenCurMonthForPassengerFlowComparisonList.slice(0, -1),
              "table.totalRow": this.tableData.passengerFlowWhenCurMonthForPassengerFlowComparisonList.slice(-1)[0],
            });
          } else if (mode == 'day') {
            this.setData({
              "table.mode": mode,
              "table.columns": dayColumns,
              "table.dataList": this.tableData.passengerFlowWhenCurDayForPassengerFlowComparisonList.slice(0, -1),
              "table.totalRow": this.tableData.passengerFlowWhenCurDayForPassengerFlowComparisonList.slice(-1)[0],
            });
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 对比操作
    showComparisonList(e) {
      try {
        if (e.detail.length < 2) {
          this.$Toast.fail('最少选两项');
          return;
        }
        let ids = e.detail.map((item) => item.projectId).join(",");
        let params = { ...this.queryModel, ids: ids };

        this.$router.push({ path: '/keliu/duibi', query: { ...params } })
      } catch (e) {
        console.log(e)
      }
    },

    onRowColumnClick(e) {
      try {
        // 跳转到月客流 页面
        // console.log(e)
        const { row, column } = e.detail;
        const { chargeType, yearMonth, yearMonthDay } = this.queryModel;

        if (column.key === "projectName") {
          let projectId = e.detail.row.projectId;
          let projectName = e.detail.row.projectName;


          this.$router.push({ path: '/keliu/month', query: { ...this.params, projectId: projectId, projectName: projectName, chargeType: chargeType, yearMonth: yearMonth, yearMonthDay: yearMonthDay } })
        }
      } catch (e) {
        console.log(e)
      }
    },


    bindopen() {
      try {
        let dataList = this.table.dataList.map((item, index) => {
          return {
            ...item,
            ranking: index,
            label: item.projectName
          };
        });
        this.setData({
          "table.dataList": dataList,
        });
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

.updata-time {
  font-size: 22px;
  line-height: 74px;
  text-align: center;
  color: #c5c5c5;
}

.list-mode-item {
  font-size: 28px;
}

.list-mode-item.active {
  color: #3992ba;
  font-size: 32px;
  font-weight: bold;
}
.comparison {
  width: 80px;
  height: 80px;
  position: fixed;
  line-height: 80px;
  right: 60px;
  bottom: 60px;
  border-radius: 50%;
  background: linear-gradient(340deg, #40b9ed 0%, #0067c7 100%);
  color: #fff;
  text-align: center;
  z-index: 101;
}
</style>
