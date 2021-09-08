<template>
  <div class="flod" :class="{'unspread': flod}">
    <div class="flod-header" :class="hiddenSlot?'mb-16':''">
      <div class="flod-header--title">
        <span class="flod-header--title-main">{{ titleText || title }} <span><i v-if="flodicon" style="color:#485F47" class="el-icon-circle-plus cursor-pointer" @click="icons" /></span></span>
        <slot name="header" />
      </div>
      <div class="flod-header--right">
        <div v-if="showFlod" class="flod-header--flod cursor-pointer" @click="handleFold">
          {{ !flod ? '收起' : '展开' }}
          <i :class="flod ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
        </div>
        <div class="flod-header-custom">
          <slot name="action" />
        </div>
      </div>
    </div>
    <el-collapse-transition v-if="!hiddenSlot">
      <div v-show="!flod" class="flod-content">
        <slot />
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
export default {
  name: 'YsnFlod',

  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    titleText: {
      type: [String, Number],
      default: ''
    },
    showFlod: { // 使用默认收起展开
      type: Boolean,
      default: true
    },
    flodicon: { // 使用默认隐藏
      type: Boolean,
      default: false
    },
    hiddenFlod: { // 是否默认收起
      type: Boolean,
      default: false
    },
    // 是否隐藏插槽
    hiddenSlot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      flod: false
    }
  },

  created() {
    this.flod = this.hiddenFlod
  },

  methods: {
    handleFold() {
      this.flod = !this.flod
    },
    icons() {
      this.$emit('iconsval', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.flod {
  display: flex;
  width: 100%;
  flex-direction: column;

  &-header {
    height: 38px;
    line-height: 38px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: $font-word-color;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      // background-color: $subMenuLineColor;
      background: #dfe4ed;
    }
    &--right {
       padding-bottom: 4px;
    }
    &--title {
      display: flex;
      padding: 0 10px;
      width: fit-content;
      position: relative;
      z-index: 1;
      min-width: 130px;
      font-weight: bold;
      // color: $font-word-color;
      font-size: 16px;

      &-main {
        margin-right: 8px;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        // background-color: $menuHover;
        background: #1C4C7F;
      }
    }

    &--flod {
      font-size: 12px;
    }
  }

  &-content {
    height: fit-content;
    will-change: height;
    transition: 0.3s;
    overflow: hidden;
    margin: 10px 0;
    box-sizing: border-box;
  }
}
.el-checkbox .el-checkbox__inner{
      width: 10px;
      height: 10px;
  }
  .el-checkbox .el-checkbox__label{
      padding-left: 1px;
  }
</style>
