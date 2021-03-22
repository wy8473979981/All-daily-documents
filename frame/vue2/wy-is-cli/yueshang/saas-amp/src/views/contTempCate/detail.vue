<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="24">
        <el-button @click="toBackPage()" size="mini" type="info">返回</el-button>
        <el-button @click="toCreate(0)" size="mini" type="primary">新增项目</el-button>
        <el-button @click="toCreate(1)" size="mini" type="primary">保存</el-button>
      </el-col>
    </el-row>
    <!-- 竖状表格 -->
    <el-row class="three-tab">
      <!-- 表结构 -->
      <el-col :span="5">
        <table border="1" cellpadding="0" cellspacing="0" class="tab-left">
          <!-- 一级菜单 -->
          <template v-for="item in tableTab">
            <tr :key="item.key">
              <template v-if="!item.hasNext">
                <td :rowspan="item.rows" colspan="3" width="100" :title="item.name"><p>{{item.name}}</p></td>
              </template>
              <template v-else>
                <td :rowspan="item.rows" width="100" :title="item.name"><p>{{item.name}}</p></td>
                <td v-if="item.childs && item.childs[0].childs" :rowspan="item.childs[0].rows" width="60" :title="item.childs[0].name"><p>{{item.childs[0].name}}</p></td>
                <td v-if="item.childs && item.childs[0].childs" :title="item.childs[0].childs[0].name"><p>{{item.childs[0].childs[0].name}}</p></td>
                <td v-if="item.childs && !item.childs[0].childs" colspan="2" :title="item.childs[0].name"><p>{{item.childs[0].name}}</p></td>
              </template>
            </tr>
            <!-- 二级菜单 -->
            <template v-for="(item2,index2) in item.childs">
              <tr :key="item2.key" v-if="index2 > 0" >
                <template v-if="!item2.hasNext">
                  <td colspan="2" width="60" :title="item2.name"><p>{{item2.name}}</p></td>
                </template>
                <template v-else>
                  <td :rowspan="item2.rows" width="60" :title="item2.name"><p>{{item2.name}}</p></td>
                  <td v-if="item2.childs && index2 > 0" :title="item2.childs[0].name"><p>{{item2.childs[0].name}}</p></td>
                </template>
              </tr>
              <!-- 三级菜单 -->
              <template v-for="(item3,index3) in item2.childs">
                <template v-if="index3 > 0">
                  <tr :key="item3.key" >
                    <td v-if="item2.childs" :title="item3.name"><p>{{item3.name}}</p></td>
                  </tr>
                </template>
              </template>
            </template>
          </template>
        </table>
      </el-col>
      <!-- 表数据 -->
      <el-col :span="19">
        <table border="1" cellpadding="0" cellspacing="0" style="border:none;">
          <tr>
            <td v-for="tab in tableList" :key="tab.id" style="border:none;">
              <table style="border-left:none;">
              <tr v-for="item in tableItem" :key="'tab-'+item">
                <td style="border-left:none;border-right:none;">
                  <!-- open_year -->
                  <el-date-picker
                    style="width: 100%;"
                    :editable="false"
                    v-if="item === 'open_year'"
                    :disabled="filterData(item)"
                    size="mini"
                    v-model="tab[item]"
                    value-format="yyyy"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                  <!-- filter -->
                  <el-input v-else-if="filterNumData(item)" :disabled="filterData(item)" size="mini" v-model="tab[item]" v-filter-check-number placeholder="-" />
                  <!-- other -->
                  <el-input v-else :disabled="filterData(item)" size="mini" v-model="tab[item]" placeholder="-" />
                </td>
              </tr>
            </table>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

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
      number_id: '',// 市调ID
      market_name: '',// 市调名称
      tableTab: [],// 字段信息
      tableList: [],// 表数据
      tableItem: [],// 统计所有key
      totleItemList: [],// key字段中所有业态/楼层‘统计’字段
      numData: [],// 过滤只能输入数字
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
    this.number_id = this.$route.query.number_id
    this.market_name = this.$route.query.market_name
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
        const tableItemList = []
        table.forEach(item => {
          if (item.childs && item.childs.length > 0){
            item.childs.forEach(item2 => {
              if (item2.childs && item2.childs.length > 0){
                item2.childs.forEach(item3 => {
                  tableItemList.push(item3.key)
                })
              }else{
                tableItemList.push(item2.key)
              }
            })
          }else{
            tableItemList.push(item.key)
          }
        });
        this.tableItem = tableItemList
        console.log(this.tableItem,'=====this.tableItem')
        this.getFilterNum()
      }

      // 获取市调汇总信息列表
      const tableL = await contTempCate.selectContextList({market_research_id: this.number_id})
      if (tableL.code == 200 && tableL.result){
        this.tableList = tableL.result
      }

      // 获取市调详情-统计字段表
      const totleItem = await contTempCate.getLeftMenuNoEdit({market_research_id: this.number_id})
      if (totleItem.code == 200 && totleItem.result){
        this.totleItemList = totleItem.result
      }
    },
    toCreate (type) {
      if (type === 0) {
        this.$router.push({
          path: './projectDetailUpdate',
          query: {market_id: this.number_id, market_name: this.market_name}
        })
      }
      if (type === 1) {
        this.updateProjectListDetail()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
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
        this.$message.error("未添加市调信息")
        return
      }
      const save = await contTempCate.updateContextList({input: JSON.stringify(this.tableList)})
      if (save.code === 200){
        this.$message.success(save.msg || "保存成功")
      }
    },
    // 判断key是否属于统计字段
    filterData (key) {
      const tIndex = this.totleItemList.findIndex(item => item === key)
      if (tIndex === -1) {
        return false
      }
      return true
    },
    // 获取需要过滤的key，处理只录入数字
    async getFilterNum () {
      const filterNums = await contTempCate.dataVerification()
      this.numData = filterNums

    },
    filterNumData (key) {
      // const filter = ['distance','supermarket_area','supermarket_rent','supermarket_period','supermarket_management','cost']
      const filter = this.numData || []
      const nIndex = filter.findIndex(item => item === key)
      if (nIndex === -1) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.tab-left {
  background-color: #f5f7fa;
}
table {
  // width: 360px;
  box-sizing: border-box;
  border-right: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
}
.three-tab:last-of-type(table) {
  border-right: none;
}
tr {
  // width: inherit;
  // float: left;
  box-sizing: border-box;
}
td {
  border-top: 1px solid #FFFFFF;
  border-left: 1px solid #FFFFFF;
  // float: left;
  text-align: center;
  font-size: 12px;
  box-sizing: border-box;
  vertical-align: middle;

  p {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
    line-height: 28px;
    height: 28px;
  }
}
input {
  border: none!important;
}
div,input {
  box-sizing: border-box;
}
@import '~@styles/common.scss'

</style>
