<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 保证金转换单OA审核记录
-->
<template>
  <div>
    <ysn-tableDesc class="mb-8" :config="tableDescConfig" />
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
    prop: 'pushMDetail',
    event: 'change'
  },
  props: {
    pushMDetail: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableDescConfig: [
        { text: '未核销金额汇总(元)', value: '12,800.00' },
        { text: '保证金冲抵金额汇总(元)', value: '12,800.00' }
      ]
    }
  },

  methods: {

  }
}
</script>
