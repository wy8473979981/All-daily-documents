<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 选择铺位号组件/后期可支持其他选择
-->
<template>
  <ysn-treeDialog v-bind="$attrs" ref="cascader" :parent-choose-data="form[$attrs.prop]" :tree-data="$attrs.list" :form="form" @ok="ok">
    <el-tooltip :content="getValue||$attrs.placeholder" placement="top" effect="dark">
      <el-input
        :placeholder="$attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请选择'"
        :value="getValue"
        resize="none"
        @key="()=>{}"
      >
        <template #suffix>
          <i class="el-icon-arrow-down mr-4" />
        </template>
      </el-input>
    </el-tooltip>
  </ysn-treeDialog>
</template>

<script>
import { baseApi } from '@/api'
export default {
  name: 'ItemTreeDialog',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    form: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      currentVal: [], // 展示的数据
      currentDataList: [], // 全部子级数据
      treeData: [] // 树形数据
    }
  },
  computed: {
    // 获取展示value
    getValue() {
      if (this.form[this.$attrs.prop]) {
        let newList = this.currentDataList.filter(item => this.form[this.$attrs.prop].includes(item.value))
        newList = newList.map(item => item.label)
        return newList.join(',')
      }
      return ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.treeData = this.$attrs.list
      this.currentDataList = this.getAllLastList(this.treeData)
    },
    // 获取全部子级
    getAllLastList(dataList) {
      let list = []
      dataList.map(item => {
        if (item.children) {
          const newList = this.getAllLastList(item.children)
          list = [...list, ...newList]
        } else {
          list.push(item)
        }
      })
      return list
    },
    handleInput(val) {
      this.$attrs.change && this.$attrs.change(val)
    },
    // 选择完毕
    ok(val) {
      this.form[this.$attrs.prop] = val
    }
  }
}
</script>
