<template>
  <query-table title="补充文件" :columns="columns" :data-source="fileList" :pageable="false"></query-table>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import { columns } from './config'
const Plb = namespace('plb')
@Component
export default class ExtraAttachment extends Vue {
  @Plb.State('paperContract') paperContract!: any
  columns = columns

  get fileList() {
    return this.paperContract.supFiles
  }
}
</script>
<style lang='scss' module>
</style>
