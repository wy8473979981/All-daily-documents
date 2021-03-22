<template>
  <div class="project_msg">
    <div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="d-min">
              <span>项目名称</span>
              <el-input class="required" v-model="survey.project_name" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="d-min">
              <span>项目公司</span>
              <el-input class="required" v-model="survey.project_companny" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="d-min">
              <span>城市</span>
              <el-input class="required" v-model="survey.city" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="d-min">
              <span>资产包归属</span>
              <el-input class="required" v-model="survey.asset_package_owner" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="d-min">
              <span>总成本(亿元)</span>
              <el-input class="required" v-model="survey.total_cost" v-filter-check-input3 @input="total_costInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <!-- -------------------------------新项目------------------------------- -->
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>土地出让金(亿元)</span>
              <el-input class="required" v-model="survey.land_transfer_fee" v-filter-check-input3 placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>楼板价(元/㎡)</span>
              <el-input class="required" v-model="survey.floor_price" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>车位指标(个/㎡)</span>
              <el-input class="required" v-model="survey.ps_index" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>总土地成本(亿元)</span>
              <el-input class="required" v-model="survey.total_land_cost" v-filter-check-input3 @input="total_land_costInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>开发成本(亿元)</span>
              <el-input class="required" v-model="survey.development_cost" v-filter-check-input3 @input="development_costInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>土地贷款金额(亿元)</span>
              <el-input class="required" v-model="survey.land_loan_amount" v-filter-check-input3 @input="land_loan_amountInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>土地贷款利率(%)</span>
              <el-input class="required" v-model="survey.land_lending_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>开发贷款金额(亿元)</span>
              <el-input class="required" v-model="survey.development_loan_amount" v-filter-check-input3 @input="development_loan_amountInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>开发贷款利率(%)</span>
              <el-input class="required" v-model="survey.development_lending_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>经营贷款金额(亿元)</span>
              <el-input class="required" v-model="survey.operating_loan_amount" v-filter-check-input3 @input="operating_loan_amountInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>经营贷款利率(%)</span>
              <el-input class="required" v-model="survey.operating_lending_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <!-- -------------------------------------------------------------- -->
          <!-- -------------------------------收购项目------------------------------- -->
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>输入资本化率(%)</span>
              <el-input class="required" v-model="survey.input_cpz_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>业主要求收益率(%)</span>
              <el-input class="required" v-model="survey.return_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>总回收成本(亿元)</span>
              <el-input class="required" v-model="survey.total_recovery_cost" v-filter-check-input3 placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>收购价(亿元)</span>
              <el-input class="required" v-model="survey.purchasing_price" v-filter-check-input3 @input="purchasing_priceInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>收购费用(亿元)</span>
              <el-input class="required" v-model="survey.acquisition_costs" v-filter-check-input3 @input="acquisition_costsInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>贷款费用(亿元)</span>
              <el-input class="required" v-model="survey.loan_fees" v-filter-check-input3 @input="loan_feesInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>原始基数(亿元)</span>
              <el-input class="required" v-model="survey.original_cardinality" disabled></el-input>
            </div>
          </el-col>
          <!-- <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>总成本(亿元)</span>
              <el-input class="required" v-model="survey.total_cost" @input="total_costInput" placeholder="请输入"></el-input>
            </div>
          </el-col> -->
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>到期日</span>
              <el-date-picker
                class="required"
                v-model="survey.due_date"
                value-format="timestamp"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>贷款金额(亿元)</span>
              <el-input class="required" v-model="survey.loan_amount" v-filter-check-input3 @input="loan_amountInput" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>贷款利率(%)</span>
              <el-input class="required" v-model="survey.lending_rate" v-filter-check-input placeholder="请输入"></el-input>
            </div>
          </el-col>
          <!-- -------------------------------------------------------------- -->
          <el-col :span="6">
            <div class="d-min">
              <span>期限</span>
              <el-date-picker
                class="required"
                v-model="survey.term"
                value-format="timestamp"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="d-min">
              <span>初始权益(亿元)</span>
              <el-input class="required" v-model="survey.initial_equity" disabled></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 1" :span="6">
            <div class="d-min">
              <span>退出年数</span>
              <el-input class="required" v-model="survey.years_of_withdrawal" v-filter-check-input2 placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col v-if="type == 2" :span="6">
            <div class="d-min">
              <span>退出年数</span>
              <el-input class="required" v-model="survey.sign_out_year" v-filter-check-input2 placeholder="请输入"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'type', 'projectName'],
  data() {
    return {
      /* survey: {
        //项目概况
        plan_id: null, //方案id
        plan_name: null, //方案名称
        project_id: null, //项目id
        project_name: null, //项目名称
        project_companny: null, //项目公司
        city: null, //城市
        asset_package_owner: null, //资金包归属
        //----------------
        loan_amount: null, //贷款金额
        lending_rate: null, //贷款利率
        term: null, //期限
        Initial_equity: null, //初始权益
        //新建新项目-关键日期
        start_date: null, //项目投资启动
        project_started_date: null, //项目开工时间
        project_opening_date: null, //项目开业时间
        project_cpl_date: null, //项目竣工时间
        project_exit_date: null, //项目退出时间
        //面积
        grd_floor_business_area: null, //地上楼层经营面积
        po_area_ungrd_floor: null, //地下楼层经营面积
        parking_area: null, //停车场面积
        total_building_area: null, //总建筑面积
        utilization_rate: null, //使用率
        total_rental_area: null, //总租赁面积
        //新建新项目-项目概况-type1
        land_transfer_fee: null, //土地出让金
        floor_price: null, //楼板价
        ps_index: null, //车位指标
        total_land_cost: null, //总土地成本
        development_cost: null, //开发成本
        years_of_withdrawal: null, //退出年数
        //新建收购项目-项目概况-type2
        input_cpz_rate: null, //输入资本化率
        total_recovery_cost: null, //总回收成本
        purchasing_price: null, //收购价
        acquisition_costs: null, //收购费用
        loan_fees: null, //贷款费用
        original_cardinality: null, //原始基数
        total_cost: null, //总成本
        due_date: null, //到期日
        sign_out_year: null //退出年数
      }, */
      survey: {
        project_name: null
      },
      others: {
        underground_area: null, //地下建筑面积合计
        sale_property_ground_area: null, //销售物业地上计容面积
        sale_property_ground_per: null, //销售物业地上计容占比
        hold_property_ground_area: null, //持有物业地上计容面积
        hold_property_ground_per: null, //持有物业地上计容占比
        parking_target: null, //车位指标
        house_property_give_per: null, //住宅可售物业赠送比
        invest_total_price: null, //总土地成本（含地价、契税、市政配置）
        invest_total_imitate_price: null, //总土地成本（模拟成本）
        biz_underground_land_price: null, //地下商业补土地款
        project_transfer_other_tax: null, //项目转让额外税费
      }
    }
  },
  created() {
    // this.resetData()
  },
  watch: {
    data: {
      handler(nv) {
        console.log(nv)
        if(nv) {
          this.loadData(nv)
        }else{
          this.resetData()
        }
      },
      deep: true
    },
    type(nv) {
      if(nv == 1) {
        if (!this.survey.land_transfer_fee) {
          this.survey = {}
        }
      }
      if(nv == 2){
        if (!this.survey.input_cpz_rate) {
          this.survey = {}
        }
      }
    },
    projectName(nv) {
      this.survey = {
        project_name: null
      }
      this.survey.project_name = nv
    }
  },
  methods: {
    // 总土地成本type1
    total_land_costInput() {
      if (!this.survey.development_cost) {
        this.survey.initial_equity = (Number(this.survey.total_land_cost) + 0).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.total_land_cost) + Number(this.survey.development_cost)).toFixed(9)
      }
    },
    // 开发成本type1
    development_costInput() {
      if (!this.survey.total_land_cost) {
        this.survey.initial_equity = (0 + Number(this.survey.development_cost)).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.total_land_cost) + Number(this.survey.development_cost)).toFixed(9)
      }
    },
    // 收购价type2
    purchasing_priceInput() {
      // 计算原始基数
      if (!this.survey.acquisition_costs && !this.survey.loan_fees) {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + 0 + 0).toFixed(9)
      } else if (!this.survey.acquisition_costs) {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + 0 + Number(this.survey.loan_fees)).toFixed(9)
      } else if (!this.survey.loan_fees) {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + Number(this.survey.acquisition_costs) + 0).toFixed(9)
      } else {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + Number(this.survey.acquisition_costs) + Number(this.survey.loan_fees)).toFixed(9)
      }
      // 计算初始权益
      if (!this.survey.loan_amount) {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - 0).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - Number(this.survey.loan_amount)).toFixed(9)
      }
    },
    // 收购费用type2
    acquisition_costsInput() {
      // 计算原始基数
      if (!this.survey.purchasing_price && !this.survey.loan_fees) {
        this.survey.original_cardinality = (0 + Number(this.survey.acquisition_costs) + 0).toFixed(9)
      } else if (!this.survey.purchasing_price) {
        this.survey.original_cardinality = (0 + Number(this.survey.acquisition_costs) + Number(this.survey.loan_fees)).toFixed(9)
      } else if (!this.survey.loan_fees) {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + Number(this.survey.acquisition_costs) + 0).toFixed(9)
      } else {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + Number(this.survey.acquisition_costs) + Number(this.survey.loan_fees)).toFixed(9)
      }
      // 计算初始权益
      if (!this.survey.loan_amount) {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - 0).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - Number(this.survey.loan_amount)).toFixed(9)
      }
    },
    // 贷款费用type2
    loan_feesInput() {
      // 计算原始基数
      if (!this.survey.purchasing_price && !this.survey.acquisition_costs) {
        this.survey.original_cardinality = (0 + 0 + Number(this.survey.loan_fees)).toFixed(9)
      } else if (!this.survey.purchasing_price) {
        this.survey.original_cardinality = (0 + Number(this.survey.acquisition_costs) + Number(this.survey.loan_fees)).toFixed(9)
      } else if (!this.survey.acquisition_costs) {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + 0 + Number(this.survey.loan_fees)).toFixed(9)
      } else {
        this.survey.original_cardinality = (Number(this.survey.purchasing_price) + Number(this.survey.acquisition_costs) + Number(this.survey.loan_fees)).toFixed(9)
      }
      // 计算初始权益
      if (!this.survey.loan_amount) {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - 0).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - Number(this.survey.loan_amount)).toFixed(9)
      }
    },
    // 贷款金额type2
    loan_amountInput(val) {
      // 计算初始权益
      if (!this.survey.original_cardinality) {
        this.survey.initial_equity = (0 - Number(this.survey.loan_amount)).toFixed(9)
      } else {
        this.survey.initial_equity = (Number(this.survey.original_cardinality) - Number(this.survey.loan_amount)).toFixed(9)
      }
      this.$emit('loanAmount', {
        loan_amount: val
      })
    },
    total_costInput(val) {
      this.$emit('totalCost', {
        total_cost: val
      })
    },
    land_loan_amountInput(val) {
      this.$emit('landLoanAmount', {
        land_loan_amount: val
      })
    },
    development_loan_amountInput(val) {
      this.$emit('developmentLoanAmount', {
        development_loan_amount: val
      })
    },
    operating_loan_amountInput(val) {
      this.$emit('operatingLoanAmount', {
        operating_loan_amount: val
      })
    },
    // 加载详情数据
    loadData(data) {
      this.survey = data
    },
    // 数据复位（清除）
    resetData() {
      for(let key in this.survey) {
        this.survey[key] = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss';
.project_msg{
  >div{
    margin-bottom: 40px;
    >p{
      margin-bottom: 15px;
    }
  }
}
.el-row{
  margin-bottom: 20px;
}
.d-min{
  >span{
    display: block;
    font-size: 14px;
    color: #98A9BC;
    margin-bottom: 10px;
    margin-top: 20px;
  }
}
</style>
