<template>
  <!-- 存量资产-商业 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="colcol" :span="20">
        <div class="oneBtn">
          <template>
            <el-select placeholder="项目名称" size="mini" v-model="query.projectId" @change="getListChange" filterable clearable collapse-tags>
              <el-option v-for="item in projectNameList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="reset" size="mini">重置</el-button>
          </template>
        </div>
      </el-col>
      <el-col :span="4" class="operation">
        <Export :params="exportParams"></Export>
        <el-button size="mini" type="text" class="filter-icon" @click="display = true"></el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" ref="table" style="width: 100%;" :row-key="rowKeyFun" border lazy class="table" size="mini" header-row-class-name="table-header" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="load" @selection-change="checkboxChangeFunc" @select-all="selectAll" :max-height="this.$store.state.tableHeight">
      <el-table-column fixed="left" type="selection" width="50">
      </el-table-column>
      <el-table-column fixed="left" label="序号" type="index" width="50">
        <template scope="scope">
          <p>{{scope.$index + 1}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" fixed="left" label="项目" min-width="180" show-overflow-tooltip sortable>
        <template scope="scope">
          <span>{{scope.row.projectName}}
            <!-- <i :class="scope.row.show ? 'el-icon-arrow-down':'el-icon-arrow-up'" @click="getChild(scope.row)"></i> --></span>
        </template>
      </el-table-column>
      <el-table-column prop="buildArea" label="建面(万㎡)" min-width="120" show-overflow-tooltip sortable>
        <template scope="scope">
          <p>{{ thousands(scope.row.buildArea, 1) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="rentPrice" label="起始租金(元)" min-width="130" show-overflow-tooltip sortable>
        <template scope="scope">
          <p>{{ thousands(scope.row.rentPrice) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="总投(元)" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p>{{ thousands(scope.row.totalPrice) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="landPrice" label="地价(元)" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p>{{ thousands(scope.row.landPrice) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sharePrincipleName" label="分摊原则" min-width="100" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="tenYearsAsset" label="10年末资产价值" v-if="headerFilter('10年末资产价值')" min-width="140" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.tenYearsAsset)?'':'text-red']">{{  thousands(scope.row.tenYearsAsset, 0) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="tenYearsIrr" label="10年IRR" v-if="headerFilter('10年IRR')" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.tenYearsIrr)?'':'text-red']">{{  thousands(scope.row.tenYearsIrr, 2, '%') }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="tenYearsYoc" label="10年YOC" v-if="headerFilter('10年YOC')" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.tenYearsYoc)?'':'text-red']">{{  thousands(scope.row.tenYearsYoc, 2, '%') }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sixYearsAsset" label="6年末资产价值" v-if="headerFilter('6年末资产价值')" min-width="130" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.sixYearsAsset)?'':'text-red']">{{  thousands(scope.row.sixYearsAsset, 0) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="sixYearsIrr" label="6年IRR" v-if="headerFilter('6年IRR')" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.sixYearsIrr)?'':'text-red']">{{  thousands(scope.row.sixYearsIrr, 2, '%') }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="firstReachingStandard" label="首次达标年" v-if="headerFilter('首次达标年')" min-width="130" show-overflow-tooltip sortable>
        <template scope="scope">
          <p>{{ scope.row.firstReachingStandard || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="subsidyYoc" label="补贴YOC" v-if="headerFilter('补贴YOC')" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.subsidyYoc)?'':'text-red']">{{  thousands(scope.row.subsidyYoc, 0) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="subsidyIrr" label="补贴IRR" v-if="headerFilter('补贴IRR')" min-width="100" show-overflow-tooltip sortable>
        <template scope="scope">
          <p :class="[ isNegativeFunc(scope.row.subsidyIrr)?'':'text-red']">{{  thousands(scope.row.subsidyIrr, 0) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator" />

    <!-- 表头筛选 -->
    <ys-tableHeaderDrawer :title="`设置显示字段`" direction="rtl" :display.sync="display" @filterSave="filterSave" :inner="false" :width="drawerWidth" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :tableHeaders="tableHeaders"></ys-tableHeaderDrawer>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index'
import AssetsSum from '@/apis/apis/assetsSum'
import TypeApi from '@/apis/apis/typeApi'
import Compare from '@/apis/apis/compare'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
// import TableDrawerComponent from './components/tableDrawerComponent'
import Export from '../components/export';
export default {
  mixins: [handlePaginator],
  data() {
    return {
      display: false,
      drawerWidth: '500px',
      pageInfo: {
        page_size: 20,
        page: 1,
        sum_num: 0
      },
      query: {
        projectId: '',//项目id多选列表
      },
      projectNameList: [],//项目名称
      downUrl: '/projectDetail/down',
      fast: false,
      auditNum: null,
      status: null,
      headerList: '',
      business_area_status: null,
      business_tech_status: null,
      business_operation_status: null,
      project_verify_id: null,
      big_layout_id: 1, //大业态
      permission: `${localStorage.getItem('ys_contract_permission')}`,
      attachment_upload: [],// 附件类型
      tableData: [],
      tableAllData: [],
      checkAll: false,
      selectedRowAll: [],
      selectedRow: [],
      tableHeaders: [
        {
          value: '10年末资产价值',
          selected: false,
          indeterminate: false,
          list: []
        },
        {
          value: '10年IRR',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '10年YOC',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '6年末资产价值',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '6年IRR',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '首次达标年',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '补贴YOC',
          selected: false,
          indeterminate: false, list: []
        },
        {
          value: '补贴IRR',
          selected: false,
          indeterminate: false, list: []
        },
      ],
    }
  },
  components: {
    // TableDrawerComponent,
    Export
  },
  watch: {

  },
  computed: {
    exportParams() {
      return {
        params: {
          projectResultIds: [...this.selectedRow],
          showTypeList: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        excelName: '对比分析',
        exportUrl: '/api/project/result/contrast/analysis/export',
      }
    },
  },
  created() {
    if (this.$route.query.projectId) {
      this.query.projectId = parseInt(this.$route.query.projectId)
    }
    this.getProjectList();
    this.getList();
    this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  methods: {
    thousands(value, precise = 2, unit = '') {
      if (isNaN(value) || [null, undefined, ''].includes(value)) {
        return '-';
      }
      let isNegativeBol = value >= 0 ? false : true;
      value = Math.abs(value);
      var text = Number(value).toFixed(precise);
      var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
      var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
      return isNegativeBol ? `(${f + unit})` : f + unit;
    },
    isNegativeFunc(value) {
      if (isNaN(value) || [null, undefined, ''].includes(value)) {
        return true;
      } else {
        return Number(value) >= 0 ? true : false;
      }
    },
    rowKeyFun(row) {
      if (row.parentIndex || row.parentIndex === 0) {
        return row.projectResultId.toString() + row.projectId.toString() + row.parentIndex.toString()
      } else {
        return row.projectResultId.toString() + row.projectId.toString()
      }
    },
    async load(tree, treeNode, resolve) {
      await Compare.getChild({ projectId: tree.projectId }).then(res => {
        const { code, result } = res;
        if (code === 200) {
          let child = [];
          result.list.map(item => {
            if (item.projectResultId != tree.projectResultId) {
              child.push(item);
            }
          })
          this.tableAllData = this.tableAllData.concat(child) // 保存表格数据
          return resolve(child)
        }
      })
    },
    async getList() {
      let params = {
        projectId: this.query.projectId,
        limit: this.pageInfo.page_size,//每页显示条数
        page: this.pageInfo.page,//第几页
      }
      await Compare.getList(params).then(res => {
        const { code, result } = res;
        if (code === 200) {
          this.tableData = [];
          this.tableData = result.list.map((item, i) => {
            let createdTime = item.createdTime ? item.createdTime.replace('T', ' ') : '';
            let updatedTime = item.updatedTime ? item.updatedTime.replace('T', ' ') : '';
            return { ...item, createdTime: createdTime, updatedTime: updatedTime, hasChildren: true, parentIndex: i }
          });
          this.tableAllData = JSON.parse(JSON.stringify(this.tableData));
          this.pageInfo.sum_num = result.total;
          getDynamicTableHeight(this)
        }
      })
    },
    filterSave(data) {
      this.display = data.flag;
      // this.tableHeaders = data.tableHeaders;
      this.tableHeaders = JSON.parse(JSON.stringify(data.tableHeaders))
    },
    headerFilter(val) {
      let arr = this.tableHeaders.filter(item => item.value == val);
      return arr[0].selected;
    },
    checkboxChangeFunc(data) {
      // 复选框
      this.selectedRow = [];
      this.selectedRowAll = data;
      data.map(item => {
        if (!this.selectedRow.includes(item.projectResultId)) {
          this.selectedRow.push(item.projectResultId)
        }
      })
      // console.log(data.length, 'data')
      console.log(this.selectedRow, 'this.selectedRow')
    },
    selectAll(selection) {
      // 全选
      this.checkAll = !this.checkAll;
      // console.log(this.tableAllData, 'selectAll')
      if (this.checkAll) {
        this.tableAllData.map(row => {
          if (!row.hasChildren) {
            this.$refs.table.toggleRowSelection(row, this.checkAll);
          }
        })
      } else {
        this.selectedRowAll.map(row => {
          this.$refs.table.toggleRowSelection(row, false);
        })
      }
    },
    async getProjectList() {
      // 项目列表
      try {
        await CalculationApi.getProjectList().then(res => {
          if (res.code === 200) {
            const { result: { list } } = res;
            this.projectNameList = list.map(item => {
              return { label: item.name, value: item.projectId }
            })
          }
        })
      } catch (e) {
        console.log(e);
      }
    },
    getListChange() {
      // 重新选择搜索项重置页码
      this.pageInfo.page = 1
      this.getList()
    },
    reset() {
      // 重置
      this.pageInfo = { page_size: 20, page: 1, sum_num: 0 };
      this.query = { projectId: '' };
      this.getList()
    },
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.tool-bar {
  .operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-button {
    margin: 0 5px 0 0;
  }
  .colcol .oneBtn {
    width: 284px;
  }
}
.text-red {
  color: red;
}
.el-table {
  ::v-deep .cell {
    // text-overflow: initial;
  }
}
.filter-icon {
  width: 30px;
  height: 30px;
  position: relative;
  border: 1px solid #468ceb;
  &::before {
    content: "";
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../../../assets/images/filter_icon.png") center center
      no-repeat;
    background-size: 25px 25px;
  }
}
</style>
