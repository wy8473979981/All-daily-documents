<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更审核
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="ContractChangeExamine"
      @examineOver="examineOver"
    />
  </div>
</template>

<script>
import { contractChangeApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ContractChangeExamine',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      id: 0,
      // 判断是编辑页面还是新增页面
      editOrAddStatus: false,
      formData: {
        essentialData: {}, // 基本信息
        businessAffairs: {
          tableList: []
        }, // 商务信息
        leaseArea: {
          tableList: []
        }, // 租赁区域
        rentYears: {
          tableList: []
        }, // 租期
        rentFreePeriod: {
          formInfo: {},
          tableList: []
        }, // 免租期
        fixedRent: {
          formDiffList: [],
          beforeList: [],
          afterList: []
        }, // 固定租金
        commissionRent: {
          formDiffList: [],
          beforeList: [],
          afterList: []
        }, // 提成租金,
        oneTimeFee: {
          tableList: []
        }, // 一次性费用
        bond: {
          tableList: []
        }, // 保证金
        firstAccountPeriod: {
          tableList: []
        }, // 首账单
        contractSignedParty: {
          tableList: []
        }
      }
    }
  },
  created() {
    this.contractChangeDiffDetailExamine()
  },
  methods: {
    contractChangeDiffDetailExamine() {
      const that = this
      const datas = {
        id: ''
      }
      // 发送修改后的数据，返回和原来数据相差的数据
      contractChangeApi.contractChangeDiffDetailExamine(datas).then(res => {
        if (res) {
          if (res.essentialData) {
            that.formData.essentialData = res.essentialData
          }
          if (res.businessAffairs) {
            that.formData.businessAffairs = res.businessAffairs
          }
          if (res.leaseArea) {
            that.formData.leaseArea = res.leaseArea
          }
          if (res.rentYears) {
            that.formData.rentYears = res.rentYears
          }
          if (res.rentFreePeriod) {
            that.formData.rentFreePeriod = res.rentFreePeriod
          }
          if (res.fixedRent) {
            that.formData.fixedRent = res.fixedRent
          }
          if (res.commissionRent) {
            that.formData.commissionRent = res.commissionRent
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
          if (res.contractSignedParty) {
            that.formData.contractSignedParty = res.contractSignedParty
          }
          that.update++
        }
      })
    },
    // 审核完毕
    examineOver() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
