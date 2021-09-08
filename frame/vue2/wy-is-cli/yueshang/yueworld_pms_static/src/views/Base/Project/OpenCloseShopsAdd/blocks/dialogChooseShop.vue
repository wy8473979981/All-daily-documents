<template>
  <div>
    <ysn-cascaderDialog
      ref="cascader"
      dialog-type="dialog"
      data-type="shop"
      :dialog-num="dialogNum"
      :parent-choose-data="value"
      :tree-data="treeData"
      @ok="ok"
    />
  </div>
</template>
<script>
// import PUBFN from '@/utils/pubFn'
import { baseApi } from '@/api'
export default {
  name: 'DialogChooseShop',
  props: {
    dialogNum: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      currentVal: [], // 展示的数据
      currentDataList: [], // 全部子级数据
      treeData: [], // 树形数据
      form: []
    }
  },
  computed: {
    // 获取展示value
    getValue() {
      const { value } = this
      if (value) {
        let newList = this.currentDataList.filter(item => value.includes(item.value))
        newList = newList.map(item => item.label)
        return newList.join(',')
      }
      return ''
    }
  },
  watch: {
    dialogNum() {
      this.visible = true
    }
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
      console.log(val)
      this.$emit('input', val)
      this.$emit('ok', val)
    }
  }
}
</script>
