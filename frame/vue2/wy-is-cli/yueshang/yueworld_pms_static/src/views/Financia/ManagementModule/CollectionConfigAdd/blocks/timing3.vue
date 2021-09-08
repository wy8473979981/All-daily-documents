<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增-自动核销
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
  name: 'Timing',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'timing',
    event: 'change'
  },
  props: {
    timing: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 验证
      rulesForm: {
        month: [
          { required: true, message: '请选择按月日期' }
        ]

      },
      configData: [
        // 表单配置
        {
          itemType: 'select',
          prop: 'month',
          required: true,
          width: '206px',
          placeholder: '请选择',
          label: '按每月',
          list: this.$PUBFN.getOptionsList('latestPaymentDateIds')
        }
      ]
    }
  }
}
</script>
