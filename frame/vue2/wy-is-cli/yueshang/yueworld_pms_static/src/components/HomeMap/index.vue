<!--
 * @Author: zjy
 * @Date: 2021-05-14 15:00:00
 * @LastEditTime: 2021-05-21 16:01:36
 * @FilePath: \new-pms-code\src\views\home\components\home-map\index.vue
-->
<template>

  <!-- 首页地图 -->
  <div style="height: 900px; width: 100%">
    <div
      id="myEcharts"
      ref="myEchart"
      class="map-container"
      style="height: 100%; width: 100%"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import './china.js'
export default {
  name: 'HomeMap',
  props: {},
  data() {
    return {
      myEchart: '',
      // echarts 参数配置
      options: {
        tooltip: {
          triggerOn: 'click', // mousemove、click
          padding: 8,
          borderWidth: 1,
          borderColor: '#1c4c7fd2',
          backgroundColor: '#1c4c7fd2',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 13
          },
          formatter: function(e, t, n) {
            const data = e.data
            // 模拟数据
            data.specialImportant = (Math.random() * 1000) | 0
            data.import = (Math.random() * 1000) | 0
            data.compare = (Math.random() * 1000) | 0
            data.common = (Math.random() * 1000) | 0
            data.specail = (Math.random() * 1000) | 0

            const context = `
               <div class="tooltip_bj">
                   <p><b style="font-size:15px;">${data.name}区域</b></p>
                   <p><span>项目：</span><span>${data.value}个</span></p>
                   <p><span>负责人：</span><span>${data.specialImportant}</span></p>
                   <p><span>出租率：</span><span>${data.import}%</span></p>
                   <p><span>开业率：</span><span>${data.compare}%</span></p>
                   <p><span>租金收入：</span><span>${data.common}</span></p>
                   <p><span>销售额：</span><span>${data.specail}</span></p>
                   <p style="color: #48A0C3;">点击进入项目详情</p>
               </div>
            `
            return context
          }
        },
        visualMap: {
          show: true,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 100,
              label: '在营',
              color: '#1C4C7F'
            },
            {
              gte: 500,
              lt: 999,
              label: '500 - 999',
              color: '#3c57ce'
            },
            {
              gte: 100,
              lt: 499,
              label: '在建',
              color: '#48A0C3'
            },
            {
              gte: 10,
              lt: 99,
              label: '在营+在建',
              color: '#BECBD2'
            }
          ]
        },
        geo: {
          map: 'china',
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1,
          top: 120,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '地首页图',
            type: 'map',
            geoIndex: 0,
            data: []
          }
        ]
      },
      // echart data
      dataList: [
        {
          name: '北京',
          value: 100,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '天津',
          value: 130,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '山西',
          value: 400,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '广东',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '福建',
          value: 400,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '江苏',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '浙江',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '山东',
          value: 130,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '四川',
          value: 12,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '湖北',
          value: 500,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.setEchartOption()
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
      const myChart = echarts.init(mapDiv)
      myChart.setOption(this.options)
    },
    // 修改echart配制
    setEchartOption() {
      this.options.series[0]['data'] = this.dataList
    }
  }
}
</script>
<style lang="scss" scoped>
.zEcharts {
  width: 100%;
  height: 100%;
}
</style>
