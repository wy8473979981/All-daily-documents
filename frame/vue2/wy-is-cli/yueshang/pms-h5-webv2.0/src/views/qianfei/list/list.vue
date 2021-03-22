<template>
  <div class="shuju-qiankuan-list" v-webTitle :data-title="`欠费-项目列表`">
    <div class="header-top">
      <ys-n-nav-bar :title="`欠费-项目列表`" />

      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left"></div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="onDateChanged" :selected="query.yearMonth"></ys-n-date-pick>
            <ys-n-filter-dialog :groups="groups" @selected="bindselected" title="筛选" @open="bindopen" @close="bindclose"></ys-n-filter-dialog>
          </div>
        </div>
      </div>
      <div class="tab-container">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>

    <ys-n-section :title="activeTab" collapseable>
      <ys-n-echart :options="lineops"></ys-n-echart>
    </ys-n-section>

    <ys-n-section title="欠费排名" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>
          <span class="line"> | </span>
          <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
        </div>
      </div>
      <ys-n-table :fixednum="2" :columns="listColumns" :values="table.dataList" :totalRow="table.totalRow" @row-column-click="onRowColumnClick" :mode="table.mode"></ys-n-table>
    </ys-n-section>
  </div>
</template>

<script>

import { listColumns } from '../columns/listColumns'
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      query: {
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        feeType: "1",//费项,1租金,2物管,3多经
        yearMonth: "",//年月,格式yyyy-MM
      },
      currentTab: '1',// tab 默认选中值
      activeTab: "租金欠费（万元）",
      tabList: [
        {
          name: "租金欠费",
          code: "1",
        },
        {
          name: "物管欠费",
          code: "2",
        }
      ],
      routerParams: this.$route.query,
      lineops: {},
      table: {
        mode: "month",
        dataList: [],
        totalRow: null
      },
      tableData: null,
      listColumns: listColumns,
      show: true,
      groups: [],
      groupSelected: [],
      tabActiveIndex: 0
    };
  },
  computed: {
    ...mapGetters(['getGroups']),
  },
  components: {},
  props: {},
  mounted() {
    try {
      this.setData({
        "query.yearMonth": this.routerParams.yearMonth,
        "query.chargeType": this.routerParams.chargeType,
        "groups": [this.getGroups]
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
        await this.$axios.qianfeiServe.queryOweFeeLineChart({ ...this.query })
          .then((res) => {
            if (res.code == 1) {
              let oweContList = res.data.oweContList.map(item => {
                return item / 10000;
              });//合同欠费
              let oweQzList = res.data.oweQzList.map(item => {
                return item / 10000;
              });//权责欠费

              const legendData = ['欠费(合同)', '欠费(权责)'];
              this.lineops = {
                color: ['#FF4954', '#D4B6BD'],
                legend: { data: legendData, icon: "circle", itemHeight: 7 },
                xAxis: { type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], },
                yAxis: { type: "value" },
                unit: "万元",
                series: [
                  {
                    type: "line",
                    name: legendData[0],
                    lineStyle: {
                      color: "#FF4954",
                    },
                    data: oweContList,
                    areaStyle: {
                      //color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "#CFDFFE", }, { offset: 1, color: "#FFFFFF", }]), 
                      normal: { //自定义颜色，渐变色填充折线图区域
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, //变化度
                          //渐变色 
                          [{
                            offset: 0,
                            color: '#FF4954'
                          }, {
                            offset: 0.62,
                            color: "#ffffff"
                          }]),
                      }
                    },
                  },
                  {
                    type: "line",
                    lineStyle: {
                      color: "#D4B6BD",
                    },
                    name: legendData[1],
                    data: oweQzList,
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
        await this.$axios.qianfeiServe.queryOweFeeRanking({ ...this.query })
          .then((res) => {
            if (res.code == 1) {
              this.tableData = res.data;
              let { oweFeeRankingWhenMonth, oweFeeRankingWhenYear } = this.tableData;
              if (this.table.mode == 'month') {
                this.setData({
                  "table.dataList": oweFeeRankingWhenMonth.slice(0, -1),
                  "table.totalRow": oweFeeRankingWhenMonth.slice(-1)[0]
                });
              } else {
                this.setData({
                  "table.dataList": oweFeeRankingWhenYear.slice(0, -1),
                  "table.totalRow": oweFeeRankingWhenYear.slice(-1)[0]
                });
              }
            }
          });
      } catch (e) {
        console.log(e)
      }
    },

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

    async tabClickFunc(data) {
      try {
        if (data == 1) {
          this.setData({
            "query.feeType": data,
            currentTab: data,
            activeTab: '租金欠费（万元）'
          });
        } else {
          this.setData({
            "query.feeType": data,
            currentTab: data,
            activeTab: '物管欠费（万元）'
          });
        }
        this.getEchartData();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    },

    onDateChanged(data) {
      try {
        this.setData({
          "query.yearMonth": data,
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
          let { oweFeeRankingWhenMonth, oweFeeRankingWhenYear } = this.tableData;
          if (this.table.mode == 'month') {
            this.setData({
              "table.mode": mode,
              "table.dataList": oweFeeRankingWhenMonth.slice(0, -1),
              "table.totalRow": oweFeeRankingWhenMonth.slice(-1)[0]
            });
          } else {
            this.setData({
              "table.mode": mode,
              "table.dataList": oweFeeRankingWhenYear.slice(0, -1),
              "table.totalRow": oweFeeRankingWhenYear.slice(-1)[0]
            });
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    bindselected(e) {
      try {
        e.detail.forEach((item) => {
          let temp = item.split("-");
          let key = temp[0];
          let value = temp[1];
          if (key === "chargeType") {
            this.setData({
              ["query.chargeType"]: value,
            });
          }
        });
        this.getEchartData();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    },

    onRowColumnClick(e) {
      try {
        let params = {
          projectId: e.detail.row.id,
          projectName: e.detail.row.name,
          yearMonth: this.query.yearMonth,
          feeType: this.query.feeType,
          chargeType: this.query.chargeType
        }

        this.$router.push({
          path: '/qianfei/detail',
          query: { ...params }
        })
      } catch (e) {
        console.log(e)
      }
    },

  }
};
</script>
<style type="text/css" lang="scss" scoped>
::v-deep .tab-list-box {
  padding: 0 144px 0 131px;
}
</style>