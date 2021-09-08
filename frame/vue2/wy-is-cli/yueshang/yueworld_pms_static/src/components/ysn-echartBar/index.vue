<template>
  <!-- 排名地图 -->
  <div style="height: 100%; width: 100%" class="d-flex-column">
    <div class="echarts-tabs" v-if="echartsRadioData.length>0">
      <div v-if="echartsRadioData[0].title">{{echartsRadioData[0].title}}</div>
      <el-radio-group v-model="echartsRadio" v-else>
        <el-radio :label="item.label" v-for="item in echartsRadioData" :key="item.label">{{item.name}}</el-radio>
      </el-radio-group>
    </div>

    <div
      id="myEchartsBar"
      ref="myEchartsBar"
      class="map-container flex1"
    />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'zrender/lib/svg/svg'
// import "./china.js";
export default {
  name: 'YsnEchartBar',
  props: {
    // radio数组
    echartsRadioData: {
      type: Array, default: () => []
    },
    // 折线图数据
    echartsOptions: {
      type: Object, default: () => {}
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
      const mapDiv = document.getElementById('myEchartsBar')
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
</style>
