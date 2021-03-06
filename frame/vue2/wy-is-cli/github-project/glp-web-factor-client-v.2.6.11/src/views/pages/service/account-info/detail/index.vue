<template>
  <div>
    <glp-card title="主体基础信息详情" class="mt-4">
        <div slot="title"><span>基本信息</span></div>
        <detail-form :def="baseFormDefs" ref="baseRef" :dataSource="baseForm"  label-width="140px"></detail-form>
    </glp-card>
    <glp-card title="开票信息" class="mt-4">
      <detail-form :def="billingFormDefs" :dataSource="billingForm"  label-width="140px"></detail-form>
    </glp-card>
    <glp-card title="银行账户信息" class="mt-4">
      <detail-form :def="bankFormDefs" :dataSource="bankForm"  label-width="140px"></detail-form>
    </glp-card>
    <glp-card class="mt-4">
        <div slot="title"><span>业务经办联系人信息</span></div>
      <detail-form :def="contactFormDefs" :dataSource="contactForm"  label-width="140px"></detail-form>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { baseFormDefs, billingFormDefs, bankFormDefs, contactFormDefs } from './config'
import { submitForm, getBaseCustomerInfo } from '@/api/customerInfo'
import { getCities, getCounties } from '@/config/region'
import { d, datetime } from '@/config/form'

@Component
export default class Product extends Vue {
  @Ref() baseRef!: any

  @Prop() id!: any

  baseForm: Record<string|number, any> = {}

  billingForm: Record<string|number, any> = {}

  bankForm: Record<string|number, any> = {}

  contactForm: Record<string|number, any> = {}

  baseFormDefs = baseFormDefs

  billingFormDefs = billingFormDefs

  bankFormDefs = bankFormDefs

  contactFormDefs = contactFormDefs

  $style!: any

  addressChar: any = ''

  detailData: Record<string|number, any> = {}

  provinceObj: any = ''

  address: Array<any> = []

  deliveryAddress: Array<any> = []

  deliveryAddressChar: any = ''

  userInfo: any = ''

  queryBaseCustomerInfo () {
    this.userInfo = this.$auth?.principle?.user?.userInfo
    getBaseCustomerInfo({ customerId: this.userInfo?.id }).then((data) => {
      this.detailData = data
      this.address = data.address.split(',')
      this.addressChar = this.getAddress(this.address, data.addressDetail)
      const deliveryAddress = [data.deliveryAddressProvince, data.deliveryAddressCity, data.deliveryAddressCounty]
      this.deliveryAddressChar = this.getAddress(deliveryAddress, data.deliveryDetailAddress)
      this.baseForm = {
        addressId: data.addressId,
        addressChar: this.addressChar,
        certificateId: data.certificateId,
        enterpriseFax: data.enterpriseFax,
        enterpriseNature: data.enterpriseNature,
        lawPersonMobile: data.lawPersonMobile,
        lawPersonName: data.lawPersonName,
        name: data.name
      }
      this.billingForm = {
        invoiceName: data.invoiceName,
        taxpayerIdentificationNumber: data.taxpayerIdentificationNumber
      }
      this.bankForm = {
        bankAccountName: data.bankAccountName,
        bankAccountNumber: data.bankAccountNumber,
        bankBranchName: data.bankBranchName,
        bankCity: data.bankCity,
        bankName: data.bankName,
        bankProvince: data.bankProvince
      }
      this.contactForm = {
        contactEmail: data.contactEmail,
        contactMobile: data.contactMobile,
        contactName: data.contactName,
        // deliveryAddress: data.deliveryAddress,
        deliveryAddressChar: this.deliveryAddressChar
      }
    })
  }

  getAddress (address: any, addressDetail: any) {
    let addressChar: any = ''
    const provinceArr: any = Object.entries(this.provinceObj).find((v) => v[0] === address[0])
    const cityObj: any = getCities(provinceArr[0])
    const cityArr: any = Object.entries(cityObj).find((v) => v[0] === address[1])
    const countyObj: any = getCounties(cityArr[0])
    const countyArr: any = Object.entries(countyObj).find((v) => v[0] === address[2])
    addressChar = provinceArr[1] + cityArr[1] + countyArr[1] + addressDetail
    return addressChar
  }

  onSubmit () {
    delete this.baseForm.addressChar
    const params = {
      id: this.userInfo?.id,
      baseInformation: this.baseForm,
      bankAccountInfor: this.bankForm,
      contactInfo: this.contactForm,
      invoiceName: this.billingForm.invoiceName,
      taxpayerIdentificationNumber: this.billingForm.taxpayerIdentificationNumber
    }
    submitForm(params).then((data) => {
      this.$message({
        message: '编辑成功',
        type: 'success',
        onClose: () => {
          console.log(2)
        },
        duration: 1500
      })
    })
  }

  mounted () {
    this.provinceObj = d('_province')
    this.queryBaseCustomerInfo()
  }
}
</script>
<style lang="scss" module>
.spanText {
  color: #FF902A; font-size: 14px;margin-left:20px;
}
</style>
