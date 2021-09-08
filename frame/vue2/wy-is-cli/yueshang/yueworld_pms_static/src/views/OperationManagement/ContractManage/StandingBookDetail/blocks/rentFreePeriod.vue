<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同台账-详情-免租期
-->

<template>
  <div>
    <!-- 表格 -->
    <ysn-table
      :key="tableKey"
      :checkbox="false"
      :data="currentFormData.tableList"
      :column="tableConfig"
      :show-operation="false"
      :span-method="arraySpanMethod"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'

export default {
  name: 'RentFreePeriodTable',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'rentFreePeriod',
    event: 'change'
  },
  props: {
    rentFreePeriod: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableKey: 0,
      spanArr: [],
      pos: [],
      formTableRules: {},
      tableConfig: [
        { leaseArea: '租赁区域', itemType: 'text', sortable: false },
        { freeScope: '免租范围', itemType: 'text', sortable: true },
        { freeStartDate: '免租开始日', itemType: 'text', sortable: true },
        { freeEndDate: '免租结束日', itemType: 'text', sortable: true },
        { standardApply: '标准/申请', itemType: 'text', sortable: true }
      ]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.tableList)
        this.tableKey++
      }
    }
  },
  mounted() {
    this.getSpanArr(this.currentFormData.tableList)
    this.tableKey++
  },
  methods: {
    // 合并规则
    getSpanArr(data, idx) {
      console.log(data)
      this.spanArr = []
      this.pos = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].leaseArea === data[i - 1].leaseArea) {
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
</script>

