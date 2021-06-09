<template>
  <div class="data-list">
    <Header :title-list="titleList" :type="1" :search-click="searchClick" :reset-click="resetClick" />
    <div class="charts-box">
      <LineChart :charts-style="chartsStyle" :type="3" />
      <BarChart :charts-style="chartsStyle" />
    </div>

    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
  </div>
</template>

<script>
import Header from '../arrearageRank/components/header'
import LineChart from '../arrearageRank/components/line-chart'
import BarChart from '../arrearageRank/components/bar-chart'
import Table from '../arrearageRank/components/table'
import Pagination from '../arrearageRank/components/pagination'
export default {
  name: 'VipRank',
  components: {
    LineChart,
    Table,
    Pagination,
    Header,
    BarChart
  },
  data() {
    return {
      chartsStyle: `width:528px;height:220px;`,
      titleList: [{
        title: '累计会员数(截至2021-05-04 23:59:59)',
        data: '4,370,405'
      }],
      tableColumnsConfig: [
      {
        prop: 'v1',
        label: '项目',
        totalData: '汇总',
        width: '120px',
        isSort: true
      },
      {
        prop: 'v2',
        label: '总会员数(万人)',
        totalData: '1.48',
        width: '160px',
        isSort: true
      },
      {
        prop: 'v3',
        label: '当月新增会员数(万人)',
        totalData: '47.68',
        width: '180px',
        isSort: true
      },
      {
        prop: 'v4',
        label: '当月消费会员数(万人)',
        totalData: '216.20',
        width: '180px',
        isSort: true
      },
      {
        prop: 'v5',
        label: '当月消费金额(万元)',
        totalData: '86.00',
        width: '180px',
        isSort: true
      },
      {
        prop: 'v6',
        label: '年累计新增会员(万人)',
        totalData: '216.20',
        width: '180px',
        isSort: true
      },
      {
        prop: 'v7',
        label: '年累计消费会员数(万人)',
        totalData: '0.00',
        width: '190px',
        isSort: true
      },
      {
        prop: 'v8',
        label: '年累计消费金额(万人)',
        totalData: '-',
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
        v8: '86.00'
      }, {
        sequence: '1',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00'
      },
      {
        sequence: '2',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '3',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '4',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '5',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '6',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '7',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
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
        v8: '86.00'
      }, {
        sequence: '1',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00'
      },
      {
        sequence: '2',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '3',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '4',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '5',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '6',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
      },
      {
        sequence: '7',
        v1: '杭州富阳',
        v2: '1.48',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '83.00'
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

  .charts-box {
    display: flex;
    width: 100%;
  }

</style>
