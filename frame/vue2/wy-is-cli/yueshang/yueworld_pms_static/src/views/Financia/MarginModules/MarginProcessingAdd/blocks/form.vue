/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 15:30:07
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:29:40
 */
<template>
  <el-form
    ref="ruleForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
    />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: { type: Object, default: () => {} }
  },
  data() {
    return {
      rulesForm: {
        contNo: [{ required: true, message: '请选择合同编号' }],
        actionDate: [{ required: true, message: '请选择处理日期' }]
      }
    }
  },
  computed: {
    productNoYn() {
      // 是否禁止输入框
      return this.$attrs.column === 4
    },
    configData() {
      return [
      // 表单配置
        {
          itemType: 'choiceContractDialog',
          prop: 'contNo',
          label: '合同编号',
          placeholder: '请选择合同编号',
          change: this.contractNoChange
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'programName',
          label: '项目',
          placeholder: '项目',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'marginNo',
          label: '处理单号',
          placeholder: '--系统自动生成--',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'brandName',
          inputType: 'autoValue',
          label: '品牌',
          placeholder: '品牌',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商家',
          placeholder: '商家',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'leaseArea',
          label: '租赁区域',
          placeholder: '租赁区域',
          disabled: true
        },
        {
          itemType: 'datePicker',
          prop: 'actionDate',
          label: '处理日期',
          width: '200px',
          placeholder: '请选择处理日期',
          type: 'date'
        }
      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.$emit('comChange', { type: 'contractNoChange', data: val })
    }
  }
}
</script>
