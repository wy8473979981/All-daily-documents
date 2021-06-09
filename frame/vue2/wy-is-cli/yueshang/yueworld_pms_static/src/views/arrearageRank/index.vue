<template>
  <div class="data-list">
    <!-- <ysn-table
      :data="tableData1"
      :column="tableConfig"
      :checkbox="true"
      show-expand
      :show-slots="['obSub','item_no_name']"
      select-key="id"
    >
      <template #item_no_name="scope">
        <div>
          {{ scope.row }}
          123123213数量
        </div>
      </template>
    </ysn-table> -->
    <Header :title-list="titleList" :search-click="searchClick" :reset-click="resetClick" />
    <LineChart :type="4" />
    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
  </div>
</template>

<script>
import Header from './components/header'
import LineChart from './components/line-chart'
import Table from './components/table'
import Pagination from './components/pagination'
export default {
  name: 'ArrearageRank',
  components: {
    LineChart,
    Table,
    Pagination,
    Header
  },
  data() {
    return {
      titleList: [{
        title: '欠费合计(万元)',
        data: '457.19(其中租金:336.7 / 物管费:120.49)'
      }],
      tableData1: [{ item_no: 1, id: 1, ob_surplus_price: 1 }, { item_no: 1, id: 2, ob_surplus_price: 2 }], // 表格内容数据,
      tableConfig: [ // 表格column
        { item_no: '商品编号', minWidth: '200px', labelCLass: 'whiteRight', sortable: true },
        { obSub: '商品编号2', minWidth: '200px', labelCLass: 'whiteRight', sortable: true },
        { item_no_name: '商品名称', minWidth: '200px', labelCLass: 'borderRight' },
        { ob: 'OB', labelCLass: 'borderBottom', tableList: [
          { ob_surplus_price: '剩余预约金额', minWidth: '200px', align: 'right', sortable: true },
          { ob_trans_quantity: '转订购数量', minWidth: '200px' },
          { ob_trans_price: '转订购金额', minWidth: '200px' },
          { ob_cancel_quantity: '取消数量', minWidth: '200px' },
          { ob_cancel_price: '取消金额', minWidth: '200px' },
          { ob_total_quantity: '小计数量', minWidth: '200px' },
          { ob_total_price: '小计金额', minWidth: '200px' }
        ] },
        { trans: '直接转订购', labelClass: 'borderLeft', tableList: [
          { surplus_quantity: '剩余预约数量', minWidth: '200px' },
          { surplus_price: '剩余预约金额', minWidth: '200px' },
          { trans_quantity: '转订购数量', minWidth: '200px' },
          { trans_price: '转订购金额', minWidth: '200px' },
          { cancel_quantity: '取消数量', minWidth: '200px' },
          { cancel_price: '取消金额', minWidth: '200px' },
          { total_quantity: '小计数量', minWidth: '200px' },
          { total_price: '小计金额', minWidth: '200px' }
        ] },
        { total: '小计', tableList: [
          { total_surplus_quantity: '剩余预约数量', minWidth: '200px' },
          { total_surplus_price: '剩余预约金额', minWidth: '200px' },
          { total_trans_quantity: '转订购数量', minWidth: '200px' },
          { total_trans_price: '转订购金额', minWidth: '200px' },
          { total_cancel_quantity: '取消数量', minWidth: '200px' },
          { total_cancel_price: '取消金额', minWidth: '200px' }
        ] },
        { all_item_quantity: '数量合计', minWidth: '200px' },
        { all_order_sale_price: '金额合计', minWidth: '200px' }
      ],
      tableColumnsConfig: [
        {
          prop: 'v1',
          label: '项目',
          totalData: '汇总',
          width: '',
          isSort: false
        },
        {
          prop: 'v2',
          label: '历史欠费(权责)',
          totalData: '1.48',
          width: '',
          isSort: true
        },
        {
          prop: 'v3',
          label: '历史欠费(合同)',
          totalData: '47.68',
          isSort: true
        },
        {
          prop: 'v4',
          label: '年累计欠费(权责)',
          totalData: '216.20',
          width: '160px',
          isSort: true
        },
        {
          prop: 'v5',
          label: '年累计欠费(合同)',
          totalData: '86.00',
          width: '160px',
          isSort: true
        },
        {
          prop: 'v6',
          label: '清欠率(权责)',
          totalData: '216.20',
          width: '',
          isSort: true
        }
      ],
      tableData: [{
        sequence: '',
        v1: '汇总',
        v2: '1,157.31',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00'
      }, {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '410.09',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '570.56',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '105.05',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '46.27',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '5',
        v1: '珠海宝龙广场',
        v2: '23.26',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '6',
        v1: '青岛宝龙广场',
        v2: '2.08',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      }
      ]
    }
  },
  methods: {
    resetClick() {
      this.tableData = [{
        sequence: '',
        v1: '汇总',
        v2: '1,157.31',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '86.00'
      }, {
        sequence: '1',
        v1: '上海青浦宝龙广场',
        v2: '410.09',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '210.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '2',
        v1: '上海七宝宝龙广场',
        v2: '570.56',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '3',
        v1: '上海宝山宝杨',
        v2: '105.05',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '4',
        v1: '成都宝龙广场',
        v2: '46.27',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '5',
        v1: '珠海宝龙广场',
        v2: '23.26',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
      },
      {
        sequence: '6',
        v1: '青岛宝龙广场',
        v2: '2.08',
        v3: '47.68',
        v4: '216.20',
        v5: '86.00',
        v6: '216.20',
        v7: '0.00',
        v8: '-'
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
    padding: 0 24px;
  }

</style>
