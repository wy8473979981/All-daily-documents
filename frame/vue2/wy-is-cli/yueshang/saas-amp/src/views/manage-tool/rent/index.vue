<template>
  <!-- 租金包 -->
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
        <el-button @click="dealSearch" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="nowUpdate" size="mini" type="success">立即刷新</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini">
      <el-table-column min-width="80" label="序号" prop="ri_id" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="160" prop="project_name" fixed>
        <template slot-scope="scope">
          <span @click="goDetail(scope.row.project_id)" class="ys-text-blue c_p">{{ scope.row.project_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建筑面积(GFA)" align="right" min-width="100" prop="building_area" />
      <el-table-column label="套内面积(GLA)" align="right" min-width="120" prop="inner_area"/>
      <el-table-column label="总租金（万元）" align="right" min-width="140" prop="total_rental_income"/>
      <el-table-column label="平均租金（元/㎡/月）" align="right" min-width="140" prop="avg_rental_income"/>
      <el-table-column class-name="pd-left" label="开业时间" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.open_date == '/' || scope.row.open_date == '0'">/</span>
          <span v-else>{{scope.row.open_date | formatDate}}</span>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  import Rent from '@/apis/apis/rent';
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
        query: {
          project_name: null,
          pr_month: ''
        },
        projectList: [],// 项目列表
        tableData: []
      }
    },
    watch: {},
    created() {
      this.getList()
      this.getProList()
    },
    mounted() {

    },
    methods: {
      getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        Rent.getList(params).then(res => {
          console.log("List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data;
            this.pageInfo.sum_num = res.result.sum_num;
          }
        })
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
        Rent.nowUpdate().then(res => {
          if(res.code === 200){
            this.pageInfo.page = 1;
            this.getList()
          }
        })
      },
      dealSearch() {
        this.getList()
      },
      reset() {
        this.query = {
          project_name: null,
          pr_month: ''
        }
        console.log('0703')
      },
      goDetail(id) {
        this.$router.push({name:'rentDetail', query:{
            project_id: id
        }})
      }
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
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
