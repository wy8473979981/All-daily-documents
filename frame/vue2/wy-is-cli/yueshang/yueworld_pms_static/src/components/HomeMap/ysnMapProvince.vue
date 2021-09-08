<template>
  <div id="provinceMap" ref="chart" class="chart" style="height: 100%; width: 100%" />
</template>

<script>
import Vue from 'vue'
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import { resizeEchartContent } from '@/utils/echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
import MapToolTip from './MapToolTip'

export default {
  name: 'YsnMapProvince',
  props: {
    // 地图名字
    mapName: {
      type: String,
      required: true
    },
    // 地图值颜色关联映射
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
    },
    // 地图值
    data: {
      type: Array,
      default: () => [
        {
          name: '嘉定区',
          value: (Math.random() * 1000) | 0
        },
        {
          name: '宝山区',
          value: (Math.random() * 1000) | 0
        },
        {
          name: '闵行区',
          value: (Math.random() * 1000) | 0
        },
        {
          name: '浦东区',
          value: (Math.random() * 1000) | 0
        },
        {
          name: '奉贤区',
          value: (Math.random() * 1000) | 0
        },
        {
          name: '青浦区',
          value: (Math.random() * 1000) | 0
        }
      ]
    },
    // 撒点值
    pointList: {
      type: Array,
      default: () => [
        {
          name: 'test',
          value: [121.375972, 31.111658],
          num: (Math.random() * 1000) | 0,
          itemStyle: {
            color: '#1C4C7F'
          },
          specialImportant: (Math.random() * 1000) | 0,
          import: (Math.random() * 1000) | 0,
          compare: (Math.random() * 1000) | 0,
          common: (Math.random() * 1000) | 0,
          specail: (Math.random() * 1000) | 0
        },
        {
          name: 'test',
          value: [121.250333, 31.383524],
          num: (Math.random() * 1000) | 0,
          itemStyle: {
            color: '#48A0C3'
          },
          specialImportant: (Math.random() * 1000) | 0,
          import: (Math.random() * 1000) | 0,
          compare: (Math.random() * 1000) | 0,
          common: (Math.random() * 1000) | 0,
          specail: (Math.random() * 1000) | 0
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
      mapGeoList: {
        '上海市': 'shanghaishi',
        '云南省': 'yunnansheng',
        '内蒙古自治区': 'neimengguzizhiqu',
        '北京市': 'beijingshi',
        '台湾省': 'taiwansheng',
        '吉林省': 'jilinsheng',
        '四川省': 'sichuangsheng',
        '天津市': 'tianjinshi',
        '宁夏回族自治区': 'ningxiahuizuzizhiqu',
        '安徽省': 'anhuisheng ',
        '山东省': 'shandongsheng',
        '山西省': 'shanxisheng',
        '广东省': 'guangdongsheng ',
        '广西壮族自治区': 'guangxizhuangzuzizhiqu ',
        '新疆维吾尔自治区': 'xinjiangweiwuerzizhiqu',
        '江苏省': 'jiangsusheng ',
        '江西省': 'jiangxisheng ',
        '河北省': 'hebeisheng ',
        '河南省': 'henansheng ',
        '浙江省': 'zhejiangsheng ',
        '海南省': 'hainansheng',
        '湖北省': 'hubeisheng ',
        '湖南省': 'hunansheng',
        '澳门特别行政区': 'aomentebiehangzhengqu',
        '甘肃省': 'gansusheng ',
        '福建省': 'fujiansheng',
        '西藏自治区': 'xicangzi zhi qu ',
        '贵州省': 'guizhousheng ',
        '辽宁省': 'liaoningsheng',
        '重庆市': 'zhongqingshi ',
        '陕西省': 'shanxisheng ',
        '青海省': 'qinghaisheng',
        '香港特别行政区': 'xianggangtebiehangzheng qu',
        '黑龙江省': 'heilongjiangsheng '
      }
    }
  },
  computed: {
    options() {
      const { data, visualMap, mapName, mapGeoList, pointList, showPointLabel, symbol } = this
      // eslint-disable-next-line no-unused-vars
      const mapJson = require(`./geoJson/province/${mapName}.json`)
      const that = this
      const options = {
        tooltip: {
          trigger: 'item',
          // position:'right',
          triggerOn: 'click',
          padding: 0,
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
          enterable: true,
          alwaysShowContent: true,
          hideDelay: 5000
        },
        visualMap: visualMap,
        geo: [{
          map: mapGeoList[mapName],
          roam: true, // 是否允许缩放
          selectedMode: 'single',
          itemStyle: {
            areaColor: '#F2F1EC'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#44caff'
            }
          },
          label: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          regions: data
        }],
        series: [
          // 地图
          {
            tooltip: {
              show: false
            },
            type: 'map',
            geoIndex: 0,
            itemStyle: {
              areaColor: '#F2F1EC'
            },
            emphasis: {
              itemStyle: {
                areaColor: '#44caff'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: [] // data
          },
          {
            type: 'effectScatter',
            tooltip: {
              show: true,
              trigger: 'item',
              padding: 8,
              borderWidth: 1,
              borderColor: '#1c4c7fd2',
              backgroundColor: '#1c4c7fd2',
              textStyle: {
                color: '#FFFFFF',
                fontSize: 13
              },
              formatter(params) {
                // console.log(params);
                if (params.value) {
                  setTimeout(() => {
                    that.initToolTip(params)
                  }, 200)
                  return '<div id="MapToolTip"></div>'
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
            data: pointList.map((item, index) => Object.assign({}, item, { value: mapJson.features[index].properties.center }))
          }
        ]
      }
      return options
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.registerMap(this.setData)
        })
      }
    }
  },
  mounted() {
    // this.initGeo()
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
        // eslint-disable-next-line
        const instance = new mapToolTip({
          propsData: {
            data: params,
            showValue: false,
            showDetail: false
          }
        }).$mount('#MapToolTip')
        instance.$on('detail', () => {
          this.$emit('detail', params)
        })
      }
    },
    registerMap(callback) {
      const { mapGeoList, mapName } = this
      if (echarts.getMap(mapGeoList[mapName])) {
        callback()
      }
      require.ensure([], function() {
        const a = require(`./geoJson/province/${mapName}.json`)
        echarts.registerMap(mapGeoList[mapName], a)
        callback()
      }, 'mapGeo')
    },
    initChart() {
      resizeEchartContent('#provinceMap', { height: false, width: false })
      const myCharts = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
      myCharts.setOption({})
      // 自适应
      this.__resizeHandler = debounce(
        () => {
          this.myCharts.resize()
        },
        100,
        { leading: true }
      )
      addListener(this.$refs.chart, this.__resizeHandler)

      // eslint-disable-next-line
      myCharts.on('geoselected', (params)=> {
        console.log('geoselected', params)
        this.$emit('geoselected', params)
      })
      this.myCharts = myCharts
    },
    setData() {
      const { options } = this
      if (this.myCharts) {
        this.myCharts.setOption(options)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
