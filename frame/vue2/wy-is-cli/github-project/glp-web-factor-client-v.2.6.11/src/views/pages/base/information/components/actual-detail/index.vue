<template>
<el-dialog  :visible.sync="showDialogDetail"  width="50%" title="详情" :before-close="closeDialog">
<div>
  <el-form size="small"  ref="form" :model="form" label-position="top">
    <glp-card title="关联主体">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.customerName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-card>
    <glp-card title="主体信息">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="主体类型" prop="thirdCustomerType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCustomerType" clearable disabled @change="onChangeThirdCustomerType">
              <dict-options name="bank_dsfkhlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="thirdCustomerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCustomerName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="证件类型" prop="thirdCertType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCertType" clearable disabled >
              <dict-options name="bank_dsfzjlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号" prop="thirdCertNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCertNumber" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="手机号" prop="thirdMobileNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdMobileNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </glp-card>
    <glp-card title="收款账户信息">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行账号" prop="bankAccountNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountNumber" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankNo" clearable disabled filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
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
            <el-select v-model="form.bankProvinceCode" clearable disabled  filterable remote :remote-method="remotebankNo" @change="onChangeProvince">
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
            <el-select v-model="form.bankCityCode" clearable disabled @change="onChangeCity">
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
            <el-select v-model="form.bankBranchNo" clearable disabled @change="onChangeBankBranch">
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
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Watch } from 'vue-property-decorator'
import { editThirdReal, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch } from '@/api/systemSet'

@Component
export default class ActualEdit extends Vue {
  $style!: any

  @Prop() showDialogDetail!: boolean

  @Prop() detailData!: any

  relationOptions: Array<any> = []

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  dialogVisible = true

  customerName = ''

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
    this.relationOptions = []
    this.relationOptions.push({ id: this.detailData.customerId, name: this.detailData.customerName })
    this.riskCheckStatus = this.form.riskCheckStatus
  }

  @Watch('form.bankNo') watchChangeBankNo () {
    this.onChangeBankNo(this.form.bankNo)
  }

  @Watch('form.bankProvinceCode') watchChangeProvinceCode () {
    this.onChangeProvince(this.form.bankProvinceCode)
  }

  @Watch('form.bankBranchNo') watchChangeCityCode () {
    this.onChangeCity(this.form.bankCityCode)
  }

  @Watch('otherForm.bankNo') watchChangeBankNoOter () {
    this.onChangeBankNo(this.otherForm.bankNo)
  }

  @Watch('otherForm.bankProvinceCode') watchChangeProvinceCodeOther () {
    this.onChangeProvince(this.otherForm.bankProvinceCode)
  }

  @Watch('otherForm.bankBranchNo') watchChangeCityCodeOther () {
    this.onChangeCity(this.otherForm.bankCityCode)
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

  onChangeBankNo (value: any) {
    this.bankNoOptions.forEach((item: any, index: number) => {
      if (item.bankNo === value) {
        this.form.bankName = item.bankName
      }
    })
    getRemoteProvince(value).then((data: any) => {
      this.provinceOptions = data
    })
  }

  onChangeProvince (value: any) {
    this.provinceOptions.forEach((item: any, index: number) => {
      if (item.provinceCode === value) {
        this.form.bankProvince = item.province
      }
    })
    let params = {}
    params = {
      bankNo: this.form.bankNo,
      provinceCode: value
    }
    getRemoteCity(params).then((data: any) => {
      this.cityOptions = data
    })
  }

  onChangeCity (value: any) {
    this.cityOptions.forEach((item: any, index: number) => {
      if (item.cityCode === value) {
        this.form.bankCity = item.city
      }
    })
    let params = {}
    params = {
      bankNo: this.form.bankNo,
      provinceCode: this.form.bankProvinceCode,
      cityCode: value
    }
    getRemoteBankBranch(params).then((data: any) => {
      this.branchOptions = data
    })
  }

  onChangeBankBranch (value: any) {
    this.branchOptions.forEach((item: any, index: number) => {
      if (item.branchNo === value) {
        this.form.bankBranchName = item.branchName
      }
    })
  }

  onChangeThirdCustomerType (value: any) {
    this.form.thirdCertType = value === '1' ? '3' : '1'
  }

  mounted () {
    this.$nextTick(() => {
      this.remotebankNo()
    })
  }
}
</script>
