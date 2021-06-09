<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%">
    <div class="echarts-tabs">
      <el-radio-group v-model="echartsRadio">
        <el-radio label="0">平效</el-radio>
        <el-radio label="1">销售额</el-radio>
        <el-radio label="2">销售比</el-radio>
      </el-radio-group>
    </div>

    <div
      id="myEchartsThird"
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
  name: 'RatioEcharts',
  props: {},
  data() {
    return {
      myEchart: '',
      echartsRadio: '1',
      echartsRadioArray: ['平效', '销售额', '销售比'],
      // echarts 参数配置
      options: {
        title: {
          // text: "X轴的标题",
          // textStyle: {
          //   color: "#848382", //颜色
          //   fontStyle: "normal", //风格
          //   fontWeight: "normal", //粗细
          //   fontFamily: "Microsoft yahei", //字体
          //   fontSize: 14, //大小
          // },
          subtext: '销售额', // 副标题
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
      const mapDiv = document.getElementById('myEchartsThird')
      this.myEchart = echarts.init(mapDiv)
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
