<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 详情组件
-->
<template>
  <ul class="text-14 flex-wrap w-100 display-info pl-8 ml-2">
    <li
      v-for="(item, index) in config"
      :key="'ul' + index"
      class="d-flex pb-16 pr-16"
      :style="{width:(item.span && colVal * item.span+'%') || colVal+'%'}"
    >
      <span class="display-info-label">{{ item.label }}</span>
      <slot v-if="item.hasSlot" v-bind="item" :name="item.prop" />
      <span
        v-else
        :class="(item.click && 'a-label') || 'color-dark'"
        class="display-info-value"
        @click="item.click && item.click(data, item)"
      >
        {{ (item.formatter && item.formatter(data)) || data[item.prop] || '--' }}
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'YsnDisplayInfo',
  props: {
    // 总的col布局
    column: { type: Number, default: 24 },
    config: { type: Array, default: () => [] },
    data: { type: Object, default: () => {} }
  },
  computed: {
    // 整体列数对应的col
    colVal() {
      return 100 / this.column
    }
  }
}
</script>

<style lang="scss" scoped>
.underline {
    text-decoration: underline;
}
.display-info>li{
  flex-flow: column;
  line-height: 1;
  .display-info-label{
    font-size: 12px;
    color: #848382;
    padding-bottom: 8px;
  }

  .display-info-value{
    color: #050101;
    line-height: 14px;
    font-size: 14px;
  }
}
</style>
