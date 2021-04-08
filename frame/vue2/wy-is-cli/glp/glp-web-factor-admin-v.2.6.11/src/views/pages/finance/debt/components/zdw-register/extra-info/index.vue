<template>
<div>
<modal title="中登登记信息提取" ref="modal">
  <glp-card title="出让人信息">
    <detail-form :def="saleCompanyDetailDef" label-width="120px" :data-source="seller" :span="12" :xl="12"></detail-form>
  </glp-card>
  <glp-card title="受让人信息" class="mt-4">
    <detail-form :def="buyCompanyDetailDef" label-width="120px" :data-source="buyer" :span="12" :xl="12"></detail-form>
  </glp-card>
  <glp-card title="融资合同信息" class="mt-4">
    <detail-form :def="contractDetailDef" label-width="120px" :data-source="contract" :span="12" :xl="12"></detail-form>
  </glp-card>
  <glp-card title="转让信息" class="mt-4">
    <detail-form :def="describeDetailDef" label-width="120px" :data-source="desc" :span="24" :xl="24"></detail-form>
  </glp-card>
</modal>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { saleCompanyDetailDef, buyCompanyDetailDef, contractDetailDef, describeDetailDef } from './config'
import { provinces, getCities, getCounties } from '@/config/region'

function transformAddress (row: any) {
  const p = row.addressProvince
  const c = row.addressCity
  const t = row.addressCounty
  let ret = ''
  const x = (provinces || {})[p]
  if (x) {
    ret = x
    const y = (getCities(p) || {})[c]
    if (y) {
      ret += ('/' + y)
      const z = (getCounties(c) || {})[t]
      if (z) ret += ('/' + z)
    }
  }
  return ret
}

@Component
export default class ExtraInfo extends Vue {
  @Ref() modal!: any

  row: any = null

  saleCompanyDetailDef = saleCompanyDetailDef

  buyCompanyDetailDef = buyCompanyDetailDef

  contractDetailDef = contractDetailDef

  describeDetailDef = describeDetailDef

  loading = false

  dataSource: any = null

  get seller () {
    const ret = this.dataSource?.saleCompany || {}
    ret.addr = transformAddress(ret)
    return ret
  }

  get buyer () {
    const ret = this.dataSource?.buyCompany || {}
    ret.addr = transformAddress(ret)
    return ret
  }

  get contract () {
    return this.dataSource?.contract || {}
  }

  get desc () {
    return this.dataSource || {}
  }

  view (row: any) {
    this.row = row
    this.loadData()
    return this.modal.open()
  }

  loadData () {
    if (!this.row) {
      this.dataSource = null
      return
    }
    const { type, data } = this.row || {}
    this.loading = true
    const request = type === 'init' ? this.$http.post('/backend/zdw/info/init', { debtReceiveId: data })
      : this.$http.post('/backend/zdw/info/change', { batchId: data })
    return request.then(data => {
      this.dataSource = data || null
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" module>
