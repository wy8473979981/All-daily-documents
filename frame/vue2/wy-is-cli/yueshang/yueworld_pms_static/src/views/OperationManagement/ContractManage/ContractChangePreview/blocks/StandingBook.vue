<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-预览-台账
-->

<template>
  <div class="app-page-main">
    <ysn-tabs
      :list="tabsList"
      :active="active"
      @input="tabsChange"
    />
    <ysn-tabs
      class="mt-16"
      :list="conFeeTypeList"
      :active="conFeeTypeActive"
      @input="conFeeTypeTabsChange"
    />
    <div v-if="active==='试算台帐' || active==='变更前台账'">
      <ysn-formTable
        v-model="currentFormData"
        class="mt-16"
        prop="tableList"
        :column="standingBookTableConfig"
        :show-slot="['paymentDate']"
      >
        <template #paymentDate="scope">
          <div>{{ scope.row.paymentDateStart }}～{{ scope.row.paymentDateEnd }}</div>
        </template>
      </ysn-formTable>
    </div>
    <div v-else>
      <ysn-formTable
        v-model="currentFormData"
        class="mt-16"
        prop="tableList"
        :column="questionTableConfig"
        :show-slot="['paymentDate']"
      >
        <template #paymentDate="scope">
          <div>{{ scope.row.paymentDateStart }}～{{ scope.row.paymentDateEnd }}</div>
        </template>
      </ysn-formTable>
    </div>
  </div>
</template>

<script>

import { contractChangeApi } from '@/api'

export default {
  name: 'StandingBook',
  data() {
    return {
      tabsList: [
        {
          label: '试算台帐'
        },
        {
          label: '变更前台账'
        },
        {
          label: '问题数据'
        }
      ],
      active: '试算台帐',
      conFeeTypeList: [
        {
          label: '全部'
        },
        {
          label: '租金'
        },
        {
          label: '物管费'
        },
        {
          label: '推广费'
        },
        {
          label: '能耗'
        },
        {
          label: '保证金'
        },
        {
          label: '一次性费用'
        }
      ],
      conFeeTypeActive: '全部',
      standingBookTableConfig: [
        { receivableNo: '应收编号', itemType: 'text', sortable: true, isShow: true, width: 180 },
        { conFeeType: '收款项目', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { accrualDate: '权责月', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { paymentDate: '账期', sortable: true, isShow: true, width: 200, hasSlot: true },
        { latestpaymentDate: '应收日期', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { receivableMoney: '应收金额(元)', itemType: 'text', sortable: true, isShow: true, width: 130, type: 'money' },
        { taxAmount: '税额(元)', itemType: 'text', sortable: true, isShow: true, width: 100, type: 'money' },
        { tax: '税率', itemType: 'text', sortable: true, isShow: true, width: 100, type: 'rate' }
      ],
      questionTableConfig: [
        { receivableNo: '应收编号', itemType: 'text', sortable: true, isShow: true, width: 180 },
        { conFeeType: '收款项目', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { accrualDate: '权责月', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { paymentDate: '账期', sortable: true, isShow: true, width: 200, hasSlot: true },
        { latestpaymentDate: '应收日期', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { receivableMoney: '应收金额(元)', itemType: 'text', sortable: true, isShow: true, width: 130, type: 'money' },
        { verificationType: '核销状态', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { contNature: '发票状态', itemType: 'text', sortable: true, isShow: true, width: 100 },
        { auditStatus: '凭证状态', itemType: 'text', sortable: true, isShow: true, width: 100 }
      ],
      currentFormData: {
        tableList: []
      }
    }
  },
  mounted() {
    this.contractChangeStandingBookList()
  },
  methods: {
    contractChangeStandingBookList() {
      const datas = {
        id: this.$route.query.contNo,
        type: this.active,
        conFeeType: this.conFeeTypeActive
      }
      contractChangeApi.contractChangeStandingBookList(datas).then(res => {
        if (res) {
          this.currentFormData.tableList = res.list
        }
      })
    },
    // 点击tabs
    tabsChange(row) {
      console.log(row)
      this.active = this.tabsList[row].label
      this.contractChangeStandingBookList()
    },
    // 点击tabs
    conFeeTypeTabsChange(row) {
      this.conFeeTypeActive = this.conFeeTypeList[row].label
      this.contractChangeStandingBookList()
    }
  }
}
</script>

<style scoped>

</style>
