/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 17:23:35
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-29 18:10:09
 */
// 选择费项
<template>
  <ysn-dialog :out-close="outClose" :title="'选择费项'" :width="'920px'" :is-show-dialog="isShowDialog" :external="isShowDialog" @closeDialog="closeDialog">
    <!-- 弹窗表格 -->
    <template #contain>

      <YsnPageContent
        ref="ItemExpenditureDialog"
        :search-config="searchConfig"
        :search-form="searchForm"
        :search-column="3"
        :query-config="queryConfig"
        :table-config="tableConfig"
        :table-order-config="tableOrderConfig"
        :before-qeury-data="beforeQeuryData"
        persmission="ItemExpenditureDialog"
        :has-table-config="false"
        :hide-page="true"
        @selection-change="handleSelectionChange"
      />

    </template>
    <!-- 弹窗按钮 -->
    <template #btn>
      <div class="text-right">
        <ysn-btn :disabled="disabledStatus" class="mr-12" @click="handleVisible">确认</ysn-btn>
        <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
      </div>
    </template>
  </ysn-dialog>
</template>
<script>
import { baseApi } from '@/api'
export default {
  name: 'DialogExpenditure',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {}
    },
    // 数据变更处理
    change: {
      type: Function
    },
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        feeName: []

      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入收款单位/收款银行/银行账号', width: '220px', isSearch: true, isFirst: true },

        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '220px', list: this.$PUBFN.getOptionsList('FeeSubjectAll'), isFirst: true }],

      // 接口请求配置
      queryConfig: {
        api: baseApi.feeList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      tableData: [],
      tableConfig: [
        { feeName: '费项', isShow: true },
        { accountName: '收款单位', isShow: true },
        { bankName: '收款银行', isShow: true },
        { bankAccount: '银行账号', isShow: true }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true, // 继承el-table所有属性,ysn-table的属性
        height: '200px',
        selectKey: 'id'
      },
      currentRow: null,
      disabledStatus: true // 保存按钮的状态
    }
  },

  methods: {

    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      this.currentRow = null
      this.disabled = true
      return data
    },
    // 关闭
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 保存
    handleVisible() {
      if (this.currentRow !== undefined && this.currentRow.length > 0) {
        this.balanceBox() // 获取可用余额和可申请冲抵
      }
      this.closeDialog()
    },
    // 获取可用余额和可申请冲抵
    balanceBox() {
      const that = this
      const idArr = this.currentRow.map(item => item.id)
      const datas = { id: idArr.join(',') }
      baseApi.balance(datas).then(res => {
        if (res.list !== undefined && res.list.length > 0) {
          res.list.forEach(items => {
            that.currentRow.forEach(item => {
              if (items.id === item.id) {
                item.balance = items.balance
                item.mayApllyAmount = items.mayApllyAmount
              }
            })
          })
          this.$emit('currentRowBox', that.currentRow)
        }
      })
    },
    handleSelectionChange(val) {
      this.currentRow = val
      if (this.currentRow !== undefined && this.currentRow.length > 0) {
        this.disabledStatus = false
      } else {
        this.disabledStatus = true
      }
    }
  }
}
</script>
