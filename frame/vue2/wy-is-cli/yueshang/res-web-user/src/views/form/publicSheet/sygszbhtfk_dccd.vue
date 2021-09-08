<template>
    <!-- 商业公司装补合同付款（地产承担） -->
    <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
        <el-row>
            <dl-col
                :span="12"
                title="项目名称:"
                :novalue="!form.bizEntityJson.projectName"
            >
                <el-input
                    v-model="form.bizEntityJson.projectName"
                    @focus="showSearchOrg = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="装补合同网批号:"
                :novalue="!form.bizEntityJson.connercialCompanyContractDisplayNo"
                place="right"
            >
                <el-select
                    v-model="form.bizEntityJson.connercialCompanyContractDisplayNo"
                    filterable
                    remote
                    clearable
                    @change="connercialCompanyContractDisplayNoChange"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    :disabled="form.bizEntityJson.disabled"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.connercialCompanyContractDisplayNo"
                        :label="item.connercialCompanyContractDisplayNo"
                        :value="item.connercialCompanyContractDisplayNo"
                    >
                    </el-option>
                </el-select>
            </dl-col>
            <dl-col
                :span="24"
                title="结算类型:"
                :novalue="
                    form.bizEntityJson.isSettlementPayment != 'true' &&
                    form.bizEntityJson.isNotSettlementPayment != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '结算付款', name: 'isSettlementPayment' },
                        { label: '非结算付款', name: 'isNotSettlementPayment' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="装修补贴总额:"
                :novalue="!form.bizEntityJson.renovatedTotalSubsidy"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.renovatedTotalSubsidy"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="付款单位:"
                :novalue="!form.bizEntityJson.paymentUnit"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.paymentUnit"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="收款人名称:"
                :novalue="!form.bizEntityJson.beneficiaryName"
            >
                <el-input
                    v-model="form.bizEntityJson.beneficiaryName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="收款人开户行:"
                :novalue="!form.bizEntityJson.payeeBank"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.payeeBank"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="收款人账号:"
                :novalue="!form.bizEntityJson.beneficiaryAccount"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.beneficiaryAccount"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="已付合同款:"
                :novalue="!form.bizEntityJson.contractPaid"
            >
                <el-input
                    v-model="form.bizEntityJson.contractPaid"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="本次付款申请金额:"
                :novalue="!form.bizEntityJson.currentPayAmount"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.currentPayAmount"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="需要说明事项(须详细说明付款进度)"
                place="right"
                :novalue="!form.bizEntityJson.description"
            >
                <el-input
                    v-model="form.bizEntityJson.description"
                    type="textarea"
                    :autosize="{ minRows: 3 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="装补合同付款进度台账明细表"
                place="right"
                :novalue="!form.bizEntityJson.annexId"
            >
                <one-file :form="form" value="annexId" />
            </dl-col>
        </el-row>
        <search-org
            :open="showSearchOrg && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendOrgCd"
            @close="closeSearhOrg"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            showSearchOrg: false, // 中心、部门组件打开关闭状态
            options: [],
            loading: false,
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
    /* end */
    created() {},
    methods: {
        // 关闭中心组建回调
        closeSearhOrg(val) {
            if (val) {
                this.form.bizEntityJson.projectName = val.text;
                this.form.bizEntityJson.projectCd = val.id;
            }
            this.showSearchOrg = false;
        },
        remoteMethod(query) {
            if (query) {
                this.loading = true;
                this.$approval
                    .quickSearchCommercialCompanyContractResapprove({
                        value: query,
                    })
                    .then((res) => {
                        if (res.code == 1) {
                            if (res.data.length > 0) {
                                this.options = res.data;
                            } else {
                                this.options = [];
                            }
                        } else {
                            this.$message.error(res.message);
                        }
                        this.loading = false;
                    });
            } else {
                this.options = [];
            }
        },
        connercialCompanyContractDisplayNoChange(val) {
            let obj = this.options.find(
                (item) => item.connercialCompanyContractDisplayNo == val
            );
            this.form.bizEntityJson.renovatedTotalSubsidy = obj
                ? obj.renovatedTotalSubsidy
                : "";
        },
    },
};
</script>