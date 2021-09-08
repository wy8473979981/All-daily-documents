<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:08:18
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-16 17:52:19
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      v-bind="$attrs"
      :config="pageConfig"
      :has-menu="hasMenu"
      @change="handleDataChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-16" @click="handlerClick">暂存</ysn-btn>
        <ysn-btn type="reset" @click="handlerClick">附件管理</ysn-btn>
      </template>

      <!-- 操作插槽 -->
      <template #operation>
        <div class="text-center">
          <div class="color-0c66ff text-12 mb-16">操作说明：进入下一步后，将禁用基本信息和商务信息的编辑功能</div>
          <ysn-btn v-if="hasMenu" @click="upper">上一步</ysn-btn>
          <ysn-btn v-if="!hasMenu" @click="lower">下一步</ysn-btn>
        </div>
      </template>

    </ysn-pageAccorDetail>

  </div>
</template>
<script>

// 请求api
import { pageConfig } from './config'
export default {
  name: 'AgreementOfIntentAdd',
  props: {},
  data() {
    return {
      edit: false, // 区分编辑 新增
      hasMenu: false, // 是否显示左侧菜单
      // 统一数据
      formData: {
        essentialData: { // 基本信息
          programName: '', // 项目名称
          intentProtocolName: '', // 意向名称
          tenantName: '', // 商家名称
          brandName: '', // 品牌名
          brandFormatName: '', // 签约业务
          programOperateStatus: '', // 经营状态
          taxTypeId: '333', // 计税类型
          centralizedId: '444', // 收银类型
          signedId: 2, // 合同签署
          attributeId: '甲方222', // 合同属性
          textType: '' // 文本类型
          // centralizedId: '444'
        },
        businessAffairs: { // 商务信息
          leaseArea: [], // 租赁区域
          spaceEquityNature: '', // 产权类型
          areaIdType: '2', // 计租面积类型
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
          decoratePeriod: '1', // 装修期
          rentYears: '1', // 租期
          meterRentBeginDate: '', // 租金起计日
          managementBeginDate: '', // 物管费起计日
          isRentShop: '1',
          // fileUpload: []
          fileUpload: [
            // { name: 'food.jpeg', url: 'url1' },
            // { name: 'food2.jpeg', url: 'url2' }
          ]

        },

        shopBudget: [{ name: '租金' }], // 铺位预算  TODO 这里的字段需要真实接口返回，前端数据组装

        projectBudget: [{ name: '租金' }, { name: '物管' }], // 项目预算本年 TODO 这里的字段需要真实接口返回，前端数据组装
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
            // { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' },
            // { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' }
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
            { totalLeaseCompletionRate: 'xxx', t1: 'xxxxx' }
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
        }
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
    // console.log(this.$route.query.Edit)
    if (this.$route.query.id) {
      this.edit = true
      // 走编辑
      return
    }
    this.edit = false
  },
  methods: {
    // handlerClick() {
    //   console.log(this.formData)
    //   const res = await this.$refs.pageDetail.valiFormDate()
    // },
    async handlerClick() {
      this.$nextTick(async() => {
        const res = await this.$refs.pageDetail.valiFormDate()
        console.log(res)
        if (res) {
          this.$router.push({ name: 'AgreementIntention' })
        }
      })
    },
    async lower() {
      this.hasMenu = !this.hasMenu
      // this.$nextTick(async() => {
      //   const res = await this.$refs.pageDetail.valiFormDate()
      //   console.log(res)
      //   if (res) {
      //     this.hasMenu = !this.hasMenu
      //     console.log(this.pageConfig)
      //   }
      // })
    },
    upper() {
      this.hasMenu = !this.hasMenu
    },
    handleDataChange(val) {
      this.formData = val
    },
    // 发起审核
    examine() {
      this.$router.replace({ name: 'AgreementOfIntentAdd', query: { id: '1' }})
    }
  }
}
</script>
