 <template>
  <!--<e-charts ref="chart" class="charts" :autoresize="true" :option="options" />-->
  <div ref="chart" class="charts" />
</template>

<script>
import Vue from 'vue'
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
import MapToolTip from './MapToolTip'
const chinaGeo = require('./geoJson/china.json')
const chinaCityGeo = require('./geoJson/china-city.json')
echarts.registerMap('china', chinaGeo)
export default {
  name: 'YsnMapChina',
  props: {
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
            color: ['#55768F', '#678FAE', '#73A1C3', '#F6F5EE']
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
    } // 数据设置
  },
  data() {
    return {
      myCharts: null,
      cityModel: false
    }
  },
  computed: {
    options() {
      const { cityModel, provinceData, chinaData, visualMap } = this
      const that = this
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          padding: 0,
          extraCssText: 'box-shadow: 0 0 0px rgba(0, 0, 0, 0.3);',
          enterable: true,
          // alwaysShowContent:true,
          hideDelay: 5000
        },
        visualMap: visualMap,
        geo: [{
          map: 'china',
          roam: true, // 是否允许缩放
          center: [120, 32], // 视角中心 控制 zoom 的 放大坐标
          zoom: 3,
          selectedMode: 'single',
          label: {
            fontFamily: 'Pingfang SC',
            // show:true,  //是否显示文本
            color: '#4C6980' // 文本颜色
          },
          emphasis: { // 高亮状态下的多边形和标签样式。
            label: { // 文本
              fontFamily: 'Pingfang SC',
              color: '#4C6980'
            },
            itemStyle: { // 区域
              areaColor: '#55768F'
            }
          },
          select: {
            label: {
              fontFamily: 'Pingfang SC',
              color: '#4C6980'
            },
            itemStyle: {

              color: '#55768F'
            }

          },
          itemStyle: {
            areaColor: '#F6F5EE',
            borderColor: '#C3C6C4'
          },
          tooltip: {
            show: false
          },
          regions: cityModel ? provinceData : chinaData
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
                if (params.value) {
                  setTimeout(() => {
                    that.initToolTip(params)
                  }, 200)
                  return '<div id="MapToolTip"></div>'
                }
                return ''
              }
            },
            type: 'map',
            // map: 'china',
            // mapType: 'china',
            geoIndex: 0,
            itemStyle: {
              areaColor: '#F2F1EC'
            },
            label: {
              show: true,
              color: '#ffffff'
            },
            data: cityModel ? provinceData : chinaData
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
    initChart() {
      const myCharts = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
      myCharts.setOption({})
      myCharts.on('geoselected', function(params) {
        this.$emit('geoselected', params)
      })
      myCharts.on('georoam', params => {
        if (params.dy || params.dx) return // 如果是拖拽事件则退出
        const _option = myCharts.getOption() // 获取最新的option配制
        const _zoom = _option.geo[0].zoom // 获取当前缩放比例zoom
        console.info(_zoom)
        if (_zoom > 10 && !this.cityModel) {
          this.cityModel = true
          echarts.registerMap('china', chinaCityGeo)
          myCharts.resize()
        } else if (_zoom < 10 && this.cityModel) {
          this.cityModel = false
          echarts.registerMap('china', chinaGeo)
          myCharts.resize()
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
      this.myCharts.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped>
.charts{
  position: relative;
  width: 100%;
  height: 100%;
  &::before{
    content: '';
    position: absolute;
    width:100%;
    height:100%;
    z-index:9;
  }
}
</style>
