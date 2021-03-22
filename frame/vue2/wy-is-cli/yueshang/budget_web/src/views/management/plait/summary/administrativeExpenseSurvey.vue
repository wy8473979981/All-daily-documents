<template>
  <!-- 预算编制-汇总-行政费用概况 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="16">
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <!-- <ys-export v-if="!isEdit" :params="exportParams"></ys-export> -->
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="120" label="类别" show-overflow-tooltip prop="category">
        <template slot-scope="scope">
          <p>{{ getSubjectName(scope,1) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="费项" show-overflow-tooltip prop="costItem">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'costItem',false,false,'category') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label="`${getBudgetYear-1}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="estimateQuota" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'estimateQuota',true,false,'category') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" :label="`${getBudgetYear}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="expectTotal" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'expectTotal',true,false,'category') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="增长率" :show-overflow-tooltip="!isEdit" prop="growthRate" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'growthRate',true,false,'category',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="备注" :show-overflow-tooltip="!isEdit" prop="remake">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'remake',false,false,'category') }}</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- <ys-paginator v-if="!isEdit" :page-info="pageInfo" @handle_paginator="handle_paginator" /> -->
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import SummaryApi from '@/apis/apis/summaryApi'
import GlobalApi from '@/apis/apis/global'
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
        level: null// 级别
      },
      selectIndex: 0,
      routerQuery: null,
      isEdit: false,
      selectLayoutList: [], // 业态集合
      levelList: [
        {
          "dictCd": "1",
          "dictName": "类别",
          "dispOrderNo": 1,
        },
      ], // 级别集合
      tableData: [],
      oldTableData: '',
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getBudgetYear']),
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
            type: 12
          }
        },
        excelName: '资金计划',
        exportUrl: '/bizFee/ExcelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/capitalPlan/capitalPlanImp',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    // this.getSelectList()
    // this.getBizTypeList(1)
    this.getList()
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
    async getList() {
      // 查询
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        ...this.query,
      };
      this.isEdit = false;
      await SummaryApi.costsurveyList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data
          getDynamicTableHeight(this)
        }
      })
    },
    async getSelectList() {
      // 级别
      const params = {
        selectType: 'bizTypeCategory'
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          this.levelList = res.data
        }
      })
    },
    async getBizTypeList(level) {
      const params = {
        sheetId: this.routerQuery.budgetSheetId,
        level: level
      }
      await GlobalApi.getBizTypeList(params).then(res => {
        if (res.code === 0) {
          this.selectLayoutList = res.data
        }
      })
    },
    getSubjectName(scope, level) {
      const row = scope.row
      switch (level) {
        case 1:
          return row.category || '-'
          break
        default:
          return '-'
      }
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.isEdit = false;
      this.pageInfo.pageNum = 1
      this.getList()
    },
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
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
          this.isEdit = false
        }).catch(() => {
          this.getList()
          this.isEdit = false
        })
      }
    },
    // 保存
    save() {
      this.isEdit = false
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: [
          ...this.tableData
        ]
      }
      FeeScheduleApi.feeEdit(params).then(res => {
        if (res.code == 0) {
          this.getList()
        } else {
          this.$message({
            message: '数据异常！',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
.el-icon-circle-plus,
.el-icon-remove {
  font-size: 20px;
}
.el-icon-remove {
  color: red;
}
.table-input-box {
  p {
    width: 100%;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
