<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'programName', label: '项目名称', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'commentId', label: '审批号', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'createUser', label: '发起人', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'applyDate', label: '发起时间', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'remark', type: 'textarea', label: '备注', placeholder: '请输入', width: '425px', rows: 3, span: 2, maxlength: 300 },
        { itemType: 'fileUpload', prop: 'OfficeId', label: '附件', placeholder: '请输入', width: '425px', span: 2 }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  mounted() {
    console.log('currentFormData', this.baseInfo, this.currentFormData)
  },
  methods: {
    handelChange(val) {
      this.currentFormData.decorationEnterDate = val
    }
  }

}
</script>
