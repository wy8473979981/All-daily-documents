<template>
<!-- 支付管理费审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="green-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>类别选择</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.depart, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.depart">
              <el-radio class="line-radio" :label="'1'">商业</el-radio>
              <el-radio class="line-radio" :label="'2'">酒店</el-radio>
              <el-radio class="line-radio" :label="'3'">地产事业部</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="margin-row top-row blue-row">
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
          <el-select
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
          <el-select v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
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
          <el-select v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="receiveBankAccountChange" :disabled="form.bizEntityJson.disabled">
              <el-option
                v-for="(item, index) in receiveBankInfoOptions"
                :key="index"
                :label="item.account"
                :value="item.account">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    
   <el-row  class="margin-row top-row blue-row" v-if="form.bizEntityJson.disabled && $route.query.id && form.bizEntityJson.depart == '1'">
      <el-col :span="24" class="title-col right-col" >
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="12">
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
      <dl-col  :span="12" place="right" />
    </el-row>

   <el-row  class="margin-row top-row blue-row" v-if="form.bizEntityJson.disabled && $route.query.id && form.bizEntityJson.depart == '2'">
      <el-col :span="24" class="title-col right-col" >
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="12">
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
      <dl-col  :span="12" place="right" />
    </el-row>

      <!-- 点击地产事业部展示 -->
    <el-row  class="blue-row" v-if="form.bizEntityJson.depart == '3'">
      <el-col :span="12">
        <div class="d-min">
          <span>未税金额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.zbhAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.zbhAmount" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="zbhAmountChange"  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>可抵税额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fyhAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fyhAmount" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="fyhAmountChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>付款总额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" readonly v-model="form.bizEntityJson.payAmtSmallDesc"   :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
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
          <span>管理费计算说明</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <!-- 成本中心：csksOrStages等 -->
      <el-col :span="12">
        <div class="d-min">
          <span>成本中心</span>
          <el-select   :class="{'novalue': !form.bizEntityJson.csksOrStages, 'required': !form.bizEntityJson.disabled}"
 v-model="form.bizEntityJson.csksOrStages" 
 @change="csksOrStagesChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="(item, index) in csksOrStagesOptions" :key="index" :label="item.ktext" :value="item.ktext"></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>实际入账科目</span>
          <el-select
              :class="{'novalue': !form.bizEntityJson.paySubject, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.paySubject"
              filterable
              remote
              clearable
              @change="paySubjectChange"
              :remote-method="paySubjectMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="(item, index) in paySubjectOptions"
                :key="index"
                :label="item.ltxt"
                :value="item.saknr">
                <el-row :gutter="24">
                        <el-col :span="6">
                            <span>{{ item.saknr }}</span>
                        </el-col>
                        <el-col :span="18">
                            <span>{{ item.ltxt }}</span>
                        </el-col>
                   </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row  class="margin-row top-row blue-row" v-if="form.bizEntityJson.disabled && $route.query.id && form.bizEntityJson.depart == '3'">
      <el-col :span="24" class="title-col right-col" >
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="12">
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
      <dl-col  :span="12" place="right" />
    </el-row>
      
    <el-row class="margin-row top-row green-row"  v-if="form.bizEntityJson.depart == '1' || form.bizEntityJson.depart == '2'">
      <el-col :span="24" class="title-col right-col">
        <h2>其它信息</h2>
      </el-col>
      
      <el-col>
        <dl-col :span="5" place="title" >
        <h2>费用类型</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>未税金额</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税额</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>付款总额</h2>
      </dl-col>
      <dl-col :span="4" place="right">
        <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="add">添加</span>
          </p>
        </div>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.finPayDetail" :key="index">
        <dl-col :span="5">
          <!-- <el-input v-model="item.category" readonly /> -->
          <el-select v-if="form.bizEntityJson.depart == '1'" v-model="item.category" :class="{'novalue': !item.category, 'required': !form.bizEntityJson.disabled}" :disabled="form.bizEntityJson.disabled">
                <el-option label="前期服务费" value="1"></el-option>
                <el-option label="品牌使用费" value="2"></el-option>
                <el-option label="招商佣金" value="3"></el-option>
                <el-option label="开办费" value="4"></el-option>
                <el-option label="企划-招商推广费" value="5"></el-option>
                <el-option label="写字楼空置费（含公共区域管理费）" value="6"></el-option>
                <el-option label="租金管理费" value="7"></el-option>
                <el-option label="企划-促销旺场费" value="8"></el-option>
                <el-option label="信息系统维护建设费" value="9"></el-option>  
                <el-option label="物业开办费" value="10"></el-option>   
                <el-option label="物业费赠送满减" value="11"></el-option>                 
            </el-select>
            <el-select v-if="form.bizEntityJson.depart == '2'" v-model="item.category" :class="{'novalue': !item.category, 'required': !form.bizEntityJson.disabled}" :disabled="form.bizEntityJson.disabled">
                <el-option label="前期咨询服务费" value="1"></el-option>
                <el-option label="特许经营加盟费/品牌使用费" value="2"></el-option>
                <el-option label="建设管理费" value="3"></el-option>
                <el-option label="开办费" value="4"></el-option>
                <el-option label="企划推广费" value="5"></el-option>
                <el-option label="招商佣金" value="6"></el-option>
                <el-option label="租金管理费" value="7"></el-option>
                <el-option label="前期策划费" value="8"></el-option>
                <el-option label="集团管理费" value="9"></el-option>              
            </el-select>
        </dl-col>
        <dl-col :span="5">
          <el-input :class="{'novalue': !item.unTax, 'required': !form.bizEntityJson.disabled}" v-model="item.unTax" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="unTaxChange(item.unTax,index)"  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
        <dl-col :span="5">
          <el-input :class="{'novalue': !item.tax, 'required': !form.bizEntityJson.disabled}" v-model="item.tax" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="taxChange(item.tax,index)"  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
        <dl-col :span="5">
          <el-input :class="{'novalue': !item.payAmount, 'required': !form.bizEntityJson.disabled}" readonly v-model="item.payAmount"  :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>

        </dl-col>
        <dl-col :span="4" place="right">
          <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-del" @click="del(index)">删除</span>
          </p>
          </div>
        </dl-col>
      </div>
      </el-col>

      <dl-col :span="24" class="show-print" place="right">
        <p class="explain-p-one">合计（小写）：　{{ form.bizEntityJson.payAmtSmallDesc2 }}　(大写) ：{{ form.bizEntityJson.payAmtCapitalDesc2 }}</p>
      </dl-col>

      <dl-col :span="12" title="合计（小写）" class="no-print">
          <el-input v-model="form.bizEntityJson.payAmtSmallDesc2" readonly />
      </dl-col>
      <dl-col :span="12" title="大写" place="right" class="no-print">
          <el-input :value="form.bizEntityJson.payAmtCapitalDesc2" readonly />
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
      //disabled: true,
      loading: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      receiveBankInfoOptions:[],
      receiveCompaniesOptions: [],
      contractNoOptions: [],
      csksOrStagesOptions:[],
      paySubjectOptions:[],
      businessTypeOptions:[],
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
      this.$set(this.form.bizEntityJson, 'finPayDetail', [])
      this.$set(this.form.bizEntityJson, 'payContentDesc', '')

      this.$set(this.form.bizEntityJson, 'payAmtSmallDesc', '0')
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, 'depart', '1')
      this.add()
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
     this.csksOrStagesMethod(this.form.bizEntityJson.payDeptName)

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
    csksOrStagesChange(val){
     
      let obj = this.csksOrStagesOptions.find(item => item.ktext== val)
      this.form.bizEntityJson.csksOrStages= obj ? obj.ktext: ''
      this.$set(this.form.bizEntityJson, 'csksOrStagesCode', obj ? obj.kostl : '')
    },
    findBusinessType() {
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'FKGL_WLK_130'
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
    add() {
      const newData = {
        category: '',
        unTax: '',
        tax:'',
        payAmount:''
      }
      this.form.bizEntityJson.finPayDetail.push(newData)
    },
    del(index) {
      if(this.form.bizEntityJson.finPayDetail.length>1){
        this.form.bizEntityJson.finPayDetail.splice(index, 1)
      }else{
        this.$message({
          showClose: true,
          message: '至少要有一条记录',
          type: 'error'
        });
      }
      
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

    /**
     * 查询成本中心
     */
    csksOrStagesMethod(selectCompanyName){
       const param = {
        companyName: selectCompanyName,
      }
       this.$approval.getSapCsksList(param).then(res => {
        if(res.code == 1 && res.data) {
          this.csksOrStagesOptions = res.data
        } else {
          this.csksOrStagesOptions = []
        }
      })
    },
    paySubjectMethod(query){
      const param = {
        companyName: this.form.bizEntityJson.payDeptName,
        value:query
      }
      this.$approval.getpaySubjectList(param).then(res => {
        if(res.code == 1 && res.data) {
          this.paySubjectOptions = res.data
        } else {
          this.paySubjectOptions = []
        }
      })
    },

    paySubjectChange(val){
      let obj = this.paySubjectOptions.find(item => item.saknr == val)
      this.form.bizEntityJson.paySubject = obj ? obj.ltxt : ''
      this.$set(this.form.bizEntityJson, 'paySubjectNo', obj ? obj.saknr : '')
    },

    receiveUnitRemoteMethod(query){
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
    receiveBankNameChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.bankName == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
    },
    payBankAccountChange(val){
      let obj = this.payBankInfoOptions.find(item => item.account == val)
      this.form.bizEntityJson.payBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.payAccount = obj ? obj.account : ''
    },
    receiveBankAccountChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.account == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
    },
    payDeptNameChange(val) { 
      if(val){
          let obj = this.payCompaniesOptions.find(item => item.companyName == val)
          this.form.bizEntityJson.payDeptName = obj ? obj.companyName : ''
          this.$set(this.form.bizEntityJson, 'payDeptNameCode', obj ? obj.bukrs : '')
          this.$set(this.form.bizEntityJson, 'csksOrStages',  '')
          this.csksOrStagesOptions = []
          this.$set(this.form.bizEntityJson, 'paySubject',  '')
          this.paySubjectOptions = []
          this.loadBankInfo(obj.companyName)
          this.csksOrStagesMethod(obj.companyName)
      }else{
          this.$set(this.form.bizEntityJson, 'csksOrStages',  '')
          this.csksOrStagesOptions = []
          this.$set(this.form.bizEntityJson, 'payDeptName', '')
          this.$set(this.form.bizEntityJson, 'payDeptNameCode', '')
          this.payBankInfoOptions = []
          this.$set(this.form.bizEntityJson, 'paySubject',  '')
          this.paySubjectOptions = []
          this.$set(this.form.bizEntityJson, 'payBankName', '')
          this.$set(this.form.bizEntityJson, 'payAccount', '')
         
      }      
    },
    
    receiveUnitNameChange(val){
      if(val){
          let obj = this.receiveCompaniesOptions.find(item => item.companyName == val)
          this.form.bizEntityJson.receiveUnitName = obj ? obj.companyName : ''
          this.loadReceiveBankInfo(obj.companyName)
      }else{
      	  this.$set(this.form.bizEntityJson, 'receiveUnitName', '')
          this.receiveBankInfoOptions= []
		  this.$set(this.form.bizEntityJson, 'receiveBankName', '')
          this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
         
      }
    },
 
    loadReceiveBankInfo(selectCompanyName){
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.receiveBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'receiveBankName', ''),
          this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
        } 
      })
    },
    loadBankInfo(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.payBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'payBankName', ''),
          this.$set(this.form.bizEntityJson, 'payAccount', '')
        } 
      })
    },
    
    zbhAmountChange(val){
      if(val !=null && this.form.bizEntityJson.fyhAmount !=null){
        let calValue = Number(val) + Number(this.form.bizEntityJson.fyhAmount)
        calValue.toFixed(2)
        this.$set(this.form.bizEntityJson, 'payAmtSmallDesc', calValue)
        this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(calValue))
      }
    },
    fyhAmountChange(val){
      if(val !=null && this.form.bizEntityJson.fyhAmount !=null){
        let calValue = Number(val) + Number(this.form.bizEntityJson.zbhAmount)
        calValue.toFixed(2)
        this.$set(this.form.bizEntityJson, 'payAmtSmallDesc', calValue)
        this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(calValue))
      }
    },
    unTaxChange(val,index){
      if(val !=null && this.form.bizEntityJson.finPayDetail[index].tax != null){
        let calValue = Number(val) + Number(this.form.bizEntityJson.finPayDetail[index].tax)
        this.$set(this.form.bizEntityJson.finPayDetail[index], 'payAmount', calValue.toFixed(2))
        /* this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(calValue)) */
        this.calAll();
      }
    }, 
    taxChange(val,index){
      if(val !=null && this.form.bizEntityJson.finPayDetail[index].unTax){
        let calValue = Number(val) + Number(this.form.bizEntityJson.finPayDetail[index].unTax)
        this.$set(this.form.bizEntityJson.finPayDetail[index], 'payAmount', calValue.toFixed(2))
        this.calAll()
      }
    }, 
    calAll(){
      var sum = 0
      for (let key in this.form.bizEntityJson.finPayDetail) {
        sum += Number(this.form.bizEntityJson.finPayDetail[key].payAmount)
      }
      this.$set(this.form.bizEntityJson, 'payAmtSmallDesc2', sum)
      this.$set(this.form.bizEntityJson, 'payAmtSmallDesc', sum)
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc2', this.convertCurrency(sum))
    },
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
    },
    contNoChange(index,val){
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.$set(this.form.bizEntityJson.contractNoList[index], 'contractId', obj.finLoanContId)
    },
    // 必填判断
    validate() {
      if(this.form.bizEntityJson.depart == '1' || this.form.bizEntityJson.depart == '2'){
         this.form.bizEntityJson.payAmtSmallDesc = this.form.bizEntityJson.payAmtSmallDesc2
         this.form.bizEntityJson.payAmtCapitalDesc2 = this.form.bizEntityJson.payAmtCapitalDesc2
      }
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>