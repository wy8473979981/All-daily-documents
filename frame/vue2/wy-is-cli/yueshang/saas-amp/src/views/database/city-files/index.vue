<template>
  <!-- 城市档案 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="18" style="display: flex; align-items: center;">
        <el-select placeholder="项目名称" size="mini" v-model="query.project_name" filterable clearable style="margin-right: 20px; width: 200px;">
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
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
        <el-button @click="nowUpdate" size="mini" type="success">立即刷新</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header">
      <el-table-column label="项目名称" min-width="160" prop="project_name" fixed/>
      <el-table-column label="面积(GLA)" min-width="120" align="right" prop="project_area"></el-table-column>
      <el-table-column label="开业率(%)" align="right" prop="opening_rate"/>
      <el-table-column label="总收入(万元)" min-width="120" align="right" prop="general_income"/>
      <el-table-column label="NOI(万元)" align="right" prop="noi"/>
      <el-table-column label="资产估值(万元)" min-width="100" align="right" prop="asset_valuation"/>
      <el-table-column label="预测年回报率(总成本)(%)" min-width="180" align="right" prop="roa_cost"/>
      <el-table-column label="预测年回报率(回购成本)(%)" min-width="180" align="right" prop="roa_buyback"/>
      <el-table-column label="负责人" prop="responsible"/>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins';
import City from '@/apis/apis/city';
import GlobalApi from '@/apis/apis/global';
export default {
  mixins: [handlePaginator],
  data() {
    return {
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      project: '', // 业态类型
      projectList: [], // 业态列表
      tableData: [],
      query: {
        project_name: '',
        pr_month: ''
      }
    }
  },
  watch: {},
  created() {
    this.getProList();
    this.getList();
  },
  mounted() {

  },
  methods: {
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await City.find(params).then(res => {
        console.log("城市档案List:",res)
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
        }
      })
    },
    reset() {
      this.query = {
        project_name: '',
        pr_month: ''
      }
    },
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
        }
      })
    },
    nowUpdate() {
      City.nowUpdate().then(res => {
        if(res.code === 200){
          this.pageInfo.page = 1;
          this.getList()
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>
