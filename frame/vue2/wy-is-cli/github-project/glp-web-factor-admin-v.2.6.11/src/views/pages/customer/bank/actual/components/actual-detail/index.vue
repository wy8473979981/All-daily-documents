<template>
<el-dialog  :visible.sync="showDialogDetail"  width="640px" title="详情" :before-close="closeDialog" :class="[$style.formModal]" :center="true">
<div>
  <el-form size="small"  ref="form" :model="form" v-if="showAccountDetail === 2" label-position="top">
    <glp-section title="关联主体" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.customerId" clearable disabled placeholder="客户名称" filterable remote :remote-method="remoteMethod" @change="onChangeCustomerId">
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
          <el-form-item label="主体类型" prop="thirdCustomerType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCustomerType" clearable disabled placeholder="请选择" @change="onChangeThirdCustomerType">
              <dict-options name="bank_dsfkhlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="thirdCustomerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCustomerName" placeholder="" @input="onChangeCustome" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件类型" prop="thirdCertType" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.thirdCertType" clearable placeholder="请选择" disabled>
              <dict-options name="bank_dsfzjlx"></dict-options>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="证件号" prop="thirdCertNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdCertNumber" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="thirdMobileNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.thirdMobileNumber" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </glp-section>
    <glp-section title="收款账户信息" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountNumber" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankNo" clearable  disabled filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
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
        <el-col :span="8">
          <el-form-item label="市/地区/州" prop="bankCityCode" disabled :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
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
        <el-col :span="8">
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
    </glp-section>
    <glp-section title="审批信息" class="mt-4">
      <query-table :columns="columns"  :data-source="approvalLogList" :wrap="false" :pageable="false" ></query-table>
    </glp-section>
  </el-form>
  <el-form size="small"  ref="form" :model="otherForm" v-if="showAccountDetail === 1" label-position="top">
    <glp-section title="关联主体" class="mt-4">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="关联主体" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="otherForm.customerId" clearable disabled placeholder="客户名称" filterable remote :remote-method="remoteMethod" @change="onChangeCustomerId">
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
            <el-input v-model="otherForm.bankAccountName" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="otherForm.bankAccountNumber" placeholder="" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankNo" clearable disabled filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
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
            <el-select v-model="otherForm.bankProvince" clearable disabled filterable remote :remote-method="remotebankNo" @change="onChangeProvince">
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
          <el-form-item label="市/地区/州" prop="bankCity" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankCityCode" clearable disabled @change="onChangeCity">
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
          <el-form-item label="开户支行" prop="bankBranchName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="otherForm.bankBranchNo" clearable disabled @change="onChangeBankBranch">
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
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Watch } from 'vue-property-decorator'
import { getRemoteCustomerName, addThirdReal, addReal, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch, getThirdReal } from '@/api/systemSet'
import { columns } from './config'

@Component
export default class ActualDetail extends Vue {
  $style!: any

  @Prop() showDialogDetail!: boolean

  @Prop() showAccountDetail!: any

  @Prop() id!: any

  @Prop() detailData!: any

  relationOptions: Array<any> = []

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  dialogVisible = true

  columns =columns

  approvalLogList: Array<any> = []

  @Emit('bindshowDialogDetail')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('detailData') onChangeFormDetail (newVal: any) {
    if (this.showAccountDetail === 2) {
      this.form = newVal
      this.approvalLogList = []
      if (this.form.list !== null && this.form.list.length > 1) {
        this.approvalLogList = [this.form.list[1]]
      }
      this.form.thirdCustomerType = newVal.thirdCustomerType.toString()
      this.form.thirdCertType = newVal.thirdCertType.toString()
      this.relationOptions = []
      this.relationOptions.push({ id: newVal.customerId, name: newVal.customerName })
    } else {
      this.otherForm = newVal
      this.relationOptions = []
      this.relationOptions.push({ id: newVal.customerId, name: newVal.bankAccountName })
    }
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
    // customerId: '',
    // thirdCustomerType: '', // 1.企业 2.个人
    // thirdCustomerName: '',
    // thirdCertType: '', // 1.身份证 3.营业执照
    // thirdCertNumber: '',
    // thirdMobileNumber: '',
    // bankAccountName: '',
    // bankAccountNumber: '',
    // bankNo: '',
    // bankName: '',
    // bankCity: '',
    // bankCityCode: '',
    // bankProvince: '',
    // bankProvinceCode: '',
    // bankBranchNo: '',
    // bankBranchName: ''
  }

  otherForm: any = {
    // customerId: '',
    // bankAccountName: '',
    // bankAccountNumber: '',
    // bankNo: '',
    // bankName: '',
    // bankCity: '',
    // bankCityCode: '',
    // bankProvince: '',
    // bankProvinceCode: '',
    // bankBranchNo: '',
    // bankBranchName: ''
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
  remotebankNo () {
    getRemoteBankNo().then((data) => {
      this.bankNoOptions = data
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
    this.branchOptions.forEach((item: any, index: number) => {
      if (this.showAccountDetail === 2) {
        if (item.branchNo === value) {
          this.form.bankBranchName = item.branchName
        }
      } else {
        if (item.cityCode === value) {
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
    this.$nextTick(() => {
      this.remotebankNo()
    })
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
