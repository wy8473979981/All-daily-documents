<template>
  <div class="top-list">
    <template v-for="item in config">
      <div class="top-list--item" :key="item.key">
        <div class="top-list--item-label">{{item.label}}:</div>
        <div class="top-list--item-value">{{list[item.key] | formatter(item.type)}}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { formatNumber } from 'utils/utils'
export default {
  name: 'TopList',

  props: {
    config: {
      type: Array,
      required: true
    },

    list: {
      type: Object,
      default: () => ({})
    }
  },

  filters: {
    formatter(val, type) {
      if (type === 'custom') return val === undefined ? '--' : val
      return formatNumber(val, type)
    }
  },
}
</script>

<style lang="scss" scoped>
.top-list {
  display: flex;
  height: 32px;
  line-height: 32px;
  width: 100%;

  &--item {
    display: flex;
    height: 100%;
    font-size: $font-base-size;
    justify-content: center;

    &-label {
      color: $tipsColor;
    }
    &-value {
      color: $font-word-color;
      padding-left: 5px;
      padding-right: 10px;
    }
  }
}
</style>