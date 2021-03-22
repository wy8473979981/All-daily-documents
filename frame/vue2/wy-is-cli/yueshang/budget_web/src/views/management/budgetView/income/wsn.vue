<template>
  <!-- 预算查看-多经收入-商业 -->
  <div class="list-page wsn-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <!-- <el-col class="select-title" :span="24">
        <div class="select-cutover">
          <span v-if="routerQuery.bunk" @click="$router.push({path: '/management/budgetView/lease/index',query:routerQuery})">租费收入-商业</span>
          <span v-if="routerQuery.mutibiz" class="select-blue">多经收入-商业</span>
		      <span v-if="routerQuery.office" @click="$router.push({path: '/management/budgetView/lease/houseMassage',query:routerQuery})">住宅/写字楼</span>
          <span v-if="routerQuery.proplan" @click="$router.push({path: '/management/budgetView/feeSchedule/index',query:routerQuery})">管理及企划费用表</span>
          <span v-if="routerQuery.mandate" @click="$router.push({path: '/management/budgetView/otherIncome',query:routerQuery})">其他收入表</span>
        </div>
        <div class="select-data">
          <p>（金额：元/面积：平）</p>
        </div>
      </el-col> -->
      <el-col :span="20">
        <el-input placeholder="请输入多经编号" size="mini" class="import-input" v-model="pageInfo.bean.storeNo" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-select placeholder="请选择物业类型" filterable clearable size="mini" v-model="pageInfo.bean.chargeType" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in storeChargeTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择点位类型" filterable clearable size="mini" v-model="pageInfo.bean.multiType" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in multiTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <!-- <el-select placeholder="请选择合同类型" filterable clearable size="mini" v-model="pageInfo.bean.contractTyp" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in contractTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="单价是否低于标准单价" filterable clearable size="mini"style="margin-right: 5px; width: 150px;" @change="checkFilter()" v-model="pageInfo.bean.upltsp">
          <el-option  label="是" :value="1" :key="1"></el-option>
          <el-option  label="否" :value="2" :key="2"></el-option>
        </el-select>
        <el-select placeholder="编制状态" filterable clearable size="mini" v-model="pageInfo.bean.updateType" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option  label="已编辑" :value="1" :key="1"></el-option>
          <el-option  label="未编辑" :value="2" :key="2"></el-option>
        </el-select> -->
        <el-button size="mini" @click="clearFilter">重置</el-button>
      </el-col>
      <el-col :span="4" class="operation">
        <!-- <el-button size="mini" type="success">同步</el-button> -->
        <excel :params="pageInfo" type="多经收入-商业"></excel>
        <el-button size="mini" type="text" class="filter-icon" @click="display = true"></el-button>
      </el-col>
    </el-row>
    <el-row>
      点位数{{stat.multiTotal || 0}}个；总面积{{stat.areaTotal || 0}}㎡；总收入{{stat.amountTotal || 0}}元，1月{{stat.janZj || 0}}元，2月{{stat.febZj || 0}}元，3月{{stat.marchZj || 0}}元，4月{{stat.aprilZj || 0}}元，5月{{stat.mayZj || 0}}元，6月{{stat.juneZj || 0}}元，7月{{stat.julyZj || 0}}元，8月{{stat.augZj || 0}}元，9月{{stat.sepZj || 0}}元，10月{{stat.octZj || 0}}元，11月{{stat.novZj || 0}}元，12月{{stat.deceZj || 0}}元；
      <el-button size="mini" type="text" @click="$router.push({path: '/management/budgetView/summary/wsngk',query:routerQuery})">多经概况</el-button>
    </el-row>
    <el-table ref="table" @selection-change="handelSelecte" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :row-class-name="editRowClassName">
      <!-- <el-table-column type="selection"></el-table-column> -->
      <el-table-column show-overflow-tooltip prop="unitNo" label="多经编号" fixed width="140">
        <template slot-scope="scope">
          <span>{{scope.row.storeNo}}</span>
          <!-- <span v-if="scope.row.operType" class="operType">{{scope.row.operType == 2 ? '拆' : '合'}}</span> -->
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="基础信息" align="center" v-if="headerList.filter(item =>item.id == 1)[0].selected">
        <template slot="header">
          <span>基础信息</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 1)[0].selected ? 'left-icon':'right-icon'" @click="toggle(1)"></i>
        </template>
        <el-table-column show-overflow-tooltip prop="2" label="位置" min-width="140" v-if="headerFilter(1,1)">
          <template slot-scope="scope">
            <span v-if="scope.row.showBase">{{scope.row.floorNum || "-"}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="2" label="物业类型" min-width="140" v-if="headerFilter(1,2)">
          <template slot-scope="scope">
            <span v-if="scope.row.showBase">{{scope.row.chargeTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="multiTypeName" label="点位类型" min-width="140" v-if="headerFilter(1,3)">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="contCount" align="right" label="期间合同数量(个)" min-width="140" v-if="headerFilter(1,4)">
          <template slot-scope="scope">
            <span v-if="scope.row.showBase">{{scope.row.contCount | blank}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stdUnitPriceZj" align="right" label="标准单价(元/个/月)" min-width="140" v-if="headerFilter(1,5)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <p v-if="getMultiType(scope.row.multiType,[1,3,5])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stdUnitPriceZj" align="right" label="标准单价(元/㎡/月)" min-width="140" v-if="headerFilter(1,6)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <p v-if="getMultiType(scope.row.multiType,[8])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stdUnitPriceZj" align="right" label="平日标准单价（元/个/天）" min-width="220" v-if="headerFilter(1,7)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <p v-if="getMultiType(scope.row.multiType,[11])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="priceWeekend" align="right" label="周末标准单价（元/个/天）" min-width="220" v-if="headerFilter(1,8)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <p v-if="getMultiType(scope.row.multiType,[11])">{{scope.row.priceWeekend  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="priceHolidays" align="right" label="节假日标准单价（元/个/天）" min-width="220" v-if="headerFilter(1,9)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <p v-if="getMultiType(scope.row.multiType,[11])">{{scope.row.priceHolidays  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="5" label="面积(m²)" align="right" min-width="140" v-if="headerFilter(1,10)">
          <template slot-scope="scope">
            <span v-if="scope.row.showBase">{{scope.row.square}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="layoutCd" label="业态" min-width="140" v-if="headerFilter(1,11)">
          <template slot-scope="scope">
            <div v-if="scope.row.showBase">
              <span v-if="scope.row.layoutName">{{scope.row.layoutName}}</span>
              <span v-else>{{scope.row.layoutCdName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="initialStatus" label="期初状态" min-width="140" v-if="headerFilter(1,12)">
          <template slot-scope="scope">
            <span v-if="scope.row.showBase">{{scope.row.initialStatusName}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 1)[0].selected"></el-table-column>
      <el-table-column label="合同信息" align="center" v-if="headerList.filter(item =>item.id == 2)[0].selected">
        <template slot="header">
          <span>合同信息</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 2)[0].selected ? 'left-icon':'right-icon'" @click="toggle(2)"></i>
        </template>
        <el-table-column show-overflow-tooltip label="合同类型" prop="currContType" min-width="140" v-if="headerFilter(2,1)">
          <template slot-scope="scope">
            {{scope.row.currContTypeName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="contNo" label="合同号" min-width="150" v-if="headerFilter(2,2)">
          <template slot-scope="scope">
            {{scope.row.contNo | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合同开始日期" min-width="200" v-if="headerFilter(2,3)">
          <template slot-scope="scope">
            {{scope.row.contStartDate | timeYearMathDay}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合同结束日期" min-width="200" v-if="headerFilter(2,4)">
          <template slot-scope="scope">
            {{scope.row.contEndDate | timeYearMathDay}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="品牌" prop="shopName" min-width="240" v-if="headerFilter(2,5)">
          <template slot-scope="scope">
            <p>{{scope.row.shopName | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="支付周期" prop="payCycleCd" min-width="140" v-if="headerFilter(2,6)">
          <template slot-scope="scope">
            {{scope.row.payCycleCdName}}
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip label="月总额" min-width="100" v-if="checkList.indexOf('2') != -1">
        </el-table-column> -->
        <el-table-column show-overflow-tooltip label="多经单价(元/个/月)" align="right" prop="unitPriceZj" min-width="150" v-if="headerFilter(2,7)">
          <template slot-scope="scope">
            <el-popover trigger="hover" class="popover" placement="top" v-if="scope.row.unitPriceZj < scope.row.stdUnitPriceZj">
              <div>
                <p>单价低于标准单价</p>
                <p>标准单价：{{scope.row.stdUnitPriceZj}}</p>
                <p>合同单价：{{scope.row.unitPriceZj}}</p>
                <p>差异：{{scope.row.stdUnitPriceZj - scope.row.unitPriceZj}}</p>
              </div>
              <div slot="reference">
                <p :style="scope.row.unitPriceZj < scope.row.stdUnitPriceZj ? 'color: #ac3838:':''" v-if="getMultiType(scope.row.multiType,[1,3,5])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
                <p v-else>/</p>
              </div>
            </el-popover>
            <div v-else>
              <p v-if="getMultiType(scope.row.multiType,[1,3,5])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="多经单价(元/㎡/月)" align="right" prop="unitPriceZj" min-width="150" v-if="headerFilter(2,8)">
          <template slot-scope="scope">
            <el-popover trigger="hover" class="popover" placement="top" v-if="scope.row.unitPriceZj < scope.row.stdUnitPriceZj">
              <div>
                <p>单价低于标准单价</p>
                <p>标准单价：{{scope.row.stdUnitPriceZj}}</p>
                <p>合同单价：{{scope.row.unitPriceZj}}</p>
                <p>差异：{{scope.row.stdUnitPriceZj - scope.row.unitPriceZj}}</p>
              </div>
              <div slot="reference">
                <p :style="scope.row.unitPriceZj < scope.row.stdUnitPriceZj ? 'color: #ac3838:':''" v-if="getMultiType(scope.row.multiType,[8])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
                <p v-else>/</p>
              </div>
            </el-popover>
            <div v-else>
              <p v-if="getMultiType(scope.row.multiType,[8])">{{scope.row.stdUnitPriceZj  | micrometerLevel}}</p>
              <p v-else>/</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="平日单价(元/个/天)" align="right" prop="unitPriceZj" min-width="150" v-if="headerFilter(2,9)">
          <template slot-scope="scope">
            <p v-if="getMultiType(scope.row.multiType,[11]) || scope.row.multiType == ''">{{scope.row.unitPriceZj  | micrometerLevel}}</p>
            <p v-else>/</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="周末单价(元/个/天)" align="right" prop="unitPriceZj" min-width="150" v-if="headerFilter(2,10)">
          <template slot-scope="scope">
            <p v-if="getMultiType(scope.row.multiType,[11]) || scope.row.multiType == ''">{{scope.row.priceWeekend  | micrometerLevel}}</p>
            <p v-else>/</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="节假日单价(元/个/天)" align="right" prop="unitPriceZj" min-width="160" v-if="headerFilter(2,11)">
          <template slot-scope="scope">
            <p v-if="getMultiType(scope.row.multiType,[11]) || scope.row.multiType == ''">{{scope.row.priceHolidays  | micrometerLevel}}</p>
            <p v-else>/</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 2)[0].selected"></el-table-column>
      <el-table-column label="租金" align="center" v-if="headerList.filter(item =>item.id == 3)[0].selected">
        <template slot="header">
          <span>租金</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 3)[0].selected ? 'left-icon':'right-icon'" @click="toggle('3')"></i>
        </template>
        <el-table-column show-overflow-tooltip prop="increasingRate" align="right" label="租金递增率(%)" min-width="140" v-if="headerFilter(3,1)">
          <template slot-scope="scope">
            {{scope.row.increasingRate | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="zjIncome" align="right" label="租金总收入(元)" min-width="140" v-if="headerFilter(3,2)">
          <template slot="header">
            <span>租金总收入(元)</span>
            <!-- <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 3)[0].selected ? 'left-icon':'right-icon'" @click="toggle(3)"></i> -->
          </template>
          <template slot-scope="scope">
            <el-popover trigger="hover" class="popover" placement="top" v-if="scope.row.mergeStats.length > 0">
              <div>
                <h1>合同招商</h1>
                <el-row>
                  <el-col :span="6">合同编号:{{scope.row.contNo}}</el-col>
                  <el-col :span="10">起止日期:{{scope.row.contStartDate | timeYearMathDay}} - {{scope.row.contEndDate | timeYearMathDay}}</el-col>
                </el-row>
                <el-table size="mini" :data="scope.row.mergeStats" border stripe header-row-class-name="table-header">
                  <el-table-column show-overflow-tooltip label="点位编号" fixed></el-table-column>
                  <el-table-column show-overflow-tooltip fixed label="总收入（元）" prop="amountTotal" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="1月" prop="janZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="2月" prop="febZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="3月" prop="marchZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="4月" prop="aprilZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="5月" prop="mayZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="6月" prop="juneZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="7月" prop="julyZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="8月" prop="augZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="9月" prop="sepZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="10月" prop="octZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="11月" prop="novZj" min-width="140"></el-table-column>
                  <el-table-column show-overflow-tooltip label="12月" prop="deceZj" min-width="140"></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <p v-if="!isNaN(scope.row.zjIncome)">{{scope.row.zjIncome | micrometerLevel}}</p>
              </div>
            </el-popover>
            <div v-else>
              <p v-if="!isNaN(scope.row.zjIncome)">{{scope.row.zjIncome | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="1月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.janZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.janWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="2月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.febZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.febWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="3月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.marchZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.marchWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="4月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.aprilZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.aprilWg | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="5月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.mayZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.mayWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="6月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.juneZj | micrometerLevel}}</p>
            <!-- <p>{{scope.row.juneWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="7月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.julyZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.julyWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="8月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.augZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.augWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="9月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.sepZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.sepWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="10月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.octZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.octWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="11月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.novZj | blank}}</p>
            <!-- <p>{{scope.row.novWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="12月" align="right" min-width="140" v-if="headerFilter(3,3)">
          <template slot-scope="scope">
            <p>{{scope.row.deceZj  | micrometerLevel}}</p>
            <!-- <p>{{scope.row.deceWg  | micrometerLevel}}</p> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 3)[0].selected"></el-table-column>
      <el-table-column label="财务初算" align="center" v-if="headerList.filter(item =>item.id == 4)[0].selected">
        <template slot="header">
          <span>财务初算</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.id == 4)[0].selected ? 'left-icon':'right-icon'" @click="toggle(4)"></i>
        </template>
        <el-table-column show-overflow-tooltip prop="leaseTerm" align="right" label="有效租期" min-width="140" v-if="headerFilter(4,1)">
          <template slot-scope="scope">
            {{scope.row.leaseTerm | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="leaseTerm" align="right" label="空置期" min-width="140" v-if="headerFilter(4,1)">
          <template slot-scope="scope">
            <p>{{scope.row.emptyDaysStr | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="totalIncome" align="right" label="综合收入(元)" min-width="140" v-if="headerFilter(4,2)">
          <template slot-scope="scope">
            <p>{{scope.row.totalIncome  | micrometerLevel}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 4)[0].selected"></el-table-column>
      <el-table-column label="月均收益" align="center" v-if="headerList.filter(item =>item.id == 6)[0].selected">
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear-1 + '年实际(元/月)'" min-width="150" v-if="headerFilter(6,1)">
          <template slot-scope="scope">
            <p>{{scope.row.towZeroAmt  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear + '年月均收益(元/月)'" min-width="170" v-if="headerFilter(6,2)">
          <template slot-scope="scope">
            <p>{{scope.row.towOneAvgAmt  | micrometerLevel}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 6)[0].selected"></el-table-column>
      <el-table-column label="未来两年" align="center" v-if="headerList.filter(item =>item.id == 5)[0].selected">
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'月租金递增率'" min-width="140" v-if="headerFilter(5,1)">
          <template slot-scope="scope">
            <p>{{scope.row.nextIncreasingRateZj1  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'可实现收益(月数)'" min-width="170" v-if="headerFilter(5,2)">
          <template slot-scope="scope">
            <p>{{scope.row.nextCountMonthZj1  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="totalIncome" align="right" :label="(getBudgetYear+1).toString()" min-width="140" v-if="headerFilter(5,3)">
          <template slot-scope="scope">
            <p>{{scope.row.nextZjIncome1  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="totalIncome" align="right" :label="getBudgetYear+2+'月租金递增率'" min-width="140" v-if="headerFilter(5,4)">
          <template slot-scope="scope">
            <p>{{scope.row.nextIncreasingRateZj2  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="totalIncome" align="right" :label="getBudgetYear+2+'可实现收益(月数)'" min-width="170" v-if="headerFilter(5,5)">
          <template slot-scope="scope">
            <p>{{scope.row.nextCountMonthZj2  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="totalIncome" align="right" :label="(getBudgetYear+2).toString()" min-width="140" v-if="headerFilter(5,6)">
          <template slot-scope="scope">
            <p>{{scope.row.nextZjIncome2  | micrometerLevel}}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.id == 5)[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip fixed="right" min-width="180" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="getEditOwingMoney(scope.row)">编辑清欠</el-button> -->
          <el-button type="text" size="mini" @click="editContract(scope.row)" v-if="scope.row.showBase">编辑合同</el-button>
          <!-- <el-button type="text" v-if="scope.row.clearTarget"  size="mini" @click="checkBizClear(scope.row)">查看清欠</el-button> -->
          <!-- <el-button type="text" v-if="scope.row.owe && scope.row.owe != 0" @click="getEditOwingMoney(scope.row)">编辑清欠</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    <el-drawer :visible.sync="contractEdit" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1200px">
      <div class="dialog-close-icon" @click="contractEdit = false" style="right: 1186px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>编辑多经预算</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button @click="contractEditSure('editContractForm')" size="mini" type="success">确定</el-button>
            <el-button @click="contractEdit = false" size="mini" plain>取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <div class="drawerBudget-info">
              <el-row :gutter="24">
                <h4>基础信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="right-col table-col">
                  <el-table ref="table" :data="[...editContractForm.operateStore]" size="mini" border stripe header-row-class-name="table-header" :cell-style="{ padding: '4px 0' }">
                    <el-table-column label="多经编号" prop="storeNo"></el-table-column>
                    <el-table-column label="位置" min-width="80">
                      <template slot-scope="scope">
                        <span>{{scope.row.floorNum || '-'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="物业类型" min-width="80">
                      <template slot-scope="scope">
                        <span>{{scope.row.chargeTypeName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="点位类型" prop="multiTypeName">
                    </el-table-column>
                    <el-table-column label="标准单价(元/个/月)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[1,3,5])">
                      <template slot-scope="scope">
                        <span>{{scope.row.unitPriceZj  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="标准单价(元/㎡/月)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[8]) || editContractForm.operateStore.multiType == ''">
                      <template slot-scope="scope">
                        <span>{{scope.row.unitPriceZj  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="right" prop="stdUnitPriceZj" label="平日租金标准(元/个/天)" min-width="140" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.stdUnitPriceZj  | micrometerLevel}}/</span>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="right" prop="priceWeekend" label="周末租金标准(元/个/天)" min-width="140" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.priceWeekend  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip align="right" prop="priceHolidays" label="节假日租金标准(元/个/天)" min-width="140" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.priceHolidays  | micrometerLevel}}/</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="业态">
                      <template slot-scope="scope">
                        <span v-if="scope.row.layoutName">{{scope.row.layoutName}}</span>
                        <span v-else>{{scope.row.layoutCdName}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
            <div class="drawerBudget-info" v-if="editContractForm.leaseContracts && editContractForm.leaseContracts.length > 0">
              <el-row :gutter="24">
                <h4>已有合同信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="right-col table-col">
                  <el-table ref="table" :data="editContractForm.leaseContracts" size="mini" border stripe header-row-class-name="table-header" :cell-style="{ padding: '4px 0' }">
                    <el-table-column label="合同号" prop="contNo"></el-table-column>
                    <el-table-column label="品牌" prop="shopName">
                      <template slot-scope="scope">
                        <p :style="scope.row.isNewShop ? 'color:#ac3838':''">{{scope.row.shopName | blank}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="多经单价(元/个/月)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[1,3,5])">
                      <template slot-scope="scope">
                        <span>{{scope.row.unitPriceZj  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="多经单价(元/㎡/月)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[8])">
                      <template slot-scope="scope">
                        <span>{{scope.row.unitPriceZj  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="平日单价(元/个/天)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.unitPriceZj  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="周末单价(元/个/天)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.priceWeekend  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="节假日单价(元/个/天)" align="right" prop="unitPriceZj" min-width="120" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                      <template slot-scope="scope">
                        <span>{{scope.row.priceHolidays  | micrometerLevel}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="开始日期" prop="contStartDate">
                      <template slot-scope="scope">
                        {{scope.row.contStartDate | timeYearMathDay}}
                      </template>
                    </el-table-column>
                    <el-table-column label="结束日期" prop="contEndDate">
                      <template slot-scope="scope">
                        {{scope.row.contEndDate | timeYearMathDay}}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
            <el-row style="color: #ccc;padding: 10px 0 20px;" v-else>暂无已有合同</el-row>
            <div class="drawerBudget-add" v-if="getMultiType(editContractForm.operateStore.multiType,[1,8,11])">
              <el-row :gutter="24">
                <el-col :span="12" class="topRight-col">
                  <div class="d-min">
                    <span>新签合同</span>
                    <el-button class="drawerBudget-text-btn" @click="addContractVo(editContractForm)" type="text">添加新签合同</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-form ref="editContractForm" :model="editContractForm" v-if="getMultiType(editContractForm.operateStore.multiType,[1,8,11])">
              <div class="drawerBudget-info" v-for="(newContractVo,i) in editContractForm.multiContracts" :key="i">
                <el-row :gutter="24">
                  <h4>新签合同{{ i+1 | contractName }}<el-button class="drawerBudget-text-btn" @click="deleteContractVo(editContractForm.multiContracts,i,newContractVo)" type="text" style="color: #FB1D1D;">删除</el-button>
                  </h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>合同起止日期</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.contract`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-date-picker class="required" type="daterange" v-model="newContractVo.contract" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange(newContractVo,'contract',true)" value-format="yyyy-MM-dd" prefix-icon="" clearable :picker-options="contractTime">
                        </el-date-picker>
                        <!-- :picker-options="editContractForm.budgetInstanceBizLeaseVOS && editContractForm.budgetInstanceBizLeaseVOS.length > 0? contractTime : ''" -->
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>品牌</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.shopConnName`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input size="mini" v-model="newContractVo.shopConnName" maxlength="12" placeholder="请输入" class="required"></el-input>
                        <!-- <el-button type="text" class="drawerBudget-text-btn add-btn" @click="addUser(newContractVo,newContractVo.newShopConnName)" style="position: absolute; right: 10px;">添加</el-button> -->
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 2">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>支付周期</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.fixedPayPeriod`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.fixedPayPeriod">
                          <el-option v-for="(bizType, index) in cyclePayWayList" :label="bizType.dictName" :value="bizType.value" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if="getMultiType(editContractForm.operateStore.multiType,[1])">
                    <div class="d-min">
                      <span>多经单价(元/个/月)</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="newContractVo.unitPriceZj"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if="getMultiType(editContractForm.operateStore.multiType,[8])">
                    <div class="d-min">
                      <span>多经单价(元/㎡/月)</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="newContractVo.unitPriceZj"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                    <div class="d-min">
                      <span>平日单价(元/个/天)</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="newContractVo.unitPriceZj"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="getMultiType(editContractForm.operateStore.multiType,[11])">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>周末单价(元/个/天)</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.priceWeekend`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="newContractVo.priceWeekend"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>节假日单价(元/个/天)</span>
                      <el-form-item class="from-item" :prop="`multiContracts.${i}.priceHolidays`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="newContractVo.priceHolidays"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <el-form ref="editContractForm" :model="editContractForm" v-if="getMultiType(editContractForm.operateStore.multiType,[3,5])">
              <p>{{routerQuery.annual}}年新签合同每月出租天数（不含已有合同覆盖天数）</p>
              <div v-for="(multiContracts,contractIndex) in editContractForm.multiContracts" :key="contractIndex">
                <table>
                  <tr>
                    <th width="100">1月</th>
                    <th width="100">2月</th>
                    <th width="100">3月</th>
                    <th width="100">4月</th>
                    <th width="100">5月</th>
                    <th width="100">6月</th>
                    <th width="100">7月</th>
                    <th width="100">8月</th>
                    <th width="100">9月</th>
                    <th width="100">10月</th>
                    <th width="100">11月</th>
                    <th width="100">12月</th>
                  </tr>
                  <tbody>
                    <tr>
                      <td v-for="(item, index) in multiContracts.contractMonths" :key="index">
                        <div v-if="item.monthMaxDay && item.monthMaxDay == 0">/</div>
                        <el-form-item v-else :prop="`multiContracts.${contractIndex}.contractMonths.${index}.unitPriceZj`" :rules="monthRule">
                          <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="item.usedDay"></el-input>
                        </el-form-item>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div v-for="(multiContracts,contractIndex) in editContractForm.multiContracts" :key="contractIndex"> -->
              <!-- <el-table  :data="editContractForm.multiContracts" size="mini" border stripe header-row-class-name="table-header">
                  <el-table-column v-for="(multiContracts, contractIndex) in editContractForm.multiContracts" :key="contractIndex">
                      <el-table-column :lable=`${index}+1 + '月'` v-for="(item, index) in multiContracts" :key="index">
                        <template slot-scope="scope">
                          <el-form-item v-if="timeCover[0]">
                            <el-input v-filter-check-input maxlength="12" placeholder="请输入" class="required" v-model="item.usedDay"></el-input>
                          </el-form-item>
                          <div v-else>/</div>
                        </template>
                      </el-table-column>
                  </el-table-column>
                </el-table> -->
            </el-form>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- <checkMore :showMore="showMore" @update:showMore="showMore = false" :owingMoneyList="statData"></checkMore> -->
    <drawer title="我是一个抽屉组件" direction="rtl" :display.sync="display" @filterSave="filterSave" :inner="false" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :tableHeaders="tableHeaders">

    </drawer>

  </div>
</template>

<script>
import excel from './components/excle.vue'
import drawer from '../../component/drawer.vue'
import { mapGetters } from 'vuex'
import messageBox from '../../component/messageBox.vue'
import checkClearTarget from './components/checkClearTarget.vue'
import editClearTarget from './components/editClearTarget.vue'
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import LeaseApi from '@/apis/apis/leaseApi'
import WsnApi from '@/apis/apis/wsnApi'
export default {
  mixins: [handle_paginator],
  data() {
    let Vue = this
    var checkTime = function (rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[1];
      const item = Vue.clearForm.editOwingMoneyList[index];
      if (!value && item.selected) {
        callback(new Error("请选择完成时间"));
      }
      callback();
    }
    var checkTarget = function (rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[1];
      const item = Vue.clearForm.editOwingMoneyList[index];
      if (!value && item.selected) {
        callback(new Error("请输入金额"));
      }
      callback();
    }
    var checkMonthDay = function (rule, value, callback) {
      const field = rule.field.split(".");
      const index = field[3];
      const item = Vue.editContractForm.multiContracts[0].contractMonths[index];
      const monthDays = new Date(new Date(Vue.routerQuery.annual, item.month, 1).getTime() - 1000 * 3600 * 24).getDate();
      if (item.monthMaxDay && item.usedDay > item.monthMaxDay) {
        callback(new Error("输入的天数不能大于" + item.monthMaxDay + '天'));
      } else if (item.usedDay > monthDays) {
        callback(new Error("输入的天数不能大于" + monthDays + '天'));
      }
      callback();
    }
    return {
      annual: parseInt(this.$route.query.annual),
      statData: [],
      stat: '',
      timeCover: [],
      showMore: false,
      isAdjustTime: {
        disabledDate: (time) => {
          return this.isAdjustTimeImit(time);
        },
      },
      contractTime: {
        disabledDate: (time) => {
          return this.contractTimeImit(time);
        },
      },
      userLoading: false,
      isAdjust: false,
      editContractForm: {
        operateStore: '',
        multiContractsmultiContracts: [{
          contractMonths: [{ month: 1 }, { month: 2 }, { month: 3 }, { month: 4 }, { month: 5 }, { month: 6 }, { month: 7 }, { month: 8 }, { month: 9 }, { month: 10 }, { month: 11 }, { month: 12 }]
        }],
        leaseContracts: [],
        days: [{ day: '' }]
      },
      tableData: [],
      selectItem: [],
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          annual: this.$route.query.annual,
          budgetInstanceSheetId: this.$route.query.budgetInstanceSheetId,
          multiType: '',
          chargeType: '',
          contractTyp: '',
          storeNo: '',
          updateType: '',
          upltsp: ''
        },
      },
      checkList: [],
      addDebts: false,
      checkDebts: false,
      editDebts: false,
      owingMoneyList: [],
      clearForm: {
        editOwingMoneyList: [],
      },
      lease: '',
      editOwingMoneyListSlected: [],
      mergeSplitTime: '',
      mergeList: [],
      target: '',
      mergeInfoList: [],
      splitInfoList: [],
      mergeSplitWarn: false,
      contractEdit: false,
      addUserBtn: false,
      userList: [],
      changeShop: true,
      clearRules: {
        finishDate: [{ required: true, validator: checkTime, trigger: ['blur', 'change'] }],
        target: [{ required: true, validator: checkTarget, trigger: ['blur', 'change'] }],
      },
      monthRule: [{ required: true, validator: checkMonthDay, trigger: ['blur', 'change'] }],
      tableHeaders: [
        {
          value: '基础信息',
          selected: true,
          indeterminate: false,
          id: 1,
          list: [
            {
              value: '位置',
              selected: true,
              id: 1,
            },
            {
              value: '物业类型',
              selected: true,
              id: 2,
            },
            {
              value: '点位类型',
              selected: true,
              id: 3,
            },
            {
              value: '期间合同数量',
              selected: true,
              id: 4,
            },
            {
              value: '标准单价（元/个/月）',
              selected: true,
              id: 5,
            },
            {
              value: '标准单价（元//㎡/天）',
              selected: true,
              id: 6,
            },
            {
              value: '平日标准单价（元/个/天）',
              selected: true,
              id: 7,
            },
            {
              value: '周末标准单价（元/个/天）',
              selected: true,
              id: 8,
            },
            {
              value: '节日标准单价(元/个/天）',
              selected: true,
              id: 9,
            },
            {
              value: '面积',
              selected: true,
              id: 10,
            },
            {
              value: '业态',
              selected: true,
              id: 11,
            },
            {
              value: '期初状态',
              selected: true,
              id: 12,
            }
          ],
        },
        {
          value: '合同信息',
          selected: true,
          indeterminate: false,
          id: 2,
          list: [
            {
              value: '合同类型',
              selected: true,
              id: 1,
            },
            {
              value: '合同号',
              selected: true,
              id: 2,
            },
            {
              value: '合同开始日期',
              selected: true,
              id: 3,
            },
            {
              value: '合同结束日期',
              selected: true,
              id: 4,
            },
            {
              value: '品牌',
              selected: true,
              id: 5,
            },
            {
              value: '支付周期',
              selected: true,
              id: 6,
            },
            {
              value: '多经单价元/个/月',
              selected: true,
              id: 7,
            },
            {
              value: '多经单价元/㎡/月',
              selected: true,
              id: 8,
            },
            {
              value: '平日单价元/个/天',
              selected: true,
              id: 9,
            },
            {
              value: '周末单价元/个/天',
              selected: true,
              id: 10,
            },
            {
              value: '节假日单价元/个/天',
              selected: true,
              id: 11,
            },
          ],
        },
        {
          value: '租金',
          selected: true,
          id: 3,
          list: [
            {
              value: '租金递增率',
              selected: true,
              id: 1,
            },
            {
              value: '租金总收入',
              selected: true,
              id: 2,
            },
            {
              value: '租金月收入',
              selected: true,
              id: 3,
            },
          ]
        },
        {
          value: '财务初算',
          selected: true,
          indeterminate: false,
          id: 4,
          list: [
            {
              value: '有效租期',
              selected: true,
              id: 1,
            },
            {
              value: '空置期',
              selected: true,
              id: 2,
            },
            {
              value: '综合收入',
              selected: true,
              id: 3,
            }
          ],
        },
        {
          value: '月均收益',
          selected: true,
          indeterminate: false,
          id: 6,
          list: [
            {
              value: '2020年实际（元/月）',
              selected: true,
              id: 1,
            },
            {
              value: '2021年月均收益（元/月）',
              selected: true,
              id: 2,
            },
          ],
        },
        {
          value: '未来两年',
          selected: true,
          indeterminate: false,
          id: 5,
          list: [
            {
              value: '2022月租金递增率',
              selected: true,
              id: 1,
            },
            {
              value: '2022可实现收益（月数）',
              selected: true,
              id: 2,
            },
            {
              value: '2022',
              selected: true,
              id: 3,
            },
            {
              value: '2023月租金递增率',
              selected: true,
              id: 4,
            },
            {
              value: '2023可实现收益（月数）',
              selected: true,
              id: 5,
            },
            {
              value: '2023',
              selected: true,
              id: 6,
            }
          ],
        }
      ],
      headerList: '',
      display: false,
      isEmpty: true
    }
  },
  computed: {
    ...mapGetters([
      'rentList',
      'wgPayWayList',
      'cyclePayWayList',
      'sellWayList',
      'bizList',
      'contractTypeList',
      'multiTypeList',
      'storeChargeTypeList',
      'getBudgetYear'
    ])
  },

  filters: {
    initialStatus(val) {
      switch (val) {
        case 2:
          return '经营中'
          break;
        case 3:
          return '未经营'
          break;
        default:
          return '-'
      }
    },
    contractName(val) {
      let level = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      return level[val]
    },
    //时间转换
    timeYearMathDay(val) {
      if (val) {
        var date = new Date(val);
        return date.format("yyyy-MM-dd")
      } else {
        return '-'
      }
    },
  },
  watch: {
    'headerList': {
      handler(newName, oldName) {
        this.$nextTick(() => {
          this.$refs.table.doLayout(); //解决表格错位
        })
      },
      immediate: true,
      deep: true
    },
    checkList(newValue, oldValue) {
      this.$nextTick(() => {
        this.$refs.table.doLayout(); //解决表格错位
      });
    },
    contractEdit(newValue, oldValue) {
      if (!newValue && this.$refs.editContractForm) {
        this.$refs.editContractForm.resetFields()
        this.editContractForm = {
          operateStore: '',
          multiContracts: [{
            contractMonths: [{ month: 1 }, { month: 2 }, { month: 3 }, { month: 4 }, { month: 5 }, { month: 6 }, { month: 7 }, { month: 8 }, { month: 9 }, { month: 10 }, { month: 11 }, { month: 12 }]
          }],
          leaseContracts: [],
        }
      }
    },
    editDebts(newValue, oldValue) {
      if (!newValue) {
        this.clearForm.editOwingMoneyList = []
      }
    }
  },
  components: { drawer, excel },
  created() {
    this.routerQuery = this.$route.query;
    this.getList();
    this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
  },
  mounted() {

  },
  methods: {
    rTime,
    //编辑的合同月份是否已有合同已覆盖
    getTimeCover(month) {
      let flog = true;
      let monthDays = 0;
      if (this.editContractForm.budgetInstanceBizLeaseVOS.length > 0) {
        let monthStartTime = new Date(this.routerQuery.annual, month - 1, 1).format("yyyy-MM-dd");
        let monthEndTime = new Date(this.routerQuery.annual, month, 0).format("yyyy-MM-dd");
        this.editContractForm.budgetInstanceBizLeaseVOS.map(item => {
          let startTime = new Date(item.contStartDate).format("yyyy-MM-dd");
          let endTime = new Date(item.contEndDate).format("yyyy-MM-dd");
          if (startTime <= monthStartTime && monthEndTime <= endTime) {
            flog = false
          } else if (startTime <= monthStartTime && endTime < monthEndTime) {
            monthDays += (endTime - monthStartTime) / (1000 * 60 * 60 * 24)
          } else if (startTime > monthStartTime && monthEndTime <= endTime) {
            monthDays += (monthEndTime - startTime) / (1000 * 60 * 60 * 24)
          }
        })
        if (monthDays == (monthEndTime - monthStartTime) / (1000 * 60 * 60 * 24)) {
          flog = false
        }
      }
      return flog
    },
    //已有合同大于预算年限,调铺才可以编辑合同
    constructEditShow() {
      let list = [];
      this.editContractForm.budgetInstanceBizLeaseVOS.map(item => {
        list.push(new Date(item.contEndDate).getTime())
      })
      let maxTime = Math.max(list);
      let annual = new Date(Number(this.$route.query.annual) + 1 + '-01-01 00:00:01').getTime() - 24 * 3600 * 1000;
      if (maxTime > annual) {
        return false
      }
      return true
    },
    editRowClassName({ row, rowIndex }) {
      if (row.updateType === 1) {
        return 'editedWsn'
      }
    },
    //判断是否空铺
    async isEmptyType() {
      console.log(this.editContractForm)
      let params = {
        date: this.editContractForm.operateStore.finishDate,
        storeIds: this.editContractForm.operateStore.storeId
      }
      await LeaseApi.mergeSplit(params).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          this.isEmpty = false
        } else {
          this.isEmpty = true
        }
      })
    },
    //调铺时间限制
    isAdjustTimeImit(time) {
      let list = [];
      this.editContractForm.budgetInstanceBizLeaseVOS.map(item => {
        list.push(new Date(item.contEndDate).getTime())
      })
      let minTime = new Date(this.$route.query.annual + '-01-01 00:00:01').getTime() - 24 * 3600 * 1000;
      let maxTime = Math.max(...list)
      return time.getTime() > maxTime || time.getTime() < minTime
    },
    contractTimeImit(time) {
      let list = [];
      this.editContractForm.leaseContracts.map(item => {
        list.push(new Date(item.contEndDate).getTime())
      })
      let maxTime = Math.max(list)
      if (maxTime && !this.editContractForm.operateStore.isAdjust) {
        return time.getTime() < maxTime
      } else {
        let finishDateTime = new Date(this.editContractForm.operateStore.finishDate).getTime() - 24 * 3600 * 1000;
        return time.getTime() < finishDateTime
      }
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    //多经遍历展示
    getMultiType(multiType, arr) {
      if (arr.indexOf(Number(multiType)) != -1) {
        return true
      } else {
        return false
      }
    },
    //商户切换
    getUserName(obj, val, type) {
      if (type == 'edit') {
        obj.newShopConnId = val;
      }
      obj.newShopConnName = this.userList.filter(item => item.id == val)[0].name;
      this.userList = [];
    },
    //filterSave
    filterSave(data) {
      this.display = data;
      this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
      //this.headerList = Object.assign([], this.tableHeaders);
    },
    //过滤
    headerFilter(parentId, id) {
      let arr = this.headerList.filter(item => item.id == parentId);
      if (arr[0].list) {
        let list = arr[0].list;
        return list.filter(obj => obj.id == id)[0].selected
      }
    },
    //起始时间更改
    timeChange(obj, type, edit) {
      switch (type) {
        case 'rentFree':
          this.$set(obj, 'freeStart', obj.rentFree[0]);
          this.$set(obj, 'freeEnd', obj.rentFree[1]);
          this.$set(obj, 'freeType', 1);
          break;
        case 'fitUp':
          obj.budgetInstanceBizNewContRentfreeVOList.push({
            freeStart: obj.fitUp[0],
            freeEnd: obj.fitUp[1],
            freeType: 2
          })
          /* this.$set(obj,'fitUpStart',obj.fitUp[0]);
          this.$set(obj,'fitUpEnd',obj.fitUp[1]); */
          break;
        case 'contract':
          if (edit && this.editContractForm.operateStore.isAdjust && !this.editContractForm.operateStore.finishDate) {
            this.$message.warning('请先选择调铺生效日期');
            this.$set(obj, 'contract', []);
            return false
          }
          if (obj.contract) {
            this.$set(obj, 'contStartDate', obj.contract[0]);
            this.$set(obj, 'contEndDate', obj.contract[1]);
          } else {
            this.$set(obj, 'contStartDate', '');
            this.$set(obj, 'contEndDate', '');
            this.$set(obj, 'contract', []);
          }
          break;
      }
    },
    //删除合同
    async deleteContractVo(list, i, item) {
      if (item.contractId && item.contractId != 0) {
        await WsnApi.deleteContract({ contractId: item.contractId }).then(res => {
          if (res.code === 0 && res.data) {
            console.log(res.data)
          }
        })
      }
      list.splice(i, 1)
    },
    //新增合同
    addContractVo(splitNew) {
      splitNew.multiContracts.push({ storeId: this.editContractForm.operateStore.storeId, multiType: this.editContractForm.operateStore.multiType })
    },
    //新增用户
    async addUser(item, name) {
      let params = {
        merchantName: name
      }
      await LeaseApi.addUser(params).then(res => {
        if (res.code === 0 && res.data) {
          this.addUserBtn = true;
          /* this.userList.push({
            id:res.data.merchantId,
            name:res.data.merchantName
          }) */
          item.newShopConnId = res.data.merchantId;
          //item.newShopConn =  res.data.merchantId;
          //item.newShopConnName = this.addUserName;
          //this.$forceUpdate()
        }
      })
    },
    //新签用户
    async getNewuser(query) {
      if (query !== '') {
        this.userLoading = true;
        let params = {
          merchantName: query
        }
        await LeaseApi.newUser(params).then(res => {
          if (res.code === 0 && res.data) {
            this.userLoading = false;
            /* setTimeout(() => { */
            this.userList = res.data
            /* },200) */
            if (res.data.length == 0) {
              this.addUserBtn = false;
              this.addUserName = query;
            } else {
              this.addUserBtn = true;
            }
          }
        })
      }
    },
    //编辑
    async editContract(item) {
      this.contractEdit = true;
      await WsnApi.editDetail({ storeId: item.storeId }).then(res => {

        if (res.code === 0 && res.data) {
          this.editContractForm = res.data
          if (res.data.multiContracts.length == 0) {
            if (res.data.operateStore.multiType == 3 || res.data.operateStore.multiType == 5) {
              this.editContractForm.multiContracts.push({
                contractMonths: [{ month: 1 }, { month: 2 }, { month: 3 }, { month: 4 }, { month: 5 }, { month: 6 }, { month: 7 }, { month: 8 }, { month: 9 }, { month: 10 }, { month: 11 }, { month: 12 }],
                storeId: res.data.operateStore.storeId,
                multiType: res.data.operateStore.multiType
              })
            } else {
              this.editContractForm.multiContracts.push({
                storeId: res.data.operateStore.storeId,
                multiType: res.data.operateStore.multiType
              })
            }
          }
        }
      })
    },
    //查询
    checkFilter() {
      this.pageInfo.pageNum = 1;
      this.getList()
    },
    //重置
    clearFilter() {
      this.pageInfo = {
        pageSize: 10,
        page: 1,
        total: 0,
        bean: {
          annual: this.$route.query.annual,
          budgetInstanceSheetId: this.$route.query.budgetInstanceSheetId,
          multiType: '',
          chargeType: '',
          contractTyp: '',
          storeNo: '',
          updateType: '',
          upltsp: ''
        },
      }
      this.getList()
    },
    // 查询列表
    async getList() {
      const params = {
        ...this.pageInfo
      }
      await WsnApi.find(params).then(res => {
        if (res.code === 0 && res.data && res.data.page) {
          this.tableData = res.data.page.list;
          this.pageInfo.total = res.data.page.total;
          this.stat = res.data.stat;
          getDynamicTableHeight(this);
        } else {
          this.tableData = [];
          this.pageInfo.total = 0;
        }
      })
    },
    // 多选
    handelSelecte(val) {
      this.selectItem = val
    },
    // 扩展
    toggle(v) {
      this.headerList.map(item => {
        let status = item.selected;
        if (item.id == v) {
          item.selected = !item.selected;
          if (item.list) {
            item.list.map(obj => {
              obj.selected = !status
            })
          }
        }
      })
      this.tableHeaders = JSON.parse(JSON.stringify(this.headerList))
    },
    //弹窗关闭
    dialogVisibles(v) {
      console.log(v)
      this.spliteFormShop = v;
      this.splitShop = v;
      this.addDebts = v;
      this.checkDebts = v;
      this.editDebts = v;
      this.newSign = v;
      this.mergeShop = v;
      this.mergeFormShop = v;
      this.splitInfo = v;
      this.houseEdit = v;
      this.contractEdit = v;
      this.mergeInfo = v;
    },
    //欠费信息
    async getOwingMoney(item) {
      let params = {
        contId: item.contId,
        id: item.id
      }
      await LeaseApi.owingMoney(item.id).then(res => {
        if (res.code === 0 && res.data) {
          this.owingMoneyList = res.data
        }
      })
    },
    //添加/编辑欠费信息
    async getEditOwingMoney(item) {
      this.lease = item;
      this.editDebts = true;
      let params = {
        contId: item.contId,//'8a7b859d6c86f0b0016c88c51b37325a',
        id: item.id//1
      }
      await LeaseApi.editOwingMoneyInfo(params).then(res => {
        if (res.code === 0 && res.data) {
          this.clearForm.editOwingMoneyList = res.data;
          this.clearForm.editOwingMoneyList.map(obj => {
            obj.annual = item.annual;
            obj.budgetInstanceBizLeaseId = item.id;
            obj.projectId = item.projectId;
            obj.storeId = item.storeId;
            obj.storeNo = item.storeNo;
          })
        }
      }).then(() => {
        /* this.clearForm.editOwingMoneyList.map(item => {
          if (item.select) {
            this.$refs.table.toggleRowSelection(item, true);
            item.selected = true
          }
        }) */
      })
    },
    //编辑更新列表数据
    updatTarget(data) {
      this.lease.clearTarget = data;
      this.editDebts = false;
    },
    //
    //
    updateClearChange(val) {
      if (val.selected) {
        val.selected = false
      } else {
        val.selected = true
      }
      this.clearForm.editOwingMoneyListSlected = val;
    },
    //修改欠费清单
    async updateBizClear() {
      let flog = false;
      console.log(this.$refs[form]);
      /* this.$nextTick(() => { */
      this.$refs[form].validate(valid => {
        if (valid) {
          flog = true;
        }
      })
      /* }) */
      if (flog && this.editOwingMoneyListSlected.length > 0) {
        let list = [];
        let target = '';
        this.clearForm.editOwingMoneyListSlected.map(obj => {
          list.push({
            annual: obj.annual,
            budgetInstanceBizLeaseId: obj.budgetInstanceBizLeaseId,
            feeType: obj.feeType,
            finishDate: obj.finishDate,
            owe: obj.owe,
            projectId: obj.projectId,
            storeId: obj.storeId,
            storeNo: obj.storeNo,
            target: obj.target,
            receId: obj.rece_id,
            jan: obj.jan,
            feb: obj.feb,
            march: obj.march,
            april: obj.april,
            may: obj.may,
            june: obj.june,
            july: obj.july,
            aug: obj.aug,
            sep: obj.sep,
            oct: obj.oct,
            nov: obj.nov,
            dece: obj.dece
          })
          target += obj.fee_type_name + '/' + obj.own_money + '/' + obj.finishDate + ',';
        })
        await LeaseApi.updateOwingMoney(list).then(res => {
          if (res.code === 0 && res.data) {
            this.editDebts = false;
            this.addDebts = false;
            this.lease.clearTarget = target;
          }
        })
      }
    },
    //查看清欠checkBizClearowe
    async checkBizClear(item) {
      this.checkDebts = true;
      this.getOwingMoney(item);
      this.lease = item;
      /* let params = {
        bean: {
          budgetInstanceBizLeaseId: 0,//动态id
        },
        pageNum:1,
        pageSize:1000
      }
      await LeaseApi.checkBizClearowe(params).then(res => {
        if(res.code === 0 && res.data){
          this.checkBizClearData = res.data.list
        }
      }) */
    },
    update() {
      this.checkDebts = false;
      this.getEditOwingMoney(this.lease)
    },
    async contractEditSure(form) {
      let flog = false;
      console.log(this.$refs[form]);
      /* this.$nextTick(() => { */
      if (this.$refs[form]) {
        this.$refs[form].validate(valid => {
          if (valid) {
            flog = true;
          }
        })
      } else {
        flog = true;
      }
      /* }) */
      if (flog) {

        let formInfo = [...this.editContractForm.multiContracts];
        //无调铺功能，可以添加合同
        /* if ((!this.constructEditShow() && this.editContractForm.operateStoreVO.isAdjust) || this.constructEditShow()) {
        } else {
          formInfo.newContractVoList = []
        } */
        /* formInfo.newContractVoList.map(child => {
          delete child.fitUp;
          child.budgetInstanceBizNewContRentfreeVOList.map(timeObj => {
            delete timeObj.rentFree;
            delete timeObj.contract;
            return timeObj
          })
        }) */
        await WsnApi.edit(formInfo).then(res => {
          if (res.code === 0) {
            this.contractEdit = false;
            this.getList()
          }
        })
      }
    },
    async getStatAll(multiType) {
      let params = {
        "annual": this.$route.query.annual,
        "multiType": multiType ? multiType : '',
      }
      await WsnApi.statAll(params).then(res => {
        if (res.code === 0 && res.data) {
          this.statData = res.data
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss"  scoped>
@import "~@styles/common.scss";
.add-btn {
  position: absolute;
  top: 0;
  right: 10px;
  background-color: transparent;
  color: #468ceb;
}
.add-btn.is-disabled {
  background-color: transparent !important;
  color: #ddd !important;
  border: none;
}
.current-page {
  margin: 10px 0;
  span {
    color: #666;
  }
}
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
.el-icon-upload2 {
  display: inline-block;
  margin: 0 10px;
  &.right-icon {
    color: #468ceb;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg); /* IE 9 */
    -moz-transform: rotate(90deg); /* Firefox */
    -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
    -o-transform: rotate(90deg); /* Opera */
  }
  &.left-icon {
    color: #468ceb;
    transform: rotate(-90deg);
    -ms-transform: rotate(-90deg); /* IE 9 */
    -moz-transform: rotate(-90deg); /* Firefox */
    -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
    -o-transform: rotate(-90deg); /* Opera */
  }
}
.from {
  h1 {
    padding: 10px 0;
    font-size: 16px;
  }
  h2 {
    padding: 10px 0;
    font-size: 14px;
  }
  .from-item {
    width: 48%;
    display: inline-block;
    margin-bottom: 10px;
    .form-input {
      width: 260px;
    }
  }
}
.clearTarget {
  color: #468ceb;
  overflow: hidden;
  text-overflow: ellipsis;
}
.import-input .el-input__inner {
  border-right-color: #468ceb;
}
.el-input-group__append {
  padding: 0;
  height: 25px;
  width: 35px;
  border-radius: 0;
  border-color: #468ceb;
  background: linear-gradient(
    298deg,
    rgba(70, 140, 235, 1) 0%,
    rgba(53, 171, 255, 1) 100%
  );
}
.el-input-group__append button.el-button {
  padding-top: 0px;
}
.tool-bar {
  .el-icon-search {
    &::before {
      position: absolute;
      top: 4px;
      left: 9px;
      color: #fff;
      font-size: 20px;
    }
  }
  .el-button {
    margin: 0 5px 0 0;
  }
  .operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .filter-icon {
    width: 30px;
    height: 30px;
    position: relative;
    border: 1px solid #468ceb;
    &::before {
      content: "";
      width: 25px;
      height: 25px;
      position: absolute;
      top: 0;
      left: 0;
      background: url("../../../../assets/images/filter_icon.png") center center
        no-repeat;
      background-size: 25px 25px;
    }
  }
}
</style>
<style type="text/css" lang="scss">
.wsn-page {
  .editedWsn {
    background-color: #e6f2f3;
    td {
      background-color: #e6f2f3 !important;
    }
  }
  .import-input .el-input__inner {
    border-right-color: #e6f2f3;
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
      rgba(53, 171, 255, 1) 100%
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
