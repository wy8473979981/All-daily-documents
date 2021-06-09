<template>
  <div class="bond">
    <!-- 头部 -->
    <div class="top">
      <div class="serch">
        <el-input
          v-model="serchTxt"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
        />
        <el-select v-model="selectVal" placeholder="请选择" class="select">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.val"
            :value="item.id"
          />
        </el-select>
        <button @click="chanxun">查询</button>
        <div class="search">
          <p
            class="btn-btn"
            @click="seach"
          >高级搜索
            <i
              :class="shape ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
            /></p>

        </div>
        <el-button @click="chongzhi">重置</el-button>
      </div>
      <div class="serch-right">
        <p>下载模板</p>
        <button class="btn" @click="clickImport(1)">导入保证金</button>
        <button class="btns">导出</button>
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
      <i class="el-icon-edit" @click="clickImport(2)" />

      <div class="tablelist">
        <el-table
          :data="tableDatas"
          style="width: 100%; font-size: 10px"
          :header-cell-style="rowClass"
          @sort-change="sort_change"
        >
          <el-table-column type="selection" align="center" />

          <el-table-column prop="name" label="合同编号" width="100" sortable>
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
              ></template></el-table-column>
          <el-table-column prop="name1" label="商家" width="200" sortable>
            <template slot="header">
              <span>商家</span>
              <img
                v-if="lists.name1 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name1 == 'descending'"
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
          <el-table-column prop="name3" label="铺位号" width="100" sortable>
            <template slot="header">
              <span>铺位号</span>
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
              > </template></el-table-column>
          <el-table-column prop="name4" label="费项" width="100" sortable>
            <template slot="header">
              <span>费项</span>
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
              ></template></el-table-column>
          <el-table-column prop="name5" label="总额" width="100" sortable>
            <template slot="header">
              <span>总额</span>
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
          <el-table-column prop="name6" label="罚没金" width="100" sortable>
            <template slot="header">
              <span>罚没金</span>
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
          <el-table-column prop="name7" label="退款金" width="100" sortable>
            <template slot="header">
              <span>退款金</span>
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
          <el-table-column prop="name8" label="已冲抵" width="100" sortable>
            <template slot="header">
              <span>已冲抵</span>
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
              > </template></el-table-column>
          <el-table-column prop="name9" label="保证金额" width="100" sortable>
            <template slot="header">
              <span>保证金额</span>
              <img
                v-if="lists.name9 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name9 == 'descending'"
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
          <el-table-column prop="name10" label="来源单号" sortable width="120">
            <template slot="header">
              <span>来源单号</span>
              <img
                v-if="lists.name10 == 'ascending'"
                src="@/assets/imges/17.png"
                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name10 == 'descending'"
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
      <Pagination />
      <div />
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="700px"
      class="dialog"
      :before-close="handleClose"
    >
      <div v-if="menuShow" class="word">
        <div class="box">
          <i class="el-icon-circle-plus" />
          <span>上传数据</span>
        </div>
        <p>可上传小与20M的文件</p>
      </div>
      <div v-if="!menuShow" class="menu">
        <div class="left">
          <div class="left-top">
            <p>勾选需要显示的字段</p>
            <div>
              <span class="span1">全选</span>
              <span class="span2">清除</span>
            </div>
          </div>
          <ul>
            <li>
              <el-checkbox v-model="checked">合同编号</el-checkbox><el-checkbox v-model="checked">商家</el-checkbox><el-checkbox v-model="checked">品牌</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">铺位号</el-checkbox><el-checkbox v-model="checked">费项</el-checkbox><el-checkbox v-model="checked">总额</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">罚没金</el-checkbox><el-checkbox v-model="checked">退款金</el-checkbox><el-checkbox v-model="checked">已冲抵</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="checked">可冲抵</el-checkbox><el-checkbox v-model="checked">保证金余额</el-checkbox><el-checkbox v-model="checked">来源单号</el-checkbox>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="right-top">
            <p>拖拽字段调整顺序</p>
          </div>
          <ul>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>品牌</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>总额</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>罚没金</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>退款金</span>
              </div>
              <i class="el-icon-error" />
            </li>
            <li>
              <div class="i">
                <img src="../../assets/imges/drag.png" alt="">
                <span>保证金余额</span>
              </div>
              <i class="el-icon-error" />
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btns" @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          class="btns1"
          @click="dialogVisible = false"
        >提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      shape: false,
      checked: false, // 多选
      lists: {},
      advancedsearch: '',
      title: '自定义显示字段',
      dialogVisible: false,
      menuShow: false, // 弹框是两用的
      value: '1',
      show: false, // 高级筛选
      serchTxt: '', // 搜索
      selectVal: '', // 下啦筛选
      allSelectVal: '', // 所有费用
      num: '', // 铺位号
      nums: [], // 铺位号
      brand: '', // 品牌
      business: '', // 商家
      yt: '', // 业态

      options: [
        {
          id: 1,
          val: '所有项目'
        },
        {
          id: 2,
          val: 'AMP'
        },
        {
          id: 3,
          val: 'PMS'
        }
      ],
      tableDatas: [
        {
          name: 'M2021025455',
          name1: '上海良品铺子食品公司',
          name2: '良品铺子',
          name3: '#5-1502',
          name4: '租赁保证金',
          name5: '50,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '三只松鼠',
          name2: '三只松鼠',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '深圳食品公司',
          name2: '深圳食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '北京食品公司',
          name2: '北京食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '南京食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '新疆食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '安徽食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        },
        {
          name: 'M52555222225',
          name1: '天津食品公司',
          name2: '食品公司',
          name3: '#6-1002',
          name4: '租赁保证金',
          name5: '80,000',
          name6: '20,000',
          name7: '-',
          name8: '0.00',
          name9: '-',
          name10: 'M2021025455'
        }
      ]
    }
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 11) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    chanxun() {
      if (this.tableDatas.length > 3) {
        this.tableDatas.forEach((item) => {
          this.nums.push(item)
        })
      }
      this.tableDatas.splice(3)
    },
    chongzhi() {
      if (this.nums.length > 0) {
        this.tableDatas = this.nums
        this.serchTxt = ''
      }
    },
    sort() {
      this.tableDatas = this.tableDatas.reverse()
    },
    seach() {
      this.show = !this.show
      this.advancedsearch = 'advancedsearch'
      this.advancedsearch = 'advancedsearch'
      this.shape = !this.shape
    },
    handleClose(done) {
      done()
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
    },
    clickImport(val) {
      this.dialogVisible = true
      if (val === 1) {
        this.menuShow = true
        this.title = '导入保证金'
      }
      if (val === 2) {
        this.menuShow = false
        this.title = '自定义显示字段'
      }
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
.search {
  .btn-btn {
    width: 100px;
    height: 32px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    line-height: 32px;
  }
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
  position: relative;

  i {
    position: absolute;
    right: 3px;
    top: 4px;
    z-index: 200;
    width: 24px;
    height: 24px;
    background: #fdfcfa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  ::v-deep.caret-wrapper {
    display: none !important;
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

//弹框
.dialog {
  ::v-deep.el-dialog {
    border-radius: 20px;
  }
  ::v-deep.el-dialog__header {
    padding: 24px 0px 8px 0px;
    margin: 0 24px;
    border-bottom: 1px solid #e5e2de;
  }
  ::v-deep.el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  ::v-deep.el-button {
    width: 86px;
    height: 32px;
    background: #e5e2de;
    border-radius: 16px;
    line-height: 1;
    border: none;
  }
  .word {
    margin: 75px 0;
  }
  .btns {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
  }
  .btns1 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    background: #1c4c7f;
  }
  .box {
    width: 400px;
    height: 98px;
    background: #eaeaea;
    border: 1px dashed #979797;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      color: #848382;
      margin-right: 13px;
    }
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
    }
  }
  p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #979797;
    margin-top: 12px;
  }
  .menu {
    display: flex;
    width: 100%;
    padding: 0 32px;
    .left {
      width: 460px;
      height: 267px;
      border-right: 1px solid #e5e2de;
      padding-top: 21px;
      .left-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
        margin-bottom: 29px;
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
          padding: 0;
          margin: 0;
        }
        .span1 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin-right: 16px;
        }
      }
      ul {
        li {
          margin-bottom: 23px;
          ::v-deep.el-checkbox__input.is-checked + .el-checkbox__label {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #050101;
          }
          ::v-deep.el-checkbox {
            width: 100px;
          }
        }
      }
    }
    .right {
      flex: 1;

      height: 267px;
      padding: 21px 16px;
      .right-top {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #848382;
        p {
          padding: 0;
          margin: 0;
        }
      }
      ul {
        padding-top: 16px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 6px;
          margin-bottom: 8px;
          .i {
            display: flex;
            align-items: center;
          }
          i {
            color: #e5e2de;
            font-size: 14px;
          }
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #050101;
            margin-left: 11px;
          }
        }
        li:hover {
          background: #efedea;
          cursor: move;
        }
      }
    }
  }
}
</style>
