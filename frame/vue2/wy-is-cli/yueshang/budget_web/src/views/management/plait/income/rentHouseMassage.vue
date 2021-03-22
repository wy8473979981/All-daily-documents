<template>
  <!-- 预算查看-经营费用 -->
  <div class="list-page rentHouseMassage">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">

      <el-col :span="21" v-if="$route.query.chargeType == 5">
        <el-input placeholder="请输入楼号" size="mini" class="import-input" v-model="pageInfo.bean.buildingNum" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-select placeholder="请选择楼层" size="mini" filterable clearable v-model="pageInfo.bean.floorNum" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in floorList" :label="bizType.dictName" :value="bizType.dictCd" :key="bizType.dictCd"></el-option>
        </el-select>
        <el-select placeholder="请选择合同类型" size="mini" filterable clearable v-model="pageInfo.bean.contType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in contTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-button size="mini" @click="clearFilter">重置</el-button>
      </el-col>
      <el-col :span="21" v-else>
        <el-input placeholder="请输入住宅号" size="mini" class="import-input" v-model="pageInfo.bean.storeNo" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-select placeholder="请选择住宅类型" size="mini" filterable clearable v-model="pageInfo.bean.chargeType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in houseTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择合同类型" size="mini" filterable clearable v-model="pageInfo.bean.contType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in contTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-button size="mini" @click="clearFilter">重置</el-button>
      </el-col>

      <el-col :span="3" class="operation">
        <excel :params="pageInfo" type="租费明细_住宅/写字楼" url="/bizLeaseZx/excelExport"></excel>
        <!-- <Import :params="pageInfo" @update="getList"></Import> -->
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column label="住宅号码" show-overflow-tooltip fixed prop="storeNo" v-if="$route.query.chargeType == 3"></el-table-column>
      <el-table-column label="住宅类型" show-overflow-tooltip fixed prop="chargeTypeName" v-if="$route.query.chargeType == 3"></el-table-column>
      <el-table-column label="楼号" show-overflow-tooltip fixed prop="buildingNum" v-if="$route.query.chargeType == 5"></el-table-column>
      <el-table-column label="层号" show-overflow-tooltip fixed prop="floorNum" v-if="$route.query.chargeType == 5"></el-table-column>
      <el-table-column label="合同类型" show-overflow-tooltip prop="contTypeName"></el-table-column>
      <el-table-column label="住宅交付计费起始期" show-overflow-tooltip min-width="150">
        <template slot-scope="scope">
          {{scope.row.contStartDate | timeYearMathDay}}
        </template>
      </el-table-column>
      <el-table-column label="建筑面积（㎡）" align="right" show-overflow-tooltip prop="square" min-width="140"></el-table-column>
      <el-table-column label="计费月数" align="right" show-overflow-tooltip prop="countMonth"></el-table-column>
      <el-table-column label="单价(元/月/㎡)" align="right" show-overflow-tooltip prop="stdUnitPrice" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.stdUnitPrice  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="物管费合计" align="right" show-overflow-tooltip prop="wgIncome" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.wgIncome  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="1月物管" align="right" show-overflow-tooltip prop="janWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.janWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="2月物管" align="right" show-overflow-tooltip prop="febWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.febWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="3月物管" align="right" show-overflow-tooltip prop="marchWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.marchWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="4月物管" align="right" show-overflow-tooltip prop="aprilWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.aprilWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="5月物管" align="right" show-overflow-tooltip prop="mayWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.mayWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="6月物管" align="right" show-overflow-tooltip prop="juneWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.juneWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="7月物管" align="right" show-overflow-tooltip prop="julyWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.julyWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="8月物管" align="right" show-overflow-tooltip prop="augWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.augWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="9月物管" align="right" show-overflow-tooltip prop="sepWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.sepWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="10月物管" align="right" show-overflow-tooltip prop="octWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.octWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="11月物管" align="right" show-overflow-tooltip prop="novWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.novWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="12月物管" align="right" show-overflow-tooltip prop="deceWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.deceWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip prop="remark" min-width="200"></el-table-column>
      <el-table-column :label="getBudgetYear+1+'月物管费递增率'" align="right" show-overflow-tooltip prop="nextIncreasingRateWg1" min-width="160"></el-table-column>
      <el-table-column :label="getBudgetYear+1+'年计租月数'" align="right" show-overflow-tooltip prop="nextCountMonth1" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+1+'物管费金额'" align="right" show-overflow-tooltip prop="nextWgIncome1" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.nextWgIncome1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="getBudgetYear+2+'年物管费递增率'" align="right" show-overflow-tooltip prop="nextIncreasingRateWg2" min-width="160"></el-table-column>
      <el-table-column :label="getBudgetYear+2+'年计租月数'" align="right" show-overflow-tooltip prop="nextCountMonth2" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+2+'年物管费金额'" align="right" show-overflow-tooltip prop="nextWgIncome2" min-width="160">
        <template slot-scope="scope">
          <span>{{scope.row.nextWgIncome2  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="全年预计收缴率" align="right" show-overflow-tooltip prop="completionRate" min-width="140"></el-table-column>
      <el-table-column label="1月累计收缴率" align="right" show-overflow-tooltip prop="completionRateJanWg" min-width="140"></el-table-column>
      <el-table-column label="2月累计收缴率" align="right" show-overflow-tooltip prop="completionRateFebWg" min-width="140"></el-table-column>
      <el-table-column label="3月累计收缴率" align="right" show-overflow-tooltip prop="completionRateMarchWg" min-width="140"></el-table-column>
      <el-table-column label="4月累计收缴率" align="right" show-overflow-tooltip prop="completionRateAprilWg" min-width="140"></el-table-column>
      <el-table-column label="5月累计收缴率" align="right" show-overflow-tooltip prop="completionRateMayWg" min-width="140"></el-table-column>
      <el-table-column label="6月累计收缴率" align="right" show-overflow-tooltip prop="completionRateJuneWg" min-width="140"></el-table-column>
      <el-table-column label="7月累计收缴率" align="right" show-overflow-tooltip prop="completionRateJulyWg" min-width="140"></el-table-column>
      <el-table-column label="8月累计收缴率" align="right" show-overflow-tooltip prop="completionRateAugWg" min-width="140"></el-table-column>
      <el-table-column label="9月累计收缴率" align="right" show-overflow-tooltip prop="completionRateSepWg" min-width="140"></el-table-column>
      <el-table-column label="10月累计收缴率" align="right" show-overflow-tooltip prop="completionRateOctWg" min-width="140"></el-table-column>
      <el-table-column label="11月累计收缴率" align="right" show-overflow-tooltip prop="completionRateNovWg" min-width="140"></el-table-column>
      <el-table-column label="12月累计收缴率" align="right" show-overflow-tooltip prop="completionRateDeceWg" min-width="140"></el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import excel from './components/excle.vue'
import Import from '@/components/import.vue'
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import LeaseApi from '@/apis/apis/leaseApi'
import { mapGetters } from "vuex";
export default {
  mixins: [handle_paginator],
  data() {
    return {
      annual: parseInt(this.$route.query.annual),
      floorList: [],
      tableData: [],
      routerQuery: this.$route.query,
      pageInfo: {
        importUrl: this.$route.query.chargeType == 3 ? '/bizLeaseZx/excelImportZz' : 'bizLeaseZx/excelImportXzl',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": null,
          "contType": '',
          "houseType": '',
          "buildingNum": '',
          "floorNum": ''
        },
      },
    }
  },
  created() {
    this.routerQuery = this.$route.query;
    this.getList();
    this.getFloorList()
  },
  components: { excel, Import },
  computed: {
    ...mapGetters([
      'contractTypeList',
      'houseTypeList',
      'contTypeList',
      'getBudgetYear'
    ])
  },
  methods: {
    //重置
    clearFilter() {
      this.pageInfo = {
        importUrl: this.$route.query.chargeType == 3 ? '/bizLeaseZx/excelImportZz' : 'bizLeaseZx/excelImportXzl',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": '',
          "contType": '',
          "houseType": '',
          "buildingNum": '',
          "floorNum": ''
        },
      }
      this.getList();
    },
    //查询
    checkFilter() {
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    // 查询列表
    async getList() {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.bizLeaseZxFind(params).then(res => {
        if (res.code === 0 && res.data) {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total;
          getDynamicTableHeight(this);
        }
      })
    },
    async getFloorList() {
      await LeaseApi.getFloorList().then(res => {
        if (res.code === 0 && res.data) {
          this.floorList = res.data;
        }
      })
    }
  },
  filters: {
    //时间转换
    timeYearMathDay(val) {
      if (val) {
        var date = new Date(val);
        return date.format("yyyy-MM-dd")
      } else {
        return '-'
      }
    },
  }
}
</script>

<style type="text/css" lang="scss"  scoped>
@import "~@styles/common.scss";
.rentHouseMassage {
  .el-input-group__append {
    padding: 0;
    height: 25px;
    width: 29px;
    border-radius: 0;
    border-color: #468ceb;
    background: linear-gradient(
      298deg,
      rgba(70, 140, 235, 1) 0%,
      rgba(53, 171, 255, 1) 100%
    );
  }
  .operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  ::v-deep .import-input .el-input__inner {
    border-right-color: #468ceb;
  }
  ::v-deep .el-input-group__append {
    padding: 0;
    height: 25px;
    width: 29px;
    border-radius: 0;
    border-color: #468ceb;
    background: linear-gradient(
      298deg,
      rgba(70, 140, 235, 1) 0%,
      rgba(53, 171, 255, 1) 100%
    );
  }
  ::v-deep .el-input-group__append button.el-button {
    padding: 0px;
  }
  ::v-deep .tool-bar .el-icon-search::before {
    position: absolute;
    top: 4px;
    left: 5px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
