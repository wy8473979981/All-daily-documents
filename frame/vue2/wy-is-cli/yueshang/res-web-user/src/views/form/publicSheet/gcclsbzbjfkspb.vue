<template>
    <!-- 工程、材料设备质保金付款审批表 -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row>
            <dl-col :span="24" title="集团" place="top right" :novalue="form.bizEntityJson.isDc !== 'true' && form.bizEntityJson.isHotel !== 'true' && form.bizEntityJson.isCzgy !== 'true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                          {name:'isDc',label:'地产'},
                                          {name:'isHotel',label:'酒店'},
                                          {name:'isCzgy',label:'长租公寓'}
                                          ]"
                />
            </dl-col>
            <dl-col :span="24" title="区域" place="right">
                <el-select v-model="form.bizEntityJson.landedArea" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                    <el-option v-for="item in areaOptions" :key="item.orgCd" :label="item.orgName" :value="item.orgCd"></el-option>
                </el-select>
            </dl-col>
            <dl-col :span="12" title="项目">
                <el-input v-model="form.bizEntityJson.projectCd" disabled/>
            </dl-col>
            <dl-col :span="12" title="期数" place="right">
                <el-input v-model="form.bizEntityJson.projectPeriod" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="合同编号" :novalue="!form.bizEntityJson.contNo">
                <el-select v-model="form.bizEntityJson.contNo" v-if="!form.bizEntityJson.disabled" @change="contChange" filterable clearable remote :remote-method="contFindFuzzy" :loading="loading"
                           :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled">
                    <el-option v-for="item in contOptions" :key="item.contNo" :label="item.contName" :value="item.contNo">
                    </el-option>
                </el-select>
                <p class="openUrl-p" @click="loginOldPd" v-else>{{ form.bizEntityJson.contNo }}</p>
            </dl-col>
            <dl-col :span="12" title="合同名称" place="right">
                <el-input v-model="form.bizEntityJson.contName" disabled/>
            </dl-col>
            <dl-col :span="24" title="付款单位" place="right" :novalue="!form.bizEntityJson.paymentUnit">
                <el-input v-model="form.bizEntityJson.paymentUnit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="收款人名称">
                <el-input v-model="form.bizEntityJson.partB" disabled/>
            </dl-col>
            <dl-col :span="12" title="收款人开户行" place="right" :novalue="!form.bizEntityJson.payeeOpenBankNo">
                <el-input v-model="form.bizEntityJson.payeeOpenBankNo" disabled/>
            </dl-col>
            <dl-col :span="12" title="收款人账号" :novalue="!form.bizEntityJson.payeeAccountNo">
                <el-input v-model="form.bizEntityJson.payeeAccountNo" disabled/>
            </dl-col>
            <dl-col :span="12" title="付款方式" place="right">
                <el-input v-model="form.bizEntityJson.payWay" disabled/>
            </dl-col>
            <dl-col :span="6" title="保修期起止时间">
                <el-input v-model="form.bizEntityJson.guarBeginDate" disabled/>
            </dl-col>
            <dl-col :span="6" title="至">
                <el-input v-model="form.bizEntityJson.guarEndDate" disabled/>
            </dl-col>
            <dl-col :span="12" place="right" style="border-left:none;">
            </dl-col>
            <dl-col :span="24" title="是否纳入保理" :novalue="form.bizEntityJson.isFactoring !== 'true'">
                <el-checkbox v-model="form.bizEntityJson.isFactoring" true-label="true" false-label="false"><span v-if="form.status!='完成'">是</span></el-checkbox>
            </dl-col>
            <dl-col :span="24" title="" place="right">
                <dl-col :span="6" place="title" style="border-bottom:none;border-left:none;">
                    <h2>税率(%)</h2>
                </dl-col>
                <dl-col :span="6" place="title" style="border-bottom:none;">
                    <h2>含税</h2>
                </dl-col>
                <dl-col :span="6" place="title" style="border-bottom:none;">
                    <h2>税额</h2>
                </dl-col>
                <dl-col :span="6" place="title" style="border-bottom:none;">
                    <h2>不含税</h2>
                </dl-col>
            </dl-col>
            <dl-col :span="24" place="right" title="原合同价">
                <dl-col :span="6" style="border-bottom:none;border-left:none;">
                    <el-input v-model="form.bizEntityJson.primaryTotalPrice[0].taxRate" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.primaryTotalPrice[0].taxPrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.primaryTotalPrice[0].taxRatePrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.primaryTotalPrice[0].noTaxPrice" disabled/>
                </dl-col>
            </dl-col>
            <dl-col :span="24" place="right" title="结算总价">
                <dl-col :span="6" style="border-bottom:none;border-left:none;">
                    <el-input v-model="form.bizEntityJson.estimateTotalPrice[0].taxRate" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.estimateTotalPrice[0].taxPrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.estimateTotalPrice[0].taxRatePrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.estimateTotalPrice[0].noTaxPrice" disabled/>
                </dl-col>
            </dl-col>
            <dl-col :span="24" place="right" title="本次申请支付质保金">
                <dl-col :span="6" style="border-bottom:none;border-left:none;" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].taxRate">
                    <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxRate" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;" :novalue="!form.bizEntityJson.thisApplyTotalPrice[0].taxPrice">
                    <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxPrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice" disabled/>
                </dl-col>
                <dl-col :span="6" style="border-bottom:none;">
                    <el-input v-model="form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice" ref="applyNoTaxPrice" disabled/>
                </dl-col>
            </dl-col>
            <dl-col :span="24" place="right" title="">
                <template v-for="(applyTax, index) in form.bizEntityJson.applyTaxList">
                    <dl-col :span="24" style="border:none;" :key="'applyTaxListItem'+index">
                        <dl-col :span="6" style="border-left:none;" :style="index===form.bizEntityJson.applyTaxList.length-1?{'border-bottom':'none'}:''" :novalue="!applyTax.taxRate">
                            <el-select v-model="applyTax.taxRate" @change="calTaxRatePrice(index)" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
                                <el-option v-for="item in rateOptions.applyTaxList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </dl-col>
                        <dl-col :span="6" :style="index===form.bizEntityJson.applyTaxList.length-1?{'border-bottom':'none'}:''" :novalue="!applyTax.taxPrice">
                            <el-input v-model="applyTax.taxPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event);calTaxRatePrice(index)"
                                      :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                        </dl-col>
                        <dl-col :span="6" :style="index===form.bizEntityJson.applyTaxList.length-1?{'border-bottom':'none'}:''">
                            <el-input v-model="applyTax.taxRatePrice" disabled/>
                        </dl-col>
                        <dl-col :span="4" :style="index===form.bizEntityJson.applyTaxList.length-1?{'border-bottom':'none'}:''" :novalue="!applyTax.noTaxPrice">
                            <el-input v-model="applyTax.noTaxPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event);calNoTaxPrice(index)"
                                      :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                        </dl-col>
                        <dl-col :span="2" :style="index===form.bizEntityJson.applyTaxList.length-1?{'border-bottom':'none'}:''">
                            <div class="explain-p">
                                <p class="explain-p-one">
                                    <span v-if="index===0" class="explain-btn-add" @click="addListItem('applyTaxList')">添加</span>
                                    <span v-else class="explain-btn-del" @click="delListItem('applyTaxList', index)">删除</span>
                                </p>
                            </div>
                        </dl-col>
                    </dl-col>
                </template>
            </dl-col>
            <dl-col :span="24" place="right" :novalue="form.bizEntityJson.hotel !== 'true' && form.bizEntityJson.hasEstate !== 'true' && form.bizEntityJson.residential !== 'true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                          {name:'hotel',label:'与酒店有关'},
                                          {name:'hasEstate',label:'有商业公司'},
                                          {name:'residential',label:'住宅'}
                                          ]"
                />
            </dl-col>
        </el-row>
        <br>
        <el-row>
            <dl-col :span="24" place="title top right">
                <h2>计算公式信息</h2>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">预留质保金到期可支付剩余金额(不含税)</h2>
            </dl-col>
            <dl-col :span="8">
                <el-input v-model="form.bizEntityJson.resRetentionMoneyTotalNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">预留质保金到期可支付总额(不含税)</h2>
            </dl-col>
            <dl-col :span="8" place="right">
                <el-input v-model="form.bizEntityJson.resRetentionMoneyPayTotalNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">预留质保金已申请(不含税)</h2>
            </dl-col>
            <dl-col :span="8">
                <el-input v-model="form.bizEntityJson.resRetentionMoneyApplyNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">预留质保金已实付(不含税)</h2>
            </dl-col>
            <dl-col :span="8" place="right">
                <el-input v-model="form.bizEntityJson.resRetentionMoneySfNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">保修应扣款总额(不含税)</h2>
            </dl-col>
            <dl-col :span="8">
                <el-input v-model="form.bizEntityJson.warrantyDeductedTotalNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">保修应扣款剩余未支付总额(不含税)</h2>
            </dl-col>
            <dl-col :span="8" place="right">
                <el-input v-model="form.bizEntityJson.warrantyDeductedNoPayTotalNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">预留质保金到期可支付剩余金额(不含税)</h2>
            </dl-col>
            <dl-col :span="8">
                <el-input v-model="form.bizEntityJson.retentionDepositBalanceNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
            </dl-col>
            <dl-col :span="8" place="right">
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">本次保修应扣款金额(不含税)</h2>
            </dl-col>
            <dl-col :span="8">
                <el-input v-model="form.bizEntityJson.warrantyDeductedNoTax" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">本次保修应扣款金额(含税)</h2>
            </dl-col>
            <dl-col :span="8" place="right">
                <el-input v-model="form.bizEntityJson.warrantyDeductedTax" disabled/>
            </dl-col>
            <dl-col :span="24" place="right">
                <dl-col :span="4" place="title right" style="border-bottom:none;border-left:none;">
                </dl-col>
                <dl-col :span="5" place="title" style="border-bottom:none;border-left:none;">
                    <h2>税率(%)</h2>
                </dl-col>
                <dl-col :span="5" place="title" style="border-bottom:none;">
                    <h2>含税</h2>
                </dl-col>
                <dl-col :span="5" place="title" style="border-bottom:none;">
                    <h2>税额</h2>
                </dl-col>
                <dl-col :span="5" place="title" style="border-bottom:none;">
                    <h2>不含税</h2>
                </dl-col>
            </dl-col>
            <dl-col :span="24" place="right">
                <template v-for="(warrantyDeductedTax, index) in form.bizEntityJson.warrantyDeductedTaxList">
                    <dl-col :span="24" style="border:none;" :key="'warrantyDeductedTaxListItem'+index">
                        <dl-col :span="4" place="title right" style="border-bottom:none;border-left:none;">
                            <h2 style="color:#767676;">{{ index === 0 ? '其中扣减部分' : '' }}</h2>
                        </dl-col>
                        <dl-col :span="5" style="border-left:none;" :style="index===form.bizEntityJson.warrantyDeductedTaxList.length-1?{'border-bottom':'none'}:''"
                                :novalue="!warrantyDeductedTax.taxRate">
                            <el-select v-model="warrantyDeductedTax.taxRate" @change="calTaxRatePriceKK(index)" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                       :disabled="form.bizEntityJson.disabled">
                                <el-option v-for="item in rateOptions.warrantyDeductedTaxList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </dl-col>
                        <dl-col :span="5" :style="index===form.bizEntityJson.warrantyDeductedTaxList.length-1?{'border-bottom':'none'}:''" :novalue="!warrantyDeductedTax.taxPrice">
                            <el-input v-model="warrantyDeductedTax.taxPrice" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event);calTaxRatePriceKK(index)"
                                      :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                        </dl-col>
                        <dl-col :span="5" :style="index===form.bizEntityJson.warrantyDeductedTaxList.length-1?{'border-bottom':'none'}:''">
                            <el-input v-model="warrantyDeductedTax.taxRatePrice" disabled/>
                        </dl-col>
                        <dl-col :span="4" :style="index===form.bizEntityJson.warrantyDeductedTaxList.length-1?{'border-bottom':'none'}:''">
                            <el-input v-model="warrantyDeductedTax.noTaxPrice" disabled/>
                        </dl-col>
                        <dl-col :span="1" :style="index===form.bizEntityJson.warrantyDeductedTaxList.length-1?{'border-bottom':'none'}:''">
                            <div class="explain-p">
                                <p class="explain-p-one">
                                    <span v-if="index===0" class="explain-btn-add" @click="addListItem('warrantyDeductedTaxList')">添加</span>
                                    <span v-else class="explain-btn-del" @click="delListItem('warrantyDeductedTaxList', index)">删除</span>
                                </p>
                            </div>
                        </dl-col>
                    </dl-col>
                </template>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">本次应付质保金现金(不含税)</h2>
            </dl-col>
            <dl-col :span="8" :novalue="!form.bizEntityJson.fuPayMoeny">
                <el-input v-model="form.bizEntityJson.fuPayMoeny" disabled/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">本次应付质保金现金(含税)</h2>
            </dl-col>
            <dl-col :span="8" place="right" :novalue="!form.bizEntityJson.fuPayTaxMoeny">
                <el-input v-model="form.bizEntityJson.fuPayTaxMoeny" disabled/>
            </dl-col>
            <dl-col :span="24" place="title right">
                <h2 style="color:#767676;">需说明事项</h2>
            </dl-col>
            <dl-col :span="24" place="right" :novalue="!form.bizEntityJson.description">
                <el-input v-model="form.bizEntityJson.description" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
        </el-row>
        <br>
        <el-row>
            <dl-col :span="24" place="title top right">
                <h2>附件资料</h2>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">工程或材料设备结算款付款审批表</h2>
            </dl-col>
            <dl-col :span="20" place="right" :novalue="!form.bizEntityJson.mateSettleId">
                <one-file :form="form" value="mateSettleId"/>
            </dl-col>
            <dl-col :span="4" place="title">
                <h2 style="color:#767676;">结算审批表</h2>
            </dl-col>
            <dl-col :span="20" place="right" :novalue="!form.bizEntityJson.settleApproveId">
                <one-file :form="form" value="settleApproveId"/>
            </dl-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            areaOptions: [],
            contOptions: [],
            loading: false,
            rateOptions: {
                applyTaxList: [],
                warrantyDeductedTaxList: []
            },
            mapParam: {},
            isChecking: false,
            noTaxSpMoney: null,
            resApproveInfoId: null
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
        console.log(this.form);
        this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'));
        if (!this.$route.query.id) {
            this.$set(this.form.bizEntityJson, 'isDc', 'false');
            this.$set(this.form.bizEntityJson, 'isHotel', 'false');
            this.$set(this.form.bizEntityJson, 'isCzgy', 'false');
            this.$set(this.form.bizEntityJson, 'landedArea', null);
            this.$set(this.form.bizEntityJson, 'projectCd', null);
            this.$set(this.form.bizEntityJson, 'projectName', null);
            this.$set(this.form.bizEntityJson, 'projectPeriod', null);
            this.$set(this.form.bizEntityJson, 'contLedgerId', null);
            this.$set(this.form.bizEntityJson, 'contNo', null);
            this.$set(this.form.bizEntityJson, 'contName', null);
            this.$set(this.form.bizEntityJson, 'paymentUnit', null);
            this.$set(this.form.bizEntityJson, 'partB', null);
            this.$set(this.form.bizEntityJson, 'payeeOpenBankNo', null);
            this.$set(this.form.bizEntityJson, 'payeeAccountNo', null);
            this.$set(this.form.bizEntityJson, 'payWay', null);
            this.$set(this.form.bizEntityJson, 'guarBeginDate', null);
            this.$set(this.form.bizEntityJson, 'guarEndDate', null);
            this.$set(this.form.bizEntityJson, 'guarEndDate', null);
            this.$set(this.form.bizEntityJson, 'isFactoring', null);

            this.$set(this.form.bizEntityJson, 'primaryTotalPrice', []);
            this.$set(this.form.bizEntityJson, 'estimateTotalPrice', []);
            this.$set(this.form.bizEntityJson, 'thisApplyTotalPrice', []);
            this.$set(this.form.bizEntityJson, 'applyTaxList', []);

            this.$set(this.form.bizEntityJson, 'resRetentionMoneyTotalNoTax', null);
            this.$set(this.form.bizEntityJson, 'resRetentionMoneyPayTotalNoTax', null);
            this.$set(this.form.bizEntityJson, 'resRetentionMoneyApplyNoTax', null);
            this.$set(this.form.bizEntityJson, 'resRetentionMoneySfNoTax', null);
            this.$set(this.form.bizEntityJson, 'warrantyDeductedTotalNoTax', null);
            this.$set(this.form.bizEntityJson, 'warrantyDeductedNoPayTotalNoTax', null);
            this.$set(this.form.bizEntityJson, 'retentionDepositBalanceNoTax', null);
            this.$set(this.form.bizEntityJson, 'warrantyDeductedNoTax', null);
            this.$set(this.form.bizEntityJson, 'warrantyDeductedTax', null);

            this.$set(this.form.bizEntityJson, 'hotel', 'false');
            this.$set(this.form.bizEntityJson, 'hasEstate', 'false');
            this.$set(this.form.bizEntityJson, 'residential', 'false');

            this.$set(this.form.bizEntityJson, 'warrantyDeductedTaxList', []);

            this.$set(this.form.bizEntityJson, 'fuPayMoeny', null);
            this.$set(this.form.bizEntityJson, 'fuPayTaxMoeny', null);
            this.$set(this.form.bizEntityJson, 'description', null);
            this.$set(this.form.bizEntityJson, 'mateSettleId', null);
            this.$set(this.form.bizEntityJson, 'settleApproveId', null);

            this.mapParam = {
                contLedgerId: 'contLedgerId',
                contNo: 'contNo',
                contName: 'contName',
                projectCd: 'projectCd',
                projectName: 'projectName',
                partB: 'partB',
                payWay: 'payWay',
                guarBeginDate: 'guarBeginDate',
                guarEndDate: 'guarEndDate',
                payeeOpenBankNo: 'payeeOpenBankNo',
                payeeAccountNo: 'payeeAccountNo',
                //原合同总价
                noTaxTotalPrice: 'noTaxTotalPrice',//不含税
                newTotalPrice: 'newTotalPrice',// 含税
                newTotalPriceTaxRate: 'newTotalPriceTaxRate',//税率
                newTotalPriceTaxPrice: 'newTotalPriceTaxPrice',//税额
                /*fuRealGuaranteeNoTax:'fuRealGuaranteeNoTax',//实际预留质保金(不含税)
                fuCutPaymentNoTax:'fuCutPaymentNoTax',//保修应扣款（不含税）*/

                //结算总价
                noTaxClearPrice: 'noTaxClearPrice',//不含税
                taxPriceClearPrice: 'taxPriceClearPrice',//含税
                taxRatePriceClearPrice: 'taxRatePriceClearPrice',//税额
                taxRateClearPrice: 'taxRateClearPrice',//税率
                contStatus: 'contStatus',//合同状态
                isClearPrice: 'isClearPrice'//是否存在结算价
            };

            this.add();
            this.getSystemArea();
        }

    },
    methods: {
        loginOldPd() {
            const param = {
                loginUiid: JSON.parse(localStorage.getItem("ys_contract_token")).userid,
            };
            this.$approval.loginOldPd(param).then((res) => {
                if (res.code == 1 && res.data) {
                    let url = res.data.data.ssoPdUserUrlList[0].url;
                    url = url.slice(0, url.indexOf("PowerDesk") + 9) + "/cont/cont-ledger!input.action?id=" + this.form.bizEntityJson.contLedgerId + '&ledgerType=1';
                    window.open(url, "_blank");
                }
            })
                .catch(() => {
                    this.$message.error("系统错误，请稍后重试");
                });
        },
        add() {
            const emptyObjStr = JSON.stringify({
                name: null,
                noTaxPrice: null,
                noTaxPriceRate: null,
                taxRate: null,
                taxRatePrice: null,
                taxPrice: null,
                surePayRate: null
            });
            this.form.bizEntityJson.primaryTotalPrice.push(JSON.parse(emptyObjStr));
            this.form.bizEntityJson.estimateTotalPrice.push(JSON.parse(emptyObjStr));
            this.form.bizEntityJson.thisApplyTotalPrice.push(JSON.parse(emptyObjStr));

            this.form.bizEntityJson.applyTaxList.push(JSON.parse(emptyObjStr));

            this.form.bizEntityJson.warrantyDeductedTaxList.push(JSON.parse(emptyObjStr));
        },
        addListItem(valKey) {
            this.form.bizEntityJson[valKey] = this.form.bizEntityJson[valKey] || [];
            this.form.bizEntityJson[valKey].push({
                name: null,
                noTaxPrice: null,
                noTaxPriceRate: null,
                taxRate: null,
                taxRatePrice: null,
                taxPrice: null,
                surePayRate: null
            });
        },
        delListItem(valKey, index) {
            if (this.form.bizEntityJson[valKey] && this.form.bizEntityJson[valKey] instanceof Array && this.form.bizEntityJson[valKey].length > 1) {
                this.form.bizEntityJson[valKey].splice(index, 1);
                this.calApplyTaxPrice();
            }
        },
        getSystemArea() {
            this.$approval.getSystemArea().then((response) => {
                if (response.code == 1 && response.data) {
                    this.areaOptions = response.data;
                } else {
                    this.areaOptions = [];
                }
            }, () => {
                this.areaOptions = [];
            });
        },
        contFindFuzzy(query) {
            this.loading = true;
            try {
                if (query !== '') {
                    query = query.toString().trim();
                    const param = {
                        contValue: query,
                        codeType: '1,2,3',
                        contFinish: '0'
                    };
                    this.$approval.quickSearchWithZBJ(param).then((response) => {
                        if (response.code == 1 && response.data) {
                            this.contOptions = response.data;
                        } else {
                            this.contOptions = [];
                        }
                        this.loading = false;
                    }, () => {
                        this.loading = false;
                    });
                }
            } catch {
                this.loading = false;
            }
        },
        contChange(val) {
            const selected = this.contOptions.find((item) => {
                item.contNo = val;
            })
            this.noTaxSpMoney = selected.noTaxSpMoney;
            this.form.bizEntityJson.contLedgerId = selected.contLedgerId;

            this.reloadValue();
            if (Number(this.form.bizEntityJson.estimateTotalPrice[0].taxPrice) > Number(selected.sumInvoicePay.toString().replace(/,/g, ''))) {
                this.$alert('合同缺票不能付质保金，请先收取合同全额发票并录入系统后再发质保金付款申请单。', '提示', {
                    confirmButtonText: '确定'
                });
                this.resetCont();
            } else if (!this.quickRetentionMoneyData(this.form.bizEntityJson.contLedgerId)) {
                this.resetCont();
            } else if (!this.findContractReview(this.form.bizEntityJson.contLedgerId)) {
                this.resetCont();
            } else {
                this.getCurrentRate();
            }
        },
        async quickRetentionMoneyData(contLedgerId) {
            const param = {contLedgerId: contLedgerId, authType: "FKGL_ZBJ"};
            await this.$approval.quickRetentionMoneyData(param).then((response) => {
                if (response.code == 1 && response.data) {
                    const res = response.data;
                    if (res.code == "1") {
                        this.form.bizEntityJson.resRetentionMoneyTotalNoTax = res.resRetentionMoneyTotalNoTax;
                        this.form.bizEntityJson.resRetentionMoneyPayTotalNoTax = res.resRetentionMoneyPayTotalNoTax;
                        this.form.bizEntityJson.resRetentionMoneyApplyNoTax = res.resRetentionMoneyApplyNoTax;
                        this.form.bizEntityJson.resRetentionMoneySfNoTax = res.resRetentionMoneySfNoTax;
                        this.form.bizEntityJson.warrantyDeductedTotalNoTax = res.warrantyDeductedTotalNoTax;
                        this.form.bizEntityJson.warrantyDeductedNoPayTotalNoTax = res.warrantyDeductedNoPayTotalNoTax;
                        // 预留质保金到期可支付剩余金额(不含税)
                        this.form.bizEntityJson.retentionDepositBalanceNoTax = res.retentionDepositBalanceNoTax;

                        return true;
                    } else if (res.code == "-3") {
                        this.$alert('该合同质保金额度或质保金付款日期为空，不能申请付款，合同台账质保金可查看质保金信息', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res.code == "-2") {
                        this.$alert('质保金到期付款日期【' + res.minDate + '】前质保金付款网批不能申请付款，合同台账质保金可查看质保金到期付款日', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res.code == "-1") {
                        this.$alert('系统错误，请联系管理员！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                }
            });
        },
        async findContractReview(contLedgerId) {
            await this.$approval.findContractReview(contLedgerId).then((response) => {
                if (response.code == 1 && response.data) {
                    const res = response.data;
                    if (res == "noContReviewNo") {
                        this.$alert('合同评审未完成，无法发起付款单或结算单！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res == "noExamine") {
                        this.$alert('合同台账未审核，无法发起付款单或结算单！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res == "noBusType") {
                        this.$alert('获取业务链类型出错！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res == "noProcess") {
                        this.$alert('未获取到业务链信息！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else if (res == "-1") {
                        this.$alert('系统错误，请联系管理员！', '提示', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    } else {
                        return true;
                    }
                }
            });
        },
        getCurrentRate() {
            if (this.form.bizEntityJson.contLedgerId != null && this.form.bizEntityJson.contLedgerId != "") {
                this.$approval.getCurrentRate(this.form.bizEntityJson.contLedgerId).then((response) => {
                    if (response.code == 1 && response.data) {
                        const obj = JSON.stringify(response.data);
                        this.rateOptions.applyTaxList = JSON.parse(obj);
                        this.rateOptions.warrantyDeductedTaxList = JSON.parse(obj);
                    } else {
                        this.rateOptions.applyTaxList = [];
                        this.rateOptions.warrantyDeductedTaxList = [];
                    }
                }, () => {
                    this.rateOptions.applyTaxList = [];
                    this.rateOptions.warrantyDeductedTaxList = [];
                });
            }
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
        },
        calTaxRatePrice(index) {
            if (this.noTaxSpMoney == null || this.noTaxSpMoney == '') {
                this.$alert('请重新填写选择合同编号', '提示', {
                    confirmButtonText: '确定'
                });
                this.form.bizEntityJson.applyTaxList[index].taxPrice = null;
                return false;
            } else if (!this.checkContLedger()) {
                this.form.bizEntityJson.applyTaxList[index].taxPrice = null;
                return false;
            }
            let taxPrice = this.form.bizEntityJson.applyTaxList[index].taxPrice;//含税
            let taxRate = this.form.bizEntityJson.applyTaxList[index].taxRate;//税率
            if (taxRate != null && taxRate != "" && taxPrice != null && taxPrice != "") {
                taxPrice = taxPrice.replace(/,/g, "");
                if (!this.checkApplyTaxPrice(taxRate, taxPrice)) {
                    this.form.bizEntityJson.applyTaxList[index].taxPrice = null;
                    return false;
                }
            }
            this.calTax();
            this.calApplyTaxPrice();
        },
        async checkContLedger() {
            await this.$approval.checkContLedger(this.form.bizEntityJson.contLedgerId).then((response) => {
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
                "contLedgerId": this.form.bizEntityJson.contLedgerId,
                "tax": taxRate,
                "taxPrice": taxPrice,
                "resApproveInfoId": this.resApproveInfoId
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
        calNoTaxPrice(index) {
            let target = this.form.bizEntityJson.applyTaxList[index];
            let taxRate = target.taxRate;//税率
            if (taxRate == null || taxRate == "") {
                this.$alert('请选择税率', '提示', {
                    confirmButtonText: '确定'
                });
                this.form.bizEntityJson.applyTaxList[index].noTaxPrice = null;
                return;
            }
            let taxPrice = target.taxPrice;//含税
            if (taxPrice == null || taxPrice == "") {
                this.$alert('请输入含税价', '提示', {
                    confirmButtonText: '确定'
                });
                this.form.bizEntityJson.applyTaxList[index].noTaxPrice = null;
                return;
            }
            let thisVal = target.noTaxPrice.toString();
            if (thisVal == null || thisVal == "") {
                this.calTaxRatePrice(index);
            } else {
                thisVal = thisVal.replace(/,/g, "");
                taxPrice = taxPrice.replace(/,/g, "");
                taxRate = parseFloat(taxRate) / 100;
                let noTaxPrice = (parseFloat(taxPrice) / (1 + taxRate)).toFixed(2);
                let diffPrice = Math.abs(parseFloat(noTaxPrice) - parseFloat(thisVal)).toFixed(2);
                //允许一分钱差额
                if (noTaxPrice != thisVal && diffPrice != 0.01) {
                    this.$alert('请输入正确不含税金额，允许误差为0.01', '提示', {
                        confirmButtonText: '确定'
                    });
                    this.calTaxRatePrice(index);
                } else {
                    this.form.bizEntityJson.applyTaxList[index].taxRatePrice = this.formatMoney((parseFloat(taxPrice) - parseFloat(thisVal)).toFixed(2));
                    this.calApplyTaxPrice();
                }
            }
        },
        calApplyTaxPrice() {
            let applyTaxPrice = 0.0;
            let applyTaxRatePrice = 0.0;
            let applyNoTaxPrice = 0.0;
            let applyTaxRateNow = 0.0;
            for (let i = 0; i < this.form.bizEntityJson.applyTaxList.length; i++) {
                const applyTax = this.form.bizEntityJson.applyTaxList[i];
                if (applyTax.taxPrice != null && applyTax.taxPrice != "") {
                    applyTaxPrice += parseFloat(applyTax.taxPrice.replace(/,/g, ""));
                }
                if (applyTax.taxRatePrice != null && applyTax.taxRatePrice != "") {
                    applyTaxRatePrice += parseFloat(applyTax.taxRatePrice.replace(/,/g, ""));
                }
                if (applyTax.noTaxPrice != null && applyTax.noTaxPrice != "") {
                    applyNoTaxPrice += parseFloat(applyTax.noTaxPrice.replace(/,/g, ""));
                }
            }
            if (applyTaxPrice != 0 && applyNoTaxPrice != 0) {
                applyTaxRateNow = parseFloat(((applyTaxPrice - applyNoTaxPrice) / applyNoTaxPrice * 100).toFixed(2));
            }
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate = applyTaxRateNow;
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice = applyTaxPrice;
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice = applyTaxRatePrice;
            this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice = applyNoTaxPrice;

            this.calFuPayTaxMoeny();
        },
        calTaxRatePriceKK(index) {
            if (this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate == null || this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate == '') {
                this.$alert('请选择本次申请支付质保金税率', '提示', {
                    confirmButtonText: '确定'
                });
                this.form.bizEntityJson.applyTaxList[index].taxPrice = null;
                return false;
            }
            this.calTax(index);
            this.calWarrantyDeducted();
            this.calFuPayMoeny();
        },
        calWarrantyDeducted() {
            let warrantyDeductedNoTax = 0;
            let warrantyDeductedTax = 0;
            for (let i = 0; i < this.form.bizEntityJson.warrantyDeductedTaxList.length; i++) {
                const target = this.form.bizEntityJson.warrantyDeductedTaxList[i];
                warrantyDeductedTax += Number(target.taxPrice.replace(/,/g, ""));
                warrantyDeductedNoTax += Number(target.noTaxPrice.replace(/,/g, ""));
            }
            this.form.bizEntityJson.warrantyDeductedNoTax = this.formatMoney(warrantyDeductedNoTax);
            this.form.bizEntityJson.warrantyDeductedTax = this.formatMoney(warrantyDeductedTax);

            this.calFuPayTaxMoeny();
        },
        calTax(index) {
            const target = this.form.bizEntityJson.applyTaxList[index];
            let taxRatePrice = '';//税额
            let noTaxPrice = '';//不含税
            let taxPrice = target.taxPrice;//含税
            let taxRate = target.taxRate;
            if (taxRate != null && taxRate != "" && taxPrice != null && taxPrice != "") {
                taxPrice = taxPrice.replace(/,/g, "");
                taxRate = parseFloat(taxRate) / 100;
                noTaxPrice = this.formatMoney((parseFloat(taxPrice) / (1 + taxRate)).toFixed(2));
                taxRatePrice = this.formatMoney((parseFloat(taxPrice) - parseFloat(noTaxPrice.replace(/,/g, ""))).toFixed(2));
            }
            this.form.bizEntityJson.applyTaxList[index].taxRatePrice = taxRatePrice;
            this.form.bizEntityJson.applyTaxList[index].noTaxPrice = noTaxPrice;
        },
        calFuPayMoeny() {
            let fuPayMoeny = '';
            let retentionDepositBalanceNoTax = this.form.bizEntityJson.retentionDepositBalanceNoTax.replace(/,/g, "");
            let warrantyDeductedNoTax = this.form.bizEntityJson.warrantyDeductedNoTax.replace(/,/g, "");
            if (retentionDepositBalanceNoTax != null && retentionDepositBalanceNoTax != "" && warrantyDeductedNoTax != null && warrantyDeductedNoTax != "") {
                fuPayMoeny = this.formatMoney((Number(retentionDepositBalanceNoTax) - Number(warrantyDeductedNoTax)).toFixed(2));
            }
            this.form.bizEntityJson.fuPayMoeny = fuPayMoeny;
        },
        calFuPayTaxMoeny() {
            let fuPayTaxMoeny = '';
            let applyTaxPrice = this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice.replace(/,/g, '');
            let warrantyDeductedTax = this.form.bizEntityJson.warrantyDeductedTax.replace(/,/g, '');
            if (applyTaxPrice != "" && warrantyDeductedTax != "") {
                fuPayTaxMoeny = this.formatMoney(Number(applyTaxPrice) - Number(warrantyDeductedTax).toFixed(2));
            }

            this.form.bizEntityJson.fuPayTaxMoeny = fuPayTaxMoeny;
        },
        reloadValue() {
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxRate = null;
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxPrice = null;
            this.form.bizEntityJson.thisApplyTotalPrice[0].taxRatePrice = null;
            this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice = null;
            this.form.bizEntityJson.retentionDepositBalanceNoTax = null;

            const emptyObjStr = JSON.stringify({
                name: null,
                noTaxPrice: null,
                noTaxPriceRate: null,
                taxRate: null,
                taxRatePrice: null,
                taxPrice: null,
                surePayRate: null
            });
            this.form.bizEntityJson.applyTaxList.push(JSON.parse(emptyObjStr));
            this.rateOptions.applyTaxList = ['10%', '15%', '20%', '25%', '30%'];

            this.form.bizEntityJson.warrantyDeductedTaxList.push(JSON.parse(emptyObjStr));
            this.rateOptions.warrantyDeductedTaxList = ['10%', '15%', '20%', '25%', '30%'];
        },
        resetCont() {
            this.form.bizEntityJson.projectCd = null;
            this.form.bizEntityJson.projectName = null;
            this.form.bizEntityJson.projectPeriod = null;
            this.form.bizEntityJson.contNo = null;
            this.form.bizEntityJson.contName = null;
            this.form.bizEntityJson.partB = null;
            this.form.bizEntityJson.payeeOpenBankNo = null;
            this.form.bizEntityJson.payeeAccountNo = null;
            this.form.bizEntityJson.payWay = null;
            this.form.bizEntityJson.guarBeginDate = null;
            this.form.bizEntityJson.guarEndDate = null;

            this.form.bizEntityJson.primaryTotalPrice[0].taxRate = null;
            this.form.bizEntityJson.primaryTotalPrice[0].taxPrice = null;
            this.form.bizEntityJson.primaryTotalPrice[0].taxRatePrice = null;
            this.form.bizEntityJson.primaryTotalPrice[0].noTaxPrice = null;
            this.form.bizEntityJson.estimateTotalPrice[0].taxRate = null;
            this.form.bizEntityJson.estimateTotalPrice[0].taxPrice = null;
            this.form.bizEntityJson.estimateTotalPrice[0].taxRatePrice = null;
            this.form.bizEntityJson.estimateTotalPrice[0].noTaxPrice = null;

            this.form.bizEntityJson.resRetentionMoneyTotalNoTax = null;
            this.form.bizEntityJson.resRetentionMoneyPayTotalNoTax = null;
            this.form.bizEntityJson.resRetentionMoneyApplyNoTax = null;
            this.form.bizEntityJson.resRetentionMoneySfNoTax = null;
            this.form.bizEntityJson.warrantyDeductedTotalNoTax = null;
            this.form.bizEntityJson.warrantyDeductedNoPayTotalNoTax = null;
            this.reloadValue();
        },
        yykCheck() {
            if (this.isChecking) {
                return;
            }
            try {
                if (!this.checkOnlineMYStatus()) {
                    return false;
                }
                if (this.form.bizEntityJson.retentionDepositBalanceNoTax != this.form.bizEntityJson.thisApplyTotalPrice[0].noTaxPrice) {
                    this.$alert('预留质保金到期可支付剩余金额(不含税)应等于本次申请支付质保金不含税价', '提示', {
                        confirmButtonText: '确定'
                    });
                    this.$refs.applyNoTaxPrice.focus();
                    return false;
                }
                //预留质保金到期可支付总额(不含税)
                let resRetentionMoneyPayTotalNoTax = Number(this.form.bizEntityJson.resRetentionMoneyPayTotalNoTax.replace(/,/g, ""));
                // 预留质保金已实付(不含税)
                let resRetentionMoneySfNoTax = Number(this.form.bizEntityJson.resRetentionMoneySfNoTax.replace(/,/g, ""));
                // 保修应扣款剩余未支付总额(不含税)
                let warrantyDeductedNoPayTotalNoTax = Number(this.form.bizEntityJson.warrantyDeductedNoPayTotalNoTax.replace(/,/g, ""));
                // 本次保修应扣款金额(不含税)
                let warrantyDeductedNoTax = Number(this.form.bizEntityJson.warrantyDeductedNoTax.replace(/,/g, ""));
                if ((warrantyDeductedNoPayTotalNoTax <= resRetentionMoneyPayTotalNoTax && warrantyDeductedNoTax != warrantyDeductedNoPayTotalNoTax) ||
                    (warrantyDeductedNoPayTotalNoTax > resRetentionMoneyPayTotalNoTax && warrantyDeductedNoTax != resRetentionMoneySfNoTax)) {
                    this.$alert('保修应扣款剩余未支付金额为', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }

                let flag = true;
                for (let i = 0; i < this.form.bizEntityJson.warrantyDeductedTaxList.length; i++) {
                    const targetA = this.form.bizEntityJson.warrantyDeductedTaxList[i];
                    let taxPrice_kk = targetA.taxPrice.replace(/,/g, "");//含税
                    let taxRate_kk = targetA.taxRate;//含税
                    for (let j = 0; j < this.form.bizEntityJson.applyTaxList.length; j++) {
                        const targetB = this.form.bizEntityJson.applyTaxList[j];
                        let taxPrice = targetB.taxPrice.replace(/,/g, "");//含税
                        let taxRate = targetB.taxRate;//税率
                        if (taxRate_kk == taxRate && Number(taxPrice_kk) > Number(taxPrice)) {
                            alert("扣款税率段" + taxRate + "%金额分配不得大于本次申请支付质保金对应税率段分配金额");
                            flag = false;
                            break;
                        }
                    }
                }
                if (!flag) {
                    this.isChecking = false;
                    return false;
                }
            } catch {
                this.isChecking = false;
                return false;
            }
            this.isChecking = false;
            return true;
        },
        async checkOnlineMYStatus() {
            await this.$approval.checkOnlineMYStatus(this.form.bizEntityJson.projectCd).then((response) => {
                if (response.code == 1 && response.data) {
                    if (response.data == 'false') {
                        this.$alert('当前项目已在明源成本上线，不允许发起此网批，请走成本相关新流程网批！', '提示', {
                            confirmButtonText: '确定'
                        });
                        this.isChecking = false;
                        return false;
                    } else {
                        this.isChecking = false;
                        return true;
                    }
                }
            }, () => {
                this.isChecking = false;
            });
        }
    }
}
</script>