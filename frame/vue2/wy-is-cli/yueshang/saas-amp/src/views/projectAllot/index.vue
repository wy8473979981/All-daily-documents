<template>
  <!-- 项目分配 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="16" style="display: flex; align-items: center;">
        <el-input placeholder="姓名" v-model="query.userName" @change="getListChange" size="mini" style="margin-right: 5px; width: 180px;"></el-input>
        <el-input placeholder="登录名" v-model="query.loginName" @change="getListChange" size="mini" style="margin-right: 10px; width: 180px;"></el-input>
        <el-select placeholder="已配置/未配置" v-model="query.status" @change="getListChange" size="mini" clearable style="margin-right: 10px; width: 180px;">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button @click="goSynch" size="mini" type="success">同步</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
      <el-table-column min-width="120" label="姓名" show-overflow-tooltip prop="userName" />
      <el-table-column min-width="120" label="登录名" prop="loginName" />
      <!-- <el-table-column min-width="120" label="部门" prop="projects" /> -->
      <el-table-column min-width="80" label="手机号" prop="mobile" />
      <el-table-column min-width="120" label="邮箱" show-overflow-tooltip prop="email" />
      <el-table-column fixed="right" width="120" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goAdmin(scope.row)">项目列表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <div>
      <!-- 权限 -->
      <admin :open="fastAdmin" :id="adminId" :name="adminName" @close="closeAdmin"></admin>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
import ProjectAllot from '@/apis/apis/projectAllot'
import Admin from './admin'
export default {
  mixins: [handlePaginator],
  data() {
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        userName: null,
        loginName: null,
        status: null,
      },
      statusList: [
        {
          value: 1,
          label: '已配置',
        },
        {
          value: 2,
          label: '未配置',
        }
      ],
      tableData: [],
      fastAdmin: false,
      adminId: null, // 编辑id
      adminName: null,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  components: {
    Admin,
  },
  watch: {},
  created() {
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
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await ProjectAllot.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
    },
    reset() {
      this.query = {
        userName: null,
        loginName: null,
        status: null,
      }
      this.getList()
    },
    // 同步
    goSynch() {
      ProjectAllot.synch().then(res => {
        if(res.code === 200 && res.result){
          this.getList()
        }
      })
    },
    // 权限
    goAdmin(row) {
      this.adminId = row.userCd
      this.adminName = row.userName
      this.fastAdmin = true
    },
    closeAdmin(res) {
      this.adminId = null
      this.adminName = null
      this.fastAdmin = res.fast
      if(res.reload) {
        this.getList()
      }
    },
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
</style>
