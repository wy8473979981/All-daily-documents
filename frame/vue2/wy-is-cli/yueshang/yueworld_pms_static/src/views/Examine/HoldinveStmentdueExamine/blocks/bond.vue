<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 11:29:19
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-13 16:43:36
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
        { receivableMoney: '应收金额', itemType: 'text',type:'money' },
        { latestpaymentDate: '应收日期', itemType: 'text', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { invoiceTypeId: '票据', itemType: 'text', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}

</script>
