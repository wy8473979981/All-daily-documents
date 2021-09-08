<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单审核记录
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
        { feeName: '费项' },
        { payee: '收款单位' },
        { dealType: '处理类型' },
        { temporaryReceiptsBalanceOne: '可用余额(元)', type: 'money' },
        { dealAmountOne: '处理金额(元)', type: 'money' },
        { dealReason: '处理原因' }
      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '处理金额汇总(元)', value: this.totalAll }
      ]
      return list
    },
    totalAll() {
      let num = 0
      // const dealAmountOneNum = 0
      this.currentFormData.tableData.forEach(item => {
        num += item.dealAmountOne
      })
      return num
    }
  },
  methods: {

  }
}
</script>
