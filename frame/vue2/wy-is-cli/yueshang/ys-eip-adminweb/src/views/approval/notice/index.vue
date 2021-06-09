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
          ></el-input> -->
          <el-autocomplete
            class="inline-input"
            size="mini"
            style="max-width:160px"
            v-model="queryName"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div>
          <label style="width:60px">通知状态:</label>
          <el-select class="search-input"  style="max-width:160px" v-model="status" placeholder="请选择" clearable size="mini">
            <el-option
              v-for="item in options"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd"
            ></el-option>
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
      <el-table-column align="center" label="审批编号" prop="approveNo" show-overflow-tooltip/>
      <el-table-column align="center" label="通知状态" prop="status">
         <!-- <template slot-scope="scope">
          <span>{{scope.row.status | filterType}}</span>
        </template> -->
      </el-table-column> 
      <!-- <el-table-column align="center" label="目标系统" prop="targetAppCd" show-overflow-tooltip/> -->
      <el-table-column label="备注" prop="remark" show-overflow-tooltip/>
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
      options: [
        // {
        //   dictCd: '1',
        //   dictName: '即将过期'
        // },
        // {
        //   dictCd: '2',
        //   dictName: '已过期'
        // },
        // {
        //   dictCd: '3',
        //   dictName: '完成通知'
        // },
        // {
        //   dictCd: '4',
        //   dictName: '驳回通知'
        // }
      ],
      // 模糊搜索分类名
      queryName: '',
      status: '',
      selectArr: [],
      fast: false,
      nowId: '',
      value: '',
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
    this.getApproveDatePushStatus();
  },
  methods: {
    // 获取列表数据
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query,
        enterpriseId: this.userInfo.enterpriseId,
        status: this.status,
        processId: this.processId
      };
      await approval.getNoticeList(params).then(res => {
        if(res.code == 1 && res.data){
          this.tableData = res.data.content;
          this.pageInfo.sum_num = res.data.totalElements;
        }
      });
    },
    // 获取通知状态下拉
    async getApproveDatePushStatus() {
      const enterpriseId = this.userInfo.enterpriseId;
      await reference.getApproveDatePushStatus(enterpriseId).then(res => {
        if(res.code == 1 && res.data){
          this.options = res.data.dataPushStatus;
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
      this.processId = val.id;
      this.getList();
    },
    dealDel() {
      if (!this.ids) {
        this.$message.error("请勾选需要删除的数据");
        return;
      }
      this.$confirm(`确认要删除吗？`).then(() => {
        const params = this.ids;
        approval.deleNotice(params).then(res => {
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
        this.processId = '';
        this.status = '';
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
      // 编辑
      this.fast = true;
      this.nowId = id;
    },
    closeFast() {
      this.fast = false;
    }
  },
  filters: {
    filterType(val) {
      if(val == 1) {
        return '即将过期'
      }
      if(val == 2) {
        return '已过期'
      }
      if(val == 3) {
        return '完成通知'
      }
      if(val == 4) {
        return '驳回通知'
      }
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
