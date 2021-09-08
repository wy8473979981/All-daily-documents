<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 14:08:18
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-09-03 17:40:25
-->
<template>
  <!-- :examine-page="examinePage" -->
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      v-bind="$attrs"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      accessory="AgreementOfintent"
      @change="handleDataChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <!-- <div v-if="$route.query.id">
          <ysn-btn class="mr-8">查看历史合同</ysn-btn>
          <ysn-btn class="mr-8">查看文本</ysn-btn>
          <ysn-btn class="mr-16" type="delete">删除</ysn-btn>
        </div> -->
        <!-- 审批按钮显示 -->
        <!-- <div v-if="$route.query.approveId">
          <ysn-dialog title="费用明细" width="900px">
            <ysn-btn class="mr-8">台账测算</ysn-btn>
            <template #contain>
              <ysn-tabs
                v-model="tabs_active"
                :list="tabs_list"
                @input="handleChange"
              />
              <ysn-table
                class="mt-20"
                :checkbox="false"
                :data="table"
                :column="tableConfig"
              />
            </template>
            <template #btn />
          </ysn-dialog>
          <ysn-btn class="mr-8" @click="contract">查看历史合同</ysn-btn>
          <ysn-btn class="mr-8" @click="examine">审核记录</ysn-btn>
          <ysn-btn class="mr-8">查看文本</ysn-btn>
        </div> -->
        <!-- 新增 -->
        <div v-if="$route.query.contNoIntent">
          <ysn-dialog title="费用明细" width="900px">
            <ysn-btn v-if="hasMenu" class="mr-8">台账测算</ysn-btn>
            <template #contain>
              <ysn-tabs
                v-model="tabs_active"
                :list="tabs_list"
                @input="handleChange"
              />
              <ysn-table
                class="mt-20"
                :checkbox="false"
                :data="table"
                :column="tableConfig"
              />
            </template>
            <template #btn />
          </ysn-dialog>
          <ysn-btn class="mr-16" @click="storage">暂存</ysn-btn>
          <ysn-btn v-if="hasMenu" class="mr-8" @click="exam">发起审核</ysn-btn>
          <!-- <ysn-btn v-if="hasMenu" class="mr-16" @click="handlerClick">提交</ysn-btn> -->
          <!-- <ysn-btn v-if="hasMenu" class="mr-8" @click="contract">查看历史合同</ysn-btn> -->
          <!-- <ysn-btn v-if="hasMenu" type="delete" class="mr-8" @click="remove">删除</ysn-btn> -->
        </div>
        <!-- 驳回  编辑-->
        <div v-if="$route.query.id">
          <ysn-dialog title="费用明细" width="900px">
            <ysn-btn v-if="hasMenu" class="mr-8">台账测算</ysn-btn>
            <template #contain>
              <ysn-tabs
                v-model="tabs_active"
                :list="tabs_list"
                @input="handleChange"
              />
              <ysn-table
                class="mt-20"
                :checkbox="false"
                :data="table"
                :column="tableConfig"
              />
            </template>
            <template #btn />
          </ysn-dialog>
          <ysn-btn class="mr-16" @click="resubmit">重新提交</ysn-btn>
          <ysn-btn class="mr-8">查看文本</ysn-btn>
          <ysn-btn class="mr-8" @click="examine">审核记录</ysn-btn>
          <ysn-btn type="delete" class="mr-8" @click="remove">删除</ysn-btn>
        </div>
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
    <ysn-confirm
      ref="confirm"
      title="提示"
      width="484px"
      top="120px"
      :content="tip"
      tip="继续操作将初始化各类费项，是否操作。"
      confirm-text="确定操作"
      cancel-text="暂不操作"
      @confirm="deleteSelect"
    />
    <ysn-confirm
      ref="delete"
      title="提示"
      width="484px"
      top="120px"
      content="是否删除该记录"
      confirm-text="取消"
      cancel-text="确定"
      @cancel="deleteData"
    />

  </div>
</template>
<script>
import { getOptionsLabel } from '@/filters/index'
// 请求api
import { pageConfig } from './config'
import { groupingSchemeListAdd, agreementOfIntentDetailsApi } from '@/api'
export default {
  name: 'AgreementOfIntentAdd',
  data() {
    return {
      tabs_active: 0,
      tabs_list: [ // 台账测算切换
        {
          label: '全部'
        },
        {
          label: '租金'
        },
        {
          label: '场地租赁费'
        },
        {
          label: '保证金'
        },
        {
          label: '一次性'
        }
      ],
      tableConfig: [ // 台账测算配置
        { createTime: '序号', type: 'index' },
        { conFeeType: '费用类型', isShow: true },
        { receivableTime: '应收日期', isShow: true },
        { accountTimeStart: '账期', isShow: true }, // TODO 两个字段链接起来 开始～结束 accountTimeStart accountTimeEnd
        { receivableMoney: '应收金额', isShow: true },
        { financialDate: '权责月', isShow: true }
      ],
      table: [ // 台账测算数据
        { conFeeType: '租赁保证金', receivableTime: '2023-12-12', accountTimeStart: '2021-1-1～2022-1-1', receivableMoney: '2343,1212.00', financialDate: '2021-10' },
        { conFeeType: '租赁保证金', receivableTime: '2023-12-12', accountTimeStart: '2021-1-1～2022-1-1', receivableMoney: '2343,1212.00', financialDate: '2021-10' },
        { conFeeType: '租赁保证金', receivableTime: '2023-12-12', accountTimeStart: '2021-1-1～2022-1-1', receivableMoney: '2343,1212.00', financialDate: '2021-10' }
      ],
      dictionaries: {
        programName: {
          name: '项目名称',
          list: this.$PUBFN.getOptionsList('projectName')
        },
        tenantName: {
          name: '商家名称'
        },
        signedId: {
          name: '合同签署',
          list: this.$PUBFN.getOptionsList('contractSign')
        },
        leaseArea: {
          name: '租赁区域'
        },
        isRentShop: {
          name: '分铺计租',
          list: this.$PUBFN.getOptionsList('isRentShop')
        },
        contBeginDate: {
          name: '合同开始日期'
        },
        contEndDate: {
          name: '合同结束日期'
        },
        meterRentBeginDate: {
          name: '租金起计日'
        },
        managementBeginDate:
        {
          name: '物管费起计日'
        }
      },
      tip: '',
      list: [],
      falt: false,
      copyObj: {},
      obj: {},
      isfalg: 0,
      update: 0,
      edit: false, // 区分编辑 新增
      hasMenu: false, // 是否显示左侧菜单
      // 统一数据
      formData: {
        dataRes: {}, // 保存一份页面配置信息数据
        essentialData: { // 基本信息
          programName: '', // 项目名称
          intentProtocolName: '', // 意向名称
          tenantName: '', // 商家名称
          brandName: '', // 品牌名
          brandFormatName: '', // 签约业务
          programOperateStatus: '', // 经营状态
          taxTypeId: '', // 计税类型
          centralizedId: '', // 收银类型
          signedId: '', // 合同签署
          attributeId: '', // 合同属性
          textType: '' // 文本类型
          // centralizedId: '444'
        },
        businessAffairs: { // 商务信息
          leaseArea: [], // 租赁区域
          spaceEquityNature: '', // 产权类型
          areaIdType: '', // 计租面积类型
          spaceFormatNamePlan: '', // 规划业态
          spaceGrossArea: '', // 建筑面积
          spaceNetArea: '', // 套内面积
          meterRentArea: '', // 计租面积
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
          isRentShop: 1,
          // fileUpload: []
          fileUpload: [
            // { name: 'food.jpeg', url: 'url1' },
            // { name: 'food2.jpeg', url: 'url2' }
          ]

        },
        startingDate: {
          meterRentBeginDate: '', // 租金起计日
          managementBeginDate: '' // 物管费起计日
        },

        shopBudget: {
          shopBudget: [{ name: '租金' }]
        }, // 铺位预算  TODO 这里的字段需要真实接口返回，前端数据组装

        projectBudget: [{ name: '租金' }, { name: '物管' }], // 项目预算本年 TODO 这里的字段需要真实接口返回，前端数据组装
        fixedRent: { // 固定租金
          fixedRent: {
            t0: '', // TODO 字段未找到
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
          tableList: [{ leaseArea: '', standardunitprice: 299, t1: '', tax: '', t7: '' }],
          sommission: {
            t0: '', // TODO 字段未找到
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

          list: [{ leaseArea: '', standardunitprice: 299, t1: '', tax: '', t7: '' }]

          // list: [{ leaseArea: '租赁区域', 标准单价: 'xxxx', t1: 'xxx', tax: '税率', t7: 'xxx' }]
        },
        rentFreePeriod: { // 免租期
          rentFreePeriod: [
            { leaseArea: '', id: 1, freeScope: '', freeStartDate: '', freeEndDate: '', apply: '' }
            // { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' },
            // { leaseArea: '铺位区域1', id: '1', freeScope: '', freeStartDate: '2020-12-12', freeEndDate: '2020-12-13', apply: '' }
          ]
        },
        oneTimeFee: { // 一次性费用
          oneTimeFee: [
            { conFeeType: '收款项目一', commDiscountApply: '', latestpaymentDate: '', invoiceTypeId: '', tax: '' }
          ]
        },
        bond: { // 保证金
          bond: [{ conFeeType: '收款项目一', receivableMoney: '', latestpaymentDate: '', invoiceTypeId: '' }]
        },
        firstAccountPeriod: { // 首账期
          firstAccountPeriod: [{ conFeeType: '收款项目一', paymentBegin: '', paymentEnd: '', firstPaymentDate: '', paymentTotalAmount: '', tax: '' }]
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
    // examinePage() {
    //   console.log(this.$route.query.approveId)
    //   console.log(this.$route.query.id)
    //   return 'AgreementOfIntentExamine'
    // },
    // 左侧按钮导航配置
    pageConfig: function() {
      console.log(this.formData.dataRes)
      return pageConfig.call(this, this.hasMenu, this.formData.essentialData.signedId, this.edit, this.formData.dataRes)
    }
  },
  mounted() {
    // this.$refs.pageDetail.clearValidate() // 清楚校验
    // console.log('清楚校验', this.$refs.pageDetail)
    // console.log(this.$route.query.Edit)
    if (this.$route.query.id) {
      this.hasMenu = true
      agreementOfIntentDetailsApi.agreementOfIntentDetails({ id: 3 }).then(res => {
        this.formData = res
        const shopBudget = res.shopBudget.shopBudget
        console.log(shopBudget)
        const list = []
        for (let i = 0; i < shopBudget.length; i++) {
          if (i === 0) {
            list.push(
              { name: '租金',
                rentCalculation: shopBudget[i].rentBudgetUnitPrice,
                architecture: shopBudget[i].rentApplyUnitPrice,
                sleeve: shopBudget[i].rentBudgetIncome,
                other: shopBudget[i].rentApplyAnnualIncome,
                average: shopBudget[i].rentalIncomeDifferences
              }
            )
          }
          if (i === 1) {
            list.push(
              { name: '物管',
                rentCalculation: shopBudget[i].propertyManagementBudgetIncome,
                architecture: shopBudget[i].propertyManagementApplyUnitPrice,
                sleeve: shopBudget[i].propertyManagementBudgetIncome,
                other: shopBudget[i].propertyManagementApplyAnnualIncome,
                average: shopBudget[i].propertyIncomeReachRate
              }
            )
          }
        }
        this.formData.shopBudget.shopBudget = list
        this.formData.firstAccountPeriod = res.firstAccountPeriod
        console.log(this.formData)
        this.update++
      })
      this.edit = true
      // 走编辑
      return
    }
    // this.edit = false
    if (this.$route.query.contNoIntent) {
      groupingSchemeListAdd.brandPositioningDetail({ id: 1 }).then(res => {
        this.formData.dataRes = res
        this.formData.essentialData = res.contract
        this.formData.businessAffairs.areaIdType = res.contract.areaType
        console.log(this.formData.businessAffairs)
        this.formData.fixedRent.add = res.reimbursement.tableData[0].setPromotional
        this.formData.essentialData.signedId = 2 // 数据返回的中文 先写死
        this.update++
      })
    }
    // 审批中
    if (this.$route.query.approveId) {
      this.hasMenu = true
      agreementOfIntentDetailsApi.agreementOfIntentDetails({ id: 3 }).then(res => {
        this.formData = res
        const shopBudget = res.shopBudget.shopBudget
        console.log(shopBudget)
        const list = []
        for (let i = 0; i < shopBudget.length; i++) {
          if (i === 0) {
            list.push(
              { name: '租金',
                rentCalculation: shopBudget[i].rentBudgetUnitPrice,
                architecture: shopBudget[i].rentApplyUnitPrice,
                sleeve: shopBudget[i].rentBudgetIncome,
                other: shopBudget[i].rentApplyAnnualIncome,
                average: shopBudget[i].rentalIncomeDifferences
              }
            )
          }
          if (i === 1) {
            list.push(
              { name: '物管',
                rentCalculation: shopBudget[i].propertyManagementBudgetIncome,
                architecture: shopBudget[i].propertyManagementApplyUnitPrice,
                sleeve: shopBudget[i].propertyManagementBudgetIncome,
                other: shopBudget[i].propertyManagementApplyAnnualIncome,
                average: shopBudget[i].propertyIncomeReachRate
              }
            )
          }
        }
        this.formData.shopBudget.shopBudget = list
        this.formData.firstAccountPeriod = res.firstAccountPeriod
        console.log(this.formData)
        this.update++
      })
    }
  },
  methods: {
    examine() {
      this.$router.push({ name: 'AgreementOfIntentExamine' })
    },
    // 重新提交
    resubmit() {
      this.$message({
        message: '提交成功～',
        type: 'success'
      })
      this.$router.push({ name: 'AgreementIntention' })
    },
    // 查看历史合同
    contract() {
      const routeUrl = this.$router.resolve({
        name: 'HoldinveStmentdue',
        query: { id: this.$route.query.id ? this.$route.query.id : this.$route.query.contNoIntent ? this.$route.query.contNoIntent : this.$route.query.approveId ? this.$route.query.approveId : '' }
      })
      window.open(routeUrl.href, '_blank')
    },
    // 删除
    remove() {
      this.$refs.delete.handleVisible()
    },
    // 暂存
    storage() {
      if (this.formData.essentialData.programName) {
        this.$router.push({ name: 'AgreementIntention' })
        return
      }
      this.$message.error('请填写项目信息')
    },
    deleteData() { this.$router.push({ name: 'AgreementIntention' }) },
    handleChange(event) {
      console.log(event)
    },
    closeDialogTwo() {
      this.falt = !this.falt
    },
    deleteSelect() {
      this.obj =
        {
          programName: this.formData.essentialData.programName,
          tenantName: this.formData.essentialData.tenantName,
          signedId: this.formData.essentialData.signedId,
          leaseArea: this.formData.businessAffairs.leaseArea,
          isRentShop: this.formData.businessAffairs.isRentShop,
          contBeginDate: this.formData.businessAffairs.contBeginDate,
          contEndDate: this.formData.businessAffairs.contEndDate,
          meterRentBeginDate: this.formData.businessAffairs.meterRentBeginDate,
          managementBeginDate: this.formData.businessAffairs.managementBeginDate
        }
      this.formData.fixedRent = { // 固定租金
        fixedRent: {
          t0: '', // TODO 字段未找到
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
        tableList: [{ leaseArea: '', standardunitprice: 299, t1: '', tax: '', t7: '' }],
        sommission: {
          t0: '', // TODO 字段未找到
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

        list: [{ leaseArea: '', standardunitprice: 299, t1: '', tax: '', t7: '' }]
      }
      this.falt = !this.falt
      this.hasMenu = !this.hasMenu
    },
    no() { this.falt = !this.falt },
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
    isObjEqual(obj, copyobj) {
      this.list = []
      this.tip = ''
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (obj[keys[i]] instanceof Array) {
          if (JSON.stringify(obj[keys[i]].sort()) !== JSON.stringify(copyobj[keys[i]].sort())) {
            this.list.push({ x: obj[keys[i]], y: copyobj[keys[i]], name: keys[i] })
          }
        } else {
          if (obj[keys[i]] !== copyobj[keys[i]]) {
            this.list.push({ x: obj[keys[i]], y: copyobj[keys[i]], name: keys[i] })
          }
        }
      }
      if (this.list.length === 0) {
        return true
      }
      console.log(this.list)
      for (let i = 0; i < this.list.length; i++) {
        console.log(this.dictionaries[this.list[i].name])
        const label1 = typeof this.list[i].x === 'number' ? getOptionsLabel(this.list[i].x, this.dictionaries[this.list[i].name].list) : this.list[i].x
        const label2 = typeof this.list[i].y === 'number' ? getOptionsLabel(this.list[i].y, this.dictionaries[this.list[i].name].list) : this.list[i].y
        this.tip += ` ${this.dictionaries[this.list[i].name].name}字段由${label2}改为${label1}<br/>`
      }
      console.log(this.tip)
      return false
    },
    async lower() {
      console.log(this.tip)
      // this.isObjEqual(obj)
      // this.hasMenu = !this.hasMenu
      // return
      this.$nextTick(async() => {
        const res = await this.$refs.pageDetail.valiFormDate()
        console.log(res)
        if (res) {
          this.isfalg++
          // if (!this.isObjEqual(this.copyObj, this.obj)) {
          //   this.falt = !this.falt
          //   return
          // }

          if (this.isfalg === 1) {
            this.obj =
          {
            programName: this.formData.essentialData.programName,
            tenantName: this.formData.essentialData.tenantName,
            signedId: this.formData.essentialData.signedId,
            leaseArea: this.formData.businessAffairs.leaseArea,
            isRentShop: this.formData.businessAffairs.isRentShop,
            contBeginDate: this.formData.businessAffairs.contBeginDate,
            contEndDate: this.formData.businessAffairs.contEndDate,
            meterRentBeginDate: this.formData.businessAffairs.meterRentBeginDate,
            managementBeginDate: this.formData.businessAffairs.managementBeginDate
          }
          }
          if (this.isfalg > 1) {
            this.copyObj =
          {
            programName: this.formData.essentialData.programName,
            tenantName: this.formData.essentialData.tenantName,
            signedId: this.formData.essentialData.signedId,
            leaseArea: this.formData.businessAffairs.leaseArea,
            isRentShop: this.formData.businessAffairs.isRentShop,
            contBeginDate: this.formData.businessAffairs.contBeginDate,
            contEndDate: this.formData.businessAffairs.contEndDate,
            meterRentBeginDate: this.formData.businessAffairs.meterRentBeginDate,
            managementBeginDate: this.formData.businessAffairs.managementBeginDate
          }
            // console.log(this.isObjEqual(this.copyObj, this.obj))
            if (!this.isObjEqual(this.copyObj, this.obj)) {
              this.$refs.confirm.handleVisible()
              return
            }
          }

          // console.log(this.isObjEqual(this.copyObj, this.obj))
          this.hasMenu = !this.hasMenu
          this.update++
          // console.log(this.pageConfig)
        }
      })
    },
    upper() {
      this.hasMenu = !this.hasMenu
    },
    handleDataChange(val) {
      this.formData = val
    },
    // 发起审核
    exam() {
      this.$router.replace({ name: 'AgreementOfIntentAdd', query: { id: '1' }})
    }
  }
}
</script>
