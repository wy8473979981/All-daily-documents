<template>
<el-dialog  :visible.sync="showDialog"  width="50%" title="新增" :before-close="closeDialog">
<div>
  <el-form size="small"  ref="formRef" :model="form" label-position="top" :rules="rules">
    <glp-card>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="关联主体" prop="customerName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.customerName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户名称" prop="bankAccountName" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-input v-model="form.bankAccountName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号" prop="bankAccountNumber">
            <el-input v-model.number="form.bankAccountNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-form-item label="开户行" prop="bankNo" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankNo" clearable filterable remote :remote-method="remotebankNo" @change="onChangeBankNo">
              <el-option
                v-for="item in bankNoOptions"
                :key="item.bankNo"
                :label="item.bankName"
                :value="item.bankNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省/自治区/直辖市" prop="bankProvinceCode" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.bankProvinceCode" clearable filterable @change="onChangeProvince">
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
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
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
import { addBeneficiary, getRemoteBankNo, getRemoteProvince, getRemoteCity, getRemoteBankBranch, getRealname } from '@/api/systemSet'

@Component
export default class ActualAdd extends Vue {
  $style!: any

  @Ref() formRef!: any

  @Prop() showDialog!: boolean

  @Prop() realnameData!: any

  customerObj: Record<string|number, any> = {}

  bankNoOptions: Array<any> = []

  provinceOptions: Array<any> = []

  cityOptions: Array<any> = []

  branchOptions: Array<any> = []

  // realnameData: Record<string|number, any> = {}

  dialogVisible = true

  loading = false

  form: any = {
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
    bankAccountNumber: [
      { required: true, message: '必填', trigger: 'blur' },
      { type: 'number', message: '请输入数字', trigger: 'blur' }
    ]
  }

  @Emit('bindShowDialog')
  onSend (flag: boolean) {
    return this.dialogVisible
  }

  @Watch('realnameData') onChangeRealname () {
    this.form = this.realnameData
    this.form.bankAccountName = this.form.customerName = this.realnameData.bankAccountName
    this.form.customerId = this.realnameData.customerId
    delete this.form.status
    delete this.form.creatorId
    delete this.form.creatorType
    delete this.form.ifRecvChangeMsg
    this.form.bankAccountNumber = Number(this.realnameData.bankAccountNumber)
    getRemoteProvince(this.realnameData.bankNo).then((data: any) => {
      this.provinceOptions = data
      const params = {
        bankNo: this.realnameData.bankNo,
        provinceCode: this.realnameData.bankProvinceCode
      }
      return getRemoteCity(params)
    }).then((data: any) => {
      this.cityOptions = data

      const params = {
        bankNo: this.realnameData.bankNo,
        provinceCode: this.realnameData.bankProvinceCode,
        cityCode: this.realnameData.bankCityCode
      }
      return getRemoteBankBranch(params)
    }).then((data: any) => {
      this.branchOptions = data
    })
  }

  @Watch('customerObj') onChangeCustomer () {
    this.form.bankAccountName = this.customerObj.customerName
    this.form.customerName = this.customerObj.customerName
    this.form.customerId = this.customerObj.customerId
  }

  onConfirm () {
    this.dialogVisible = false
    this.formRef.validate((valid: any) => {
      if (!valid) {
        return false
      } else {
        delete this.form.customerName
        delete this.form.id
        addBeneficiary(this.form).then((data) => {
          this.$message({
            message: '新增成功',
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
    this.$set(this.form, 'bankCityCode', '')
    this.$set(this.form, 'bankBranchNo', '')
    this.provinceOptions.forEach((item: any, index: number) => {
      if (item.provinceCode === value) {
        this.form.bankProvince = item.province
      }
    })
    const params = {
      bankNo: this.form.bankNo,
      provinceCode: value
    }
    getRemoteCity(params).then((data: any) => {
      this.cityOptions = data
    })
  }

  onChangeCity (value: any) {
    this.$set(this.form, 'bankBranchNo', '')
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
    this.$set(this.form, 'bankBranchNo', value)
    this.branchOptions.forEach((item: any, index: number) => {
      if (item.branchNo === value) {
        this.form.bankBranchName = item.branchName
      }
    })
  }

  mounted () {
    this.remotebankNo('')
    const userInfo = this.$auth?.principle?.user?.userInfo
    this.customerObj = {
      customerId: userInfo.id,
      customerName: userInfo.customerName
    }
  }
}
</script>
