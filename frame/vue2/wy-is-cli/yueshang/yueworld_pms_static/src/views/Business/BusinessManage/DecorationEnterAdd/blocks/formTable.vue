<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description:
-->
<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <!-- 表格 -->
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      add
      :first-row-add="false"
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
        { fileName: '资料名称', itemType: 'input', placeholder: '请输入' },
        { attachment: '附件', itemType: 'fileUpload', span: 1, width: 680, canOperate: true }
      ]
    }
  },
  methods: {
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = {
          fileName: '',
          attachment: []
        }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
