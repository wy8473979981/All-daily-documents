<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-table-column
    v-bind="$attrs"
    :type="$attrs.type==='index'?$attrs.type:''"
    :prop="`${Object.keys(item)[0]}`"
    :data-type="dataType"
    :label="item[Object.keys(item)[0]]"
    :width="item.fixedWidth
      ?item.fixedWidth
      :
        (item.type==='index'? '70px':(item.fixedWidth||''))"
    :min-width="item.fixedWidth?'':( setWidth(item) ||item.width|| '')"
    :formatter="item.formatter || formatter"
    :label-class-name="(item.labelClass||'') + (item.required?' required':'')"
    :class-name="(item.columnClass||'')+' '+(item.tableList&&item.tableList.length>0?'colCenter':'')"
    :show-overflow-tooltip="!isShowSlots(Object.keys(item)[0])"
    :fixed="item.fixed"
    :sort-method="sortMethod"
  >
    <!-- 收起展开需求 二级表头children大于2时出现展开收起 -->
    <template v-if="item.hasClose" #header="scope">
      <slot v-bind="scope" name="header" />
    </template>
    <template v-else-if="item.hasSlotHeader" #header="scope">
      <slot v-bind="scope" name="header" />
    </template>
    <!-- 有多重表格的情况下 -->
    <template v-if="item.tableList&&item.tableList.length>0">
      <YsnTableColumn
        v-for="(_item, index) in item.tableList"
        :key="'ytable' + index"
        v-bind="{ ..._item }"
        :item="_item"
        :fixed="_item.fixed"
        :data-type="_item.dataType"
        :prop="`${Object.keys(_item)[0]}`"
        :label="_item[Object.keys(_item)[0]]"
        :formatter="_item.formatter"
        show-overflow-tooltip
        :show-slots="showSlots"
        :label-class-name="item.labelClass"
        :class-name="item.columnClass"
        :align="_item.align || align(_item)"
      >

        <!-- 插槽 -->
        <template v-for="slotsItem in showSlots" :slot="slotsItem" slot-scope="scope">
          <slot v-bind="scope" :name="slotsItem" />
        </template>

      </YsnTableColumn>

    </template>

    <!-- 是否显示插槽 -->
    <template v-if="isShowSlots(Object.keys(item)[0])" #default="scope">
      <slot v-bind="scope" :name="Object.keys(item)[0]" />
    </template>

  </el-table-column>
</template>

<script>
import tableMixins from './tableMixins'

export default {
  name: 'YsnTableColumn',
  mixins: [tableMixins],

  props: {
    // 当前列配置
    item: {
      type: Object,
      default: () => {}
    },
    // 是否固定列
    showFixed: {
      type: Boolean,
      default: false
    },
    // 插槽数组
    showSlots: {
      type: Array,
      default: () => []
    },
    // 数据类型
    dataType: {
      type: String,
      default: ''
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
    },
    sortMethod(a, b) {
      const key = Object.keys(this.item)[0]
      let aValue = a[key]
      let bValue = b[key]
      // 多重表格
      if (this.item.formatter && typeof this.item.formatter === 'function') {
        aValue = this.item.formatter(a)
        bValue = this.item.formatter(b)
      }
      if (this.item.dataType === 'number') {
        return aValue - bValue
      } else {
        return aValue.localeCompare(bValue, 'zh-Hans-CN', { sensitivity: 'accent' })
      }
    }
  }
}
</script>
