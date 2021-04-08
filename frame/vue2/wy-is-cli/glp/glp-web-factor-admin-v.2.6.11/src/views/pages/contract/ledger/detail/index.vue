<template>
   <div>
        <contract-detail :form="contractDetails" v-if="Object.keys(contractDetails).length>0"/>
        <query-table :columns="columns" title="历史版本" class="mt-4" :dataSource="contractVersions" ref="tb">
            <template v-slot:contractTypeId="{row}">
                <span @click="viewOfficeOnline(row.fileUrl)" :href="row.fileUrl" :class="[$style.link]"> {{d('contract_type')[row.contractTypeId]}}</span>
            </template>
             <template v-slot:opt="{row}">
                <span @click="download(row.fileUrl,row.fileName)" :href="row.fileUrl" :class="[$style.link]">下载</span>
            </template>
        </query-table>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { columns } from './config'
import Options from '@/config/dictionary/options'
import ContractDetail from '@/views/pages/contract/components/contract-detail/index.vue'
import { format } from '@/utils/date'
import { download, viewOfficeOnline } from '@/utils/file'
import { d } from '@/config/form'
@Component({
  components: {
    ContractDetail
  }
})
export default class LedgerDetail extends Vue {
 @Prop(String) id!: string
 @Ref() tb!: any
 columns=columns
 contractDetails={}
 contractVersions: any[]=[]
 d=d
 download=download
 viewOfficeOnline=viewOfficeOnline
 created () {
   this.$http.get<any>(
     `/backend/contractWorkbench/details?id=${this.id}`
   ).then(res => {
     res.contractDetails.signMethod = res.contractDetails.signMethod.toString()
     const emailNotifyStatus = res.contractDetails.emailNotifyStatus
     res.contractDetails.emailNotifyStatus = emailNotifyStatus ? emailNotifyStatus.toString() : emailNotifyStatus
     this.contractDetails = res.contractDetails
     this.contractVersions = res.contractVersions
   })
 }

 lookUp(params: any) {
   viewOfficeOnline(params)
 }

 $style!: any
}
</script>

<style lang="scss" module>
    .link{
        color:#67C23A;
        cursor: pointer;
        text-decoration:none;
    }
</style>
