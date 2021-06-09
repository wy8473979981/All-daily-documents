<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label style="width:60px">流程分类:</label>
          <!-- <el-input
            v-model="query.value"
            size="mini"
            style="max-width:160px"
            clearable
          ></el-input> -->
          <el-autocomplete
            class="inline-input"
            size="mini"
            style="max-width:160px"
            v-model="queryName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div>
          <label style="width:60px">同步状态:</label>
          <el-input
            v-model="query.status"
            size="mini"
            style="max-width:160px"
            clearable=""
          ></el-input>
        </div>
        <el-button @click="reset(1)" size="mini">重置</el-button>
        <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="tool-bar" type="flex" justify="end" align="right">
      <el-button @click="dealDel" size="mini" type="danger">批量删除</el-button>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column label="流程分类" prop="processName"/>
      <el-table-column align="center" label="审批编号" prop="approveNo"/>
      <el-table-column align="center" label="同步状态" prop="status"/>
      <el-table-column align="center" label="创建时间" prop="createdDate">
        <template slot-scope="scope">
          <span>{{scope.row.createdDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" prop="updatedDate">
        <template slot-scope="scope">
          <span>{{scope.row.updatedDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="showDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
		<detail :open="fast" @close="closeFast" :id="nowId">

    </detail>
  </div>
</template>

<script>
import { handle_paginator } from '@/mixins';
import detail from '../components/details';
import approval from '@/apis/apis/approval';
import reference from '@/apis/apis/reference';
import { mapState } from 'vuex';
export default {
  mixins: [handle_paginator],
  components: {detail},
  data() {
    return {
        // 模糊搜索分类名
      queryName: '',
      ids: null,
      fast: false,
      nowId: '',
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 1
      },
      tableData: [],
      query: {},
      options: [
        {
          label: '申请中',
          value: 'N'
        },
        {
          label: '已审批',
          value: 'D'
        },
        {
          label: '已拒绝',
          value: 'R'
        },
      ]
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: this.userInfo.enterpriseId
      };
      await approval.getSyncList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      });
    },
      querySearch(query, cb) {
      const params = {
        rows: 99999,
        processName: query,
        enterpriseId: this.userInfo.enterpriseId
      };
      reference.getProcessList(params).then(res => {
        if(res.code == 1 && res.data){
          var results = res.data;
          results.forEach(e => {
            e.value = e.processName;
          })
            cb(results);
        }
      });
    },
    handleSelect(val) {
      // 选中建议项时的处理
      this.query.processId = val.id;
      this.getList();
    },
    dealDel() {
      if (!this.ids) {
        this.$message.error("请勾选需要删除的数据");
        return;
      }
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.ids;
        approval.deleSync(params).then(res => {
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
      // 重置查询
    reset(val) {
      if (val == 1) {
        this.query = {};
        this.queryName = '';
      };
      this.pageInfo = {
        rows: 10,
        page: 1,
        sum_num: 0
      };
      this.getList();
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id);
    },
    showDetail(id) {
      // 详情
      this.fast = true;
      this.nowId = id;
    },
    reject(id) {
      console.log(id)
    },
    closeFast() {
      this.fast = false;
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
  label {
    width: 70px;
  }
</style>
