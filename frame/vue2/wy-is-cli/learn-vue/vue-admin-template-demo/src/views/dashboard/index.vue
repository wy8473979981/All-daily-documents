<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div id="mapCharts"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import 'echarts/extension/bmap/bmap'
import loadBMap from '@/utils/loadBMap'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
  data() {
    return {
      mapChartsOpt: {
        title: [
          {
            text: '累计上报车辆',
            top: '1%',
            left: '50%',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 15,
            },
          },
          {
            text: `{number|2,600.0    } 辆`,
            top: '6%',
            left: '50%',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 10,
              rich: {
                number: {
                  color: '#FF7800',
                  fontWeight: 'normal',
                  fontSize: '180%',
                },
              },
            },
          },
          {
            text: '累计里程',
            top: '1%',
            left: '75%',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 15,
            },
          },
          {
            text: `{number|54,350.0     } 辆 `,
            top: '6%',
            left: '75%',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 10,
              rich: {
                number: {
                  color: '#05BDAB',
                  fontWeight: 'normal',
                  fontSize: '180%',
                },
              },
            },
          },
        ],
        bmap: {
          center: [114.173632, 22.648713],
          zoom: 11,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#03324C',
                },
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#031F33',
                },
              },
              {
                featureType: 'boundary',
                elementType: 'geometry',
                stylers: {
                  color: '#3C4952',
                },
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'highway',
                elementType: 'geometry',
                stylers: {
                  color: '#030C12',
                },
              },
              {
                featureType: 'highway',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#030C12',
                  lightness: 1,
                },
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#030C12',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#030C12',
                },
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  color: '#17312C',
                  visibility: 'on',
                },
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#1a5787',
                },
              },
              {
                featureType: 'label',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                  color: '#030C12',
                },
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off',
                },
              },
            ],
          },
        },
        grid: {
          left: '3.5%',
          top: '3%',
          bottom: '4%',
          right: '6%',
        },
        xAxis: {
          type: 'category',
          data: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01'],
          axisLabel: {
            color: '#9AACB4',
          },
          axisLine: {
            lineStyle: {
              color: '#9AACB4',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#9AACB4',
          },
          axisLine: {
            lineStyle: {
              color: '#9AACB4',
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.3,
            },
          },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#007EB1',
              opacity: 0.3,
            },
            itemStyle: {
              normal: {
                color: '#007EB1',
              },
              opacity: 0.3,
            },
            data: [
              {
                name: '01/01',
                value: 1,
              },
              {
                name: '02/01',
                value: 3,
              },
              {
                name: '03/01',
                value: 5,
              },
              {
                name: '04/01',
                value: 9,
              },
              {
                name: '05/01',
                value: 14,
              },
              {
                name: '06/01',
                value: 21,
              },
            ],
          },
        ],
      },
    }
  },

  mounted() {
    loadBMap('8HqcE6qrvqZNA1Lz5EB7xDn2BGMncenw').then(() => {
      // 配置option
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      // 项目使用的是Vue，所以这里用了this
      let mapCharts = this.$echarts.init(document.getElementById('mapCharts'))
      mapCharts.setOption(this.mapChartsOpt)

      // ========================== 以下是遮罩层绘制 ==========================
      var map = mapCharts.getModel().getComponent('bmap').getBMap()
      let districtList = [
        '深圳市罗湖区',
        '深圳市南山区',
        '深圳市福田区',
        '深圳市盐田区',
        '深圳市宝安区',
        '深圳市龙岗区',
        '深圳市龙华区',
        '光明区',
        '坪山区',
      ]
      let bdary = new BMap.Boundary() // 边界
      // 覆盖物绘制
      districtList.forEach((item) => {
        bdary.get(item, (rs) => {
          //获取行政区域
          let count = rs.boundaries.length //行政区域的点有多少个
          if (count === 0) {
            alert('未能获取当前输入行政区域')
            return
          }
          let pointArray = []
          for (let i = 0; i < count; i++) {
            let ply = new BMap.Polygon(rs.boundaries[i], {
              //建立多边形覆盖物
              strokeWeight: 1.5,
              strokeColor: '#ffffff',
              strokeStyle: 'dashed',
              strokeOpacity: 0.5,
              fillColor: '#cccccc',
              fillOpacity: 0.3,
            })
            map.addOverlay(ply) //添加覆盖物
            pointArray = pointArray.concat(ply.getPath())
          }
        })
      })
      // 标签绘制
      let labelPoints = [
        new BMap.Point(114.133407, 22.586888),
        new BMap.Point(113.935636, 22.549798),
        new BMap.Point(114.024068, 22.564752),
        new BMap.Point(114.249191, 22.617713),
        new BMap.Point(113.858371, 22.660982),
        new BMap.Point(114.238041, 22.7282),
        new BMap.Point(114.022692, 22.720197),
        new BMap.Point(113.909312, 22.789131),
        new BMap.Point(114.361997, 22.705532),
      ]
      let optsArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
      let labelArray = []
      let contentArray = [
        '罗湖区',
        '南山区',
        '福田区',
        '盐田区',
        '宝安区',
        '龙岗区',
        '龙华区',
        '光明新区',
        '坪山区',
      ]
      for (let i = 0; i < labelPoints.length; i++) {
        optsArray[i].position = labelPoints[i]
        labelArray[i] = new BMap.Label(contentArray[i], optsArray[i])
        labelArray[i].setStyle({
          color: 'white',
          fontSize: '12px',
          height: '20px',
          lineHeight: '20px',
          fontFamily: '微软雅黑',
          borderWidth: 0,
          backgroundColor: 'transparent',
        })
        map.addOverlay(labelArray[i])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
