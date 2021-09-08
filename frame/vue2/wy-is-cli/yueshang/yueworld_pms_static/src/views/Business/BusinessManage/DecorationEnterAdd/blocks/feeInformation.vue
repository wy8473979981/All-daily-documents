<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description: 装修进场详情-费用信息table
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      ref="feeInformationData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rules"
      :show-slots="['receivedAmount']"
    >
      <template #receivedAmount="scope">
        <el-input v-if="scope.row.disabled || data.id===0" v-model="scope.row.receivedAmount" disabled />
        <el-input v-else v-model="scope.row.receivedAmount" />
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import { numFormat } from '@/utils/index'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'feeInformationData',
    event: 'change'
  },
  props: {
    feeInformationData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { feeName: '费用类型', itemType: 'select', list: PUBFN.getOptionsList('Expense_Type'), required: true, width: 250 },
        { actualReceivableAmount: '实际应收金额(元)', itemType: 'input', type: 'money', inputType: 'Number', width: 250, listeners: { input: this.calculationBox }, formatter: item => numFormat(item.actualReceivableAmount) },
        { receivedAmount: '已核销金额(元)', itemType: 'input', type: 'money', hasSlot: true, inputType: 'Number', width: 250, listeners: { input: this.calculationBox }},
        { unverifiedAmount: '未核销金额(元)', itemType: 'input', type: 'money', inputType: 'Number', width: 250, disabled: true }
      ],
      rules: {
        feeName: [{ required: true, message: '' }]
      }
    }
  },
  methods: {
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = { feeName: 0, actualReceivableAmount: '', receivedAmount: '0.00', unverifiedAmount: '0.00' }
        this.currentFormData.tableData.push(datas)
      }
    },
    // 计算
    calculationBox(row) {
      if (parseFloat(row.actualReceivableAmount) >= 0 && parseFloat(row.receivedAmount) >= 0) {
        if (parseFloat(row.actualReceivableAmount) >= parseFloat(row.receivedAmount)) {
          row.unverifiedAmount = Math.round((parseFloat(row.actualReceivableAmount) - parseFloat(row.receivedAmount)) * 100) / 100
        } else {
          this.$message({ message: '已核销金额不允许大于实际应收金额', type: 'error' })
          row.receivedAmount = ''
          row.unverifiedAmount = ''
        }
      }
    }
  }
}
</script>
