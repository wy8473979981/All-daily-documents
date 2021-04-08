<template>
  <div>
    <query-table :columns="columns" title="意向客户列表" ref="tb" api="/backend/operating/getCustomerInformation"></query-table>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import { getCustomerInformation } from '@/api/plb'
import { columns } from './config'
const Plb = namespace('plb')
@Component
export default class Attachment extends Vue {
  columns = columns

  $style!: any

  @Ref() tb!: any

  mounted() {
    this.tb.query()
  }
}
</script>
<style lang='scss' module>
</style>
