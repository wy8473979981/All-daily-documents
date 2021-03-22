<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <el-button @click="toBackPage" size="mini" type="info">返回</el-button>
        <el-button @click="toCreate" size="mini" type="primary">新增竞品租金分解</el-button>
        <el-button @click="confirm_batch" size="mini" type="danger" v-show="params.contract_mould_cate_status !== 'DELETED'" plain style="color: #f56c6c;">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" size='mini' ref="table" :header-cell-style="{background:'#f5f7fa'}">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="市调编号" prop="market_research_code"></el-table-column>
      <el-table-column label="市调名称" prop="name"></el-table-column>
      <el-table-column label="PMS项目名称" prop="pms_project_name" width="100"></el-table-column>
      <el-table-column label="市调类型" prop="market_research_type"></el-table-column>
      <el-table-column label="物业类型">
        <template slot-scope="scope">
          <router-link :to="{path:'./propertyDetail', query: {market_id: scope.row.id, type: scope.row.type,layout_floor_type: scope.row.layout_floor_type}}"><span style="color: #0f96ff;">{{scope.row.type}}</span></router-link>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="admin_truename"></el-table-column>
      <el-table-column label="创建日期" prop="create_time" width="150"></el-table-column>
      <el-table-column label="更新人" prop="update_name"></el-table-column>
      <el-table-column label="更新日期" prop="update_time" width="150"></el-table-column>
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.row.contract_mould_cate_status !== 'DELETED'">
            <el-button size="mini" type="warning" @click="toUpdate(scope.row.type_id,scope.row.layout_floor_type)" plain style="color: #e6a23c;">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirm(scope.row.id)" plain style="color: #f56c6c;">删除</el-button>
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
import companyContract from '@apis/rentDecomposition'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      enumStatus: this.$enums.status,
      params: {
        rent_decomposition_id: '',
        market_research_id: '', // 编号
        name: '', // 市调名称
        num: '', // 竞品类比数量
        contract_mould_cate_status: 'NODELETED',
        type: '',
        position: '',
        open_year: '',
        dimension: '',
        commercial_area: '',
        admin_truename: '',
        create_time: '',
        update_name: '', // 更新人
        update_time: '' // 更新日期
      },
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [],
      market_id: null,
      market_name: '',
      layout_floor_type: 1,// 1楼层法、2业态法、3all
    }
  },
  watch: {
    'params.contract_mould_cate_status' (nv, ov) {
      this.params.contract_mould_cate_status = nv
      this.pageInfo.page = 1
      this.getList()
    }
  },
  created () {
    this.market_id = this.$route.query.market_id
    this.market_name = this.$route.query.market_name
    this.layout_floor_type = this.$route.query.layout_floor_type || 1
    if (this.$route.query.market_id) {
      this.market_id = this.$route.query.market_id
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
        console.log(error, '---[取消删除 start]----')
      }
    },
    async handelConfirm (id) {
      const params = {competing_products_decomposition_ids: id}
      let res = await companyContract.analogyDel(params)
      if (res.code === 200) {
        this.getList()
      }
    },
    // 确认批量删除
    async confirm_batch () {
      const selection = this.$refs.table.selection
      const type = this.params.contract_mould_cate_status === 'DELETED' ? '恢复': '删除'
      if (selection.length === 0) {
        // this.$message.error(`选择要${type}的竞品数量`)
        this.$message.error('请先勾选竞品租金分解信息')
        return
      }
      try {
        await this.$confirm(`确认要${type}吗？`)
        const batchDel = selection
          .map(item => item.id)
          .join(',')
        this.handelConfirm(batchDel)
      } catch (error) {
        console.log(error, '----[取消批量操作 start]----')
      }
    },
    toUpdate (id,layout_floor_type) {
      if (layout_floor_type === 0) {
        this.$message.error('市调类型为空，不可编辑')
        return
      }
      this.$router.push({path: './decompositionStep', query: { type: id,market_id: this.market_id,layout_floor_type:layout_floor_type}})
    },
    async getList () {
      let { contract_mould_cate_status} = this.params
      const params = {
        ...this.pageInfo,
        contract_mould_cate_status,
        rent_decomposition_id: this.market_id
      }
      const res = await companyContract.analogyList(params)
      const {code, result} = res
      if (code === 200) {
        this.tableData = result.data
        this.pageInfo.sum_num = result.sum_num
      }
    },
    toCreate () {
      this.$router.push({path: './decompositionStep',query:{ market_id: this.market_id,layout_floor_type: this.layout_floor_type}})
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 项目信息详情 start
    projectInformationDetail () {
      this.$router.push({
        name: 'marketNameDetail'
      })
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
