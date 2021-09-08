<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
/*
 * @Author: xiaoxie
 * @Date: 2021-07-28 10:30:54
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-03 10:24:18
 */
<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <ysn-tableDesc :config="tableDescConfig" class="mb-12" />
    <ysn-table
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
      // 描述配置
      // tableDescConfig: [
      //   { text: '处理金额汇总(元)', value: 1 }
      // ],
      //
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
  },
  computed: {
    tableDescConfig() {
      return [
        { text: '处理金额汇总(元)', value: this.currentFormData.allTotal }
      ]
    }
  },
  created() {
    this.tableDescConfig[0].value = this.currentFormData.allTotal
  }
}
</script>
