<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 自定义表头组件-item
-->
<template>
  <el-tooltip :disabled="item[Object.keys(item)[0]].length<=6" :content="item[Object.keys(item)[0]]" placement="top" effect="dark">
    <div class="item text-truncate" :class="getClass(item)" @click="chooseItem(item)">
      {{ item[Object.keys(item)[0]] }}
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'Item',
  props: {
    // 单项配置
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    chooseItem(item) {
      if (item.showFixed) {
        return
      }
      this.$emit('chooseItem', item)
    },
    // 获取class
    getClass(item) {
      const { isShow, showFixed } = item
      // 禁止选择
      if (showFixed) {
        return 'disabled isShow'
      }
      // 已选择
      if (isShow) {
        return 'isShow'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item{
    height: 24px;
    line-height: 24px;
    width: 132px;
    background: #E5E2DE;
    color: #050101;
    font-size: 14px;
    border-radius: 12px;
    text-align: left;
    padding: 0 32px 0 16px;
    cursor:pointer;
    display: inline-block;
    &:hover{
      background: #D1CEC9;
    }
    &.disabled{
        opacity: 0.5;
        cursor: no-drop;
        &:hover{
          background: #1C4C7F !important;
        }
    }

    &.isShow{
      color: #fff;
      background: #1C4C7F;
      position: relative;
      &:hover{
        background: #20384A;
      }
      &:after{
        content: '';
        display: inline-block;
        height: 10px;
        width: 10px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -5px;
      }
    }
}
</style>
