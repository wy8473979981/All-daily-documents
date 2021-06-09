<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="20" style="display: flex; align-items: center;">
        <div>
          <label style="width:78px">审批编号:</label>
          <el-input
            v-model="query.approveNo"
            size="mini"
            style="max-width:160px"
          ></el-input>
        </div>
        <div>
          <label style="width:78px">审批状态:</label>
          <el-select style="max-width:160px" class="search-input" v-model="query.status" placeholder="请选择" clearable size="mini">
            <el-option
              v-for="item in options"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd"
            ></el-option>
          </el-select>
        </div>
        <div>
          <label style="width:78px">流程名称:</label>
          <el-input
            v-model="query.processName"
            size="mini"
            clearable
            style="max-width:160px"
          ></el-input>
        </div>
				<div>
          <label style="width:100px">当前审批人:</label>
          <el-input style="max-width:160px" @click.native="showSearchUser = true" v-model="query.currApproverUserName" placeholder="请选择" size="mini"></el-input>
        </div>
        <el-button @click="reset(1)" size="mini">重置</el-button>
        <el-button @click="reset(2)" size="mini" type="success">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="tool-bar" type="flex" justify="end" align="right">
      <!-- <el-button @click="dealDel" size="mini" type="danger">批量删除</el-button> -->
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column align="center" width="100" label="审批编号" prop="approveNo" show-overflow-tooltip/>
      <el-table-column align="center" width="100" label="审批状态" prop="status"/>
      <el-table-column label="当前步骤" prop="currStepName" show-overflow-tooltip/>
      <el-table-column align="center" width="100" label="当前审批人" prop="currApproveUserName" show-overflow-tooltip/>
      <el-table-column label="流程名称" min-width="150" prop="processName" show-overflow-tooltip/>
      <el-table-column label="标题" min-width="150" prop="subject" show-overflow-tooltip/>
      <el-table-column align="center" width="130" label="流程发起时间" prop="startDate">
        <template slot-scope="scope">
          <span>{{scope.row.startDate | filterTimess}}</span>
        </template>
      </el-table-column>
			<!-- <el-table-column align="center" width="100" label="延期状态" prop="delayStatus"/> -->
			<el-table-column align="center" width="130" label="完成审批时间" prop="completeDate">
        <template slot-scope="scope">
          <span>{{scope.row.completeDate | filterTimess}}</span>
        </template>
			</el-table-column>
			<el-table-column align="center" width="100" label="完成审批人" prop="completeUserName"/>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="viewDetailNewTab(scope.row)">详情</el-button>
					<!-- <el-button size="mini" plain @click="reject(scope.row.id)">驳回</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator"/>
    <!-- 审批人下拉框 -->
    <search-user :open="showSearchUser" @close="closeSearhUser"></search-user>
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
  mixins: [handle_paginator, viewDetailNewTab],
  components: {detail},
  data() {
    return {
        // 前台地址
      userUrl: urlInfo.userUrl,
      showSearchUser: false,
      selectArr: [],
      fast: false,
      nowId: '',
      value: '',
      options: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '无效',
          value: 0
        }
      ],
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 1
      },
      projectList: [],// 项目列表
      tableData: [],
      query: {},
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  watch: {},
  created() {
    this.getList();
    this.getApproveStatus();
  },
  methods: {
    // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: this.userInfo.enterpriseId
      };
      await approval.getInfoList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      });
    },
    // 获取审批状态下拉
    async getApproveStatus() {
      const enterpriseId = this.userInfo.enterpriseId;
      await reference.getApproveStatus(enterpriseId).then(res => {
        if(res.code == 1 && res.data){
          this.options = res.data.approveStatus;
        }
      }).catch(err => console.log(err));
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
        approval.deleInfo(params).then(res => {
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
    closeSearhUser(val) {
      this.showSearchUser = false;
      if(val) {
        console.log(val)
        this.query.currApproverUserId = val.userCd;
        this.query.currApproverUserName = val.userName;
      }
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
