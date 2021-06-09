<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-table-column
    v-bind="$attrs"
    :prop="`${Object.keys(item)[0]}`"
    :label="item[Object.keys(item)[0]]"
    :width="item.width || ''"
    :formatter="$attrs.formatter"
    show-overflow-tooltip
    :label-class-name="item.labelCLass"
  >

    <!-- 有多重表格的情况下 -->
    <template v-if="item.tableList&&item.tableList.length>0">
      <YsnTableColumn
        v-for="(_item, index) in item.tableList"
        :key="'ytable' + index"
        v-bind="{ ..._item }"
        :item="_item"
        :fixed="index === 0 && showFixed"
        :prop="`${Object.keys(_item)[0]}`"
        :label="_item[Object.keys(_item)[0]]"
        :width="_item.width || ''"
        :formatter="_item.formatter"
        show-overflow-tooltip
        :show-slots="showSlots"
      >
        <template v-if="isShowSlots(Object.keys(_item)[0])" :slot="Object.keys(_item)[0]" slot-scope="scope">
          <slot v-bind="scope" :name="Object.keys(_item)[0]" />
        </template>
      </YsnTableColumn>

    </template>

    <template v-if="isShowSlots(Object.keys(item)[0])" #default="scope">
      <slot v-bind="scope" :name="Object.keys(item)[0]" />
    </template>

  </el-table-column>
</template>

<script>
export default {
  name: 'YsnTableColumn',
  props: {
    // 当前列配置
    item: {
      type: Object,
      default: () => {}
    },
    // 是否固定列
    showFixed: {
      type: Boolean,
      default: true
    },
    // 插槽数组
    showSlots: {
      type: Array,
      default: () => []
    }
  },

  methods: {

    // 将选中的状态值抛出去接收
    $comSelect(selectData) {
      if (!this.checkbox) {
        return false
      }
      this.$emit('onSelect', selectData)
    },
    isShowSlots(val) {
      return this.showSlots.includes(val)
    }
  }
}
</script>
