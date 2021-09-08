<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 17:43:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-26 01:04:03
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData.fixedRent" label-position="top" size="small" :rules="fixedRenRule">
      <ysn-formItem :form="currentFormData.fixedRent" :config="configData" :column="$attrs.column" clearable>
        <template #s1>
          <ysn-btn type="info">{{ algorithmId | dataFormat }}</ysn-btn>
        </template>
      </ysn-formItem>
    </el-form>
    <div class="flex-ju-end pr-8 mb-8">
      <ysn-btn v-if="algorithmId===''" :disabled="true">编辑</ysn-btn>
      <ysn-dialog
        v-else
        width="920px"
        title="编辑"
        :is-show-dialog="isShowDialog"
        :external="isShowDialog"
        @closeDialog="closeDialog"
      >
        <ysn-btn @click="btn">编辑</ysn-btn>
        <template #contain>
          <!-- {{ currentFormData.fixedRent }} -->
          <Dialog v-if="currentFormData.fixedRent.commissionType !=='2'&&currentFormData.fixedRent.commissionType===''&&currentFormData.fixedRent.isClassDeduction==='' " :data="currentFormData.tableList" :type-status="data.businessAffairs" :list-obj="data" @ok="ok" />
          <!-- 提成-总额阶梯提成-否 -->
          <DialogNo v-if="(currentFormData.fixedRent.commissionType==='3' ||currentFormData.fixedRent.commissionType==='2') &&currentFormData.fixedRent.isClassDeduction === '1'" :data="currentFormData.tableList" :type-status="data.businessAffairs" :relist="data.businessAffairs.leaseArea" :list-obj="data" :adds="adds" @ok="ok" />
          <!-- 提成-总额阶梯提成-是 -->
          <CommissionDoalog v-if="(currentFormData.fixedRent.commissionType==='3' ||currentFormData.fixedRent.commissionType==='2') &&currentFormData.fixedRent.isClassDeduction === '0'" :data="currentFormData.tableList" :type-status="data.businessAffairs" :list-obj="data" @ok="ok" />
          <!-- 提成-固定提成-否 -->
          <Dialogpin v-if="currentFormData.fixedRent.commissionType==='1' &&currentFormData.fixedRent.isClassDeduction === '1'" :data="currentFormData.tableList" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" @ok="ok" />
          <!-- 提成-固定提成-是 -->
          <DialogEdit v-if="currentFormData.fixedRent.commissionType==='1' &&currentFormData.fixedRent.isClassDeduction === '0'" :data="currentFormData.tableList" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" @ok="ok" />
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
      </template>
      <template #isPromotional="scope">
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
      </template>
    </ysn-table>

    <div v-if="algorithmId==='3'|| algorithmId==='4' || algorithmId==='5'" class="mt-8">
      <el-form ref="rulesForm" :model="currentFormData.sommission" label-position="top" size="small" :rules="fixedRenRule">
        <ysn-formItem :form="currentFormData.sommission" :config="consommissionigData" :column="$attrs.column" clearable text>
          <template #s1>
            <ysn-btn type="info">提成</ysn-btn>
          </template>
        </ysn-formItem>
      </el-form>
      <div class="flex-ju-end pr-8 mb-8">
        <ysn-dialog
          v-if="algorithmId==='3'||algorithmId==='4'||algorithmId==='5'"
          width="920px"
          title="编辑"
          :is-show-dialog="falt"
          :external="falt"
          @closeDialog="closeDialogTwo"
        >
          <ysn-btn>编辑</ysn-btn>
          <template #contain>
            <!-- 提成-总额阶梯提成-否 -->
            <DialogNo
              v-if="(currentFormData.sommission.commissionType==='3' ||currentFormData.sommission.commissionType==='2') &&currentFormData.sommission.isClassDeduction === '1'"
              :data="currentFormData.list"
              status="1"
              :type-status="data.businessAffairs"
              :relist="data.businessAffairs.leaseArea"
              :list-obj="data"
              :adds="adds"
              @ok="ok"
              @isstatus="isstatus"
            />
            <!-- 提成-总额阶梯提成-是 -->
            <CommissionDoalog v-if="(currentFormData.sommission.commissionType==='3' ||currentFormData.sommission.commissionType==='2') &&currentFormData.sommission.isClassDeduction === '0'" :data="currentFormData.list" :type-status="data.businessAffairs" @ok="ok" />
            <!-- 提成-固定提成-否 -->
            <Dialogpin v-if="currentFormData.sommission.commissionType==='1' &&currentFormData.sommission.isClassDeduction === '1'" status="1" :data="currentFormData.list" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" @isstatus="isstatus" @ok="ok" />
            <!-- 提成-固定提成-是 -->
            <DialogEdit v-if="currentFormData.sommission.commissionType==='1' &&currentFormData.sommission.isClassDeduction === '0'" :data="currentFormData.list" status="1" :adds="adds" :type-status="data.businessAffairs" :list-obj="data" @isstatus="isstatus" @ok="ok" />
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
        </template>
        <template #isPromotional="scope">
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
        </template>
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
  { leasTterm: '租赁期11间', tableList: [
    { t4: '日期', wdith: '500px', formatter: row => {
      console.log(row)
      return row.beginningDate + '~' + row.endingDate
    } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠' }
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
    { t4: '日期', wdith: '300px', itemType: 'text', formatter: row => {
      return row.beginningDate + '~' + row.endingDate
    } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠' }
    // { itemType: 'select', prop: 'algorithmId', label: '收费方式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('chargingMethod'), listName: 'label', listValue: 'value', span: 1, change: this.changeBuildingName },
  ] },
  { tax: '税率', itemType: 'text' },
  { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
  ] }
]
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { chargingMethod } from '@/utils/optionsList'
import { fixedRenRule } from '../rules'
import Dialog from './dialog/dialog.vue'
import DialogEdit from './dialog/dialogEdit.vue'
import CommissionDoalog from './dialog/commissionDoalog.vue'
import Dialogpin from './dialog/dialogpin.vue'
import DialogNo from './dialog/dialogNo.vue'
export default {
  name: 'FixedRent',
  components: { Dialog, DialogEdit, CommissionDoalog, Dialogpin, DialogNo },
  filters: {
    dataFormat(msg) {
      let labame = '固定'
      chargingMethod.map(item => {
        if (msg === item.value && (msg === '1' || msg === '2')) {
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
        { itemType: 'input', inputType: 'Number', prop: 'totalFixedRent', label: '租金总金额', placeholder: '请输入', width: '206px', span: 1, change: this.changeTotalFixedRent },
        { itemType: '', prop: 's1', label: '', placeholder: '请输入', width: '206px', span: 4, hasSlot: true }
      ],
      commission: [
        { itemType: 'select', prop: 'deductPaymentCycleId', label: '提成支付周期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('paymentCycle'), listName: 'label', listValue: 'value' }
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
        { itemType: 'select', prop: 'paymentUnitId', label: '单价', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('unitPrice'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'latestpaymentDay', label: '最迟缴费日', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('receivable'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('txd'), listName: 'label', listValue: 'value', change: this.changeTax },
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('billType'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'discountReason', label: '折扣原因', placeholder: '请输入', width: '206px', maxlength: '60' },
        { itemType: 'input', prop: 'addedInstructions', label: '补充说明', placeholder: '请输入', width: '206px', maxlength: '60' }
      ],
      rel: [
        { itemType: 'input', prop: 'comCalculaRules', label: '提成计算规则', placeholder: '请输入', width: '206px' }
      ]
    }
  },
  computed: {
    add() {
      if (this.data.businessAffairs.isRentShop === '1') {
        return ['leaseArea', 'isPromotional']
      }
      return ['isPromotional']
    },
    // 1 固定 2 提成 3 两者取高 4 含物管两者取高 5 两者取合
    configData() {
      if (this.algorithmId === '1' || this.algorithmId === '') {
        return [
          ...this.list,
          ...this.fixed,
          ...this.publics
        ]
      }
      if (this.algorithmId === '3' || this.algorithmId === '4' || this.algorithmId === '5') {
        return [
          ...this.list,
          ...this.fixed,
          ...this.publics,
          ...this.rel
        ]
      }
      if (this.algorithmId === '2') {
        return [
          ...this.list,
          ...this.commission,
          ...this.publics,
          ...this.rate,
          ...this.clasp,
          // TODO 字段未找到

          { itemType: 'select', prop: 'invoiceTypeId', label: '销售额类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('salesTypeId'), listName: 'label', listValue: 'value' },
          ...this.rel
        ]
      }
      return []
    },
    // 上面表格
    tableConfig() {
      console.log(this.currentFormData)
      if (this.currentFormData.add === '允许') {
        console.log('不是到这来来吗')
        tableList = [
          { leaseArea: '租赁区域', isShowSlots: true },
          // { standardunitprice: '标准单价' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', wdith: '500px', formatter: row => {
              console.log(row)
              return row.beginningDate + '~' + row.endingDate
            } },
            { isPromotional: '优惠' }
          ] },
          { tax: '税率' },
          { name: '申请条件', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }
      if (this.currentFormData.add !== '允许') {
        tableList = [
          { leaseArea: '租赁区域', isShowSlots: true },
          // { standardunitprice: '标准单价' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', wdith: '500px', formatter: row => {
              console.log(row)
              return row.beginningDate + '~' + row.endingDate
            } } // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
          ] },
          { tax: '税率' },
          { name: '申请条件', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }

      if (this.algorithmId === '1' || this.algorithmId === '3' || this.algorithmId === '4' || this.algorithmId === '5' || this.algorithmId === '') {
        tableList[3].name = '申请条件'
        tableList[3].tableList = [
          { toApplyPrice: '申请单价', formatter: row => {
            // console.log(row.toApplyPrice)
          } },
          { unitPriceYieldRate: '单价达成率' },
          { t6: '月总额' }, // TODO 字段未找到
          { t6: '期总额' }// TODO 字段未找到
        ]
        console.log(tableList)
        return [
          ...tableList
        ]
      }
      if (this.algorithmId === '2') {
        // 提成-总额阶梯提成-否
        if (this.currentFormData.fixedRent.commissionType === '3' && this.currentFormData.fixedRent.isClassDeduction === '1') {
          console.log('为什么不进来')
          tableList[3].name = '总额阶梯提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...tableList
          ]
        }

        // 提成-总额阶梯提成-是
        if (this.currentFormData.fixedRent.commissionType === '3' && this.currentFormData.fixedRent.isClassDeduction === '0') {
          tableList[3].name = '总额阶梯提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...tableList
          ]
        }

        // 提成-固定提成-否
        if (this.currentFormData.fixedRent.commissionType === '1' && this.currentFormData.fixedRent.isClassDeduction === '1') {
          tableList[3].name = '固定提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' } // TODO 字段未找到
          ]
          return [
            ...tableList
          ]
        }
        // 提成-固定提成-是
        if (this.currentFormData.fixedRent.commissionType === '1' && this.currentFormData.fixedRent.isClassDeduction === '0') {
          console.log('进来了啊')
          tableList[3].name = '固定提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-是
        if (this.currentFormData.fixedRent.commissionType === '2' && this.currentFormData.fixedRent.isClassDeduction === '0') {
          tableList[3].name = '总额阶梯提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-否
        if (this.currentFormData.fixedRent.commissionType === '2' && this.currentFormData.fixedRent.isClassDeduction === '1') {
          tableList[3].name = '总额阶梯提成申请条件'
          tableList[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...tableList
          ]
        }
        // 提成-总额阶梯提成-是
        // if (this.commissionType === '3' && this.isWhether === '0') {
        //   tableList[4].name = '总额阶梯提成申请条件'
        //   tableList[4].tableList = [
        //     { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
        //     { class: '品类' },
        //     {startingMonthlyTurnover: '月营业额起', type: 'money' },
        //     { endingMonthlyTurnover: '月营业额止' , type: 'money' },
        //     { commDiscountApply: '申请扣率' ,type:'rate'}
        //   ]
        //   return [
        //     ...tableList
        //   ]
        // }
        // 提成-总额阶梯提成-否
        // console.log(this.commissionType, this.isWhether)
        //       this.currentFormData.fixedRent.commissionType = '3'
        // this.currentFormData.fixedRent.isClassDeduction = '1'

        // if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
        //   console.log('这个没进来吗')
        //   tableList[4].name = '总额阶梯提成申请条件'
        //   tableList[4].tableList = [
        //     { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
        //     {startingMonthlyTurnover: '月营业额起', type: 'money' },
        //     { endingMonthlyTurnover: '月营业额止' , type: 'money' },
        //     { commDiscountApply: '申请扣率' ,type:'rate'}
        //   ]
        //   return [
        //     ...tableList
        //   ]
        // }
      }

      return []
    },
    // 下面表格
    listConfig() {
      if (this.currentFormData.add === '允许') {
        listTable = [
          { leaseArea: '租赁区域', itemType: 'text' },
          // { standardunitprice: '标准单价', itemType: 'text' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', wdith: '300px', itemType: 'text', formatter: row => {
              return row.beginningDate + '~' + row.endingDate
            } }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
            { isPromotional: '优惠' }
          ] },
          { tax: '税率', itemType: 'text' },
          { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }

      if (this.currentFormData.add !== '允许') {
        listTable = [
          { leaseArea: '租赁区域', itemType: 'text' },
          // { standardunitprice: '标准单价', itemType: 'text' },
          { leasTterm: '租赁期间', tableList: [
            { t4: '日期', wdith: '300px', itemType: 'text', formatter: row => {
              return row.beginningDate + '~' + row.endingDate
            } } // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
          ] },
          { tax: '税率', itemType: 'text' },
          { conditions: '申请条件', itemType: 'text', labelClass: 'borderBottom', tableList: [
          ] }
        ]
      }

      //  提成类型：  1 固定提成 2 从低到高阶梯提成 3 总额阶梯提成 commissionType
      //  是否商品类扣：  0 是 1 否  isWhether
      // 提成
      console.log(this.algorithmId)
      //  两者取高
      if (this.algorithmId === '3') {
        // 两者取高-固定提成-是
        if (this.commissionType === '1' && this.isWhether === '0') {
          listTable[3].name = '固定提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '1' && this.isWhether === '1')) {
          listTable[3].name = '固定提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-是
        if (this.commissionType === '2' && this.isWhether === '0') {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率', type: 'rate' }

          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '2' && this.isWhether === '1')) {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === '3' && this.isWhether === '0') {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
      }
      // 物管者两者取高
      if (this.algorithmId === '4') {
        // 物管者两者取高-固定提成-是
        console.log(this.commissionType, this.isWhether)
        if (this.commissionType === '1' && this.isWhether === '1') {
          listTable[3].name = '固定提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 物管者两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '1' && this.isWhether === '0')) {
          listTable[3].name = '固定提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 物管者两者取高-从低到高阶梯提成-是
        if (this.commissionType === '2' && this.isWhether === '0') {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '2' && this.isWhether === '1')) {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === '3' && this.isWhether === '0') {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
          listTable[3].name = '总额阶梯提成申请条件'
          listTable[3].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止', type: 'money' },
            { commDiscountApply: '申请扣率', type: 'rate' }
          ]
          return [
            ...listTable
          ]
        }
      }
      //  两者取合
      if (this.algorithmId === '5') {
        listTable[3].name = '申请条件'
        listTable[3].tableList = [
          { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          { commDiscountApply: '申请扣率', type: 'rate' }
        ]
        return [
          ...listTable
        ]
      }

      return []
    },
    consommissionigData() {
      if (this.algorithmId === '3' || this.algorithmId === '4' || this.algorithmId === '5') {
        return [
          this.list[2],
          ...this.commission,
          ...this.publics,
          ...this.rate,
          ...this.clasp
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
    console.log(this.currentFormData.add)
    console.log(this.data.businessAffairs)
    this.listdata()
  },
  methods: {
    // 税率
    changeTax() {
      // console.log(this.currentFormData)
      this.listdata()
      // if(this.currentFormData.fixedRent.tax){}
    },
    listdata() {
      // 一条数据一行情况
      if (this.isue) {
        this.currentFormData.tableList = this.adds
        this.currentFormData.list = this.adds
        // this.currentFormData.list1 = this.adds
        // console.log(this.currentFormData.addlist.addlist)
        for (let i = 0; i < this.currentFormData.tableList.length; i++) {
          // console.log(i)
          this.currentFormData.tableList[i].unitPriceYieldRate = ''
          this.currentFormData.tableList[i].toApplyPrice = ''
          this.currentFormData.tableList[i].tax = this.currentFormData.fixedRent.tax
        }
        console.log(this.currentFormData.tableList)
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
        rentFreePeriod[i].id = this.data.businessAffairs.isRentShop === '0' ? i + 1 : 1
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
        rentFreePeriod[i].toApplyPrice = ''
        rentFreePeriod[i].unitPriceYieldRate = ''
      }
      // 上面表格数据
      this.currentFormData.tableList = rentFreePeriod
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
    btn() {
      this.isShowDialog = !this.isShowDialog
      this.isfalg = !this.isfalg
      this.falg = !this.falg
    },
    btnTwo() {
      // this.isShowDialog = true
      this.falt = !this.falt
      console.log(this.currentFormData)
      // isClassDeduction
    },
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    closeDialogTwo() {
      this.falt = !this.falt
    },
    isstatus(data) {
      this.falt = !this.falt
      console.log(data)
      this.currentFormData.list = data
      // this.currentFormData.addlist.list = data
      // this.currentFormData.list1 = data
      this.getSpanArr(this.currentFormData.list)
    },
    ok(data, status) {
      console.log(data)
      this.isShowDialog = !this.isShowDialog
      this.currentFormData.tableList = data
      console.log(this.currentFormData.tableList)
      this.getSpanArr(this.currentFormData.tableList)
      // this.listdata()
    },
    // 收费方式
    changeBuildingName(val) {
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
