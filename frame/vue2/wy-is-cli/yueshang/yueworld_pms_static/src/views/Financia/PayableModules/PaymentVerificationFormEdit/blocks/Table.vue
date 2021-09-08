/*
 * @Author: jllk
 * @Date: 2021-08-05 11:22:43
 * @Last Modified by: jiallk
 * @Last Modified time: 2021-08-06 13:53:47
 */

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      select-key="id"
    />
  </div>
</template>

<script>
// 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'detailedData',
    event: 'change'
  },
  props: {
    detailedData: { type: Object, default: () => {} }
  },
  //   表格数据
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
