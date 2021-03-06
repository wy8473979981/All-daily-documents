<template>
      <glp-card style="margin-bottom:20px;">
       <template v-slot:title>
          <div :class="[$style.longTitle]">
              合同详情
              <span style='font-size:15px;color:#666'>
                  (合同编号:{{form.mainContractCode}})
              </span>
            </div>
        </template>
         <detail-form :def="defs" :dataSource="contractDetails" label-width="120px" class="contractDetails">
            <template v-slot:link>
                <span @click="download(contractDetails.fileUrl,`${contractDetails.fileName}.docx`)" :class="[$style.link]">{{contractDetails.fileName}}</span>
            </template>
             <template v-slot:emailNotifyStatus>
                 <span style="margin-right:10px;">{{d("email_notify_status")[contractDetails.emailNotifyStatus]}}</span>
                 <el-button type="primary" size="mini" @click="resetSend" v-if="contractDetails.emailNotifyStatus==4" plain>重新发送</el-button>
            </template>
         </detail-form>
          <div v-if="!form.isCustomContract" :class="[$style.notice]">注：新增的非标合同需手工选择好相应的签署方名称。</div>
     </glp-card>
</template>
<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { defs, emailConfig } from './config'
import { d } from '@/config/form'
import { download } from '@/utils/file'
@Component({})
export default class ContractDetail extends Vue {
 @Prop(Object) form!: any
 signerListConfig: any=[]
 signerListDetails: any={}
 contractDetails: any={ signMethod: 0 }
 defs: any=''
 d = d
download=download
resetSend() {
  this.$http.get<any>(
      `/backend/contractWorkbench/againSendSignEmail?contractId=${this.form.id}`
  ).then(data => {
    this.$message({
      type: 'success',
      message: '已重新发送邮件'
    })
    this.contractDetails.emailNotifyStatus = '2'
  })
}

restDefsFns (arr: []) {
  arr.forEach((item: any, index) => {
    if (this.form.signMethod === '1') {
      this.signerListConfig.push({ def: { type: 'plain', model: `signerName${index + 1}`, label: '签署方', options: { labelWidth: '90px' } }, span: 12 })
      this.signerListConfig.push({ def: { type: 'plain', model: `autoSign${index + 1}`, label: '签署类型', options: { options: { 0: '手动签', 1: '自动签' }, labelWidth: '90px' } }, span: 12 })
      this.signerListDetails[`autoSign${index + 1}`] = item.autoSign ? '自动签' : '手动签'
    } else {
      this.signerListConfig.push({ def: { type: 'plain', model: `signerName${index + 1}`, label: '签署方', options: { labelWidth: '90px' } }, span: 24 })
    }
    this.signerListDetails[`signerName${index + 1}`] = item.signerName
  })
}

created () {
  const { signerList, ...rest } = this.form
  this.restDefsFns(signerList)
  this.defs = [...defs, ...this.signerListConfig, ...emailConfig]
  this.contractDetails = { ...rest, ...this.signerListDetails }
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
    .notice{
      color:#666;
      font-size:14px;
    }
</style>
<style lang="scss">
  .contractDetails{
    .glp-text-secondary{
      word-break:break-all;
      word-wrap:break-word
    }
  }
  .longTitle{
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
