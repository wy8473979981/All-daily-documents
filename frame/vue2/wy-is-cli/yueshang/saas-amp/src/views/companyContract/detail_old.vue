<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <!-- <el-button @click="toCreate(0)" size="mini" type="warning">编辑</el-button> -->
        <el-button @click="toCreate(1)" size="mini" type="primary">保存</el-button>
      </el-col>
    </el-row>
    <!--[租金市调信息 start]-->
    <el-table
      :data="tableList"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      size="small"
      class="mg-b20"
      style="width: 100%;">
      <el-table-column
      type="index"
      width="50"
      label="序号">
      </el-table-column>
      <!-- 一级 -->
      <el-table-column
        v-for="item in tableTab"
        width="120"
        :key="item.key"
        :prop="item.key"
        :label="item.name">
        <template v-if="item.hasNext">
          <!-- 二级 -->
          <el-table-column
          v-for="item2 in item.childs"
          width="120"
          :key="item2.key"
          :prop="item2.key"
          :label="item2.name">
            <template v-if="item2.hasNext">
              <!-- 三级 -->
              <el-table-column
              v-for="item3 in item2.childs"
              width="120"
              :key="item3.key"
              :prop="item3.key"
              :label="item3.name">
                <template slot-scope="scope">
                  <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row[item3.key]" placeholder="请输入"/>
                </template>
              </el-table-column>
            </template>
            <template slot-scope="scope">
              <el-input v-show="true" :disabled="item.key === 'noMainStoreLayout' || item.key === 'noMainStoreFloor'" size="mini" v-model="scope.row[item2.key]" placeholder="请输入"/>
            </template>
          </el-table-column>
        </template>
        <template slot-scope="scope">
          <el-input v-show="true" :disabled="scope.row.detailInput==='true'?true:scope.row.detailInput" size="mini" v-model="scope.row[item.key]" placeholder="请输入"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handlePaginator,tableRowStyle,tableHeaderColor } from "@mixins"
import contTempCate from '@apis/contTempCate'
export default {
  mixins: [handlePaginator],
  data () {
    return {
      enumStatus: this.$enums.status,
      params: {
        contract_mould_cate_name: '', // 合同模板分类名称
        contract_mould_cate_status: 'NODELETED' // 合同模板分类描述
      },
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      tableData: [],
      number_id: '',
      tableTab: [],// 字段信息
      tableList: [],// 表数据
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
    this.number_id = this.$route.query.number_id;
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
      let res
      if (this.params.contract_mould_cate_status === 'DELETED') {
        res = await contTempCate.restore({contract_mould_cate_id: id})
      } else {
        const params = {contract_mould_cate_id: id}
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
          .map(item => item.contract_mould_cate_id)
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
      this.$router.push({name: 'contTempCateUpdate', params: {id}})
    },
    async getList () {
      // 获取表字段信息
      const table = await contTempCate.getLeftMenu({})
      if (table){
        this.tableTab = table
      }

      // 获取市调汇总信息列表
      const tableL = await contTempCate.selectContextList({market_research_id: this.number_id})
      if (tableL.code == 200 && tableL.result){
        this.tableList = tableL.result
      }
    },
    toCreate (type) {
      if (type === 1) {
        this.updateProjectListDetail()
      }
    },
    tableRowStyle,
    tableHeaderColor,
    // tabel合并行 start
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    // tabel合并列 start
    objectSpanMethod ({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } if (columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else {
        return
      }
    },
    // 保存汇总表列表信息
    async updateProjectListDetail(){
      if (!this.tableList || this.tableList.length == 0){
        this.$message.error("未添加市调信息！")
        return
      }
      const save = await contTempCate.updateContextList({input: JSON.stringify(this.tableList)})
      if (save.code === 200){
        this.$message.success(save.msg || "保存成功！")
      }
    },
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss'
</style>
