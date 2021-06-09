<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 达标率组件
-->
<template>
  <div class="block-main">
    <div class="title mb-12">
      <span class="pb pl-16 border-b1">达标率</span>
    </div>
    <div class="flex-ju-between box">
      <!-- 收益完成率 -->
      <div>
        <div class="flex-ju-al-center">
          <div class="wh-8" />
          <div class="color-black font-12 ml-4">收益完成率</div>
        </div>
        <div class="color-050101 font-16  ml-12 mt-4">92.14%</div>
      </div>

      <!-- 出租率 -->
      <div>
        <div class="flex-ju-al-center">
          <div class="wh-9" />
          <div class="color-black font-12 ml-4">出租率</div>
        </div>
        <div class="color-050101 font-16  ml-12 mt-4">86.75%</div>
      </div>

      <!-- 租金达成率 -->
      <div>
        <div class="flex-ju-al-center">
          <div class="wh-10" />
          <div class="color-black font-12 ml-4">租金达成率</div>
        </div>
        <div class="color-050101 font-16  ml-12 mt-4">75.64%</div>
      </div>

    </div>

    <div class="flex-ju-al-between mt-12">
      <div>
        <div class="mb-12">
          <div class="color-050101 font-14">收益<span class="font-12">(亿元)</span></div>
          <div class="color-050101 font-22 pt-4">299.64</div>
        </div>
        <div class="mb-12">
          <div class="color-050101 font-14">计租铺位数<span class="font-12">(个)</span></div>
          <div class="color-050101 font-22 pt-4">299.64</div>
        </div>
        <div class="mb-12">
          <div class="color-050101 font-14">租金收入<span class="font-12">(亿元)</span></div>
          <div class="color-050101 font-22 pt-4">299.64</div>
        </div>
      </div>

      <div>
        <div class="p-12">
          <div id="ComplianceRateChart" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ComplianceRate',
  components: { },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {
    const myCharts = this.$echarts.init(document.getElementById('ComplianceRateChart'))
    var data = 80
    var option = {
      title: {
        text: '达标率\n占比',
        textStyle: {
          color: '#333333',
          fontSize: 14,
          fontWeight: 'normal'
        },
        x: 'center',
        y: 'center'
      },
      backgroundColor: '#F2F1EC',
      tooltip: { show: false },
      legend: { show: false },
      polar: {
        radius: ['50%', '100%'],
        center: ['50%', '50%']
      },
      angleAxis: { max: 100, show: false },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      },

      series: [
        {
          name: '指标1',
          type: 'bar',
          // radius: ['28%', '48%'],
          silent: true,
          roundCap: true,
          showBackground: true,
          backgroundStyle: { color: '#F2F1EC' },
          coordinateSystem: 'polar',
          itemStyle: { color: '#B2D8B8' },
          data: [75.64],
          barCateGoryGap: '10%'
        },
        {
          name: '指标2',
          type: 'bar',
          // radius: ['58%', '78%'],
          silent: true,
          roundCap: true,
          showBackground: true,
          backgroundStyle: { color: '#F2F1EC' },
          coordinateSystem: 'polar',
          itemStyle: { color: '#3B8995' },
          data: [86.75],
          barCateGoryGap: '10%'
        },
        {
          name: '指标2',
          type: 'bar',
          // radius: ['88%', '98%'],
          silent: true,
          roundCap: true,
          showBackground: true,
          backgroundStyle: { color: '#F2F1EC' },
          coordinateSystem: 'polar',
          itemStyle: { color: '#014543' },
          data: [92.14],
          barCateGoryGap: '10%'
        }
      ]
    }
    option && myCharts.setOption(option)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
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
    .tips{
        float: right;
        padding: 6px 12px;
        background: #6F120C;
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
        line-height: 12px;
        margin-top: 4px;
    }
  }

.wh-8{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#014543;
    border-radius: 50%;
}
.wh-9{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#3B8995;
    border-radius: 50%;
}
.wh-10{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#B2D8B8;
    border-radius: 50%;
}
.color-black{
    color: #000000;
}
.color-050101{
    color: #050101;
}
#ComplianceRateChart{
    width: 128px;
    height: 128px;
}
</style>
