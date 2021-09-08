<template>
  <div>
    <div class="d-flex">
      <div class="b-border">
        <div class="pd-30">达标率</div>
      </div>
      <div class="b-d">
        <div class="" />
      </div>
    </div>

    <div class="d-flex_2">
      <div>
        <div class="d-flex_3">
          <div class="wh-8" />
          <div class="font-1">收益完成率</div>
        </div>
        <div class="font-2">92.14%</div>
      </div>
      <div>
        <div class="d-flex_3">
          <div class="wh-9" />
          <div class="font-1">出租率</div>
        </div>
        <div class="font-2">86.75%</div>
      </div>

      <div>
        <div class="d-flex_3">
          <div class="wh-10" />
          <div class="font-1">租金达成率</div>
        </div>
        <div class="font-2">75.64%</div>
      </div>
    </div>

    <div class="d-flex_4">
      <!-- 左边 -->
      <div>
        <div>
          <div class="color-font">收益<span>(亿元)</span></div>
          <div class="color-font2">299.64%</div>
        </div>
        <div style="margin-top:9px">
          <div class="color-font">计租铺位数<span>(个)</span></div>
          <div class="color-font2">299.64%</div>
        </div>
        <div style="margin-top:9px">
          <div class="color-font">租金收入<span>(亿元)</span></div>
          <div class="color-font2">299.64%</div>
        </div>
      </div>
      <!-- 右边 -->
      <div style="">
        <div>
          <div id="test" style="width:128px;height:128px;" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TopHome',
  data() {
    return {

    }
  },
  mounted() {
    const myCharts = this.$echarts.init(document.getElementById('test'))
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
          data: [data],
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
          data: [data],
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
          data: [data],
          barCateGoryGap: '10%'
        }
      ]
    }
    option && myCharts.setOption(option)
  }
}
</script>

<style scoped>
     .d-flex{
      display: flex;
      justify-content: space-between;
      margin-top:55px;
      /* justify-content: space-between; */
      /* width:100%; */
      /* padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #E0DFDD; */
  }
  .pd-20{
     display: inline-block;
    vertical-align: middle;
    width:48px;
    text-align: center;
    /* margin: 0 5px 15px 5px; */
    height: 24px;
    line-height: 24px;
    background:#6F120C;
    border-radius: 30px;
    color: #ffffff;
    font-size: 12px;
    /* padding: 4px 12px; */
}
  .pd-30{
    vertical-align: middle;
    /* margin: 0 5px 15px 5px; */
    height: 24px;
    line-height: 24px;
    /* background:#6F120C; */
    border-radius: 30px;
    color: #050101;
    font-size: 18px;

}
.pd-40{
    /* display: inline-block; */
    /* vertical-align: middle; */
    /* margin: 0 5px 15px 5px; */
     margin-top:8px;
    height: 24px;
    line-height: 24px;
    background:#6F120C;
    border-radius: 30px;
    color: #ffffff;
    font-size: 12px;
     padding: 4px 47px 4px 21px;
}
.t-center{
    text-align: center;
    margin-top:15px;
    font-size:14px;
    color:#BEBEBE;
}
.b-border{
      padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #050101;
      width:50%;
}
.b-d{
   padding-bottom: 8px;
      align-items: center;
      border-bottom: 1px solid #E0DFDD;
        width:50%;
        text-align:right
}
.d-flex_2{
    display:flex;
    justify-content: space-between;
    margin-top:9px;
}
.d-flex_3{
    display:flex;
    justify-content: center;
    align-items: center;
    /* justify-content: space-between; */
}
.wh-8{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#014543;
    border-radius: 50%;
    /* justify-content: center;
    align-items: center; */
}
.wh-9{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#3B8995;
    border-radius: 50%;
    /* justify-content: center;
    align-items: center; */
}
.wh-10{
    width:8px;
    height:8px;
    line-height: 8px;
    background:#B2D8B8;
    border-radius: 50%;
    /* justify-content: center;
    align-items: center; */
}
.font-1{
    color:#000000;
    font-size:12px;
   margin-left:2px;
}
.font-2{
    color:#050101;
    font-size:16px;
    text-align: center;
    margin-top: 5px;
}
/* .d-flex_3{
    display:flex;
    margin-top:13px;
      justify-content: space-between;
} */
.d-flex_4{
    display:flex;
    margin-top:13px;
    justify-content: space-between;
    align-items: center;
}
.color-font{
    color:#050101;
    font-size:14px;
}
.color-font span{
    font-size: 12px;
}
.color-font2{
    color:#050101;
    font-size:22px;
}
</style>
