<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单详情冲抵核销明细
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
    prop: 'lisThird',
    event: 'change'
  },
  props: {
    lisThird: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { feeName: '费项', itemType: 'text' },
        { receivableNo: '应收编号', itemType: 'text' },
        { receivableTime: '应收日期', itemType: 'text' },
        { financialDate: '权责月', itemType: 'text' },
        { receivableAmount: '应收金额(元)', itemType: 'text', type: 'money' },
        { applyDerateAmountTotal: '减免金额(元)', itemType: 'text', type: 'money' },
        { unverifiedAmount: '未核销金额(元)', itemType: 'text', type: 'money' },
        { OffsetAmount: '暂收款冲抵(元)', itemType: 'text', type: 'money', width: '150px' }

      ]
    }
  },
  computed: {
    // 列表左侧描述配置
    tableDescConfig() {
      const list = [
        { text: '未核销金额汇总(元)', value: this.unverifiedAmount, type: 'money' },
        { text: '暂收款冲抵汇总(元)', value: this.OffsetAmount, type: 'money' }
      ]
      return list
    },
    unverifiedAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(item => {
        num += Number(item.unverifiedAmount)
      })
      return num.toFixed(2)
    },
    OffsetAmount() {
      let num = 0
      this.currentFormData.tableData.forEach(item => {
        num += Number(item.OffsetAmount)
      })
      return num.toFixed(2)
    }
  },
  methods: {

  }
}
</script>
