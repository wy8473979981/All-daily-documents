<template>
  <div>
    <note-list></note-list>
    <contract-info></contract-info>
    <contract-partner-info></contract-partner-info>
    <file-attachment></file-attachment>
    <attachment-extra></attachment-extra>
    <invoice-list></invoice-list>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import NoteList from './note-list/index.vue'
import ContractInfo from './contract-info/index.vue'
import ContractPartnerInfo from './contract-partner-info/index.vue'
import FileAttachment from './file-attachment/index.vue'
import AttachmentExtra from './attachment-extra/index.vue'
import InvoiceList from './invoice-list/index.vue'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: {
    NoteList,
    ContractInfo,
    ContractPartnerInfo,
    FileAttachment,
    AttachmentExtra,
    InvoiceList
  }
})
export default class Attachment extends Vue {}
</script>
<style lang='scss' module>
</style>
