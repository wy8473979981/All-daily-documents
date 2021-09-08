<template>
  <!-- 缴纳税费审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>类型</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" v-if="form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'">
            <dl-col :span="24" >
              <el-radio-group v-model="form.bizEntityJson.comparyType">
                <el-radio class="line-radio" :label="'1'">总部</el-radio>
                <el-radio class="line-radio" :label="'2'">事业部</el-radio> 
                <el-radio class="line-radio" :label="'3'">城市公司</el-radio>
                <el-radio class="line-radio" :label="'4'">规划设计研究院</el-radio>
                <el-radio class="line-radio" :label="'5'">直销公司</el-radio>
                <el-radio class="line-radio" :label="'6'">宝龙公益基金会</el-radio>
              </el-radio-group>
            </dl-col>
          </div>
          <div class="d-min" v-else >
              <dl-col :span="24">
                <el-radio-group v-model="form.bizEntityJson.areaType" @change="areaTypeChange">
                  <el-radio class="line-radio" :label="'1'">地产</el-radio>
                  <el-radio class="line-radio" :label="'2'">酒店</el-radio>
                </el-radio-group>
              </dl-col>
              <dl-col :span="24" v-if="form.bizEntityJson.areaType == '1'">
                <el-radio-group v-model="form.bizEntityJson.operateType">
                  <el-radio class="line-radio" :label="'1'">总部</el-radio>
                  <el-radio class="line-radio" :label="'2'">事业部</el-radio>
                  <el-radio class="line-radio" :label="'3'">城市公司</el-radio>
                </el-radio-group>
              </dl-col>
              <dl-col :span="24" v-if="form.bizEntityJson.areaType == '2'">
                <el-radio-group v-model="form.bizEntityJson.hotelType" @change="hotelTypeChange">
                  <el-radio class="line-radio" :label="'1'">酒店总部</el-radio>
                  <el-radio class="line-radio" :label="'2'">租赁公司</el-radio>
                  <el-radio class="line-radio" :label="'3'">自营酒店</el-radio>
                  <el-radio class="line-radio" :label="'4'">委托酒店</el-radio>
                </el-radio-group>
              </dl-col>
              <dl-col :span="24" 
                v-if="form.bizEntityJson.hotelType == '1' || 
                  form.bizEntityJson.hotelType == '2' || 
                  form.bizEntityJson.hotelType == '3' ||
                  form.bizEntityJson.hotelType == '4'">
                <el-radio-group v-model="form.bizEntityJson.entrustHotelType" >
                  <el-radio class="line-radio" :label="'1'">企业所得税</el-radio>
                  <el-radio class="line-radio" :label="'2'">其他税费</el-radio>
                </el-radio-group>
              </dl-col>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>付款信息</h2>
      </el-col>
      <el-col :span="24">
        <div class="d-min">
          <span>付款单位全称</span>
          <el-select
              popper-class="select-header"
              :class="{'novalue': !form.bizEntityJson.payDeptName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.payDeptName"
              filterable
              remote
              clearable
              @change="payDeptNameChange"
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payCompaniesOptions"
                :key="index"
                :label="item.companyName"
                :value="item.companyName">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <span>{{ item.bukrs }}</span>
                        </el-col>
                        <el-col :span="18">
                            <span>{{ item.companyName }}</span>
                        </el-col>
                    </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="d-min">
          <span>付款单位开户银行</span>
         <el-select :class="{'novalue': !form.bizEntityJson.payBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="payBankNameChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions"
                :key="index"
                :label="item.bankName"
                :value="item.bankName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="d-min">
          <span>付款单位帐号</span>
          <el-select :class="{'novalue': !form.bizEntityJson.payAccount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAccount" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="payBankAccountChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions"
                :key="index"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <el-row v-if="form.bizEntityJson.disabled && $route.query.id && form.status != '草稿'" class="padding-row">
            <el-col :span="24" class="title-col topRight-col">
                <h2>付款会计信息</h2>
            </el-col>
            <dl-col :span="24" title="业务类型">
            <el-input v-model="form.bizEntityJson.businessType" readonly></el-input>
          </dl-col>
        </el-row>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>其他信息</h2>
      </el-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.ftpeDetails" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="税种分类" prop="taxCategory" align="center">
            <template slot-scope="scope">
              <el-select :readonly="!form.bizEntityJson.sceneConfigId ? true : false" :class="{'novalue': !scope.row.taxCategory, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.taxCategory" :disabled="form.bizEntityJson.disabled || form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'">
                <span v-if="form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'">
                  <el-option label="个税" value="4" ></el-option>
                </span>
                <span v-else>
                  <el-option label="销售物业" value="1"></el-option>
                  <el-option label="自持物业" value="2"></el-option>
                  <el-option label="其他" value="3"></el-option>
                </span>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="税种" prop="taxType" align="center">
            <template slot-scope="scope">
              <el-select :readonly="!form.bizEntityJson.sceneConfigId ? true : false" :class="{'novalue': !scope.row.taxType, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.taxType" :disabled="form.bizEntityJson.disabled || form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'">
                <span v-if="form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'">
                  <el-option label="代扣代缴" value="22" ></el-option>
                </span>
                <span v-else>
                  <el-option label="申报缴纳增值税(一般计税)" value="1"></el-option>
                  <el-option label="申报缴纳增值税(简易计税)" value="16"></el-option>
                  <el-option label="预缴增值税" value="2"></el-option>
                  <el-option label="企业所得税" value="3"></el-option>
                  <el-option label="土地增值税" value="4"></el-option>
                  <el-option label="城市维护建设税" value="5"></el-option>
                  <el-option label="房产税" value="6"></el-option>
                  <el-option label="土地使用税" value="7"></el-option>
                  <el-option label="车船使用税" value="8"></el-option>
                  <el-option label="印花税" value="9"></el-option>
                  <el-option label="教育费附加" value="10"></el-option>
                  <el-option label="地方教育费附加" value="11"></el-option>
                  <el-option label="水利基金" value="13"></el-option>
                  <el-option label="环境保护税" value="17"></el-option>
                  <el-option label="罚款、滞纳金" value="18"></el-option>
                  <el-option label="代扣代缴增值税、企业所得税等" value="23"></el-option>
                  <el-option label="其他" value="14"></el-option>
                </span>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="所属期间" align="center">
            <el-table-column label="开始" prop="startYm" align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.startYm" type= "month" value-format="yyyy-MM" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
              </template>
            </el-table-column>
            <el-table-column label="结束" prop="endYm" align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.endYm" type= "month" value-format="yyyy-MM" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="付款金额" prop="payAmtSmallDesc" align="center">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.payAmtSmallDesc"  maxlength="15" v-limit-number="2" @blur="toFixedBlur" 
 :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @change="payAmtSmallDescSum(scope.$index, $event)"/>
            </template>
          </el-table-column>
          <el-table-column label="" width="200" >
            <template slot-scope="scope"  v-if="form.status == '草稿' || form.status == 'A'">
              <el-button v-if="!form.bizEntityJson.disabled && scope.$index == 0" type="text" size="mini" style="margin-left: 0;" @click="addList">添加</el-button>
              <el-button v-if="!form.bizEntityJson.disabled && scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
      <dl-col  :span="24">
      <el-col :span="12">
        <div class="d-min">
          <span>合计（小写）：元</span>
          <el-input v-if="payAmtSmallDesc" :value="payAmtSmallDesc" :readonly="true"></el-input>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" v-filter-check-number :readonly="true" @change="payAmtSmallDescChange" ></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>(大写)</span>
          <el-input v-if="payAmtCapitalDesc" :value="payAmtCapitalDesc" :readonly="true"></el-input>
          <el-input v-else v-model="form.bizEntityJson.payAmtCapitalDesc" :readonly="true"></el-input>
        </div>
      </el-col>
      </dl-col>
    </el-row>
  </div>
</template>

<script>
import Approval from "@/apis/apis/approval";

export default {
  data() {
    return {
      form: {},
      disabled: true,
      loading: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      payAmtSmallDesc:'',
      payAmtCapitalDesc:''
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {
console.log(this.form.status)
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
    }
    if(!this.form.bizEntityJson.sceneConfigId){
      var sceneConfigId = this.$route.query.costBxSceneConfigId
      console.log(sceneConfigId)
      this.$set(this.form.bizEntityJson, 'sceneConfigId', sceneConfigId)
    }
    // table建立数组
    if(this.form.bizEntityJson.ftpeDetails === undefined){
      this.$set(this.form.bizEntityJson, 'ftpeDetails', [])
      this.addList()
    }
    if (this.$route.query.id) {
            if (this.form.status != '草稿' && this.form.bizEntityJson.ftpeDetails.length > 0) {
              for (let key in this.form.bizEntityJson.ftpeDetails) {
               var tempPayAmtSmallDesc = this.form.bizEntityJson.ftpeDetails[key].payAmtSmallDesc
                this.form.bizEntityJson.ftpeDetails[key].payAmtSmallDesc = Number(tempPayAmtSmallDesc).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
              }
            }
    if(this.form.bizEntityJson.payAmtSmallDesc){
                    this.payAmtSmallDesc = (parseFloat(this.form.bizEntityJson.payAmtSmallDesc).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }

                this.payAmtCapitalDesc = this.form.bizEntityJson.payAmtCapitalDesc
    }
      if (this.form.bizEntityJson.disabled) {
        this.findBusinessType()
      }
 if (this.$route.query.id && !this.form.bizEntityJson.disabled && this.form.bizEntityJson.payDeptName){
      this.$approval.loadBankInfo(this.form.bizEntityJson.payDeptName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
        }
      })
    }
  },
  methods: {
  findBusinessType() {
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'FKGL_WLK_30'
      }
      this.$approval.getFieldsByAuthTypeCd(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'businessType', res.data.businessType)
          } else {
            this.$set(this.form.bizEntityJson, 'businessType', '')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    //付款调下拉接口
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.loadCompanies(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.payCompaniesOptions = res.data
              this.payCompaniesOptions.unshift({bukrs: '公司代码', companyName: '公司名称'})
            } else {
              this.payCompaniesOptions = []
            }
          }
        })
      } else {
        this.payCompaniesOptions = []
      }
    },
    payBankNameChange(val){
      let obj = this.payBankInfoOptions.find(item => item.bankName == val)
      this.form.bizEntityJson.payBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.payAccount = obj ? obj.account : ''
    },
    payBankAccountChange(val){
      let obj = this.payBankInfoOptions.find(item => item.account == val)
      this.form.bizEntityJson.payBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.payAccount = obj ? obj.account : ''
    },
    payDeptNameChange(val) {
      console.log(val)
      if (!val) {
        this.$set(this.form.bizEntityJson, 'payDeptName', '')
        this.$set(this.form.bizEntityJson, 'payDeptNameCode', '')
        this.payBankInfoOptions = []
        this.$set(this.form.bizEntityJson, 'payBankName', '')
        this.$set(this.form.bizEntityJson, 'payAccount', '')
      } else {
        if (this.form.bizEntityJson.payDeptName && this.payCompaniesOptions.length > 0) {
          let obj = this.payCompaniesOptions.find(item => item.companyName == this.form.bizEntityJson.payDeptName)
          this.$set(this.form.bizEntityJson, 'payDeptName', obj.companyName)
          this.$set(this.form.bizEntityJson, 'payDeptNameCode', obj.bukrs)
          var companyName = obj ? obj.companyName : ''
          if(companyName != ''){
               this.loadPayBankInfo(companyName)
          } else {
              this.$set(this.form.bizEntityJson, 'payBankName', ''),
              this.$set(this.form.bizEntityJson, 'payAccount', '')
          }
        }
      }
    },
    loadPayBankInfo(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'payBankName', ''), 
          this.$set(this.form.bizEntityJson, 'payAccount', '')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 添加table行数据
    addList() {
    let newData = {};
    if(this.form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A31' || 
              this.form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A33' ||
              this.form.bizEntityJson.sceneConfigId == '76FE93DF23839BB9E0530D03FB0A9A32' ||
              this.form.bizEntityJson.sceneConfigId == '8DC4CB18DFB7ACA8E0530D03FB0A3BAF'){
      newData = {
        taxCategory: '4',
        taxType: '22',
        startYm: '',
        endYm: '',
        payAmtSmallDesc: '',
        //cashFlowTaxType: '',
      }
    } else {
      newData = {
        taxCategory: '1',
        taxType: '',
        startYm: '',
        endYm: '',
        payAmtSmallDesc: '',
        //cashFlowTaxType: '',
      }
    }

      this.form.bizEntityJson.ftpeDetails.push(newData)
    },
    // 删除
    remove(index) {
      if (this.form.bizEntityJson.ftpeDetails.length > 0) {
        this.payAmtSmallDescSum(index,0)
        this.form.bizEntityJson.ftpeDetails.splice(index, 1)
      }
    },
    // 计算
    payAmtSmallDescSum(index, val) {
      this.form.bizEntityJson.ftpeDetails[index].payAmtSmallDesc = val
      let sum = 0
      for (let key in this.form.bizEntityJson.ftpeDetails) {
        sum += Number(this.form.bizEntityJson.ftpeDetails[key].payAmtSmallDesc)
      }
      this.$set(this.form.bizEntityJson, 'payAmtSmallDesc', sum)
      this.payAmtSmallDesc = sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      this.payAmtSmallDescChange(sum)
    },
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
      this.payAmtCapitalDesc = this.convertCurrency(val)
    },
    areaTypeChange(val) {
      this.$set(this.form.bizEntityJson,'operateType',false)
      this.$set(this.form.bizEntityJson,'hotelType',false)
      this.$set(this.form.bizEntityJson,'entrustHotelType',false)
    },
    hotelTypeChange(val) {
      this.$set(this.form.bizEntityJson,'entrustHotelType',false)
    },
    // 必填判断
    validate() {
      if(this.form.bizEntityJson.sceneConfigId){
            if(!this.form.bizEntityJson.comparyType) return this.$message.error('请选择类型'), false
        } else {
          if(!this.form.bizEntityJson.areaType) return this.$message.error('请选择类型'), false
          if(this.form.bizEntityJson.areaType == '1'){
            if(!this.form.bizEntityJson.operateType) return this.$message.error('请选择类型'), false
          } else if(this.form.bizEntityJson.areaType == '2'){
            if(!this.form.bizEntityJson.hotelType) return this.$message.error('请选择类型'), false
            if(this.form.bizEntityJson.hotelType){
              if(!this.form.bizEntityJson.entrustHotelType) return this.$message.error('请选择类型'), false
            }
          }
        }
      if(!this.form.bizEntityJson.payDeptName) return this.$message.error('请选择付款单位名称'), false
      if(!this.form.bizEntityJson.payBankName) return this.$message.error('请选择付款单位开户银行'), false
      if(!this.form.bizEntityJson.payContentDesc) return this.$message.error('付款事由不能为空'), false
      if(!this.form.bizEntityJson.payAmtSmallDesc) return this.$message.error('付款金额不能为空'), false
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>