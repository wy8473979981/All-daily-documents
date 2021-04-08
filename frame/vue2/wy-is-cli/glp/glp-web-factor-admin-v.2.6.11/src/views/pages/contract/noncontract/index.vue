<template>
      <glp-card title="新增非标合同" style="margin-bottom:20px;">
         <edit-form-group :isShowBtn="false" @submit="submit">
              <contract-edit/>
              <div :class="[$style.notice]">注：新增的非标合同需手工选择好相应的签署方名称。</div>
          </edit-form-group>
      </glp-card>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import ContractEdit from '@/views/pages/contract/components/contract-edit/index.vue'
@Component({
  components: {
    ContractEdit
  }
})
export default class Noncontract extends Vue {
 @Prop(String) id!: string
 batchNumber: any=''
 isSubmit=true
 submit (params: any) {
   if (!this.isSubmit) {
     return
   }
   this.isSubmit = false
   const { upload, signerId1, signerId2, signerId3, autoSign1, autoSign2, autoSign3, contractTypeId, contractName, signMethod, email, coreContractId } = params[0]
   if (signerId1 === null && signerId2 === null && signerId3 === null) {
     this.$message({
       type: 'error',
       message: '签署方至少填一项'
     })
     return
   }
   const { name, url } = upload[0]
   const id = this.id
   const signerInfosTemp = [
     { autoSign: autoSign1, signerId: signerId1 },
     { autoSign: autoSign2, signerId: signerId2 },
     { autoSign: autoSign3, signerId: signerId3 }
   ]
   const signerInfos = signerInfosTemp.filter((item: any) => {
     return item.signerId
   })
   const coreContractIdValue = coreContractId || ''
   let req = { contractName, contractTypeId, email, fileName: name, id, signMethod, signerInfos, url }
   if (coreContractIdValue) {
     req = Object.assign({}, req, { coreContractId: coreContractIdValue })
   }
   this.$http.post<any>(
     '/backend/contract/addNonStandardContract',
     { ...req }
   ).then(data => {
     this.$message({
       type: 'success',
       message: '新增非标合同成功'
     })
     this.$router.push(`/contract/audit/${this.batchNumber}?status=pending`)
   }).finally(() => {
     this.isSubmit = true
   })
 }

 created () {
   this.batchNumber = this.$route.query.batchNumber
 }
}
</script>

<style lang="scss" module>
.textRight{
  text-align: right;
  margin-bottom:20px;
  .version{
    color:#666;
    font-size:14px;
    margin-left:10px;
  }
}
.notice{
    color:#666;
    font-size:14px;
    margin-left:10px;
}
</style>
<style lang="scss">
</style>
