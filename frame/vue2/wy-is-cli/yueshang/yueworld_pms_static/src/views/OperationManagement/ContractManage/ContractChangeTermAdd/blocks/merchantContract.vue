<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-新增-商家合同信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'MerchantContract',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'merchantContract',
    event: 'change'
  },
  props: {
    merchantContract: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractName',
          label: '合同抬头',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractAddress',
          label: '合同地址',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractTel',
          label: '合同电话',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractPerson',
          label: '联系人',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractFax',
          label: '传真',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantContractEmail',
          label: '邮箱',
          disabled: true
        }
      ]
    }
  },
  methods: {}

}
</script>
