<template>
  <div>
    <edit-form-group>
      <glp-card title="详情">
          <detail-form :def="baseFormDefs" :data-source="baseForm" label-width="100px"></detail-form>
      </glp-card>
      <query-table :columns="columns" ref="tb" api="/glp-fae/summary/listDetail" class="mt-4">
      </query-table>
      <template v-slot:action><div></div></template>
    </edit-form-group>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref, Watch } from 'vue-property-decorator'
import { baseFormDefs, columns } from './config'
import { handlEvidenceCollectDetail } from '@/api/accounting-server'
@Component
export default class Detail extends Vue {
  @Prop(String) id!: string

  @Ref() tb!: any

  baseFormDefs= baseFormDefs

  columns = columns

  baseForm: Record<string, any> = {}

  loadDetail () {
    handlEvidenceCollectDetail(this.id).then((data) => {
      this.baseForm = data || {}
      const param = {
        dcFlag: data.dcFlag,
        subjectCode: data.subjectCode,
        summaryNo: data.summaryNo
      }
      this.tb.query(param)
    })
  }

  mounted () {
    this.loadDetail()
  }
}

</script>
