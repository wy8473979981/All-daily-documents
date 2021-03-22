<template>
  <div class="project_msg">
    <!-- 表数据 -->
    <div>
      <table class="input-table">
        <thead>
          <tr>
            <th></th>
            <th>地块1</th>
            <th>地块2</th>
            <th>地块3</th>
            <th>地块4</th>
            <th>合计</th>
          </tr>
        </thead>
        <tbody>
          <!-- 地块类型 -->
          <tr>
            <td width="230">地块类型</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-select v-if="index!==lands.length-1" v-model="lands[index].land_type_id" clearable placeholder="请选择">
                <el-option
                  v-for="item in landType"
                  :key="item.cate_id"
                  :label="item.cate_name"
                  :value="item.cate_id">
                </el-option>
              </el-select>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">-</span>
            </td>
          </tr>
          <!-- 用地面积（m²） -->
          <tr>
            <td>用地面积（m²）</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-input v-if="index!==lands.length-1" v-filter-check-input v-model="lands[index].land_area" placeholder="请输入" @input="countLandArea"></el-input>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">{{lands[index].land_area}}</span>
            </td>
          </tr>
          <!-- 地上建筑面积（m²） -->
          <tr>
            <td>地上建筑面积（m²）</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-input v-if="index!==lands.length-1" v-filter-check-input v-model="lands[index].ground_area" placeholder="请输入" @input="countGroundArea"></el-input>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">{{lands[index].ground_area}}</span>
            </td>
          </tr>
          <!-- 平均容积率（%） -->
          <tr>
            <td>平均容积率</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-input v-if="index!==lands.length-1" v-model="lands[index].avg_volume_per" placeholder="计算得出" disabled></el-input>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">{{lands[index].avg_volume_per}}</span>
            </td>
          </tr>
          <!-- 地下建筑面积合计（m²） -->
          <tr>
            <td>地下建筑面积合计（m²）</td>
            <td colspan="4" width="150">
              <el-input v-model="others.underground_area" v-filter-check-input @input="countUndergroundArea" placeholder="请输入"></el-input>
            </td>
            <td></td>
          </tr>
          <!-- 土地出让金（亿元） -->
          <tr>
            <td>土地出让金（亿元）</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-input v-if="index!==lands.length-1" v-filter-check-input v-model="lands[index].transfer_price" placeholder="请输入" @input="countTransferPrice"></el-input>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">{{lands[index].transfer_price}}</span>
            </td>
          </tr>
          <!-- 楼板价（元/m²） -->
          <tr>
            <td>楼板价（元/m²）</td>
            <td width="150" v-for="(item, index) in lands" :key="index">
              <el-input v-if="index!==lands.length-1" v-model="lands[index].floor_unitprice" placeholder="计算得出" disabled></el-input>
              <!-- 合计 -->
              <span v-if="index===lands.length-1">{{lands[index].floor_unitprice}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 地上（计容） -->
    <div>
      <p>地上（计容）</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>销售物业地上计容面积(m²)</span>
            <el-input v-model="others.sale_property_ground_area" v-filter-check-input placeholder="请输入" @input="countSaleArea"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>销售物业地上计容占比（%）</span>
            <el-input v-model="others.sale_property_ground_per" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>持有物业地上计容面积(m²)</span>
            <el-input v-model="others.hold_property_ground_area" v-filter-check-input placeholder="请输入" @input="countHoldArea"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>持有物业地上计容占比（%）</span>
            <el-input v-model="others.hold_property_ground_per" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 散 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>车位指标(m²/个）</span>
            <el-input v-model="others.parking_target" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>住宅可售物业赠送比（%）</span>
            <el-input v-model="others.house_property_give_per" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>总土地成本(亿元)<span style="font-size:12px;">(含地价、契税、市政配套)</span></span>
            <el-input v-model="others.invest_total_price" disabled placeholder="计算得出"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>总土地成本(亿元)(模拟成本)</span>
            <el-input v-model="others.invest_total_imitate_price" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>地下商业补土地款（亿元）</span>
            <el-input v-model="others.biz_underground_land_price" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>项目转让额外税费（亿元）</span>
            <el-input v-model="others.project_transfer_other_tax" v-filter-check-input placeholder="请输入"></el-input>
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
      landType: [],
      lands: [],
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
    this.landType = this.$store.state.landType;
    this.resetData();
    console.log(this.lands)
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
      this.lands = data.lands;
      this.others = data.others;
    },
    // 数据复位（清除）
    resetData() {
      this.lands = [];
      let i = 1;
      while (i < 6) {
        this.lands.push({
          land_no: i+'',
          land_type_id: null,
          land_area: null,
          ground_area: null,
          avg_volume_per: null,
          transfer_price: null,
          floor_unitprice: null,
        })
        i++;
      }
      for(let key in this.others) {
        this.others[key] = null
      }
    },
    // 用地面积合计
    countLandArea() {
      chunkJs.countArea(this.lands, 'land_area')
      this.countAvgVolumePer()
    },
    // 地上建筑面积合计
    countGroundArea() {
      chunkJs.countArea(this.lands, 'ground_area')
      this.countAvgVolumePer()
      this.countFloorUnitprice()
      this.countSaleArea()
      this.countHoldArea()
      this.countParkingTarget()
    },
    // 地下建筑面积触发计算
    countUndergroundArea() {
      this.countParkingTarget()
    },
    // 平均容积率计算
    countAvgVolumePer() {
      chunkJs.countAvgVolumePer(this.lands);
      chunkJs.countArea(this.lands, 'avg_volume_per')
    },
    // 土地出让金(亿元)计算
    countTransferPrice() {
      chunkJs.countArea(this.lands, 'transfer_price')
      this.countFloorUnitprice();
      this.countInvestTotalPrice();
    },
    // 楼板价计算
    countFloorUnitprice() {
      chunkJs.countFloorUnitprice(this.lands)
    },
    // 销售物业地上计容计算
    countSaleArea() {
      chunkJs.countSaleArea(this.lands, this.others)
      let countPropertySaleFloorUnitprice = this.$parent.$parent.$refs.land_set_data.countPropertySaleFloorUnitprice;
      countPropertySaleFloorUnitprice()
    },
    // 持有物业地上计容计算
    countHoldArea() {
      chunkJs.countHoldArea(this.lands, this.others)
      let countPropertyHoldFloorUnitprice = this.$parent.$parent.$refs.land_set_data.countPropertyHoldFloorUnitprice;
      countPropertyHoldFloorUnitprice()
    },
    // 车位指标计算
    countParkingTarget() {
      chunkJs.countParkingTarget(this.lands, this.others)
    },
    // 总土地成本(亿元)(含地价、契税、市政配套)
    countInvestTotalPrice() {
      let config = this.$parent.$parent.$refs.land_set_data.config;
      chunkJs.countInvestTotalPrice(this.lands, this.others, config)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
}
</style>
