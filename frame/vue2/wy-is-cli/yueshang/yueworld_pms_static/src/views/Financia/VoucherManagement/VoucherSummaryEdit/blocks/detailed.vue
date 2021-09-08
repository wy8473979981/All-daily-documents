/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 16:01:32
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-30 09:42:33
 */

<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <ysn-table
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      :show-slots="['name']"
      select-key="id"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Detailed',
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
        { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
        { subjectId: '科目代码', sortable: true },
        { subjectName: '科目名称', sortable: true },
        { assistingName: '辅助核算', sortable: true },
        { direction: '方向', sortable: true },
        { debitAmount: '借方金额', type: 'money', sortable: true },
        { crebditAmount: '贷方金额', type: 'money', sortable: true },
        { abstract: '摘要', sortable: true },
        { cashflow: '现金流量', sortable: true },
        { enterSeq: '对应分录号', width: 120, sortable: true },
        { receiptNumber: '单据号', width: 120, sortable: true },
        { templateNumber: '来源模板', width: 120, sortable: true }
      ]
    }
  },
  mounted() {

  },
  methods: {
    flodClick() {
      if (this.currentFormData.tableData !== undefined) {
        const datas = { feeName: '', accountName: '', type: '', balance: '', mayApllyAmount: '', amount: '', reason: '' }
        this.currentFormData.tableData.push(datas)
      }
    }
  }
}
</script>
