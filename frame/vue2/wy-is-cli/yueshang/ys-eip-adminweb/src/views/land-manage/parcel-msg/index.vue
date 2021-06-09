<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="6" style="display: flex; align-items: center;">
        <el-input clearable size="mini" v-model="query.project_name" placeholder="项目名称" style="margin-right: 20px;"></el-input>
        <!-- <el-select placeholder="项目名称" size="mini" v-model="query.project_name" filterable clearable style="margin-right: 20px;">
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
            :label="item.project_name"
            :value="item.project_name">
          </el-option>
        </el-select> -->
        <el-button @click="getList" size="mini" type="success">查询</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button @click="dealAdd" size="mini" type="success">新建地块</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column width="80" label="序号" prop="land_id" />
      <el-table-column min-width="180" label="项目名称" prop="project_name">
        <template slot-scope="scope">
          <span @click="goDetail(scope.row.land_id)" class="ys-text-blue c_p">{{scope.row.project_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" prop="version"/>
      <el-table-column label="创建日期" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="admin_truename"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="goModify(scope.row.land_id)">编辑</el-button>
          <el-button size="mini" type="info" plain @click="toDelete(scope.row.land_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>

    <!-- dialog -->
    <div>
      <!-- 地块新建、编辑 -->
      <create-parcel :open="fast" :id="landId" @close="closeFast"></create-parcel>
    </div>

  </div>
</template>

<script>
  import { handle_paginator } from '@/mixins';
  import CreateParcel from './create';
  import GlobalApi from '@/apis/apis/global';
  import Parcel from '../../../apis/apis/parcel';

  export default {
    components: {
      CreateParcel
    },
    mixins: [handle_paginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        project: '',// 项目
        projectList: [],// 项目列表
        tableData: [],
        land_id: '', // 选中的ids
        query: {
          project_name: ''
        },
        fast: false,
        landId: null, // 编辑id
      }
    },
    watch: {},
    created() {
      this.getProList()
      this.getList()
    },
    mounted() {

    },
    methods: {
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await Parcel.find(params).then(res => {
          console.log("地块信息List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
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
      dealAdd() {
        this.fast = true;
      },
      dealDel() {
        if(!this.land_id) {
          this.$message.error('请勾选需要删除的数据')
          return
        }
        this.$confirm(`确认要删除吗？`).then(() => {
          Parcel.delList({land_id: this.land_id}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      dealImport() {

      },
      dealDown() {

      },
      goDetail(land_id) {
        this.$router.push({name:'parcelMsgDetail',query: {land_id:land_id}})
      },
      goModify(id) {
        console.log(id)
        this.fast = true;
        this.landId = id;
      },
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          Parcel.delList({land_id: id+''}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      closeFast(res) {
        console.log(res)
        this.fast = res.fast;
        this.landId = null;
        if(res.reload) {
          this.getList()
        }
      },
      handleSelectionChange(val) {
        this.land_id = val.map(item => item.land_id) + '';
      },
      openModel(type) {

      },
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@/assets/styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  .ys-text-blue{
    color: #1890FF;
  }
</style>
