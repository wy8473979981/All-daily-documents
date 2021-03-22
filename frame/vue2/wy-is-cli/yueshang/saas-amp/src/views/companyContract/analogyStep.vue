<template>
  <div>
    <!--[步骤状态栏 start]-->
    <el-steps :active="step" simple class="mg-b10 step">
      <el-step title="第一步：选择物业类型" icon="el-icon-edit"></el-step>
      <el-step title="第二步：填写竞品类比表" icon="el-icon-s-data"></el-step>
      <el-step title="第三步：填写租金测算表" icon="el-icon-s-platform"></el-step>
      <el-step title="完成" icon="el-icon-check"></el-step>
    </el-steps>
    <!--[步骤状态栏 start]-->
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
              <!-- 竖状表格 -->
              <el-row class="three-tab">
                <!-- 表结构 -->
                <el-col :span="7">
                  <table border="1" cellpadding="0" cellspacing="0" class="tab-left" :show-overflow-tooltip="true">
                    <!-- 一级菜单 -->
                    <template v-for="item in leftMenu">
                      <tr :key="item.key">
                        <template v-if="!item.hasNext">
                          <td :rowspan="item.rows" :colspan="item.cols || 1" width="30"><p>{{item.name}}</p></td>
                        </template>
                        <template v-else>
                          <td :rowspan="item.rows" :colspan="item.cols" width="30"><p>{{item.name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs" :rowspan="item.rows" width="80" :title="item.childs[0].name"><p>{{item.childs[0].name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs" :rowspan="item.rows" width="30" :title="item.childs[0].childs[0].name"><p>{{item.childs[0].childs[0].name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs && item.childs[0].childs[0].childs" class="aLeft" width="50" :title="item.childs[0].childs[0].childs[0].name"><p>{{item.childs[0].childs[0].childs[0].name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs && item.childs[0].childs[0].childs && item.childs[0].childs[0].childs[0].childs" width="50"><p>{{item.childs[0].childs[0].childs[0].childs[0].name}}</p></td>
                        </template>
                      </tr>
                      <!-- 二级菜单 -->
                      <template v-for="(item2,index2) in item.childs">
                        <tr :key="item2.key" v-if="index2 > 0" >
                          <template v-if="!item2.hasNext">
                            <td :rowspan="item.rows"><p>{{item2.name}}</p></td>
                          </template>
                          <template v-else>
                            <td :rowspan="item2.rows" :title="item2.name"><p>{{item2.name}}</p></td>
                            <td v-if="item2.childs && index2 > 0" :rowspan="item.rows" width="30" :title="item2.childs[0].name"><p>{{item2.childs[0].name}}</p></td>
                            <td v-if="item2.childs && item.childs[0].childs && index2 > 0" width="150" :title="item2.childs[0].childs[0].name"><p>{{item2.childs[0].childs[0].name}}</p></td>
                            <td v-if="item2.childs && item.childs[0].childs && item.childs[0].childs[0].childs && index2 > 0" width="50"><p>{{item2.childs[0].childs[0].childs[0].name}}</p></td>
                          </template>
                        </tr>
                        <!-- 三级菜单 -->
                        <template v-for="(item3,index3) in item2.childs">
                          <template v-if="index3 > 0">
                            <tr :key="item3.key" >
                              <td v-if="item2.childs" :rowspan="item.rows" width="30" :title="item3.name"><p>{{item3.name}}</p></td>
                              <td v-if="item3.childs && index3 > 0" width="150" :title="item3.childs[0].name"><p>{{item3.childs[0].name}}</p></td>
                              <td v-if="item3.childs && item3.childs[0].childs && index3 > 0" width="50"><p>{{item3.childs[0].childs[0].name}}</p></td>
                            </tr>
                          </template>
                          <!-- 四级菜单 -->
                          <template v-for="(item4,index4) in item3.childs">
                            <template v-if="index4 > 0">
                              <tr :key="item4.key" >
                                <td v-if="item3.childs" width="150" class="aLeft" :title="item4.name"><p>{{item4.name}}</p></td>
                                <td v-if="item4.childs && index4 > 0" width="50"><p>{{item4.childs[0].name}}</p></td>
                              </tr>
                            </template>
                            <!-- 五级菜单 -->
                            <template v-for="(item5,index5) in item4.childs">
                              <template v-if="index5 > 0">
                                <tr :key="item5.key" >
                                  <td v-if="item4.childs" width="50"><p>{{item5.name}}</p></td>
                                </tr>
                              </template>
                            </template>
                          </template>
                        </template>
                      </template>
                    </template>
                  </table>
                </el-col>
                <!-- 表数据 -->
                <el-col :span="17">
                  <table border="1" cellpadding="0" cellspacing="0" style="border:none;">
                    <tr>
                      <td v-for="(tab,index) in tableList" :key="tab.id" style="border:none;">
                        <table style="border-left:none;border-right: 1px solid #dcdfe6;" id="stepTwo">
                          <tr v-for="(item,index1) in tableItem" :key="'tab-'+index1" >
                            <!-- <td>{{tab[item] || '-'}}</td> -->
                            <td style="border-left:none;border-right:none;" :style="'height:'+(29 * item.rows)+'px'" v-if="item.show" >
                              <el-input v-if="item.show && index1 < tableListL && index1 === 0" :disabled="item.disabled" size="mini" v-filter-check-int v-model="tab[item.key]" placeholder="请输入" />
                              <el-checkbox-group v-model="tab[item.key]" :max='chechMax' v-if="item.show && index1 < tableListL && index1 > 0">
                                <el-checkbox v-for="name in item.names" :key="name" :label="name" size="mini">{{name}}</el-checkbox>
                              </el-checkbox-group>
                              <!-- <el-input v-if="item.show && index1 < tableListL" :disabled="item.disabled" size="mini" v-filter-check-int v-model="tab[item.key]" placeholder="请输入" /> -->
                              <el-input v-if="item.show && index1 == tableListL" :disabled="item.disabled" size="mini" v-filter-check-int v-model="tableListLast[index][item.key]" placeholder="请输入" />
                              <el-input v-if="item.show && index1 == (tableListL + 1)" :disabled="item.disabled" size="mini" v-filter-check-int v-model="tableListLast[index][item.key]" placeholder="" />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 第二步：购物中心竞争项目类比表 - end -->
            <!-- 第三步：填写租金测算表 - start -->
            <el-form-item label="" :required='true' v-if="step === 2">
              <!-- 竖状表格 -->
              <el-row class="three-tab">
                <!-- 表结构 -->
                <el-col :span="5">
                  <table border="1" cellpadding="0" cellspacing="0" class="tab-left">
                    <!-- 一级菜单 -->
                    <template v-for="item in leftMenu2">
                      <tr :key="item.key">
                        <template v-if="!item.hasNext">
                          <td :rowspan="item.rows" colspan="3"><p>{{item.name}}</p></td>
                        </template>
                        <template v-else>
                          <td :rowspan="item.rows" ><p>{{item.name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs" :rowspan="item.childs[0].rows" ><p>{{item.childs[0].name}}</p></td>
                          <td v-if="item.childs && item.childs[0].childs" ><p>{{item.childs[0].childs[0].name}}</p></td>
                          <td v-if="item.childs && !item.childs[0].childs" colspan="2"><p>{{item.childs[0].name}}</p></td>
                        </template>
                      </tr>
                      <!-- 二级菜单 -->
                      <template v-for="(item2,index2) in item.childs">
                        <tr :key="item2.key" v-if="index2 > 0" >
                          <template v-if="!item2.hasNext">
                            <td colspan="2" ><p>{{item2.name}}</p></td>
                          </template>
                          <template v-else>
                            <td :rowspan="item2.rows"><p>{{item2.name}}</p></td>
                            <td v-if="item2.childs && index2 > 0" ><p>{{item2.childs[0].name}}</p></td>
                          </template>
                        </tr>
                        <!-- 三级菜单 -->
                        <template v-for="(item3,index3) in item2.childs">
                          <template v-if="index3 > 0">
                            <tr :key="item3.key" >
                              <td v-if="item2.childs" ><p>{{item3.name}}</p></td>
                            </tr>
                          </template>
                        </template>
                      </template>
                    </template>
                  </table>
                </el-col>
                <!-- 表数据 -->
                <el-col :span="19">
                  <table border="1" cellpadding="0" cellspacing="0" style="border:none;">
                    <tr>
                      <td v-for="(tab,index) in tableList2" :key="index" style="border:none;">
                        <table style="border-left:none;">
                          <tr v-for="(item,index2) in tableItem2" :key="'tab-'+index2">
                            <!-- <td>{{tab[item] || '-'}}</td> -->
                            <td style="border-left:none;border-right:none;">
                              <el-input v-show="true" :disabled="(tab.type == 2 || tab.type == 3 || tab.type == 4)?true:item.disabled" size="mini" v-model="tab[item.key]" placeholder=""/>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 第三步：填写租金测算表 - end -->
          </el-form>
          <div class="footerBtn">
            <el-button class="btn" size="mini" type="info" @click="toBackPage">返回</el-button>
            <el-button v-if="step > 0" class="btn" size="mini" type="primary" @click="next(step - 1)">上一步</el-button>
            <el-button v-if="step === 0" class="btn" size="mini" type="primary" @click="next(step + 1)">下一步</el-button>
            <el-button v-if="step === 1" class="btn" size="mini" type="primary" @click="saveAnalogyList()">保存并退出</el-button>
            <el-button v-if="step === 1" class="btn" size="mini" type="primary" @click="next((step + 1),'next')">保存并下一步</el-button>
            <el-button v-if="step === 2" class="btn" size="mini" type="primary" @click="updataCalculationList()">提交</el-button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import companyContract from '@apis/companyContract'
export default {
  data() {
    return {
      analogList: [],// 物业类型
      cango: true,// 是否可以继续下一步
      form: {
        type: '',
        rent_calculation_id: "",
        input: []
      },
      step: 0,// 第一步、二三
      leftMenu: [],// 第二步 左侧菜单
      tableList: [],// 第二步 右侧数据
      tableItem: [],// 第二步 菜单中转
      leftMenu2: [],// 第三步 左侧菜单
      tableList2: [],// 第三步 右侧数据
      tableItem2: [],// 第三步 菜单中转
      typeD: false,// 编辑时，禁用下拉
      tableListLast: [],// 记录最后统计+修正率
      tableListL: 0,// 第二步 右侧数据长度 - 2
      checked: false,//打分项
      chechMin: 1,
      chechMax: 1
    }
  },
  created () {
    this.form.rent_calculation_id = this.$route.query.market_id
    this.form.type = this.$route.query.type
    if (this.$route.query.type) {
      this.typeD = true
    }
  },
  watch:{
    tableList: {
      handler(newV, oldV){
        if (newV) {
          newV.forEach((item,index) => {
            // 计算总计
            let total = 0
            for (const key in item) {
              if (key !== "id" && key !== "name" && key !== "revise" && key !== "total") {
                let val = '0'
                if (item[key] && Array.isArray(item[key]) && item[key].length > 0) {
                  val = item[key][0]
                }
                total = total + parseInt(val)
              }
            }
            // 计算修正率
            const tableListLast = this.tableListLast
            const obj = tableListLast.find(o => o.id === item.id)
            obj.total = total
            const addR = tableListLast[0].total
            if (total !== 0){
                if (index !== 0) {
                  let revise = addR / total
                  if (revise === 0) {
                    tableListLast[index].revise = ''
                  } else {
                    tableListLast[index].revise = Math.round(revise * 100) / 100
                  }
                } else {
                  tableListLast[index].revise = '/'
                }
              } else {
                tableListLast[index].revise = ''
              }
          })
        }
      },
      deep: true
    }
  },
  methods: {
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
      const res = await companyContract.create(this.form)
      if (res.code === 200) {
        
      }
    },
    // 初始化数据
    async initDate () {
      const res = await companyContract.getAnalogyType({rent_calculation_id: this.form.rent_calculation_id})
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
    // 获取第二步表头信息
    async getLeftMenuScore () {
      const leftMenu = await companyContract.getLeftMenuScore({type: this.form.type})
      if (leftMenu) {
        this.leftMenu = leftMenu
        const tableItemList = []
        console.log(leftMenu,'======leftMenu')
        leftMenu.forEach(item => {
          if (item.rows && item.rows > 1) {
            this.tableList.forEach(tab => {
              if (!tab[item.key]){
                this.$set(tab,item.key,[])
              }
            })
            let names = []
            for(let i = 0;i< item.rows;i++) {
              let name = ''
              try{
                name = item.childs[0].childs[0].childs[i].childs[0].name;
              } catch (e) {}
              names.push(name)
            }
            for(let j = 0;j< item.rows;j++) {
              let name = ''
              try{
                name = item.childs[0].childs[0].childs[j].childs[0].name;
              } catch (e) {}
              if (j === 0){
                tableItemList.push({key:item.key,rows:item.rows,show:true,disabled:item.disabled,name:name,names:names})
              }else{
                tableItemList.push({rows:item.rows,show:false,disabled:item.disabled,name:name,names:names})
              }
            }
          }else{
            tableItemList.push({key:item.key,rows:item.rows,show:true,disabled:item.disabled})
          }
        });
        this.tableItem = tableItemList
        console.log(tableItemList,'=======tableItemList')
        this.tableListL = this.tableItem.length - 2
        console.log(this.tableList,'=======tableList')
      }
    },
    // 获取第二步表数据
    async getAnalogyList () {
      const andlogyTableList = await companyContract.getAnalogyList({type: this.form.type,rent_calculation_id: this.form.rent_calculation_id})
      if (andlogyTableList.code == 200 && andlogyTableList.result) {
        this.tableList = andlogyTableList.result
        console.log(this.tableList,'this.tableList')
        if (this.tableListLast && this.tableListLast.length === 0) {
          andlogyTableList.result.forEach(item => {
            this.tableListLast.push({total: 0,revise: '',id: item.id})
          })
        }
      }
      this.getLeftMenuScore()
    },
    // 保存第二步表数据
    async saveAnalogyList (step) {
      this.form.input = JSON.stringify(this.tableList)
      this.form.last = JSON.stringify(this.tableListLast)
      let ic = 0
      this.tableList.forEach(item => {
        for(const son in item){
          if (son !== 'id' && son !=='name' && item[son]) {
            ic ++
          }
        }
      })
      if (ic === 0) {
        this.$message.error('请输入分值')
        return
      }
      this.step = step
      const saveTableList = await companyContract.saveAnalogyList(this.form)
      if (saveTableList) {
        if (step) {
          this.step = step
        }else{
          this.toBackPage()
        }
      }
    },
    // 获取第三步表头信息
    async getLeftMenuCalculation () {
      const leftMenu2 = await companyContract.getLeftMenuCalculation({type: this.form.type})
      if (leftMenu2) {
        this.leftMenu2 = leftMenu2
        const tableItemList2 = []
        leftMenu2.forEach(item => {
          if (item.childs && item.childs.length > 0){
            item.childs.forEach(item2 => {
              if (item2.childs && item2.childs.length > 0){
                item2.childs.forEach(item3 => {
                  tableItemList2.push({key:item3.key,disabled:item3.disabled})
                })
              }else{
                tableItemList2.push({key:item2.key,disabled:item2.disabled})
              }
            })
          }else{
            tableItemList2.push({key:item.key,disabled:item.disabled})
          }
        });
        this.tableItem2 = tableItemList2
      }
    },
    // 获取第三步表数据
    async getCalculationList () {
      const tableList2 = await companyContract.getCalculationList({type: this.form.type,rent_calculation_id: this.form.rent_calculation_id})
      if (tableList2.code == 200 && tableList2.result) {
        this.tableList2 = tableList2.result
      }
    },
    // 保存第三步表数据
    async updataCalculationList () {
      const saveTableList2 = await companyContract.updataCalculationList({input: JSON.stringify(this.tableList2),type: this.form.type,rent_calculation_id: this.form.rent_calculation_id})
      if (saveTableList2) {
        this.$router.go(-1)
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
      if (step === 0){
        this.step = step
      }
      if (step === 1){
        this.step = step
        this.getAnalogyList()
        
      }
      if (step === 2 && next && next === 'next'){
        this.saveAnalogyList(step)
        this.getLeftMenuCalculation()
        this.getCalculationList()
      }
    },
    // 返回上一页
    toBackPage () {
      this.$router.go(-1)
    },
  },
  mounted () {
    this.initDate()
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
td {
  line-height: normal;
  height: 28px;

  div {
    line-height: 28px;
    height: 28px;
  }
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
/deep/ .el-checkbox__label {
  min-width: 2em;
}
td /deep/ .el-checkbox-group {
  line-height: unset;
  height: 100%;
  display: grid;
  display: inline-grid;
}
/deep/ .el-checkbox {
  margin-right: 0;
}
.aLeft{
  text-align: left;
}
#stepTwo td {
  border-top: 1px solid #dcdfe6!important;
}
@import '~@styles/common.scss'
</style>
