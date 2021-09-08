<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单详情审核记录模块
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
        { processingtime: '处理时间', itemType: 'text' },
        { processor: '处理者', itemType: 'text' },
        { step: '步骤', itemType: 'text' },
        { operatinginstructions: '操作说明', itemType: 'text' }

      ]
    }
  },

  methods: {

  }
}
</script>
