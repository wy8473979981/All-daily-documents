<template>
  <div class="app-page-main">
    <div class="income">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          index="1"
          :class="[this.num == 1 ? 'boldsize' : '']"
        >凭证汇总</el-menu-item>
        <el-menu-item
          index="2"
          :class="[this.num == 2 ? 'boldsize' : '']"
        >凭证模板</el-menu-item>
        <el-menu-item
          index="3"
          :class="[this.num == 3 ? 'boldsize' : '']"
        >数据源/单据池</el-menu-item>
      </el-menu>
    </div>
    <div class="shop">
      <div style="display: flex">
        <div class="writeplaceholder">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
        </div>

        <el-button round @click="sousuo">搜索</el-button>
        <div class="innter innter1" @click="fn">
          <span>高级搜索</span>
        </div>

        <el-button class="btn" @click="congzhi">重置</el-button>
      </div>
      <div class="search" style="margin-right: 20px">
        <el-button round>上传凭证</el-button>
        <el-button round>删除凭证</el-button>
        <el-button round>导出凭证</el-button>
      </div>
    </div>
    <div v-if="show" class="drop-down">
      <el-select v-model="value1" placeholder="请选择物业类型" class="innter">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value2" placeholder="请选择楼层" class="innter">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value3" placeholder="请选择合同类型" class="innter">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value4" placeholder="请选择铺位类型" class="innter">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="tablelist">
      <el-table
        :data="tableData"
        style="width: 100%; font-size: 10px"
        :header-cell-style="rowClass"
        @sort-change="sort_change"
      >
        <el-table-column label="序列" type="index" :index="indexMethod" width="60" />
        <el-table-column prop="name" label="套票名称" width="100" sortable>
          <template slot="header">
            <span>套票名称</span>
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
        <el-table-column prop="province" label="分场名称" width="100" sortable>
          <template slot="header">
            <span>分场名称</span>
            <img
              v-if="list.province == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.province == 'descending'"
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
        <el-table-column prop="city" label="三方凭证号" width="110" sortable>
          <template slot="header">
            <span>三方凭证号</span>
            <img
              v-if="list.city == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.city == 'descending'"
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
        <el-table-column prop="address" label="套账编号" width="100" sortable>
          <template slot="header">
            <span>套账编号</span>
            <img
              v-if="list.address == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.address == 'descending'"
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
        <el-table-column prop="zip" label="借方金额" width="100" sortable>
          <template slot="header">
            <span>借方金额</span>
            <img
              v-if="list.zip == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip == 'descending'"
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
        <el-table-column prop="zip1" label="贷方金额" width="100" sortable>
          <template slot="header">
            <span>贷方金额</span>
            <img
              v-if="list.zip1 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip1 == 'descending'"
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
        <el-table-column prop="zip2" label="凭证日期" width="100" sortable>
          <template slot="header">
            <span>凭证日期</span>
            <img
              v-if="list.zip2 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip2 == 'descending'"
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
        <el-table-column prop="zip3" label="凭证状态" width="100" sortable>
          <template slot="header">
            <span>凭证状态</span>
            <img
              v-if="list.zip3 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip3 == 'descending'"
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
        <el-table-column prop="zip4" label="来源类型" width="100" sortable>
          <template slot="header">
            <span>来源类型</span>
            <img
              v-if="list.zip4 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip4 == 'descending'"
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
        <el-table-column prop="zip5" label="红冲凭证" width="100" sortable>
          <template slot="header">
            <span>红冲凭证</span>
            <img
              v-if="list.zip5 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip5 == 'descending'"
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
        <el-table-column prop="zip6" label="制单人" width="100" sortable>
          <template slot="header">
            <span>制单人</span>
            <img
              v-if="list.zip6 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip6 == 'descending'"
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
        <el-table-column prop="zip7" label="生成日期" width="120" sortable>
          <template slot="header">
            <span>生成日期</span>
            <img
              v-if="list.zip7 == 'ascending'"
              src="@/assets/imges/17.png"
              width="20"
              alt=""
            >
            <img
              v-else-if="list.zip7 == 'descending'"
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
</template>
<script>
import Pagination from '../../../../components/Pagination'
export default {
  name: 'ShopPreparationList',
  components: { Pagination },
  data() {
    return {
      input: '',
      list: {},
      value: '',
      value1: '',
      num1: [],
      value2: '',
      value3: '',
      show: false,
      value4: '',
      selectID: [],
      activeIndex: '1',
      boldsize: 'boldsize',
      num: 1,
      options: [
        {
          value: '选项1',
          label: '第一页'
        },
        {
          value: '选项2',
          label: '第二页',
          disabled: true
        },
        {
          value: '选项3',
          label: '第三页'
        },
        {
          value: '选项4',
          label: '第四页'
        },
        {
          value: '选项5',
          label: '第五页'
        }
      ],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      value: '第一页',
      tableData: [
        {
          date: '1',
          name: '演示项目',
          province: '演示项目',
          city: '·',
          address: 'YS-0000004',
          zip: '10.000.00',
          zip1: '10.000.00',
          zip2: '2021-02-25',
          zip3: '待上传',
          zip4: '新增凭证',
          zip5: '·',
          zip6: '刘彬',
          zip7: '2021-02-25'
        },
        {
          zip7: '2021-02-25',
          date: '2',
          name: '演示项目',
          province: '演示项目',
          city: '·',
          zip4: '新增凭证',
          address: 'YS-0000004',
          zip3: '待上传',
          zip: '10.000.00',
          zip2: '2021-02-25',
          zip1: '10.000.00',
          zip5: '·',
          zip6: '刘彬'
        },
        {
          zip7: '2021-02-25',
          date: '3',
          zip3: '待上传',
          name: '演示项目',
          province: '演示项目',
          city: '·',
          zip5: '·',
          zip6: '刘彬',
          address: 'YS-0000004',
          zip4: '新增凭证',
          zip1: '10.000.00',
          zip: '10.000.00',
          zip2: '2021-02-25'
        },
        {
          date: '4',
          zip7: '2021-02-25',
          zip4: '新增凭证',
          name: '演示项目',
          zip3: '待上传',
          zip6: '刘彬',
          zip1: '10.000.00',
          zip2: '2021-02-25',
          province: '演示项目',
          city: '·',
          zip5: '·',
          address: 'YS-0000004',
          zip: '10.000.00'
        },
        {
          zip3: '待上传',
          date: '5',
          zip4: '新增凭证',
          zip7: '2021-02-25',
          zip6: '刘彬',
          name: '演示项目',
          zip1: '10.000.00',
          zip5: '·',
          province: '演示项目',
          zip2: '2021-02-25',
          city: '·',
          address: 'YS-0000004',
          zip: '10.000.00'
        },
        {
          zip3: '待上传',
          zip7: '2021-02-25',
          zip5: '·',
          zip6: '刘彬',
          date: '6',
          zip4: '新增凭证',
          name: '演示项目',
          zip1: '10.000.00',
          zip2: '2021-02-25',
          province: '演示项目',
          city: '·',
          address: 'YS-0000004',
          zip: '10.000.00'
        },
        {
          zip4: '新增凭证',
          date: '7',
          zip7: '2021-02-25',
          zip5: '·',
          name: '演示项目',
          zip2: '2021-02-25',
          zip1: '10.000.00',
          zip3: '待上传',
          province: '演示项目',
          city: '·',
          zip6: '刘彬',
          address: 'YS-0000004',
          zip: '10.000.00'
        },

        {
          zip4: '新增凭证',
          zip7: '2021-02-25',
          zip5: '·',
          date: '8',
          zip2: '2021-02-25',
          name: '演示项目',
          zip1: '10.000.00',
          zip6: '刘彬',
          province: '演示项目',
          zip3: '待上传',
          city: '·',
          address: 'YS-0000004',
          zip: '10.000.00'
        },

        {
          zip6: '刘彬',
          zip7: '2021-02-25',
          date: '9',
          zip2: '2021-02-25',
          name: '演示项目',
          zip1: '10.000.00',
          zip3: '待上传',
          province: '演示项目',
          city: '·',
          zip5: '·',
          address: 'YS-0000004',
          zip: '10.000.00'
        },

        {
          zip4: '新增凭证',
          zip7: '2021-02-25',
          zip6: '刘彬',
          date: '10',
          zip5: '·',
          name: '演示项目',
          zip3: '待上传',
          zip1: '10.000.00',
          province: '演示项目',
          city: '·',
          zip2: '2021-02-25',
          address: 'YS-0000004',
          zip: '10.000.00'
        },

        {
          zip7: '2021-02-25',
          zip4: '新增凭证',
          zip6: '刘彬',
          date: '11',
          zip5: '·',
          zip1: '10.000.00',
          name: '演示项目',
          zip3: '待上传',
          province: '演示项目',
          city: '·',
          zip2: '2021-02-25',
          address: 'YS-0000004',
          zip: '10.000.00'
        },
        {
          zip3: '待上传',
          zip4: '新增凭证',
          zip7: '2021-02-25',
          date: '12',
          zip2: '2021-02-25',
          zip1: '10.000.00',
          name: '演示项目',
          zip5: '·',
          province: '演示项目',
          city: '·',
          zip6: '刘彬',
          address: 'YS-0000004',
          zip: '10.000.00'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex)
      if (columnIndex === 12) {
        return 'border-bottom-right-radius: 20px;border-top-right-radius: 20px;'
      }
    },
    sousuo() {
      if (this.tableData.length > 3) {
        this.tableData.forEach((item) => {
          this.num1.push(item)
        })
      }
      this.tableData.splice(3)
    },
    congzhi() {
      if (this.num1.length > 0) {
        this.tableData = this.num1
      }
      this.input = ''
    },
    handleSelect(key, keyPath) {
      console.log(key, this.activeIndex)
      this.num = key
    },

    handleALL(val) {
      this.handleSelect(val)
    },
    sort_change(column, prop, order) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
      console.log(column.order)
      console.log(column, '---', prop, order)
    },
    fn() {
      this.show = !this.show
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
  height: 900px;
  background: #f6f5ee;
  margin: 0 auto;
  font-family: MicrosoftYaHei;
  .income {
    width: 400px;
    height: 32px;
    background: #fdfcfa;
    border-radius: 16px;
    margin-bottom: 12px;
    .boldsize {
      font-size: 16px !important;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei !important;
      font-weight: bold !important;
      color: #16406d !important;
    }
    ::v-deep.el-menu--horizontal > .el-menu-item {
      height: 32px;
      line-height: 32px;
    }
    ::v-deep.el-menu {
      border-radius: 16px;
    }
    ::v-deep.el-menu-item {
      padding: 0;
      margin-left: 36px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
    }
  }
  .shop {
    margin-bottom: 10px;
    .writeplaceholder {
      ::v-deep.el-input__inner::placeholder {
        color: #848382;
      }
    }
    display: flex;
    justify-content: space-between;
    ::v-deep.el-input__inner {
      width: 220px;
      height: 32px;
      font-size: 14px;
      background: #fdfcfa;
      border-radius: 16px;
    }
    ::v-deep.el-button {
      width: 80px;
      height: 32px;
      padding: 0;
      background: #1c4c7f;
      color: white;
      margin: 0 5px;
    }
    ::v-deep.el-select .el-input .el-select__caret {
      line-height: 32px;
    }
    ::v-deep.el-input {
      width: 220px;
      height: 32px;
    }
    ::v-deep.el-input__icon {
      line-height: 32px !important;
    }
    .innter {
      font-size: 14px;
    }
    .innter1 {
      line-height: 32px;
    }
    ::v-deep.el-input--suffix {
      width: 110px;
    }
    ::v-deep.el-input--suffix .el-input__inner {
      width: 110px;
      background: #f6f5ee;
      border: none;
    }
    .btn {
      background: #f6f5ee;
      color: #848382;
      border: none;
    }
    ::v-deep.el-input__suffix {
      right: 15px;
    }
    ::v-deep.el-input__icon {
      font-size: 5px;
      line-height: 3;
    }
    ::v-deep.el-input__inner::placeholder {
      color: #1c4c7f;
    }
  }
  .drop-down {
    margin-top: 12px;
    margin-bottom: 12px;
    ::v-deep.el-input__inner {
      height: 32px;
      line-height: 32px;
      background: #fdfcfa;
    }
    ::v-deep.el-input__inner::placeholder {
      color: #848382;
      font-size: 14px;
    }
    ::v-deep.el-input__inner {
      border-radius: 16px;
      width: 150px;
      padding: 0 16px;
      margin: 0 4px;
    }
    ::v-deep .el-select .el-input .el-select__caret {
      line-height: 32px;
      font-size: 5px;
      color: #848382;
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
    .solt-icon {
      i {
        margin-left: 8px;
      }
    }
  }
  ::v-deep.cell {
    cursor: pointer;
  }
  ::v-deep.cell img {
    vertical-align: middle;
  }
  ::v-deep.table-SelectedRow-bgcolor {
    background-color: #1c4c7f !important;
    color: white;
  }
  ::v-deep
    .el-table__body-wrapper
    .el-table__body
    ::v-deep.table-SelectedRow-bgcolor:hover {
    background-color: #1c4c7f !important;
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
}
</style>
