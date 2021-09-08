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
          disName: '原单元',
          officeAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        },
        {
          disName: '新单元',
          officeAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        },
        {
          disName: '差异',
          officeAmount: 0,
          totalLeasableArea: 0,
          totalGrossArea: 0,
          totalNetArea: 0
        }
      ],
      tableConfig: [
        { disName: '', columnClass: 'hasBg', width: '100px' },
        { officeAmount: '单元数量' },
        { totalLeasableArea: '计租面积(m²)' },
        { totalGrossArea: '建筑面积(m²)' },
        { totalNetArea: '套内面积(m²)' },
        { averagePrice: '平均租金单价', width: 200, type: 'money' }
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
