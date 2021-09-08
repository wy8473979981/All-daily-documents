<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableList"
      :column="tableConfig"
      :show-operation="false"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'NetSalesVolumeHistory',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'netSalesVolumeHistory',
    event: 'change'
  },
  props: {
    netSalesVolumeHistory: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      formTableRules: {},
      tableConfig: [
        { reviseDate: '审核时间', itemType: 'text' },
        { netSalesVolumeOld: '调整前', itemType: 'text' },
        { netSalesVolumeNew: '调整后', itemType: 'text' }
      ]
    }
  },
  methods: {}
}
</script>

