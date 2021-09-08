<!--
 * @Author: sdy
 * @LastEditors: fhj
 * @Description:转换单转换明细
-->

<template>
  <div>
    <ysn-tableDesc class="mb-8" :config="tableDescConfig" />
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
    prop: 'listSecond',
    event: 'change'
  },
  props: {
    listSecond: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { transferOutFee: '转出费项', itemType: 'text', placeholder: '请选择' },
        { accountName: '收款单位', itemType: 'text' },
        { turnableAmount: '可转入金额(元)', itemType: 'text', type: 'money' },
        { turnAmount: '转入金额(元)', itemType: 'text', type: 'money' },
        { applicationAmount: '冲抵金额(元)', itemType: 'text', type: 'money' }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '可转入金额汇总(元)', value: '20,000.00', type: 'money' },
        { text: '转入金额汇总(元)', value: '20,000.00', type: 'money' },
        { text: '冲抵金额汇总(元)', value: '20,000.00', type: 'money' }
      ]
      return list
    }
  }
}
</script>
