<template>
  <div class="loginBox">
    <!-- <i class="logo" :class="size"></i> -->
    <span>交互中台管理系统</span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'middle'
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.loginBox {
  text-align: center;
  margin-bottom: 21px;
  line-height: 36px;
  // i.logo {
  //   display: block;
  //   background: url("../../static/img/zj/zjdf_logo.png") no-repeat center top;
  //   background-size: contain;
  //   background-origin: content-box;
  //   padding-right: 20px;
  //   &.middle {
  //     height: 45px;
  //     width: 123px;
  //   }
  //   vertical-align: middle;
  // }
  span {
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #1c1c1c;
  }
}
</style>


