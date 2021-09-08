<!--
 * @Author: xueyx
 * @LastEditors: fhj
 * @Description: 规划人员选择弹窗
-->
<template>
  <ysn-popoverDialog ref="popover" width="580">
    <!-- 默认slot点击时打开弹窗 -->
    {{ form[$attrs.prop] }}
    <!-- <el-input placeholder="请选择" suffix-icon="el-icon-arrow-down" :value="form[$attrs.prop]" @key="()=>{}" /> -->
    <!-- 弹窗表格 -->
    <template #content>
      <el-form>
        <ysn-formItem :config="searchConfig" :form="searchForm" />
      </el-form>
      <!-- 内容 -->
      <div class="flex-ju-al-between">

        <!-- 左侧选择区域 -->
        <div class="select-box box d-flex">
          <div class="item-box">
            <div class="title pb-12">{{ labelText }}</div>
            <div class="content">
              <el-tree
                ref="tree"
                v-model="currentValue"
                class="ysn-tree"
                :data="$attrs.list"
                show-checkbox
                node-key="value"
                :filter-node-method="filterNode"
                @check-change="choose"
              />
            </div>
          </div>
        </div>
        <div class="box">
          <div class="title pb-12">已选择{{ labelText }}</div>
          <div class="content">
            <div v-for="(item,index) in chooseData" :key="index" class="item flex-ju-al-between">
              <span>{{ treeData[item] }}</span>
              <i class="el-icon-close bg-close flot-right cursor-pointer" @click="removeItem(item)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="flex-ju-end mt-12">
        <ysn-btn class="mr-12" :disabled="chooseData.length===0" @click="ok">确认</ysn-btn>
        <ysn-btn type="reset" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>

  </ysn-popoverDialog>
</template>
<script>
export default {
  name: 'YsnPlannerDialog',
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
    },
    // 标题文字
    labelText: {
      type: String,
      default: '业态'
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
      treeData: {}, // 数据
      chooseData: [], // 已选中数据

      currentValue: [], // 已选中数据id列表
      currentDataList: [] // 所有子级列表
    }
  },
  watch: {
    'searchForm.searchValue'(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    // 初始化数据
    const newList = this.getTreeDataList(this.$attrs.list, '')
    this.treeData = newList
  },
  methods: {
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 获取平铺的树级结构数据
    getTreeDataList(list, parentLabel) {
      let newObj = {}
      list.map(item => {
        const label = parentLabel ? parentLabel + '/' + item.label : item.label
        newObj[item.value] = label
        if (item.children) {
          newObj = { ...newObj, ...this.getTreeDataList(item.children, label) }
        }
      })
      return newObj
    },
    // 关闭
    closeDialog() {
      this.$refs.popover.closePop()
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
      const res = this.$refs.tree.getCheckedNodes()
      this.chooseData = res.filter(item => !item.children).map(item => item.value)
    },
    // 删除元素
    removeItem(itemVal) {
      console.log(itemVal, this.chooseData)
      this.chooseData = this.chooseData.filter(item => item !== itemVal)
      this.setChooseData()
    },
    // 设置选中数据
    setChooseData() {

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
    ok() {
      this.form[this.$attrs.prop] = this.chooseData
      this.closeDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
  .box{
    min-width: 270px;
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
      width: 270px;
      flex: 1;
      height: 250px;
    }
  }
  .content{
    height: 220px;
    overflow-x: hidden;
    overflow-y: auto;
    color: #050101;
    .item{
      padding: 9px 16px;
    }
  }
  .ysn-tree{
    padding-left: 10px;
    ::v-deep.el-tree-node__label{
      color: #050101;
    }
    ::v-deep.el-checkbox{
      margin: 0 8px 0 4px;
    }
  }
  .bg-close{
    background: #DBD6D1;
    border-radius: 14px;
    color: #848382;
    font-size: 12px;
    width: 14px;
    height: 14px;
    display: inline-block;
    line-height: 14px;
    text-align: center;
        padding-top: 1px;
    box-sizing: border-box;
  }
</style>
