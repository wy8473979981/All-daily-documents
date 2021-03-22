<template>
  <div>
    <el-steps :active="step" simple class="mg-b10 step">
      <el-step title="第一步：选择物业类型" icon="el-icon-edit"></el-step>
      <el-step title="第二步：填写项目商铺租金分解明细" icon="el-icon-s-data"></el-step>
      <el-step title="完成" icon="el-icon-check"></el-step>
    </el-steps>
    <section class="page-create">
      <div class="form-create">
        <section class="form">
          <!-- 第一步：选择物业类型 - start -->
          <el-form v-model="form" v-if="step === 0">
            <el-form-item label="物业类型" :required='true'  class="flex-box-center">
              <el-select v-model="form.type" filterable :disabled="typeD" placeholder="请选择物业类型" size="mini">
                <el-option
                  v-for="item in analogList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="!item.can_select">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 第一步：选择物业类型 - end -->
          <el-form v-model="form" label-position="left">
            <!-- 第二步：购物中心竞争项目类比表 - start -->
            <el-form-item label="" :required='true' v-if="step === 1">
              <el-tag v-if="floor" effect="dark" :type="floorType" class="font-c-w" @click="changeType(0)" style="border-radius: 4px 4px 0 0; cursor: pointer;">楼层法</el-tag>
              <el-tag v-if="layout" effect="dark" :type="layoutType" class="font-c-w" @click="changeType(1)" style="border-radius: 4px 4px 0 0; cursor: pointer;">业态法</el-tag>
              <!--[新建租金分解 start]-->
              <el-table
                :data="tableList"
                class="table-bg-main mg-b20"
                border
                size="small"
                style="width: 100%;">
                <el-table-column
                  prop=""
                  label="铺位基本情况">
                  <el-table-column
                    :prop="form.layout_floor_type == 1?'floor':'layout'"
                    :label="form.layout_floor_type == 1?'楼层':'业态'">
                  </el-table-column>
                  <el-table-column
                    prop="store_code"
                    label="铺位号">
                  </el-table-column>
                  <el-table-column
                    prop="main_layout"
                    label="非主力店业态">
                  </el-table-column>
                  <el-table-column
                    prop="no_main_layout"
                    label="主次力店业态">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    width="120"
                    label="实用率">
                    <template slot-scope="scope">
                      <!-- error 不用管 -->
                      <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-number v-model="efficiency_rate" placeholder="请输入" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="inner_area"
                    width="100"
                    label="套内面积(m²)">
                  </el-table-column>
                  <el-table-column
                    prop="building_area"
                    width="100"
                    label="建筑面积(m²)">
                  </el-table-column>
                  <el-table-column
                    prop="rent_area"
                    width="100"
                    label="计租面积(m²)">
                    <template slot-scope="scope">
                      <span v-if="scope.row.store_type == '1' || scope.row.store_type == '2'">{{scope.row.inner_area}}</span>
                      <span v-else>{{scope.row.building_area}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="租金、物管费及其他商务标准(元/月/平方)">
                  <el-table-column
                    prop="store_weighted_pricing"
                    width="100"
                    label="商铺权重定价">
                  </el-table-column>
                  <el-table-column
                    prop="store_weighted_pricing_ba"
                    width="150"
                    label="商铺权重定价（建面）">
                  </el-table-column>
                  <el-table-column
                    prop="recommended_rent"
                    width="120"
                    label="建议执行底价">
                    <template slot-scope="scope">
                      <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-number v-model="scope.row.recommended_rent" placeholder="请输入" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="revised_standard"
                    width="120"
                    label="对外报价修正标准">
                    <template slot-scope="scope">
                      <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-number v-model="scope.row.revised_standard" placeholder="请输入" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="external_quotation"
                    width="80"
                    label="对外报价">
                  </el-table-column>
                  <el-table-column
                    prop="management_fee"
                    width="120"
                    label="物管费">
                    <template slot-scope="scope">
                      <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-number v-model="scope.row.management_fee" placeholder="请输入" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="operating_free_period"
                    width="120"
                    label="经营免租期（月）">
                    <template slot-scope="scope">
                      <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-int v-model="scope.row.operating_free_period" placeholder="请输入" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="合同期内递增原则">
                    <el-table-column
                      prop="raise_start_from"
                      width="100"
                      label="从第X年起">
                      <template slot-scope="scope">
                        <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-int v-model="scope.row.raise_start_from" placeholder="请输入" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="raise_per_year"
                      width="100"
                      label="每X年">
                      <template slot-scope="scope">
                        <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-int v-model="scope.row.raise_per_year" placeholder="请输入" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="increasing_rate"
                      width="100"
                      label="递增X%">
                      <template slot-scope="scope">
                        <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-int v-model="scope.row.increasing_rate" placeholder="请输入" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="period"
                      width="100"
                      label="合同年限">
                      <template slot-scope="scope">
                        <el-input v-show="true" :disabled="detailInput" size="mini" v-filter-check-int v-model="scope.row.period" placeholder="请输入" />
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第一年">
                  <el-table-column
                    prop="year_rent_1"
                    width="120"
                    label="标准年租金">
                  </el-table-column>
                  <el-table-column
                    prop="year_rent_actual_1"
                    width="120"
                    label="实收租金（考虑免租及优惠）">
                  </el-table-column>
                  <el-table-column
                    prop="year_management_fee_1"
                    width="120"
                    label="实收物管费">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第二年">
                  <el-table-column
                    prop="year_rent_2"
                    width="120"
                    label="标准年租金2">
                  </el-table-column>
                  <el-table-column
                    prop="year_rent_actual_2"
                    width="120"
                    label="实收租金（考虑免租及优惠）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第三年">
                  <el-table-column
                    prop="year_rent_3"
                    width="120"
                    label="标准年租金3">
                  </el-table-column>
                  <el-table-column
                    prop="year_rent_actual_3"
                    width="120"
                    label="实收租金（考虑免租及优惠）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第四年">
                  <el-table-column
                    prop="year_rent_4"
                    width="120"
                    label="标准年租金4">
                  </el-table-column>
                  <el-table-column
                    prop="year_rent_actual_4"
                    width="120"
                    label="实收租金（考虑免租及优惠）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第五年">
                  <el-table-column
                    prop="year_rent_5"
                    width="120"
                    label="标准年租金5">
                  </el-table-column>
                  <el-table-column
                    prop="year_rent_actual_5"
                    width="120"
                    label="实收租金（考虑免租及优惠）">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第六年">
                  <el-table-column
                    prop="year_rent_6"
                    width="120"
                    label="标准年租金6">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第七年">
                  <el-table-column
                    prop="year_rent_7"
                    width="120"
                    label="标准年租金7">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第八年">
                  <el-table-column
                    prop="year_rent_8"
                    width="120"
                    label="标准年租金8">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第九年">
                  <el-table-column
                    prop="year_rent_9"
                    width="120"
                    label="标准年租金9">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop=""
                  label="第十年">
                  <el-table-column
                    prop="year_rent_10"
                    width="120"
                    label="标准年租金10">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!--[新建租金分解 end]-->
            </el-form-item>
            <!-- 第二步：购物中心竞争项目类比表 - end -->
            <ys-paginator v-if="step === 1" class="mg-b20" :pageInfo='pageInfo' :pageSizes='pageInfo.sizes' @handlePaginator="handlePaginator" />
          </el-form>
          <div class="footerBtn">
            <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
            <el-button v-if="step > 0" class="btn" size="mini" type="primary" @click="next(step - 1)">上一步</el-button>
            <el-button v-if="step === 0" class="btn" size="mini" type="primary" @click="next(step + 1)">下一步</el-button>
            <el-button v-if="step === 1" class="btn" size="mini" type="primary" @click="saveAnalogyList(true)">保存</el-button>
          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
import { handlePaginator } from "@mixins"
import rentDecomposition from '@apis/rentDecomposition'
export default {
  mixins: [handlePaginator],
  data() {
    return {
      analogList: [],// 物业类型列表
      cango: true,// 是否可以继续下一步
      form: {
        type: '',// 物业类型
        rent_decomposition_id: "",
        input: [],
        layout_floor_type: 1,// 市调类型1、楼层法  2、业态法
      },
      step: 0,// 第一步、二三
      leftMenu: [],// 第二步 左侧菜单
      tableList: [],// 第二步 右侧数据
      tableItem: [],// 第二步 菜单中转
      typeD: false,// 编辑时，禁用下拉
      tableListLast: [],// 记录最后统计+修正率
      tableListL: 0,// 第二步 右侧数据长度 - 2
      pageInfo: {
        page_size: 10,
        page: 1,
        sum_num: 0
      },
      detailInput: false,
      floor: false,// 楼层法
      layout: false,// 业态法
      floorType: '',// 楼层法按钮样式
      layoutType: 'info',// 业态法按钮样式
      layout_floor_type: 1,// 市调类型1、楼层法  2、业态法 *判断用
      efficiency_rate: 0,// 实用率
    }
  },
  created () {
    this.form.rent_decomposition_id = this.$route.query.market_id
    this.form.layout_floor_type = this.$route.query.layout_floor_type || 1
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
    this.form.type = this.$route.query.type
    if (this.$route.query.type) {
      this.typeD = true
    }
  },
  watch: {
    tableList:{
      handler (newV, oldV) {
        if (newV) {
          const efficiency_rate = this.efficiency_rate
          newV.forEach((item,indexV) => {
            // 建筑面积
            if (efficiency_rate && item.inner_area) {
              const area = item.inner_area / (efficiency_rate / 100)
              item.building_area = parseFloat(area.toFixed(2))
            }
            // 对外报价
            if (item.recommended_rent && item.revised_standard) {
              item.external_quotation = parseFloat((parseInt(item.recommended_rent) + parseInt(item.revised_standard)).toFixed(2))
            }
            const array10 = [0,1,2,3,4,5,6,7,8,9]
            // 标准年租金
            if ((item.inner_area || item.building_area) && item.recommended_rent) {
              // 处理 从第X年起、每X年、递增X% 数据
              if (item.raise_start_from && item.raise_per_year && item.increasing_rate) {
                // 分类别
                if (item.store_type == '1' || item.store_type == '2') {
                  array10.forEach((d,index) => {
                    item[`year_rent_${index+1}`] = parseFloat((item.inner_area * item.recommended_rent * 12).toFixed(2) )
                    if (index > 0) {
                      item[`year_rent_${index+1}`] = parseFloat((item[`year_rent_${index+1}`] * Math.pow((1+item.increasing_rate / 100),(Math.floor((index+1 - item.raise_start_from) /item.raise_per_year) + 1))).toFixed(2))
                    }
                    // 整数处理
                    if (item[`year_rent_${index+1}`].toString().indexOf('.') < 0) {
                      item[`year_rent_${index+1}`] = item[`year_rent_${index+1}`] + '.00'
                    }
                    // 实收租金 2-5年
                    if ( 0 < index && index < 5) {
                      item[`year_rent_actual_${index+1}`] = item[`year_rent_${index+1}`]
                    }
                  })
                  item.rent_area = item.inner_area
                }else{
                  array10.forEach((d,index) => {
                    item[`year_rent_${index+1}`] = parseFloat((item.building_area * item.recommended_rent * 12).toFixed(2) )
                    if (index > 0) {
                      item[`year_rent_${index+1}`] = parseFloat((item[`year_rent_${index+1}`] * Math.pow((1+item.increasing_rate / 100),(Math.floor((index+1 - item.raise_start_from) /item.raise_per_year) + 1))).toFixed(2))
                    }
                    // 整数处理
                    if (item[`year_rent_${index+1}`].toString().indexOf('.') < 0) {
                      item[`year_rent_${index+1}`] = item[`year_rent_${index+1}`] + '.00'
                    }
                    // 实收租金 2-5年
                    if ( 0 < index && index < 5) {
                      item[`year_rent_actual_${index+1}`] = item[`year_rent_${index+1}`]
                    }
                  })
                  item.rent_area = item.building_area
                }
              }else{
                if (item.store_type == '1' || item.store_type == '2') {
                  array10.forEach((d,index) => {
                    item[`year_rent_${index+1}`] = parseFloat((item.inner_area * item.recommended_rent * 12).toFixed(2) )
                    // 整数处理
                    if (item[`year_rent_${index+1}`].toString().indexOf('.') < 0) {
                      item[`year_rent_${index+1}`] = item[`year_rent_${index+1}`] + '.00'
                    }
                    // 实收租金 2-5年
                    if ( 0 < index && index < 5) {
                      item[`year_rent_actual_${index+1}`] = item[`year_rent_${index+1}`]
                    }
                  })
                  item.rent_area = item.inner_area
                }else{
                  array10.forEach((d,index) => {
                    item[`year_rent_${index+1}`] = parseFloat((item.building_area * item.recommended_rent * 12).toFixed(2) )
                    // 整数处理
                    if (item[`year_rent_${index+1}`].toString().indexOf('.') < 0) {
                      item[`year_rent_${index+1}`] = item[`year_rent_${index+1}`] + '.00'
                    }
                    // 实收租金 2-5年
                    if ( 0 < index && index < 5) {
                      item[`year_rent_actual_${index+1}`] = item[`year_rent_${index+1}`]
                    }
                  })
                  item.rent_area = item.building_area
                }
              }
            }
            // 实收租金
            if (item.operating_free_period && item.year_rent_1) {
              // 第一年
              item.year_rent_actual_1 = parseFloat((item.year_rent_1 * (12 - item.operating_free_period) / 12).toFixed(2))
              // 整数处理
              if (item.year_rent_actual_1.toString().indexOf('.') < 0) {
                item.year_rent_actual_1 = item.year_rent_actual_1 + '.00'
              }
            }
            // 第一年：实收物管费
            if ((item.inner_area || item.building_area) && item.management_fee) {
              if (item.store_type == '1' || item.store_type == '2') {
                item.year_management_fee_1 = parseFloat((item.inner_area * item.management_fee) * 12 ).toFixed(2)
              }else{
                item.year_management_fee_1 = parseFloat((item.building_area * item.management_fee) * 12 ).toFixed(2)
              }
              // 整数处理
              if (item.year_management_fee_1.toString().indexOf('.') < 0) {
                item.year_management_fee_1 = item.year_management_fee_1 + '.00'
              }
            }
          })
        }
      },
      deep: true
    },
    efficiency_rate() {
      this.tableList.forEach(item => {
        const er = this.efficiency_rate
        item.efficiency_rate = er
        if (er && item.inner_area) {
          const area = item.inner_area / (er / 100)
          item.building_area = parseFloat(area.toFixed(2))
        }
      })
    }
  },
  methods: {
    listEven () {

    },
    checkParams () {
      const {type = ''} = this.form
      if (!type.trim()) {
        this.$message.error('请选择物业类型')
        return false
      }
      return true
    },
    async submit() {
      if(!this.checkParams()) return
      const res = await rentDecomposition.create(this.form)
      if (res.code === 200) {

      }
    },
    // 初始化数据
    async initDate () {
      const res = await rentDecomposition.getAnalogyType({id: this.form.rent_decomposition_id})
      if (res.code === 200 && res.result) {
        this.analogList = res.result
        let cg = false
        try {
          res.result.forEach(item => {
            if (item.can_select) {
              cg = true
              throw new Error()
            }
          })
        }catch(e){}
        this.cango = cg
      }
    },
    // 获取第二步表数据
    async getAnalogyList () {
      const param = {...this.pageInfo,type: this.form.type,rent_decomposition_id: this.form.rent_decomposition_id,layout_floor_type: this.form.layout_floor_type}
      const tableList = await rentDecomposition.getAnalogyList(param)
      if (tableList.code == 200 && tableList.result) {
        this.tableList = tableList.result.data || []
        if (this.tableList.length > 0) {
          this.efficiency_rate = this.tableList[0].efficiency_rate || 0
        }
        this.pageInfo.sum_num = tableList.result.sum_num

        // 移除双向绑定字段
        const array10 = [0,1,2,3,4,5,6,7,8,9]
        this.tableList.forEach(item => {
          array10.forEach((it,index) => this.$delete(item,`year_rent_${index+1}`))
          this.$delete(item,'building_area')
          this.$delete(item,'external_quotation')
          this.$delete(item,'rent_area')
          this.$delete(item,'year_rent_actual_1')
          this.$delete(item,'year_management_fee_1')
        })
      }
    },
    async getList(){
      this.getAnalogyList()
    },
    // 保存第二步表数据
    async saveAnalogyList (step) {
      if (!this.efficiency_rate) {
        this.$message.error('请填写实用率')
        return
      }
      this.form.input = JSON.stringify(this.tableList)
      const saveTableList = await rentDecomposition.saveAnalogyList(this.form)
      if (saveTableList) {
        if (step){
          this.$message.success('保存成功')
          this.toBackPage()
        }
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
      this.pageInfo.page = 1
      this.getAnalogyList()
    },
    // 下一步
    next (step,next) {
      if (!this.cango && !this.form.type){
        this.$message.error('物业类型已选完')
        return false
      }
      if (!this.form.type){
        this.$message.error('请选择物业类型')
        return false
      }
      this.step = step
      if (step === 1){
        this.getAnalogyList()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 点击分页
    async handlePaginator (pageInfo) {
      await this.saveAnalogyList()
      this.pageInfo = { ...this.pageInfo, ...pageInfo }
      this.getList()
    }
  },
  mounted () {
    this.initDate()
    this.listEven()
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.flex-box-center /deep/ .el-form-item__content{
  width:  30%;
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
.step {
  background-color: #FFFFFF;
}
.step /deep/ .el-step.is-simple .el-step__title{
  font-size: 13px;
}
@import '~@styles/common.scss'
</style>
