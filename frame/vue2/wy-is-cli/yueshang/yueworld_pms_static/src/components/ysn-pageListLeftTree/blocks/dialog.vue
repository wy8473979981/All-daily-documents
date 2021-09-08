<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 级联选择弹窗
-->
<template>
  <div>
    <ysn-dialog
      ref="dialog"
      title="选择"
      :show-footer="false"
      width="790px"
      :init-data="initData"
    >
      <slot />
      <template #contain>
        <div class="dialog">
          <!-- 搜索区域 -->
          <el-form>
            <ysn-formItem :config="searchConfig" :form="searchForm" />
          </el-form>
          <!-- 级联面板 -->
          <div class="flex-ju-al-between">
            <div class="box">
              <item-box title="项目" :check-list="treeDataValue" :nodes="treeData" data-key="treeData" next-key="firstData" :filter-value="searchForm.searchValue" @choose="choose" />
            </div>
            <div class="box">
              <item-box title="楼栋" :check-list="firstDataValue" placeholder="请选择项目" data-key="firstData" :nodes="firstData" next-key="secondData" :filter-value="searchForm.searchValue" @choose="choose" />
            </div>
            <div class="box">
              <item-box title="楼层" :check-list="secondDataValue" placeholder="请选择楼栋" next-key="lastData" data-key="secondData" :nodes="secondData" :filter-value="searchForm.searchValue" @choose="choose" />
            </div>
            <div class="box">
              <item-box title="铺位" :check-list="lastDataValue" placeholder="请选择楼层" data-key="lastData" :nodes="lastData" is-last :filter-value="searchForm.searchValue" @checkboxChange="checkboxChange" />
            </div>
            <div class="box">
              <item-box title="已选对象" placeholder="请选择对象" data-key="currentValue" :nodes="currentValue" has-close @removeItem="removeItem" />
            </div>
          </div>
          <!-- 底部按钮 -->
          <div class="flex-ju-end mt-12">
            <ysn-btn class="mr-12" @click="ok">确认</ysn-btn>
            <ysn-btn type="reset" @click="close">取消</ysn-btn>
          </div>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import ItemBox from './itemBox.vue'
export default {
  name: 'YsnCascaderDialog',
  components: { ItemBox },
  props: {
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
      // 是否显示dialog
      visible: false,
      // 筛选formData
      searchForm: {
        searchValue: '' // 筛选数据
      },
      // 模糊搜索配置
      searchConfig: [
        { itemType: 'input', label: this.$attrs.labelText || '', prop: 'searchValue', placeholder: '请输入项目/楼栋/楼层/铺位号关键字', width: '290px', isSearch: true, hasTip: false }
      ],
      treeData: [], // 项目数据
      treeDataValue: [], // 项目选中数据
      firstData: [], // 一级数据
      firstDataValue: [], // 一级选中数据
      secondData: [], // 二级数据
      secondDataValue: [], // 二级选中数据
      lastData: [], // 三级数据
      lastDataValue: [], // 三级选中数据
      current: [], // 已选中数据
      currentValue: [], // 已选中数据id列表
      currentDataList: [] // 所有子级列表
    }
  },

  watch: {
    parentChooseData(val) {
      this.treeDataValue = val
    }
  },
  methods: {
    // 初始化数据
    initData() {
      const res = this.parentTreeData
      this.treeData = res
      this.currentDataList = this.getAllLastList(this.treeData)
      // 设置默认选中数据
      this.treeDataValue = this.parentChooseData
      this.initClearData()
      this.setChooseData()
    },
    // 选择事件
    choose(event) {
      const { item, isLast, nextKey, nodes, dataKey } = event
      // // 每一级别 清除下一级的数据
      // let keyList = ['firstData','secondData','lastData']
      // for(let i = keyList.indexOf(nextKey)+1;i<keyList.length;i++){
      //     this[keyList[i]] = []
      // }

      this[dataKey + 'Value'] = item
      // // 设置下一级数据
      // if (!isLast) {
      //     // 非最后一级选择
      //     this[nextKey] = this.getNextList(item,nodes)
      // }
      this.initClearData()
    },
    // 数据清理
    initClearData() {
      // 如果没有项目 其他数据清空
      this.clearData(this.treeData, 'treeData', 'firstData')
      this.clearData(this.firstData, 'firstData', 'secondData')
      this.clearData(this.secondData, 'secondData', 'lastData')
      this.clearData(this.lastData, 'lastData', 'current')
      this.clearData(this.current, 'current')
    },
    // 数据清理,传入当前可选择的列表,需要清理的key
    clearData(list, dataKey, nextDataKey) {
      const dataList = list.map(item => item.value)
      // 如果当前选中的值不再可选择列表中 则需要清除
      const newList = this[dataKey + 'Value'].filter(item => dataList.includes(item))
      this[dataKey + 'Value'] = newList

      if (!nextDataKey) return
      // 清理下一级数据
      let newData = []
      list.map(item => {
        if (this[dataKey + 'Value'].includes(item.value)) {
          newData = [...newData, ...item.children]
        }
      })
      this[nextDataKey] = newData
    },
    // 获取下一级可选择数据
    getNextList(list, dataKey) {
      let newList = []
      dataKey.map(item => {
        if (list.includes(item.value)) {
          newList = [...newList, ...item.children]
        }
      })
      return newList
    },
    // 删除元素
    removeItem(itemVal) {
      this.currentValue = this.currentValue.filter(item => item !== itemVal)
      this.setChooseData()
    },
    // checboxChange
    checkboxChange(val) {
      console.log(val)
      this.currentValue = val
      this.setChooseData()
    },
    // 设置选中数据
    setChooseData() {
      this.current = this.currentDataList.filter(item => this.currentValue.includes(item.value))
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
    // 关闭弹窗
    ok() {
      this.$emit('ok', {
        programId: this.treeDataValue,
        leaseAreaId: this.currentValue
      })
      this.close()
    },
    // 关闭弹窗
    close() {
      this.$refs.dialog.onCancel()
    }
  }
}
</script>
<style lang="scss" scoped>
  .box{
    width: 142px;
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
      height: 267px;
      width: 100%;
      flex: 1;
    }
  }

</style>
