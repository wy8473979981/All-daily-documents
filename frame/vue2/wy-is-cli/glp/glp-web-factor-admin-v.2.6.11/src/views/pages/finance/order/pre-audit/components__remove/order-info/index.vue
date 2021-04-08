<template>
<div>
<glp-card title="融资申请信息" class="mt-4">
  <edit-form :def="actualOrderFormDef" :form="orderForm" label-width="120px" label-position="right" :span="8" :xl="8">
    <template v-slot:edit="{proxy}">
      <span>
        <span class="text-secondary">{{proxy.value}}</span>
        <span v-if="hasBuyer">
          <el-button type="text" size="small" class="ml-3" icon="el-icon-edit" @click="onEditContact" v-if="atStep12">编辑</el-button>
          <el-button type="text" size="small" class="ml-3" icon="el-icon-view" :disabled="false" @click="onViewContact" v-else>查看</el-button>
        </span>
      </span>
    </template>
  </edit-form>
</glp-card>
<glp-card title="融资关联信息" class="mt-4">
  <glp-section title="应收账款明细">
    <query-table show-summary :summary-method="debtSummaryFn" :wrap="false" :pageable="false" :columns="debtColumns" :data-source="debts" ></query-table>
  </glp-section>

  <glp-section title="客户上传应收账款资料审核">
    <edit-form class="mt-2" :def="contractFormDef" :form="contractForm" :disabled="!atStep12" :span="6" :xl="6" label-width="120px"></edit-form>
  </glp-section>

  <glp-section title="发票信息">
    <query-table :wrap="false" :pageable="false" :columns="invoiceColumns" :data-source="invoices" >
      <template v-slot:opt="{row}">
        <!-- <el-button type="text" @click="onViewInvoice(row)">详情</el-button> -->
        <glp-file-viewer :url="row.invoiceFileUrl"></glp-file-viewer>
      </template>
    </query-table>
  </glp-section>
</glp-card>

<glp-card title="风控及额度信息" class="mt-4">
  <detail-form :def="quotaDetailDef" :data-source="order">
    <template v-slot:link="{ }">
      <a :href="order && order.amountDetailsUrl" target="_blank" v-if="order && order.amountDetailsUrl">点击查看额度明细</a>
    </template>
  </detail-form>
</glp-card>

<edit-contact ref="ec"></edit-contact>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { orderFormDef, orderStep2FormDef, debtColumns, contractFormDef12, contractFormDef34, invoiceColumns, quotaDetailDef } from './config'
import { filter } from '@/filters'
import EditContact from './edit-contact/index.vue'

@Component({
  components: { EditContact }
})
export default class OrderInfo extends Vue {
  @Prop() dataSource!: any

  @Ref() ec!: EditContact

  orderFormDef = orderFormDef

  orderStep2FormDef = orderStep2FormDef

  debtColumns = debtColumns

  invoiceColumns = invoiceColumns

  quotaDetailDef = quotaDetailDef

  contractForm = {}

  orderForm = {}

  get order () {
    return this.dataSource || {}
  }

  get debts () {
    return this.order?.billInfos || []
  }

  get invoices () {
    return this.order?.invoiceInfos || []
  }

  get actualOrderFormDef () {
    return this.atSecondStep ? this.orderStep2FormDef : orderFormDef
  }

  get contractFormDef () {
    return this.atStep12 ? contractFormDef12 : contractFormDef34
  }

  get node () {
    return this.dataSource?.flowNode
  }

  get atSecondStep () {
    return this.node === 'operationReview'
  }

  get atStep12 () {
    return ['BDReview', 'operationReview'].includes(this.node)
  }

  get hasBuyer () {
    return !!this.order?.buyerCompId || this.order?.buyerCompId === 0
  }

  debtSummaryFn ({ columns, data }: any) {
    return columns.map((v: any, i: number) => {
      if (i === 0) return '总计'
      if (v.property !== 'paperAmount') return ''
      const text = (data || []).map((w: any) => Number(w.paperAmount || null)).reduce((t: any, n: any) => t + n, 0)
      return filter('currency', text)
    })
  }

  onViewInvoice (row: any) {
    this.$message.warning('该功能正在开发中')
  }

  onEditContact () {
    this.ec.edit(this.contractForm).then((data: any) => {
      Object.assign(this.contractForm, data || {})
    }).catch(() => {
      // ignore
    })
  }

  onViewContact () {
    this.ec.view(this.contractForm).catch(() => {
      // ignore
    })
  }

  initContractForm () {
    const r = this.order
    const ret: any = {
      basicContractName: r.contractName || '',
      basicContractNo: r.contractCode || '',
      basicContractSignDate: r.contractSignDate ? filter('date', r.contractSignDate, 'T') : null,
      basicContractExpireDate: (r.contractEndDate && String(r.contractEndDate) !== '-1') ? filter('date', r.contractEndDate, 'T') : null,
      noFixed: String(r.contractEndDate) !== '-1' ? '0' : '1',
      debtDesc: r.debtDescripton || '',
      files: (r.files || []).map((v: any) => Object.assign({ fullFileName: v.fileCode ? `${v.fileName}-${v.fileCode}` : v.fileName }, v))
    }

    if (this.hasBuyer) {
      ret.buyerCompName = r?.buyerCompName || ''
      ret.buyerProvice = r?.buyerProvice || ''
      ret.buyerContactName = r?.buyerContactName || ''
      ret.buyerContactEmail = r?.buyerContactEmail || ''
      ret.buyerContactPhone = r?.buyerContactPhone || ''
      ret.buyerSendAddress = r?.buyerSendAddress || ''
    }

    this.contractForm = ret

    this.orderForm = {
      buyerUnifiedcode: r?.buyerUnifiedcode || '',
      sellerCompanyName: r?.sellerCompanyName || '',
      buyerCompName: r?.buyerCompName || '',
      createTime: r?.createTime || '',
      amount: r?.amount || null,
      latestRepaymentDate: r?.latestRepaymentDate || '',
      pledgeAccount: r?.pledgeAccount || '',
      pledgeAccountName: r?.pledgeAccountName || '',
      pledgeBankName: r?.pledgeBankName || ''
    }
  }

  @Watch('order', { immediate: true }) orderChange () {
    this.initContractForm()
  }
}
</script>

<style lang="scss" module>

</style>
