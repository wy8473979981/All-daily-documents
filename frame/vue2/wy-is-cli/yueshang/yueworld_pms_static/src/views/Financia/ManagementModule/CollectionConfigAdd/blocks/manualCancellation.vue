<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增-手工核销
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
  name: 'ManualCancellation',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'manualCancellation',
    event: 'change'
  },
  props: {
    manualCancellation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        defaultOutRules: [
          { required: true, message: '请选择带出规则' }
        ],
        ceilingNumber: [
          { required: true, message: '请选择上限条数' }
        ]

      },
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'defaultOutRules',
          label: '默认带出规则',
          placeholder: '请选择',
          required: true,
          width: '206px',
          list: this.$PUBFN.getOptionsList('writeOffSequence')
        },
        {
          itemType: 'input',
          type: 'number',
          prop: 'ceilingNumber',
          required: true,
          width: '206px',
          label: '上限条数'
        }
      ]
    }
  }
}
</script>
