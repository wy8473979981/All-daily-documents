<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description: 撤场清算-新增-财务信息
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      v-if="!currentFormData.showDetail"
      ref="page"
      :checkbox="false"
      :data="currentFormData.tableData"
      :column="tableConfig"
      :show-operation="false"
    />
    <template v-else>
      <ysn-formTable
        v-model="currentFormData"
        prop="balanceList"
        :column="balanceConfig"
        :rules="formTableRules"
        :show-operation="false"
        is-dis-table
        class="mt-16"
        :show-slots="['fineAmount','offsetAmount','subAmount','refundAmount','hedgeAmount','description','operation','type']"
        :span-method="arraySpanMethod"
      >
        <template #type="scope">
          <div>{{ scope.row.type }}</div>
        </template>
        <template #fineAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('balanceList', 'fineAmount') }}</div>
          <el-input
            v-else
            v-model="scope.row.fineAmount"
            v-onlyNumber="{model:['currentFormData',`balanceList`,scope.$index,'fineAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #offsetAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('balanceList', 'offsetAmount') }}</div>
          <el-input
            v-else
            v-model="scope.row.offsetAmount"
            v-onlyNumber="{model:['currentFormData',`balanceList`,scope.$index,'offsetAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #subAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('balanceList', 'subAmount') }}</div>
          <el-input
            v-else
            v-model="scope.row.subAmount"
            v-onlyNumber="{model:['currentFormData',`balanceList`,scope.$index,'subAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #refundAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('balanceList', 'refundAmount') }}</div>
          <el-input
            v-else
            v-model="scope.row.refundAmount"
            v-onlyNumber="{model:['currentFormData',`balanceList`,scope.$index,'refundAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #hedgeAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('balanceList', 'hedgeAmount') }}</div>
          <el-input
            v-else
            v-model="scope.row.hedgeAmount"
            v-onlyNumber="{model:['currentFormData',`balanceList`,scope.$index,'hedgeAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #description="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.description }}</div>
          <el-input
            v-else
            v-model="scope.row.description"
            placeholder="请输入备注"
            maxlength="300"
          />
        </template>
      </ysn-formTable>
      <ysn-formTable
        v-model="currentFormData"
        prop="receivableAndUnReceivableList"
        class="mt-16"
        is-dis-table
        :column="receivableAndUnReceivableConfig"
        :show-slots="receivableAndUnReceivableConfigSlotList"
      >
        <template #name>
          <div>应收未收</div>
          <span class="operation add-icon" @click="addData" />
        </template>
        <template #conFeeType="scope">
          <div v-if="scope.row.disabled">
            {{ scope.row.conFeeType }}
          </div>
          <div v-else>
            <el-select v-model="scope.row.conFeeType">
              <el-option v-for="item in feeSubjectAll" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </template>
        <template #financialDate="scope">
          <div v-if="scope.row.disabled">
            {{ scope.row.financialDate }}
          </div>
          <el-datePicker v-else v-model="scope.row.financialDate" type="month" format="yyyy-MM" placeholder="请选择" />
        </template>
        <template #receivableTime="scope">
          <div v-if="scope.row.disabled">
            {{ scope.row.receivableTime }}
          </div>
          <el-datePicker v-else v-model="scope.row.receivableTime" placeholder="请选择" />
        </template>
        <template #actualReceivableAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'actualReceivableAmount') }}</div>
          <div v-else-if="scope.row.disabled">
            {{ changeNumber(scope.row.actualReceivableAmount) }}
          </div>
          <el-input
            v-else
            v-model="scope.row.actualReceivableAmount"
            v-onlyNumber="{model:['currentFormData',`receivableAndUnReceivableList`,scope.$index,'actualReceivableAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #earnestOffsetAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'earnestOffsetAmount') }}</div>
          <div v-else-if="scope.row.disabled">
            {{ changeNumber(scope.row.earnestOffsetAmount) }}
          </div>
          <el-input
            v-else
            v-model="scope.row.earnestOffsetAmount"
            v-onlyNumber="{model:['currentFormData',`receivableAndUnReceivableList`,scope.$index,'earnestOffsetAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #prepaidFeeOffsetAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'prepaidFeeOffsetAmount') }}</div>
          <div v-else-if="scope.row.disabled">
            {{ changeNumber(scope.row.prepaidFeeOffsetAmount) }}
          </div>
          <el-input
            v-else
            v-model="scope.row.prepaidFeeOffsetAmount"
            v-onlyNumber="{model:['currentFormData',`receivableAndUnReceivableList`,scope.$index,'prepaidFeeOffsetAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #hedgeAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'hedgeAmount') }}</div>
          <div v-else-if="scope.row.disabled">
            {{ changeNumber(scope.row.hedgeAmount) }}
          </div>
          <el-input
            v-else
            v-model="scope.row.hedgeAmount"
            v-onlyNumber="{model:['currentFormData',`receivableAndUnReceivableList`,scope.$index,'hedgeAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #subAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'subAmount') }}</div>
          <div v-else-if="scope.row.disabled">
            {{ changeNumber(scope.row.subAmount) }}
          </div>
          <el-input
            v-else
            v-model="scope.row.subAmount"
            v-onlyNumber="{model:['currentFormData','receivableAndUnReceivableList',scope.$index,'subAmount']}"
            placeholder="请输入"
          />
        </template>
        <template #residualDepositArAmount="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ calculateTotal('receivableAndUnReceivableList', 'residualDepositArAmount') }}</div>
          <div v-else>{{ changeNumber(calculateAmount(scope.row)) }}</div>
        </template>
        <template #operate2="scope">
          <span v-if="scope.row.conFeeType!=='合计' && !scope.row.disabled" class="operation minus-icon" @click="minusData(scope)" />
        </template>
      </ysn-formTable>
      <ysn-formTable
        v-model="currentFormData"
        prop="advancePaymentList"
        class="mt-16"
        is-dis-table
        :column="advancePaymentConfig"
        :show-slots="['accountName','description']"
      >
        <template #description="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.accountName }}</div>
          <el-input
            v-else
            v-model="scope.row.description"
            placeholder="请输入备注"
            maxlength="300"
          />
        </template>
        <template #accountName="scope">
          <div v-if="scope.row.conFeeType==='合计'">{{ scope.row.accountName }}</div>
          <el-select v-else v-model="scope.row.accountName">
            <el-option v-for="item in $PUBFN.getOptionsList('accountNames')" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
    financialData: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableKey: 0,
      advancePaymentListKey: 10,
      receivableAndUnReceivableListKey: 100,
      spanArr: [],
      pos: [],
      feeSubjectAll: [],
      formTableRules: {},
      receivableAndUnReceivableConfigSlotList: [
        'conFeeType',
        'actualReceivableAmount',
        'earnestOffsetAmount',
        'prepaidFeeOffsetAmount',
        'hedgeAmount',
        'subAmount',
        'name',
        'financialDate',
        'residualDepositArAmount',
        'receivableTime'
      ],
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
          { balanceAmount: '截止解约日余额', sortable: false, width: 130, type: 'money' },
          { fineAmount: '罚没金额', hasSlot: true, width: 150, type: 'money' },
          { offsetAmount: '冲抵金额', hasSlot: true, width: 150, type: 'money' },
          { subAmount: '减免金额', hasSlot: true, width: 150, type: 'money' },
          { refundAmount: '退还金额', hasSlot: true, width: 150, type: 'money' },
          { hedgeAmount: '冲减金额', hasSlot: true, width: 150, type: 'money' },
          { description: '备注', hasSlot: true, width: 150 }
        ]
      }],
      receivableAndUnReceivableConfig: [{
        name: '应收未收',
        slotsItem: 'name',
        hasSlotHeader: true,
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 120 },
          { financialDate: '权责月', sortable: false, width: 100, hasSlot: true },
          { receivableTime: '应收日期', sortable: false, width: 120, hasSlot: true },
          { accountingPeriod: '账期', sortable: false, width: 200 },
          { actualReceivableAmount: '实际应收金额', hasSlot: true, width: 150, type: 'money' },
          { earnestOffsetAmount: '保证金冲抵金额', hasSlot: true, width: 150, type: 'money' },
          { prepaidFeeOffsetAmount: '暂收款冲抵金额', hasSlot: true, width: 150, type: 'money' },
          { hedgeAmount: '冲减金额', sortable: false, hasSlot: true, width: 150, type: 'money' },
          { subAmount: '减免金额', sortable: false, hasSlot: true, width: 150, type: 'money' },
          { residualDepositArAmount: '剩余应收', sortable: false, hasSlot: true, width: 150, type: 'money' }
        ]
      },
      {
        operate1: '',
        sortable: false,
        tableList: [
          {
            operate2: '操作',
            hasSlot: true
          }
        ] }
      ],
      advancePaymentConfig: [{
        name: '应付明细',
        tableList: [
          { conFeeType: '费项', columnClass: 'hasBg', sortable: false, width: 150 },
          { financialDate: '权责月', sortable: false, width: 150 },
          { receivableTime: '应付日期', sortable: false, width: 150 },
          { refundAmount: '退款金额', sortable: false, type: 'money', width: 150 },
          { accountName: '付款单位', hasSlot: true, width: 150 },
          { bankName: '付款银行', width: 150 },
          { bankAccount: '付款账号', width: 150 },
          { description: '备注', sortable: false, hasSlot: true, width: 150 }
        ]
      }]
      // collectionInfoConfig: [{
      //   name: '收款信息（商家）',
      //   tableList: [
      //     { conFeeType: '收款单位', sortable: false },
      //     { conFeeType: '收款银行', sortable: false },
      //     { conFeeType: '收款账号', sortable: false }
      //   ]
      // }]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.getSpanArr(val.balanceList)
          this.tableKey++
          this.advancePaymentListKey++
          this.receivableAndUnReceivableListKey++
        })
      }
    }
  },
  mounted() {
    this.feeSubjectAll = this.$PUBFN.getOptionsList('FeeSubjectAll')
    this.$nextTick(() => {
      this.getSpanArr(this.currentFormData.balanceList)
      this.tableKey++
      this.advancePaymentListKey++
      this.receivableAndUnReceivableListKey++
    })
  },
  methods: {
    // 删除
    minusData(scope) {
      const idx = scope.$index
      this.currentFormData.receivableAndUnReceivableList.splice(idx, 1)
    },
    changeNumber(num) {
      let number = num
      number = parseFloat(number.toFixed(2))
      number = number.toLocaleString()
      const numberArray = number.toString().split('.')
      if (numberArray.length <= 1) {
        number = number + '.00'
      } else if (numberArray[1] < 10) {
        number = number + '0'
      }
      return number
    },
    calculateAmount(row) {
      const actualReceivableAmount = row.actualReceivableAmount ? row.actualReceivableAmount : 0
      const earnestOffsetAmount = row.earnestOffsetAmount ? row.earnestOffsetAmount : 0
      const prepaidFeeOffsetAmount = row.prepaidFeeOffsetAmount ? row.prepaidFeeOffsetAmount : 0
      const hedgeAmount = row.hedgeAmount ? row.hedgeAmount : 0
      const subAmount = row.subAmount ? row.subAmount : 0
      return actualReceivableAmount - earnestOffsetAmount - prepaidFeeOffsetAmount - hedgeAmount - subAmount
    },
    calculateTotal(prop, type) {
      let totalAmount = 0
      this.currentFormData[prop].forEach((item) => {
        if (item.conFeeType !== '合计') {
          if (item[type]) {
            if (type === 'residualDepositArAmount') {
              totalAmount += parseFloat(this.calculateAmount(item))
            } else {
              totalAmount += parseFloat(item[type])
            }
          }
        }
      })
      return this.changeNumber(totalAmount)
    },
    addData() {
      this.currentFormData.receivableAndUnReceivableList.splice(this.currentFormData.receivableAndUnReceivableList.length - 1, 0, {
        accountingPeriod: this.currentFormData.accountingPeriod
      })
    },
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

<style lang="scss" scoped>
.operation{
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.add-icon{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC3klEQVRoBe1YPWgUURCeufMHDJdagmBjLCysDNhY2N2eIFikSnNgWpu0ooSIhY2NnVhc4VUpBMHsdbaCjSikiY0g0TYmJxjJjjO7e+Q49t7M2+xGQt42t7cz+33zzZv39r0BCFfIQMhAyEDIwGnOAFYlfnF18dzvb7u3ieBuAnANCeYIaE7wEXCbELYbAJuI8PbC5db79dX1/Sq4jyyg0+1cJDp4zGEuccCzlqBY0C8A6iM21zZ6Gz8t70zzKS0gehCdh114SJSsMPjMNALl+RCx8Rxa8DR+Ef9RfAvNpQSkWYfkDRHdLET1fIiIHxAa98qMhreA9nL7Ov6Fd1wulzzjdLpzWX3n0eiwiC9Oxwmjl4Cs3pOPVQc/iikXseAzErww2C6peZKyqTjz4+yCLRzp/Bo3OO7NArIJW03NO+KBdF7x4uDyGbeZSkhKJ6GDr/yi12oT9wYpV9Rtj3Na7ocNbF6xlJJpBLJ13i94S5QOn5mc0+GSmVQB8oWVj5SKVLkDLmXcbmBVQLo9MH5h3VR+Vp7Qs8KtvaUKkL2NBlKX3cKtCpCNWV0BargWblWA7Co1orrsFu4zGjnXolPAaKl04bh8XEusxi2c6gi4Aqvbxps80jjUEUgPI0BXpwG5MjjKvMtnGm76nOCH085GdQTkJKWB1GW3cKsC2GGzrgA1XAu3KkDOsBpRXXYLtypADuDZGbauMItxhVO4i62HT1UBWfeA+oevHNcd9S2dC1WAhCvdA/4ZHlfowpVzqpSm84CgRN1ojTsQj1TEChz4bPwk7sXcqtEv0wikMNz6kO6BDnk0j5SDuawo5hEQwBN9qBcBcsSjs3BHugfyv8pLMPO2ilenzl5CebSDV4PPTLRQZTkJlmD69oQkpGaZLG592tqbvzX/Gvdls0U3GIOPnaUuaS0+gxbej1/GO2UQvOZAEUE2L05gc3dSzP9qr0/GEf6HDIQMhAyEDJyuDPwD2MAF4UaQ6IgAAAAASUVORK5CYII=) no-repeat;
  background-size: contain;
}
</style>

