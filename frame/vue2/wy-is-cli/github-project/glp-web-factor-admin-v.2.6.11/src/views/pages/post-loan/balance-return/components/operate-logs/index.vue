<template>
  <query-table :pageable="false" title="审核记录" class="mt-4" :dataSource="logs" :columns="logColumns"></query-table>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import { logColumns } from './config'
@Component
export default class Attachment extends Vue {
  @Prop() logs!: any

  logColumns = logColumns
}
</script>
<style lang='scss' module>
</style>
