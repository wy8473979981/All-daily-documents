<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label>审批月份：</label>
          <el-date-picker
            class="search-input"
            v-model="query.approveMonth"
            value-format="yyyy-MM"
            type="month"
            size="mini"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <div>
          <label>审批人：</label>
          <el-input class="search-input" clearable size="mini" v-model="query.approveUserName
          "></el-input>
        </div>
        <div>
          <label>过期次数：</label>
          <el-input style="width:50px" size="mini" v-model="query.overderNumBegin"></el-input>
          <label style="margin:0 5px;">至</label>
          <el-input style="width:50px" size="mini" v-model="query.overderNumEnd"></el-input>
        </div>
        
        <!-- <el-select placeholder="项目名称" size="mini" v-model="query.project_name" filterable clearable style="margin-right: 20px;">
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
            :label="item.project_name"
            :value="item.project_name">
          </el-option>
        </el-select> -->
        <el-button @click="reset" size="mini" type="success">重置</el-button>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
      </el-col>
    </el-row>
    <div class="handle-btn-row">
      <el-col :span="4" style="text-align: right;">
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </div>
    <el-table ref="table" :data="tableData" size="mini" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column align="center" label="审批人" prop="approveUserName"/>
      <el-table-column align="center" label="日期" prop="startDate">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.create_time | formatDate}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="right" label="过期次数" prop="overderNum"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="goDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>

    <!-- dialog -->
    <div>
      <!-- 记录详情 -->
      <detail :open="fast" :row="nowRow" @close="closeFast"></detail>
    </div>

  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import Detail from './detail';
import statistic from '@/apis/apis/statistic';

export default {
  components: {
    Detail
  },
  mixins: [handle_paginator],
  data() {
    return {
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [],
      ids: '', // 选中的ids
      query: {},
      fast: false,
      nowRow: null, // 当前详情id
    }
  },
  watch: {},
  created() {
    // this.getList();
  },
  mounted() {

  },
  methods: {
      async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: 1
      }
      await statistic.findHistoryPage(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      }).catch(err => {
        this.$message({
          message: '系统错误，获取列表失败',
          type: 'error'
        });
      });
    },
    dealAdd() {
      this.fast = true;
    },
    dealDel() {
      if (!this.ids) {
        this.$message.error("请勾选需要删除的数据");
        return;
      }
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.ids;
        statistic.deleteApproveHistory(params).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
        })
      }).catch(err => console.log(err));
    },
    goDetail(row) {
      console.log(row)
      this.fast = true;
      this.nowRow = row;
    },
    closeFast(res) {
      this.fast = res.fast;
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id);
    },
    reset() {
      this.query = {};
      this.getList();
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
  @import '~@/assets/styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  .ys-text-blue{
    color: #1890FF;
  }
  .handle-btn-row{
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
    .el-col{
      float: right;
    }
  }
  .search-input{
    flex: 1;
    min-width: 120px;
    max-width: 160px;
  }
</style>
