<template>
    <!-- 融资立项审批表 -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row>
            <dl-col :span="24" title="编制日期" place="top right">
                <el-date-picker v-model="form.bizEntityJson.compileDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="24" place="right" v-if="processCode==='CWGL_RZGL_31'"
                    :novalue="form.bizEntityJson.type1 !== 'true' && form.bizEntityJson.type2 !== 'true' && form.bizEntityJson.type3 !== 'true' && form.bizEntityJson.type4 !== 'true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                      {name:'type1', label:'资本管理中心'},
                                      {name:'type2', label:'财务管理中心/资金管理中心'},
                                      {name:'type3', label:'事业部'},
                                      {name:'type4', label:'城市公司'}
                                      ]"
                />
            </dl-col>
            <dl-col :span="24" place="title right">
                <h2>基本情况</h2>
            </dl-col>
            <dl-col :span="24" title="所属项目" place="right">
                <el-input v-model="form.bizEntityJson.centerName" @focus="showSearchOrg=true" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
                <el-input v-model="form.bizEntityJson.centerCd" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" style="display: none !important;"/>
            </dl-col>
            <dl-col :span="24" title="融资主体" place="right" :novalue="!form.bizEntityJson.financingSubject">
                <el-input v-model="form.bizEntityJson.financingSubject" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" title="贷款方" place="right" :novalue="!form.bizEntityJson.lender">
                <el-input v-model="form.bizEntityJson.lender" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="授信额度(万元)" :novalue="!form.bizEntityJson.lineOfCredit">
                <el-input v-model="form.bizEntityJson.lineOfCredit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="贷款审批有效期(月)" place="right">
                <el-input v-model="form.bizEntityJson.loanApproval" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="贷款期限(月)" :novalue="!form.bizEntityJson.loanTerm">
                <el-input v-model="form.bizEntityJson.loanTerm" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="是否影响报表" place="right" :novalue="form.bizEntityJson.isReport1 !== 'true' && form.bizEntityJson.isReport2 !== 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                        {name:'isReport1', label:'是'},
                        {name:'isReport2', label:'否'}
                        ]"
                />
            </dl-col>
            <dl-col :span="24" title="融资类型" place="right"
                    :novalue="!form.bizEntityJson.financingType1&&!form.bizEntityJson.financingType2&&!form.bizEntityJson.financingType3&&!form.bizEntityJson.financingType4&&!form.bizEntityJson.financingType5&&!form.bizEntityJson.financingType6&&!form.bizEntityJson.financingType7&&!form.bizEntityJson.financingType8">
                <el-checkbox v-model="form.bizEntityJson.financingType1" true-label="true" false-label="false">开发贷</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType2" true-label="true" false-label="false">物业贷</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType3" true-label="true" false-label="false">内保外贷</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType4" true-label="true" false-label="false">外保内贷</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType5" true-label="true" false-label="false">流动资金贷款</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType6" true-label="true" false-label="false">信托融资</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType7" true-label="true" false-label="false">承兑汇票</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.financingType8" true-label="true" false-label="false">发债</el-checkbox>

            </dl-col>
            <dl-col :span="24" place="title right">
                <h2>抵押、担保情况</h2>
            </dl-col>
            <dl-col :span="12" title="担保方式"
                    :novalue="form.bizEntityJson.guaranteeWay1!=='true'&&form.bizEntityJson.guaranteeWay2!=='true'&&form.bizEntityJson.guaranteeWay3!=='true'&&form.bizEntityJson.guaranteeWay4!=='true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                        {name:'guaranteeWay1', label:'纯信用贷款'},
                                        {name:'guaranteeWay2', label:'资产抵押'},
                                        {name:'guaranteeWay3', label:'资产抵押+担保'},
                                        {name:'guaranteeWay4', label:'现金质押'},
                                      ]"
                />
            </dl-col>
            <dl-col :span="12" title="保证金比例(%)" place="right" :novalue="form.bizEntityJson.financingType3?!form.bizEntityJson.undsRatio:undefined">
                <el-input v-model="form.bizEntityJson.undsRatio" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="抵押物价值(万元)" :novalue="(form.bizEntityJson.guaranteeWay2==='true'||form.bizEntityJson.guaranteeWay3==='true')?!form.bizEntityJson.mortgagedProperty:undefined">
                <el-input v-model="form.bizEntityJson.mortgagedProperty" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="抵押率(%)" place="right"
                    :novalue="(form.bizEntityJson.guaranteeWay2==='true'||form.bizEntityJson.guaranteeWay3==='true')?!form.bizEntityJson.mortgagedRate:undefined">
                <el-input v-model="form.bizEntityJson.mortgagedRate" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" title="抵押物简介" place="right" :novalue="(form.bizEntityJson.guaranteeWay2==='true'||form.bizEntityJson.guaranteeWay3==='true')?!form.bizEntityJson.mortgagedDesc:undefined">
                <el-input v-model="form.bizEntityJson.mortgagedDesc" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" title="担保说明" place="right">
                <el-input v-model="form.bizEntityJson.warrantyDescription" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" place="title right">
                <h2>融资成本</h2>
            </dl-col>
            <dl-col :span="12" title="综合成本(%)" :novalue="!form.bizEntityJson.comprehensiveCost">
                <el-input v-model="form.bizEntityJson.comprehensiveCost" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="其中:顾问费(%)" place="right">
                <el-input v-model="form.bizEntityJson.consultingFee" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" title="利息支付方式"
                    :novalue="form.bizEntityJson.interestPayment1!=='true'&&form.bizEntityJson.interestPayment2!=='true'&&form.bizEntityJson.interestPayment3!=='true'&&form.bizEntityJson.interestPayment4!=='true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                        {name:'interestPayment1', label:'一年支付'},
                                        {name:'interestPayment2', label:'半年支付'},
                                        {name:'interestPayment3', label:'季度支付'},
                                        {name:'interestPayment4', label:'月度支付'},
                                      ]"
                />
            </dl-col>
            <dl-col :span="12" title="顾问费支付方式" place="right">
                <el-input v-model="form.bizEntityJson.consultingPayment" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" place="title right">
                <h2>提款条款</h2>
            </dl-col>
            <dl-col :span="12" title="提款方式" :novalue="form.bizEntityJson.drawingStyle1!=='true'&&form.bizEntityJson.drawingStyle2!=='true'&&form.bizEntityJson.drawingStyle3!=='true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                        {name:'drawingStyle1', label:'一次性提款'},
                                        {name:'drawingStyle2', label:'随开发进度提款'},
                                        {name:'drawingStyle3', label:'按约定时间提款'},
                                      ]"
                />
            </dl-col>
            <dl-col :span="12" title="提款条件" place="right">
                <el-input v-model="form.bizEntityJson.drawdownConditions" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="24" place="title right">
                <h2>还款条款</h2>
            </dl-col>
            <dl-col :span="12" title="最后到期日">
                <el-date-picker v-model="form.bizEntityJson.finalDueDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="12" title="提前还款条件" place="right"
                    :novalue="form.bizEntityJson.earlyRepaymentConditions1!=='true'&&form.bizEntityJson.earlyRepaymentConditions2!=='true'&&form.bizEntityJson.earlyRepaymentConditions3!=='true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                        {name:'earlyRepaymentConditions1', label:'不允许提前还款'},
                                        {name:'earlyRepaymentConditions2', label:'可随时提前还款'},
                                        {name:'earlyRepaymentConditions3', label:'满一定时间后可提前还款'}
                                      ]"
                />
            </dl-col>
            <dl-col :span="12" title="还款方式" :novalue="form.bizEntityJson.repaymentMethod1!=='true'&&form.bizEntityJson.repaymentMethod2!=='true'&&form.bizEntityJson.repaymentMethod3!=='true'">
                <d-radio-group-string v-model="form.bizEntityJson"
                                      :nameList="[
                                        {name:'repaymentMethod1', label:'一次性付款'},
                                        {name:'repaymentMethod2', label:'随销售+限定时间'},
                                        {name:'repaymentMethod3', label:'约定时间分次还款'},
                                      ]"
                />
            </dl-col>
            <dl-col :span="12" :title="form.bizEntityJson.earlyRepaymentConditions1==='true'?'提前还款违约金比例':'月份数'" place="right"
                    v-if="form.bizEntityJson.earlyRepaymentConditions1==='true'||form.bizEntityJson.earlyRepaymentConditions3==='true'">
                <el-input v-model="form.bizEntityJson.earlyRepaymentRatio" v-limit-number="form.bizEntityJson.earlyRepaymentConditions1==='true'?2:0"
                          @focus="form.bizEntityJson.earlyRepaymentConditions1==='true'?toFixedFocus($event):null"
                          @blur="form.bizEntityJson.earlyRepaymentConditions1==='true'?toFixedBlur($event):null" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
            <dl-col :span="12" place="right" v-else/>
            <dl-col :span="12" title="本融资的计划授信完成时间" :novalue="!form.bizEntityJson.creditCompletionDate">
                <el-date-picker v-model="form.bizEntityJson.creditCompletionDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="12" title="金融机构计划审批完成时间" place="right" :novalue="!form.bizEntityJson.approveCompleteDate">
                <el-date-picker v-model="form.bizEntityJson.approveCompleteDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="24" title="其他重要需说明事项" place="right">
                <el-input v-model="form.bizEntityJson.otherMatters" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
        </el-row>
        <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {bizEntityJson: {}}, // 本地form声明，不需要复制到模板内容配置
                // form: data, // 线上form声明，需要复制到模板内容配置
                userInfo: {},
                processCode: null,
                showSearchOrg: false
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
            this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
            this.processCode = this.$store.state.menuTreeItem.processCode;
            if (!this.$route.query.id) {
                this.$set(this.form.bizEntityJson, 'compileDate', null);
                this.$set(this.form.bizEntityJson, 'type1', 'false');
                this.$set(this.form.bizEntityJson, 'type2', 'false');
                this.$set(this.form.bizEntityJson, 'type3', 'false');
                this.$set(this.form.bizEntityJson, 'type4', 'false');
                this.$set(this.form.bizEntityJson, 'centerName', null);
                this.$set(this.form.bizEntityJson, 'centerCd', null);
                this.$set(this.form.bizEntityJson, 'financingSubject', null);
                this.$set(this.form.bizEntityJson, 'lender', null);
                this.$set(this.form.bizEntityJson, 'lineOfCredit', null);
                this.$set(this.form.bizEntityJson, 'loanApproval', null);
                this.$set(this.form.bizEntityJson, 'loanTerm', null);
                this.$set(this.form.bizEntityJson, 'isReport1', 'false');
                this.$set(this.form.bizEntityJson, 'isReport2', 'false');
                this.$set(this.form.bizEntityJson, 'financingType1', 'false');
                this.$set(this.form.bizEntityJson, 'financingType2', 'false');
                this.$set(this.form.bizEntityJson, 'financingType3', 'false');
                this.$set(this.form.bizEntityJson, 'financingType4', 'false');
                this.$set(this.form.bizEntityJson, 'financingType5', 'false');
                this.$set(this.form.bizEntityJson, 'financingType6', 'false');
                this.$set(this.form.bizEntityJson, 'financingType7', 'false');
                this.$set(this.form.bizEntityJson, 'financingType8', 'false');
                this.$set(this.form.bizEntityJson, 'guaranteeWay1', 'false');
                this.$set(this.form.bizEntityJson, 'guaranteeWay2', 'false');
                this.$set(this.form.bizEntityJson, 'guaranteeWay3', 'false');
                this.$set(this.form.bizEntityJson, 'guaranteeWay4', 'false');
                this.$set(this.form.bizEntityJson, 'undsRatio', null);
                this.$set(this.form.bizEntityJson, 'mortgagedProperty', null);
                this.$set(this.form.bizEntityJson, 'mortgagedRate', null);
                this.$set(this.form.bizEntityJson, 'mortgagedDesc', null);
                this.$set(this.form.bizEntityJson, 'warrantyDescription', null);
                this.$set(this.form.bizEntityJson, 'comprehensiveCost', null);
                this.$set(this.form.bizEntityJson, 'consultingFee', null);
                this.$set(this.form.bizEntityJson, 'interestPayment1', 'false');
                this.$set(this.form.bizEntityJson, 'interestPayment2', 'false');
                this.$set(this.form.bizEntityJson, 'interestPayment3', 'false');
                this.$set(this.form.bizEntityJson, 'interestPayment4', 'false');
                this.$set(this.form.bizEntityJson, 'consultingPayment', null);
                this.$set(this.form.bizEntityJson, 'drawingStyle1', 'false');
                this.$set(this.form.bizEntityJson, 'drawingStyle2', 'false');
                this.$set(this.form.bizEntityJson, 'drawingStyle3', 'false');
                this.$set(this.form.bizEntityJson, 'drawdownConditions', null);
                this.$set(this.form.bizEntityJson, 'finalDueDate', null);
                this.$set(this.form.bizEntityJson, 'earlyRepaymentConditions1', 'false');
                this.$set(this.form.bizEntityJson, 'earlyRepaymentConditions2', 'false');
                this.$set(this.form.bizEntityJson, 'earlyRepaymentConditions3', 'false');
                this.$set(this.form.bizEntityJson, 'repaymentMethod1', 'false');
                this.$set(this.form.bizEntityJson, 'repaymentMethod2', 'false');
                this.$set(this.form.bizEntityJson, 'repaymentMethod3', 'false');
                this.$set(this.form.bizEntityJson, 'earlyRepaymentRatio', null);
                this.$set(this.form.bizEntityJson, 'creditCompletionDate', null);
                this.$set(this.form.bizEntityJson, 'approveCompleteDate', null);
                this.$set(this.form.bizEntityJson, 'otherMatters', null);
            }
        },
        methods: {
            closeSearhOrg(val) {
                if (val) {
                    this.form.bizEntityJson.centerName = val.text;
                    this.form.bizEntityJson.centerCd = val.id;
                }
                this.showSearchOrg = false
            },
            show() {
                console.log(this.form.bizEntityJson);
            }
        }
    }
</script>