<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-周期型费用
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="formDiffList"
      :column="formTableConfig"
    />
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="beforeList"
      :column="beforeTableConfig"
      :span-method="beforeArraySpanMethod"
      :show-slots="['beginningDate']"
    >
      <template #beginningDate="scope">
        <div>
          <span>{{ scope.row.beginningDateStart }}</span>
          ~
          <span>{{ scope.row.beginningDateEnd }}</span>
        </div>
      </template>
    </ysn-formTable>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="afterList"
      :column="afterTableConfig"
      :span-method="afterArraySpanMethod"
      :show-slots="['beginningDate']"
    >
      <template #beginningDate="scope">
        <div>
          <span>{{ scope.row.beginningDateStart }}</span>
          ~
          <span>{{ scope.row.beginningDateEnd }}</span>
        </div>
      </template>
    </ysn-formTable>
  </div>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'CommissionRentBlock',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'commissionRent',
    event: 'change'
  },
  props: {
    commissionRent: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      beforeSpanArr: [],
      afterSpanArr: [],
      pos: 0,
      tableKey: 0,
      formTableConfig: [
        { changeItem: '变更项', sortable: false, itemType: 'text' },
        { beforeValue: '变更前', sortable: false, itemType: 'text' },
        { afterValue: '变更后', sortable: false, itemType: 'text' }
      ],
      beforeTableConfig: [
        {
          before: '变更前',

          tableList: [
            { leaseArea: '租赁区域', sortable: false, itemType: 'text', width: 120 },
            { idx: '序号', sortable: false, itemType: 'text', width: 100 },
            { beginningDate: '期间', sortable: false, hasSlot: true, width: 200 },
            { isPromotional: '优惠期', sortable: false, width: 80 },
            {
              commDiscount: '扣率',
              type: 'rate',
              sortable: false,
              width: 80
            },
            {
              startingMonthlyTurnover: '月营业额起',
              type: 'money',
              sortable: false,
              width: 150
            },
            {
              endingMonthlyTurnover: '月营业额止',
              type: 'money',
              sortable: false,
              width: 150
            },
            { salesTaxRate: '销售额税率', type: 'rate', sortable: false, width: 80 }
          ]
        }
      ],
      afterTableConfig: [
        {
          before: '变更后',

          tableList: [
            { leaseArea: '租赁区域', sortable: false, itemType: 'text', width: 120 },
            { idx: '序号', sortable: false, itemType: 'text', width: 100 },
            { beginningDate: '期间', sortable: false, hasSlot: true, width: 200 },
            { isPromotional: '优惠期', sortable: false, width: 80 },
            {
              commDiscount: '扣率',
              type: 'rate',
              sortable: false,
              width: 80
            },
            {
              startingMonthlyTurnover: '月营业额起',
              type: 'money',
              sortable: false,
              width: 150
            },
            {
              endingMonthlyTurnover: '月营业额止',
              type: 'money',
              sortable: false,
              width: 150
            },
            { salesTaxRate: '销售额税率', type: 'rate', sortable: false, width: 80 }
          ]
        }
      ]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.beforeList, 'before')
        this.getSpanArr(val.afterList, 'after')
        this.tableKey++
      }
    }
  },
  mounted() {
    this.getSpanArr(this.currentFormData.beforeList, 'before')
    this.getSpanArr(this.currentFormData.afterList, 'after')
  },
  methods: {
    // 数据处理
    beforeArraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.beforeSpanArr[rowIndex] > 0) {
          return {
            rowspan: this.beforeSpanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    afterArraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.afterSpanArr[rowIndex] > 0) {
          return {
            rowspan: this.afterSpanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 合并规则
    getSpanArr(data, type) {
      this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'] = []
      this.pos = 0
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].leaseArea === data[i - 1].leaseArea) {
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'][this.pos] += 1
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(0)
          } else {
            this[type === 'before' ? 'beforeSpanArr' : 'afterSpanArr'].push(1)
            this.pos = i
          }
        }
      }
    }
  }

}
</script>

