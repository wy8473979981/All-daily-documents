<template>
  <div v-webTitle :data-title="`时段客流对比`">
    <div class="header-top">
      <ys-n-nav-bar :title="`时段客流对比`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-filter-dialog :checkboxes="projectList" @selected="bindselected" tip="注意：最少选两项" title="项目筛选"></ys-n-filter-dialog>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`date`" @selected="onDateChanged" :selected="params.startDate" :range="true" :selectedRange="params.endDate" @selectedRange="onRangeDateChanged"></ys-n-date-pick>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section title="项目客流(人)" v-if="show">
        <ys-n-echart :options="options"></ys-n-echart>
      </ys-n-section>
      <ys-n-section title="项目排名" :hasTable="true">
        <ys-n-table :values="dataList" :columns="columns"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false, isLoadingCount: 0,
      routerParams: this.$route.query,
      show: true,
      params: {
        projectIdList: "",
        startDate: "",
        endDate: ""
      },
      dataList: [],
      options: {
        unit: "人",
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
        tb: true,
        precision: 0
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
      columns: [
        {
          label: "排名"
        }, {
          label: "项目",
          key: "projectName",
          align: "left"
        }, {
          label: "客流",
          key: "passengerFlow",
          sortable: true,
          align: "right",
          width: "2.9333rem",
          numberFormat: true,
          numberPrecision: 0,
        }, {
          label: "同比",
          key: "growthRate",
          sortable: true,
          align: "right",
          unit: "%",
          numberPrecision: 2,
        }
      ]
    };
  },

  components: {},
  props: {},
  mounted () {
    try {
      this.setData({
        ["params.projectIdList"]: this.routerParams.ids.split(',')
      });

      let pre = (new Date).getTime() - 24 * 60 * 60 * 1000;
      let yesterday = new Date(pre);
      let startDate = yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
      let endDate = this.$util.getDefaultDate('day');

      this.setData({
        ["params.startDate"]: startDate,
        ["params.endDate"]: endDate
      });
      console.log(this.params)
      this.getDataDetail();
      this.getTableData();
      this.getAllTableData()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    onRefresh () {
      this.getDataDetail();
      this.getTableData();
      this.getAllTableData()
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
    setIsLoading () {
      this.isLoading = false;
    },
    bindopen () {
      this.setData({
        show: false
      });
    },

    bindclose () {
      this.setData({
        show: true
      });
    },
    async getDataDetail () {
      try {
        this.addIsLoadingCount()
        await this.$axios.keliuServe.queryTheNumberOfPassengersPerPeriodWithinTheDateRange(this.params).then((res) => {
          this.decreaseIsLoadingCount()
          if (res.code == 1) {
            let legend = [];
            let series = [];
            res.data.forEach(item => {
              legend.push(item.projectName);
              series.push({
                type: "line",
                name: item.projectName,
                data: item.passengerFlow
              });
            });
            this.setData({
              ["options.xAxis.data"]: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
              ["options.legend.data"]: legend,
              ["options.series"]: series
            });
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getTableData () {
      try {
        this.addIsLoadingCount()
        await this.$axios.keliuServe.queryRankingOfItemsInDateRange({ ...this.params })
          .then((res) => {
            this.decreaseIsLoadingCount()
            if (res.code == 1) {
              this.setData({
                "dataList": res.data,
              });
            }
          });
      } catch (e) {
        console.log(e)
      }
    },

    async getAllTableData () {
      try {
        let queryModel = {
          chargeType: this.routerParams.chargeType,//物业类型,1购物中心,2商业街,0全部
          yearMonth: this.$util.getDefaultDate("month"),
          yearMonthDay: this.$util.getDefaultDate("day"),
        };
        this.addIsLoadingCount()
        await this.$axios.keliuServe.queryPassengerFlowForPassengerFlowRanking({ ...queryModel })
          .then((res) => {
            this.decreaseIsLoadingCount()
            if (res.code == 1) {
              let data = res.data.passengerFlowWhenCurDayForPassengerFlowComparisonList.slice(0, -1);
              let dataList = data.map((item, index) => {
                return {
                  ...item,
                  ranking: index,
                  label: item.projectName
                };
              });
              this.setData({
                "projectList": dataList,
              });
            }
          });
      } catch (e) {
        console.log(e)
      }
    },

    onDateChanged (time) {
      try {
        this.setData({
          "params.startDate": time
        });

        if (this.params.startDate && this.params.endDate) {
          this.getDataDetail();
        }
      } catch (e) {
        console.log(e)
      }
    },

    onRangeDateChanged (time) {
      try {
        this.setData({
          "params.endDate": time
        });

        if (this.params.startDate && this.params.endDate) {
          this.getDataDetail();
        }
      } catch (e) {
        console.log(e)
      }
    },

    bindselected (e) {
      try {
        let ids = e.detail.map(item => item.projectId);
        this.setData({
          ["params.projectIdList"]: ids
        });
        this.getDataDetail();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    }
  }
};
</script>
<style type="span/css" lang="scss" scoped>
</style>
