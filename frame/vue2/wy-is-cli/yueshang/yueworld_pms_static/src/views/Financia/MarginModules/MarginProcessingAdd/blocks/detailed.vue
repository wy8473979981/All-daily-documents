/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 14:18:27
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:29:07
 *保证金处理单新增
 */
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-if="currentFormData.tableData !==undefined "
      ref="detailedData"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
      :rules="rules"
    />
    <dialogExpenditure :is-show-dialog="dialogAddVisible" @closeDialog="closeDialog" @currentRowBox="currentRowBox" />
  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Detailed',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} },
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { feeName: '费项', itemType: 'text', required: true },
        { accountName: '收款单位', itemType: 'text', fixedWidth: 150 },
        { handleType: '类型', itemType: 'select', list: PUBFN.getOptionsList('handleTypeAllType'), required: true, change: this.changeBox },
        { balance: '可用余额(元)', itemType: 'text', inputType: 'Number', type: 'money' },
        { mayApllyAmount: '可申请冲抵(元)', itemType: 'text', inputType: 'Number', type: 'money', fixedWidth: 150 },
        { amount: '处理金额(元)', itemType: 'input', inputType: 'Number', type: 'money', required: true, fixedWidth: 150, listeners: { input: this.calculationBox }},
        { reason: '处理原因', itemType: 'input' }
      ],
      rules: {
        feeName: [{ required: true, message: '' }],
        type: [{ required: true, message: '请选择类型' }],
        amount: [{ required: true, message: '请输入处理余额' }]
      },
      dialogAddVisible: false // 选择处理明细
    }
  },
  methods: {
    async flodClick() {
      if (this.data.baseInfo.contNo.length > 0) {
        if (this.currentFormData.tableData !== undefined) {
          this.dialogAddVisible = true
        }
      } else {
        this.$message({ message: '请先选择合同编号', type: 'error' })
      }
    },
    // 关闭
    closeDialog() {
      this.dialogAddVisible = false
    },
    // 处理明细的选择弹窗
    currentRowBox(val) {
      this.$emit('comChange', { type: 'expenditureChange', data: val })
    },
    // 计算
    calculationBox(row) {
      this.mayApllyAmount(row)
      if (parseFloat(row.amount) >= 0 && parseFloat(row.balance) > 0) {
        if (parseFloat(row.amount) > parseFloat(row.balance)) {
          this.$message({ message: '处理金额不允许大于可用余额', type: 'error' })
          row.amount = ''
        }
      }
    },
    // 申请冲抵
    mayApllyAmount(row) {
      if (row.handleType === 3 && parseFloat(row.amount) >= 0 && parseFloat(row.amount) > parseFloat(row.mayApllyAmount)) {
        this.$message({ message: '处理金额小于等于可申请冲抵金额', type: 'error' })
        row.amount = ''
      }
    },
    // 类型变化
    changeBox(row) {
      this.mayApllyAmount(row)
    }
  }
}
</script>
