<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 11:29:19
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-24 23:57:32
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
        { conFeeType: '收款项目', itemType: 'text', width: '230px' },
        { receivableMoney: '应收金额', itemConfig: { width: '120px' }, width: '230px', itemType: 'input', inputType: 'Number' },
        { latestpaymentDate: '应收日期', itemType: 'datePicker', type: 'date', valueFormat: 'yyyy-MM-dd', width: '230px', itemConfig: { width: '164px' }},
        { invoiceTypeId: '票据', itemType: 'select', list: this.$PUBFN.getOptionsList('billType'), listName: 'label', listValue: 'value', width: '230px', itemConfig: { width: '164px' }}
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>
