<template>
  <query-table
    title="还款信息预览"
    :columns="columns"
    :data-source="dataSource.list"
    :pageable="false"
    row-key="repayment"
    class="mt-4 j-c-fs"
  >
    <template slot="extra">
      <span class="mx-4">
        预计本金合计:
        <span class="f-w-5">{{dataSource.prePrincipal}}</span>
      </span>
      <span class="mr-4">
        预计利息合计:
        <span class="f-w-5">{{dataSource.preInterest}}</span>
      </span>
      <span class="mr-4">
        预计宽限期利息合计:
        <span class="f-w-5">{{dataSource.preGracePeriod}}</span>
      </span>
      <span class="mr-4">
        预计罚息合计:
        <span class="f-w-5">{{dataSource.prePenalty}}</span>
      </span>
    </template>
  </query-table>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { columns } from './config'
@Component
export default class Preview extends Vue {
  $style!: any

  @Prop() dataSource!: any

  columns = columns
}
</script>

<style lang="scss" module>
</style>
