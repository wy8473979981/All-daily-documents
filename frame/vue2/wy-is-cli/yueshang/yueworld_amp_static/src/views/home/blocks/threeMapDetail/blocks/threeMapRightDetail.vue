<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="three-map-right-detail">
    <div class="title text-18 pt-8"><span class="border-b1 text-weight-bold ">{{ threeMapPintInfo.name }}</span></div>
    <img src="../../../../../assets/image/img1.png" class="mt-8 width-100">
    <div class="project-info flex-ju-al-between border-b">
      <div class="text-14 flex-al-center">
        <div class="left-line" />
        <div class="text-weight-bold color-050101">项目信息</div>
      </div>
      <svg-icon icon-class="up-arrow-blue" class="icon iconw" style="font-size: 26px" />
    </div>
    <div class="project-content p-16">
      <div class="pb-8 text-14 d-flex">
        <div class="info1">公司项目</div><div class="info2">上海</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">项目位置</div><div class="info2 flex-1">{{ threeMapPintInfo.location }}</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">开业时间</div><div class="info2">2013-09-30</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">土地使用期限</div><div class="info2">45年（2061-09-30）</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">经营委托期限</div><div class="info2">10年</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">租金包使用期限</div><div class="info2">10年</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">得房率</div><div class="info2">60%</div>
      </div>
      <div class="pb-8 text-14 d-flex">
        <div class="info1">停车位</div><div class="info2">1,025%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeMapRightDetail',
  props: {
    threeMapPintInfo: Object
  }
}
</script>

<style scoped lang="scss">
.three-map-right-detail{
  .border-b{
    border-bottom: 1px solid #D1CEC9;
  }
  .title{
    border-bottom:1px solid #D1CEC9;
    .border-b1{
      position: relative;
      display: inline-block;
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
  .project-info{
    padding: 6px;
    .left-line{
      width: 3px;
      height: 16px;
      background: #485F47;
      margin-right: 6px;
    }
  }
  .info1{
    width: 110px;
    color: #050101;
    font-weight: bold;

  }
  .info2{
    color: #848382;
    font-weight: bold;
    flex: 1;
  }
}
</style>
