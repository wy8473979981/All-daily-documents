<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 保证金转换单OA审核记录
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
  name: 'HistoryShow',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'historyShow',
    event: 'change'
  },
  props: {
    historyShow: { type: Object, default: () => {} }
  },
  data() {
    return {
    }
  },

  methods: {

  }
}
</script>
