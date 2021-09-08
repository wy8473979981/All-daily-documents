<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销明细信息
-->
<template>
  <el-form :model="currentFormData" label-position="top" size="small">
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
      :first-row-add="false"
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'WriteOffDetails',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'writeOffDetails',
    event: 'change'
  },
  props: {
    writeOffDetails: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      flag: false,
      formTableConfig: [
        { receivableNo: '应收编号', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableTime: '应收日期', sortable: 'true', itemType: 'text', width: '120px' },
        { financialDate: '权责月', sortable: 'true', itemType: 'text', width: '100px' },
        { receivableAmount: '应收金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' },
        { applyDerateAmountTotal: '减免金额(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' },
        { unverifiedAmount: '未核销金额(元)', sortable: 'true', itemType: 'text', width: '130px', type: 'money' },
        { zanOffsetAmount: '预收款冲抵(元)', sortable: 'true', itemType: 'text', width: '130px', type: 'money' },
        { baoOffsetAmount: '保证金冲抵(元)', sortable: 'true', itemType: 'text', width: '130px', type: 'money' },
        { receivableReductionAmount: '应收冲减(元)', sortable: 'true', itemType: 'text', width: '120px', type: 'money' }
      ]
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
    },
    // 关闭弹窗
    closeDialog(data) {
      this.flag = false
      if (data) {
        this.currentFormData.tableData.push(data)
      }
    }
  }
}
</script>
