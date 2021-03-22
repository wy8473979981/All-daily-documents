<template>
  <!-- 预算编制-费用支出-工程维保费明细-工程维保费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="20">
        <div class="select-cutover">
          <span @click="$router.push({path: '/management/plait/disburse/engineeringCostBudgetDetail',query:toRouter})">工程维保费明细</span>
          <span class="select-blue">工程维保费</span>
        </div>
      </el-col>
      <el-col :span="16">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="bizTypeSelectFunc" v-model="query.bizTypeName" value-key="subjectId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.subjectId" :label="item.subjectName" :value="item">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button> -->
        <!-- <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button> -->
        <!-- <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="100" label="业态" show-overflow-tooltip prop="subjectList">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ getSubjectName(scope,1) }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="120" label="类别" show-overflow-tooltip prop="subjectList">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.subjectList.subjectName == '合计' ? '/' : getSubjectName(scope,2) }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="150" label="费项" show-overflow-tooltip prop="subjectList">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ scope.row.subjectList.subjectName == '合计' ? '/' : getSubjectName(scope,3) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear-1}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="preYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.preYtd" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preYtd')}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="计费依据" :show-overflow-tooltip="!isEdit" prop="number" align="right">
        <template slot="header">
          计费依据
          <el-tooltip class="item" effect="dark" placement="top" content="面积、人员数量、次">
            <i class="el-icon-question yellow-tip"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.number" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'number',false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="月计费单价" :show-overflow-tooltip="!isEdit" prop="unitPrice" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input6 maxlength="12" v-model="scope.row.unitPrice" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'unitPrice',false,true,'bizType',4)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="计费月数" :show-overflow-tooltip="!isEdit" prop="numberOfTimes" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.numberOfTimes" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'numberOfTimes',false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear}年度预算合计`" :show-overflow-tooltip="!isEdit" prop="ytd" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'ytd',true,false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.jan" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'jan') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.feb" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'feb') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.march" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'march') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.april" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'april') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.may" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'may') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.june" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'june') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.july" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'july') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.aug" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'aug') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.sep" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'sep') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.oct" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'oct') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.nov" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'nov')}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.dece" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'dece')}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="单项维保费使用说明" :show-overflow-tooltip="!isEdit" prop="remark">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.remark" maxlength="80" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{returnValue(scope.row,'remark',false)}}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="校验" :show-overflow-tooltip="!isEdit" prop="diff">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{returnValue(scope.row,'diff',true,false)}}</p>
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
        paramFirst: null, // 业态
        bizTypeName: null, // 业态名称
        level: null// 级别
      },
      routerQuery: null,
      toRouter: null,
      selectIndex: 0,
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
    exportParams() {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
            type: 3
          }
        },
        excelName: '工程维保费',
        exportUrl: '/bizFee/ExcelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizFee/ExcelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        type: 3
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    this.getFormId().then(res => {
      if (res.code === 0) {
        this.getSelectList()
        this.getBizTypeList(1)
        this.getList()
        this.toRouter = { ...this.routerQuery, budgetInstanceSheetId: res.data.id };
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
      await FeeScheduleApi.feeFind(params).then((res) => {
        if (res.code === 0) {
          this.tableData = [];
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getFormId() {
      try {
        // 查询
        const params = { feeId: this.routerQuery.budgetInstanceSheetId };
        return await FeeScheduleApi.getMaintainId(params);
      } catch (e) {
        console.log(e)
      }
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
          return row.subjectList && row.subjectList.subjectName || '-'
          break
        case 2:
          return row.subjectList && row.subjectList.subSubject && row.subjectList.subSubject.subjectName || '-'
          break
        case 3:
          return row.subjectList && row.subjectList.subSubject && row.subjectList.subSubject.subSubject && row.subjectList.subSubject.subSubject.subjectName || '-'
          break
        default:
          return '-'
      }
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
      this.isEdit = false;
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
        paramFirst: null, // 业态
        bizTypeName: null, // 业态名称
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
          this.isEdit = false
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
      FeeScheduleApi.feeEdit(params).then(res => {
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
.table-input-box {
  p {
    width: 100%;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.yellow-tip {
  color: #f5a623;
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
