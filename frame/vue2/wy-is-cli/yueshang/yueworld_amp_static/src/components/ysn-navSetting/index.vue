<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="nav-title-content">
    <svg-icon icon-class="mail" class="mr-8 icon" />
    <svg-icon icon-class="setting" class="mr-8 icon" />
    <svg-icon icon-class="user" class="mr-4 icon" />
    <span>用户名</span>
  </div>
</template>
<script>
export default {
  name: 'NavSetting'
}
</script>
<style lang="scss">
  .nav-title-content{
    font-size: 24px;
    height: 30px;
    line-height: 30px;
    & .icon{
      vertical-align: middle;
    }
    & span{
      font-size: 14px;
      vertical-align: middle;
      color: #050101;
    }
  }
</style>
