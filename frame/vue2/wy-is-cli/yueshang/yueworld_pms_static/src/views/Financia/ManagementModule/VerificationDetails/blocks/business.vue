<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-基本信息
-->
<template>
  <el-form :model="business" label-position="top" size="small">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Business',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'business',
    event: 'change'
  },
  props: {
    business: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'tenantName', label: '商户名称' },
        { itemType: 'text', prop: 'programName', label: '项目名称' },
        { itemType: 'text', prop: 'verificationPerson', label: '核销人员' },
        { itemType: 'text', prop: 'receivedAmount', label: '可核销金额(元)', type: 'money' },
        { itemType: 'text', prop: 'verificationStatusId', label: '核销状态' },
        { itemType: 'text', prop: 'verificationDate', label: '核销日期' }

      ]
    }
  }

}
</script>
