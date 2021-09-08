<template>
  <!-- 营业外支出审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="margin-row green-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>类型</h2>
      </el-col>

      <dl-col class="right-col" :span="24" :novalue="form.bizEntityJson.projectType1 != 'true' && form.bizEntityJson.projectType3 != 'true' && form.bizEntityJson.projectType4 != 'true' && form.bizEntityJson.isHotel != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'总部',name:'projectType1'},
                        {label:'事业部',name:'projectType3'},
                        {label:'城市公司',name:'projectType4'},
                        {label:'酒店',name:'isHotel'},
                      ]"
        />
      </dl-col>

      <dl-col class="right-col" :span="24" v-if="form.bizEntityJson.isHotel == 'true'" :novalue="form.bizEntityJson.hotel1 != 'true' && form.bizEntityJson.hotel2 != 'true' && form.bizEntityJson.hotel3 != 'true' && form.bizEntityJson.hotel4 != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'酒店总部',name:'hotel1'},
                        {label:'租赁公司',name:'hotel2'},
                        {label:'自营酒店',name:'hotel3'},
                        {label:'委托酒店',name:'hotel4'},
                      ]"
        />
      </dl-col>

      <!--酒店总部-->
      <dl-col class="right-col" :span="24" v-if="form.bizEntityJson.hotel1 == 'true' && form.bizEntityJson.isHotel == 'true'" :novalue="form.bizEntityJson.headHotel1 != 'true' && form.bizEntityJson.headHotel2 != 'true' && form.bizEntityJson.headHotel3 != 'true' && form.bizEntityJson.headHotel4 != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'其他(支付违约金、罚款、滞纳金等）金额≤2万元',name:'headHotel1'},
                        {label:'其他（支付违约金、罚款、滞纳金等）金额>2万元',name:'headHotel2'},
                        {label:'捐赠，金额≤100万元',name:'headHotel3'},
                        {label:'捐赠，金额>100万元',name:'headHotel4'},
                      ]"
        />
      </dl-col>

      <!--租赁公司-->
      <dl-col class="right-col" :span="24" v-if="form.bizEntityJson.hotel2 == 'true' && form.bizEntityJson.isHotel == 'true'" :novalue="form.bizEntityJson.leaseHotel1 != 'true' && form.bizEntityJson.leaseHotel2 != 'true' && form.bizEntityJson.leaseHotel3 != 'true' && form.bizEntityJson.leaseHotel4 != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'其他(支付违约金、罚款、滞纳金等）金额≤2万元',name:'leaseHotel1'},
                        {label:'其他（支付违约金、罚款、滞纳金等）金额>2万元',name:'leaseHotel2'},
                        {label:'捐赠，金额≤100万元',name:'leaseHotel3'},
                        {label:'捐赠，金额>100万元',name:'leaseHotel4'},
                      ]"
        />
      </dl-col>

      <!--自营酒店-->
      <dl-col class="right-col" :span="24" v-if="form.bizEntityJson.hotel3 == 'true' && form.bizEntityJson.isHotel == 'true'" :novalue="form.bizEntityJson.selfHotel1 != 'true' && form.bizEntityJson.selfHotel2 != 'true' && form.bizEntityJson.selfHotel3 != 'true' && form.bizEntityJson.selfHotel4 != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'其他(支付违约金、罚款、滞纳金等）金额≤2万元',name:'selfHotel1'},
                        {label:'其他（支付违约金、罚款、滞纳金等）金额>2万元',name:'selfHotel2'},
                        {label:'捐赠，金额≤100万元',name:'selfHotel3'},
                        {label:'捐赠，金额>100万元',name:'selfHotel4'},
                      ]"
        />
      </dl-col>

      <!--委托酒店-->
      <dl-col class="right-col" :span="24" v-if="form.bizEntityJson.hotel4 == 'true' && form.bizEntityJson.isHotel == 'true'" :novalue="form.bizEntityJson.entrustHotel1 != 'true' && form.bizEntityJson.entrustHotel2 != 'true' && form.bizEntityJson.entrustHotel3 != 'true' && form.bizEntityJson.entrustHotel4 != 'true'">
        <d-radio-group-string
                v-model="form.bizEntityJson"
                :nameList="[{label:'其他(支付违约金、罚款、滞纳金等）金额≤2万元',name:'entrustHotel1'},
                        {label:'其他（支付违约金、罚款、滞纳金等）金额>2万元',name:'entrustHotel2'},
                        {label:'捐赠，金额≤100万元',name:'entrustHotel3'},
                        {label:'捐赠，金额>100万元',name:'entrustHotel4'},
                      ]"
        />
      </dl-col>
      </el-row>
    <el-row class="margin-row green-row top-row">
      <dl-col :span="12" title="支付类别">
          <el-select :class="{'novalue': !form.bizEntityJson.payCategoryName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payCategoryName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="捐赠" value="捐赠"></el-option>
            <el-option label="支付违约金" value="支付违约金"></el-option>
            <el-option label="其他" value="其他"></el-option>
            <el-option label="罚款" value="罚款"></el-option>
            <el-option label="滞纳金" value="滞纳金"></el-option>

          </el-select>
        </dl-col>
      <dl-col class="right-col" :span="12" title="实际预算承担单位" :novalue="!form.bizEntityJson.costBearSectionName">
          <el-input v-model="form.bizEntityJson.costBearSectionName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
      <el-col :span="12" v-if="form.bizEntityJson.payCategoryName == '捐赠' || !form.bizEntityJson.payCategoryName">
        <div class="d-min">
          <span>网批查询号</span>
          <!--<el-input v-model="form.bizEntityJson.preResDisplayNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>-->
          <el-select
                  :class="{'novalue': !form.bizEntityJson.preResDisplayNo, 'required': !form.bizEntityJson.disabled}"
                  v-model="form.bizEntityJson.preResDisplayNo"
                  filterable
                  remote
                  clearable
                  @change="findMoneyChange"
                  :remote-method="getDisplayNo"
                  :loading="loading"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                  :disabled="form.bizEntityJson.disabled">
            <el-option
                    v-for="(item, index) in displayNoOptions"
                    :key="index"
                    :label="item.resDisplayNo"
                    :value="item.resDisplayNo">
              <el-row :gutter="24">
                <el-col :span="6">
                  <span>{{ item.resDisplayNo }}</span>
                </el-col>
                <el-col :span="18">
                  <span>{{ item.resDisplayName }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" v-if="form.bizEntityJson.payCategoryName == '捐赠' || !form.bizEntityJson.payCategoryName" class="right-col">
        <div class="d-min">
          <span>表单名称</span>
          <el-input v-model="form.bizEntityJson.preBillName" :placeholder="form.bizEntityJson.disabled ? '' : ''" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" v-if="form.bizEntityJson.payCategoryName == '捐赠' || !form.bizEntityJson.payCategoryName" >
        <div class="d-min">
          <span>剩余可付款金额</span>
          <el-input v-model="form.bizEntityJson.budgetMoney" :placeholder="form.bizEntityJson.disabled ? '' : ''" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12"  class="right-col" v-if="form.bizEntityJson.payCategoryName == '捐赠' || !form.bizEntityJson.payCategoryName">
        <div class="d-min">

          <el-input  readonly></el-input>
        </div>
      </el-col>

     </el-row>
     <el-row class="margin-row blue-row top-row">
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
          <el-input :class="{'novalue': !form.bizEntityJson.receiveUnitName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" ></el-input>
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
          <el-input :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
          <el-input :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="d-min">
          <span>付款金额(元)(小写)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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

    <!-- v-if="form.mapEdit.businessType" -->
    <el-row class="blue-row" v-if="form.bizEntityJson.disabled && $route.query.id">
        <el-col :span="24" class="title-col" >
            <h2>会计信息</h2>
        </el-col>
        <el-col :span="10">
            <div class="d-min">
                <span>业务类型</span>
                <el-select v-model="form.bizEntityJson.businessType" disabled :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
                    <el-option
                            v-for="(item, index) in businessTypeOptions"
                            :key="index"
                            :label="item.sapCode"
                            :value="item.sapCode">
                    </el-option>
                </el-select>
            </div>
        </el-col>
        <dl-col :span="6" v-if="form.bizEntityJson.disabled">
            <el-checkbox v-model="form.bizEntityJson.isAllInvoice" checked :true-label="'true'" :false-label="'false'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"> 已提交全额发票</el-checkbox>
        </dl-col>
        <dl-col v-if="form.bizEntityJson.disabled && form.bizEntityJson.isAllInvoice == 'true'" :span="8" place="right" />
        <el-col v-else :span="8" class="right-col">
            <div class="d-min">
                <span>缺票金额</span>
                <el-input v-model="form.bizEntityJson.missingTicketAmount" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"></el-input>
            </div>
        </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      //form: data, // 线上form声明，需要复制到模板内容配置
      loading: false,
      displayNoOptions:  [],
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      receiveCompaniesOptions: [],
      contractNoOptions: [],
      showSearchOrg: false, // 中心、部门组件打开关闭状态
      businessTypeOptions:[],
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
  /* end */
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'sendOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'contractNoList', [])
      this.$set(this.form.bizEntityJson, 'payCategoryName', '捐赠')
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, 'isBorrow', 'false')
      this.add()
    }
    if (this.form.bizEntityJson.disabled) {
      this.findBusinessType()
      // this.selectBusinessType()
    }
    if (this.$route.query.id && !this.form.bizEntityJson.disabled && this.form.bizEntityJson.payDeptName) {
      this.$approval.loadBankInfo(this.form.bizEntityJson.payDeptName).then(res => {
        if (res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
        }
      })
    }
  },
  methods: {
    findBusinessType(){
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'FKGL_WLK_120'
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
    findMoneyChange(val) {
      let obj = this.displayNoOptions.find(item => item.resDisplayNo == val)
      this.form.bizEntityJson.preBillName = obj ? obj.resDisplayName : ''
      const param ={
        preResDisplayNo: val
      }
      this.$approval.findBudgetMoney(param).then(res => {
        if(res.code == 1 && res.data) {
          this.$set(this.form.bizEntityJson, 'budgetMoney', res.data.monty)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getDisplayNo(query) {
      const param ={
        preResDisplayNo:query
      }
      if (query) {
        this.loading = true
        this.$approval.gettResApproveInfo(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.displayNoOptions = res.data
            } else {
              this.displayNoOptions = []
            }
          }
        })
      } else {
        this.displayNoOptions = []
      }
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.costBearSectionName = val.text
        this.form.bizEntityJson.costBearSectionId = val.id
      }
      this.showSearchOrg = false
    },
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
    // 页面发起时校验
    async yykCheck() {
      if ((this.form.bizEntityJson.payCategoryName=='捐赠')&&(this.form.bizEntityJson.payAmtSmallDesc - this.form.bizEntityJson.budgetMoney > 0)) {
        this.$message.error('付款金额大于剩余可用金额')
        return false
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