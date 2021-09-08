<template>
  <div class="chart-box">
    <div class="chart-title">
      <span>会员属性统计(截至昨日23:59:59)</span>
    </div>
    <div id="myBarEcharts" ref="myBarEchart" class="chart-container" :style="chartsStyle" />
  </div>

</template>

<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
export default {
  name: 'LineChart',
  props: {
    chartsStyle: {
      type: String,
      default: function() {
        return 'width:100%;height:220px'
      }
    }
  },
  data() {
    return {
      myEchart: '',
      // echarts 参数配置
      options: {
        color: ['#4AACD1'],
        title: {
          text: '人(万)',
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
          right: '0%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {}
        },
        xAxis: {
          type: 'category',
          data: ['昨日新开会员卡', '活跃会员', '沉默会员', '流失会员']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 12,
          showBackground: false,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            emphasis: {
              barBorderRadius: 30
            },

            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [40, 40, 40, 40]

            }
          }

        }]
      }
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
      const mapDiv = document.getElementById('myBarEcharts')
      const myChart = echarts.init(mapDiv, null, { renderer: 'svg' })
      myChart.setOption(this.options)
    }
  }

}

</script>

<style lang="scss" scoped>
  .chart-box {
    margin-bottom: 12px;
    margin-left:56px;
    .chart-title {
      width: 100%;
      height: 32px;
      background: #E5E2DE;
      border-radius: 16px;
      line-height: 32px;
      padding: 0 19px 0 8px;
      box-sizing: border-box;

      >span:nth-child(1) {
        height: 14px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        float: left;
      }

    }

    .chart-container {
      height: 220px;

    }
  }

</style>
