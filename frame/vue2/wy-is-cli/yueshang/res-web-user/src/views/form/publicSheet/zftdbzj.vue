<template>
    <!--支付土地保证金申请表 -->
<div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row class="margin-row blue-row">
        <dl-col :span="24" place="top right" :novalue="form.bizEntityJson.centerLaunch != 'true' &&  form.bizEntityJson.businessLaunch != 'true'">
            <d-radio-group-string
                    v-model="form.bizEntityJson"
                    @change="isLandChange"
                    :nameList="[{label:'总部',name:'centerLaunch'},
                        {label:'事业部',name:'businessLaunch'}
                        ]"
            />
        </dl-col>

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
                <el-input v-model="form.bizEntityJson.receiveUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
                <el-input v-model="form.bizEntityJson.receiveBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
                <el-input v-model="form.bizEntityJson.receiveAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
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
                <span>最晚支付时间：</span>
                <el-date-picker
                        :class="{'novalue': !form.bizEntityJson.paymentDeadline, 'required': !form.bizEntityJson.disabled}"
                        v-model="form.bizEntityJson.paymentDeadline"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-value="new Date()"
                        :default-time="new Date().format('hh:mm:ss')"
                        clearable
                        type="datetime"
                        :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                        :disabled="form.bizEntityJson.disabled">
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="12" class="right-col">
            <div class="d-min">

            </div>
        </el-col>
        <el-col :span="24" class="right-col">
            <div class="d-min">
                <span>付款事由</span>
                <el-input :class="{'novalue': !form.bizEntityJson.payContentDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payContentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
        </el-col>

        <dl-col v-if="(form.bizEntityJson.centerLaunch == 'true' || form.bizEntityJson.businessLaunch == 'true') && form.bizEntityJson.area2 == 'true'" :span="8" title="走账" :novalue="form.bizEntityJson.accountKeepingTrue != 'true' && form.bizEntityJson.accountKeepingFalse != 'true'">
            <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[{label:'是',name:'accountKeepingTrue'},
                        {label:'否',name:'accountKeepingFalse'}
                        ]"
            />
        </dl-col>
    </el-row>

    <!-- v-if="form.mapEdit.businessType" -->
    <!--<el-row v-if="form.mapEdit.businessType">
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
        <dl-col :span="6">
            <el-checkbox v-model="form.bizEntityJson.isAllInvoice" checked :true-label="'true'" :false-label="'false'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"> 已提交全额发票</el-checkbox>
        </dl-col>
        <dl-col v-if="form.bizEntityJson.isAllInvoice == 'true'" :span="8" place="right" />
        <el-col v-else :span="8" class="right-col">
            <div class="d-min">
                <span>缺票金额</span>
                <el-input v-model="form.bizEntityJson.missingTicketAmount" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"></el-input>
            </div>
        </el-col>
    </el-row>-->

    <el-row class="margin-row green-row">
        <el-col :span="24" class="title-col topRight-col">
            <h2>评审资料</h2>
        </el-col>

        <dl-col :span="12" title="凭证号码" >
            <el-input v-model="form.bizEntityJson.voucherNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col :span="12" title="报销单编号" place="right">
            <el-input v-model="form.bizEntityJson.expenseAccountNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </dl-col>

        <dl-col v-if="form.bizEntityJson.noApply == '0'" :span="12" title="关联资金申请" />
        <dl-col v-else :span="12" title="关联资金申请" :novalue="!form.bizEntityJson.resDisplayNo">
            <el-select
                    v-if="!form.bizEntityJson.disabled"
                    :class="{'novalue': !form.bizEntityJson.resDisplayNo, 'required': !form.bizEntityJson.disabled}"
                    v-model="form.bizEntityJson.resDisplayNo"
                    filterable
                    remote
                    clearable
                    @change="assumeCompanyChange(index, $event)"
                    :remote-method="findResUserCd"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    :disabled="form.bizEntityJson.disabled">
                <el-option
                        v-for="(item, index) in findResUserCdResult"
                        :key="index"
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
            <p v-else class="openUrl-p" @click="openUrl(form.bizEntityJson.resApproveId)">{{form.bizEntityJson.resDisplayNo}}</p>
        </dl-col>

        <dl-col :span="12" place="right">
            <el-checkbox v-model="form.bizEntityJson.noApply" true-label="0" false-label="1">不关联资金申请</el-checkbox>
        </dl-col>

    </el-row>

    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {}, // 线上form声明，需要复制到模板内容配置
                disabled: true,
                loading: false,
                showSelectBank: false,
                payCompaniesOptions: [],
                payBankInfoOptions: [],
                receiveBankInfoOptions: [],
                receiveCompaniesOptions: [],
                findResUserCdResult:[],
                businessTypeOptions:[],
            }
        },
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
                this.$set(this.form.bizEntityJson, 'accountKeepingTrue', 'true')
                this.$set(this.form.bizEntityJson, 'noApply', 'true')
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
            openUrl(approveId) {
                //let approvId =this.form.bizEntityJson.resApproveId;
                if (window.location.href.search(/resdev/) != -1) {
                    if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
                        this.$message.closeAll()
                        this.$message.error('无对应老网批环境')
                    } else {
                        let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: approveId}})
                        window.open(routeData.href, this.approveId)
                    }
                } else if (window.location.href.search(/resdemo/) != -1) {
                    if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
                        window.open(`http://demo.powerlong.com/PowerDesk/res/res-approve-info.action?id=`+approveId)
                    } else {
                        let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: approveId}})
                        window.open(routeData.href, approveId)
                    }
                } else {
                    if (this.form.bizEntityJson.resDisplayNo.substr(0, 1) != 9) {
                        window.open(`http://pd.powerlong.com/res/res-approve-info.action?id=`+approveId)
                    } else {
                        let routeData = this.$router.resolve({path:'detail',query: {id: approveId, processId: approveId}})
                        window.open(routeData.href, approveId)
                    }
                }
            },
            assumeCompanyChange(index ,val){
                let obj = this.findResUserCdResult.find(item => item.approveNo == val)
                this.$set(this.form.bizEntityJson, 'resApproveId', obj ? obj.approveId : '')

            },
            findBusinessType(){
                const param = {
                    approveId:this.$route.query.id,
                    authTypeCd:'FKGL_WLK_110'
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

            validate() {
                this.form.bizEntityJson.payAmtSmallDesc=Number(this.form.bizEntityJson.payAmtSmallDesc).toFixed(2)
                console.log('---',this.form.bizEntityJson.payAmtSmallDesc)
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    @import './publicSheet.scss';
</style>
