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
        <el-button disabled round>查看租金包</el-button>
        <el-button round @click.native="showPopClick()">预算调整</el-button>
      </div>
    </div>
    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
    <PopBudgetAdjustment ref="popBudgetAdjustment" />
  </div>
</template>

<script>
import Table from '../budgetModule/components/table'
import Pagination from '../budgetModule/components/pagination'
import PopBudgetAdjustment from './components/popBudgetAdjustment'
export default {
  name: 'BudgetOrganizationList',
  components: {
    Table,
    Pagination,
    PopBudgetAdjustment
  },
  data() {
    return {
      dialogVisible: false, // 预算调整弹框隐藏

      select: '',
      years: '',

      tableData: [{
        id: '1',
        v1: '思睿',
        v2: '商业-上海区域-七宝年度预算-2022（经营期）',
        v3: '收入',
        v4: '运营部',
        v5: 'v1.0.1',
        v6: '已审核',
        v7: '2021-10-18 09:32'
      }, {
        id: '2',
        v1: '思睿',
        v2: '商业-上海区域-七宝年度预算-2022（经营期）',
        v3: '收入',
        v4: '运营部',
        v5: 'v1.0.1',
        v6: '已审核',
        v7: '2021-10-18 09:32'
      }, {
        id: '3',
        v1: '思睿',
        v2: '商业-上海区域-七宝年度预算-2022（经营期）',
        v3: '收入',
        v4: '运营部',
        v5: 'v1.0.1',
        v6: '已审核',
        v7: '2021-10-18 09:32'
      }],
      tableColumnsConfig: [{
        prop: 'id',
        label: '序列',
        width: '60px',
        isSort: false
      },
      {
        prop: 'v1',
        label: '项目',
        width: '',
        isSort: true
      },
      {
        prop: 'v2',
        label: '预算方案名称',
        width: '310px',
        isSort: true
      },
      {
        prop: 'v3',
        label: '类型',
        isSort: true
      },
      {
        prop: 'v4',
        label: '部门',
        width: '',
        isSort: true
      },
      {
        prop: 'v5',
        label: '版本号',
        width: '',
        isSort: true
      },
      {
        prop: 'v6',
        label: '审批状态',
        width: '',
        isSort: true
      },
      {
        prop: 'v7',
        label: '审核时间',
        width: '200px',
        isSort: true
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
    showPopClick() {
      this.$refs.popBudgetAdjustment.dialogVisible = true
    },

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
