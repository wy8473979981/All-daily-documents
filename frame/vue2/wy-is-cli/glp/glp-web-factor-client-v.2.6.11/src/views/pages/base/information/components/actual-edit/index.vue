<template>
<el-dialog  :visible.sync="showDialogEdit"  width="50%" title="编辑" :before-close="closeDialog">
<div>
  <el-form size="small"  ref="formRef" :model="form" label-position="top" :rules="rules">
    <glp-card title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.customerName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-card>
    <glp-card title="主体信息">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="主体类型" prop="thirdCustomerType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCustomerType" clearable placeholder="请选择" @change="onChangeThirdCustomerType">
              <dict-options name="bank_dsfkhlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="thirdCustomerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCustomerName" :disabled="riskCheckStatus === 1" @input="onChangeCustome"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="证件类型" prop="thirdCertType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCertType" clearable placeholder="请选择" disabled>
              <dict-options name="bank_dsfzjlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号" prop="thirdCertNumber">
            <el-input v-model="form.thirdCertNumber" :disabled="riskCheckStatus === 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="手机号" prop="thirdMobileNumber">
            <el-input v-model="form.thirdMobileNumber" :disabled="riskCheckStatus === 1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </glp-card>
    <glp-card title="收款账户信息">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行账号" prop="bankAccountNumber" >
            <el-input v-model.number="form.bankAccountNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankNo" clearable  filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
              <el-option
                v-for="item in bankNoOptions"
                :key="item.bankNo"
                :label="item.bankName"
                :value="item.bankNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省/自治区/直辖市" prop="bankProvinceCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankProvinceCode" clearable  filterable remote :remote-method="remotebankNo" @change="onChangeProvince">
              <el-option
                v-for="item in provinceOptions"
                :key="item.provinceCode"
                :label="item.province"
                :value="item.provinceCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="市/地区/州" prop="bankCityCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankCityCode" clearable @change="onChangeCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.cityCode"
                :label="item.city"
                :value="item.cityCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户支行" prop="bankBranchNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankBranchNo" clearable @change="onChangeBankBranch">
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
    </glp-card>
  </el-form>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onCancle">取 消</el-button>
    <el-button type="primary" @click="onConfirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Watch, Ref } from 'vue-property-decorator'
import { editThirdReal, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch } from '@/api/systemSet'
import { validator } from '@/config/validator'

@Component
export default class ActualEdit extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showDialogEdit!: boolean

  @Prop() detailData!: any

  relationOptions: Array<any> = []

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  dialogVisible = true

  riskCheckStatus = ''

  @Emit('bindshowDialogDetail')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('detailData') onChangeForm () {
    this.form = this.detailData
    this.form.customerName = this.detailData.customerName
    this.form.thirdCustomerType = this.form.thirdCustomerType.toString()
    this.form.thirdCertType = this.form.thirdCertType.toString()
    this.form.bankAccountNumber = Number(this.detailData.bankAccountNumber)
    this.relationOptions = []
    this.relationOptions.push({ id: this.detailData.customerId, name: this.detailData.customerName })
    delete this.form.creatorId
    delete this.form.creatorType
    delete this.form.list
    delete this.form.remark
    delete this.form.riskChecker
    delete this.form.status
    delete this.form.customerId
    delete this.form.riskCheckTime
    delete this.form.processId
    this.riskCheckStatus = this.form.riskCheckStatus

    getRemoteProvince(this.detailData.bankNo).then((data: any) => {
      this.provinceOptions = data
      let params = {}
      params = {
        bankNo: this.detailData.bankNo,
        provinceCode: this.detailData.bankProvinceCode
      }
      return getRemoteCity(params)
    }).then((data: any) => {
      this.cityOptions = data
      let params = {}
      params = {
        bankNo: this.detailData.bankNo,
        provinceCode: this.detailData.bankProvinceCode,
        cityCode: this.detailData.bankCityCode
      }
      return getRemoteBankBranch(params)
    }).then((data: any) => {
      this.branchOptions = data
    })
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
      { required: true, message: '必填', trigger: 'blur' },
      { type: 'number', message: '请输入数字', trigger: 'blur' }
    ]
  }

  onConfirm () {
    this.dialogVisible = false
    delete this.form.riskCheckStatus
    this.formRef.validate((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        delete this.form.customerName
        editThirdReal(this.form).then((data: any) => {
          this.$message({
            message: '编辑成功',
            type: 'success',
            onClose: () => {
              this.onSend(this.dialogVisible)
            },
            duration: 1500
          })
        })
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

  // 获取银行列表
  remotebankNo () {
    getRemoteBankNo().then((data) => {
      this.bankNoOptions = data
    })
  }

  onChangeCustomerId (val: any) {
    this.form.customerId = val
  }

  onChangeBankNo (value: any) {
    this.$set(this.form, 'bankProvinceCode', '')
    this.$set(this.form, 'bankCityCode', '')
    this.$set(this.form, 'bankBranchNo', '')
    this.bankNoOptions.forEach((item: any, index: number) => {
      if (item.bankNo === value) {
        this.form.bankName = item.bankName
      }
    })
  }

  onChangeProvince (value: any) {
    this.$set(this.form, 'bankCityCode', '')
    this.$set(this.form, 'bankBranchNo', '')
    this.provinceOptions.forEach((item: any, index: number) => {
      if (item.provinceCode === value) {
        this.form.bankProvince = item.province
      }
    })
  }

  onChangeCity (value: any) {
    this.$set(this.form, 'bankBranchNo', '')
    this.cityOptions.forEach((item: any, index: number) => {
      if (item.cityCode === value) {
        this.form.bankCity = item.city
      }
    })
  }

  onChangeBankBranch (value: any) {
    this.$set(this.form, 'bankBranchNo', value)
    this.branchOptions.forEach((item: any, index: number) => {
      if (item.branchNo === value) {
        this.form.bankBranchName = item.branchName
      }
    })
  }

  onChangeThirdCustomerType (value: any) {
    this.form.thirdCertType = value === '1' ? '3' : '1'
  }

  onChangeCustome (value: any) {
    this.form.bankAccountName = value
  }

  mounted () {
    this.$nextTick(() => {
      this.remotebankNo()
    })
  }
}
</script>
