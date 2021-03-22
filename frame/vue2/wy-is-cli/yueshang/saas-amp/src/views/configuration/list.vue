<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="16" style="display: flex; align-items: center;">
        <el-input placeholder='请输入系统配置' size="mini" v-model='params.company_short_name' style="margin-right: 20px; width: 200px;"/>
        <el-select placeholder="请选择" size="mini" v-model="params.company_status" style="margin-right: 20px;">
          <el-option
            v-for="item in enumStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getList" size="mini" type="primary">查询</el-button>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="toCreate" size="mini" type="primary">新增系统配置</el-button>
        <el-button @click="confirm_batch" size="mini" type="danger" v-show="!is_deleted">批量删除</el-button>
        <el-button @click="confirm_batch" size="mini" type="success" v-show="is_deleted">批量恢复</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size='mini' ref="table">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column :show-overflow-tooltip='true' label="编号" prop="id"></el-table-column>
      <el-table-column :show-overflow-tooltip='true' label="系统配置" prop="company_short_name"></el-table-column>
      <el-table-column :show-overflow-tooltip='true' label="配置名称" prop="company_full_name"></el-table-column>
      <el-table-column :show-overflow-tooltip='true' label="操作人" prop="admin_truename"></el-table-column>
      <el-table-column label="配置状态">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="getStatus(scope.row.company_status).status_type"
          >
            {{getStatus(scope.row.company_status).label}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.company_status !== 'DELETED'">
            <el-button size="mini" type="warning" @click="toUpdate(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirm(scope.row.id)">删除</el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="success" @click="confirm(scope.row.id)">恢复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-divider></el-divider>
    <ys-paginator @handlePaginator='handlePaginator' :pageInfo='pageInfo'/>
  </div>
</template>

<script>
import { listConfirm, handlePaginator } from '@mixins'
import company from '@apis/company'
export default {
  mixins: [listConfirm, handlePaginator],
  data () {
    return {
      page_name: '系统配置',
      enumStatus: this.$enums.status,
      params: {
        company_short_name: '',
        company_status: 'NODELETED',
      },
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      tableData: []
    }
  },
  computed: {
    is_deleted () {
      return this.params.company_status === 'DELETED'
    }
  },
  watch: {
    'params.company_status' (nv, ov) {
      this.params.company_status = nv
      this.pageInfo.page = 1
      this.getList()
    }
  },
  methods: {
    // 处理操作按钮
    async handle_confirm (id) {
      let res
      const params = {company_id: id}
      if (this.is_deleted) {
        res = await company.restore(params)
      } else {
        res = await company.del(params)
      }
      if (res.code === 200) {
        this.getList()
      }
    },
    getStatus (status) {
      return this.$enums.status.find(item => item.value === status)
    },
    toUpdate (id) {
      this.$router.push({name: 'companyUpdate', params: {id}})
    },
    async getList () {
      let { company_short_name= '', company_status} = this.params
      const params = {
        ...this.pageInfo,
        company_short_name: company_short_name.trim(),
        company_status
      }
      const res = await company.find(params, {success: false, error: false})
      if (res.code === 200) {
        this.tableData = res.result.data.map(item => {

          return {
            id: item.company_id,
            company_short_name: item.company_short_name,
            company_full_name: item.company_full_name,
            company_status: item.company_status,
            admin_truename: item.admin_truename
          }
        })
        this.pageInfo.sum_num = res.result.sum_num
      }
    },
    toCreate () {
      // this.$router.push({name: 'companyCreate'})
      this.$router.push({name: ''})
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss'
</style>
