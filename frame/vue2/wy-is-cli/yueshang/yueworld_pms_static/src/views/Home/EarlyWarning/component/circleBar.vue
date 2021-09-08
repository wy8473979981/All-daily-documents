<template>
  <div class="ranking-echarts">
    <div class="ttitle">
      <p>{{circleBarData.title}}</p>
      <div class="afterborder" />
      <div class="beforeborder" />
    </div>
    <div class="titleecharts">
      <div class="titleechartsbj" v-for="(item,index) in circleBarData.echartData" :key="index">
        <div class="echartshead" :style="{'color':item.nameColor}">{{item.name}}:{{item.value}}</div>
        <div class="echarts">
          <ysn-echartGauge :echartValues="item.echartValues" :circleIndex="item.circleIndex"></ysn-echartGauge>
        </div>
        <p>{{item.descText1}}</p>
        <p>{{item.descText2}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarningCircleBar',
  props: {
    circleBarData: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
  .ranking-echarts {
    .ttitle{
      width: 236px;
      height: 25px;
      font-size: 14px;
      color: #050101;
      position: relative;
    .afterborder{
      position: absolute;
      bottom: 0;
      width: 236px;
      height: 1px;
      background: #D1CEC9;
    }
    .beforeborder{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 122px;
      height: 1px;
      background: #050101;
    }
    }
    .titleecharts{
      display: flex;
      align-items: center;
      margin-top: 10px;
    .titleechartsbj{
      width: 140px;
    .echartshead{
      font-size: 14px;
      font-weight: bold;
      color: #1C4C7F;
    }
    p{
      width: 74px;
      text-align: center;
      font-size: 14px;
      color: #050101;
    }
    }
    }
    .echarts {
      margin:8px 0;
      width: 82px;
      height: 82px;
    }
  }
</style>
