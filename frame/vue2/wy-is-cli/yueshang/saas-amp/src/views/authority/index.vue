<template>
  <!-- 权限配置 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="16" style="display: flex; align-items: center;">
        <el-input v-model="query.role_name" size="mini" style="margin-right: 20px; width: 200px;" placeholder="角色名称"></el-input>
        <el-select placeholder="关联项目" size="mini" v-model="query.project_config_id" @change="getList" filterable clearable style="margin-right: 20px; width: 200px;">
          <el-option
            v-for="item in projectList"
            :key="item.project_config_id"
            :label="item.project_name"
            :value="item.project_config_id">
          </el-option>
        </el-select>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button @click="adminAdd" size="mini" type="success">新增</el-button>
        <el-button @click="adminDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" fixed />
      <el-table-column min-width="120" label="角色名称" prop="role_name" />
      <el-table-column min-width="120" label="关联项目" prop="projects" />
      <el-table-column min-width="120" label="功能权限" prop="menus" />
      <el-table-column min-width="120" label="成员数量" prop="user_count" />
      <el-table-column min-width="120" label="备注" prop="remark" />
      <el-table-column fixed="right" width="250" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="goAdmin(scope.row.role_id)">权限</el-button>
          <el-button type="text" size="mini" @click="goMember(scope.row.role_id)">成员列表</el-button>
          <el-button type="text" size="mini" @click="goEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
    <div>
      <!-- 新增/编辑 -->
      <create :open="fastCreate" :id="createId" :row="createRow" @close="closeCreate"></create>
      <!-- 权限 -->
      <admin :open="fastAdmin" :id="adminId" @close="closeAdmin"></admin>
      <!-- 成员列表 -->
      <member :open="fastMember" :id="memberId" @close="closeMember"></member>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import TypeApi from '@/apis/apis/typeApi'
import Authority from '@/apis/apis/authority'
import Create from './create'
import Admin from './admin'
import Member from './member'
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
        role_name: null,
        project_config_id: '',
        start_time: null,
        end_time: null
      },
      projectList: [],
      tableData: [],
      fastCreate: false,
      createId: null, // 编辑id
      createRow: null,
      fastAdmin: false,
      adminId: null, // 编辑id
      adminRow: null,
      fastMember: false,
      memberId: null, // 编辑id
      memberRow: null,
    }
  },
  components: {
    Create,
    Admin,
    Member
  },
  watch: {},
  created() {
    this.getProList()
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
    // 获取存量项目列表
    getProList() {
      TypeApi.projectDropDown({project_type: 1}).then(res => {
        if(res.code === 200 && res.result){
          this.projectList = res.result
        }
      })
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await Authority.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
        }
      })
    },
    // 选择结束时间
    selectToTime(e) {
      if(!this.query.start_time){
        this.query.end_time = ''
        this.$message.error('请选择开始时间')
        return
      }
      const dateNum = new Date(this.query.start_time).getTime()
      const toNum = new Date(e).getTime()
      if(toNum < dateNum){
        this.query.end_time = ''
        this.$message.error('结束时间小于开始时间')
      }
    },
    reset() {
      this.query = {
        role_name: null,
        project_config_id: '',
        start_time: null,
        end_time: null
      }
      this.getList()
    },
    // 新增
    adminAdd() {
      this.fastCreate = true
    },
    // 选中序号
    handleSelectionChange(val) {
      this.idArr = val.map(item => Number(item.role_id))
    },
    // 批量删除
    adminDel() {
      this.$confirm(`确认要删除吗？`).then(() => {
        Authority.delList({role_id: this.idArr}).then(res => {
          if(res.code === 200){
            this.getList()
          }
        })
      })
    },
    // 编辑
    goEdit(row) {
      this.createId = row.id
      this.createRow = row
      this.fastCreate = true
    },
    // 权限
    goAdmin(id) {
      this.adminId = id
      this.fastAdmin = true
    },
    // 成员列表
    goMember(id) {
      this.memberId = id
      this.fastMember = true
    },
    closeCreate(res) {
      this.createId = null
      this.fastCreate = res.fast
      if(res.reload) {
        this.getList()
      }
    },
    closeAdmin(res) {
      this.adminId = null
      this.fastAdmin = res.fast
      if(res.reload) {
        this.getList()
      }
    },
    closeMember(res) {
      this.memberId = null
      this.fastMember = res.fast
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
