<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同台账-详情-补充协议
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableList"
      :column="tableConfig"
      :show-operation="false"
      :show-slots="['receiptNumber']"
    >
      <template #receiptNumber="scope">
        <a style="color: #468CEB" @click.prevent="handleLink(scope.row)" >{{ scope.row.receiptNumber }}</a>
      </template>
    </ysn-table>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'SupplementalTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'supplemental',
    event: 'change'
  },
  props: {
    supplemental: { type: Object, default: () => {} }
  },
  data() {
    return {
      formTableRules: {},
      tableConfig: [
        { idx: '序号', itemType: 'text', sortable: false },
        { receiptNumber: '单据编号', itemType: 'text', sortable: true, hasSlot: true },
        { protocolType: '协议类型', itemType: 'text', sortable: true },
        { changeClearingTime: '变更-清算时间', itemType: 'text', sortable: true }
      ]
    }
  },
  methods: {
    handleLink(row) {
      const name = row.protocolType === '撤场清算' ? 'WithdrawDetail' : row.protocolType === '合同变更' ? 'ContractChangePreview' : 'ContractTerminationDetail'
      this.$router.push({
        name: name,
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

