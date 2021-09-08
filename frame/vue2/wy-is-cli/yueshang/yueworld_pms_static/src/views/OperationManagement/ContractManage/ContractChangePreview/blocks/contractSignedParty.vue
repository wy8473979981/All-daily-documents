<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-合同签署方
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="tableList"
      is-dis-table
      :column="tableConfig"
    />
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'ContractSignedPartyTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'contractSignedParty',
    event: 'change'
  },
  props: {
    contractSignedParty: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      tableConfig: [
        { changeItem: '变更项', columnClass: 'hasBg', sortable: false, itemType: 'text' },
        { beforeValue: '变更前', sortable: false, itemType: 'text' },
        { afterValue: '变更后', sortable: false, itemType: 'text' }
      ]
    }
  },
  methods: {}
}
</script>

