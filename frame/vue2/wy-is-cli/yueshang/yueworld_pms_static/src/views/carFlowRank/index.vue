<template>
  <div class="data-list">
    <Header :title-list="titleList" :search-click="searchClick" :reset-click="resetClick" />
    <LineChart />
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
  name: 'CarFlowRank',
  components: {
    LineChart,
    Table,
    Pagination,
    Header
  },
  data() {
    return {
      titleList: [{
        title: '车流',
        data: '437.90'
      }],
      tableColumnsConfig: [
        {
          prop: 'v1',
          label: '项目',
          totalData: '汇总',
          width: '80',
          isSort: true
        },
        {
          prop: 'v2',
          label: '当月车流',
          totalData: '1.48',
          width: '',
          isSort: true
        },
        {
          prop: 'v3',
          label: '昨日车流',
          totalData: '47.68',
          isSort: true
        },
        {
          prop: 'v4',
          label: '环比',
          totalData: '216.20',
          isSort: true
        },
        {
          prop: 'v5',
          label: '周转率',
          totalData: '86.00',
          isSort: true
        }

      ],
      tableData: [{
        sequence: '',
        v1: '汇总',
        v2: '6,179',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20'
      },
      {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '6279',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '148',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '148',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '6,179',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '5',
        v1: '珠海宝龙广场',
        v2: '15,712',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '6',
        v1: '青岛宝龙广场',
        v2: '8354',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      }
      ]
    }
  },
  methods: {
    resetClick() {
      this.tableData = [{
        sequence: '',
        v1: '汇总',
        v2: '6,179',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20'
      },
      {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '6279',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '148',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '148',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '6,179',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '5',
        v1: '珠海宝龙广场',
        v2: '15,712',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

      },
      {
        sequence: '6',
        v1: '青岛宝龙广场',
        v2: '8354',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00'

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
