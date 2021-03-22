<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="12" style="display: flex; align-items: center;">
        <el-input v-model="query.project_name" size="mini" style="margin-right: 20px; width: 200px;" placeholder="请输入"></el-input>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button @click="dealAdd" size="mini" type="success">新建竞品分析</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" fixed />
      <el-table-column width="80" label="序号" prop="cpa_id">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="项目名称" prop="project_name">
        <template slot-scope="scope">
          <span class="ys-text-blue c_p" @click="goDetail(scope.row.cpa_id, scope.row.admin_truename, scope.row.cate_name, scope.row.create_time)">{{scope.row.project_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="cate_name"/>
      <el-table-column label="创建日期" prop="create_time" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="admin_truename"/>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="goModify(scope.row.cpa_id)">编辑</el-button>
          <el-button size="mini" type="info" plain @click="toDelete(scope.row.cpa_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>

    <!-- dialog -->
    <div>
      <!-- 竞品分析新建、编辑 -->
      <create-product :open="fast" :id="cpaId" @close="closeFast"></create-product>
    </div>

  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  import CreateProduct from './create';
  import GlobalApi from '@/apis/apis/global';
  import Product from '@/apis/apis/product'
  export default {
    components: {
      CreateProduct
    },
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        project: '',// 项目
        projectList: [], // 项目列表
        tableData: [],
        cpa_id: '', // 选中的ids
        query: {
          project_name: ''
        },
        fast: false,
        cpaId: null, // 编辑id
      }
    },
    watch: {},
    created() {
      // this.getProList()
      this.getList()
    },
    mounted() {

    },
    // 日期转换格式
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      }
    },
    methods: {
      // 获取项目列表
      getProList() {
        GlobalApi.getProjectList().then(res => {
          console.log("proList:",res)
          if(res.code === 200 && res.result){
            this.projectList = res.result.data
            console.log(this.projectList)
          }
        })
      },
      // 查询
      async getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        await Product.find(params).then(res => {
          console.log("竞品分析List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      reset() {
        this.query = {
          project_name: ''
        }
      },
      // 新建
      dealAdd() {
        this.fast = true;
      },
      // 批量删除
      dealDel() {
        this.$confirm(`确认要删除吗？`).then(() => {
          Product.delList({cpa_id: this.cpa_id}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      // 详情
      goDetail(cpa_id, admin_truename, cate_name, create_time) {
        this.$router.push({name:'productDetail',query: {cpa_id:cpa_id,admin_truename:admin_truename,cate_name:cate_name,create_time:create_time}})
      },
      goModify(id) {
        console.log(id)
        this.fast = true;
        this.cpaId = id;
      },
      // 删除
      toDelete(id) {
        this.$confirm(`确认要删除吗？`).then(() => {
          Product.delList({cpa_id: id+''}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      closeFast(res) {
        this.fast = res.fast;
        this.cpaId = null;
        if(res.reload) {
          this.getList()
        }
      },
      handleSelectionChange(val) {
        this.cpa_id = val.map(item => item.cpa_id) + '';
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .ys-tab-col-color{
    color: #DF1717!important;
  }
  .ys-text-blue{
    color: #1890FF;
  }
</style>
