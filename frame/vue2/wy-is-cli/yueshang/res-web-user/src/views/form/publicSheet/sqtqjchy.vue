<template>
  <!-- 申请提前解除合约 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>文件标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fileTitle, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileTitle" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.projectName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>商户名称</span>
          <el-input v-model="form.bizEntityJson.bisShopName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>合同编号</span>
          <el-select
            :class="{'novalue': !form.bizEntityJson.contractNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.contractNo"
            filterable
            remote
            clearable
            @change="contractNoChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="(item, index) in contractNoOptions"
              :key="index"
              :label="item.contNo"
              :value="item.contNo">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>品牌名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.brandName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.brandName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': form.bizEntityJson.contentTerminationFlag == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.contentTerminationFlag">
              <el-radio :label="true">按合同解约</el-radio>
              <el-radio :label="false">不按合同解约</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.brandType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.brandType">
              <el-radio label="1">总部联发品牌</el-radio>
              <el-radio label="2">区域联发品牌</el-radio>
              <el-radio label="3">非联发品牌</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>商家性质</span>
          <p v-if="form.bizEntityJson.bisShopNature == 1" class="explain-p-one">主力店-百货</p>
          <p v-if="form.bizEntityJson.bisShopNature == 2" class="explain-p-one">主力店-超市</p>
          <p v-if="form.bizEntityJson.bisShopNature == 3" class="explain-p-one">主力店-影院</p>
          <p v-if="form.bizEntityJson.bisShopNature == 4" class="explain-p-one">次主力店</p>
          <p v-if="form.bizEntityJson.bisShopNature == 5" class="explain-p-one">大租户</p>
          <p v-if="form.bizEntityJson.bisShopNature == 6" class="explain-p-one">中租户</p>
          <p v-if="form.bizEntityJson.bisShopNature == 7" class="explain-p-one">小租户</p>
          <p v-if="form.bizEntityJson.bisShopNature == 8" class="explain-p-one">商业街</p>
          <p v-if="form.bizEntityJson.bisShopNature == 9" class="explain-p-one">住宅底商</p>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>项目类型</span>
          <p v-if="form.bizEntityJson.projectType == 1" class="explain-p-one">地产</p>
          <p v-if="form.bizEntityJson.projectType == 2" class="explain-p-one">置地</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>商铺号</span>
          <el-input v-model="form.bizEntityJson.bisStoreNos" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>计租面积㎡</span>
          <el-input v-model="form.bizEntityJson.rentSquare" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>合同开始日期</span>
          <el-date-picker
            v-model="form.bizEntityJson.contStartDate"
            readonly
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>合同结束日期</span>
          <el-date-picker
            v-model="form.bizEntityJson.contEndDate"
            readonly
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>免租期</span>
          <p class="explain-p-one">{{ form.bizEntityJson.freePeriod }}</p>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>实付装补费用</span>
          <el-input :class="{'novalue': !form.bizEntityJson.actuallyPaidMoney, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.actuallyPaidMoney" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>费用信息</h2>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>申请解约日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.applyTerminationDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.applyTerminationDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>租金解约权责月</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.rentTerminationMonth, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.rentTerminationMonth"
            type="month"
            value-format="yyyy-MM"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>物管解约权责月</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.manageTerminationMonth, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.manageTerminationMonth"
            type="month"
            value-format="yyyy-MM"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>最后经营日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.lastOperatingDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.lastOperatingDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>解约当月租金</span>
          <el-input v-model="form.bizEntityJson.rentTerminationMonthAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>解约当月物业费</span>
          <el-input v-model="form.bizEntityJson.manageTerminationMonthAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月应收租金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.rentReceivableMonth, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rentReceivableMonth" @input="rentReceivableMonthInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月已收租金(元)</span>
          <el-input v-model="form.bizEntityJson.rentReceivedMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>当月欠收租金(元)</span>
          <el-input v-model="form.bizEntityJson.rentArrearsMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月应收物业费(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.manageFeeReceivableMonth, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.manageFeeReceivableMonth" @input="manageFeeReceivableMonthInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月已收物业费(元)</span>
          <el-input v-model="form.bizEntityJson.manageFeeReceivedMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>当月欠收物业费(元)</span>
          <el-input v-model="form.bizEntityJson.manageFeeArrearsMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月应收水费(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.waterFeeReceivableMonth, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.waterFeeReceivableMonth" @input="waterFeeReceivableMonthInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月已收水费(元)</span>
          <el-input v-model="form.bizEntityJson.waterFeeReceivedMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>当月欠收水费(元)</span>
          <el-input v-model="form.bizEntityJson.waterFeeArrearsMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月应收电费(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.electricityFeeReceivableMonth, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.electricityFeeReceivableMonth" @input="electricityFeeReceivableMonthInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>当月已收电费(元)</span>
          <el-input v-model="form.bizEntityJson.electricityFeeReceivedMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>当月欠收电费(元)</span>
          <el-input v-model="form.bizEntityJson.electricityFeeArrearsMonth" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="d-min">
          <span style="height: auto;">其他欠费及说明</span>
          <el-input :class="{'novalue': !form.bizEntityJson.otherArrearsDescription, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.otherArrearsDescription" type="textarea" rows="3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min" style="height: 75px;">
          <span style="height: auto;">当月欠费汇总(元)</span>
          <p class="explain-p-one">{{ form.bizEntityJson.totalArrearsMonth }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>累计欠收租金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.totalRentArrears, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalRentArrears" @input="totalRentArrearsInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>累计欠收物业费(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.totalManageFeeArrears, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalManageFeeArrears" @input="totalManageFeeArrearsInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min">
          <span>累计欠收水电费(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.totalUtilityFeeArrears, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.totalUtilityFeeArrears" @input="totalUtilityFeeArrearsInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="d-min">
          <span style="height: auto;">申报原因及后续调整安排</span>
          <el-input :class="{'novalue': !form.bizEntityJson.reasonDeclaration, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reasonDeclaration" type="textarea" rows="3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min" style="height: 75px;">
          <span style="height: auto;">累计欠收合计(元)</span>
          <p class="explain-p-one">{{ form.bizEntityJson.totalArrears }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>已交租金保证金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payedRentBondAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payedRentBondAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>已交物业保证金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payedManageFeeBondAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payedManageFeeBondAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>已交质量保证金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payedQualityBondAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payedQualityBondAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>已交其他保证金(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.payedOtherBondAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.payedOtherBondAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>预售卡充值费用</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>预售卡充值是否全退换</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.preSaleCardReturnFlag == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.preSaleCardReturnFlag">
              <el-radio :label="true">有</el-radio>
              <el-radio :label="false">无</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>未退还预售卡充值费用</span>
          <el-input :class="{'novalue': !form.bizEntityJson.preSaleCardNotRefundedFee, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.preSaleCardNotRefundedFee" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>工程条件和退铺约定</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>工程条件</span>
          <p class="explain-p-one">工程变更</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>退铺约定</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.restoreFlag == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.restoreFlag">
              <el-radio :label="true">恢复原状</el-radio>
              <el-radio :label="false">不恢复原状</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>商铺恢复原状金额(元)</span>
          <el-input :class="{'novalue': !form.bizEntityJson.restoreFee, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.restoreFee" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col v-if="!form.bizEntityJson.restoreFlag" :span="24" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">本商铺下次租赁时不得以未恢复原状为由降低租金标准或增加装修期/免租期</p>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>商务条件审批号</span>
          <el-input v-model="form.bizEntityJson.businessApproveNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>履约保证金能否覆盖所有欠费</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{'novalue': form.bizEntityJson.coverFlag == undefined, 'required': !form.bizEntityJson.disabled}">
          <el-radio-group v-model="form.bizEntityJson.coverFlag">
            <el-radio :label="true">能覆盖</el-radio>
            <el-radio :label="false">不能覆盖</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>其他</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span style="height: auto;">备注说明</span>
          <el-input :class="{'novalue': !form.bizEntityJson.remark, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.remark" type="textarea" rows="3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" :sqTree="true" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      loading: false,
      contractNoOptions: [],
    }
  },
  props: ['data'],
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
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'totalRentArrears', null)
      this.$set(this.form.bizEntityJson, 'totalManageFeeArrears', null)
      this.$set(this.form.bizEntityJson, 'totalUtilityFeeArrears', null)
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        Approval.getQuickSearchCont(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.contractNoOptions = res.data
            } else {
              this.contractNoOptions = []
            }
          }
        })
      } else {
        this.contractNoOptions = []
      }
    },
    contractNoChange(val) {
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.form.bizEntityJson.bisShopName = obj ? obj.bisShopName : ''
      this.form.bizEntityJson.bisShopNature = obj ? obj.manageCd : ''
      this.form.bizEntityJson.projectType = obj ? obj.projectType : ''
      this.form.bizEntityJson.bisStoreNos = obj ? obj.bisStoreNos : ''
      this.form.bizEntityJson.rentSquare = obj ? obj.rentSquare : ''
      this.form.bizEntityJson.contStartDate = obj ? obj.contStartDate : ''
      this.form.bizEntityJson.contEndDate = obj ? obj.contEndDate : ''
      this.form.bizEntityJson.freePeriod = obj ? obj.feeRentHtml : ''
      this.form.bizEntityJson.rentReceivedMonth = obj ? 0 : ''
      this.form.bizEntityJson.manageFeeReceivedMonth = obj ? 0 : ''
      this.form.bizEntityJson.waterFeeReceivedMonth = obj ? 0 : ''
      this.form.bizEntityJson.electricityFeeReceivedMonth = obj ? 0 : ''
    },
    rentReceivableMonthInput(val) {
      this.form.bizEntityJson.rentArrearsMonth = Number(val)
      this.totalInput()
    },
    manageFeeReceivableMonthInput(val) {
      this.form.bizEntityJson.manageFeeArrearsMonth = Number(val)
      this.totalInput()
    },
    waterFeeReceivableMonthInput(val) {
      this.form.bizEntityJson.waterFeeArrearsMonth = Number(val)
      this.totalInput()
    },
    electricityFeeReceivableMonthInput(val) {
      this.form.bizEntityJson.electricityFeeArrearsMonth = Number(val)
      this.totalInput()
    },
    // 当月欠费汇总
    totalInput() {
      if (!this.form.bizEntityJson.rentArrearsMonth) this.form.bizEntityJson.rentArrearsMonth = 0
      if (!this.form.bizEntityJson.manageFeeArrearsMonth) this.form.bizEntityJson.manageFeeArrearsMonth = 0
      if (!this.form.bizEntityJson.waterFeeArrearsMonth) this.form.bizEntityJson.waterFeeArrearsMonth = 0
      if (!this.form.bizEntityJson.electricityFeeArrearsMonth) this.form.bizEntityJson.electricityFeeArrearsMonth = 0
      this.form.bizEntityJson.totalArrearsMonth = this.form.bizEntityJson.rentArrearsMonth + this.form.bizEntityJson.manageFeeArrearsMonth + this.form.bizEntityJson.waterFeeArrearsMonth + this.form.bizEntityJson.electricityFeeArrearsMonth
    },
    totalRentArrearsInput() {
      this.total2Input()
    },
    totalManageFeeArrearsInput() {
      this.total2Input()
    },
    totalUtilityFeeArrearsInput() {
      this.total2Input()
    },
    // 累计欠收合计
    total2Input() {
      this.form.bizEntityJson.totalArrears = Number(this.form.bizEntityJson.totalRentArrears) + Number(this.form.bizEntityJson.totalManageFeeArrears) + Number(this.form.bizEntityJson.totalUtilityFeeArrears)
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.fileTitle) return this.$message.error('请输入文件标题'), false
      if(!this.form.bizEntityJson.projectName) return this.$message.error('请选择项目名称'), false
      if(!this.form.bizEntityJson.contractNo) return this.$message.error('请选择合同编号'), false
      if(this.form.bizEntityJson.contentTerminationFlag == undefined) return this.$message.error('请选择解约类型'), false
      if(!this.form.bizEntityJson.brandName) return this.$message.error('请输入品牌名称'), false
      if(!this.form.bizEntityJson.brandType) return this.$message.error('请选择品牌类型'), false
      if(!this.form.bizEntityJson.actuallyPaidMoney) return this.$message.error('请输入实付装补费用'), false
      if(!this.form.bizEntityJson.applyTerminationDate) return this.$message.error('请选择申请解约日期'), false
      if(!this.form.bizEntityJson.rentTerminationMonth) return this.$message.error('请选择租金解约权责月'), false
      if(!this.form.bizEntityJson.manageTerminationMonth) return this.$message.error('请选择物管解约权责月'), false
      if(!this.form.bizEntityJson.rentReceivableMonth) return this.$message.error('请输入当月应收租金'), false
      if(!this.form.bizEntityJson.manageFeeReceivableMonth) return this.$message.error('请输入当月应收物业费'), false
      if(!this.form.bizEntityJson.waterFeeReceivableMonth) return this.$message.error('请输入当月应收水费'), false
      if(!this.form.bizEntityJson.electricityFeeReceivableMonth) return this.$message.error('请输入当月应收电费'), false
      if(!this.form.bizEntityJson.otherArrearsDescription) return this.$message.error('请输入其他欠费及说明'), false
      if(!this.form.bizEntityJson.totalRentArrears) return this.$message.error('请输入累计欠收租金'), false
      if(!this.form.bizEntityJson.totalManageFeeArrears) return this.$message.error('请输入累计欠收物业费'), false
      if(!this.form.bizEntityJson.totalUtilityFeeArrears) return this.$message.error('请输入累计欠收水电费'), false
      if(!this.form.bizEntityJson.reasonDeclaration) return this.$message.error('请输入申报原因及后续调整安排'), false
      if(!this.form.bizEntityJson.payedRentBondAmount) return this.$message.error('请输入已交租金保证金'), false
      if(!this.form.bizEntityJson.payedManageFeeBondAmount) return this.$message.error('请输入已交物业保证金'), false
      if(!this.form.bizEntityJson.payedQualityBondAmount) return this.$message.error('请输入已交质量保证金'), false
      if(!this.form.bizEntityJson.payedOtherBondAmount) return this.$message.error('请输入已交其他保证金'), false
      if(this.form.bizEntityJson.preSaleCardReturnFlag == undefined) return this.$message.error('请选择预售卡充值是否全退换'), false
      if(!this.form.bizEntityJson.preSaleCardNotRefundedFee) return this.$message.error('请输入未退还的预售卡充值费用'), false
      if(this.form.bizEntityJson.restoreFlag == undefined) return this.$message.error('请选择退铺约定'), false
      if(!this.form.bizEntityJson.restoreFee) return this.$message.error('请输入商铺恢复原状金额'), false
      if(this.form.bizEntityJson.coverFlag == undefined) return this.$message.error('请选择履约保证金能否覆盖所有欠费'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
