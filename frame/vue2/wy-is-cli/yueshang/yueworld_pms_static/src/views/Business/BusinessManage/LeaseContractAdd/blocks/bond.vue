<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 11:29:19
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-11 13:39:10
-->
<template>
  <div>
    <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="bond"
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
    prop: 'bond',
    event: 'change'
  },
  props: {
    bond: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      formTableConfig: [
        { conFeeType: '收款项目', itemType: 'text' },
        { receivableMoney: '应收金额', itemType: 'input', inputType: 'Number', type: 'money' },
        { latestpaymentDate: '应收日期', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { invoiceTypeId: '票据', itemType: 'select', list: this.$PUBFN.getOptionsList('billType'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>
