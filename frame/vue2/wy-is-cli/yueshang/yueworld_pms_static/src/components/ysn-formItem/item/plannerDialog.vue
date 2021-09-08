<!--
 * @Author: xueyx
 * @LastEditors: fhj
 * @Description: 规划人员选择弹窗
-->
<template>
  <div>
    123
  </div>
</template>
<script>
import { approveApi } from '@/api'
export default {
  name: 'PlannerDialog',
  components: { },
  props: {
    // 数据类型
    dataType: {
      type: String,
      default: 'planer'
    },
    form: {
      type: Object, default: () => {}
    },
    // 双向绑定数据
    value: {
      type: Array,
      default: () => []
    },
    // 外部传入的显示数据
    parentTreeData: {
      type: Array,
      default: () => []
    },
    // 外部已选择的数据
    parentChooseData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      outClose: true,
      currentRow: null,
      // 筛选formData
      searchForm: {
        searchValue: '' // 筛选数据
      },
      // 模糊搜索配置
      searchConfig: [
        { itemType: 'input', label: '', prop: 'searchValue', placeholder: this.getPlaceHolder(), width: '220px', isSearch: true, hasTip: true }
      ],
      treeData: [], // 数据
      chooseData: [], // 已选中数据

      currentValue: [], // 已选中数据id列表
      currentDataList: [] // 所有子级列表
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取树形接口
    async getList() {
      const res = await approveApi.getPlannerTree({ projectId: 1 })
      this.treeData = res
    },
    // 关闭
    closeDialog() {
      this.outClose = false
    },
    // 类型判断
    getPlaceHolder() {
      if (this.dataType === 'planer') {
        return '请输入关键字'
      }
      return '请输入请输入关键字'
    },
    // 选择事件
    choose(event) {
      this.chooseData = event
      this.setChooseData(event)
    },
    // 删除元素
    removeItem(itemVal) {
      this.currentValue = this.currentValue.filter(item => item !== itemVal)
      this.setChooseData()
    },
    // 设置选中数据
    setChooseData(event) {
      const that = this
      that.chooseData = []
      if (!event || event.length === 0) {
        return
      }
      event.forEach(ele => {
        if (!ele.children) {
          that.chooseData.push(ele)
        }
      })
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

    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.change(this.currentRow)
      }
      this.closeDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
  .box{
    min-width: 292px;
    height: 283px;
    background: #E5E2DE;
    border-radius: 12px;
    padding-top: 16px;
    box-sizing: border-box;
    .title{
      color: #848382;
      font-size: 14px;
      padding-left: 16px;
    }
  }

  .select-box{
    & .item-box{
      height: 292px;
      width: 258px;
      flex: 1;
    }
  }

</style>
