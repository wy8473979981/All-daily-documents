<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-预览-保证金
-->

<template>
  <div v-if="currentFormData.tableList !==undefined && currentFormData.tableList.length > 0 ">
    <ysn-formTable
      v-model="currentFormData"
      prop="tableList"
      :column="tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'OneTimeFeeTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'oneTimeFee',
    event: 'change'
  },
  props: {
    oneTimeFee: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { conFeeType: '合同费项名称', sortable: false, itemType: 'text' },
        { receivableTime: '应收日期', sortable: false, itemType: 'text' },
        { receivableMoney: '应收金额', sortable: false, itemType: 'text', type: 'money' }
      ]
    }
  },
  methods: {}
}
</script>

