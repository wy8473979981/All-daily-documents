<template>
<modal :before-confirm="beforeConfirm" confirm-text="新增" cancel-text="返回" ref="modal" title="新增账号" width="480px" :class="[$style.formModal]">
<div v-if="showModalFlag">
  <el-form size="small"  ref="formRef" :model="form" label-position="right" label-width="auto" :rules="rules">
    <el-form-item label="账号类型" prop="accountType">
      <el-select v-model="form.accountType" clearable :class="[$style.width100]" placeholder="请选择账号类型">
        <dict-options name="accountType"></dict-options>
      </el-select>
    </el-form-item>
    <el-form-item label="账号" prop="mobileNumber">
      <el-input v-model="form.mobileNumber" :class="[$style.width100]" placeholder="请填写账号"></el-input>
    </el-form-item>
    <el-form-item label="关联客户" prop="customerId" v-if="form.accountType === '1'">
      <el-select v-model="form.customerId" clearable filterable placeholder="请选择关联客户" remote :remote-method="remoteMethod" :class="[$style.width100]">
        <el-option
          v-for="item in relationOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="员工姓名" prop="userNo" :rules="[ { required: true, message: '必填', trigger: 'blur'}]" v-if="form.accountType === '0'">
      <el-select v-model="form.userNo" clearable filterable placeholder="请选择员工姓名" remote :remote-method="remoteQueryName" :class="[$style.width100]" @change="onChangeAccountName">
        <el-option
          v-for="(item, index) in accountNameOptions"
          :key="index"
          :label="item.userName"
          :value="item.userNo">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</div>
</modal>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit, Watch } from 'vue-property-decorator'
import { submitAddAccount, getRemoteCustomerName, getRemoteAccountName } from '@/api/systemSet'
import { validator } from '@/config/validator'

@Component
export default class AddAccount extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  form = {
    mobileNumber: '',
    accountType: '0',
    customerId: '',
    accountName: '',
    userNo: ''
  }

  rules = {
    mobileNumber: [
      { validator: validator('tel'), trigger: 'blur' },
      { required: true, message: '必填', trigger: 'blur' }
    ],
    customerId: [
      { required: true, message: '必填', trigger: 'blur' }
    ],
    userNo: [
      { required: true, message: '必填', trigger: 'blur' }
    ]
  }

  @Emit('reloadAccount') onChangeAccount () {
    return this.form
  }

  relationOptions: Array<any> = []

  accountNameOptions: Array<any> = []

  showModalFlag = false

  edit () {
    this.showModalFlag = true
    return this.modal.open()
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  remoteQueryName (query: any) {
    getRemoteAccountName(query).then((data) => {
      // this.accountNameOptions = data
      if (query !== '') {
        this.accountNameOptions = []
        this.accountNameOptions = data.filter((item: any) => {
          if (item.userName === null) return
          return item.userName.indexOf(query) > -1
        })
      } else {
        this.accountNameOptions = data
      }
    })
  }

  onChangeAccountName (value: string) {
    this.accountNameOptions.forEach((item: any, index: number) => {
      if (item.userNo === value) {
        this.form.accountName = item.userName
      }
    })
  }

  beforeConfirm () {
    return this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        return submitAddAccount(this.form).then((data) => {
          this.$message({
            message: '新增账号成功',
            type: 'success',
            onClose: () => {
              this.onChangeAccount()
            },
            duration: 1500
          })
        })
      }
    })
  }

  mounted () {
    this.remoteMethod('')
    this.remoteQueryName('')
  }
}
</script>

<style lang="scss" module>
.width100{
  width: 100%;
}
.formModal{
  :global{
    .el-dialog__body .index_body_2u9Qn{
      min-height: auto;
    }
  }
}
</style>
