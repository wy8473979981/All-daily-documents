<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description:
-->
<template>
  <div v-if="currentFormData.tableData">
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
  name: 'AttachmentList',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'attachmentList',
    event: 'change'
  },
  props: {
    attachmentList: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { fileName: '资料名称', itemType: 'text' },
        { attachment: '附件', itemType: 'fileUpload', type: 'text' }
      ]
    }
  }
}
</script>
