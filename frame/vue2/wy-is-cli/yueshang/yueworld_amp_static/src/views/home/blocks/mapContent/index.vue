<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:首页地图模块
-->
<template>
  <div class="box pt-20 pb-20 position-relative">
    <!-- 地图组件 -->
    <!-- 一级二级地图 -->
    <map-data v-if="showType=='map'" class="main-map-box" @handlerTooltipSelected="handlerTooltipSelected" @handlerRoom="handlerRoom" />
    <!-- 三级地图 -->
    <TencentMap v-if="showType=='threeMap'" />
    <div class="left-pop">
      <!-- 收入比重 -->
      <prop-item @open="setSrbz()">
        <div class="left-item ml-8">收入比重</div>
        <template #contain>
          <div id="srbz" class="full" />
        </template>
      </prop-item>

      <!-- 收入比重 -->
      <prop-item v-if="mapType === 'china'" width="590px" height="400px" offset-top="-180px">
        <div class="left-item mt-20 ml-8">指标排行榜</div>
        <template #contain>
          <ranking
            :around-list="aroundList"
            :around-radio="aroundRadio"
            @removeAround="removeAround"
            @handleSearch="handleSearch"
            @handleChangeLeftRadio="handleChangeLeftRadio"
            @handleChangeRightRadio="handleChangeRightRadio"
          />
        </template>
      </prop-item>

      <!-- 收益指标 -->
      <prop-item v-if="mapType === 'city'" @open="setSyzb()">
        <div class="left-item mt-20 ml-8">收益指标</div>
        <template #contain>
          <div id="syzb" class="full" />
        </template>
      </prop-item>
    </div>

    <!-- 地图左下角图 -->
    <div v-if="showType=='map'" class="left-bottom-pop">
      <!-- 资产状态环形图 -->
      <zczt-item v-if="mapType === 'china'" />
      <!-- 项目液态 -->
      <xmyt-item v-if="mapType === 'city'" />
    </div>

  </div>
</template>

<script>
import MapData from '../mapData'
import PropItem from './blocks/propItem'
// import ThreeMapDetail from '../threeMapDetail/index' // 三级地图-旧
import Ranking from './blocks/ranking.vue' // 指标排行榜
import ZcztItem from './blocks/zczt' // 资产状态
import XmytItem from './blocks/xmyt' // 项目液态
// 三级地图
import TencentMap from '../tencentMap'
export default {
  name: 'MapContent',
  components: { TencentMap, MapData, PropItem, Ranking, ZcztItem, XmytItem },
  props: {
    // 数据

  },
  data() {
    return {
      aroundRadio: '客流0',
      aroundList: [
        { title: 'NOI', leftActive: true, rightActive: false, value: '1', value1: '2' },
        { title: 'IRR', leftActive: false, rightActive: false, value: '3', value1: '4' },
        { title: '估值', leftActive: false, rightActive: false, value: '5', value1: '5' },
        { title: '成本', leftActive: false, rightActive: false, value: '7', value1: '8' }
      ],
      showType: 'map',
      mapType: 'china' // 一级二级
    }
  },

  methods: {
    // 三级页点击定位点事件
    handleChangePoint(item) {
      this.$emit('handleChangePoint', item)
    },
    showMap() {
      this.showType = 'map'
    },
    // 地图三级list点击事件
    handlerTooltipSelected(e, params) {
      this.showType = 'threeMap'
      this.$emit('handlerTooltipSelected', e, params)
    },
    // 设置收入比重
    setSrbz() {
      const assets = this.$echarts.init(document.getElementById('srbz'))

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: [{
          textStyle: {
            color: '#3BAEFE',
            fontSize: 12,
            fontFamily: '微软雅黑'
          },
          itemWidth: 8,
          itemHeight: 8,
          left: 0,
          data: [{
            name: '租金收入',
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            icon: 'circle'
          },
          {
            name: '物管收入',
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            icon: 'circle'
          },
          {
            name: '多经收入',
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            icon: 'circle'
          }
          ]
        },
        {
          top: '0',
          right: '15%',
          textStyle: {
            color: '#3BAEFE',
            fontSize: 12,
            fontFamily: '微软雅黑'
          },
          itemWidth: 8,
          itemHeight: 4,
          data: [{
            name: '增长率',
            itemStyle: {
              borderWidth: 11
            },
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            icon: 'rect'
          }]
        }
        ],
        xAxis: [{
          type: 'category',
          data: ['2016', '2017', '2018', '2019', '2020'],
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} %'
          }
        }
        ],
        series: [
          {
            name: '租金收入',
            type: 'bar',
            barWidth: 10,
            stack: 'bar1',
            zlevel: 1,
            itemStyle: {
              // barBorderRadius: 20,
              color: '#004948'
            },
            data: [120, 132, 101, 134, 90]
          },
          { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            stack: 'bar2',
            zlevel: 2,
            itemStyle: {
              color: 'transparent'
            },
            data: [90, 100, 70, 100, 60]
          },
          {
            name: '物管收入',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            stack: 'bar2',
            zlevel: 2,
            itemStyle: {
              barBorderRadius: 20,
              color: '#3B8995'
            },
            data: [220, 182, 191, 234, 200]
          },
          { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            stack: 'bar3',
            zlevel: 3,
            itemStyle: {
              color: 'transparent'
            },
            data: [200, 170, 120, 200, 180]
          },
          {
            name: '多经收入',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            stack: 'bar3',
            zlevel: 3,
            itemStyle: {
              barBorderRadius: 20,
              color: '#B2D8B8'
            },
            data: [250, 192, 201, 244, 350]
          },
          {
            symbol: 'none',
            name: '增长率',
            type: 'line',
            yAxisIndex: 0,
            zlevel: 3,
            data: [150, 119, 73, 200, 30],
            itemStyle: {
              normal: {
                color: '#8B6E18',
                lineStyle: {
                  width: 3
                }
              }
            }
          }
        ]
      }

      option && assets.setOption(option)
    },

    // 设置收益指标
    setSyzb() {
      const assets = this.$echarts.init(document.getElementById('syzb'))

      const option = {
        color: ['#84670B', '#B5B18B', '#28A9A2', '#004948'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['IRR', 'ROE', 'ROI', 'YOC'],
          textStyle: {
            color: '#848382'
          },
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 8,
          align: 'right',
          right: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2016', '2017', '2018', '2019', '2020'],
            splitLine: {
              show: false
            },
            color: '#848382',
            axisLine: {
              lineStyle: {
                color: '#848382'
              }
            },
            axisLabel: {
              color: '#848382'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              lineStyle: {
                color: '#848382'
              }
            }
          }
        ],
        series: [
          {
            name: 'IRR',
            type: 'line',
            showSymbol: false,
            data: [10, 5, 8, 4, 20]
          },
          {
            name: 'ROE',
            type: 'line',
            showSymbol: false,
            data: [12, 7, 18, 7, 22]
          },
          {
            name: 'ROI',
            type: 'line',
            showSymbol: false,
            data: [7, 20, 24, 8, 4]
          },
          {
            name: 'YOC',
            type: 'line',
            showSymbol: false,
            data: [22, 10, 22, 17, 19]
          }
        ]
      }

      option && assets.setOption(option)
    },

    removeAround(index) {
      this.aroundList.splice(index, 1)
    },
    handleSearch(idx) {
      console.log(idx)
      const activeObj = this.aroundList.find((ele, index) => index === idx)
      if (activeObj) {
        this.aroundRadio = activeObj.title + '1'
      }
    },
    handleChangeLeftRadio(index) {
      this.aroundList[index].leftActive = !this.aroundList[index].leftActive
      this.aroundList.forEach((ele, idx) => {
        if (index !== idx) {
          ele.leftActive = false
        }
      })
    },
    handleChangeRightRadio(index) {
      this.aroundList[index].rightActive = !this.aroundList[index].rightActive
      this.aroundList.forEach((ele, idx) => {
        if (index !== idx) {
          ele.rightActive = false
        }
      })
    },

    // 一级二级地图缩放 isCity: true 二级  false：一级
    handlerRoom(isCity) {
      const mapType = isCity ? 'city' : 'china'
      this.mapType = mapType
      this.$emit('mapChange', mapType)
    }
  }
}
</script>

<style lang="scss" scoped>
    .box{
        box-sizing: border-box;
    }
  .main-map-box{
      height: 646px;
      width: 100%;
    }

    .left-pop{
        position: absolute;
        left: 0;
        top: 52px;
    }
    .left-item{
        width: 32px;
        padding: 12px 9px;
        box-sizing: border-box;
        background: #C8C6A9;
        border-radius: 16px;
        color: #004948;
        line-height: 18px;
        cursor: pointer;

        &:hover{
            color: #C5C4A7;
            background: #004948;
        }
    }
    .full{
        width: 100%;
        height: 100%;
    }
    .left-bottom-pop{
        position: absolute;
        bottom: 30px;
        left: 0px;
        width: 250px;
        z-index: 99;
    }
         .title{
        font-size: 18px;
        font-weight: bold;
        color: #050101;
        line-height: 32px;
        border-bottom: 1px solid #D1CEC9;
        .border-b1{
        display: inline-block;
        width: 140px;
        border-bottom:1px solid #050101;
        }
    }

</style>
