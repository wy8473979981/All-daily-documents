<!--
 * @Author: qiuyw
 * @LastEditors: qiuyw
 * @Description:
-->
<template>
  <div>
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      :column="tableConfig"
      prop="tableData"
      :rules="formTableRules"
      add
      :first-row-add="true"
    />
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'priceInfo',
    event: 'change'
  },
  props: {
    priceInfo: {
      type: Object,
      default: () => {
        return {
          tableData: []
        }
      }
    }
  },
  data() {
    return {
      tableConfig: [
        { standardYear: '年度', width: '193px', itemType: 'select', inputType: 'Number', required: true, list: [{ value: 2020, label: '2020' }] },
        { feeName: '费项名称', width: '193px', itemType: 'select', inputType: 'Number', required: true, list: PUBFN.getOptionsList('onePriceList') },
        { standardFee: '费项标准(元/m²)', width: '193px', itemType: 'input', inputType: 'Number', required: true },
        { standardFeeTimeUnit: '费项时间单位', width: '193px', itemType: 'select', inputType: 'Number', required: true, list: PUBFN.getOptionsList('moneyTimeType') },
        { standardFeeIncreasing: '递增率(%)', width: '193px', itemType: 'input', inputType: 'Number', required: true }
      ],
      formTableRules: {
        standardYear: [{ required: true, message: '' }],
        feeName: [{ required: true, message: '' }],
        standardFee: [{ required: true, message: '' }],
        standardFeeTimeUnit: [{ required: true, message: '' }],
        standardFeeIncreasing: [{ required: true, message: '' }]
      }
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {}
}
</script>
