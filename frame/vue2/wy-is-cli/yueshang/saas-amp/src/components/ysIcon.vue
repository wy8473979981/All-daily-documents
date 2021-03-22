<template>
  <i class="el-icon-check" :class="type"></i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    }
  }
}
</script>

<style lang='scss' scoped>
i {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  color: white;
  &.success{
    background: #1cbd1c;
  }
  &.error{
    background: #ea0909;
  }
}
</style>
