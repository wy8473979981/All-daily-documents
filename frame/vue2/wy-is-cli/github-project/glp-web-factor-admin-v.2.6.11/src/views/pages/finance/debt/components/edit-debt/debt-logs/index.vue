<template>
<div>
<query-table :columns="columns" :data-source="dataSource" :pageable="false" :wrap="false">
</query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class DebtLogs extends Vue {
  @Prop(Array) dataSource!: any[]

  columns = columns
}
</script>
