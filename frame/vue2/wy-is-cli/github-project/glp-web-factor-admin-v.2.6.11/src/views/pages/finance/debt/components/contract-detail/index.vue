<template>
<div>
<modal title="合同查看" confirm-text="" cancel-text="返回" ref="modal">
  <p>你要查看的合同如下:</p>
  <div v-loading="loading">
    <glp-file-viewer :url="row.url" :title="row.title" v-for="(row, i) in dataSource" :key="i" class="mt-2"></glp-file-viewer>
  </div>
</modal>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'

@Component
export default class ContractDetail extends Vue {
  @Ref() modal!: any

  id: any = null

  dataSource: any[] = []

  loading = false

  view (id: any) {
    this.id = id || null
    this.loadData()
    return this.modal.open()
  }

  loadData () {
    if (!this.id) {
      this.dataSource = []
      return
    }
    this.loading = true
    this.$http.post('/backend/dept/queryContract', {}, { params: { businessNo: this.id } }).then(data => {
      const ret: any[] = []
      if (data?.companyGuaranteeUrl) ret.push({ name: '企业担保函', url: data?.companyGuaranteeUrl })
      if (data?.factorContractUrl) ret.push({ name: '保理合同', url: data?.factorContractUrl })
      if (data?.personGuaranteeUrl) ret.push({ name: '个人担保函', url: data?.personGuaranteeUrl })
      if (data?.protocolContractUrl) ret.push({ name: '应收账款转让协议', url: data?.protocolContractUrl })
      this.dataSource = ret
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>
