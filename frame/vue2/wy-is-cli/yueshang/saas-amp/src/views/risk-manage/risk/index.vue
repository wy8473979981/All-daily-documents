<template>
  <!-- 风控 -->
  <div class="list-page">
    <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
      <el-col :span="18" style="display: flex; align-items: center;">
        <el-select placeholder="项目名称" size="mini" v-model="query.pro_name" filterable clearable style="margin-right: 20px; width: 200px;">
          <el-option
            v-for="(item,index) in projectList"
            :key="index"
            :label="item.project_name"
            :value="item.project_name">
          </el-option>
        </el-select>
        <el-date-picker
          style="margin-right: 20px; width: 200px;"
          v-model="query.pr_month"
          type="month"
          size="mini"
          value-format="yyyy-MM"
          placeholder="权责月">
        </el-date-picker>
        <el-button @click="getList" size="mini" type="success">查询</el-button>
        <el-button @click="reset" size="mini">重置</el-button>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-button @click="nowUpdate" size="mini" type="success">立即刷新</el-button>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini" class="in-table">
      <el-table-column label="序号" min-width="80" fixed>
        <el-table-column prop="id" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (pageInfo.page - 1) * 10 }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="项目名称" min-width="180" fixed>
        <el-table-column prop="project_name" :show-overflow-tooltip="true" min-width="180" >
          <template slot-scope="scope">
            <span @click="goDetail(scope.row.project_id)" class="ys-text-blue c_p">{{ scope.row.project_name }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="投资" align="center">
        <el-table-column label="GFA" min-width="100" prop="gfa" >
          <template slot-scope="scope" >
            <span>{{scope.row.gfa | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="GLA" min-width="100" prop="gla" >
          <template slot-scope="scope" >
            <span>{{scope.row.gla | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="投资成本(万元)" min-width="120" prop="capex" >
          <template slot-scope="scope" >
            <span>{{scope.row.capex | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="业主要求收益率" min-width="120" prop="owner_require_income_rate" />
        <el-table-column label="估值(万元)" min-width="120" prop="valuation" >
          <template slot-scope="scope" >
            <span>{{scope.row.valuation | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="资产估值(万元)" min-width="120" prop="assets_valuation" >
          <template slot-scope="scope" >
            <span>{{scope.row.assets_valuation | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="估值时间" prop="today_time" min-width="120"/>
        <el-table-column label="资本化率" prop="capitalization_rate" />
      </el-table-column>
      <el-table-column label="管理" align="center">
        <el-table-column label="开业日期" prop="open_year" min-width="120" />
        <el-table-column label="出租率" prop="rental_rate" min-width="100" />
        <el-table-column label="自持+销售返租(m²)" min-width="140" prop="self_support_leaseback" >
          <template slot-scope="scope" >
            <span>{{scope.row.self_support_leaseback | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="主力店(m²)" min-width="120" prop="main_store" >
          <template slot-scope="scope" >
            <span>{{scope.row.main_store | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="非主力店(m²)" min-width="120" prop="unmain_store" >
          <template slot-scope="scope" >
            <span>{{scope.row.unmain_store | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="铺位数" prop="store_num" min-width="100" />
        <el-table-column label="合约数" prop="contract_num" min-width="100" />
        <el-table-column label="合同总金额" min-width="120" prop="contract_total_amount" >
          <template slot-scope="scope" >
            <span>{{scope.row.contract_total_amount | formatVal}}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣点商户数" prop="buckle_merchant_num" />
      </el-table-column>


      <!-- <el-table-column label="投资" min-width="220" prop="area">
        <template slot-scope="scope">
          <table class="min-table">
            <tr>
              <td>GFA</td>
              <td>{{ scope.row.invest.gfa }}</td>
            </tr>
            <tr>
              <td>GLA</td>
              <td>{{ scope.row.invest.gla }}</td>
            </tr>
            <tr>
              <td>投资成本（万元）</td>
              <td>{{ scope.row.invest.investCost }}</td>
            </tr>
            <tr>
              <td>业主要求收益率</td>
              <td>{{ scope.row.invest.earnRate }}</td>
            </tr>
            <tr>
              <td>估值（万元）</td>
              <td>{{ scope.row.invest.value }}</td>
            </tr>
            <tr>
              <td>资产估值（万元）</td>
              <td>{{ scope.row.invest.assets }}</td>
            </tr>
            <tr>
              <td>估值时间</td>
              <td>{{ scope.row.invest.time }}</td>
            </tr>
            <tr>
              <td>资本化率</td>
              <td>{{ scope.row.invest.capitalRate }}</td>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="管理" min-width="220" prop="openRate">
        <template slot-scope="scope">
          <table class="min-table">
            <tr>
              <td>开业日期</td>
              <td>{{ scope.row.manage.openTime }}</td>
            </tr>
            <tr>
              <td>出租率</td>
              <td>{{ scope.row.manage.rentRate }}</td>
            </tr>
            <tr>
              <td>自持+销售返租（㎡）</td>
              <td>{{ scope.row.manage.oneself }}</td>
            </tr>
            <tr>
              <td>主力店（㎡）</td>
              <td>{{ scope.row.manage.mainForce }}</td>
            </tr>
            <tr>
              <td>非主力店（㎡）</td>
              <td>{{ scope.row.manage.unMainForce }}</td>
            </tr>
            <tr>
              <td>铺位数</td>
              <td>{{ scope.row.manage.bunkNum }}</td>
            </tr>
            <tr>
              <td>合约数</td>
              <td>{{ scope.row.manage.treatyNum }}</td>
            </tr>
            <tr>
              <td>合同总金额</td>
              <td>{{ scope.row.manage.contractTotal }}</td>
            </tr>
            <tr>
              <td>扣点商户数</td>
              <td>{{ scope.row.manage.dePointNum }}</td>
            </tr>
          </table>
        </template>
      </el-table-column> -->
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>
  </div>
</template>

<script>
  import { handlePaginator } from '@mixins';
  import Risk from '@/apis/apis/risk';
  import GlobalApi from '@/apis/apis/global';
  import { toThousands } from '@/utils/index';

  export default {
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        query: {
          pro_name: null,
          pr_month: null
        },
        projectList: [],// 项目列表
        tableData: [],
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
        Risk.getList(params).then(res => {
          console.log("List:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data;
            this.pageInfo.sum_num = res.result.sum_num;
            this.dataHandle()
          }
        })
      },
      reset() {
        this.query = {
          pro_name: null,
          pr_month: null
        }
      },
      dataHandle() {
        this.tableData.forEach((item) => {
          if(item) {
            for(let key in item) {
              if(!item[key]) {
                item[key] = '/'
              }
            }
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
      goDetail(id) {
        this.$router.push({name:'riskDetail', query:{pro_id: id, pr_month: this.query.pr_month}})
      },
      nowUpdate() {
        Risk.flush().then(res => {
          if(res.code === 200){
            this.pageInfo.page = 1;
            this.getList()
          }
        })
      }
    },
    filters: {
      formatDate(time) {
        return time && time!=='/' ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : '/'
      },
      formatVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : '/'
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  ::v-deep .in-table{
    color: #333;
    .el-table__body tr:hover {
      .min-table{
        td{
          background-color: #F2F4F6;
          transition: background-color .25s ease;
        }
      }
    }
    .min-table{
      margin: 5px 0;
      td{
        padding: 0;
        line-height: 18px;
        height: 18px;
      }
      tr>td:first-child{
        color: #98A9BC;
        padding-right: 30px;
      }
    }
  }
  .total{
    margin: 15px 0;
    text-align: right;
    font-size: 12px;
    color: #98A9BC;
  }
</style>
