<!--
 * @Author: xza
 * @Date: 2021-07-23 11:18:22
 * @LastEditTime: 2021-08-11 09:40:23
 * @LastEditors: xza
 * @Description: 保证金转换单详情-审核记录
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/blocks/historyShow.vue
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
