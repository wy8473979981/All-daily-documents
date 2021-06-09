<template>
  <div class="bond">
    <div class="table">
      <div class="tablelist">
        <el-table
          :data="tableDatas"
          style="width: 100%; font-size: 10px"
          :header-cell-style="rowClass"
          @sort-change="sort_change"
        >
          <el-table-column
            type="index"
            label="序号"
            :index="indexMethod"
            width="80"
            align="center"
          />
          <el-table-column prop="name" label="合同编号" sortable>
            <template slot="header">
              <span>合同编号</span>
              <img
                v-if="lists.name == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name2" label="品牌" sortable>
            <template slot="header">
              <span>品牌</span>
              <img
                v-if="lists.name2 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name2 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column prop="name3" label="租户" sortable>
            <template slot="header">
              <span>租户</span>
              <img
                v-if="lists.name3 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name3 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="name4" label="铺位" width="200" sortable>
            <template slot="header">
              <span>铺位</span>
              <img
                v-if="lists.name4 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name4 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name5" label="费项" sortable>
            <template slot="header">
              <span>费项</span>
              <img
                v-if="lists.name5 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name5 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name6" label="结算金额" sortable>
            <template slot="header">
              <span>结算金额</span>
              <img
                v-if="lists.name6 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name6 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
          <el-table-column prop="name7" label="原因" sortable>
            <template slot="header">
              <span>原因</span>
              <img
                v-if="lists.name7 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name7 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              > </template></el-table-column>
          <el-table-column prop="name8" label="核销日期" sortable>
            <template slot="header">
              <span>核销日期</span>
              <img
                v-if="lists.name8 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name8 == 'descending'"
                src="@/assets/imges/19.png"
                width="20"
                alt=""
              >
              <img
                v-else
                src="@/assets/imges/16pt／排序@2x.png"
                width="20"
                alt=""
              ></template></el-table-column>
        </el-table>
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      lists: {},
      tableDatas: [
        {
          name: 'M2021025455',
          name1: '上海良品铺子食品公司',
          name2: '良品铺子',
          name3: '#5-1502',
          name4: '204-29A#01a,204-29A#01b',
          name5: '50,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '三只松鼠',
          name2: '三只松鼠',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '深圳食品公司',
          name2: '深圳食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '北京食品公司',
          name2: '北京食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '南京食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '新疆食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '安徽食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '天津食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '204-29A#01a,204-29A#01b',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '2020-5-12',
          name9: '-',
          name10: 'M2021025455'
        }
      ]
    }
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 8) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    seach() {
      this.show = !this.show
    },
    sort() {
      this.tableDatas = this.tableDatas.reverse()
    },
    sort_change(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
      console.log(this.lists)
      console.log(column, '---', prop, order)
    },
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.serch {
  display: flex;
  align-items: center;
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
.table {
  margin-top: 12px;
}
.tablelist {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
  line-height: 14px;
  ::v-deep .el-table td {
    background: #f6f5ee;
  }
  ::v-deep.caret-wrapper {
    display: none !important;
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
}
.paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .paging-data {
    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
    }
  }
  .paging-option {
    display: flex;
    ::v-deep .el-input__inner {
      padding: 0;
      height: 24px;
      width: 80px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      background: #f6f5ee;
      border: none;
      padding-top: 4px;
    }
    ::v-deep.el-input__icon {
      line-height: 24px;
    }
    ::v-deep.el-pager li {
      height: 24px;
      line-height: 24px;
    }
    ::v-deep.el-pagination button,
    .el-pagination span:not([class*="suffix"]) {
      height: 24px;
      line-height: 24px;
    }
  }
  ::v-deep.el-pagination button {
    background: #f6f5ee;
  }
  ::v-deep.number {
    background: #f6f5ee !important ;
  }
}
</style>
