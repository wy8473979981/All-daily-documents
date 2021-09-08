<template>
    <!-- 出售/报废/遗失申请单(地产) -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row>
            <div v-if="processCode != 'JDJT_BGZC' && processCode != 'JDJT_BGZC_XSJD'&& processCode != 'CHJZ_RLZYGL_A_2_9'">
                <dl-col v-if="processCode=='XZRL_XZGL_1550'" :span="12" place="top" title="中心" :novalue="!form.bizEntityJson.centerName">
                    <el-input v-model="form.bizEntityJson.centerName" readonly/>
                </dl-col>
                <dl-col v-else :span="12" title="" place="top"
                        :novalue="form.bizEntityJson.assetsType2 !== 'true' && form.bizEntityJson.assetsType3 !== 'true' && form.bizEntityJson.assetsType1 !== 'true'">
                    <d-radio-group-string v-model="form.bizEntityJson"
                                          :nameList="[
                                          {name:'assetsType2',label:'地产总部发起'},
                                          {name:'assetsType3',label:'事业部发起'},
                                          {name:'assetsType1',label:'城市公司发起'}
                                          ]"
                    />
                </dl-col>
                <dl-col :span="12" title="" place="top right">
                    <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{name:'isComputer',label:'属于电脑或电子设备'}]"/>
                </dl-col>
            </div>
            <dl-col :span="12" title="总金额(元)" :place="processCode=='CHJZ_RLZYGL_A_2_9'?'top':''">
                <el-input v-model="form.bizEntityJson.totalMoney" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col v-if="processCode=='CHJZ_RLZYGL_A_2_9'" :span="12" title="" :place="processCode=='CHJZ_RLZYGL_A_2_9'?'top right':'right'">
                <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{name:'isComputer',label:'属于电脑或电子设备'}]"/>
            </dl-col>
            <dl-col v-else :span="12" place="right"></dl-col>
        </el-row>
        <template v-for="(item, index) in form.bizEntityJson.subProperties">
            <br>
            <el-row :key="`listItem${index}`">
                <dl-col :span="12" title="资产编码" place="top">
                    <el-select v-model="form.bizEntityJson.assetCode" v-if="!form.bizEntityJson.disabled" :loading="loading"
                               @change="optionChange($event, index)" filterable clearable remote :remote-method="quickSearch"
                               :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled">
                        <el-option v-for="item in assetCodeOptions" :key="item.assetCode" :label="item.assetName" :value="item.assetCode">
                        </el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="10" title="资产名称" place="top">
                    <el-input v-model="item.assetName" readonly/>
                </dl-col>
                <dl-col :span="2" place="top right">
                    <el-button v-if="form.bizEntityJson.subProperties.length > 1" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove(index)">删除</el-button>
                </dl-col>
                <dl-col :span="12" title="设备型号">
                    <el-input v-model="item.model" readonly/>
                </dl-col>
                <dl-col :span="12" title="型号编码" place="right">
                    <el-input v-model="item.assmCode" readonly/>
                </dl-col>
                <dl-col :span="12" title="使用部门">
                    <el-input v-model="item.useDept" readonly/>
                </dl-col>
                <dl-col :span="12" title="使用责任人" place="right">
                    <el-input v-model="item.usePersonName" readonly @focus="showSearchUser=true;curIndex=index;"/>
                </dl-col>
                <dl-col :span="12" title="购置时间">
                    <el-input v-model="item.useDate" readonly/>
                </dl-col>
                <dl-col :span="12" title="使用年限" place="right">
                    <el-input v-model="item.useYear" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                </dl-col>
                <dl-col :span="12" title="原值(元)">
                    <el-input v-model="item.srcValue" readonly/>
                </dl-col>
                <dl-col :span="12" title="净值(元)" place="right">
                    <el-input v-model="item.remainVal" readonly/>
                </dl-col>
                <dl-col :span="12" title="当前配置">
                    <el-input v-model="item.currNum" readonly/>
                </dl-col>
                <dl-col :span="12" title="标准配置" place="right">
                    <el-input v-model="item.stanNum" readonly/>
                </dl-col>
                <dl-col :span="24" title="" place="right" :novalue="item.saleType1 !== 'true' && item.saleType2 !== 'true' && item.saleType3 !== 'true'">
                    <d-radio-group-string v-model="form.bizEntityJson" :nameList="[
                        {name:`subProperties[${index}].saleType1`,label:'出售'},
                        {name:`subProperties[${index}].saleType2`,label:'报废'},
                        {name:`subProperties[${index}].saleType3`,label:'遗失'}
                        ]"
                    />
                </dl-col>
                <dl-col :span="24" title="情况说明" place="right" :novalue="!form.bizEntityJson.remark">
                    <el-input v-model="form.bizEntityJson.remark" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                </dl-col>
            </el-row>
        </template>
        <br>
        <el-row>
            <el-col :span="24" style="border: none;">
                <div class="d-min">
                    <div class="d-red" style="justify-content: center;">
                        <el-button type="primary" size="mini" @click="add">增加资产</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
        <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            userInfo: null,
            processCode: null,
            loading: false,
            assetCodeOptions: [],
            assetsItems: [],
            showSearchUser: false,
            curIndex: null
        }
    },
    /* 本地模板编译需要的数据回传，不需要上传到后台 start */
    props: ['data'],
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                this.form = val;
            }
        }
    },
    /* end */
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'));
        // this.processCode = 'CHJZ_RLZYGL_A_2_9';
        if (!this.$route.query.id) {
            this.processCode = this.$store.state.menuTreeItem.processCode;

            this.$set(this.form.bizEntityJson, 'centerCd', null);
            this.$set(this.form.bizEntityJson, 'centerName', this.userInfo.orgName);
            this.$set(this.form.bizEntityJson, 'totalMoney', null);
            this.$set(this.form.bizEntityJson, 'assetsType1', 'false');
            this.$set(this.form.bizEntityJson, 'assetsType2', 'false');
            this.$set(this.form.bizEntityJson, 'assetsType3', 'false');
            this.$set(this.form.bizEntityJson, 'isComputer', null);
            this.$set(this.form.bizEntityJson, 'subProperties', []);
            this.add();
        } else {
            this.getProcessCode(this.form.pmApprove.processId);
        }
    },
    methods: {
        getProcessCode(processId) {
            this.$approval.findPmProcessByVo({processId: processId}).then((res) => {
                if (res.code == '1' && res.data) {
                    this.processCode = res.data.processCode;
                }
            });
        },
        add() {
            this.form.bizEntityJson.subProperties = this.form.bizEntityJson.subProperties || [];
            if (this.form.bizEntityJson.subProperties instanceof Array) {
                this.form.bizEntityJson.subProperties.push(JSON.parse(JSON.stringify({
                    assetCode: null,
                    assmAccountId: null,
                    assetName: null,
                    model: null,
                    assmCode: null,
                    useDept: null,
                    useDate: null,
                    srcValue: null,
                    remainVal: null,
                    currNum: null,
                    stanNum: null,
                    usePersonName: null,
                    usePersonCd: null,
                    useYear: null,
                    remark: null,
                    saleType1: null,
                    saleType2: null,
                    saleType3: null,
                    saleType4: null,
                    saleType5: null,
                    saleType6: null
                })));
            }
        },
        remove(index) {
            if (this.form.bizEntityJson.subProperties != null && this.form.bizEntityJson.subProperties instanceof Array && this.form.bizEntityJson.subProperties.length > 0) {
                this.form.bizEntityJson.subProperties.splice(index, 1);
            }
        },
        quickSearch(query) {
            this.loading = true;
            try {
                if (query !== '') {
                    query = query.toString().trim();
                    const param = {
                        value: query,
                        statusFilter: 'true'
                    };
                    this.$approval.assetsQuickSearch(param).then((response) => {
                        if (response.code == 1 && response.data) {
                            this.assetCodeOptions = response.data;
                        } else {
                            this.assetCodeOptions = [];
                        }
                        this.loading = false;
                    }, () => {
                        this.assetCodeOptions = [];
                        this.loading = false;
                    });
                }
            } catch {
                this.assetCodeOptions = [];
                this.loading = false;
            }
        },
        optionChange(val, index) {
            const selected = this.assetCodeOptions.find((item) => item.assetCode == val);

            this.form.bizEntityJson.subProperties[index].assetCode = selected.code;
            this.form.bizEntityJson.subProperties[index].assetName = selected.assmName;
            this.form.bizEntityJson.subProperties[index].model = selected.model;
            this.form.bizEntityJson.subProperties[index].assmCode = selected.assmCode;
            this.form.bizEntityJson.subProperties[index].useDept = selected.useDepartment;
            this.form.bizEntityJson.subProperties[index].useDate = selected.useDate;
            this.form.bizEntityJson.subProperties[index].srcValue = selected.srcValue;
            this.form.bizEntityJson.subProperties[index].remainVal = selected.remainVal;
            this.form.bizEntityJson.subProperties[index].currNum = selected.currNum;
            this.form.bizEntityJson.subProperties[index].stanNum = selected.stanNum;
        },
        closeSearhUser(val) {
            if (val) {
                this.form.bizEntityJson.subProperties[this.curIndex].usePersonName = val.userName
                this.form.bizEntityJson.subProperties[this.curIndex].usePersonCd = val.userCd
            }
            this.showSearchUser = false
        }
    }
}
</script>