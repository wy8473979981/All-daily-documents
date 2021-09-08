<template>
  <div class="echart">
    <!-- 图表 -->
    <div class="top">
      <div class="one">
        <span v-for="(item, index) in num" :key="index">{{ item }}</span>
      </div>
      <div class="two">
        <img src="../assets/无标题.png" alt="">
      </div>
      <div class="three" />
      <div class="four">
        <span v-for="(item, index) in num1" :key="index">{{ item }}</span>
      </div>
    </div>
    <div
      ref="myChart"
      :style="{ width: '323px', height: '270px', left: '-65px' }"
    />
  </div>
</template>

<script>
var colors = ['#5470C6', '#91CC75', '#EE6666']
export default {
  data() {
    return {
      num: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      num1: ['-1', '0', '1', '2', '3', '4', '5']
    }
  },
  mounted() {
    this.showEcharts()
  },
  methods: {
    showEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        color: ['#0B4F4D', '#FA6400', '#FFC31C'],
        backgroundColor: '', // 背景颜色透明
        legend: {
          itemStyle: {},
          selectedMode: true, // 可点击
          data: ['净值', '业主收益回报率（试算）', '业主收益回报率（备忘录）'],
          bottom: 0,
          left: 0,
          right: 0,
          itemWidth: 14,
          itemHeight: 8,
          textStyle: {
            fontSize: 9
          }
        },
        grid: {
          left: 0,
          right: 0
        },
        axisTick: {
          // 隐藏y轴刻度线
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: ['2016', '2017', '2018', '2019', '2020', '2021']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            show: true
          },
          {
            type: 'value',
            name: '',
            show: false
          }
        ],
        series: [
          {
            barWidth: '30%',
            name: '净值',
            type: 'bar',
            data: [45, 20, 35, 15, 30, 30, 30, 30],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10], // 设置柱状图圆角
                color: function(params) {
                  // 首先定义一个数组
                  var colorList = [
                    '#3B8995',
                    '#3B8995',
                    '#3B8995',
                    '#3B8995',
                    '#004948',
                    '#B2D8B8',
                    '#B2D8B8',
                    '#B2D8B8'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: '业主收益回报率（试算）',
            type: 'line',
            yAxisIndex: 1, // 索引从0开始
            data: [0, 0, 40, 20, 40, 40, 40, 40],
            smooth: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted', // 'dotted'虚线 'solid'实线
                  color: '#FA6400'
                },
                color: function(params) {
                  // 首先定义一个数组
                  var colorList = [
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          },
          {
            name: '业主收益回报率（备忘录）',
            type: 'line',
            yAxisIndex: 1, // 索引从0开始
            data: [0, 0, 40, 20, 50, 55, 50, 60],
            smooth: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'dotted', // 'dotted'虚线 'solid'实线
                  color: '#FFC31C'
                },
                color: function(params) {
                  // 首先定义一个数组
                  var colorList = [
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400',
                    '#FA6400'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
      // 建议加上以下这一行代码，不加，当浏览器窗口缩小时，echarts显示不全。
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echart {
  margin-top: 35px;
  position: relative;
}
.top {
  position: absolute;
  top: -10px;
  white-space: nowrap;
  span {
    display: inline-block;
    width: 27px;
    height: 14px;
    font-size: 12px;
    font-family: Helvetica;
    color: #848382;
    line-height: 14px;
    margin-right: 13px;
  }
}
.two {
  width: 323px;
  text-align: center;
}
.three {
  height: 6px;
  width: 323px;
  background: #e9e9e9;
}
</style>
