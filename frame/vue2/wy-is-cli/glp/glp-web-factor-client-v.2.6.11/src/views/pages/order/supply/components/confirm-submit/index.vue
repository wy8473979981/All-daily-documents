<template>
  <modal
    :before-confirm="beforeConfirm"
    confirm-text="提交"
    cancel-text="取消"
    ref="modal"
    modal-width="420px"
    title=""
  >
    <div class="text-center">
      <el-row :gutter="32"><el-col :span="24"><h3 :class="[$style.fontSize16, $style.margin10]">确认是否提交?</h3></el-col></el-row>
      <el-row :gutter="32"><el-col :span="24"><p :class="[$style.margin10]">请您确保已完善补充文件，以免影响订单进度，请确认是否提交？</p></el-col></el-row>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import { submitFileList } from '@/api/customerInfo'

@Component
export default class ConfirmSubmit extends Vue {
  @Ref() modal!: any

  agentSearchList: Array<any> = []

  fileList: Array<any> = []

  subFile (list: any) {
    this.fileList = list
    return this.modal.open()
  }

  beforeConfirm () {
    return submitFileList(this.fileList).then((data) => {
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    })
  }

  $style!: any
}
</script>
<style style="scss"  module>
.width100 {
  width: 100%;
}
.fontSize16 {
  font-size: 16px;
}
.margin10 {
  margin:10px
}
</style>
