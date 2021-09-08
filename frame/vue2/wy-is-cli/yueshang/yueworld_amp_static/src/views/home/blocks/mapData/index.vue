<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页-地图模块
-->
<template>
  <div class="box-main position-relative">
    <ysn-map-china
      v-bind="$attrs"
      :china-data="chinaMapData"
      :province-data="provinceMapData"
      v-on="$listeners"
      @room="handlerRoom"
      @change="handlerMapChinaChange"
      @detail="handlerMapChinaDetail"
      @geoSelected="handlerGeoSelected"
      @tooltipSelected="handlerTooltipSelected"
    />
  </div>
</template>

<script>
import YsnMapChina from './components/ysn-map/ysn-map-china'
export default {
  name: 'MapData',
  components: { YsnMapChina },
  props: {
  },
  data() {
    return {
      chinaMapData: [
        {
          name: '上海市',
          // label: {
          //   show: true
          // },
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
          value: 0,
          itemStyle: {
            normal: {
              opacity: 0,
              label: {
                show: false
              }
            }
          }
        }
      ],
      provinceMapData: [
        {
          name: '嘉定区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '宝山区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '闵行区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '浦东区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '奉贤区',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '青浦区',
          label: {
            show: true
          },
          value: 2,
          switchName: '测算开关',
          switchValue: false
        },
        {
          name: '苏州市',
          label: {
            show: true
          },
          value: 1,
          switchName: '测算开关',
          switchValue: false
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    // 地图切换开关
    handlerMapChinaChange(value, params) {
      console.log('handlerMapChinaChange', value, params)
    },
    // 详情回调事件
    handlerMapChinaDetail(value) {
      console.log('handlerMapChinaDetail', value)
      this.mapName = value.name
    },
    // 地图缩放地图切换事件
    handlerRoom(value) {
      console.log('handlerRoom is china city', value)
      this.$emit('handlerRoom', value)
    },
    // 地图选择事件
    handlerGeoSelected(value) {
      console.log('handlerGeoSelected', value)
    },
    // 地图三级list点击事件
    handlerTooltipSelected(e, params) {
      console.log('tooltipSelected===2', e, params)
      this.$emit('handlerTooltipSelected', e, params)
    }
  }
}
</script>

<style lang="scss" scoped>
    .box-main{
    }
</style>
