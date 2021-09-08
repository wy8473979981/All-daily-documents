<template>
  <!-- 承兑汇票到期兑付审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="title-col topRight-col">
        <h2>选择</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.applyType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.applyType">
              <el-radio class="line-radio" :label="'1'">总部</el-radio>
              <el-radio class="line-radio" :label="'2'">事业部</el-radio>
              <el-radio class="line-radio" :label="'3'">城市公司</el-radio>
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
          <el-input v-model="form.bizEntityJson.receiveUnitName" :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <el-input v-model="form.bizEntityJson.receiveBankName" :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
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
          <el-input v-model="form.bizEntityJson.receiveAccountNo" :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
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
          <el-input :value="form.bizEntityJson.payAmtCapitalDesc" readonly :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款事由</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      </el-row>
      <el-row class="padding-row">
      <el-col :span="24" class="title-col">
        <h2>其它信息</h2>
      </el-col>

      <dl-col :span="24" place="right">
        <el-checkbox v-model="form.bizEntityJson.isBorrow" :true-label="'true'" :false-label="'false'">是否内部统借统还</el-checkbox>
      </dl-col>

      <div v-for="(item, index) in form.bizEntityJson.contractNoList" :key="index">
        <el-col :span="12" class="right-col" v-if="form.bizEntityJson.isBorrow == 'false'">
          <div class="d-min">
            <span>融资合同编号</span>
            <el-select
                :class="{'novalue': !item.contractNo, 'required': !form.bizEntityJson.disabled}"
                v-if="!form.bizEntityJson.disabled"
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
                   <p>{{ item.contNo }} {{ item.creditType }} {{ item.creditInstName }} {{ item.creditLine }}</p>
              </el-option>
            </el-select>
            <p v-else class="openUrl-p" @click="openUrl">{{ form.bizEntityJson.contractNoList[0].contractNo}}</p>
          </div>
        </el-col>

        <el-col :span="12" class="right-col" v-if="form.bizEntityJson.isBorrow == 'true'">
          <div class="d-min">
            <span>融资合同编号</span>
            <el-select
                v-if="!form.bizEntityJson.disabled"
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
                   <p>{{ item.contNo }} {{ item.creditType }} {{ item.creditInstName }} {{ item.creditLine }}</p>
              </el-option>
            </el-select>
            <p v-else class="openUrl-p" @click="openUrl">{{ form.bizEntityJson.contractNoList[0].contractNo}}</p>
          </div>
        </el-col>
        <!-- <el-col :span="12" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one">
              <span v-if="!form.bizEntityJson.disabled && index == 0"  class="explain-btn-add" @click="add">添加</span>
              <span v-if="!form.bizEntityJson.disabled && index != 0" class="explain-btn-del" @click="del(index)">删除</span>
            </p>
          </div>
        </el-col> -->
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
      //disabled: true,
      loading: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      receiveCompaniesOptions: [],
      contractNoOptions: [],
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  /* 模板内容配置的时候需要把该内容注释 */
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
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, 'isBorrow', 'false')
      this.add()
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
    openUrl(){
      let contId = this.form.bizEntityJson.contractNoList[0].contractId
       if (window.location.href.search(/resdemo/) != -1) {
        window.open(`https://demo.powerlong.com/cost_static/main/main.html#/fin_loan_cont/`+contId)
      } else {
        window.open(`https://pd.powerlong.com/cost_static/main/main.html#/fin_loan_cont/`+contId)
      }
    },
    add() {
      const newData = {
        contractNo: '',
        contractId: ''
      }
      this.form.bizEntityJson.contractNoList.push(newData)
    },
    /* del(index) {
      this.form.bizEntityJson.contractNoList.splice(index, 1)
    }, */
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
            if(res.data){
              if (res.data.length > 0) {
                this.contractNoOptions = res.data
              } else {
                this.contractNoOptions = []
              }
            }else{
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
      if(val){
          let obj = this.payCompaniesOptions.find(item => item.companyName == val)
          this.form.bizEntityJson.payDeptName = obj ? obj.companyName : ''
          this.$set(this.form.bizEntityJson, 'payDeptNameCode', obj ? obj.bukrs : '')
          this.loadBankInfo(obj.companyName)
      }else{
          this.$set(this.form.bizEntityJson, 'payDeptName', '')
	        this.$set(this.form.bizEntityJson, 'payDeptNameCode', '')
	        this.payBankInfoOptions = []
          this.$set(this.form.bizEntityJson, 'payBankName', '')
          this.$set(this.form.bizEntityJson, 'payAccount', '')
         
      }      
    }, 
    /* payDeptNameChange(val) { 
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
		        this.loadBankInfo(obj.companyName)
        }
      }else {
        if (this.form.bizEntityJson.payDeptName && !this.payCompaniesOptions[0]) {
          this.remoteMethod(this.form.bizEntityJson.payDeptName)
        }
      }
    }, */
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
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
    },
    contNoChange(index,val){
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.$set(this.form.bizEntityJson.contractNoList[index], 'contractId', obj ? obj.finLoanContId : '')
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