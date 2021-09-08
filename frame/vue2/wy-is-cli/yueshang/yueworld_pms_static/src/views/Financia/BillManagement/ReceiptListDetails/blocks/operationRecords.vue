<!--
 * @Author: xza
 * @Date: 2021-07-30 10:58:23
 * @LastEditTime: 2021-07-31 14:02:33
 * @LastEditors: xza
 * @Description: In User Settings Edit
 * @FilePath: /baolong/src/views/Financia/BillManagement/ReceiptListDetails/blocks/operationRecords.vue
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="operationRecords.tableData"
      :column="operationRecords.tableConfig"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'OperationRecords',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'operationRecords',
    event: 'change'
  },
  props: {
    operationRecords: { type: Object, default: () => {} }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
