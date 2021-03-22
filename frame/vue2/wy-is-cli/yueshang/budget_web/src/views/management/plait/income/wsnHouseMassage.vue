<template>
  <!-- 预算查看-经营费用 -->
  <div class="list-page wsnHouseMassage">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="21">
        <el-input placeholder="请输入点位编号" size="mini" class="import-input" v-model="pageInfo.bean.storeNo" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <!-- <el-select placeholder="请选择合同类型" size="mini" filterable clearable v-model="pageInfo.bean.contType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in contTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select> -->
        <el-select placeholder="请选择点位类型" size="mini" filterable clearable v-model="pageInfo.bean.multiType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in zxMultiTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-button size="mini" @click="clearFilter">重置</el-button>
      </el-col>
      <el-col :span="3" class="operation">
        <excel :params="pageInfo" type="多经住宅/写字楼" url="/bizLeaseMulti/excelExport"></excel>
        <!-- <Import :params="pageInfo" @update="getList"></Import> -->
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column label="点位编号" show-overflow-tooltip fixed prop="storeNo" min-width="140"></el-table-column>
      <el-table-column label="点位类型" show-overflow-tooltip prop="multiTypeName" min-width="140"></el-table-column>
      <el-table-column label="多经位置" show-overflow-tooltip min-width="140">
        <template slot-scope="scope">
          {{scope.row.buildingNum}}-{{scope.row.floorNum}}
        </template>
      </el-table-column>
      <el-table-column label="经营业态" show-overflow-tooltip prop="layoutCdName" min-width="140">
        <template slot-scope="scope">
          {{scope.row.layoutCd ? scope.row.layoutCd : scope.row.layoutCdName}}
        </template>
      </el-table-column>
      <el-table-column label="合约期限" show-overflow-tooltip prop="term" min-width="140"></el-table-column>
      <el-table-column label="租赁面积（㎡）" align="right" show-overflow-tooltip prop="square" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear-1+'年实际（元/月）'" align="right" show-overflow-tooltip prop="unitPrice" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+'年月均收益（元/月）'" align="right" show-overflow-tooltip prop="expectUnitPrice" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+'年合计'" align="right" show-overflow-tooltip prop="nextWgIncome1" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.nextWgIncome1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="1月" align="right" show-overflow-tooltip prop="janWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.janWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="2月" align="right" show-overflow-tooltip prop="febWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.febWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="3月" align="right" show-overflow-tooltip prop="marchWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.marchWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="4月" align="right" show-overflow-tooltip prop="aprilWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.aprilWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="5月" align="right" show-overflow-tooltip prop="mayWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.mayWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="6月" align="right" show-overflow-tooltip prop="juneWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.juneWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="7月" align="right" show-overflow-tooltip prop="julyWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.julyWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="8月" align="right" show-overflow-tooltip prop="augWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.augWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="9月" align="right" show-overflow-tooltip prop="sepWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.sepWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="10月" align="right" show-overflow-tooltip prop="octWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.octWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="11月" align="right" show-overflow-tooltip prop="novWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.novWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="12月" align="right" show-overflow-tooltip prop="deceWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.deceWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="getBudgetYear+1+'月租金递增率'" show-overflow-tooltip prop="nextIncreasingRateWg1" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+1+'可实现收益（月数）'" show-overflow-tooltip prop="nextCountMonth1" min-width="140"></el-table-column>
      <el-table-column :label="(getBudgetYear+1).toString()" align="right" show-overflow-tooltip prop="nextWgIncome1">
        <template slot-scope="scope">
          <span>{{scope.row.nextWgIncome1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="getBudgetYear+2+'月租金递增率'" show-overflow-tooltip prop="nextIncreasingRateWg2" min-width="140"></el-table-column>
      <el-table-column :label="getBudgetYear+2+'可实现收益（月数）'" show-overflow-tooltip prop="nextCountMonth2" min-width="140"></el-table-column>
      <el-table-column :label="(getBudgetYear+2).toString()" align="right" show-overflow-tooltip prop="nextWgIncome2" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.nextWgIncome2  | micrometerLevel}}</span>
        </template>
      </el-table-column>
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
      tableData: [],
      routerQuery: this.$route.query,
      pageInfo: {
        importUrl: '/bizLeaseMulti/excelImport',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": this.$route.query.chargeType,//物业类型 3住宅 5写字楼
          "contType": "",//"1","现有合同" "2","新增交房" "3","地产支付" "3","地产支付" "4","政策减免" "5","营销减免"
          "multiType": "",//多经类型
          "storeNo": "",//铺位编号
          "zxMultiType": ''//多经类型
        },
      },
    }
  },
  components: { excel, Import },
  created() {
    this.routerQuery = this.$route.query;
    this.getList();
  },
  computed: {
    ...mapGetters([
      'multiTypeList',
      'contTypeList',
      'zxMultiTypeList',
      'getBudgetYear'
    ])
  },
  methods: {
    //重置
    clearFilter() {
      this.pageInfo = {
        importUrl: '/bizLeaseMulti/excelImport',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": this.$route.query.chargeType,//物业类型 3住宅 5写字楼
          "contType": "",//"1","现有合同" "2","新增交房" "3","地产支付" "3","地产支付" "4","政策减免" "5","营销减免"
          "multiType": "",//多经类型
          "storeNo": "",//铺位编号
          "zxMultiType": ''//多经类型
        },
      },
        this.getList()
    },
    //查询
    checkFilter() {
      this.pageInfo.pageNum = 1;
      this.getList()
    },
    // 查询列表
    async getList() {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.bizLeaseMultiFind(params).then(res => {
        if (res.code === 0 && res.data) {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total;
          getDynamicTableHeight(this);
        }
      })
    },
  }
}
</script>

<style type="text/css" lang="scss"  scoped>
@import "~@styles/common.scss";
.wsnHouseMassage {
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
