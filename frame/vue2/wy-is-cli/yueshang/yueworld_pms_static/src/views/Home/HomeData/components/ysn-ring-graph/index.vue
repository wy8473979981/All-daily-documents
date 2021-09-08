<template>
  <div class="pl-8 ring-graph">
    <el-row>
      <el-col
        v-for="({ label, rate, title, amount, range }, index) in list"
        :key="index"
        :span="12"
      >
        <!-- 标题 -->
        <div v-if="title&&amount" class="mb-4 pb-8">
          <div v-if="title" class="ring-graph-title text-14 pb-2">{{ title }}</div>
          <div v-if="amount" class="flex-ju-al-start">
            <div class="text-20">{{ amount }}</div>
            <template v-if="rate">
              <svg-icon :icon-class="handleFluctuate(range)" />
              <div :class="`ring-graph-${handleFluctuate(range)}-color`">
                {{ handleFluctuate(range) === 'down' ? range.substring(1) : range }}%
              </div>
            </template>
          </div>
        </div>
        <!-- 图表 -->
        <div class="ring-graph-container">
          <div :id="`ring-graph-${name}-${index}`" class="ring-graph-echarts" />
          <div class="ring-graph-info">
            <div :class="!nowrap ? `ring-graph-label` : `white-space-nowrap`">{{ label }}</div>
          </div>
          <div v-if="rate" class="ring-graph-svg flex-ju-al-between">
            <svg-icon :icon-class="handleFluctuate(rate)" />
            <div :class="`${handleFluctuate(rate)} text-12`">
              {{ handleFluctuate(rate) === 'down' ? rate.substring(1) : rate }}%
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    nowrap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 环状图配置
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
              color: '#1C4C7F',
              borderColor: '#1C4C7F',
              borderWidth: 6
            },
            radius: '95%',
            progress: {
              width: true,
              show: true,
              overlap: false,
              roundCap: false,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 2,
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
                value: 100,
                itemStyle: {
                  borderWidth: 2,
                  borderColor: '#E5E2DE',
                  color: '#E5E2DE'
                },
                detail: {
                  show: false
                }
              },
              {
                value: 89,
                detail: {
                  offsetCenter: ['0%', '2%'],
                  fontSize: 16,
                  fontWeight: 'normal'
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
  watch: {
    // list() {
    //   // 数组传入进行渲染
    //   this.handleInit()
    // }
  },
  mounted() {
    this.handleInit()
  },
  methods: {
    // 遍历传入数组循环echarts环形图
    handleInit() {
      this.list.forEach(({ rate, value }, index) => {
        const ring_graph = echarts.init(document.getElementById(`ring-graph-${this.name}-${index}`), null, { renderer: 'svg' })
        this.options.series[0].data[1].value = value
        if (rate) {
          this.options.series[0].data[1].detail.offsetCenter = ['0%', '-20%']
        } else {
          this.options.series[0].data[1].detail.offsetCenter = ['0%', '2%']
        }
        // this.options.series[0].data[1].detail.fontSize = 18
        ring_graph.setOption(this.options)
      })
    },
    // 增减判断 down 下降 up 上升
    handleFluctuate(number) {
      return number.includes('-') ? 'down' : 'up'
    }
  }
}
</script>
<style lang="scss" scoped>
$thirdTitle: #575757;
.ring-graph {
  .white-space-nowrap {
    white-space: nowrap;
  }
  .text-20 {
    font-size: 20px;
    margin-bottom: -2px;
  }
  .flex-ju-al-start {
    display: flex;
    justify-content: start;
    align-items: flex-end;

    svg {
      margin-bottom: 1px;
    }
  }
  .ring-graph-label {
    color: $thirdTitle;
  }
  .ring-graph-title {
    color: $thirdTitle;
    &.text-14 {
      line-height: 18px;
    }
  }
  &-container {
    position: relative;
    .position-svg {
      position: absolute;
      top: 47px;
      left: 19px;
      span {
        font-size: 10px;
      }
    }
  }
  &-title {
    width: 110px;
  }
  &-up-color {
    color: #485f47;
  }
  &-down-color {
    color: #6f120c;
  }
  &-echarts {
    // margin-top: 8px;
    margin-bottom: 4px;
    width: 90px;
    height: 90px;
  }
  &-label {
    width: 56px;
    margin: auto;
  }
  &-info {
    font-size: $font-base-size;
    color: $font-word-color;
    width: 90px;
    text-align: center;
    padding-bottom: 16px;
  }
  &-svg {
    position: absolute;
    top: 47px;
    left: 19px;
    span {
      font-size: 10px;
    }
  }
}
</style>
