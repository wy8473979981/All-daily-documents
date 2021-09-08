/*
*author: ly
*date： 2021-08-19
*desc： 按钮封装
*/

<template>
  <div class="btn-box" :class="{'primary': type.includes('primary'), 'reset': type.includes('reset')}">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'dlButton',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-box {
  display: inline-block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  color: #848382;
  margin-left: 8px;
}
.primary {
  background-color: #1C4C7F;
  color: #FFFFFF;
}
.reset {
  width: auto;
  margin-left: 16px;
}
</style>
