<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单详情页表格模块
-->

<template>
  <div>
    <!-- 汇总 -->
    <div class="pb-8">
      <ysn-tableDesc :config="[{value:currentFormData.adjustAmount,text:'调整金额汇总(元)'}]" />
    </div>
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
    prop: 'countData',
    event: 'change'
  },
  props: {
    countData: { type: Object, default: () => {} }
  },
  data() {
    return {
      // 调整明细表单配置
      tableConfig: [
        { contNo: '合同编号', required: true },
        { brandName: '收款单位' },
        { tenantName: '商家/企业' },
        { feeName: '费项', required: true },
        { receivableTime: '应收日期', required: true },
        { financialDate: '权责月', required: true },
        { adjustAmountone: '调整金额(元)', required: true, type: 'money' },
        { adjustReasonone: '调整原因' }
      ]
    }
  },
  methods: {}
}
</script>
