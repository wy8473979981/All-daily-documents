<template>
  <!-- 支付利息审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col topRight-col">
        <h2>选择</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.applyType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.applyType">
              <el-radio class="line-radio" :label="'1'">资金管理中心</el-radio>
              <el-radio class="line-radio" :label="'2'">事业部</el-radio>
              <el-radio class="line-radio" :label="'3'">城市公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
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
          <el-input v-if="!form.bizEntityJson.isBorrow" v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <el-select
              v-else
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
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款单位开户银行</span>
          <el-select v-model="form.bizEntityJson.payBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="payBankNameChange" :disabled="form.bizEntityJson.disabled">
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
          <el-input v-if="!form.bizEntityJson.isBorrow" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <el-select v-else v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions2"
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
          <el-select v-model="form.bizEntityJson.payAccount" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="payBankAccountChange" :disabled="form.bizEntityJson.disabled">
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
          <el-input v-if="!form.bizEntityJson.isBorrow" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <el-select v-else v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in payBankInfoOptions2"
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
          <el-input v-if="this.$route.query.id && form.status != '草稿'" :value="(parseFloat(form.bizEntityJson.payAmtSmallDesc).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>(大写)</span>
          <el-input v-model="form.bizEntityJson.payAmtCapitalDesc" readonly :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>其中资本化</span>
          <el-input v-if="this.$route.query.id && form.status != '草稿'" :value="(parseFloat(form.bizEntityJson.zbhAmount).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.zbhAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.zbhAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur"  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
       <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>费用化</span>
          <el-input v-if="this.$route.query.id && form.status != '草稿'" :value="(parseFloat(form.bizEntityJson.fyhAmount).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.fyhAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fyhAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>           
      <el-col :span="12">
        <div class="d-min">
          <span>支付类型</span>
          <el-select :class="{'novalue': !form.bizEntityJson.selectType1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.selectType1" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="支付" value="1"></el-option>
            <el-option label="计提并支付" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>利息类型</span>
          <el-select :class="{'novalue': !form.bizEntityJson.selectType2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.selectType2" @change="selectType2Change" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="债券利息" value="1"></el-option>
            <el-option label="银行利息" value="2"></el-option>
            <el-option label="统借统还利息" value="3"></el-option>
            <el-option label="合作方股东借款利息" value="5"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="$route.query.id && form.status != '草稿' && form.status != '驳回'">
      <el-col :span="24" class="title-col right-col" >
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>业务类型</span>
           <el-input v-model="form.bizEntityJson.businessTypeName" readonly></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="title-col right-col">
        <h2>其它信息</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red">
            <el-checkbox v-model="form.bizEntityJson.isBorrow" @change="isBorrowChange">是否内部统借统还</el-checkbox>
          </div>
        </div>
      </el-col>
      <div v-for="(item, index) in form.bizEntityJson.contractNoList" :key="index">
        <el-col :span="12">
          <div class="d-min">
            <span>融资合同编号</span>
            <el-select
                v-if="form.bizEntityJson.isBorrow"
                v-model="item.contractNo"
                filterable
                remote
                clearable
                @change="contNoChange(index, $event)"
                :remote-method="contractNoRemoteMethod"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
              <el-option
                  v-for="(item, index) in contractNoOptions"
                  :key="index"
                  :label="item.contNo"
                  :value="item.contNo">
              </el-option>
            </el-select>
            <el-select
                v-else
                :class="{'novalue': !item.contractNo, 'required': !form.bizEntityJson.disabled}"
                v-model="item.contractNo"
                filterable
                remote
                clearable
                @change="contNoChange(index, $event)"
                :remote-method="contractNoRemoteMethod"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
              <el-option
                  v-for="(item, index) in contractNoOptions"
                  :key="index"
                  :label="item.contNo"
                  :value="item.contNo">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one">
              <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="add">添加</span>
              <span v-if="!form.bizEntityJson.disabled && index != 0" class="explain-btn-del" @click="del(index)">删除</span>
            </p>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      disabled: true,
      loading: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      payBankInfoOptions2: [],
      receiveCompaniesOptions: [],
      contractNoOptions: [],
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
      this.$set(this.form.bizEntityJson, 'isBorrow', false)
      this.$set(this.form.bizEntityJson, 'contractNoList', [])
      this.add()
    }
    if (this.$route.query.id && !this.form.bizEntityJson.disabled && this.form.bizEntityJson.payDeptName){
      this.$approval.loadBankInfo(this.form.bizEntityJson.payDeptName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
        }
      })
    }
    if (this.$route.query.id && this.form.status != '草稿') {
      if (this.form.bizEntityJson.isAllInvoice === null) {
        this.form.bizEntityJson.isAllInvoice = 'true'
      }
    }
  },
  methods: {
    add() {
      const newData = {
        contractNo: '',
        contractId: ''
      }
      this.form.bizEntityJson.contractNoList.push(newData)
    },
    del(index) {
      this.form.bizEntityJson.contractNoList.splice(index, 1)
    },
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
    contractNoRemoteMethod(query){
      if (query) {
        this.loading = true
        this.$approval.getFinLoanCont(this.form.bizEntityJson.payDeptNameCode).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.contractNoOptions = res.data
            } else {
              this.contractNoOptions = []
            }
          }
        })
      } else {
        this.contractNoOptions = []
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
      if (val) {
        let obj = this.payCompaniesOptions.find(item => item.companyName == val)
        this.form.bizEntityJson.payDeptName = obj.companyName
        this.form.bizEntityJson.payDeptNameCode = obj.bukrs
        this.loadBankInfo(obj.companyName)
      } else {
        this.form.bizEntityJson.payDeptName = ''
        this.form.bizEntityJson.payDeptNameCode = ''
        this.form.bizEntityJson.payBankName = ''
        this.payBankInfoOptions = []
        this.form.bizEntityJson.payAccount = ''
      }
    },
    loadBankInfo(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'payBankName', ''),
          this.$set(this.form.bizEntityJson, 'payAccount', '')
        } else {
          this.payBankInfoOptions = []
          this.$message.error(res.message)
        }
      })
    },
    receiveUnitNameChange(val) {
      if (val) {
      let obj = this.receiveCompaniesOptions.find(item => item.companyName == val)
      this.loadBankInfo2(obj ? obj.companyName : '')
      } else {
        this.form.bizEntityJson.receiveUnitName = ''
        this.form.bizEntityJson.receiveBankName = ''
        this.payBankInfoOptions2 = []
        this.form.bizEntityJson.receiveAccountNo = ''
      }
    },
    loadBankInfo2(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions2 = res.data
          this.$set(this.form.bizEntityJson, 'receiveBankName', '')
        } else {
          this.payBankInfoOptions2 = []
          this.$message.error(res.message)
        }
      })
    },
    receiveBankNameChange(val){
      let obj = this.payBankInfoOptions2.find(item => item.bankName == val)
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
    },
    receiveUnitRemoteMethod(query){
      if(!this.form.bizEntityJson.payDeptNameCode) return this.$message.warning('请先选择付款单位!')
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
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
    },
    contNoChange(index,val){
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.$set(this.form.bizEntityJson.contractNoList[index], 'contractId', obj.finLoanContId)
    },
    selectType2Change(val) {
      if (val == 1) {
        this.$set(this.form.bizEntityJson, 'businessType', 'E15-004')
        this.$set(this.form.bizEntityJson, 'businessTypeName', 'E15-支付债券利息-正常支付')
      }
      if (val == 2) {
        this.$set(this.form.bizEntityJson, 'businessType', 'E15-001')
        this.$set(this.form.bizEntityJson, 'businessTypeName', 'E15-支付借款利息-正常支付')
      }
      if (val == 3) {
        this.$set(this.form.bizEntityJson, 'businessType', 'E15-003')
        this.$set(this.form.bizEntityJson, 'businessTypeName', 'E15-支付利息-统借统还')
      }
      if (val == 5) {
        this.$set(this.form.bizEntityJson, 'businessType', 'E15-002')
        this.$set(this.form.bizEntityJson, 'businessTypeName', 'E15-支付利息-合作项目资金占用')
      }
    },
    isBorrowChange() {
      this.$set(this.form.bizEntityJson, 'receiveUnitName', '')
    },
    openUrl(contractId) {
      if (contractId) {
        if (window.location.href.search(/resdev/) != -1 || window.location.href.search(/resdemo/) != -1 || window.location.href.search(/localhost/) != -1) {
          window.open(`https://demo.powerlong.com/cost_static/main/main.html#/fin_loan_cont/` + contractId)
        } else {
          window.open(`https://pd.powerlong.com/cost_static/main/main.html#/fin_loan_cont/` + contractId)
        }
      }
    },
    // 必填判断
    validate() {
      if (Number(this.form.bizEntityJson.zbhAmount) + Number(this.form.bizEntityJson.fyhAmount) != Number(this.form.bizEntityJson.payAmtSmallDesc)) {
        this.$message.error('付款金额需其中资本化+费用化')
        return false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>