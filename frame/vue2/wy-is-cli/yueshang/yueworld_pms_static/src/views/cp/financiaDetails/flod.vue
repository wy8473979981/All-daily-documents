<template>
  <div class="flod" :class="{'unspread': flod}">
    <div class="flod-header">
      <div class="flod-header--title">
        <span class="flod-header--title-main">{{ title }}</span>
        <slot name="header" />
      </div>
      <div class="flod-header--right">
        <div v-if="showFlod" class="flod-header--flod" @click="handleFold">
          {{ !flod ? '收起' : '展开' }}
          <i :class="flod ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
        </div>

        <div class="flod-header-custom">
          <slot name="action" />
        </div>
      </div>
    </div>

    <div class="flod-content" :class="className" :style="{height: flod ? 0 : contentHeight}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flod',

  props: {
    title: {
      type: String,
      default: 'title'
    },

    showFlod: { // 使用默认收起展开
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      flod: false,
      className: '',
      contentHeight: 'fit-content'
    }
  },

  created() {
    this.className = `flod-content--${Math.random()}`.replace('.', '')
  },

  mounted() {
    // setTimeout(() => {
    //   this.contentHeight = document.querySelector(`.${this.className}`).clientHeight + 'px'
    // }, 5000)
  },

  methods: {
    handleFold() {
      this.flod = !this.flod
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
    height: 28px;
    line-height: 28px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

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
</style>
