<template>
<el-dialog  :visible.sync="showEditDialog"  width="640px" title="编辑" :before-close="closeDialog" :class="[$style.formModal]" :center="true">
<div>
  <el-form size="small"  ref="formRef" :model="form" v-if="showAccountDetail === 2" label-position="top">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="实体账户开户行" prop="bindBankName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bindBankName" clearable disabled @change="onChangeBindAccount">
              <el-option
                v-for="(item, index) in bankNameOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实体账户户名-账号" prop="bindBankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bindBankAccountName" clearable disabled>
              <el-option
                v-for="(item, index) in accountOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="所属主体" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.customerId" clearable disabled filterable remote :remote-method="remoteMethod" >
              <el-option
                v-for="(item, index) in relationOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="账户类型" prop="bankCardUsage" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-checkbox-group v-model="form.bankCardUsage" @change="onChangeBankCardUsage">
              <checkbox-options name="bank_zhlx"></checkbox-options>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上海同城转账" prop="shanghaiTransfer" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-radio-group v-model="form.shanghaiTransfer">
              <radio-options name="bank_shtczz"></radio-options>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  <el-form size="small"  ref="formRef" :model="form" v-if="showAccountDetail === 1" label-position="top">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="实体账户开户行" prop="bindBankName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bindBankName" clearable disabled @change="onChangeBindAccount">
              <el-option
                v-for="(item, index) in bankNameOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实体账户户名-账号" prop="bindBankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bindBankAccountName" clearable disabled>
              <el-option
                v-for="(item, index) in accountOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="所属主体" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.customerId" clearable disabled filterable remote :remote-method="remoteMethod" @change="onChangeCustomerName">
              <el-option
                v-for="(item, index) in relationOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="账号" prop="bankAccountNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户类型" prop="bankCardUsage" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-checkbox-group v-model="form.bankCardUsage">
              <checkbox-options name="bank_zhlx"></checkbox-options>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    <query-account ref="queryAccount" :showModal='showModal' @getModal='getModal' @getModalData="getModalData" :paramsObj="paramsObj"></query-account>
  </el-form>
</div>
  <div class="text-center mt-4">
    <el-button @click="onCancle" size="small">取 消</el-button>
    <el-button type="primary" @click="onConfirm" :loading="loading" size="small">确 定</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, PropSync, Emit, Watch } from 'vue-property-decorator'
import { getSupervisorSelect, addSupervisorVirtual, addSupervisorReal, editSupervisorVirtual, editSupervisorReal, getRemoteCustomerName } from '@/api/systemSet'
import QueryAccount from './components/query-account/index.vue'

@Component({
  components: { QueryAccount }
})
export default class VirtualEdit extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showEditDialog!: boolean

  @Prop() showAccountDetail!: any

  @Ref() queryAccount!: QueryAccount

  @Prop() editForm!: any

  bankNameOptions: Array<any> = []

  relationOptions: Array<any> = []

  accountOptions: Array<any> = []

  singleSelect: Array<any> = []

  dialogVisible = true

  showModal = false // 账户弹窗

  loading = false

  @Emit('bindShowDialog')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('showAccountDetail', { immediate: true }) onChangeShowAccountDetail () {
    this.onSupervisorSelect()
  }

  @Watch('editForm') onChangeEditForm () {
    this.form = this.editForm
    const bankCardUsage = this.editForm.bankCardUsage
    this.form.bankCardUsage = []
    bankCardUsage.forEach((item: any, index: number) => {
      this.form.bankCardUsage.push(item.toString())
    })
    this.form.shanghaiTransfer = this.editForm.shanghaiTransfer.toString()
    this.relationOptions.push({ id: this.editForm.customerId, name: this.editForm.relatedCustomerName })
  }

  paramsObj = {}

  form: any = {
    bindBankName: '',
    bindBankAccountName: '',
    customerId: '',
    bankAccountName: '',
    shanghaiTransfer: '',
    bankCardUsage: []
  }

  onChangeBankCardUsage (value: any) {
    this.form.bankCardUsage = []
    this.form.bankCardUsage = value
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  onChangeCustomerName (value: any) {
    if (this.relationOptions.length > 0) {
      this.relationOptions.forEach((item, index) => {
        if (item.id === value) {
          this.form.bankAccountName = item.name
        }
      })
    }
  }

  onQueryAccount () {
    this.showModal = true
    this.paramsObj = {
      bankAccountName: this.form.bankAccountName,
      bindBankAccountNumber: this.form.bindBankAccountNumber
    }
  }

  getModal (flag: any) {
    this.showModal = flag
  }

  getModalData (params: any) {
    this.form.bankAccountName = params[0].cifName
    this.form.bankAccountNumber = params[0].acctNo
  }

  onConfirm () {
    this.dialogVisible = false
    this.loading = true
    const params = {
      bankCardUsage: this.form.bankCardUsage,
      shanghaiTransfer: this.form.shanghaiTransfer,
      id: this.form.id
    }
    this.formRef.validate((valid: boolean) => {
      if (valid) {
        if (this.showAccountDetail === 2) {
          // this.form.shanghaiTransfer = Number(this.form.shanghaiTransfer)
          editSupervisorVirtual(params).then((data) => {
            this.loading = false
            this.$message({
              message: '编辑成功',
              type: 'success',
              onClose: () => {
                this.onSend(this.dialogVisible)
              },
              duration: 1500
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          editSupervisorReal(params).then((data) => {
            this.loading = false
            this.$message({
              message: '编辑成功',
              type: 'success',
              onClose: () => {
                this.onSend(this.dialogVisible)
              },
              duration: 1500
            })
          }).catch(() => {
            this.loading = false
          })
        }
      } else {
        this.loading = false
        return false
      }
    })
  }

  closeDialog () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }

  onCancle () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
  }

  onSupervisorSelect () {
    this.bankNameOptions = []
    getSupervisorSelect(this.showAccountDetail).then((data: any) => {
      data.forEach((item: any, index: number) => {
        this.bankNameOptions.push({ id: item.bindBankAccountNumber, name: item.bindBankName, shopNo: item.bindBankShopNo, bindName: item.bindBankAccountName })
      })
    })
  }

  onChangeBindAccount (value: any) {
    this.accountOptions = []
    this.bankNameOptions.forEach((item: any, index: number) => {
      if (item.name === value) {
        this.form.bindBankShopNo = item.shopNo
        this.form.bindBankAccountNumber = item.id
        this.form.bindBankAccountName = item.bindName
        this.accountOptions.push({ id: item.id, name: item.bindName })
      }
    })
  }

  mounted () {
  }
}
</script>
<style lang="scss" module>
.formModal{
  :global{
    .el-form-item__label{
      padding: 0;
    }
    .el-dialog__title{
      font-weight: bold;
    }
    .el-dialog__body{
      padding: 0 20px 20px 20px
    }
    .el-select,.el-input{
      width: 100%;
    }
  }
}
</style>
