<template>
  <div class="project_msg">
    <!-- 类别 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>城市类别</span>
            <el-select v-model="config.city_type_id" clearable placeholder="请选择">
              <el-option
                v-for="item in cityType"
                :key="item.cate_id"
                :label="item.cate_name"
                :value="item.cate_id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>地块类别</span>
            <el-select v-model="config.land_kind_id" clearable placeholder="请选择">
              <el-option
                v-for="item in landType"
                :key="item.cate_id"
                :label="item.cate_name"
                :value="item.cate_id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 市政大配套费 -->
    <div>
      <p>市政大配套费</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>住宅类（元/m²）</span>
            <el-input v-model="config.municipal_house_unitprice" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>商办类（元/m²）</span>
            <el-input v-model="config.municipal_biz_unitprice" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>市政大配套费（万元）</span>
            <el-input v-model="config.municipal_facilities_price" v-filter-check-input placeholder="请输入" @input="countMunicipalFacilitiesPrice"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 物业地价 -->
    <div>
      <p>物业地价</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>销售物业地价占比（%）</span>
            <el-input v-model="config.property_sale_land_per" v-filter-check-input @input="countPropertySaleLandPer" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>自持物业地价占比（%）</span>
            <el-input v-model="config.property_hold_land_per" v-filter-check-input @input="countPropertyHoldLandPer" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>销售物业楼板价（元/m²）</span>
            <el-input v-model="config.property_sale_floor_unitprice" readonly placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>自持物业楼板价（元/m²）</span>
            <el-input v-model="config.property_hold_floor_unitprice" readonly placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 契税 -->
    <div>
      <p>契税</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>契税（比例）（%）</span>
            <el-input v-model="config.deed_tax_per" v-filter-check-input placeholder="请输入" @input="countDeedTaxPer"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>销项税（%）</span>
            <el-input v-model="config.sale_tax_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 装配式比例/维修基金 -->
    <div>
      <p>装配式比例/维修基金</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>装配式比例（%）</span>
            <el-input v-model="config.assemble_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>维修基金（元/m²）</span>
            <el-input v-model="config.maintenance_fund_price" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 车位信息 -->
    <div>
      <p>车位信息</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>住宅车位配比（每百平米车位数量）</span>
            <el-input v-model="config.parking_house_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>商业车位配比（每百平米车位数量）</span>
            <el-input v-model="config.parking_biz_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>单车位面积（m²）</span>
            <el-input v-model="config.parking_unitarea" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>人防车库面积（m²）</span>
            <el-input v-model="config.parking_defence_area" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>非人防车库面积（m²）</span>
            <el-input v-model="config.parking_undefence_area" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 财务/融资 -->
    <div>
      <p>财务/融资</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>财务利息（万元）</span>
            <el-input v-model="config.finance_interest_price" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>融资年限（年）</span>
            <el-input v-model="config.finance_period" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>融资比例（%）</span>
            <el-input v-model="config.finance_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>不可预见费比例（%）</span>
            <el-input v-model="config.finance_unforeseeable_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>融资前自有资金投入（万元）</span>
            <el-input v-model="config.finance_invest_price" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 营销管理费用比例 -->
    <div>
      <p>营销管理费用比例</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>销售费用比例（%）</span>
            <el-input v-model="config.cost_sale_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>管理费用比例（%）</span>
            <el-input v-model="config.cost_manage_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 地价信息 -->
    <div>
      <p>地价信息</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>地价溢价率（%）</span>
            <el-input v-model="config.land_premium_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>地价(亿元)</span>
            <el-input v-model="config.land_per" v-filter-check-input @input="countLandPer" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 自持物业指标估算 -->
    <div>
      <p>自持物业指标估算</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>商业-10年 平均YOC估算（%）</span>
            <el-input v-model="config.hold_biz_yoc_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>办公-10年 平均YOC估算（%）</span>
            <el-input v-model="config.hold_office_yoc_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>酒店-10年 平均YOC估算（%）</span>
            <el-input v-model="config.hold_hotel_yoc_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>公寓-10年 平均YOC估算（%）</span>
            <el-input v-model="config.hold_apartment_yoc_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 保障房竞配 -->
    <div>
      <p>保障房竞配</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>保障房竞配倍数</span>
            <el-input v-model="config.affordable_dispose_multiple" v-filter-check-input @input="countAffordableArea" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>竞配保障房面积（m²）</span>
            <el-input v-model="config.affordable_dispose_area" v-filter-check-input @input="countAffordableArea" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>保障房面积(m²)</span>
            <el-input v-model="config.affordable_area" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>建安成本（元/m²）</span>
            <el-input v-model="config.affordable_cs_unitprice" v-filter-check-input @input="countAffordableCsPrice" placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>建安成本合计（m²）</span>
            <el-input v-model="config.affordable_cs_price" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>权益面积（扣除保障房）（m²）</span>
            <el-input v-model="config.affordable_equity_area" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>合计地价（地价+保障房建安）（亿）</span>
            <el-input v-model="config.affordable_total_price" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>楼板价（元/m²）</span>
            <el-input v-model="config.affordable_floor_unitprice" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import chunkJs from './chunk';
export default {
  props: ['data'],
  data() {
    return {
      cityType: [],
      landType: [],
      config: {
        city_type_id: null, //城市类别
        land_kind_id: null, //地块类别
        municipal_house_unitprice: null, //市政大配套费-住宅类
        municipal_biz_unitprice: null, //市政大配套费-商办类
        municipal_facilities_price: null, //市政大配套费-市政大配套费
        property_sale_land_per: null, //物业地价-销售物业低价占比
        property_hold_land_per: null, //物业地价-自持物业地价占比
        property_sale_floor_unitprice: null, //物业地价-销售物业楼板价
        property_hold_floor_unitprice: null, //物业地价-自持物业楼板价
        deed_tax_per: null, //契税-比例
        sale_tax_per: null, //契税-销项税
        assemble_per: null, //装配式比例
        maintenance_fund_price: null, //维修基金
        parking_house_per: null, //车位信息-住宅车位配比
        parking_biz_per: null, //车位信息-商业车位配比
        parking_unitarea: null, //车位信息-单车位面积
        parking_defence_area: null, //车位信息-人防车库面积
        parking_undefence_area: null, //车位信息-非人防车库面积
        finance_interest_price: null, //财务利息
        finance_period: null, //融资年限
        finance_per: null, //融资比例
        finance_unforeseeable_per: null, //不可预见费比例
        finance_invest_price: null, //融资前自由资金投入
        cost_sale_per: null, //费用-销售费用比例
        cost_manage_per: null, //费用-管理费用比例
        land_premium_per: null, //地价信息-地价溢价率
        land_per: null, //地价信息-地价
        hold_biz_yoc_per: null, //自持物业指标估算-商业-10年平均YOC估算
        hold_office_yoc_per: null, //自持物业指标估算-酒店-10年平均YOC估算
        hold_hotel_yoc_per: null, //自持物业指标估算-办公-10年平均YOC估算
        hold_apartment_yoc_per: null, //自持物业指标估算-公寓-10年平均YOC估算
        affordable_dispose_multiple: null, //保障房竞配倍数
        affordable_dispose_area: null, //竞配保障房面积
        affordable_area: null, //保障房面积
        affordable_cs_unitprice: null, //建安成本
        affordable_cs_price: null, //建安成本合计
        affordable_equity_area: null, //权益面积（扣除保障房）
        affordable_total_price: null, //合计地价（地价+保障房建安（亿元））
        affordable_floor_unitprice: null, //楼板价
      }
    }
  },
  created() {
    console.log(this.$store.state.cityType)
    this.cityType = this.$store.state.cityType;
    this.landType = this.$store.state.landKind;
  },
  watch: {
    data: {
      handler(nv, ov) {
        console.log(nv)
        if(nv) {
          this.loadData(nv)
        }else{
          this.resetData()
        }
      },
      deep: true
    }
  },
  methods: {
    // 加载详情数据
    loadData(data) {
      console.log('--- 触发 ---')
      this.config = data.config;
    },
    // 数据复位（清除）
    resetData() {
      for(let key in this.config) {
        this.config[key] = null
      }
    },
    // 保障房面积计算
    countAffordableArea() {
      chunkJs.countAffordableArea(this.config)
      this.countAffordableCsPrice()
      this.countAffordableEquityArea()
    },
    // 建安成本合计计算
    countAffordableCsPrice() {
      chunkJs.countAffordableCsPrice(this.config)
      this.countAffordableTotalPrice()
    },
    // 销售物业楼板价计算
    countPropertySaleFloorUnitprice() {
      let others = this.$parent.$parent.$refs.project_msg_data.others;
      chunkJs.countPropertySaleFloorUnitprice(this.config, others)
    },
    // 自持物业楼板价计算
    countPropertyHoldFloorUnitprice() {
      let others = this.$parent.$parent.$refs.project_msg_data.others;
      chunkJs.countPropertyHoldFloorUnitprice(this.config, others)
    },
    // 权益面积（扣除保障房）计算
    countAffordableEquityArea() {
      let lands = this.$parent.$parent.$refs.project_msg_data.lands;
      if(lands[lands.length-1].ground_area && this.config.affordable_area) {
        this.config.affordable_equity_area = Number(lands[lands.length-1].ground_area) - Number(this.config.affordable_area);
      }else{
        this.config.affordable_equity_area = null
      }
      this.countAffordableFloorUnitprice();
    },
    // 合计地价（地价+保障房建安）计算
    countAffordableTotalPrice() {
      let lands = this.$parent.$parent.$refs.project_msg_data.lands;
      if(lands[lands.length-1].transfer_price && this.config.affordable_cs_price) {
        this.config.affordable_total_price = (Number(lands[lands.length-1].transfer_price) + Number(this.config.affordable_cs_price)) / 10000;
      }else{
        this.config.affordable_total_price = null
      }
      this.countAffordableFloorUnitprice();
    },
    // 楼板价计算
    countAffordableFloorUnitprice() {
      if(this.config.affordable_total_price && this.config.affordable_equity_area) {
        this.config.affordable_floor_unitprice = (this.config.affordable_total_price / this.config.affordable_equity_area).toFixed(2);
      }else{
        this.config.affordable_floor_unitprice = null
      }
    },
    // 契税输入触发计算
    countDeedTaxPer() {
      let countInvestTotalPrice = this.$parent.$parent.$refs.project_msg_data.countInvestTotalPrice;
      countInvestTotalPrice()
    },
    // 市政大配套费输入触发计算
    countMunicipalFacilitiesPrice() {
      let countInvestTotalPrice = this.$parent.$parent.$refs.project_msg_data.countInvestTotalPrice;
      countInvestTotalPrice()
    },
    // 地价输入触发计算
    countLandPer() {
      this.countPropertySaleFloorUnitprice();
      this.countPropertyHoldFloorUnitprice();
    },
    // 销售物业地价占比输入触发计算
    countPropertySaleLandPer() {
      this.countPropertySaleFloorUnitprice();
    },
    // 自持物业地价占比输入触发计算
    countPropertyHoldLandPer() {
      this.countPropertyHoldFloorUnitprice();
    }
  }
}
</script>

<style lang="scss" scoped>
.project_msg{
  .el-select{
    width: 100%;
  }
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
  }
}
</style>
