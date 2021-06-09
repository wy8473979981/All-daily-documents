<template>
  <!-- 预算编制-费用支出-返租支出 -->
  <div class="list-page leasebackPay">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle" style="flex-flow: wrap;">
      <el-col :span="12">
        <el-select v-if="!isEdit" placeholder="请选择业态" size="mini" v-model="query.bizTypeId" @change="getListChange" filterable clearable style="margin-right: 5px; width: 180px;">
          <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
          </el-option>
        </el-select>
        <el-input placeholder="请输入业主名称" size="mini" class="import-input" v-model="query.ownerName" style="margin-right: 5px; width: 260px;">
          <el-button slot="append" icon="el-icon-search" @click="getListChange()"></el-button>
        </el-input>
        <!-- <el-button v-if="!isEdit" @click="getList" size="mini" type="success">查询</el-button> -->
        <el-button v-if="!isEdit" @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <!-- <ys-import v-if="!isEdit" :params="importParams" @update="getList"></ys-import> -->
        <ys-export v-if="!isEdit" :params="exportParams"></ys-export>
        <!-- <el-button v-if="!isEdit" @click="edit" size="mini" type="success">编辑</el-button> -->
        <!-- <el-button v-if="isEdit" @click="add" size="mini" type="success" plain>添加</el-button> -->
        <!-- <el-button v-if="isEdit" @click="del" size="mini" type="danger" plain>删除</el-button> -->
        <!-- <el-button v-if="isEdit" @click="save" size="mini" type="success">保存</el-button> -->
        <!-- <el-button v-if="isEdit" @click="cancel" size="mini" type="warning" plain>取消</el-button> -->
      </el-col>
    </el-row>
    <el-table class="table-input-box" ref="table" :data="tableData" @selection-change="handleSelectionChange" size="mini" border stripe header-row-class-name="table-header" :height="this.$store.state.tableHeight" :cell-style="{ padding: '4px 0' }">
      <el-table-column v-if="isEdit" type="selection" width="50" fixed />
      <el-table-column fixed min-width="140" label="业态" :show-overflow-tooltip="!isEdit" prop="bizType">
        <template slot-scope="scope">
          <el-select v-if="isEdit && scope.$index == selectIndex" placeholder="请选择" size="mini" v-model="scope.row.bizTypeId" @change="bizTypeIdChange(scope.$index, $event)">
            <el-option v-for="item in bizTypeIdList" :key="item.dictCd" :label="item.dictName" :value="item.dictCd">
            </el-option>
          </el-select>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.bizType || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="项目公司" :show-overflow-tooltip="!isEdit" prop="project">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.project" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.project || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="楼栋名称" :show-overflow-tooltip="!isEdit" prop="building" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.building" placeholder="请输入" size="mini"></el-input>
          <p v-else @click="showInput(scope.$index)">{{ scope.row.building || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed min-width="140" label="地产房号" :show-overflow-tooltip="!isEdit" prop="roomNum" align="right">
        <template slot-scope="scope">
          <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.roomNum" placeholder="请输入" size="mini"></el-input>
          <!-- <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'roomNum',true,false,'bizType',0) }}</p> -->
          <p v-else @click="showInput(scope.$index)">{{ scope.row.roomNum || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="商铺销售信息" align="center">
        <el-table-column min-width="140" label="业主名称" :show-overflow-tooltip="!isEdit" prop="ownerName" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.ownerName" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.ownerName || '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="签约日期" :show-overflow-tooltip="!isEdit" prop="signingDate" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.signingDate" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.signingDate || '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="建筑面积" :show-overflow-tooltip="!isEdit" prop="area" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.area" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'area') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="折前总价" :show-overflow-tooltip="!isEdit" prop="originalPrice" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.originalPrice" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'originalPrice') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="成交总价" :show-overflow-tooltip="!isEdit" prop="finalPrice" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.finalPrice" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'finalPrice') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="折扣率(%)" show-overflow-tooltip prop="discountPer" align="right">
          <template slot-scope="scope">
            <p>{{ returnValue(scope.row,'discountPer',true,false,'bizType',2,'%') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="预计交房日" :show-overflow-tooltip="!isEdit" prop="expectDate" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.expectDate" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.expectDate || '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="实际交房日" :show-overflow-tooltip="!isEdit" prop="realityDate" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.realityDate" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.realityDate || '' }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="商铺委托租赁信息" align="center">
        <el-table-column min-width="140" label="是否已出租" :show-overflow-tooltip="!isEdit" prop="isRented">
          <template slot-scope="scope">
            <el-select v-if="isEdit && scope.$index == selectIndex" placeholder="请选择" size="mini" v-model="scope.row.isRented">
              <el-option v-for="item in isRentedList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <p v-else @click="showInput(scope.$index)">
              <span v-if="scope.row.isRented == null">-</span>
              <span v-if="scope.row.isRented == 0">否</span>
              <span v-if="scope.row.isRented == 1">是</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="委托租赁条款" :show-overflow-tooltip="!isEdit" prop="clause" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.clause" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.clause || '' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="返租比例第1年(%)" :show-overflow-tooltip="!isEdit" prop="firstYear" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.firstYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'firstYear') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="返租比例第2年(%)" :show-overflow-tooltip="!isEdit" prop="secondYear" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.secondYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'secondYear') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="返租比例第3年(%)" :show-overflow-tooltip="!isEdit" prop="thirdYear" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.thirdYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'thirdYear') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="返租比例第4年(%)" :show-overflow-tooltip="!isEdit" prop="fourthYear" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fourthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fourthYear') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="返租比例第5年(%)" :show-overflow-tooltip="!isEdit" prop="fifthYear" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.fifthYear" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'fifthYear') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="后N年是否有选择权" :show-overflow-tooltip="!isEdit" prop="isOption" align="right">
          <template slot-scope="scope">
            <el-select v-if="isEdit && scope.$index == selectIndex" placeholder="请选择" size="mini" v-model="scope.row.isOption">
              <el-option v-for="item in isRentedList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <p v-else @click="showInput(scope.$index)">
              <span v-if="scope.row.isOption == null">-</span>
              <span v-if="scope.row.isOption == 0">否</span>
              <span v-if="scope.row.isOption == 1">是</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="委托租赁起始日" :show-overflow-tooltip="!isEdit" prop="start" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.start" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.start || '-' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="返租起始日" :show-overflow-tooltip="!isEdit" prop="leaseback" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.leaseback" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.leaseback || '-' }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="委托租赁结束日" :show-overflow-tooltip="!isEdit" prop="end" align="right">
          <template slot-scope="scope">
            <el-date-picker v-if="isEdit && scope.$index == selectIndex" v-model.trim="scope.row.end" value-format="yyyy-MM-dd" prefix-icon="" size="mini" clearable placeholder="请选择">
            </el-date-picker>
            <p v-else @click="showInput(scope.$index)">{{ scope.row.end || '-' }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="各年返租租金" align="center">
        <el-table-column min-width="140" label="第1年" show-overflow-tooltip prop="firstYearSum" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'firstYearSum',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第2年" :show-overflow-tooltip="!isEdit" prop="secondYearSum" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'secondYearSum',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第3年" :show-overflow-tooltip="!isEdit" prop="thirdYearSum" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'thirdYearSum',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第4年" :show-overflow-tooltip="!isEdit" prop="fourthYearSum" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'fourthYearSum',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="第5年" :show-overflow-tooltip="!isEdit" prop="fifthYearSum" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'fifthYearSum',true,false) }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column label="返租金额(单位：元)" align="center">
        <el-table-column min-width="150" :label="`${getBudgetYear}年度预算合计`" show-overflow-tooltip prop="ytd" align="right">
          <template slot-scope="scope">
            <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'ytd',true,false) }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="1月" :show-overflow-tooltip="!isEdit" prop="jan" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.jan" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'jan') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="2月" :show-overflow-tooltip="!isEdit" prop="feb" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.feb" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'feb') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="3月" :show-overflow-tooltip="!isEdit" prop="march" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.march" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'march') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="4月" :show-overflow-tooltip="!isEdit" prop="april" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.april" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'april') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="5月" :show-overflow-tooltip="!isEdit" prop="may" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.may" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'may') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="6月" :show-overflow-tooltip="!isEdit" prop="june" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.june" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'june') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="7月" :show-overflow-tooltip="!isEdit" prop="july" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.july" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'july') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="8月" :show-overflow-tooltip="!isEdit" prop="aug" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.aug" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'aug') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="9月" :show-overflow-tooltip="!isEdit" prop="sep" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.sep" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'sep') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="10月" :show-overflow-tooltip="!isEdit" prop="oct" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.oct" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'oct') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="11月" :show-overflow-tooltip="!isEdit" prop="nov" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.nov" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'nov') }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="140" label="12月" :show-overflow-tooltip="!isEdit" prop="dece" align="right">
          <template slot-scope="scope">
            <el-input v-if="isEdit && scope.$index == selectIndex" v-model="scope.row.dece" v-filter-check-input maxlength="12" placeholder="请输入" size="mini"></el-input>
            <p v-else @click="showInput(scope.$index)">{{ returnValue(scope.row,'dece') }}</p>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="5" class-name="common-column-line"></el-table-column>
      <el-table-column min-width="150" :label="`${getBudgetYear+1}年度预算合计`" show-overflow-tooltip prop="nextYear" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'nextYear',true,false) }}</p>
        </template>
      </el-table-column>
      <el-table-column min-width="150" :label="`${getBudgetYear+2}年度预算合计`" show-overflow-tooltip prop="afterYear" align="right">
        <template slot-scope="scope">
          <p @click="showInput(scope.$index)">{{ returnValue(scope.row,'afterYear',true,false) }}</p>
        </template>
      </el-table-column>
    </el-table>
    <ys-paginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
  </div>
</template>

<script>
import { handle_paginator } from '@mixins'
import { toThousandsClean, getDynamicTableHeight, returnValue } from '@/utils/index'
import GlobalApi from '@/apis/apis/global'
import FeeScheduleApi from '@/apis/apis/feeScheduleApi'
import { mapGetters, mapState } from "vuex";
export default {
  mixins: [handle_paginator],
  data () {
    return {
      isEdit: false,
      selectIndex: 0,
      createIndex: 0,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      query: {
        bizTypeId: null,
        ownerName: null,
      },
      bizTypeIdList: [], // 业态列表
      tableData: [],
      isRentedList: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      oldTableData: '',
      selectData: [],
      routerQuery: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  watch: {},
  created () {
    this.routerQuery = this.$route.query
    this.getBizTypeList()
    this.getList()
  },
  computed: {
    ...mapGetters(['getBudgetYear']),
    exportParams () {
      return {
        params: {
          bean: {
            ...this.routerQuery,
            ...this.query,
          }
        },
        excelName: '返租支出',
        exportUrl: '/bizLeaseback/excelExport',
      }
    },
    importParams () {
      return {
        importUrl: '/bizLeaseback/excelImport',
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId
      }
    }
  },
  mounted () {

  },
  // 日期转换格式
  filters: {
    formatDate (time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    },
    formatVal (val) {
      return toThousandsClean(val)
    }
  },
  methods: {
    returnValue,
    // 获取业态列表
    getBizTypeList () {
      GlobalApi.getSelectList({ selectType: 'otherIncomeRent' }).then(res => {
        if (res.code == 0) {
          res.data.forEach((item, index) => {
            res.data[index].dictCd = Number(item.dictCd)
          })
          this.bizTypeIdList = res.data
        }
      })
    },
    // 查询
    async getList () {
      const params = {
        ...this.pageInfo,
        bean: {
          ...this.routerQuery,
          ...this.query,
        }
      }
      this.isEdit = false
      await FeeScheduleApi.leasebackFind(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
          this.oldTableData = JSON.stringify(res.data.list.slice(1))
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange () {
      this.isEdit = false
      this.pageInfo.pageNum = 1
      this.getList()
    },
    // 选择业态赋值name
    bizTypeIdChange (index, val) {
      let obj = this.bizTypeIdList.find(item => item.dictCd == val)
      this.tableData[index].bizType = obj.dictName
    },
    // 选择一行显示input
    showInput (index) {
      this.selectIndex = index
    },
    reset () {
      this.query = {
        bizTypeId: null,
        ownerName: null
      }
      this.getList()
    },
    // 添加培训项
    add () {
      this.createIndex++
      let newInvalid = {
        createIndex: this.createIndex,
        bizType: null,
        bizTypeId: null,
        assetName: null,
        yearNum: null,
        jan: null,
        feb: null,
        march: null,
        april: null,
        may: null,
        june: null,
        july: null,
        aug: null,
        sep: null,
        oct: null,
        nov: null,
        dece: null,
      }
      this.tableData.unshift(newInvalid)
    },
    handleSelectionChange (val) {
      this.selectData = []
      this.selectData = val
    },
    // 删除
    del () {
      if (!this.selectData[0]) return this.$message.error('请选择要删除的数据')
      // 删除
      this.$confirm(`确认要删除吗？`).then(() => {
        // 本次编辑新增项
        let createIndexs = []
        let ids = []
        this.selectData.map((item) => {
          if (item.createIndex) {
            createIndexs.push(item.createIndex)
          }
        })
        // 数据库中存在的数据
        this.selectData.map((item) => {
          if (item.id) {
            ids.push(item.id)
          }
        })
        if (ids.length > 0) {
          let params = {
            budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
            idList: [...ids]
          }
          FeeScheduleApi.leasebackDel(params).then(res => {
            if (res.code == 0) {
              this.tableData = [...this.tableData].filter(x => [...ids].every(y => y !== x.id))
              if (createIndexs.length > 0) {
                this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
              }
            }
          })
        } else {
          this.tableData = [...this.tableData].filter(x => [...createIndexs].every(y => y !== x.createIndex))
          this.$message.success('删除成功！')
        }
      })
    },
    // 编辑
    edit () {
      this.isEdit = true
    },
    // 取消
    cancel () {
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
    save () {
      for (let key in this.tableData) {
        if (!this.tableData[key].bizTypeId) return this.$message.error('请选择业态')
        if (!this.tableData[key].project) return this.$message.error('请填写项目公司')
        if (!this.tableData[key].building) return this.$message.error('请填写楼栋名称')
        if (!this.tableData[key].roomNum) return this.$message.error('请填写地产房号')
        if (!this.tableData[key].ownerName) return this.$message.error('请填写业主名称')
        if (!this.tableData[key].signingDate) return this.$message.error('请选择签约日期')
        if (!this.tableData[key].area) return this.$message.error('请填写建筑面积')
        if (!this.tableData[key].originalPrice) return this.$message.error('请填写折前总价')
        if (!this.tableData[key].finalPrice) return this.$message.error('请填写成交总价')
        if (!this.tableData[key].expectDate) return this.$message.error('请选择预计交房日')
        if (!this.tableData[key].realityDate) return this.$message.error('请选择实际交房日')
        if (!this.tableData[key].clause) return this.$message.error('请填写委托租赁条款')
      }
      this.selectIndex = 0
      const params = {
        budgetInstanceSheetId: this.routerQuery.budgetInstanceSheetId,
        list: this.tableData
      }
      FeeScheduleApi.leasebackUpdate(params).then(res => {
        if (res.code == 0) {
          this.getList()
          this.isEdit = false
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" >
@import '~@styles/common.scss';
.leasebackPay {
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
