<template>
  <div class="bond">
    <div v-if="shows">
      <!-- 头部 -->
      <div class="top">
        <div class="serch">
          <el-input
            v-model="serchTxt"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />

          <button @click="chaxun">查询</button>
          <p @click="seach">高级搜索 <i class="el-icon-caret-bottom" /></p>
          <span @click="chongzhi">重置</span>
        </div>
        <div class="serch-right">
          <p>下载模板</p>
          <button class="btn" @click="clickImport(1)">新增收款单</button>
          <button class="btns">新增收款</button>
        </div>
      </div>
      <!-- //高级搜索 -->
      <div v-if="show" class="top-body">
        <el-select v-model="allSelectVal" placeholder="请选择" class="select">
          <el-option label="所有费项" value="1" />
        </el-select>
        <el-input v-model="num" placeholder="请填写铺位号" class="selects" />
        <el-input v-model="brand" placeholder="请填写品牌" class="selects" />
        <el-input v-model="business" placeholder="请填写商家" class="selects" />
        <el-select v-model="yt" placeholder="请选择业态" class="select">
          <el-option label="请选择业态" value="1" />
        </el-select>
      </div>
      <div class="table">
        <div class="tablelist">
          <el-table
            :data="tableDatas"
            style="width: 100%; font-size: 10px"
            :header-cell-style="rowClass"
            @sort-change="sort_change"
            @row-click="fnn"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column
              label="序号"
              type="index"
              :index="indexMethod"
              width="60"
            />
            <el-table-column prop="name" label="项目名称" width="200" sortable>
              <template slot="header">
                <span>项目名称</span>

                <img
                  v-if="list.name == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name == 'descending'"
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
            <el-table-column prop="name1" label="铺位号" width="100" sortable>
              <template slot="header">
                <span>铺位号</span>

                <img
                  v-if="list.name1 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name1 == 'descending'"
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
            <el-table-column prop="name2" label="品牌" width="100" sortable>
              <template slot="header">
                <span>品牌</span>

                <img
                  v-if="list.name2 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name2 == 'descending'"
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
            <el-table-column prop="name3" label="商家" sortable>
              <template slot="header">
                <span>商家</span>

                <img
                  v-if="list.name3 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name3 == 'descending'"
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
            <el-table-column prop="name4" label="收款方式" width="100" sortable>
              <template slot="header">
                <span>收款方式</span>

                <img
                  v-if="list.name4 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name4 == 'descending'"
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
            <el-table-column prop="name5" label="收款金额" width="100" sortable>
              <template slot="header">
                <span>收款金额</span>

                <img
                  v-if="list.name5 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name5 == 'descending'"
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
            <el-table-column prop="name6" label="核销金额" width="100" sortable>
              <template slot="header">
                <span>核销金额</span>

                <img
                  v-if="list.name6 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name6 == 'descending'"
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
            <el-table-column prop="name7" label="收款时间" width="100" sortable>
              <template slot="header">
                <span>收款时间</span>

                <img
                  v-if="list.name7 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name7 == 'descending'"
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
            <el-table-column prop="name8" label="状态" width="100" sortable>
              <template slot="header">
                <span>状态</span>

                <img
                  v-if="list.name8 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name8 == 'descending'"
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
            <el-table-column prop="name9" label="推送状态" width="100" sortable>
              <template slot="header">
                <span>推送状态</span>

                <img
                  v-if="list.name9 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name9 == 'descending'"
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
            <el-table-column prop="name10" label="创建人" width="100" sortable>
              <template slot="header">
                <span>创建人</span>

                <img
                  v-if="list.name10 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name10 == 'descending'"
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
            <el-table-column prop="name11" label="收款单号" width="100" sortable>
              <template slot="header">
                <span>收款单号</span>

                <img
                  v-if="list.name11 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name11 == 'descending'"
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
            <el-table-column prop="name12" label="备注" sortable>
              <template slot="header">
                <span>备注</span>

                <img
                  v-if="list.name12 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                >
                <img
                  v-else-if="list.name12 == 'descending'"
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
          </el-table>
        </div>
        <div>
          <Pagination />
        </div>
      </div>
    </div>

    <div>
      <Add v-if="!shows" />
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import Add from './components/add'
export default {
  components: { Pagination, Add },
  data() {
    return {
      checked: false, // 多选
      list: {},
      title: '自定义显示字段',
      dialogVisible: false,
      menuShow: false, // 弹框是两用的
      value: '1',
      num1: [],
      shows: true,
      show: false, // 高级筛选
      serchTxt: '', // 搜索
      allSelectVal: '', // 所有费用
      num: '', // 铺位号
      brand: '', // 品牌
      business: '', // 商家
      yt: '', // 业态

      tableDatas: [
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#5-1502',
          name2: '自主品牌',
          name3: '珠海',
          name4: '转账',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '张三',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#5-1502',
          name2: '自主品牌',
          name3: '珠海',
          name4: '支票',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '张三',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '深圳市合作伙伴-世纪城',
          name1: '#23-1202',
          name2: '自主品牌',
          name3: '深圳',
          name4: '转账',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '张三',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '合肥市合作伙伴-世纪城',
          name1: '#53-402',
          name2: '自主品牌',
          name3: '合肥',
          name4: '支票',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '张三',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#55-1902',
          name2: '自主品牌',
          name3: '珠海',
          name4: '转账',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '李华',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#78-1902',
          name2: '自主品牌',
          name3: '支票',
          name4: '转账',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '王三',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#99-1302',
          name2: '自主品牌',
          name3: '南京',
          name4: '支票',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '埃斯',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#98-102',
          name2: '自主品牌',
          name3: '天津',
          name4: '刷卡',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '李四',
          name11: 'SL-1425212520525',
          name12: '-'
        },
        {
          name: '珠海市合作伙伴-世纪城',
          name1: '#5-1502',
          name2: '自主品牌',
          name3: '珠海',
          name4: '转账',
          name5: '50,000',
          name6: '20,000',
          name7: '2021-04-05',
          name8: '已收款',
          name9: '未推送',
          name10: '张三',
          name11: 'SL-1425212520525',
          name12: '-'
        }
      ]
    }
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 14) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    sort() {
      this.tableDatas = this.tableDatas.reverse()
    },
    seach() {
      this.show = !this.show
    },
    handleClose(done) {
      done()
    },
    chaxun() {
      if (this.tableDatas.length > 3) {
        this.tableDatas.forEach((item) => {
          this.num1.push(item)
        })
      }
      this.tableDatas.splice(3)
    },
    chongzhi() {
      if (this.num1.length > 0) {
        this.tableDatas = this.num1
      }
      this.serchTxt = ''
    },
    fnn() {
      this.shows = !this.shows
    },
    sort_change(column, prop, order) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
      console.log(column.order)
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
::v-deep.el-table .caret-wrapper {
  display: none !important;
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
