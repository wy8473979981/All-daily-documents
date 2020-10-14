<template>
<el-dialog  :visible.sync="showAccountType"  width="480px" :before-close="closeDialog" :class="[$style.formModal]" :center="true" title="新增账户">
  <div>
    <el-form size="small"  ref="formRef" :model="form" :rules="rules" class="text-center" label-position="right" label-width="auto">
      <el-form-item label="账户性质" prop="bankType">
        <el-radio-group v-model="form.bankType">
          <el-radio :label="2">虚户</el-radio>
          <el-radio :label="1">实户</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
  <div class="text-center mt-4">
    <el-button @click="onCancle" size="small">取 消</el-button>
    <el-button type="primary" @click="onConfirm" size="small">下一步</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Ref } from 'vue-property-decorator'

@Component
export default class AccountType extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showAccountType!: boolean

  dialogVisible = true

  @Emit('bindShowAccountDialog')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Emit('bindAccountForm')
  onAccountForm (form: any) {
    return this.form
  }

  title = '新增账户'

  form = {
    bankType: ''
  }

  rules = {
    bankType: [{ required: true, message: '必选', trigger: 'blur' }]
  }

  onConfirm () {
    this.dialogVisible = false
    this.formRef.validate((valid: boolean) => {
      if (valid) {
        this.onAccountForm(this.form)
        this.onSend(this.dialogVisible)
      } else {
        return false
      }
    })
  }

  onCancle () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }

  closeDialog () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }
}
</script>
<style lang="scss" module>
.formModal{
  :global{
    .el-dialog__title{
      font-weight: bold;
    }
    .el-dialog--center .el-dialog__body{
      padding: 20px 90px !important;
    }
  }
}
</style>
