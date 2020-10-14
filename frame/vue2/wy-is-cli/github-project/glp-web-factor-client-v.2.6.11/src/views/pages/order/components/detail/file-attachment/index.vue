<template>
  <glp-section title="合同附件">
    <el-upload type="list" :file-list="fileList"></el-upload>
  </glp-section>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class FileAttachment extends Vue {
  @Plb.State('paperContract') paperContract!: any

  get fileList() {
    return this.paperContract.conFiles || []
  }
}
</script>
<style lang='scss' module>
</style>
