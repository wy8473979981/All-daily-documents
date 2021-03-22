<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      size="1155px">
      <div class="dialog-close-icon" @click="fast=false">
        <i></i>
      </div>
      <div class="detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-show="!id">新建竞品分析</h3>
            <h3 v-show="id">编辑竞品分析</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <!-- <el-button plain @click="fast=false">暂存</el-button> -->
            <el-button plain @click="fast=false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div class="create-input">
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="6">
                <div class="d-min">
                  <span>项目名称</span>
                  <el-select class="required" clearable v-model="info.project_name" placeholder="请选择">
                    <el-option
                      v-for="item in projectList"
                      :key="item.project_id"
                      :label="item.project_name"
                      :value="item.project_name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min">
                  <span>类别</span>
                  <el-select class="required" clearable v-model="info.cpa_type_id" placeholder="请选择">
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
          <div class="create-table">
            <div class="create-ul">
              <ul>
                <li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                <li>物业名称</li>
                <li>基本租金标准</li>
                <li>- 减让</li>
                <li>+ 转嫁的费用</li>
                <li>+ 租户支付的的改良</li>
                <li>= 实际租金</li>
              </ul>
              <ul v-for="(item, index) in newDate" :key="index">
                <li>
                  <p>
                    <span v-show="index > 1">
                      <i class="el-icon-remove-outline" @click="delProperty(index)"></i>
                    </span>
                    <span>{{index == 0 ? '目标物业' : '可比物业' + item.property_no}}</span>
                  </p>
                </li>
                <li>
                  <el-input v-model="item.property_name" placeholder="请输入"></el-input>
                </li>
                <li>
                  <el-input v-model="item.standard_rental" v-filter-check-input @input="standardRentalInput(index)" placeholder="请输入"></el-input>
                </li>
                <li>
                  <el-input v-model="item.reduction" v-filter-check-input @input="reductionInput(index)" placeholder="请输入"></el-input>
                </li>
                <li>
                  <el-input v-model="item.transfer" v-filter-check-input @input="transferInput(index)" placeholder="请输入"></el-input>
                </li>
                <li>
                  <el-input v-model="item.improve" v-filter-check-input @input="improveInput(index)" placeholder="请输入"></el-input>
                </li>
                <li>
                  <el-input v-model="item.real_rental" readonly placeholder="请输入"></el-input>
                </li>
              </ul>
              <span class="create-addClick" @click="addProperty">新增可比物业</span>
            </div>
          </div>
          <div class="create-table">
            <div class="create-ul category-ul">
              <ul class="category-ul-list">
                <li>
                  <p class="category-li-top">类别</p>
                </li>
                <li v-for="(item, index) in newDate[0].cate" :key="index">
                  <span v-show="index > 10">
                    <i class="el-icon-remove-outline" @click="delCategory(index)"></i>
                  </span>
                  <span v-if="index < 11">{{item.cate_name}}</span>
                  <el-input v-else v-model="item.cate_name" placeholder="请输入"></el-input>
                </li>
              </ul>
              <div class="category-ul-box" v-for="(item, index) in newDate" :key="index">
                <ul>
                  <li>
                    <p>描述</p>
                  </li>
                  <li v-for="(itemm, indexx) in item.cate" :key="indexx">
                    <el-select clearable v-model="itemm.cpa_kind_id" no-data-text="请11选择" placeholder="请选择">
                      <el-option
                        v-for="item in categoryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </li>
                </ul>
                <ul v-if="index != 0">
                  <li>
                    <p>+/-调整值</p>
                  </li>
                  <li v-for="(itemm, indexx) in item.cate" :key="indexx">
                    <el-input v-model="itemm.adjval" v-filter-check-input @input="adjvalInput(index)" placeholder="请输入">
                      <template slot="prepend">￥</template>
                    </el-input>
                  </li>
                </ul>
              </div>
              <span class="create-addClick" @click="addCategory">新增类别</span>
            </div>
          </div>
          <div class="create-table">
            <div class="create-ul total-ul">
              <ul>
                <li>租金调整合计</li>
                <li>调整后的实际租金</li>
                <li>调整后的平均实际租金</li>
              </ul>
              <ul v-for="(item, index) in newDate" :key="index">
                <li>
                  <el-input v-if="index != 0" v-model="item.adjust_total_rental" readonly placeholder="请输入"></el-input>
                  <p class="total-disable" v-else>/</p>
                </li>
                <li>
                  <el-input v-if="index != 0" v-model="item.adjust_real_rental" readonly placeholder="请输入"></el-input>
                  <p class="total-disable" v-else>/</p>
                </li>
                <li>
                  <el-input v-if="index == 0" v-model="item.adjust_avg_rental" readonly placeholder="请输入"></el-input>
                  <p class="total-disable" v-else>/</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import GlobalApi from '@/apis/apis/global';
import Product from '@/apis/apis/product'
export default {
  name: 'CreateProduct',
  props: ['open', 'id'],
  components: {
    Product
  },
  data() {
    return {
      landType: this.$store.state.cpaType,
      projectList: [],
      newDate: [
        {
          property_no: '0',
          property_name: '',
          standard_rental: '',
          reduction: '',
          transfer: '',
          improve: '',
          real_rental: '',
          adjust_total_rental: '',
          adjust_real_rental: '',
          adjust_avg_rental: '',
          cate: [
            {cate_name:'主力店吸引力',cpa_kind_id:'',adjval:null},
            {cate_name:'租户组合协同作用',cpa_kind_id:'',adjval:null},
            {cate_name:'车位',cpa_kind_id:'',adjval:null},
            {cate_name:'外观可见度',cpa_kind_id:'',adjval:null},
            {cate_name:'车辆交通流量',cpa_kind_id:'',adjval:null},
            {cate_name:'空置率',cpa_kind_id:'',adjval:null},
            {cate_name:'出入口',cpa_kind_id:'',adjval:null},
            {cate_name:'标记',cpa_kind_id:'',adjval:null},
            {cate_name:'整体外观',cpa_kind_id:'',adjval:null},
            {cate_name:'与中转站的接近度',cpa_kind_id:'',adjval:null},
            {cate_name:'便利设施/其他设施',cpa_kind_id:'',adjval:null},
          ]
        },{
          property_no: '1',
          property_name: '',
          standard_rental: '',
          reduction: '',
          transfer: '',
          improve: '',
          real_rental: '',
          adjust_total_rental: '',
          adjust_real_rental: '',
          adjust_avg_rental: '',
          cate: [
            {cate_name:'主力店吸引力',cpa_kind_id:'',adjval:''},
            {cate_name:'租户组合协同作用',cpa_kind_id:'',adjval:''},
            {cate_name:'车位',cpa_kind_id:'',adjval:''},
            {cate_name:'外观可见度',cpa_kind_id:'',adjval:''},
            {cate_name:'车辆交通流量',cpa_kind_id:'',adjval:''},
            {cate_name:'空置率',cpa_kind_id:'',adjval:''},
            {cate_name:'出入口',cpa_kind_id:'',adjval:''},
            {cate_name:'标记',cpa_kind_id:'',adjval:''},
            {cate_name:'整体外观',cpa_kind_id:'',adjval:''},
            {cate_name:'与中转站的接近度',cpa_kind_id:'',adjval:''},
            {cate_name:'便利设施/其他设施',cpa_kind_id:'',adjval:''},
          ]
        }
      ],
      categoryList: [
        {value:'1',label:'很好',},
        {value:'2',label:'良好',},
        {value:'3',label:'一般',},
        {value:'4',label:'较差',}
      ],
      info: {
        project_name: null, // 项目名称
        cpa_type_id: null, // 类别
      }
    }
  },
  created() {
    this.getProList()
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', val)
      }
    }
  },
  watch: {
    id(nv, v) {
      if(nv) {
        this.getList()
      }else{
        this.info = {
          project_name: null,
          cpa_type_id: null,
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    // 获取项目列表
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
          console.log(this.projectList)
        }
      })
    },
    // 新增可比物业
    addProperty() {
      // const cate = Object.assign({},this.newDate[0].cate)
      // 新增可比物业为其赋值自定义类别
      var cate = []
      for (var index in this.newDate[0].cate) {
        cate.push({cate_name:this.newDate[0].cate[index].cate_name,cpa_kind_id:'',adjval:''})
      }
      let aa = {
        // 新增可比物业是物业编号增量变大
        property_no: String(Number(this.newDate[this.newDate.length - 1].property_no) + 1),
        property_name: '',
        standard_rental: '',
        reduction: '',
        transfer: '',
        improve: '',
        real_rental: '',
        adjust_total_rental: '',
        adjust_real_rental: '',
        adjust_avg_rental: '',
        cate: cate
      }
      this.newDate.push(aa)
      console.log(this.newDate)
      console.log(this.landType)
    },
    // 删除可比物业
    delProperty(index) {
      this.newDate.splice(index, 1)
    },
    // 新增类别
    addCategory() {
      // let aa = {cate_name:'其他类别',cpa_kind_id:'',adjval:''}
      // 每个物业插入新类别
      for (var index in this.newDate) {
        let aa = {cate_name:'',cpa_kind_id:'',adjval:''}
        this.newDate[index].cate.push(aa)
      }
    },
    // 删除自定义类别
    delCategory(index) {
      for (var key in this.newDate) {
        this.newDate[key].cate.splice(index, 1)
      }
    },
    standardRentalInput(index) {
      this.realRentalCompute(index)
      this.RErealRentalCompute(index)
      this.avgRentalCompute(index)
    },
    reductionInput(index) {
      this.realRentalCompute(index)
      this.RErealRentalCompute(index)
      this.avgRentalCompute(index)
    },
    transferInput(index) {
      this.realRentalCompute(index)
      this.RErealRentalCompute(index)
      this.avgRentalCompute(index)
    },
    improveInput(index) {
      this.realRentalCompute(index)
      this.RErealRentalCompute(index)
      this.avgRentalCompute(index)
    },
    // 实际租金计算
    realRentalCompute(index) {
      this.newDate[index].real_rental = String(Number(this.newDate[index].standard_rental) - Number(this.newDate[index].reduction) + Number(this.newDate[index].transfer) + Number(this.newDate[index].improve))
    },
    // 输入调整值
    adjvalInput(index) {
      var abc = 0
      for (var key in this.newDate[index].cate) {
        if(this.newDate[index].cate[key].adjval) {
          abc += Number(this.newDate[index].cate[key].adjval)
        }
      }
      // 租金调整合计计算
      this.newDate[index].adjust_total_rental = abc
      // 调整后的实际租金计算
      this.RErealRentalCompute(index)
      this.avgRentalCompute(index)
    },
    // 调整后实际租金计算
    RErealRentalCompute(index) {
      this.newDate[index].adjust_real_rental = Number(this.newDate[index].adjust_total_rental) + Number(this.newDate[index].real_rental)
    },
    // 调整后平均实际租金计算
    avgRentalCompute(index) {
      var real_sum = 0
      var real_index = this.newDate.length
      for (var key in this.newDate) {
        if(Number(this.newDate[key].adjust_real_rental) > 0) {
          real_sum += Number(this.newDate[key].adjust_real_rental)
        } else {
          real_index -= 1
        }
      }
      if (real_index == 0) {
        this.newDate[0].adjust_avg_rental = 0
      } else {
        this.newDate[0].adjust_avg_rental = real_sum / real_index
      }
    },
    // 加载详情
    getList() {
      Product.findDetail({cpa_id: this.id}).then(res => {
        console.log(res)
        if(res.code === 200 && res.result){
          console.log(res.result)
          this.info = res.result.info
          this.newDate = res.result.property
          // 后端返回0，选择为''
          for (var key in this.newDate) {
            for (var key2 in this.newDate[key].cate) {
              if (this.newDate[key].cate[key2].cpa_kind_id == 0) {
                this.newDate[key].cate[key2].cpa_kind_id = ''
              }
            }
          }
        }
      })
    },
    // 提交
    submit() {
      if(!this.info.project_name) {
        this.$message.error('请填写项目名称')
        return
      }
      if(!this.info.cpa_type_id) {
        this.$message.error('请选择类别')
        return
      }
      let data = {
        json_data: {
          info: this.info,
          property: this.newDate
        }
      }
      const params = {
        post_data: JSON.stringify(data)
      }
      console.log(params)
      if(this.id) {
        // 修改
        Product.update(params).then(res => {
          console.log("竞品分析更新:",res)
          this.$emit('close', {
            fast: false,
            reload: true
          })
        })
      }else{
        // 新建
        Product.add(params).then(res => {
          console.log("竞品分析新建:",res)
          this.$emit('close', {
            fast: false,
            reload: true
          })
        })
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
    .create-input{
      .el-input__inner{
        height: 36px;
      }
      .el-select .el-input .el-select__caret{
        line-height: 36px;
      }
      .el-date-editor .el-input__icon{
        line-height: 36px;
      }
      .d-min{
        >span{
          display: block;
          font-size: 14px;
          color: #98A9BC;
          margin-bottom: 10px;
        }
      }
    }
    .create-ul{
      display: flex;
      margin-top: 30px;
      ul{
        width: 280px;
        flex-shrink: 0;
        li:first-child{
          p{
            padding: 7px 10px;
            text-align: right;
            color: #98A9BC;
            span:first-child{
              float: left;
              color: #F90000;
              cursor: pointer;
            }
          }
          .category-li-top{
            text-align: left;
            padding: 0;
          }
        }
        li{
          padding: 4px 10px;
          .el-input__inner {
            height: 26px;
            padding: 0 10px;
          }
          .el-select .el-input .el-select__caret{
            line-height: 26px;
          }
          .el-date-editor .el-input__icon{
            line-height: 26px;
          }
        }
      }
      ul:first-child{
        width: 160px;
        >li {
          padding: 10px;
        }
        li.create-lastLi{
          padding-bottom: 8px;
        }
        li.newCategory-li{
          padding: 0;
          padding-bottom: 6px;
        }
      }
      ul:nth-child(2){
        width: 140px;
      }
      .create-addClick{
        flex-shrink: 0;
        height: 16px;
        padding: 6px 30px;
        color: #468CEB;
        cursor: pointer;
      }
    }
    .category-ul{
      ul{
        width: 140px;
      }
      ul.category-ul-list{
        li{
          height: 34px;
          line-height: 34px;
          padding: 0 10px;
          position: relative;
          span:first-child{
            position: absolute;
            top: 0;
            left: -10px;
            color: #F90000;
          }
        }
        li:first-child{
          height: 36px;
          line-height: 36px;
        }
      }
      .category-ul-box{
        max-width: 280px;
        display: flex;
        ul{
          width: 140px;
          li{
            padding: 4px 10px;
          }
        }
      }
    }
    .total-ul{
      ul{
        li{
          p.total-disable{
            height: 26px;
            line-height: 26px;
            padding: 0 10px;
            text-align: center;
            color: #333333;
          }
        }
      }
    }
    .el-input__inner{
      border-color: transparent;
      background-color: #F2F4F6;
      border-radius: 2px;
    }
    .el-input__inner:focus{
      outline: none;
      border-color: #468CEB;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #DFE3E5;
      color: #333;
    }
  }
}
</style>