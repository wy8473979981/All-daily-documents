<template>
  <div class="shuju-qiankuan-details" v-webTitle :data-title="`欠费-商家排名`">
    <div class="header-top">
      <ys-n-nav-bar :title="`欠费-商家排名`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :selected="selectedProj" @projeSelected="onProjectSelected"></ys-n-project-select>
          </div>
          <div class="app-header-right">
            <ys-n-date-pick :type="`year-month`" @selected="onDateChanged" :selected="query.yearMonth"></ys-n-date-pick>
          </div>
        </div>
      </div>
      <div class="tab-container">
        <ys-n-tab :tabList="tabList" :currentTab="currentTab" @selected="tabClickFunc"></ys-n-tab>
      </div>
    </div>

    <ys-n-section title="欠费账龄（当前）" collapseable>
      <div class="qiankua-xiagnqing">
        <div class="qiankuan-item">
          <div class="qiankuan-item-title"> 30天以下 </div>
          <div class="qiankuan-item-num">
            <div class="item-num">{{$util.numberFormat( detail.withIn30Days )}}</div>
            <div class="item-unit">万元</div>
          </div>
        </div>
        <div class="qiankuan-item">
          <div class="qiankuan-item-title"> 30-60天 </div>
          <div class="qiankuan-item-num">
            <div class="item-num">{{$util.numberFormat( detail.with30To60Days) }}</div>
            <div class="item-unit">万元</div>
          </div>
        </div>
        <div class="qiankuan-item">
          <div class="qiankuan-item-title"> 60-90天 </div>
          <div class="qiankuan-item-num">
            <div class="item-num">{{ $util.numberFormat(detail.with60To90Days) }}</div>
            <div class="item-unit">万元</div>
          </div>
        </div>
        <div class="qiankuan-item">
          <div class="qiankuan-item-title"> 90天以上 </div>
          <div class="qiankuan-item-num">
            <div class="item-num">{{$util.numberFormat( detail.moreThan90Days) }}</div>
            <div class="item-unit">万元</div>
          </div>
        </div>
      </div>
    </ys-n-section>

    <ys-n-section :title="activeTab" collapseable>
      <ys-n-echart :options="lineops"></ys-n-echart>
    </ys-n-section>

    <ys-n-section title="欠费排名" :hasTable="true">
      <ys-n-table :columns="table.columns" :values="table.dataList" :total-row="table.totalRow" @row-click="onRowClick" :fixednum="2" :mode="table.mode"></ys-n-table>

      <div slot="head-actions">
        <div class="list-mode">
          <span :class="'list-mode-item ' + (table.mode === 'month' ? 'active' : '')" @click="onListModeChanged" data-value="month">当月</span>
          <span class="line"> | </span>
          <span :class="'list-mode-item ' + (table.mode === 'year' ? 'active' : '')" @click="onListModeChanged" data-value="year">年累计</span>
        </div>
      </div>
    </ys-n-section>
  </div>
</template>

<script>

import { detailColumns } from '../columns/listColumns'

export default {
  data() {
    return {
      routerParams: this.$route.query,
      query: {
        chargeType: "",//物业类型,1购物中心,2商业街,0全部
        feeType: "1",//费项,1租金,2物管,3多经
        yearMonth: "",//年月,格式yyyy-MM
        projectId: null,
      },
      selectedProj: {
        label: null,
        projectId: null,
      },
      detail: {
        withIn30Days: null,
        with30To60Days: null,
        with60To90Days: null,
        moreThan90Days: null,
      },
      lineops: {},
      tableData: null,
      table: {
        mode: "month",
        columns: detailColumns,
        dataList: [],
        totalRow: null,
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
        "query.chargeType": this.routerParams.chargeType,
        "query.projectId": this.routerParams.projectId,
        "query.yearMonth": this.routerParams.yearMonth,
        "query.feeType": this.routerParams.feeType,
        currentTab: this.routerParams.feeType,
      });
      this.queryOweFeeAging();
      this.getEchartData();
      this.getTableData();
    } catch (e) {
      console.log(e)
    }
  },
  methods: {

    onDateChanged(e) {
      try {
        this.setData({
          "queryModel.yearMonth": e,
        });
        this.queryOweFeeAging();
        this.getEchartData();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    },

    async queryOweFeeAging() {
      try {
        await this.$axios.qianfeiServe.queryOweFeeAging({ ...this.query })
          .then((res) => {
            if (res.code == 1) {
              this.detail = res.data;
            }
          });
      } catch (e) {
        console.log(e)
      }
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
        this.queryOweFeeAging();
        this.getEchartData();
        this.getTableData();
      } catch (e) {
        console.log(e)
      }
    },

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
                      color: "#FF4954",
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


    onTabChanged(e) {
      try {
        if (e.detail.value === "wg") {
          this.page.tabActiveIndex = 1;
        } else {
          this.page.tabActiveIndex = 0;
        }
        this.setData({
          "query.type": e.detail.value,
        });
        this.loadData();
      } catch (e) {
        console.log(e)
      }
    },

    onProjectSelected(item) {
      try {
        if (item.shortName !== "全部") {
          this.setData({
            ["query.projectId"]: (item && item.projectId) || "",
            ["query.projectName"]: (item && item.shortName) || "",
          });
          this.queryOweFeeAging();
          this.getEchartData();
          this.getTableData();
        }
      } catch (e) {
        console.log(e)
      }
    },

    onDateChanged(data) {
      try {
        this.setData({
          "query.yearMonth": data,
        });
        this.queryOweFeeAging();
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

    onRowClick(e) {
      let url = '../sjfx/index.html#/pages/sjgl/sjxx/sjxx?bisShopId=' + e.detail.row.id
      window.location.href = url
    },

  },
};
</script>
<style type="text/css" lang="scss" scoped>
::v-deep .tab-list-box {
  padding: 0 144px;
}
.list-mode-item {
  font-size: 28px;
}

.list-mode-item.active {
  color: #3992ba;
  font-size: 32px;
  font-weight: bold;
}
.qiankua-xiagnqing {
  display: flex;
  padding: 28px 60px;
  flex-wrap: wrap;
  background-color: #fff;
  margin: 20px 0;
}
.qiankuan-item {
  width: 40%;
  margin-bottom: 15px;
}
.qiankuan-item-title {
  color: #757575;
  font-size: 24px;
}
.qiankuan-item-num {
  display: flex;
  align-items: center;
}
.item-num {
  color: #ff120d;
  font-size: 36px;
}
.item-unit {
  font-size: 20px;
  padding-top: 10px;
  color: #b0b0b0;
  margin-left: 5px;
}
</style>
