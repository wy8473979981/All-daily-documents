/*
 * @Author: xiaoxie
 * @Date: 2021-08-03 14:55:00
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-03 15:21:10
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
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [
        // 表单配置
        {
          itemType: 'input',
          prop: 'templateNumber',
          label: '模板名称',
          placeholder: '请输入模板名称'
        },
        {
          itemType: 'input',
          prop: 'creatDate',
          label: '创建时间',
          placeholder: '—自动带入—',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'update',
          label: '修改时间',
          placeholder: '—自动带入—',
          disabled: true
        }
      ],
      rulesForm: {
        templateNumber: [
          { required: true, message: '请选择模板名称' }
        ]
      }
    }
  }
}
</script>

