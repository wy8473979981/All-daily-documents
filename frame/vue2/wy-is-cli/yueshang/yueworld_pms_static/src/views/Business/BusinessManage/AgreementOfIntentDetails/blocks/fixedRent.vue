<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 17:43:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-18 18:23:41
-->
<template>
  <div>

    <ysn-displayInfo
      :data="currentFormData.fixedRent"
      :config="configData"
      :column="4"
    />

    <ysn-table
      :key="itemCount"
      :data="currentFormData.tableList"
      :column="tableConfig"
      select-key="id"
      :checkbox="false"
    />
  </div>
</template>
<script>
// 上面表格
var tableList = [
  { leaseArea: '租赁区域' },
  { standardunitprice: '标准单价' },
  { leasTterm: '租赁期间', tableList: [
    { t4: '日期', wdith: '300px' }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠' }
  ] },
  { tax: '税率' },
  { name: '申请条件', labelClass: 'borderBottom', tableList: [
  ] }
]
// 下面表格
var listTable = [
  { leaseArea: '租赁区域' },
  { standardunitprice: '标准单价' },
  { leasTterm: '租赁期间', tableList: [
    { t4: '日期', wdith: '300px' }, // TODP 两个字段 数据处理 beginningDate 租期开始日  endingDate 租期结束日
    { isPromotional: '优惠' }
  ] },
  { tax: '税率' },
  { conditions: '申请条件', labelClass: 'borderBottom', tableList: [
  ] }
]
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
import { chargingMethod } from '@/utils/optionsList'
import { fixedRenRule } from '../rules'
// import Dialog from './dialog/dialog.vue'
// import DialogEdit from './dialog/dialogEdit.vue'
// import CommissionDoalog from './dialog/commissionDoalog.vue'
// import Dialogpin from './dialog/dialogpin.vue'
// import DialogNo from './dialog/dialogNo.vue'
export default {
  name: 'FixedRent',
  // components: { Dialog, DialogEdit, CommissionDoalog, Dialogpin, DialogNo },
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
    }
  },
  data() {
    return {
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
        { itemType: 'input', prop: 'totalFixedRent', label: '固定租金总金额', placeholder: '请输入', width: '206px', disabled: true, span: 1 },
        { itemType: '', prop: 's1', label: '', placeholder: '请输入', width: '206px', span: 4, hasSlot: true }
      ],
      commission: [
        { itemType: 'select', prop: 'deductPaymentCycleId', label: '提成支付周期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      fixed: [
        { itemType: 'select', prop: 'fixedPaymentCycleId', label: '固定支付周期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      rate: [
        { itemType: 'input', prop: 'salesTaxRate', label: '销售额税率', placeholder: '请输入', width: '206px', span: 2 },
        { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('commissionType'), listName: 'label', listValue: 'value', change: this.commisType }
      ],
      clasp: [
        { itemType: 'select', prop: 'isClassDeduction', label: '是否有品类扣', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('distributionType'), listName: 'label', listValue: 'value', change: this.whether }
      ],
      publics: [
        { itemType: 'select', prop: 'cycleType', label: '周期类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'collectId', label: '账期模式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'n', label: 'n期', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'paymentUnitId', label: '单价', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'latestpaymentDay', label: '最迟缴费日', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'discountReason', label: '折扣原因', placeholder: '请输入', width: '206px' },
        { itemType: 'input', prop: 'addedInstructions', label: '补充说明', placeholder: '请输入', width: '206px' }
      ],
      rel: [
        { itemType: 'input', prop: 'comCalculaRules', label: '提成计算规则', placeholder: '请输入', width: '206px' }
      ]
    }
  },
  computed: {
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
          ...this.rel
        ]
      }
      return []
    },
    // 上面表格
    tableConfig() {
      if (this.algorithmId === '1' || this.algorithmId === '3' || this.algorithmId === '4' || this.algorithmId === '5' || this.algorithmId === '') {
        tableList[4].name = '申请条件'
        tableList[4].tableList = [
          { toApplyPrice: '申请单价' },
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
        // 提成-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '1' && this.isWhether === '1')) {
          tableList[4].name = '固定提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'} // TODO 字段未找到
          ]
          return [
            ...tableList
          ]
        }
        // 提成-固定提成-是
        if (this.commissionType === '1' && this.isWhether === '0') {
          console.log('进来了啊')
          tableList[4].name = '固定提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-是
        if (this.commissionType === '2' && this.isWhether === '1') {
          tableList[4].name = '总额阶梯提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...tableList
          ]
        }
        // 提成-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '2' && this.isWhether === '0')) {
          tableList[4].name = '总额阶梯提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...tableList
          ]
        }
        // 提成-总额阶梯提成-是
        if (this.commissionType === '3' && this.isWhether === '0') {
          console.log('等待两人贵人')
          tableList[4].name = '总额阶梯提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...tableList
          ]
        }
        // 提成-总额阶梯提成-否
        console.log(this.commissionType, this.isWhether)
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
          tableList[4].name = '总额阶梯提成申请条件'
          tableList[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...tableList
          ]
        }
      }

      return []
    },
    // 下面表格
    listConfig() {
    //  提成类型：  1 固定提成 2 从低到高阶梯提成 3 总额阶梯提成 commissionType
    //  是否商品类扣：  0 是 1 否  isWhether
    // 提成
      console.log(this.algorithmId)
      //  两者取高
      if (this.algorithmId === '3' || this.algorithmId === '5') {
        // 两者取高-固定提成-是
        if (this.commissionType === '1' && this.isWhether === '0') {
          listTable[4].name = '固定提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '1' && this.isWhether === '1')) {
          listTable[4].name = '固定提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-是
        if (this.commissionType === '2' && this.isWhether === '0') {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率' ,type:'rate'}

          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '2' && this.isWhether === '1')) {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === '3' && this.isWhether === '0') {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
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
          listTable[4].name = '固定提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 物管者两者取高-固定提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '1' && this.isWhether === '0')) {
          listTable[4].name = '固定提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 物管者两者取高-从低到高阶梯提成-是
        if (this.commissionType === '2' && this.isWhether === '0') {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-从低到高阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '2' && this.isWhether === '1')) {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }

        // 两者取高-总额阶梯提成-是
        if (this.commissionType === '3' && this.isWhether === '0') {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { class: '品类' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
        // 两者取高-总额阶梯提成-否
        if ((this.commissionType === '' || this.isWhether === '') || (this.commissionType === '3' && this.isWhether === '1')) {
          listTable[4].name = '总额阶梯提成申请条件'
          listTable[4].tableList = [
            { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
            { startingMonthlyTurnover: '月营业额起', type: 'money' },
            { endingMonthlyTurnover: '月营业额止' , type: 'money' },
            { commDiscountApply: '申请扣率' ,type:'rate'}
          ]
          return [
            ...listTable
          ]
        }
      }
      //  两者取合
      if (this.algorithmId === '5') {
        listTable[4].name = '申请条件'
        listTable[4].tableList = [
          { monthlyEstimatedTurnover: '月预估营业额', type: 'money' },
          { commDiscountApply: '申请扣率' ,type:'rate'}
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
        // { itemType: 'select', prop: 'commissionType', label: '提成类型', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', disabled: true }
      ]
    }
  },

  methods: {
    btn() {
      this.isShowDialog = !this.isShowDialog
    },
    closeDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    ok() {
      this.isShowDialog = !this.isShowDialog
    },
    // 收费方式
    changeBuildingName(val) {
      this.commissionType = ''
      this.isWhether = ''
      console.log(val)
      this.itemCount++
      this.algorithmId = val.algorithmId
      // 1 固定 2 提成 3 两者取高 4 含物管两者取高 5 两者取合
    },
    // 提成类型
    commisType(val) {
      /*    枚举
     提成类型：  1 固定提成 2 从低到高阶梯提成 3 总额阶梯提成
      */
      console.log(val.commissionType)
      this.isWhether = ''
      // console.log(this.currentFormData.fixedRent.isClassDeduction)
      // this.currentFormData.fixedRent.isClassDeduction = ''
      this.itemIndex++
      this.itemCount++
      this.commissionType = val.commissionType
    },
    // 是否商品类扣
    whether(val) {
      this.itemIndex++
      this.itemCount++
      /*    枚举
     是否商品类扣：  0 是 1 否
      */
      this.isWhether = val.isClassDeduction
    }
  }

}
</script>
