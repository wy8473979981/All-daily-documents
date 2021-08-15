<template>
  <!-- 注册资本金支出审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col right-col">
        <h2>付款信息</h2>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>操作类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.operateType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.operateType">
              <el-radio class="line-radio" :label="'1'">总部</el-radio>
              <el-radio class="line-radio" :label="'2'">事业部</el-radio>
              <el-radio class="line-radio" :label="'3'">城市公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.creaseType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.creaseType">
              <el-radio class="line-radio" :label="'1'">增资</el-radio>
              <el-radio class="line-radio" :label="'2'">减资</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="right-col">
        <div class="d-min">
          <span>是否内部公司</span>
          <div>
<el-checkbox v-model="form.bizEntityJson.internalCompany" true-label="0" false-label="1" @change='internalCompanyChange'>是</el-checkbox>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
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

      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位全称</span>
          <el-select v-if='form.bizEntityJson.internalCompany == 0'
              popper-class="select-header"
              :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.receiveUnitName"
              filterable
              remote
              clearable
              @change="receiveUnitNameChange"
              :remote-method="receiveUnitRemoteMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in receiveCompaniesOptions"
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
                    <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款单位开户银行</span>
          <el-select  v-model="form.bizEntityJson.payBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="payBankNameChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions"
                :key="index"
                :label="item.bankName"
                :value="item.bankName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位开户银行</span>
          <el-select v-if='form.bizEntityJson.internalCompany == 0' :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in receiveBankInfoOptions"
                :key="index"
                :label="item.bankName"
                :value="item.bankName">
            </el-option>
          </el-select>
                    <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款单位帐号</span>
          <el-select  v-model="form.bizEntityJson.payAccount" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="payBankAccountChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions"
                :key="index"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位帐号</span>
          <el-select v-if='form.bizEntityJson.internalCompany == 0' :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankAccountChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in receiveBankInfoOptions"
                :key="index"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
                    <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>出资（或增资）金额（元）（小写）</span>
          <el-input v-if="payAmtSmallDesc" :value="payAmtSmallDesc"></el-input>
          <el-input v-else  :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min"  style="height: 72px;">
          <span>(大写)</span>
          <el-input v-if="payAmtCapitalDesc" :value="payAmtCapitalDesc" :readonly="true"></el-input>
          <el-input v-else v-model="form.bizEntityJson.payAmtCapitalDesc" :readonly="true"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
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
      receiveCompaniesOptions: [],
      receiveBankInfoOptions: [],
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
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'internalCompany', '1')
    }
    if (this.$route.query.id) {
            if (this.form.status != '草稿') {
                this.payAmtSmallDesc = (parseFloat(this.form.bizEntityJson.payAmtSmallDesc).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
            } 

        this.payAmtCapitalDesc = this.form.bizEntityJson.payAmtCapitalDesc
    }
 if (this.$route.query.id && !this.form.bizEntityJson.disabled && this.form.bizEntityJson.payDeptName){
      this.$approval.loadBankInfo(this.form.bizEntityJson.payDeptName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
        }
      })
    }
 if (this.$route.query.id && !this.form.bizEntityJson.disabled && this.form.bizEntityJson.receiveUnitName){
      this.$approval.loadBankInfo(this.form.bizEntityJson.receiveUnitName).then(res => {
        if(res.code == 1 && res.data) {
          this.receiveBankInfoOptions = res.data
        }
      })
    }
  },
  methods: {

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
    receiveUnitRemoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.loadCompanies(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.receiveCompaniesOptions = res.data
              this.receiveCompaniesOptions.unshift({bukrs: '公司代码', companyName: '公司名称'})
            } else {
              this.receiveCompaniesOptions = []
            }
          }
        })
      } else {
        this.receiveCompaniesOptions = []
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
    receiveUnitNameChange(val) {
      console.log(val)
      if (!val) {
        this.$set(this.form.bizEntityJson, 'receiveUnitName', '')
        this.$set(this.form.bizEntityJson, 'receiveUnitCd', '')
        this.receiveBankInfoOptions = []
        this.$set(this.form.bizEntityJson, 'receiveBankName', '')
        this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
      } else {
        if (this.form.bizEntityJson.receiveUnitName && this.receiveCompaniesOptions.length > 0) {
          let obj = this.receiveCompaniesOptions.find(item => item.companyName == this.form.bizEntityJson.receiveUnitName)
          this.$set(this.form.bizEntityJson, 'receiveUnitName', obj.companyName)
          this.$set(this.form.bizEntityJson, 'receiveUnitCd', obj.bukrs)
          var companyName = obj ? obj.companyName : ''
          if(companyName != ''){
               this.loadReceiveBankInfo(companyName)
          } else {
              this.$set(this.form.bizEntityJson, 'receiveBankName', ''),
              this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
          }
        }
      }
    },
    receiveBankNameChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.bankName == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
      this.form.bizEntityJson.sysBankCode = obj ? obj.linesNumber : ''
      var linesNumber = obj ? obj.linesNumber : ''
      if(val != '现金' && val != '虚拟银行（CNY）'){
          if(!linesNumber){
            this.$confirm('该银行未维护联行号信息,请联系财务维护联行号,否则将影响支付!')
          }
        }
    },
    receiveBankAccountChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.account == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
      this.form.bizEntityJson.sysBankCode = obj ? obj.linesNumber : ''
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
    loadReceiveBankInfo(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.receiveBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'receiveBankName', ''),
          this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
      this.payAmtCapitalDesc = this.convertCurrency(val)
    },
    internalCompanyChange(val){
        this.$set(this.form.bizEntityJson, 'receiveUnitName', '')
        this.$set(this.form.bizEntityJson, 'receiveUnitCd', '')
        this.receiveBankInfoOptions = []
        this.$set(this.form.bizEntityJson, 'receiveBankName', '')
        this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
    },
    async yykCheck() {
        var isGo = true
        if(this.form.bizEntityJson.internalCompany == '0'){
            //内部单位-收款单统一挂现金流：上市调拨流入/上市与非上市调拨流入
            //        付款单统一挂现金流：上市调拨流出/上市与非上市调拨流出
            var payDeptName = this.form.bizEntityJson.payDeptName;
            var receiveUnitName = this.form.bizEntityJson.receiveUnitName;
            if (payDeptName !=null && payDeptName!="" && receiveUnitName !=null && receiveUnitName!="") {
                const param = {
                  payDeptName:payDeptName,
                  receiveUnitName:receiveUnitName
                }
                await this.$approval.findParallelTableByCompanyName(param).then(res => {
                  if(res.code == 1) {
                    if(res.data != null){
                      if(res.data == 'true'){
                        this.$set(this.form.bizEntityJson, 'subjectId', '4')
                      } else {
                        this.$set(this.form.bizEntityJson, 'subjectId', '3')
                      }
                    }
                  }
                })
            }else {
                this.$message.error('付款单位全称/收款单位全称为空')
                isGo = false
            }
        }else {
            //外部单位-增资：仅生成付款单；挂现金流-股权投资款
            if(this.form.bizEntityJson.creaseType == '1'){
                this.$set(this.form.bizEntityJson, 'subjectId', '1')
            }
            //减资：仅生成收款单；挂现金流-收回股权投资款
            if(this.form.bizEntityJson.creaseType == '2'){
                this.$set(this.form.bizEntityJson, 'subjectId', '2')
            }
        }
        if(!isGo){
          return false
        }
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.operateType) return this.$message.error('请选择操作类型'), false
      if(!this.form.bizEntityJson.creaseType) return this.$message.error('请选择资本类型'), false
      if(!this.form.bizEntityJson.payDeptName) return this.$message.error('请选择付款单位名称'), false
      if(!this.form.bizEntityJson.receiveUnitName) return this.$message.error('请选择收款单位名称'), false
      if(!this.form.bizEntityJson.receiveBankName) return this.$message.error('请选择收款单位开户银行'), false
      if(!this.form.bizEntityJson.receiveAccountNo) return this.$message.error('请选择收款单位账号'), false
      if(!this.form.bizEntityJson.payAmtSmallDesc) return this.$message.error('请输入出资（或增资）金额'), false
      if(!this.form.bizEntityJson.payContentDesc) return this.$message.error('付款事由不能为空'), false
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>