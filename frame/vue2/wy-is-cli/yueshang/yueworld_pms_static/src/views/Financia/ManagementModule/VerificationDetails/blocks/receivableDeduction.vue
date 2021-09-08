<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销单-新增-应收冲减信息
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-tableDesc :config="tableDescConfig" />
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      show-operation="false"
      :column="formTableConfig"
      :first-row-add="false"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'ReceivableDeduction',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'receivableDeduction',
    event: 'change'
  },
  props: {
    receivableDeduction: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      reductionAmountTotal: 10000.00,
      flag: false,
      formTableConfig: [
        { contNo: '合同编号', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableNo: '应收编号', sortable: 'true', itemType: 'text', width: '100px' },
        { feeName: '费项', sortable: 'true', itemType: 'text', width: '100px' },
        { financialDate: '权责月', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableTime: '应收日期', sortable: 'true', itemType: 'text', width: '100px' },
        { tax: '税率(%)', sortable: 'true', itemType: 'text', width: '100px', type: 'money' },
        { actualReceivableAmount: '实际应收金额(元)', sortable: 'true', itemType: 'text', width: '140px', type: 'money' },
        { reductionAmount: '冲减金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' }
      ]
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '应收冲减金额汇总(元)', value: this.receivableValue, type: 'money' }
      ]
      return list
    },
    receivableValue() {
      let sum = 0
      this.currentFormData.tableData.forEach(val => {
        sum += Number(val.reductionAmount)
      })
      return sum
    }
  },
  methods: {
    // 头部加号点击
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          fileName: '',
          attachment: []
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
