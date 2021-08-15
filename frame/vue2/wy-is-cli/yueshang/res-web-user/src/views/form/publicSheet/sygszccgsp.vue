<template>
<!-- 商业公司资产采购审批 -->
    <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
        <el-row>
            <dl-col
                :span="12"
                title="资产类型"
                :novalue="
                    form.bizEntityJson.standard != 'true' &&
                    form.bizEntityJson.nostandard != 'true'
                "
                style="border-top: solid #dddddd; border-top-width: 1px"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    @change="(value) => stanClick(value)"
                    :nameList="[
                        { label: '标准', name: 'standard' },
                        { label: '非标准', name: 'nostandard' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="预算类型"
                :novalue="
                    form.bizEntityJson.outFlag != 'true' &&
                    form.bizEntityJson.inFlag != 'true'
                "
                place="right"
                style="border-top: solid #dddddd; border-top-width: 1px"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '预算外', name: 'outFlag' },
                        { label: '预算内', name: 'inFlag' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="资产归属"
                :novalue="
                    form.bizEntityJson.hotel != 'true' &&
                    form.bizEntityJson.layout != 'true' &&
                    form.bizEntityJson.service != 'true' &&
                    form.bizEntityJson.administrative != 'true' &&
                    form.bizEntityJson.project != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '住宅', name: 'hotel' },
                        { label: '企划', name: 'layout' },
                        { label: '营运', name: 'service' },
                        { label: '行政', name: 'administrative' },
                        { label: '工程', name: 'project' },
                    ]"
                />
            </dl-col>
        </el-row>
        <el-row class="padding-row">
            <dl-col
                :span="12"
                title="申购日期"
                :novalue="!form.bizEntityJson.applyDate"
                style="border-top: solid #dddddd; border-top-width: 1px"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.applyDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="需用日期"
                :novalue="!form.bizEntityJson.needDate"
                place="right"
                style="border-top: solid #dddddd; border-top-width: 1px"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.needDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="资产采购单号"
                :novalue="!form.bizEntityJson.purchaseCode"
            >
                <el-input
                    v-model="form.bizEntityJson.purchaseCode"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="战略采购"
                :novalue="
                    form.bizEntityJson.strategy1 != 'true' &&
                    form.bizEntityJson.strategy2 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '是', name: 'strategy1' },
                        { label: '否', name: 'strategy2' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="资产类型"
                :novalue="
                    form.bizEntityJson.type1 != 'true' &&
                    form.bizEntityJson.type2 != 'true' &&
                    form.bizEntityJson.type3 != 'true' &&
                    form.bizEntityJson.type4 != 'true' &&
                    form.bizEntityJson.type5 != 'true' &&
                    form.bizEntityJson.type6 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    @change="(value) => selType(value)"
                    :nameList="[
                        { label: '房地产及建筑物', name: 'type1' },
                        { label: '办公设备', name: 'type2' },
                        { label: '办公家具', name: 'type3' },
                        { label: '运输设备', name: 'type4' },
                        { label: '经营设备', name: 'type5' },
                        { label: '礼品', name: 'type6' },
                    ]"
                />
            </dl-col>
            <dl-col :span="6" title="申购总量">
                <el-input
                    v-model="form.bizEntityJson.applyNumber"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="
                        toFixedBlur;
                        validateNumber('1');
                    "
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="3" place="title">
                <h2>其中金额≥500元的资产数量</h2>
            </dl-col>
            <dl-col :span="15" place="right">
                <el-input
                    v-model="form.bizEntityJson.applyNumber2"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="
                        toFixedBlur;
                        validateNumber('2');
                        autoAddItem(form.bizEntityJson.applyNumber2);
                    "
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="申购部门"
                :novalue="!form.bizEntityJson.applyDept"
            >
                <el-input
                    v-model="form.bizEntityJson.applyDept"
                    @focus="showSearchOrg = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="申请人"
                :novalue="!form.bizEntityJson.applyUser"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.applyUser"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="24" title="金额(元)" place="right">
                <el-input
                    v-model="form.bizEntityJson.totalMoney"
                    maxlength="15"
                    v-limit-number="2"
                    @focus="toFixedFocus"
                    @blur="toFixedBlur"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="申购设备及配置需求"
                place="right"
                :novalue="!form.bizEntityJson.applyContent"
            >
                <el-input
                    v-model="form.bizEntityJson.applyContent"
                    type="textarea"
                    :autosize="{ minRows: 3 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="24"
                title="申购理由"
                place="right"
                :novalue="!form.bizEntityJson.reason"
            >
                <el-input
                    v-model="form.bizEntityJson.reason"
                    type="textarea"
                    :autosize="{ minRows: 3 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
        </el-row>

        <template v-if="form.bizEntityJson.applyNumber2">
            <el-row
                class="padding-row"
                v-for="(item, index) in form.bizEntityJson
                    .fixedAssetsProperties"
                :key="index"
            >
                <dl-col
                    :span="23"
                    title="商业公司"
                    :novalue="!item.projectName"
                >
                    <el-input
                        v-model="item.projectName"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="1">
                    <el-button type="text" size="mini" @click="reshAll()"
                        >刷新</el-button
                    >
                </dl-col>
                <dl-col :span="12" title="资产名称" :novalue="!item.assmName">
                    <el-input
                        v-model="item.assmName"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="资产编码" :novalue="!item.code">
                    <el-input
                        v-model="item.code"
                        @blur="checkCode()"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    title="设备型号"
                    :novalue="!item.assmModelName"
                >
                    <el-input
                        v-model="item.assmModelName"
                        @focus="
                            checkType();
                            setIndex(index);
                        "
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="设备编码" :novalue="!item.assmCode">
                    <el-input
                        v-model="item.assmCode"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    title="使用部门"
                    :novalue="!item.useDepartName"
                >
                    <el-input
                        v-model="item.useDepartName"
                        @focus="showSearchOrg2 = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="使用时间" :novalue="!item.useDate">
                    <el-date-picker
                        v-model="item.useDate"
                        value-format="yyyy-MM-dd"
                        clearable
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    title="使用情况"
                    :novalue="
                        item.useStatus1 != 'true' &&
                        item.useStatus2 != 'true' &&
                        item.useStatus4 != 'true' &&
                        item.useStatus5 != 'true'
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                            { label: '正常使用', name: 'useStatus1' },
                            { label: '库存', name: 'useStatus2' },
                            { label: '经营租出', name: 'useStatus4' },
                            { label: '公用', name: 'useStatus5' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    title="增加方式"
                    :novalue="
                        item.addWay1 != 'true' &&
                        item.addWay2 != 'true' &&
                        item.addWay3 != 'true' &&
                        item.addWay4 != 'true' &&
                        item.addWay5 != 'true' &&
                        item.addWay6 != 'true' &&
                        item.addWay7 != 'true'
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                            { label: '购入', name: 'addWay1' },
                            { label: '地产转入', name: 'addWay2' },
                            { label: '其他商业公司转入', name: 'addWay3' },
                            { label: '租入', name: 'addWay4' },
                            { label: '捐赠', name: 'addWay5' },
                            { label: '地产借入', name: 'addWay6' },
                            { label: '商业集团调拨', name: 'addWay7' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    title="存放地点"
                    :novalue="
                        item.storageSites1 != 'true' &&
                        item.storageSites2 != 'true' &&
                        item.storageSites3 != 'true'
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                            { label: '办公区', name: 'storageSites1' },
                            { label: '仓库', name: 'storageSites2' },
                            { label: '城市广场', name: 'storageSites3' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    title="保管人员(PD)"
                    place="right"
                    :novalue="!item.keeperName"
                >
                    <el-input
                        v-model="item.keeperName"
                        @focus="
                            showSearchUser = true;
                            setIndex(index);
                        "
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    title="保管人员(非PD)"
                    tip="请输入无PD账号的保管人员"
                    place="right"
                >
                    <el-input
                        v-model="item.keeperName2"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="原值" :novalue="!item.srcValue">
                    <el-input
                        v-model="item.srcValue"
                        maxlength="15"
                        v-limit-number="2"
                        @keyup="getNetValue2(item.srcValue, index)"
                        @focus="toFixedFocus"
                        @blur="
                            toFixedBlur;
                            getNetValue(item.srcValue, index);
                        "
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="净值" :novalue="!item.netValue">
                    <el-input
                        v-model="item.netValue"
                        maxlength="15"
                        v-limit-number="2"
                        @focus="toFixedFocus"
                        @blur="toFixedBlur"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    title="折旧年限"
                    :novalue="!item.depreYeadNum"
                >
                    <el-input
                        v-model="item.depreYeadNum"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" title="折旧方式" :novalue="!item.depreWay">
                    <el-input
                        v-model="item.depreWay"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    v-if="form.bizEntityJson.standard == 'true'"
                    :span="12"
                    title="当前配置数"
                    :novalue="!item.currHasNum"
                >
                    <el-input
                        v-model="item.currHasNum"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    v-if="form.bizEntityJson.standard == 'true'"
                    :span="12"
                    title="标准配置数"
                    :novalue="!item.currStanNum"
                >
                    <el-input
                        v-model="item.currStanNum"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    v-if="form.bizEntityJson.nostandard == 'true'"
                    :span="12"
                    title="超标配置数"
                    :novalue="!item.overNum"
                >
                    <el-input
                        v-model="item.overNum"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    v-if="item.currHasNum > item.currStanNum"
                    :span="24"
                    place="right"
                >
                    <div class="explain-p">
                        <p class="explain-p-one">
                            提示：当前配置数大于标准配置数
                        </p>
                    </div>
                </dl-col>
            </el-row>
        </template>
        <el-row class="padding-row">
            <dl-col :span="24" place="title top right">
                <h2>评审资料</h2>
            </dl-col>
            <dl-col
                :span="24"
                title="月度预算表"
                place="right"
                :novalue="!form.bizEntityJson.budgetFile"
            >
                <one-file :form="form" value="budgetFile" />
            </dl-col>
        </el-row>
        <search-org
            :open="showSearchOrg && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.applyDeptCd"
            @close="closeSearhOrg"
        />
        <search-org
            :open="showSearchOrg2 && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.applyDeptCd"
            @close="closeSearhOrg2"
        />
        <search-user
            :open="showSearchUser && !form.bizEntityJson.disabled"
            @close="closeSearhUser"
        />
        <select-assmModel
            :open="showSelectAssmModel && !form.bizEntityJson.disabled"
            :checkedVal="checkedTp"
            @close="closeSelectAssmModel"
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
            userInfo: [],
            isAutosetProject: 0,
            isShowChkBox: 0,
            showSearchOrg: false,
            showSearchOrg2: false,
            showSearchUser: false,
            conItemCount: null,
            computerModelName: "",
            showSelectAssmModel: false,
            checkedTp: null,
            index: null,
            bisProjectId: null,
            selectAssmModelTwo: [],
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
        this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
        if (!this.$route.query.id) {
            this.$set(this.form.bizEntityJson, "fixedAssetsProperties", []);
            this.processCode = this.$store.state.menuTreeItem.processCode;
            this.$set(this.form.bizEntityJson, "standard", "false");
            this.$set(this.form.bizEntityJson, "nostandard", "false");
        }
    },
    methods: {
        getNetValue(value, index) {
            if (value != "" && value < 500 && this.checkedTp != 6) {
                alert("原值必须大于500!");
                this.form.fixedAssetsProperties[index].srcValue = "";
                this.form.fixedAssetsProperties[index].netValue = "";
                return false;
            } else {
                this.form.fixedAssetsProperties[index].netValue = value;
            }
        },
        getNetValue2(value, index) {
            this.form.fixedAssetsProperties[index].netValue = value;
        },
        setIndex(index) {
            this.index = index;
        },
        checkType() {
            if (this.checkedTp != null) {
                this.showSelectAssmModel = true;
            } else {
                this.$alert("请先选择资产类型!", "提示", {
                    confirmButtonText: "确定",
                });
            }
        },
        selType(value) {
            if (this.form.bizEntityJson.applyNumber2 != null) {
                this.$alert("选择新类别资产信息将被清空!", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.addItemByNum(this.form.bizEntityJson.applyNumber2);
                    },
                });
            }
            if (value.name == "type1") {
                this.checkedTp = 1; //房地产及建筑物
            }
            if (value.name == "type2") {
                this.checkedTp = 2; //办公设备
            }
            if (value.name == "type3") {
                this.checkedTp = 3; //经营设备
            }
            if (value.name == "type4") {
                this.checkedTp = 4; //办公家具
            }
            if (value.name == "type5") {
                this.checkedTp = 5; //运输设备
            }
            if (value.name == "type6") {
                this.checkedTp = 6; //运输设备
            }
        },
        stanClick() {
            var flag = false;
            for (
                let i = 0;
                i < this.form.bizEntityJson.fixedAssetsProperties.length;
                i++
            ) {
                if (this.form.bizEntityJson.fixedAssetsProperties.length != 0) {
                    flag = true;
                }
            }
            if (flag) {
                alert("选择标准/非标准资产信息将被清空!");
                this.addItemByNum(this.form.bizEntityJson.applyNumber2);
            }
        },
        validateNumber(dom) {
            if (
                this.form.bizEntityJson.applyNumber != "" &&
                this.form.bizEntityJson.applyNumber2 != ""
            ) {
                if (
                    parseFloat(this.form.bizEntityJson.applyNumber) <
                    parseFloat(this.form.bizEntityJson.applyNumber2)
                ) {
                    alert("申购总量不能小于金额≥500元的资产数量");
                    if (dom == "1") {
                        this.form.bizEntityJson.applyNumber = "";
                    } else {
                        this.form.bizEntityJson.applyNumber2 = "";
                    }
                }
            }
        },
        formatFloat(s) {
            s = s + "";
            return parseFloat(s.replace(/[^\d.-]/g, ""));
        },
        getValByJ(jdom) {
            return jdom == "" ? 0.0 : this.formatFloat(jdom);
        },
        autoAddItem(dom) {
            var hidApplyNumber2 = dom;
            var cnt = this.getValByJ(dom);

            if (
                parseFloat(hidApplyNumber2) > 0 &&
                this.form.bizEntityJson.standard != "true" &&
                this.form.bizEntityJson.nostandard != "true"
            ) {
                alert("请先选择标准/非标准!");
                this.form.bizEntityJson.applyNumber2 = "";
                return;
            }
            if (hidApplyNumber2 == null || "" == hidApplyNumber2) {
                this.addItemByNum(cnt);
                return;
            }
            if (parseInt(hidApplyNumber2) == parseInt(cnt)) {
                this.addItemByNum(cnt);
            }
        },
        addItemByNum(cnt) {
            if (cnt > 30) {
                alert("数值不能超过30");
                this.form.bizEntityJson.applyNumber2 = "";
                return;
            }
            this.$set(this.form.bizEntityJson, "fixedAssetsProperties", []);
            for (var i = 0; i < cnt; i++) {
                this.addItem();
            }
        },
        addItem() {
            this.form.bizEntityJson.fixedAssetsProperties.push({
                projectName: this.userInfo.centerOrgName,
                projectCd: this.userInfo.centerOrgCd,
                assmName: "",
                code: "",
                assmModelName: "",
                assmModelId: "",
                assmCode: "",
                assmModelStandardId: "",
                useDepartName: "",
                useDepartCd: "",
                useDate: "",
                useStatus1: "false",
                useStatus2: "false",
                useStatus4: "false",
                useStatus5: "false",
                addWay1: "false",
                addWay2: "false",
                addWay3: "false",
                addWay4: "false",
                addWay5: "false",
                addWay6: "false",
                addWay7: "false",
                storageSites1: "false",
                storageSites2: "false",
                storageSites3: "false",
                keeperName: "",
                keeperCd: "",
                computerType: "",
                keeperName2: "",
                srcValue: "",
                netValue: "",
                depreYeadNum: "",
                depreWay: "",
                selectThridModelId: "",
                currHasNum: "",
                currStanNum: "",
                overNum: "",
            });
        },
        yz_input(value) {
            this.form.bizEntityJson.fixedAssetsProperties[0].netValue = value;
        },
        closeSelectAssmModel(val) {
            if (val) {
                this.form.bizEntityJson.fixedAssetsProperties[
                    this.index
                ].assmModelName = val[2].assmModelName;
                this.form.bizEntityJson.fixedAssetsProperties[
                    this.index
                ].assmModelId = val[2].assmModelName;
                this.form.bizEntityJson.fixedAssetsProperties[
                    this.index
                ].assmCode = val[2].assmodelCode;
                this.selectAssmModelTwo = val[1];
                this.getProjectId(val);
                this.getAssmDepreciationByModelId();
            }
            this.showSelectAssmModel = false;
        },
        getProjectId(val) {
            this.$approval
                .getProjectId(this.userInfo.centerOrgCd)
                .then((res) => {
                    if (res.code == 1 && res.data) {
                        this.bisProjectId = res.data;
                        this.getAssmModelData(val);
                    } else {
                        this.bisProjectId = null;
                    }
                });
        },
        getAssmModelData(val) {
            const params = {
                projectId: this.bisProjectId,
                assmModelId:
                    this.form.bizEntityJson.fixedAssetsProperties[this.index]
                        .assmModelId,
            };
            this.$approval.getAssmModelData(params).then((res) => {
                if (res.code == 1 && res.data) {
                    if (this.checkedTp == 6) {
                        for (
                            let k = 0;
                            k < parseInt(this.form.bizEntityJson.applyNumber);
                            k++
                        ) {
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].assmModelId = val.assmModelId;
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].assmModelName = val.assmModelName;
                            var code = "";
                            if (k < 10) {
                                code = "000" + k;
                            } else if (k < 100) {
                                code = "00" + k;
                            } else {
                                code = "0" + k;
                            }
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].code =
                                this.form.bizEntityJson.purchaseCode +
                                "_" +
                                code;
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].useStatus1 = "true";
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].addWay1 = "true";
                            this.form.bizEntityJson.fixedAssetsProperties[
                                k
                            ].storageSites1 = "true";
                        }
                    }
                    var thridCount = 0;
                    for (
                        let i = 0;
                        i <
                        this.form.bizEntityJson.fixedAssetsProperties.length;
                        i++
                    ) {
                        const element =
                            this.form.bizEntityJson.fixedAssetsProperties[i]
                                .assmModelId;
                        if (
                            this.form.bizEntityJson.fixedAssetsProperties[i]
                                .assmModelId ==
                            this.form.bizEntityJson.fixedAssetsProperties[
                                this.index
                            ].assmModelId
                        ) {
                            thridCount++;
                        }
                    }
                    this.form.bizEntityJson.fixedAssetsProperties[
                        this.index
                    ].currStanNum = parseInt(res.data.stanNum);
                    this.form.bizEntityJson.fixedAssetsProperties[
                        this.index
                    ].currHasNum =
                        parseInt(res.data.hasNum) +
                        parseInt(1) +
                        parseInt(thridCount);
                    var overNum = 0;
                    if (currHasNum > currStanNum) {
                        overNum = -(currStanNum - currHasNum);
                    }
                } else {
                    this.options2 = [];
                }
            });
        },

        // val-二级设备id
        getAssmDepreciationByModelId(val) {
            this.$approval.getAssmDepreciationByModelId(val).then((res) => {
                if (res.code == 1 && res.data) {
                    // 折旧年限
                    this.form.bizEntityJson.fixedAssetsProperties[
                        this.index
                    ].depreYeadNum = res.data;
                    // 折旧方式
                    this.form.bizEntityJson.fixedAssetsProperties[
                        this.index
                    ].depreWay =
                        this.form.bizEntityJson.fixedAssetsProperties[
                            this.index
                        ].assmModelName +
                        "(" +
                        res.data +
                        ")" +
                        "年";
                } else {
                    this.bisProjectId = null;
                }
            });
        },

        // 关闭人员组件回调
        closeSearhUser(val) {
            if (val && this.processCode == "SYGS_XZGL_ZCCG_N1") {
                for (let i = 0; i < applyNumber2; i++) {
                    if (
                        this.index != i &&
                        this.form.fixedAssetsProperties[i].keeperCd ==
                            val.userCd &&
                        this.selectAssmModelTwo.assmModelName == "电脑"
                    ) {
                        alert("提示：您选中的保管人员已经保管有电脑设备!");
                        return;
                    }
                }
                this.form.bizEntityJson.fixedAssetsProperties[this.index].keeperName =
                    val.userName;
                this.form.bizEntityJson.fixedAssetsProperties[this.index].keeperCd =
                    val.userCd;
            } else if (val) {
                for (let i = 0; i < applyNumber2; i++) {
                    if (
                        this.index != i &&
                        this.form.fixedAssetsProperties[i].keeperCd ==
                            val.userCd &&
                        this.selectAssmModelTwo.assmModelName == "电脑"
                    ) {
                        alert("提示：您选中的保管人员已经保管有电脑设备!");
                        return;
                    }
                }
                this.form.bizEntityJson.fixedAssetsProperties[
                    this.index
                ].keeperName = val.userName;
                this.form.bizEntityJson.fixedAssetsProperties[
                    this.index
                ].keeperCd = val.userCd;
            }
            this.showSearchUser = false;
        },
        // 关闭中心组建回调
        closeSearhOrg2(val) {
            if (val) {
                this.form.bizEntityJson.fixedAssetsProperties[this.index].useDepartName =
                    val.text;
                this.form.bizEntityJson.fixedAssetsProperties[this.index].useDepartCd =
                    this.computerModelName;
            }
            this.showSearchOrg2 = false;
        },
        // 关闭中心组建回调
        closeSearhOrg(val) {
            if (val) {
                this.form.bizEntityJson.applyDept = val.text;
                this.form.bizEntityJson.applyDeptCd = val.id;
            }
            this.showSearchOrg = false;
            this.getCodePrefix();
        },
        getCodePrefix(){
          this.form.bizEntityJson.purchaseCode = 'PLSY21001';
        },
    },
};
</script>