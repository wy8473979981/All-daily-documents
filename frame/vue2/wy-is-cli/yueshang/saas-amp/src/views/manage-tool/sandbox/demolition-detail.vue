<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :wrapperClosable="false"
      :withHeader="false"
      size="1155px">
      <div class="dialog-close-icon" @click="fast=false">
        <i></i>
      </div>
      <div class="detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3>拆合铺详情</h3>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="10">
                <div class="d-min">
                  <span>铺位号</span>
                  <p v-for="(item, index) in old_store_no" :key="index" style="margin-bottom: 10px;">{{ item.store_no }}</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>计租面积（㎡）</span>
                  <p v-for="(item, index) in old_store_no" :key="index">{{ item.rental_area | formatVal }}</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 铺位信息 -->
          <div style="margin-top:30px;">
            <h3 class="min-title">铺位信息</h3>
            <div style="margin-bottom:30px;" v-for="(item,index) in new_store" :key="index">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="d-min">
                    <span>新铺位号</span>
                    <p v-if="!item.new_store_info.store_no">/</p>
                    <p v-else>{{ item.new_store_info.store_no }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>计租面积（㎡）</span>
                    <p v-if="!item.new_store_info.rental_area">/</p>
                    <p v-else>{{ item.new_store_info.rental_area | formatVal }}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="4">
                  <div class="d-min"><span style="text-align: right;">租金包（元/㎡/月）</span></div>
                </el-col>
                <el-col :span="4">
                  <div class="d-min"><span>物业管理费（元/㎡/月）</span></div>
                </el-col>
                <el-col :span="4">
                  <div class="d-min"><span>租赁月数</span></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="min-list" v-for="(itemm,indexx) in item.new_store_year" :key="indexx">
                <el-col :span="4" class="flex">
                  <span>{{ itemm.year }}年</span>
                  <p v-if="!itemm.rent_package">/</p>
                  <p v-else>{{ itemm.rent_package | formatVal }}</p>
                </el-col>
                <el-col :span="4" class="flex">
                  <p v-if="!itemm.property_fee">/</p>
                  <p v-else>{{ itemm.property_fee | formatVal }}</p>
                </el-col>
                <el-col :span="4" class="flex">
                  <p v-if="!itemm.rent_month">/</p>
                  <p v-else>{{ itemm.rent_month }}</p>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 合同信息 -->
          <div>
            <h3 class="min-title">合同信息</h3>
            <div style="border-bottom: 1px solid #F2F4F6; margin-bottom: 20px;" v-for="(item, index) in new_store" :key="index">
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>合同开始</span>
                    <p v-if="!item.new_store_contract.begin_time">/</p>
                    <p v-else>{{ item.new_store_contract.begin_time }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>合同结束</span>
                    <p v-if="!item.new_store_contract.end_time">/</p>
                    <p v-else>{{ item.new_store_contract.end_time }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>平均租金（元/㎡/月）</span>
                    <p v-if="!item.new_store_contract.avg_rent">/</p>
                    <p v-else>{{ item.new_store_contract.avg_rent }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>免租期（月）</span>
                    <p v-if="!item.new_store_contract.free_rent_period">/</p>
                    <p v-else>{{ item.new_store_contract.free_rent_period }}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金总计（元）</span>
                    <p v-if="!item.new_store_contract.total_rent">/</p>
                    <p v-else>{{ item.new_store_contract.total_rent | formatVal }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>物管总计（元）</span>
                    <p v-if="!item.new_store_contract.total_property">/</p>
                    <p v-else>{{ item.new_store_contract.total_property | formatVal }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金起记日</span>
                    <p v-if="!item.new_store_contract.rent_start_day">/</p>
                    <p v-else>{{ item.new_store_contract.rent_start_day }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>月销售额（元）</span>
                    <p v-if="!item.new_store_contract.mounth_sale_amount">/</p>
                    <p v-else>{{ item.new_store_contract.mounth_sale_amount | formatVal }}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>工程改造预算</span>
                    <p v-if="!item.new_store_contract.project_budget">/</p>
                    <p v-else>{{ item.new_store_contract.project_budget | formatVal }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金方式</span>
                    <p v-if="!item.new_store_contract.rent_type">/</p>
                    <p v-else>{{ item.new_store_contract.rent_type }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>支付周期</span>
                    <p v-if="!item.new_store_contract.pay_cycle">/</p>
                    <p v-else>{{ item.new_store_contract.pay_cycle }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 收益对比 -->
          <div style="margin-bottom:80px;">
            <h3 class="min-title">收益对比</h3>
            <div>
              <el-table
                :data="incomeContrastData"
                style="width: 100%"
                class="in-table">
                <el-table-column label="年份" >
                  <el-table-column prop="year" width="110"></el-table-column>
                </el-table-column>
                <el-table-column label="原铺位信息汇总" align="center">
                  <el-table-column align="right" prop="formerRent" label="租金收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.formerRent || scope.row.formerRent == 0">/</span>
                      <span v-else>{{ scope.row.formerRent | formatVal }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" prop="formerPropertyManage" label="物管收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.formerPropertyManage || scope.row.formerPropertyManage == 0">/</span>
                      <span v-else>{{ scope.row.formerPropertyManage | formatVal }}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="调整后铺位信息汇总" align="center">
                  <el-table-column align="right" prop="adjustRent" label="租金收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.adjustRent || scope.row.adjustRent == 0">/</span>
                      <span v-else>{{ scope.row.adjustRent | formatVal }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" prop="adjustPropertyManage" label="物管收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.adjustPropertyManage || scope.row.adjustPropertyManage == 0">/</span>
                      <span v-else>{{ scope.row.adjustPropertyManage | formatVal }}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="差额" align="center">
                  <el-table-column align="right" prop="diffRent" label="租金收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.diffRent || scope.row.diffRent == 0">/</span>
                      <span v-else>{{ scope.row.diffRent | formatVal }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" prop="diffPropertyManage" label="物管收入总计(万元)">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.diffPropertyManage || scope.row.diffPropertyManage == 0">/</span>
                      <span v-else>{{ scope.row.diffPropertyManage | formatVal }}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Sandbox from '@/apis/apis/sandbox';
import { toThousands } from '@/utils/index';
export default {
  name: 'DemolitionShop',
  props: ['open', 'ssId', 'storeNo', 'rentalArea'],
  data() {
    return {
      old_store_no: [],
      new_store: [{
        new_store_info: [{
          store_no: null,
          rental_area: null
        }],
        new_store_year: [{
          year: null,
          rent_package: null,
          property_fee: null,
          rent_month: null
        }],
        new_store_contract: [{
          avg_rent: null,
          begin_time: null,
          end_time: null,
          free_rent_period: null,
          mounth_sale_amount: null,
          pay_cycle: null,
          project_budget: null,
          rent_start_day: null,
          rent_type: null,
          total_property: null,
          total_rent: null,
        }]
      }],
      incomeContrastData: []
    }
  },
  created() {
    
  },
  computed: {
    fast: {
      get() {
        if (this.open) {
          this.resetData()
          this.getDetail()
          this.incomeShow = false
        }
        return this.open
      },
      set(val) {
        this.$emit('close', val)
      }
    }
  },
  watch: {
    ssId(nv) {
      console.log(nv)
      // this.getDetail()
    }
  },
  mounted() {
  },
  beforeDestroy() {
    
  },
  filters: {
    formatVal(val) {
      return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : '/'
    }
  },
  methods: {
    getDetail() {
      Sandbox.detail({ss_id: this.ssId}).then(res => {
        console.log("List:",res)
        if(res.code === 200 && res.result){
          console.log(res.result)
          this.old_store_no = res.result.old_store_no
          this.new_store = res.result.new_store
          this.incomeContrastData = res.result.income_comparison
        }
        if(res.code === 2013 && res.result){
          this.old_store_no.push({store_no: this.storeNo, rental_area: this.rentalArea})
        }
      })
    },
    resetData() {
      this.old_store_no = []
      this.new_store = [{
        new_store_info: [{
          store_no: null,
          rental_area: null
        }],
        new_store_year: [{
          year: null,
          rent_package: null,
          property_fee: null,
          rent_month: null
        }],
        new_store_contract: [{
          avg_rent: null,
          begin_time: null,
          end_time: null,
          free_rent_period: null,
          mounth_sale_amount: null,
          pay_cycle: null,
          project_budget: null,
          rent_start_day: null,
          rent_type: null,
          total_property: null,
          total_rent: null,
        }]
      }]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 1141px;
}
.btn-1{
  height: 32px;
  width: 32px;
  font-size: 18px;
  padding: 0;
  border-radius: 2px;
  display: block;
  margin: 0;
  margin-bottom: 10px;
}
.detail{
  .fast-top-bar{
    padding: 0 20px;
    height: 74px;
    align-items: center;
    background-color: #F2F4F6;
    h3{
      font-size: 18px;
      color: #7A8FA4;
    }
    button {
      padding: 0;
      min-width: 80px;
      height: 32px;
      border-radius: 2px;
    }
  }
  ::v-deep .con{
    padding: 0 20px;
    height: calc(100vh - 74px);
    overflow-y: auto;
    >div{
      margin-bottom: 30px;
    }
    .min-title{
      margin-bottom: 20px;
    }
    .el-input__inner{
      height: 36px;
      border: none;
      background-color: #F2F4F6;
      border-radius: 2px;
    }
    .el-select .el-input .el-select__caret{
      line-height: 36px;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #DFE3E5;
      color: #333;
    }
    .el-date-editor .el-input__icon{
      line-height: 36px;
    }
  }
  .d-min{
    >span{
      display: block;
      font-size: 14px;
      color: #98A9BC;
      margin-bottom: 10px;
    }
    >p{
      margin-bottom: 10px;
    }
  }
  .flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ::v-deep .min-list{
    margin-bottom: 10px;
    .el-input__inner{
      height: 26px;
    }
    .mini-input{
      width: 110px;
    }
  }
  ::v-deep .in-table .el-table__body tbody tr:last-child{
    font-weight: 600;
  }
}
</style>