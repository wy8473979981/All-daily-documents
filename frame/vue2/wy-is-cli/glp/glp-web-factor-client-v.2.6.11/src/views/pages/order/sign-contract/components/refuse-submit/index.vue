<template>
  <modal
    :before-confirm="beforeConfirm"
    confirm-text="确认"
    cancel-text="取消"
    ref="modal"
    modal-width="50%"
    title="拒绝原因"
  >
    <el-form
        size="medium "
        ref="formRef"
        :model="form"
        label-position="top"
        :rules="rules"
      >
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item prop="remark">
              <el-input type="textarea" :rows="2" placeholder="请输入拒绝签署原因" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import { refuseRequest } from '@/api/customerInfo'

@Component
export default class RefuseSubmit extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  form: Record<string|number, any> = {}

  rules = {
    remark: [
      { require: true, message: '必填', trigger: 'blur' }
    ]
  }

  refuseId: any = ''

  refuse (id: any) {
    this.refuseId = id
    return this.modal.open()
  }

  beforeConfirm () {
    const params = {
      id: this.refuseId,
      remark: this.form.remark
    }
    return this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        return refuseRequest(params).then((data) => {
          this.$message({
            message: '订单合同签署已拒绝',
            type: 'warning'
          })
        })
      }
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
