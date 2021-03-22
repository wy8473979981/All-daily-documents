<template>
  <section class="page-create">
    <div class="form-create">
      <section class="form">
        <div class="footerBtn footerBtn-right">
          <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
          <el-button v-if="unChange" class="btn" size="mini" type="warning" @click="dealChange(false)">编辑</el-button>
          <el-button v-if="!unChange" class="btn" size="mini" type="danger" @click="dealChange(true)" style="background: #f56c6c; border-color: #f56c6c;">取消</el-button>
          <el-button v-if="!unChange" class="btn" size="mini" type="primary" @click="submit">提交</el-button>
        </div>
        <!-- 竞品类比详情/编辑 - start -->
        <el-tag v-if="floor" effect="dark" :type="floorType" class="font-c-w" @click="changeType(0)" style="border-radius: 4px 4px 0 0;  cursor: pointer;">楼层法</el-tag>
              <el-tag v-if="layout" effect="dark" :type="layoutType" class="font-c-w" @click="changeType(1)" style="border-radius: 4px 4px 0 0; cursor: pointer;">业态法</el-tag>
        <el-table
          :data="list"
          class="table-bg-main mg-b20" 
          border
          :span-method="objectSpanMethod"
          show-summary
          size="small"
          style="width: 100%;">
          <el-table-column label="业态">
            <el-table-column
              prop="menu_one"
              label="-">
            </el-table-column>
            <el-table-column
              prop="menu_two"
              label="-">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="inner_area"
            label="套内面积(m²)">
            <template slot-scope="scope">
              <el-input v-if="scope.row.menu_one" :disabled="unChange" size="mini" v-model="scope.row.inner_area" v-filter-check-number placeholder="请输入" />
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column label="测算租金单价(元/m²/月)">
            <el-table-column label="(1)投资回报推算法">
              <el-table-column
                prop="algorithm_one"
                label="-">
                <template slot-scope="scope">
                  <span v-if="scope.row.menu_one">{{scope.row.algorithm_one}}</span>
                  <el-input v-else :disabled="unChange" size="mini" v-model="scope.row.algorithm_one" v-filter-check-number placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column
                prop="algorithm_two"
                label="-">
                <template slot-scope="scope">
                  
                  <span v-if="scope.row.menu_one && scope.row.menu_one !== '主力店'">{{scope.row.algorithm_two}}</span>
                  <el-input v-else :disabled="unChange" size="mini" v-model="scope.row.algorithm_two" placeholder="请输入" />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="rent_avg"
              label="(2)平均租金类比法">
            </el-table-column>
            <el-table-column
              prop="rent_avg_revised"
              label="(3)竞争品牌类比修正法">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="rent_recommend"
            label="建议执行标准(元/m²/月)">
            <template slot-scope="scope">
              <el-input v-if="scope.row.menu_one" :disabled="unChange" size="mini" v-model="scope.row.rent_recommend" v-filter-check-number placeholder="请输入" />
              <span v-else></span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 竞品类比详情/编辑 - end -->        
      </section>
    </div>
  </section>
</template>

<script>
import companyContract from '@apis/companyContract'
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
    if ( this.layout_floor_type == 1 || this.layout_floor_type == 3) {
      this.floor = true
    }
    if ( this.layout_floor_type == 2 || this.layout_floor_type == 3) {
      this.layout = true
    }
    if (this.layout_floor_type == 3) {
      this.form.layout_floor_type = 1
    }
  },
  watch:{
    
  },
  methods: {
    // 处理表结构
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
        if (oldTable !== row.menu_one){
          if (columnIndex >= 4 || !row.menu_one_rows || row.menu_one_rows <= 1){
            oldTable = row.menu_one
          }
          return {
            rowspan: row.menu_one_rows || 1,
            colspan: 1
          }
        }else{
          if (row.menu_one_rows && row.menu_one_rows > 1) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }else{
            return {
              rowspan: 1,
              colspan: 1
            }
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
      const res = await companyContract.getRentCalculationMainList({competing_products_id: this.competing_products_id,layout_floor_type:this.form.layout_floor_type})
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
