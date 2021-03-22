<template>
  <div class="loginBox">
    <i class="logo" :class="size"></i>
    <span>AMP</span>
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
  width: 360px;
  background-color: rgba(255,255,255,1);
  padding: 28px 0 24px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-content: center;
  line-height: 45px;
  justify-content: center;

  i.logo {
    display: block;
    background: url('../../static/img/bl/bl_amp_logo.svg') no-repeat;
    background-position: bottom;
    background-size: contain;
    background-origin: content-box;
    padding-right: 20px;
    &.middle{
      height: 45px;
      width: 123px;
    }
    vertical-align: middle;
  }
  span{
    font-size: 24px;
    color: #333333;
    padding-top: 5px;
  }
}
</style>


