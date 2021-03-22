<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <div class="footerBtn footerBtn-right">
          <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
        </div>
        <!-- 非主力店汇总 - start -->
        <el-tag v-if="floor" effect="dark" :type="floorType" class="font-c-w" @click="changeType(0)" style="border-radius: 4px 4px 0 0;">楼层法</el-tag>
              <el-tag v-if="layout" effect="dark" :type="layoutType" class="font-c-w" @click="changeType(1)" style="border-radius: 4px 4px 0 0; cursor: pointer;">业态法</el-tag>
        <el-table
          :data="list"
          class="table-bg-main mg-b20" 
          border
          size="small"
          style="width: 100%;">
          <el-table-column label="商铺权重定价—非主力店汇总">
            <el-table-column
              prop="first_cloum_name"
              :label="form.layout_floor_type == 1?'细分类别/楼层':'细分类别/业态'">
            </el-table-column>
            <el-table-column
              prop="store_code_num"
              label="铺位数">
            </el-table-column>
            <el-table-column
              prop="inner_area_num"
              label="套内面积(m²)">
            </el-table-column>
            <el-table-column
              prop="avg_rent"
              :label="form.layout_floor_type == 1?'楼层平均租金':'业态平均租金'">
            </el-table-column>
            <el-table-column
              prop="total_rent"
              :label="form.layout_floor_type == 1?'楼层月总租金':'业态月总租金'">
            </el-table-column>
            <el-table-column
              prop="store_weighted_pricing_min"
              :label="form.layout_floor_type == 1?'楼层最低租金':'业态最低租金'">
            </el-table-column>
            <el-table-column
              prop="avg_rent_to_store"
              :label="form.layout_floor_type == 1?'分解到铺后楼层平均租金':'分解到铺后业态平均租金'">
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- 非主力店汇总 - end -->

        <!-- 主力店明细 - start -->
        <el-table
          :data="mainList"
          class="table-bg-main mg-b20" 
          border
          size="small"
          style="width: 100%;">
          <el-table-column label="主力店明细">
            <el-table-column
              prop="first_cloum_name"
              :label="form.layout_floor_type == 1?'业种/楼层':'业种/业态'">
            </el-table-column>
            <el-table-column
              prop="store_code"
              label="铺位号">
            </el-table-column>
            <el-table-column
              prop="inner_area"
              label="套内面积(m²)">
            </el-table-column>
            <el-table-column
              prop="layout"
              label="业态">
            </el-table-column>
            <el-table-column
              prop="rent_avg_revised"
              label="套内租金单价">
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- 主力店明细 - end -->
      </section>
    </div>
  </section>
</template>

<script>
import weightedPricing from '@apis/weightedPricing'
let oldTable = '';// 记录表循环参数；避免无效循环；
export default {
  data() {
    return {
      list: [],
      mainList: [],
      unChange: true,
      competing_products_id: '',
      type: '',
      layout_floor_type: 1,
      form: {
        layout_floor_type: 1
      },
      floor: false,// 楼层法
      layout: false,// 业态法
      floorType: '',// 楼层法按钮样式
      layoutType: 'info',// 业态法按钮样式
    }
  },
  created () {
    this.type = this.$route.query.type
    this.competing_products_id = this.$route.query.market_id
    this.layout_floor_type = this.$route.query.layout_floor_type || 1
    if ( this.layout_floor_type == 1) {
      this.floor = true
      this.form.layout_floor_type = 1
    }
    if ( this.layout_floor_type == 2) {
      this.layout = true
      this.form.layout_floor_type = 2
    }
    if (this.layout_floor_type == 3) {
      this.floor = true
      this.layout = true
      this.form.layout_floor_type = 1
    }
  },
  watch:{
    
  },
  methods: {
    // 处理表结构
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (oldTable !== row.area){
            oldTable = row.area
          return {
            rowspan: row.rows || 1,
            colspan: 1
          }
        }else{
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }else{
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
    // 初始化数据
    async initDate () {
      const res = await weightedPricing.getRentCalculationMainList({id: this.competing_products_id, type: this.type, layout_floor_type:this.form.layout_floor_type})
      if (res.code === 200 && res.result) {
        this.list = res.result
      }
    },
    // 主力店明细
    async getMainStoreDetail () {
      const res = await weightedPricing.getMainStoreDetail({id: this.competing_products_id, type: this.type, layout_floor_type: this.form.layout_floor_type})
      if (res.code === 200 && res.result) {
        this.mainList = res.result
      }
    },
    // 提交
    async submit() {
      const param = {input: JSON.stringify(this.list),id: this.competing_products_id}
      const res = await weightedPricing.updateRentCalculationMainList(param)
      if (res.code === 200) {
        this.dealChange(true)
      }
    },
    // 楼层法、业态法切换
    changeType (type) {
      if (this.layout_floor_type !== 3) {
        return
      }
      if (type === 0) {
        this.floorType = ''
        this.layoutType = 'info'
        this.form.layout_floor_type = 1
      } else {
        this.floorType = 'info'
        this.layoutType = ''
        this.form.layout_floor_type = 2
      }
      this.initDate()
      this.getMainStoreDetail()
    },
    // 下一步
    dealChange (bl) {
      this.unChange = bl
      if (bl) {
        this.initDate()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.initDate()
    this.getMainStoreDetail()
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: unset!important;
}
@import '~@styles/common.scss'
</style>
