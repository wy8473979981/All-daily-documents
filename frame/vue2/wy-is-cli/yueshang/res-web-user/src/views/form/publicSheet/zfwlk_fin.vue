<template>
  <!-- 宝龙地产/商业/物业公司/04-行政人事/行政管理-证照办理（设立、注销）-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
        <dl-col :span="24" place="title top right">
            <h2>类型</h2>
        </dl-col> 

        <dl-col :span="12" :novalue="form.bizEntityJson.isLand != 'true' && form.bizEntityJson.isHotel != 'true' && form.bizEntityJson.isBusiness != 'true'">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            @change="isLandChange"
            :nameList="[{label:'地产',name:'isLand'},
                        {label:'酒店',name:'isHotel'},
                        {label:'商业',name:'isBusiness'}
                        ]"
            />
        </dl-col>

        <dl-col :span="12" place="right">
            <el-select v-if="form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true'" :class="{'novalue': !form.bizEntityJson.intercourseType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.intercourseType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                <el-option label="保证金押金类-租赁保证金" value="0"></el-option>
                <el-option label="保证金押金类-其他保证金" value="1"></el-option>
                <el-option label="水电费" value="2"></el-option>
                <el-option label="专项基金类" value="3"></el-option>
                <el-option label="宝龙体系内公司业务往来（非调度类）" value="4"></el-option>
                <el-option label="股东分红或预分红" value="5"></el-option>
                <el-option label="银行贷款类" value="6"></el-option>
                <el-option label="预付工程款（无合同支付）" value="8"></el-option>
                <el-option label="大单包销款流出" value="9"></el-option>
                <el-option label="其他代收费用" value="10"></el-option>
                <el-option label="退诚意金" value="11"></el-option>
                <el-option label="统借统还放款" value="12"></el-option>
                <el-option label="保理过桥资金" value="13"></el-option>
                <el-option label="维修基金类" value="14"></el-option>                
            </el-select>
        </dl-col>

        <dl-col v-if="form.bizEntityJson.isLand == 'true'" :span="24" :novalue="form.bizEntityJson.newType1 != 'true' && form.bizEntityJson.newType2 != 'true' && form.bizEntityJson.newType3 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'总部',name:'newType1'},
                        {label:'事业部',name:'newType2'},
                        {label:'城市公司',name:'newType3'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.isHotel == 'true'" :span="24" :novalue="form.bizEntityJson.hotel1 != 'true' && form.bizEntityJson.hotel2 != 'true' && form.bizEntityJson.hotel3 != 'true' && form.bizEntityJson.hotel4 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'酒店总部',name:'hotel1'},
                        {label:'租赁公司',name:'hotel2'},
                        {label:'自营酒店',name:'hotel3'},
                        {label:'委托酒店',name:'hotel4'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.isBusiness == 'true'" :span="24" :novalue="form.bizEntityJson.newType4 != 'true' && form.bizEntityJson.newType5 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'商业公司',name:'newType4'},
                        {label:'商业集团',name:'newType5'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true'" :span="24" :novalue="form.bizEntityJson.area1 != 'true' && form.bizEntityJson.area0 != 'true' && form.bizEntityJson.area2 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'集团内（上市）及联合营',name:'area1'},
                        {label:'集团内(非上市)',name:'area0'},
                        {label:'集团外',name:'area2'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.hotel1 == 'true'" :span="24" :novalue="form.bizEntityJson.headHotel1 != 'true' && form.bizEntityJson.headHotel2 != 'true' && form.bizEntityJson.headHotel3 != 'true' && form.bizEntityJson.headHotel4 != 'true' && form.bizEntityJson.headHotel5 != 'true' && form.bizEntityJson.headHotel6 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'公司内部调拨',name:'headHotel1'},
                        {label:'酒店集团内部调拨',name:'headHotel2'},
                        {label:'集团资金上划',name:'headHotel3'},
                        {label:'酒店资金上划',name:'headHotel4'},
                        {label:'资金下划',name:'headHotel5'},
                        {label:'资金申请',name:'headHotel6'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.hotel2 == 'true'" :span="24" :novalue="form.bizEntityJson.leaseHotel1 != 'true' && form.bizEntityJson.leaseHotel2 != 'true' && form.bizEntityJson.leaseHotel3 != 'true' && form.bizEntityJson.leaseHotel4 != 'true' && form.bizEntityJson.leaseHotel5 != 'true' && form.bizEntityJson.leaseHotel6 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'公司内部调拨',name:'leaseHotel1'},
                        {label:'酒店集团内部调拨',name:'leaseHotel2'},
                        {label:'集团资金上划',name:'leaseHotel3'},
                        {label:'酒店资金上划',name:'leaseHotel4'},
                        {label:'资金下划',name:'leaseHotel5'},
                        {label:'资金申请',name:'leaseHotel6'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.hotel3 == 'true'" :span="24" :novalue="form.bizEntityJson.selfHotel1 != 'true' && form.bizEntityJson.selfHotel2 != 'true' && form.bizEntityJson.selfHotel3 != 'true' && form.bizEntityJson.selfHotel4 != 'true' && form.bizEntityJson.selfHotel5 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'公司内部调拨',name:'selfHotel1'},
                        {label:'酒店集团内部调拨',name:'selfHotel2'},
                        {label:'资金上划至酒店总部',name:'selfHotel3'},
                        {label:'资金上划至地产公司',name:'selfHotel4'},
                        {label:'资金申请',name:'selfHotel5'}
                        ]"
            />
        </dl-col>

        <dl-col v-if="form.bizEntityJson.hotel4 == 'true'" :span="24" :novalue="form.bizEntityJson.entrustHotel1 != 'true' && form.bizEntityJson.entrustHotel2 != 'true' && form.bizEntityJson.entrustHotel3 != 'true' && form.bizEntityJson.entrustHotel4 != 'true' && form.bizEntityJson.entrustHotel5 != 'true'" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'公司内部调拨',name:'entrustHotel1'},
                        {label:'酒店集团内部调拨',name:'entrustHotel2'},
                        {label:'资金上划至酒店总部',name:'entrustHotel3'},
                        {label:'资金上划至地产公司',name:'entrustHotel4'},
                        {label:'资金申请',name:'entrustHotel5'}
                        ]"
            />
        </dl-col>
    </el-row>

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

        <el-col v-else :span="12" class="right-col">
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
                    :key="item.linfnr"
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
                    v-for="item in payBankInfoOptions"
                    :key="item.bankName"
                    :label="item.bankName"
                    :value="item.bankName">
                </el-option>
            </el-select>
            </div>
        </el-col>

        <dl-col v-if="(form.bizEntityJson.isLand == 'true' || form.bizEntityJson.isBusiness == 'true') && form.bizEntityJson.area2 == 'true' " :span="12" title="收款单位开户银行" place="right" >
            <el-input v-model="form.bizEntityJson.receiveBankName" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <el-col v-else :span="12" class="right-col">
          <div class="d-min">
            <span>收款单位开户银行</span>
            <el-select v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankNameChange" :disabled="form.bizEntityJson.disabled">
              <el-option
                v-for="item in receiveBankInfoOptions"
                :key="item.bankName"
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

        <el-col v-else :span="12" class="right-col">
            <div class="d-min">
                <span>收款单位帐号</span>
                <el-select v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? ''  : '请选择'" @change="receiveBankAccountChange" :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="item in receiveBankInfoOptions"
                    :key="item.account"
                    :label="item.account"
                    :value="item.account">
                </el-option>
            </el-select>
            </div>
        </el-col>

       

        <el-col :span="12">
            <div class="d-min">
            <span>付款金额(元)(小写)</span>
            <el-input :class="{'novalue': !form.bizEntityJson.payAmtSmallDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payAmtSmallDesc" v-filter-check-number @change="payAmtSmallDescChange" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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

    <el-row v-if="form.bizEntityJson.disabled" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>付款会计信息</h2>
        </el-col>

        <dl-col :span="8">
            <el-select :class="{'novalue': !form.bizEntityJson.businessType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                <el-option label="保证金押金类-租赁保证金" value="0"></el-option>
                <el-option label="保证金押金类-其他保证金" value="1"></el-option>      
            </el-select>
        </dl-col>

         <dl-col :span="6">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'已提交全额发票',name:'isAllInvoice'}
                        ]"
            />
        </dl-col>

        <dl-col :span="6" title="缺票金额"  v-if="form.bizEntityJson.isAllInvoice != 'true'">
            <el-input v-model="form.bizEntityJson.missingTicketAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="6"   v-else>

        </dl-col>

        <dl-col :span="4"  place="right">
        </dl-col>

    </el-row>

    <el-row v-if="form.bizEntityJson.disabled" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>收款会计信息</h2>
        </el-col>

         <dl-col :span="8" >
            <el-select :class="{'novalue': !form.bizEntityJson.businessTypeReceipt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessTypeReceipt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                <el-option label="保证金押金类-租赁保证金" value="0"></el-option>
                <el-option label="保证金押金类-其他保证金" value="1"></el-option>      
            </el-select>
        </dl-col>

         <dl-col :span="6" >
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'已提交全额发票',name:'isAllInvoiceReceipt'}
                        ]"
            />
        </dl-col>

        <dl-col :span="6" title="缺票金额" v-if="form.bizEntityJson.isAllInvoiceReceipt != 'true'">
          <el-input v-model="form.bizEntityJson.missingTicketAmountReceipt" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="6" v-else>

        </dl-col>

        <dl-col :span="4"  place="right">
        </dl-col>


    </el-row>

    <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>评审资料</h2>
        </el-col>

        <dl-col :span="12" title="凭证号码" >
            <el-input v-model="form.bizEntityJson.voucherNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="12" title="报销单编号" place="right">
            <el-input v-model="form.bizEntityJson.expenseAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>
    
        <dl-col v-if="form.bizEntityJson.noApply == 'true'" :span="12" title="关联资金申请">
            <el-input v-model="form.bizEntityJson.resDisplayNo" readonly></el-input>
        </dl-col>

        <dl-col v-else :span="12" title="关联资金申请" :novalue="!form.bizEntityJson.resDisplayNo">
            <el-select
            :class="{'novalue': !form.bizEntityJson.resDisplayNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.resDisplayNo"
            filterable
            remote
            clearable
            :remote-method="findResUserCd"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in findResUserCdResult"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
             </el-select>
        </dl-col>

        <dl-col :span="12" title="关联资金申请" place="right">
            <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'不关联资金申请',name:'noApply'}
                        ]"
            />
        </dl-col>
    </el-row>

    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      disabled: true,
      loading: false,
      showSelectBank: false,
      payCompaniesOptions: [],
      payBankInfoOptions: [],
      receiveBankInfoOptions: [],
      receiveCompaniesOptions: [],
      contractNoOptions: [],
      authTypeSelect:[],
      authTypeSelectHZXM:[],
      findResUserCdResult:[],
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
            this.$set(this.form.bizEntityJson, 'noApply', 'true')
        }
  },
  methods: {
    isLandChange(){
            if(this.form.bizEntityJson.isHotel == 'false'){
                this.$set(this.form.bizEntityJson, 'hotel1', 'false')
                this.$set(this.form.bizEntityJson, 'hotel2', 'false')
                this.$set(this.form.bizEntityJson, 'hotel3', 'false')
                this.$set(this.form.bizEntityJson, 'hotel4', 'false')
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
    receiveBankNameChange(val){
      let obj = this.receiveBankInfoOptions.find(item => item.bankName == val)
      this.form.bizEntityJson.receiveBankName = obj ? obj.bankName : ''
      this.form.bizEntityJson.receiveAccountNo = obj ? obj.account : ''
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
    },
    //大小写转换
    payAmtSmallDescChange(val){
      this.$set(this.form.bizEntityJson, 'payAmtCapitalDesc', this.convertCurrency(val))
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
              this.payCompaniesOptions.unshift({bukrs: '公司代码',companyName: '公司名称'})
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
              this.receiveCompaniesOptions.unshift({bukrs: '公司代码',companyName: '公司名称'})
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
            userCd: this.userInfo.userid,
        }
        this.loading = true
        this.$approval.findResUserCd(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.findResUserCdResult = res.data
            } else {
              this.findResUserCdResult = []
            }
          }
        })
      } else {
        this.findResUserCdResult = []
      }
    },
    async yykCheck() {
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
              this.$confirm(res.data)
              isGo = false
            }
          }
        })
        if(!isGo){
          return false
        }
      }
    },
  }

}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
