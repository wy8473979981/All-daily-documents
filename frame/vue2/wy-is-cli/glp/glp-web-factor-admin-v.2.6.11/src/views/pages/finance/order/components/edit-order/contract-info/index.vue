<template>
<div>
<query-table title="合同列表" :columns="columns" :data-source="contracts" :pageable="false" class="mt-4">
  <template v-slot:header="">
    <span class="mr-2">融资企业是否实名: </span>
    <el-tag type="success" size="small" v-if="String(contractInfo.realNameStatus) === '1'">已实名</el-tag>
    <el-tag type="danger" size="small" v-else>未实名</el-tag>
  </template>
  <template v-slot:signedContractUrl="{row}">
    <glp-file-viewer :url="row.signedContractUrl" v-if="row.signedContractUrl"></glp-file-viewer>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onView(row)">详情</el-button>
  </template>
</query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { columns } from './config'
import { getSuffix } from '@/utils/file'

@Component
export default class ContractInfo extends Vue {
  @Prop() dataSource!: any

  columns = columns

  get contractInfo () {
    return this.dataSource?.contractInfo || {}
  }

  get contracts () {
    return this.contractInfo?.contractList || []
  }

  onView (row: any) {
    this.$message.warning('该功能正在开发中')
  }
}
</script>
