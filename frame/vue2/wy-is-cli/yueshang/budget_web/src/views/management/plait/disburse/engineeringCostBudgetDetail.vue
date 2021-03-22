<template>
  <!-- 预算编制-费用支出-工程维保费明细-工程维保费明细 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="20">
        <div class="select-cutover">
          <span class="select-blue">工程维保费明细</span>
          <span @click="$router.push({path: '/management/plait/disburse/engineeringCostBudget',query:toRouter})">工程维保费</span>
        </div>
      </el-col>
      <el-col :span="16">
        <!-- <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="bizTypeSelectFunc" v-model="query.bizTypeName" value-key="subjectId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.subjectId" :label="item.subjectName" :value="item">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button> -->
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
      <el-table-column fixed min-width="120" label="业态" show-overflow-tooltip prop="bizType">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'bizType',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="甲方" show-overflow-tooltip prop="firstParty">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'firstParty',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="乙方" :show-overflow-tooltip="!isEdit" prop="secondParty">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.secondParty" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'secondParty',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="合同性质" show-overflow-tooltip prop="contractNature">
        <template slot-scope="scope">{{ returnValue(scope.row,'contractNature',false,false) }}</template>
      </el-table-column>
      <el-table-column min-width="150" label="合同类型" :show-overflow-tooltip="!isEdit" prop="contractType">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.contractType" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'contractType',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="付款周期方式" :show-overflow-tooltip="!isEdit" prop="payCycle">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payCycle" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payCycle',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="合同费用归属" :show-overflow-tooltip="!isEdit" prop="belong">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.belong" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'belong',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="工程项目" :show-overflow-tooltip="!isEdit" prop="projectNum">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.projectNum" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'projectNum',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="合同编号" :show-overflow-tooltip="!isEdit" prop="contractNum">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.contractNum" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'contractNum',false,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`合同周期`" align="center">
        <el-table-column min-width="140" label="起始日期" :show-overflow-tooltip="!isEdit" prop="start">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'start',false,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="结束日期" :show-overflow-tooltip="!isEdit" prop="end">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'end',false,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="150" label="立项价格" :show-overflow-tooltip="!isEdit" prop="projectPrice" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.projectPrice" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'projectPrice',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="合同价格" :show-overflow-tooltip="!isEdit" prop="contractPrice" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.contractPrice" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'contractPrice',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`结算价格`" align="center">
        <el-table-column min-width="140" :label="`1月`" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.jan" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`2月`" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.feb" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`3月`" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.march" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`4月`" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.april" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`5月`" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.may" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`6月`" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.june" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`7月`" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.july" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`8月`" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.aug" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`9月`" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.sep" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`10月`" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.oct" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`11月`" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.nov" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" :label="`12月`" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.dece" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="小计结算" :show-overflow-tooltip="!isEdit" prop="ytd" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.ytd" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd',true,false) }}</p>
          </template>
        </el-table-column>
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
      selectIndex: 0,
      routerQuery: null,
      toRouter: null,
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
        excelName: '清洁卫生费',
        exportUrl: '/bizFee/ExcelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizFee/ExcelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        type: 12
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getFormId().then(res => {
      if (res.code === 0) {
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
      await FeeScheduleApi.getMaintainDetail(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getFormId() {
      try {
        // 查询
        const params = { detailId: this.routerQuery.budgetInstanceSheetId };
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
          return row.bizType || '-'
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
        bizTypeName: null, // 业态名称
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
