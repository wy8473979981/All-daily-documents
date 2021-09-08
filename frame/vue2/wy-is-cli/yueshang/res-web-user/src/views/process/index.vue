<template>
  <el-main class="process-box">
    <div class="header-box">
      <span :class="{'active': isActive == item.value}" v-for="(item, index) in checkOptions" :key="index" @click="checkItem(item.value)">{{ item.label }}</span>
    </div>
    <div v-if="isActive == 1" class="search-box">
      <el-select v-model="query.bizGroup" clearable placeholder="板块">
        <el-option v-for="(item, index) in bizGroupList" :key="index" :label="item.dictName" :value="item.dictCd"></el-option>
      </el-select>
      <el-date-picker v-model="query.recordDate1" type= "month" value-format="yyyy-MM" clearable placeholder="时间1" />
      <el-date-picker v-model="query.recordDate2" type= "month" value-format="yyyy-MM" clearable placeholder="时间2" />
      <el-checkbox v-model="query.responsibilityFlg" @change="getList">显示权责数</el-checkbox>
      <el-radio-group v-model="query.collectType" @change="getList">
        <el-radio label="1">权责维度</el-radio>
        <el-radio label="2">实际发生数量</el-radio>
        <el-radio label="3">实际发生比例</el-radio>
      </el-radio-group>
      <dl-button type="primary" @click.native="getList">查询</dl-button>
      <!-- <dl-button type="reset">重置</dl-button> -->
    </div>
    <div v-if="isActive == 2" class="search-box many-date">
      <el-date-picker v-model="query2.recordDate1" type= "month" value-format="yyyy-MM" clearable placeholder="时间段1开始" />
      <el-date-picker v-model="query2.recordDate2" type= "month" value-format="yyyy-MM" clearable placeholder="时间段1结束" />
      <el-date-picker v-model="query2.recordDate3" type= "month" value-format="yyyy-MM" clearable placeholder="时间段2开始" />
      <el-date-picker v-model="query2.recordDate4" type= "month" value-format="yyyy-MM" clearable placeholder="时间段2结束" />
      <!-- <el-date-picker v-model="recordDate1" type= "monthrange" @change="recordDate1Change" range-separator="-" />
      <el-date-picker v-model="recordDate2" type= "monthrange" @change="recordDate2Change" range-separator="-" /> -->
      <el-select v-model="query2.resLine" clearable placeholder="条线">
        <el-option v-for="(item, index) in bizLineList" :key="index" :label="item.dictName" :value="item.dictCd"></el-option>
      </el-select>
      <el-input v-model="query2.processName" placeholder="表单" />
      <el-checkbox v-model="query2.showNodeRank" @change="getList2">查看节点数排名</el-checkbox>
      <dl-button type="primary" @click.native="getList2">查询</dl-button>
      <!-- <dl-button type="reset">重置</dl-button> -->
    </div>
    <div v-if="isActive == 3" class="search-box many-date">
      <el-date-picker v-model="query3.recordDate1" type= "month" value-format="yyyy-MM" clearable placeholder="时间段1开始" />
      <el-date-picker v-model="query3.recordDate2" type= "month" value-format="yyyy-MM" clearable placeholder="时间段1结束" />
      <el-date-picker v-model="query3.recordDate3" type= "month" value-format="yyyy-MM" clearable placeholder="时间段2开始" />
      <el-date-picker v-model="query3.recordDate4" type= "month" value-format="yyyy-MM" clearable placeholder="时间段2结束" />
      <!-- <el-date-picker v-model="recordDate1" type= "monthrange" @change="recordDate1Change" range-separator="-" />
      <el-date-picker v-model="recordDate2" type= "monthrange" @change="recordDate2Change" range-separator="-" /> -->
      <el-select v-model="query3.resLine" clearable placeholder="条线">
        <el-option v-for="(item, index) in bizLineList" :key="index" :label="item.dictName" :value="item.dictCd"></el-option>
      </el-select>
      <el-input v-model="query3.nodeName" placeholder="职位名称" />
      <dl-button type="primary" @click.native="getList3">查询</dl-button>
      <!-- <dl-button type="reset">重置</dl-button> -->
    </div>
    <div v-if="isActive == 4" class="search-box">
      <el-select v-model="query4.bizLine" clearable placeholder="条线">
        <el-option v-for="(item, index) in bizLineList" :key="index" :label="item.dictName" :value="item.dictCd"></el-option>
      </el-select>
      <el-input v-model="query4.processName" placeholder="表单" />
      <el-date-picker v-model="query4.recordStartDate" type= "month" value-format="yyyy-MM" clearable placeholder="时间1" />
      <el-date-picker v-model="query4.recordEndDate" type= "month" value-format="yyyy-MM" clearable placeholder="时间2" />
      <el-radio-group v-model="query4.resType" @change="getList4">
        <el-radio label="2.0">中心</el-radio>
        <el-radio label="3.0">事业部</el-radio>
        <el-radio label="4.0">城市公司</el-radio>
        <el-radio label="5.0">项目</el-radio>
      </el-radio-group>
      <dl-button type="primary" @click.native="getList4">查询</dl-button>
      <!-- <dl-button type="reset">重置</dl-button> -->
    </div>
    <template v-if="isActive == 1">
      <el-table ref="table" v-loading="isLoading" :data="tableData" :span-method="spanMethod" size="mini" header-row-class-name="table-header" :key="Math.random()">
        <el-table-column label="" prop="analysisName" align="center" />
        <el-table-column label="单位" prop="analysisUnit" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数'">条</span>
            <span v-else>
              <span v-if="query.collectType == 1 || query.collectType == 3">占比(%)</span>
              <span v-else>单</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="analysisDate" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.analysisDate.replace(/-/g, '.') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投资" prop="investShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.investShowNum }}</span>
            <span v-else>{{ scope.row.investShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="营销" prop="marketingShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.marketingShowNum }}</span>
            <span v-else>{{ scope.row.marketingShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="运营" prop="operationShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.operationShowNum }}</span>
            <span v-else>{{ scope.row.operationShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="财务" prop="financeShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.financeShowNum }}</span>
            <span v-else>{{ scope.row.financeShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="法务" prop="legalShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.legalShowNum }}</span>
            <span v-else>{{ scope.row.legalShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行政" prop="administrativeShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.administrativeShowNum }}</span>
            <span v-else>{{ scope.row.administrativeShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设计" prop="designShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.designShowNum }}</span>
            <span v-else>{{ scope.row.designShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人事" prop="personnelShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.personnelShowNum }}</span>
            <span v-else>{{ scope.row.personnelShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成本" prop="costShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.costShowNum }}</span>
            <span v-else>{{ scope.row.costShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工程" prop="engineerShowNum" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.analysisName == '权责数' || query.collectType == 2">{{ scope.row.engineerShowNum }}</span>
            <span v-else>{{ scope.row.engineerShowNum | filterData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总数" prop="totalNum" align="right" />
      </el-table>
    </template>
    <template v-if="isActive == 2">
      <el-table class="table-height" ref="table2" v-loading="isLoading" :data="tableData2" size="mini" header-row-class-name="table-header" :key="Math.random()">
        <el-table-column label="模板路径" prop="modulePath" min-width="220">
          <template slot-scope="scope">
            <span style="font-size: 12px;">{{ scope.row.modulePath }}</span>
          </template>
        </el-table-column>
        <el-table-column label="表单名称" prop="processName" min-width="150" />
        <el-table-column v-if="query2.showNodeRank" label="审批条件" prop="resConditionTypeName" min-width="150" />
        <el-table-column label="单据数(单)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="approveNum1" />
          <el-table-column label="时间段2" min-width="72" prop="approveNum2" />
          <el-table-column label="数值差" min-width="65" prop="approveDifferentNum" />
          <el-table-column label="比例差" min-width="65" prop="approveDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.approveDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="审批平均时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="avgNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.avgNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="avgNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.avgNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="avgDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.avgDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="avgDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.avgDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="最长时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="maxNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.maxNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="maxNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.maxNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="maxDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.maxDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="maxDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.maxDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="最短时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="minNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.minNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="minNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.minNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="minDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.minDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="minDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.minDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="isActive == 3">
      <el-table ref="table3" v-loading="isLoading" :data="tableData3" size="mini" header-row-class-name="table-header" :key="Math.random()">
        <el-table-column label="职位名称" prop="nodeName" min-width="150" />
        <el-table-column label="单据数(单)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="approveNum1" />
          <el-table-column label="时间段2" min-width="72" prop="approveNum2" />
          <el-table-column label="数值差" min-width="65" prop="approveDifferentNum" />
          <el-table-column label="比例差" min-width="65" prop="approveDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.approveDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="审批平均时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="avgNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.avgNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="avgNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.avgNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="avgDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.avgDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="avgDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.avgDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="最长时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="maxNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.maxNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="maxNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.maxNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="maxDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.maxDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="maxDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.maxDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="最短时长(天)" align="center">
          <el-table-column label="时间段1" min-width="70" prop="minNum1">
            <template slot-scope="scope">
              <span>{{ scope.row.minNum1 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间段2" min-width="72" prop="minNum2">
            <template slot-scope="scope">
              <span>{{ scope.row.minNum2 | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数值差" min-width="65" prop="minDifferentNum">
            <template slot-scope="scope">
              <span>{{ scope.row.minDifferentNum | limitData }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例差" min-width="65" prop="minDifferentPercent">
            <template slot-scope="scope">
              <span>{{ scope.row.minDifferentPercent | filterData }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="isActive == 4">
      <el-table ref="table4" v-loading="isLoading" :data="tableData4" size="mini" header-row-class-name="table-header" :key="Math.random()">
        <el-table-column label="" prop="name" />
        <el-table-column label="单据数(单)" prop="approveNumber" sortable />
        <el-table-column label="审批平均时长(天)" prop="avgApproveTime">
          <template slot-scope="scope">
            <span>{{ scope.row.avgApproveTime | limitData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最长时长" prop="maxApproveTime">
          <template slot-scope="scope">
            <span>{{ scope.row.maxApproveTime | limitData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最短时长" prop="minApproveTime">
          <template slot-scope="scope">
            <span>{{ scope.row.minApproveTime | limitData }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <dl-pagination v-if="isShowPage" :page-info="pageInfo" @handle_paginator="handle_paginator"/>
  </el-main>
</template>

<script>
import dlButton from './components/dlButton';
import dlPagination from './components/dlPagination';
import process from '@/apis/apis/process';
import approval from '@/apis/apis/approval';
export default {
  name: 'process',
  data() {
    return {
      isLoading: false,
      isShowPage: false,
      checkOptions: [
        {label: '授权强度分析', value: 1},
        {label: '表单', value: 2},
        {label: '职位', value: 3},
        {label: '组织', value: 4},
        {label: '效率分析', value: 5}
      ],
      isActive: 1,
      bizGroupList: [],
      bizLineList: [],
      query: {
        bizGroup: '1',
        recordDate1: new Date().format('yyyy-MM'),
        recordDate2: '',
        responsibilityFlg: false,
        collectType: '1'
      },
      recordDate1: [new Date().format('yyyy-MM'), ''],
      recordDate2: [new Date().format('yyyy-MM'), ''],
      query2: {
        recordDate1: new Date().format('yyyy-MM'),
        recordDate2: '',
        recordDate3: new Date().format('yyyy-MM'),
        recordDate4: '',
        resLine: '',
        processName: '',
        showNodeRank: false
      },
      query3: {
        recordDate1: new Date().format('yyyy-MM'),
        recordDate2: '',
        recordDate3: new Date().format('yyyy-MM'),
        recordDate4: '',
        resLine: '',
        nodeName: ''
      },
      query4: {
        bizLine: '',
        processName: '',
        recordStartDate: '',
        recordEndDate: '',
        resType: '2.0'
      },
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
    }
  },
  components: {
    dlButton,
    dlPagination
  },
  created() {
    document.title = '流程分析平台'
  },
  mounted() {
    this.findByDictTypeCd()
    this.getList()
  },
  filters: {
    filterData(val) {
      return Math.floor(val.toFixed(2) * 100)
    },
    limitData(val) {
      return val.toFixed(2)
    }
  },
  methods: {
    checkItem(val) {
      this.isActive = val
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      }
      if (val == 1) {
        this.getList()
        this.isShowPage = false
      }
      if (val == 2) {
        this.getList2()
        this.isShowPage = true
      }
      if (val == 3) {
        this.getList3()
        this.isShowPage = true
      }
      if (val == 4) {
        this.getList4()
      }
      if(val == 5) {
        this.$router.push({path:'/analyze'})
      }
    },
    // 再次选中取消选项
    selectRadio(index) {
      if (index == this.query.collectType) {
        this.query.collectType = ''
      } else {
        this.query.collectType = index
      }
    },
    recordDate1Change(val) {
      if (val[0].format('yyyy-MM') == val[1].format('yyyy-MM')) {
        this.$set(this, 'recordDate1', [val[0].format('yyyy-MM'), ''])
      } else {
        this.$set(this, 'recordDate1', [val[0].format('yyyy-MM'), val[1].format('yyyy-MM')])
      }
    },
    recordDate2Change(val) {
      if (val[0].format('yyyy-MM') == val[1].format('yyyy-MM')) {
        this.$set(this, 'recordDate2', [val[0].format('yyyy-MM'), ''])
      } else {
        this.$set(this, 'recordDate2', [val[0].format('yyyy-MM'), val[1].format('yyyy-MM')])
      }
    },
    // 获取上个月
    getPreMonth(date) {
      var arr = date.split('-')
      var year = arr[0]
      var month = arr[1]
      if (month == 1) {
        year = parseInt(year) - 1
        month = 12
      } else if (month > 1 && month < 11) {
        month = '0' + (parseInt(month) - 1)
      } else {
        month = parseInt(month) - 1
      }
      return year + '-' + month
    },
    flitterData(arr) {
      let spanOneArr = [],
          concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          // 名称相同合并
          if (item.analysisName === arr[index - 1].analysisName) {
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return  {
        one: spanOneArr
      }
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = (this.flitterData(this.tableData).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = (this.flitterData(this.tableData).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 获取数据字典
    async findByDictTypeCd() {
      await approval.findByDictTypeCd({dictTypeCdList: ['bizGroup', 'bizLine']}).then(res => {
        if (res.code == 1 && res.data) {
          this.bizGroupList = res.data.bizGroup
          this.query.bizGroup = res.data.bizGroup[0].dictCd
          this.bizLineList = res.data.bizLine
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async getList() {
      this.isLoading = true
      const params = {
        ...this.query
      }
      await process.findAuthorizationStrength(params).then(res => {
        if (res.code == 1 && res.data) {
          this.tableData = res.data
        } else {
          this.tableData = []
          this.pageInfo.sum_num = 0
          this.$message.error(res.message)
        }
      })
      this.isLoading = false
    },
    async getList2() {
      // if (!this.recordDate1) return this.$message.error('请选择时间段1')
      // if (!this.recordDate2) return this.$message.error('请选择时间段2')
      this.isLoading = true
      // this.query2.recordDate1 = this.recordDate1[0]
      // this.query2.recordDate2 = this.recordDate1[1]
      // this.query2.recordDate3 = this.recordDate2[0]
      // this.query2.recordDate4 = this.recordDate2[1]
      const params = {
        ...this.query2,
        ...this.pageInfo
      }
      await process.findApprovalEfficiency(params).then(res => {
        if (res.code == 1 && res.data) {
          this.tableData2 = res.data.content
          this.pageInfo.sum_num = res.data.totalElements
        } else {
          this.tableData2 = []
          this.pageInfo.sum_num = 0
          this.$message.error(res.message)
        }
      })
      this.isLoading = false
    },
    async getList3() {
      // if (!this.recordDate1) return this.$message.error('请选择时间段1')
      // if (!this.recordDate2) return this.$message.error('请选择时间段2')
      this.isLoading = true
      // this.query3.recordDate1 = this.recordDate1[0]
      // this.query3.recordDate2 = this.recordDate1[1]
      // this.query3.recordDate3 = this.recordDate2[0]
      // this.query3.recordDate4 = this.recordDate2[1]
      const params = {
        ...this.query3,
        ...this.pageInfo
      }
      await process.findNodeEfficiency(params).then(res => {
        if (res.code == 1 && res.data) {
          this.tableData3 = res.data.content
          this.pageInfo.sum_num = res.data.totalElements
        } else {
          this.tableData3 = []
          this.pageInfo.sum_num = 0
          this.$message.error(res.message)
        }
      })
      this.isLoading = false
    },
    async getList4() {
      this.isLoading = true
      if (this.query4.resType == '2.0' || this.query4.resType == '3.0') {
        this.isShowPage = false
        const params = {
          ...this.query4
        }
        await process.findResAnalysisOrg(params).then(res => {
          if (res.code == 1 && res.data) {
            this.tableData4 = res.data
          } else {
            this.tableData4 = []
            this.$message.error(res.message)
          }
        })
      } else {
        this.isShowPage = true
        const params = {
          ...this.query4,
          ...this.pageInfo,
          resType: this.query4.resType == '4.0' ? '5.0' : this.query4.resType,
          projectType: this.query4.resType == '4.0' ? '1' : '2'
        }
        await process.findResAnalysisOrgPage(params).then(res => {
          if (res.code == 1 && res.data) {
            this.tableData4 = res.data.content
            this.pageInfo.sum_num = res.data.totalElements
          } else {
            this.tableData4 = []
            this.pageInfo.sum_num = 0
            this.$message.error(res.message)
          }
        })
      }
      this.isLoading = false
    },
    handle_paginator(pageInfo) {
      this.pageInfo = { ...this.pageInfo, ...pageInfo }
      if (this.isActive == 2) this.getList2()
      if (this.isActive == 3) this.getList3()
      if (this.isActive == 4) this.getList4()
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.process-box {
  .header-box {
    display: inline-block;
    border-radius: 16px;
    color: #050101;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 12px;
    background-color: #FDFCFA;
    padding: 0 10px;
    cursor: pointer;
    span {
      margin: 0 20px;
    }
    .active {
      font-size: 16px;
      font-weight: bold;
      color: #1C4C7F;
      border-bottom: 2px solid #1C4C7F;
    }
  }
  .search-box {
    margin-bottom: 12px;
  }
}
</style>
<style lang="scss">
@import './index.scss';
.search-box .el-input {
  width: 200px;
  margin-right: 8px;
}
.search-box .el-select {
  // margin-right: 8px;
}
.search-box .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 200px;
  margin-right: 8px;
}
.search-box.many-date .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 150px;
}
.search-box .el-checkbox-group {
  display: inline-block;
}
</style>
