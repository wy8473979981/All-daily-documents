<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <div class="footerBtn footerBtn-right">
          <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
          <!-- <el-button v-if="unChange" class="btn" size="mini" type="warning" @click="dealChange(false)">编辑</el-button> -->
          <!-- <el-button v-if="!unChange" class="btn" size="mini" type="info" @click="dealChange(true)">取消</el-button> -->
          <!-- <el-button v-if="!unChange" class="btn" size="mini" type="primary" @click="submit">提交</el-button> -->
        </div>
        <!-- 竞品类比详情/编辑 - start -->
        <el-tag v-if="floor" effect="dark" :type="floorType" class="font-c-w" @click="changeType(0)" style="border-radius: 4px 4px 0 0; cursor: pointer;">楼层法</el-tag>
              <el-tag v-if="layout" effect="dark" :type="layoutType" class="font-c-w" @click="changeType(1)" style="border-radius: 4px 4px 0 0; cursor: pointer;">业态法</el-tag>
        <el-table
          :data="list"
          class="table-bg-main mg-b20" 
          border
          :span-method="objectSpanMethod"
          size="small"
          style="width: 100%;">
          <el-table-column label="租金分解汇总">
            <el-table-column
              prop="area"
              label="区域">
            </el-table-column>
            <el-table-column
              prop="layoutOrFloor"
              label="楼层/业态">
            </el-table-column>
            <el-table-column
              prop="store_nums"
              label="铺位数">
            </el-table-column>
            <el-table-column
              prop="inner_area_sum"
              label="套内面积(m²)">
            </el-table-column>
            <el-table-column
              prop="building_area_sum"
              label="建筑面积(m²)">
            </el-table-column>
            <el-table-column
              prop="rent_area_sum"
              label="计租面积(m²)">
            </el-table-column>
            <el-table-column
              prop="avg_rent"
              label="平均租金">
            </el-table-column>
            <el-table-column
              prop="year_rent_1_sum"
              label="第一年标准年租金">
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- 竞品类比详情/编辑 - end -->        
      </section>
    </div>
  </section>
</template>

<script>
import companyContract from '@apis/rentDecomposition'
let oldTable = '';// 记录表循环参数；避免无效循环；
export default {
  data() {
    return {
      list: [],
      unChange: true,
      competing_products_id: '',
      floor: false,// 楼层法
      layout: false,// 业态法
      floorType: '',// 楼层法按钮样式
      layoutType: 'info',// 业态法按钮样式
      layout_floor_type: 1,
      form: {
        layout_floor_type: 1
      }
    }
  },
  created () {
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
      const res = await companyContract.getRentCalculationMainList({id: this.competing_products_id,layout_floor_type:this.form.layout_floor_type})
      if (res.code === 200 && res.result) {
        this.list = res.result
      }
    },
    // 提交
    async submit() {
      const param = {input: JSON.stringify(this.list),id: this.competing_products_id}
      const res = await companyContract.updateRentCalculationMainList(param)
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
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: unset!important;
}
@import '~@styles/common.scss'
</style>
