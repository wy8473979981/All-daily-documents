<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更新增
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="ContractTermination"
      accessory="AgreementOfintent"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="preview">变更预览</ysn-btn>
        <ysn-btn class="mr-12" type="info" @click="saveBox('save')">暂存</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { agreementOfIntentDetailsApi, contractChangeApi } from '@/api'
import {
  startPageConfig,
  commissionRentPageConfig,
  fixedRentPageConfig,
  endPageConfig,
  partyBsContractConfig, businessConfig
} from './config'

export default {
  name: 'ContractChangeTermAdd',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      startPageConfig: startPageConfig.call(this),
      fixedRentPageConfig: fixedRentPageConfig.call(this),
      commissionRentPageConfig: commissionRentPageConfig.call(this),
      endPageConfig: endPageConfig.call(this),
      businessConfig: businessConfig.call(this),
      partyBsContractConfig: partyBsContractConfig.call(this),
      contNo: 0,
      // 判断是编辑页面还是新增页面
      editOrAddStatus: false,
      formData: {
        essentialData: {
          programName: '', // 项目名称
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
        }, // 基本信息
        businessAffairs: {
          leaseArea: [], // 租赁区域
          spaceEquityNature: '', // 产权类型
          areaIdType: Math.random(), // 计租面积类型
          spaceFormatNamePlan: '', // 规划业态
          spaceGrossArea: '', // 建筑面积
          spaceNetArea: '', // 套内面积
          meterRentArea: '', // 计租面积
          appointDate: '', // 交付日
          decorationEnterDate: '', // 装修进场日
          decorateEndDate: '', // 装修结束日
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          decoratePeriod: '', // 装修期
          rentYears: '', // 租期
          isRentShop: '1',
          // fileUpload: []
          fileUpload: [
            // { name: 'food.jpeg', url: 'url1' },
            // { name: 'food2.jpeg', url: 'url2' }
          ]
        }, // 商务信息
        rentFreePeriod: {
          cycleBeginDate: '',
          rentFreePeriod: [
            { leaseArea: '', id: 1, freeScope: [], freeStartDate: '', freeEndDate: '', apply: '' }
          ]
        }, // 免租期
        beginDate: {
          freeNameBeginDate: []
        },
        periodic: {
          algorithmId: '' // 收费方式
        }, // 周期型费用
        fixedRent: {
          standardUnitPrice: '', // 标准单价
          fixedPaymentCycleId: '', // 支付周期
          cycleType: '', // 周期类型
          collectId: '', // 账期模式
          n: '', // n期
          paymentUnitId: '', // 单价
          latestpaymentDay: '', // 最迟缴费日
          tax: '', // 税率
          invoiceTypeId: '', // 票据类型
          tableList: [{ leaseArea: '', standardUnitPrice: '', period: ['0', '0'], tax: '税率', t7: 'xxx' }]
        },
        commissionRent: {
          standardUnitPrice: '', // 标准单价
          deductPaymentCycleId: '', // 提成支付周期
          salesTaxRate: '', // 销售额税率
          commissionType: '', // 提成类型
          isClassDeduction: '', // 是否有品类扣
          cycleType: '', // 周期类型
          collectId: '', // 账期模式
          n: '', // n期
          class: '', // 品类
          monthlyEstimatedTurnover: '', // 月预估营业额
          commDiscount: '', // 扣率
          paymentUnitId: '', // 单价
          latestpaymentDay: '', // 最迟缴费日
          tax: '', // 税率
          invoiceTypeId: '', // 票据类型
          comCalculaRules: '', // 提成计算规则
          tableList: [{ leaseArea: '', standardUnitPrice: '', t1: 'xxx', tax: '税率', t7: 'xxx' }]
        },
        oneTimeFee: {
          oneTimeFee: [
            { conFeeType: '', commDiscountApply: '', latestpaymentDate: '', invoiceTypeId: '', tax: '', paymentTotalAmount: '' }
          ]
        }, // 一次性费用
        bond: {
          bond: [{ conFeeType: '', receivableMoney: '', latestpaymentDate: '', invoiceTypeId: '', paymentTotalAmount: '' }]
        }, // 保证金
        firstAccountPeriod: {
          firstAccountPeriod: [{ conFeeType: '', paymentBegin: '', paymentEnd: '', firstPaymentDate: '', paymentTotalAmount: '', tax: '' }]
        }, // 首账单
        partyAsContract: {
          firstPartyName: '', // 甲方名称
          firstpartyUnifiedSocialCreditCode: '', // 统一社会代码/身份证
          firstpartyTel: '', // 联系电话
          firstpartyEmail: '', // 邮箱地址
          firstpartyAddress: '' // 甲方地址
        }, // 甲方合同信息
        partyBsContract: {
          firstPartyName: '', // 乙方名称
          firstpartyUnifiedSocialCreditCode: '', // 统一社会信用代码/身份证
          firstpartyTel: '', // 联系电话
          firstpartyEmail: '', // 邮箱地址
          firstpartyAddress: '' // 乙方地址
        }, // 乙方合同
        businessInvoice: { // 商家开票
          tenantName: '', // 开票名称 TODO 字段未找到
          tenantLetterheadUnifiedSocialCreditCode: '', // 统一社会代码/身份证
          tenantLetterheadBankname: '', // 开户银行
          tenantLetterheadBankaccount: '', // 银行账号
          tenantLetterheadTel: '', // 联系电话
          tenantLetterheadAddress: '' // 商家地址
        },
        merchantContract: { // 商家合同
          tenantName: '1', // TODO 字段未找到
          tenantContractName: '', // 合同抬头
          tenantContractTel: '', // 合同电话
          tenantContractPerson: '', // 联系人
          tenantContractFax: '', // 传真
          tenantContractEmail: '' // 邮箱
        },
        attachmentList: {
          fileList: []
        }
      },
      isShowDialog: false
    }
  },
  computed: {
    pageConfig() {
      let algorithmId = this.formData.periodic.algorithmId ? this.formData.periodic.algorithmId : ''
      let signedId = this.formData.essentialData.signedId ? this.formData.essentialData.signedId : ''
      this.$PUBFN.getOptionsList('chargingMethod').find((item) => {
        if (item.label === algorithmId) {
          algorithmId = item.value
          return item
        }
      })
      this.$PUBFN.getOptionsList('contractSign').find((item) => {
        if (item.label === signedId) {
          signedId = item.value
          return item
        }
      })
      let endConfig = []
      if (signedId === '2' || signedId === '' || signedId === 2) {
        endConfig = [
          ...this.endPageConfig,
          ...this.partyBsContractConfig,
          ...this.businessConfig
        ]
      } else {
        endConfig = [
          ...this.endPageConfig,
          ...this.businessConfig
        ]
      }
      if (algorithmId === '1' || algorithmId === '' || algorithmId === 1) {
        return [
          ...this.startPageConfig,
          ...this.fixedRentPageConfig,
          ...endConfig
        ]
      } else if (algorithmId === '2' || algorithmId === 2) {
        return [
          ...this.startPageConfig,
          ...this.commissionRentPageConfig,
          ...endConfig
        ]
      } else if (algorithmId === '3' || algorithmId === '4' || algorithmId === '5' || algorithmId === 3 || algorithmId === 4 || algorithmId === 5) {
        return [
          ...this.startPageConfig,
          ...this.fixedRentPageConfig,
          ...this.commissionRentPageConfig,
          ...endConfig
        ]
      } else {
        return [
          ...this.startPageConfig,
          ...endConfig
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.contNo = this.$route.query.id
      this.contractChangeDetail(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 获取详细数据
    contractChangeDetail(datas) {
      const that = this
      agreementOfIntentDetailsApi.agreementOfIntentDetails({ id: 4 }).then(res => {
        if (res.essentialData) {
          that.formData.essentialData = res.essentialData
        }
        if (res.businessAffairs) {
          that.formData.businessAffairs = res.businessAffairs
        }
        if (res.beginDate) {
          that.formData.beginDate = res.beginDate
        }
        if (res.rentFreePeriod) {
          that.formData.rentFreePeriod = res.rentFreePeriod
          that.update++
        }
        if (res.periodic) {
          that.formData.periodic = res.periodic
          that.formData.commissionRent = res.periodic.commissionRent
          that.formData.fixedRent = res.periodic.fixedRent
        }
        if (res.oneTimeFee) {
          that.formData.oneTimeFee = res.oneTimeFee
        }
        if (res.bond) {
          that.formData.bond = res.bond
        }
        if (res.firstAccountPeriod) {
          that.formData.firstAccountPeriod = res.firstAccountPeriod
        }
        if (res.partyAsContract) {
          that.formData.partyAsContract = res.partyAsContract
        }
        if (res.partyBsContract) {
          that.formData.partyBsContract = res.partyBsContract
        }
        if (res.businessInvoice) {
          that.formData.businessInvoice = res.businessInvoice
        }
        if (res.merchantContract) {
          that.formData.merchantContract = res.merchantContract
        }
        // if (res.attachmentList) {
        //   that.formData.attachmentList = res.attachmentList
        // }
        that.update++
      })
    },
    // 变更预览
    preview() {
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          const that = this
          const datas = {
            id: this.$route.query.id,
            formData: that.formData
          }
          // 发送修改后的数据，返回和原来数据相差的数据
          contractChangeApi.contractChangeDiffDetail(datas).then(res => {
            if (res) {
              setTimeout(() => {
                this.$router.push({
                  name: 'ContractChangePreview',
                  query: { id: this.$route.query.id },
                  params: { formData: res }
                })
              }, 1000)
            }
          })
        }
      })
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editStatus) {
            that.formData.submitType = 2
            that.formData.contNo = that.contNo
          } else {
            that.formData.submitType = submitType
          }
          that.contractChangeSave(that.formData)
        }
      })
    },
    // 保存的请求
    contractChangeSave(datas) {
      const that = this
      contractChangeApi.contractChangeSave(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    },
    // 获取商家合同信息
    contractChangeTenantContractInfo(row) {
      const datas = {
        tenantName: row.tenantName
      }
      contractChangeApi.contractChangeTenantContractInfo(datas).then(res => {
        if (res) {
          this.formData.businessContractInfo.tenantContractName = res.tenantContractName
          this.formData.businessContractInfo.firstpartyTel = res.firstpartyTel
          this.formData.businessContractInfo.firstpartyAddress = res.firstpartyAddress
          this.formData.businessContractInfo.tenantContractPerson = res.tenantContractPerson
          this.formData.businessContractInfo.tenantContractFax = res.tenantContractFax
          this.formData.businessContractInfo.firstpartyEmail = res.firstpartyEmail
        }
      })
    },
    // 数据变化事件
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>

<style scoped>

</style>
