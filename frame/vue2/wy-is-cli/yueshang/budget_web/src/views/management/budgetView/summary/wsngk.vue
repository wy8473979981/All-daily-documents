<template>
  <div class="list-page wsn-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="20">
        <el-select placeholder="请选择物业类型" v-model="bizTypeId" filterable clearable size="mini" :value="1" style="margin-right: 5px; width: 150px;" @change="checkFilter">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="bizType in storeChargeTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="24">
      <el-col :span="24" class="topRight-col table-col"> -->
    <el-table ref="table" :data="statData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight">
      <el-table-column show-overflow-tooltip fixed label="点位类型" prop="multiTypeName" min-width="100">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'multiTypeName',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip fixed label="点位数" prop="multiTotal" min-width="100">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'multiTotal',true,false,'multiTypeName',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip fixed label="总面积（㎡）" align="right" prop="areaTotal" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'areaTotal',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="已编制点位数" align="right" prop="editCount" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'editCount',true,false,'multiTypeName',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="未编制点位数" align="right" prop="notEditCount" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'notEditCount',true,false,'multiTypeName',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="获得收益点位数" align="right" prop="multiTotalProfit" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'multiTotalProfit',true,false,'multiTypeName',0) }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="出租率" align="right" prop="rentalRate" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'rentalRate',true,false,'multiTypeName',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="总收入（元）" align="right" prop="budgetTotal" min-width="120">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'budgetTotal',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="1月" align="right" prop="janZj" min-width="100">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'janZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="2月" align="right" prop="febZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'febZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="3月" align="right" prop="marchZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'marchZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="4月" align="right" prop="aprilZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'aprilZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="5月" align="right" prop="mayZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'mayZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="6月" align="right" prop="juneZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'juneZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="7月" align="right" prop="julyZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'julyZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="8月" align="right" prop="augZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'augZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="9月" align="right" prop="sepZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'sepZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="10月" align="right" prop="octZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'octZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="11月" align="right" prop="novZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'novZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="12月" align="right" prop="deceZj" min-width="100">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'deceZj',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="`${getBudgetYearNumber+1}VS${getBudgetYearNumber}递增率`" align="right" prop="towIncreasingRate" min-width="150">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'towIncreasingRate',true,false,'multiTypeName',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="`${getBudgetYear+1}`" align="right" prop="towYearAmt" min-width="150">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'towYearAmt',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="`${getBudgetYearNumber+2}VS${getBudgetYearNumber+1}递增率`" align="right" prop="thirdIncreasingRate" min-width="150">
        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'thirdIncreasingRate',true,false,'multiTypeName',2,'%') }}</p>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="`${getBudgetYear+2}`" align="right" prop="thirdYearAmt" min-width="150">

        <template slot-scope="scope">
          <p>{{ returnValue(scope.row,'thirdYearAmt',true,false,'multiTypeName') }}</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-col>
    </el-row> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { toThousandsClean, getDynamicTableHeight, rTime, returnValue } from '@/utils/index'
import WsnApi from '@/apis/apis/wsnApi'
export default {
  data () {
    return {
      annual: parseInt(this.$route.query.annual),
      bizTypeId: '',
      statData: [],
      routerQuery: this.$route.query
    }
  },
  props: ['showMore', 'owingMoneyList'],
  created () {
    this.wsngkList(this.chargeType)
  },
  computed: {
    ...mapGetters([
      'storeChargeTypeList', 'getBudgetYear', 'getBudgetYearNumber'
    ])
  },
  methods: {
    returnValue,
    checkFilter () {
      this.wsngkList(this.chargeType)
    },
    async wsngkList () {
      let params = {
        "bizTypeId": this.bizTypeId,
        "budgetInstanceSheetId": this.$route.query.budgetInstanceSheetId
      }
      await WsnApi.wsngkList(params).then(res => {
        if (res.code === 0 && res.data) {
          this.statData = res.data
          getDynamicTableHeight(this)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@styles/common.scss";
.select-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
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
