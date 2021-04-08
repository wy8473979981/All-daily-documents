<template>
     <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
        title="上传发票"
        class="upload-box"
        >
        <glp-upload :request="request" :resp="resp" type="card" :limit="1" v-model="value" max-size="100M" accept="image/*,application/zip"></glp-upload>
        <div :class="[$style.tip]" style="margin-top:30px;">提示：高清晰的图片可提高识别成功率。上传压缩包文件大小不超过100M，最多不超过50张发票，上传格式为jpeg，jpg，png，或zip</div>
        <div :class="[$style.tip]">点击“确定”按钮开始发票上传。发票上传需要几分钟，您可稍候返回查看上传进展。</div>
        <div class="text-center mt-5">
          <el-button type="primary" size="small" class="px-5" @click="sendUrl" :disabled="value.length==0">确 定</el-button>
          <el-button size="small" class="px-5 ml-5" @click="dialogVisible = false">取 消</el-button>
        </div>
     </el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { resp, request, action } from '@/config/form'
@Component
export default class Popop extends Vue {
   dialogVisible = false
   request = request
   resp=resp
   value: any=[]

   @Watch('dialogVisible')
   onChangeValue (newVal: boolean) {
     if (!newVal) {
       this.value = []
     }
   }

   sendUrl (): void {
     this.$http.post<any>(
       '/clientend/invoice/invoiceUploadRecognize',
       { fileUrl: this.value[0].url, fileName: this.value[0].name }
     ).then(data => {
       if (data.message) {
         this.$emit('onfail')
         this.dialogVisible = false
       } else {
         this.$router.push(`/certificate/upload/confirm/${data.uploadBatchId}`)
       }
     })
   }

   $style!: any
}
</script>

<style lang="scss" module>
.tip{
  color:red;
}
</style>
<style lang="scss">
.upload-box{
   .glp-upload{
      position:relative;
      .el-upload-list{
        position:absolute;
      }
    }
}
</style>
