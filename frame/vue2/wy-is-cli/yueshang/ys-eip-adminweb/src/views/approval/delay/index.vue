<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label style="width:60px">流程分类:</label>
          <!-- <el-input
            v-model="query.processId"
            size="mini"
            style="max-width:160px"
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
          <label style="width:50px">申请人:</label>
          <el-input
            v-model="query.applyUserName"
            size="mini"
            style="max-width:160px"
            clearable=""
          ></el-input>
        </div>
        <div>
          <label style="width:40px">状态:</label>
          <el-select v-model="query.statusCd" placeholder="请选择" size="mini" style="max-width:160px">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
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
      <el-table-column label="流程分类" prop="processName" show-overflow-tooltip/>
      <el-table-column align="center" width="100" label="审批编号" prop="approveNo" show-overflow-tooltip/>
      <el-table-column align="center" width="100" label="申请人" prop="applyUserName"/>
      <el-table-column label="申请原因" prop="applyRemark" show-overflow-tooltip/>
      <el-table-column align="center" width="130" label="审批时间" prop="approveDate"/>
      <el-table-column label="审批意见" prop="approveOptionCd" show-overflow-tooltip/>
      <el-table-column align="right" width="80" label="延期时长" prop="delayTime"/>
      <el-table-column align="center" width="80" label="状态" prop="statusCd"/>
      <el-table-column align="center" width="130" label="创建时间" prop="createdDate">
         <template slot-scope="scope">
          <span>{{scope.row.createdDate | filterTimess}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" prop="createdUserId"/>
      <el-table-column align="center" width="80" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="viewDetailNewTab(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
		<detail :open="fast" @close="closeFast" :id="nowId">

    </detail>
  </div>
</template>

<script>
import urlInfo from '@/data/UrlInfo';
import { handle_paginator, viewDetailNewTab } from '@/mixins';
import detail from '../components/details';
import approval from '@/apis/apis/approval';
import reference from '@/apis/apis/reference';
import { mapState } from 'vuex';
export default {
  mixins: [handle_paginator,viewDetailNewTab],
  components: {detail},
  data() {
    return {
        // 前台地址
      userUrl: urlInfo.userUrl,
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
      await approval.getDelayList(params).then(res => {
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
        approval.deleDelay(params).then(res => {
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
    reject(id) {
      console.log(id)
    },
    closeFast() {
      this.fast = false;
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
