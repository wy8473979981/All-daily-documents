<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-基础信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'EssentialData',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essentialData',
    event: 'change'
  },
  props: {
    essentialData: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      // 校验
      rulesForm: {
        remark: [{ required: true, message: '变更原因不能为空' }],
        effectivetime: [{ required: true, message: '变更生效时间不能为空' }]
      },
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'input',
          prop: 'contNo',
          label: '合同编号',
          placeholder: '请选择',
          disabled: true
        },
        {
          itemType: 'input',
          prop: 'programName',
          label: '项目名称',
          placeholder: '请选择',
          disabled: true
        },
        {
          itemType: 'datePicker',
          prop: 'effectivetime',
          label: '变更生效时间',
          placeholder: '请选择',
          disabled: this.$route.query.status === '审核通过' || this.$route.query.status === '审核中'
        },
        {
          itemType: 'input',
          prop: 'remark',
          label: '变更原因',
          required: true,
          disabled: this.$route.query.status === '审核通过' || this.$route.query.status === '审核中'
        }
      ]
    }
  },
  methods: {
  }

}
</script>
