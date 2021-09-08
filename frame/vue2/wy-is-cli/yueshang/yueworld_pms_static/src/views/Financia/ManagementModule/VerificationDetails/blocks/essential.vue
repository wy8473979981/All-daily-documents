<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-基本信息
-->
<template>
  <el-form :model="essential" label-position="top" size="small">
    <ysn-formItem :form="essential" :config="configData" :column="4" clearable text />
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
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'tenantName', label: '商户名称' },
        { itemType: 'text', prop: 'programName', label: '项目名称', disabled: true },
        { itemType: 'text', prop: 'verificationId', textType: 'autoValue', label: '核销编号', disabled: true },
        { itemType: 'text', prop: 'verificationTypes', label: '核销类型', disabled: true },
        { itemType: 'text', prop: 'verificationDate', label: '核销日期' },
        { itemType: 'text', prop: 'verificationPerson', label: '核销人员', inputType: 'autoValue', disabled: true }
      ]
    }
  }

}
</script>
