<!--
 * @Author: zjy
 * @Date: 2021-05-14 15:00:00
 * @LastEditTime: 2021-08-31 13:49:01
 * @FilePath: \new-pms-code\src\views\home\components\home-map\StandingBook.vue
-->
<template>
  <!-- 首页地图 -->
  <div id="map-china" style="width: 100%; height: 100%;overflow: hidden;">
    <div class="position-relative multiselect--active ml-20 flex-al-center" @click="handlerBack">
      <svg-icon v-if="mapName!=='china'" icon-class="home_back" class="font-20 cursor-pointer mb-8" /><span v-if="mapName!=='china'" class="cursor-pointer mr-8 mb-8">返回</span>
      <!-- <el-form
        ref="ruleForm"
        :model="formData"
        label-position="top"
      >
        <ysn-formItem :form="formData" :config="configData" />
      </el-form> -->
    </div>
    <div style="height: 100%; width: 100%;position: relative;margin-top: 0%;">
      <div v-show=" mapName==='china' " style="height: 100%; width: 100%">
        <div
          id="myEcharts"
          ref="myEchart"
          class="map-container"
          style="height: 100%; width: 100%"
        />
      </div>
      <div v-if=" mapName != 'china' " style="height: 100%; width: 100%">
        <!-- <a class="back" href="javascript:void(0);" @click="handlerBack">
          <i class="el-icon-arrow-left" />
        </a> -->
        <ysn-map-province
          :map-name="mapName"
          :visual-map="visualMap"
          @detail="handlerProjectDetail"
          @geoselected="geoselected"
        />
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import { resizeEchartContent } from '@/utils/echarts'
import YsnMapProvince from './ysnMapProvince'
const chinaGeo = require('./geoJson/china.json')
echarts.registerMap('china', chinaGeo)
export default {
  name: 'HomeMap',
  components: { YsnMapProvince },
  props: {
    // 有颜色区域高亮设置
    emphasis: {
      type: Object,
      default: () => {
        return {
          itemStyle: {
            areaColor: '#44caff',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0
          }
        }
      }
    }
  },
  data() {
    return {
      mapName: 'china',
      myEchart: '',
      // 日期选择
      formData: {
        date: ''
      },
      // config配置
      configData: [
        { itemType: 'monthPicker', prop: 'date', label: '', width: '194px', type: 'month', format: 'yyyy年MM月', valueFormat: 'yyyy-MM' }
      ],
      visualMap: {
        show: true,
        left: 26,
        bottom: 135,
        showLabel: true,
        pieces: [
          {
            gte: 100,
            label: '在营',
            color: '#1C4C7F'
          },
          // {
          //   gte: 500,
          //   lt: 999,
          //   label: '500 - 999',
          //   color: '#3c57ce'
          // },
          {
            gte: 100,
            lt: 499,
            label: '在建',
            color: '#48A0C3'
          }
          // {
          //   gte: 10,
          //   lt: 99,
          //   label: '在营+在建',
          //   color: '#BECBD2'
          // }
        ]
      },
      // echarts 参数配置
      options: {
        tooltip: {
          // triggerOn: 'none', // mousemove、click
          padding: 8,
          borderWidth: 1,
          borderColor: '#1c4c7fd2',
          backgroundColor: '#1c4c7fd2',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 13
          },
          formatter: function(e, t, n) {
            const data = e.data || {}
            // 模拟数据
            data.specialImportant = (Math.random() * 1000) | 0
            data.import = (Math.random() * 1000) | 0
            data.compare = (Math.random() * 1000) | 0
            data.common = (Math.random() * 1000) | 0
            data.specail = (Math.random() * 1000) | 0

            const context = `
               <div class="tooltip_bj">
                   <p><b style="font-size:15px;">${data.name || '-'}区域</b></p>
                   <p><span>项目：</span><span>${data.value || '-'}个</span></p>
                   <p><span>负责人：</span><span>${data.specialImportant || '-'}</span></p>
                   <p><span>出租率：</span><span>${data.import || '-'}%</span></p>
                   <p><span>开业率：</span><span>${data.compare || '-'}%</span></p>
                   <p><span>租金收入：</span><span>${data.common || '-'}</span></p>
                   <p><span>销售额：</span><span>${data.specail || '-'}</span></p>
                   <p style="color: #48A0C3;" onclick="project()">点击进入项目详情</p>
               </div>
            `
            return context
          }
        },
        visualMap: {
          show: true,
          left: 26,
          bottom: 45,
          showLabel: true,
          // colorSaturation: [100, 100],
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
          // roam: true,
          zoom: 1,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            }
            // emphasis: {
            //   areaColor: '#44caff',
            //   shadowOffsetX: 0,
            //   shadowOffsetY: 0,
            //   borderWidth: 0
            // }
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

      dataList: [
        {
          name: '北京市',
          value: 100,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '天津市',
          value: 130,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '山西省',
          value: 400,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '广东省',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '福建省',
          value: 400,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '江苏省',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '浙江省',
          value: 600,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '山东省',
          value: 130,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '四川省',
          value: 12,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        {
          name: '湖北省',
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
      resizeEchartContent('#myEcharts', { height: false, width: false })
      const mapDiv = document.getElementById('myEcharts')
      const myChart = echarts.init(mapDiv, null, { renderer: 'svg' })
      myChart.setOption(this.options)
      myChart.on('click', (params) => {
        this.mapName = params.name
        this.$emit('mapChange', params)
      })
      this.myEchart = myChart

      // const that = this
      // myChart.on('mouseover', function(params) {
      //   if (params.data && params.data.value !== undefined) {
      //     that.dataList.forEach(item => {
      //       if (item.name === params.data.name) {
      //         console.log(params)
      //       }
      //     })
      //   }
      // })
    },
    // 修改echart配制
    setEchartOption() {
      const { emphasis } = this
      // 高亮颜色
      this.options.geo.regions = this.dataList.map((item) => {
        return {
          ...item,
          emphasis
        }
      })

      this.options.series[0]['data'] = this.dataList
    },
    handlerBack() {
      this.mapName = 'china'
      this.$emit('back')
      this.$nextTick(() => {
        if (this.myEchart) {
          this.myEchart.resize()
        }
      })
    },
    handlerProjectDetail(params) {
      this.$router.push({ name: 'ProjectHome' })
    },
    geoselected(params) {
      console.log('geoselected', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.back{
  position: absolute;
  left: 15px;
  top:15px;
  z-index: 10;
  .el-icon-arrow-left{
    color:#1C4C7F ;
    font-size: 24px;
    font-weight: bold;
  }
}
.zEcharts {
  width: 100%;
  height: 100%;
}
</style>
