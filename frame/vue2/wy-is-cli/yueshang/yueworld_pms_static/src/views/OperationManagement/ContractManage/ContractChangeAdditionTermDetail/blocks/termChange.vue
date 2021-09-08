<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-补充条款详情-条款变更
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'TermChange',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'termChange',
    event: 'change'
  },
  props: {
    termChange: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      tableConfig: [
        { changeItem: '变更项', sortable: false, fixedWidth: 206, itemType: 'text' },
        { contractTerm: '合同条款', sortable: false, itemType: 'text' }
      ]
    }
  },
  mounted() {
    this.currentFormData.tableData[0].contractTerm = this.currentFormData.beforeChangeContTerms
    this.currentFormData.tableData[1].contractTerm = this.currentFormData.afterChangeContTerms
  },
}
</script>

