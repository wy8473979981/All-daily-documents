<template>
  <!-- 预算查看-经营费用 -->
  <div class="list-page rentClearMassage">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="21">
        <el-input placeholder="请输入租户名称" size="mini" class="import-input" v-model="pageInfo.bean.shopName" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-select placeholder="请选择物业类型" size="mini" filterable clearable v-model="pageInfo.bean.chargeType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in chargeTypeList" :label="bizType.dictName" :value="bizType.dictCd" :key="bizType.dictCd"></el-option>
        </el-select>
        <el-select placeholder="请选择欠费类型" size="mini" filterable clearable v-model="pageInfo.bean.oweType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in oweTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-button size="mini" @click="clearFilter">重置</el-button>
        <!-- <el-select placeholder="请选择合同类型" size="mini" filterable clearable v-model="pageInfo.bean.contType" @change="checkFilter" style="margin-right: 5px; width: 150px;">
          <el-option v-for="bizType in contTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select> -->
      </el-col>
      <el-col :span="3" class="operation">
        <excel :params="pageInfo" type="住宅/写字楼清欠" url="/bizClearoweZx/excelExport"></excel>
        <!-- <Import :params="pageInfo" @update="getList"></Import> -->
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column label="物业类型" show-overflow-tooltip fixed prop="chargeTypeName"></el-table-column>
      <el-table-column label="产权性质" show-overflow-tooltip fixed prop="assetAttrName"></el-table-column>
      <el-table-column label="租户名称" show-overflow-tooltip fixed prop="shopName"></el-table-column>
      <el-table-column label="欠费类型" show-overflow-tooltip prop="oweTypeName"></el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="租金欠费期间" show-overflow-tooltip prop="contNo" align="center">
        <el-table-column :label="`${getBudgetYear-4}及以前年度欠费`" align="right" prop="oweZjAll4" min-width="160">
          <template slot-scope="scope">
            <span>{{scope.row.oweZjAll4  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-3}年欠费`" align="right" show-overflow-tooltip prop="oweZj3" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweZj3  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-2}年欠费`" align="right" show-overflow-tooltip prop="oweZj2" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweZj2  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-1}年欠费`" align="right" show-overflow-tooltip prop="oweZj1" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweZj1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`截至${getBudgetYear-1}年底欠费合计`" align="right" show-overflow-tooltip prop="oweZjAll1" min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.oweZjAll1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年月清欠计划`" show-overflow-tooltip align="center">
        <el-table-column label="1月" align="right" show-overflow-tooltip prop="janZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.janZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="2月" align="right" show-overflow-tooltip prop="febZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.febZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="3月" align="right" show-overflow-tooltip prop="marchZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.marchZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="4月" align="right" show-overflow-tooltip prop="aprilZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.aprilZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="5月" align="right" show-overflow-tooltip prop="mayZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.mayZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="6月" align="right" show-overflow-tooltip prop="juneZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.juneZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="7月" align="right" show-overflow-tooltip prop="julyZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.julyZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="8月" align="right" show-overflow-tooltip prop="augZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.augZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="9月" align="right" show-overflow-tooltip prop="sepZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.sepZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="10月" align="right" show-overflow-tooltip prop="octZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.octZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="11月" align="right" show-overflow-tooltip prop="novZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.novZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="12月" align="right" show-overflow-tooltip prop="deceZj" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.deceZj  | micrometerLevel}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweZj1" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweZj1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+1}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweZj2" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweZj2  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+2}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweZj3" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweZj3  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="未清欠金额" align="right" show-overflow-tooltip prop="noClearOweZj" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.noClearOweZj  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="物管费欠费期间" show-overflow-tooltip align="center">
        <el-table-column :label="`${getBudgetYear-4}及以前年度欠费`" align="right" show-overflow-tooltip prop="oweWgAll4" min-width="160">
          <template slot-scope="scope">
            <span>{{scope.row.oweWgAll4  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-3}年欠费`" align="right" show-overflow-tooltip prop="oweWg3" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweWg3  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-2}年欠费`" align="right" show-overflow-tooltip prop="oweWg2" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweWg2  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-1}年欠费`" align="right" show-overflow-tooltip prop="oweWg1" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweWg1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`截至${getBudgetYear-1}年底欠费合计`" align="right" show-overflow-tooltip prop="oweWgAll1" min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.oweWgAll1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年月清欠计划`" show-overflow-tooltip align="center">
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
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweWg1" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweWg1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+1}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweWg2" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweWg2  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+2}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweWg3" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweWg3  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column label="未清欠金额" align="right" show-overflow-tooltip prop="noClearOweWg" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.noClearOweWg  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="能源欠费期间" show-overflow-tooltip align="center">
        <el-table-column :label="`${getBudgetYear-4}及以前年度欠费`" align="right" show-overflow-tooltip prop="oweNyAll4" min-width="160">
          <template slot-scope="scope">
            <span>{{scope.row.oweNyAll4  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-3}年欠费`" align="right" show-overflow-tooltip prop="oweNy3" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweNy3  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-2}年欠费`" align="right" show-overflow-tooltip prop="oweNy2" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweNy2  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`${getBudgetYear-1}年欠费`" align="right" show-overflow-tooltip prop="oweNy1" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.oweNy1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="`截至${getBudgetYear-1}年底欠费合计`" align="right" show-overflow-tooltip prop="oweNyAll1" min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.oweNyAll1  | micrometerLevel}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年月清欠计划`" show-overflow-tooltip align="center">
        <el-table-column label="1月" align="right" show-overflow-tooltip prop="janNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.janNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="2月" align="right" show-overflow-tooltip prop="febNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.febNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="3月" align="right" show-overflow-tooltip prop="marchNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.marchNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="4月" align="right" show-overflow-tooltip prop="aprilNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.aprilNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="5月" align="right" show-overflow-tooltip prop="mayNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.mayNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="6月" align="right" show-overflow-tooltip prop="juneNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.juneNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="7月" align="right" show-overflow-tooltip prop="julyNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.julyNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="8月" align="right" show-overflow-tooltip prop="augNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.augNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="9月" align="right" show-overflow-tooltip prop="sepNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.sepNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="10月" align="right" show-overflow-tooltip prop="octNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.octNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="11月" align="right" show-overflow-tooltip prop="novNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.novNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="12月" align="right" show-overflow-tooltip prop="deceNy" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.deceNy  | micrometerLevel}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweNy1" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweNy1  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+1}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweNy2" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweNy2  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`${getBudgetYear+2}年清欠目标`" align="right" show-overflow-tooltip prop="clearOweNy3" min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.clearOweNy3  | micrometerLevel}}</span>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column :label="`${getBudgetYear}年月累计清欠率`" show-overflow-tooltip align="center">
        <el-table-column label="1月" align="right" show-overflow-tooltip prop="janRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.janRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="2月" align="right" show-overflow-tooltip prop="febRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.febRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="3月" align="right" show-overflow-tooltip prop="marchRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.marchRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="4月" align="right" show-overflow-tooltip prop="aprilRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.aprilRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="5月" align="right" show-overflow-tooltip prop="mayRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.mayRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="6月" align="right" show-overflow-tooltip prop="juneRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.juneRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="7月" align="right" show-overflow-tooltip prop="julyRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.julyRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="8月" align="right" show-overflow-tooltip prop="augRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.augRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="9月" align="right" show-overflow-tooltip prop="sepRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.sepRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="10月" align="right" show-overflow-tooltip prop="octRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.octRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="11月" align="right" show-overflow-tooltip prop="novRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.novRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="12月" align="right" show-overflow-tooltip prop="deceRate" min-width="140">
          <template slot-scope="scope">
            <span>{{scope.row.deceRate  | micrometerLevel}}</span>
          </template>
        </el-table-column>
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
  data () {
    return {
      storeChargeType: '',
      tableData: [],
      routerQuery: this.$route.query,
      pageInfo: {
        importUrl: '/bizClearoweZx/excelImport',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": '',//物业类型
          //"contType": "",//"1","现有合同" "2","新增交房" "3","地产支付" "3","地产支付" "4","政策减免" "5","营销减免"
          "shopName": "",//租户名称
          "oweType": ''
        },
      },
    }
  },
  created () {
    this.routerQuery = this.$route.query;
    this.getList();
  },
  components: { excel, Import },
  computed: {
    ...mapGetters([
      'multiTypeList',
      'contTypeList',
      'oweTypeList',
      'storeChargeTypeList',
      'chargeTypeList',
      'getBudgetYear'
    ])
  },
  methods: {
    //重置
    clearFilter () {
      this.pageInfo = {
        importUrl: '/bizClearoweZx/excelImport',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          "annual": this.$route.query.annual,
          "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId,
          "chargeType": '',//物业类型
          //"contType": "",//"1","现有合同" "2","新增交房" "3","地产支付" "3","地产支付" "4","政策减免" "5","营销减免"
          "shopName": "",//租户名称
          "oweType": ''
        },
      }
      this.getList()
    },
    //查询
    checkFilter () {
      this.pageInfo.pageNum = 1;
      this.getList()
    },
    // 查询列表
    async getList () {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.bizClearoweZxFind(params).then(res => {
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
.rentClearMassage {
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
