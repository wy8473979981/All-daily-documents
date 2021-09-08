<template>
    <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
        <el-row v-if="processCode != 'SYGS_CGFK'">
            <dl-col
                :span="24"
                :novalue="
                    form.bizEntityJson.syGroup != 'true' &&
                    form.bizEntityJson.areaOperationCenter != 'true'
                "
                style="border-top: solid #dddddd; border-top-width: 1px"
                place="right"
                @change="() => initProjectTypeB()"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '商业集团', name: 'syGroup' },
                        { label: '区域公司', name: 'areaOperationCenter' },
                    ]"
                />
            </dl-col>
        </el-row>
        <el-row class="padding-row">
            <dl-col
                v-if="processCode == 'SYGS_CGFK'"
                :span="24"
                title="项目类型:"
                :novalue="
                    form.bizEntityJson.isProjectTypeB1 != 'true' &&
                    form.bizEntityJson.isProjectTypeB2 != 'true'
                "
                style="border-top: solid #dddddd; border-top-width: 1px"
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: 'B类项目', name: 'isProjectTypeB1' },
                        { label: '非B类项目', name: 'isProjectTypeB2' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="24"
                :title="processCode == 'SYGS_CGFK' ? '申请单位:' : '申请中心:'"
                :novalue="!form.bizEntityJson.sendCenterName"
                style="border-top: solid #dddddd; border-top-width: 1px"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.sendCenterName"
                    @focus="showSearchOrg = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>

            <dl-col
                v-if="processCode == 'SYJT_YWBX'"
                :span="24"
                :novalue="
                    form.bizEntityJson.area1 != 'true' &&
                    form.bizEntityJson.area2 != 'true' &&
                    form.bizEntityJson.area3 != 'true' &&
                    form.bizEntityJson.area4 != 'true' &&
                    form.bizEntityJson.area5 != 'true' &&
                    form.bizEntityJson.area6 != 'true' &&
                    form.bizEntityJson.area7 != 'true' &&
                    form.bizEntityJson.area8 != 'true'
                "
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '商业集团', name: 'area1' },
                        { label: '杭州区域', name: 'area2' },
                        { label: '福建区域', name: 'area3' },
                        { label: '浙南区域', name: 'area4' },
                        { label: '宁波区域', name: 'area5' },
                        { label: '鲁豫区域', name: 'area6' },
                        { label: '上海区域', name: 'area7' },
                        { label: '苏皖区域', name: 'area8' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="项目名称:"
                :novalue="!form.bizEntityJson.projectName"
            >
                <el-select
                    v-model="form.bizEntityJson.projectName"
                    filterable
                    remote
                    clearable
                    @change="projectNameChange"
                    :remote-method="remoteMethod1"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    :disabled="form.bizEntityJson.disabled"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.projectCd"
                        :label="item.projectName"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </dl-col>
            <dl-col :span="12" title="事项名称:" place="right">
                <el-input
                    v-model="form.bizEntityJson.programmeBeginBudget"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                v-if="processCode == 'SYGS_CWGL_FKGL_125'"
                :span="12"
                title="结算类型:"
                :novalue="
                    form.bizEntityJson.settlement != 'true' &&
                    form.bizEntityJson.nonSettlement != 'true'
                "
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '结算付款', name: 'settlement' },
                        { label: '非结算付款', name: 'nonSettlement' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-if="processCode == 'SYGS_CWGL_FKGL_125'"
                :span="12"
                title="验收网批号:"
                :novalue="!form.bizEntityJson.checkApproveNo"
            >
                <el-select
                    v-if="!form.bizEntityJson.disabled"
                    v-model="form.bizEntityJson.checkApproveNo"
                    filterable
                    remote
                    clearable
                    @change="checkApproveNoChange"
                    :remote-method="remoteMethod2"
                    :loading="loading"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                    :disabled="form.bizEntityJson.disabled"
                >
                    <el-option
                        v-for="item in preResDisplayNoOptions"
                        :key="item.resDisplayNo"
                        :label="item.resDisplayNo"
                        :value="item.resDisplayNo"
                    >
                    </el-option>
                </el-select>
                <p
                    v-else
                    class="openUrl-p"
                    @click="
                        openUrlGlobal(
                            form.bizEntityJson.preResDisplayNo,
                            form.bizEntityJson.feeApproveInfoId
                        )
                    "
                >
                    {{ form.bizEntityJson.preResDisplayNo }}
                </p>
            </dl-col>
            <dl-col
                :span="12"
                title="收款人名称:"
                :novalue="!form.bizEntityJson.receName"
            >
                <el-input
                    v-model="form.bizEntityJson.receName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="收款人开户行:"
                :novalue="!form.bizEntityJson.receOpenBankName"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.receOpenBankName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="收款人账号:"
                :novalue="!form.bizEntityJson.receAcctNo"
            >
                <el-input
                    v-model="form.bizEntityJson.receAcctNo"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="12" title="付款方式:" place="right">
                <el-input
                    v-model="form.bizEntityJson.payTypeDesc"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="12" title="合同总价:">
                <el-input
                    v-model="form.bizEntityJson.contractTotalAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="12" title="已确认合同总价:" place="right">
                <el-input
                    v-model="form.bizEntityJson.confirmTotalAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @input="changeTax()"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
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
            <dl-col :span="12" title="税率:">
                <el-select
                    v-model="form.bizEntityJson.taxRate"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                >
                    <el-option label="0%" value="0"></el-option>
                    <el-option label="1%" value="0.01"></el-option>
                    <el-option label="3%" value="0.03"></el-option>
                    <el-option label="5%" value="0.05"></el-option>
                    <el-option label="6%" value="0.06"></el-option>
                    <el-option label="9%" value="0.09"></el-option>
                    <el-option label="10%" value="0.1"></el-option>
                    <el-option label="11%" value="0.11"></el-option>
                    <el-option label="13%" value="0.13"></el-option>
                    <el-option label="16%" value="0.16"></el-option>
                    <el-option label="17%" value="0.17"></el-option>
                    <el-option label="20%" value="0.2"></el-option>
                </el-select>
            </dl-col>
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

            <dl-col
                :span="12"
                title="目标成本科目:"
                readonly
                :novalue="!form.bizEntityJson.costTypeName"
            >
                <el-input
                    v-model="form.bizEntityJson.costTypeName"
                    @focus="showSearchCostType = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col :span="12" title="剩余目标成本:" readonly place="right">
                <el-input
                    v-model="form.bizEntityJson.restCostGoal"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>

            <dl-col
                :span="24"
                title="计入成本月:"
                :novalue="form.bizEntityJson.yearMonth"
                place="right"
            >
                <el-date-picker
                    v-if="form.status == 'B'"
                    v-model="form.bizEntityJson.yearMonth"
                    value-format="yyyy-MM"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
                <el-radio-group
                    v-model="monthFlag"
                    @change="(monthFlag) => checkRadio(monthFlag)"
                >
                    <el-radio label="1">本月</el-radio>
                    <el-radio label="0">上月</el-radio>
                    <el-radio label="2">下月</el-radio>
                </el-radio-group>
            </dl-col>

            <dl-col
                :span="24"
                title="已付合同款(元):"
                :novalue="!form.bizEntityJson.contractPaiedAmt"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.contractPaiedAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="本次支付金额(元):"
                :novalue="!form.bizEntityJson.curPaymentAmt"
            >
                <el-input
                    v-model="form.bizEntityJson.curPaymentAmt"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="
                        toFixedBlur;
                        verifyCurPaymentAmt;
                    "
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="本次付款时间:"
                :novalue="!form.bizEntityJson.currentPayDate"
                place="right"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.currentPayDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="收款单位:"
                :novalue="!form.bizEntityJson.orgName"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.orgName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="需说明事项:"
                place="right"
                :novalue="!form.bizEntityJson.contentDesc"
            >
                <el-input
                    v-model="form.bizEntityJson.contentDesc"
                    type="textarea"
                    :autosize="{ minRows: 3 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                :novalue="
                    form.bizEntityJson.outFlag != 'true' &&
                    form.bizEntityJson.inFlag != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '预算外', name: 'outFlag' },
                        { label: '预算内', name: 'inFlag' },
                    ]"
                />
            </dl-col>
        </el-row>
        <search-org
            :open="showSearchOrg && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendCenterCd"
            @close="closeSearhOrg"
        />
        <search-costType
            :open="showSearchCostType && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.costTypeId"
            @close="closeSearchCostType"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            processCode: null,
            preResDisplayNoOptions: [],
            showSearchOrg: false,
            showSearchCostType: false,
            loading: false,
            options: [],
            monthFlag: null,
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
    created() {
        this.processCode = this.$store.state.menuTreeItem.processCode;
        this.form.bizEntityJson.taxRate = "0";
        this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
        if (!this.$route.query.id) {
            console.log(this.userInfo);
            this.$set(
                this.form.bizEntityJson,
                "sendCenterName",
                this.userInfo.centerOrgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendCenterCd",
                this.userInfo.centerOrgCd
            );
        }
    },
    methods: {
        verifyCurPaymentAmt() {
            if (this.processCode == "SYGS_CGFK") {
                if (this.form.bizEntityJson.isProjectTypeB1 == true) {
                    //B类项目
                    var vc = parseFloat(
                        this.form.bizEntityJson.curPaymentAmt.replace(/,/g, "")
                    );
                    if (Number(vc) > 10000) {
                        alert("B类项目输入金额必须≤10000元");
                        this.form.bizEntityJson.curPaymentAmt = "";
                    }
                }
            }
        },
        initProjectTypeB() {
            this.verifyCurPaymentAmt();
        },
        // 模糊搜索项目
        remoteMethod1(query) {
            if (query !== "") {
                const params = {
                    projectName: query,
                };
                this.$approval.quickSearchProject(params).then((res) => {
                    if (res.code == 1 && res.data) {
                        this.options = res.data;
                    } else {
                        this.options = [];
                    }
                });
            } else {
                this.options = [];
            }
        },
        projectNameChange(val) {
            this.form.bizEntityJson.projectName = val.projectName;
            this.form.bizEntityJson.projectCd = val.projectCd;
        },
        changeTax() {
            var bp = parseFloat(
                this.form.bizEntityJson.confirmTotalAmt.replace(/,/g, "")
            );
            var taxRate = this.form.bizEntityJson.taxRate.replace("%", "");
            var bidPrice = Number(bp) / (Number(taxRate) / 100 + 1);
            var taxRatePrice = Number(bp) - Number(bidPrice);
            this.form.bizEntityJson.beforePrice = this.formatMoney(bidPrice, 2);
            this.form.bizEntityJson.taxRatePrice = this.formatMoney(
                taxRatePrice,
                2
            );
        },
        formatMoney(s, n) {
            var isFu = false;
            // 处理负数（先转正数在统一在return后加上"-"号）
            if (undefined != s && "" != s) {
                s = s + "";
                var ts = s.substr(0, 1);
                if ("-" == ts) {
                    isFu = true;
                    s = s.substr(1, s.length);
                }
            }
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for (let i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
            }
            var rtn = t.split("").reverse().join("");
            if (n > 0) {
                rtn = rtn + "." + r;
            }
            return isFu ? "-" + rtn : rtn;
        },
        remoteMethod(query) {
            if (query) {
                this.loading = true;
                this.$approval.getBizResIdByDisplayNo(query).then((res) => {
                    if (res.code == 1) {
                        this.loading = false;
                        if (res.data.content.length > 0) {
                            this.preResDisplayNoOptions = res.data.content;
                        } else {
                            this.preResDisplayNoOptions = [];
                        }
                    }
                });
            } else {
                this.preResDisplayNoOptions = [];
            }
        },
        checkApproveNoChange(val) {
            if (val) {
                let obj = this.preResDisplayNoOptions.find(
                    (item) => item.displayNo == val
                );
                this.form.bizEntityJson.checkApproveId = obj.resApproveInfoId;
            }
        },

        // 关闭目标成本回调
        closeSearchCostType(val) {
            if (val) {
                this.form.bizEntityJson.costTypeName = val.text;
                this.form.bizEntityJson.costTypeId = val.id;
            }
            this.showSearchCostType = false;
        },

        // 关闭中心组建回调
        closeSearhOrg(val) {
            if (val) {
                this.form.bizEntityJson.sendCenterName = val.text;
                this.form.bizEntityJson.sendCenterCd = val.id;
            }
            this.showSearchOrg = false;
        },
        checkRadio(value) {
            this.form.bizEntityJson.yearMonth = this.getCurrYearMonth();
            if (value == 0) {
                this.form.bizEntityJson.yearMonth = this.getLastYearMonth();
            } else if (value == 2) {
                this.form.bizEntityJson.yearMonth = this.getNextYearMonth();
            }
        },
        //获得当前年月等
        getCurrYearMonth() {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var yearMonth = year + "-" + (month < 10 ? "0" + month : month);
            return yearMonth;
        },

        getLastYearMonth() {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            if (month == 1) {
                year = year - 1;
                month = 12;
            } else {
                month--;
            }
            var yearMonth = year + "-" + (month < 10 ? "0" + month : month);
            return yearMonth;
        },

        getNextYearMonth() {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            if (month == 12) {
                year = year + 1;
                month = 1;
            } else {
                month++;
            }
            var yearMonth = year + "-" + (month < 10 ? "0" + month : month);
            return yearMonth;
        },
    },
};
</script>