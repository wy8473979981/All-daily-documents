<template>
  <div class="top-bar">
    <i class="el-icon-s-grid top-bar__icon"></i>
    <span class="top-bar__title">{{$route.meta.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'LayoutTopBar',

  created() {}
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  background: #E3E7E9;
  height: 44px;
  min-height: 44px;
   &__icon {
    font-size: $font-title-size;
    color: $font-record-color;
    padding: 0 16px;
  }

  &__title {
    font-size: $font-base-size;
  }
}
</style>