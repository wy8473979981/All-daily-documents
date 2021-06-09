
<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%">
    <div
      id="myEchartsSecond"
      ref="myEchart"
      class="map-container"
      style="height: 100%; width: 100%"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
// import "./china.js";
export default {
  name: 'MortgageEcharts',
  props: {},
  data() {
    return {
      myEchart: '',
      echartsRadio: '1',
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
                value: 89,
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
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.initEchartMap()
    })
  },
  methods: {
    // 初始化地图
    initEchartMap() {
      const mapDiv = document.getElementById('myEchartsSecond')
      const myChart = echarts.init(mapDiv)
      myChart.setOption(this.options)
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
