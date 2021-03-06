<template>
  <query-table title="还款计划" :data-source="dataSource" :columns="columns">
    <template slot="extra">
      <el-button type="primary" plain size="small">下载还款计划</el-button>
    </template>
  </query-table>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import { columns } from './config'
const Plb = namespace('plb')
@Component
export default class RepayPlan extends Vue {
  columns = columns
  dataSource = []
}
</script>
<style lang='scss' module>
</style>
