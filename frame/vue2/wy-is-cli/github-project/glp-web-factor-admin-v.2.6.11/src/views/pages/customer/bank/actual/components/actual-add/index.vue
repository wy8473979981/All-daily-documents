<template>
<el-dialog  :visible.sync="showDialog"  width="640px" title="新增" :before-close="closeDialog" :class="[$style.formModal]" :center="true">
<div v-if="showAccountDetail === 2">
  <el-form size="small"  ref="formRef" :model="form"  :rules="rules" label-position="top">
    <glp-section title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.customerId" clearable placeholder="请选择关联主体" filterable remote :remote-method="remoteMethod">
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
    <glp-section title="主体信息">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="主体类型" prop="thirdCustomerType">
            <el-select v-model="form.thirdCustomerType" clearable placeholder="请选择主体类型" @change="onChangeThirdCustomerType">
              <dict-options name="bank_dsfkhlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="thirdCustomerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCustomerName" placeholder="请填写客户名称" @input="onChangeCustome"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型" prop="thirdCertType" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="form.thirdCertType" clearable placeholder="请选择证件类型" disabled>
              <dict-options name="bank_dsfzjlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="证件号" prop="thirdCertNumber">
            <el-input v-model="form.thirdCertNumber" placeholder="请填写证件号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="thirdMobileNumber">
            <el-input v-model="form.thirdMobileNumber" placeholder="请填写手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
    <glp-section title="收款账户信息">
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
            <el-select v-model="form.bankNo" placeholder="请填写开户行" clearable filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
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
</div>
<div v-if="showAccountDetail === 1">
  <el-form size="small"  ref="formRef" :model="otherForm" label-position="top" :rules="rules">
    <glp-section title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必选', trigger: 'blur'}]">
            <el-select v-model="otherForm.customerId" clearable placeholder="请选择关联主体" filterable remote :remote-method="remoteMethod" @change="onChangeCustomerName">
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
    <glp-section title="收款账户信息">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="otherForm.bankAccountName" disabled placeholder="请填写账户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber">
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
          <el-form-item label="省/自治区/直辖市" prop="bankProvinceCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
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
          <el-form-item label="市/地区/州" prop="bankCityCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
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
          <el-form-item label="开户支行" prop="bankBranchNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
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
import { getRemoteCustomerName, addThirdReal, addReal, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch } from '@/api/systemSet'
import { validator } from '@/config/validator'

@Component
export default class ActualAdd extends Vue {
  $style!: any

  @Prop({ type: Boolean, default: false }) showDialog!: boolean

  @Prop() showAccountDetail!: any

  @Ref() formRef!: any

  relationOptions: Array<any> = []

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  dialogVisible: any = true

  loading = false

  rules = {
    thirdCustomerType: [
      { required: true, message: '必填', trigger: 'blur' }
    ],
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
      { required: true, message: '必选', trigger: 'blur' }
      // { type: 'number', message: '请输入数字' }
    ]
  }

  @Emit('bindShowDialog')
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

  onConfirm () {
    this.loading = true
    if (this.showAccountDetail === 2) {
      this.formRef.validate((valid: boolean) => {
        if (!valid) {
          this.loading = false
          return false
        } else {
          addThirdReal(this.form).then((data) => {
            this.loading = false
            this.$message({
              message: '新增成功',
              type: 'success',
              onClose: () => {
                this.dialogVisible = false
                this.onSend(this.dialogVisible)
              },
              duration: 1500
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    } else {
      this.formRef.validate((valid: boolean) => {
        if (!valid) {
          this.loading = false
          return false
        } else {
          addReal(this.otherForm).then((data) => {
            this.loading = false
            this.$message({
              message: '新增成功',
              type: 'success',
              onClose: () => {
                this.dialogVisible = false
                this.onSend(this.dialogVisible)
              },
              duration: 1500
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }

  closeDialog () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
    this.formRef.resetFields()
  }

  onCancle () {
    this.dialogVisible = false
    this.onSend(this.dialogVisible)
    this.formRef.resetFields()
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  onChangeCustomerName (id: any) {
    this.relationOptions.forEach((item: any, index: number) => {
      if (item.id === id) {
        this.otherForm.bankAccountName = item.name
      }
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
    getRemoteProvince(value).then((data: any) => {
      this.provinceOptions = data
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
    let params = {}
    if (this.showAccountDetail === 2) {
      params = {
        bankNo: this.form.bankNo,
        provinceCode: value
      }
    } else {
      params = {
        bankNo: this.otherForm.bankNo,
        provinceCode: value
      }
    }
    getRemoteCity(params).then((data: any) => {
      this.cityOptions = data
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
    let params = {}
    if (this.showAccountDetail === 2) {
      params = {
        bankNo: this.form.bankNo,
        provinceCode: this.form.bankProvinceCode,
        cityCode: value
      }
    } else {
      params = {
        bankNo: this.otherForm.bankNo,
        provinceCode: this.otherForm.bankProvinceCode,
        cityCode: value
      }
    }
    getRemoteBankBranch(params).then((data: any) => {
      this.branchOptions = data
    })
  }

  onChangeBankBranch (value: any) {
    this.$set(this.form, 'bankBranchNo', value)
    this.$set(this.otherForm, 'bankBranchNo', value)
    this.branchOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.branchNo === value) {
          this.form.bankBranchName = item.branchName
          this.form.bankBranchNo = value
        }
      } else {
        if (item.branchNo === value) {
          this.otherForm.bankBranchName = item.branchName
          this.otherForm.bankBranchNo = value
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
    .el-form-item__label{
      padding: 0;
    }
    .el-dialog__title{
      font-weight: bold;
    }
    .el-dialog__body{
      padding: 0 20px 20px 20px
    }
  }
}
</style>
