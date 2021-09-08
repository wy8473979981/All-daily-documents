/*
 * @Author: jllk
 * @Date: 2021-07-28 16:53:11
 * @Last Modified by: mikey.zhaopengzhaopeng
 * @Last Modified time: 2021-08-17 11:33:14
 */

<template>
  <div>
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
  name: 'DetailsTable',
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
        { id: '序号' },
        { feeName: '费项' },
        { payableId: '应付编号' },
        { payableTime: '应付日期' },
        { payableAmountOne: '本次付款金额(元)', width: '133', type: 'money' },
        { tax: '税率(%)', align: 'right' }
      ]
    }
  },
  methods: {
  }
}
</script>
