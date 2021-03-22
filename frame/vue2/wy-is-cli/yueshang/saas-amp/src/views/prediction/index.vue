<template>
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="14" style="display: flex; align-items: center;">
        <el-input style="margin-right: 10px; width: 200px;" v-model="query.plan_name" size="mini" placeholder="方案名称"></el-input>
        <el-select placeholder="方案类型" size="mini" v-model="query.plan_type" filterable clearable style="margin-right: 10px; width: 200px;">
          <el-option
            v-for="item in planTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin-right: 20px; width: 200px;"
          v-model="query.pr_year"
          type="year"
          size="mini"
          value-format="yyyy"
          placeholder="权责年">
        </el-date-picker>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="10" style="text-align: right;">
        <el-button @click="buyAdd" size="mini" type="success">新建收购项目</el-button>
        <el-button @click="developAdd" size="mini" type="success">新建开发新项目</el-button>
        <el-button @click="dealDel" size="mini" type="info" plain>批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" header-row-class-name="table-header" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" fixed />
      <el-table-column min-width="50" label="序号" prop="id" fixed>
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="方案名称" prop="plan_name" fixed/>
      <el-table-column min-width="120" label="方案类型" prop="plan_type">
        <template slot-scope="scope">
          <span v-if="scope.row.plan_type == '1'">新开发项目</span>
          <span v-if="scope.row.plan_type == '2'">收购项目</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="IRR" prop="irr"/>
      <el-table-column min-width="120" label="净现值(万元)" prop="net_prs_value"/>
      <el-table-column min-width="120" label="增值(万元)" prop="increment"/>
      <el-table-column min-width="120" label="收购价(万元)" prop="purchasing_price"/>
      <el-table-column min-width="120" label="贷款(万元)" prop="loan"/>
      <el-table-column min-width="120" label="退出年数" prop="years_of_withdrawal"/>
      <el-table-column min-width="120" label="创建日期" prop="date_created">
        <template slot-scope="scope">
          <span>{{scope.row.date_created | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="创建人" prop="created_by"/>
      <el-table-column fixed="right" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="goModify(scope.row.id, scope.row.plan_type)">编辑</el-button>
          <el-button size="mini" type="info" plain @click="toDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>

    <!-- dialog -->
    <div>
      <!-- 新建、编辑收购项目 -->
      <create-buy :open="fast" :id="planId" :type="planType" @close="closeFast"></create-buy>
    </div>

  </div>
</template>

<script>
  import { handlePaginator } from '@mixins'
  import CreateBuy from './createBuy';
  import Prediction from '@/apis/apis/prediction'
  export default {
    components: {
      CreateBuy
    },
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        planTypeList: [
          {
            label: '新项目',
            value: '1'
          },
          {
            label: '收购项目',
            value: '2'
          }
        ], //项目列表
        tableData: [],
        idArr: [], //选中id集合
        query: {
          plan_name: null,
          plan_type: null,
          pr_year: null
        },
        fast: false,
        fast2: false,
        planId: null, //方案id
        planType: null //方案类型
      }
    },
    watch: {},
    created() {

    },
    mounted() {
      this.getList()
    },
    // 日期转换格式
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : ''
      }
    },
    methods: {
      async getList() {
        const params = {
          ...this.query,
          ...this.pageInfo
        }
        await Prediction.find(params).then(res => {
          console.log("投模预测List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data
            this.pageInfo.sum_num = res.result.sum_num
          }
        })
      },
      reset() {
        this.query = {
          plan_name: null,
          plan_type: null,
          pr_year: null
        }
      },
      buyAdd() {
        this.fast = true;
        this.planType = 2;
        this.planId = 0;
      },
      developAdd() {
        this.fast = true;
        this.planType = 1;
        this.planId = 0;
      },
      dealDel() {
        this.$confirm(`确认要删除吗？`).then(() => {
          Prediction.delList({plan_idArr: this.idArr}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      goModify(id, type) {
        this.fast = true;
        this.planId = id;
        this.planType = type;
      },
      toDelete(ids) {
        const params = []
        params.push(Number(ids))
        this.$confirm(`确认要删除吗？`).then(() => {
          Prediction.delList({plan_idArr: params}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        })
      },
      closeFast(res) {
        this.fast = res.fast
        this.planId = null
        this.planType = null
        if(res.reload) {
          this.getList()
        }
      },
      // 选中序号
      handleSelectionChange(val) {
        this.idArr = val.map(item => Number(item.id))
      },
      openModel(type) {

      },
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
