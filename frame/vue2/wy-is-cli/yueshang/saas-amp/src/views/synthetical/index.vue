<template>
  <!-- 综合分析 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="18" style="display: flex; align-items: center;">
        <el-select placeholder="项目名称" size="mini" v-model="query.project_name" filterable clearable style="margin-right: 20px; width: 200px;">
          <el-option
            v-for="item in projectList"
            :key="item.project_id"
            :label="item.project_name"
            :value="item.project_name">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin-right: 20px; width: 200px;"
          v-model="query.pr_month"
          type="month"
          size="mini"
          value-format="yyyy-MM"
          placeholder="权责月">
        </el-date-picker>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="flushList" size="mini" type="success">立即刷新</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" class="in-table">
      <el-table-column label="序号" min-width="50" fixed>
        <el-table-column prop="id" min-width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="项目名称" min-width="160" fixed>
        <el-table-column prop="project_name" min-width="160">
          <template slot-scope="scope">
            <span @click="goDetail(scope.row.project_id)" class="ys-text-blue c_p">{{ scope.row.project_name }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="净营运收入NOI（万元）" align="center">
        <el-table-column min-width="100" prop="month_actual" label="当月实际" align="center"/>
        <el-table-column min-width="100" prop="annual_forecast_noi" label="全年预测"/>
      </el-table-column>
      <el-table-column label="总投资成本（万元）" align="center">
        <el-table-column min-width="100" prop="total_cost" label="总成本" align="center"/>
        <el-table-column min-width="100" prop="total_cost_buy" label="总成本(回购)" align="center"/>
        <el-table-column min-width="100" prop="year_return_rate_total" label="预测年回报率(总成本)"/>
        <el-table-column min-width="100" prop="year_return_rate_buy" label="预测年回报率(回购成本)"/>
      </el-table-column>
      <el-table-column label="估值（万元）" align="center">
        <el-table-column min-width="100" prop="valuation" label="估值" align="right"/>
        <el-table-column min-width="100" prop="today_time" label="估值日期" align="center"/>
        <el-table-column min-width="100" prop="year_return_rate_valuation" label="全年预测"/>
      </el-table-column>
      <el-table-column label="贷款（万元）" align="center">
        <el-table-column min-width="100" prop="capital" label="本金" align="right"/>
        <el-table-column min-width="100" prop="due_date" label="到期日" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.due_date | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100" prop="year_loan_interest" label="年贷款利息"/>
      </el-table-column>
      <el-table-column label="Margin" align="center">
        <el-table-column min-width="100" prop="noi_margin" label="NOI Margin" align="right"/>
        <el-table-column min-width="100" prop="target_noi_margin" label="目标NOI"/>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  import GlobalApi from '@/apis/apis/global';
  import Synthetical from '@/apis/apis/synthetical'
  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        query: {
          project_name: null,
          pr_month: new Date().format('yyyy-MM')
        },
        projectList: [],// 项目列表
        tableData: []
      }
    },
    watch: {},
    created() {
      this.getProList()
      this.getList()
    },
    mounted() {

    },
    // 日期转换格式
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
      }
    },
    methods: {
      // 获取项目列表
      getProList() {
        GlobalApi.getProjectList().then(res => {
          console.log("proList:",res)
          if(res.code === 200 && res.result){
            this.projectList = res.result.data
            console.log(this.projectList)
          }
        })
      },
      // 查询
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await Synthetical.find(params).then(res => {
          console.log("综合分析List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      reset() {
        this.query = {
          project_name: null,
          pr_month: null
        }
      },
      // 立即刷新
      async flushList() {
        await Synthetical.flush().then(res => {
          console.log("综合分析List:",res)
          if(res.code === 200 && res.result){
            this.getList()
          }
        })
      },
      // 详情
      goDetail(id) {
        this.$router.push({name:'syntheticalDetail',query: {project_id:id, pr_month: this.query.pr_month}})
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  ::v-deep .pd-left{
    .cell{
      padding-left: 40px;
    }
  }
</style>
