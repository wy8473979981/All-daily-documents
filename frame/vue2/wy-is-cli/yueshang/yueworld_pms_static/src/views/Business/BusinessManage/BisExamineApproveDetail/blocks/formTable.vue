<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批详情表单模块
-->
<template>
  <div v-if="currentFormData.tableData ">
    <!-- 表格 -->
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'FormTableData',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formTableData',
    event: 'change'
  },
  props: {
    formTableData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { fileName: '资料名称', itemType: 'text' },
        { attachment: '附件', itemType: 'fileUpload', type: 'text' }
      ]
    }
  },

  methods: {}
}
</script>
