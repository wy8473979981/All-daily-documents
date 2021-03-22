<template>
  <!-- 预算编制-费用支出-整租租赁成本 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col style="text-align: right;">
        <!-- <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="100" label="业态" show-overflow-tooltip prop="bizType" />
      <el-table-column min-width="140" label="租赁面积" :show-overflow-tooltip="!isEdit" prop="area">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.area" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.area | blank | micrometerLevel }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="租赁起始日" :show-overflow-tooltip="!isEdit" prop="start">
        <template slot-scope="scope">
          <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.start" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
          </el-date-picker>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.start || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="租赁结束日" :show-overflow-tooltip="!isEdit" prop="end">
        <template slot-scope="scope">
          <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.end" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
          </el-date-picker>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.end || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="租金单价" align="center">
        <el-table-column min-width="140" label="第1年" :show-overflow-tooltip="!isEdit" prop="firstYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.firstYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'firstYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第2年" :show-overflow-tooltip="!isEdit" prop="secondYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.secondYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'secondYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第3年" :show-overflow-tooltip="!isEdit" prop="thirdYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.thirdYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'thirdYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第4年" :show-overflow-tooltip="!isEdit" prop="fourthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fourthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fourthYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第5年" :show-overflow-tooltip="!isEdit" prop="fifthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fifthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fifthYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第6年" :show-overflow-tooltip="!isEdit" prop="sixthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sixthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sixthYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第7年" :show-overflow-tooltip="!isEdit" prop="seventhYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.seventhYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'seventhYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第8年" :show-overflow-tooltip="!isEdit" prop="eighthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.eighthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'eighthYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第9年" :show-overflow-tooltip="!isEdit" prop="ninthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.ninthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'ninthYearUnit') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第10年" :show-overflow-tooltip="!isEdit" prop="tenthYearUnit" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.tenthYearUnit" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'tenthYearUnit') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear-1}年度预计发生额`" :show-overflow-tooltip="!isEdit" prop="preYtd" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.preYtd" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'preYtd') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear}年度预算合计`" show-overflow-tooltip prop="ytd" align="right">
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
      <el-table-column min-width="140" :label="`${getBudgetYear + 1}`" :show-overflow-tooltip="!isEdit" prop="firstYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.firstYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'firstYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 2}`" :show-overflow-tooltip="!isEdit" prop="thirdYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.thirdYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'thirdYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 3}`" :show-overflow-tooltip="!isEdit" prop="fourthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fourthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fourthYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 4}`" :show-overflow-tooltip="!isEdit" prop="april" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 5}`" :show-overflow-tooltip="!isEdit" prop="fifthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fifthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fifthYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 6}`" :show-overflow-tooltip="!isEdit" prop="sixthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sixthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sixthYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 7}`" :show-overflow-tooltip="!isEdit" prop="seventhYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.seventhYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'seventhYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 8}`" :show-overflow-tooltip="!isEdit" prop="eighthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.eighthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'eighthYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 9}`" :show-overflow-tooltip="!isEdit" prop="ninthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.ninthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'ninthYear') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear + 10}`" :show-overflow-tooltip="!isEdit" prop="tenthYear" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.tenthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'tenthYear') }}</p>
        </template>
      </el-table-column>
    </el-table>

    <!-- <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator"/> -->
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import FeeScheduleApi from "@/apis/apis/feeScheduleApi"
import { mapGetters } from "vuex"
export default {
  mixins: [handle_paginator],
  data() {
    return {
      isEdit: false,
      selectIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      query: {
      },
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
          budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        },
        chartType:'44',
        excelName: '整租租赁成本',
        exportUrl: '/bizRental/excelExport',
      }
    },
  },
  created() {
    this.routerQuery = this.$route.query
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
    // 查询
    async getList() {
      const params = {
        ...this.routerQuery,
      }
      await FeeScheduleApi.rentalFind(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data
          this.oldTableData = JSON.stringify(res.data.list)
          getDynamicTableHeight(this)
        }
      })
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    // 编辑
    edit() {
      this.isEdit = true
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
      FeeScheduleApi.rentalEdit(params).then(res => {
        if (res.code == 0) {
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "~@styles/common.scss";
</style>
