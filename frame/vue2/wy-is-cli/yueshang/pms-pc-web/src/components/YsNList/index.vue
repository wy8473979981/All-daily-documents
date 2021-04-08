<template>
  <div class="x-list">
    <template v-for="(item, idx) in config">
      <div class="x-list__item" :key="idx">
        <div class="x-list__item-title">{{ item.label }}</div>
        <div class="x-list__item-data">{{list[item.key] | formatter(item.type)}}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { formatNumber } from 'utils/utils'
export default {
  name: 'YsNList',

  props: {
    list: {
      type: Object, 
    },

    config: Array,
  },

  filters: {
    formatter(...props) {
      return formatNumber(...props)
    }
  },

  // data() {
  //   return {
  //     displayList: []
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.x-list {
  display: flex;
  flex-wrap: wrap;

  &__item {
    display: flex;
    flex-direction: column;
    min-width: 100px;
    padding-right: 30px;

    &-title {
      color: $font-sub-color;
      line-height: 20px;
    }

    &-data {
      font-size: $font-record-size;
      color: $font-record-color;
      line-height: 34px;
      margin-top: 4px;
      font-weight: 500;
    }
  }
}
</style>
