<template>
  <div class="map-info mt-20 ">
    <div class="title"><span class="pb pl-16 border-b1">进度信息</span></div>
    <div class="flex-ju-end flex-al-center mt-12">
      <div class="step step-icon step-icon3 mr-4" />已完成
      <div class="step step-icon step-icon2 mr-4 ml-20" />进行中
      <div class="step step-icon step-icon1 mr-4 ml-20" />未进行
    </div>
    <div class="d-flex mt-12 pl-16">
      <div v-for="(item, index) in stepList" :key="index" class="d-flex">
        <div>
          <div :class="['step','step-box','step-icon'+item.state]">{{ item.name }}</div>
          <div class="text-center text-16 mt-12">{{ item.time }}</div>
        </div>
        <div v-if="index!=stepList.length-1" class="step-line mt-40" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessProgress',
  data() {
    return {
      stepList: [
        { name: '洽谈', state: 3, time: '2020-04-01' },
        { name: '意向', state: 3, time: '2020-04-04' },
        { name: '合同', state: 3, time: '2020-04-08' },
        { name: '双签', state: 2, time: '2020-04-10' },
        { name: '进场', state: 1, time: '2020-04-20' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .map-info{
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #050101;
    line-height: 24px;
    border-bottom: 1px solid #D1CEC9;
    .border-b1{
      position: relative;
      display: inline-block;
      min-width: 140px;
      /*border-bottom:1px solid #050101;*/
    }
    .border-b1::after {
      height: 1px;
      width: 100%;
      transform: scaleY(0.5);
      left: 0;
      content: '';
      position: absolute;
      background-color: #050101;
      bottom: -1px;
    }
  }
  .nomal{
    font-weight: normal;
  }
  .info-box{
  .text-24{
    font-size: 20px;
    color: #050101;
    line-height: 36px;
  }
  .item{
    margin-right: 80px;
  }
  .font-10{
    font-size: 10px;
  }
  .font-14{
    font-size: 14px;
  }
  }
  }
  .step-icon{
    width: 16px;
    height: 16px;
    border-radius: 16px;
  }
  .step.step-icon3{
    background: #1C4C7F;
    border: 2px solid #9ABBDD;
  }
  .step.step-icon2{
    background: #48A0C3;
    border: 2px solid #B3D9E8;
  }
  .step.step-icon1{
    background: #BECBD2;
    border: 2px solid #DAE7EE;
  }
  .step-box{
    width: 82px;
    height: 82px;
    text-align: center;
    line-height: 70px;
    border-radius: 82px;
    font-size: 16px;
    color: white;
    border: 6px solid #9ABBDD;
    &.step{
      border-width: 6px;
    }
  }
  .step-line{
    width: 143px;
    height: 4px;
    background-color: #DFE4E7;
  }
</style>
