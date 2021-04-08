<template>
<div>
<glp-card>
  <el-tag type="danger" size="small">利率范围: {{minRate | percent}} ~ {{maxRate | percent}}</el-tag>
  <edit-form class="mt-2" :def="formDef" :form="form" :span="12" :xl="12" :disabled="disabled" label-width="120px"></edit-form>
</glp-card>

<glp-card title="票据资料审核" class="mt-4">
  <el-tabs tab-position="left">
    <el-tab-pane v-for="row in rows" :key="row.id" :label="'票 ('+ row.paperFrom + ')'">
      <div>
        <glp-section title="票据基础信息">
          <detail-form :def="baseDetailDef" :data-source="row" label-width="140px" :span="6" :xl="6"></detail-form>
        </glp-section>
        <glp-section title="融资信息相关">
          <edit-form class="mt-2" :def="rowTicketFormDef(row)" :form="row" label-width="120px" :disabled="disabled" label-position="right"></edit-form>
        </glp-section>
      </div>
    </el-tab-pane>
  </el-tabs>
</glp-card>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { formDefFn, baseDetailDef, ticketFormDefFn } from './config'
import { filter } from '@/filters'
import { uploadFromResp, datetime } from '@/config/form'
import { parse, addDays, format } from '@/utils/date'

@Component
export default class TicketInfo extends Vue {
  @Prop() dataSource!: any

  baseDetailDef = baseDetailDef

  form: any = {}

  rows: any[] = []

  get tickets () {
    return (this.dataSource?.billInfos || []).map((v: any) => {
      v.graceUseDays = v.graceUseDays || 0
      if (v.fileUrl) v.files = [{ name: v.fileName, url: v.fileUrl }]
      return v
    })
  }

  get disabled () {
    return !this.atStep12
  }

  get node () {
    return this.dataSource?.flowNode
  }

  get atStep12 () {
    return ['BDReview', 'operationReview'].includes(this.node)
  }

  get formDef () {
    return this.atStep12 ? formDefFn(1, this.minRate * 100, this.maxRate * 100) : formDefFn(3, this.minRate * 100, this.maxRate * 100)
  }

  get maxRate () {
    return Math.max(...this.rows.map((v: any) => Number(v.maxRate)), 0)
  }

  get minRate () {
    return Math.max(...this.rows.map((v: any) => Number(v.minRate)), 0)
  }

  rowTicketFormDef (row: any) {
    debugger
    const max = Number(row.graceUseDays)
    return this.atStep12 ? ticketFormDefFn(1, max) : ticketFormDefFn(3, max)
  }

  initRows () {
    this.form = {
      factoringContractRate: Number(this.dataSource?.orderRate) * 100 || null,
      useBasicContracts: uploadFromResp(this.dataSource?.useBasicContracts || [])
    }
    this.rows = this.tickets.map((v: any) => {
      const ret = Object.assign({}, v)
      // ret.files = []
      // if (ret.fileUrl) {
      //   ret.files.push({ name: ret.fileName, url: ret.fileUrl })
      // }
      if (ret.paperExpiredDate) {
        const date = parse(ret.paperExpiredDate, 'yyyy/MM/dd')
        if (date) {
          ret.formatedPaperExpiredDate = format(addDays(date, 7), datetime)
        }
      }
      const minRate = filter('percent', Number(v.minRate))
      const maxRate = filter('percent', Number(v.maxRate))
      ret.rateRange = `${minRate} ~ ${maxRate}`
      if (ret.endDate) {
        ret.endDate = filter('date', ret.endDate, 'T') || ''
      }
      return ret
    })
  }

  @Watch('tickets', { immediate: true }) ticketsChange () {
    this.initRows()
  }
}
</script>

<style lang="scss" module>

</style>
