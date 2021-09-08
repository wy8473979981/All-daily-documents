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
      rulesForm: {
        day: [
          { required: true, message: '请选择按日日期' }
        ]
      },
      configData: [
        // 表单配置
        {
          itemType: 'timePicker',
          prop: 'day',
          label: '按日',
          placeholder: '请选择',
          width: '206px',
          required: true
        }
      ]
    }
  },
  methods: {

  }

}
</script>
