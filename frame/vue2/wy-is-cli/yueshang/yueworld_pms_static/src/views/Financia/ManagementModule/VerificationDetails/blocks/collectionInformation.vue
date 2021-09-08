<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-编辑-核销-收款信息
-->
<template>
  <el-form :model="collectionInformation" label-position="top" size="small">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'CollectionInformation',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'collectionInformation',
    event: 'change'
  },
  props: {
    collectionInformation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'text', prop: 'receivedId', label: '收款编号' },
        { itemType: 'text', prop: 'receivedDate', label: '收款日期' },
        { itemType: 'text', prop: 'paymentTypeName', label: '收款方式' },
        { itemType: 'text', prop: 'receivedAmount', label: '收款金额(元)' },
        { itemType: 'text', prop: 'bankName', label: '收款银行' },
        { itemType: 'text', prop: 'bankAccount', label: '收款账号' },
        { itemType: 'text', prop: 'accountName', label: '收款单位' }

      ]
    }
  }

}
</script>
