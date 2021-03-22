<template>
  <div class="cheliu" v-webTitle :data-title="`车流-项目排名`">
    <div class="header-top">
      <ys-n-nav-bar :title="`车流-项目排名`" />
      <div class="app-header">
        <div class="app-header-right">
          <ys-n-date-pick @selected="dateSelected" :selected="params.yearMonth" type="year-month"></ys-n-date-pick>
        </div>
      </div>
    </div>
    <ys-n-section title="车流量" :collapseable="true" v-if="show">
      <ys-n-echart :options="mainOps" canvasId="cheliu1"></ys-n-echart>
    </ys-n-section>
    <ys-n-section title="项目排名" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (table.mode === 'day' ? 'active' : '')" @click="onListModeChanged" data-value="day">昨日</span>｜
          <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>｜
          <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
        </div>
      </div>
      <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" :mode="table.mode"></ys-n-table>
    </ys-n-section>
  </div>
</template>

<script>

const fixedColumns = [{
  label: "序号",
  width: "1.2rem"
}, {
  label: "项目",
  key: "shortName",
  align: "left"
}];
const monthColumns = [{
  label: "序号",
  width: "1.2rem",
  fixed: true,
},
{
  label: "项目",
  key: "projectName",
  width: "2.9333rem",
  align: "left",
  fixed: true,
}, {
  label: "周转率",
  key: "turnoverRate",
  /* width: "2rem", */
  sortable: true,
  align: "right"
}, {
  label: "车流",
  key: "carFlow",
  /* width: "2rem", */
  align: "right",
  sortable: true,
  numberFormat: true,
  numberPrecision: 0,
}, {
  label: "达成率",
  key: "achievementRate",
  /* width: "2.2rem", */
  align: "right",
  sortable: true,
  unit: '%'
}
];
const yearColumns = [{
  label: "序号",
  width: "1.2rem",
  fixed: true,
},
{
  label: "项目",
  key: "projectName",
  width: "2.9333rem",
  align: "left",
  fixed: true,
}, {
  label: "周转率",
  key: "turnoverRate",
  align: "right",
  sortable: true
}, {
  label: "车流",
  key: "carFlow",
  align: "right",
  sortable: true,
  numberFormat: true,
  numberPrecision: 0,
}];
const yesterdayColumns = [{
  label: "序号",
  width: "1.2rem",
  fixed: true,
}, {
  label: "项目",
  key: "projectName",
  width: "2.9333rem",
  align: "left",
  fixed: true,
}, {
  label: "昨日车流",
  key: "carFlow",
  align: "right",
  sortable: true,
  numberFormat: true,
  numberPrecision: 0,
}, {
  label: "环比",
  key: "growth",
  align: "right",
  sortable: true,
  unit: '%'
}];
export default {
  data() {
    return {
      monthTotalRow: '',
      yearTotalRow: '',
      yesterdayTotalRow: '',
      monthDataList: [],
      yearDataList: [],
      yesterdayDataList: [],
      table: {
        mode: 'month',
        dataList: [],
        columns: monthColumns
      },
      show: true,
      params: {
        yearMonth: this.$route.query.yearMonth,
        chargeType: this.$route.query.chargeType,
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName,
      },
      mainOps: {
        unit: "万",
        decimals: "xiaoshoupaiming",
        type: 'tb',
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
          }
        }, {
          type: "line"
        }]
      },
    }
  },
  created() {
    this.echartData();
    this.getTableData()
  },
  methods: {
    onListModeChanged(e) {
      const mode = e.target.dataset.value;
      if (mode != this.table.mode) {
        this.table.mode = mode

        if (mode == 'month') {
          this.setData({
            'table.totalRow': this.monthTotalRow,
            'table.dataList': this.monthDataList,
            'table.columns': monthColumns
          })
        } else if (mode == 'year') {
          this.setData({
            'table.totalRow': this.yearTotalRow,
            'table.dataList': this.yearDataList,
            'table.columns': yearColumns
          })
        } else {
          this.setData({
            'table.totalRow': this.yesterdayTotalRow,
            'table.dataList': this.yesterdayDataList,
            'table.columns': yesterdayColumns
          })
        }
      }
    },
    dateSelected(date) {
      this.params.yearMonth = date;
      this.echartData();
      this.getTableData()
    },
    async echartData() {
      //console.log(this.params)
      ///this.params.yearMonth = this.$route.query.yearMonth
      console.log(this.params)
      let res = await this.$axios.cheliuServe.echartData(this.params)
      const year = this.$route.query.yearMonth.split("-")[0];
      const lastYear = String(year - 1);
      const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"];
      let carFlowOne = []
      let carFlowTwo = []
      res.data[0].carFlow.map(item => {
        carFlowOne.push(item / 10000)
      })
      res.data[1].carFlow.map(item => {
        carFlowTwo.push(item / 10000)
      })
      this.setData({
        "mainOps.legend.data": legendData,
        "mainOps.series[0].name": legendData[0],
        "mainOps.series[0].data": carFlowOne,
        "mainOps.series[1].name": legendData[1],
        "mainOps.series[1].data": carFlowTwo
      });
    },
    async getTableData() {
      let res = await this.$axios.cheliuServe.tableData(this.params)
      let monthDataList = []
      let yearDataList = []
      let yesterdayDataList = []
      let monthTotalRow = ''
      let yearTotalRow = ''
      let yesterdayTotalRow = ''
      res.data.monthDataList.map(item => {
        if (item.projectName === '合计') {
          monthTotalRow = item
        } else {
          monthDataList.push(item)
        }
      })
      res.data.yearDataList.map(item => {
        if (item.projectName === '合计') {
          yearTotalRow = item
        } else {
          yearDataList.push(item)
        }
      })
      res.data.yesterdayDataList.map(item => {
        if (item.projectName === '合计') {
          yesterdayTotalRow = item
        } else {
          yesterdayDataList.push(item)
        }
      })
      if (this.table.mode == 'month') {
        this.setData({
          'table.totalRow': monthTotalRow,
          'table.dataList': monthDataList,
          'table.columns': monthColumns,
          "monthTotalRow": monthTotalRow,
          "yearTotalRow": yearTotalRow,
          "yesterdayTotalRow": yesterdayTotalRow,
          "monthDataList": monthDataList,
          "yearDataList": yearDataList,
          "yesterdayDataList": yesterdayDataList
        })
      } else if (this.table.mode == 'year') {
        this.setData({
          'table.totalRow': yearTotalRow,
          'table.dataList': yearDataList,
          'table.columns': yearColumns,
          "monthTotalRow": monthTotalRow,
          "yearTotalRow": yearTotalRow,
          "yesterdayTotalRow": yesterdayTotalRow,
          "monthDataList": monthDataList,
          "yearDataList": yearDataList,
          "yesterdayDataList": yesterdayDataList
        })
      } else {
        this.setData({
          'table.totalRow': yesterdayTotalRow,
          'table.dataList': yesterdayDataList,
          'table.columns': yesterdayColumns,
          "monthTotalRow": monthTotalRow,
          "yearTotalRow": yearTotalRow,
          "yesterdayTotalRow": yesterdayTotalRow,
          "monthDataList": monthDataList,
          "yearDataList": yearDataList,
          "yesterdayDataList": yesterdayDataList
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-mode-item {
  font-size: 28px;

  &.active {
    color: #3992ba;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
