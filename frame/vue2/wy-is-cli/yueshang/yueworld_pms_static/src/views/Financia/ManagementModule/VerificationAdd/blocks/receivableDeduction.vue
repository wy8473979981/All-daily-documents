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
      :column="formTableConfig"
      :show-operation="true"
      :first-row-add="false"
      add
    />
    <DialogFormAdd
      :is-show-dialog="dialogAdd"
      @closeDialog="close_"
      @getData="getData"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import DialogFormAdd from './item/dialogFormAdd.vue'
export default {
  name: 'ReceivableDeduction',
  components: {
    DialogFormAdd
  },
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
      dialogAdd: false,
      reductionAmountTotal: 10000.00,
      formTableConfig: [
        { contNo: '合同编号', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableNo: '应收编号', sortable: 'true', itemType: 'text', width: '110px' },
        { feeName: '费项', sortable: 'true', itemType: 'text', width: '100px' },
        { financialDate: '权责月', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableTime: '应收日期', sortable: 'true', itemType: 'text', width: '100px' },
        { tax: '税率(%)', sortable: 'true', itemType: 'text', width: '100px', type: 'money' },
        { actualReceivableAmount: '应收金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' },
        { reductionAmount: '冲减金额(元)', sortable: 'true', itemType: 'input', width: '120px', type: 'number', inputType: 'Number' }
      ]
    }
  },
  computed: {
    tableDescConfig() {
      const list = [
        { text: '应收冲减金额汇总(元)', value: this.offsetAmount, type: 'money' }
      ]
      return list
    },
    // 标题-应收冲减金额汇总 计算
    offsetAmount() {
      let sum = 0
      this.currentFormData.tableData.forEach(val => {
        if (Number(val.reductionAmount) > Math.abs(Number(val.actualReceivableAmount))) {
          val.reductionAmount = ''
          this.$message.error('冲减金额不能大于应收金额')
        }
        sum += Number(val.reductionAmount)
      })
      return sum
    }
  },
  methods: {
    // 头部加号点击
    flodClick() {
      this.dialogAdd = true
    },
    // 获取弹窗数据
    getData(val) {
      val.forEach(item => {
        item.reductionAmount = ''
      })
      console.log(val)
      this.currentFormData.tableData = [...this.currentFormData.tableData, ...val]
    },
    // 关闭弹窗
    close_() {
      this.dialogAdd = false
    }
  }
}
</script>
