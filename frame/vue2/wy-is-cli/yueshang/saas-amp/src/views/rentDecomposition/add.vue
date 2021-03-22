<template>
  <div class="list-page">
    <el-table :data="tableData" size='mini' ref="table">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="项目名称" prop="project_name"></el-table-column>
      <el-table-column label="所属市调" prop="its_market"></el-table-column>
      <el-table-column label="距离项目(公里)" prop="its_market"></el-table-column>
      <el-table-column label="所属位置" prop="its_market"></el-table-column>
      <el-table-column label="开业年限" prop="its_market"></el-table-column>
      <el-table-column label="商铺现状" prop="its_market"></el-table-column>
      <el-table-column label="项目体量(㎡)" prop="its_market"></el-table-column>
      <el-table-column label="商业面积(㎡)" prop="admin_truename"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.contract_mould_cate_status !== 'DELETED'">
            <el-button size="mini" type="warning" @click="toUpdate(scope.row.serial_number_id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="confirm(scope.row.serial_number_id)">删除</el-button>
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
        contract_mould_cate_status: 'NODELETED'
      },
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
        console.log(error, '---[取消删除 start]----')
      }
    },
    async handelConfirm (id) {
      let res
      if (this.params.contract_mould_cate_status === 'DELETED') {
        res = await contTempCate.restore({serial_number_id: id})
      } else {
        const params = {serial_number_id: id}
        res = await contTempCate.del(params)
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
    getStatus (status) {
      return this.$enums.status.find(item => item.value === status)
    },
    toUpdate (id) {
      this.$router.push({name: 'projectUpdate', params: {id}})
    },
    async getList () {
      let { contract_mould_cate_name = '', number_items = '', contract_mould_cate_status} = this.params
      const params = {
        ...this.pageInfo,
        contract_mould_cate_name: contract_mould_cate_name.trim(),
        number_items: number_items.trim(),
        contract_mould_cate_status
      }
      const res = await contTempCate.find(params)
      const {code, result} = res
      if (code === 200) {
        this.tableData = result.data.map(item => {
          return {
            serial_number_id: item.admin_id,
            contract_mould_cate_name: item.admin_truename,
            number_items: item.number_items,
            create_time: item.create_time,
            contract_mould_cate_descr: item.contract_mould_cate_descr,
            contract_mould_cate_status: item.contract_mould_cate_status,
            admin_truename: item.admin_truename
          }
        })
        console.log(this.tableData, '----[列表数据 start]----')
        this.pageInfo.sum_num = result.sum_num
      }
    },
    toCreate () {
      this.$router.push({name: 'contTempCateCreate'})
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
