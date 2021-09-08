<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%" class="d-flex-column">
    <div class="echarts-tabs" v-if="echartsRadioData.length>0">
      <div v-if="echartsRadioData[0].title">{{echartsRadioData[0].title}}</div>
      <el-radio-group v-model="echartsRadio" v-else class="ysn-radio--group">
        <el-radio :label="item.label" v-for="item in echartsRadioData" :key="item.label">{{item.name}}</el-radio>
      </el-radio-group>
      <div v-if="showPoint" class="flex-ju-al-between echarts-tabs--point">
        <span class="point1 mr-4" />2021
        <span class="point2 ml-8 mr-4" />2020
      </div>
    </div>

    <div
      id="myEcharts"
      ref="myEchart"
      class="map-container flex1"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
import { resizeEchartContent } from '@/utils/echarts'
// import "./china.js";
export default {
  name: 'YsnEchartLine',
  props: {
    // radio数组
    echartsRadioData: {
      type: Array, default: () => []
    },
    // 折线图数据
    echartsOptions: {
      type: Object, default: () => {}
    },
    showPoint: {
      type: Boolean, default: false
    }
  },
  data() {
    return {
      echartsRadio: ''
    }
  },
  computed: {},
  watch: {
    // 监听raido变化
    echartsRadio: function(newVal, oldVal) {
      this.$emit('handelTabsRadioChange', newVal)
    },
    // 监听折线图数据变化
    echartsOptions: {
      handler: function(newVal) {
        this.myEchart.clear()
        this.myEchart.setOption(this.echartsOptions, true)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.echartsRadio = this.echartsRadioData[0].label
      this.initEchartMap()
    })
  },
  methods: {
    // 初始化echart
    initEchartMap() {
      const mapDiv = document.getElementById('myEcharts')
      resizeEchartContent('#myEcharts', { height: false, width: false })
      this.myEchart = echarts.init(mapDiv, null, { renderer: 'svg' })
      this.myEchart.setOption(this.echartsOptions)
    }
  }
}
</script>
<style lang="scss" scoped>
  #myEcharts {
    height: 100%;
    width: 100%;
  }

  .echarts-tabs {
    width: 100%;
    height: 32px;
    background: #e5e2de;
    border-radius: 16px;
    font-size: 14px;
    color: #050101;
    line-height: 32px;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--point {
      margin-right: 10px;
    }
  }

  /* 选中后的字体颜色 */
  ::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #050101 !important;
  }

  /* 选中后小圆点的颜色 */
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #1c4c7f !important;
    border-color: #1c4c7f !important;
  }

  .point1{
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: #4AACD1;
  }
  .point2{
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: #1C4C7F;
    margin-left: 20px;
  }

  .ysn-radio--group {
    margin-top: -2px;
    ::v-deep .el-radio__input{
      margin-top: -2px;
    }
    ::v-deep .el-radio {
      margin-right: 20px;
    }
  }
</style>
