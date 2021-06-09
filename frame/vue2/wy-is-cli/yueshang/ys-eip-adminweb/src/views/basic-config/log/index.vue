<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label>操作人：</label>
          <el-input style="max-width:160px" clearable size="mini" v-model="query.operationName"></el-input>
        </div>
        <div>
          <label style="width:70px">操作时间：</label>
          <el-date-picker
            v-model="query.month"
            size="mini"
            type="datetimerange"
            value-format="yyyy-MM-dd hh:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="max-width:320px">
          </el-date-picker>
        </div>
        <el-button @click="reset(1)" size="mini">重置</el-button>
        <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header">
      <!-- <el-table-column type="selection" width="60" fixed /> -->
      <el-table-column align="center" width="100" label="操作人" prop="operatorName"/>
      <el-table-column align="center" width="130" label="操作时间" prop="updatedDate">
        <template slot-scope="scope">
          <span>{{scope.row.updatedDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" label="操作类型" prop="operation"/>
      <el-table-column align="center" width="100" label="操作目标" prop="targetName"/>
      <el-table-column align="center" label="日志内容" prop="remark"/>
      <el-table-column align="center" label="客户端IP" prop="ipAddre"/>
    </el-table>

    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>

  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import basicConfig from '../../../apis/apis/basicConfig';
export default {
  mixins: [handle_paginator],
  data() {
    return {
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      projectList: [],// 项目列表
      tableData: [{
        operator_name: 'admin',
        updated_date: '2020-06-23',
        operation: '修改',
        target_name: '11',
        remark: '1234',
        ip_addre: '192'
      }],
      query: {
        month: [],
        operationName: ''
      },
      fast: false,
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        createdStartDate: this.query.month && this.query.month[0],
        createdEndDate: this.query.month && this.query.month[1],
      }
      await basicConfig.getProjectList(params).then(res => {
        console.log(res)
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      })
    },
    // 重置查询
    reset(val) {
      if (val == 1) {
        this.query.operationName = '';
        this.query.month = [];
      };
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
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
