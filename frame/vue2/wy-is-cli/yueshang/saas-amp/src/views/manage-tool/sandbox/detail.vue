<template>
  <div class="list-page">
    <el-row >
      <el-col class="title-text">
        <span>项目名称：{{project_name}}</span>
        <span>方案名称：{{case_name}}</span>
        <span>模拟年限：{{analog_years}}</span>
      </el-col>
    </el-row>
    <el-table ref="table" :data="tableData" size="mini">
      <el-table-column min-width="250" label="铺位号" prop="store_no">
        <template slot-scope="scope">
          <span class="ys-text-blue c_p" @click="goDetail(scope.row.ss_id, scope.row.store_no, scope.row.rental_area)">{{ scope.row.store_no }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110" label="计租面积（㎡）" prop="rental_area"/>
      <el-table-column min-width="140" label="合计租金收入（万元）" prop="total_rental_income"/>
      <el-table-column min-width="140" label="合计物管收入（万元）" prop="total_property_income"/>
      <el-table-column min-width="180" label="合计调整后租金收入（万元）" prop="total_adjval_rental_income"/>
      <el-table-column min-width="180" label="合计调整后物管收入（万元）" prop="total_adjval_property_income"/>
      <el-table-column min-width="140" label="合计租金差额（万元）" prop="total_diff_rental_income"/>
      <el-table-column min-width="140" label="合计物管差额（万元）" prop="total_diff_property_income"/>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.operate_status === '1'" plain @click="demolition()">拆合铺</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ys-paginator :page-info="pageInfo" @handlePaginator="handlePaginator"/>

    <!-- dialog -->
    <div>
      <!-- 拆合铺 -->
      <demolition-shop :open="fastShop" :years="analogYears" @close="closeShop"></demolition-shop>
      <!-- 铺位详情 -->
      <demolition-detail :open="fastDetail" :ssId="ssId" :storeNo="storeNo" :rentalArea="rentalArea" @close="closeDetail"></demolition-detail>
    </div>

  </div>
</template>

<script>
  import { handlePaginator } from '@mixins';
  import Sandbox from '@/apis/apis/sandbox';
  import DemolitionShop from './demolition-shop';
  import DemolitionDetail from './demolition-detail';

  export default {
    components: {
      DemolitionShop,
      DemolitionDetail
    },
    mixins: [handlePaginator],
    data() {
      return {
        pageInfo: {
          page_size: 10,
          page: 1,
          sum_num: 0
        },
        si_id: null,
        fastShop: false,
        fastDetail: false,
        analogYears: null,
        ssId: null,
        storeNo: null,
        rentalArea: null,
        tableData: [],
        project_name: null,
        case_name: null,
        analog_years: null,
      }
    },
    watch: {},
    created() {
      console.log(this.$route.query)
      // if(sessionStorage['si_id']) {
      //   this.si_id = sessionStorage['si_id'];
      // }else{
      //   sessionStorage['si_id'] = this.si_id = this.$route.query.si_id;
      // }
      this.si_id = this.$route.query.si_id;
      this.getList()
    },
    mounted() {

    },
    beforeRouteLeave(to, from, next) {
      // sessionStorage.removeItem('si_id');
      next();
    },
    methods: {
      getList() {
        const params = {
          ...this.pageInfo,
          si_id: this.si_id
        }
        Sandbox.getStoreList(params).then(res => {
          console.log("storeList:",res)
          if(res.code === 200 && res.result){
            this.tableData = res.result.data.store;
            this.project_name = res.result.data.project_name;
            this.case_name = res.result.data.case_name;
            this.analog_years = res.result.data.analog_years;
            this.pageInfo.sum_num = res.result.sum_num;
          }
        })
      },
      closeShop(res) {
        this.fastShop = res.fast
        if(res.reload) {
          this.getList()
        }
      },
      closeDetail(res) {
        this.fastDetail = res.fast
        if(res.reload) {
          this.getList()
        }
      },
      demolition() {
        this.fastShop = true
        this.analogYears = this.analog_years
      },
      goDetail(ss_id, store_no, rental_area) {
        this.fastDetail = true
        this.ssId = ss_id
        this.storeNo = store_no
        this.rentalArea = rental_area
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .title-text{
    font-size: 14px;
    color: #4a4a4a;
    padding-bottom: 20px;
    >span{
      margin-right: 30px;
    }
  }
</style>
