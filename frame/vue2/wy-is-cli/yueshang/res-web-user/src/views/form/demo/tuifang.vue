//退房
<template>
    <!-- 全部组件整理，需要复制到后台模板配置  start -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row :gutter="24">
            <el-col :span="12" class="right-col topRight-col">
                <div class="d-min d-checkbox">
                    <span>是否满足</span>
                    <div class="d-red" :class="{'novalue': form.bizEntityJson.backRoom != 'true' && form.bizEntityJson.nobackRoom != 'true', 'required': !form.bizEntityJson.disabled}">
                        <d-radio-group
                                v-model="form.bizEntityJson"
                                :nameList="[
                          {label:'推盘量1%以内',name:'backRoom'},
                          {label:'推盘量1%以外',name:'nobackRoom'}
                        ]"
                        />
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="right-col topRight-col">
                <div class="d-min">
                    <span>项目名称</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.sendOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sendOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>业主名称</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.owerName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.owerName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>身份证/护照号</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.idno, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.idno" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>联系电话</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.phoneNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.phoneNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>通讯地址</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.address, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.address" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
        </el-row>
            <el-row class="padding-row">
            <el-col :span="24" class="title-col topRight-col">
                <h2>退房资料</h2>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>退购单元</span>
                    <div style="display: flex; width: calc(100% - 160px);">
                        <div class="d-min" style="width: 100%;">
                            <el-input :class="{'novalue': !form.bizEntityJson.buildName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.buildName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                            <span class="span-auto-inline">栋</span>
                        </div>
                        <div class="d-min" style="width: 100%;">
                            <el-input :class="{'novalue': !form.bizEntityJson.unitName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unitName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                            <span class="span-auto-inline">单元</span>
                        </div>
                        <div class="d-min" style="width: 100%;">
                            <el-input :class="{'novalue': !form.bizEntityJson.floorName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.floorName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                            <span class="span-auto-inline">层</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <el-input :class="{'novalue': !form.bizEntityJson.storeName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.storeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                    <span class="span-auto-inline">住宅/店面</span>
                </div>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span>建筑面积</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.buildSquare, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.buildSquare" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>原建筑单价(元)</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.oldConsUnitPrice, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.oldConsUnitPrice" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>新建筑单价(元)</span>
                    <el-input class="readonly" readonly></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>原总价(元)</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.oldTotalPrice, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.oldTotalPrice" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>新总价(元)</span>
                    <el-input class="readonly" readonly></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                  <span>
                    认购日期
                    <el-tooltip class="item" effect="dark" content="日期格式为2020-01-01" placement="top-start">
                      <i class="el-icon-warning"></i>
                    </el-tooltip>
                  </span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.substribeDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.substribeDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>调价比例(%)</span>
                    <el-input class="readonly" readonly></el-input>
                </div>
            </el-col>
            <el-col :span="24" class="title-col right-col">
                <h2>已付款项</h2>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                  <span>
                    日期
                    <el-tooltip class="item" effect="dark" content="日期格式为2020-01-01" placement="top-start">
                      <i class="el-icon-warning"></i>
                    </el-tooltip>
                  </span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.prePayDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.prePayDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>预订金(元)</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.prePayAmt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.prePayAmt" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                  <span>
                    日期
                    <el-tooltip class="item" effect="dark" content="日期格式为2020-01-01" placement="top-start">
                      <i class="el-icon-warning"></i>
                    </el-tooltip>
                  </span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.firstPayDate}"
                            v-model="form.bizEntityJson.firstPayDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>首付款(元)</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.firstPayAmt}" v-model="form.bizEntityJson.firstPayAmt" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                  <span>
                    日期
                    <el-tooltip class="item" effect="dark" content="日期格式为2020-01-01" placement="top-start">
                      <i class="el-icon-warning"></i>
                    </el-tooltip>
                  </span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.repayDate}"
                            v-model="form.bizEntityJson.repayDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>续款(元)</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.repayAmt}" v-model="form.bizEntityJson.repayAmt" v-filter-check-number :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            </el-row>
        <el-row class="padding-row">
            <el-col :span="24" class="topRight-col">
                <div class="d-min">
                    <span>物业现状</span>
                    <div class="d-red" :class="{'novalue': !form.bizEntityJson.selectReseBook, 'required': !form.bizEntityJson.disabled}">
                        <el-radio-group v-model="form.bizEntityJson.selectReseBook">
                            <el-radio label="1">预订书</el-radio>
                            <el-radio label="2">签定买卖合同</el-radio>
                            <el-radio label="3">办理按揭</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span class="span-auto">声明</span>
                    <div class="explain-p">
                        <p>本人申请上述房产的退购，并愿意支付以下费用：</p>
                        <p>原房屋成交总价违约金/手续费
                            <el-input :class="{'novalue': !form.bizEntityJson.dealTotalPenalty, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.dealTotalPenalty" style="width:90px;height:28px;border-bottom: 1px solid #ddd;"></el-input>
                            元。</p>
                      <p>业主签名：<el-input  v-model="form.bizEntityJson.owerSignName" style="width:200px;height:28px;margin: 5px; border-bottom: 1px solid #ddd;"></el-input></p>
                    </div>
                </div>
            </el-col>
            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span class="span-auto">备注</span>
                    <el-input v-model="form.bizEntityJson.contentDesc" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
        </el-row>

        <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg"></search-org>

    </div>
</template>

<script>
    export default {
        name: "tuifang",
        data() {
            return {
                form: {},
                showSearchOrg: false, // 中心、部门组件打开关闭状态
            }
        },
        /* 本地模板编译需要的数据回传，不需要上传到后台 start */
        props: ['data'],
        watch: {
            data: {
                immediate: true,
                handler: function(val) {
                    this.form = val
                }
            }
        },
        /* end */
        methods:{
            // 关闭中心组建回调
            closeSearhOrg(val) {
                if (val) {
                    this.form.bizEntityJson.sendOrgName = val.text
                    this.form.bizEntityJson.sendOrgCd = val.id
                }
                this.showSearchOrg = false
            },
            // 必填判断
            validate() {
                if(!this.form.bizEntityJson.backRoom) return this.$message.error('请选择满足条件'), false
                if(!this.form.bizEntityJson.projectName) return this.$message.error('请选择项目名称'), false
                if(!this.form.bizEntityJson.owerName) return this.$message.error('请输入业主名称'), false
                if(!this.form.bizEntityJson.idno) return this.$message.error('请输入身份证/护照号'), false
                if(!this.form.bizEntityJson.phoneNo) return this.$message.error('请输入联系电话'), false
                if(!this.form.bizEntityJson.address) return this.$message.error('请输入通讯地址'), false
                if(!this.form.bizEntityJson.buildName) return this.$message.error('请输入楼栋号'), false
                if(!this.form.bizEntityJson.floorName) return this.$message.error('请输入楼层'), false
                if(!this.form.bizEntityJson.storeName) return this.$message.error('请输入住宅/店面'), false
                if(!this.form.bizEntityJson.buildSquare) return this.$message.error('请输入建筑面积'), false
                if(!this.form.bizEntityJson.oldConsUnitPrice) return this.$message.error('请输入原建筑单价'), false
                if(!this.form.bizEntityJson.oldTotalPrice) return this.$message.error('请输入原总价'), false
                if(!this.form.bizEntityJson.substribeDate) return this.$message.error('请选择认购时间'), false
                if(!this.form.bizEntityJson.prePayDate) return this.$message.error('请选择已付款时间'), false
                if(!this.form.bizEntityJson.prePayAmt) return this.$message.error('请输入预定金'), false
                if(!this.form.bizEntityJson.selectReseBook) return this.$message.error('请选择物业现状'), false
                if(!this.form.bizEntityJson.dealTotalPenalty) return this.$message.error('请输入原房屋成交总价'), false
            }
        }
    }
</script>

/* 本地模板编译需要的css，不需要上传到后台 */
<style type="text/css" lang="scss">
    @import '../publicSheet/publicSheet.scss';
</style>