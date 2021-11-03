<template>
  <!-- 水印 -->
  <div class="watermark">
    <div v-for="(item,index) in num" :key="index">
      <div class="watermark-text" v-if="text != ''" :style="{opacity:opacity,color: color}">{{text}}</div>
      <img class="watermark-img" :src="imgUrl" mode="aspectFill" v-if="imgUrl !='' && text ==''" :style="{opacity:opacity}" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'wm-watermark',
  props: {
    text: {			//设置水印文字
      type: String,
      default: ''
    },
    imgUrl: {		//设置水印图片
      type: String,
      default: ''
    },
    opacity: {		//设置透明度
      type: [Number, String],
      default: 0.1
    },
    num: {			//设置水印数量
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: '#000000'
    }
  },
  data () {
    return {

    };
  }
}
</script>

<style lang="scss">
.watermark {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  z-index: 9999999;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  .watermark-text {
    width: 375px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // text-indent: 60px;
    transform: rotate(-20deg);
    color: #ffffff;
    font-size: 32px;
    white-space: nowrap;
  }
  .watermark-img {
    width: 375px;
    height: 375px;
    z-index: 1;
  }
}
</style>
