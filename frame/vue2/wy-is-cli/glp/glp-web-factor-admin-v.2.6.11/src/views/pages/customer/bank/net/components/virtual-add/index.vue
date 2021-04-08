<template>
<el-dialog  :visible.sync="showDialog"  width="640px" title="新增" :before-close="closeDialog" :close-on-click-modal="false" :class="[$style.formModal]" :center="true">
<div>
  <el-form size="small"  ref="formRef" :model="form" v-if="showAccountDetail === 2" label-position="top">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="实体账户开户行" prop="bindBankName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bindBankName" placeholder="请选择实体账户开户行" clearable @change="onChangeBindAccount">
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
          <el-form-item label="实体账户户名-账号" prop="bindBankAccountName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bindBankAccountName" clearable placeholder="请选择实体账户户名-账号">
              <el-option
                v-for="(item, index) in accountOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right">{{ item.id }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="所属主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.customerId" placeholder="请选择所属主体" clearable filterable remote :remote-method="remoteMethod">
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
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bankAccountName" placeholder="请选择账户名称" clearable filterable remote :remote-method="remoteBankOptions">
              <el-option
                v-for="(item, index) in bankAccountOptions"
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
          <el-form-item label="账户类型" prop="bankCardUsage" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-checkbox-group v-model="form.bankCardUsage">
              <checkbox-options name="bank_zhlx"></checkbox-options>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上海同城转账" prop="shanghaiTransfer" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-radio-group v-model="form.shanghaiTransfer">
              <radio-options name="bank_shtczz"></radio-options>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
  </el-form>
  <el-form size="small"  ref="formRef" :model="form" v-if="showAccountDetail === 1" label-position="top" :rules=rules>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="实体账户开户行" prop="bindBankName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bindBankName" clearable @change="onChangeBindAccount">
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
          <el-form-item label="实体账户户名-账号" prop="bindBankAccountName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bindBankAccountName" clearable>
              <el-option
                v-for="(item, index) in accountOptions"
                :key="index"
                :label="item.name"
                :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right">{{ item.id }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="所属主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: ['blur', 'change']}]">
            <el-select v-model="form.customerId" clearable filterable remote :remote-method="remoteMethod" @change="onChangeCustomerName">
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
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" disabled></el-input>
            <el-button type="text" @click="onQueryAccount" :disabled="!queryBtnFlag">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="账号" prop="bankAccountNumber">
            <el-input v-model="form.bankAccountNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户类型" prop="bankCardUsage" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
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
import { getSupervisorSelect, addSupervisorVirtual, addSupervisorReal, getRemoteCustomerName } from '@/api/systemSet'
import QueryAccount from './components/query-account/index.vue'

@Component({
  components: { QueryAccount }
})
export default class VirtualAdd extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showDialog!: boolean

  @Prop() showAccountDetail!: any

  @Ref() queryAccount!: QueryAccount

  bankNameOptions: Array<any> = []

  relationOptions: Array<any> = []

  accountOptions: Array<any> = []

  bankAccountOptions: Array<any> = []

  singleSelect: Array<any> = []

  dialogVisible = true

  showModal = false // 账户弹窗

  queryBtnFlag = false

  loading = false

  @Emit('bindShowDialog')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('showAccountDetail', { immediate: true }) onChangeShowAccountDetail () {
    this.onSupervisorSelect()
  }

  @Watch('form.customerId') onWatchCustomerId () {
    if (this.showAccountDetail === 1) {
      if (this.form.bindBankAccountName !== '' && this.form.customerId !== '') {
        this.queryBtnFlag = true
      }
    }
  }

  title = '选择所属主体'

  rules = {
    bankAccountNumber: [{ required: true, message: '必填', trigger: 'blur' }]
  }

  paramsObj = {}

  form: any = {
    bankCardUsage: [],
    bankAccountNumber: ''
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  remoteBankOptions (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.bankAccountOptions = data
    })
  }

  onChangeCustomerName (value: any) {
    if (this.showAccountDetail === 1) {
      this.form.bankAccountName = ''
      this.form.bankAccountNumber = ''
      this.formRef.clearValidate('bankAccountNumber')
    }
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
    this.form.bankAccountName = params.cifName
    this.form.bankAccountNumber = params.acctNo
    this.formRef.validateField('bankAccountNumber')
  }

  onConfirm () {
    this.dialogVisible = false
    this.loading = true
    this.formRef.validate((valid: boolean) => {
      if (valid) {
        if (this.showAccountDetail === 2) {
          addSupervisorVirtual(this.form).then((data) => {
            this.loading = false
            this.$message({
              message: '新增成功',
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
          addSupervisorReal(this.form).then((data) => {
            this.loading = false
            this.$message({
              message: '新增成功',
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
    // this.onSupervisorSelect()
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
