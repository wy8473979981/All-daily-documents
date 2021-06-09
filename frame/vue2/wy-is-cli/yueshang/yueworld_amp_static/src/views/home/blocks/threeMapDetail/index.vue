<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="position-relative">
    <img style="width: 727px" :src="ThreeMapImg">
    <img src="../../../../assets/image/point1.png" class="point1" @click="handleChangePoint(1)">
    <img src="../../../../assets/image/point2.png" class="point2" @click="handleChangePoint(2)">
    <img src="../../../../assets/image/point3.png" class="point3" @click="handleChangePoint(3)">
    <div class="flex-ju-end position-absolute tool-bar">
      <!--      <div class="icon-box flex-ju-al-center mr-8"><img src="../../../../assets/image/back.png"/></div>-->
      <!--      <div class="icon-box flex-ju-al-center mr-8"><img src="../../../../assets/image/clock.png"/></div>-->
      <div class="icon-box flex-ju-al-center mr-8"><img src="../../../../assets/image/fullscreen.png"></div>
    </div>
  </div>
</template>

<script>
import ThreeMapImg from '@/assets/image/threeMap.png'
export default {
  name: 'ThreeMapDetail',
  data() {
    return {
      ThreeMapImg
    }
  },
  methods: {
    handleChangePoint(item) {
      this.$emit('handleChangePoint', item)
    }
  }
}
</script>

<style scoped lang="scss">
  .tool-bar{
    width: 727px;
    top: 11px;
    left: 0px;
    .icon-box{
      width: 32px;
      height: 20px;
      background: #E0DFDD;
      border-radius: 16px;
      cursor: pointer;
    }
  }
  .point1{
    top: 231px;
    left: 331px;
    z-index: 1;
    position: absolute;
    cursor: pointer;
  }
  .point2{
    top: 259px;
    left: 217px;
    z-index: 1;
    position: absolute;
    cursor: pointer;
  }
  .point3{
    top: 316px;
    left: 305px;
    z-index: 1;
    position: absolute;
    cursor: pointer;
  }
</style>
