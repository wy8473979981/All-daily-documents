<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:付款核销单-详情
-->
<template>
  <!-- 表单 -->
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
// 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Receiveform',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfoPayment',
    event: 'change'
  },
  props: {
    baseInfoPayment: {
      type: Object,
      default: () => {}
    }
  },
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        // 详情配置
        {
          itemType: 'text',
          prop: 'tenantId',
          label: '收款单位'
        },
        {
          itemType: 'text',
          prop: 'collectionBankName',
          label: '收款银行'
        },
        {
          itemType: 'text',
          prop: 'collectionBankAccount',
          label: '收款账号'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
