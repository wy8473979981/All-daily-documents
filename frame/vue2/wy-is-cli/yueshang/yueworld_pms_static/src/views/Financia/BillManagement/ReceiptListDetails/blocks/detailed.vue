<!--
 * @Author: zbk
 * @LastEditors: xza
-->
<template>
  <div v-if="currentFormData.tableData !==undefined && currentFormData.tableData.length > 0 ">
    <!-- 表格 -->
    <ysn-table
      :checkbox="false"
      :data="detailedData.tableData"
      :column="detailedData.tableConfig"
      show-summary
      :summary-method="getSummaries"
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { toThousandFilter } from '@/filters/index'
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
    }
  },
  computed: {

  },
  methods: {
    // 合计
    getSummaries(param) {
      console.log(param)
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = toThousandFilter(sums[index])
          sums[index] += '.00'
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>
