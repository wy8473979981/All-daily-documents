<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增
-->

<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <!-- 信息模块-->

      <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        programName: [
          { required: true, message: '请选择适用项目' }
        ],
        ruleName: [
          { required: true, message: '请选择方案名称' }
        ],
        verificationTypes: [
          { required: true, message: '请选择核销类型' }
        ],
        ruleType: [
          { required: true, message: '请选择方案状态' }
        ]

      },
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'programName',
          label: '适用项目',
          placeholder: '请选择',
          required: true,
          list: this.$PUBFN.getOptionsList('projectName'),
          width: '206px'
        },
        {
          itemType: 'input',
          prop: 'ruleName',
          required: true,
          label: '方案名称',
          width: '206px'
        },
        {
          itemType: 'select',
          prop: 'verificationTypes',
          label: '核销类型',
          placeholder: '请选择',
          required: true,
          change: this.showConfig,
          width: '206px',
          list: this.$PUBFN.getOptionsList('writeOffType')
        },
        {
          itemType: 'select',
          prop: 'ruleType',
          label: '方案状态',
          placeholder: '请选择',
          required: true,
          width: '206px',
          list: this.$PUBFN.getOptionsList('schemeStatus')
        }
      ]
    }
  },
  methods: {
    showConfig(val) {
      this.$emit('comChange', val)
    }
  }
}
</script>
