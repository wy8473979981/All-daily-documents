<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description: 装修进场详情-费用信息table
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="currentFormData.tableConfig"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'feeInformationData',
    event: 'change'
  },
  props: {
    feeInformationData: { type: Object, default: () => {} }
  }
}
</script>
