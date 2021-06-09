<!--
 * @Descripttion: 科目配置列表页面
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zhb
-->
<template>
  <div class="subject-config-box">
    <div class="top">
      <div class="serch">
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
        <el-input v-model="serchTxt" placeholder="请输入内容" prefix-icon="el-icon-search" />
        <button @click="searchClick">查询</button>
        <p>高级搜索 <i :class=" false ? 'el-icon-caret-top':'el-icon-caret-bottom'" /></p>
        <span @click="resetClick">重置</span>
      </div>
      <div class="serch-right">
        <button class="btns">导入</button>
        <button class="btns">新增</button>
      </div>
    </div>
    <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" />
    <Pagination />
  </div>
</template>

<script>
const cityOptions = ['MALL', '商业街', '写字楼', '住宅']
const tableDatas = [{
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}, {
  c: '',
  id: '1',
  v1: '企业费明细',
  v2: '1000',
  v3: '费用支出表',
  v4: 'MALL;商业街;住宅;写字楼'
}]
import Table from '../budgetModule/components/table'
import Pagination from '../budgetModule/components/pagination'
export default {
  name: 'SubjectConfig',
  components: {
    Table,
    Pagination
  },
  data() {
    return {
      serchTxt: '', // 搜索
      checkedCities: [],
      cities: cityOptions,
      select: '',
      years: '',
      tableData: tableDatas,
      tableColumnsConfig: [{
        prop: 'id',
        label: '序列',
        width: '80px',
        isSort: false,
        type: ''
      },
      {
        prop: 'v1',
        label: '费用项名称',
        width: '',
        isSort: true
      },
      {
        prop: 'v2',
        label: '排序号',
        width: '',
        isSort: true
      },
      {
        prop: 'v3',
        label: '上级',
        isSort: true
      },
      {
        prop: 'v4',
        label: '适用业态',
        width: '',
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
      if (val == 2) {
        this.timeshow = false
      }
      if (val == 1) {
        this.timeshow = true
      }
    }
  },
  created() {},
  methods: {
    searchClick() {
      this.tableData = this.tableData.splice(3)
    },
    resetClick() {
      this.tableData = tableDatas
    },
    search() {
      if (this.tableData.length > 3) {
        this.tableData.forEach((item) => {
          // this.numlist.push(item);
        })
      }
      this.tableData.splice(5)
    },
    reset() {
      // this.tableDatas = this.numlist;
      this.serchTxt = ''
    },
    sort_change(column) {
      this.currentPage = 1 // return to the first page after sorting
      if (column.prop === 'sequence') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
        console.log(this.tableData)
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
        console.log(this.tableData)
      }
      if (column.prop === 'status') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
        console.log(this.tableData)
      }
      if (column.prop === 'establishment') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
        console.log(this.tableData)
      }
      if (column.prop === 'number') {
        return (this.tableData = this.tableData.sort(
          this.sortFun(column.prop, column.order === 'ascending')
        ))
        console.log(this.tableData)
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
  .subject-config-box {
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .serch {
      display: flex;
      align-items: center;

      ::v-deep.el-checkbox {
        margin-right: 14px;
      }

      ::v-deep.el-input {
        width: 220px;
        margin-right: 12px;
      }

      ::v-deep.el-input--medium .el-input__inner {
        width: 220px;
        font-size: 14px;
        font-family: Helvetica;
        color: #848382;
        background: #fdfcfa;
        border-radius: 18px;
        // #050101
      }

      ::v-deep.el-input--medium .el-input__icon {
        color: #050101;
      }

      button {
        height: 32px;
        width: 80px;
        background: #1c4c7f;
        border-radius: 16px;
        border: none;
        font-size: 14px;
        font-family: Helvetica;
        color: #ffffff;
        line-height: 1;
        margin-right: 24px;
      }

      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c4c7f;
      }

      span {
        margin-left: 24px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
      }

      .select {
        ::v-deep.el-input {
          width: 150px;
          margin-right: 24px;
        }

        ::v-deep.el-input--medium .el-input__inner {
          width: 150px;
          font-size: 14px;
          font-family: Helvetica;
          color: #848382;
          background: #fdfcfa;
          border-radius: 18px;
          // #050101
        }
      }
    }

    //头部右侧
    .serch-right {
      display: flex;
      align-items: center;

      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
        margin-right: 16px;
      }

      .btn {
        background: #e5e2de;
        border-radius: 16px;
        width: 103px;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #848382;
        border: none;
        margin-right: 8px;
      }

      .btns {
        width: 91px;
        height: 32px;
        background: #1c4c7f;
        border-radius: 16px;
        font-size: 14px;
        font-family: Helvetica;
        color: #ffffff;
        border: none;
        margin-left: 12px;
      }
    }

    .top-body {
      margin-top: 12px;
      display: flex;
      align-items: center;

      .select {
        ::v-deep.el-input--medium .el-input__inner {
          width: 150px;
          font-size: 14px;
          font-family: Helvetica;
          color: #848382;
          background: #fdfcfa;
          border-radius: 18px;

          // #050101
        }

        ::v-deep.el-select {
          margin-right: 12px;
        }
      }

      .selects {
        width: 220px;
        margin-left: 12px;
        margin-right: 12px;

        ::v-deep.el-input__inner {
          width: 220px;
          font-size: 14px;
          font-family: Helvetica;
          color: #848382;
          background: #fdfcfa;
          border-radius: 18px;
          // #050101
        }
      }
    }
  }

</style>
