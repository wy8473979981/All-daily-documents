<template>
  <el-main class="process-box">
    <div class="header-box">
      <span :class="{'active': query.type == item.value}" v-for="(item, index) in checkOptions" :key="index" @click="checkItem(item.value)">{{ item.label }}</span>
    </div>
    <h2>表单:<span>{{ query.processName }}</span></h2>
    <div v-if="query.type == 1 || query.type == 2 || query.type == 3" class="search-box">
      <el-select v-model="query.bizLine" clearable placeholder="条线">
        <el-option v-for="(item, index) in bizLineList" :key="index" :label="item.dictName" :value="item.dictCd"></el-option>
      </el-select>
      <el-select v-model="query.orgCd" clearable placeholder="所属机构">
        <el-option label="所属机构" value="1"></el-option>
      </el-select>
      <el-select v-model="query.nodeCd" clearable placeholder="节点">
        <el-option label="地产公司总经理" value="1"></el-option>
      </el-select>
      <el-date-picker v-model="query.recordStartDate" type= "month" value-format="yyyy-MM" clearable placeholder="时间1" />
      <el-date-picker v-model="query.recordEndDate" type= "month" value-format="yyyy-MM" clearable placeholder="时间2" />
      <dl-button type="primary" @click.native="getList">查询</dl-button>
      <!-- <dl-button type="reset">重置</dl-button> -->
    </div>
    <el-table v-show="query.type == 1 || query.type == 2 || query.type == 3" ref="table" :data="tableData" size="mini" header-row-class-name="table-header">
      <el-table-column label="" prop="name" align="center" />
      <el-table-column label="2021.7" prop="start" />
      <el-table-column label="2021.6" prop="end" />
      <el-table-column label="数值差" prop="dif" />
      <el-table-column label="比例差" prop="ratio">
        <template slot-scope="scope">
          <span>{{ scope.row.ratio * 100 }}%</span>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import dlButton from './components/dlButton';
import process from '@/apis/apis/process';
import approval from '@/apis/apis/approval';
export default {
  name: 'process',
  data() {
    return {
      checkOptions: [
        {label: '单流程单节点审批效率分析', value: '1'},
        {label: '核心职位审批效率分析', value: '2'},
        {label: '组织审批效率分析', value: '3'},
        {label: '授权强度', value: '4'}
      ],
      bizLineList: [],
      query: {
        processName: '立项申请单',
        bizLine: '',
        orgCd: '',
        nodeCd: '',
        recordStartDate: '',
        recordEndDate: '',
        type: '1'
      },
      search: '1',
      startDate: '',
      endDate: '',
      search2: [],
      tableData: [],
    }
  },
  components: {
    dlButton
  },
  created() {

  },
  mounted() {
    this.findByDictTypeCd()
    this.getList()
  },
  methods: {
    checkItem(val) {
      this.query.type = val
      this.getList()
      if (val == 4) {
        this.$router.push({path:'/process'})
      }
    },
    // 获取数据字典
    async findByDictTypeCd() {
      await approval.findByDictTypeCd({dictTypeCdList: ['bizLine']}).then(res => {
        if (res.code == 1 && res.data) {
          this.bizLineList = res.data.bizLine
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async getList() {
      const params = {
        ...this.query
      };
      await process.findResAnalysisDetail(params).then(res => {
        if (res.code == 1 && res.data) {
          this.tableData = [
            {name: '审批平均时长(小时)', start: res.data.avgApproveTimeStart, end: res.data.avgApproveTimeEnd, dif: res.data.avgApproveTimeDif, ratio: res.data.avgApproveTimeRatio},
            {name: '最长时长', start: res.data.maxApproveTimeStart, end: res.data.maxApproveTimeEnd, dif: res.data.maxApproveTimeDif, ratio: res.data.maxApproveTimeRatio},
            {name: '最短时长', start: res.data.minApproveTimeStart, end: res.data.minApproveTimeEnd, dif: res.data.minApproveTimeDif, ratio: res.data.minApproveTimeRatio},
            {name: '单据数(单)', start: res.data.approveNumberStart, end: res.data.approveNumberEnd, dif: res.data.approveNumberDif, ratio: res.data.approveNumberRatio},
          ]
        } else {
          this.tableData = []
          this.$message.error(res.message)
        }
      })
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
  h2 {
    margin-bottom: 12px;
    font-size: 14px;
    color: #050101;
    padding-left: 15px;
    span {
      color: #1C4C7F;
      text-decoration: underline;
      padding-left: 5px;
    }
  }
  .search-box {
    margin-bottom: 12px;
  }
}
</style>
<style lang="scss">
@import './index.scss';
.search-box .el-select {
  margin-right: 8px;
}
.search-box .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 200px;
  margin-right: 8px;
}
</style>
