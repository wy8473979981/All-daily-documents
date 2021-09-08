<template>
  <div class="x-title">
    <div :class="['x-title--main', { underline: underline }, size]">
      <i v-if="icon" :class="['x-title--main-icon', icon]"></i>
      <span class="x-title--main--inner">{{ title }}</span>
    </div>
    <div class="x-title--right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "YsNTitle",

  props: {
    title: {
      type: String,
      default: "标题",
    },

    size: {
      type: String,
      default: "small", // medium / small / mini  字体大小 18 16 14 px
    },

    // color: {
    //   type: String,
    //   default: '' // 字体颜色 不传默认 #050101
    // },

    underline: {
      type: Boolean,
      default: false, // 主标题是否有下划线 下划线颜色 默认使用标题字体颜色
    },

    icon: {
      type: String,
      default: "", // 主标题左边的icon class 默认使用标题字体颜色 只能传一个icon
    },
  },
};
</script>

<style lang="scss" scoped>
.x-title {
  display: flex;
  width: 100%;
  border-bottom: 1px solid $subMenuLineColor;
  height: 30px;

  &--main {
    line-height: 24px;
    padding: 3px 40px 3px 0;
    font-size: 16px;
    color: $font-word-color;
    display: flex;
    justify-content: center;
    font-weight: bold;
    &.medium {
      font-size: 18px;
      padding-left: 9px;
    }
    &.small {
      font-size: 16px;
    }
    &.mini {
      font-size: 14px;
    }

    &-icon {
      line-height: 24px;
      padding-right: 5px;
    }

    &.underline {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 2px;
        width: 100%;
        background: $font-word-color;
      }
    }
  }

  &--right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
}
</style>
