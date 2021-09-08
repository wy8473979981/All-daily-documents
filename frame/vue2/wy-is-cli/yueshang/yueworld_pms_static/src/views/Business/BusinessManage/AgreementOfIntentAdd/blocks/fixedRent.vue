<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 17:43:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-09-03 17:41:55
-->
<template>
  <div>
    <el-form ref="rule" :model="currentFormData.fixedRent" label-position="top" size="small" :rules="fixedRenRule">
      <ysn-formItem :form="currentFormData.fixedRent" :config="configData" :column="$attrs.column" clearable>
        <template #s1>
          <ysn-btn type="info">{{ algorithmId | dataFormat }}</ysn-btn>
        </template>
      </ysn-formItem>
    </el-form>
    <div class="flex-ju-end">
      <ysn-btn @click="btn">编辑</ysn-btn>
    </div>
    <div class="flex-ju-end pr-8 mb-8">
      <!-- <ysn-btn v-if="algorithmId===''" :disabled="true">编辑</ysn-btn> -->
      <ysn-dialog
        width="1400px"
        title="编辑"
        :is-show-dialog="isShowDialog"
        :external="isShowDialog"
        @closeDialog="closeDialog"
      >
        <template #contain>
          <!-- {{ currentFormData.fixedRent }} -->
          <Dialog v-if="currentFormData.fixedRent.commissionType !==2&&currentFormData.fixedRent.commissionType===''&&currentFormData.fixedRent.isClassDeduction==='' " :data="currentFormData.tableList" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" @ok="ok" />
          <!-- 提成-总额阶梯提成-否 -->
          <DialogNo v-if="(currentFormData.fixedRent.commissionType===3 ||currentFormData.fixedRent.commissionType===2) &&currentFormData.fixedRent.isClassDeduction === 1" :data="currentFormData.tableList" :type-status="data.businessAffairs" :relist="data.businessAffairs.leaseArea" :list-obj="data" :adds="adds" :tax="currentFormData.fixedRent.t0" :name="currentFormData.fixedRent.deductPaymentCycleId" @ok="ok" />
          <!-- 提成-总额阶梯提成-是 -->
          <CommissionDoalog v-if="(currentFormData.fixedRent.commissionType===3 ||currentFormData.fixedRent.commissionType===2) &&currentFormData.fixedRent.isClassDeduction === 0" :data="currentFormData.tableList" :type-status="data.businessAffairs" :list-obj="data" :tax="currentFormData.fixedRent.t0" :name="currentFormData.fixedRent.deductPaymentCycleId" @ok="ok" />
          <!-- 提成-固定提成-否 -->
          <Dialogpin v-if="currentFormData.fixedRent.commissionType===1 &&currentFormData.fixedRent.isClassDeduction === 1" :data="currentFormData.tableList" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" :tax="currentFormData.fixedRent.t0" @ok="ok" />
          <!-- 提成-固定提成-是 -->
          <DialogEdit v-if="currentFormData.fixedRent.commissionType===1 &&currentFormData.fixedRent.isClassDeduction === 0" :data="currentFormData.tableList" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" :tax="currentFormData.fixedRent.t0" @ok="ok" />
        </template>
        <template #btn />
      </ysn-dialog>
    </div>
    <ysn-table
      :key="itemCount"
      :data="currentFormData.tableList"
      :column="tableConfig"
      select-key="id"
      :show-slots="add"
      :span-method="arraySpanMethod"
      :checkbox="false"
    >
      <template #leaseArea>
        <div v-for="(item,index) in data.businessAffairs.leaseArea" :key="index">
          <div>{{ item }}</div>
        </div>
        <div>{{ data.businessAffairs.meterRentArea }}（㎡） </div>
      </template>
      <!-- <template #isPromotional="scope">
        <div class="ysn-form">
          <el-select v-model="scope.row.isPromotional" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template> -->
    </ysn-table>

    <div v-if="algorithmId===3|| algorithmId===4 || algorithmId===5" class="mt-8">
      <el-form ref="rulesForm" :model="currentFormData.sommission" label-position="top" size="small" :rules="fixedRenRule">
        <ysn-formItem :form="currentFormData.sommission" :config="consommissionigData" :column="$attrs.column" clearable text>
          <template #s1>
            <ysn-btn type="info">提成</ysn-btn>
          </template>
        </ysn-formItem>
      </el-form>
      <div class="flex-ju-end">
        <ysn-btn @click="btnTwo">编辑</ysn-btn>
      </div>
      <div class="flex-ju-end pr-8 mb-8">
        <ysn-dialog
          width="1400px"
          title="编辑"
          :is-show-dialog="falt"
          :external="falt"
          @closeDialog="closeDialogTwo"
        >
          <!-- <ysn-btn>编辑</ysn-btn> -->
          <template #contain>
            <!-- 提成-总额阶梯提成-否 -->
            <DialogNo
              v-if="(currentFormData.sommission.commissionType===3 ||currentFormData.sommission.commissionType===2) &&currentFormData.sommission.isClassDeduction === 1"
              :data="currentFormData.list"
              status="1"
              :type-status="data.businessAffairs"
              :relist="data.businessAffairs.leaseArea"
              :list-obj="data"
              :name="currentFormData.sommission.deductPaymentCycleId"
              :adds="adds"
              @ok="ok"
              @isstatus="isstatus"
            />
            <!-- 提成-总额阶梯提成-是 -->
            <CommissionDoalog v-if="(currentFormData.sommission.commissionType===3 ||currentFormData.sommission.commissionType===2) &&currentFormData.sommission.isClassDeduction === 0" :data="currentFormData.list" :type-status="data.businessAffairs" :tax="currentFormData.sommission.t0" :name="currentFormData.sommission.deductPaymentCycleId" :list-obj="data" @ok="ok" />
            <!-- 提成-固定提成-否 -->
            <Dialogpin v-if="currentFormData.sommission.commissionType===1 &&currentFormData.sommission.isClassDeduction === 1" status="1" :data="currentFormData.list" :adds="adds" :tax="currentFormData.sommission.t0" :type-status="data.businessAffairs" :list-obj="data" @isstatus="isstatus" @ok="ok" />
            <!-- 提成-固定提成-是 -->
            <DialogEdit v-if="currentFormData.sommission.commissionType===1 &&currentFormData.sommission.isClassDeduction === 0" :data="currentFormData.list" status="1" :adds="adds" :tax="currentFormData.sommission.t0" :type-status="data.businessAffairs" :list-obj="data" @isstatus="isstatus" @ok="ok" />
          </template>
          <template #btn />
        </ysn-dialog>
      </div>

      <ysn-table
        :key="itemIndex"
        :data="currentFormData.list"
        :column="listConfig"
        select-key="id"
        :checkbox="false"
        :span-method="arraySpanMethod"
        :show-slots="add"
      >
        <template #leaseArea>
          <div v-for="(item,index) in data.businessAffairs.leaseArea" :key="index">
            <div>{{ item }}</div>
          </div>
          <div>{{ data.businessAffairs.meterRentArea }}（㎡） </div>
        </template>
        <!-- <template #isPromotional="scope">
          <div class="ysn-form">
            <el-select v-model="scope.row.isPromotional" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template> -->
      </ysn-table>
    </div>
  </div>
</template>
<script>
// console.log(this.currentFormData.add)
// 上面表格
var tableList = [
  { leaseArea: '租赁区域', isShowSlots: true, width: '150px' },
  // { standardunitprice: '标准单价' },
  { leasTterm: '租赁期间', tableList: [
    { t4: '日期', width: '500px', formatter: row => {
      console.log(row)
      return row.beginningDate + '~' + row.endingDate
    } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠', width: 150 }
  ] },
  { tax: '税率' },
  { name: '申请条件', labelClass: 'borderBottom', tableList: [
  ] }
]

// 下面表格
var listTable = [
  { leaseArea: '租赁区域', itemType: 'text', width: '150px' },
  // { standardunitprice: '标准单价', itemType: 'text' },
  { leasTterm: '租赁期间', tableList: [
    { t4: '日期', width: 300, itemType: 'text', formatter: row => {
      return row.beginningDate + '~' + row.endingDate
    } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠', width: 150 }
    // { itemType: 'select', prop: 'algorithmId', label: '收费方式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('chargingMethod'), listName: 'label', listValue: 'value', span: 1, change: this.changeBuildingName },
  ] },
  { tax: '税率', itemType: 'text' },
  { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
  ] }
]
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { chargingMethod, isOrNotStatus } from '@/utils/optionsList'
import { totalRent } from '@/utils/index'
import { fixedRenRule } from '../rules'
import Dialog from './dialog/dialog.vue'
import DialogEdit from './dialog/dialogEdit.vue'
import CommissionDoalog from './dialog/commissionDoalog.vue'
import Dialogpin from './dialog/dialogpin.vue'
import DialogNo from './dialog/dialogNo.vue'
import { getOptionsLabel } from '@/filters/index'
export default {
  name: 'FixedRent',
  components: { Dialog, DialogEdit, CommissionDoalog, Dialogpin, DialogNo },
  filters: {
    dataFormat(msg) {
      let labame = '固定'
      chargingMethod.map(item => {
        if (msg === item.value && (msg === 1 || msg === 2)) {
          labame = item.label
        }
      })
      return labame
    }
  },
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'fixedRent',
    event: 'change'
  },
  props: {
    fixedRent: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: [
        { value: '0',
          label: '是' },
        { value: '1',
          label: '否' }
      ],
      option: [
        { value: '0',
          label: '是' },
        { value: '1',
          label: '否' }
      ],
      isue: false,
      adds: [],
      isfalg: false,
      falg: false,
      falt: false,
      isShowDialog: false,
      fixedRenRule: fixedRenRule,
      itemCount: 0,
      itemIndex: 0,
      algorithmId: '',
      commissionType: '', // 提成类型
      isWhether: '', // 是 否
      // rulesForm: { // 表单验证
      //   BuildingName: [{ required: true, message: '请输入必填项' }]
      // },
      list: [
        { itemType: 'select', prop: 'algorithmId', label: '收费方式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('chargingMethod'), listName: 'label', listValue: 'value', span: 1, change: this.changeBuildingName },
        { itemType: 'input', inputType: 'Number', prop: 'totalFixedRent', label: '租金总金额', placeholder: '自动计算', width: '206px', span: 1, change: this.changeTotalFixedRent, disabled: true },
        { itemType: '', prop: 's1', label: '', placeholder: '请输入', width: '206px', span: 4, hasSlot: true }
      ],
      commission: [
        { itemType: 'select', prop: 'deductPaymentCycleId', label: '提成支付周期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('paymentCycle'), listName: 'label', listValue: 'value', change: this.changeDeductPaymentCycleId }
      ],
      fixed: [
        { itemType: 'select', prop: 'fixedPaymentCycleId', label: '固定支付周期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('paymentCycle'), listName: 'label', listValue: 'value' }
      ],
      rate: [
        { itemType: 'select', prop: 'salesTaxRate', label: '销售额税率', placeholder: '请输入', width: '206px', span: 2, list: this.$PUBFN.getOptionsList('txd'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType }
      ],
      clasp: [
        { itemType: 'select', prop: 'isClassDeduction', label: '是否有品类扣', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value', change: this.whether }
      ],
      publics: [
        { itemType: 'select', prop: 'cycleType', label: '周期类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('cycleType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'collectId', label: '账期模式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('accounting'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'n', label: 'n期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('n'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'paymentUnitId', label: '单价', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('unitPrice'), listName: 'label', listValue: 'value', change: this.changePaymentUnitId },
        { itemType: 'select', prop: 'latestpaymentDay', label: '最迟缴费日', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('receivable'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('txd'), listName: 'label', listValue: 'value', change: this.changeTax },
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('billType'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'discountReason', label: '折扣原因', placeholder: '请输入', width: '206px', maxlength: '60' },
        { itemType: 'input', prop: 'addedInstructions', label: '补充说明', placeholder: '请输入', width: '206px', maxlength: '60', span: 3 }
      ],
      publicsCapy: [
        { itemType: 'select', prop: 'cycleType', label: '周期类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('cycleType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'collectId', label: '账期模式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('accounting'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'n', label: 'n期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('n'), listName: 'label', listValue: 'value' },
        // TODO 字段未找到
        { itemType: 'select', prop: 't0', label: '销售额类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('salesTypeId'), listName: 'label', listValue: 'value', change: this.changet },
        { itemType: 'select', prop: 'latestpaymentDay', label: '最迟缴费日', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('receivable'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('txd'), listName: 'label', listValue: 'value', change: this.changeTax },
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('billType'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'discountReason', label: '折扣原因', placeholder: '请输入', width: '206px', maxlength: '60' },
        { itemType: 'input', prop: 'addedInstructions', label: '补充说明', placeholder: '请输入', width: '206px', maxlength: '60', span: 3 }
      ],
      rel: [

        { itemType: 'select', prop: 'comCalculaRules', label: '提成计算规则', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('calculationRules'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  computed: {
    // 上面表格营业额起
    written() {
      const add = this.currentFormData.fixedRent.deductPaymentCycleId === 1 ? '月营业额起' : this.currentFormData.fixedRent.deductPaymentCycleId === 2 ? '季营业额起' : this.currentFormData.fixedRent.deductPaymentCycleId === 3 ? '半年营业额起' : this.currentFormData.fixedRent.deductPaymentCycleId === 4 ? '年营业额起' : this.currentFormData.fixedRent.deductPaymentCycleId === 5 ? '一次性营业额起' : '月营业额起'
      return add
    },
    // 上面表格营业额止
    writtenStop() {
      const add = this.currentFormData.fixedRent.deductPaymentCycleId === 1 ? '月营业额止' : this.currentFormData.fixedRent.deductPaymentCycleId === 2 ? '季营业额止' : this.currentFormData.fixedRent.deductPaymentCycleId === 3 ? '半年营业额止' : this.currentFormData.fixedRent.deductPaymentCycleId === 4 ? '年营业额止' : this.currentFormData.fixedRent.deductPaymentCycleId === 5 ? '一次性营业额止' : '月营业额止'
      return add
    },
    // 下面表格营业额起
    buttomwritten() {
      const add = this.currentFormData.sommission.deductPaymentCycleId === 1 ? '月营业额起' : this.currentFormData.sommission.deductPaymentCycleId === 2 ? '季营业额起' : this.currentFormData.sommission.deductPaymentCycleId === 3 ? '半年营业额起' : this.currentFormData.sommission.deductPaymentCycleId === 4 ? '年营业额起' : this.currentFormData.sommission.deductPaymentCycleId === 5 ? '一次性营业额起' : '月营业额起'
      return add
    },
    // 下面表格营业额起止
    buttomwrittenStop() {
      const add = this.currentFormData.sommission.deductPaymentCycleId === 1 ? '月营业额止' : this.currentFormData.sommission.deductPaymentCycleId === 2 ? '季营业额止' : this.currentFormData.sommission.deductPaymentCycleId === 3 ? '半年营业额止' : this.currentFormData.sommission.deductPaymentCycleId === 4 ? '年营业额止' : this.currentFormData.sommission.deductPaymentCycleId === 5 ? '一次性营业额止' : '月营业额止'
      return add
    },
    add() {
      if (this.data.businessAffairs.isRentShop === 1) {
        return ['leaseArea']
      }
      return []
    },
    // 1 固定 2 提成 3 两者取高 4 含物管两者取高 5 两者取合
    configData() {
      console.log(this.algorithmId === '')
      if (this.algorithmId === 1 || this.algorithmId === '') {
        console.log(this.list, this.fixed, this.publics)
        console.log(this.$attrs.column)
        return [
          ...this.list,
          ...this.fixed,
          ...this.publics
        ]
      }
      if (this.algorithmId === 3 || this.algorithmId === 4 || this.algorithmId === 5) {
        return [
          ...this.list,
          ...this.fixed,
          ...this.publics
        ]
      }
      if (this.algorithmId === 2) {
        // 销售额类型为净销售额
        if (this.currentFormData.fixedRent.t0 === 3) {
          return [
            ...this.list,
            ...this.commission,
            ...this.publicsCapy,
            { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType },
            { itemType: 'select', prop: 'isClassDeduction', label: '是否有品类扣', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value', change: this.whether, disabled: true },
            ...this.rel
          ]
        }
        return [
          ...this.list,
          ...this.commission,
          ...this.publicsCapy,
          { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType },
          ...this.clasp,
          ...this.rel
        ]
      }
      return []
    },
    // 上面表格
    tableConfig() {
      // console.log(this.currentFormData)
      // console.log(this.currentFormData.tableList)
      console.log(this.currentFormData.add)
      if (this.currentFormData.add === '允许') {
        tableList = [
          { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
            return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
          } },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', width: 300, formatter: row => {
              return row.beginningDate + '~' + row.endingDate
            } },
            { isPromotional: '优惠', width: 150, formatter: row => {
              return getOptionsLabel(row.isPromotional, isOrNotStatus)
            } }
          ] },
          { tax: '税率', formatter: row => {
            return getOptionsLabel(row.tax, this.$PUBFN.getOptionsList('txd'))
          } },
          { name: '申请条件', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }
      if (this.currentFormData.add !== '允许') {
        tableList = [
          { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
            return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
          } },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', width: 300, formatter: row => {
              console.log(row)
              return row.beginningDate + '~' + row.endingDate
            } }
          ] },
          { tax: '税率', formatter: row => {
            return getOptionsLabel(row.tax, this.$PUBFN.getOptionsList('txd'))
          } },
          { name: '申请条件', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }
      if (this.algorithmId === 1 || this.algorithmId === 3 || this.algorithmId === 4 || this.algorithmId === 5 || this.algorithmId === '') {
        tableList[3].name = '申请条件'
        tableList[3].tableList = [
          { toApplyPrice: '申请单价' },
          { unitPriceYieldRate: '单价达成率' },
          { monthAmount: '月总额' }, // TODO 字段未找到
          { monthAmount: '期总额' }// TODO 字段未找到
        ]
        console.log(tableList)
        return [
          ...tableList
        ]
      }
      if (this.algorithmId === 2) {
        // 提成-总额阶梯提成-否
        if (this.currentFormData.fixedRent.commissionType === 3 && this.currentFormData.fixedRent.isClassDeduction === 1) {
          console.log(this.currentFormData.fixedRent)
          // 不显示销售额税率字段
          if (this.currentFormData.fixedRent.t0 === 1 || this.currentFormData.fixedRent.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { startingMonthlyTurnover: this.written },
                { endingMonthlyTurnover: this.writtenStop },
                { commDiscountApply: '申请扣率' }
              ] }
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { salesTaxRate: '销售额税率' },
              { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
              { startingMonthlyTurnover: this.written, type: 'money' },
              { endingMonthlyTurnover: this.writtenStop, type: 'money' },
              { commDiscountApply: '申请扣率' }
            ] }

            // ...tableList
          ]
        }

        // 提成-总额阶梯提成-是
        if (this.currentFormData.fixedRent.commissionType === 3 && this.currentFormData.fixedRent.isClassDeduction === 0) {
          // 不显示销售额税率字段
          if (this.currentFormData.fixedRent.t0 === 1 || this.currentFormData.fixedRent.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { startingMonthlyTurnover: this.written, type: 'money' },
                { endingMonthlyTurnover: this.writtenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...tableList
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { startingMonthlyTurnover: this.written, type: 'money' },
              { endingMonthlyTurnover: this.writtenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...tableList
          ]
        }

        // 提成-固定提成-否
        if (this.currentFormData.fixedRent.commissionType === 1 && this.currentFormData.fixedRent.isClassDeduction === 1) {
          // tableList[3].name = '固定提成申请条件'
          // tableList[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'} // TODO 字段未找到
          // ]
          // 不显示销售额税率字段
          if (this.currentFormData.fixedRent.t0 === 1 || this.currentFormData.fixedRent.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { commDiscountApply: '申请扣率' } // TODO 字段未找到
              ] }
            // ...tableList
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { commDiscountApply: '申请扣率' } // TODO 字段未找到
            ] }
            // ...tableList
          ]
        }
        // 提成-固定提成-是
        if (this.currentFormData.fixedRent.commissionType === 1 && this.currentFormData.fixedRent.isClassDeduction === 0) {
          // tableList[3].name = '固定提成申请条件'
          // tableList[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { class: '品类' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          // 不显示销售额税率
          if (this.currentFormData.fixedRent.t0 === 1 || this.currentFormData.fixedRent.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...tableList
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-是
        if (this.currentFormData.fixedRent.commissionType === 2 && this.currentFormData.fixedRent.isClassDeduction === 0) {
          // 不显示销售额税率
          if (this.currentFormData.fixedRent.t0 === 1 || this.currentFormData.fixedRent.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { startingMonthlyTurnover: this.written, type: 'money' },
                { endingMonthlyTurnover: this.writtenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...tableList
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { startingMonthlyTurnover: this.written, type: 'money' },
              { endingMonthlyTurnover: this.writtenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-否
        if (this.currentFormData.fixedRent.commissionType === 2 && this.currentFormData.fixedRent.isClassDeduction === 1) {
          tableList[3].name = '总额阶梯提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额' },
            { salesTaxRate: '销售额税率' },
            { startingMonthlyTurnover: this.written, type: 'money' },
            { endingMonthlyTurnover: this.writtenStop, type: 'money' },
            { commDiscountApply: '申请扣率' }
          ]
          return [
            ...tableList
          ]
        }
      }

      return [
        { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
          return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
        } },
        { leasTterm: '租赁期间', tableList: [
          { t4: '日期', width: 300, formatter: row => {
            return row.beginningDate + '~' + row.endingDate
          } },
          { isPromotional: '优惠', width: 150, formatter: row => {
            return getOptionsLabel(row.isPromotional, isOrNotStatus)
          } }
        ] },
        { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
          { monthlyEstimatedTurnover: '月预估营业额' },
          { class: '品类' },
          { salesTaxRate: '销售额税率', type: 'rate' },
          { startingMonthlyTurnover: this.written, type: 'money' },
          { endingMonthlyTurnover: this.writtenStop, type: 'money' },
          { commDiscountApply: '申请扣率', type: 'rate' }
        ] }
      ]
    },
    // 下面表格
    listConfig() {
      if (this.currentFormData.add === '允许') {
        listTable = [
          { leaseArea: '租赁区域', itemType: 'text', formatter: row => {
            return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
          } },
          // { standardunitprice: '标准单价', itemType: 'text' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', width: 300, itemType: 'text', formatter: row => {
              return row.beginningDate + '~' + row.endingDate
            } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
            { isPromotional: '优惠', width: 150, type: 'money', formatter: row => {
              return getOptionsLabel(row.isPromotional, isOrNotStatus)
            } }
          ] },
          { tax: '税率', itemType: 'text', type: 'rate', formatter: row => {
            return getOptionsLabel(row.tax, this.$PUBFN.getOptionsList('txd'))
          } },
          { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }

      if (this.currentFormData.add !== '允许') {
        listTable = [
          { leaseArea: '租赁区域', itemType: 'text', formatter: row => {
            return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
          } },
          // { standardunitprice: '标准单价', itemType: 'text' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', width: 300, itemType: 'text', formatter: row => {
              return row.beginningDate + '~' + row.endingDate
            } } // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
          ] },
          { tax: '税率', itemType: 'text', type: 'rate', formatter: row => {
            return getOptionsLabel(row.tax, this.$PUBFN.getOptionsList('txd'))
          } },
          { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }

      //  提成类型：  1 固定提成 2 从低到高阶梯提成 3 总额阶梯提成 commissionType
      //  是否商品类扣：  0 是 1 否  isWhether
      // 提成
      console.log(this.algorithmId)
      //  两者取高
      if (this.algorithmId === 3) {
        // 两者取高-固定提成-是
        if (this.commissionType === 1 && this.isWhether === 0) {
          console.log(this.currentFormData.sommission)
          // 不显示销售额税率字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          // listTable[3].name = '固定提成申请条件'
          // listTable[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { class: '品类' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 1 && this.isWhether === 1)) {
          //  不显示销售额税率
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { commDiscountApply: '申请扣率' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { commDiscountApply: '申请扣率' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-是
        if (this.commissionType === 2 && this.isWhether === 0) {
          // 不显示销售额税率
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { monthlyEstimatedTurnover: this.buttomwritten, type: 'money' },
                { monthlyEstimatedTurnover: this.buttomwrittenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { monthlyEstimatedTurnover: this.buttomwritten, type: 'money' },
              { monthlyEstimatedTurnover: this.buttomwrittenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 2 && this.isWhether === 1)) {
          // 不显示销售额字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            listTable[3].name = '总额阶梯提成申请条件'
            listTable[3].tableList = [
              { startingMonthlyTurnover: '月预估营业额' },
              { startingMonthlyTurnover: this.buttomwritten },
              { endingMonthlyTurnover: this.buttomwrittenStop },
              { commDiscountApply: '申请扣率' }
            ]
            return [
              ...listTable
            ]
          }
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { startingMonthlyTurnover: '月预估营业额' },
            { salesTaxRate: '销售额税率' },
            { startingMonthlyTurnover: this.buttomwritten },
            { endingMonthlyTurnover: this.buttomwrittenStop },
            { commDiscountApply: '申请扣率' }
          ]
          return [
            ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === 3 && this.isWhether === 0) {
          // 不显示销售额税率字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
                { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
              { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 3 && this.isWhether === 1)) {
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { startingMonthlyTurnover: this.buttomwritten },
                { endingMonthlyTurnover: this.buttomwrittenStop },
                { commDiscountApply: '申请扣率' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { startingMonthlyTurnover: this.buttomwritten },
              { endingMonthlyTurnover: this.buttomwrittenStop },
              { commDiscountApply: '申请扣率' }
            ] }
            // ...listTable
          ]
        }
      }
      // 物管者两者取高
      if (this.algorithmId === 4 || this.algorithmId === 5) {
        // 物管者两者取高-固定提成-是
        console.log(this.commissionType, this.isWhether)
        if (this.commissionType === 1 && this.isWhether === 1) {
          // 不显示销售额税率
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 物管者两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 1 && this.isWhether === 0)) {
          // listTable[3].name = '固定提成申请条件'
          // listTable[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { startingMonthlyTurnover: '销售额税率' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          // 不显示销售额税率
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { commDiscountApply: '申请扣率' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '固定提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { commDiscountApply: '申请扣率' }
            ] }
            // ...listTable
          ]
        }
        // 物管者两者取高-从低到高阶梯提成-是
        if (this.commissionType === 2 && this.isWhether === 0) {
          // listTable[3].name = '总额阶梯提成申请条件'
          // listTable[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { class: '品类' },
          //   {startingMonthlyTurnover: '月营业额起', type: 'money' },
          //   { endingMonthlyTurnover: '月营业额止' , type: 'money' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          // 不显示销售额税率
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
                { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
              { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 2 && this.isWhether === 1)) {
          // listTable[3].name = '总额阶梯提成申请条件'
          // listTable[3].tableList = [
          //   {startingMonthlyTurnover: '月营业额起', type: 'money' },
          //   { endingMonthlyTurnover: '月营业额止' , type: 'money' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          //  不显示销售额税率字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { startingMonthlyTurnover: this.buttomwritten },
                { endingMonthlyTurnover: this.buttomwrittenStop },
                { commDiscountApply: '申请扣率' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { startingMonthlyTurnover: this.buttomwritten },
              { endingMonthlyTurnover: this.buttomwrittenStop },
              { commDiscountApply: '申请扣率' }
            ] }
            // ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === 3 && this.isWhether === 0) {
          // listTable[3].name = '总额阶梯提成申请条件'
          // listTable[3].tableList = [
          //   { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          //   { class: '品类' },
          //   {startingMonthlyTurnover: '月营业额起', type: 'money' },
          //   { endingMonthlyTurnover: '月营业额止' , type: 'money' },
          //   { commDiscountApply: '申请扣率' ,type:'rate'}
          // ]
          // 不显示销售额税率字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { class: '品类' },
                { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
                { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
                { commDiscountApply: '申请扣率', type: 'rate' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { class: '品类' },
              { salesTaxRate: '销售额税率', type: 'rate' },
              { startingMonthlyTurnover: this.buttomwritten, type: 'money' },
              { endingMonthlyTurnover: this.buttomwrittenStop, type: 'money' },
              { commDiscountApply: '申请扣率', type: 'rate' }
            ] }
            // ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === 3 && this.isWhether === 1)) {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额' },
            { startingMonthlyTurnover: this.buttomwritten },
            { endingMonthlyTurnover: this.buttomwrittenStop },
            { commDiscountApply: '申请扣率' }
          ]
          //  不显示销售额税率字段
          if (this.currentFormData.sommission.t0 === 1 || this.currentFormData.sommission.t0 === 3) {
            return [
              { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
                return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
              } },
              { leasTterm: '租赁期间', tableList: [
                { t4: '日期', width: 300, formatter: row => {
                  return row.beginningDate + '~' + row.endingDate
                } },
                { isPromotional: '优惠', width: 150, formatter: row => {
                  return getOptionsLabel(row.isPromotional, isOrNotStatus)
                } }
              ] },
              { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
                { monthlyEstimatedTurnover: '月预估营业额' },
                { startingMonthlyTurnover: this.buttomwritten },
                { endingMonthlyTurnover: this.buttomwrittenStop },
                { commDiscountApply: '申请扣率' }
              ] }
            // ...listTable
            ]
          }
          return [
            { leaseArea: '租赁区域', width: 150, isShowSlots: true, formatter: row => {
              return `${row.leaseArea}  ${this.data.businessAffairs.meterRentArea}(㎡)`
            } },
            { leasTterm: '租赁期间', tableList: [
              { t4: '日期', width: 300, formatter: row => {
                return row.beginningDate + '~' + row.endingDate
              } },
              { isPromotional: '优惠', width: 150, formatter: row => {
                return getOptionsLabel(row.isPromotional, isOrNotStatus)
              } }
            ] },
            { name: '总额阶梯提成申请条件', labelClass: 'borderBottom', tableList: [
              { monthlyEstimatedTurnover: '月预估营业额' },
              { salesTaxRate: '销售额税率' },
              { startingMonthlyTurnover: this.buttomwritten },
              { endingMonthlyTurnover: this.buttomwrittenStop },
              { commDiscountApply: '申请扣率' }
            ] }
            // ...listTable
          ]
        }
      }
      //  两者取合
      if (this.algorithmId === 5) {
        listTable[3].name = '申请条件'
        listTable[3].tableList = [
          { monthlyEstimatedTurnover: '月预估营业额' },
          { commDiscountApply: '申请扣率' }
        ]
        return [
          ...listTable
        ]
      }

      return []
    },
    // 下面表单
    consommissionigData() {
      if (this.algorithmId === 3 || this.algorithmId === 4 || this.algorithmId === 5) {
        // 销售额类型为净销售额
        if (this.currentFormData.sommission.t0 === 3) {
          return [
            this.list[2],
            ...this.commission,
            ...this.publicsCapy,
            { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType },
            { itemType: 'select', prop: 'isClassDeduction', label: '是否有品类扣', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value', change: this.whether, disabled: true },
            ...this.rel
          ]
        }

        return [
          this.list[2],
          ...this.commission,
          ...this.publicsCapy,
          { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType },
          ...this.clasp,
          ...this.rel
        ]
      }

      return [
        ...this.commission,
        ...this.publics,
        this.rate[0]
      ]
    }
  },
  watch: {
    algorithmId: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.listdata()
      }
    }
  },
  mounted() {
    console.log(this.$attrs, '+++++++++++')
    console.log(this.currentFormData.add)
    console.log(this.data.businessAffairs)
    this.listdata()
  },
  methods: {
    // 单价
    changePaymentUnitId(v) {

    },
    // 税率
    changeTax() {
      this.itemIndex++
      this.itemCount++
      // console.log(this.currentFormData)
      this.listdata()
      // if(this.currentFormData.fixedRent.tax){}
    },
    listdata() {
      // 一条数据一行情况
      if (this.isue) {
        this.currentFormData.tableList = this.adds
        this.currentFormData.list = this.adds
        for (let i = 0; i < this.currentFormData.tableList.length; i++) {
          // console.log(i)
          this.currentFormData.tableList[i].unitPriceYieldRate = ''
          this.currentFormData.tableList[i].toApplyPrice = ''
          this.currentFormData.tableList[i].tax = this.currentFormData.fixedRent.tax
        }

        this.getSpanArr(this.currentFormData.tableList)
        this.getSpanArr(this.currentFormData.list)
        this.itemIndex++
        return
      }
      // if (this.data.businessAffairs.isRentShop === '0') {
      const leaseArea = this.data.businessAffairs.leaseArea
      console.log(this.currentFormData.tableList)
      const rentFreePeriod = this.currentFormData.tableList
      const key = Object.keys(rentFreePeriod[0])
      const moren = rentFreePeriod[0]
      for (let i = 0; i < leaseArea.length; i++) {
        rentFreePeriod[i] = {}
        for (let j = 0; j < key.length; j++) {
          // console.log(key[j])
          // console.log(moren[key[j]])
          rentFreePeriod[i][key[j]] = moren[key[j]]
        }
        rentFreePeriod[i].leaseArea = leaseArea[i]
        rentFreePeriod[i].id = this.data.businessAffairs.isRentShop === 0 ? i + 1 : 1
        // 合同开始
        rentFreePeriod[i].beginningDate = this.data.businessAffairs.contBeginDate
        //  合同结束
        rentFreePeriod[i].endingDate = this.data.businessAffairs.contEndDate
        console.log(this.data.businessAffairs.contEndDate)
        rentFreePeriod[i].tax = this.currentFormData.fixedRent.tax
        // 弹窗里面需要用到的标记
        rentFreePeriod[i].end = true
        rentFreePeriod[i].begin = true
        rentFreePeriod[i].disabled = true
        rentFreePeriod[i].jian = true
        rentFreePeriod[i].isPromotional = ''
        rentFreePeriod[i].toApplyPrice = ''
        rentFreePeriod[i].unitPriceYieldRate = ''
      }
      // 上面表格数据
      this.currentFormData.tableList = rentFreePeriod
      console.log(this.currentFormData.tableList)
      // 下面表格数据
      this.currentFormData.list = rentFreePeriod

      // console.log(this.currentFormData.addlist)
      if (!this.isue) {
        this.adds = JSON.parse(JSON.stringify(rentFreePeriod))
      }
      console.log('深拷贝', this.adds)
      this.getSpanArr(this.currentFormData.tableList)
    },
    // 金额保留两位小数
    changeTotalFixedRent() {
      Math.floor(this.currentFormData.fixedRent.totalFixedRent * 100) / 100
    },
    btnTwo() {
      // this.falt = !this.falt
      this.$refs.rulesForm.validate((valid, failedObj) => {
        console.log(failedObj)
        console.log(valid)
        if (valid) {
          this.falt = !this.falt
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    btn() {
      console.log(this.data)

      // console.log(this.data)
      // this.isShowDialog = !this.isShowDialog
      // this.isfalg = !this.isfalg
      // this.falg = !this.falg
      // return
      this.$refs.rule.validate((valid, failedObj) => {
        console.log(failedObj)
        console.log(valid)
        if (valid) {
          this.isShowDialog = !this.isShowDialog
          this.isfalg = !this.isfalg
          this.falg = !this.falg
        } else {
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
      // if (!this.currentFormData.fixedRent.deductPaymentCycleId && !this.currentFormData.fixedRent.t0 && !this.currentFormData.fixedRent.commissionType && !this.currentFormData.fixedRent.isClassDeduction) {
      //   this.$message.error('提成支付周期,销售额类型,提成类型,是否有品类扣,都需要填写才能编辑哦～')
      //   return
      // }
      // this.isShowDialog = !this.isShowDialog
      // this.isfalg = !this.isfalg
      // this.falg = !this.falg
    },
    // btnTwo() {
    //   // this.isShowDialog = true
    //   this.falt = !this.falt
    //   console.log(this.currentFormData)
    //   // isClassDeduction
    // },
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    closeDialogTwo() {
      this.falt = !this.falt
    },
    isstatus(data) {
      this.falt = !this.falt
      this.currentFormData.list = data
      this.getSpanArr(this.currentFormData.list)
    },
    ok(data, status) {
      this.isShowDialog = !this.isShowDialog
      this.currentFormData.tableList = data
      console.log(this.data.dataRes.reimbursement.tableData[0].receivableRuleId)
      if (this.data.dataRes.reimbursement.tableData[0].receivableRuleId !== 1) { // 前端计算租金总金额
        let price = 0 // 总体租金
        this.currentFormData.tableList.map(item => {
          price = price + parseInt(item.toApplyPrice)
        })
        const obj = {
          label: this.currentFormData.fixedRent.paymentUnitId, // 单价枚举
          price: price, // 租金
          meterRentArea: this.data.businessAffairs.meterRentArea, // 租赁面积
          formula: this.data.dataRes.formula, // 固定天数以及公式
          contEndDate: this.data.businessAffairs.contEndDate, // 结束时间
          contBeginDate: this.data.businessAffairs.contBeginDate // 开始时间
        }
        this.currentFormData.fixedRent.totalFixedRent = totalRent(obj)
        console.log(this.currentFormData.fixedRent.totalFixedRent)
      } else {
        this.currentFormData.fixedRent.totalFixedRent = '后端计算金额'
      }
      this.getSpanArr(this.currentFormData.tableList)
    },
    // 收费方式
    changeBuildingName(val) {
      // this.$refs['rule'].clearValidate() // 清除表单校验
      // this.$refs['rulesForm'].clearValidate() // 清除表单校验
      this.isue = true
      console.log(this.currentFormData.tableList)
      console.log(this.currentFormData.addlist)
      // 上面表单赋值
      this.currentFormData.fixedRent.commissionType = ''
      this.currentFormData.fixedRent.isClassDeduction = ''
      // if (val.algorithmId === '2') {
      //   this.currentFormData.fixedRent.commissionType = '3'
      //   this.currentFormData.fixedRent.isClassDeduction = '1'
      // } else {
      //   this.currentFormData.fixedRent.commissionType = ''
      //   this.currentFormData.fixedRent.isClassDeduction = ''
      // }
      // 下面表单赋值
      // if (val.algorithmId === '3' || val.algorithmId === '4' || val.algorithmId === '5') {
      //   console.log(this.currentFormData)
      //   this.currentFormData.sommission.commissionType = '3'
      //   this.currentFormData.sommission.isClassDeduction = '1'
      // }
      this.itemCount++
      this.algorithmId = val.algorithmId
      this.listdata()
      // 1 固定 2 提成 3 两者取高 4 含物管两者取高 5 两者取合
    },
    changeDeductPaymentCycleId() {
      this.itemIndex++
      this.itemCount++
    },
    // 提成类型
    commisType(val) {
      /*    枚举
     提成类型：  1 固定提成 2 从低到高阶梯提成 3 总额阶梯提成
      */
      console.log(val.commissionType)
      this.itemIndex++
      this.itemCount++
      this.commissionType = val.commissionType
      console.log(this.commissionType)
      // this.currentFormData.tableList = []
      console.log(this.currentFormData.tableList)
      this.listdata()
    },
    // 是否商品类扣
    whether(val) {
      this.itemIndex++
      this.itemCount++
      /*    枚举
     是否商品类扣：  0 是 1 否
      */
      this.isWhether = val.isClassDeduction
      this.listdata()
    },
    // 销售额类型
    changet() {
      this.itemIndex++
      this.itemCount++
      this.currentFormData.fixedRent.isClassDeduction = this.currentFormData.fixedRent.t0 === 3 ? 1 : ''
      this.currentFormData.sommission.isClassDeduction = this.currentFormData.sommission.t0 === 3 ? 1 : ''
    },

    // 数据处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(this.isfalg && this.idx)
      if (columnIndex === 0) {
        if (this.spanArr[rowIndex] > 0) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 合并规则
    getSpanArr(data, idx) {
      this.spanArr = []
      this.pos = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
            data[i].isShowAdd = false
          } else {
            data[i].isShowAdd = true
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      console.log(this.spanArr)
    }
  }

}
</script>
