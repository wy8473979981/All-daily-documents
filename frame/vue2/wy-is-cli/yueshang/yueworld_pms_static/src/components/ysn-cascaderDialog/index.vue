<!--
 * @Author: fhj
 * @LastEditors: xza
 * @Description: 级联选择弹窗
-->
<template>
  <div>
    <component
      :is="componentName"
      ref="popover"
      :init-data="initData"
      :title="dialogTitle"
      :show-footer="false"
      :external="external"
      :disabled="disabled"
      width="646px"
      :is-show-dialog.sync="visible"
      v-bind="$attrs"
      v-on="$listeners"
      @closeDialog="closeDialog"
    >
      <template v-if="dialogType === 'popover'">
        <slot />
      </template>
      <!-- popover 和 dialog 类型 slot 名称不一致，故增加判读 -->
      <template :slot="dialogType === 'popover'?'content':'contain'">
        <div class="dialog">
          <!-- 搜索区域 -->
          <el-form>
            <ysn-formItem :config="searchConfig" :form="searchForm" />
          </el-form>
          <!-- 级联面板 -->
          <div class="flex-ju-al-between">
            <div class="select-box box d-flex">
              <item-box :title="cascaderTile[0].title" border :nodes="treeData" next-key="secondData" @choose="choose" />
              <item-box :title="cascaderTile[1].title" border :placeholder="cascaderTile[1].placeholder" next-key="lastData" :nodes="secondData" @choose="choose" />
              <item-box v-model="currentValue" :title="cascaderTile[2].title?cascaderTile[2].title:dataType==='office'?'单元':'铺位'" :placeholder="cascaderTile[2].placeholder" :nodes="lastData" is-last @checkboxChange="checkboxChange" />
            </div>
            <div class="box">
              <item-box :title="cascaderTile[3].title?cascaderTile[3].title:dataType==='office'?'已选单元':'已选铺位'" :placeholder="cascaderTile[3].placeholder?cascaderTile[3].placeholder:dataType==='office'?'请先选择单元':'请先选择铺位'" :nodes="chooseData" has-close @removeItem="removeItem" />
            </div>
          </div>
          <!-- 底部按钮 -->
          <div class="flex-ju-end mt-12">
            <ysn-btn class="mr-12" :disabled="currentValue.length===0" @click="ok">确认</ysn-btn>
            <ysn-btn type="reset" @click="close">取消</ysn-btn>
          </div>
        </div>
      </template>
    </component>
  </div>
</template>
<script>
import { baseApi } from '@/api'
import ItemBox from './itemBox.vue'
export default {
  name: 'YsnCascaderDialog',
  components: { ItemBox },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // 弹框类型 popover|dialog
    dialogType: {
      type: String,
      default: 'popover'
    },
    // dialog 类型参数
    dialogNum: {
      type: Number,
      default: 0
    },
    dialogTitle: {
      type: String,
      default: '选择'
    },
    // 数据类型  show=>铺位  user=>人员 office =>写字楼
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
    cascaderTile: { // 级联选项标题和提示
      type: Array,
      default: () => [
        { title: '楼栋' }, // 一级
        { title: '楼层', placeholder: '请先选择楼栋' }, // 二级
        { title: '', placeholder: '请先选择楼层' }, // 三级
        { title: '', placeholder: '' }// 已选好的
      ]
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
  computed: {
    componentName() {
      const { dialogType } = this
      if (dialogType === 'popover') {
        return 'ysn-popoverDialog'
      }
      return 'ysn-dialog'
    },
    external() {
      const { dialogType } = this
      if (dialogType === 'popover') {
        return false
      }
      return true
    }
  },
  watch: {
    dialogNum() {
      this.visible = true
      this.initData()
    },
    parentChooseData(val) {
      this.currentValue = val
    },
    searchForm: {
      deep: true,
      handler: function(val) {
        this.lastData = []
        if (val.searchValue) {
          this.currentDataList.forEach(element => {
            if (element.label.indexOf(val.searchValue) > -1) {
              this.lastData.push(element)
            }
          });
        }
      }
    }
  },
  methods: {
    // 类型判断
    getPlaceHolder() {
      if (this.dataType === 'shop') {
        return '请输入楼栋/楼层/铺位'
      } else if (this.dataType === 'format') {
        return '请输入一级业态/二级业态/三级业态'
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
          case 'format':
            res = this.$attrs.list
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
      this.close()
    },
    // 关闭弹窗
    close() {
      const { dialogType } = this
      if (dialogType === 'popover') {
        this.$refs.popover.closePop()
        return
      }
      this.closeDialog()
    },
    closeDialog() {
      this.visible = false
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
