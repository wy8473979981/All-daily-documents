<template>
<div>
  <query-table :title="title" :columns="columns" :data-source="dataContractList" ref="tb" :pageable="false" class="mt-4">
    <template v-slot:opt="{row}">
      <!-- <el-button type="text" @click="onDecided(row)">去签署</el-button> -->
      <el-button type="text" @click="onRefuse(row)">拒绝签署</el-button>
    </template>
    <template slot="extra">
      <!-- <el-button type="text" @click="onRefuse(row)">拒绝签署</el-button> -->
      <el-button type="text" @click="onDecided(row)">去签署</el-button>
    </template>
  </query-table>
  <refuse-submit ref="refuseSubmit"></refuse-submit>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { columns } from './config'
import { queryContractList } from '@/api/customerInfo'
import RefuseSubmit from './components/refuse-submit/index.vue'
import { d, datetime } from '@/config/form'

@Component({ components: { RefuseSubmit } })
export default class QueryList extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() refuseSubmit!: RefuseSubmit

  title = '合同列表'

  columns = columns

  dataContractList: any = []

  onQueryFileList() {
    const params = {}
    queryContractList(params).then((data) => {
      console.log(data)
      this.dataContractList = data
    })
  }

  onDecided (row: any) {
    console.log(row)
  }

  onRefuse (row: any) {
    console.log(row)
    this.refuseSubmit.refuse(row?.id).then(() => {
      console.log('拒绝')
    })
  }

  mounted () {
    this.onQueryFileList()
  }
}
</script>

<style lang="scss" module>

</style>
