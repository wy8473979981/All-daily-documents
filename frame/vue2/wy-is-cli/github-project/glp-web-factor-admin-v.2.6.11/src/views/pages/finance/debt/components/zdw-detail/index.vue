<template>
<div>
<modal title="中登登记详情" ref="modal">
  <detail-form :def="detailDef" label-width="120px" :data-source="dataSource || {}" :span="12" :xl="12"></detail-form>
</modal>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { detailDef } from './config'

@Component
export default class ZdwDetail extends Vue {
  @Ref() modal!: any

  id: any = null

  detailDef = detailDef

  loading = false

  dataSource: any = null

  view (id: any) {
    this.id = id
    this.loadData()
    return this.modal.open()
  }

  loadData () {
    if (!this.id) {
      this.dataSource = null
      return
    }
    this.loading = true
    this.$http.post('/backend/zdw/show/details', { id: this.id }).then(data => {
      const item = data ? Object.assign({}, data) : null
      if (item && item.filePath) {
        item.files = [{ name: item.fileName, url: item.filePath }]
      }
      this.dataSource = item
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: 80vh;
}
</style>
