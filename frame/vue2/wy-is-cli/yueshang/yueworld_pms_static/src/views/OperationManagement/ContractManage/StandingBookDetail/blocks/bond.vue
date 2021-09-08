<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description: 合同台账-详情-保证金
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
  name: 'Bond',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'bond',
    event: 'change'
  },
  props: {
    bond: {
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
  methods: {
  }
}
</script>

