<template>
  <!-- 偿还本金审批表 -->
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
              :class="{'novalue': !form.bizEntityJson.payDeptName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.payDeptName"
              filterable
              remote
              popper-class="select-header"
              clearable
              @change="payDeptNameChange"
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in payCompaniesOptions"
                :key="item.bukrs"
                :label="item.companyName"
                :value="item.companyName">
              <el-row :gutter="24">
                <el-col :span="3">
                  <span>{{ item.bukrs }}</span>
                </el-col>
                <el-col :span="21">
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
              :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.receiveUnitName"
              filterable
              remote
              clearable
              popper-class="select-header"
              @change="receiveUnitNameChange"
              :remote-method="receiveUnitRemoteMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in receiveCompaniesOptions"
                :key="item.linfnr"
                :label="item.supName"
                :value="item.supName">
              <el-row :gutter="24">
                <el-col :span="3">
                  <span>{{ item.linfnr }}</span>
                </el-col>
                <el-col :span="21">
                  <span>{{ item.supName }}</span>
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
                v-for="item in payBankInfoOptions"
                :key="item.bankName"
                :label="item.bankName"
                :value="item.bankName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位开户银行</span>
          <el-input v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款单位帐号</span>
          <el-select v-model="form.bizEntityJson.payAccount" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="payBankAccountChange" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in payBankInfoOptions"
                :key="item.account"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>收款单位帐号</span>
          <el-input v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>付款金额(元)(小写)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" v-filter-check-number @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="">
        <div class="d-min">
          <span>(大写)</span>
          <el-input v-model="form.bizEntityJson.payAmtCapitalDesc" readonly :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>偿还本金类型</span>
          <el-select :class="{'novalue': !form.bizEntityJson.cashFlowType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.cashFlowType" @change="cashFlowTypeChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="银行短期借款" value="1"></el-option>
            <el-option label="银行长期借款" value="2"></el-option>
            <el-option label="债券" value="3"></el-option>
            <el-option label="短期统借统还" value="4"></el-option>
            <el-option label="长期统借统还" value="5"></el-option>
            <el-option label="其他短期借款" value="6"></el-option>
            <el-option label="其他长期借款" value="7"></el-option>
            <el-option label="合作方股东借款" value="8"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="title-col">
        <h2>其它信息</h2>
      </el-col>
      <div v-for="(item, index) in form.bizEntityJson.contractNoList" :key="index">
        <el-col v-if="!form.bizEntityJson.disabled" :span="12">
          <div class="d-min">
            <span>融资合同编号</span>
            <el-select
                v-if="form.bizEntityJson.cashFlowType != 8 && form.bizEntityJson.cashFlowType != 5 && form.bizEntityJson.cashFlowType != 4"
                :class="{'novalue': !item.contractNo, 'required': !form.bizEntityJson.disabled}"
                v-model="item.contractNo"
                filterable
                popper-class="select-header"
                remote
                clearable
                @change="contNoChange(index, $event)"
                :remote-method="contractNoRemoteMethod"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
              <el-option
                  v-for="item in contractNoOptions"
                  :key="item.finLoanContId"
                  :label="item.contNo"
                  :value="item.contNo">
                <el-row :gutter="24">
                  <el-col :span="7">
                    <span>{{ item.contNo }}</span>
                  </el-col>
                  <el-col :span="4">
                    <span>{{ item.creditType }}</span>
                  </el-col>
                  <el-col :span="7">
                    <span>{{ item.creditInstName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>{{ item.creditLine }}</span>
                  </el-col>
                </el-row>
              </el-option>
            </el-select>
            <el-select
                v-if="form.bizEntityJson.cashFlowType == 8 || form.bizEntityJson.cashFlowType == 5 || form.bizEntityJson.cashFlowType == 4"
                v-model="item.contractNo"
                filterable
                remote
                clearable
                popper-class="select-header"
                @change="contNoChange(index, $event)"
                :remote-method="contractNoRemoteMethod"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
              <el-option
                  v-for="item in contractNoOptions"
                  :key="item.finLoanContId"
                  :label="item.contNo"
                  :value="item.contNo">
                <el-row :gutter="24">
                  <el-col :span="7">
                    <span>{{ item.contNo }}</span>
                  </el-col>
                  <el-col :span="4">
                    <span>{{ item.creditType }}</span>
                  </el-col>
                  <el-col :span="7">
                    <span>{{ item.creditInstName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>{{ item.creditLine }}</span>
                  </el-col>
                </el-row>
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-else :span="12">
          <div class="d-min">
            <span>融资合同编号</span>
            <p class="openUrl-p" @click="openUrl(item.contractId)">{{ item.contractNo }}</p>
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
    if (!this.form.bizEntityJson.cashFlowType){
      this.$set(this.form.bizEntityJson, 'isBorrow', false)
      this.$set(this.form.bizEntityJson, 'businessType', "E14-004")
      this.$set(this.form.bizEntityJson, 'businessTypeName', "E14-偿还短期借款银行借款")
      this.$set(this.form.bizEntityJson, 'cashFlowType', "1")
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
      let obj = this.payCompaniesOptions.find(item => item.companyName == val)
      this.form.bizEntityJson.payDeptName = obj ? obj.companyName : ''
      this.$set(this.form.bizEntityJson, 'payDeptNameCode', obj.bukrs)
      this.loadBankInfo(obj.companyName)
    },
    loadBankInfo(selectCompanyName) {
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
    receiveUnitRemoteMethod(query){
      const param = {
        companyName: query,
        bukrs: this.form.bizEntityJson.payDeptNameCode
      }
      if(!this.form.bizEntityJson.payDeptNameCode) return this.$message.warning('请先选择付款单位!')
      if (query) {
        this.loading = true
        this.$approval.loadFinSap(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.receiveCompaniesOptions = res.data
            } else {
              this.receiveCompaniesOptions = []
            }
          }
        })
      } else {
        this.receiveCompaniesOptions = []
      }
    },
    receiveUnitNameChange(val){
      let obj = this.receiveCompaniesOptions.find(item => item.supName == val)
      this.$set(this.form.bizEntityJson, 'receiveUnitCd', obj.linfnr)
      this.$set(this.form.bizEntityJson, 'insideSupplier', obj.insideSupplier)
    },
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
    },
    contNoChange(index,val){
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.$set(this.form.bizEntityJson.contractNoList[index], 'contractId', obj.finLoanContId)
    },
    cashFlowTypeChange(val) {
      let isBorrow = "";
      let businessType = "";
      let businessTypeName = "";
      if (val == 1) {
        isBorrow = false;
        businessType = "E14-004";
        businessTypeName = "E14-偿还短期借款银行借款";
      } else if (val == 2) {
        isBorrow = false;
        businessType = "E14-002";
        businessTypeName = "E14-偿还长期借款银行借款";
      } else if (val == 3) {
        isBorrow = false;
        businessType = "E14-005";
        businessTypeName = "E14-偿还债券";
      } else if (val == 4) {
        isBorrow = true;
        businessType = "E14-006";
        businessTypeName = "E14-偿还借款短期统借统还";
      } else if (val == 5) {
        isBorrow = true;
        businessType = "E14-007";
        businessTypeName = "E14-偿还借款长期统借统还";
      } else if (val == 6) {
        isBorrow = false;
        businessType = "E14-003";
        businessTypeName = "E14-偿还短期借款其他借款";
      } else if (val == 7) {
        isBorrow = false;
        businessType = "E14-001";
        businessTypeName = "E14-偿还长期借款其他借款";
      } else if (val == 8) {
        isBorrow = false;
        businessType = "O01-002";
        businessTypeName = "O01-单位往来款-正常支付";
      }
      this.$set(this.form.bizEntityJson, 'isBorrow', isBorrow)
      this.$set(this.form.bizEntityJson, 'businessType', businessType)
      this.$set(this.form.bizEntityJson, 'businessTypeName', businessTypeName)
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

    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>