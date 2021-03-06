<template>
  <div>
    <edit-form-group>
      <glp-card title="详情" class="mt-4">
        <detail-form :def="baseFormDefs" :data-source="baseForm" label-width="100px"></detail-form>
        <glp-data-table :data-source="dataSource" :columns="columns" :pageable=false></glp-data-table>
      </glp-card>
      <template v-slot:action><div></div></template>
    </edit-form-group>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref, Watch } from 'vue-property-decorator'
import { baseFormDefs, columns } from './config'
import { handlEvidenceDetailInfo } from '@/api/accounting-server'
@Component
export default class Detail extends Vue {
  @Prop(String) id!: string

  @Ref() tb!: any

  baseFormDefs= baseFormDefs

  columns = columns

  dataSource: any[] = []

  baseForm: Record<string, any> = {}

  loadDetail () {
    const req = { id: this.id }
    handlEvidenceDetailInfo(req).then((data) => {
      this.baseForm = data || {}
      this.dataSource = data.recordDetails
    })
  }

  mounted () {
    this.loadDetail()
  }
}

</script>
