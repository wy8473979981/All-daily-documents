<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-新增-保证金
-->

<template>
  <div v-if="currentFormData.bond !==undefined && currentFormData.bond.length > 0 ">
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="bond"
      :column="tableConfig"
      :show-operation="true"
      add
      :first-row-add="false"
      :show-slots="['paymentTotalAmount']"
    >
      <template #paymentTotalAmount="scope">
        <el-input
          v-model="scope.row.paymentTotalAmount"
          v-onlyNumber="{model:['$refs','page',`tableData`,scope.$index,'paymentTotalAmount']}"
          :disabled="scope.row.disabled"
          placeholder="请输入"
        />
      </template>
      <template #latestpaymentDate="scope">
        <el-date-picker
          v-model="scope.row.latestpaymentDate"
          value-format="yyyy-MM-dd"
          placeholder="请选择"
          :disabled="scope.row.disabled"
          style="width: 100%"
        />
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'Bond',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'bond',
    event: 'change'
  },
  props: {
    bond: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { conFeeType: '费项', itemType: 'select', list: this.$PUBFN.getOptionsList('feeName'), listValue: 'value', listName: 'label', sortable: false },
        { latestpaymentDate: '应收日期', itemType: 'datePicker', placeholder: '请输入', type: 'date', valueFormat: 'yyyy-MM-dd', sortable: false, hasSlot: true },
        { paymentTotalAmount: '总金额', itemType: 'input', placeholder: '请输入', sortable: false, type: 'money', hasSlot: true },
        { invoiceTypeId: '票据类型', itemType: 'text', sortable: false, disabled: true }
      ]
    }
  },
  methods: {
    flodClick() {
      if (this.currentFormData.bond !== undefined) {
        const datas = { conFeeType: '', latestpaymentDate: '', paymentTotalAmount: '', invoiceTypeId: '收据', disabled: false }
        this.currentFormData.bond.push(datas)
      }
    }
  }
}
</script>

