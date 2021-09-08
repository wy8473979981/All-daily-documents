<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批新增页表格模块
-->

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
    prop: 'feeInformationData',
    event: 'change'
  },
  props: {
    feeInformationData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { feeName: '费用类型', width: 210 },
        { actualReceivableAmount: '实际应收金额(元)', itemType: 'input', type: 'money', width: 250 },
        { receivedAmount: '已核销金额(元)', itemType: 'input', type: 'money', width: 320 },
        { unverifiedAmount: '未核销金额(元)', itemType: 'input', type: 'money', width: 330 }]
    }
  },

  methods: {

  }
}
</script>
