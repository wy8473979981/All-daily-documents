<template>
<div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col topRight-col">
        <h2>类别选择</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.areaType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.areaType">
              <el-radio class="line-radio" :label="'1'">上划事业部</el-radio>
              <el-radio class="line-radio" :label="'2'">事业部下拨</el-radio>
              <el-radio class="line-radio" :label="'3'">上划地产总部</el-radio>
              <el-radio class="line-radio" :label="'4'">地产总部下拨</el-radio>
              <el-radio class="line-radio" :label="'5'">地产主动上划及下拨</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      </el-row>
      <el-row class="padding-row">
      <el-col :span="24" class="title-col right-col">
        <h2>付款信息</h2>
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
              @visible-change="payDeptNameChange2"
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
          <el-select
              popper-class="select-header"
              :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.receiveUnitName"
              filterable
              remote
              clearable
              @change="receiveUnitNameChange"
              @visible-change="receiveUnitNameChange2"
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
        </div>
      </el-col>
      <el-col :span="12">
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
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位开户银行</span>
          <el-select :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in receiveBankInfoOptions"
                :key="index"
                :label="item.bankName"
                :value="item.bankName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
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
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位帐号</span>
          <el-select :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankAccountChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in receiveBankInfoOptions"
                :key="index"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款金额(元)(小写)</span>
          <el-input v-if="payAmtSmallDesc" :value="payAmtSmallDesc"></el-input>
          <el-input v-else  :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>(大写)</span>
          <el-input v-model="form.bizEntityJson.payAmtCapitalDesc" readonly :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.disabled && $route.query.id && form.status != '草稿'" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>付款会计信息</h2>
        </el-col>

        <dl-col :span="12" title="业务类型">
        <el-input v-model="form.bizEntityJson.businessType" readonly></el-input>
      </dl-col>

         <dl-col :span="6">
            <d-radio-group-string v-if="false"
            v-model="form.bizEntityJson" 
            :nameList="[{label:'已提交全额发票',name:'isAllInvoice'}
                        ]"
            />
        </dl-col>

        <dl-col :span="6" title="缺票金额"  v-if="form.bizEntityJson.isAllInvoice != 'true'">
            <el-input v-model="form.bizEntityJson.missingTicketAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

  <dl-col :span="6" v-else>

        </dl-col>

    </el-row>

    <el-row v-if="form.bizEntityJson.disabled && form.bizEntityJson.area2!='true' &&$route.query.id && form.status != '草稿'" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>收款会计信息</h2>
        </el-col>

         <dl-col :span="12" title="业务类型">
        <el-input v-model="form.bizEntityJson.businessTypeReceipt" readonly></el-input>
      </dl-col>

         <dl-col :span="6" >
            <d-radio-group-string v-if="false"
            v-model="form.bizEntityJson" 
            :nameList="[{label:'已提交全额发票',name:'isAllInvoiceReceipt'}
                        ]"
            />
        </dl-col>

        <dl-col :span="6" title="缺票金额" v-if="form.bizEntityJson.isAllInvoiceReceipt != 'true'">
          <el-input v-model="form.bizEntityJson.missingTicketAmountReceipt" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="6" v-else class="right-col">

        </dl-col>


    </el-row>
    <el-row>
      <el-col :span="24" class="title-col right-col">
        <h2>评审资料</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>凭证号码</span>
          <el-input v-model="form.bizEntityJson.voucherNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>报销单编号</span>
          <el-input v-model="form.bizEntityJson.expenseAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <dl-col v-if="form.bizEntityJson.relatedFundsFlg == 0" :span="12" title="关联资金申请">
          <el-input v-model="form.bizEntityJson.resDisplayNo" readonly></el-input>
      </dl-col>

        <dl-col v-else :span="12" title="关联资金申请" :novalue="!form.bizEntityJson.resDisplayNo">
            <el-select
            v-if="!form.bizEntityJson.disabled"
            :class="{'novalue': !form.bizEntityJson.resDisplayNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.resDisplayNo"
            filterable
            remote
            clearable
            @change="resDisplayNoChange"
            :remote-method="findResUserCd"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in findResUserCdResult"
                :key="item.approveNo"
                :label="item.approveNo"
                :value="item.approveNo">
                <el-row :gutter="24">
                  <el-col :span="6">
                    <span>{{ item.approveNo}}</span>
                  </el-col>
                  <el-col :span="18">
                    <span>{{ item.processName}}</span>
                  </el-col>
                </el-row>
            </el-option>
             </el-select>
             <p v-else class="openUrl-p" @click="openUrl">{{ form.bizEntityJson.resDisplayNo }}</p>
        </dl-col>

        <dl-col :span="12" title="关联资金申请" place="right">
            <el-checkbox
            v-model="form.bizEntityJson.relatedFundsFlg" 
            true-label="0" false-label="1" @change="relatedFundsFlgChange"
            >不关联资金申请</el-checkbox>
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
      receiveCompaniesOptions: [],
      receiveBankInfoOptions: [],
      findResUserCdResult:[],
      payAmtSmallDesc:''
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
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'relatedFundsFlg', '1')
    }
    if (this.$route.query.id) {
            if (this.form.status != '草稿') {
                this.payAmtSmallDesc = (parseFloat(this.form.bizEntityJson.payAmtSmallDesc).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
            }
      this.findBusinessType()
      this.$set(this.form.bizEntityJson, 'isAllInvoice', 'true')
      this.$set(this.form.bizEntityJson, 'isAllInvoiceReceipt', 'true')
    }
  },
  methods: {
    findBusinessType() {
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'FK_WLK_12'
      }
      this.$approval.getFieldsByAuthTypeCd(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'businessType', res.data.businessType)
            this.$set(this.form.bizEntityJson, 'businessTypeReceipt', res.data.financialBusinessType)
          } else {
            this.$set(this.form.bizEntityJson, 'businessType', '')
            this.$set(this.form.bizEntityJson, 'businessTypeReceipt', '')
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
    //收款调下拉接口
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
    findResUserCd(query) {
      if (query) {
        this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
        const param = {
          createdUserId: this.userInfo.userid,
          approveNo: query,
          processCode: 'FKGL_250',
          status: '2'
        }
        this.loading = true
        this.$approval.findEsApprove(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.content.length > 0) {
              this.findResUserCdResult = res.data.content
            } else {
              this.findResUserCdResult = []
            }
          }
        })
      } else {
        this.findResUserCdResult = []
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
      }
    },
    payDeptNameChange2(val) {
      if (!val) {
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
      } else {
        if (this.form.bizEntityJson.payDeptName && !this.payCompaniesOptions[0]) {
          this.remoteMethod(this.form.bizEntityJson.payDeptName)
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
      }
    },
    receiveUnitNameChange2(val) {
      if (!val) {
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
      } else {
        if (this.form.bizEntityJson.receiveUnitName && !this.receiveCompaniesOptions[0]) {
          this.receiveUnitRemoteMethod(this.form.bizEntityJson.receiveUnitName)
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
    },
    relatedFundsFlgChange(){
        this.$set(this.form.bizEntityJson, 'resDisplayNo', '')
    },
    resDisplayNoChange(val) {
      let obj = this.findResUserCdResult.find(item => item.approveNo == val)
      this.$set(this.form.bizEntityJson, 'adjustApproveId', obj ? obj.approveId : '')
      this.$set(this.form.bizEntityJson, 'adjustProcessId', obj ? obj.processId : '')
    },
    openUrl() {
      if (window.location.href.search(/resdev/) != -1) {
        if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
          this.$message.closeAll()
          this.$message.error('无对应老网批环境')
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else if (window.location.href.search(/resdemo/) != -1) {
        if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
          window.open(`http://demo.powerlong.com/PowerDesk/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else {
        if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
          window.open(`http://pd.powerlong.com/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      }
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.areaType) return this.$message.error('类别选择不可为空'), false
      if(!this.form.bizEntityJson.payDeptName) return this.$message.error('请选择付款单位名称'), false
      if(!this.form.bizEntityJson.receiveUnitName) return this.$message.error('请选择收款单位名称'), false
      if(!this.form.bizEntityJson.payBankName) return this.$message.error('请选择付款单位开户银行名称'), false
      if(!this.form.bizEntityJson.payAccount) return this.$message.error('请选择付款单位帐号'), false
      if(!this.form.bizEntityJson.receiveBankName) return this.$message.error('请选择收款单位开户银行名称'), false
      if(!this.form.bizEntityJson.receiveAccountNo) return this.$message.error('请选择收款单位帐号'), false
      if(!this.form.bizEntityJson.payAmtSmallDesc) return this.$message.error('请输入付款金额'), false
      if(this.form.bizEntityJson.payAmtCapitalDesc == '零元整') {
        return this.$message.error('付款金额必须大于0'), false
      }
      if(this.form.bizEntityJson.relatedFundsFlg == 1) {
        if(!this.form.bizEntityJson.resDisplayNo) return this.$message.error('请选择关联资金申请号'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>