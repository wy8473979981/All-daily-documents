<template>
<modal :before-confirm="beforeConfirmFn" confirm-text="保存" cancel-text="返回" ref="modal" title="关联客户" width="480px" :class="[$style.formModal]">
<div>
  <el-form size="small"  ref="formRef" :model="form" label-position="right" label-width="auto">
    <el-form-item label="账号" prop="accountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
      <el-input v-model="form.accountName" :class="[$style.width100]" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="关联客户" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
      <el-select v-model="form.customerId" clearable filterable placeholder="请查询选择关联客户" remote :remote-method="remoteMethod" :class="[$style.width100]">
        <el-option
          v-for="(item, index) in relationOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</div>
</modal>
</template>

<script lang="ts">

import { Vue, Component, Ref, Emit } from 'vue-property-decorator'
import { submitRelevanceCustomer, getRemoteCustomerName } from '@/api/systemSet'

@Component
export default class RelationCustomer extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  form: any = {
    customerId: '',
    userId: ''
  }

  @Emit('reloadAccount') onChangeAccount () {
    return this.form
  }

  relationOptions: Array<any> = []

  openModel (row: any) {
    this.form.userId = row.userId
    this.form.accountName = row.loginName
    this.form.accountType = row.accountType
    this.form.customerId = row.customerId
    if (row.customerId === '0' || row.customerId === 0) {
      this.relationOptions = []
    }
    this.relationOptions.push({
      id: row.customerId,
      name: row.customerName
    })
    return this.modal.open()
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  beforeConfirmFn () {
    return this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        return submitRelevanceCustomer(this.form).then((data) => {
          this.$message({
            message: '关联客户成功',
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
