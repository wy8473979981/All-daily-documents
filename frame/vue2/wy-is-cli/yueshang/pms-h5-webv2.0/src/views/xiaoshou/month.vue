<template>
  <div class="xiaoshou" v-webTitle :data-title="`月销售`">
    <div class="header-top">
      <ys-n-nav-bar :title="`月销售`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selected" @projeSelected="projeSelected" :disabledAll="false"></ys-n-project-select>
            <!-- <ys-n-dialog :projectId="params.projectId"></ys-n-dialog> -->
          </div>
          <div class="app-header-right">
            <ys-n-date-pick type="year" @selected="dateSelected" :selected="params.year"></ys-n-date-pick>
            <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></ys-n-filter-dialog>
          </div>
        </div>
      </div>
    </div>
    <ys-n-section title="平效（元/㎡）" :collapseable="true" v-if="show">
      <ys-n-echart :options="page.mainOps" canvasId="xiaoshou1"></ys-n-echart>
    </ys-n-section>
    <ys-n-section title="业态" v-if="show">
      <span class="title-unit" slot="head-title" v-if="mode === 'xse'">（万元）</span>
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (mode === 'xse' ? 'active' : '')" data-value="xse" @click="onModeChanged">销售额</span>｜
          <span :class="'list-mode-item ' + (mode === 'zlb' ? 'active' : '')" data-value="zlb" @click="onModeChanged">租售比</span>
        </div>
      </div>
      <ys-n-echart :options="page.kindOps" canvasId="xiaoshou2"></ys-n-echart>
    </ys-n-section>
    <ys-n-section title="商家销售排名" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + ( page.table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>｜
          <span :class="'list-mode-item ' + ( page.table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
        </div>
      </div>
      <ys-n-table :fixednum="1" :totalRow="page.table.totalRow" :mode="page.table.mode" :values="page.table.dataList" :columns="page.table.columns" @row-click="onRowClick"></ys-n-table>
    </ys-n-section>
  </div>
</template>

<script>

import { mapMutations, mapGetters } from "vuex";
const monthColumns = [
  {
    label: "商家",
    key: "shopName",
    width: "3.5rem",
    fixed: true,
    align: "left",
    color: '#3B96BE'
  }, {
    label: "平效",
    key: "benefitsPerSquareMeter",
    sortable: true,
    width: "1.5rem",
    align: "right"
  }, {
    label: "租售比",
    key: "rentalSalesRatio",
    unit: "",
    width: "1.8rem",
    sortable: true,
    align: "right"
  }, {
    label: "销售额(万元)",
    key: "sales",
    width: "2.7rem",
    sortable: true,
    align: "right",
    numberFormat: true,
    numberPrecision: 2,
    changeNum: 10000
  }];
const yearColumns = [
  {
    label: "商家",
    key: "shopName",
    width: "3.5rem",
    fixed: true,
    align: "left",
    color: '#3B96BE'
  }, {
    label: "销售额(万元)",
    key: "sales",
    width: "2.6rem",
    sortable: true,
    align: "right",
    numberFormat: true,
    numberPrecision: 2,
    changeNum: 10000
  }, {
    label: "同比",
    key: "yearOnYear",
    width: "1.7rem",
    align: "right"
  }, {
    label: "销售额完成率",
    key: "achievementRate",
    width: "2.7rem",
    sortable: true,
    align: "right"
  }];
export default {
  name: "Home",
  data() {
    return {
      salesRatio: [], //业态销售比
      sales: [], //业态销售额
      mode: "xse",
      show: true,
      columns: monthColumns,
      params: {
        year: this.getYear(this.$route.query.yearMonth),
        chargeType: parseInt(this.$route.query.chargeType),
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName,
      },
      selected: {
        label: this.$route.query.projectName,
        projectId: this.$route.query.projectId
      },
      page: {
        table: {
          mode: "month",
          columns: monthColumns,
          dataList: []
        },
        mainOps: {
          unit: "元/㎡",
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
        kindOps: {
          unit: '万元',
          grid: {
            bottom: 60,
          },
          color: ["#EA6B00", "#1890FF", "#02DFFF", "#FFCE49", "#1EFBB8", "#AAAAAA", "#770077", "#FF77FF", "#9F88FF",
            "#77FF00"
          ],
          legend: {
            data: ["主力店", "餐饮", "服装", "配套", "儿童"]
          },
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
            name: "主力店"
          }, {
            type: "line",
            name: "餐饮"
          }, {
            type: "line",
            name: "服装"
          }, {
            type: "line",
            name: "配套"
          }, {
            type: "line",
            name: "儿童"
          }]
        }
      },
      groups: [],
      leaderDetail: {
        userName: '',
        resultList: '',
        attendWorkDate: '',
        mobilePhone: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  created() {
    //this.getStoreType();
    this.loadData();
    this.getlayouEchartData();
    this.businessSortEchartData();
    //this.getDilogInfo();
  },
  methods: {
    //获取筛选类型
    bindselected(e) {
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
    bindopen() {
      //this.show = true;
    },
    bindclose() {
      //this.show = false;
    },
    //获取弹窗信息
    /* async getDilogInfo() {
      let res = await this.$axios.saleServe.getDilogInfo({
        projectId: this.params.projectId
      });
      this.leaderDetail = res.data
    }, */
    onRowClick(e) {
      let url = '../sjfx/index.html#/pages/sjgl/sjxx/sjxx?bisShopId=' + e.detail.row.shopId
      window.location.href = url
    },
    /**
     * 切换 当月/年累计
     */
    onListModeChanged(e) {
      const mode = e.target.dataset.value;
      if (this.page.table.mode !== mode) {
        if (mode === "month") {
          this.setData({
            "page.table.mode": mode,
            "page.table.columns": monthColumns,
            "page.table.dataList": this.monthlyRanking,
            "page.table.totalRow": this.monthTotleRow
          });
        } else {
          this.setData({
            "page.table.mode": mode,
            "page.table.columns": yearColumns,
            "page.table.dataList": this.yearlyRanking,
            "page.table.totalRow": this.yearTotleRow
          });
        }
      }
    },
    //业态类型选择
    onModeChanged(e) {
      console.log(this.layoutSalesArr);
      this.mode = e.target.dataset.value;
      if (this.mode === "xse") {
        let data = []
        this.sales.map((item, i) => {
          data.push({
            data: item,
            type: 'line',
            name: this.legendData[i]
          })
        })
        this.setData({
          "page.kindOps.series": data,
          "page.kindOps.unit": '万元'
        })
      } else {
        let data = []
        this.salesRatio.map((item, i) => {
          data.push({
            data: item,
            type: 'line',
            name: this.legendData[i]
          })
        })
        this.setData({
          "page.kindOps.series": data,
          "page.kindOps.unit": '%'
        })
      }

    },
    /**
     * 按年图表
     */
    async loadData() {
      let res = await this.$axios.saleServe.pxEchartData(this.params)
      const year = this.params.year;
      const lastYear = String(year - 1);
      const legendData = [year.substring(2) + "年度", lastYear.substring(2) + "年度"]; // 当年平效
      this.setData({
        "page.mainOps.legend.data": legendData,
        "page.mainOps.series[0].name": legendData[0],
        "page.mainOps.series[0].data": res.data[0].benefitsPerSquareMeterList,
        "page.mainOps.series[1].name": legendData[1],
        "page.mainOps.series[1].data": res.data[1].benefitsPerSquareMeterList
      });
    },
    //获取业态数据
    async getlayouEchartData() {
      let res = await this.$axios.saleServe.layouEchartData(this.params)
      let legendData = []
      let sales = []
      let salesRatio = []
      this.page.kindOps.series = []
      if (res.data) {
        res.data.map((item, i) => {
          sales[i] = [];
          salesRatio[i] = [];
          legendData.push(item.primaryForms)
          item.sales.map((obj, j) => {
            sales[i].push(obj.sales / 10000)
          })
          item.rentalSalesRatio.map(obj => {
            salesRatio[i].push(obj.rentalSalesRatio * 100)
          })
        });
        if (this.mode == 'xse') {
          let data = []
          sales.map((item, i) => {
            data.push({
              data: item,
              type: 'line',
              name: legendData[i]
            })
          })
          this.setData({
            "page.kindOps.series": data,
            "page.kindOps.legend.data": legendData,
            "sales": sales,
            "salesRatio": salesRatio,
            "legendData": legendData
          })
        } else {
          let data = []
          salesRatio.map((item, i) => {
            data.push({
              data: item,
              type: 'line',
              name: legendData[i]
            })
          })
          this.setData({
            "page.kindOps.series": data,
            "page.kindOps.legend.data": legendData,
            "sales": sales,
            "salesRatio": salesRatio,
            "legendData": legendData
          })
        }

      }
    },
    //获取商家排名
    async businessSortEchartData() {
      let monthlyRanking = [];
      let yearlyRanking = [];
      let monthTotleRow = '';
      let yearTotleRow = '';
      let res = await this.$axios.saleServe.businessSortData(this.params)
      res.data.monthlyRanking.map(item => {
        if (item.shopId) {
          monthlyRanking.push(item)
        } else {
          monthTotleRow = item
        }
      })
      res.data.yearlyRanking.map(item => {
        if (item.shopId) {
          yearlyRanking.push(item)
        } else {
          yearTotleRow = item
        }
      })
      this.monthlyRanking = monthlyRanking
      this.yearlyRanking = yearlyRanking
      this.monthTotleRow = monthTotleRow
      this.yearTotleRow = yearTotleRow
      this.page.table.totalRow = monthTotleRow
      this.page.table.dataList = monthlyRanking
    },
    //获取年份
    getYear(year) {
      if (year) {
        return year.split("-")[0];
      }
    },
    search(item) {
      this.params.chargeType = item.storeType;
      this.loadData();
      this.getlayouEchartData();
      this.businessSortEchartData();
    },
    projeSelected(item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
        ["selected.projectId"]: (item && item.projectId) || "",
        ["selected.label"]: (item && item.shortName) || "",
      });
      this.loadData();
      this.getlayouEchartData();
      this.businessSortEchartData();
    },
    dateSelected(date) {
      this.params.year = date;
      this.loadData();
      this.getlayouEchartData();
      this.businessSortEchartData();
    },
  }
}
</script>

<style lang="scss" scoped>
.app-header-left {
  display: flex;
  align-items: center;
}

.list-mode-item {
  font-size: 28px;

  &.active {
    color: #3992ba;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
