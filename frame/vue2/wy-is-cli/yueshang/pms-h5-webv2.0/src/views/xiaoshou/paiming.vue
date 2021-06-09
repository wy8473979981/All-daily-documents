<template>
  <div class="xiaoshou" v-webTitle :data-title="`销售排名`">
    <div class="header-top">
      <ys-n-nav-bar :title="`销售排名`" />
      <div class="app-header">
        <div class="app-header-right">
          <ys-n-date-pick type="year-month" @selected="dateSelected" :selected="queryParams.yearMonth">
          </ys-n-date-pick>
          <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></ys-n-filter-dialog>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="wrapper">
        <ys-n-section :title="chartsTitle" :collapseable="collapseable" v-if="show">
          <div class="head-actions_left_view" slot="head-actions_left">
            <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
            <!-- <image class="head-actions_left" src="@/assets/images/icon-arrow-down.png" catchtap="onActionsLeftCatch"/> -->
            <ys-n-filter-chart-dialog :searchList="searchTypeList" @search="searchType">
            </ys-n-filter-chart-dialog>
          </div>
          <ys-n-echart :options="lineops"></ys-n-echart>
        </ys-n-section>
        <ys-n-section title="项目排名" :hasTable="true">
          <div slot="head-actions">
            <div class="list-mode">
              <span :class="'list-mode-item ' + (table.mode === 'day' ? 'active' : '')" @click="onListModeChanged" data-value="day">昨日</span>｜
              <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>｜
              <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
            </div>
          </div>
          <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" :mode="table.mode" @row-column-click="onRowColumnClick"></ys-n-table>
        </ys-n-section>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  mapMutations,
  mapGetters
} from "vuex";

const monthColumns = [{
  label: "序号",
  width: "1.3rem",
  align: "left",
  fixed: true,
},
{
  label: "项目",
  key: "projectName",
  color: "#3B96BE",
  width: "2.5rem",
  align: "left",
  fixed: true,
},
{
  label: "平效",
  key: "benefitsPerSquareMeter",
  sortable: true,
  width: "1.5rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
},
{
  label: "同比",
  key: "monthOnMonth",
  sortable: true,
  width: "2rem",
  align: "right"
},
{
  label: "租售比",
  key: "rentalSalesRatio",
  sortable: true,
  width: "1.8rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  unit: '%'
},
{
  label: "销售额(万元)",
  key: "sales",
  sortable: true,
  width: "2.6rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  changeNum: 10000
},
{
  label: "环比",
  key: "chainComparison",
  width: "2rem",
  sortable: true,
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  unit: '%'
},
{
  label: "达成率",
  key: "achievementRate",
  width: "2rem",
  sortable: true,
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  unit: '%'
},
];
const yearColumns = [{
  label: "序号",
  width: "1.3rem",
  align: "left"
},
{
  label: "项目",
  key: "projectName",
  color: "#3B96BE",
  width: "2.5rem",
  align: "left",
},
{
  label: "平均月平效",
  key: "averageMonthlyBenefitsPerSquareMeter",
  sortable: true,
  width: "2.5rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2
},
{
  label: "销售额(万元)",
  key: "sales",
  sortable: true,
  width: "2.6rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  changeNum: 10000
},
{
  label: "同比",
  key: "yearOnYear",
  width: "2rem",
  sortable: true,
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  unit: '%'
},
];
const dayColumns = [{
  label: "序号",
  width: "1.3rem",
  align: "left"
},
{
  label: "项目",
  key: "projectName",
  color: "#3B96BE",
  width: "2.5rem",
  align: "left",
},
{
  label: "销售额(万元)",
  key: "yesterdaySales",
  sortable: true,
  width: "2.9rem",
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  changeNum: 10000
},
{
  label: "环比",
  key: "growth",
  width: "2.9rem",
  sortable: true,
  align: "right",
  numberFormat: true,
  numberPrecision: 2,
  unit: '%'
},
  /* {
    label: "达成率",
    key: "growth",
    width: "2.9333rem",
    sortable: true,
    align: "right",
  }, */
];
export default {
  name: "Home",
  data () {
    return {
      isLoadingCount: 0,
      isLoading: false,
      dData: [],
      mData: [],
      yData: [],
      dTotalRow: '',
      mTotalRow: '',
      yTotalRow: '',
      table: {
        mode: "month",
        columns: monthColumns,
        totalRow: null,
        dataList: [],
      },
      queryParams: {
        yearMonth: this.$route.query.yearMonth,
        chargeType: parseInt(this.$route.query.chargeType),
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName,
      },
      lineops: {
        decimals: "xiaoshoupaiming",
        unit: "元/㎡",
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        },
        yAxis: {
          type: "value",
          boundaryGap: false,
        },
        series: [{
          type: "line",
          lineStyle: {
            color: "#3AABFF",
          },
          areaStyle: {
            normal: { //自定义颜色，渐变色填充折线图区域
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                //渐变色
                //渐变色
                [{
                  offset: 0,
                  color: 'rgba(45, 159, 203, 0.2)'
                }, {
                  offset: 0.62,
                  color: 'rgba(255, 255, 255, 0.48)'
                }]),
            },
          },
        },
        {
          type: "line",
          lineStyle: {
            color: "#9BB3C6",
          },
        },
        ],
      },
      show: true,
      chartsTitle: "平效(元/m²)",
      collapseable: true,
      groups: [],
      searchTypeList: [{
        label: "",
        key: "wylx",
        selectedCode: 1,
        values: [{
          name: "平效",
          code: 1,
          value: 'px'
        },
        {
          name: "销售额(万元)",
          code: 2,
          value: 'xse'
        },
        {
          name: "租售比",
          code: 0,
          value: 'zsb'
        },
        ],
      }],
    }
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  created () {
    //this.getStoreType();
    this.queryData();
    this.getTable()

  },
  mounted () {
    this.setData({
      "groups": [this.getGroups]
    });
    console.log(this.groups)
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      this.queryData();
      this.getTable()
    },
    setIsLoading () {
      this.isLoading = false;
    },
    addIsLoadingCount () {
      this.isLoadingCount++;
    },
    decreaseIsLoadingCount () {
      if (this.isLoadingCount <= 0) return;
      this.isLoadingCount--;
      if (this.isLoadingCount === 0) {
        this.$lodash.debounce(this.setIsLoading, 300)()
      }
    },
    //跳转月销售
    onRowColumnClick (e) {
      if (e.detail.column.key == "projectName") {
        this.$router.push({
          path: '/xiaoshou/month',
          query: {
            projectId: e.detail.row.projectId,
            projectName: e.detail.row.projectName,
            yearMonth: this.queryParams.yearMonth,
            chargeType: this.queryParams.chargeType
          }
        })
      }

    },
    //获取图表和表格数据
    async queryData () {
      this.addIsLoadingCount()
      let res = await this.$axios.saleServe.getSaleData(this.queryParams)
      this.decreaseIsLoadingCount()
      let monthSalesChart = [];
      let prevMonthSalesChart = [];
      const data = res.data;
      const year = this.queryParams.yearMonth.split("-")[0];
      const lastYear = String(year - 1);
      const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"];
      this.pxCharData = data.benefitsPerSquareMeterEchart[0].benefitsPerSquareMeterList;
      this.pxPrevYearCharData = data.benefitsPerSquareMeterEchart[1].benefitsPerSquareMeterList;
      data.monthlySalesEchart[0].sales.map(item => {
        monthSalesChart.push(item / 10000)
      })
      data.monthlySalesEchart[1].sales.map(item => {
        prevMonthSalesChart.push(item / 10000)
      })
      this.monthSalesChart = monthSalesChart;
      this.prevMonthSalesChart = prevMonthSalesChart;
      this.zsbChart = data.rentalSalesRatioEchart[0].rentalSalesRatio;
      this.prevZsbChart = data.rentalSalesRatioEchart[1].rentalSalesRatio;
      this.lineops.legend = {
        data: legendData
      };
      this.$set(this.lineops.series[0], 'name', legendData[0]);
      this.$set(this.lineops.series[1], 'name', legendData[1]);
      if (this.chartsTitle.includes("租售比")) {
        this.$set(this.lineops.series[0], 'data', this.zsbChart);
        this.$set(this.lineops.series[1], 'data', this.prevZsbChart);
      } else if (this.chartsTitle.includes("平效")) {
        this.$set(this.lineops.series[0], 'data', this.pxCharData);
        this.$set(this.lineops.series[1], 'data', this.pxPrevYearCharData);
      } else {
        this.$set(this.lineops.series[0], 'data', this.monthSalesChart);
        this.$set(this.lineops.series[1], 'data', this.prevMonthSalesChart);
      }
    },
    async getTable () {
      this.addIsLoadingCount()
      let dData = [];
      let mData = [];
      let yData = [];
      let dTotalRow = '';
      let mTotalRow = '';
      let yTotalRow = '';
      let res = await this.$axios.saleServe.getSaleTableData(this.queryParams);
      this.decreaseIsLoadingCount()
      res.data.yesterdayList.map(item => {
        if (!item.isSummary) {
          dData.push(item)
        } else {
          dTotalRow = item
        }
      })
      res.data.monthList.map(item => {
        if (!item.isSummary) {
          mData.push(item)
        } else {
          mTotalRow = item
        }
      })
      res.data.yearList.map(item => {
        if (!item.isSummary) {
          yData.push(item)
        } else {
          yTotalRow = item
        }
      })
      if (this.table.mode === "day") {
        this.table.dataList = dData;
        this.table.totalRow = dTotalRow;
      } else if (this.table.mode === "month") {
        this.table.totalRow = mTotalRow;
        this.table.dataList = mData;
      } else {
        this.table.totalRow = yTotalRow;
        this.table.dataList = yData;
      }
      this.dData = dData;
      this.dTotalRow = dTotalRow;
      this.mTotalRow = mTotalRow;
      this.mData = mData;
      this.yTotalRow = yTotalRow;
      this.yData = yData;
      console.log(mData)
    },
    //获取筛选类型
    bindselected (e) {
      e.detail.forEach((item) => {
        let temp = item.split("-");
        let key = temp[0];
        let value = temp[1];
        if (key === "chargeType") {
          this.setData({
            ["queryParams.chargeType"]: value,
          });
        }

        if (key === "stage") {
          this.setData({
            "queryParams.stage": value,
          });
        }
      });
      this.queryData();
      this.getTable();
    },
    bindopen () {
      //this.show = true;
    },
    bindclose () {
      //this.show = false;
    },
    search (item) {
      this.queryParams = {
        yearMonth: this.queryParams.yearMonth,
        ...item
      }
      this.queryData();
      this.getTable();
      console.log(item);
    },
    dateSelected (date) {
      this.queryParams.yearMonth = date;
      this.queryData();
      this.getTable();
      console.log(date);
    },
    //选择销售类型
    searchType (item) {
      let curChartData = [];
      let prevCartData = [];
      let decimals = "";
      let unit = "";
      if (item.wylx.value === "px") {
        (curChartData = this.pxCharData), (prevCartData = this.pxPrevYearCharData), (decimals =
          "xiaoshoupaiming"), (unit =
            "元/㎡");
      }

      if (item.wylx.value === "xse") {
        (curChartData = this.monthSalesChart), (prevCartData = this.prevMonthSalesChart);
        (decimals = "paiming"), (unit = "万元");
      }

      if (item.wylx.value === "zsb") {
        (curChartData = this.zsbChart), (prevCartData = this.prevZsbChart);
        (decimals = ""), (unit = "%");
      }


      /* this.chartsTitle = e.detail.title + "(" + e.detail.unit + ")", */
      this.chartsTitle = item.wylx.name;
      this.lineops.decimals = decimals;
      this.lineops.unit = unit;
      this.lineops.series[0].data = curChartData;
      this.lineops.series[1].data = prevCartData;
      console.log(item);
    },
    //项目排名类型-昨日/当月/年累计
    onListModeChanged (e) {
      const mode = e.target.dataset.value;
      if (this.table.mode !== mode) {
        if (mode === "month") {
          this.table.columns = monthColumns;
          this.table.totalRow = this.mTotalRow;
          this.table.dataList = this.mData;
        } else if (mode === "year") {
          this.table.columns = yearColumns;
          this.table.totalRow = this.yTotalRow;
          this.table.dataList = this.yData;
        } else {
          this.table.columns = dayColumns;
          this.table.totalRow = this.dTotalRow;
          this.table.dataList = this.dData;
        }
        this.table.mode = mode;
      }
    }
  }
}
</script>
