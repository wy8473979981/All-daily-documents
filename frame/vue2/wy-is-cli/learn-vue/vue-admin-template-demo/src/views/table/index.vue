<template>
  <div class="app-container">
    <ys-n-table 
      :config="tableConfig" 
      v-model="currentTableData" 
      mouseMove 
      :totals="totals" 
      :hasPagination="true"
      :initialize="initialize" 
      @sort-change="sortChange" 
      @table-page-change="tablePageChange" 
      :max-height="pageHeight"
    ></ys-n-table>
  </div>
</template>

<script>
import { getSvg } from '@/api/table'
import { TableConfig } from './config';
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      tableConfig: TableConfig.call(this),
      currentTableData: [{
        name:'11'
      },{
        name:'22'
      }],
      totals: 0, // 总页数
      initialize: 1, // 更新table
      pageHeight: 1000, // table 默认高度
      list: null,
      listLoading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleLinkClick (data) {
      if (data.row.id && data.row.id !== '合计') {
        let formData = {
          projectId: data.row.id,
          chargeType: this.currentFormData.chargeType,
          yearMonth: this.currentFormData.yearMonth,
        };

        setSession.call(this, 'or-ranking-project', formData);
      }
    },
    // 排序发生改变时, 自定义排序
    sortChange({ prop, order }) {
      let tableData = cloneDeep(this.currentTableData);
      if (order) {
        tableData.sort((pre, cur) => {
          if (order === 'ascending') {
            return pre[prop] > cur[prop] ? 1 : '-1';
          } else {
            return cur[prop] > pre[prop] ? 1 : '-1';
          }
        });
        this.currentTableData = this.sortTable(tableData);
      } else {
        this.currentTableData = this.originTableData;
      }
      return order;
    },
    // 分页切换
    tablePageChange(val) {
      console.log(val)
      // this.currentFormData.currentPage = val

      // this.fecthData();
    },
  }
}
</script>
