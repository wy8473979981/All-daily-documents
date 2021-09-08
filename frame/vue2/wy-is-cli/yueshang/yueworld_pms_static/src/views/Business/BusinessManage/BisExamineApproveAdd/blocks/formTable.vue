<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批新增页表单模块
-->
<template>
  <div v-if="currentFormData.tableData&&currentFormData.tableData.length>0 ">
    <!-- 表格 -->
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :first-row-add="false"
      add
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
        { fileName: '资料名称', itemType: 'input' },
        { attachment: '附件', itemType: 'fileUpload', width: 700, actionUrl: '', limitNum: 4, span: 5, canOperate: true }
      ]
    }
  },
  methods: {
    flodClick() {
      const datas = {
        fileName: '',
        attachment: []
      }
      this.currentFormData.tableData.push(datas)
    }
  }
}
</script>
