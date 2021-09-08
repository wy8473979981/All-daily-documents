<template>
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row :gutter="24" class="top-row right-col">
            <dl-col class="right-col" :span="24" :novalue="form.bizEntityJson.positionLevel1 != 'true' && form.bizEntityJson.positionLevel2 != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'总经理',name:'positionLevel1'},
                            {label:'其他人员',name:'positionLevel2'}
                          ]"
                />
            </dl-col>
        </el-row>
        <el-row :gutter="24" class="right-col">
            <el-col :span="12" >
                <div class="d-min">
                    <span>申请人</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.applyer, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyer" @focus="showSearchUser1 = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>

            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>申请中心负责人</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.applyCenter}" v-model="form.bizEntityJson.applyCenter" @focus="showSearchUser2 = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <!--<el-col :span="12">
                <div class="d-min">
                    <span>费用承担部门</span>
                    <el-input class="right-col" :class="{'required': !form.bizEntityJson.disabled}" :value="form.bizEntityJson.receiveParentUint + '-' + form.bizEntityJson.receiveUint" @focus="showSearchOrg1 = true" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                   <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="findMoreBudgetUsedDetail">查询实时预算</span></p>
                </div>
            </el-col>-->

            <el-col :span="12" class="right">
                <div class="d-min">
                    <span>费用承担部门</span>
                    <el-input v-model="form.bizEntityJson.fullPath"
                              class="right-col"
                              :class="{novalue: !form.bizEntityJson.fullPath, required: !form.bizEntityJson.disabled}"
                              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                              readonly
                              clearable
                              @focus="showSearchOrg1 = true"></el-input>
                        <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" style="color: #0f96ff" @click="findMoreBudgetUsedDetail">查询实时预算</span></p>
                </div>
            </el-col>

            <el-col :span="8" v-if="showRatio" class="right">
                <div class="d-min">
                    <span>包干比例</span>
                    <el-input v-model="form.bizEntityJson.ratio" readonly :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>招待对象</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.receiveTarget, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveTarget" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>

            <dl-col class="right-col" :span="24" title="招待项目" :novalue="form.bizEntityJson.receiveItem1!='true' && form.bizEntityJson.receiveItem2!='true' && form.bizEntityJson.receiveItem8!='true' && form.bizEntityJson.receiveItem4 !='true' && form.bizEntityJson.receiveItem6!='true'">
                <el-checkbox v-model="form.bizEntityJson.receiveItem1" true-label="true" false-label="false" @change="sumPrice">住宿</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.receiveItem2" true-label="true" false-label="false" @change="sumPrice">用餐</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.receiveItem8" true-label="true" false-label="false" @change="sumPrice">礼品</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.receiveItem4" true-label="true" false-label="false" @change="sumPrice">娱乐</el-checkbox>
                <el-checkbox v-model="form.bizEntityJson.receiveItem6" true-label="true" false-label="false" @change="sumPrice">美术馆专项费用报销</el-checkbox>
            </dl-col>

            <el-col :span="24" class="right-col">
                <div class="d-min">
                    <span>是否公司月结</span>
                    <el-checkbox v-model="form.bizEntityJson.agreement" true-label="true" false-label="false">公司月结</el-checkbox>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="margin-row top-row right-col" v-if="form.bizEntityJson.receiveItem1=='true'">
            <el-col :span="6">
                <div class="d-min">
                    <span>住宿日期</span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.comeDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.comeDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>
            <dl-col :span="6" :novalue="form.bizEntityJson.singleRoom != 'true' && form.bizEntityJson.doubleRoom != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'单人',name:'singleRoom'},
                            {label:'双人',name:'doubleRoom'}
                          ]"
                />
            </dl-col>
            <el-col :span="6" style="min-height: 36px;">
                <div style="min-height: 36px;">
                    <span style="display: flex;min-height: 36px;padding-left: 6px;">
                        <span style="min-width: 36px;margin-top: 10px;">住（</span>
                        <span>
                            <el-input v-limit-number="0" :class="{'novalue': !form.bizEntityJson.stayDays, 'required': !form.bizEntityJson.disabled}" style="margin-top: 3px" v-model="form.bizEntityJson.stayDays" @blur="sumPrice()"></el-input>
                        </span>
                        <span style="min-width: 36px;margin-top: 10px;padding-left: 10px">）天</span>
                    </span>
                </div>
            </el-col>

            <el-col :span="6" class="right-col" style="min-height: 36px;">
                <div style="min-height: 36px;">
                    <span style="display: flex;min-height: 36px;padding-left: 10px;">
                        <span style="min-width: 36px;margin-top: 10px;">共（</span>
                        <span >
                            <el-input v-limit-number="0" :class="{'novalue': !form.bizEntityJson.rooms, 'required': !form.bizEntityJson.disabled}"  style="margin-top: 3px" v-model="form.bizEntityJson.rooms" @blur="sumPrice()"></el-input>
                        </span>
                        <span style="min-width: 50px;margin-top: 10px;padding-left: 6px;">）间房</span>
                    </span>
                </div>
            </el-col>
            <dl-col class="right-col" :span="24" :novalue="form.bizEntityJson.hotel_other != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'其他',name:'hotel_other'}
                          ]"
                />
            </dl-col>

            <el-col :span="12">
                <div class="d-min">
                    <span>酒店名称</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.hotel_ohter_name, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hotel_ohter_name" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>房型</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.hotel_ohter_fx, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hotel_ohter_fx" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="d-min">
                    <span>单价</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.hotel_ohter_zsjg, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.hotel_ohter_zsjg" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="sumPrice()"></el-input>
                </div>
            </el-col>
            <el-col :span="12"  class="right-col">
                <div class="d-min">

                    <el-input  readonly></el-input>
                </div>
            </el-col>
            <dl-col :span="24" class="right-col">
                <el-input style="font-size: 8px" v-model="form.bizEntityJson.hotel_ohter_remark" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">注：</el-input>
            </dl-col>


            <dl-col :span="24" class="right-col">
                <el-input style="font-size: 8px" v-model="form.bizEntityJson.hotel_backup_remark" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" >
                </el-input>
            </dl-col>
        </el-row>

        <el-row :gutter="24" class="margin-row top-row" v-if="form.bizEntityJson.receiveItem2=='true'">
            <!--<tr class="tbg">
                <td colspan="7" align="center"><span >用 餐 （餐标：<span id="mealStandard_span">200</span>元/人以内）</span>
                    <input type="hidden" value="${templateBean.confirmStandard}"  id="receiveItem2_amt" name="templateBean.confirmStandard" style="width:80px;" validate="required"   onblur="formatVal($(this));" class="inputBorder required amt" />
                </td>
            </tr>-->
            <el-col :span="24" class="title-col right-col">
                <h2 :v-model="form.bizEntityJson.confirmStandard" align="center">用 餐 （餐标：
                    <span v-if="form.bizEntityJson.isWork != 'true' && form.bizEntityJson.isOut != 'true'">200</span>
                    <span v-if="form.bizEntityJson.isWork == 'true'"><span>50</span></span>
                    <span v-if="form.bizEntityJson.isOut == 'true'"><span>200</span></span>元/人以内）</h2>
            </el-col>

            <dl-col :span="12" :novalue="form.bizEntityJson.lunch != 'true' && form.bizEntityJson.dinner != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'午餐',name:'lunch'},
                            {label:'晚餐',name:'dinner'}
                          ]"
                />
            </dl-col>
            <el-col :span="6">
                <div class="d-min" v-if="form.bizEntityJson.lunch == 'true'">
                    <span>用餐日期</span>
                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.lunchDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.lunchDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
                <div class="d-min" v-else>
                    <span>用餐日期</span>
                    <el-date-picker
                            v-model="form.bizEntityJson.lunchDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>

            <el-col :span="6" class="right-col">
                <div class="d-min" v-if="form.bizEntityJson.dinner == 'true'">
                    <span>用餐日期</span>

                    <el-date-picker
                            :class="{'novalue': !form.bizEntityJson.dinnerDate, 'required': !form.bizEntityJson.disabled}"
                            v-model="form.bizEntityJson.dinnerDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
                <div class="d-min" v-else>
                    <span>用餐日期</span>
                    <el-date-picker
                            v-model="form.bizEntityJson.dinnerDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                            :disabled="form.bizEntityJson.disabled">
                    </el-date-picker>
                </div>
            </el-col>

            <dl-col :span="12" :novalue="form.bizEntityJson.isWork != 'true' && form.bizEntityJson.isOut != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="sumPrice()"
                        :nameList="[{label:'工作餐',name:'isWork'},
                            {label:'外部聚餐',name:'isOut'}
                          ]"
                />
            </dl-col>

            <el-col :span="12" class="right-col">
                <div class="d-min" >
                    <span>用餐人数</span>
                    <el-input v-limit-number="0" :class="{'novalue': !form.bizEntityJson.eatNum, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.eatNum" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="sumPrice()"></el-input>
                </div>
            </el-col>
            <el-col hidden :span="12">
                <div class="d-min" >
                    <span>餐厅名称</span>
                    <el-input></el-input>
                </div>
            </el-col>
            <dl-col :span="12" :novalue="form.bizEntityJson.restaurantOther != 'true'">
                <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[{label:'其他',name:'restaurantOther'}
                          ]"
                />
            </dl-col>

            <el-col :span="12" class="right-col">
                <div class="d-min" v-if="form.bizEntityJson.restaurantOther == 'true'">
                    <span>菜系类别</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.restaurantOtherCx, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.restaurantOtherCx" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
                <div class="d-min" v-else>
                    <span>菜系类别</span>
                    <el-input v-model="form.bizEntityJson.restaurantOtherCx" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="d-min" v-if="form.bizEntityJson.restaurantOther == 'true'">
                    <span>人均消费</span>
                    <el-input :class="{'novalue': !form.bizEntityJson.restaurantOtherJg, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.restaurantOtherJg" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
                <div class="d-min" v-else>
                    <span>人均消费</span>
                    <el-input v-model="form.bizEntityJson.restaurantOtherJg" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min" >
                    <el-input readonly></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="margin-row top-row right-col" v-if="form.bizEntityJson.receiveItem8=='true'">
            <el-col :span="24" class="title-col right-col">
                <h2 align="center">礼品</h2>
            </el-col>
            <el-col :span="24" place="table right">
                <el-table ref="table" :data="form.bizEntityJson.giftUnits" size="mini" border stripe header-row-class-name="table-header">
                    <el-table-column label="品类" prop="feeName">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.giftType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
                                <el-option label="" value=""></el-option>
                                <el-option label="烟酒" value="1">烟酒</el-option>
                                <el-option label="礼品卡" value="2">礼品卡</el-option>
                                <el-option label="节日礼盒" value="3">节日礼盒</el-option>
                                <el-option label="茶叶/茶具" value="4">茶叶/茶具</el-option>
                                <el-option label="其他" value="5">其他</el-option>
                            </el-select>
                        </template>
                        <!--<template slot-scope="scope">
                            <el-input :class="{'novalue': !scope.row.feeName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.feeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                        </template>-->
                    </el-table-column>
                    <!-- 打印时隐藏该列 -->
                    <el-table-column label="名称" prop="giftName" class-name="no-print">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.giftName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" prop="giftPrice">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.giftPrice" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="sumPrice()"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" prop="giftNum">
                        <template slot-scope="scope">
                            <el-input v-limit-number="0" v-model="scope.row.giftNum" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="sumPrice()"/>
                        </template>
                    </el-table-column>


                    <el-table-column label="操作" width="200" v-if="!$route.query.id">
                        <template slot-scope="scope">
                            <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="24" style="text-align: center" class="right-col">
                <el-button @click="addList" type="text" size="mini">新增</el-button>
            </el-col>
            <el-col hidden :span="12" class="right-col">
                <div class="d-min">
                    <span>礼品合计</span>
                    <el-input  readonly v-model="form.bizEntityJson.lpTotalAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="margin-row top-row right-col" v-if="form.bizEntityJson.receiveItem4=='true'">
            <el-col :span="24" class="title-col right-col">
                <h2 :v-model="form.bizEntityJson.ylAmt" align="center">娱 乐&nbsp;&nbsp;&nbsp; （标准：1500元/8人以内）</h2>
            </el-col>
        </el-row>

        <el-row :gutter="24" class="margin-row top-row right-col" v-if="form.bizEntityJson.receiveItem6=='true'">
            <el-col :span="24" class="title-col right-col">
                <h2 align="center">美术馆专项费用报销</h2>
            </el-col>
            <el-col :span="24">
                <div class="d-min">
                    <span>美术馆门票</span>

                    <div style="display: flex; width: calc(100% - 160px);">
                        <div class="d-min right-col" style="width: 50%;">
                            <span align="right" class="span-auto-inline" style="width: 50%;">单价（元）</span>
                            <el-input :class="{'novalue': !form.bizEntityJson.unitPrice1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.unitPrice1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="totalMoney(),sumPrice()"></el-input>
                        </div>
                        <div class="d-min right-col" style="width: 50%;">
                            <span align="right" class="span-auto-inline" style="width: 50%;">人数</span>
                            <el-input :class="{'novalue': !form.bizEntityJson.numberPeople1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.numberPeople1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="totalMoney(),sumPrice()"></el-input>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="d-min">
                    <span>美术馆导览</span>
                    <div style="display: flex; width: calc(100% - 160px);">
                        <div class="d-min right-col" style="width: 50%;">
                            <span align="right" class="span-auto-inline" style="width: 50%;">单价（元）</span>
                            <el-input v-model="form.bizEntityJson.unitPrice2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="totalMoney(),sumPrice()"></el-input>
                        </div>
                        <div class="d-min right-col" style="width: 50%;">
                            <span align="right" class="span-auto-inline" style="width: 50%;">人数</span>
                            <el-input v-model="form.bizEntityJson.numberPeople2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" @blur="totalMoney(),sumPrice()"></el-input>
                        </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="d-min right-col">
                    <span>费用合计（元）</span>
                    <el-input readonly v-model="form.bizEntityJson.sumMoney" :placeholder="form.bizEntityJson.disabled ? '' : ''"></el-input>
                </div>
            </el-col>
        </el-row>


        <el-row :gutter="24" class="margin-row top-row right-col">
            <el-col :span="12">
                <div class="d-min">
                    <span>合计</span>
                    <el-input readonly :class="{'novalue': !form.bizEntityJson.tatolSum, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.tatolSum" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
            <el-col :span="12" class="right-col">
                <div class="d-min">
                    <span>科目名称</span>
                    <el-input  readonly :class="{'novalue': !form.bizEntityJson.subjectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
                </div>
            </el-col>
        </el-row>

        <search-org :open="showSearchOrg1 && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg1"></search-org>
        <search-user :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
        <search-user :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form: {},
                showRatio : false,
                disabled: true,
                showSearchOrg1: false,
                showSearchUser1:false,
                showSearchUser2:false,
                giftUnits:[],
                userInfo: {},
                receiveUintCd: "",
                receiveUint: "",
                receiveParentUint: "",
                fullPath: ""

            }
        },
        props: ['data'],
        computed: {
            tatolSum() {
                // debugger
                if (this.form.bizEntityJson.giftUnits === undefined) return
                let sum = 0
                if (sum === NaN) sum = 0
                if (this.form.bizEntityJson.giftUnits.length > 0) {
                    console.log(this.form.bizEntityJson.giftUnits)
                    this.form.bizEntityJson.giftUnits.forEach(item => {
                        sum += ((item.giftPrice ? Number(item.giftPrice):0) * (item.giftNum ? Number(item.giftNum):0))
                    })
                }
                return sum
            },
        },
        watch: {
            data: {
                immediate: true,
                handler: function(val) {
                    console.log(val)
                    this.form = val;
                }
            },
            tatolSum(val) {
                // debugger
                this.$set(this.form.bizEntityJson, 'lpTotalAmt',val.toFixed(2))
            },
        },
        mounted() {
            this.addList()
        },
        created() {
            if (!this.$route.query.id) {
                this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
                this.$set(this.form.bizEntityJson, 'receiveParentUint', this.userInfo.centerOrgName)
                this.$set(this.form.bizEntityJson, 'receiveUint', this.userInfo.orgName)
                this.$set(this.form.bizEntityJson, 'receiveUintCd', this.userInfo.orgCd)
                this.$set(this.form.bizEntityJson, 'applyer', this.userInfo.username)
                this.$set(this.form.bizEntityJson, 'subjectName', '招待费')
                this.$set(this.form.bizEntityJson, 'hotel_ohter_remark', '注：')
                this.$set(this.form.bizEntityJson, 'hotel_backup_remark', '可以选定酒店：华住集团旗下所有酒店（禧悦酒店、漫心度假酒店、全季酒店、星程酒店、汉庭、怡莱酒店、海友酒店）公司：上海宝龙实业发展有限公司， 会员卡号：101093600，密码：101093600，房费需自付，员工自行前往官网，（www.huazhu.com）登陆预订，总部不协助预订(所有房型（含早）门市价85折)。推荐酒店：全季酒店（上海虹桥机场店）地址：上海市闵行区航中路139号 ，距离公司1.3公里，电话：021-64021258；全季酒店（上海虹桥机场沪青平公路店）  地址：上海市闵行区航新路612号，距离公司2.8公里，电话：021-64785558')
                this.$set(this.form.bizEntityJson, "fullPath", this.form.bizEntityJson.receiveParentUint + "-" + this.form.bizEntityJson.receiveUint);
                this.$set(this.form.bizEntityJson, 'tatolSum','0.00');
                // table建立数组
                this.$set(this.form.bizEntityJson, 'giftUnits', [])

            }
            const param = [{
                orgCd:this.form.bizEntityJson.receiveUintCd,
                subjectName:this.form.bizEntityJson.subjectName
            }]
            this.getSubjectCdByOrgCd(param)
        },
        methods: {
            //费用合计
            totalMoney(){
                var sumMoney1=0;
                var sumMoney2=0;
                if(this.form.bizEntityJson.unitPrice1=="" || this.form.bizEntityJson.unitPrice1==null){
                    this.$set(this.form.bizEntityJson, 'sumMoney', "");
                    return;
                }
                if(this.form.bizEntityJson.numberPeople1=="" || this.form.bizEntityJson.numberPeople1==null){
                    this.$set(this.form.bizEntityJson, 'sumMoney', "");
                    return;
                }
                 sumMoney1 = this.form.bizEntityJson.unitPrice1 * this.form.bizEntityJson.numberPeople1;
                 sumMoney2 = this.form.bizEntityJson.unitPrice2 * this.form.bizEntityJson.numberPeople2;

                if(isNaN(sumMoney1)){
                    sumMoney1=0;
                }

                if(isNaN(sumMoney2)){
                    sumMoney2=0;
                }
                var sumMoney=sumMoney1+sumMoney2;
                this.$set(this.form.bizEntityJson, 'sumMoney', sumMoney);
            },

            //总计
            sumPrice(){
                var tmpTotal = 0;
                //住宿
                if(this.form.bizEntityJson.receiveItem1=='true'){
                    if(this.form.bizEntityJson.stayDays!="" && this.form.bizEntityJson.stayDays!=null && this.form.bizEntityJson.rooms !="" && this.form.bizEntityJson.rooms!=null && this.form.bizEntityJson.hotel_ohter_zsjg !="" && this.form.bizEntityJson.hotel_ohter_zsjg !=null){
                        tmpTotal=tmpTotal +this.form.bizEntityJson.stayDays * this.form.bizEntityJson.rooms *this.form.bizEntityJson.hotel_ohter_zsjg;
                    }
                }
                //用餐
                if(this.form.bizEntityJson.receiveItem2=='true'){
                    if(this.form.bizEntityJson.isWork=='true' && (this.form.bizEntityJson.eatNum!="" && this.form.bizEntityJson.eatNum!=null)){
                        tmpTotal=tmpTotal + this.form.bizEntityJson.eatNum * 50;
                    }
                    if(this.form.bizEntityJson.isOut=='true' && (this.form.bizEntityJson.eatNum!="" && this.form.bizEntityJson.eatNum!=null)){
                        tmpTotal=tmpTotal + this.form.bizEntityJson.eatNum * 200;
                    }
                }
                //礼品
                if(this.form.bizEntityJson.receiveItem8=='true'){
                    if(this.form.bizEntityJson.lpTotalAmt<=0){
                        this.$set(this.form.bizEntityJson, 'lpTotalAmt', 0);
                    }
                    tmpTotal=tmpTotal + Number(this.form.bizEntityJson.lpTotalAmt);
                }
                //娱乐
                if(this.form.bizEntityJson.receiveItem4=='true'){
                    tmpTotal=tmpTotal +1500;
                }
                //美术馆
                if(this.form.bizEntityJson.receiveItem6=='true'){
                    if(!this.form.bizEntityJson.sumMoney){
                        this.$set(this.form.bizEntityJson, 'sumMoney', 0);
                    }
                    tmpTotal=tmpTotal + this.form.bizEntityJson.sumMoney;
                }
                this.$set(this.form.bizEntityJson, 'tatolSum',tmpTotal.toFixed(2));
            },
            //实时预算查询
            async findMoreBudgetUsedDetail(){
                //先校验
                if(this.form.bizEntityJson.fullPath===''){
                    this.$message.error('请先选择费用承担部门!')
                    return false
                }
                // 查科目并判断
                const param = [{
                    orgCd:this.form.bizEntityJson.receiveUintCd,
                    subjectName:this.form.bizEntityJson.subjectName
                }]
                await this.getSubjectCdByOrgCd(param)
                if(this.form.bizEntityJson.subjectId===''){
                    this.$message.error('请先选择科目!')
                    return false
                }
                //最后查预算
                let billAmount = 0
                billAmount = this.form.bizEntityJson.tatolSum
                let budgetParamList = []
                budgetParamList.push({
                    orgCd: this.form.bizEntityJson.receiveUintCd,
                    billAmount:billAmount,
                    subjectName: "招待费",
                    subjectId:this.form.bizEntityJson.subjectId
                })
                await this.$approval.findMoreBudgetUsedDetail(budgetParamList).then(res => {
                    if(res.code == 1 && res.data) {
                        this.$alert(res.data.massage, {confirmButtonText: '确定'})
                    }
                })
            },


            // 根据费用承担部门以及科目名称查询科目cd
            async getSubjectCdByOrgCd(param){
                var resultList=[]
               await this.$approval.getSubjectCdByOrgCd(param).then(res => {
                    if(res.code == 1 && res.data) {
                        res.data.forEach(item => {
                            resultList.push(item)
                        })
                        this.$set(this.form.bizEntityJson,'subjectId',resultList[0])
                            // 包干比例查询
                            const ratioParam = {
                                orgCd:this.form.bizEntityJson.receiveUintCd,
                                subjectId:this.form.bizEntityJson.subjectId
                            }
                            this.subjectRatio(ratioParam)

                    }else {
                        this.$message.error('没有相应的科目，请重试')
                    }
                })
            },
            // 包干比例查询
            subjectRatio(ratioParam) {
                this.$approval.findBGBL(ratioParam).then(res => {
                    if(res.code == 1 && res.data) {
                        this.$set(this.form.bizEntityJson, 'ratio', res.data)
                        this.$set(this.form.bizEntityJson, 'ratioType','on')
                        this.showRatio=true
                    }else{
                        this.$set(this.form.bizEntityJson, 'ratio', '')
                        this.$set(this.form.bizEntityJson, 'ratioType','')
                        this.showRatio=false
                    }
                })
            },
            // 添加table行数据
            addList() {
                console.log("1234567890")
                let newData = {
                    giftType: '',
                    giftName: '',
                    giftPrice: '',
                    giftNum: '',
                }
                this.form.bizEntityJson.giftUnits.push(newData)

            },
            remove(index) {
                if (this.form.bizEntityJson.giftUnits.length > 0) {
                    this.form.bizEntityJson.giftUnits.splice(index, 1)
                }
            },
            closeSearhOrg1(val) {

                if (val) {
                    this.$approval.getCenterParent({ orgCd: val.id }).then((res) => {
                        if (res.code == 1 && res.data) {
                            this.$set(this.form.bizEntityJson, "fullPath", res.data);
                        } else {
                            this.$set(this.form.bizEntityJson, "fullPath", val.text);
                        }
                    });
                    this.$set(this.form.bizEntityJson, "receiveUintCd", val.id);
                    this.$set(this.form.bizEntityJson, "receiveUint", val.text);
                    const param = [{
                        orgCd:this.form.bizEntityJson.receiveUintCd,
                        subjectName:this.form.bizEntityJson.subjectName
                    }]
                    this.getSubjectCdByOrgCd(param)
                }
                this.showSearchOrg1 = false;

            },
            closeSearhUser1(val) {
                if (val) {
                    this.form.bizEntityJson.applyer = val.userName
                    this.form.bizEntityJson.applyerCd = val.userCd
                }
                this.showSearchUser1 = false
            },
            closeSearhUser2(val) {
                if (val) {
                    this.form.bizEntityJson.applyCenter = val.userName
                    this.form.bizEntityJson.applyCenterCd = val.userCd
                }
                this.showSearchUser2 = false
            },
            // 页面发起时校验
            async yykCheck() {
                var checkDept = true;//部门级别验证
                const param1 = {
                    orgCd:this.form.bizEntityJson.receiveUintCd
                }
                let result = await this.$approval.getTypeByOrgCd(param1)
                if (result.data.orgTypeCd != "1" && (result.data.orgName != '直销公司' && result.data.orgName != "创想实验室")) {
                    this.$message.error("请选择部门级机构");
                    checkDept = false;
                    return false;
                }
                if (!checkDept) {
                    return false;//机构不为部门级则无法发起
                }
                //是否为主数据
                var isMainData = false;
                let result1 = await this.$approval.checkOrgCdSapInfoHide(param1)
                if (result1  == "false") {
                    isMainData = false;
                } else {
                    isMainData = true;
                }
                if (isMainData) {
                    if(this.form.bizEntityJson.subjectId==""||this.form.bizEntityJson.subjectId==null){
                        this.$message.error("没有对应的科目");
                        return false;
                    }
                    var costsBearDeptId = this.form.bizEntityJson.receiveUintCd;
                    if (costsBearDeptId != '168' && costsBearDeptId != '2045') {
                        var amount = Number(this.form.bizEntityJson.totalSum).text().replace(/,/g, '');
                        //增加包干比例
                        var ratio = this.form.bizEntityJson.ratio;
                        if(ratio!=null&&ratio!=""){
                            amount = amount * (Number(ratio)/100);
                        }
                        //查预算
                        let billAmount = amount
                        let budgetParamList = []
                        budgetParamList.push({
                            orgCd: this.form.bizEntityJson.receiveUintCd,
                            billAmount:billAmount,
                            subjectName: "招待费",
                            subjectId:this.form.bizEntityJson.subjectId
                        })
                        await this.$approval.findMoreBudgetUsedDetail(budgetParamList).then(res => {
                            if(res.code == 1 && res.data) {
                                this.$alert(res.data.massage, {confirmButtonText: '确定'})
                            }else{
                                this.$message.error("预算不足");
                            }
                        })
                    }
                }
                //校验超过一个自然月
                if(this.form.bizEntityJson.receiveItem1=='true' || this.form.bizEntityJson.receiveItem2=='true'){
                    var comeDate="";
                    if(this.form.bizEntityJson.receiveItem1=='true'){
                        comeDate=this.form.bizEntityJson.comeDate;
                    }
                    var lunchDate="";
                    if(this.form.bizEntityJson.receiveItem2=='true'){
                        if(this.form.bizEntityJson.lunch=='true'){
                            lunchDate=this.form.bizEntityJson.lunchDate;
                        }
                        if(this.form.bizEntityJson.dinner=='true'){
                            lunchDate=this.form.bizEntityJson.dinnerDate;
                        }
                    }
                    var startDate=(comeDate==""?"":comeDate+",")+lunchDate;
                    //是否公司月结
                    var type="";
                    if(this.form.bizEntityJson.agreement=='true'){
                        type="2";
                    }else{
                        type="1";
                    }
                    const param3 = {
                        startDate: startDate,
                        type: type,
                    }
                    let resultInfo = await this.$approval.isOverdueMonth(param3)
                    if("1"==resultInfo){
                        this.$message.error("按行政制度，自发生日起必须"+(type=="1"?"一":"两")+"个自然月内完成报销。已超过时限！");
                        return false;
                    }
                }
            },
            // 必填判断
            validate() {
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    @import './publicSheet.scss';
</style>