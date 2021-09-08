<template>
  <div v-if="uploadShow" class="upload">
    <!-- //设置显示字段 -->
    <div class="box">
      <div class="title">
        <p>设置显示字段</p>
        <span @click="close"> <i class="el-icon-close" /> </span>
      </div>
      <ul>
        <li v-for="(item, index) in checkedList" :key="index">
          <el-checkbox v-model="item.val">{{ item.name }}</el-checkbox>
        </li>
      </ul>
      <div class="bottom">
        <button @click="close">保存</button>
        <button @click="close">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadShow: false, // 是否显示
      checkedList: [
        { val: false, name: '地上建面(m²)' },
        { val: false, name: '地下建面(m²)' },
        { val: false, name: '地价(万元)' },
        { val: false, name: '开发成本(万元)' },
        { val: false, name: '市政配套费(万元)' },
        { val: false, name: '资本化利息' },
        { val: false, name: '管理费用' },
        { val: false, name: '成本合计' },
        { val: false, name: '成本合计1' },
        { val: false, name: '备注' },
        { val: false, name: '租金' }
      ]
    }
  },
  methods: {
    close() {
      this.uploadShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(71, 66, 66, 0.8);

  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    width: 358px;
    height: 563px;
    background: #f2f1ec;
    opacity: 1;
    padding: 16px 20px;
    position: relative;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-bottom: 1px solid #d1cec9;
      p {
        width: 128px;
        // height: 28px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #050101;
        line-height: 28px;
        padding-bottom: 8px;
        border-bottom: 1px solid #050101;
        position: relative;
        top: 1px;
        padding: 0 10px;
      }
    }
    ul {
      margin: 10px 0;

      li {
        padding: 0 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #050101;
        line-height: 36px;
        margin-bottom: 4px;
        ::v-deep.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #050101;
        }
        ::v-deep.el-checkbox__input.is-checked .el-checkbox__inner {
          border-radius: 2px;
          background: #bf9000;
          width: 16px;
          height: 16px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ::v-deep.el-checkbox__input {
          width: 16px;
          height: 16px;
        }
        ::v-deep.el-checkbox__inner::after {
          width: 4px;
          height: 9px;
        }
      }
      li:hover {
        background: #eaeaea;
        border-radius: 22px;
      }
    }
    .bottom {
      height: 60px;
      width: 100%;
      background: #ffffff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        width: 86px;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 24px;
        border-radius: 16px;
        border: none;
      }
      :nth-child(1) {
        background: #004948;
        margin-right: 10px;
      }
      :nth-child(2) {
        background: #d1cec9;
        margin-right: 18px;
      }
    }
  }
}
</style>
