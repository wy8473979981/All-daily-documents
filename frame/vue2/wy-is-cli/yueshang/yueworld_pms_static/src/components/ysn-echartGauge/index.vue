<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%">
    <div
      ref="myEchartsCicle"
      :class="'echart-circle'+circleIndex"
      style="height: 100%; width: 100%"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
export default {
  name: 'BrandEcharts',
  props: {
    echartValues: {
      type: Number
    },
    // 同一个页面如果有多个echart图，需要不同的索引生成不同的图表
    circleIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      myEchart: null,
      // echarts 参数配置
      options: {
        series: [
          {
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
                color: [[1, '#E5E2DE']]
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
            data: [
              {
                value: 0,
                detail: {
                  offsetCenter: ['0%', '0%']
                }
              }
            ],
            title: {
              fontSize: 14
            },
            detail: {
              fontSize: 18,
              color: '#050101',
              formatter: '{value}%'
            }
          }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.initEchartMap()
    })
  },
  methods: {
    // 初始化echart
    initEchartMap() {
      this.options.series[0].data[0].value = this.echartValues
      const allDivDocument = document.querySelectorAll(`.echart-circle${this.circleIndex}`)
      this.myEchart = echarts.init(allDivDocument[0], null, { renderer: 'svg' })
      this.myEchart.setOption(this.options)
    }
  }
}
</script>
<style lang="scss" scoped>
  .zEcharts {
    width: 100%;
    height: 100%;
  }

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
  ::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #050101 !important;
  }
  /* 选中后小圆点的颜色 */
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #1c4c7f !important;
    border-color: #1c4c7f !important;
  }
</style>
