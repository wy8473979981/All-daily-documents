<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同变更-合同应收调整新增-条款变更
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      prop="tableData"
      :column="tableConfig"
      :show-slots="['contractTerm']"
    >
      <template #paymentDate="scope">
        <div>{{ scope.row.paymentStartDate }}~{{ scope.row.paymentEndDate }}</div>
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'ReceivableDefinite',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'receivableDefinite',
    event: 'change'
  },
  props: {
    receivableDefinite: {
      type: Object, default: () => {
      }
    },
    data: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      formTableRules: {},
      tableConfig: [
        { receivableNo: '应收编号', sortable: false, itemType: 'text' },
        { feeName: '费项', sortable: false, itemType: 'text' },
        { paymentDate: '账期', sortable: false, hasSlot: true, fixedWidth: 110 },
        { financialDate: '权责月', sortable: false, itemType: 'text' },
        {
          changeFinancialDate: '变更权责月',
          sortable: false,
          fixedWidth: 206,
          itemType: 'datePicker',
          type: 'month',
          format: 'yyyy-MM',
          placeholder: '请选择',
          disabled: !this.data.essentialData.contNo
        },
        { receivableTime: '应收日期', sortable: false, itemType: 'text' },
        {
          changeReceivableTime: '变更应收日期',
          sortable: false,
          fixedWidth: 206,
          itemType: 'datePicker',
          format: 'yyyy-MM-DD',
          placeholder: '请选择',
          disabled: !this.data.essentialData.contNo
        },
        { receivableAmount: '应收金额(元)', sortable: false, itemType: 'text', type: 'money' },
        {
          changeReceivableAmount: '变更应收金额(元)',
          fixedWidth: 206,
          sortable: false,
          itemType: 'input',
          inputType: 'Number',
          type: 'money',
          placeholder: '请输入',
          disabled: !this.data.essentialData.contNo
        },
        { subAmount: '已减免金额', sortable: false, itemType: 'text', type: 'money' }
      ]
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {
    flodClick() {
      if (this.data.essentialData.contNo) {
        this.currentFormData.tableData.push({})
      }
    }
  }
}
</script>

