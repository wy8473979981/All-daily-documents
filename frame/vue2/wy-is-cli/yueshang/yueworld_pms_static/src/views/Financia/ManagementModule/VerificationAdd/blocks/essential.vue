<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-基本信息
-->
<template>
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="4"
      clearable
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Essential',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essential',
    event: 'change'
  },
  props: {
    essential: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: { // 表单验证
        tenantName: [{ required: true, message: '请输入必填项' }],
        verificationDate: [{ required: true, message: '请输入必填项' }]
      },
      configData: [ // 新单元表单配置
        { itemType: 'selectBusiness', change: this.contractNoChange, prop: 'tenantName', label: '商户名称', width: '206px',
          required: true, placeholder: '请选择', list: this.$PUBFN.getOptionsList('projectList'), listName: 'label' },
        { itemType: 'input', prop: 'programName', width: '206px', label: '项目名称', disabled: true, listName: 'label' },
        { itemType: 'input', prop: 'verificationId', width: '206px', inputType: 'autoValue', label: '核销编号', disabled: true },
        { itemType: 'input', width: '206px', prop: 'verificationTypes', label: '核销类型', disabled: true, listName: 'label' },
        { itemType: 'datePicker', width: '206px', prop: 'verificationDate', label: '核销日期', placeholder: '请选择' },
        { itemType: 'input', width: '206px', prop: 'verificationPerson', label: '核销人员', inputType: 'autoValue', disabled: true, listName: 'label' }
      ]
    }
  },
  methods: {
    // 商户名称change
    contractNoChange(val) {
      this.currentFormData.tenantName = val.tenantName
      this.currentFormData.programName = val.programName
      this.currentFormData.verificationId = val.verificationId
      this.currentFormData.verificationTypes = val.verificationTypes
      this.currentFormData.verificationPerson = val.verificationPerson
    }
  }
}
</script>
