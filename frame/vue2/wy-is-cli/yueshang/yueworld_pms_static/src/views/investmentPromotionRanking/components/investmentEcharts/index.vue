<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%">
    <div class="echarts-tabs">
      <el-radio-group v-model="echartsRadio">
        <el-radio label="0">开业率(%)</el-radio>
        <el-radio label="1">出租率</el-radio>
        <el-radio label="2">平均租金</el-radio>
      </el-radio-group>
    </div>

    <div
      id="myEcharts"
      ref="myEchart"
      class="map-container"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
// import "./china.js";
export default {
  name: 'InvestmentEcharts',
  props: {},
  data() {
    return {
      myEchart: '',
      echartsRadio: '0',
      echartsRadioArray: ['开业率(%)', '出租率', '平均租金'],
      // echarts 参数配置
      options: {
        title: {
          subtext: '开业率(%)', // 副标题
          subtextStyle: {
            // 对应样式
            color: '#848382',
            fontSize: 14
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {}
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          axisLabel: {
            show: true,
            formatter: '{value} %'
          },
          show: true
        },
        series: [
          {
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
            data: [52, 65, 68, 70, 59, 52, 65, 68, 70, 59, 52, 65]
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
            data: [42, 38, 62, 76, 61, 65, 68, 60, 81, 70, 80, 85]
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
    echartsRadio: function(newVal, oldVal) {
      this.myEchart.clear()
      this.options.title.subtext = this.echartsRadioArray[parseInt(this.echartsRadio)]

      this.myEchart.setOption(this.options, true)
    }
  },
  mounted() {
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
#myEcharts{
  height: 100%;
  width: 100%;
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
