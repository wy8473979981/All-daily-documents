<template>
  <!-- 预算编制-其他收入表-委托管理收入-租金管理费收入 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="20">
        <div class="select-cutover">
          <span @click="$router.push({path: '/management/plait/income/otherCommissionRevenue',query:toRouter})">其他收入</span>
          <span class="select-blue">租金管理费收入</span>
        </div>
      </el-col>
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="search" v-model="query.bizTypeId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.id" :label="item.dictName" :value="item.dictCd"></el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <!-- <el-table-column v-if="isEdit" type="selection" width="50" :selectable='selectInit' fixed /> -->
      <el-table-column fixed min-width="140" label="业态" show-overflow-tooltip prop="bizType">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.bizType || '-'}}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="类别" show-overflow-tooltip prop="category">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.category || '/'}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="140" label="项目" show-overflow-tooltip prop="project">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.project || '-'}}</p>
        </template>
      </el-table-column> -->
      <el-table-column min-width="170" :label="`${getBudgetYear}年度预算合计`" show-overflow-tooltip prop="ytd" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'ytd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="1月" show-overflow-tooltip prop="jan" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.jan" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'jan'):returnValue(scope.row,'jan',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="2月" show-overflow-tooltip prop="feb" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.feb" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'feb'):returnValue(scope.row,'feb',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="3月" show-overflow-tooltip prop="march" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.march" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'march'):returnValue(scope.row,'march',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="4月" show-overflow-tooltip prop="april" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.april" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'april'):returnValue(scope.row,'april',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="5月" show-overflow-tooltip prop="may" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.may" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'may'):returnValue(scope.row,'may',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="6月" show-overflow-tooltip prop="june" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.june" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'june'):returnValue(scope.row,'june',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="7月" show-overflow-tooltip prop="july" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.july" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'july'):returnValue(scope.row,'july',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="8月" show-overflow-tooltip prop="aug" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.aug" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'aug'):returnValue(scope.row,'aug',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="9月" show-overflow-tooltip prop="sep" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.sep" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'sep'):returnValue(scope.row,'sep',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="10月" show-overflow-tooltip prop="oct" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.oct" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'oct'):returnValue(scope.row,'oct',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="11月" show-overflow-tooltip prop="nov" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.nov" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'nov'):returnValue(scope.row,'nov',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="12月" show-overflow-tooltip prop="dece" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.dece" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'dece'):returnValue(scope.row,'dece',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear+1}年度预算合计`" show-overflow-tooltip prop="nextYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.nextYtd" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'nextYtd'):returnValue(scope.row,'nextYtd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear+2}年度预算合计`" show-overflow-tooltip prop="oldYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-filter-check-input maxlength="12" v-model="scope.row.oldYtd" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'oldYtd'):returnValue(scope.row,'oldYtd',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="备注" show-overflow-tooltip prop="remark">
        <template slot-scope="scope">
          <el-input v-if="returnRowEdit(scope,1)" v-model="scope.row.remark" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{scope.row.project =='管理费比例' ?returnValue(scope.row,'remark'):returnValue(scope.row,'remark',true,false) }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import IncomeApi from '@/apis/apis/incomeApi'
import globalApi from '@/apis/apis/global'
import { mapGetters, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        bizTypeId: null, // 业态
        level: null// 级别
      },
      routerQuery: null,
      toRouter: null,
      selectIndex: 0,
      selectRow: [],
      createIndex: 0,
      isEdit: false,
      selectLayoutList: [], // 业态集合
      levelList: [], // 级别集合
      tableData: [],
      oldTableData: '',
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getBudgetYear']),
    getSelectRowLength() {
      return this.selectRow.length > 0
    },
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '租金管理费收入',
        exportUrl: '/incomeRent/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/incomeRent/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    this.getIncomeAgentGetTabId().then(res => {
      if (res.code === 0) {
        this.currentItem = res.data;
        this.getSelectList('otherIncomeRent')// 业态
        this.getSelectList('clearLevel')// 级别
        this.getList()
        let obj = { budgetInstanceSheetId: this.currentItem }
        this.toRouter = { ...this.routerQuery, ...obj };
      }
    })
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal(val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    returnValue,
    async getIncomeAgentGetTabId() {
      try {
        // 查询
        const params = { rentId: this.routerQuery.budgetInstanceSheetId };
        return await IncomeApi.getIncomeAgentGetTabId(params);
      } catch (e) {
        console.log(e)
      }
    },
    async getList() {
      // 查询
      const params = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        bean: {
          ...this.query,
          budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
        }
      }
      this.isEdit = false;
      await IncomeApi.getIncomeRentQueryPage(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getSelectList(type) {
      // 级别
      const params = {
        selectType: type
      }
      await globalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          const { data } = res
          const nData = data.map((item) => {
            return { ...item, dictCd: Number(item.dictCd) }
          })
          if (type == 'otherIncomeRent') {
            this.selectLayoutList = nData
          } else if (type == 'clearLevel') {
            this.levelList = nData
          }
        }
      })
    },
    getListChange() {
      // 重新选择搜索项重置页码
      this.pageInfo.page = 1
      this.isEdit = false;
      this.getList()
    },
    returnRowEdit(scope, type) {
      const { row, $index } = scope
      const { project, isCreateBol = false, isEdit = false } = row
      if (type == 1) {
        if (this.isEdit && project == '管理费比例' && ($index == this.selectIndex || isCreateBol)) {
          return true
        } else {
          return false
        }
      }
    },
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
        bizTypeId: null, // 业态
        level: null// 级别
      }
      this.getList()
    },
    showInput(index) {
      // 选择一行显示input
      this.selectIndex = index
      if (this.isEdit) {
        this.selectIndex = index
      } else {
        this.selectIndex = null
      }
    },
    edit() {
      // 编辑/取消
      this.isEdit = true
      this.query = {
        bizTypeId: null, // 业态
        level: null// 级别
      }
      this.tableData.shift()
    },
    cancel() {
      const tableData = JSON.stringify(this.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm('是否保存已编辑内容', {
          confirmButtonText: '是',
          cancelButtonText: '否'
        }).then(() => {
          this.save()
        }).catch(() => {
          this.getList()
          this.isEdit = false
        })
      }
    },
    save() {
      // 保存
      this.isEdit = false
      this.selectIndex = 0

      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: [
          ...this.tableData
        ]
      }
      IncomeApi.incomeRentInsertBatch(params).then(res => {
        if (res.code == 0) {
          this.getList()
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.select-title {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  .select-cutover {
    span {
      display: inline-block;
      font-size: 14px;
      padding: 0 20px;
      border-right: 1px solid #000;
      cursor: pointer;
    }
    span:first-child {
      padding-left: 0;
    }
    span:last-child {
      border: 0;
    }
    .select-blue {
      color: #468ceb;
      font-size: 18px;
    }
  }
  .select-status {
    margin: 0 auto;
    p {
      font-size: 14px;
      span {
        font-size: 16px;
        color: #468ceb;
        padding-left: 20px;
      }
    }
  }

  .select-data {
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
}
.table-input-box {
  p {
    width: 100%;
    height:24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
