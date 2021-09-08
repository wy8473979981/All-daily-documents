<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <ysn-table
    :data="currentFormData.tableData"
    :column="tableConfig"
    :checkbox="false"
    :show-slots="showSlots"
  >
    <template v-for="(item,index) in showSlots" :slot="item" slot-scope="scope">
      <div class="free-show-text" :key="index">
        <p>{{ scope.row.freeShow[index].price }}元/㎡/{{ scope.row.freeShow[index].priceType }}</p>
        <p>递增率{{ scope.row.freeShow[index].percent }}%</p>
      </div>
    </template>
  </ysn-table>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'tablePriceOld',
    event: 'change'
  },
  props: {
    tablePriceOld: {
      type: Object,
      default: () => {
        return {
          tableData: []
        }
      }
    }
  },
  data() {
    return {
      tableData: [
      ]
    }
  },
  computed: {
    // 表格配置项
    tableConfig() {
      const { tableData } = this.currentFormData
      const config = [
        { standardYear: '年度', width: 80 },
        // { standardDeposit: '租赁保证金标准(元)', width: 160, type: 'money' },
        // { standardDecorationDeposit: '装修保证金标准(元)', width: 160, type: 'money' },
        // { standardRentFreePeriod: '免租期(天)' }
      ]
      // 根据费用项数组动态计算列
      if (tableData[0] && tableData[0].freeShow) {
        tableData[0].freeShow.forEach((item, index) => {
          config.push({
            [`freeShow${index}`]: item.name
          })
        })
      }
      return config
    },
    showSlots() {
      const { tableData } = this.currentFormData
      const slots = []
      // 根据费用项数组动态计算列
      if (tableData[0] && tableData[0].freeShow) {
        tableData[0].freeShow.forEach((item, index) => {
          slots.push(`freeShow${index}`)
        })
      }
      return slots
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
