<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单新增审核记录
-->

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
        { processingtime: '处理时间' },
        { processor: '处理者' },
        { step: '步骤' },
        { operatinginstructions: '操作说明' }
      ]
    }
  },

  methods: {

  }
}
</script>
