<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单转换明细
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
        { applicationAmount: '冲抵金额(元)', itemType: 'text', type: 'money', width: '230px' }
      ]
    }
  },

  methods: {

  }
}
</script>
