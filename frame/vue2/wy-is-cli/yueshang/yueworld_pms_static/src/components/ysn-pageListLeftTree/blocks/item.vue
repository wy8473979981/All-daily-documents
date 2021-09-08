<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 列表左侧菜单树-item组件
-->
<template>
  <div class="item text-truncate" :class="actived&&'actived'">
    {{ allText?`全部${allText}`:item.label }}
  </div>
</template>

<script>

export default {
  name: 'Item',
  props: {
    // 单项配置
    item: {
      type: Object,
      default: () => {}
    },
    // 是否选中
    actived: {
      type: Boolean,
      default: false
    },
    // 是否为全部
    allText: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.item{
    height: 24px;
    line-height: 24px;
    width: 100%;
    background: $subMenuBg;
    color: $menuDefaultColor;
    font-size: 14px;
    border-radius: 12px;
    text-align: left;
    margin-bottom:12px;
    padding: 0 16px;
    cursor:pointer;
    display: inline-block;
    &.actived{
      color: #fff;
      background: $subMenuHover;
    }
}
</style>
