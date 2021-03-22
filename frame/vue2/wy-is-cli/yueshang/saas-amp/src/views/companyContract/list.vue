<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="16" style="display: flex; align-items: center;">
        <el-input placeholder='请输入市调编号' size="mini" v-model='params.market_research_code' style="margin-right: 20px; width: 200px;" />
        <el-input placeholder='请输入市调名称' size="mini" v-model='params.market_research_name' style="margin-right: 20px; width: 200px;" />
        <el-button @click="getList" size="mini" type="primary">查询</el-button>
      </el-col>
      <el-col :span="8" style="text-align: right;">
        <el-button @click="toCreate" size="mini" type="primary">新增租金测算</el-button>
        <el-button @click="confirm_batch" size="mini" type="danger" v-show="params.contract_mould_cate_status !== 'DELETED'" plain style="color: #f56c6c;">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size='mini' ref="table" :header-cell-style="{background:'#f5f7fa'}">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <!-- <el-table-column label="序号" prop="market_id"></el-table-column> -->
      <el-table-column label="市调编号" prop="market_research_code"></el-table-column>
      <el-table-column label="市调名称" prop="name"></el-table-column>
      <el-table-column label="市调类型" prop="type"></el-table-column>
      <el-table-column label="所在城市" prop="city"></el-table-column>
      <el-table-column label="所在商圈" prop="business_circle"></el-table-column>
      <el-table-column label="竞品类比数量" width="100">
        <template slot-scope="scope">
          <router-link :to="{path:'./analogyList', query: {market_id: scope.row.market_id, market_name: scope.row.market_name}}"><span style="color: #0f96ff;" @click="pId(scope.row.market_id)">{{scope.row.num}}</span></router-link>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="admin_truename"></el-table-column>
      <el-table-column label="创建日期" prop="create_time" width="150"></el-table-column>
      <el-table-column label="更新人" prop="update_name"></el-table-column>
      <el-table-column label="更新日期" prop="update_time" width="150"></el-table-column>
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.row.contract_mould_cate_status !== 'DELETED'">
            <el-button size="mini" type="warning" @click="toUpdate(scope.row.market_id, scope.row.market_research_id)" plain style="color: #e6a23c;">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirm(scope.row.market_id)" plain style="color: #f56c6c;">删除</el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="success" @click="confirm(scope.row.market_id)" plain style="color: #f56c6c;">恢复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-divider></el-divider>
    <ys-paginator @handlePaginator='handlePaginator' :pageInfo='pageInfo' />
  </div>
</template>

<script>
import { handlePaginator } from "@mixins"
import companyContract from '@apis/companyContract'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      enumStatus: this.$enums.status,
      params: {
        market_research_id: '', // 市调编号
        rent_market_name: '', // 租金测算
        business_circle: '', // 所在商圈
        type: '', // 市调类型
        city: '', // 所在城市
        market_name: '', // 市调名称
        num: '', // 竞品类比数量
        update_name: '', // 更新人
        update_time: '', // 更新日期
        market_research_code: '', // 市调编号查询
        market_research_name: '', // 市调名称查询
        contract_mould_cate_status: 'NODELETED'
      },
      marketList: [],
      cityList: [],
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      tableData: []
    }
  },
  watch: {
    'params.contract_mould_cate_status' (nv, ov) {
      this.params.contract_mould_cate_status = nv
      this.pageInfo.page = 1
      this.getList()
    }
  },
  methods: {
    // 确认单个删除
    async confirm (id) {
      const type = this.params.contract_mould_cate_status === 'DELETED' ? '恢复' : '删除'
      try {
        await this.$confirm(`确认要${type}吗？`)
        this.handelConfirm(id)
      } catch (error) {
        console.log(error, '----[取消删除 start]----')
      }
    },
    async handelConfirm (id) {
      const params = {id: id}
      let res = await companyContract.del(params)
      if (this.params.contract_mould_cate_status === 'DELETED') {
        res = await companyContract.restore({market_id: id})
      } else {
        const params = {market_id: id}
      }
      if (res.code === 200) {
        this.getList()
      }
    },
    // 确认批量删除
    async confirm_batch () {
      const selection = this.$refs.table.selection
      const type = this.params.contract_mould_cate_status === 'DELETED' ? '恢复': '删除'
      if (selection.length === 0) {
        this.$message.error(`选择要${type}的租金测算`)
        return
      }
      try {
        await this.$confirm(`确认要${type}吗？`)
        const batchDel = selection
          .map(item => item.market_id)
          .join(',')
        this.handelConfirm(batchDel)
      } catch (error) {
        console.log(error, '----[取消批量操作 start]----')
      }
    },
    getStatus (status) {
      return this.$enums.status.find(item => item.value === status)
    },
    toUpdate (id, market_research_id) {
      this.$router.push({path: 'companyContractUpdate', query: {id:id, market_research_id:market_research_id}})
    },
    async getList () {
      let { market_name = '', market_research_code = '', market_research_name = '', num = '', contract_mould_cate_status} = this.params
      const params = {
        ...this.pageInfo,
        market_name: market_name.trim(),
        market_research_code: market_research_code.trim(),
        market_research_name: market_research_name.trim(),
        num: num.trim(),
        contract_mould_cate_status
      }
      const res = await companyContract.find(params)
      const {code, result} = res
      if (code === 200) {
        this.tableData = result.data.map(item => {
          return {
            market_id: item.id,
            market_research_id: item.market_research_id,
            name: item.name,
            type: item.type,
            city: item.city,
            business_circle: item.business_circle,
            num: item.num,
            admin_truename: item.admin_truename,
            create_time: item.create_time,
            update_name: item.update_name,
            update_time: item.update_time,
            market_research_code: item.market_research_code,
            market_research_name: item.market_research_name,
            contract_mould_cate_status: item.contract_mould_cate_status
          }
        })
        console.log(this.tableData, '----[列表数据 start]----')
        this.pageInfo.sum_num = result.sum_num
      }
    },
    toCreate () {
      this.$router.push({name: 'companyContractCreate'})
    },
    // 项目数量列表 start
    projectList (cell) {
      this.$router.push({
        path: 'projectList',
        query: {'market_id' : cell.market_id}
      })
    },
    // pId统一处理更新日期 start
    pId (market_id) {
      localStorage.setItem('pId',market_id)
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
