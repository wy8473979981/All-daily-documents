<template>
  <div v-webTitle :data-title="`客流监控`">
    <div class="header-top">
      <ys-n-nav-bar :title="`客流监控`" />
      <!-- <div class="updata-time">数据更新时间：2020-11-10 数据来源系统：PMS系统</div> -->
    </div>

    <div class="wrapper">
      <ys-n-section title="最近7天客流" :subtitle="workDayAvg ? '（工作日均' + workDayAvg + '/周末日均' + holidayAvg + ')' : ''" :collapseable="collapseable">
        <ys-n-echart :options="lineops" canvasId="jiankong1"></ys-n-echart>
      </ys-n-section>
      <ys-n-section title="同比（单位：万人）">
        <ys-n-echart :options="barops" canvasId="jiankong2"></ys-n-echart>
      </ys-n-section>
    </div>

    <div class="wrapper" style="margin-top: 0.16rem">
      <ys-n-section title="考核指标" :hasTable="true">
        <div class="content">
          <div style="width: 2.1333rem">
            <div class="left-header">项目</div>
            <div class="left-item">{{ bisProjectShortName }}</div>
            <div class="left-header" style="font-size: 0.24rem">商场面积</div>
            <div class="left-item" style="font-size: 0.24rem">{{ area }}</div>
          </div>
          <ys-n-table style="flex: 1;" :values="dataList" :columns="columns" :totalRow="totalRow"></ys-n-table>
        </div>
      </ys-n-section>
    </div>
  </div>
</template>

<script>


import { columns } from '../columns/jiankongColumns'
import { Form } from 'vant';
export default {
  data() {
    return {
      queryModel: {},
      routerParams: this.$route.query,
      updateTime: null,
      collapseable: true,
      lineops: {},
      barops: {},
      workDayAvg: "",
      holidayAvg: "",
      columns: columns,
      totalRow: null,
      dataList: [],
      bisProjectShortName: "",
      area: ""
    };
  },

  components: {},
  props: {},
  mounted() {
    try {
      this.setData({ queryModel: this.routerParams });

      this.getSevenDayData();
      this.getThreeYearsData();
      this.queryEvaluationIndex()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async getSevenDayData() {
      try {
        // 客流监控 - 查询最近7天客流折线图
        await this.$axios.keliuServe.queryTotalDailyPassengerFlowInRecentSevenDays({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let xAxis = [];
              let lineData = [];
              res.data.map(item => { xAxis.push(item.date + "日"); lineData.push(item.actualPassengerFlowOfDay); })
              this.lineops = {
                precision: 2,
                xAxis: { type: "category", data: xAxis, },
                yAxis: { type: "value" },
                unit: "人",
                series: [
                  {
                    type: "line",
                    name: '客流',
                    lineStyle: { color: "#3AABFF", },
                    data: lineData,
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
                  }
                ],
              };
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async getThreeYearsData() {
      try {
        // 客流监控 - 查询最近3年客流柱状图
        await this.$axios.keliuServe.queryPassengerFlowRecentThreeYears({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let xAxis = [];
              let lineData = [];
              res.data.map(item => { xAxis.unshift(item.year + "/1"); lineData.unshift(item.actualPassengerFlowOfYear / 10000); })
              this.barops = {
                unit: null,
                color: ["#3992BA"],
                legend: { show: false },
                xAxis: {
                  type: "category",
                  data: xAxis,
                  boundaryGap: true,
                  axisTick: { alignWithLabel: true },
                  splitLine: { show: false }
                },
                yAxis: { type: "value", boundaryGap: false },
                series: [{
                  name: "同比",
                  data: lineData,
                  type: "bar",
                  barWidth: "30%",
                  label: { show: true, position: "top", color: "#333" }
                }],
                tooltip: {
                  show: true,
                  trigger: "axis",
                  backgroundColor: "rgba(255,255,255,.7)",
                  borderColor: "#3992BA",
                  borderWidth: 1,
                  textStyle: { color: "#333" }
                }
              };
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    async queryEvaluationIndex() {
      try {
        // 客流监控 - 查询项目客流考核指标
        await this.$axios.keliuServe.queryEvaluationIndex({ ...this.queryModel })
          .then((res) => {
            if (res.code == 1) {
              let { data } = res
              this.dataList = data.dailyPassengerFlowDataOfTheMonths
              this.bisProjectShortName = data.projectName
              this.area = this.$util.numberFormat(data.square, { precision: 2, unit: '', type: false });
            }
          });
      } catch (e) {
        console.log(e)
      }
    },
    onSelectedColsOption(e) {
      console.log(e);
    },

    queryData() {
      app.globalData.request.options({
        loading: true
      }).get("/open/bis-open-report!ipvaPassengerFlowProject.action", this.queryModel).then(res => {
        const data = res.data;
        const ipvaLinePic = data.ipvaLinePic;
        const ipvaColumnPic = data.ipvaColumnPic.data;
        const xAxisData = [];
        const seriesData = [];
        ipvaColumnPic.forEach(item => {
          const a1 = item[0];
          const y1 = a1[0] + "/" + a1[1];
          xAxisData.push(y1);
          const a2 = item[1];
          seriesData.push(a2 === 0 ? 0 : (a2 / 10000).toFixed(2));
        });
        const sum = data.sums[0];
        const daysDetail = data.daysDetail;
        daysDetail.forEach(item => {
          const passengerFlow = item.passengerFlow;
          item.passengerFlow = passengerFlow.substring(0, passengerFlow.indexOf("-"));
        });
        const length = ipvaLinePic.projectData.data.length;

        if (length > 0) {
          const projectData = ipvaLinePic.projectData.data[0];
          this.setData({
            workDayAvg: projectData.holidayAvg,
            holidayAvg: projectData.holidayAvg,
            bisProjectShortName: projectData.bisProjectShortName
          });
        }

        this.setData({
          area: data.days[0].area,
          "lineops.xAxis.data": ipvaLinePic.lineX.map(item => {
            return item + "日";
          }),
          "lineops.series[0].data": ipvaLinePic.lineY,
          "barops.xAxis.data": xAxisData,
          "barops.series[0].data": seriesData,
          totalRow: {
            passengerFlow: sum.sumNum,
            targetNowNum: sum.targetSum,
            targetStr: sum.sumTargetStr,
            penetrationStr: sum.sumPenetrationStr
          },
          dataList: daysDetail
        });
      });
    }

  }
};
</script>
<style type="span/css" lang="scss" scoped>
.wrapper {
  background-color: #fff;
  padding-bottom: 10px;
}

/* .updata-time {
	font-size: 22px;
	line-height: 74px;
	text-align: center;
	color: #c5c5c5;
} */

.content {
  display: flex;
  font-size: 24px;
  color: #7d7e80;
}

.left-header {
  background-color: #f5f5f5;
  padding: 10px 20px;
  line-height: 1.5;
}

.left-item {
  color: #333333;
  padding: 20px 0 20px 20px;
  line-height: 1.5;
  word-wrap: break-word;
}

.select-indicator {
  color: #3992ba;
  font-size: 28px;
  display: flex;
  align-items: center;
}
.select-icon {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}
</style>