<template>
    <!-- 土地、拆迁付款审批单 -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row>
            <dl-col :span="12" place="top" title="公司名称" :novalue="!form.bizEntityJson.companyName">
                <el-input v-model="form.bizEntityJson.companyName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="12" place="top right" title="项目名称" :novalue="!form.bizEntityJson.projectName">
                <el-input v-model="form.bizEntityJson.projectName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" readonly @focus="showSearchOrg=true"/>
            </dl-col>
            <dl-col :span="12" title="合同编号" :novalue="!form.bizEntityJson.contractNo">
                <el-select
                    v-if="!form.bizEntityJson.disabled"
                    v-model="form.bizEntityJson.contractNo"
                    filterable
                    remote
                    clearable
                    @change="optionChange"
                    :remote-method="quickSearch"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled">
                    <el-option
                        v-for="item in contOptions"
                        :key="item.contNo"
                        :label="item.contNo + ' ' + item.contName"
                        :value="item.contNo">
                    </el-option>
                </el-select>
                <p class="openUrl-p" v-else @click="openContDetail">{{ form.bizEntityJson.decideDisplayNo }}</p>
            </dl-col>
            <dl-col :span="12" place="right" title="合同名称" :novalue="!form.bizEntityJson.contractName">
                <el-input v-model="form.bizEntityJson.contractName" readonly/>
            </dl-col>
            <dl-col :span="12" title="定标单">
                <p class="openUrl-p" @click="openResApproveInfo">{{ form.bizEntityJson.decideDisplayNo }}</p>
            </dl-col>
            <dl-col :span="12" place="right">
            </dl-col>
            <dl-col :span="4" place="title">
            </dl-col>
            <dl-col :span="5" place="title">
                <h2>税率</h2>
            </dl-col>
            <dl-col :span="5" place="title">
                <h2>含税</h2>
            </dl-col>
            <dl-col :span="5" place="title">
                <h2>税额</h2>
            </dl-col>
            <dl-col :span="5" place="title right">
                <h2>不含税</h2>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color: #767676;">合同总价</h2>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.totalPrice[0].taxRate" disabled/>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.totalPrice[0].taxPrice" disabled/>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.totalPrice[0].taxRatePrice" disabled/>
            </dl-col>
            <dl-col :span="5" place="right">
                <el-input v-model="form.bizEntityJson.totalPrice[0].noTaxPrice" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color: #767676;">已申请合同款</h2>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.applyTotalPrice[0].taxRate" disabled/>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.applyTotalPrice[0].taxPrice" disabled/>
            </dl-col>
            <dl-col :span="5">
                <el-input v-model="form.bizEntityJson.applyTotalPrice[0].taxRatePrice" disabled/>
            </dl-col>
            <dl-col :span="5" place="right">
                <el-input v-model="form.bizEntityJson.applyTotalPrice[0].noTaxPrice" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color: #767676;">本次申请金额</h2>
            </dl-col>
            <dl-col :span="5" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].taxRate">
                <el-select v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxRate" @change="rateChange" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                           :disabled="form.bizEntityJson.disabled">
                    <el-option v-for="item in taxRateOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </dl-col>
            <dl-col :span="5" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].taxPrice">
                <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event);getNewMoney()"
                          :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                          :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="5" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice">
                <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice" disabled/>
            </dl-col>
            <dl-col :span="5" place="right" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice">
                <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice" disabled/>
            </dl-col>
        </el-row>
        <br>
        <el-row>
            <dl-col :span="24" place="title top right">
                <h2>收款人信息</h2>
            </dl-col>
            <dl-col :span="24" place="right" title="收款人名称" :novalue="!form.bizEntityJson.payer">
                <el-input v-model="form.bizEntityJson.payer" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="24" place="right" title="收款人开户银行">
                <el-input v-model="form.bizEntityJson.payerAccount" readonly/>
            </dl-col>
            <dl-col :span="24" place="right" title="收款人账户号">
                <el-input v-model="form.bizEntityJson.payerBank" readonly/>
            </dl-col>
            <dl-col :span="24" title="需说明事项" place="right" :novalue="!form.bizEntityJson.contentDesc">
                <el-input v-model="form.bizEntityJson.contentDesc" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                          :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
        </el-row>
        <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            showSearchOrg: false,
            taxRateOptions: [],
            contOptions: [],
            contLedgerId: null,
            resApproveInfoId: null,
            loading: false
        }
    },
    /* 本地模板编译需要的数据回传，不需要上传到后台 start */
    props: ['data'],
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                this.form = val
            }
        }
    },
    /* end */
    created() {
        if (!this.$route.query.id) {
            this.$set(this.form.bizEntityJson, 'projectName', null);
            this.$set(this.form.bizEntityJson, 'projectCd', null);
            this.$set(this.form.bizEntityJson, 'contractName', null);
            this.$set(this.form.bizEntityJson, 'contractNo', null);
            this.$set(this.form.bizEntityJson, 'contractTotalAmt', null);
            this.$set(this.form.bizEntityJson, 'contractPaidAmt', null);
            this.$set(this.form.bizEntityJson, 'curPaymentAmt', null);
            this.$set(this.form.bizEntityJson, 'contentDesc', null);
            this.$set(this.form.bizEntityJson, 'resAuthTypeId', null);
            this.$set(this.form.bizEntityJson, 'displayName', null);
            this.$set(this.form.bizEntityJson, 'beforePrice', null);
            this.$set(this.form.bizEntityJson, 'taxRate', null);
            this.$set(this.form.bizEntityJson, 'taxRatePrice', null);
            this.$set(this.form.bizEntityJson, 'totalPrice', []);
            this.$set(this.form.bizEntityJson, 'applyTotalPrice', []);
            this.$set(this.form.bizEntityJson, 'thisApplyTotalPrice', []);
            this.$set(this.form.bizEntityJson, 'decideDisplayId', null);
            this.$set(this.form.bizEntityJson, 'decideDisplayNo', null);
            this.add();
        }
    },
    methods: {
        add() {
            this.form.bizEntityJson.totalPrice = [{
                taxRate: null,
                taxPrice: null,
                taxRatePrice: null,
                noTaxPrice: null
            }];
            this.form.bizEntityJson.applyTotalPrice = [{
                taxRate: null,
                taxPrice: null,
                taxRatePrice: null,
                noTaxPrice: null
            }];
            this.form.bizEntityJson.thisApplyTotalPrice = [{
                taxRate: null,
                taxPrice: null,
                taxRatePrice: null,
                noTaxPrice: null
            }];
        },
        openResApproveInfo() {
            this.loginOldPd("/res/res-approve-info.action", {id: this.form.bizEntityJson.decideDisplayId});
        },
        openContDetail() {
            this.loginOldPd("/cont/cont-ledger!input.action", {id: this.contLedgerId, ledgerType: 1});
        },
        loginOldPd(url, params) {
            const param = {
                loginUiid: JSON.parse(localStorage.getItem("ys_contract_token")).userid,
            };
            this.$approval.loginOldPd(param).then((res) => {
                if (res.code == 1 && res.data) {
                    let url = res.data.data.ssoPdUserUrlList[0].url;
                    url = url.slice(0, url.indexOf("PowerDesk") + 9) + url;
                    const keys = Object.keys(params);
                    for (let i = 0; i < keys.length; i++) {
                        url += i === 1 ? "?" : "&" + keys[i] + "=" + params[keys[i]];
                    }
                    window.open(url, "_blank");
                }
            }).catch(() => {
                this.$message.error("系统错误，请稍后重试");
            });
        },
        quickSearch(query) {
            this.loading = true;
            try {
                if (query !== '') {
                    query = query.toString().trim();
                    const params = {value: query};
                    this.$approval.quickSearchCont(params).then((response) => {
                        if (response.code == 1 && response.data) {
                            this.contOptions = response.data;
                        } else {
                            this.contOptions = [];
                        }
                        this.loading = false;
                    }, () => {
                        this.loading = false;
                        this.contOptions = [];
                    });
                }
            } catch {
                this.loading = false;
                this.$message.error('系统错误，请联系管理员！');
            }
        },
        optionChange(val) {
            const selected = this.contOptions.find((item) => item.contNo == val);

            this.form.bizEntityJson.contractNo = selected.contNo;
            this.form.bizEntityJson.contractName = selected.contName;
            this.contLedgerId = selected.contLedgerId;

            this.findContractReview(selected.contLedgerId);
            this.getCurrentRate(selected.contLedgerId);
            this.getDecideDisplayByContNo(selected.contNo);
        },
        rateChange(val) {

        },
        findContractReview(contLedgerId) {
            const param = {contLedgerId: contLedgerId};
            this.$approval.findContractReview(param).then((response) => {
                if (response.code == 1 && response.data) {
                    const res = response.data;
                    let flag = true;
                    if (res == "noContReviewNo") {
                        this.$alert('合同评审未完成，无法发起付款单或结算单！', '提示', {
                            confirmButtonText: '确定'
                        });
                        flag = false;
                    } else if (res == "noExamine") {
                        this.$alert('合同台账未审核，无法发起付款单或结算单！', '提示', {
                            confirmButtonText: '确定'
                        });
                        flag = false;
                    } else if (res == "noBusType") {
                        this.$alert('获取业务链类型出错！', '提示', {
                            confirmButtonText: '确定'
                        });
                        flag = false;
                    } else if (res == "noProcess") {
                        this.$alert('未获取到业务链信息！', '提示', {
                            confirmButtonText: '确定'
                        });
                        flag = false;
                    } else if (res == "-1") {
                        this.$alert('系统错误，请联系管理员！', '提示', {
                            confirmButtonText: '确定'
                        });
                        flag = false;
                    }
                    if (!flag) {
                        this.form.bizEntityJson.contractNo = null;
                        this.form.bizEntityJson.contractName = null;
                    }
                    return flag;
                }
            }, () => {
                this.$message.error('系统错误，请联系管理员！');
            });
        },
        getCurrentRate(contLedgerId) {
            if (contLedgerId != null && contLedgerId != "") {
                const param = {contLedgerId: contLedgerId};
                this.$approval.getCurrentRate(param).then((response) => {
                    if (response.code == 1 && response.data) {
                        this.taxRateOptions = response.data;
                    } else {
                        this.taxRateOptions = [];
                    }
                }, () => {
                    this.taxRateOptions = [];
                    this.$message.error('系统错误，请联系管理员！');
                });
            }
        },
        getDecideDisplayByContNo(contNo) {
            if (contNo != null && contNo != "") {
                const param = {contNo: contNo};
                this.$approval.getDecideDisplayByContNo(param).then((response) => {
                    if (response.code == 1 && response.data) {
                        this.form.bizEntityJson.decideDisplayId = response.data.decideDisplayId;
                        this.form.bizEntityJson.decideDisplayNo = response.data.decideDisplayNo;
                    } else {
                        this.form.bizEntityJson.decideDisplayId = null;
                        this.form.bizEntityJson.decideDisplayNo = null;
                    }
                }, () => {
                    this.form.bizEntityJson.decideDisplayId = null;
                    this.form.bizEntityJson.decideDisplayNo = null;
                    this.$message.error('系统错误，请联系管理员！');
                });
            }
        },
        async checkContLedger() {
            await this.$approval.checkContLedger(this.contLedgerId).then((response) => {
                if (response.code == 1 && response.data) {
                    const res = response.data;
                    if (res.remainAmount != 0) {
                        this.$alert('合同未分配税率不含税价未分配完成，请先进行税率分配调整后再进行付款', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                    if (res.manualPayNum === null) {
                        this.$alert('合同累计实际支付款未分配税率，请先进行税率分配调整后再进行付款', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                }
            });
        },
        async checkApplyTaxPrice(taxRate, taxPrice) {
            const param = {
                "contLedgerId": this.contLedgerId,
                "tax": taxRate,
                "taxPrice": taxPrice,
                "resApproveInfoId": this.form.bizEntityJson.decideDisplayId
            };
            await this.$approval.checkApplyTaxPrice(param).then((response) => {
                if (response.code == 1 && response.data) {
                    const res = response.data;
                    if (res.result < 0) {
                        this.$alert('合同税率' + taxRate + '%剩余可申请含税付款金额为' + (res.result + parseFloat(taxPrice)).toFixed(2) + '元，请先进行税率分配调整后再进行付款', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                    return true;
                }
            })
        },
        getNewMoney() {
            let taxRate = this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate.replace(/,/g, "");
            let taxPrice = this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice.replace(/,/g, "");
            if (isNaN(taxPrice) || isNaN(taxRate)) {
                return;
            }


            if (this.form.bizEntityJson.applyTotalPrice[0].noTaxPrice == '') {
                this.$alert('请重新填写选择合同编号', '提示', {
                    confirmButtonText: '确定'
                });
                this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice = null;
                return false;
            }
            let status = true;
            status = this.checkContLedger(this.contLedgerId);
            if (status === false) {
                this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice = null;
                return;
            }
            status = this.checkApplyTaxPrice(this.contLedgerId, taxRate, taxPrice);
            if (status === false) {
                this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice = null;
                return;
            }
            this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice = "";
            this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice = this.getNoTaxPrice(this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice, this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate);//不含税金额
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice = this.getNewTaxRatePrice(this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice, this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice);//税额
        },
        getNoTaxPrice(TaxPrice, taxRate) {
            const tax = Number(taxRate.replace(/,/g, "")) / 100;
            return this.formatMoney(Number(TaxPrice.replace(/,/g, "") / (tax + 1)), 2);
        },
        getNewTaxRatePrice(TaxPrice, NoTaxPrice) {
            return this.formatMoney(Number(TaxPrice.replace(/,/g, "")) - Number(NoTaxPrice.replace(/,/g, "")), 2);
        },
        compareInvoicePay() {
            const params = {contNo: this.form.bizEntityJson.contractNo, contractPaidAmt: this.form.bizEntityJson.contractPaidAmt, curPaymentAmt: this.form.bizEntityJson.curPaymentAmt};
            this.$approval.compareInvoicePay(params).then((response) => {
                if (response.code == 1 && response.data) {
                    if ("lackInvoice" == response.data) {
                        this.$alert('缺少发票', '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                }
            })
        },
        closeSearhOrg(val) {
            if (val) {
                this.form.bizEntityJson.projectName = val.text;
                this.form.bizEntityJson.projectCd = val.id;
            }
            this.showSearchOrg = false;
        },
        formatMoney(s, n) {
            let isFu = false;
            // 处理负数（先转正数在统一在return后加上"-"号）
            if (undefined != s && "" != s) {
                s = s + "";
                let ts = s.substr(0, 1);
                if ("-" == ts) {
                    isFu = true;
                    s = s.substr(1, s.length);
                }
            }
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";
            let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            let t = "";
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            let rtn = t.split("").reverse().join("");
            if (n > 0) {
                rtn = rtn + "." + r;
            }
            return isFu ? ("-" + rtn) : rtn;
        }
    }
}
</script>