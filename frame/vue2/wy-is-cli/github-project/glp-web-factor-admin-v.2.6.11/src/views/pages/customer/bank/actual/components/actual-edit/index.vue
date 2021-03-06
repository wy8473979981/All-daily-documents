<template>
<el-dialog  :visible.sync="showDialogEdit"  width="640px" title="编辑" :before-close="closeDialog" :class="[$style.formModal]" :center="true">
<div>
  <el-form size="small"  ref="formRef" :model="form" v-if="showAccountDetail === 2" label-position="top">
    <glp-section title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.customerId" placeholder="请选择关联主体" disabled clearable filterable remote :remote-method="remoteMethod" @change="onChangeCustomerId">
              <el-option
                v-for="item in relationOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
    <glp-section title="主体信息" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="主体类型" prop="thirdCustomerType" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.thirdCustomerType" placeholder="请选择主体类型" clearable disabled @change="onChangeThirdCustomerType">
              <dict-options name="bank_dsfkhlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="thirdCustomerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCustomerName" placeholder="请填写客户名称" disabled @input="onChangeCustome"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型" prop="thirdCertType" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.thirdCertType" placeholder="请选择证件类型" clearable disabled>
              <dict-options name="bank_dsfzjlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="证件号" prop="thirdCertNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCertNumber" disabled placeholder="请填写证件号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="thirdMobileNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdMobileNumber" disabled placeholder="请填写手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
    <glp-section title="收款账户信息" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" placeholder="请填写账户名称" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber">
            <el-input v-model="form.bankAccountNumber" placeholder="请填写银行账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bankNo" placeholder="请选择开户行" clearable  filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
              <el-option
                v-for="item in bankNoOptions"
                :key="item.bankNo"
                :label="item.bankName"
                :value="item.bankNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="省/自治区/直辖市" prop="bankProvinceCode" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bankProvinceCode" placeholder="请选择省/自治区/直辖市" clearable @change="onChangeProvince">
              <el-option
                v-for="item in provinceOptions"
                :key="item.provinceCode"
                :label="item.province"
                :value="item.provinceCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市/地区/州" prop="bankCityCode" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bankCityCode" placeholder="请选择市/地区/州" clearable @change="onChangeCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.cityCode"
                :label="item.city"
                :value="item.cityCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户支行" prop="bankBranchNo" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.bankBranchNo" placeholder="请选择开户支行" clearable @change="onChangeBankBranch">
              <el-option
                v-for="item in branchOptions"
                :key="item.branchNo"
                :label="item.branchName"
                :value="item.branchNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
  </el-form>
  <el-form size="small"  ref="formRef" :model="otherForm" v-if="showAccountDetail === 1" label-position="top">
    <glp-section title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.customerId"  clearable placeholder="请选择关联主体" filterable remote :remote-method="remoteMethod"  @change="onChangeCustomerId">
              <el-option
                v-for="item in relationOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
    <glp-section title="收款账户信息" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="otherForm.bankAccountName" disabled placeholder="请填写账户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="otherForm.bankAccountNumber" placeholder="请填写银行账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankNo" placeholder="请选择开户行" clearable filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
              <el-option
                v-for="item in bankNoOptions"
                :key="item.bankNo"
                :label="item.bankName"
                :value="item.bankNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="省/自治区/直辖市" prop="bankProvinceCode" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankProvinceCode" placeholder="请选择省/自治区/直辖市" clearable @change="onChangeProvince">
              <el-option
                v-for="item in provinceOptions"
                :key="item.provinceCode"
                :label="item.province"
                :value="item.provinceCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市/地区/州" prop="bankCityCode" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankCityCode" placeholder="请选择市/地区/州" clearable @change="onChangeCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.cityCode"
                :label="item.city"
                :value="item.cityCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户支行" prop="bankBranchNo" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankBranchNo" placeholder="请选择开户支行" clearable @change="onChangeBankBranch">
              <el-option
                v-for="item in branchOptions"
                :key="item.branchNo"
                :label="item.branchName"
                :value="item.branchNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
  </el-form>
</div>
  <div class="text-center mt-4">
    <el-button @click="onCancle" size="small">取 消</el-button>
    <el-button type="primary" @click="onConfirm" :loading="loading" size="small">确 定</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Watch, Ref } from 'vue-property-decorator'
import { getRemoteCustomerName, addReal, editReal, editThirdReal, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch } from '@/api/systemSet'
import { validator } from '@/config/validator'

@Component
export default class ActualEdit extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showDialogEdit!: boolean

  @Prop() showAccountDetail!: any

  @Prop() editData!: any

  relationOptions: Array<any> = []

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  dialogVisible = true

  loading = false

  @Emit('bindshowDialogDetail')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('form.thirdCustomerType') onChangeCertType () {
    if (this.form.thirdCustomerType === '1') {
      this.rules.thirdCertNumber = [
        { validator: validator('credit-code'), trigger: 'blur' },
        { required: true, message: '必填', trigger: 'blur' }
      ]
    } else {
      this.rules.thirdCertNumber = [
        { validator: validator('id-card'), trigger: 'blur' },
        { required: true, message: '必填', trigger: 'blur' }
      ]
    }
  }

  @Watch('editData') onChangeFormEdit (newVal: any) {
    if (this.showAccountDetail === 2) {
      delete newVal.list
      delete newVal.processId
      delete newVal.remark
      delete newVal.riskCheckTime
      delete newVal.riskChecker
      delete newVal.riskCheckStatus
      this.form = newVal
      this.form.thirdCustomerType = this.form.thirdCustomerType.toString()
      this.form.thirdCertType = this.form.thirdCertType.toString()
      this.relationOptions = []
      this.relationOptions.push({ id: newVal.customerId, name: newVal.customerName })
    } else {
      delete newVal.creatorId
      delete newVal.creatorType
      delete newVal.ifRecvChangeMsg
      delete newVal.status
      this.otherForm = newVal
      this.relationOptions = []
      this.relationOptions.push({ id: newVal.customerId, name: newVal.bankAccountName })
    }
    getRemoteProvince(newVal.bankNo).then((data: any) => {
      this.provinceOptions = data
      let params = {}
      params = {
        bankNo: newVal.bankNo,
        provinceCode: newVal.bankProvinceCode
      }
      return getRemoteCity(params)
    }).then((data: any) => {
      this.cityOptions = data
      let params = {}
      params = {
        bankNo: newVal.bankNo,
        provinceCode: newVal.bankProvinceCode,
        cityCode: newVal.bankCityCode
      }
      return getRemoteBankBranch(params)
    }).then((data: any) => {
      this.branchOptions = data
    })
  }

  title = '选择所属主体'

  form: any = {
    customerId: '',
    thirdCustomerType: '', // 1.企业 2.个人
    thirdCustomerName: '',
    thirdCertType: '', // 1.身份证 3.营业执照
    thirdCertNumber: '',
    thirdMobileNumber: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankNo: '',
    bankName: '',
    bankCity: '',
    bankCityCode: '',
    bankProvince: '',
    bankProvinceCode: '',
    bankBranchNo: '',
    bankBranchName: ''
  }

  otherForm: any = {
    customerId: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankNo: '',
    bankName: '',
    bankCity: '',
    bankCityCode: '',
    bankProvince: '',
    bankProvinceCode: '',
    bankBranchNo: '',
    bankBranchName: ''
  }

  rules = {
    thirdCertNumber: [
      { validator: validator('id-card'), trigger: 'blur' },
      { required: true, message: '必填', trigger: 'blur' }
    ],
    thirdMobileNumber: [
      { validator: validator('tel'), trigger: 'blur' },
      { required: true, message: '必填', trigger: 'blur' }
    ],
    bankAccountNumber: [
      // { validator: validator('bank-no'), trigger: 'blur' },
      { required: true, message: '必填', trigger: 'blur' }
      // { type: 'number', message: '请输入数字' }
    ]
  }

  onConfirm () {
    this.dialogVisible = false
    this.loading = true
    this.formRef.validate((valid: boolean) => {
      if (valid) {
        if (this.showAccountDetail === 1) {
          delete this.otherForm.customerId
          delete this.otherForm.customerName
          delete this.otherForm.bankAccountName
          editReal(this.otherForm).then((data: any) => {
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
          delete this.form.thirdCertNumber
          delete this.form.thirdCertType
          delete this.form.thirdCustomerName
          delete this.form.thirdCustomerType
          delete this.form.thirdMobileNumber
          delete this.form.customerId
          delete this.form.customerName
          delete this.form.status
          delete this.form.creatorId
          delete this.form.creatorType
          delete this.form.bankAccountName
          editReal(this.form).then((data: any) => {
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

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  // 获取银行列表
  remotebankNo (query: string) {
    getRemoteBankNo().then((data) => {
      if (query !== '') {
        this.bankNoOptions = []
        this.bankNoOptions = data.filter((item: any) => {
          if (item.bankName === null) return
          return item.bankName.indexOf(query) > -1
        })
      } else {
        this.bankNoOptions = data
      }
    })
  }

  onChangeCustomerId (val: any) {
    if (this.showAccountDetail === 2) {
      this.form.customerId = val
    } else {
      this.otherForm.customerId = val
    }
  }

  onChangeBankNo (value: any) {
    this.$set(this.form, 'bankProvinceCode', '')
    this.$set(this.form, 'bankCityCode', '')
    this.$set(this.form, 'bankBranchNo', '')
    this.$set(this.otherForm, 'bankProvinceCode', '')
    this.$set(this.otherForm, 'bankCityCode', '')
    this.$set(this.otherForm, 'bankBranchNo', '')
    this.bankNoOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.bankNo === value) {
          this.form.bankName = item.bankName
        }
      } else {
        if (item.bankNo === value) {
          this.otherForm.bankName = item.bankName
        }
      }
    })
  }

  onChangeProvince (value: any) {
    this.$set(this.form, 'bankCityCode', '')
    this.$set(this.form, 'bankBranchNo', '')
    this.$set(this.otherForm, 'bankCityCode', '')
    this.$set(this.otherForm, 'bankBranchNo', '')
    this.provinceOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.provinceCode === value) {
          this.form.bankProvince = item.province
        }
      } else {
        if (item.provinceCode === value) {
          this.otherForm.bankProvince = item.province
        }
      }
    })
  }

  onChangeCity (value: any) {
    this.$set(this.form, 'bankBranchNo', '')
    this.$set(this.otherForm, 'bankBranchNo', '')
    this.cityOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.cityCode === value) {
          this.form.bankCity = item.city
        }
      } else {
        if (item.cityCode === value) {
          this.otherForm.bankCity = item.city
        }
      }
    })
  }

  onChangeBankBranch (value: any) {
    this.$set(this.form, 'bankBranchNo', value)
    this.$set(this.otherForm, 'bankBranchNo', value)
    this.branchOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.branchNo === value) {
          this.form.bankBranchName = item.branchName
        }
      } else {
        if (item.branchNo === value) {
          this.otherForm.bankBranchName = item.branchName
        }
      }
    })
  }

  onChangeThirdCustomerType (value: any) {
    if (this.showAccountDetail === 2) {
      this.form.thirdCertType = value === '1' ? '3' : '1'
    } else {
      this.otherForm.thirdCertType = value === '1' ? '3' : '1'
    }
  }

  onChangeCustome (value: any) {
    if (this.showAccountDetail === 2) {
      this.form.bankAccountName = value
    } else {
      this.otherForm.bankAccountName = value
    }
  }

  mounted () {
    this.remotebankNo('')
  }
}
</script>
<style lang="scss" module>
.formModal{
  :global{
    .el-form-item__label {
      padding: 0;
    }
    .el-dialog__title {
      font-weight: bold;
    }
    .el-dialog__body{
      padding: 0 20px 20px 20px
    }
  }
}
</style>
