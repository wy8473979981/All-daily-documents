<template>
  <!--<e-charts ref="chart" class="charts" :autoresize="true" :option="options" />-->
  <div ref="chart" class="charts" />
</template>

<script>
import Vue from 'vue'
import * as echarts from 'echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
import MapToolTip from './MapToolTip'
import MapToolTipSelect from './MapToolTipSelect'
const chinaGeo = require('./geoJson/china.json')
const chinaCityGeo = require('./geoJson/china-city.json')
echarts.registerMap('china', chinaGeo)
// echarts.registerMap('china', chinaCityGeo)
export default {
  name: 'YsnMapChina',
  props: {
    // 中国地图显示类型
    showCity: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    visualMap: {
      type: Object,
      default: () => {
        return {
          show: false,
          seriesIndex: [0],
          min: 1,
          max: 4,
          text: ['High', 'Low'],
          inRange: {
            color: ['#b2d8b8', '#4aacd1', '#485f47', '#6f120c']
          }
        }
      }
    }, // 颜色值设置
    chinaData: {
      type: Array,
      default: () => [
        {
          name: '上海市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '江苏省',
          label: {
            show: true
          },
          value: 3,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '安徽省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '浙江省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '福建省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '山东省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '河南省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '四川省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '重庆市',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '南海诸岛',
          itemStyle: {
            // 隐藏地图
            normal: {
              opacity: 0 // 为 0 时不绘制该图形
            }
          },
          label: {
            show: false // 隐藏文字
          }
        }
      ]
    }, // 数据设置
    provinceData: {
      type: Array,
      default: () => [
        {
          name: '上海市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '江苏省',
          label: {
            show: true
          },
          value: 3,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '安徽省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '浙江省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '福建省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '山东省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '河南省',
          label: {
            show: true
          },
          value: 2,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '四川省',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '重庆市',
          label: {
            show: true
          },
          value: 1,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '北京市',
          label: {
            show: true
          },
          value: 4,
          switchName: '项目数量',
          switchValue: false
        },
        {
          name: '南海诸岛',
          itemStyle: {
            // 隐藏地图
            normal: {
              opacity: 0 // 为 0 时不绘制该图形
            }
          },
          label: {
            show: false // 隐藏文字
          }
        }
      ]
    }, // 数据设置
    // 撒点值
    pointList: {
      type: Array,
      default: () => [
        {
          name: 'test',
          value: [121.375972, 31.111658],
          itemStyle: {
            color: '#004948'
          },
          list: [
            '写字楼',
            '七宝宝龙城',
            '宝龙艾美酒店'
          ]
        },
        {
          name: 'test',
          value: [121.250333, 31.383524],
          itemStyle: {
            color: '#BF9000'
          },
          list: [
            '写字楼',
            '七宝宝龙城',
            '宝龙艾美酒店'
          ]
        }
      ]
    },
    //
    symbol: {
      type: String,
      default: 'circle'
    },
    // 标记点文字
    showPointLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myCharts: null,
      cityModel: false
    }
  },
  computed: {

    options() {
      const { showLabel, cityModel, provinceData, chinaData, visualMap, pointList, showPointLabel, symbol } = this
      const that = this
      const deepChinaData = JSON.parse(JSON.stringify(chinaData))

      deepChinaData.forEach((element, index) => {
        if (!deepChinaData[index].label) {
          deepChinaData[index].label = {}
        }
        deepChinaData[index].label.show = showLabel
      })

      return {
        tooltip: {
          trigger: 'item',
          padding: 0,
          triggerOn: 'click',
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
          enterable: true,
          // alwaysShowContent:true,
          hideDelay: 5000
        },
        visualMap: visualMap,
        geo: [{
          map: 'china',
          // / map: cityModel?'chinaCity':'china',
          roam: true, // 是否允许缩放
          selectedMode: 'multiple',
          itemStyle: {
            areaColor: 'rgba(0,0,0,0)'
          },
          emphasis: {
            itemStyle: {
              // areaColor: 'auto'
            }
          },
          tooltip: {
            show: false
          },
          regions: cityModel ? provinceData : deepChinaData
        }],
        series: [
          // 地图
          {
            tooltip: {
              show: true,
              trigger: 'item',
              backgroundColor: 'none',
              borderWidth: 0,
              formatter(params) {
                // console.log(params);
                if (params.value && !cityModel) {
                  setTimeout(() => {
                    that.initToolTip(params)
                  }, 200)
                  return '<div id="MapToolTip"></div>'
                }
                return ''
              }
            },
            type: 'map',
            geoIndex: 0,
            selectedMode: 'multiple',
            itemStyle: {
              areaColor: '#F2F1EC'
            },
            label: {
              show: showLabel,
              color: '#ffffff'
            },
            data: cityModel ? provinceData : deepChinaData
          },
          // 标记点
          {
            type: 'effectScatter',
            tooltip: {
              show: true,
              trigger: 'item',
              triggerOn: 'mousemove',
              backgroundColor: 'none',
              borderWidth: 0,
              formatter(params) {
                // console.log(params);
                if (params.value) {
                  setTimeout(() => {
                    that.initToolSelect(params)
                  }, 200)
                  return '<div id="MapToolTipSelect"></div>'
                }
                return ''
              }
            },
            symbolSize: 16,
            coordinateSystem: 'geo',
            // showEffectOn: 'emphasis',
            symbol: symbol,
            rippleEffect: {
              period: 5,
              scale: 5,
              brushType: 'fill'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              offset: [10, 0],
              color: 'auto',
              fontSize: 16,
              textBorderColor: '#FFF',
              textBorderWidth: 1,
              show: showPointLabel
            },
            emphasis: {
              itemStyle: {
                symbolSize: 20,
                opacity: 1 // 线条宽度
              },
              label: {
                fontSize: 20
              }
            },
            data: cityModel ? pointList : []
          }
        ]
      }
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.setData()
        })
      }
    },
    showCity(val) {
      if (val !== this.cityModel) {
        this.cityModel = val
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (this.__resizeHandler) {
      removeListener(this.$refs.chart, this.__resizeHandler)
    }
    if (this.myCharts) {
      this.myCharts.dispose()
    }
  },
  methods: {
    initToolTip(params) {
      const mapToolTip = Vue.extend(MapToolTip)
      if (document.getElementById('MapToolTip')) {
        // eslint-disable-next-line new-cap
        const instance = new mapToolTip({
          propsData: {
            data: params
          }
        }).$mount('#MapToolTip')
        //
        instance.$on('change', (e) => {
          this.$emit('change', e, params)
        })
        instance.$on('detail', () => {
          this.$emit('detail', params)
        })

        // console.log(instance)
      }
    },
    initToolSelect(params) {
      const mapToolTip = Vue.extend(MapToolTipSelect)
      if (document.getElementById('MapToolTipSelect')) {
        // eslint-disable-next-line new-cap
        const instance = new mapToolTip({
          propsData: {
            data: params.data.list || []
          }
        }).$mount('#MapToolTipSelect')
        //
        instance.$on('selected', (e) => {
          console.log('tooltipSelected===', e, params)
          this.$emit('tooltipSelected', e, params)
        })

        console.log(instance)
      }
    },
    initChart() {
      echarts.registerMap('china', chinaGeo)
      const myCharts = echarts.init(this.$refs.chart)
      myCharts.setOption({})
      myCharts.on('selectchanged', (params) => {
        this.$emit('geoSelected', params)
      })
      myCharts.on('geoselectchanged', (params) => {
        this.$emit('geoSelected', params)
      })
      myCharts.on('mapselectchanged', (params) => {
        this.$emit('geoSelected', params)
      })
      myCharts.on('georoam', params => {
        if (params.dy || params.dx) return // 如果是拖拽事件则退出
        const _option = myCharts.getOption() // 获取最新的option配制
        const _zoom = _option.geo[0].zoom // 获取当前缩放比例zoom
        if (_zoom > 10 && !this.cityModel) {
          this.cityModel = true
          echarts.registerMap('china', chinaCityGeo)
          myCharts.resize()
          this.$emit('room', true)
        } else if (_zoom < 10 && this.cityModel) {
          this.cityModel = false
          echarts.registerMap('china', chinaGeo)
          myCharts.clear()
          this.$emit('room', false)
        }
        // this.myChart.clear();                            //清空
        // this.myChart.setOption(_option);        //更新修改后的option配制
      })
      this.myCharts = myCharts
      // 自适应
      this.__resizeHandler = debounce(
        () => {
          this.myCharts.resize()
        },
        100,
        { leading: true }
      )
      addListener(this.$refs.chart, this.__resizeHandler)
      console.info(myCharts)
    },
    setData() {
      const { options } = this
      // this.myCharts.clear();
      this.myCharts.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.charts{
  width: 100%;
  height: 100%;
}
</style>
