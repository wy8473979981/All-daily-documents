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
            <h3>拆合铺</h3>
          </el-col>
          <el-col style="text-align: right;">
            <!-- <el-button type="success" @click="fast=false">拆分</el-button> -->
            <el-button plain @click="countIncome">收益对比</el-button>
            <el-button type="success" @click="save">保存</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="6">
                <div class="d-min">
                  <span>铺位号</span>
                  <el-select v-model="shopNo" @change="shopNoChange" @blur="shopNoBlur" multiple placeholder="请选择">
                    <el-option
                      v-for="item in shopNoList"
                      :key="item.ss_id"
                      :label="item.store_no"
                      :value="item.ss_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>计租面积（㎡）</span>
                  <el-input v-model="rentalArea" :disabled="true" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 铺位信息 -->
          <div style="margin-top:30px;">
            <h3 class="min-title">铺位信息</h3>
            <div style="margin-bottom:30px;" v-for="(item,index) in newStoreInfo" :key="index">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="d-min">
                    <span>新铺位号</span>
                    <el-input v-model="item.store_no" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>计租面积（㎡）</span>
                    <el-input v-model="item.rental_area" v-filter-check-input @input="rental_areaInput(index)" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <div>
                  <!-- <el-button v-if="index===0" type="success" class="btn-1" @click="addIncomeCost()">新增</el-button> -->
                  <el-button v-if="index===0" type="success" class="btn-1" @click="addIncomeCost()">＋</el-button>
                  <!-- <el-button v-if="index>0" plain class="btn-1" @click="removeIncomeCost(index)">删除</el-button> -->
                  <el-button v-if="index>0" type="success"  class="btn-1" @click="removeIncomeCost(index)">-</el-button>
                  <el-button type="success"  class="btn-1" icon="el-icon-document-copy" @click="copyIncomeCost(index)"></el-button>
                </div>
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
              <el-row :gutter="20" class="min-list" v-for="(list,j) in item.amountList" :key="j">
                <el-col :span="4" class="flex">
                  <span>{{ list.year }}年</span>
                  <el-input class="mini-input" v-model="list.rent_package" v-filter-check-input @input="rent_packageInput(index, j)" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="4" class="flex">
                  <el-input class="mini-input" style="width: 100%;" v-model="list.property_fee" v-filter-check-input @input="property_feeInput(index, j)" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="4" class="flex">
                  <el-input class="mini-input" style="width: 100%;" v-model="list.rent_month" v-filter-check-input2 maxlength="2" @input="rent_monthInput(index, j, $event)" placeholder="请输入"></el-input>
                  <!-- <i class="add-1" v-show="j===0" @click="addRent(item.amountList)">＋</i>
                  <i class="reduce-1" v-show="j>0" @click="removeRent(item.amountList,j)">－</i>
                  <i class="reduce-1 el-icon-document-copy" style="font-size:16px;" @click="copyRent(item.amountList, index, j)"></i> -->
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 合同信息 -->
          <div>
            <h3 class="min-title">合同信息</h3>
            <div style="border-bottom: 1px solid #F2F4F6; margin-bottom: 20px;" v-for="(item, index) in newStoreInfo" :key="index">
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>合同开始</span>
                    <el-date-picker
                      v-model="item.contract_info.begin_time"
                      type="date"
                      value-format="yyyy-MM-dd"
                      @change="begin_timeChange(index, $event)"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>合同结束</span>
                    <el-date-picker
                      v-model="item.contract_info.end_time"
                      type="date"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>平均租金（元/㎡/月）</span>
                    <el-input placeholder="请输入" v-filter-check-input v-model="item.contract_info.avg_rent"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>免租期（月）</span>
                    <el-input placeholder="请输入" v-filter-check-input2 v-model="item.contract_info.free_rent_period"></el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金总计（元）</span>
                    <el-input placeholder="请输入" v-model="item.contract_info.total_rent"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>物管总计（元）</span>
                    <el-input placeholder="请输入" v-filter-check-input v-model="item.contract_info.total_property"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金起记日</span>
                    <el-date-picker
                      v-model="item.contract_info.rent_start_day"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>月销售额（元）</span>
                    <el-input placeholder="请输入" v-filter-check-input v-model="item.contract_info.mounth_sale_amount"></el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom:18px;">
                <el-col :span="6">
                  <div class="d-min">
                    <span>工程改造预算</span>
                    <el-input placeholder="请输入" v-filter-check-input v-model="item.contract_info.project_budget"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>租金方式</span>
                    <el-input placeholder="请输入" v-model="item.contract_info.rent_type"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="d-min">
                    <span>支付周期</span>
                    <el-input placeholder="请输入" v-model="item.contract_info.pay_cycle"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 收益对比 -->
          <div style="margin-bottom:80px;" v-show="incomeShow">
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
  props: ['open', 'years'],
  data() {
    return {
      pickerOptions: {},
      shopNo: [],
      shopNoList: [],
      rentalArea: null,
      newStoreInfo: [{
        si_id: this.$route.query.si_id,
        store_no: null,
        rental_area: null,
        amountList: [
          { year: Number(new Date().format('yyyy')), rent_package: null, property_fee: null, rent_month: null }
        ],
        contract_info: {
          begin_time: null,
          end_time: null,
          avg_rent: null,
          free_rent_period: null,
          total_rent: null,
          total_property: null,
          rent_start_day: null,
          mounth_sale_amount: null,
          project_budget: null,
          rent_type: null,
          pay_cycle: null,
          rent_month: null
        }
      }],
      incomeShow: false,
      incomeContrastData: [
        {
          year: Number(new Date().format('yyyy')) + '年',
          formerRent: null,
          formerPropertyManage: null,
          adjustRent: null,
          adjustPropertyManage: null,
          diffRent: null,
          diffPropertyManage: null,
        }
      ]
    }
  },
  created() {
    
  },
  computed: {
    fast: {
      get() {
        if (this.open) {
          this.getShopNoList()
          this.resetData()
          this.forAddRent()
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
    getShopNoList() {
      Sandbox.getShopNoList({si_id: this.$route.query.si_id}).then(res => {
        console.log("List:",res)
        if(res.code === 200 && res.result){
          console.log(res.result)
          this.shopNoList = res.result
        }
      })
    },
    shopNoChange(val) {
      let obj = {}
      let arr = []
      let sum = 0
      for (let key in val) {
        obj = this.shopNoList.find((item)=>{
          return item.ss_id == val[key]
        })
        arr.push(obj.rental_area)
      }
      for (let key in arr) {
        sum += Number(arr[key])
      }
      this.rentalArea = sum.toFixed(2)
      if (val[0]) {
        let params = {ss_id: val.join(',')}
        Sandbox.getIncomeCompare(params).then(res => {
          if(res.code === 200 && res.result){
            console.log(res.result)
            for (let key in res.result) {
              this.incomeContrastData[key].formerRent = res.result[key].total_rent_package
              this.incomeContrastData[key].formerPropertyManage = res.result[key].total_property_fee
            }
            let sum_1 = 0
            let sum_2 = 0
            for (let key in this.newStoreInfo[0].amountList) {
              sum_1 += Number(this.incomeContrastData[key].formerRent)
              sum_2 += Number(this.incomeContrastData[key].formerPropertyManage)
            }
            this.incomeContrastData[this.newStoreInfo[0].amountList.length].formerRent = sum_1.toFixed(2)
            this.incomeContrastData[this.newStoreInfo[0].amountList.length].formerPropertyManage = sum_2.toFixed(2)
            for (let key in this.newStoreInfo) {
              this.rental_areaInput(key)
            }
          }
        })
      } else {
        for (let key in this.incomeContrastData) {
          this.incomeContrastData[key].formerRent = 0
          this.incomeContrastData[key].formerPropertyManage = 0
        }
        for (let key in this.newStoreInfo) {
          this.rental_areaInput(key)
        }
      }
    },
    shopNoBlur(val) {
      // console.log(1)
    },
    addIncomeCost() {
      this.newStoreInfo.push({
        si_id: this.$route.query.si_id,
        store_no: null,
        rental_area: null,
        amountList: [
          { year: Number(new Date().format('yyyy')), rent_package: null, property_fee: null, rent_month: null }
        ],
        contract_info: {
          begin_time: null,
          end_time: null,
          avg_rent: null,
          free_rent_period: null,
          total_rent: null,
          total_property: null,
          rent_start_day: null,
          mounth_sale_amount: null,
          project_budget: null,
          rent_type: null,
          pay_cycle: null,
          rent_month: null
        }
      })
      for (let i = 1; i < this.years; i ++) {
        (a => {
          setTimeout(() => {
            this.newStoreInfo[this.newStoreInfo.length - 1].amountList.push({year: Number(this.newStoreInfo[this.newStoreInfo.length - 1].amountList[i - 1].year) + 1, rent_package: null, property_fee: null, rent_month: null})
          }, a * 100)
        })(i)
      }
    },
    removeIncomeCost(i) {
      this.newStoreInfo.splice(i,1)
    },
    copyIncomeCost(i) {
      let copyIncomeCost = JSON.parse(JSON.stringify(this.newStoreInfo[i]))
      this.newStoreInfo.push(copyIncomeCost)
    },
    forAddRent() {
      for (let i = 1; i < this.years; i ++) {
        (a => {
          setTimeout(() => {
            this.addRent(this.newStoreInfo[0].amountList)
            if (a == this.years - 1) {
              this.incomeContrastData.push({
                year: '合计',
                formerRent: null,
                formerPropertyManage: null,
                adjustRent: null,
                adjustPropertyManage: null,
                diffRent: null,
                diffPropertyManage: null
              })
            }
          }, a * 100)
        })(i)
      }
    },
    addRent(list) {
      if (list.length < this.years) {
        list.push({
          year: Number(list[list.length - 1].year) + 1,
          rent_package: null,
          property_fee: null,
          rent_month: null
        })
        this.incomeContrastData.push({
          year: Number(list[list.length - 1].year) + '年',
          formerRent: null,
          formerPropertyManage: null,
          adjustRent: null,
          adjustPropertyManage: null,
          diffRent: null,
          diffPropertyManage: null
        })
      } else {
        this.$message.error('已到达模拟年限上限!')
      }
    },
    removeRent(list,j) {
      list.splice(j,1)
      this.incomeContrastData.splice(j,1)
    },
    copyRent(list, i, j) {
      if (list.length < this.years) {
        let copyRent = {
          year: Number(list[list.length - 1].year) + 1,
          rent_package: list[j].rent_package,
          property_fee: list[j].property_fee,
          rent_month: list[j].rent_month
        }
        this.newStoreInfo[i].amountList.push(JSON.parse(JSON.stringify(copyRent)))
        this.incomeContrastData.push({
          date: Number(list[list.length - 1].year) + '年',
          formerRent: null,
          formerPropertyManage: null,
          adjustRent: null,
          adjustPropertyManage: null,
          diffRent: null,
          diffPropertyManage: null
        })
      } else {
        this.$message.error('已到达模拟年限上限!')
      }
    },
    save() {
      if(!this.shopNo[0]) return this.$message.error('请选择铺位号')
      for (let key in this.newStoreInfo) {
        if(!this.newStoreInfo[key].store_no) return this.$message.error('请填写新铺位号')
        if(!this.newStoreInfo[key].rental_area) return this.$message.error('请填写计租面积')
      }
      const totalaa = {
        total_rental_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].formerRent,
        total_property_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].formerPropertyManage,
        total_adjval_rental_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].adjustRent,
        total_adjval_property_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].adjustPropertyManage,
        total_diff_rental_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].diffRent,
        total_diff_property_income: this.incomeContrastData[this.newStoreInfo[0].amountList.length].diffPropertyManage
      }
      const params = {
        oldIds: this.shopNo.join(','),
        newStoreInfo: JSON.stringify(this.newStoreInfo),
        total: JSON.stringify(totalaa),
        income_comparison: JSON.stringify(this.incomeContrastData)
      }
      Sandbox.addStore(params).then(res => {
        console.log("List:",res)
        if(res.code === 200 && res.result){
          this.resetData()
          this.$emit('close', {
            fast: false,
            reload: true
          })
        }
      })
    },
    resetData() {
      this.shopNo = []
      this.shopNoList = []
      this.rentalArea = null
      this.newStoreInfo = [{
        si_id: this.$route.query.si_id,
        store_no: null,
        rental_area: null,
        amountList: [
          { year: Number(new Date().format('yyyy')), rent_package: null, property_fee: null, rent_month: null }
        ],
        contract_info: {
          begin_time: null,
          end_time: null,
          avg_rent: null,
          free_rent_period: null,
          total_rent: null,
          total_property: null,
          rent_start_day: null,
          mounth_sale_amount: null,
          project_budget: null,
          rent_type: null,
          pay_cycle: null,
          rent_month: null
        }
      }]
      this.incomeContrastData = [
        {
          year: Number(new Date().format('yyyy')) + '年',
          formerRent: null,
          formerPropertyManage: null,
          adjustRent: null,
          adjustPropertyManage: null,
          diffRent: null,
          diffPropertyManage: null,
        }
      ]
    },
    countIncome() {
      this.incomeShow = !this.incomeShow
    },
    // 监听计租面积
    rental_areaInput(index) {
      for (let key in this.newStoreInfo[index].amountList) {
        this.rent_monthInput(index, key)
      }
    },
    // 监听租金包
    rent_packageInput(index, j) {
      let sum = 0
      for (let key in this.newStoreInfo) {
        sum += Number(this.newStoreInfo[key].amountList[j].rent_package) * Number(this.newStoreInfo[key].rental_area) * Number(this.newStoreInfo[key].amountList[j].rent_month)
      }
      // 调整后租金收入总计
      this.incomeContrastData[j].adjustRent = sum.toFixed(2)
      // 差额租金收入总计
      this.incomeContrastData[j].diffRent = (Number(this.incomeContrastData[j].adjustRent) - Number(this.incomeContrastData[j].formerRent)).toFixed(2)
      // 调整后租金收入总计合计
      let sum_1 = 0
      for (let key in this.newStoreInfo[0].amountList) {
        sum_1 += Number(this.incomeContrastData[key].adjustRent)
      }
      this.incomeContrastData[this.newStoreInfo[0].amountList.length].adjustRent = sum_1.toFixed(2)
      // 差额租金收入总计合计
      let sum_2 = 0
      for (let key in this.newStoreInfo[0].amountList) {
        sum_2 += Number(this.incomeContrastData[key].diffRent)
      }
      this.incomeContrastData[this.newStoreInfo[0].amountList.length].diffRent = sum_2.toFixed(2)
    },
    // 监听物管费用
    property_feeInput(index, j) {
      let sum = 0
      for (let key in this.newStoreInfo) {
        sum += Number(this.newStoreInfo[key].amountList[j].property_fee) * Number(this.newStoreInfo[key].rental_area) * Number(this.newStoreInfo[key].amountList[j].rent_month)
      }
      // 调整后物管收入总计
      this.incomeContrastData[j].adjustPropertyManage = sum.toFixed(2)
      // 差额物管收入总计
      this.incomeContrastData[j].diffPropertyManage = (Number(this.incomeContrastData[j].adjustPropertyManage) - Number(this.incomeContrastData[j].formerPropertyManage)).toFixed(2)
      // 调整后物管收入总计合计
      let sum_1 = 0
      for (let key in this.newStoreInfo[0].amountList) {
        sum_1 += Number(this.incomeContrastData[key].adjustPropertyManage)
      }
      this.incomeContrastData[this.newStoreInfo[0].amountList.length].adjustPropertyManage = sum_1.toFixed(2)
      // 差额物管收入总计合计
      let sum_2 = 0
      for (let key in this.newStoreInfo[0].amountList) {
        sum_2 += Number(this.incomeContrastData[key].diffPropertyManage)
      }
      this.incomeContrastData[this.newStoreInfo[0].amountList.length].diffPropertyManage = sum_2.toFixed(2)
    },
    // 监听租赁月数
    rent_monthInput(index, j, val) {
      if (val > 12) {
        this.newStoreInfo[index].amountList[j].rent_month = 12
      }
      this.rent_packageInput(index, j)
      this.property_feeInput(index, j)
    },
    begin_timeChange(index, val) {
      if (val > this.newStoreInfo[index].contract_info.end_time) {
        let dateTime = new Date(val).getTime() + 86400000
        this.newStoreInfo[index].contract_info.end_time = (new Date(dateTime)).format('yyyy-MM-dd')
      }
      this.pickerOptions = {
        disabledDate(time) {
          return time.getTime() < new Date(val).getTime() - 86400000
        }
      }
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