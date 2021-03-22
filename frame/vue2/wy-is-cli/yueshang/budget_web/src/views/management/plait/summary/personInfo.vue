<template>
  <!-- 预算编制-汇总-基础信息表-人员信息 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="20">
        <div class="select-cutover">
          <span @click="$router.push({path: '/management/plait/summary/areaInfo',query:toAreaRouter})">面积信息</span>
          <span @click="$router.push({path: '/management/plait/summary/projectInfo',query:toProjectRouter})">项目信息</span>
          <span class="select-blue">人员信息</span>
        </div>
      </el-col>
      <el-col :span="16">
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in baseEmpLevelList" :key="item.id" :label="item.dictName" :value="item.dictCd">
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
      <el-table-column fixed min-width="120" label="编制类型" show-overflow-tooltip prop="staffingType">
        <template slot-scope="scope">
          <p>{{ getSubjectName(scope,1) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="岗位类型" show-overflow-tooltip prop="stationType">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'stationType',false,false,'staffingType') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="出入口类型" show-overflow-tooltip prop="inletOutletType">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'inletOutletType',false,false,'staffingType') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="总编制数" show-overflow-tooltip prop="headcount" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'headcount',false,false,'staffingType',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="实际在岗人数" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'realcount',false,false,'staffingType',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="出入口个数" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'inletOutletCount',false,false,'staffingType',0) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator v-if="!isEdit" :page-info="pageInfo" @handle_paginator="handle_paginator" />
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
      baseEmpLevelList: null,
      selectIndex: 0,
      routerQuery: null,
      toAreaRouter: null,
      toProjectRouter: null,
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
    ...mapGetters(['currentYear']),
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
        importUrl: '/collectbaseEmp/baseEmpImp',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getInfoId().then(res => {
      if (res.code === 0) {
        this.getList()
        this.getSelectList('baseEmpLevel')
        this.toAreaRouter = { ...this.routerQuery, budgetInstanceSheetId: res.data[0] };
        this.toProjectRouter = { ...this.routerQuery, budgetInstanceSheetId: res.data[1] };
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
    async getList() {
      // 查询
      const params = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        bean: {
          ...this.query,
          budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
        }
      };
      this.isEdit = false;
      await SummaryApi.personInfoList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getInfoId() {
      try {
        // 查询
        const params = { budgetInstanceId: this.routerQuery.budgetInstanceId };//实例ID
        return await SummaryApi.getInfoId(params);
      } catch (e) {
        console.log(e)
      }
    },
    async getSelectList(type) {
      // 级别
      const params = {
        selectType: type
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          if (type == 'baseEmpLevel') {
            this.baseEmpLevelList = res.data;
          }
        }
      })
    },
    // async getBizTypeList(level) {
    //   const params = {
    //     sheetId: this.routerQuery.budgetSheetId,
    //     level: level
    //   }
    //   await GlobalApi.getBizTypeList(params).then(res => {
    //     if (res.code === 0) {
    //       this.selectLayoutList = res.data
    //     }
    //   })
    // },
    getSubjectName(scope, level) {
      const row = scope.row
      switch (level) {
        case 1:
          return row.staffingType || '-'
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
    bizTypeSelectFunc(data) {
      this.query.paramFirst = data.subjectId;
      this.query.bizTypeName = data.subjectName;
      this.search();
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
</style>
