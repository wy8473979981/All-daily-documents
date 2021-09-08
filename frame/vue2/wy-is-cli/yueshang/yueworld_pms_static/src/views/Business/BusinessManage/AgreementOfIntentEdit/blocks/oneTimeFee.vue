<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 10:46:44
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-14 17:27:11
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="oneTimeFee"
      :column="formTableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'OneTimeFee',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'oneTimeFee',
    event: 'change'
  },
  props: {
    oneTimeFee: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formTableConfig: [
        { conFeeType: '收款项目', itemType: 'text' },
        { commDiscountApply: '申请总额', itemType: 'input' }, // TODO 字段未找到
        { latestpaymentDate: '最迟缴费日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { invoiceTypeId: '票据类型', itemType: 'select', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
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

