<!--
 * @Descripttion: 预算调整列表页面
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zhb
-->
<template>
  <div class="budget-adjustment-list">
    <div class="search-box">
      <el-select slot="prepend" v-model="select" placeholder="请选择项目">
        <el-option v-for="(item, i) in list" :key="i" :value="item.name">
          {{ item.name }}
        </el-option>
      </el-select>
      <el-date-picker v-model="years" type="year" placeholder="选择年" :clearable="false" />
      <div class="btn-groups">
        <el-button round>提交审批</el-button>
      </div>
    </div>
    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
  </div>
</template>

<script>
import Table from '../budgetModule/components/table'
import Pagination from '../budgetModule/components/pagination'
export default {
  name: 'BudgetAdjustmentDetail',
  components: {
    Table,
    Pagination
  },
  data() {
    return {
      select: '',
      years: '',
      tableData: [{
        c: '',
        id: '1',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      }, {
        c: '',
        id: '2',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      },
      {
        c: '',
        id: '3',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      },
      {
        c: '',
        id: '4',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      },
      {
        c: '',
        id: '5',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      },
      {
        c: '',
        id: '6',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      },
      {
        c: '',
        id: '7',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      }, {
        c: '',
        id: '8',
        v1: '工程部',
        v2: '工程费维保费',
        v3: '编制中',
        v4: '张三',
        v5: '2021-10-12 12:34',
        v6: '详情'
      }
      ],
      tableColumnsConfig: [{
        prop: 'id',
        label: '序列',
        width: '60px',
        isSort: false,
        type: 'selection'
      },
      {
        prop: 'v1',
        label: '主责部门',
        width: '',
        isSort: true
      },
      {
        prop: 'v2',
        label: '费用支出表',
        width: '',
        isSort: true
      },
      {
        prop: 'v3',
        label: '状态',
        isSort: true
      },
      {
        prop: 'v4',
        label: '最后编辑人',
        width: '',
        isSort: true
      },
      {
        prop: 'v5',
        label: '最后编辑时间',
        width: '',
        isSort: true
      },
      {
        prop: 'v6',
        label: '操作',
        width: '',
        isSort: true,
        color: 'color:#1C4C7F'
      }
      ],
      list: [{
        name: '上海区域'
      },
      {
        name: '七宝'
      },
      {
        name: '奉贤'
      },
      {
        name: '宝山'
      },
      {
        name: '杭州区域'
      },
      {
        name: '萧山'
      },

      {
        name: '上海城市公司'
      },
      {
        name: '华新'
      },
      {
        name: '青浦'
      },
      {
        name: '吴泾'
      },
      {
        name: '杭州城市公司'
      },
      {
        name: '萧山'
      }
      ],
      optionss: [{
        name: '2022-12-12 16:00'
      }],
      options: [{
        name: '2022-12-12 16:00'
      }],
      optionsss: [{
        name: '2022'
      }],
      optionssss: [{
        name: '2021-11-30 23:59:59'
      }],
      optionlist: [{
        num: '第一页'
      },
      {
        num: '第二页'
      },
      {
        num: '第三页'
      },
      {
        num: '第四页'
      },
      {
        num: '第五页'
      },
      {
        num: '第六页'
      },
      {
        num: '第七页'
      }
      ],
      value: ''
    }
  },
  watch: {
    radio(val, value) {
      if (val === 2) {
        this.timeshow = false
      }
      if (val === 1) {
        this.timeshow = true
      }
    }
  },
  created() {},
  methods: {

    sort_change(column) {
      this.currentPage = 1 // return to the first page after sorting
      if (column.prop === 'sequence') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      if (column.prop === 'name') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      if (column.prop === 'address') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      if (column.prop === 'status') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      if (column.prop === 'establishment') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      if (column.prop === 'number') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
      }
      this.showed_data = this.tableData.slice(0, this.pageSize) // 排序完显示到第一
    },
    sortFun: function(attr, rev) {
      console.log(rev)
      // 第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      return function(a, b) {
        console.log(a, b)
        a = a[attr]
        b = b[attr]
        if (a < b) {
          return rev * -1
        }
        if (a > b) {
          return rev * 1
        }
        return 0
      }
    },
    timing() {
      this.timings = true
    }
  }
}

</script>
<style lang='scss' scoped>
  .budget-adjustment-list {

    ::v-deep.search-box {
      width: 100%;
      margin-bottom: 12px;

      .el-select {
        margin-right: 10px;
      }

      .el-input__inner {
        width: 150px;
        height: 32px;
        background: #FDFCFA;
        border-radius: 16px;
        border: none;

        &::placeholder {
          font-size: $font-base-size;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
      }

      .el-input--medium .el-input__icon {
        line-height: 30px;
      }

      .el-icon-arrow-up:before {
        content: "\e78f";
      }
    }

    ::v-deep.btn-groups {
      float: right;

      .el-button {
        background: #1C4C7F;
        border: none;
        color: #ffffff;
        font-size: 14px;
      }
    }
  }

</style>
