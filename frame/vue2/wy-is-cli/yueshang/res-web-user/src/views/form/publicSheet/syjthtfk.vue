<template>
    <!-- 商业集团合同付款 -->
    <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
        <el-row>
            <dl-col :span="12" title="项目:" :novalue="!form.bizEntityJson.projectCd">
                <el-input v-model="form.bizEntityJson.projectCd" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="类型:" :novalue="form.bizEntityJson.suspicion != 'true' && form.bizEntityJson.noSuspicion != 'true' && form.bizEntityJson.numberPower != 'true'" place="right">
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '涉及保安保洁(外包)', name: 'suspicion' },
                        { label: '不涉及保安保洁(外包)', name: 'noSuspicion' },
                        { label: '数字宝龙', name: 'numberPower' },
                    ]"
                />
            </dl-col>
            <dl-col :span="12" title="合同编号:" :novalue="!form.bizEntityJson.contactNo">
                <el-input v-model="form.bizEntityJson.contactNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>

            <dl-col :span="12" title="合同编号:" :novalue="!form.bizEntityJson.contactNo">
                <el-select
                    v-model="form.bizEntityJson.contactNo"
                    filterable
                    remote
                    clearable
                    @change="contractNoChange"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    :disabled="form.bizEntityJson.disabled"
                >
                    <el-option v-for="(item, index) in contractNoOptions" :key="index" :label="item.contNo" :value="item.contNo">
                        <el-row>
                            <el-col @click.native="setContractTempletInfoId(item)"> {{ item.contName }}({{ item.contNo }}) </el-col>
                        </el-row>
                    </el-option>
                </el-select>
            </dl-col>
            <dl-col :span="12" title="合同名称:" :novalue="!form.bizEntityJson.contactName" place="right">
                <el-input v-model="form.bizEntityJson.contactName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" readonly />
            </dl-col>
            <dl-col :span="12" title="结算类型:" :novalue="form.bizEntityJson.settlement != 'true' && form.bizEntityJson.nonSettlement != 'true'">
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '结算付款', name: 'settlement' },
                        { label: '非结算付款', name: 'nonSettlement' },
                    ]"
                />
            </dl-col>
            <dl-col :span="12" title="验收网批号:" place="right">
                <el-input v-model="form.bizEntityJson.checkApproveNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" readonly />
            </dl-col>
            <dl-col :span="12" title="企划案例编号:">
                <el-input v-model="form.bizEntityJson.pmMateEntryNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="活动主题:" place="right">
                <el-input v-model="form.bizEntityJson.activeTitle" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="时间周期:" :novalue="!form.bizEntityJson.activePeriod">
                <el-input v-model="form.bizEntityJson.activePeriod" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="预算费用:" :novalue="!form.bizEntityJson.expensesBudget" place="right">
                <el-input v-model="form.bizEntityJson.expensesBudget" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="项目名称:">
                <el-input v-model="form.bizEntityJson.projectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="付款单位:" :novalue="!form.bizEntityJson.payUnitName" place="right">
                <el-input v-model="form.bizEntityJson.payUnitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="24" place="title relative top right">
                <h2>【收款人(乙方)信息】</h2>
            </dl-col>
            <dl-col :span="12" title="收款人名称:" :novalue="!form.bizEntityJson.receName">
                <el-input v-model="form.bizEntityJson.receName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="收款人开户行:" :novalue="!form.bizEntityJson.receOpenBankName" place="right">
                <el-input v-model="form.bizEntityJson.receOpenBankName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="收款人账号:" :novalue="!form.bizEntityJson.receAcctNo">
                <el-input v-model="form.bizEntityJson.receAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="12" title="付款方式:" place="right">
                <el-input v-model="form.bizEntityJson.payTypeDesc" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" readonly />
            </dl-col>

            <dl-col :span="12" title="合同总价(元):" :novalue="!form.bizEntityJson.contractTotalAmt">
                <el-input
                    v-model="form.bizEntityJson.contractTotalAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    readonly
                />
            </dl-col>
            <dl-col :span="12" title="已确认合同总价(元):" place="right" :novalue="!form.bizEntityJson.confirmTotalAmt">
                <el-input
                    v-model="form.bizEntityJson.confirmTotalAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    readonly
                />
            </dl-col>
            <dl-col :span="24" title="不含税价:" place="right">
                <el-input
                    v-model="form.bizEntityJson.beforePrice"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="11" title="税率:">
                <el-input v-model="form.bizEntityJson.taxRate" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </dl-col>
            <dl-col :span="1" title="%"> </dl-col>
            <dl-col :span="12" title="税额:" place="right">
                <el-input
                    v-model="form.bizEntityJson.taxRatePrice"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="12" title="已付合同款(元):" :novalue="!form.bizEntityJson.paidTotalAmt">
                <el-input
                    v-model="form.bizEntityJson.paidTotalAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="12" title="本次付款申请金额(元):" place="right" :novalue="!form.bizEntityJson.applyAmt">
                <el-input
                    v-model="form.bizEntityJson.applyAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="24" title="需说明事项:" place="right" :novalue="!form.bizEntityJson.description">
                <el-input v-model="form.bizEntityJson.description" type="textarea" :autosize="{ minRows: 3 }" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
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
            loading: false,
            contractNoOptions: [],
        };
    },
    /* 本地模板编译需要的数据回传，不需要上传到后台 start */
    props: ["data"],
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                this.form = val;
            },
        },
    },
    created() {},
    methods: {
        loginOldPd() {
            const param = {
                loginUiid: JSON.parse(localStorage.getItem("ys_contract_token")).userid,
            };
            this.$approval
                .loginOldPd(param)
                .then((res) => {
                    if (res.code == 1 && res.data) {
                        let tempUrl = res.data.data.ssoPdUserUrlList[0].url;
                        let url = "";
                        if (this.form.bizEntityJson.contractTempletInfoId) {
                            url = tempUrl.substring(0, tempUrl.lastIndexOf("/", tempUrl.lastIndexOf("/") - 1) + 1) + "/cont/cont-ledger!input.action?id=" + this.form.bizEntityJson.contractTempletInfoId;
                        } else {
                            url = tempUrl.substring(0, tempUrl.lastIndexOf("/", tempUrl.lastIndexOf("/") - 1) + 1) + "/cont/cont-ledger!detail.action";
                        }
                        window.open(url, "_blank");
                    }
                })
                .catch((err) => {
                    this.$message.error("系统错误，请稍后重试");
                });
        },
        remoteMethod(query) {
            if (query) {
                this.loading = true;
                this.$approval.quickSearchContDetail(query).then((res) => {
                    if (res.code == 1) {
                        this.loading = false;
                        if (res.data.length > 0) {
                            this.contractNoOptions = res.data;
                        } else {
                            this.contractNoOptions = [];
                        }
                    }
                });
            } else {
                this.contractNoOptions = [];
            }
        },
        setContractTempletInfoId(item) {
            this.$set(this.form.bizEntityJson, "contLedgerId", item.contLedgerId);
            this.form.bizEntityJson.projectName = item ? item.projectName : "";
            this.form.bizEntityJson.projectCd = item ? item.projectCd : "";
            this.form.bizEntityJson.contactName = item ? item.contName : "";
            this.form.bizEntityJson.checKApproveId = item ? item.checKApproveId : "";
            this.form.bizEntityJson.checkApproveNo = item ? item.checkApproveNo : "";
            this.form.bizEntityJson.receName = item ? item.partB : "";
            this.form.bizEntityJson.payTypeDesc = item ? item.payWay : "";
            this.form.bizEntityJson.contractTotalAmt = item ? item.totalPrice : "";
            this.form.bizEntityJson.confirmTotalAmt = item ? item.updateTotal : "";
            this.form.bizEntityJson.beforePrice = item ? item.beforePrice : "";
            this.form.bizEntityJson.taxRate = item ? item.taxRate : "";
            this.form.bizEntityJson.taxRatePrice = item ? item.taxRatePrice : "";
            this.form.bizEntityJson.paidTotalAmt = item ? item.payNum : "";
        },
        contractNoChange(val) {
            let obj = this.contractNoOptions.find((item) => item.contactNo == val);
            this.$set(this.form.bizEntityJson, "contLedgerId", obj.contLedgerId);
            this.form.bizEntityJson.projectName = obj ? obj.projectName : "";
            this.form.bizEntityJson.projectCd = obj ? obj.projectCd : "";
            this.form.bizEntityJson.contactName = obj ? obj.contName : "";
            this.form.bizEntityJson.checKApproveId = obj ? obj.checKApproveId : "";
            this.form.bizEntityJson.checkApproveNo = obj ? obj.checkApproveNo : "";
            this.form.bizEntityJson.receName = obj ? obj.partB : "";
            this.form.bizEntityJson.payTypeDesc = obj ? obj.payWay : "";
            this.form.bizEntityJson.contractTotalAmt = obj ? obj.totalPrice : "";
            this.form.bizEntityJson.confirmTotalAmt = obj ? obj.updateTotal : "";
            this.form.bizEntityJson.beforePrice = obj ? obj.beforePrice : "";
            this.form.bizEntityJson.taxRate = obj ? obj.taxRate : "";
            this.form.bizEntityJson.taxRatePrice = obj ? obj.taxRatePrice : "";
            this.form.bizEntityJson.paidTotalAmt = obj ? obj.payNum : "";
        },
    },
};
</script>