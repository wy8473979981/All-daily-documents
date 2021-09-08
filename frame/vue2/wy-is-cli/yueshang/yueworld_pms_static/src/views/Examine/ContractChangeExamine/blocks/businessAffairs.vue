<!--
 * @Description:
 * @Author: wyz
 * @LastEditors: 合同变更-预览-商家信息
-->
<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="tableList"
      :column="tableConfig"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'BusinessAffairs',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'businessAffairs',
    event: 'change'
  },
  props: {
    businessAffairs: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tableConfig: [
        { changeItem: '变更项', sortable: false, itemType: 'text' },
        { beforeValue: '变更前', sortable: false, itemType: 'text' },
        { afterValue: '变更后', sortable: false, itemType: 'text' }
      ]
    }
  },
  methods: {}
}
</script>

