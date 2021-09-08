<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-08 17:31:31
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-08 17:45:19
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="party" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="party" :config="configData" :column="4" clearable />
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'PartyAsContract',
  components: {},
  model: {
    prop: 'party',
    event: 'change'
  },
  props: {
    party: {
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
        { itemType: 'input', prop: 'firstpartyAddress', label: '甲方地址', placeholder: '请输入', width: '206px', disabled: true }

      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>
