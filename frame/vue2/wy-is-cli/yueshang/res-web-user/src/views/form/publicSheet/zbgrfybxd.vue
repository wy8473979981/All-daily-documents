<template>
<!-- 总部个人费用报销单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row green-row">
      <el-col :span="24" class="red-box-fix">
        <div class="d-min">
          <span>类别</span>
          <div class="d-red right-col" :class="{'novalue': form.bizEntityJson.positionLevel1 != 'true' && form.bizEntityJson.positionLevel5 != 'true' && form.bizEntityJson.positionLevel3 != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group 
              v-model="form.bizEntityJson" 
              :nameList="[{label:'副总裁',name:'positionLevel1'},
                          {label:'中心负责人',name:'positionLevel5'},
                          {label:'其他人员',name:'positionLevel3'}]"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>
            报销/入账公司
            <el-tooltip class="item" effect="dark" content="入账公司可自行切换" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <el-select
            :class="{'novalue': !form.bizEntityJson.acctUnitName, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.acctUnitName"
            filterable
            remote
            clearable
            @change="acctUnitNameChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in acctUnitNameOptions"
              :key="item.companyCode"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input :class="{'required': !form.bizEntityJson.disabled}" :value="form.bizEntityJson.centerParentOrgName+ '-' + form.bizEntityJson.centerOrgName" readonly></el-input>
        </div>
      </el-col>
      <dl-col :span="12" >
          <el-checkbox v-model="form.bizEntityJson.leaveOffice" :true-label="'true'" :false-label="'false'" @change="checkboxIsLeave">离职/调岗</el-checkbox>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.leaveOffice == 'false'" :span="12" place="right" />
     
      <dl-col v-else :span="12" title="员工离岗交接单" place="right" :novalue="!form.bizEntityJson.leaveOfficeFile">
      <one-file :form="form" value="leaveOfficeFile" />
      </dl-col>
    </el-row>
    <el-row class="margin-row top-row blue-row">
      <el-col :span="24" class="title-col right-col">
        <h2>报销信息</h2>
      </el-col>
      <el-col :span="24" class="table-col right-col table-checkbox">
        <el-table ref="table" :data="form.bizEntityJson.billList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="年月" prop="preStartDate" align="center">
          </el-table-column>
          <el-table-column label="费用内容" align="center" prop="content">
            <template slot-scope="scope">
              <div class="show-print">
              <span v-if="scope.row.content == '车辆补贴'">车辆费用</span>
              <span v-else-if="scope.row.content == '住房补贴'">住房费用</span>
              <span v-else-if="scope.row.content == '电话费补贴'">电话费费用</span>
              <span v-else>{{scope.row.content}}</span>
              </div>
              <span class="no-print">{{scope.row.content}}</span>
            </template>  
          </el-table-column>
          <el-table-column label="说明" prop="memo" align="center">
          </el-table-column>

          <el-table-column label="金额(A)" prop="amountAmt" align="center">
            <template slot-scope="scope">
              <el-tooltip content="当月费用请在次月报销" placement="top" effect="light">
             <el-input v-if="$route.query.id && form.status != '草稿'" :value="(parseFloat(scope.row.amountAmt).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')">
             </el-input>
              <el-input v-else :class="{'novalue': !scope.row.amountAmt, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.amountAmt" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur"  @change="currentAmountAmtChange(scope.$index, $event)" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
              </el-input>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="税额(B)" prop="amountAmt2" align="center">
            <template slot-scope="scope">
              <el-input v-if="$route.query.id && form.status != '草稿'" :value="(parseFloat(scope.row.amountAmt2).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')">
              </el-input>
              <el-input v-else v-model="scope.row.amountAmt2" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @change="currentAmountAmt2Change(scope.$index, $event)" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'">
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="会计核减金额" prop="accReduce" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.accReduce" @change="accReduceChange(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.mapEdit.isAllInvoice" :yykReadonly="form.mapEdit.isAllInvoice ? true : false" :placeholder="form.mapEdit.isAllInvoice ? '请输入' : ''">
              </el-input>            
            </template>
          </el-table-column>
          <el-table-column label="会计核减税额" prop="accReduce2" align="center">
            <template slot-scope="scope">            
              <el-input v-model="scope.row.accReduce2" @change="accReduce2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.mapEdit.isAllInvoice" :yykReadonly="form.mapEdit.isAllInvoice ? true : false" :placeholder="form.mapEdit.isAllInvoice ? '请输入' : ''">
              </el-input>            
            </template>
          </el-table-column>

           <el-table-column label="预算科目" prop="finSubjectTypeName" align="center">
           </el-table-column>

          <el-table-column label="费用承担部门" prop="orgName" align="center">
          </el-table-column>

          <el-table-column label="操作" v-if="!form.bizEntityJson.disabled">
              <template slot-scope="scope">
                <el-button type="text" size="mini" style="color: #F56C6C; margin-left: 0; font-size: 14px; font-weight: 400; padding: 0 0 0 15px;" @click="delet(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-col>
      <dl-col :span="24" class="show-print" place="right">
        <p class="explain-p-one">价税合计(A+B)(元)　{{ form.bizEntityJson.totalAmt }}　(大写) {{ form.bizEntityJson.currency1 }}币 {{ form.bizEntityJson.totalAmt === '' || form.bizEntityJson.totalAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.totalAmt) }}</p>
      </dl-col>
      <el-col :span="12" class="no-print">
        <div class="d-min">
          <span>价税合计(A+B)(元)</span>
          <el-input v-model="form.bizEntityJson.totalAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col no-print">
        <div class="d-min">
          <span style="display: flex;">
            (大写)
            <el-input v-model="form.bizEntityJson.currency1" style="margin: 0 10px;"></el-input>
            币
          </span>
          <el-input :value="form.bizEntityJson.totalAmt=== '' || form.bizEntityJson.totalAmt=== undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.totalAmt)" readonly></el-input>
        </div>
      </el-col>
      
      <el-col :span="12">
        <div class="d-min">
          <el-checkbox v-model="form.bizEntityJson.whethersLendAmt" @change="whethersLendAmtChange" true-label="true" false-label="false">是否冲预借款</el-checkbox>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.whethersLendAmt == 'true'">借款人</span>
          <el-input v-if="form.bizEntityJson.whethersLendAmt == 'true'" :class="{'novalue': !form.bizEntityJson.borrow, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.borrow" @focus="showSearchUser1 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="margin-row blue-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>付款信息</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.personnelBoolean, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.personnelBoolean">
              <el-radio label="1">员工</el-radio>
              <el-radio label="0">外部单位</el-radio>
              <el-radio label="2">内部单位</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款方式</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.type1 != 'true' && form.bizEntityJson.type2 != 'true' && form.bizEntityJson.type3 != 'true' && form.bizEntityJson.type4 != 'true' && form.bizEntityJson.type5 != 'true' && form.bizEntityJson.type9 != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group 
              v-model="form.bizEntityJson" 
              :nameList="[{label:'现金',name:'type1'},
                          {label:'电汇',name:'type2'},
                          {label:'信用证',name:'type3'},
                          {label:'转账',name:'type4'},
                          {label:'票汇',name:'type5'},
                          {label:'其他',name:'type9'},]"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>收款人</span>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 1" :class="{'novalue': !form.bizEntityJson.receiveNameTrue, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveNameTrue" @focus="showSearchUser2 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 0" :class="{'novalue': !form.bizEntityJson.receiveName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <el-select
            v-if="form.bizEntityJson.personnelBoolean == 2"
            :class="{'novalue': !form.bizEntityJson.receiveNameIn, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.receiveNameIn"
            filterable
            remote
            clearable
            @change="receiveNameInChange"
            :remote-method="remoteMethod6"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in receiveNameInOptions"
              :key="item.assumeBukrs"
              :label="item.assumeCompany"
              :value="item.assumeCompany">
              <el-row :gutter="24">
                <el-col :span="5">
                  <span>{{ item.assumeBukrs }}</span>
                </el-col>
                <el-col :span="19">
                  <span>{{ item.assumeCompany }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.whethersLendAmt == 'true'">冲预借款(元)</span>
          <el-input v-if="form.bizEntityJson.whethersLendAmt == 'true'" v-model="form.bizEntityJson.lendAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" style="height: 37px !important;">
        <div class="d-min">
          <span>
            <el-checkbox v-if="form.bizEntityJson.personnelBoolean == 1" v-model="form.bizEntityJson.isManual" true-label="true" false-label="false">手工录入</el-checkbox>
            账号
          </span>
          <el-select v-if="form.bizEntityJson.personnelBoolean == 1 && form.bizEntityJson.isManual != 'true'" :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in bankAccountList"
              :key="item.accountNum"
              :label="item.accountNum"
              :value="item.accountNum">
            </el-option>
          </el-select>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>会计核减(元)</span>
          <el-input v-model="form.bizEntityJson.checkAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>开户行</span>
          <el-input :class="{'novalue': !form.bizEntityJson.receiveBank, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBank" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>公司代付(元)</span>
          <el-input v-model="form.bizEntityJson.advanceAmt" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @input="advanceAmtInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col no-print">
        <div class="explain-p">
          <p>注意事项：当左边选择员工时，员工账户会自动带出，若带出的账号不对或者您想选择其它账号，请点击手工录入。</p>
          <p>开户行默认为中国工商银行，若您的开户行为其它银行，请点击框体进行修改。</p>
        </div>
      </el-col>
      <dl-col :span="24" class="show-print" place="right" style="font-size:18px">
        <p class="explain-p-one">实付金额(元)　{{ form.bizEntityJson.realAmt }}　(大写) {{ form.bizEntityJson.currency2 }}币 {{ form.bizEntityJson.realAmt === '' || form.bizEntityJson.realAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.realAmt) }}</p>
      </dl-col>
      <el-col :span="12" class="no-print">
        <div class="d-min">
          <span>实付金额(元)</span>
          <el-input v-model="form.bizEntityJson.realAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col no-print">
        <div class="d-min">
          <span style="display: flex;">
            (大写)
            <el-input v-model="form.bizEntityJson.currency2" style="margin: 0 10px;"></el-input>
            币
          </span>
          <el-input :value="form.bizEntityJson.realAmt === '' || form.bizEntityJson.realAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.realAmt)" readonly></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="top-row margin-row blue-row" v-if="form.bizEntityJson.whethersLendAmt == 'true'"> 
      <div >
        <el-col :span="7" class="title-col">
          <h2>还款明细</h2>
        </el-col>
        <el-col :span="17" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="add">添加</span>提醒：请务必关联【借款人】的借款网批，否则会导致财务无法入账</p>
          </div>
        </el-col>
        <div v-for="(item, index) in form.bizEntityJson.rdList" :key="index">
          <el-col :span="7">
            <div class="d-min">
              <span>借款网批查询号</span>
              <el-select
                v-if="!form.bizEntityJson.disabled"
                popper-class="select-header"
                :class="{'novalue': !item.wpId, 'required': !form.bizEntityJson.disabled}"
                v-model="item.wpId"
                filterable
                remote
                clearable
                @change="wpIdChange(index, $event)"
                :remote-method="remoteMethod5"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
                <el-option
                  v-for="itemm in wpIdOptions"
                  :key="itemm.displayNo"
                  :label="itemm.displayNo"
                  :value="itemm.displayNo">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <span>{{ itemm.displayNo }}</span>
                    </el-col>
                    <el-col :span="12">
                      <span>{{ itemm.balance }}</span>
                    </el-col>
                  </el-row>
                </el-option>
              </el-select>
              <p v-else class="openUrl-p" @click="openUrlGlobal(item.wpId, item.rdApproveInfoId)">{{ item.wpId }}</p>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>剩余还款金额(元)</span>
              <el-input v-model="item.balance" readonly></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>本次还款金额(元)</span>
              <el-input :class="{'novalue': !item.repaymentAmount, 'required': !form.bizEntityJson.disabled}" v-model="item.repaymentAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @change="repaymentAmountChange(item, index)" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="3" class="right-col">
            <div class="explain-p">
              <p v-if="!form.bizEntityJson.disabled" class="explain-p-one" @click="del(index)"><span class="explain-btn-del">删除</span></p>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
  <el-row  v-if="form.bizEntityJson.disabled" :gutter="24" class="margin-row blue-row">
      <el-col :span="24" class="title-col topRight-col" >
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="10">
        <div class="d-min">
          <span>业务类型</span>
          <el-input v-model="form.bizEntityJson.businessType" readonly></el-input>
        </div>
      </el-col>
      <dl-col :span="6">
        <el-checkbox v-model="form.bizEntityJson.isAllInvoice" @change="isMissingTicketChange" checked :true-label="'true'" :false-label="'false'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"> 已提交全额发票</el-checkbox>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.isAllInvoice == 'true'" :span="8" place="right" />
      <el-col v-else :span="8" class="right-col">
        <div class="d-min">
          <span>缺票金额</span>
          <el-input v-model="form.bizEntityJson.missingTicketAmount"  autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :name="form.mapEdit.isAllInvoice ? 'yykReadonly' : ''"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
    <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      isNoValue: false,
      showSearchUser1: false,
      showSearchUser2: false,
      showTrafficCostDetail: false,
      showTrafficCostDetail2: false,
      showSelectBank: false,
      loading: false,
      isShowWorkNo: false,
      isShowContractNo: false,
      acctUnitNameOptions: [],
      assumeCompanyOptions: [],
      bankAccountList: [],
      billList:[],
      wpIdOptions: [],
      receiveNameInOptions: [],
      repaymentAmountIndex: '',
      accReduceIndex: '',
      accReduce2Index: '',
      isYykCheck: true
    }
  },
  props: ['data'],
  computed: {
    totalAmt() {
      if (this.form.bizEntityJson.billList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.billList.length > 0) {
        this.form.bizEntityJson.billList.forEach(item => {
          sum += (Number(item.amountAmt) + Number(item.amountAmt2))
        })
      }
      return sum
    },
    lendAmt() {
      if (this.form.bizEntityJson.rdList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.rdList.length > 0) {
        this.form.bizEntityJson.rdList.forEach(item => {
          sum += Number(item.repaymentAmount)
        })
      }
      return sum
    },
    checkAmt() {
      if (!this.$route.query.id) return
      if (this.form.bizEntityJson.billList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.billList.length > 0) {
        this.form.bizEntityJson.billList.forEach(item => {
          sum += (Number(item.accReduce) + Number(item.accReduce2))
        })
      }
      return sum
    },
    realAmt() {
      if (this.form.bizEntityJson.totalAmt === undefined) return
      if (this.form.bizEntityJson.lendAmt === undefined) return
      if (this.form.bizEntityJson.checkAmt === undefined) return
      if (this.form.bizEntityJson.advanceAmt === undefined || isNaN(this.form.bizEntityJson.advanceAmt)) return
        return Number(this.form.bizEntityJson.totalAmt) - Number(this.form.bizEntityJson.lendAmt) - Number(this.form.bizEntityJson.checkAmt) - (this.form.bizEntityJson.advanceAmt)
    }
  },
	watch: {  
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
    },
    totalAmt(val) {
      this.$set(this.form.bizEntityJson, 'totalAmt', val.toFixed(2))
    },
    lendAmt(val) {
      this.$set(this.form.bizEntityJson, 'lendAmt', val.toFixed(2))
    },
    checkAmt(val) {
      this.$set(this.form.bizEntityJson, 'checkAmt', val.toFixed(2))
    },
    realAmt(val) {
      if (Number(this.form.bizEntityJson.lendAmt) + Number(this.form.bizEntityJson.advanceAmt) > Number(this.form.bizEntityJson.totalAmt)) {
        this.$alert('冲抵借款不能比报销金额大,因为实付金额不能为负数', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (this.repaymentAmountIndex < 0) {
              this.form.bizEntityJson.advanceAmt = ''
            } else {
              this.form.bizEntityJson.rdList[this.repaymentAmountIndex].repaymentAmount = ''
            }
          }
        })
      } else {
        this.$set(this.form.bizEntityJson, 'realAmt', val.toFixed(2))
        // 缺票金额
        /* if (this.form.psv.accountFlg) this.$set(this.form.bizEntityJson, 'missingTicketAmount', val.toFixed(2)) */
      }
    }/* ,
    'form.bizEntityJson.personnelBoolean'(val){
     
      this.form.bizEntityJson.receiveAcctNo = ''
      this.form.bizEntityJson.receiveBank = ''
    } */

	},
 created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.findCompanyByOrgCdInLoad()
      // this.findByDictTypeCd()
      this.$set(this.form.bizEntityJson, 'username', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'userCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'centerParentOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'resAuthTypeCd', 'TEST_BX_FL')
      this.$set(this.form.bizEntityJson, 'billList', [])
      this.$set(this.form.bizEntityJson, 'rdList', [])
      this.$set(this.form.bizEntityJson, 'personnelBoolean', '1')
      this.$set(this.form.bizEntityJson, 'receiveAcctNo', '')
      this.$set(this.form.bizEntityJson, 'receiveBank', '中国工商银行')
      this.$set(this.form.bizEntityJson, 'sysBankCode', '102290071634')
      this.$set(this.form.bizEntityJson, 'currency2', '人民')
      this.$set(this.form.bizEntityJson, 'currency1', '人民')
      this.$set(this.form.bizEntityJson, 'lendAmt', '')
      this.$set(this.form.bizEntityJson, 'checkAmt', '')
      this.$set(this.form.bizEntityJson, 'advanceAmt', '')
      this.$set(this.form, 'psv', {})
      this.$set(this.form.bizEntityJson,'leaveOffice','false')
      this.queryExpenseBill()
    } 
    if (this.form.bizEntityJson.disabled) {
      this.findBusinessType()
    }
    
  },
  mounted() {
  },
  methods: {
    currentAmountAmtChange(index, val){
      if (Number(val) < Number(this.form.bizEntityJson.billList[index].amountAmt2)) {
        this.$alert('税额不能大于金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.billList[index].amountAmt2 = 0.00.toFixed(2)
          }
        })
      }
    },
    currentAmountAmt2Change(index, val){
      if (Number(val) > Number(this.form.bizEntityJson.billList[index].amountAmt)) {
        this.$alert('税额不能大于金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.billList[index].amountAmt2 = 0.00.toFixed(2)
          }
        })
      }
    },

    checkboxIsLeave(val){
      this.queryExpenseBill()
    },

    queryExpenseBill(){
      let leaveOffice = '0';
      if(this.form.bizEntityJson.leaveOffice == 'true'){
        leaveOffice = '1'
      }
      const param = {
        authTypeCd: "TEST_BX_FL",
        leaveOffice: leaveOffice,
        userid:this.userInfo.userid
      }
      this.$approval.queryExpenseBill(param).then(res => {
        if(res.code == 1 && res.data) {
            this.form.bizEntityJson.billList= res.data
            this.form.bizEntityJson.billList.forEach((item, index) => {
            this.$set(this.form.bizEntityJson.billList[index], 'accReduce', 0.00.toFixed(2))
            this.$set(this.form.bizEntityJson.billList[index], 'accReduce2', 0.00.toFixed(2))
            this.$set(this.form.bizEntityJson.billList[index], 'amountAmt2', 0.00.toFixed(2))
            })
        } else {
            this.form.bizEntityJson.billList = []
        }
      })
    },
    delet(j) {
			this.form.bizEntityJson.billList.splice(j,1)
		},

    findCompanyByOrgCdInLoad() {
      this.$approval.findCompanyByOrgCdInLoad().then(res => {
        if(res.code == 1 && res.message == 'success') {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'acctUnitName', res.data.companyName)
            this.$set(this.form.bizEntityJson, 'acctUnitCd', res.data.companyCode)
          } else {
            this.$set(this.form.bizEntityJson, 'acctUnitName', '')
            this.$set(this.form.bizEntityJson, 'acctUnitCd', '')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    findBusinessType() {
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'TEST_BX_FL'
      }
      this.$approval.getFieldsByAuthTypeCd(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'businessType', res.data.businessType)
          } else {
            this.$set(this.form.bizEntityJson, 'businessType', '')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.postFindCompanyList({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.acctUnitNameOptions = res.data
            } else {
              this.acctUnitNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.acctUnitNameOptions = []
      }
    },
    remoteMethod5(query) {
      if (query) {
        this.loading = true
        const param = {
          acctUnitName: this.form.bizEntityJson.acctUnitName,
          value: query
        }
        this.$approval.quickSearchWithDisplayNo(param).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.wpIdOptions = res.data
              this.wpIdOptions.unshift({
                displayNo: '借款网批查询号',
                balance: '剩余还款金额(元)'
              })
            } else {
              this.wpIdOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.wpIdOptions = []
      }
    },
    remoteMethod6(query) {
      if (query) {
        this.loading = true
        this.$approval.findSapSup({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.receiveNameInOptions = res.data
            } else {
              this.receiveNameInOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.receiveNameInOptions = []
      }
    },
    acctUnitNameChange(val) {
      let obj = this.acctUnitNameOptions.find(item => item.companyName == val)
      this.form.bizEntityJson.acctUnitCd = obj ? obj.companyCode : ''
      this.form.bizEntityJson.rdList = []
      this.wpIdOptions = []
      if (!val) {
        this.form.bizEntityJson.whethersLendAmt = 'false'
        this.form.bizEntityJson.borrow = ''
        this.form.bizEntityJson.borrowCd = ''
      }
    },
    advanceAmtInput() {
      this.repaymentAmountIndex = -1
    },
    assumeCompanyChange(val) {
      let obj = this.assumeCompanyOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.assumeBukrs = obj ? obj.assumeBukrs : ''
    },
    wpIdChange(index, val) {
      if (val) {
        let obj = this.wpIdOptions.find(item => item.displayNo == val)
        this.form.bizEntityJson.rdList[index].balance = obj.balance
        this.form.bizEntityJson.rdList[index].rdApproveInfoId = obj.resApproveInfoId
      } else {
        this.form.bizEntityJson.rdList[index].balance = ''
        this.form.bizEntityJson.rdList[index].repaymentAmount = ''
        this.form.bizEntityJson.rdList[index].rdApproveInfoId = ''
      }
    },
    receiveNameInChange(val) {
      let obj = this.receiveNameInOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.receiveCdIn = obj ? obj.assumeBukrs : ''
    },
    accReduceChange(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.billList[index].amountAmt)) {
        this.$alert('核减金额不能大于报销金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.billList[index].accReduce = 0.00.toFixed(2)
          }
        })
      }
      this.accReduceIndex = index
      this.accReduce2Index = -1
    },
    accReduce2Change(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.billList[index].amountAmt2)) {
        this.$alert('核减税额不能大于报销税额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.billList[index].accReduce2 = 0.00.toFixed(2)
          }
        })
      }
      this.accReduce2Index = index
      this.accReduceIndex = -1
    },
    whethersLendAmtChange(val) {
      if(!this.form.bizEntityJson.acctUnitName) {
        this.$alert('请先输入报销/入账公司', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.whethersLendAmt = 'false'
          }
        })
      }else{
        this.add()
      }
      if (val == 'false') this.form.bizEntityJson.rdList = []
    },
    repaymentAmountChange(item, index) {
      this.repaymentAmountIndex = index
      if(!item.wpId) {
        this.$alert('请先选择您的借款网批号，再输入还款金额！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            item.repaymentAmount = ''
          }
        })
      } else if(Number(item.repaymentAmount) > Number(item.balance)) {
        this.$alert('温馨提示，还款金额不能大于剩余应还金额......', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            item.repaymentAmount = ''
          }
        })
      }
    },
    isMissingTicketChange(val) {
      if (val == 'true') {
        // 缺票金额
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', this.form.bizEntityJson.missingTicketAmount)
      } else {
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', '')
      }
    },
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.borrow = val.userName
        this.form.bizEntityJson.borrowCd = val.userCd
      }
      this.showSearchUser1 = false
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.receiveAcctNo = ''
        this.form.bizEntityJson.receiveNameTrue = val.userName
        this.form.bizEntityJson.receiveCd = val.userCd
        this.$approval.findBankAccountByUserId({userId: val.userCd}).then(res => {
        if(res.code == 1){
          this.bankAccountList = res.data || []
          if (res.data[0]) this.form.bizEntityJson.receiveAcctNo = this.bankAccountList[0].accountNum
        } else {
          this.$message.error(res.message)
        }
      })
      }
      this.showSearchUser2 = false
    },
    closeSelectBank(val) {
      if (val) {
        this.form.bizEntityJson.receiveBank = val.bankName
        this.form.bizEntityJson.sysBankCode = val.bankCode
      }
      this.showSelectBank = false
    },
    add(index) {
      const newData = {
        wpId: '',
        balance: '',
        repaymentAmount: ''
      }
      this.form.bizEntityJson.rdList.push(newData)
    },
    del(index) {
      this.form.bizEntityJson.rdList.splice(index, 1)
    },
    // 页面发起时校验
    async yykCheck() {
      if (Number(this.form.bizEntityJson.totalAmt) == 0) {
        this.$message.closeAll()
        this.$message.error('价税合计不能为0')
        return false
      }
      if (this.form.bizEntityJson.rdList[0]) {
        const ids = this.form.bizEntityJson.rdList.map(item => item.wpId)
        const idsSet = new Set(ids)
        if (idsSet.size != ids.length) {
          this.$message.closeAll()
          this.$message.error('还款明细不能重复使用同一个借款网批号')
          return false
        }
      }
      /* start */
      this.isYykCheck = true
      
      for(let index in this.form.bizEntityJson.billList) {
       // 本次报销金额+本次报销税额不能大于剩余预算
        if (Number(this.form.bizEntityJson.billList[index].amountAmt) + Number(this.form.bizEntityJson.billList[index].amountAmt2) > Number(this.form.bizEntityJson.billList[index].preBudgetAmt)) {
            this.$alert(`${this.form.bizEntityJson.billList[index].preStartDate}${this.form.bizEntityJson.billList[index].content}不能超过${this.form.bizEntityJson.billList[index].preBudgetAmt}元`, '提示', {
              confirmButtonText: '确定',
                callback: action => {
                     return false
                }
              })
                this.isYykCheck = false
        }
      }

      // 报销类型为其他时，价税合计需要数字类型通过后端校验
      this.form.bizEntityJson.totalAmt = Number(this.form.bizEntityJson.totalAmt)
      if (!this.isYykCheck) {
        return false
      }
      /* end */
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
