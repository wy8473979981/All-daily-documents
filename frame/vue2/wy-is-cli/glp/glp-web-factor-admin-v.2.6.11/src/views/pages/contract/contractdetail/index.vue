<template>
    <div>
      <glp-card style="margin-bottom:20px;">
          <template v-slot:title>
          <div :class="[$style.longTitle]">
              合同详情
              <span style='font-size:15px;color:#666'>
                  (合同编号:{{contractDetails.mainContractCode}})
              </span>
            </div>
        </template>
         <edit-form-group :isShowBtn="false" @submit="submit" :class="[$style.contractDetail]">
              <contract-edit isEdit="isEdit" :form="contractDetails" v-if="Object.keys(contractDetails).length>0"/>
              <div v-if="!contractDetails.isCustomContract" :class="[$style.notice]">注：新增的非标合同需手工选择好相应的签署方名称。</div>
          </edit-form-group>
      </glp-card>
      <query-table :columns="columns" title="历史版本" class="mt-4" :dataSource="contractVersions" ref="tb">
            <template v-slot:contractTypeId="{row}">
                <span :class="[$style.link]" @click="viewOfficeOnline(row.fileUrl)">{{d('contract_type')[row.contractTypeId]}}</span>
            </template>
             <template v-slot:opt="{row}">
                <span :class="[$style.link]" @click="download(row.fileUrl,row.fileName)">下载</span>
            </template>
        </query-table>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import ContractEdit from '@/views/pages/contract/components/contract-edit/index.vue'
import { columns } from './config'
import { d } from '@/config/form'
import { viewOfficeOnline, download } from '@/utils/file'
@Component({
  components: {
    ContractEdit
  }
})
export default class Noncontract extends Vue {
 @Prop(String) id!: string
 columns=columns
 contractDetails: any={}
 contractVersions=[]
 signerList: any=[]
 isSubmit=true
 d=d
 download=download
 viewOfficeOnline=viewOfficeOnline
 submit (params: any) {
   if (!this.isSubmit) {
     return
   }
   this.isSubmit = false
   const { upload, signerId1, signerId2, signerId3, autoSign1, autoSign2, autoSign3, contractName, signMethod, emailNotifyAddress, updateContent } = params[0]
   const id = this.id
   const id1 = this.signerList[0] && this.signerList[0].id
   const id2 = this.signerList[1] && this.signerList[1].id
   const id3 = this.signerList[2] && this.signerList[2].id
   const signerListTemp = [
     { autoSign: (autoSign1 === '1'), signerId: signerId1, id: id1 },
     { autoSign: (autoSign2 === '1'), signerId: signerId2, id: id2 },
     { autoSign: (autoSign3 === '1'), signerId: signerId3, id: id3 }
   ]

   const signerList = signerListTemp.filter((item: any) => {
     return item.signerId
   })
   const fileUrl = upload[0].url
   const fileName = upload[0].name
   const req = { contractId: this.id, contractName, signerList, fileUrl, signMethod, email: emailNotifyAddress, fileName, updateContent }
   this.$http.post<any>(
     '/backend/contract/updateVersion',
     { ...req }
   ).then(data => {
     this.$message({
       type: 'success',
       message: '修改成功',
       onClose: () => {
         this.$router.push(`/contract/audit/${this.$route.query.batchNumber}?status=pending`)
       }
     })
   }).catch(() => {
     this.isSubmit = true
   })
 }

 lookUp(params: any) {
   viewOfficeOnline(params)
 }

 created () {
   this.$http.get<any>(
     `/backend/contractWorkbench/details?id=${this.id}`
   ).then(res => {
     res.contractDetails.contractTypeId = res.contractDetails.contractTypeId.toString()
     res.contractDetails.signMethod = res.contractDetails.signMethod.toString()
     res.contractDetails.updatedContent = ''
     const { fileName, fileUrl } = res.contractDetails
     res.contractDetails.upload = [{ name: fileName, url: fileUrl }]
     this.contractDetails = res.contractDetails
     this.contractVersions = res.contractVersions
     this.signerList = res.contractDetails.signerList
   })
 }

   $style!: any
}
</script>

<style lang="scss" module>
.projectName{
  display:flex;
  font-size:14px;
  color:#606266;
  line-height:32px;
  margin-bottom:15px;
  .label{
      width:80px;
      display:inline-block;
    }
  .item{
    flex:1;
  }
}
.notice{
    color:#666;
    font-size:14px;
}
.link{
    color:#67C23A;
    cursor: pointer;
    text-decoration:none;
}
</style>
<style lang="scss">
.upload-box{
   .el-textarea__inner{resize: none;}
}
  .longTitle{
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
