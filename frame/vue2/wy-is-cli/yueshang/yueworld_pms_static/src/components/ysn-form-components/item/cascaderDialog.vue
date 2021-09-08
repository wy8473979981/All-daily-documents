<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 选择铺位号组件/后期可支持其他选择
-->
<template>
  <ysn-cascaderDialog v-bind="$attrs" ref="cascader" :disabled="$attrs.disabled" :parent-choose-data="form[$attrs.prop]" :data-type="$attrs.dataType" :cascader-tile="$attrs.cascaderTile" :tree-data="treeData" @ok="ok">
    <el-tooltip :content="getValue||$attrs.placeholder" placement="top" effect="dark" :disabled="$attrs.disabled">
      <div>
        <ysn-inputTag v-popover:popover :data-list="form[$attrs.prop]" v-bind="$attrs" :list="currentDataList" :disabled="$attrs.disabled" @tagClose="tagClose" />
      </div>
      <!-- <el-input
        :placeholder="$attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请选择'"
        :value="getValue"
        resize="none"
        @key="()=>{}"
      >
        <template #suffix>
          <i class="el-icon-arrow-down mr-4" />
        </template>
      </el-input> -->
    </el-tooltip>
  </ysn-cascaderDialog>
</template>

<script>
import { baseApi } from '@/api'
export default {
  name: 'ItemCascaderDialog',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    form: {
      type: Object, default: () => {}
    },
    // 数据变更处理
    change: {
      type: Function
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
  created() {
    console.log(this.$attrs)
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await baseApi.getShopsTree({ projectId: 1 })
      this.treeData = res
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
    // 选择完毕
    ok(val) {
      this.form[this.$attrs.prop] = val
      this.change && this.change(val)
      // this.$emit('ok', val)
    },
    tagClose() {
      this.form[this.$attrs.prop].shift()
    }
  }
}
</script>
