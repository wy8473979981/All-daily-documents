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
      :column="isCollection ? formTableConfigTwo : formTableConfig"
      :first-row-add="false"
    />
    <div class="box">
      <strong>保证金</strong>
      <ysn-tableDesc :config="tableDescConfig" />
    </div>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfigTwo"
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
    }
  },
  data() {
    return {
      isCollection: true,
      flag: false,
      formTableConfig: [
        { feeName: '冲抵费项', sortable: 'true', itemType: 'text', width: '180px' },
        { accountName: '收款单位', sortable: 'true', itemType: 'text', width: '180px' },
        { remainingOffset: '剩余可冲抵金额(元)', sortable: 'true', itemType: 'text', width: '180px', type: 'money' },
        { applyOffsetAmount: '申请冲抵金额(元)', sortable: 'true', itemType: 'text', width: '180px', type: 'money' }
      ],
      formTableConfigTwo: [
        { feeName: '冲抵费项', sortable: 'true', itemType: 'text', width: '180px' },
        { contractNo: '合同编号', sortable: 'true', itemType: 'text', width: '180px' },
        { accountName: '收款单位', sortable: 'true', itemType: 'text', width: '180px' },
        { remainingOffset: '剩余可冲抵金额(元)', sortable: 'true', itemType: 'text', width: '180px', type: 'money' },
        { applyOffsetAmount: '申请冲抵金额(元)', sortable: 'true', itemType: 'text', width: '180px', type: 'money' }
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
        { text: '剩余可冲抵金额汇总(元)', value: this.remainingOffsetTotalTwo },
        { text: '申请冲抵金额汇总(元)', value: this.applyOffsetAmountTotalTwo }
      ]
      return list
    },
    remainingOffsetTotal() {
      let sum = 0
      this.currentFormData.tableData.forEach(val => {
        sum += Number(val.remainingOffset)
      })
      return sum
    },
    applyOffsetAmountTotal() {
      let sum = 0
      this.currentFormData.tableData.forEach(val => {
        sum += Number(val.applyOffsetAmount)
      })
      return sum
    },
    remainingOffsetTotalTwo() {
      let sum = 0
      this.currentFormData.tableDataTwo.forEach(val => {
        sum += Number(val.remainingOffset)
      })
      return sum
    },
    applyOffsetAmountTotalTwo() {
      let sum = 0
      this.currentFormData.tableDataTwo.forEach(val => {
        sum += Number(val.applyOffsetAmount)
      })
      return sum
    }
  },
  created() {
    if (this.$route.query.verificationTypes === '收款核销') {
      this.isCollection = false
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog(data) {
      this.flag = false
      if (data) {
        this.currentFormData.tableData.push(data)
      }
    },
    // 关闭弹窗
    flodClick() {
      this.flag = true
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
