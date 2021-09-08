<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 11:34:25
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-14 17:31:09
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="firstAccountPeriod"
      :column="formTableConfig"
      add
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'FirstAccountPeriod',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'firstAccountPeriod',
    event: 'change'
  },
  props: {
    firstAccountPeriod: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formTableConfig: [
        { conFeeType: '收款项目', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { paymentBegin: '账单开始', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { paymentEnd: '账单结束', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { firstPaymentDate: '首款缴费日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { paymentTotalAmount: '总额', itemType: 'input' },
        { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>
