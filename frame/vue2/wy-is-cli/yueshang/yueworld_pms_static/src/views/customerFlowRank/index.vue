<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 11:34:45
 * @LastEditors: zhb
-->
<template>
  <div class="data-list">
    <Header :title-list="titleList" :search-click="searchClick" :reset-click="resetClick" />
    <LineChart :type="2" />
    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
  </div>
</template>

<script>
import Header from '../arrearageRank/components/header'
import LineChart from '../arrearageRank/components/line-chart'
import Table from '../arrearageRank/components/table'
import Pagination from '../arrearageRank/components/pagination'

export default {
  name: 'CustomerFlowRank',
  components: {
    LineChart,
    Table,
    Pagination,
    Header
  },
  data() {
    return {
      titleList: [{
        title: '累计客流',
        data: '1345.98'
      }, {
        title: '客流密度',
        data: '0.78%'
      }],
      tableColumnsConfig: [
        {
          prop: 'v1',
          label: '项目',
          totalData: '汇总',
          width: '150px',
          isSort: false
        },
        {
          prop: 'v2',
          label: '客流密度',
          totalData: '1.48',
          width: '120px',
          isSort: true
        },
        {
          prop: 'v3',
          label: '累计客流(万人)',
          width: '140px',
          totalData: '47.68',
          isSort: true
        },
        {
          prop: 'v4',
          label: '去年累计(万元)',
          width: '140px',
          totalData: '216.20',
          isSort: true
        },
        {
          prop: 'v5',
          label: '同比去年(万元)',
          totalData: '86.00',
          width: '140px',
          isSort: true
        },
        {
          prop: 'v6',
          label: '日均(万人)',
          totalData: '216.20',
          width: '120px',
          isSort: true
        },
        {
          prop: 'v7',
          label: '日均指标',
          totalData: '0.00',
          width: '120px',
          isSort: true
        },
        {
          prop: 'v8',
          label: '达成率',
          totalData: '-',
          width: '100px',
          isSort: true
        },
        {
          prop: 'v9',
          label: '工作日日均(万元)',
          totalData: '86.00',
          width: '180px',
          isSort: true
        },
        {
          prop: 'v9',
          label: '周末日均(万人)',
          totalData: '86.00',
          width: '180px',
          isSort: true
        }

      ],
      tableData: [{
        sequence: '',
        v1: '汇总',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00',
        v9: '86.00',
        v10: '86.00'
      }, {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '2.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '-',
        v9: '86.00',
        v10: '86.00'
      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '4.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '7.38',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '2.8',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '5',
        v1: '成都宝龙广场',
        v2: '5.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '6',
        v1: '成都宝龙广场',
        v2: '7.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      }
      ]
    }
  },
  methods: {
    resetClick() {
      this.tableData = [{
        sequence: '',
        v1: '汇总',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00',
        v9: '86.00',
        v10: '86.00'
      }, {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '2.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '-',
        v9: '86.00',
        v10: '86.00'
      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '4.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '7.38',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '2.8',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '5',
        v1: '成都宝龙广场',
        v2: '5.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      },
      {
        sequence: '6',
        v1: '成都宝龙广场',
        v2: '7.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-',
        v9: '83.00',
        v10: '86.00'
      }
      ]
    },
    searchClick() {
      this.tableData = this.tableData.splice(3)
    }
  }

}

</script>

<style lang="scss" scoped>
  .data-list {
    background-color: #F6F5EE;
    height: 100vh;
  }

</style>
