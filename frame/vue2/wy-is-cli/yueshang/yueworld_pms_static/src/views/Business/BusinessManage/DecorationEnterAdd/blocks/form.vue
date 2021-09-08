
<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description:
-->
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
        decorationEnterDate: [{ required: true, message: '请选择 验收日期' }],
        decorateEndDate: [{ required: true, message: '请选择 验收日期' }],
        acceptanceDate: [{ required: true, message: '请选择 验收日期' }],
        expectOpenDate: [{ required: true, message: '请选择预计开业日期' }]
      }
    }
  },
  computed: {
    productNoYn() {
      // 是否禁止输入框
      return this.$attrs.column === 4
    },
    configData() {
      var that = this
      // 装修结束大于装修开始日
      const startPickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.decorateEndDate) {
            return new Date(that.currentFormData.decorateEndDate).getTime() < time.getTime() + 1000 * 60 * 60 * 24
          }
        }
      }
      // 装修结束日大于装修开始日
      const pickerOptions = {
        disabledDate(time) {
          if (that.currentFormData.decorationEnterDate) {
            const times = time.getTime() - 1000 * 60 * 60 * 24
            return new Date(that.currentFormData.decorationEnterDate).getTime() > times
          }
        }
      }
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
          label: '项目名称',
          placeholder: '项目名称',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantName',
          label: '商家名称',
          placeholder: '商家名称',
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
          itemType: 'input',
          prop: 'brandName',
          inputType: 'autoValue',
          label: '品牌名称',
          placeholder: '品牌名称',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'spaceLeasableArea',
          label: '计租面积（㎡）',
          inputType: 'autoValue',
          placeholder: '计租面积（㎡）',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'contBeginDate',
          label: '合同开始日期',
          inputType: 'autoValue',
          placeholder: '合同开始日期',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'contEndDate',
          label: '合同结束日期',
          inputType: 'autoValue',
          placeholder: '合同结束日期',
          disabled: true
        },
        {
          itemType: 'datePicker',
          prop: 'decorationEnterDate',
          label: '装修进场日期',
          placeholder: '请选择装修进场日期',
          type: 'date',
          pickerOptions: startPickerOptions
        },
        {
          itemType: 'datePicker',
          prop: 'decorateEndDate',
          label: '装修结束日期',
          type: 'date',
          pickerOptions: pickerOptions,
          placeholder: '请选择装修结束日期'
        },
        {
          itemType: 'datePicker',
          prop: 'acceptanceDate',
          label: '验收日期',
          type: 'date',
          placeholder: '请选择验收日期'
        },
        {
          itemType: 'datePicker',
          prop: 'expectOpenDate',
          label: '预计开业日期',
          type: 'date',
          placeholder: '请选择预计开业日期'
        },
        {
          itemType: 'input',
          type: 'textarea',
          prop: 'description',
          label: '备注说明',
          placeholder: '请输入',
          width: '428px',
          span: 4,
          isFirst: true,
          maxlength: 300
        }
      ]
    }
  },
  methods: {
    // 合同编号change
    contractNoChange(val) {
      this.currentFormData.contNo = val.contNo
      this.$emit('comChange', val)
    }
  }
}
</script>
