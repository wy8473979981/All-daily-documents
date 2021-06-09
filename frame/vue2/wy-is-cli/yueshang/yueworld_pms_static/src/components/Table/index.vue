<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-24 15:02:09
 * @LastEditors: zhb
-->
<template>
  <div class="budget-table">
    <el-table
      ref="experienceInfoTable"
      :data="tableDataTemp"
      style="width:100%"
      :header-cell-style="rowClass"
      v-bind="$attrs"
      v-on="$listeners"
      @sort-change="sortChange"
    >
      <!-- 复选框 -->
      <el-table-column
        v-if="tableColumnsConfig[0].type == 'selection'"
        type="selection"
      />
      <el-table-column
        type="index"
        label="序列"
        :index="indexMethod"
        width="50"
      />
      <el-table-column
        v-for="(th, key) in tableColumnsConfig"
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :width="th.width ||'auto'"
        :sortable="th.isSort?'custom':false"
        height="250"
      >
        <template #header>
          <div class="solt-icon">
            <span>{{ th.label }}</span>
            <span v-if="th.isSort">
              <img
                v-if="list[th.prop]=='ascending'"
                src="@/assets/imges/19.png"
                width="20"
              >
              <img
                v-else-if="list[th.prop]=='descending'"
                src="@/assets/imges/17.png"
                width="20"
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
              >
            </span>
          </div>
        </template>
        <template slot-scope="scope">
          <span :class="th.prop=='v1' ? 'td-color':''">{{ scope.row[th.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    /**
       * table  渲染所需数据
       * 如：[{id:1,name:'abc'},{id:2,name:'def'}]
       */
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    /**
       * table 的column 相关配置信息
       * allData：汇总数据
       * width:列宽
       */
    tableColumnsConfig: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      tableDataTemp: [],
      list: {}
    }
  },
  computed: {

  },
  mounted() {
    this.tableDataTemp = this.tableData
  },
  methods: {
    // table表头样式修改
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === row.length - 1) {
        return 'border-top-right-radius: 20px;border-bottom-right-radius: 20px;'
      } else if (columnIndex === 0) {
        return 'border-top-left-radius: 20px;border-bottom-left-radius: 20px;'
      }
    },
    // table第一列序号
    indexMethod(index) {
      return index + 1
    },
    // table排序变化事件
    sortChange(column, prop, order) {
      if (!column.column.sortable) return

      this.list = {}
      const _props = column.prop
      this.list[_props] = column.order

      this.changeTableSort(column)
    },
    // 固定收行汇总
    changeTableSort(column) {
      const orderGroup = []
      const fieldName = column.prop
      const sortingType = column.order
      this.tableDataTemp.map(item => {
        orderGroup.push(item)
      })
      // 降序排序
      if (sortingType === 'descending') {
        this.tableDataTemp = orderGroup.sort((a, b) => {
          let aVal = a[fieldName]
          let bVal = b[fieldName]
          // 令中心汇总所在行指标值最大
          if (a.v1 === '汇总') {
            aVal = 9999999999
          }
          if (b.v1 === '汇总') {
            bVal = 9999999999
          }
          return bVal - aVal
        })
      } else if (sortingType === 'ascending') {
        // 升序排序
        this.tableDataTemp = orderGroup.sort((a, b) => {
          let aVal = a[fieldName]
          let bVal = b[fieldName]
          if (a.v1 === '汇总') {
            aVal = -2
          }
          if (b.v1 === '汇总') {
            bVal = -2
          }
          return aVal - bVal
        })
      } else {
        this.$refs.experienceInfoTable.clearSort() // 清除排序
      }
      console.log(this.tableDataTemp)
    }
  }
}

</script>

<style lang="scss" scoped>
  .budget-table {
    .td-color {
      color: #1c4c7f;
    }

    ::v-deep .el-table td {
      background-color: #f6f5ee;
      text-align: center;
    }

    ::v-deep.el-table th {
      text-align: center;
      background: #e5e2de !important;
      padding: 0;
    }

    ::v-deep.cell {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      // overflow: visible;
      // position: relative;
    }

    .sub-table-title {
      position: absolute;
      bottom: -35px;
      text-align: center;
      position: absolute;
      bottom: -35px;
      margin: 0 auto;
      text-align: center;
      left: 0;
      right: 0;
    }

    ::v-deep.el-table tr {
      background: #f6f5ee;
    }

    ::v-deep tbody tr:first-child span {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #050101;
    }

    ::v-deep.has-gutter {
      background: #f6f5ee;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #e5e2de;
    }

    ::v-deep .el-table__header-wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    ::v-deep.el-table,
    .el-table__expanded-cell {
      background: #f6f5ee;
    }

    ::v-deep.el-table td,
    .el-table th {
      padding: 0;
    }

    ::v-deep.el-table__row td .cell {
      height: 36px !important;
      line-height: 36px;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td:nth-child(1) {
      border-radius: 20px 0 0 20px;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td:last-child {
      border-radius: 0 20px 20px 0;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: rgba(229, 226, 222, 0.4) !important;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td .cell {
      color: #48a0c3 !important;
    }

    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover .td-color {
      color: #48a0c3 !important;
    }
 ::v-deep .el-table td {
      background: #f6f5ee;
    }
    ::v-deep.el-table th {
      background: #e5e2de !important;
      padding: 0;
    }
    ::v-deep.el-table th:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    ::v-deep.cell {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c4c7f;
      }
      img {
        vertical-align: middle;
      }
    }
    ::v-deep.el-table tr {
      background: #f6f5ee;
    }
    ::v-deep.has-gutter {
      background: #f6f5ee;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:nth-last-child(1) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #e5e2de;
      //  color: #48A0C3  !important ;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td
      > .cell
      > p {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-transition .el-table__body td {
      transition: background-color -1s ease;
    }
    ::v-deep .el-table__header-wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    ::v-deep.el-table,
    .el-table__expanded-cell {
      background: #f6f5ee;
    }
    ::v-deep.el-table td,
    .el-table th {
      padding: 0;
    }
    ::v-deep.el-table__row td .cell {
      height: 36px !important;
      line-height: 36px;
    }
    .solt-icon {
      i {
        margin-left: 8px;
      }
    }
    .solt-icon {
      img{
        vertical-align: middle;
      }
      i {
        margin-left: 4px;
      }
    }
  }

</style>
