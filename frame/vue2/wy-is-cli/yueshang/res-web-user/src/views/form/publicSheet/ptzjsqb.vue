<template>
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row :gutter="24">
            <el-col :span="24" class="topRight-col">
                <div class="d-min">
                    <span>申请项目</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>申请单位</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.applyUnitType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyUnitType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>开户行账户信息</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.accountBank, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.accountBank" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>资金用途</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.useOfFunds, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.useOfFunds" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>列支科目</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.listedSubjects, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.listedSubjects" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>资金数额(元)</span>
                    <el-input v-if="this.$route.query.id && form.status != '草稿'" :value="(parseFloat(form.bizEntityJson.fundsAmount).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
                    <el-input v-else :class="{'novalue': !form.bizEntityJson.fundsAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fundsAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>

            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>用款时间</span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.timeSpentDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.timeSpentDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span class="span-auto">申请事由</span>
                    <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.applyReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyReason" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
                </div>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span class="span-auto">调拨路径描述</span>
                    <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.allocationPathDescription, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.allocationPathDescription" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
                </div>
            </el-col>
            <el-col :span="24" class="right-col" v-if="form.bizEntityJson.disabled && $route.query.id">
                <div class="d-min">
                    <span class="span-auto">调拨路径描述</span>
                    <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.allocationPathDescription1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.allocationPathDescription1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
                </div>
            </el-col>
        </el-row>
        <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
    </div>
</template>

<script>
    export default {
        data: function() {
            return{
                form: {},
                disabled: true,
                showSearchOrg: false
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
        },
        created() {
        },
        mounted() {

            if(this.form.bizEntityJson.allocationPathDescription1!=""||this.form.bizEntityJson.allocationPathDescription1!=null){
                this.$set(this.form.bizEntityJson, 'allocationPathDescription1',this.form.bizEntityJson.allocationPathDescription);
            }

        },
        methods: {
            closeSearhOrg(val) {
                if (val) {
                    this.form.bizEntityJson.centerOrgName = val.text
                    this.form.bizEntityJson.centerOrgCd = val.id
                }
                this.showSearchOrg = false
            },
            // 必填判断
            validate() {
                if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请选择申请项目'), false
                if(!this.form.bizEntityJson.applyUnitType) return this.$message.error('请输入申请单位'), false
                if(!this.form.bizEntityJson.accountBank) return this.$message.error('请输入开户行账户信息'), false
                if(!this.form.bizEntityJson.useOfFunds) return this.$message.error('请输入资金用途'), false
                if(!this.form.bizEntityJson.listedSubjects) return this.$message.error('请输入列支科目'), false
                if(!this.form.bizEntityJson.fundsAmount) return this.$message.error('请输入资金数额'), false
                if(!this.form.bizEntityJson.timeSpentDate) return this.$message.error('请输入用款时间'), false
            },
            async yykCheck() {
                if(this.form.bizEntityJson.allocationPathDescription!=null){
                    this.$set(this.form.bizEntityJson, 'allocationPathDescription1',this.form.bizEntityJson.allocationPathDescription);
                }
            }
        }
    }
</script>

<style scoped>

</style>