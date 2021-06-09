<template>
  <div class="chart-box">

    <div v-if="type == 1" class="chart-title">
      <el-radio-group v-model="echartsRadio">
        <el-radio label="1">车流量</el-radio>
      </el-radio-group>
      <span>2021年</span>
      <span>2020年</span>
    </div>
    <div v-if="type == 2" class="echarts-tabs chart-title">
      <el-radio-group v-model="echartsRadio">
        <el-radio label="1">累计客流</el-radio>
        <el-radio label="2">客流密度</el-radio>
      </el-radio-group>
      <span>2021年</span>
      <span>2020年</span>
    </div>
    <div v-if="type == 3" class="echarts-tabs chart-title">
      <span>累计会员数(万)</span>
    </div>
    <div v-if="type == 4" class="echarts-tabs chart-title">
      <el-radio-group v-model="echartsRadio">
        <el-radio label="1">租金欠费</el-radio>
        <el-radio label="2">物管欠费</el-radio>
      </el-radio-group>
    </div>
    <div id="myEcharts" ref="myEchart" class="chart-container" :style="chartsStyle" />
  </div>

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    chartsStyle: {
      type: String,
      default: function() {
        return 'width:100%;height:220px'
      }
    },
    type: {
      // 1:车辆指标2：客流指标 3：会员指标 4:欠费指标
      type: Number,
      default: function() {
        return 1
      }
    }
  },
  data() {
    return {
      echartsRadio: '1',
      myEchart: '',
      // echarts 参数配置
      options: {
        title: {
          text: '车流量',
          top: 15,
          textStyle: {
            fontSize: '14',
            color: '#848382',
            fontWeight: 'normal'
          }

        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                  '<br/>' +
                  params[i].marker +
                  params[i].seriesName +
                  ' : ' +
                  params[i].value +
                  '%'
            }
            return relVal
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '0%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {}
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          axisLabel: {
            show: true,
            formatter: '{value}'
          },
          show: true
        },
        series: [{
          name: '2021',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#1C4C7F',
                width: 3
              }
            }
          },
          data: [10, 30, 20, 40, 60, 52, 65, 68, 70, 59, 52, 30]
        },
        {
          name: '2020',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4AACD1',
                width: 3
              }
            }
          },
          data: [42, 38, 62, 76, 61, 65, 68, 60, 30, 70, 80, 60]
        }
        ]
      }
    }
  },
  watch: {
    echartsRadio: function(newVal, oldVal) {
      this.myEchart.clear()
      // this.options.title.subtext = this.echartsRadioArray[parseInt(this.echartsRadio)]

      this.myEchart.setOption(this.options, true)
    }
  },
  mounted() {
    // 1:车辆指标 2：客流指标 3：会员指标 4:欠费指标
    this.type == 1 ? this.options.title.text = '车辆指标' : this.type == 2 ? this.options.title.text = '客流指标' : this.type == 3 ? this.options.title.text = '会员指标' : this.type == 4 ? this.options.title.text = '欠费指标' : ''

    console.log(this.chartsStyle, '==+++')
    this.$nextTick(() => {
      this.initEchartMap()
    })
  },

  methods: {

    // 初始化地图
    initEchartMap() {
      const mapDiv = document.getElementById('myEcharts')
      this.myEchart = echarts.init(mapDiv)
      this.myEchart.setOption(this.options)
    }
  }

}

</script>

<style lang="scss" scoped>
  .echarts-tabs {
    width: 100%;
    height: 32px;
    background: #e5e2de;
    border-radius: 16px;
    font-size: 14px;
    color: #050101;
    line-height: 32px;
    padding-left: 15px;
    box-sizing: border-box;
  }

  /* 选中后的字体颜色 */
  ::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #050101 !important;
  }

  /* 选中后小圆点的颜色 */
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #1c4c7f !important;
    border-color: #1c4c7f !important;
  }

  ::v-deep .el-radio__label {
    color: #050101;
  }

  .chart-box {
    margin-bottom: 12px;

    .chart-title {
      width: 100%;
      height: 32px;
      background: #E5E2DE;
      border-radius: 16px;
      line-height: 32px;
      padding: 0 19px 0 8px;
      box-sizing: border-box;

      >span:nth-child(1) {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        float: left;
      }

      >span:not(:nth-child(1)) {
        font-size: 10px;
        font-family: MicrosoftYaHei;
        color: #050101;
        float: right;
        margin-right: 12px;
        position: relative;
      }

      >span:nth-child(2)::before,
      >span:nth-child(3)::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        top: 13px;
      }

      >span:nth-child(2)::before {
        background: #4AACD1;
        left: -8px;
      }

      >span:nth-child(3)::before {
        background: #1C4C7F;
        left: -9px;
      }
    }

    .chart-container {
      height: 220px;
      width: 100%;
    }
  }

</style>
