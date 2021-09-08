<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:暂收款-处理单-处理明细
-->
<template>
  <div>
    <ysn-dialog
      :title="'请选择'"
      :out-close="outClose"
      :width="'900px'"
      :is-show-dialog="isShowDialog"
      :external="true"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <YsnPageContent
          ref="ItemOptionFeename"
          :search-config="searchConfig"
          :search-form="searchForm"
          :search-column="3"
          :query-config="queryConfig"
          :table-config="tableConfig"
          :table-order-config="tableOrderConfig"
          :before-qeury-data="beforeQeuryData"
          persmission="DialogFormAdd"
          :has-table-config="false"
          :hide-page="true"
          @selection-change="handleSelectionChange"
        />
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right">
          <ysn-btn :disabled="currentRow.length === 0" class="mr-12" @click="handleVisible">确认</ysn-btn>
          <ysn-btn type="info" @click="closeDialog">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { processingApi } from '@/api'
export default {
  name: 'DialogFormAdd',
  inheritAttrs: false,
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    form: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        feeName: []
      },
      outClose: true,
      searchConfig: [{ itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入意向/合同编号/商家/品牌/收款单位/收款银行/银行账号', width: '220px', isSearch: true, isFirst: true },
        { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '220px', list: this.$PUBFN.getOptionsList('fees'), isFirst: true }],
      // 接口请求配置
      queryConfig: {
        api: processingApi.optionFee, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableData: [],
      tableConfig: [
        { feeName: '费项', isShow: true },
        { accountName: '收款单位', isShow: true },
        { bankName: '收款银行', isShow: true },
        { bankAccount: '银行账号', isShow: true },
        { dealType: '处理类型', isShow: false },
        { temporaryReceiptsBalanceOne: '可用余额(元)', isShow: false, type: 'money' },
        { dealAmountOne: '处理金额(元)', isShow: false, type: 'money' },
        { dealReason: '处理原因', isShow: false }
      ],
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true, // 继承el-table所有属性,ysn-table的属性
        full: false,
        height: '200px',
        selectKey: 'id'
      },
      currentRow: []
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      this.currentRow = []
      this.disabled = true
      return data
    },
    // 保存
    handleVisible() {
      if (this.currentRow) {
        this.$emit('getData', this.currentRow)
      }
      this.closeDialog()
    },
    handleSelectionChange(val) {
      this.currentRow = val
    }
  }
}
</script>

