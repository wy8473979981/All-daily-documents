<template>
  <div>
    <el-steps :active="step" simple class="mg-b10 step">
      <el-step title="第一步：选择物业类型" icon="el-icon-edit"></el-step>
      <el-step title="第二步：填写非主力店铺权重定价" icon="el-icon-s-data"></el-step>
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
            <el-form-item label="" :required='true' v-if="step >= 1">
              <el-tag v-if="floor" effect="dark" :type="floorType" class="font-c-w" @click="changeType(0)" style="border-radius: 4px 4px 0 0; cursor: pointer;">楼层法</el-tag>
              <el-tag v-if="layout" effect="dark" :type="layoutType" class="font-c-w" @click="changeType(1)" style="border-radius: 4px 4px 0 0; cursor: pointer;">业态法</el-tag>
              <el-popover
                placement="right"
                width="800"
                class="resetTable"
                trigger="click">
                <el-table
                  :data="tabData"
                  border
                  :show-header="false"
                  :span-method="arraySpanMethod"
                  style="width: 100%; height: 500px; overflow-y: scroll;">
                  <el-table-column
                    prop="title"
                    label="name1"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="instructions"
                    label="name2"
                    colspan='1'
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="steps"
                    label="name3">
                  </el-table-column>
                </el-table>
                <el-button slot="reference" size="mini" style="float: right; color: #f56c6c;">注：带*影响租金价格因素权重说明</el-button>
              </el-popover>
              <!--[新建竞品权重 start]-->
              <el-table
                :data="tableList"
                class="table-bg-main mg-b20"
                border
                id="table1"
                size="small"
                @header-click="headerClick"
                style="width: 100%;">
                <el-table-column
                  prop=""
                  label="非主力店商铺权重定价">
                  <el-table-column
                    prop="fist_column_name"
                    :label="form.layout_floor_type == 1?'细分类比/楼层':'细分类比/业态'">
                  </el-table-column>
                  <el-table-column
                    prop="store_code"
                    label="铺位号">
                  </el-table-column>
                  <el-table-column
                    prop="inner_area"
                    label="套内面积（㎡）">
                  </el-table-column>
                  <el-table-column
                    prop="layout"
                    label="业态">
                  </el-table-column>
                  <el-table-column
                    prop="efficiency_rate"
                    width="120"
                    label="影响租金价格因素权重 *">
                      <el-table-column
                        prop="position"
                        width="100"
                        label="位置">
                          <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.position" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson1"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.position}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="apartment_advantage"
                        width="100"
                        label="户型优势">
                        <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.apartment_advantage" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson2"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.apartment_advantage}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="facade_display_degree"
                        width="100"
                        label="门面展示度">
                        <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.facade_display_degree" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson3"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.facade_display_degree}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="area_section"
                        width="100"
                        label="面积区间">
                        <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.area_section" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson4"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.area_section}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="easy_access_to_people"
                        width="100"
                        label="人流便达性">
                        <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.easy_access_to_people" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson5"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.easy_access_to_people}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="layout_or_floor_score"
                        width="100"
                        :label="form.layout_floor_type == 1?'业态':'楼层'">
                        <template slot-scope="scope">
                            <el-select v-if="step === 1" v-model="scope.row.layout_or_floor_score" filterable @change="dealScore(scope.row)" placeholder="请选择" size="mini">
                              <el-option
                                v-for="item in selectJson6"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                                <span>{{ item.name }}</span>
                              </el-option>
                            </el-select>
                            <span v-else>{{scope.row.layout_or_floor_score}}</span>
                          </template>
                      </el-table-column>
                  </el-table-column>
                  <el-table-column
                    prop="score"
                    width="100"
                    label="得分">
                  </el-table-column>
                  <el-table-column
                    v-if="step === 2"
                    prop="coefficient"
                    width="100"
                    label="系数">
                  </el-table-column>
                  <el-table-column
                    v-if="step === 2"
                    prop="store_weighted_pricing"
                    width="100"
                    label="商铺权重定价">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!--[新建竞品权重 end]-->
            </el-form-item>
            <!-- 第二步：购物中心竞争项目类比表 - end -->
            <ys-paginator v-if="step >= 1" class="mg-b20" :pageInfo='pageInfo' @handlePaginator="handlePaginator" />
          </el-form>
          <div class="footerBtn">
            <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
            <el-button v-if="step > 0" class="btn" size="mini" type="primary" @click="next(step - 1)">上一步</el-button>
            <el-button v-if="step === 0" class="btn" size="mini" type="primary" @click="next(step + 1)">下一步</el-button>
            <el-button v-if="step === 1" class="btn" size="mini" type="primary" @click="saveAnalogyList('back')">保存并退出</el-button>
            <el-button v-if="step === 1" class="btn" size="mini" type="primary" @click="next((step + 1),'next')">保存并下一步</el-button>
          </div>
        </section>
      </div>
    </section>
  </div>

</template>

<script>
import { handlePaginator } from "@mixins"
import weightedPricing from '@apis/weightedPricing'
export default {
  mixins: [handlePaginator],
  data() {
    return {
      analogList: [],// 物业类型
      selectJson1:[{id:25,name:'1档-25分'},{id:20,name:'2档-20分'},{id:15,name:'3档-15分'},{id:10,name:'4档-10分'},{id:5,name:'5档-5分'}],
      selectJson2:[{id:15,name:'1档-15分'},{id:10,name:'2档-10分'},{id:5,name:'3档-5分'}],
      selectJson3:[{id:20,name:'1档-20分'},{id:15,name:'2档-15分'},{id:10,name:'3档-10分'},{id:5,name:'4档-5分'}],
      selectJson4:[{id:10,name:'1档-10分'},{id:8,name:'2档-8分'},{id:6,name:'3档-6分'},{id:4,name:'4档-4分'},{id:2,name:'5档-2分'}],
      selectJson5:[{id:15,name:'1档-15分'},{id:10,name:'2档-10分'},{id:5,name:'3档-5分'}],
      selectJson6:[{id:20,name:'1档-20分'},{id:15,name:'2档-15分'},{id:10,name:'3档-10分'},{id:5,name:'4档-5分'}],
      cango: true,// 是否可以继续下一步
      form: {
        type: '',
        weighted_pricing_id: '',
        layout_floor_type: 1,// 市调类型 1、楼层法 2、业态法
        input: []
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
      firstName: "细分类比/楼层",
      tabData: [
        {
          title: '影响商铺租金定价因素说明',
          instructions: '位置',
          steps: '同楼层商铺租金由高至低的位置分别是：主入口两侧—次入口两侧—主通道两侧—次通道两侧—通道端头或冷区死角，权值依次递减 '
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '户型优势',
          steps: '商铺形状方正规整、层高适中、开间进深比例适当，商铺内部无妨碍布局设计的承重墙或柱子等，即商铺户型优势较大，租金相对较高，权值越高'
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '门面展示度',
          steps: '同区域或相邻商铺的门面宽度越大，门面可见度越高，即门面展示度越高，租金相对越高，权值越高'
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '面积区间',
          steps: '同等条件下，商铺面积越大则租金单价相对越低，商铺面积越小则租金单价相对越高，权值越高'
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '人流便达性',
          steps: '临近项目主入口、主通道、手扶梯、升降机、通往地铁通道两侧等，即人流通达率较高的商铺，租金相对越高，权值越高'
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '楼层(业态法)',
          steps: '根据项目各楼层分别取权重：楼层越高，权值越低'
        },
        {
          title: '影响商铺租金定价因素说明',
          instructions: '业态(楼层法)',
          steps: '根据各商铺业态规划，承租能力由高至低的业态分别是：零售—餐饮美食—生活配套—休闲娱乐，权值依次递减'
        },
        {
          title: '商铺权重定价步骤',
          steps: '1、根据本项目商铺特点将每项因素划分为2-5档，每档对应具体分数，如位置分为1、2、3档，则1档25分，2档15分，3档5分；',
        },
        {
          title: '商铺权重定价步骤',
          steps: '2、由3位招商人员根据每项因素在项目平面图上对每个商铺逐一进行档次判断，如A101商铺的位置为2档，则标记为①-2，具体参考附件5《商铺权重定价示意图》；',
        },
        {
          title: '商铺权重定价步骤',
          steps: '3、将3位招商人员对每个商铺每项因素的档次对应得分后取平均值（保留整数）填入下表；',
        },
        {
          title: '商铺权重定价步骤',
          steps: '4、填写下表各商铺的租赁面积、各项因素得分、楼层/业态平均租金后，将自动计算得出各商铺的系数、租金单价、 楼层月总租金、楼层最低租金、分解到铺后楼层/业态平均租金。',
        },
       ],
    }
  },
  created () {
    this.form.weighted_pricing_id = this.$route.query.market_id,
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

      },
      deep: true
    }
  },
  methods: {
    listEven () {

    },
    // 合并table
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ) {
        if (rowIndex === 0) {
          return [7, 1];
        }else if (rowIndex === 7) {
          return [4, 1];
        }else{
          return [0, 0];
        }
      } else if (columnIndex === 1){
        if (rowIndex >= 7) {
          return [0, 0];
        }else{
          return [1, 1];
        }
      } else if (columnIndex === 2){
        if (rowIndex >= 7) {
          return [1, 2];
        }else{
          return [1, 1];
        }
      }
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
      const res = await weightedPricing.create(this.form)
      if (res.code === 200) {

      }
    },
    // 初始化数据
    async initDate () {
      const res = await weightedPricing.getPropertyType({id: this.form.weighted_pricing_id})
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
    async getWeightedPricingList () {
      const tableListData = await weightedPricing.getWeightedPricingList({...this.pageInfo, type: this.form.type, weighted_pricing_id: this.form.weighted_pricing_id, layout_floor_type: this.form.layout_floor_type})
      if (tableListData.code == 200 && tableListData.result) {
        this.tableList = tableListData.result.data || []
        this.pageInfo.sum_num = tableListData.result.sum_num

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
      this.getWeightedPricingList()
    },
    // 保存第二步表数据
    async saveAnalogyList (step) {
      const hasVal = this.tableList.some(item => (item.position || item.apartment_advantage || item.facade_display_degree || item.area_section || item.easy_access_to_people || item.layout_or_floor_score))
      console.log(hasVal,'====hasVal')
      if (!hasVal) {
         this.$message.error('请填写租金价格因素权重')
         return
      }
      this.form.input = JSON.stringify(this.tableList)
      const saveTableList = await weightedPricing.saveAnalogyList(this.form)
      if (saveTableList) {
        if (step && step === 'back'){
          this.$message.success('保存成功')
          this.toBackPage()
        }else{
          if (step) {
            this.step = step
          }
          this.getWeightedPricingList()
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
      this.getWeightedPricingList()
    },
    dealScore (obj) {
      let row = Object.assign({},obj)
      if (!row.position) row.position = 0
      if (!row.apartment_advantage) row.apartment_advantage = 0
      if (!row.facade_display_degree) row.facade_display_degree = 0
      if (!row.area_section) row.area_section = 0
      if (!row.easy_access_to_people) row.easy_access_to_people = 0
      if (!row.layout_or_floor_score) row.layout_or_floor_score = 0
      obj.score  = this.dealNum(row.position) + this.dealNum(row.apartment_advantage) + this.dealNum(row.facade_display_degree)
        + this.dealNum(row.area_section) + this.dealNum(row.easy_access_to_people) + this.dealNum(row.layout_or_floor_score)
    },
    dealNum (str) {
      if (!str) {
        return 0
      }
      return parseInt(str)
    },
    // 点击表头
    headerClick (head) {
      if (head && head.label == '影响租金价格因素权重 *') {
        console.log('打开弹框')
      }
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
      if (step === 1){
        this.step = step
        this.getWeightedPricingList()
      }
      if (step === 2 && next && next === 'next'){
        this.saveAnalogyList(step)
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
    // 点击分页
    async handlePaginator (pageInfo) {
      // await this.saveAnalogyList()
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
.resetTable /deep/ .el-table::before {
  height: 0;
}
@import '~@styles/common.scss'
</style>
