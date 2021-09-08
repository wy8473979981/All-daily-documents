<template>
  <div class="widths">
    <!-- 退出测算 -->
    <div class="box">
      <!-- //头部 -->
      <div class="top">
        <div class="left">
          <p>{{ title }}方案</p>
          <span />
        </div>

        <div class="right" @click="serch" />
      </div>
      <!-- 身子 -->
      <div class="body">
        <div
          v-for="(item, index) in planList"
          :key="index"
          class="body-li"
          :style="'width:' + item.width"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.val }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      planList: [
        { name: '方案编号', val: 'FA-7153373', width: '84px' },
        { name: '地产开发事业部', val: '事业二部', width: '84px' },
        { name: '业态', val: '商业', width: '81px' },
        { name: '起始租金（元）', val: '请选择预算年度', width: '84px' },
        { name: '单方总投（元）', val: '6,848', width: '84px' },
        { name: '地价（万元）', val: '商业', width: '81px' },
        { name: '分摊原则', val: '1/4地价', width: '84px' },
        { name: '10年YOC', val: '11.22%', width: '84px' },
        { name: '10年NPV(万元)', val: '43,535', width: '81px' },
        { name: '10年IRR', val: '17.8%', width: '84px' }
      ]

    }
  },
  methods: {
    serch() {
      console.log(33333)
      this.$parent.serchShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.widths {
  width: 363px;
}
.box {
  // width: 363px;
  height: 242px;
  background: #ffffff;
  border-radius: 20px;
  // overflow-x: scroll;
  padding: 24px 0px 0 24px;
  .top {
    // width: 363px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .left {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #050101;
      line-height: 18px;
      display: flex;
      align-items: flex-end;
      span {
        display: inline-block;
        margin-left: 7px;
        width: 10px;
        height: 10px;
        background: #ee7f41;
        border-radius: 50%;
      }
    }
    .right {
      width: 16px;
      height: 16px;
      border: 1px solid #979797;
      border-radius: 50%;
      margin-right: 28px;
    }
  }
}
.body {
  display: flex;
  flex-wrap: wrap;
  // width: 363px;
  .body-li {
    // width: 363px;
    margin-right: 15px;
    :nth-child(1) {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #848382;
      line-height: 12px;
    }
    :nth-child(2) {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050101;
      line-height: 12px;
      margin-top: 4px;
      margin-bottom: 16px;
    }
  }
}
// ::-webkit-scrollbar {
//   /*滚动条整体样式*/
//   width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
//   height: 1px;
// }
</style>
