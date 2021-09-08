<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:38:53
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-14 18:08:28
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'OneShopOnePrice',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'oneShopOnePrice',
    event: 'change'
  },
  props: {
    oneShopOnePrice: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData1: {},
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'firstPartyName', label: '乙方名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'firstpartyUnifiedSocialCreditCode', label: '统一社会代码/身份证', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'firstpartyTel', label: '联系电话', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'firstpartyEmail', label: '邮箱地址', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'firstpartyAddress', label: '乙方地址', placeholder: '请输入', width: '206px', disabled: true }

      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>

