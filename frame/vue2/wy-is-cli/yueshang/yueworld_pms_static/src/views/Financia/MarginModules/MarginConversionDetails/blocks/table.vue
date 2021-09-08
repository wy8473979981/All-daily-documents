<!--
 * @Author: xza
 * @Date: 2021-07-20 21:24:18
 * @LastEditTime: 2021-08-12 11:10:20
 * @LastEditors: xza
 * @Description: 保证金转换单详情-转换明细
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/blocks/table.vue
-->

<template>
  <div>
    <ysn-tableDesc class="mb-8" :config="convertDetail.configTop" />
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
    prop: 'convertDetail',
    event: 'change'
  },
  props: {
    convertDetail: { type: Object, default: () => {} }
  },
  data() {
    return {
    }
  },

  methods: {

  }
}
</script>
