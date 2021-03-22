<template>
  <!-- 预算编制-汇总-物业多经概况 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="16">
        <el-select placeholder="请选择业态" filterable clearable size="mini" v-model="query.mallType" style="margin-right: 5px; width: 150px;" @change="search()">
          <el-option v-for="bizType in wyBizTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择点位类型" filterable clearable size="mini" v-model="query.pointType" style="margin-right: 5px; width: 150px;" @change="search()">
          <el-option v-for="bizType in zxMultiTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
      </el-col>
    </el-row>

    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="120" label="业态" show-overflow-tooltip prop="mallTypeVal">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'mallTypeVal',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="120" label="类别" show-overflow-tooltip prop="pointTypeVal">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'pointTypeVal',false,false,'mallTypeVal') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="点位数" show-overflow-tooltip prop="pointNum" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'pointNum',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="获得收益点位数" show-overflow-tooltip prop="earningPointNum" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'earningPointNum',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" label="出租率" show-overflow-tooltip prop="lettingRate" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'lettingRate',true,false,'mallTypeVal',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear}年度预算合计`" show-overflow-tooltip prop="budgetNextYear" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetNextYear',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="budgetJan" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetJan',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="budgetFeb" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetFeb',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="budgetMarch" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetMarch',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="budgetApril" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetApril',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="budgetMay" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetMay',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="budgetJune" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetJune',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="budgetJuly" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetJuly',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="budgetAugust" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetAugust',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="budgetSep" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetSep',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="budgetOct" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetOct',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="budgetNov" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetNov',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="budgetDec" align="right">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetDec',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYearNumber+1}VS${getBudgetYearNumber}递增率`" show-overflow-tooltip prop="budgetIncrease" align="right">
        <template slot-scope="scope">
          <p>{{returnValue(scope.row,'budgetIncrease',true,false,'mallTypeVal',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear+1}`" show-overflow-tooltip prop="budgetNextTwoYear" align="right">
        <template slot-scope="scope">
          <p>{{returnValue(scope.row,'budgetNextTwoYear',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYearNumber+2}VS${getBudgetYearNumber+1}递增率`" show-overflow-tooltip prop="budgetIncrease2" align="right">
        <template slot-scope="scope">
          <p>{{returnValue(scope.row,'budgetIncrease2',true,false,'mallTypeVal',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="170" :label="`${getBudgetYear+2}`" show-overflow-tooltip prop="budgetNextThreeYear" align="right">
        <template slot-scope="scope">
          <p>{{returnValue(scope.row,'budgetNextThreeYear',true,false) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import WsnApi from '@/apis/apis/wsnApi'
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
        mallType: null, // 业态
        pointType: null, // 点位
      },
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
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
    ...mapGetters(['getBudgetYear', 'getBudgetYearNumber', 'storeChargeTypeList', 'zxMultiTypeList', 'wyBizTypeList']),
    // exportParams() {
    //   return {
    //     bean: {
    //       ...this.routerQuery,
    //       ...this.query,
    //       type: 12
    //     }
    //   }
    // },
    // importParams() {
    //   return {
    //     importUrl: '/bizFee/ExcelImport',
    //     budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
    //     type: 12
    //   }
    // }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getList()
  },
  mounted() {

  },
  // 日期转换格式
  filters: {

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
      await WsnApi.collectWydjWsngkList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = []
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          getDynamicTableHeight(this)
        }
      })
    },
    // async getSelectList(type) {
    //   const params = {
    //     selectType: type
    //   }
    //   await GlobalApi.getSelectList(params).then(res => {
    //     if (res.code === 0) {
    //       this.pointList = res.data
    //     }
    //   })
    // },
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
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    reset() {
      this.query = {
        mallType: null, // 业态
        pointType: null, // 点位
      }
      this.getList()
    },
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
