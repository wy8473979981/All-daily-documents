<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤场清算-详情-财务信息
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
        v-if="!currentFormData.showDetail"
        :checkbox="false"
        :data="currentFormData.tableData"
        :column="tableConfig"
        :show-operation="false"
    />
    <template v-else>
      <ysn-formTable
          :key="tableKey"
          v-model="currentFormData"
          prop="balanceList"
          class="mt-16"
          :column="balanceConfig"
          :checkbox="false"
          is-dis-table
          :span-method="arraySpanMethod"
          :show-slots="['conFeeType', 'type']"
      >
        <template #type="scope">
          <div>{{ scope.row.type }}</div>
        </template>
        <template #conFeeType="scope">
          <div v-if="scope.row.conFeeType==='合计'">合计</div>
          <div v-else>{{ scope.row.conFeeType }}</div>
        </template>
      </ysn-formTable>
      <ysn-formTable
          v-model="currentFormData"
          prop="receivableAndUnReceivableList"
          class="mt-16"
          :column="receivableAndUnReceivableConfig"
          :checkbox="false"
          is-dis-table
          :show-slots="['conFeeType']"
      >
        <template #conFeeType="scope">
          <div v-if="scope.row.conFeeType==='合计'">合计</div>
          <div v-else>{{ scope.row.conFeeType }}</div>
        </template>
      </ysn-formTable>
      <ysn-formTable
          v-model="currentFormData"
          prop="advancePaymentList"
          class="mt-16"
          :column="advancePaymentConfig"
          :checkbox="false"
          is-dis-table
      />
      <ysn-formTable
          v-model="currentFormData"
          prop="collectionInfoList"
          class="mt-16"
          :column="collectionInfoConfig"
          :checkbox="false"
          is-dis-table
      />
    </template>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'FinancialTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'financialData',
    event: 'change'
  },
  props: {
    financialData: {
      type: Object, default: () => {}
    }
  },
  data() {
    return {
      tableKey: 0,
      spanArr: [],
      pos: [],
      formTableRules: {},
      tableConfig: [
        { conFeeType: '费项', sortable: false },
        { s1: '截止解约日应收未收', sortable: false },
        { balance: '余额', sortable: false },
        { description: '备注', sortable: false }
      ],
      balanceConfig: [{
        name: '余额',
        tableList: [
          { type: '', columnClass: 'hasBg', sortable: false, width: 120 },
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          { balanceAmount: '截止解约日余额', type: 'money', sortable: false, width: 140 },
          { fineAmount: '罚没金额', type: 'money' },
          { offsetAmount: '冲抵金额', type: 'money', sortable: false },
          { subAmount: '减免金额', type: 'money', sortable: false },
          { refundAmount: '退还金额', type: 'money', sortable: false },
          { hedgeAmount: '冲减金额', type: 'money', sortable: false },
          { description: '备注', sortable: false }
        ]
      }],
      receivableAndUnReceivableConfig: [{
        name: '应收未收',
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          { financialDate: '权责月', sortable: false, width: 100 },
          { receivableTime: '应收日期', sortable: false, width: 120 },
          { accountingPeriod: '账期', sortable: false, width: 200 },
          { actualReceivableAmount: '实际应收金额', sortable: false, type: 'money', width: 120 },
          { earnestOffsetAmount: '保证金冲抵金额', sortable: false, type: 'money', width: 150 },
          { prepaidFeeOffsetAmount: '暂收款冲抵金额', sortable: false, type: 'money', width: 150 },
          { hedgeAmount: '冲减金额', sortable: false, type: 'money', width: 120 },
          { subAmount: '减免金额', sortable: false, type: 'money', width: 120 },
          { residualDepositArAmount: '剩余应收', sortable: false, type: 'money', width: 120 }
        ]
      }],
      advancePaymentConfig: [{
        name: '应付明细',
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false },
          { financialDate: '权责月', sortable: false },
          { receivableTime: '应付日期', sortable: false },
          { refundAmount: '退款金额', sortable: false, type: 'money' },
          { accountName: '付款单位' },
          { bankName: '付款银行' },
          { bankAccount: '付款账号' },
          { description: '备注', sortable: false, hasSlot: true }
        ]
      }],
      collectionInfoConfig: [{
        name: '收款信息（商家）',
        tableList: [
          { tenantName: '收款单位', sortable: false },
          { tenantletterheadBankname: '收款银行', sortable: false },
          { tenantletterheadBankNo: '收款账号', sortable: false }
        ]
      }]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.balanceList)
        this.tableKey++
      }
    }
  },
  mounted() {
    this.getSpanArr(this.currentFormData.balanceList)
    this.tableKey++
  },
  methods: {
    // 合并规则
    getSpanArr(data, idx) {
      this.spanArr = []
      this.pos = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].type === data[i - 1].type) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    // 数据处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.conFeeType !== '合计') {
        if (columnIndex === 0) {
          if (this.spanArr[rowIndex] > 0) {
            return {
              rowspan: this.spanArr[rowIndex],
              colspan: 1
            }
          }
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

