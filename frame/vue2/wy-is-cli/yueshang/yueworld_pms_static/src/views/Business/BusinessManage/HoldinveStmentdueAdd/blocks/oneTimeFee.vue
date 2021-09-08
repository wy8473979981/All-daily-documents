<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 10:46:44
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-16 15:50:12
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
        { conFeeType: '收款项目', itemType: 'text', width: '180px' },
        { commDiscountApply: '申请总额', itemType: 'input', width: '180px' }, // TODO 字段未找到
        { latestpaymentDate: '最迟缴费日', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '180px' },
        { invoiceTypeId: '票据类型', itemType: 'select', list: this.$PUBFN.getOptionsList('invoiceType'), listName: 'label', listValue: 'value', width: '180px' },
        { tax: '税率', itemType: 'select', list: this.$PUBFN.getOptionsList('taxIds'), listName: 'label', listValue: 'value', width: '180px' }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>

