<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销冲抵
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <div class="box">
      <strong>暂收款</strong>
      <ysn-tableDesc :config="tableDescConfig" />
    </div>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      show-operation="false"
      :column="formTableConfig"
      :first-row-add="false"
    />
    <div class="box">
      <strong>保证金</strong>
      <ysn-tableDesc :config="tableDescConfigTwo" />
    </div>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableDataTwo"
      :column="formTableConfigtwo"
      :first-row-add="false"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Offset',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'offset',
    event: 'change'
  },
  props: {
    offset: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formTableConfig: [
        { feeName: '冲抵费项', sortable: 'true', itemType: 'text', width: '200px' },
        { accountName: '收款单位', sortable: 'true', itemType: 'text', width: '200px' },
        { remainingOffset: '剩余可冲抵金额(元)', sortable: 'true', itemType: 'text', type: 'money', width: '148px' },
        { applyOffsetAmount: '申请冲抵金额(元)', sortable: 'true', itemType: 'input', width: '148px', inputType: 'Number', type: 'number' }
      ],
      formTableConfigtwo: [
        { feeName: '冲抵费项', sortable: 'true', itemType: 'text', width: '160px' },
        { contractNo: '合同编号', sortable: 'true', itemType: 'text', width: '160px' },
        { accountName: '收款单位', sortable: 'true', itemType: 'text', width: '200px' },
        { remainingOffset: '剩余可冲抵金额(元)', sortable: 'true', itemType: 'text', type: 'money', width: '160px' },
        { applyOffsetAmount: '申请冲抵金额(元)', sortable: 'true', itemType: 'input', width: '160px', inputType: 'Number', type: 'number' }
      ]
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '剩余可冲抵金额汇总(元)', value: this.remainingOffsetTotal },
        { text: '申请冲抵金额汇总(元)', value: this.applyOffsetAmountTotal }
      ]
      return list
    },
    tableDescConfigTwo() {
      const list = [
        { text: '剩余冲抵金额汇总(元)', value: this.remainingOffsetTotalTwo },
        { text: '申请冲抵金额汇总(元)', value: this.applyOffsetAmountTotalTwo }
      ]
      return list
    },
    remainingOffsetTotal() {
      let sum = 0
      if (this.currentFormData.tableData) {
        this.currentFormData.tableData.forEach(val => {
          sum += Number(val.remainingOffset)
        })
      }
      return sum
    },
    applyOffsetAmountTotal() {
      let sum = 0
      if (this.currentFormData.tableData) {
        this.currentFormData.tableData.forEach(val => {
          if (val.applyOffsetAmount > val.remainingOffset) {
            val.applyOffsetAmount = ''
            this.$message.error('申请可冲抵金额不能大于剩余可冲抵金额')
          }
          if (val.applyOffsetAmount < 0) {
            val.applyOffsetAmount = ''
            this.$message.error('申请可冲抵金额必须大于等于0')
          }
          sum += Number(val.applyOffsetAmount)
        })
      }
      return sum
    },
    remainingOffsetTotalTwo() {
      let sum = 0
      if (this.currentFormData.tableDataTwo) {
        this.currentFormData.tableDataTwo.forEach(val => {
          sum += Number(val.remainingOffset)
        })
      }
      return sum
    },
    applyOffsetAmountTotalTwo() {
      let sum = 0
      if (this.currentFormData.tableDataTwo) {
        this.currentFormData.tableDataTwo.forEach(val => {
          if (val.applyOffsetAmount > val.remainingOffset) {
            val.applyOffsetAmount = ''
            this.$message.error('申请可冲抵金额不能大于剩余可冲抵金额')
          }
          if (val.applyOffsetAmount < 0) {
            val.applyOffsetAmount = ''
            this.$message.error('申请可冲抵金额必须大于等于0')
          }
          sum += Number(val.applyOffsetAmount)
        })
      }
      return sum
    }
  }
}
</script>
<style scoped>
  .box{
    display: flex;
    align-items: center;
    height: 40px;
  }
  .box strong{
    color: #050101;
    font-size: 16px;
    margin-right: 15px;
    line-height: 18px;
    font-weight: bold;
  }
</style>
