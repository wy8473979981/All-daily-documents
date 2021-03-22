<template>
  <!-- 预算查看-经营费用 -->
  <div class="list-page shop-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col class="select-title" :span="24">
        <div class="select-cutover">
          <span v-if="routerQuery.bunk" class="select-blue">租费收入-商业</span>
          <span v-if="routerQuery.mutibiz" @click="$router.push({path: '/management/budgetView/lease/wsn',query:routerQuery})">多经收入-商业</span>
          <span v-if="routerQuery.office" @click="$router.push({path: '/management/budgetView/lease/houseMassage',query:routerQuery})">住宅/写字楼</span>
          <span v-if="routerQuery.proplan" @click="$router.push({path: '/management/budgetView/feeSchedule/index',query:routerQuery})">管理及企划费用表</span>
          <span v-if="routerQuery.mandate" @click="$router.push({path: '/management/budgetView/otherIncome',query:routerQuery})">其他收入表</span>
        </div>
        <div class="select-data">
          <p>（金额：元/面积：平）</p>
        </div>
      </el-col>
      <el-col :span="18">
        <el-select placeholder="请选择物业类型" size="mini" filterable clearable v-model="pageInfo.bean.chargeType" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in storeChargeTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择楼层" size="mini" filterable clearable v-model="pageInfo.bean.floorId" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in floorList" :label="bizType.dictName + '-' + bizType.remark" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-select placeholder="请选择" size="mini" filterable clearable v-model="pageInfo.bean.isNewStore" style="margin-right: 5px; width: 150px;" @change="checkFilter()">
          <el-option v-for="bizType in storeTypeList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
        </el-select>
        <el-input placeholder="请输入单元编号或铺号" size="mini" class="import-input" v-model="pageInfo.bean.queryWord" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="checkFilter()"></el-button>
        </el-input>
        <el-button size="mini" @click="clearFilter">重置</el-button>

        <!-- <el-button  size="mini" type="primary" @click="getExcle">导出</el-button> -->
      </el-col>
      <el-col :span="6" class="operation">
        <excel :params="pageInfo" type="租费收入-商业" url='/bizLease/excelExport'></excel>
        <!-- <Import :params="importParams" @update="getList"></Import> -->
        <!-- <el-button size="mini" type="success" @click="mergeOperate" :disabled="selectItem.length < 2">合铺</el-button>
        <el-button size="mini" type="success" @click="splitShop = true,splitInfoList =  JSON.parse(JSON.stringify( selectItem ))" :disabled="selectItem.length > 1 || selectItem.length == 0">拆铺</el-button> -->
        <el-button size="mini" type="text" class="filter-icon" @click="display = true"></el-button>
      </el-col>
    </el-row>
    <el-table ref="table" @selection-change="handelSelecte" :data="tableData" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :row-class-name="editRowClassName">
      <el-table-column type="selection" :selectable="selectable"></el-table-column>
      <el-table-column show-overflow-tooltip prop="unitNo" label="铺号" fixed width="180">
        <template slot-scope="scope">
          <div class="unitNo">
            <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
            <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span>
            <!-- <span>{{scope.row.unitNo}}</span> -->
            <span>{{scope.row.storeNo}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" min-width="200" v-if="headerList.filter(item =>item.value == '基础信息')[0].selected">
        <template slot="header">
          <span>基础信息</span>
          <!-- <i class="el-icon-upload2" :class="checkList.indexOf('1') != -1 ? 'left-icon':'right-icon'" @click="toggle('1')"></i> -->
          <i class="el-icon-upload2" :class="headerList.filter(item => item.value == '基础信息')[0].selected ? 'left-icon':'right-icon'" @click="toggle('基础信息')"></i>
        </template>
        <!-- <el-table-column show-overflow-tooltip prop="2" label="铺号/位置/类型" min-width="300" v-if="headerFilter('基础信息','铺号/位置/类型')">
          <template slot-scope="scope">
            <div v-if="scope.row.currContType == 2 && !scope.row.isNewStore"></div>
            <div v-else>
              <span>{{scope.row.storeNo}}/</span>
              <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}/</span>
              <span>{{scope.row.chargeTypeName}}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="2" label="位置" min-width="100" v-if="headerFilter('基础信息','位置')">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.floorNum}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="2" label="物业类型" min-width="100" v-if="headerFilter('基础信息','物业类型')">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.chargeTypeName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="contCount" align="right" label="期间合同数量(个)" min-width="130" v-if="headerFilter('基础信息','期间合同数量')">
          <template slot-scope="scope">
            <div>{{scope.row.contCount | blank}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stdUnitPriceZj" align="right" label="标准租金(元)" min-width="100" v-if=" headerFilter('基础信息','标准租金')">
          <template slot-scope="scope">
            <div>{{scope.row.stdUnitPriceZj | micrometerLevel}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="stdUnitPriceWg" align="right" label="标准管理费(元)" min-width="120" v-if=" headerFilter('基础信息','标准管理费')">
          <template slot-scope="scope">
            <div>{{scope.row.stdUnitPriceWg | micrometerLevel}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="5" label="计租面积(m²)" align="right" min-width="120" v-if=" headerFilter('基础信息','期间合同数量')">
          <template slot-scope="scope">
            <div>{{scope.row.square}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="layoutCd" label="业态" min-width="100" v-if=" headerFilter('基础信息','业态')">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.layoutCdName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="assetAttrName" label="资产属性" min-width="100" v-if="headerFilter('基础信息','资产属性')">
          <template slot-scope="scope">
            <div>{{scope.row.assetAttrName || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="历史合同单价" min-width="110" v-if="headerFilter('基础信息','历史合同单价')">
          <template slot-scope="scope">
            {{scope.row.preUnitPriceZj | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="saleStatusName" label="销售状态" min-width="100" v-if="headerFilter('基础信息','销售状态')">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="返祖到期日" min-width="100" v-if="headerFilter('基础信息','返祖到期日')">
          <template slot-scope="scope">
            {{scope.row.dueDate | timeYearMathDay}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="initialStatus" label="期初状态" min-width="100" v-if=" headerFilter('基础信息','期初状态')">
          <template slot-scope="scope">
            <div>{{scope.row.initialStatusName}}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="isAdjust" label="是否调铺" min-width="120" v-if=" headerFilter('基础信息','是否调铺')">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.isAdjust == true ? '是' : '否'}}</span> <span style="color:#468CEB;padding-left: 10px;">{{scope.row.isAdjustDate}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.value == '基础信息')[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip label="合同信息(元)" align="center" v-if="headerList.filter(item =>item.value == '合同信息')[0].selected">
        <template slot="header">
          <span>合同信息</span>
          <!-- <i class="el-icon-upload2" :class="checkList.indexOf('2') != -1 ? 'left-icon':'right-icon'" @click="toggle('2')"></i> -->
          <i class="el-icon-upload2" :class="headerList.filter(item => item.value == '合同信息')[0].selected ? 'left-icon':'right-icon'" @click="toggle('合同信息')"></i>
        </template>
        <el-table-column show-overflow-tooltip label="合同类型" prop="currContType" min-width="140">
          <template slot-scope="scope">
            {{scope.row.currContTypeName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="contNo" label="合同号" min-width="150" v-if=" headerFilter('合同信息','合同号')">
          <template slot-scope="scope">
            {{scope.row.contNo | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合同开始日期" min-width="200" v-if=" headerFilter('合同信息','合同开始日期')">
          <template slot-scope="scope">
            {{scope.row.contStartDate | timeYearMathDay}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="合同结束日期" min-width="200" v-if=" headerFilter('合同信息','合同结束日期')">
          <template slot-scope="scope">
            {{scope.row.contEndDate  | timeYearMathDay}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="品牌" prop="shopName" min-width="140" v-if=" headerFilter('合同信息','品牌')">
          <template slot-scope="scope">
            <p :style="scope.row.isNewShop ? 'color:#ac3838':''">{{scope.row.shopName | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="计租方式" prop="payWayName" min-width="140" v-if=" headerFilter('合同信息','计租方式')">
          <template slot-scope="scope">
            <!-- {{scope.row.payWay | payWay}} -->
            {{scope.row.payWayName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="固定支付周期" prop="payCycleCd" min-width="140" v-if=" headerFilter('合同信息','固定支付周期')">
          <template slot-scope="scope">
            {{scope.row.payCycleCdName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="租金单价(元)" align="right" prop="unitPriceZj" min-width="140" v-if=" headerFilter('合同信息','租金单价')">
          <template slot-scope="scope">
            <p :class="scope.row.unitPriceZj < scope.row.stdUnitPriceZj ? 'lightRed':''">{{scope.row.unitPriceZj | micrometerLevel}}</p>
            <div slot="reference" class="name-wrapper" v-if="scope.row.unitPriceZj < scope.row.stdUnitPriceZj && scope.row.unitPriceZj">
              低于一铺一价中标准租金
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="达成率(%)" prop="completionRate" align="right" min-width="140" v-if=" headerFilter('合同信息','达成率')">
          <template slot-scope="scope">
            {{scope.row.completionRate}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="扣点支付周期" min-width="140" v-if=" headerFilter('合同信息','扣点支付周期')">
          <template slot-scope="scope">
            {{scope.row.pointsPayCycleCdName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="salesType" label="销售额方式" min-width="140" v-if=" headerFilter('合同信息','销售额方式')">
          <template slot-scope="scope">
            {{scope.row.salesTypeName | blank}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="totalSales" :label="getBudgetYear+'年预估销售额合计'" min-width="170" v-if=" headerFilter('合同信息','2021年预估销售额合计')">
          <template slot-scope="scope">
            {{scope.row.estimatedSales | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="1月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.janXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="2月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.febXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="3月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.marchXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="4月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.aprilXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="5月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.mayXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="6月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.juneXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="7月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.julyXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="8月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.augXs | micrometerLevel}}
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="9月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.sepXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="10月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.octXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="11月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.novXs | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="estimatedSales" label="12月预估销售额" min-width="140" v-if=" headerFilter('合同信息','预估销售额')">
          <template slot-scope="scope">
            {{scope.row.deceXs| micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="royaltyRatio" label="扣点(%)" min-width="140" v-if="headerFilter('合同信息','扣点')">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="物管费支付周期" min-width="140" v-if="headerFilter('合同信息','物管费支付周期')">
          <template slot-scope="scope">
            {{scope.row.payCycleCdName | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="管理费单价(元)" align="right" min-width="140" v-if="headerFilter('合同信息','管理费单价')">
          <template slot-scope="scope">
            <p :class="scope.row.unitPriceWg < scope.row.stdUnitPriceWg ? 'lightRed':''">{{scope.row.unitPriceWg | micrometerLevel}}</p>
            <div slot="reference" class="name-wrapper" v-if="scope.row.unitPriceWg < scope.row.stdUnitPriceWg && scope.row.unitPriceWg">低于一铺一价中标准管理费</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="经营免租期" prop="rentFree" min-width="190" v-if="headerFilter('合同信息','经营免租期')">
          <template slot-scope="scope">
            <p v-if="scope.row.rentFree == '无' || !scope.row.rentFree">-</p>
            <p v-else>{{scope.row.rentFree}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="装修免租期" min-width="190" v-if="headerFilter('合同信息','装修免租期')">
          <template slot-scope="scope">
            <p v-if="!scope.row.decorationStartDate && !scope.row.decorationEndDate">-</p>
            <p v-else>{{scope.row.decorationDateStr}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip label="租赁成本" prop="leaseCost" min-width="100" v-if="headerFilter('租赁成本')">
        </el-table-column> -->
        <el-table-column show-overflow-tooltip prop="increasingRate" align="right" label="租金递增率(%)" min-width="140" v-if=" headerFilter('合同信息','租金递增率')">
          <template slot-scope="scope">
            <p>{{scope.row.increasingRate | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="租金总收入(元)" align="right" prop="zjIncome" min-width="140" v-if=" headerFilter('合同信息','租金总收入')">
          <template slot-scope="scope">
            {{scope.row.zjIncome | micrometerLevel}}
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip prop="futureIncome" align="right" label="未来2年租金收入(元)" min-width="160" v-if=" headerFilter('合同信息','未来2年租金收入')">
          <template slot-scope="scope">
            {{scope.row.futureIncome | micrometerLevel}}
          </template>
        </el-table-column> -->
        <el-table-column show-overflow-tooltip label="管理费递增率(%)" align="right" prop="increasingRateWg" min-width="140" v-if=" headerFilter('合同信息','管理费递增率')">
          <template slot-scope="scope">
            <p>{{scope.row.increasingRateWg | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="管理费总收入(元)" prop="wgIncome" min-width="140" v-if=" headerFilter('合同信息','管理费总收入')">
          <template slot-scope="scope">
            {{scope.row.wgIncome | micrometerLevel}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.value == '合同信息')[0].selected"></el-table-column>
      <el-table-column label="月收入（上行显示租金，下行显示物业管理费）" align="center" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
        <template slot="header">
          <span>月收入（上行显示租金，下行显示物业管理费）</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.value == '月收入')[0].selected ? 'left-icon':'right-icon'" @click="toggle('月收入')"></i>
          <!-- <i class="el-icon-upload2" :class="checkList.indexOf('4') != -1 ? 'left-icon':'right-icon'" @click="toggle('4')"></i> -->
        </template>
        <el-table-column show-overflow-tooltip align="right" label="1月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.janWg  && !scope.row.janZj">
              {{scope.row.janZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.janZj  | micrometerLevel}}</p>
              <p>{{scope.row.janWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="2月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.febWg && !scope.row.febZj">
              {{scope.row.febZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.febZj  | micrometerLevel}}</p>
              <p>{{scope.row.febWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="3月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.marchWg && !scope.row.marchZj">
              {{scope.row.marchZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.marchZj  | micrometerLevel}}</p>
              <p>{{scope.row.marchWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="4月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.aprilWg && !scope.row.aprilZj">
              {{scope.row.aprilZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.aprilZj | micrometerLevel}}</p>
              <p>{{scope.row.aprilWg | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="5月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.mayWg && !scope.row.mayZj">
              {{scope.row.mayZjShow || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.mayZj  | micrometerLevel}}</p>
              <p>{{scope.row.mayWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="6月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.juneWg && !scope.row.juneZj">
              {{scope.row.juneZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.juneZj  | micrometerLevel}}</p>
              <p>{{scope.row.juneWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="7月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.julyWg && !scope.row.julyZj">
              {{scope.row.julyZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.julyZj  | micrometerLevel}}</p>
              <p>{{scope.row.julyWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="8月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.augWg && !scope.row.augZj">
              {{scope.row.augZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.augZj  | micrometerLevel}}</p>
              <p>{{scope.row.augWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="9月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.sepWg && !scope.row.sepZj">
              {{scope.row.sepZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.sepZj  | micrometerLevel}}</p>
              <p>{{scope.row.sepWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="10月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.octWg && !scope.row.octZj">
              {{scope.row.octZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.octZj  | micrometerLevel}}</p>
              <p>{{scope.row.octWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="11月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.novWg && !scope.row.novZj">
              {{scope.row.novZjShow  || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.novZj  | micrometerLevel}}</p>
              <p>{{scope.row.novWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" label="12月" min-width="140" v-if="headerList.filter(item =>item.value == '月收入')[0].selected">
          <template slot-scope="scope">
            <div v-if="!scope.row.deceWg && !scope.row.deceZj">
              {{scope.row.deceZjShow || '--'}}
            </div>
            <div v-else>
              <p>{{scope.row.deceZj  | micrometerLevel}}</p>
              <p>{{scope.row.deceWg  | micrometerLevel}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="futureIncomeWg" label="未来2年收入" min-width="170" v-if=" headerFilter('月收入','未来2年收入')">
          <template slot-scope="scope">
            {{scope.row.futureIncomeWg | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="leaseTerm" label="有效租期" min-width="140" v-if=" headerFilter('月收入','有效租期')">
          <template slot-scope="scope">
            {{scope.row.leaseTerm | blank}}
          </template>
        </el-table-column>

      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.value == '月收入')[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip label="财务初算" align="center" v-if="headerList.filter(item =>item.value == '财务初算')[0].selected">
        <template slot="header">
          <span>财务初算</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.value == '财务初算')[0].selected ? 'left-icon':'right-icon'" @click="toggle('财务初算')"></i>
          <!-- <i class="el-icon-upload2" :class="checkList.indexOf('4') != -1 ? 'left-icon':'right-icon'" @click="toggle('4')"></i> -->
        </template>
        <el-table-column show-overflow-tooltip label="空置期" prop="emptyDays" min-width="190" v-if=" headerFilter('财务初算','空置期')">
          <template slot-scope="scope">
            <p>{{scope.row.emptyDaysStr | blank}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="计租总数" prop="totalCountMonthZj" min-width="190" v-if=" headerFilter('财务初算','计租总数')">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="计租月数" prop="countMonthZj" min-width="190" v-if=" headerFilter('财务初算','计租月数')">
        </el-table-column>
        <el-table-column show-overflow-tooltip label="计费总数" prop="totalCountMonthWg" min-width="190" v-if=" headerFilter('财务初算','计费总数')">
          <template slot-scope="scope">
            {{scope.row.totalCountMonthWg | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="计费月数" prop="countMonthWg" min-width="190" v-if=" headerFilter('财务初算','计费月数')">
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" prop="totalIncome" label="综合收入(元)" min-width="140" v-if=" headerFilter('财务初算','综合收入')">
          <template slot-scope="scope">
            {{scope.row.totalIncome | micrometerLevel}}
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip align="right" prop="owe" label="欠费(元)" min-width="120" v-if=" headerFilter('财务初算','欠费')">
          <template slot-scope="scope">
            <p v-if="scope.row.owe">{{scope.row.owe  | micrometerLevel}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="清欠目标" min-width="150" v-if="  headerFilter('财务初算','清欠目标')">
          <template slot-scope="scope">
            <p type="text" size="mini" class="clearTarget" @click="checkBizClear(scope.row)">
              {{scope.row.clearTarget ? scope.row.clearTarget : '暂无'}}
            </p>
          </template>
        </el-table-column> -->
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.value == '财务初算')[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip label="未来两年" align="center" v-if="headerList.filter(item =>item.value == '未来两年')[0].selected">
        <template slot="header">
          <span>未来两年</span>
          <i class="el-icon-upload2" :class="headerList.filter(item => item.value == '未来两年')[0].selected ? 'left-icon':'right-icon'" @click="toggle('未来两年')"></i>
          <!-- <i class="el-icon-upload2" :class="checkList.indexOf('4') != -1 ? 'left-icon':'right-icon'" @click="toggle('4')"></i> -->
        </template>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'年租金递增率'" min-width="160" v-if=" headerFilter('未来两年','2022年租金递增率')">
          <template slot-scope="scope">
            {{scope.row.nextIncreasingRateZj}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'年计租月数'" min-width="140" v-if=" headerFilter('未来两年','2022年计租月数')">
          <template slot-scope="scope">
            {{scope.row.nextCountMonthZj1}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'租金额'" min-width="140" v-if=" headerFilter('未来两年','2022租金额')">
          <template slot-scope="scope">
            {{scope.row.nextZjIncome1  | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'年租金递增率'" min-width="170" v-if=" headerFilter('未来两年','2023年租金递增率')">
          <template slot-scope="scope">
            {{scope.row.nextIncreasingRateZj2}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'年计租月数'" min-width="140" v-if=" headerFilter('未来两年','2023年计租月数')">
          <template slot-scope="scope">
            {{scope.row.nextCountMonthZj2}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'年租金额'" min-width="140" v-if=" headerFilter('未来两年','2023年租金额')">
          <template slot-scope="scope">
            {{scope.row.nextZjIncome2  | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'年物管费递增率'" min-width="160" v-if=" headerFilter('未来两年','2022年物管费递增率')">
          <template slot-scope="scope">
            {{scope.row.nextIncreasingRateWg1}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'年计费月数'" min-width="140" v-if=" headerFilter('未来两年','2022年计费月数')">
          <template slot-scope="scope">
            {{scope.row.nextCountMonthWg1}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+1+'物管费额'" min-width="140" v-if=" headerFilter('未来两年','2022物管费额')">
          <template slot-scope="scope">
            {{scope.row.nextWgIncome1  | micrometerLevel}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'年物管费递增率'" min-width="160" v-if=" headerFilter('未来两年','2023年物管费递增率')">
          <template slot-scope="scope">
            {{scope.row.nextIncreasingRateWg2}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'年计费月数'" min-width="140" v-if=" headerFilter('未来两年','2023年计费月数')">
          <template slot-scope="scope">
            {{scope.row.nextCountMonthWg2}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="right" :label="getBudgetYear+2+'物管费额'" min-width="140" v-if=" headerFilter('未来两年','2023物管费额')">
          <template slot-scope="scope">
            {{scope.row.nextWgIncome2 | micrometerLevel}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line" v-if="headerList.filter(item =>item.value == '未来两年')[0].selected"></el-table-column>
      <el-table-column show-overflow-tooltip fixed="right" min-width="180" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="getEditOwingMoney(scope.row)">编辑清欠</el-button> -->
          <el-button type="text" size="mini" @click="editNew(scope.row)" v-if="scope.row.isNewStore">编辑合同</el-button>
          <el-button type="text" size="mini" @click="editContract(scope.row)" v-if="!scope.row.isNewStore && scope.row.id && scope.row.id != 0">编辑合同</el-button>
          <!-- <el-button type="text" v-if="scope.row.clearTarget"  size="mini" @click="checkBizClear(scope.row)">查看清欠</el-button> -->
          <!-- <el-button type="text" @click="getEditOwingMoney(scope.row)" v-if="scope.row.owe && scope.row.owe != 0">编辑清欠</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    <!-- 查看清欠目标start -->
    <checkClearTarget :checkDebts="checkDebts" @update:checkDebts="checkDebts = false" :owingMoneyList="owingMoneyList"></checkClearTarget>
    <editClearTarget :editDebtsShow="editDebts" @visible:editDebts="editDebts = false" @updatTarget="updatTarget" :clearForm="clearForm"></editClearTarget>
    <!-- 编辑清欠end -->
    <!-- 合铺start -->
    <el-drawer :visible.sync="mergeShop" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="900px">
      <div class="dialog-close-icon" @click="mergeShop = false" style="right: 886px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>合铺</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button @click="mergeNext('mergeSplitForm')" type="success">确定</el-button>
            <el-button @click="mergeShop = false" plain>取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <el-form ref="mergeSplitForm" :rules="mergeSplitRules" :model="mergeSplitForm">
              <el-row :gutter="24" style="border-top:solid 1px #ddd">
                <el-col :span="12">
                  <div class="d-min">
                    <span>合铺生效日期</span>
                    <el-form-item class="from-item" prop="mergeSplitTime">
                      <el-date-picker type="date" placeholder="选择日期" v-model="mergeSplitForm.mergeSplitTime" @change="splitOperate('merge')" class="required" :picker-options="mergeContractTime">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>添加铺位</span>
                    <el-form-item class="from-item">
                      <el-select v-model="mergeSplitForm.storeNo" filterable remote reserve-keyword clearFilter placeholder="请输入单元编号或铺号" :remote-method="getStoreNoList" @change="addMergeStore" style="padding-right: 30px;">
                        <el-option v-for="item in storeNoList" :key="item.storeNo" :label="item.storeNo" :value="item.storeNo">
                        </el-option>
                      </el-select>
                      <!-- <el-input placeholder="请输入单元编号或铺号" v-model="mergeSplitForm.storeNo" class="required"></el-input> -->
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="drawerBudget-info">
            <el-alert v-if="splitInfoList.filter(item => item.isEmpty).length > 0" title="合铺后生效日当天会将所有被合铺位的合同进行解约，调铺进行中止，空铺产生空置，请确认后再操作" type="warning" show-icon>
            </el-alert>
            <el-row :gutter="24">
              <el-col :span="24" class="right-col table-col">
                <el-table size="mini" ref="dataTable" @selection-change="merge" :data="splitInfoList" border stripe header-row-class-name="table-header">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column label="铺号" width="180">
                    <template slot-scope="scope">
                      <div>
                        <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                        <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                        <span>{{scope.row.storeNo}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="位置" min-width="100">
                    <template slot-scope="scope">
                      <div>
                        <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="物业类型" min-width="100">
                    <template slot-scope="scope">
                      <div>
                        <span>{{scope.row.chargeTypeName}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="生效日是否为空铺">
                    <template slot-scope="scope">
                      <p class="lightRed" v-if="scope.row.isEmpty != undefined && scope.row.isEmpty != null"> {{scope.row.isEmpty ? '是':'否'}}</p>
                      <p v-else>-</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="remark">
                    <template slot-scope="scope">
                      <p class="lightRed">{{scope.row.remark | blank}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- 合铺end -->

    <!-- 拆铺start -->
    <el-drawer :visible.sync="splitShop" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="900px">
      <div class="dialog-close-icon" @click="splitShop = false" style="right: 886px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>拆铺</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button @click="spliteNext('mergeSplitForm')" type="success">确定</el-button>
            <el-button @click="splitShop = false" plain>取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-newBunk">
            <el-form ref="mergeSplitForm" :rules="mergeSplitRules" :model="mergeSplitForm">
              <el-row :gutter="24" style="border-top:solid 1px #ddd">
                <el-col :span="12" class="top-col">
                  <div class="d-min">
                    <span>拆铺生效日期</span>
                    <el-form-item class="from-item" prop="mergeSplitTime">
                      <el-date-picker type="date" placeholder="选择日期" v-model="mergeSplitForm.mergeSplitTime" @change="splitOperate('slipt')" class="required" :picker-options="mergeContractTime">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="d-min">
                    <span>拆分数量</span>
                    <el-form-item class="from-item" prop="splitNum">
                      <el-input placeholder="请输入" v-model="mergeSplitForm.splitNum" class="required" v-filter-check-input maxlength="12"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="drawerBudget-info">
            <el-alert v-if="splitInfoList.filter(item => item.isEmpty).length > 0" title="合铺后生效日当天会将所有被合铺位的合同进行解约，调铺进行中止，空铺产生空置，请确认后再操作" type="warning" show-icon>
            </el-alert>
            <el-row :gutter="24">
              <el-col :span="24" class="right-col table-col">
                <el-table size="mini" ref="dataTable" @selection-change="merge" :data="splitInfoList" border stripe header-row-class-name="table-header">
                  <el-table-column label="铺号" width="180">
                    <template slot-scope="scope">
                      <div>
                        <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                        <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                        <span>{{scope.row.storeNo}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="位置" min-width="100">
                    <template slot-scope="scope">
                      <div>
                        <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="物业类型" min-width="100">
                    <template slot-scope="scope">
                      <div>
                        <span>{{scope.row.chargeTypeName}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="生效日是否为空铺">
                    <template slot-scope="scope">
                      <p v-if="scope.row.isEmpty != undefined && scope.row.isEmpty != null" class="lightRed"> {{scope.row.isEmpty ? '是':'否'}}</p>
                      <p v-else>-</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" prop="remark">
                    <template slot-scope="scope">
                      <p class="lightRed">{{scope.row.remark | blank}}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- 拆铺end -->
    <!-- 抽屉样式合铺start -->
    <el-drawer :visible.sync="mergeFormShop" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="mergeFormShop = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>{{mergeInfo ? '合铺信息':'合铺'}}</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="mergeFormSure('mergeForm')">提交</el-button>
            <el-button plain @click="mergeFormShop = false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-title" v-if="mergeInfo">
            <el-alert v-if="mergeForm.operateStoreVOS.filter(item => item.isEmpty).length > 0" title="拆铺后生效日当天会将所有被拆铺位的合同进行解约，调铺进行中止，请确认后再操作。" type="warning" show-icon>
            </el-alert>
            <p>合铺生效日期：{{mergeForm.newStoreVO.finishDate | timeYearMathDay}}</p>
            <el-table size="mini" :data="mergeForm.operateStoreVOS" border stripe header-row-class-name="table-header">
              <el-table-column label="铺号" width="180">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                    <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                    <span>{{scope.row.storeNo}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物业类型" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.chargeTypeName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="生效日是否为空铺">
                <template slot-scope="scope">
                  <p v-if="scope.row.isEmpty != undefined && scope.row.isEmpty != null" class="lightRed"> {{scope.row.isEmpty ? '是':'否'}}</p>
                  <p v-else>-</p>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>
          </div>
          <el-form ref="mergeForm" :model="mergeForm">
            <div class="drawerBudget-newBunk">
              <h3 class="min-title">新铺</h3>
              <div class="drawerBudget-info">
                <el-row :gutter="24">
                  <h4>基础信息</h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>铺位号</span>
                      <el-form-item class="from-item" prop="newStoreVO.storeNo" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="mergeForm.newStoreVO.storeNo"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>位置</span>
                      <el-form-item class="from-item" prop="newStoreVO.floorId" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="mergeForm.newStoreVO.floorId">
                          <el-option v-for="(bizType) in floorList" :label="bizType.dictName + '-' + bizType.remark" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租面积(m²)</span>
                      <el-form-item class="from-item" prop="newStoreVO.area" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="mergeForm.newStoreVO.area" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>类型</span>
                      <el-form-item class="from-item" prop="newStoreVO.issuinglayoutcd" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="mergeForm.newStoreVO.issuinglayoutcd">
                          <el-option v-for="(bizType) in layoutCdList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准租金(元)</span>
                      <el-form-item class="from-item" prop="newStoreVO.rent" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" class="required" v-model="mergeForm.newStoreVO.rent" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准管理费(元)</span>
                      <el-form-item class="from-item">
                        <el-input placeholder="请输入" class="required" v-model="mergeForm.newStoreVO.propertyFee" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-add" v-if="!mergeInfo">
                <el-row :gutter="24">
                  <el-col :span="12" class="topRight-col">
                    <div class="d-min">
                      <span>新签合同</span>
                      <el-button class="drawerBudget-text-btn" type="text" @click="addContractVo(mergeForm.newStoreVO)">添加新签合同</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-info" v-for="(newContractVo,i) in mergeForm.newStoreVO.newContractVoList" :key="i">
                <el-row :gutter="24">
                  <h4>新签合同{{i+1 | contractName}} <el-button size="mini" class="drawerBudget-text-btn" @click="deleteContractVo(mergeForm.newStoreVO.newContractVoList,i,newContractVo)" v-if="!splitInfo" type="text" style="color: #FB1D1D;">删除</el-button>
                  </h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>合同起止日期</span>
                      <el-form-item class="from-item" :prop="`newStoreVO.newContractVoList.${i}.contract`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-date-picker :readonly="mergeInfo" class="required" type="daterange" v-model="newContractVo.contract" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange(newContractVo,'contract')" value-format="yyyy-MM-dd" prefix-icon="" clearable>
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>品牌</span>
                      <el-form-item class="from-item inner" :prop="`newStoreVO.newContractVoList.${i}.newShopConnId`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change'] }]">
                        <el-select :readonly="mergeInfo" v-model="newContractVo.newShopConnId" filterable remote reserve-keyword placeholder="请输入" :remote-method="getNewuser" class="required" @change="getUserName(newContractVo,newContractVo.newShopConnId)" style="padding-right: 30px;" :loading="userLoading">
                          <!-- <el-option
                               v-for="item in userList"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id" v-if="userList.length > 0">
                             </el-option> -->
                          <template v-if="userList.length > 0">
                            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" style="max-width:356px">
                            </el-option>
                          </template>
                        </el-select>
                        <el-button type="text" @click="addUser(newContractVo)" class="add-btn button drawerBudget-text">添加</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租方式</span>
                      <el-form-item class="from-item" :prop="`newStoreVO.newContractVoList.${i}.rentType`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="newContractVo.rentType">
                          <el-option v-for="(bizType,index) in rentList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管支付方式</span>
                      <el-form-item class="from-item" :prop="`newStoreVO.newContractVoList.${i}.wgPayWay`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="newContractVo.wgPayWay">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 2">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>租金单价(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType !=2" :prop="`newStoreVO.newContractVoList.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="newContractVo.unitPriceZj" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>固租支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 2" :prop="`newStoreVO.newContractVoList.${i}.fixedPayPeriod`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="newContractVo.fixedPayPeriod">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>

                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>销售额方式</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVO.newContractVoList.${i}.sellWay`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change'] }]">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="newContractVo.sellWay">
                          <el-option v-for="(bizType,index) in sellWayList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>预估销售额(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVO.newContractVoList.${i}.prospect`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="newContractVo.prospect" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点(百分比)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVO.newContractVoList.${i}.cutPoint`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="newContractVo.cutPoint" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVO.newContractVoList.${i}.pointPayPeriod`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="mergeInfo" class="required" v-model="newContractVo.pointPayPeriod">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管费单价(元)</span>
                      <el-form-item class="from-item" :prop="`newStoreVO.newContractVoList.${i}.unitPriceWg`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="mergeInfo" class="required" v-model="newContractVo.unitPriceWg" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>装修免租期</span>
                      <el-form-item class="from-item">
                        <el-date-picker :readonly="mergeInfo" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="newContractVo.fitUp" @change="timeChange(newContractVo,'fitUp')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,i)" :picker-options="mergeFormShop ? fitUpTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList" :key="timeNum" v-if="timeObj.freeType == 1">
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>经营免租期{{timeNum+1}}</span>
                      <el-form-item class="from-item">
                        <el-date-picker :readonly="mergeInfo" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.rentFree" @change="timeChange(timeObj,'rentFree')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,timeNum)" :picker-options="mergeFormShop ? rentFreeTime : false" :width="timeNum == 0 ? '80%' : '100%'" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <el-button size="mini" v-if="timeNum != 0" type="text" style="color: #FB1D1D;position: absolute;right:10px;top:5px" @click="deleteRent(timeNum,newContractVo.budgetInstanceBizNewContRentfreeVOList)">删除</el-button>
                  </el-col>
                  <el-col :span="12" v-if="timeNum == 0">
                    <el-button type="text" @click="newContractVo.budgetInstanceBizNewContRentfreeVOList.push({freeType:1})" class="add-rentFree-btn drawerBudget-text">添加</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </el-drawer>
    <!-- 抽屉样式合铺end -->
    <!-- 合铺信息 -->
    <!-- 抽屉样式合铺end -->
    <!-- 抽屉样式合铺信息start -->
    <el-drawer :visible.sync="mergeInfo" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="mergeInfo = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>合铺信息</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="mergeInfo = false">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-title">
            <div v-for="(operateStoreVO, i) in mergeInfoData.operateStoreVOS" :key="i">
              <el-alert v-if="operateStoreVO.isEmpty" title="合铺后生效日当天会将所有被拆铺位的合同进行解约，调铺进行中止，请确认后再操作。" type="warning" show-icon>
              </el-alert>
            </div>
            <p>合铺生效日期：{{mergeInfoData.newStoreVO.finishDate | timeYearMathDay}}</p>
            <el-table size="mini" :data="mergeInfoData.operateStoreVOS" border stripe header-row-class-name="table-header">
              <el-table-column label="铺号" width="180">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                    <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                    <span>{{scope.row.storeNo}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物业类型" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.chargeTypeName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="生效日是否为空铺">
                <template slot-scope="scope">
                  <p v-if="scope.row.isEmpty != undefined && scope.row.isEmpty != null" class="lightRed"> {{scope.row.isEmpty ? '是':'否'}}</p>
                  <p v-else>-</p>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>
          </div>
          <div class="drawerBudget-newBunk">
            <el-table size="mini" border :data="[...mergeInfoData.newStoreVO]" header-row-class-name="table-header">
              <el-table-column label="铺号" width="180">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                    <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                    <span>{{scope.row.storeNo}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物业类型" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.chargeTypeName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="计租面积" align="right" prop="area">
              </el-table-column>
              <el-table-column label="标准租金" align="right" prop="rent">
              </el-table-column>
              <el-table-column label="标准管理费" align="right" prop="propertyFee">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- 抽屉样式合铺信息end -->
    <!-- 抽屉样式拆铺start-->
    <el-drawer :visible.sync="spliteFormShop" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="spliteFormShop = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>{{splitInfo ? '拆铺信息':'拆铺'}}</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="spliteFormSure('splitForm')">提交</el-button>
            <el-button plain @click="spliteFormShop = false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-title" v-if="splitInfo">
            <!-- <el-alert v-if="splitInfoList.filter(item => item.isEmpty).length > 0" title="拆铺后生效日当天会将所有被拆铺位的合同进行解约，调铺进行中止，请确认后再操作。" type="warning" show-icon>
            </el-alert> -->
            <p>拆铺生效日期：{{splitForm.newStoreVOS[0].finishDate | timeYearMathDay}}</p>
          </div>
          <el-form ref="splitForm" :model="splitForm">
            <div class="drawerBudget-newBunk" v-for="(splitNew,index) in splitForm.newStoreVOS" :key="index">
              <h3 class="min-title">新铺{{index+1}}</h3>
              <div class="drawerBudget-info">
                <el-row :gutter="24">
                  <h4>基础信息</h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>铺位号</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.storeNo`" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="splitNew.storeNo"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>位置</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.floorId`" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="splitNew.floorId">
                          <el-option v-for="(bizType) in floorList" :label="bizType.dictName + '-' +  bizType.remark" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租面积(m²)</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.area`" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="splitNew.area" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>类型</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.issuinglayoutcd`" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="splitNew.issuinglayoutcd">
                          <el-option v-for="(bizType) in layoutCdList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准租金(元)</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.rent`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" class="required" v-model="splitNew.rent" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准管理费(元)</span>
                      <el-form-item class="from-item">
                        <el-input placeholder="请输入" class="required" v-model="splitNew.propertyFee" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-add" v-if="!splitInfo">
                <el-row :gutter="24">
                  <el-col :span="12" class="topRight-col">
                    <div class="d-min">
                      <span>新签合同</span>
                      <el-button class="drawerBudget-text-btn" type="text" @click="addContractVo(splitNew)">添加新签合同</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-info" v-for="(newContractVo,i) in splitNew.newContractVoList" :key="i">
                <el-row :gutter="24">
                  <h4>新签合同{{i+1 | contractName}} <el-button size="mini" class="drawerBudget-text-btn" @click="deleteContractVo(splitNew.newContractVoList,i,newContractVo)" v-if="!splitInfo" type="text" style="color: #FB1D1D;">删除</el-button>
                  </h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>合同起止日期</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.newContractVoList.${i}.contract`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-date-picker :readonly="splitInfo" class="required" type="daterange" v-model="newContractVo.contract" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange(newContractVo,'contract')" value-format="yyyy-MM-dd" prefix-icon="" clearable>
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>品牌</span>
                      <el-form-item class="from-item inner" :prop="`newStoreVOS.${index}.newContractVoList.${i}.newShopConnId`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change'] }]">
                        <el-select :readonly="splitInfo" v-model="newContractVo.newShopConnId" filterable remote reserve-keyword placeholder="请输入" :remote-method="getNewuser" class="required" @change="getUserName(newContractVo,newContractVo.newShopConnId)" style="padding-right: 30px;" :loading="userLoading">
                          <!-- <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" v-if="userList.length > 0">
                          </el-option> -->
                          <template v-if="userList.length > 0">
                            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" style="max-width:356px">
                            </el-option>
                          </template>
                        </el-select>
                        <el-button type="text" @click="addUser(newContractVo)" class="add-btn button drawerBudget-text">添加</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租方式</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.newContractVoList.${i}.rentType`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="newContractVo.rentType">
                          <el-option v-for="(bizType,index) in rentList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管支付方式</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.newContractVoList.${i}.wgPayWay`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="newContractVo.wgPayWay">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 2">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>租金单价(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 2" :prop="`newStoreVOS.${index}.newContractVoList.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="newContractVo.unitPriceZj" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>固租支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 2" :prop="`newStoreVOS.${index}.newContractVoList.${i}.fixedPayPeriod`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="newContractVo.fixedPayPeriod">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>销售额方式</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVOS.${index}.newContractVoList.${i}.sellWay`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change'] }]">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="newContractVo.sellWay">
                          <el-option v-for="(bizType,index) in sellWayList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>预估销售额(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVOS.${index}.newContractVoList.${i}.prospect`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="newContractVo.prospect" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点(百分比)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVOS.${index}.newContractVoList.${i}.cutPoint`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="newContractVo.cutPoint" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newStoreVOS.${index}.newContractVoList.${i}.pointPayPeriod`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="splitInfo" class="required" v-model="newContractVo.pointPayPeriod">
                          <el-option v-for="(bizType,index) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.dictCd" :key="index"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管费单价(元)</span>
                      <el-form-item class="from-item" :prop="`newStoreVOS.${index}.newContractVoList.${i}.unitPriceWg`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="splitInfo" class="required" v-model="newContractVo.unitPriceWg" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>装修免租期</span>
                      <el-form-item class="from-item">
                        <el-date-picker :readonly="splitInfo" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="newContractVo.fitUp" @change="timeChange(newContractVo,'fitUp')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,i)" :picker-options="spliteFormShop ? fitUpTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList" :key="timeNum" v-if="timeObj.freeType == 1">
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>经营免租期{{timeNum+1}}</span>
                      <el-form-item class="from-item">
                        <el-date-picker :readonly="mergeInfo" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.rentFree" @change="timeChange(timeObj,'rentFree')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,timeNum)" :picker-options="spliteFormShop ? rentFreeTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <el-button size="mini" v-if="timeNum != 0" type="text" style="color: #FB1D1D;position: absolute;right:10px;top:5px" @click="deleteRent(timeNum,newContractVo.budgetInstanceBizNewContRentfreeVOList)">删除</el-button>
                  </el-col>
                  <el-col :span="12" v-if="timeNum == 0">
                    <el-button type="text" @click="newContractVo.budgetInstanceBizNewContRentfreeVOList.push({freeType:1})" class="add-rentFree-btn button drawerBudget-text">添加</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </el-drawer>
    <!-- 抽屉样式拆铺end-->
    <!-- 拆铺信息start -->
    <el-drawer :visible.sync="splitInfo" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="splitInfo = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>{{newStoreDetail ? '新铺信息':'拆铺信息'}}</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="splitInfo = false">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="drawerBudget-title">
            <el-alert v-if="splitInfoData.operateStoreVO.isEmpty" title="拆铺后生效日当天会将所有被拆铺位的合同进行解约，调铺进行中止，请确认后再操作。" type="warning" show-icon>
            </el-alert>
            <p>{{newStoreDetail ? '新铺生效日期':'拆铺生效日期'}}：{{splitInfoData.newStoreVOS[0].finishDate }}</p>
            <el-table size="mini" :data="[...splitInfoData.operateStoreVO]" border stripe header-row-class-name="table-header">
              <el-table-column label="铺号" width="180">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                    <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                    <span>{{scope.row.storeNo}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物业类型" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.chargeTypeName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="生效日是否为空铺">
                <template slot-scope="scope">
                  <p v-if="scope.row.isEmpty != undefined && scope.row.isEmpty != null" class="lightRed"> {{scope.row.isEmpty ? '是':'否'}}</p>
                  <p v-else>-</p>
                </template>
              </el-table-column>
              <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>
          </div>
          <div class="drawerBudget-newBunk">
            <el-table size="mini" border :data="splitInfoData.newStoreVOS" header-row-class-name="table-header">
              <el-table-column label="铺号" width="180">
                <template slot-scope="scope">
                  <div>
                    <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                    <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                    <span>{{scope.row.storeNo}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="位置" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="物业类型" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.chargeTypeName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="计租面积" align="right" prop="area">
              </el-table-column>
              <el-table-column label="标准租金" align="right" prop="rent">
              </el-table-column>
              <el-table-column label="标准管理费" align="right" prop="propertyFee">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- 拆铺信息end -->
    <!-- 编辑合同 -->
    <el-drawer :visible.sync="contractEdit" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="contractEdit = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>编辑铺位预算</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button @click="contractEditSure('editContractForm')" type="success">确定</el-button>
            <el-button @click="contractEdit = false" plain>取消</el-button>
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
                  <el-table :data="[...editContractForm.operateStoreVO]" size="mini" border stripe header-row-class-name="table-header">
                    <el-table-column label="铺号" width="180">
                      <template slot-scope="scope">
                        <div>
                          <!-- <span v-if="scope.row.operType == 1 || scope.row.operType == 2" class="operType" @click="scope.row.operType == 2 ? getSplitInfo(scope.row):getMergeInfo(scope.row)">{{scope.row.operType | operType}}</span>
                          <span v-if="scope.row.isNewStore" class="newShop" @click="getOperStore(scope.row.storeId)">新</span> -->
                          <span>{{scope.row.storeNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="位置" min-width="100">
                      <template slot-scope="scope">
                        <div>
                          <span>{{scope.row.buildingNum}}-{{scope.row.floorNum}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="物业类型" min-width="100">
                      <template slot-scope="scope">
                        <div>
                          <span>{{scope.row.chargeTypeName}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="120" label="标准租金" show-overflow-tooltip align="right" prop="stdUnitPriceZj"></el-table-column>
                    <el-table-column min-width="120" label="业态" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <!-- <span v-if="scope.row.layoutName">{{scope.row.layoutName}}</span>
                        <span v-else>{{scope.row.layoutCdName}}</span> -->
                        <span>{{scope.row.layoutCdName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="120" label="资产属性" show-overflow-tooltip prop="assetAttrName"></el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
            <div class="drawerBudget-info" v-if="editContractForm.budgetInstanceBizLeaseVOS && editContractForm.budgetInstanceBizLeaseVOS.length > 0">
              <el-row :gutter="24">
                <h4>已有合同信息</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="right-col table-col">
                  <el-table :data="editContractForm.budgetInstanceBizLeaseVOS" size="mini" border stripe>
                    <el-table-column label="合同号" show-overflow-tooltip prop="contNo"></el-table-column>
                    <el-table-column label="品牌" show-overflow-tooltip prop="shopName">
                      <template slot-scope="scope">
                        <p :style="scope.row.isNewShop ? 'color:#ac3838':''">{{scope.row.shopName | blank}}</p>
                      </template>
                    </el-table-column>
                    <el-table-column label="租金单价" show-overflow-tooltip prop="unitPriceZj"></el-table-column>
                    <el-table-column label="开始日期" show-overflow-tooltip prop="contStartDate">
                      <template slot-scope="scope">
                        {{scope.row.contStartDate | timeYearMathDay}}
                      </template>
                    </el-table-column>
                    <el-table-column label="结束日期" show-overflow-tooltip prop="contEndDate">
                      <template slot-scope="scope">
                        {{scope.row.contEndDate | timeYearMathDay}}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
            <div class="drawerBudget-info" v-if="editContractForm.budgetInstanceBizLeaseVOS && editContractForm.budgetInstanceBizLeaseVOS.length > 0">
              <el-row :gutter="24">
                <h4>是否调铺</h4>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" :class="editContractForm.operateStoreVO.isAdjust ? '' : 'right-col'">
                  <div class="d-min">
                    <span>是否调铺</span>
                    <el-radio v-model="editContractForm.operateStoreVO.isAdjust" :label="true">是</el-radio>
                    <el-radio v-model="editContractForm.operateStoreVO.isAdjust" :label="false">否</el-radio>
                  </div>
                </el-col>
                <el-col :span="12" v-if="editContractForm.operateStoreVO.isAdjust">
                  <div class="d-min">
                    <span>调铺生效日期</span>
                    <el-date-picker class="required" v-model="editContractForm.operateStoreVO.finishDate" value-format="yyyy-MM-dd" prefix-icon="" clearable placeholder="请选择" :picker-options="isAdjustTime" @change="isEmptyType">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="24" v-if="editContractForm.operateStoreVO.isAdjust">
                <el-col :span="12" style="float: right; border: 0;">
                  <el-alert v-if="!isEmpty" title="调铺生效日早于已有合同的结束日期，生效日当天会将该已有合同进行解约" type="warning" show-icon>
                  </el-alert>
                </el-col>
              </el-row>
            </div>
            <el-row style="color: #ccc;padding: 10px 0 20px;" v-else>暂无已有合同</el-row>
            <div class="drawerBudget-add" v-if="(!constructEditShow() && editContractForm.operateStoreVO.isAdjust) || constructEditShow()">
              <el-row :gutter="24">
                <el-col :span="12" class="topRight-col">
                  <div class="d-min">
                    <span>新签合同</span>
                    <el-button class="drawerBudget-text-btn" @click="addContractVo(editContractForm,'edit')" type="text">添加新签合同</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-form ref="editContractForm" :model="editContractForm" v-if="(!constructEditShow() && editContractForm.operateStoreVO.isAdjust) || constructEditShow()">
              <div class="drawerBudget-info" v-for="(newContractVo,i) in editContractForm.newContractVoList" :key="i">
                <el-row :gutter="24">
                  <h4>新签合同{{ i+1 | contractName }}<el-button size="mini" class="drawerBudget-text-btn" @click="deleteContractVo(editContractForm.newContractVoList,i,newContractVo)" type="text" style="color: #FB1D1D;">删除</el-button>
                  </h4>
                </el-row>
                <el-row :gutter="24" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>合同起止日期</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.contract`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-date-picker class="required" type="daterange" v-model="newContractVo.contract" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange(newContractVo,'contract',true)" value-format="yyyy-MM-dd" prefix-icon="" clearable :picker-options="contractTime">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>品牌</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.newShopConn`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-select placeholder="请输入" class="required inner" v-model="newContractVo.newShopConn" filterable remote reserve-keyword :remote-method="getNewuser" @change="getUserName(newContractVo,newContractVo.newShopConn,'edit')" :loading="userLoading">
                          <template v-if="userList.length > 0">
                            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" style="max-width:356px">
                            </el-option>
                          </template>
                        </el-select>
                        <el-button type="text" class="drawerBudget-text-btn add-btn" @click="addUser(newContractVo)">添加</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if="editContractForm.operateStoreVO.assetAttr != 3">
                    <div class="d-min">
                      <span>计租方式</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.rentType`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.rentType">
                          <el-option v-for="(bizType) in rentList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col" v-if=" editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 2">
                    <div class="d-min">
                      <span>固租支付周期</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.fixedPayPeriod`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.fixedPayPeriod">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if=" editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 2">
                    <div class="d-min">
                      <span>租金单价(元)</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input placeholder="请输入" class="required" v-model="newContractVo.unitPriceZj" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col" v-if=" editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 1">
                    <div class="d-min">
                      <span>扣点支付周期</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.pointPayPeriod`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.pointPayPeriod">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if=" editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 1">
                    <div class="d-min">
                      <span>销售额方式</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.sellWay`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.sellWay">
                          <el-option v-for="(bizType) in sellWayList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col" v-if="editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 1">
                    <div class="d-min">
                      <span>预估销售额(元)</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.prospect`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input placeholder="请输入" class="required" v-model="newContractVo.prospect" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" v-if="editContractForm.operateStoreVO.assetAttr != 3 && newContractVo.rentType != 1">
                    <div class="d-min">
                      <span>扣点(百分比)</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.cutPoint`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input placeholder="请输入" class="required" v-model="newContractVo.cutPoint" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>物管费支付周期</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.wgPayWay`" :rules="[{ required: true, message: ' ', trigger: 'change'}]">
                        <el-select placeholder="请选择" class="required" v-model="newContractVo.wgPayWay">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>物管费单价(元)</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.unitPriceWg`" :rules="[{ required: true, message: ' ', trigger: 'blur'}]">
                        <el-input placeholder="请输入" class="required" v-model="newContractVo.unitPriceWg" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col" v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 2)" :key="timeNum">
                    <div class="d-min">
                      <span>装修免租期</span>
                      <el-form-item class="from-item">
                        <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.fitUp" @change="timeChange(timeObj,'fitUp',true)" @focus="getContracTimeRange(newContractVo.contract,newContractVo,i)" :picker-options="contractEdit ? fitUpTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 1)" :key="timeNum">
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>经营免租期{{timeNum+1}}</span>
                      <el-form-item label=" " class="from-item">
                        <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.rentFree" @change="timeChange(timeObj,'rentFree')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,timeNum)" :picker-options="contractEdit ? rentFreeTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <el-button size="mini" v-if="timeNum != 0" type="text" style="color: #FB1D1D;position: absolute;right:10px;top:5px" @click="deleteRent(timeNum,newContractVo.budgetInstanceBizNewContRentfreeVOList)">删除</el-button>
                  </el-col>
                  <el-col :span="12" v-if="timeNum == 0">
                    <el-button v-if="timeNum == 0" type="text" @click="newContractVo.budgetInstanceBizNewContRentfreeVOList.push({freeType:1})" class="add-rentFree-btn drawerBudget-text-btn">添加</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="newFormShop" direction="rtl" :append-to-body="true" :withHeader="false" :wrapperClosable="false" size="1155px">
      <div class="dialog-close-icon" @click="newFormShop = false" style="right: 1141px;">
        <i></i>
      </div>
      <div class="drawerBudget-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>新铺信息</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="newFormSure('newForm')" v-if="!newStoreDetail">提交</el-button>
            <el-button plain @click="newFormShop = false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <el-form ref="newForm" :model="newForm">
            <div class="drawerBudget-newBunk">
              <div class="drawerBudget-info">
                <el-row :gutter="24">
                  <h4>基础信息</h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>铺位号</span>
                      <el-form-item class="from-item" prop="storeNo" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input placeholder="请输入" class="required" v-model="newForm.storeNo" :disabled="newStoreDetail || newForm.operType === 3"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>位置</span>
                      <el-form-item class="from-item" prop="floorId" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select :disabled="newStoreDetail || newForm.operType === 3" placeholder="请选择" class="required" v-model="newForm.floorId">
                          <el-option v-for="(bizType) in floorList" :label="bizType.dictName + '-' + bizType.remark" :value="bizType.dictCd" :key="bizType.dictCd"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租面积(m²)</span>
                      <el-form-item class="from-item" prop="area" :rules="{ required: true, message: ' ', trigger: 'blur' }">
                        <el-input :disabled="newStoreDetail || newForm.operType === 3" placeholder="请输入" class="required" v-model="newForm.area" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>类型</span>
                      <el-form-item class="from-item" prop="issuinglayoutcd" :rules="{ required: true, message: ' ', trigger: ['blur', 'change']}">
                        <el-select :disabled="newStoreDetail || newForm.operType === 3" placeholder="请选择" class="required" v-model="newForm.issuinglayoutcd">
                          <el-option v-for="(bizType) in layoutCdList" :label="bizType.dictName" :value="bizType.dictCd" :key="bizType.dictCd"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准租金(元)</span>
                      <el-form-item class="from-item" prop="rent" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input :disabled="newStoreDetail || newForm.operType === 3" placeholder="请输入" class="required" v-model="newForm.rent" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>标准管理费(元)</span>
                      <el-form-item class="from-item">
                        <el-input :disabled="newStoreDetail || newForm.operType === 3" placeholder="请输入" class="required" v-model="newForm.propertyFee" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-add" v-if="!newStoreDetail || newForm.operType == 3">
                <el-row :gutter="24">
                  <el-col :span="12" class="topRight-col">
                    <div class="d-min">
                      <span>新签合同</span>
                      <el-button class="drawerBudget-text-btn" type="text" @click="addContractVo(newForm,'edit')">添加新签合同</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="drawerBudget-info" v-for="(newContractVo,i) in newForm.newContractVoList" :key="i">
                <el-row :gutter="24">
                  <h4>新签合同{{i+1 | contractName}} <el-button size="mini" class="drawerBudget-text-btn" @click="deleteContractVo(mergeForm.newStoreVO.newContractVoList,i,newContractVo)" v-if="!splitInfo" type="text" style="color: #FB1D1D;">删除</el-button>
                  </h4>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>合同起止日期</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.contract`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-date-picker :readonly="newStoreDetail" class="required" type="daterange" v-model="newContractVo.contract" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange(newContractVo,'contract')" value-format="yyyy-MM-dd" prefix-icon="" clearable>
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>品牌</span>
                      <el-form-item class="from-item inner" :prop="`newContractVoList.${i}.newShopConnId`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change'] }]">
                        <el-select :readonly="newStoreDetail" v-model="newContractVo.newShopConn" filterable remote reserve-keyword :remote-method="getNewuser" @change="getUserName(newContractVo,newContractVo.newShopConn,'edit')" style="padding-right: 30px;" :loading="userLoading">
                          <!-- <el-option
                               v-for="item in userList"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id" v-if="userList.length > 0">
                             </el-option> -->
                          <template v-if="userList.length > 0">
                            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" style="max-width:356px">
                            </el-option>
                          </template>
                        </el-select>
                        <el-button type="text" @click="addUser(newContractVo)" class="add-btn button drawerBudget-text">添加</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>计租方式</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.rentType`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="newStoreDetail" class="required" v-model="newContractVo.rentType">
                          <el-option v-for="(bizType) in rentList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管支付方式</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.wgPayWay`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="newStoreDetail" class="required" v-model="newContractVo.wgPayWay">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 2">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>租金单价(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType !=2" :prop="`newContractVoList.${i}.unitPriceZj`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="newStoreDetail" class="required" v-model="newContractVo.unitPriceZj" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>固租支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 2" :prop="`newContractVoList.${i}.fixedPayPeriod`" :rules="[{ required: true, message: ' ', trigger: ['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="newStoreDetail" class="required" v-model="newContractVo.fixedPayPeriod">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>销售额方式</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newContractVoList.${i}.sellWay`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change'] }]">
                        <el-select placeholder="请选择" :readonly="newStoreDetail" class="required" v-model="newContractVo.sellWay">
                          <el-option v-for="(bizType) in sellWayList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>预估销售额(元)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newContractVoList.${i}.prospect`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="newStoreDetail" class="required" v-model="newContractVo.prospect" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24" v-if="newContractVo.rentType != 1">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点(百分比)</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newContractVoList.${i}.cutPoint`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="newStoreDetail" class="required" v-model="newContractVo.cutPoint" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="d-min">
                      <span>扣点支付周期</span>
                      <el-form-item class="from-item" v-if="newContractVo.rentType != 1" :prop="`newContractVoList.${i}.pointPayPeriod`" :rules="[{ required: true, message: ' ', trigger:['blur', 'change']}]">
                        <el-select placeholder="请选择" :readonly="newStoreDetail" class="required" v-model="newContractVo.pointPayPeriod">
                          <el-option v-for="(bizType) in cyclePayWayStoreList" :label="bizType.dictName" :value="bizType.value" :key="bizType.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="24">
                  <el-col :span="12">
                    <div class="d-min">
                      <span>物管费单价(元)</span>
                      <el-form-item class="from-item" :prop="`newContractVoList.${i}.unitPriceWg`" :rules="[{ required: true, message: ' ', trigger: 'blur' }]">
                        <el-input placeholder="请输入" :readonly="newStoreDetail" class="required" v-model="newContractVo.unitPriceWg" v-filter-check-input maxlength="12"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="right-col" v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 2)" :key="timeNum">
                    <div class="d-min">
                      <span>装修免租期</span>
                      <el-form-item class="from-item">
                        <el-date-picker :readonly="newStoreDetail" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.fitUp" @change="timeChange(timeObj,'fitUp',true)" @focus="getContracTimeRange(newContractVo.contract,newContractVo,i)" :picker-options="newFormShop ? fitUpTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row v-for="(timeObj,timeNum) in newContractVo.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 1)" :key="timeNum">
                  <el-col :span="12" class="right-col">
                    <div class="d-min">
                      <span>经营免租期{{timeNum+1}}</span>
                      <el-form-item label=" " class="from-item">
                        <el-date-picker :readonly="newStoreDetail" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="timeObj.rentFree" @change="timeChange(timeObj,'rentFree')" @focus="getContracTimeRange(newContractVo.contract,newContractVo,timeNum)" :picker-options="newFormShop ? rentFreeTime : false" placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <el-button size="mini" v-if="timeNum != 0" type="text" style="color: #FB1D1D;position: absolute;right:10px;top:5px" @click="deleteRent(timeNum,newContractVo.budgetInstanceBizNewContRentfreeVOList)">删除</el-button>
                  </el-col>
                  <el-col :span="12" v-if="timeNum == 0">
                    <el-button v-if="timeNum == 0" type="text" @click="newContractVo.budgetInstanceBizNewContRentfreeVOList.push({freeType:1})" class="add-rentFree-btn drawerBudget-text-btn">添加</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </el-drawer>

    <!-- 表头筛选 -->
    <drawer title="我是一个抽屉组件" direction="rtl" :display.sync="display" @filterSave="filterSave" :inner="false" :width="drawerWidth" :mask="true" footerBtnSave="确定" footerBtnCancel="取消" :tableHeaders="tableHeaders">

    </drawer>
  </div>
</template>

<script>
import Import from '@/components/import.vue'
import { mapGetters } from 'vuex'
import messageBox from '../../component/messageBox.vue'
import drawer from '../../component/drawer.vue'
import excel from './components/excle.vue'
import checkClearTarget from './components/checkClearTarget.vue'
import editClearTarget from './components/editClearTarget.vue'
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, rTime } from '@/utils/index'
import LeaseApi from '@/apis/apis/leaseApi'
import globalApi from '@/apis/apis/global'
export default {
  name: 'lease',
  mixins: [handle_paginator],
  created() {
    this.routerQuery = this.$route.query;
    this.getList();
    this.getFoolr();
    this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
  },
  computed: {
    ...mapGetters([
      'rentList',
      'wgPayWayList',
      'cyclePayWayList',
      'cyclePayWayStoreList',
      'sellWayList',
      'bizList',
      'contractTypeList',
      'storeChargeTypeList',
      'storeTypeList',
      'layoutCdList',
      'getBudgetYear'
    ])
  },
  components: { messageBox, drawer, excel, checkClearTarget, editClearTarget, Import },
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
    operType(val) {
      if (val == 2) {
        return '拆'
      } else if (val == 1) {
        return '合'
      }
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
    contractName(val) {
      let level = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      return level[val]
    }
  },
  watch: {
    /* checkList(newValue, oldValue) {
       this.$nextTick(() => {
         this.$refs.table.doLayout(); //解决表格错位
       });
     }, */
    'headerList': {
      handler(newName, oldName) {
        this.$nextTick(() => {
          this.$refs.table.doLayout(); //解决表格错位
        })
      },
      immediate: true,
      deep: true
    },
    splitInfo(newValue, oldValue) {
      if (!newValue) {
        this.newStoreDetail = false
      }
    },
    mergeShop(newValue, oldValue) {
      if (!newValue) {
        this.mergeSplitForm.mergeSplitTime = ' ';
        this.mergeSplitForm.storeNo = ' ';
        this.$refs.mergeSplitForm.resetFields();
        this.$set(this.splitInfoList, [])
      } else {
        this.$nextTick(() => {
          if (this.$refs.dataTable.selection.length == 0) {
            this.$refs.dataTable.toggleAllSelection()
          }
        })
      }
    },
    splitShop(newValue, oldValue) {
      if (!newValue) {
        this.mergeSplitForm.mergeSplitTime = '',
          this.mergeSplitForm.splitNum = '';
        this.$refs.mergeSplitForm.resetFields();
        this.$set(this.splitInfoList, [])
      }
    },
    editDebts(newValue, oldValue) {
      if (!newValue) {
        this.clearForm.editOwingMoneyList = []
      }
    },
    mergeFormShop(newValue, oldValue) {
      if (!newValue) {
        this.mergeForm = {
          newStoreVO: {
            newContractVoList: [{
              budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }]
            }]
          },
          operateStoreVOS: []
        }
        this.$refs.mergeForm.resetFields()
      }
    },
    newFormShop(newValue, oldValue) {
      if (!newValue) {
        this.newForm = {
          newContractVoList: [{
            budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }]
          }],
          operateStoreVOS: []
        }
        this.$refs.newForm.resetFields()
        this.newStoreDetail = false
      }
    },
    spliteFormShop(newValue, oldValue) {
      if (!newValue) {
        this.splitForm = {
          newStoreVOS: [
            {
              newContractVoList: [
                {
                  budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }]
                }
              ]
            }
          ]
        }
        this.$refs.splitForm.resetFields()
      }
    },
    contractEdit(newValue, oldValue) {
      if (!newValue && this.$refs.editContractForm) {
        this.$refs.editContractForm.resetFields()
      }
    },
    'editContractForm.operateStoreVO.isAdjust': function (newValue, oldValue) {
      this.editContractForm.newContractVoList.map(item => {
        this.$set(item, 'contract', [])
      })
    }
  },
  data() {


    let Vue = this;
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
    return {
      annual: parseInt(this.$route.query.annual),
      newStoreDetail: false,
      userLoading: false,
      storeNoList: [],
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
      mergeContractTime: {
        disabledDate: (time) => {
          return this.mergeContractTimeImit(time);
        },
      },
      fitUpTime: {
        disabledDate: (time) => {
          let that = this;
          return that.fitUpTimeImit(time, that);
        },
      },
      rentFreeTime: {
        disabledDate: (time) => {
          let that = this;
          return this.rentFreeTimeImit(time, that);
        },
      },
      isAdjust: false,
      tableHeaders: [
        {
          value: '基础信息',
          selected: true,
          indeterminate: false,
          list: [
            {
              value: '位置',
              selected: true,
            },
            {
              value: '物业类型',
              selected: true,
            },
            {
              value: '期间合同数量',
              selected: true,
            },
            {
              value: '标准租金',
              selected: true,
            },
            {
              value: '标准管理费',
              selected: true,
            },
            {
              value: '计租面积',
              selected: true,
            },
            {
              value: '业态',
              selected: true,
            },
            {
              value: '资产属性',
              selected: true,
            },
            {
              value: '历史合同单价',
              selected: true,
            },
            {
              value: '销售状态',
              selected: true,
            },
            {
              value: '返祖到期日',
              selected: true,
            },
            {
              value: '期初状态',
              selected: true,
            },
            {
              value: '是否调铺',
              selected: true,
            }
          ]
        },
        {
          value: '合同信息',
          selected: true,
          indeterminate: false,
          list: [
            {
              value: '合同号',
              selected: true,
            },
            {
              value: '合同开始日期',
              selected: true,
            },
            {
              value: '合同结束日期',
              selected: true,
            },
            {
              value: '品牌',
              selected: true,
            },
            {
              value: '计租方式',
              selected: true,
            },
            {
              value: '固定支付周期',
              selected: true,
            },
            {
              value: '租金单价',
              selected: true,
            },
            {
              value: '达成率',
              selected: true,
            },
            {
              value: '扣点支付周期',
              selected: true,
            },
            {
              value: '销售额方式',
              selected: true,
            },
            {
              value: '2021年预估销售额合计',
              selected: true,
            },
            {
              value: '预估销售额',
              selected: true,
            },
            {
              value: '扣点',
              selected: true,
            },
            {
              value: '物管费支付周期',
              selected: true,
            },
            {
              value: '管理费单价',
              selected: true,
            },
            {
              value: '经营免租期',
              selected: true,
            },
            {
              value: '装修免租期',
              selected: true,
            },
            {
              value: '租金递增率',
              selected: true,
            },
            {
              value: '租金总收入',
              selected: true,
            },
            {
              value: '管理费递增率',
              selected: true,
            },
            {
              value: '管理费总收入',
              selected: true,
            },
          ]
        },
        {
          value: '月收入',
          selected: true,
          indeterminate: false,
          list: [
            {
              value: '未来2年收入',
              selected: true,
            },
            {
              value: '有效租期',
              selected: true,
            },
          ]
        },
        {
          value: '财务初算',
          selected: true,
          indeterminate: false,
          list: [

            {
              value: '空置期',
              selected: true,
            },
            {
              value: '计租总数',
              selected: true,
            },
            {
              value: '计租月数',
              selected: true,
            },
            {
              value: '计费总数',
              selected: true,
            },
            {
              value: '计费月数',
              selected: true,
            },
            {
              value: '综合收入',
              selected: true,
            },
            {
              value: '综合收入',
              selected: true,
            },
          ]
        },
        {
          value: '未来两年',
          selected: true,
          indeterminate: false,
          list: [
            {
              value: '2022年租金递增率',
              selected: true,
            },
            {
              value: '2022年计租月数',
              selected: true,
            },
            {
              value: '2022租金额',
              selected: true,
            },
            {
              value: '2023年租金递增率',
              selected: true,
            },
            {
              value: '2023年计租月数',
              selected: true,
            },
            {
              value: '2023年租金额',
              selected: true,
            },
            {
              value: '2022年物管费递增率',
              selected: true,
            },
            {
              value: '2022年计费月数',
              selected: true,
            },
            {
              value: '2022物管费额',
              selected: true,
            },
            {
              value: '2023年物管费递增率',
              selected: true,
            },
            {
              value: '2023年计费月数',
              selected: true,
            },
            {
              value: '2023物管费额',
              selected: true,
            },
          ],
        }
      ],
      display: false,
      drawerWidth: '500px',
      mergeSplitForm: {
        mergeSplitTime: '',
        splitNum: '',
        storeNo: ''
      },
      mergeSplitRules: {
        mergeSplitTime: [{ required: true, message: " ", trigger: ['change', 'blur'] }],
        splitNum: [{ required: true, message: " ", trigger: 'blur' }],
        storeNo: [{ required: true, message: " ", trigger: 'blur' }]
      },
      checkList: [],
      splitForm: {
        newStoreVOS: [
          {
            newContractVoList: [
              {
                budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }]
              }
            ]
          }
        ]
      },
      mergeForm: {
        newStoreVO: {
          newContractVoList: [{
            budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }]
          }]
        },
        operateStoreVOS: []
      },
      editDebts: false,
      updateClear: false,
      contractEdit: false,
      houseEdit: false,
      splitInfo: false,
      spliteFormShop: false,
      splitShop: false,
      newDrawer: true,
      mergeInfo: false,
      mergeFormShop: false,
      mergeShop: false,
      updateShop: false,
      newSign: false,
      addDebts: false,
      checkDebts: false,
      selectItem: [],
      mergeSplit: false,
      pageInfo: {
        importUrl: '/bizLease/excelImport',
        pageSize: 10,
        pageNum: 1,
        total: 0,
        bean: {
          annual: this.$route.query.annual,
          budgetInstanceSheetId: this.$route.query.budgetInstanceSheetId,
          storeType: 1,
          queryWord: '',
          chargeType: '',
          isNewStore: '',
          floorId: ''
        },
      },
      importParams: {
        "chargeType": 1,
        "assetAttr": "1",
        "budgetInstanceSheetId": this.$route.query.bunk,
      },
      routerQuery: null,
      tableData: [],
      editList: [],
      userList: [],
      checkBizClearData: [],
      addBizClearTable: [],
      owingMoneyList: [],
      clearForm: {
        editOwingMoneyList: [],
      },
      clearRules: {
        finishDate: [{ required: true, validator: checkTime, trigger: ['blur', 'change'] }],
        target: [{ required: true, validator: checkTarget, trigger: ['blur', 'change'] }],
      },
      splitRules: {
        area: { required: true, message: "请输入", trigger: 'blur' },
        bizType: { required: true, message: "请选择", trigger: 'change' },
        rent: { required: true, message: "请输入", trigger: 'blur' },
        contractType: { required: true, message: "请选择", trigger: 'change' },
        contract: { required: true, message: "请输入", trigger: 'change' },
        newShopConnId: { required: true, message: "请选择", trigger: 'change' },
        rentType: { required: true, message: "请选择", trigger: 'change' },
        fixedPayPeriod: { required: true, message: "请选择", trigger: 'change' },
        unitPriceZj: { required: true, message: "请输入", trigger: 'change' },
        pointPayPeriod: { required: true, message: "请选择", trigger: 'change' },
        sellWay: { required: true, message: "请选择", trigger: 'change' },
        prospect: { required: true, message: "请输入", trigger: 'blur' },
        cutPoint: { required: true, message: "请输入", trigger: 'blur' },
        wgPayWay: { required: true, message: "请选择", trigger: 'change' },
        unitPriceWg: { required: true, message: "请输入", trigger: 'blur' },
      },
      lease: '',
      editOwingMoneyListSlected: [],
      //mergeSplitTime:'',
      mergeList: [],
      target: '',
      mergeInfoList: [],
      splitInfoList: [],
      mergeSplitWarn: false,
      //splitNum:'',
      /* rentList:[],
      wgPayWayList:[],
      cyclePayWayList:[],
      sellWayList:[],
      bizList:[],
      contractTypeList:[], */
      mergeInfoData: {
        newStoreVO: {
          newContractVoList: [{}]
        }
      },
      splitInfoData: {
        newStoreVOS: [
          {
            newContractVoList: [{}]
          }
        ],
        operateStoreVO: {}
      },
      loading: false,
      addUserBtn: true,
      addUserName: '',
      editContractForm: {
        newContractVoList: [{
          budgetInstanceBizNewContRentfreeVOList: [
            {
              freeType: 1
            },
            {
              freeType: 2
            },
          ]
        }],
        operateStoreVO: {},
        budgetInstanceBizLeaseVOS: []
      },
      changeShop: true,
      headerList: '',
      floorList: [],
      contractItem: '',
      contractIndex: '',
      contractImit: '',
      fitUpImit: '',
      isEmpty: true,
      newFormShop: false,
      newForm: {
        newContractVoList: [{
          budgetInstanceBizNewContRentfreeVOList: [
            {
              freeType: 1
            },
            {
              freeType: 2
            },
          ]
        }]
      }
    }
  },
  methods: {
    rTime,
    //删除经营免租期
    deleteRent(num, rentList) {
      let fitupNum = rentList.findIndex(item => item.freeType == 2);
      if (fitupNum <= num && fitupNum >= 0) {
        rentList.splice(num + 1, 1);
      } else if (fitupNum > num) {
        rentList.splice(num - 1, 1);
      } else {
        rentList.splice(num, 1);
      }
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
    //新铺信息
    async getOperStore(storeId) {
      await LeaseApi.getOperStore(storeId).then(res => {
        if (res.code === 0 && res.data) {
          this.newStoreDetail = true
          this.splitInfo = true
          this.splitInfoData = res.data
        }
      })
    },
    mergeOperate() {
      let chargeTypeList = [];
      let assetAttrList = [];
      this.selectItem.map(item => {
        chargeTypeList.push(item.chargeType);
        assetAttrList.push(item.assetAttr)
      })
      if (Math.max.apply(null, chargeTypeList) == Math.min.apply(null, chargeTypeList) && Math.max.apply(null, assetAttrList) == Math.min.apply(null, assetAttrList)) {
        this.mergeShop = true;
        this.splitInfoList = JSON.parse(JSON.stringify(this.selectItem));
      } else {
        this.$message.warning('同物业类型、同资产属性才能合铺');
      }

    },
    //合同日期范围遍历
    getContracTimeRange(contract, obj, index) {
      this.contractItem = JSON.parse(JSON.stringify(obj));
      this.contractImit = contract;
      this.contractIndex = index;
    },
    //装修日期范围遍历
    getfitTimeRange(fitUp) {
      this.fitUpImit = fitUp
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
      this.editContractForm.budgetInstanceBizLeaseVOS.map(item => {
        list.push(new Date(item.contEndDate).getTime())
      })
      let maxTime = Math.max(list)
      if (maxTime && !this.editContractForm.operateStoreVO.isAdjust) {
        return time.getTime() < maxTime
      } else {
        let finishDateTime = new Date(this.editContractForm.operateStoreVO.finishDate).getTime() - 24 * 3600 * 1000;
        return time.getTime() < finishDateTime
      }
    },
    mergeContractTimeImit(time) {
      let minTime = new Date(this.$route.query.annual + '-01-01 00:00:01').getTime() - 24 * 3600 * 1000;
      let maxTime = new Date(Number(this.$route.query.annual) + 1 + '-01-01 00:00:01').getTime() - 24 * 3600 * 1000;
      return time.getTime() > maxTime || time.getTime() < minTime
    },
    fitUpTimeImit(time, that) {
      let reetList = this.contractItem.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 1);
      if (that.contractImit) {
        let listRent = [];
        let minTime = new Date(that.contractImit[0]).getTime() - 24 * 3600 * 1000;
        let maxTime = new Date(that.contractImit[1]).getTime();
        return time.getTime() > maxTime || time.getTime() < minTime || this.getRentList(reetList, time.getTime())
      }
    },
    getRentList(list, currentTime, index) {
      let flog = false
      if (index || index == 0) {
        list.map((item, i) => {
          if (index != i && item.rentFree) {
            if (currentTime >= new Date(item.rentFree[0]).getTime() && currentTime <= new Date(item.rentFree[1]).getTime()) {
              flog = true
            }
          }

        })
      } else {
        list.map(item => {
          if (item.rentFree) {
            if (currentTime >= new Date(item.rentFree[0]).getTime() && currentTime <= new Date(item.rentFree[1]).getTime()) {
              flog = true
            }
          }
        })
      }

      return flog
    },

    rentFreeTimeImit(time, that) {
      let fitUpObj = this.contractItem.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 2)[0]
      let fitUp = [];
      if (fitUpObj) {
        fitUp = fitUpObj.fitUp || [fitUpObj.freeStart, fitUpObj.freeEnd]
      }
      let reetList = this.contractItem.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 1);
      let minTime = new Date(that.contractImit[0]).getTime() - 24 * 3600 * 1000;
      let maxTime = new Date(that.contractImit[1]).getTime();
      if (that.contractImit && !fitUp) {
        return time.getTime() < minTime || time.getTime() > maxTime || this.getRentList(reetList, time.getTime(), this.contractIndex)
      } else if (that.contractImit && fitUp) {
        let fitUpFlog = time.getTime() >= new Date(fitUp[0]).getTime() && time.getTime() <= new Date(fitUp[1]).getTime()
        return time.getTime() < minTime || time.getTime() > maxTime || fitUpFlog || this.getRentList(reetList, time.getTime(), this.contractIndex)
      }
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    //楼层
    async getFoolr() {
      let params = {
        projectId: this.$route.query.projectId
      }
      await LeaseApi.getFloorList(params).then(res => {
        if (res.code === 0 && res.data) {
          res.data.map(item => {
            item.value = item.dictCd
          })
          this.floorList = res.data
        }
      })
    },
    //filterSave
    filterSave(data) {
      this.display = data;
      this.headerList = JSON.parse(JSON.stringify(this.tableHeaders))
      //this.headerList = Object.assign([], this.tableHeaders);
    },
    //过滤
    headerFilter(parentVal, val) {
      let arr = this.headerList.filter(item => item.value == parentVal);
      if (arr[0].list) {
        let list = arr[0].list;
        return list.filter(obj => obj.value == val)[0].selected
      }
    },
    //判断复选框是否可被勾选
    selectable(row, index) {
      if (row.operType == 1 || row.operType == 2 || !row.id) {
        return false
      } else {
        return true
      }
    },
    //起始时间更改
    timeChange(obj, type, edit) {
      switch (type) {
        case 'rentFree':
          if (obj.rentFree) {
            this.$set(obj, 'freeStart', obj.rentFree[0]);
            this.$set(obj, 'freeEnd', obj.rentFree[1]);
            this.$set(obj, 'freeType', 1);
          } else {
            this.$set(obj, 'freeStart', '');
            this.$set(obj, 'freeEnd', '');
            this.$set(obj, 'freeType', 1);
          }
          break;
        case 'fitUp':
          if (edit) {
            if (obj.fitUp) {
              this.$set(obj, 'freeStart', obj.fitUp[0]);
              this.$set(obj, 'freeEnd', obj.fitUp[1]);
              this.$set(obj, 'freeType', 2);
            } else {
              this.$set(obj, 'freeStart', '');
              this.$set(obj, 'freeEnd', '');
              this.$set(obj, 'freeType', 2);
            }
          } else {
            obj.budgetInstanceBizNewContRentfreeVOList.push({
              freeStart: obj.fitUp[0],
              freeEnd: obj.fitUp[1],
              freeType: 2
            })
          }
          break;
        case 'contract':
          if (edit && this.editContractForm.operateStoreVO.isAdjust && !this.editContractForm.operateStoreVO.finishDate) {
            this.$message.warning('请先选择调铺生效日期');
            this.$set(obj, 'contract', []);
            return false
          }
          if (obj.contract) {
            this.$set(obj, 'contractStart', obj.contract[0]);
            this.$set(obj, 'contractEnd', obj.contract[1]);
          } else {
            this.$set(obj, 'contractStart', '');
            this.$set(obj, 'contractEnd', '');
            this.$set(obj, 'contract', []);
          }

          break;
      }
    },
    //扩展
    toggle(v) {
      this.headerList.map(item => {
        let status = item.selected;
        if (item.value == v) {
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
    //新增用户
    async addUser(item) {
      let params = {
        merchantName: this.addUserName
      }
      await LeaseApi.addUser(params).then(res => {
        if (res.code === 0 && res.data) {
          this.addUserBtn = true
          this.userList = []
          this.userList.push({
            id: res.data.merchantId,
            name: res.data.merchantName
          })
          item.newShopConnId = res.data.merchantId;
          item.newShopConn = res.data.merchantId;
          item.newShopConnName = this.addUserName;
          this.$forceUpdate()
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
    getUserName(obj, val, type) {
      if (type == 'edit') {
        obj.newShopConnId = val;
      }
      obj.newShopConnName = this.userList.filter(item => item.id == val)[0].name;
      this.userList = [];
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
        pageNum: 1,
        total: 0,
        bean: {
          annual: this.$route.query.annual,
          budgetInstanceSheetId: this.$route.query.budgetInstanceSheetId,
          storeType: 1,
          queryWord: '',
          chargeType: '',
          isNewStore: '',
          floorId: ''
        },
      }
      this.getList()
    },
    // 查询列表
    async getList() {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.find(params).then(res => {
        if (res.code === 0 && res.data) {
          this.tableData = res.data.list;
          this.pageInfo.total = res.data.total;
          getDynamicTableHeight(this);
        }
      })
    },
    //点击编辑
    editItem(item) {
      this.$set(item, 'editable', true);
      this.editList.push(item);
      //item.editable = true
      /* let params = {
         ...item
       }
       await LeaseApi.edit(params).then(res => {
         if(res.code === 0 && res.data){
            debugger
         }
       }) */
    },
    //选择合铺店铺
    merge(val) {
      this.mergeList = val
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
        date: this.editContractForm.operateStoreVO.finishDate,
        storeIds: this.editContractForm.operateStoreVO.storeId
      }
      await LeaseApi.mergeSplit(params).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          this.isEmpty = false
        }
      })
    },
    //拆铺合铺通过租赁id和生效日期查找
    async splitOperate(type) {
      //this.splitShop = true;
      //this.mergeSplit = false;
      let idList = [];
      this.mergeSplitWarn = true;
      if (type == 'merge') {
        this.mergeList.map((item) => {
          idList.push(item.storeId)
        })
      } else {
        this.selectItem.map((item) => {
          idList.push(item.storeId)
        })
      }
      let params = {
        date: this.mergeSplitForm.mergeSplitTime,
        storeIds: idList
      }
      await LeaseApi.mergeSplit(params).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          res.data.map(obj => {
            this.splitInfoList.map((item, i) => {
              let storeId = item.storeId;
              //this.$set(item, 'isEmpty', false);
              if (obj[storeId]) {
                this.$set(item, 'isEmpty', false)
                this.$set(item, 'remark', obj[storeId])
              }
            })
          })
          /* this.splitInfoList.map((item,i) => {
            let storeId = item.storeId;
            if(res.data[i] && res.data[i][storeId]) {
              this.$set(item,'isAdjust',true)
              this.$set(item,'remark',res.data[i][storeId])
            }else {
              this.$set(item,'isAdjust',false)
            }

          }) */
        }
      })
    },
    //欠费信息
    async getOwingMoney(item) {
      let params = {
        contId: item.contId,
        id: item.id,
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
        contId: item.contId,
        id: item.id,
        storeId: item.storeId
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
    updateClearChange(val) {
      val.map(item => {
        if (item.selected) {
          //val.selected = false
          this.$set(item, 'selected', false)
        } else {
          //val.selected = true
          this.$set(item, 'selected', true)
        }
      })
      this.editOwingMoneyListSlected = val;
    },
    //修改欠费清单
    async updateBizClear(form) {
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
        this.editOwingMoneyListSlected.map(obj => {
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
    async newFormSure(form) {
      console.log(this.newForm)
      await LeaseApi.editNewStoreVO(this.newForm).then(res => {
        if (res.code === 0 && res.data) {
          this.newFormShop = false
          this.getList()
        }
      })
    },
    async editNew(item) {
      this.newFormShop = true
      await LeaseApi.getNewStoreVO(item.storeId).then(res => {
        if (res.code === 0 && res.data) {
          this.newForm = res.data;
          this.newForm.newContractVoList.map(item => {
            this.$set(item, 'newShopConn', item.newShopConnName);
            this.$set(item, 'contract', [item.contractStart, item.contractEnd]);
            item.budgetInstanceBizNewContRentfreeVOList.map(obj => {
              if (obj.freeType == 2) {
                this.$set(obj, 'fitUp', [obj.freeStart ? obj.freeStart : '', obj.freeEnd ? obj.freeEnd : ''])
              } else {
                this.$set(obj, 'rentFree', [obj.freeStart ? obj.freeStart : '', obj.freeEnd ? obj.freeEnd : ''])
              }

            })
          })
        }
      })
    },
    async editContract(item) {
      this.contractEdit = true;
      this.editContractForm.operateStoreVO = {
        annual: item.annual,
        budgetInstanceBizLeaseId: item.id,
        projectId: item.projectId,
        storeId: item.storeId,
        storeNo: item.storeNo,
        buildingNum: item.buildingNum,
        floorNum: item.floorNum, //楼层",
        storeType: item.storeType, //铺位类型",
        isEmpty: item.isEmpty,//是否为空铺1是0否",
        operType: item.operType, //操作类型 2:拆,1:合",
        remark: item.remark, //备注,说明",
        finishDate: item.finishDate,//拆铺完成时间"
        unitNo: item.unitNo,
        layoutName: item.layoutName,
        layoutCd: item.layoutCd,
        assetAttr: item.assetAttr,
        isAdjust: item.isAdjust,
      };
      await LeaseApi.getChangeStore(item.id).then(res => {
        if (res.code === 0 && res.data) {
          this.editContractForm.budgetInstanceBizLeaseVOS = res.data.budgetInstanceBizLeaseVOS;
          res.data.newContractVoList.map(item => {
            item.newShopConn = item.newShopConnName || item.newShopConnId
          })
          this.editContractForm.newContractVoList = res.data.newContractVoList;
          if (res.data.newContractVoList.length != 0) {
            this.editContractForm.newContractVoList = res.data.newContractVoList;
            this.editContractForm.newContractVoList.map(item => {
              this.$set(item, 'contract', [item.contractStart, item.contractEnd]);
              //item.contract = [item.contractStart, item.contractEnd];
              item.budgetInstanceBizNewContRentfreeVOList.map((obj, i) => {
                if (obj.freeType == 2) {
                  //obj.fitUp = [obj.freeStart?obj.freeStart:'', obj.freeEnd?obj.freeEnd:''];
                  this.$set(obj, 'fitUp', [obj.freeStart, obj.freeEnd])
                } else {
                  //obj.rentFree = [obj.freeStart?obj.freeStart:'', obj.freeEnd?obj.freeEnd:''];
                  this.$set(obj, 'rentFree', [obj.freeStart, obj.freeEnd])
                }
              })
              if (item.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 1).length == 0) {
                item.budgetInstanceBizNewContRentfreeVOList.push({
                  fitUp: [],
                  rentFree: [],
                  freeType: 1
                })
              }
              if (item.budgetInstanceBizNewContRentfreeVOList.filter(item => item.freeType == 2).length == 0) {
                item.budgetInstanceBizNewContRentfreeVOList.push({
                  fitUp: [],
                  rentFree: [],
                  freeType: 2
                })
              }
            })
          } else {
            this.editContractForm.newContractVoList.push({ budgetInstanceBizNewContRentfreeVOList: [{ freeType: 2 }, { freeType: 1 }] })
          }
          if (!this.editContractForm.operateStoreVO) {
            this.$set(this.editContractForm, 'operateStoreVO', {})
          }
          if (res.data.operateStoreVO) {
            this.editContractForm.operateStoreVO.id = res.data.operateStoreVO.id;
            this.editContractForm.operateStoreVO.newStoreId = res.data.operateStoreVO.newStoreId ? res.data.operateStoreVO.newStoreId : '';
            this.editContractForm.operateStoreVO.isAdjust = res.data.operateStoreVO.isAdjust;
            this.editContractForm.operateStoreVO.finishDate = res.data.operateStoreVO.finishDate
          } else {
            this.$set(this.editContractForm.operateStoreVO, 'isAdjust', false)
          }
        }

      })
    },
    handelSelecte(val) {
      this.selectItem = [...val];
    },
    async contractEditSure(from) {
      let flog = false;
      console.log(this.$refs[from]);
      /* this.$nextTick(() => { */
      if (this.$refs[from]) {
        this.$refs[from].validate(valid => {
          if (valid) {
            flog = true;
          }
        })
      } else {
        flog = true;
      }
      /* }) */
      if (flog) {
        let formInfo = { ...this.editContractForm };
        formInfo.newContractVoList.map(child => {
          delete child.fitUp;
          child.budgetInstanceBizNewContRentfreeVOList.map(timeObj => {
            delete timeObj.rentFree;
            delete timeObj.contract;
            //delete timeObj.fitUp;
            return timeObj
          })
        })
        if ((!this.constructEditShow() && this.editContractForm.operateStoreVO.isAdjust) || this.constructEditShow()) {
          // 创建新签合同条件
        } else {
          formInfo.newContractVoList = []
        }
        await LeaseApi.addChangeStore(formInfo).then(res => {
          if (res.code === 0 && res.data) {
            this.contractEdit = false;
            this.getList()
          }
        })
      }
    },
    update() {
      this.checkDebts = false;
      this.getEditOwingMoney(this.lease)
    },
    async cancelMerge() {
      await LeaseApi.deleteMergeStore(this.mergeInfoData).then(res => {
        if (res.code === 0 && res.data) {
          this.mergeInfo = false;
          this.getList()
        }
      })
    },
    async mergeFormSure(form) {
      let flog = false;
      this.$refs[form].validate(valid => {
        if (valid) {
          flog = true;
        }
      })
      if (flog) {
        console.log(this.layoutCdList);
        let floorId = this.mergeForm.newStoreVO.floorId;
        this.mergeForm.newStoreVO.floorNum = this.floorList.filter(item => item.value == floorId)[0].dictName
        this.mergeList.map(item => {
          this.mergeForm.operateStoreVOS.push({
            annual: item.annual,
            budgetInstanceBizLeaseId: item.id,
            projectId: item.projectId,
            storeId: item.storeId,
            storeNo: item.storeNo,
            buildingNum: item.buildingNum,
            floorNum: item.floorNum,
            storeType: item.storeType,
            isEmpty: item.isEmpty,
            /* operType:this.splitInfoList[0].operType, */
            remark: item.remark,
            finishDate: this.mergeForm.newStoreVO.finishDate
          })
        })
        let formInfo = { ...this.mergeForm };

        formInfo.newStoreVO.newContractVoList.map(child => {
          delete child.fitUp;
          child.budgetInstanceBizNewContRentfreeVOList.map(item => {
            delete item.rentFree;
            delete item.contract;
            //delete item.fitUp;
            return item
          })
        })
        await LeaseApi.addMergeStore(formInfo).then(res => {
          if (res.code === 0 && res.data) {
            this.mergeFormShop = false;
            //this.splitInfo = true;
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    async spliteFormSure(form) {
      console.log(this.splitForm.newStoreVOS[0]);
      let result = false;
      this.$refs[form].validate((valid) => {
        if (valid) {
          result = true
        }
      })
      if (result) {
        this.splitForm.operateStoreVO = {
          annual: this.splitInfoList[0].annual,
          budgetInstanceBizLeaseId: this.splitInfoList[0].id,
          projectId: this.splitInfoList[0].projectId,
          storeId: this.splitInfoList[0].storeId,
          storeNo: this.splitInfoList[0].storeNo,
          buildingNum: this.splitInfoList[0].buildingNum,
          floorNum: this.splitInfoList[0].floorNum,
          storeType: this.splitInfoList[0].storeType,
          isEmpty: this.splitInfoList[0].isEmpty,
          /* operType:this.splitInfoList[0].operType, */
          remark: this.splitInfoList[0].remark,
          finishDate: this.splitForm.newStoreVOS[0].finishDate//this.splitInfoList[0].finishDate
          //id:this.splitInfoList[0].id
        }

        let formInfo = { ...this.splitForm };
        formInfo.newStoreVOS.map(item => {
          //this.$set(item, 'finishDate', this.splitForm.newStoreVOS[0].finishDate);
          item.newContractVoList.map(child => {
            delete child.fitUp;
            child.budgetInstanceBizNewContRentfreeVOList.map(timeObj => {
              delete timeObj.rentFree;
              delete timeObj.contract;
              //delete timeObj.fitUp;
              return timeObj
            })
          })
        })
        await LeaseApi.addSplitStore(formInfo).then(res => {
          if (res.code === 0 && res.data) {
            this.spliteFormShop = false;
            this.getList()
          }
        })
      }
    },
    async getSplitInfo(item) {
      this.splitInfo = true;
      //this.spliteFormShop = true;
      await LeaseApi.getSplitInfo(item.id).then(res => {
        if (res.code === 0 && res.data) {
          this.splitInfoData = res.data;
          //this.splitForm = res.data
        }
      })
    },
    async getMergeInfo(item) {
      this.mergeInfo = true;
      //this.mergeFormShop = true;
      await LeaseApi.getMergeInfo(item.id).then(res => {
        if (res.code === 0 && res.data) {
          this.mergeInfoData = res.data;
          //this.mergeForm = res.data
        }
      })
    },
    splitInfoClose() {

    },
    async cancelSplit() {
      await LeaseApi.deleteSplitStore(this.splitInfoData).then(res => {
        if (res.code === 0 && res.data) {
          this.splitInfo = false;
          this.getList()
        }
      })
    },
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
    //新增合同
    addContractVo(splitNew, type) {
      let list = [];
      if (this.editContractForm.budgetInstanceBizLeaseVOS.length > 0) {
        this.editContractForm.budgetInstanceBizLeaseVOS.map(item => {
          list.push(new Date(item.contEndDate).getTime())
        })
        let annual = new Date(Number(this.$route.query.annual) + 1 + '-01-01 00:00:01').getTime();
        let maxTime = Math.max(...list);
        if (maxTime && maxTime > annual) {
          if (!this.editContractForm.operateStoreVO.isAdjust) {
            this.$message.warning('已有合同覆盖编制年全年，无法添加新合同，如需调铺请操作调铺')
            return false
          }
        }
      }
      if (splitNew.newContractVoList) {
        if (type == 'edit') {
          splitNew.newContractVoList.push({
            budgetInstanceBizNewContRentfreeVOList: [
              { freeType: 1 }, { freeType: 2 }
            ]
          })
        } else {
          splitNew.newContractVoList.push({ budgetInstanceBizNewContRentfreeVOList: [{ freeType: 1 }] })
        }
      } else {
        this.$set(splitNew, 'newContractVoList', [{ budgetInstanceBizNewContRentfreeVOList: [{}] }])
      }
    },
    spliteNext(form) {
      let time = this.mergeSplitForm.mergeSplitTime;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.spliteFormShop = true;
          for (var i = 0; i < this.mergeSplitForm.splitNum - 1; i++) {
            this.splitForm.newStoreVOS.push({
              newContractVoList: [{
                budgetInstanceBizNewContRentfreeVOList: [
                  {
                    freeType: 1
                  }
                ]
              }]
            })
            this.$set(this.splitForm.newStoreVOS[i], 'finishDate', time);
          }
          this.splitShop = false;
        }
      })
    },
    mergeNext(form) {
      console.log(this.mergeSplitForm);
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.mergeFormShop = true;
          //this.$set(this.mergeForm.newStoreVO,'storeNo',this.mergeSplitForm.storeNo);
          this.$set(this.mergeForm.newStoreVO, 'finishDate', this.mergeSplitForm.mergeSplitTime);
          //this.mergeForm.newStoreVO.storeNo = this.mergeSplitForm.storeNo
          this.mergeShop = false;
        }
      })
    },
    cancel() {
      this.newDrawer = false
    },
    //导出

    async getExcle() {
      const params = {
        ...this.pageInfo
      }
      await LeaseApi.getExcle({ param: JSON.stringify(params) }).then(data => {

        var blob = new Blob([data], { type: "application/vnd.ms-excel" });
        var objectUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        var filename = "铺位列表.xls";
        a.setAttribute('download', filename);
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.$message({ message: '导出成功！', type: 'success' })
      })

    },
    //获取铺号列表
    async getStoreNoList(query) {
      let params = {
        projectId: this.$route.query.projectId,
        storeNo: query
      }
      await LeaseApi.getStoreNo(params).then(res => {
        if (res.code === 0 && res.data) {
          this.storeNoList = res.data;
          if (res.data.length == 0) {
            this.$message.warning('查无此铺，请输入正确的单元编号或铺号')
          }
        }
      })
    },
    //添加合铺铺号
    addMergeStore(val) {
      let list = this.storeNoList.filter(item => item.storeNo == val)[0];
      list.selected = true;
      this.mergeList.push(list);
      this.splitInfoList.push(list);
      this.$refs.dataTable.toggleRowSelection(list, true);
      this.splitOperate('merge');
      this.mergeSplitForm.storeNo = ''
    },
    //删除合同
    async deleteContractVo(list, i, item) {
      if (item.id && item.id != 0) {
        await LeaseApi.deleteContract(item).then(res => {
          if (res.code === 0 && res.data) {
            console.log(res.data)
          }
        })
      }
      list.splice(i, 1)
    },
  },

}
</script>

<style type="text/css" lang="scss" scoped>
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
.dot {
  background: #ed1111;
}
.merge-split-operate {
  position: absolute;
  right: 38px;
  top: 100%;
  z-index: 10;
  width: 74px;
  button {
    width: 100%;
    background-color: #fff;
    border: none;
    padding: 5px 0;
    color: #468ceb;
    &:hover {
      background: #468ced;
      color: #fff;
    }
  }
}
.merge-txt {
  line-height: 40px;
}
.merge-info {
  h1 {
    margin: 20px 0;
    font-size: 16px;
  }
  h2 {
    margin: 20px 0;
    font-size: 14x;
  }
  .new-shop-info {
    padding: 10px 0;
    label {
      display: inline-block;
      width: 130px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
.add-rentFree-btn {
  position: absolute;
  top: 0;
  left: 15px;
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
.clearTarget {
  color: #468ceb;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lightRed {
  color: #ac3838;
}
.unitNo {
  display: inline-block;
  padding-left: 30px;
  position: relative;
  height: 24px;
  line-height: 24px;
  .newShop {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 6px;
    background-color: #ac3838;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    font-size: 12px;
  }
  .operType {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0 6px;
    background-color: #f7b51a;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    font-size: 12px;
  }
}
.name-wrapper {
  opacity: 0;
  height: 0;
}
.tool-bar {
  .el-icon-search {
    &::before {
      position: absolute;
      top: 8px;
      left: 3px;
      color: #dcdfe6;
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
.shop-page {
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
    width: 35px;
    border-radius: 0;
    border-color: #e6f2f3;
    background: linear-gradient(
      298deg,
      rgba(70, 140, 235, 1) 0%,
      rgba(53, 171, 255, 1) 100%
    );
  }

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
