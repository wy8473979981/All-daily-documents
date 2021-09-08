<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:08:18
 * @LastEditors: fhj
 * @LastEditTime: 2021-07-20 14:23:38
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      v-model="formData"
      v-bind="$attrs"
      :update="update"
      :config="pageConfig"
      :has-menu="hasMenu"
      accessory-disable
      accessory="AgreementOfintent"
      examine="AgreementOfintent"
      @change="handleDataChange"
    />

  </div>
</template>
<script>

// 请求api
import { pageConfig } from './config'
import { agreementOfIntentDetailsApi } from '@/api'
export default {
  name: 'AgreementOfIntentExamine',
  props: {},
  data() {
    return {
      update: 0,
      hasMenu: true, // 是否显示左侧菜单
      // 统一数据
      // 统一数据
      formData: {
        essentialData: { // 基本信息
          programName: '', // 项目名称
          intentProtocolName: '', // 意向名称
          tenantName: '', // 商家名称
          brandName: '', // 品牌名
          brandFormatName: '', // 签约业务
          programOperateStatus: '', // 经营状态
          taxTypeId: '', // 计税类型
          centralizedId: '', // 收银类型
          signedId: 2, // 合同签署
          attributeId: '', // 合同属性
          textType: '' // 文本类型
          // centralizedId: '444'
        },
        businessAffairs: { // 商务信息
          leaseArea: [], // 租赁区域
          spaceEquityNature: '', // 产权类型
          areaIdType: Math.random(), // 计租面积类型
          spaceFormatNamePlan: '1', // 规划业态
          spaceGrossArea: '1', // 建筑面积
          spaceNetArea: '2', // 套内面积
          meterRentArea: '3', // 计租面积
          appointDate: '', // 交付日
          decorationEnterDate: '', // 装修进场日
          decorateEndDate: '', // 装修结束日
          openDate: '', // 开业日
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          decoratePeriod: '', // 装修期
          rentYears: '', // 租期
          meterRentBeginDate: '', // 租金起计日
          managementBeginDate: '', // 物管费起计日
          isRentShop: '1',
          // fileUpload: []
          fileUpload: [
            // { name: 'food.jpeg', url: 'url1' },
            // { name: 'food2.jpeg', url: 'url2' }
          ]

        },

        shopBudget: [], // 铺位预算  TODO 这里的字段需要真实接口返回，前端数据组装

        projectBudget: [], // 项目预算本年 TODO 这里的字段需要真实接口返回，前端数据组装
        fixedRent: { // 固定租金
          fixedRent: {
            algorithmId: '', // 收费方式
            totalFixedRent: '', // 固定租金总金额
            deductPaymentCycleId: '', // 提成支付周期
            fixedPaymentCycleId: '', // 固定支付周期
            salesTaxRate: '', // 销售额税率
            commissionType: '', // 提成类型
            isClassDeduction: '', // 是否有品类扣
            cycleType: '', // 周期类型
            collectId: '', // 账期模式
            n: '', // n期
            paymentUnitId: '', // 单价
            latestpaymentDay: '', // 最迟缴费日
            tax: '', // 税率
            invoiceTypeId: '', // 票据类型
            discountReason: '', // 折扣原因
            addedInstructions: '', // 补充说明
            comCalculaRules: '' // 提成计算规则

          },
          tableList: [{ leaseArea: '租赁区域', 标准单价: 'xxxx', t1: 'xxx', tax: '税率', t7: 'xxx' }],
          sommission: {
            algorithmId: '', // 收费方式
            totalFixedRent: '', // 固定租金总金额
            deductPaymentCycleId: '', // 提成支付周期
            fixedPaymentCycleId: '', // 固定支付周期
            salesTaxRate: '', // 销售额税率
            commissionType: '', // 提成类型
            isClassDeduction: '', // 是否有品类扣
            cycleType: '', // 周期类型
            collectId: '', // 账期模式
            n: '', // n期
            paymentUnitId: '', // 单价
            latestpaymentDay: '', // 最迟缴费日
            tax: '', // 税率
            invoiceTypeId: '', // 票据类型
            discountReason: '', // 折扣原因
            addedInstructions: '', // 补充说明
            comCalculaRules: '' // 提成计算规则
          },
          list: [{ leaseArea: '租赁区域', 标准单价: 'xxxx', t1: 'xxx', tax: '税率', t7: 'xxx' }]
        },
        rentFreePeriod: { // 免租期
          rentFreePeriod: [
            { leaseArea: '', id: 1, freeScope: [], freeStartDate: '', freeEndDate: '', apply: '' }
          ]
        },
        oneTimeFee: { // 一次性费用
          oneTimeFee: [
            { conFeeType: '', commDiscountApply: '', latestpaymentDate: '', invoiceTypeId: '', tax: '' }
          ]
        },
        bond: { // 保证金
          bond: [{ conFeeType: '', receivableMoney: '', latestpaymentDate: '', invoiceTypeId: '' }]
        },
        firstAccountPeriod: { // 首账期
          firstAccountPeriod: [{ conFeeType: '', paymentBegin: '', paymentEnd: '', firstPaymentDate: '', paymentTotalAmount: '', tax: '' }]
        },
        partyAsContract: { // 甲方合同
          firstPartyName: '', // 甲方名称
          firstpartyUnifiedSocialCreditCode: '', // 统一社会代码/身份证
          firstpartyTel: '', // 联系电话
          firstpartyEmail: '', // 邮箱地址
          firstpartyAddress: '' // 甲方地址
        },
        oneShopOnePrice: { // 乙方合同
          firstPartyName: '', // 乙方名称
          firstpartyUnifiedSocialCreditCode: '', // 统一社会信用代码/身份证
          firstpartyTel: '', // 联系电话
          firstpartyEmail: '', // 邮箱
          firstpartyAddress: '' // 乙方地址
        },
        oneShopOnePricetrs: {
          oneShopOnePricetrs: [

          ]
        },
        businessInvoice: { // 商家开票
          BuildingName: '', // 开票名称 TODO 字段未找到
          tenantLetterheadUnifiedSocialCreditCode: '', // 统一社会代码/身份证
          tenantLetterheadBankname: '', // 开户银行
          tenantLetterheadBankaccount: '', // 银行账号
          tenantLetterheadTel: '', // 联系电话
          tenantLetterheadAddress: '' // 商家地址
        },
        merchantCcontract: { // 商家合同
          BuildingName: '1', // TODO字段未找到
          tenantContractName: '', // 合同抬头
          tenantContractTel: '', // 合同电话
          tenantContractPerson: '', // 联系人
          tenantContractFax: '', // 传真
          tenantContractEmail: '' // 邮箱
        },
        agreementOfIntentEarlyWarning: [],
        baseInfoCompare: []
      }
    }
  },
  computed: {
    // 左侧按钮导航配置
    pageConfig: function() {
      console.log(this.hasMenu)
      return pageConfig.call(this, this.hasMenu, this.formData.essentialData.signedId, this.edit)
    }
  },
  mounted() {
    agreementOfIntentDetailsApi.agreementOfIntentDetails({ id: 3 }).then(res => {
      this.formData.essentialData = res.essentialData
      this.formData.businessAffairs = res.businessAffairs
      this.formData.fixedRent = res.fixedRent
      this.formData.rentFreePeriod = res.rentFreePeriod
      this.formData.oneTimeFee = res.oneTimeFee
      this.formData.bond = res.bond
      this.formData.firstAccountPeriod = res.firstAccountPeriod
      this.formData.partyAsContract = res.partyAsContract
      this.formData.oneShopOnePrice = res.oneShopOnePrice
      this.formData.oneShopOnePricetrs = res.oneShopOnePricetrs
      this.formData.businessInvoice = res.businessInvoice
      this.formData.merchantCcontract = res.merchantCcontract
      this.formData.shopBudget = res.shopBudget.shopBudget
      this.formData.projectBudget = res.shopBudget.projectBudget
      agreementOfIntentDetailsApi.agreementOfIntentContractDiffData().then(res => {
        console.log(res)
        this.formData.agreementOfIntentEarlyWarning = res.agreementOfIntentEarlyWarning
        this.formData.baseInfoCompare = res.baseInfoCompare
        this.formData.shopBudget = res.shopBudget
        this.formData.projectBudget = res.projectBudget
        this.update++
      })
    })
  },
  methods: {
    handlerClick() {
      console.log(this.formData)
      this.update++
    },
    btn() {
      this.hasMenu = !this.hasMenu
      console.log(this.pageConfig)
    },
    handleDataChange(val) {
      this.formData = val
    },
    // 发起审核
    examine() {
      this.$router.replace({ name: 'AgreementOfIntentAdd', query: { Edit: '1' }})
    }
  }
}
</script>
