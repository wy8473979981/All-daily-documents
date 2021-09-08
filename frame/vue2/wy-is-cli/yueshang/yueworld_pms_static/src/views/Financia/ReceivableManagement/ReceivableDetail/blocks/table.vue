/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description:处理单详情处理明细模块
*/

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      select-key="id"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'payableInfo',
    event: 'change'
  },
  props: {
    payableInfo: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { contNo: '合同编号' },
        { receivableNo: '应收编号' },
        { feeName: '费项' },
        { receivableAmount: '应收金额(元)', type: 'money' },
        { subAmount: '减免金额(元)', type: 'money' },
        { paymentDate: '账期' },
        { financialDate: '权责月' },
        { latestPaymentDate: '最迟缴费日' }
      ]
    }
  },

  methods: {

  }
}
</script>
