<!--
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description:处理单详情处理明细模块
-->

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
//  混入
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
