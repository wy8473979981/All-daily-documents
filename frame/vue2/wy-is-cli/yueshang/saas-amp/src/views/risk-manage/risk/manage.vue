<template>
  <div class="manage">
    <div class="data-bar">
      <ul>
        <li>
          <strong>开业日期</strong>
          <span>{{head.open_year | fillNull}}</span>
        </li>
        <li>
          <strong>GLA</strong>
          <span>{{head.gla | formatVal}}</span>
        </li>
        <li style="width:120px;">
          <strong>出租率</strong>
          <span>{{head.rental_rate}}%</span>
        </li>
        <li style="width:160px;">
          <strong>自持+销售返租面积</strong>
          <span>{{head.self_support_leaseback | formatVal}}</span>
        </li>
        <li>
          <strong>主力店面积</strong>
          <span>{{head.main_store | formatVal}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <strong>非主力店面积</strong>
          <span>{{head.unmain_store | formatVal}}</span>
        </li>
        <li>
          <strong>铺位数</strong>
          <span>{{head.store_num | fillNull}}</span>
        </li>
        <li style="width:120px;">
          <strong>合约数</strong>
          <span>{{head.contract_num | fillNull}}</span>
        </li>
        <li style="width:160px;">
          <strong>合约总金额</strong>
          <span>{{head.contract_total_amount | formatVal}}</span>
        </li>
        <li>
          <strong>扣点商户数</strong>
          <span>{{head.buckle_merchant_num | fillNull}}</span>
        </li>
      </ul>
    </div>
    <!-- 收入&经营费用 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">收入&经营费用</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':inType===1}" @click="inTypeSwitch(1)">同比</label>|
          <label :class="{'active':inType===2}" @click="inTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="income"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date +'（万元）'" align="center">
            <el-table-column align="right" prop="month_reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_reality | formatVal }}
                <span v-show="inType===1">
                  <i v-show="diff(scope.row.month_reality,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_reality,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="inType===2">
                  <i v-show="diff(scope.row.month_reality,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_reality,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="inType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="inType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="month-difference" label="差异">
              <template slot-scope="scope">
                <span v-show="inType===1" :class="diff(scope.row.month_reality,scope.row.year_on_year)>0? 'green':'red'">
                  {{ scope.row.month_reality | difference(scope.row.year_on_year) }}
                </span>
                <span v-show="inType===2" :class="diff(scope.row.month_reality,scope.row.link_ratio)>0? 'green':'red'">
                  {{ scope.row.month_reality | difference(scope.row.link_ratio) }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计（万元）" align="center">
            <el-table-column align="right" prop="year_reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_reality | formatVal }}
                <span>
                  <i v-show="diff(scope.row.year_reality,scope.row.reference_value)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_reality,scope.row.reference_value)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="reference_value" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'1',scope.row.id)" v-model="scope.row.reference_value" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="year-difference" label="差异">
              <template slot-scope="scope">
                <span :class="diff(scope.row.year_reality,scope.row.reference_value)>0? 'green':'red'">
                  {{scope.row.year_reality | difference(scope.row.reference_value)}}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 收缴率 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">收缴率</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':rateType===1}" @click="rateTypeSwitch(1)">同比</label>|
          <label :class="{'active':rateType===2}" @click="rateTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="capture"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date" align="center">
            <el-table-column align="right" prop="month_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_real | fillNull }}
                <span v-show="rateType===1">
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="rateType===2">
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="rateType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | fillNull}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="rateType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | fillNull}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计" align="center">
            <el-table-column align="right" prop="year_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_real | fillNull }}
                <span>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="refer" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'3',scope.row.id)" v-model="scope.row.refer" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 销售额 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">销售额</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':salesType===1}" @click="salesTypeSwitch(1)">同比</label>|
          <label :class="{'active':salesType===2}" @click="salesTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="sell"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date +'（万元）'" align="center">
            <el-table-column align="right" prop="month_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_real | formatVal }}
                <span v-show="salesType===1">
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="salesType===2">
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="salesType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="salesType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计（万元）" align="center">
            <el-table-column align="right" prop="year_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_real | formatVal }}
                <span>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="refer" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'3',scope.row.id)" v-model="scope.row.refer" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 坪效&租售比 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">坪效&租售比</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':ratioType===1}" @click="ratioTypeSwitch(1)">同比</label>|
          <label :class="{'active':ratioType===2}" @click="ratioTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="area"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date" align="center">
            <el-table-column align="right" prop="month_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_real | formatVal }}
                <span v-show="ratioType===1">
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="ratioType===2">
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="ratioType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="ratioType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计" align="center">
            <el-table-column align="right" prop="year_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_real | formatVal }}
                <span>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="refer" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'3',scope.row.id)" v-model="scope.row.refer" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 招商 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">招商</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':attractType===1}" @click="attractTypeSwitch(1)">同比</label>|
          <label :class="{'active':attractType===2}" @click="attractTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="attract"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date" align="center">
            <el-table-column align="right" prop="month_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_real | formatVal }}
                <span v-show="attractType===1">
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="attractType===2">
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="attractType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="attractType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计" align="center">
            <el-table-column align="right" prop="year_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_real | formatVal }}
                <span>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="refer" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'3',scope.row.id)" v-model="scope.row.refer" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 客流 -->
    <div>
      <div class="t-l">
        <h3 class="min-title">客流</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':flowType===1}" @click="flowTypeSwitch(1)">同比</label>|
          <label :class="{'active':flowType===2}" @click="flowTypeSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="p_flow"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="160"></el-table-column>
          </el-table-column>
          <el-table-column :label="date" align="center">
            <el-table-column align="right" prop="month_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_real | formatVal }}
                <span v-show="flowType===1">
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="flowType===2">
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_real,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="flowType===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="flowType===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="全年累计" align="center">
            <el-table-column align="right" prop="year_real" label="实际">
              <template slot-scope="scope">
                {{ scope.row.year_real | formatVal }}
                <span>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.year_real,scope.row.refer)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="refer" label="参考">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'3',scope.row.id)" v-model="scope.row.refer" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 租约到期 -->
    <div>
      <h3 class="min-title">租约到期</h3>
      <div id="barEcharts" class="line-style"></div>
      <div>
        <el-table ref="table" :data="tableData" size="mini">
          <el-table-column min-width="80" label="时间" prop="cont_month" />
          <el-table-column min-width="120" align="right" label="租金(万元)" prop="rent">
            <template slot-scope="scope" >
              <span>{{scope.row.rent | formatVal}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="120" align="right" label="租金占比(%)" prop="rent_rate"/>
          <el-table-column min-width="160" align="right" label="平均租金(元/m²/月)" prop="avg_rent">
            <template slot-scope="scope" >
              <span>{{scope.row.avg_rent | formatVal}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="120" align="right" label="面积(m²)" prop="area">
            <template slot-scope="scope" >
              <span>{{scope.row.area | formatVal}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="140" align="right" label="面积占比(%)" prop="area_rate"/>
          <el-table-column min-width="120" align="right" label="租约数" prop="rent_contract_num"/>
          <el-table-column min-width="140" align="right" label="租约数占比(%)" prop="rent_contract_rate"/>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Risk from '@/apis/apis/risk';
import { toThousands } from '@/utils/index';

export default {
  name: 'Manage',
  computed: {
    
  },
  props: ['data'],
  data () {
    return {
      date: '',
      head: {
        open_year: "",
        rental_rate: "",
        self_support_leaseback: "",
        main_store: "",
        unmain_store: "",
        store_num: "",
        contract_num: "",
        contract_total_amount: "",
        buckle_merchant_num: ""
      },
      inType: 1,
      income: [],
      rateType: 1,
      capture: [],
      salesType: 1,
      sell: [],
      ratioType: 1,
      area: [],
      attractType: 1,
      attract: [],
      flowType: 1,
      p_flow: [],
      tableData: [],
      barData: [
        // [201, 137, 645, 339, 502, 851],   // 租金
        // [435, 201, 733, 715, 1959, 1144],  // 面积
        // [2019, 2020, 2021, 2022, 2023, 2024]  // 年
      ],
    }
  },
  mounted() {
    this.loadData(this.data);
    console.log(this.data)
  },
  methods: {
    loadData(data) {
      console.log(this.data)
      this.date = this.data.pr_month ? this.data.pr_month : new Date().format('yyyy-MM');
      this.head = this.data.head;
      this.income = this.data.income;
      this.capture = this.data.capture;
      this.sell = this.data.sell;
      this.area = this.data.area;
      this.attract = this.data.attract;
      this.p_flow = this.data.p_flow;
      this.tableData = this.data.table;
      this.dataHandle();
    },
    dataHandle() {
      let rentSum = 0, areaSum = 0, rentContractNumSum = 0;
      this.tableData.forEach(item => {
        if(item.rent) {
          rentSum += Number(item.rent)
        }
        if(item.area) {
          areaSum += Number(item.area)
        }
        if(item.rent_contract_num) {
          rentContractNumSum += Number(item.rent_contract_num)
        } else {
          item.rent_contract_num = '/'
        }
      })
      this.tableData.forEach(item => {
        if(item.rent) {
          item.rent_rate = ((Number(item.rent) / rentSum)*100).toFixed(2)
        } else {
          item.rent_rate = '/'
        }
        if(item.area) {
          item.area_rate = ((Number(item.area) / areaSum)*100).toFixed(2)
        } else {
          item.area_rate = '/'
        }
        if(item.rent_contract_num != '/') {
          item.rent_contract_rate = ((Number(item.rent_contract_num) / rentContractNumSum)*100).toFixed(2)
        } else {
          item.rent_contract_rate = '/'
        }
        // for(let key in item) {
        //   if(!item[key]) {
        //     item[key] = '/'
        //   }
        // }
      })
      if(this.data.chart && this.data.chart.length) {
        // 租金
        this.barData[0] = this.data.chart.map((item) => {
          return item.rent
        })
        // 面积
        this.barData[1] = this.data.chart.map((item) => {
          return item.area
        })
        // 年
        this.barData[2] = this.data.chart.map((item) => {
          return item.year
        })
        console.log(this.barData)
      }
      // 租约到期柱状图
      this.createBarEcharts();
    },
    inTypeSwitch(n) {
      this.inType = n;
    },
    rateTypeSwitch(n) {
      this.rateType = n;
    },
    salesTypeSwitch(n) {
      this.salesType = n;
    },
    ratioTypeSwitch(n) {
      this.ratioType = n;
    },
    attractTypeSwitch(n) {
      this.attractType = n;
    },
    flowTypeSwitch(n) {
      this.flowType = n;
    },
    createBarEcharts() {
      this.$chart.bar1('barEcharts',{
        data: this.barData
      });
    },
    diff(v1, v2) {
      return Number(v1) - Number(v2)
    },
    update(e, table, id) {
      console.log(e.target.value, table, id)
      Risk.update({
        id: id,
        table: table,
        data: e.target.value
      }).then(res => {
        console.log(res)
      })
    }
  },
  filters: {
    difference(v1, v2) {
      return (Number(v1) - Number(v2)).toFixed(2)
    },
    formatVal(val) {
      return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : '/'
    },
    fillNull(val) {
      return val ? val : '/'
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .el-table::before{
    height: 0;
  }
  .manage{
    >div{
      margin-bottom: 30px;
    }
  }
  .data-bar{
    >ul{
      margin-bottom: 20px;
      >li{
        width: 140px;
      }
    }
  }
  .min-title{
    margin-bottom: 10px;
  }
  .t-l{
    display:flex; 
    align-items: center;
    margin-bottom: 10px;
    .min-title{
      margin-bottom: 0;
    }
    .tab-label{
      margin-bottom: 0;
      height: unset;
    }
  }
  .min-font{
    label.active{
      font-size: 14px;
    }
  }
  .red{
    color: #FF4746;
  }
  .green{
    color: #468CEB;
  }
  i.red{
    color: #FF4746;
    font-weight: 600;
  }
  i.green{
    color: #468CEB;
    font-weight: 600;
  }
  .line-style {
    width: 100%;
    height: 300px;
    margin-bottom: 10px;
  }
  ::v-deep .input-s1{
    .el-input__inner {
      width: 80%;
    }
  }
  ::v-deep .ta-r{
    .el-input__inner {
      text-align: right;
    }
  }
</style>