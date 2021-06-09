<template>
  <div class="history">
    <!-- 历史测算 -->
    <div class="tab">
      <p>上海闵行七宝项目历史测算</p>
      <div class="br" />
      <div class="right">
        <button @click="$router.push('/project')">返回</button>
        <ysn-navSetting class="text-right mb-24" />
      </div>
    </div>
    <div class="body">
      <div v-for="(item, index) in imgUrl" :key="index" class="history-box">
        <div class="left">
          <span />
          <div class="line" />
        </div>
        <div class="right">
          <img :src="item" alt="">
          <div class="top">
            <HistoryCom />
          </div>
        </div>
      </div>
      <div class="mask">
        <div class="right">右滑显示更多</div>
      </div>
    </div>
    <Page />
  </div>
</template>

<script>
import HistoryCom from './components/history-com'
import Page from './components/page'
import img1 from '../assets/Title.png'
import img2 from '../assets/Title (1).png'
import img3 from '../assets/Title (2).png'
import img4 from '../assets/Title (3).png'
import img5 from '../assets/Title (4).png'
import img6 from '../assets/Title (5).png'
export default {
  components: {
    HistoryCom,
    Page
  },
  data() {
    return {
      imgUrl: [img1, img2, img3, img4, img5, img6]
    }
  }
}
</script>

<style lang="scss" scoped>

.tab {
  margin-top: 32px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #050101;
  font-size: 18px;
  // border-bottom: 1px solid #d1cec9;
  position: relative;
  .br {
    width: 100%;
    height: 1px;
    background: #d1cec9;
    position: absolute;
    bottom: -27px;
  }
  p {
    line-height: 28px;
    position: absolute;
    z-index: 5;
    padding-bottom: 8px;
    padding-left: 8px;
    display: inline-block;
    width: 224px;
    line-height: 1;
    border-bottom: 1px solid #050101;
  }
  .right {
    position: absolute;
    right: 0;
    top: -17px;
    display: flex;
    align-items: center;
    button {
      width: 60px;
      height: 32px;
      background: #c8c6a9;
      border-radius: 16px;
      border: none;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
      margin-right: 29px;
      margin-bottom: 24px;
    }
  }
}

.body {
  height: auto;
  padding-top: 64px;
  position: relative;
  .history-box {
    height: 119px;
    width: 100%;
    display: flex;

    // background: rgb(155, 120, 120);
    .left {
      width: 13px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
      span {
        display: inline-block;
        width: 13px;
        height: 13px;
        background: #004948;
        border: 2px solid #ffffff;
        border-radius: 50%;
      }
      .line {
        width: 1px;
        height: 109px;
        border-left: 1px solid #004948;
      }
    }
    .right {
      img {
        margin-bottom: 17px;
      }
      .top {
        //   width: 1113px;
      }
    }
  }
  .mask {
    width: 125px;
    height: 714px;
    background: linear-gradient(90deg, rgba(242, 241, 236, 0) 0%, #f2f1ec 100%);
    position: absolute;
    right: -34px;
    top: 97px;
    z-index: 5;
    .right {
      background: #c8c6a9;
      border-radius: 10px 0px 0px 10px;
      width: 24px;
      height: 132px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      float: right;
      margin-right: 10px;
      margin-top: 186px;
    }
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px !important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px !important;
}
</style>
