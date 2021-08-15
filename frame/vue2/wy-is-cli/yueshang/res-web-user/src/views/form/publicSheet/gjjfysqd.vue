<template>
    <!-- 工资费用申请单 -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row :gutter="24" class="top-row right-col">
            <dl-col class="right-col" :span="24" :novalue="form.bizEntityJson.positionLevel1 != 'true' && form.bizEntityJson.positionLevel2 != 'true' && form.bizEntityJson.positionLevel3 != 'true' && form.bizEntityJson.positionLevel4 != 'true' && form.bizEntityJson.positionLevel5 != 'true' && form.bizEntityJson.positionLevel6 != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'总部',name:'positionLevel1'},
                        {label:'事业部',name:'positionLevel2'},
                        {label:'城市公司',name:'positionLevel3'},
                        {label:'规划设计研究院',name:'positionLevel4'},
                        {label:'直销公司',name:'positionLevel5'},
                        {label:'宝龙公益基金会',name:'positionLevel6'}
                      ]"
                />
            </dl-col>
            <el-col :span="24" class="right-col">
                <div class="explain-p">
                    <p>*入账公司可自行切换</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="top-row">
            <el-col :span="12">
                <div class="d-min">
          <span>
            报销入账公司
            <el-tooltip class="item" effect="dark" content="入账公司可自行切换" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
                    <el-select
                            :class="{'novalue': !form.bizEntityJson.acctUnitName, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.acctUnitName"
                            filterable
                            remote
                            clearable
                            @change="acctUnitNameChange"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                            :disabled="form.bizEntityJson.disabled">
                        <el-option
                                v-for="item in acctUnitNameOptions"
                                :key="item.companyCode"
                                :label="item.companyName"
                                :value="item.companyName">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12" class="right-col" v-if="!((form.bizEntityJson.disabled &&form.status == '完成')||(form.bizEntityJson.disabled &&form.status == '审批中'))">
                <div class="d-min">
                    <span>方案号</span>
                    <el-select class="right-col"
                               popper-class="select-header"
                               :class="{'novalue': !form.bizEntityJson.actionId, 'required': !form.bizEntityJson.disabled}"
                               v-model="form.bizEntityJson.actionId"
                               filterable
                               remote
                               clearable
                               @change="actionIdChange"
                               :remote-method="remoteMethod2"
                               :loading="loading"
                               :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                               :disabled="form.bizEntityJson.disabled">
                        <el-option
                                v-for="(item, index) in actionIdOptions"
                                :key="index"
                                :label="item.actionId"
                                :value="item.actionId">
                            <el-row :gutter="24">
                                <el-col :span="7">
                                    <span>{{ item.actionId }}</span>
                                </el-col>
                                <el-col :span="17">
                                    <span>{{ item.companyName }}</span>
                                </el-col>
                            </el-row>
                        </el-option>
                    </el-select>
                    <p v-if="form.status != '完成'&& form.status != '审批中'" class="openUrl-p" @click="openUrl(form.bizEntityJson.actionId)">方案维护管理</p>
                </div>
            </el-col>
            <el-col v-else :span="12" class="right-col">
                <div class="d-min">
                    <span>方案号</span>
                    <p class="openUrl-p" @click="openUrl(form.bizEntityJson.actionId)">{{form.bizEntityJson.actionId}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>报销币种</span>
                    <el-select :class="{'novalue': !form.bizEntityJson.currencyAmt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.currencyAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                        <el-option label="人民币" value="CNY"></el-option>
                        <el-option label="美元" value="USD"></el-option>
                        <el-option label="港元" value="HKD"></el-option>
                        <el-option label="欧元" value="EUR"></el-option>
                        <el-option label="日元" value="JPY"></el-option>
                        <el-option label="新加坡币" value="SGD"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span v-if="form.bizEntityJson.currencyAmt != 'CNY'">汇率(保留5位小数)</span>
                    <el-input v-if="form.bizEntityJson.currencyAmt != 'CNY'" :class="{'novalue': !form.bizEntityJson.exchangeRate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.exchangeRate" v-limit-number="5" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="24" class="table-col right-col table-checkbox">
                <el-table ref="table" :data="form.bizEntityJson.salaryInfos" size="mini" border stripe header-row-class-name="table-header">
                    <el-table-column label="费用实际承担部门" align="right">
                        <template slot-scope="scope">
                            <span>{{ scope.row.orgName }}</span>
                            <span v-if="form.bizEntityJson.disabled">{{scope.row.orgCoreCd}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="核算部门" align="right">
                        <template slot-scope="scope">
                            <span>{{ scope.row.department }}</span>
                            <!--<span v-if="form.bizEntityJson.disabled">{{scope.row.csks}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="包干比例" prop="ratio" align="right" />
                    <el-table-column label="场景" prop="sceneConfigName" align="right" />
                    <el-table-column label="发票内容" prop="content" align="right" />
                    <el-table-column label="工资" align="right">
                        <template slot-scope="scope">
                            <span>{{ scope.row.salary }}</span>
                            <!--<span v-if="form.bizEntityJson.disabled">{{scope.row.salaryAll}}</span>
                            <span v-if="form.bizEntityJson.disabled">{{scope.row.taxInclusive}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="奖金" prop="bonus" align="right" />
                    <el-table-column label="业绩提成" prop="salesCommission" align="right" />
                    <el-table-column label="代扣" prop="dTax" align="right" />

                    <el-table-column label="预算科目" align="right">
                        <template slot-scope="scope">
                            <span>{{ scope.row.subjectName }}</span>
                            <!--<span v-if="form.bizEntityJson.disabled">{{scope.row.subjectId}}</span>-->
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" prop="text" align="right" />
                </el-table>
            </el-col>
            <!--<el-col :span="24" class="topRight-col">
                <div class="d-min">
                    <span>价税合计(A+B)(元)</span>
                    <el-input v-model="form.bizEntityJson.allAmount" readonly></el-input>
                </div>
            </el-col>-->
            <el-col :span="24" class="title-col topRight-col">
                <h2>付款信息</h2>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span>付款方式</span>
                    <div class="d-red" :class="{'novalue': form.bizEntityJson.type1 != 'true' && form.bizEntityJson.type2 != 'true' && form.bizEntityJson.type3 != 'true' && form.bizEntityJson.type4 != 'true' && form.bizEntityJson.type5 != 'true' && form.bizEntityJson.type6 != 'true', 'required': !form.bizEntityJson.disabled}">
                        <d-radio-group
                                v-model="form.bizEntityJson"
                                :nameList="[{label:'现金',name:'type1'},
                          {label:'电汇',name:'type2'},
                          {label:'信用证',name:'type3'},
                          {label:'转账',name:'type4'},
                          {label:'票汇',name:'type5'},
                          {label:'其他',name:'type6'},]"
                        />
                    </div>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="d-min">
                    <span>收款人</span>
                    <el-input v-model="form.bizEntityJson.receivingUnit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>账号</span>
                    <el-input v-model="form.bizEntityJson.accountNumber" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>开户行</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.openingBank, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.openingBank" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>实付金额</span>
                    <el-input v-model="form.bizEntityJson.allAmount" readonly></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
          <span style="display: flex;">
            (大写)人民币
          </span>
                    <el-input :value="form.bizEntityJson.allAmount === '' || form.bizEntityJson.allAmount === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.allAmount)" readonly></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>代付信息</span>
                    <el-checkbox v-model="form.bizEntityJson.isReplacePay" true-label="true" false-label="false">是否代付</el-checkbox>
                </div>
            </el-col>
            <el-col :span="12" v-if="form.bizEntityJson.isReplacePay == 'true'">
                <div class="d-min">
                    <span>代支付公司</span>
                    <el-select
                            v-if="form.bizEntityJson.isReplacePay == 'true'"
                            :class="{'novalue': !form.bizEntityJson.assumeCompany, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.assumeCompany"
                            filterable
                            remote
                            clearable
                            @change="assumeCompanyChange"
                            :remote-method="remoteMethod4"
                            :loading="loading"
                            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                            :disabled="form.bizEntityJson.disabled">
                        <el-option
                                v-for="item in assumeCompanyOptions"
                                :key="item.assumeBukrs"
                                :label="item.assumeCompany"
                                :value="item.assumeCompany">
                            <el-row :gutter="24">
                                <el-col :span="5">
                                    <span>{{ item.assumeBukrs }}</span>
                                </el-col>
                                <el-col :span="19">
                                    <span>{{ item.assumeCompany }}</span>
                                </el-col>
                            </el-row>
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12"  class="right-col" v-if="form.bizEntityJson.isReplacePay == 'true'">
                <div class="d-min">

                    <el-input  readonly></el-input>
                </div>
            </el-col>
            <el-row v-if="form.mapEdit.businessType">
                <el-col :span="24" class="title-col" >
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

                <el-col :span="12"  class="right-col">
                    <div class="d-min">

                        <el-input  readonly></el-input>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
        <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
        <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {},
                showSearchUser1: false,
                showSearchUser2: false,
                showTrafficCostDetail: false,
                showSelectBank: false,
                loading: false,
                acctUnitNameOptions: [],
                actionIdOptions: [],
                assumeCompanyOptions: [],
                bankAccountList: [],
                wpIdOptions: [],
                accumulationList: [],
                businessTypeOptions: [],
            }
        },
        props: ['data'],
        computed: {

        },
        watch: {
            data: {
                immediate: true,
                handler: function(val) {
                    console.log(val)
                    this.form = val;
                }
            },

            'form.bizEntityJson.exchangeRate'(val) {
                if (this.form.bizEntityJson.detailList === undefined) return
                if (this.form.bizEntityJson.detailList.length > 0) {
                    this.form.bizEntityJson.detailList.forEach((item, index) => {
                        if (this.form.bizEntityJson.currencyAmt != 'CNY') {
                            item.standardMoney = (Number(item.currentAmt) * Number(val)).toFixed(2)
                        }
                    })
                }
            }
        },
        created() {
            if (!this.$route.query.id) {
                this.findCompanyByOrgCdInLoad()

                this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
                this.$set(this.form.bizEntityJson, 'orgParentName', this.userInfo.centerOrgName)
                this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.orgName)
                this.$set(this.form.bizEntityJson, 'currencyAmt', 'CNY')
                this.$set(this.form.bizEntityJson, 'detailList', [])
                this.$set(this.form.bizEntityJson, 'salaryInfos', [])
                this.$set(this.form.bizEntityJson, 'rdList', [])
                this.$set(this.form.bizEntityJson, 'receiveAcctNo', '')
                this.$set(this.form.bizEntityJson, 'receivingUnit', '员工工资')
                this.$set(this.form.bizEntityJson, 'type4', 'true')
                this.$set(this.form.bizEntityJson, 'sysBankCode', '102110000951')
                this.$set(this.form.bizEntityJson, 'exchangeRate', 0.0.toFixed(5))
            }
            if (this.form.bizEntityJson.disabled) {
                this.findBusinessType()
                // this.selectBusinessType()
            }
        },
        mounted() {
        },
        methods: {
            findBusinessType(){
                const param = {
                    approveId:this.$route.query.id,
                    authTypeCd:'XZRL_GZXX'
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
            openUrl(actionId) {
                if(actionId==null || actionId ==""){
                    window.open('https://demo.powerlong.com/cost_static/main/main_old.html#/fin_salary_info/')
                }else{
                    window.open('https://demo.powerlong.com/cost_static/main/main_old.html#/fin_salary_info/'+actionId)
                }
            },

            findCompanyByOrgCdInLoad() {
                this.$approval.findCompanyByOrgCdInLoad().then(res => {
                    if(res.code == 1 && res.message == 'success') {
                        if (res.data) {
                            this.$set(this.form.bizEntityJson, 'acctUnitName', res.data.companyName)
                            this.$set(this.form.bizEntityJson, 'acctUnitCd', res.data.companyCode)
                        } else {
                            this.$set(this.form.bizEntityJson, 'acctUnitName', '')
                            this.$set(this.form.bizEntityJson, 'acctUnitCd', '')
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            remoteMethod(query) {
                if (query) {
                    this.loading = true
                    this.$approval.postFindCompanyList({companyName: query}).then(res => {
                        if(res.code == 1) {
                            if (res.data.length > 0) {
                                this.acctUnitNameOptions = res.data
                            } else {
                                this.acctUnitNameOptions = []
                            }
                        } else {
                            this.$message.error(res.message)
                        }
                        this.loading = false
                    })
                } else {
                    this.acctUnitNameOptions = []
                }
            },
            remoteMethod2(query) {
                const param = {
                    companyName: this.form.bizEntityJson.acctUnitName,
                    value: query
                }
                if (query) {
                    this.loading = true
                    this.$approval.querySalaryActionId(param).then(res => {
                        if(res.code == 1) {
                            if (res.data.length > 0) {
                                this.actionIdOptions = res.data
                                this.actionIdOptions.unshift({
                                    actionId: '方案号',
                                    companyName: '报销入账公司名称'
                                })
                            } else {
                                this.actionIdOptions = []
                            }
                        } else {
                            this.$message.error(res.message)
                        }
                        this.loading = false
                    })
                } else {
                    this.actionIdOptions = []
                }
            },
            remoteMethod4(query) {
                if (query) {
                    this.loading = true
                    this.$approval.findSapSup({companyName: query}).then(res => {
                        if(res.code == 1) {
                            if (res.data.length > 0) {
                                this.assumeCompanyOptions = res.data
                            } else {
                                this.assumeCompanyOptions = []
                            }
                        } else {
                            this.$message.error(res.message)
                        }
                        this.loading = false
                    })
                } else {
                    this.assumeCompanyOptions = []
                }
            },

            acctUnitNameChange(val) {
                let obj = this.acctUnitNameOptions.find(item => item.companyName == val)
                this.form.bizEntityJson.acctUnitCd = obj ? obj.companyCode : ''
                this.form.bizEntityJson.rdList = []
                this.wpIdOptions = []
                if (!val) {
                    this.form.bizEntityJson.whethersLendAmt = 'false'
                    this.form.bizEntityJson.borrower = ''
                    this.form.bizEntityJson.borrowCd = ''
                }
            },

            actionIdChange(val) {
                if (!val) return
                let obj = this.actionIdOptions.find(item => item.actionId == val)
                this.form.bizEntityJson.acctUnitName = obj ? obj.companyName : ''
                this.form.bizEntityJson.salaryInfos = []
                const param = {
                    actionId: val,
                }
                this.$approval.querySalaryActionList(param).then(res => {
                    if(res.code == 1 && res.data){
                        this.form.bizEntityJson.salaryInfos = res.data.vos
                        this.accumulationList = res.data.vos
                        this.form.bizEntityJson.allAmount = res.data.allAmount
                        this.form.bizEntityJson.actionId = res.data.actionId

                    } else {
                        this.$message.error(res.message)
                    }
                })
            },

            assumeCompanyChange(val) {
                let obj = this.assumeCompanyOptions.find(item => item.assumeCompany == val)
                this.form.bizEntityJson.assumeBukrs = obj ? obj.assumeBukrs : ''
            },

            closeSearhUser1(val) {
                if (val) {
                    this.form.bizEntityJson.borrower = val.userName
                    this.form.bizEntityJson.borrowCd = val.userCd
                }
                this.showSearchUser1 = false
            },
            closeSearhUser2(val) {
                if (val) {
                    this.form.bizEntityJson.receiveAcctNo = ''
                    this.form.bizEntityJson.receiveNameTrue = val.userName
                    this.form.bizEntityJson.receiveCd = val.userCd
                    this.$approval.findBankAccountByUserId({userId: val.userCd}).then(res => {
                        if(res.code == 1){
                            this.bankAccountList = res.data || []
                            if (res.data[0]) this.form.bizEntityJson.receiveAcctNo = this.bankAccountList[0].accountNum
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }
                this.showSearchUser2 = false
            },

            closeSelectBank(val) {
                if (val) {
                    this.form.bizEntityJson.openingBank = val.bankName
                    this.form.bizEntityJson.sysBankCode = val.bankCode
                }
                this.showSelectBank = false
            },

            // 页面发起时校验
            async gjjCheck() {
                var dataArray = new Array();
                var amountArray = new Array();
                var isMainData = true;
                var checkMoney = true;
                var i = 0;
                for(let index in this.accumulationList) {
                    const param = {
                        orgCoreCd: this.accumulationList[index].orgCoreCd,
                    }
                    var checkDept = false;
                    let data = await this.$approval.checkDepartment(param)
                    checkDept =  data
                    if(checkDept == true) {
                        isMainData = true;
                        var ratio = "";
                        if (this.accumulationList[index].ratio == "" || this.accumulationList[index].ratio == null) {
                            ratio = parseFloat(1);
                        } else {
                            ratio = parseFloat(this.accumulationList[index].ratio) / 100;//包干比例
                        }
                        var company = parseFloat(this.accumulationList[index].company) * ratio;//工资

                        amountArray[i] = company + ";" + "0" + ";" + "0" + ";" + "0";//金额（为了适配公用方法其他参数为空）
                        var orgNames = this.accumulationList[index].orgName.split("-");
                        dataArray[i] = this.accumulationList[index].orgCoreCd + ";" + ";" + this.accumulationList[index].subjectId + ";" + orgNames[0];//orgCd + subjectName + subjectId + orgName
                        i++;
                    } else if ("dept is not exits" == checkDept) {
                        alert("部门不存在");
                        checkMoney = false;
                        isMainData = false;
                        return false;
                    }else if("orgCd is not exist" == checkDept){
                        alert("项目不存在");
                        checkMoney = false;
                        isMainData = false;
                        return false;
                    }
                }
                if(isMainData == true ){
                    const param = {
                        dataArray: JSON.stringify(dataArray),
                        amountArray: JSON.stringify(amountArray),
                        plate: "2"
                    }
                    let result = await this.$approval.findBudgetUsedDetail(param)
                    if(!result){
                        checkMoney = true;
                    }else {
                        alert(result);
                        checkMoney = false;
                    }
                }
                return checkMoney;
            },
            validate() {

            },
        }
    }
</script>
<style type="text/css" lang="scss">
    @import './publicSheet.scss';
</style>
