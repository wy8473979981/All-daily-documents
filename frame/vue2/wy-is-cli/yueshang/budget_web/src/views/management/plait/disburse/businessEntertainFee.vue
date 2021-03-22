<template>
  <!-- 预算编制-费用支出-业务招待费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.paramFirst" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in paramFirstList"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectId">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" v-model="query.level" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option
            v-for="item in levelList"
            :key="item.dictCd"
            :label="item.dictName"
            :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button> -->
        <!-- <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button> -->
        <!-- <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="140" label="业态" show-overflow-tooltip prop="subjectList.subjectName">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.subjectList.subjectName || '/' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="类别" show-overflow-tooltip prop="subjectList.subSubject.subjectName">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.subjectList.subjectName == '合计' ? '/' : scope.row.subjectList.subSubject && scope.row.subjectList.subSubject.subjectName || '/' }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="150" label="费项" show-overflow-tooltip prop="subjectList.subSubject.subSubject.subjectName">
        <template slot-scope="scope">
          <p>{{ scope.row.subjectList.subjectName == '合计' ? '/' : getSubjectName(scope) }}</p>
        </template>
      </el-table-column> -->
      <el-table-column min-width="170" :label="`${getBudgetYear-1}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="preYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preYtd') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear}年度预计合计`" show-overflow-tooltip prop="ytd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd',true,false) }}</p>
          </template>
      </el-table-column>
      <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.jan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.feb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.march" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.may" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.june" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.july" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.oct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.nov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.dece" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece') }}</p>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import { mapGetters } from "vuex"
export default {
  mixins: [handle_paginator],
  data () {
    return {
      isEdit: false,
      selectIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        paramFirst: null,
        level: null,
      },
      paramFirstList: [], // 业态列表
      levelList: [], // 级别列表
      tableData: [],
      oldTableData: '',
      routerQuery: null,
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
            type: 10
          }
        },
        excelName: '业务招待费',
        exportUrl: '/bizFee/ExcelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizFee/ExcelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        type: 10
      }
    }
  },
  created () {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
    this.getSelectList()
    this.getList()
  },
  mounted () {

  },
  // 日期转换格式
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal (val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    returnValue,
    // 获取业态列表
    getBizTypeList () {
      GlobalApi.getBizTypeList({ sheetId: this.routerQuery.budgetSheetId, level: 1 }).then(res => {
        if (res.code == 0) {
          this.paramFirstList = res.data
        }
      })
    },
    // 获取级别列表
    getSelectList () {
      GlobalApi.getSelectList({ selectType: 'bizTypeLevel' }).then(res => {
        if (res.code == 0) {
          this.levelList = res.data
        }
      })
    },
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await FeeScheduleApi.feeFind(params).then(res => {
        if(res.code == 0){
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // table多层判断取数值
    getSubjectName(scope) {
      return scope.row.subjectList.subSubject && scope.row.subjectList.subSubject.subSubject && scope.row.subjectList.subSubject.subSubject.subjectName || '/'
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    reset() {
      this.query = {
        paramFirst: null,
        level: null
      }
      this.getList()
    },
    // 编辑
    edit() {
      this.isEdit = true
      this.tableData.shift()
    },
    // 取消
    cancel() {
      let tableData = JSON.stringify(this.tableData)
      if (this.oldTableData == tableData) {
        this.getList()
        this.isEdit = false
      } else {
        this.$confirm(`是否保存已编辑内容`, {
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
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.feeEdit(params).then(res => {
        if(res.code == 0){
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>
