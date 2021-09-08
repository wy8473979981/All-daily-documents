<template>
  <!-- 全部组件整理，需要复制到后台模板配置  start -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">

    <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
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
                    v-for="item in payCompaniesOptions"
                    :key="item.bukrs"
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

        <dl-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' " :span="12" title="收款单位全称" place="right">
            <el-input v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="12" title="收款单位全称" place="right" :novalue="!form.bizEntityJson.receiveUnitName">
            <el-input v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <!-- <el-col v-else :span="12" class="right-col">
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
                    v-for="item in receiveCompaniesOptions"
                    :key="item.bukrs"
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
        </el-col> -->

        <el-col :span="12">
            <div class="d-min">
            <span>付款单位开户银行</span>
            <el-select :class="{'novalue': !form.bizEntityJson.payBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" @change="payBankNameChange" :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="item in payBankInfoOptions"
                    :key="item.account"
                    :label="item.bankName"
                    :value="item.bankName">
                </el-option>
            </el-select>
            </div>
        </el-col>

        <dl-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' " :span="12" title="收款单位开户银行" place="right" >
            <el-input v-model="form.bizEntityJson.receiveBankName" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="12" title="收款单位开户银行" place="right" :novalue="!form.bizEntityJson.receiveBankName">
            <el-input v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
        <!-- <el-col v-else :span="12" class="right-col">
          <div class="d-min">
            <span>收款单位开户银行</span>
            <el-select :class="{'novalue': !form.bizEntityJson.receiveBankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
              <el-option
                v-for="item in receiveBankInfoOptions"
                :key="item.account"
                :label="item.bankName"
                :value="item.bankName">
              </el-option>
            </el-select>
          </div>
        </el-col> -->

        <el-col :span="12">
            <div class="d-min">
            <span>付款单位帐号</span>
            <el-select :class="{'novalue': !form.bizEntityJson.payAccount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAccount" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="payBankAccountChange" :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="item in payBankInfoOptions"
                    :key="item.account"
                    :label="item.account"
                    :value="item.account">
                </el-option>
            </el-select>
            </div>
        </el-col>

        <dl-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' " :span="12" title="收款单位帐号" place="right" >
            <el-input v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
        <dl-col :span="12" title="收款单位开户银行" place="right" :novalue="!form.bizEntityJson.receiveAccountNo">
            <el-input v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <!-- <el-col v-else :span="12" class="right-col">
            <div class="d-min">
                <span>收款单位帐号</span>
                <el-select :class="{'novalue': !form.bizEntityJson.receiveAccountNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankAccountChange" :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="item in receiveBankInfoOptions"
                    :key="item.account"
                    :label="item.account"
                    :value="item.account">
                </el-option>
            </el-select>
            </div>
        </el-col> -->

       

        <el-col :span="12">
            <div class="d-min">
            <span>付款金额(元)(小写)</span>
            <el-input v-if="payAmtSmallDesc" :value="payAmtSmallDesc"></el-input>
            <el-input v-else :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" maxlength="15" v-limit-number="2" @blur="toFixedBlur" @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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

        <dl-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true'" :span="8" title="走账" :novalue="form.bizEntityJson.accountKeepingTrue != 'true' && form.bizEntityJson.accountKeepingFalse != 'true'">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'accountKeepingTrue'},
                        {label:'否',name:'accountKeepingFalse'}
                        ]"
            />
        </dl-col>

        <el-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' && form.bizEntityJson.accountKeepingTrue == 'true'" :span="8" place="right">
            <div class="d-min">
            <span>走款方案审批表：</span>
            <el-select
                :class="{'novalue': !form.bizEntityJson.specialDisplayNo, 'required': !form.bizEntityJson.disabled}"
                v-model="form.bizEntityJson.specialDisplayNo"
                filterable
                remote
                clearable
                :remote-method="authTypeCdSelect"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in authTypeSelect"
                :key="item.displayNo"
                :label="item.displayNo"
                :value="item.displayNo">
                <el-row :gutter="24">
                    <el-col :span="6">
                        <span>{{ item.displayNo }}</span>
                    </el-col>
                    <el-col :span="18">
                        <span>{{ item.titleName }}</span>
                    </el-col>
                </el-row>
            </el-option>
            </el-select>
            </div>
        </el-col>

        <el-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' && form.bizEntityJson.intercourseType == '5'" :span="8" place="right">
            <div class="d-min">
            <span style="flex-basis: 165px;">合作项目资金分配申请表</span>
            <el-select
            :class="{'novalue': !form.bizEntityJson.intercourseTypeNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.intercourseTypeNo"
            filterable
            remote
            clearable
            :remote-method="authTypeCdSelectHZXM"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in authTypeSelectHZXM"
                :key="item.displayNo"
                :label="item.displayNo"
                :value="item.displayNo">
                <el-row :gutter="24">
                    <el-col :span="6">
                        <span>{{ item.displayNo }}</span>
                    </el-col>
                    <el-col :span="18">
                        <span>{{ item.titleName }}</span>
                    </el-col>
                </el-row>
            </el-option>
             </el-select>
            </div>
        </el-col>
    </el-row>

    

    <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>其他信息</h2>
        </el-col>

        <dl-col :span="12" title="是否首次付款" place="right">
            <el-checkbox
            v-model="form.bizEntityJson.isFirst" 
            @change="clearResDisplayNo"
            true-label="true"
            false-label="false"
            >
            是否首次付款
          </el-checkbox>
        </dl-col>

        <dl-col :span="12" title="总收购金额" place="right" :novalue="!form.bizEntityJson.totalAmount">
            <el-input v-model="form.bizEntityJson.totalAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
    
        <!-- <dl-col v-if="form.bizEntityJson.isFirst == 'false'" :span="12" title="首次付款网批" :novalue="!form.bizEntityJson.resDisplayNo">
            <el-input v-model="form.bizEntityJson.resDisplayNo"></el-input> 
            
        </dl-col> -->
        <el-col  v-if="form.bizEntityJson.isFirst == 'false'" :span="12">
            <div class="d-min">
            <span>首次付款网批</span>
            <el-select
                popper-class="select-header"
                :class="{'novalue': !form.bizEntityJson.resDisplayNo, 'required': !form.bizEntityJson.disabled}"
                v-model="form.bizEntityJson.resDisplayNo"
                filterable
                remote
                clearable
                @change="resDisplayNoChange"
                :remote-method="resDisplayNoRemoteMethod"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="item in resDisplayNoOptions"
                    :key="item.approveCd"
                    :label="item.approveCd"
                    :value="item.totalAmount">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <span>{{ item.approveCd }}</span>
                        </el-col>
                        <el-col :span="18">
                            <span>{{ item.totalAmount }}</span>
                        </el-col>
                     </el-row>
                </el-option>
            </el-select>
            </div>
        </el-col>


    </el-row>

    <el-row class="padding-row" v-if="form.bizEntityJson.isFirst == 'true'">
        
        <el-col :span="24" class="title-col topRight-col">
            <h2>附件上传</h2>
        </el-col>
        <dl-col :span="24" title="上传附件" place="right" :novalue="!form.bizEntityJson.fileId">
            <one-file :form="form" value="fileId" />
        </dl-col>
    </el-row>

    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
  <!-- end -->
</template>

<script>
const uploadUrl = 'api/file/uploadFile' // 本地模板变量赋值，不需要传到后台模板
export default {
  data() {
    return {
      form: data, // 线上form声明，需要复制到模板内容配置
      disabled: true,
      loading: false,
      showSelectBank: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      receiveBankInfoOptions: [],
      receiveCompaniesOptions: [],
      resDisplayNoOptions: [],
      contractNoOptions: [],
      authTypeSelect:[],
      authTypeSelectHZXM:[],
      findResUserCdResult:[],
      payAmtSmallDesc: ''
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
        if (!this.$route.query.id) {
            this.$set(this.form.bizEntityJson, 'accountKeepingTrue', 'true')
            this.$set(this.form.bizEntityJson, 'isFirst', 'false')
            this.$set(this.form.bizEntityJson, 'businessType', 'E13-退购房款/意向金-正常支付（退意向金)')
            this.$set(this.form.bizEntityJson, 'businessTypeReceipt', 'E13-退购房款/意向金-正常支付（退意向金)')
        } else {
            if (this.form.status != '草稿') {
                this.payAmtSmallDesc = (parseFloat(this.form.bizEntityJson.payAmtSmallDesc).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
            }
        }
  },
methods: {
    isLandChange(){
            if(this.form.bizEntityJson.isHotel == 'false'){
                this.$set(this.form.bizEntityJson, 'hotel1', 'false')
                this.$set(this.form.bizEntityJson, 'hotel2', 'false')
                this.$set(this.form.bizEntityJson, 'hotel3', 'false')
                this.$set(this.form.bizEntityJson, 'hotel4', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel1', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel2', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel3', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel4', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel5', 'false')
                this.$set(this.form.bizEntityJson, 'headHotel6', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel1', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel2', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel3', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel4', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel5', 'false')
                this.$set(this.form.bizEntityJson, 'leaseHotel6', 'false')
                this.$set(this.form.bizEntityJson, 'selfHotel1', 'false')
                this.$set(this.form.bizEntityJson, 'selfHotel2', 'false')
                this.$set(this.form.bizEntityJson, 'selfHotel3', 'false')
                this.$set(this.form.bizEntityJson, 'selfHotel4', 'false')
                this.$set(this.form.bizEntityJson, 'selfHotel5', 'false')
            }else{
              this.$set(this.form.bizEntityJson, 'newType1', 'false')
              this.$set(this.form.bizEntityJson, 'newType2', 'false')
              this.$set(this.form.bizEntityJson, 'newType3', 'false')
              this.$set(this.form.bizEntityJson, 'newType4', 'false')
              this.$set(this.form.bizEntityJson, 'newType5', 'false')
              this.$set(this.form.bizEntityJson, 'area1', 'false')
              this.$set(this.form.bizEntityJson, 'area0', 'false')
              this.$set(this.form.bizEntityJson, 'area2', 'false')
            }
    },
   
    //付款
    payDeptNameChange(val) {
      let obj = this.payCompaniesOptions.find(item => item.companyName == val)
      this.form.bizEntityJson.payDeptName = obj ? obj.companyName : ''
      this.$set(this.form.bizEntityJson, 'payDeptNameCode', obj.bukrs)
      this.loadBankInfo(obj.companyName)
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
    //收款
    receiveUnitNameChange(val){
      let obj = this.receiveCompaniesOptions.find(item => item.companyName == val)
      this.form.bizEntityJson.receiveUnitName = obj ? obj.companyName : ''
      this.$set(this.form.bizEntityJson, 'receiveUnitCd', obj.bukrs)
      this.loadBankInfoReceive(obj.companyName)
    },
    receiveBankAccountChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.account == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
    },
    //大小写转换
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
    },
    //首次付款网批
    resDisplayNoChange(val){
      let obj = this.resDisplayNoOptions.find(item => item.approveCd == val)
      this.form.bizEntityJson.resDisplayNo = obj ? obj.approveCd : ''
      this.form.bizEntityJson.resApproveId = obj ? obj.id : ''
      this.form.bizEntityJson.totalAmount = obj ? obj.totalAmount : ''
    },
    //付款调下啦接口
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
    //首次付款网批下拉
    resDisplayNoRemoteMethod(query) {
      if (query) {
        this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
        const param = {
          pushUserCd: this.userInfo.userid,
          resDisplayNo: query
        }
        this.loading = true
        this.$approval.quickSearchResApproveEquity(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.resDisplayNoOptions = res.data
              this.resDisplayNoOptions.unshift({approveCd: '网批号', totalAmount: '金额'})
              console.log("1111111111111111");
              console.log(this.resDisplayNoOptions);
            } else {
              this.resDisplayNoOptions = []
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
    //付款
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
    //收款
    loadBankInfoReceive(selectCompanyName) {
      this.$approval.loadBankInfo(selectCompanyName).then(res => {
        if(res.code == 1 && res.data) {
          this.receiveBankInfoOptions = res.data
          this.$set(this.form.bizEntityJson, 'receiveBankName', '')
          this.$set(this.form.bizEntityJson, 'receiveAccountNo', '')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    authTypeCdSelect(query) {
      if (query) {
        const param = {
            authTypeCd: 'FKGL_ZZFA_160',
            value: query
        }
        this.loading = true
        this.$approval.selectResApproveInfo(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.authTypeSelect = res.data
            } else {
              this.authTypeSelect = []
            }
          }
        })
      } else {
        this.authTypeSelect = []
      }
    },
    authTypeCdSelectHZXM(query) {
      if (query) {
        const param = {
            authTypeCd: 'FKGL_HZXMZJFP_150',
            value: query
        }
        this.loading = true
        this.$approval.selectResApproveInfo(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.authTypeSelectHZXM = res.data
            } else {
              this.authTypeSelectHZXM = []
            }
          }
        })
      } else {
        this.authTypeSelectHZXM = []
      }
    },
    closeSelectBank(val) {
      if (val) {
        this.form.bizEntityJson.receiveBankName = val.bankName
        this.form.bizEntityJson.sysBankCode = val.bankCode
      }
      this.showSelectBank = false
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
    clearReceiveUnitName() {
      this.$set(this.form.bizEntityJson, 'receiveUnitName', '')
    },
    clearResDisplayNo() {
      this.$set(this.form.bizEntityJson, 'resDisplayNo', '')
    },
    // 发起时校验
    async yykCheck() {
      console.log("--------");
      console.log(this.form.bizEntityJson.isFirst);
      console.log("--------");
      var payAmtSmallDesc = parseFloat(this.form.bizEntityJson.payAmtSmallDesc);
      var totalAmount = parseFloat(this.form.bizEntityJson.totalAmount);
      if(this.form.bizEntityJson.isFirst=='false'){
        const param = {
          resDisplayNo: this.form.bizEntityJson.resDisplayNo
        }
        this.$approval.equitySearchResApproveEquity(param).then(res => {
          if(res.code == 1) {
            console.log(res.data);
            var sum = payAmtSmallDesc + parseFloat(res.data);
            if(totalAmount < sum){
                this.$alert('付款金额总和不能大于总收购金额');
                return false;
            }
          }
        });
      }else{
        console.log(parseFloat(this.form.bizEntityJson.payAmtSmallDesc)>parseFloat(this.form.bizEntityJson.totalAmount));
        if(payAmtSmallDesc > totalAmount){
            this.$alert('付款金额总和不能大于总收购金额');
                return false;
        }
      }
      
      if (this.form.bizEntityJson.isLand == 'true' &&  (this.form.bizEntityJson.area1 == 'true' || this.form.bizEntityJson.area0 == 'true')) {
        var isGo = true
        const param = {
          payDeptName: this.form.bizEntityJson.payDeptName,
          receiveUnitName: this.form.bizEntityJson.receiveUnitName,
          area:this.form.bizEntityJson.area1 == 'true' ? '1' : '0'
        }
        await this.$approval.checkBukrsPlate(param).then(res => {
          if(res.code == 1) {
            if(res.data != null){
              this.$alert(res.data)
              isGo = false
            }
          }
        })
        if(!isGo){
          return false
        }
      }
      if (this.form.bizEntityJson.isLand == 'true' &&  this.form.bizEntityJson.area1 == 'true') {
        var isGo = true
        const param = {
          payDeptName: this.form.bizEntityJson.payDeptName,
          receiveUnitName: this.form.bizEntityJson.receiveUnitName
        }
        await this.$approval.findParallelTableByCompanyName(param).then(res => {
          if(res.code == 1) {
            if(res.data != null){
              if(res.data == 'true'){
                this.$alert('勾选‘集团内（上市）及联合营’，请确保收款单位都为上市公司') 
                isGo = false
              }
            }
          }
        })
        if(!isGo){
          return false
        }
      }
      this.form.bizEntityJson.payAmtSmallDescS = Number(this.form.bizEntityJson.payAmtSmallDesc)
      if(this.form.bizEntityJson.intercourseType == '0'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '0')
      }
      if(this.form.bizEntityJson.intercourseType == '15'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '15')
      }
      if(this.form.bizEntityJson.intercourseType == '1'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '1')
      }
      if(this.form.bizEntityJson.intercourseType == '2'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '2')
      }
      if(this.form.bizEntityJson.intercourseType == '3'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '3')
      }
      if(this.form.bizEntityJson.intercourseType == '6'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '6')
      }
      if(this.form.bizEntityJson.intercourseType == '16'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '16')
      }
      if(this.form.bizEntityJson.intercourseType == '8'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '8')
      }
      if(this.form.bizEntityJson.intercourseType == '9'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '9')
      }
      if(this.form.bizEntityJson.intercourseType == '10'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '10')
      }
      if(this.form.bizEntityJson.intercourseType == '11'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '11')
      }
      if(this.form.bizEntityJson.intercourseType == '12'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '12')
      }
      if(this.form.bizEntityJson.intercourseType == '13'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '13')
      }
      if(this.form.bizEntityJson.intercourseType == '14'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '14')
      }
      if(this.form.bizEntityJson.intercourseType == '4'  && this.form.bizEntityJson.area1 == 'true'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '41')
      }
      if(this.form.bizEntityJson.intercourseType == '4' && this.form.bizEntityJson.area0 == 'true'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '40')
      }
      if(this.form.bizEntityJson.intercourseType == '4' && this.form.bizEntityJson.area2 == 'true'){
        this.$set(this.form.bizEntityJson, 'newIntercourseType', '42')
      }
    },
  }
}
</script>
/* 本地模板编译需要的css，不需要上传到后台 */
<style type="text/css" lang="scss">
@import '../publicSheet/publicSheet.scss';
</style>
