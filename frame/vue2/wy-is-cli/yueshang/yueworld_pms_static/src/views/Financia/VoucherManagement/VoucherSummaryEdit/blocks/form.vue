/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 16:01:22
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-30 09:41:36
 */

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfo',
    event: 'change'
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [
        { itemType: 'text', prop: 'accountName', label: '账套名称' },
        { itemType: 'datePicker', prop: 'accrualDate', label: '凭证日期', type: 'date', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'text', prop: 'thirdVoucherId', label: '第三方凭证号' },
        { itemType: 'text', prop: 'ibTypeId', label: '收付类型' },
        { itemType: 'text', prop: 'debitAmount', label: '借方金额', type: 'money' },
        { itemType: 'text', prop: 'crebditAmount', label: '贷方金额', type: 'money' },
        { itemType: 'text', prop: 'uploadDate', label: '上传时间' },
        { itemType: 'text', prop: 'uploadUser', label: '上传人' },
        { itemType: 'text', prop: 'voucherType', label: '凭证类型' },
        { itemType: 'text', prop: 'templateType', label: '来源类型' }
      ]
    }
  },
  mounted() {
  },
  methods: {

  }

}
</script>
