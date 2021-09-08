/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 15:39:33
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:33:32
 */
<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <!-- 表格 -->
    <ysn-table
      ref="detailedData"
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Detailed',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { feeName: '费项', itemType: 'text' },
        { accountName: '收款单位', itemType: 'text', fixedWidth: 240 },
        { handleType: '类型', itemType: 'text' },
        { balance: '可用余额(元)', itemType: 'text', inputType: 'Number', type: 'money' },
        { mayApllyAmount: '可申请冲抵(元)', itemType: 'text', inputType: 'Number', type: 'money' },
        { amount: '处理金额(元)', itemType: 'text', inputType: 'Number', type: 'money' },
        { reason: '处理原因', itemType: 'text', fixedWidth: 150 }
      ]
    }
  }
}
</script>
