<template>
  <div class="list-page">
    <!-- 概要指标 -->
    <div>
      <h3 class="min-title">概要指标</h3>
      <div class="data-bar2">
        <ul>
          <li>
            <span>净运营收入NOI（万元）</span>
          </li>
          <li>
            <strong>当月实际</strong>
            <span v-if="!info.month_actual">/</span>
            <span v-else>{{ info.month_actual | formatVal }}</span>
          </li>
          <li>
            <strong>全年预测</strong>
            <span v-if="!info.annual_forecast_noi">/</span>
            <span v-else>{{ info.annual_forecast_noi | formatVal }}</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>总投资成本（万元）</span>
          </li>
          <li>
            <strong>总成本</strong>
            <span v-if="!info.total_cost">/</span>
            <span v-else>{{ info.total_cost | formatVal }}</span>
          </li>
          <li>
            <strong>总成本（按回购）</strong>
            <span v-if="!info.total_cost_buy">/</span>
            <span v-else>{{ info.total_cost_buy | formatVal }}</span>
          </li>
          <li>
            <strong>预测年回报率（总成本）</strong>
            <span v-if="!info.year_return_rate_total">/</span>
            <span v-else>{{ info.year_return_rate_total }}%</span>
          </li>
          <li>
            <strong>预测年回报率（回购成本）</strong>
            <span v-if="!info.year_return_rate_buy">/</span>
            <span v-else>{{ info.year_return_rate_buy }}%</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>估值（万元）</span>
          </li>
          <li>
            <strong>估值</strong>
            <span v-if="!info.valuation">/</span>
            <span v-else>{{ info.valuation | formatVal }}</span>
          </li>
          <li>
            <strong>估值日期</strong>
            <span v-if="!info.today_time">/</span>
            <span v-else>{{ info.today_time }}</span>
          </li>
          <li>
            <strong>预测年回报率（按估值）</strong>
            <span v-if="!info.year_return_rate_valuation">/</span>
            <span v-else>{{ info.year_return_rate_valuation }}%</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>贷款（万元）</span>
          </li>
          <li>
            <strong>本金</strong>
            <span v-if="!info.capital">/</span>
            <span v-else>{{ info.capital | formatVal }}</span>
          </li>
          <li>
            <strong>到期日</strong>
            <span v-if="!info.due_date">/</span>
            <span v-else>{{ info.due_date | formatDate }}</span>
          </li>
          <li>
            <strong>年贷款利息</strong>
            <span v-if="!info.year_loan_interest">/</span>
            <span v-else>{{ info.year_loan_interest | formatVal }}</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>Margin</span>
          </li>
          <li>
            <strong>NOI Margin</strong>
            <span v-if="!info.noi_margin">/</span>
            <span v-else>{{ info.noi_margin }}%</span>
          </li>
          <li>
            <strong>目标NOI Margin</strong>
            <span v-if="!info.target_noi_margin">/</span>
            <span v-else>{{ info.target_noi_margin }}%</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 财务细节 -->
    <div>
      <h3 class="min-title">财务细节</h3>
      <el-table
        size="mini"
        :data="financial_details"
        style="font-size: 14px; width: 100%;"
        class="in-table"
        row-key="id">
        <el-table-column label="">
          <el-table-column prop="name" width="150"/>
        </el-table-column>
        <el-table-column label="2020-04 (万元)" align="center">
          <el-table-column align="right" label="实际" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.month_actual | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="预算" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.name == '费用' || scope.row.name == 'NOI'">
                <el-input size="mini" v-model="scope.row.month_budget" v-filter-check-input @blur="month_budgetBlur(scope.row.id, scope.row.name, $event)" placeholder="请输入"></el-input>
              </span>
              <span v-else>{{ scope.row.month_budget | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异额" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.month_diff_amount }}</span> -->
              <span>{{ (scope.row.month_actual - scope.row.month_budget).toFixed(2) | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异率" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.month_diff_rate }}</span> -->
              <span v-if="!scope.row.month_budget || scope.row.month_budget == 0">/</span>
              <span v-else>{{ ((scope.row.month_actual - scope.row.month_budget) / scope.row.month_budget).toFixed(2) }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="全年累计（万元）" align="center">
          <el-table-column align="right" label="实际" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.total_actual | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="预算" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.name == '费用' || scope.row.name == 'NOI'">
                <el-input size="mini" v-model="scope.row.total_budget" v-filter-check-input @blur="total_budgetBlur(scope.row.id, scope.row.name, $event)" placeholder="请输入"></el-input>
              </span>
              <span v-else>{{ scope.row.total_budget | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异额" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.total_diff_amount }}</span> -->
              <span>{{ (scope.row.total_actual - scope.row.total_budget).toFixed(2) | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异率" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.total_diff_rate }}</span> -->
              <span v-if="!scope.row.total_budget || scope.row.total_budget == 0">/</span>
              <span v-else>{{ ((scope.row.total_actual - scope.row.total_budget) / scope.row.total_budget).toFixed(2) }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="全年预测（万元）" align="center">
          <el-table-column align="right" label="收入预测" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.forecast_actual | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="收入预算" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.name == '费用' || scope.row.name == 'NOI'">
                <el-input size="mini" v-model="scope.row.forecast_budget" v-filter-check-input @blur="forecast_budgetBlur(scope.row.id, scope.row.name, $event)" placeholder="请输入"></el-input>
              </span>
              <span v-else>{{ scope.row.forecast_budget | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异额" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.forecast_diff_amount }}</span> -->
              <span>{{ (scope.row.forecast_actual - scope.row.forecast_budget).toFixed(2) | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="差异率" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.forecast_diff_rate }}</span> -->
              <span v-if="!scope.row.forecast_budget || scope.row.forecast_budget == 0">/</span>
              <span v-else>{{ ((scope.row.forecast_actual - scope.row.forecast_budget) / scope.row.forecast_budget).toFixed(2) }}%</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="达成率" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.income_reach_rate }}</span> -->
              <span v-if="!scope.row.forecast_budget || scope.row.forecast_budget == 0">/</span>
              <span v-else>{{ (scope.row.forecast_actual / scope.row.forecast_budget).toFixed(2) }}%</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- <el-table
        size="mini"
        :data="test2"
        style="font-size: 14px; width: 100%"
        class="in-table"
        row-key="id">
        <el-table-column label="">
          <el-table-column prop="name" width="150"/>
        </el-table-column>
        <el-table-column align="center" label="总额" prop="total"/>
        <el-table-column align="center" label="小于30天" prop="day_30"/>
        <el-table-column align="center" label="31-60天" prop="day_30_60"/>
        <el-table-column align="center" label="61-90天" prop="day_60_90"/>
        <el-table-column align="center" label="大于90天" prop="day_90"/>
      </el-table> -->
      <table class="default-table-noBorder">
        <thead>
          <tr>
            <th></th>
            <th>总额</th>
            <th>小于30天</th>
            <th>31-60天</th>
            <th>61-90</th>
            <th>大于90天</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in analyse_day" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.day_30 }}</td>
            <td>{{ item.day_30_60 }}</td>
            <td>{{ item.day_60_90 }}</td>
            <td>{{ item.day_90 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3 class="min-title">十二月收入与费用同比折线图</h3>
      <div id="lineEcharts" class="line-style"></div>
    </div>
    <div>
      <h3 class="min-title">经营概况</h3>
      <div id="barEcharts" class="line-style"></div>
    </div>
    <div>
      <h3 class="min-title">平均租金对比</h3>
      <div id="line2Echarts" class="line-style"></div>
    </div>
    <div>
      <h3 class="min-title">租赁面积情况</h3>
      <div id="pieEcharts" class="line-style" style="height: 500px;"></div>
    </div>
  </div>
</template>

<script>
  import Synthetical from '@/apis/apis/synthetical'
  import { toThousands } from '@/utils/index';
  export default {
    components: {
      
    },
    data() {
      return {
        project_id: '',
        pr_month: '',
        info: {},
        financial_details: [], //财务细节
        analyse_day: [], //财务细节2
        analyse_income_cost: [], //收入与费用同比折线图
        analyse_survey: [], //销售概况
        average_rent: [], //平均租金对比
        analyse_index: [], //租赁面积情况
        lineData: [],
        barData: [],
        line2Data: [],
        pieData: [],
      }
    },
    watch: {},
    created() {
      this.project_id = this.$route.query.project_id
      this.pr_month = this.$route.query.pr_month
      this.getList()
    },
    mounted() {
      // 十二月收入与费用同比折线图
      // this.createLineEcharts();
      // 销售概况柱状图
      // this.createBarEcharts();
      // 平均租金对比
      // this.createLine2Echarts();
      // 租赁面积情况
      // this.createPieEcharts();
    },
    // 日期转换格式
    filters: {
      formatDate(time) {
        return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
      },
      formatVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : '/'
      }
    },
    methods: {
      // 加载详情
      getList() {
        Synthetical.findDetail({project_id: this.project_id, pr_month: this.pr_month}).then(res => {
          console.log(res)
          if(res.code === 200 && res.result){
            console.log(res.result)
            if (res.result.info) {
              this.info = res.result.info
            }
            if (res.result.financial_details) {
              this.financial_details = res.result.financial_details
            }
            if (res.result.analyse_day) {
              this.analyse_day = res.result.analyse_day
            }
            var incomeData = []
            var income_yoyData = []
            var costData = []
            var cost_yoyData = []
            for (var key in res.result.analyse_income_cost) {
              incomeData.push(res.result.analyse_income_cost[key].income)
              income_yoyData.push(res.result.analyse_income_cost[key].income_yoy)
              costData.push(res.result.analyse_income_cost[key].cost)
              cost_yoyData.push(res.result.analyse_income_cost[key].cost_yoy)
            }
            this.lineData.push(incomeData, income_yoyData, costData, cost_yoyData)
            console.log(this.lineData)
            this.createLineEcharts()
            var sale_amountData = []
            var sale_yoyData = []
            var passenger_flowData = []
            var passenger_yoyData = []
            var trafficData = []
            var traffic_yoyData = []
            for (var key in res.result.analyse_survey) {
              sale_amountData.push(res.result.analyse_survey[key].sale_amount)
              sale_yoyData.push(res.result.analyse_survey[key].sale_yoy)
              passenger_flowData.push(res.result.analyse_survey[key].passenger_flow)
              passenger_yoyData.push(res.result.analyse_survey[key].passenger_yoy)
              trafficData.push(res.result.analyse_survey[key].traffic)
              traffic_yoyData.push(res.result.analyse_survey[key].traffic_yoy)
            }
            this.barData.push(sale_amountData, sale_yoyData, passenger_flowData, passenger_yoyData, trafficData, traffic_yoyData)
            this.createBarEcharts()
            var un_average_rentData = []
            var un_average_rent_yoyData = []
            var average_rentData = []
            var average_rent_yoyData = []
            for (var key in res.result.average_rent) {
              un_average_rentData.push(res.result.average_rent[key].un_average_rent)
              un_average_rent_yoyData.push(res.result.average_rent[key].un_average_rent_yoy)
              average_rentData.push(res.result.average_rent[key].average_rent)
              average_rent_yoyData.push(res.result.average_rent[key].average_rent_yoy)
            }
            this.line2Data.push(un_average_rentData, un_average_rent_yoyData, average_rentData, average_rent_yoyData)
            this.createLine2Echarts()
            if (!res.result.analyse_index[0]) {
              this.pieData = [0, 0, 0, 0]
            } else {
              for (var key in res.result.analyse_index) {
                if (res.result.analyse_index[key].proportion == null) {
                  this.pieData.push(0)
                } else {
                  this.pieData.push(res.result.analyse_index[key].proportion)
                }
              }
              if (res.result.analyse_index.length == 3) this.pieData.push(0)
              if (res.result.analyse_index.length == 1) this.pieData.push(0)
            }
            this.createPieEcharts()
          }
        })
      },
      month_budgetBlur(id, name, val) {
        if(!val.target.value) return this.$message.error('请输入数据')
        this.editHttp(id, 'month_budget', val.target.value)
      },
      total_budgetBlur(id, name, val) {
        if(!val.target.value) return this.$message.error('请输入数据')
        this.editHttp(id, 'total_budget', val.target.value)
      },
      forecast_budgetBlur(id, name, val) {
        if(!val.target.value) return this.$message.error('请输入数据')
        this.editHttp(id, 'forecast_budget', val.target.value)
      },
      editHttp(id, name, val) {
        Synthetical.edit({financial_id: id, field_name: name, field_value: val}).then(res => {
          if(res.code === 200 && res.result){
            console.log(res.result)
            this.getList()
          }
        })
      },
      createLineEcharts() {
        this.$chart.line2('lineEcharts',{
          data: this.lineData
        });
      },
      createBarEcharts() {
        this.$chart.bar2('barEcharts',{
          data: this.barData
        });
      },
      createLine2Echarts() {
        this.$chart.line3('line2Echarts',{
          data: this.line2Data
        });
      },
      createPieEcharts() {
        this.$chart.pie3('pieEcharts',{
          data: this.pieData
        });
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .data-bar{
    >ul{
      margin-bottom: 20px;
      >li{
        // padding-right: 0;
        // min-width: 140px;
        width: 140px;
      }
    }
  }
  .list-page{
    >div{
      margin-bottom: 30px;
    }
  }
  .min-title{
    margin-bottom: 10px;
  }
  .line-style {
    width: 100%;
    height: 300px;
    margin-bottom: 10px;
  }
</style>
