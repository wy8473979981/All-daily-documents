<template>
  <div class="invest">
    <div class="data-bar">
      <ul>
        <li>
          <strong>GFA</strong>
          <span>{{head.gfa | formatVal}}</span>
        </li>
        <li>
          <strong>GLA</strong>
          <span>{{head.gla | formatVal}}</span>
        </li>
        <li>
          <strong>投资成本（万元）</strong>
          <span>{{head.capex | formatVal}}</span>
        </li>
        <li>
          <strong>业主要求收益率</strong>
          <span>{{head.owner_require_income_rate}}%</span>
        </li>
        <li>
          <strong>估值（万元）</strong>
          <span>{{head.valuation | formatVal}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <strong>资产估值（万元）</strong>
          <span>{{head.assets_valuation | formatVal}}</span>
        </li>
        <li>
          <strong>估值时间</strong>
          <span>{{head.today_time | fillNull}}</span>
        </li>
        <li>
          <strong>资本化率</strong>
          <span>{{head.capitalization_rate}}%</span>
        </li>
      </ul>
    </div>
    <div>
      <div class="t-l">
        <h3 class="min-title">NOI</h3>
        <div class="tab-label min-font" style="margin-left:30px;">
          <label :class="{'active':type===1}" @click="noiSwitch(1)">同比</label>|
          <label :class="{'active':type===2}" @click="noiSwitch(2)">环比</label>
        </div>
      </div>
      <div>
        <el-table
          :data="noi"
          style="width: 100%"
          class="in-table diff-in-table">
          <el-table-column label="" >
            <el-table-column prop="name" width="80"></el-table-column>
          </el-table-column>
          <el-table-column :label="date +'（万元）'" align="center">
            <el-table-column align="right" prop="month_reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.month_reality | formatVal }}
                <span v-show="type===1">
                  <i v-show="diff(scope.row.month_reality,scope.row.year_on_year)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_reality,scope.row.year_on_year)<0" class="el-icon-bottom red"></i>
                </span>
                <span v-show="type===2">
                  <i v-show="diff(scope.row.month_reality,scope.row.link_ratio)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.month_reality,scope.row.link_ratio)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column v-if="type===1" align="right" prop="year_on_year" label="同比">
              <template slot-scope="scope" >
                <span>{{scope.row.year_on_year | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="type===2" align="right" prop="link_ratio" label="环比">
              <template slot-scope="scope" >
                <span>{{scope.row.link_ratio | formatVal}}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" label="差异">
              <template slot-scope="scope">
                <!-- <span v-show="type===1" :class="diff(scope.row.month_reality,scope.row.year_on_year)>0? 'green':'red'">{{ scope.row.month_reality | difference(scope.row.year_on_year) }}</span> -->
                <span v-show="type===1" :class="diff(scope.row.month_reality,scope.row.year_on_year)>0? 'green':'red'">{{ scope.row.month_difference }}</span>
                <!-- <span v-show="type===2" :class="diff(scope.row.month_reality,scope.row.link_ratio)>0? 'green':'red'">{{ scope.row.month_reality | difference(scope.row.link_ratio) }}</span> -->
                <span v-show="type===2" :class="diff(scope.row.month_reality,scope.row.link_ratio)>0? 'green':'red'">{{ scope.row.month_difference_link }}</span>
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
            <el-table-column align="right" prop="reference_value" label="参考值">
              <template slot-scope="scope">
                <el-input class="input-s1 ta-r" v-filter-check-input @blur="update($event,'1',scope.row.id)" v-model="scope.row.reference_value" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="right" prop="year-difference" label="差异" class-name="red">
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
    <div>
      <el-row :gutter="70">
        <el-col :span="12">
          <h3 class="min-title">ROI</h3>
          <el-table
            :data="roi"
            style="width: 100%"
            class="in-table">
            <el-table-column prop="year" label="年份">
              <template slot-scope="scope" >
                <span>{{scope.row.year | fillNull }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.reality | fillNull }}
                <span>
                  <i v-show="diff(scope.row.reality,scope.row.reference)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.reality,scope.row.reference)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="reference" label="参考值">
              <template slot-scope="scope">
                <el-input class="input-s1" v-filter-check-input @blur="update($event,'2',scope.row.id)" v-model="scope.row.reference" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3 class="min-title">ROE</h3>
          <el-table
            :data="roe"
            style="width: 100%"
            class="in-table">
            <el-table-column prop="year" label="年份">
              <template slot-scope="scope" >
                <span>{{scope.row.year | fillNull}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.reality | fillNull }}
                <span>
                  <i v-show="diff(scope.row.reality,scope.row.reference)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.reality,scope.row.reference)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="reference" label="参考值">
              <template slot-scope="scope">
                <el-input class="input-s1" v-filter-check-input @blur="update($event,'2',scope.row.id)" v-model="scope.row.reference" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="70">
        <el-col :span="12">
          <h3 class="min-title">累计税前现金流预测</h3>
          <el-table
            :data="acc"
            style="width: 100%"
            class="in-table">
            <el-table-column prop="year" label=""></el-table-column>
            <el-table-column prop="reality" label="实际">
              <template slot-scope="scope">
                {{ scope.row.reality | formatVal }}
                <span>
                  <i v-show="diff(scope.row.reality,scope.row.reference)>0" class="el-icon-top green"></i>
                  <i v-show="diff(scope.row.reality,scope.row.reference)<0" class="el-icon-bottom red"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="reference" label="参考值">
              <template slot-scope="scope">
                <el-input class="input-s1" v-filter-check-input @blur="update($event,'2',scope.row.id)" v-model="scope.row.reference" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Risk from '@/apis/apis/risk';
import { toThousands } from '@/utils/index';

export default {
  name: 'Invest',
  computed: {
    
  },
  props: ['data'],
  data () {
    return {
      type: 1,
      head: {
        gfa: "",
        gla: "",
        capex: "",
        owner_require_income_rate: "",
        valuation: "",
        assets_valuation: "",
        today_time: "",
        capitalization_rate: ""
      },
      noi: [],
      roi: [],
      roe: [],
      acc: [],
      date: '',
    }
  },
  mounted() {
    if(this.data) {
      this.loadData(this.data)
    }
  },
  watch: {
    data: {
      handler(nv, ov) {
        console.log(nv)
        if(nv) {
          this.loadData(nv)
        }
      },
      deep: true
    }
  },
  methods: {
    noiSwitch(n) {
      this.type = n;
    },
    loadData(data) {
      console.log(this.data)
      this.head = this.data.head;
      this.noi = this.data.noi;
      this.roi = this.data.roi;
      this.roe = this.data.roe;
      this.acc = this.data.acc;
      this.date = this.data.pr_month ? this.data.pr_month : new Date().format('yyyy-MM');
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
    },
    diff(v1, v2) {
      return Number(v1) - Number(v2)
    },
  },
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time+'000')).format('yyyy-MM-dd') : '/'
    },
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
  .invest{
    >div{
      margin-bottom: 30px;
    }
  }
  .data-bar{
    >ul{
      margin-bottom: 20px;
      >li{
        width: 145px;
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
  ::v-deep td.red{
    color: #FF4746;
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