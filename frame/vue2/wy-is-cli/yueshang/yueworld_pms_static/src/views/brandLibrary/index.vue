<template>
  <div>
    <div v-if="isShow" class="app-page-main">
      <div v-if="isShow" class="budget-total">
        <div class="income">
          <div class="incomes">
            <div class="incomes-int">
              <el-input
                v-model="searchContent"
                placeholder="请输入"
                size="medium"
                style="width: 200px; float: right; margin-bottom: 10px"
              />
            </div>
            <div class="btn">
              <el-button class="btn-btn" @click="search">搜索</el-button>
            </div>
            <div class="search">
              <el-button
                class="btn-btn"
                @click="advancedSearch"
              >高级搜索
                <i
                  :class="shape ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
                /></el-button>
              <el-button class="btn-btn" @click="reset">重置</el-button>
            </div>
          </div>
          <div class="import">
            <p>导入模板下载</p>
            <el-button class="brand">品牌导入</el-button>
            <el-button class="newlyaddedbrand">新增品牌</el-button>
          </div>
        </div>
      </div>
      <div v-if="show" :class="advancedsearch">
        <div style="margin-bottom: 12px">
          <el-select slot="prepend" v-model="select1" placeholder="请选择">
            <el-option v-for="(item, i) in list1" :key="i" :value="item.name">
              {{ item.name }}
            </el-option>
          </el-select>
          <el-select slot="prepend" v-model="select2" placeholder="请选择">
            <el-option v-for="(item, i) in list2" :key="i" :value="item.name">
              {{ item.name }}
            </el-option>
          </el-select>
          <el-select slot="prepend" v-model="select3" placeholder="请选择">
            <el-option v-for="(item, i) in list3" :key="i" :value="item.name">
              {{ item.name }}
            </el-option>
          </el-select>
          <el-select slot="prepend" v-model="select4" placeholder="请选择">
            <el-option v-for="(item, i) in list4" :key="i" :value="item.name">
              {{ item.name }}
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-if="isShow" class="budget-table">
        <el-table
          :data="tableData"
          style="width: 100%; font-size: 10px"
          :header-cell-style="rowClass"
          @row-click="rowClick"
          @sort-change="sort_change"
        >
          <el-table-column
            label="序列"
            width="60px"
            type="index"
            :index="indexMethod"
            sortable
          />
          <el-table-column
            prop="name"
            label="品牌名"
            sortable
          >
            <template slot="header">
              <span>品牌名</span>
              <img
                v-if="lists.name=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.name=='descending'"
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
          <el-table-column prop="address" label="品牌编码" sortable>
            <template slot="header">
              <span>品牌编码</span>
              <img
                v-if="lists.address=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address=='descending'"
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
          <el-table-column prop="address1" label="品牌别名" sortable>
            <template slot="header">
              <span>品牌别名</span>
              <img
                v-if="lists.address1=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address1=='descending'"
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
          <el-table-column prop="address2" label="品牌等级" sortable>
            <template slot="header">
              <span>品牌等级</span>
              <img
                v-if="lists.address2=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address2=='descending'"
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
          <el-table-column prop="address3" label="经营性质" sortable>
            <template slot="header">
              <span>经营性质</span>
              <img
                v-if="lists.address3=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address3=='descending'"
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
          <el-table-column prop="address4" label="业态" sortable>
            <template slot="header">
              <span>业态</span>
              <img
                v-if="lists.address4=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address4=='descending'"
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
          <el-table-column prop="address5" label="单客价(元)" sortable>
            <template slot="header">
              <span>单客价(元)</span>
              <img
                v-if="lists.address5=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address5=='descending'"
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
          <el-table-column prop="address6" label="审批状态" sortable>
            <template slot="header">
              <span>审批状态</span>
              <img
                v-if="lists.address6=='ascending'"
                src="@/assets/imges/17.png"

                width="20"
                alt=""
              >
              <img
                v-else-if="lists.address6=='descending'"
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
      <div v-if="isShow">
        <Pagination />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '../../components/Pagination'
export default {
  name: 'BrandLibrary',
  components: { Pagination },
  data() {
    return {
      isShow: true,
      searchContent: '',
      select1: '',
      shape: false,
      select2: '',
      select3: '',
      lists: {},
      select4: '',
      num: [],
      show: false,
      advancedsearch: '',
      tableData: [
        {
          sequence: '1',
          name: '思睿',
          address: 'XXXXXXXX',
          address1: 'Theory',
          address2: 'A',
          address3: '直营',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address5: '600.00',
          address6: '已审核'
        },
        {
          address4: '餐饮美食/餐饮美食/中式正餐',
          sequence: '2',
          name: '思睿',
          address5: '600.00',
          address: 'XXXXXXXX',
          address6: '已审核',
          address1: 'Theory',
          address2: 'A',
          address3: '直营'
        },
        {
          sequence: '3',
          address4: '餐饮美食/餐饮美食/中式正餐',
          name: '思睿',
          address6: '已审核',
          address: 'XXXXXXXX',
          address3: '直营',
          address1: 'Theory',
          address5: '600.00',
          address2: 'A'
        },
        {
          sequence: '4',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address3: '直营',
          address6: '已审核',
          address1: 'Theory',
          address5: '600.00',
          name: '思睿',
          address2: 'A',
          address: 'XXXXXXXX'
        },
        {
          sequence: '5',
          address5: '600.00',
          address3: '直营',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address2: 'A',
          address6: '已审核',
          name: '思睿',
          address: 'XXXXXXXX',
          address1: 'Theory'
        },
        {
          address6: '已审核',
          sequence: '6',
          address5: '600.00',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address3: '直营',
          name: '思睿',
          address: 'XXXXXXXX',
          address2: 'A',
          address1: 'Theory'
        },
        {
          address2: 'A',
          address5: '600.00',
          address4: '餐饮美食/餐饮美食/中式正餐',
          sequence: '7',
          address6: '已审核',
          address3: '直营',
          name: '思睿',
          address: 'XXXXXXXX',
          address1: 'Theory'
        },
        {
          address6: '已审核',
          address2: 'A',
          address5: '600.00',
          address4: '餐饮美食/餐饮美食/中式正餐',
          sequence: '8',
          address3: '直营',
          name: '思睿',
          address: 'XXXXXXXX',
          address1: 'Theory'
        },
        {
          address6: '已审核',
          sequence: '9',
          address5: '600.00',
          address1: 'Theory',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address3: '直营',
          name: '思睿',
          address2: 'A',
          address: 'XXXXXXXX'
        },
        {
          address6: '已审核',
          sequence: '10',
          address5: '600.00',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address3: '直营',
          address2: 'A',
          name: '思睿',
          address1: 'Theory',
          address: 'XXXXXXXX'
        },
        {
          address6: '已审核',
          sequence: '11',
          address5: '600.00',
          address3: '直营',
          address2: 'A',
          address4: '餐饮美食/餐饮美食/中式正餐',
          name: '思睿',
          address1: 'Theory',
          address: 'XXXXXXXX'
        },
        {
          address5: '600.00',
          sequence: '12',
          address6: '已审核',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address1: 'Theory',
          address3: '直营',
          name: '思睿',
          address2: 'A',
          address: 'XXXXXXXX'
        },
        {
          address5: '600.00',
          address1: 'Theory',
          address6: '已审核',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address3: '直营',
          sequence: '13',
          address2: 'A',
          name: '思睿',
          address: 'XXXXXXXX'
        },
        {
          address5: '600.00',
          address6: '已审核',
          sequence: '14',
          address3: '直营',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address1: 'Theory',
          address2: 'A',
          name: '思睿',
          address: 'XXXXXXXX'
        },
        {
          address5: '600.00',
          address6: '已审核',
          address3: '直营',
          address4: '餐饮美食/餐饮美食/中式正餐',
          address1: 'Theory',
          address2: 'A',
          sequence: '15',
          name: '思睿',
          address: 'XXXXXXXX'
        }
      ],
      options: [
        { name: '第一页' },
        { name: '第二页' },
        { name: '第三页' },
        { name: '第四页' },
        { name: '第五页' },
        { name: '第六页' },
        { name: '第七页' }
      ],
      list: [
        {
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
          name: '......'
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
        },
        {
          name: '......'
        }
      ],
      list1: [
        {
          name: '张三'
        },
        {
          name: '李四'
        },
        {
          name: '麻子'
        }
      ],
      list2: [
        {
          name: 'A'
        },
        {
          name: 'B'
        },
        {
          name: 'C'
        }
      ],
      list3: [
        {
          name: '请选择'
        }
      ],
      list4: [
        {
          name: '北京'
        },
        {
          name: '上海'
        },
        {
          name: '南京'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {
    $router(val) {
      console.log(val)
    }
  },

  created() {},
  mounted() {
    console.log(this.$router.app._route.name)
    if (this.$router.app._route.name === 'brandlibrary-details') {
      this.isShow = false
    }
  },
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 8) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, this.activeIndex)
      this.num = key
    },
    search() {
      if (this.tableData.length > 3) {
        this.tableData.forEach((item) => {
          this.num.push(item)
        })
      }

      this.tableData.splice(3)
    },
    reset() {
      this.tableData = this.num
      this.searchContent = ''
    },
    advancedSearch() {
      this.show = !this.show
      this.advancedsearch = 'advancedsearch'
      this.advancedsearch = 'advancedsearch'
      this.shape = !this.shape
    },
    rowClick() {
      this.$router.push({
        path: '/basicdata/brandLibrarys/brandlibrary-details'
      })
    },
    sort_change(column, prop, order) {
      this.lists = {}
      const rops1 = column.prop
      this.lists[rops1] = column.order
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
.app-page-main {
  width: 1112px;
  height: 820px;
  padding: 0 24px;
  margin: 0 auto;
  background: #f6f5ee;
  ::v-deep.caret-wrapper {
    display: none !important;
  }
  ::v-deep.el-icon-arrow-up:before {
    content: "\e78f";
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .budget-total {
    margin-bottom: 12px;
    .income {
      width: 100%;
      height: 32px;
      background: #f6f5ee;
      border-radius: 16px;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .incomes {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .incomes-int {
          margin-right: 8px;
          display: flex;
          padding-top: 8px;
          align-items: center;
        }
        ::v-deep.el-input__icon {
          line-height: 32px;
        }
        ::v-deep.el-select {
          height: 32px;
          width: 220px;
          margin-right: 8px;
        }
        .btn {
          ::v-deep.el-button {
            padding: 0;
          }
          .btn-btn {
            width: 80px;
            height: 32px;
            background: #1c4c7f;
            border-radius: 16px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #ffffff;
          }
        }
        .search {
          display: flex;
          align-items: center;
          margin-left: 16px;
          ::v-deep.el-select {
            height: 32px;
            width: 100px;
            margin-right: 8px;
          }
          ::v-deep.el-input__inner {
            background: #f6f5ee;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #848382;
          }
          ::v-deep.el-button {
            background: #f6f5ee;
            height: 32px;
            border: 0;
            padding: 0;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #848382;
          }
        }
      }
      .import {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 32px;
        ::v-deep.el-button {
          padding: 0;
          color: #848382;
          border: 0;
          background: #f6f5ee;
          margin-right: 8px;
        }
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
          margin-right: 16px;
          line-height: 32px;
        }
        .brand {
          width: 86px;
          height: 32px;
          background: #e5e2de;
          border-radius: 16px;
        }
        .newlyaddedbrand {
          width: 86px;
          height: 32px;
          background: #1c4c7f;
          border-radius: 16px;
          color: #ffffff;
          font-size: 14px;
          font-family: MicrosoftYaHei;
        }
      }
    }

    .budget {
      width: 172px;
      height: 32px;
      background: #1c4c7f;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        line-height: 14px;
      }
    }
    ::v-deep.el-input__inner {
      height: 32px !important;
      border-radius: 16px;
      border: none;
    }
  }
  .advancedsearch {
    ::v-deep.el-input__inner {
      width: 150px;
      height: 32px;
      border-radius: 16px;
      border: 0;
    }
    ::v-deep.el-select {
      margin-right: 8px;
    }
    ::v-deep.el-input__icon {
      line-height: 32px;
    }
  }
  .budget-table {
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
    height: 40px;
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
      ::v-deep.el-divider--vertical {
        height: 30px;
        margin: 0 8px 0 -9px;
        background: #e7e8e9;
      }
      ::v-deep.el-input__suffix {
        display: flex;
        align-items: center;
      }
      ::v-deep.el-input__icon {
        line-height: 0;
      }
      ::v-deep.el-input--suffix {
        display: flex;
        align-items: center;
      }
      ::v-deep.el-pager li {
        min-width: 0;
        height: 24px;
        line-height: 24px;
      }
      ::v-deep.el-pager li.active {
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #1c4c7f;
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
}
</style>
