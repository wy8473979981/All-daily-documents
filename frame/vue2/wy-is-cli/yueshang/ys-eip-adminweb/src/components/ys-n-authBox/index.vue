<template>
  <div class="auth-page login-page">
    <slot></slot>
    <!-- <p class="copy-right">Copyright&nbsp;&copy;&nbsp;2019&nbsp;YUESHANG&nbsp;上海悦商信息科技有限公司&nbsp;沪ICP备15034598号&nbsp;沪网文[2016]0005-005号</p> -->
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
div.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ::v-deep .form-box {
    width: 300px;
    // padding: 0px 20px;
    display: flex;
    // align-items: center;
    flex-direction: column;
    border-radius: 5px;
    > section {
      display: flex;
      align-self: flex-start;
      align-items: baseline;
      h5 {
        margin-bottom: 10px;
        margin-right: 5px;
      }
      a {
        font-size: 10px;
      }
    }
    form {
      width: 100%;
      // height: 172px;
    }
    .el-input__inner {
      border-radius: 0px;
      padding: 0 21px 0 44px;
    }
    button.el-button {
      width: 100%;
    }
  }
  .copy-right {
    position: absolute;
    bottom: 80px;
    color: rgb(234, 234, 234);
    font-weight: 400;
    font-size: 14px;
  }
}
.login-page {
  // position: fixed;
  // top: 100px;
  // left: 240px;
  width: 100%;
  height: 100%;
  background-color: #f3f5f7;
}
</style>
