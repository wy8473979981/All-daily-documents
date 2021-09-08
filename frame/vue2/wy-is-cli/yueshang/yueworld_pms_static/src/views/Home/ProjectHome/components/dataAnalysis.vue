<template>
  <div class="detail-info pb-20">
    <div class="flex-ju-al-between">
      <ysn-flod :title-text="item.title" :show-flod="false" :flod="false" hidden-slot class="pl-6">
        <template #action>
          <el-radio-group v-if="item.titleRadiosOption" v-model="item.titleRadio" @change="radioChange">
            <el-radio v-for="(itemR,indexR) in item.titleRadiosOption" :key="indexR" :label="itemR.label">{{ itemR.name }}</el-radio>
          </el-radio-group>
        </template>
      </ysn-flod>
      <!-- <span class="pb pl-16 border-b1">{{ item.title }}</span> -->

    </div>
    <el-row class="pl-16 info-box" style="margin-bottom: 12px;">
      <el-col v-for="(item2, index2) in item.statisticalData" :key="index2" :span="6">
        <div class="text-14 pb-6 color-848382">{{ item2.name }}</div>
        <div class="text-20 d-flex">{{ item2.num }}
          <div v-if="item2.up" class="position-svg">
            <svg-icon icon-class="up" class="icon font-14" />
            <span class="up font-10">{{ item2.up }}%</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="item.circleData&&item.circleData.length>0" class="echarts-content pl-16" style="margin-top: -12px;">
      <el-row>
        <el-col v-for="(item3, index3) in item.circleData" :key="index3" :span="6">
          <div class="investment-echarts-container">
            <div :class="['investment-left-echarts','echart-circle'+modalIndex]" />
            <div class="investment-info">
              <div>{{ item3.t1 }}</div>
              <div>{{ item3.t2 }}</div>
            </div>
            <div v-if="item3.up&&item3.up!='0'" class="position-svg">
              <svg-icon icon-class="up" class="icon" />
              <span class="up">{{ item3.up }}%</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="item.series&&item.series.length>0" class="zhexiantu-box">
      <div v-if="item.seriesInfo" class="title pl-8 pr-8 flex-ju-between">
        <div class="flex-ju-al-between">
          <div class="mr-40 title-indent">{{ item.seriesInfo.title }}</div>
          <el-radio-group v-model="item.seriesInfo.titleRadio" @change="radioChange">
            <el-radio v-for="(itemR,indexR) in item.seriesInfo.titleRadiosOption" :key="indexR" :label="itemR.label">{{ itemR.name }}</el-radio>
          </el-radio-group>
        </div>
        <div class="flex-ju-al-between">
          <span class="point1 mr-4" />{{ item.seriesInfo.x1 }}
          <span class="point2 ml-8 mr-4" />{{ item.seriesInfo.x2 }}
        </div>
      </div>
      <div :id="'echarts-zhexian'+modalIndex" class="echarts-zhexiantu" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'

import { resizeEchartContent } from '@/utils/echarts'

export default {
  name: 'DataAnalysis',
  props: ['item', 'modalIndex'],
  data() {
    return {
      myChart2: null,
      option: null
    }
  },
  mounted() {
    const option = {
      series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#1C4C7F'
          }
        },
        radius: '100%',
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: false,
          itemStyle: {
            borderWidth: 1
          }
        },
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [1, '#E5E2DE']
            ]
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [{
          value: 30,
          detail: {
            offsetCenter: ['0%', '-20%']
          }
        }],
        title: {
          fontSize: 14
        },
        detail: {
          fontSize: 16,
          color: '#050101',
          fontWeight: 'normal',
          formatter: '{value}%'
        }
      }]
    }
    // gauge
    let i = 0
    if (this.item.circleData) {
      const allDivDocument = document.querySelectorAll('.echart-circle' + this.modalIndex)
      this.item.circleData.forEach(item2 => {
        option.series[0].data[0].value = item2.num
        const myChart = echarts.init(allDivDocument[i], null, { renderer: 'svg' })
        myChart.setOption(option)
        i++
      })
    }
    // 折线图

    const option2 = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      toolbox: {
        feature: {
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      color: ['#4AACD1', '#1C4C7F'],
      series: this.item.series
    }
    this.option = JSON.parse(JSON.stringify(option2))
    if (this.item.series && this.item.series.length > 0) {
      resizeEchartContent(`#echarts-zhexian${this.modalIndex}`, { height: false, width: false })
      this.myChart2 = echarts.init(document.getElementById('echarts-zhexian' + this.modalIndex), null, { renderer: 'svg' })
      this.myChart2.setOption(option2)
    }
  },
  methods: {
    radioChange(val) {
      this.update(val)
    },
    update(val) {
      this.option.series[1].data = Number(val) === 1 ? this.item.series[1].data : [50.33, 60.11, 68.52, 79.43, 59.17, 52.21, 65.67, 60.98, 70.99, 59.47, 52.87, 65.95]
      this.myChart2.setOption(this.option, true)
    }
  }
}
</script>

<style scoped lang="scss">
.detail-info{
  width: 537px;
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #050101;
    line-height: 24px;
    border-bottom: 1px solid #D1CEC9;
    .border-b1{
      position: relative;
      display: inline-block;
      min-width: 140px;
      /*border-bottom:1px solid #050101;*/
    }
    .border-b1::after {
      height: 1px;
      width: 100%;
      transform: scaleY(0.5);
      left: 0;
      content: '';
      position: absolute;
      background-color: #050101;
      bottom: -1px;
    }
  }
  .title-indent {
    text-indent: .5em;
  }
  .flex-ju-al-between {
    font-weight: normal;
    font-size: 14px;
  }
  .nomal{
    font-weight: normal;
  }
  .info-box{
    margin-top: -2px;
     min-height:49px;
    .text-20{
      font-size: 20px;
      color: #050101;
      margin-top: -2px;
    }
    .item{
      margin-right: 80px;
    }
    .font-10{
      font-size: 10px;
    }
    .font-14{
      font-size: 14px;
    }
  }
  // .echarts-content {
  //   margin-top: -14px;
  // }

  .investment-echarts-container,.incom--echarts-container {
    position: relative;
    .position-svg {
      position: absolute;
      top: 43px;
      left: 19px;
      span {
        font-size: 10px;
      }
    }
  }
  .investment-echarts-container {
    .investment-info {
      font-size: $font-base-size;
      color: $font-word-color;
      width: 80px;
      text-align: center;
      padding-bottom: 16px;
    }
    .investment-left-echarts,.investment-left-echarts2 {
      margin-top: 4px;
      margin-bottom: 4px;
      width: 82px;
      height: 82px;
    }
  }
  .zhexiantu-box{
    .title{
      height: 24px;
      background: #E0DFDD;
      border-radius: 12px;
    }
    .point1{
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: #4AACD1;
    }
    .point2{
      width: 6px;
      height: 6px;
      border-radius: 6px;
      margin-left: 10px;
      background: #1C4C7F;
    }
    .flex-ju-al-between:last-child {
      width: 112px;
      margin-right: 10px;
    }
    .echarts-zhexiantu{
      height: 170px;
      // margin-top: -30px;
    }
  }
}
::v-deep .el-radio-group {
  height: 15px!important;
}
</style>
