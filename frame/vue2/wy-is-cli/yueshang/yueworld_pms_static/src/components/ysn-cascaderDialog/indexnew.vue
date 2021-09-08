<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 级联选择弹窗
-->
<template>
  <div>
    <ysn-popoverDialog ref="popover" :init-data="initData" :width="width">
      <slot />
      <template #content>
        <div class="dialog">
          <!-- 搜索区域 -->
          <el-form>
            <ysn-formItem :config="searchConfig" :form="searchForm" />
          </el-form>
          <!-- 级联面板 -->
          <div class="flex-ju-al-between">
            <div class="select-box box d-flex">
              <item-box title="楼栋" border :nodes="treeData" next-key="secondData" @choose="choose" />
              <item-box title="楼层" border placeholder="请先选择楼栋" next-key="lastData" :nodes="secondData" @choose="choose" />
              <item-box v-model="currentValue" title="铺位" placeholder="请先选择楼层" :nodes="lastData" is-last @checkboxChange="checkboxChange" />
            </div>
            <div class="box">
              <item-box title="已选铺位" placeholder="请先选择铺位" :nodes="chooseData" has-close @removeItem="removeItem" />
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="flex-ju-end mt-12">
            <ysn-btn class="mr-12" :disabled="currentValue.length===0" @click="ok">确认</ysn-btn>
            <ysn-btn type="reset" @click="closePop">取消</ysn-btn>
          </div>
        </div>
      </template>

    </ysn-popoverDialog>
  </div>
</template>
<script>
import { baseApi } from '@/api'
import ItemBox from './itemBox.vue'
export default {
  name: 'YsnCascaderDialog',
  components: { ItemBox },
  props: {
    // 数据类型  show=>铺位  user=>人员
    dataType: {
      type: String,
      default: 'shop'
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
    width: {
      type: String,
      default: '620px'
    }
  },
  data() {
    return {
      // 筛选formData
      searchForm: {
        searchValue: '' // 筛选数据
      },
      // 模糊搜索配置
      searchConfig: [
        { itemType: 'input', label: this.$attrs.labelText || '', prop: 'searchValue', placeholder: this.getPlaceHolder(), width: '220px', isSearch: true, hasTip: true }
      ],
      treeData: [], // 数据
      secondData: [], // 二级数据
      lastData: [], // 三级数据
      chooseData: [], // 已选中数据

      currentValue: [], // 已选中数据id列表
      currentDataList: [] // 所有子级列表
    }
  },
  methods: {
    // 类型判断
    getPlaceHolder() {
      if (this.dataType === 'shop') {
        return '请输入楼栋/楼层/单元'
      }
      return '请输入'
    },
    // 初始化数据
    async initData() {
      let res
      // shop 商铺级联
      // 如果外部传入数据源 则不需要处理
      if (this.parentTreeData.length > 0) {
        res = this.parentTreeData
      } else {
        switch (this.dataType) {
          case 'shop':
            res = await baseApi.getShopsTree({ projectId: 1 })
            break
          default:
            res = await baseApi.getShopsTree({ projectId: 1 })
            break
        }
      }
      this.treeData = res
      this.currentDataList = this.getAllLastList(this.treeData)
      // 设置默认选中数据
      this.currentValue = this.parentChooseData
      this.setChooseData()
    },
    // 选择事件
    choose(event) {
      const { item, isLast, nextKey } = event
      // 第一级清除最后一级数据
      if (nextKey === 'secondData') {
        this.lastData = []
      }

      // 设置下一级数据
      if (!isLast) {
        // 非最后一级选择
        this[nextKey] = item.children
      }
    },
    // 删除元素
    removeItem(itemVal) {
      this.currentValue = this.currentValue.filter(item => item !== itemVal)
      this.setChooseData()
    },
    // checboxChange
    checkboxChange(val) {
      this.currentValue = val
      this.setChooseData()
    },
    // 设置选中数据
    setChooseData() {
      this.chooseData = this.currentDataList.filter(item => this.currentValue.includes(item.value))
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
      this.$emit('ok', this.currentValue)
      this.closePop()
    },
    // 关闭弹窗
    closePop() {
      this.$refs.popover.closePop()
    }
  }
}
</script>
<style lang="scss" scoped>
  .box{
    min-width: 142px;
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
      width: 148px;
      flex: 1;
    }
  }

</style>
