<template>
  <!-- 预算编制-汇总-企划费 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="16">
        <!-- <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" @change="bizTypeSelectFunc" v-model="query.bizTypeName" value-key="subjectId" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in selectLayoutList" :key="item.subjectId" :label="item.subjectName" :value="item">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择区域" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in levelList" :key="item.id" :label="item.dictName" :value="item.dispOrderNo">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择项目" size="mini" @change="search" v-model="query.level" filterable clearable style="margin-right: 5px; width: 180px;">
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
      <!-- <el-table-column fixed min-width="120" label="区域" show-overflow-tooltip prop="project">
        <template slot-scope="scope">
          <p>{{ getSubjectName(scope,1) }}</p>
        </template>
      </el-table-column> -->
      <el-table-column fixed min-width="140" label="项目" show-overflow-tooltip prop="project">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'project',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="建筑面积" :show-overflow-tooltip="!isEdit" prop="builtArea" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'builtArea',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="业主租金" :show-overflow-tooltip="!isEdit" prop="landlordRent" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'landlordRent',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="商业租金" :show-overflow-tooltip="!isEdit" prop="commerceRent" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'commerceRent',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="地产支付" align="center">
        <el-table-column label="按面积计提" align="center">
          <el-table-column min-width="140" label="小计" :show-overflow-tooltip="!isEdit" prop="paySubtotal" align="right">
            <template slot-scope="scope">
              <p>{{ returnValue(scope.row,'paySubtotal',true,false,'project') }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="140" label="单价" :show-overflow-tooltip="!isEdit" prop="areaUnitPrice" align="right">
            <template slot-scope="scope">
              <p>{{ returnValue(scope.row,'areaUnitPrice',true,false,'project') }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="140" label="金额" :show-overflow-tooltip="!isEdit" prop="areaAmount" align="right">
            <template slot-scope="scope">
              <p>{{ returnValue(scope.row,'areaAmount',true,false,'project') }}</p>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="按租金计提" align="center">
          <el-table-column min-width="140" label="计提比例" :show-overflow-tooltip="!isEdit" prop="rentRatePer" align="right">
            <template slot-scope="scope">
              <p>{{ returnValue(scope.row,'rentRatePer',true,false,'project',2,'%') }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="140" label="金额" :show-overflow-tooltip="!isEdit" prop="areaAmount" align="right">
            <template slot-scope="scope">
              <p>{{ returnValue(scope.row,'areaAmount',true,false,'project') }}</p>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="商业自筹" align="center">
        <el-table-column min-width="140" label="计提比例" :show-overflow-tooltip="!isEdit" prop="fundingRatePer" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'fundingRatePer',true,false,'project',2,'%') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="金额" :show-overflow-tooltip="!isEdit" prop="fundingAmount" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'fundingAmount',true,false,'project') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="160" label="地产支付+商业自筹" :show-overflow-tooltip="!isEdit" prop="payFundingTotal" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'payFundingTotal',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="调剂金额" :show-overflow-tooltip="!isEdit" prop="makeAmount" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'makeAmount',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="调剂后金额" :show-overflow-tooltip="!isEdit" prop="makeEndAmount" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'makeEndAmount',true,false,'project') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="检核" :show-overflow-tooltip="!isEdit" prop="review">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'review',true,false,'project') }}</p>
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
        paramFirst: null, // 业态
        bizTypeName: null, // 业态名称
        level: null// 级别
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
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      };
      this.isEdit = false;
      await SummaryApi.qhfList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data
          // this.tableData = res.data.list
          // this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
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
          return row.project || '-'
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
</style>
