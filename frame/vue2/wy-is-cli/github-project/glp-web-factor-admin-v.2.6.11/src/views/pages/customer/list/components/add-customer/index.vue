<template>
  <modal
    :before-confirm="beforeConfirm"
    confirm-text="确定"
    cancel-text="返回"
    ref="modal"
    title="新增客户"
    width="480px"
  >
    <div v-if="showModalFlag">
      <el-form
        size="medium "
        ref="formRef"
        :model="form"
        label-position="right"
        label-width="auto"
        :rules="rules"
      >
        <el-form-item label="客户类型" prop="customerType">
          <el-select
            v-model="form.customerType"
            clearable
            placeholder="请选择客户类型"
            :class="[$style.width100]"
            @change="onChangeCustomer"
          >
            <dict-options name="charCustomerType"></dict-options>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificateType">
          <el-select
            v-model="form.certificateType"
            clearable
            placeholder="请选择证件类型"
            :class="[$style.width100]"
          >
            <dict-options name="qykh" v-if="type === 'ENTERPRISE'"></dict-options>
            <dict-options name="grkh" v-if="type === 'INDIVIDUAL'"></dict-options>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" :class="[$style.width100]" placeholder="请填写客户名称"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificateId">
          <el-input
            v-model="form.certificateId"
            :class="[$style.width100]"
            placeholder="请填写证件号码"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { submitAddCustomer } from '@/api/systemSet'
import { validator } from '@/config/validator'

@Component
export default class AddCustomer extends Vue {
  @Ref() modal!: any

  @Ref() formRef!: any

  $style!: any

  showModalFlag: any = false

  form = {
    customerType: '',
    certificateType: '',
    certificateId: '',
    name: ''
  }

  type = '' // 选择的客户类型 ENTERPRISE,INDIVIDUAL

  rules = {
    certificateId: [
      { required: true, message: '必输', trigger: 'blur' },
      { validator: validator('id-card'), trigger: 'blur' }
    ],
    customerType: [
      { required: true, message: '必输', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '必输', trigger: 'blur' }
    ],
    certificateType: [
      { required: true, message: '必输', trigger: 'blur' }
    ]
  }

  @Watch('form.customerType') onChangeCertType () {
    if (this.form.customerType === 'ENTERPRISE') {
      this.rules.certificateId = [
        { validator: validator('credit-code'), trigger: 'blur' },
        { required: true, message: '必填', trigger: 'blur' }
      ]
    } else {
      this.rules.certificateId = [
        { validator: validator('id-card'), trigger: 'blur' },
        { required: true, message: '必填', trigger: 'blur' }
      ]
    }
  }

  edit () {
    this.showModalFlag = true
    return this.modal.open()
  }

  beforeConfirm () {
    // Object.assign(this.form, { appId: 'FACTORING' })
    this.form.certificateId.toString()
    return this.formRef.validate().then((valid: any) => {
      if (!valid) {
        return false
      } else {
        return submitAddCustomer(this.form).then((data: any) => {
          if (data !== null) {
            this.$message({
              message: '新增成功',
              type: 'success',
              duration: 1500
            })
            const result = data
            if (this.form.customerType === 'ENTERPRISE') {
              this.$router.push(
                `/customer/list/enterprise-edit/${result}?type=edit`
              )
            } else {
              this.$router.push(`/customer/list/individ-edit/${result}?type=edit`)
            }
          }
        })
      }
    })
  }

  onChangeCustomer (value: any) {
    this.type = value
  }

  mounted () {}
}
</script>
<style style="scss"  module>
.width100 {
  width: 100%;
}
</style>
