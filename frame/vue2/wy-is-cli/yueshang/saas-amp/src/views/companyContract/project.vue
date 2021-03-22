<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <el-button @click="toCreate" size="mini" type="primary">新增项目</el-button>
        <el-button @click="toBackPage" size="mini" type="info">返回</el-button>
        <!-- <el-button @click="confirm_batch" size="mini" type="danger" v-show="params.contract_mould_cate_status !== 'DELETED'">批量删除</el-button>
        <el-button @click="confirm_batch" size="mini" type="success" v-show="params.contract_mould_cate_status === 'DELETED'">批量恢复</el-button> -->
      </el-col>
    </el-row>
    <el-table :data="tableData" size='mini' ref="table">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="编号">
        <template slot-scope="scope">{{scope.row.number_id}}</template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          <router-link :to="{path:'./projectDetail', query: {id: scope.row.number_id}}"><span style="color: #0f96ff;">{{scope.row.project_name}}</span></router-link>
        </template>
      </el-table-column>
      <el-table-column label="所属市调" prop="market_research_name"></el-table-column>
      <el-table-column label="市调类型" prop="type"></el-table-column>
      <el-table-column label="所属位置" prop="position"></el-table-column>
      <el-table-column label="开业年限" prop="open_year"></el-table-column>
      <el-table-column label="项目体量(㎡)" prop="dimension"></el-table-column>
      <el-table-column label="商业面积(㎡)" prop="commercial_area"></el-table-column>
      <el-table-column label="创建人" prop="admin_truename"></el-table-column>
      <el-table-column label="创建日期" prop="create_time"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.contract_mould_cate_status !== 'DELETED'">
            <el-button size="mini" type="warning" @click="toUpdate(scope.row.number_id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirm(scope.row.number_id)">删除</el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="success" @click="confirm(scope.row.number_id)">恢复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-divider></el-divider>
    <ys-paginator @handlePaginator='handlePaginator' :pageInfo='pageInfo'/>
  </div>
</template>

<script>
import { handlePaginator } from "@mixins"
import contTempCate from '@apis/contTempCate'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      enumStatus: this.$enums.status,
      params: {
        contract_mould_cate_name: '', // 市调名称
        number_items: '', // 项目数量
        contract_mould_cate_status: 'NODELETED',

        market_research_name: '',
        type: '',
        position: '',
        open_year: '',
        dimension: '',
        commercial_area: '',
        admin_truename: '',
        create_time: ''
      },
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [],
      market_id: null,
      market_name: '',
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
    this.market_id = this.$route.query.number_id
    this.market_name = this.$route.query.market_name
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
      let res
      if (this.params.contract_mould_cate_status === 'DELETED') {
        res = await contTempCate.restore({serial_number_id: id})
      } else {
        const params = {project_id: id}
        res = await contTempCate.delProject(params)
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
        this.$message.error(`选择要${type}的租金市调`)
        return
      }
      try {
        await this.$confirm(`确认要${type}吗？`)
        const batchDel = selection
          .map(item => item.serial_number_id)
          .join(',')
        this.handelConfirm(batchDel)
      } catch (error) {
        console.log(error, '----[取消批量操作 start]----')
      }
    },
    toUpdate (id) {
      this.$router.push({path: './projectDetailUpdate', query: {project_id:id}})
    },
    async getList () {
      let { market_research_name = '', contract_mould_cate_status} = this.params
      const params = {
        ...this.pageInfo,
        market_research_name: market_research_name.trim(),
        contract_mould_cate_status,
        market_research_id: this.market_id
      }
      const res = await contTempCate.selectList(params)
      const {code, result} = res
      if (code === 200) {
        this.tableData = result.data.map(item => {
          return {
            number_id: item.id,
            project_name: item.project_name,
            market_research_name: item.market_research_name,
            type: item.type,
            position: item.position,
            open_year: item.open_year,
            dimension: item.dimension,
            commercial_area: item.commercial_area,
            admin_truename: item.admin_truename,
            create_time: item.create_time
          }
        })
        console.log(this.tableData, '----[列表数据 start]----')
        this.pageInfo.sum_num = result.sum_num
      }
    },
    toCreate () {
      // this.$router.push({name: 'projectAdd'})
      this.$router.push({path: './projectDetailUpdate',query:{market_id:this.market_id,market_name: this.market_name}})
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
