<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:AMP-一级地图 资产状态环形图
-->
<template>
  <div class="left-bottom-pop">
    <div class="title mb-12">
      <span class="pb pl-16 border-b1">资产状态</span>
    </div>
    <div class="flex-ju-al-between mt-12">
      <div>
        <div class="mb-12">
          <div class="box">
            <div class="b-ria-8 mr-4" />
            <div class="color_b font-12">在营</div>
          </div>
          <div class="color-050101 font-12 pl-12">总建面<span class="font-12">(万平)</span></div>
          <div class="color-050101 font-22 pl-12 pt-4">687.86</div>
        </div>
        <div class="mb-12">
          <div class="box">
            <div class="b-ria-8 mr-4" />
            <div class="color_b font-12">在建</div>
          </div>
          <div class="color-050101 font-12 pl-12">总建面<span class="font-12">(万平)</span></div>
          <div class="color-050101 font-22 pl-12 pt-4">432.64</div>
        </div>
      </div>

      <div>
        <div class="p-12">
          <div id="zczt" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ZcztItem',
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {
    this.setZczt()
  },
  methods: {
  // 资产状态设置
    setZczt() {
      const assets = this.$echarts.init(document.getElementById('zczt'))
      const color = ['#004948', '#41B2AB']
      const option = {
        color: color,
        // backgroundColor: '#F2F1EC',
        title: {
          text: '资产状态\n分布',
          textStyle: {
            color: '#333333',
            fontSize: 14,
            fontWeight: 'normal'
          },
          x: 'center',
          y: 'center'
        },
        tooltip: {
          show: false,
          trigger: 'item'
        },
        legend: {
          show: false,
          orient: 'vertical',
          right: 20,
          top: 20
        },
        series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['70%', '90%'],
          label: {
            show: false
          },
          data: [{
            value: 220,
            name: '社会组织'
          }, {
            value: 120,
            name: '事业单位'
          }
          ]
        }]
      }
      option && assets.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
  .text{
        font-size:12px;
        color:#000000;
    }
    .box{
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .left-bottom-pop{
        width: 250px;
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

    .b-ria-8{
        width:8px;
        height:8px;
        background:#41B2AB;
        border-radius: 50%;
    }
    #zczt{
         width: 128px;
        height: 128px;
    }

</style>
