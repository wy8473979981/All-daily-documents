/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批新增页表格模块
*/

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      v-model="currentFormData"
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      select-key="id"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Table',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'firstCountList',
    event: 'change'
  },
  props: {
    firstCountList: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [ // 表单配置
        { dealTimes: '处理时间' },
        { handler: '处理者' },
        { steps: '步骤' },
        { operationInstructions: '操作说明' }
      ]
    }
  },

  methods: {

  }
}
</script>
