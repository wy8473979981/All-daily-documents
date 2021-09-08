<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <ysn-table
    :data="logData.tableData"
    :column="tableConfig"
    :checkbox="false"
    is-dis-table
  />
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'logData',
    event: 'change'
  },
  props: {
    logData: {
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
        {
          disName: '原铺位',
          spaceAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        },
        {
          disName: '新铺位',
          spaceAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        },
        {
          disName: '差异',
          spaceAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        }
      ],
      tableConfig: [
        { disName: '', columnClass: 'hasBg', width: '100px' },
        { spaceAmount: '铺位数' },
        { totalLeasableArea: '计租面积(m²)' },
        { totalGrossArea: '建筑面积(m²)' },
        { totalNetArea: '套内面积(m²)' }
      ]
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {
  }
}
</script>
