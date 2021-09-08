<!--
 * @Author: xza
 * @Date: 2021-07-30 10:58:23
 * @LastEditTime: 2021-08-04 14:12:19
 * @LastEditors: xza
 * @Description: 操作记录
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
