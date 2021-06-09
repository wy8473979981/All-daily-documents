<template>
  <!-- 预算查看-收入-联营收支明细 -->
  <div class="list-page consortiumIncome">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="18">
        <el-input placeholder="请输入品牌名" size="mini" class="import-input" v-model="query.brand" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.bizTypeId" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-select v-if="!isEdit" placeholder="请选择合同状态" size="mini" v-model="query.contractStatus" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in contractList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" :disabled="query.level ? true : false" size="mini" type="success">编辑</el-button>
        <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button>
        <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column fixed min-width="320" label="基础信息" align="center">
        <el-table-column min-width="80" label="业态" show-overflow-tooltip prop="bizType">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ scope.row.bizType || '/' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="80" label="品牌名" :show-overflow-tooltip="!isEdit" prop="brand">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.brand" v-filter-check-input2 placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'brand',false,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="80" label="合同状态" :show-overflow-tooltip="!isEdit" prop="contractStatus">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.contractStatus" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'contractStatus')==1?'在营' :returnValue(scope.row,'contractStatus')==2?'免租':'/'}}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="80" label="扣率" show-overflow-tooltip prop="rate" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'rate',false,false)  }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="营业额(预估)" align="center">
        <el-table-column min-width="150" :label="`${getBudgetYear}年预算合计`" show-overflow-tooltip prop="ytd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.jan" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.feb" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.march" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.april" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.may" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.june" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.july" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.aug" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.sep" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.oct" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.nov" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.dece" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece',false,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="联营收益" align="center">
        <el-table-column min-width="150" :label="`${getBudgetYear}年预算合计`" show-overflow-tooltip prop="profitYtd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="profitJan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitJan" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitJan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="profitFeb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitFeb" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitFeb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="profitMarch" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitMarch" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitMarch') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="profitApril" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitApril" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitApril') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="profitMay" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitMay" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitMay') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="profitJune" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitJune" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitJune') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="profitJuly" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitJuly" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitJuly') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="profitAug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitAug" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitAug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="profitSep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitSep" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitSep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="profitOct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitOct" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitOct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="profitNov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitNov" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitNov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="profitDec" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.profitDec" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'profitDec') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="联营支出" align="center">
        <el-table-column min-width="150" :label="`${getBudgetYear}年预算合计`" show-overflow-tooltip prop="payYtd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'payYtd') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="payJan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payJan" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payJan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="payFeb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payFeb" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payFeb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="payMarch" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payMarch" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payMarch') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="payApril" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payApril" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payApril') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="payMay" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payMay" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payMay') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="payJune" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payJune" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payJune') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="payJuly" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payJuly" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payJuly') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="payAug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payAug" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payAug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="paySep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.paySep" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'paySep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="payOct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payOct" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payOct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="payNov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payNov" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payNov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="payDec" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-filter-check-input maxlength="12" v-model="scope.row.payDec" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'payDec') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="160" :label="`${getBudgetYear+1}年营业额递增率`" show-overflow-tooltip prop="nextRate" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'nextRate') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="140" :label="`${getBudgetYear+1}年营业额`" show-overflow-tooltip prop="nextTurnover" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'nextTurnover') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" :label="`${getBudgetYear+1}年联营支出`" show-overflow-tooltip prop="nextPay" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'nextPay') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="160" :label="`${getBudgetYear+2}年营业额递增率`" show-overflow-tooltip prop="afterRate" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'afterRate') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" :label="`${getBudgetYear+2}年营业额`" show-overflow-tooltip prop="afterTurnover" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'afterTurnover') }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" :label="`${getBudgetYear+2}年联营支出`" show-overflow-tooltip prop="afterPay" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'afterPay') }}</p>
        </template>
      </el-table-column>

    </el-table>

    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
// import excel from './component/excle.vue'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import IncomeApi from '@/apis/apis/incomeApi'
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
        total: 0
      },
      query: {
        brand: null,
        bizTypeId: null,
        contractStatus: null,
      },
      bizTypeIdList: [], // 业态列表
      contractList: [],
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
          }
        },
        excelName: '联营收支明细',
        exportUrl: '/bizUnion/excelExport',
      }
    },
    importParams() {
      return {
        importUrl: '/bizUnion/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  created() {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
    this.getSelectList()
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
    // 获取业态列表
    getBizTypeList() {
      GlobalApi.getSelectList({ selectType: 'bizFormat' }).then(res => {
        if (res.code == 0) {
          res.data.forEach((item, index) => {
            res.data[index].dictCd = Number(item.dictCd)
          })
          this.bizTypeIdList = res.data
        }
      })
    },
    getSelectList() {
      // 获取合同状态
      GlobalApi.getSelectList({ selectType: 'contractStatus' }).then(res => {
        if (res.code == 0) {
          this.contractList = res.data
        }
      })
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await IncomeApi.bizUnionQuery(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          // this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // 选择一行显示input
    showInput(index) {
      this.selectIndex = index
    },
    reset() {
      this.query = {
        brand: null,
        bizTypeId: null,
        contractStatus: null,
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
      FeeScheduleApi.wageEdit(params).then(res => {
        if (res.code == 0) {
          this.getList()
          this.isEdit = false
        }
      })
    },
    //查询
    checkFilter() {
      this.pageInfo.pageNum = 1;
      this.getList()
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import "~@styles/common.scss";
.consortiumIncome {
  .import-input .el-input__inner {
    border-right-color: #468ceb;
  }
  .el-input-group__append {
    padding: 0;
    height: 25px;
    width: 29px;
    border-radius: 0;
    border-color: #468ceb;
    background: linear-gradient(
      298deg,
      rgba(70, 140, 235, 1) 0%,
      rgba(53, 171, 255, 1) 140%
    );
  }
  .el-input-group__append button.el-button {
    padding: 0px;
  }
  .tool-bar .el-icon-search::before {
    position: absolute;
    top: 4px;
    left: 5px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
