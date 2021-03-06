<template>
<div v-loading="loading">
  <glp-card title="基础信息">
    <detail-form :def="baseDetailDef" :data-source="info">
    </detail-form>
  </glp-card>
  <glp-card title="正面信息" class="mt-4">
    <detail-form :def="frontDetailDef" :data-source="info">
    </detail-form>
  </glp-card>
  <glp-card title="背面信息" class="mt-4">
    <detail-form :def="backDetailDef" :data-source="info">
    </detail-form>
  </glp-card>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { baseDetailDef, frontDetailDef, backDetailDef } from './config'

@Component
export default class TicketDetail extends Vue {
  @Prop(String) id!: string

  baseDetailDef = baseDetailDef

  frontDetailDef = frontDetailDef

  backDetailDef = backDetailDef

  loading = false

  dataSource: any = null

  get orderNumber () {
    return this.id.split('_')[0]
  }

  get billNo () {
    return this.id.split('_')[1]
  }

  get info () {
    return this.dataSource || {}
    // return {
    //   transfers: [
    //     { tranferFrom: '232131' },
    //     {},
    //     {}
    //   ]
    // }
  }

  loadData () {
    this.loading = true
    this.$http.get(`/backend/order/plb/billInfo/${this.orderNumber}/${this.billNo}`).then((data) => {
      this.dataSource = data || null
    }).finally(() => {
      this.loading = false
    })
  }

  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>

</style>
