<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description: 合同解约-新增-财务信息
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
        class="mt-16"
        :data="currentFormData"
        prop="balanceList"
        :column="balanceConfig"
        is-dis-table
        :show-slots="['description','type']"
        :span-method="arraySpanMethod"
      >
        <template #type="scope">
          <div>{{ scope.row.type }}</div>
        </template>
        <template #description="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.description }}</div>
          <el-tooltip v-else :content="scope.row.description||'请输入备注'" placement="top" effect="dark">
            <el-input
              v-model="scope.row.description"
              placeholder="请输入备注"
              maxlength="300"
            />
          </el-tooltip>
        </template>
      </ysn-formTable>
      <ysn-formTable
        class="mt-16"
        :data="currentFormData"
        prop="receivableAndUnReceivableList"
        :column="receivableAndUnReceivableConfig"
        is-dis-table
        :show-slots="['description']"
      >
        <template #description="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.description }}</div>
          <el-tooltip v-else :content="scope.row.description||'请输入备注'" placement="top" effect="dark">
            <el-input
              v-model="scope.row.description"
              placeholder="请输入备注"
              maxlength="300"
            />
          </el-tooltip>
        </template>
      </ysn-formTable>
      <ysn-formTable
        class="mt-16"
        :data="currentFormData"
        prop="advancePaymentList"
        is-dis-table
        :column="advancePaymentConfig"
        :show-slots="['description']"
      >
        <template #description="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.description }}</div>
          <el-tooltip v-else :content="scope.row.description||'请输入备注'" placement="top" effect="dark">
            <el-input
              v-model="scope.row.description"
              placeholder="请输入备注"
              maxlength="300"
            />
          </el-tooltip>
        </template>
      </ysn-formTable>
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
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
      spanArr: [],
      pos: [],
      formTableRules: {},
      tableConfig: [
        { conFeeType: '费项', sortable: false },
        { s1: '截止解约日应收未收', sortable: false, type: 'money' },
        { balance: '余额', sortable: false, type: 'money' },
        { description: '备注', sortable: false }
      ],
      balanceConfig: [{
        name: '余额',
        tableList: [
          { type: '', columnClass: 'hasBg', sortable: false, width: 100 },
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          {
            sreceAmount: '未收(元)',
            type: 'money',
            sortable: false
          },
          {
            fineAmount: '已罚没(元)',
            type: 'money',
            sortable: false
          },
          {
            offsetAmount: '已冲抵(元)',
            type: 'money',
            sortable: false
          },
          {
            refundAmount: '已退款(元)',
            type: 'money',
            sortable: false
          },
          {
            balance: '余额(元)',
            type: 'money',
            sortable: false
          },
          { description: '备注', sortable: false, hasSlot: true }
        ]
      }],
      receivableAndUnReceivableConfig: [{
        name: '应收未收（截止到解约月份）',
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          { financialDate: '权责月', sortable: false, width: 100 },
          { receivableTime: '应收日期', sortable: false, width: 120 },
          { accountingPeriod: '账期', sortable: false, width: 200 },
          {
            depositArAmount: '应收金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            subAmount: '减免金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            actualReceivableAmount: '实际应收金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            receivedAmount: '已核销金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            noReceivedAmount: '未核销金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          { description: '备注', itemType: 'input', sortable: false, width: 200, hasSlot: true }
        ]
      }],
      advancePaymentConfig: [{
        name: '预收款（截止到解约月份）',
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          { financialDate: '权责月', sortable: false, width: 100 },
          { receivableTime: '应收日期', sortable: false, width: 100 },
          { accountingPeriod: '账期', sortable: false, width: 200 },
          {
            receivableAmount: '应收金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            subAmount: '减免金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            actualReceivableAmount: '实际应收金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          {
            receivedAmount: '已核销金额(元)',
            type: 'money',
            sortable: false,
            width: 120
          },
          { description: '备注', itemType: 'input', sortable: false, hasSlot: true, width: 200 }
        ]
      }]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.balanceList)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSpanArr(this.currentFormData.balanceList)
    })
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

