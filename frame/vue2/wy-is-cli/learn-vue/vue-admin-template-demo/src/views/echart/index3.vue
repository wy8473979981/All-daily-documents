<template>
  <div class="dashboard-container">
    <div id="mapCharts"></div>
  </div>
</template>
<script>
import 'echarts/extension/bmap/bmap'
import loadBMap from '@/utils/loadBMap'
import XY from './xy.json'
export default {
  data() {
    return {
      mapChartsOpt: {
        bmap: {
          center: [121.567706, 31.245944],
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
        xAxis: {},
        yAxis: {},
        grid: {
          left: '3.5%',
          top: '3%',
          bottom: '4%',
          right: '6%',
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
            data: [],
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
      let districtList = ['上海市浦东新区']
      let bdary = new BMap.Boundary() // 边界

      // let coordinates = XY.features[0].geometry.coordinates
      // let all = coordinates[0][0].concat(coordinates[0][1]).concat(coordinates[0][2])
      // let allString = { p: all.join(';') }
      // console.log(all)
      // console.log({ p: [all.join(';')] })

      // 覆盖物绘制
      districtList.forEach((item) => {
        bdary.get(item, (rs) => {
          //获取行政区域
          let count = rs.boundaries.length //行政区域的点有多少个
          // let count = allString.p.length //行政区域的点有多少个
          console.log('rs', rs)

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
      let labelPoints = [new BMap.Point(121.837795, 31.019671)]
      let optsArray = [{}]
      let labelArray = []
      let contentArray = ['浦东新区']
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
