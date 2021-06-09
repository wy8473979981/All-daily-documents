<template>
  <div class="common-title-container">
    <span> {{ title }} </span>
    <span class="icon-plus">
      <i v-if="isShowPlus" class="el-icon-circle-plus"  @click="handleClick(true)"></i>
      <i v-if="!isShowPlus" class="el-icon-remove down"  @click="handleClick(false)"></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '考核'
    }
  },
  data() {
    return {
      isShowPlus: true
    }
  },
  methods: {
    handleClick(isPlus) {
      this.isShowPlus = !isPlus
      this.$emit('click', this.title, isPlus)
    }
  }
}
</script>
<style lang="scss" scoped>
.common-title-container {
    width: 244px;
    line-height: 24px;
    background: #E5E2DE;
    border-radius: 12px;
    color: $font-word-color;
    font-size: $font-base-size;
    padding: 0 8px;
    .icon-plus {
        color: #485F47;
        float: right;
        cursor: pointer;
        i {
            font-size: 16px;
            transform: translateY(1px);
        }
    }
}
</style>