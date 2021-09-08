<template>
  <div class="staffing-container">
    <div class="staffing-echarts-container">
      <CommonTop
        width="1112px"
        title="编制预算"
      />
      <div class="echarts-date-container clearfix pr-16">
        <div class="date-btn-content clearfix">
          <div class="date-select fl">
            <el-select v-model="value" placeholder="请选择" class="define-select-whit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="date-btn">
            <div class=" fr">
              <el-button
                type="primary"
                round
              >
                预算开启
              </el-button>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in echartsList" :key="index" class="echarts-info-content fl">
          <div id="echarts-content" />
          <div class="info">{{ item.info }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import CommonTop from './component/commonTop'
export default {
  components: { CommonTop },
  data() {
    return {
      value: '',
      options: [
        { label: '2021', value: 2021 },
        { label: '2020', value: 2020 },
        { label: '2019', value: 2019 },
        { label: '2018', value: 2018 },
        { label: '2017', value: 2017 }
      ],
      echartsList: [
        { info: '编制总进度' },
        { info: '完成项目占比' },
        { info: '费用支出完成占比' }
      ]
    }
  },
  mounted() {
    const myChart = []
    document.querySelectorAll('#echarts-content').forEach(ele => { myChart.push(echarts.init(ele, null, { renderer: 'svg' })) })
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
            width: 8,
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
          value: 89,
          detail: {
            offsetCenter: ['0%', '0%']
          }

        }],
        title: {
          fontSize: 14
        },
        detail: {
          fontSize: 18,
          color: '#050101',
          formatter: '{value}%'
        }
      }]
    }
    option && myChart.forEach(ele => { ele.setOption(option) })
  }
}
</script>
<style lang="scss" scoped>
.echarts-info-content {
    margin: 0 64px 0 16px;
    #echarts-content {
        width: 82px;
        height: 82px;
        margin: 0 auto;
    }
    .info {
        font-size: $font-base-size;
        margin-top: 5px;
        text-align: center  ;
    }
}
.date-btn-content {
    margin: 8px 0 12px 0;

}
</style>
