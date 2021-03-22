<template>
  <!-- 预算查看-汇总-租费概况 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="16">
        <el-select placeholder="请选择收入类型" size="mini" @change="search" v-model="query.incomeType" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in incomeTypeList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select placeholder="请选择业态" size="mini" @change="search" v-model="query.bizTypeId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in bizList" :key="item.id" :label="item.dictName" :value="item.value">
          </el-option>
        </el-select>
        <el-select placeholder="请选择级别" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.id" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button @click="reset" size="mini">重置</el-button>
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
      <el-table-column fixed min-width="80" label="收入类型" show-overflow-tooltip prop="incomeType">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'incomeType',false,false,'incomeType') }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="80" label="业态" show-overflow-tooltip prop="bizType">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'bizType',false,false,'incomeType') }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="220" label="类别" show-overflow-tooltip prop="rentType">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'rentType',false,false,'incomeType') }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="合计" align="center">
        <el-table-column min-width="150" :label="`${getBudgetYear}年应收`" :show-overflow-tooltip="!isEdit" prop="receivableNextYear" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableNextYear',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="年计费面积" :show-overflow-tooltip="!isEdit" prop="areaNextYear" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaNextYear',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="单价(元/月/㎡)" :show-overflow-tooltip="!isEdit" prop="priceNextYear" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'priceNextYear',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="应收" align="center">
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="receivableJan" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableJan',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="receivableFeb" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableFeb',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="receivableMarch" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableMarch',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="receivableApril" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableApril',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="receivableMay" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableMay',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="receivableJune" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableJune',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="receivableJuly" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableJuly',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="receivableAugust" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableAugust',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="receivableSep" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableSep',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="receivableOct" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableOct',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="receivableNove" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableNove',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="receivableDece" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'receivableDece',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="计费面积" align="center">
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="areaJan" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaJan',true,true,'incomeType') }}</p>
          </template>false
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="areaFeb" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaFeb',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="areaMarch" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaMarch',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="areaApril" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaApril',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="areaMay" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaMay',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="areaJune" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaJune',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="areaJuly" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaJuly',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="areaAugust" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaAugust',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="areaSep" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaSep',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="areaOct" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaOct',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="areaNove" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaNove',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="areaDece" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'areaDece',true,false,'incomeType') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear+1}年应收`" show-overflow-tooltip prop="receivableNextTwoYear" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'receivableNextTwoYear',true,false,'incomeType') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear+2}年应收`" show-overflow-tooltip prop="receivableNextThreeYear" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'receivableNextThreeYear',true,false,'incomeType') }}</p>
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
        incomeType: null, //收入类型
        bizTypeId: null, //业态
        level: null, // 级别
      },
      selectIndex: 0,
      routerQuery: null,
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
    ...mapGetters(['getBudgetYear', 'bizList']),
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
        importUrl: '/collectrate/rateImp',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getSelectList('rentLevel')
    this.getSelectList('rentIncomeType')
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
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum,
        bean: {
          ...this.query,
          budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
        }
      };
      this.isEdit = false;
      await SummaryApi.rentpointsList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    async getSelectList(type) {
      const params = {
        selectType: type
      }
      await GlobalApi.getSelectList(params).then(res => {
        if (res.code === 0) {
          if (type == 'rentLevel') {//级别
            this.levelList = res.data
          } else if (type == 'rentIncomeType') {//收入类型
            this.incomeTypeList = res.data
          }
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
          return row.incomeType || '-'
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
        incomeType: null, //收入类型
        bizTypeId: null, //业态
        level: null, // 级别
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
        incomeType: null, //收入类型
        bizTypeId: null, //业态
        level: null, // 级别
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
