<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="18" style="display: flex; align-items: center;">
        <el-select placeholder="项目名称" size="mini" v-model="query.project_name" filterable clearable style="margin-right: 10px; width: 200px;">
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
            :label="item.project_name"
            :value="item.project_name">
          </el-option>
        </el-select>
        <el-input style="margin-right: 10px; width: 200px;" v-model="query.case_name" size="mini" placeholder="方案名称"></el-input>
        <el-button @click="dealSearch" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="dealAdd" size="mini" type="success">新建沙盒</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" @selection-change="handleSelectionChange">
      <el-table-column width="40" type="selection" fixed/>
      <el-table-column min-width="50" label="序号" prop="si_id" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="项目名称" prop="project_name" fixed/>
      <el-table-column min-width="140" label="方案名称" prop="case_name" fixed>
        <template slot-scope="scope">
          <span @click="toUpdate(scope.row.si_id)" class="ys-text-blue c_p">{{ scope.row.case_name }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="140" label="变化后总收入（万元）" prop="changed_income"/>
      <el-table-column min-width="140" label="变化后NOI(万元)" prop="changed_noi"/>
      <el-table-column min-width="140" label="NOI变化率" prop="noi_per"/>
      <el-table-column min-width="140" label="变化后ROI(万元)" prop="changed_roi"/>
      <el-table-column min-width="140" label="ROI变化率" prop="roi_per"/>
      <el-table-column min-width="120" label="创建日期">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="admin_truename"/>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="info" plain @click="toDelete(scope.row.si_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>

    <!-- dialog -->
    <div>
      <!-- 新增 -->
      <create :open="fastCreate" @close="closeCreate"></create>
    </div>

  </div>
</template>

<script>
  import { handlePaginator } from '@mixins';
  import Create from './create';
  import Sandbox from '@/apis/apis/sandbox';
  import GlobalApi from '@/apis/apis/global';

  export default {
    components: {
      Create,
    },
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        query: {
          project_name: null,
          case_name: null,
        },
        fastCreate: false,
        projectList: [], // 项目列表
        tableData: [],
        si_id: null, // 选中的ids
      }
    },
    watch: {},
    created() {
      this.getList()
      this.getProList()
    },
    mounted() {

    },
    methods: {
      getList() {
        const params = {
          ...this.pageInfo,
          ...this.query
        }
        Sandbox.getList(params).then(res => {
          console.log("List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      getProList() {
        GlobalApi.getProjectList().then(res => {
          console.log("proList:",res)
          if(res.code === 200 && res.result){
            this.projectList = res.result.data
          }
        })
      },
      dealSearch() {
        this.getList()
      },
      reset() {
        this.query = {
          project_name: null,
          case_name: null
        }
      },
      closeCreate(res) {
        console.log(res)
        this.fastCreate = res.fast;
        if(res.reload) {
          this.getList()
        }
      },
      dealAdd() {
        this.fastCreate = true;
      },
      dealDel() {
        if(!this.si_id){ // 未勾选数据
          this.$message.error('请勾选需要删除的数据')
          return
        }
        this.delete(this.si_id)
      },
      toUpdate(id) {
        this.$router.push({name:'sandboxDetail',query: {
          si_id: id
        }})
      },
      toDelete(id) {
        this.delete(id+'')
      },
      delete(ids) {
        this.$confirm(`确认要删除吗？`).then(() => {
          Sandbox.delList({si_id: ids}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      handleSelectionChange(val) {
        this.si_id = val.map(item => item.si_id) + '';
      },
    },
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';

</style>
