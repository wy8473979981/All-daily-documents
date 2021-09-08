/*
 * @Author: jllk
 * @Date: 2021-08-05 11:18:01
 * @Last Modified by: jiallk
 * @Last Modified time: 2021-08-06 13:03:12
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
  name: 'ApprovalTable',
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
        { ProcessingTime: '处理时间' },
        { updatePerson: '处理者' },
        { step: '步骤' },
        { Instructions: '操作说明' }
      ]
    }
  },
  methods: {
  }
}
</script>
