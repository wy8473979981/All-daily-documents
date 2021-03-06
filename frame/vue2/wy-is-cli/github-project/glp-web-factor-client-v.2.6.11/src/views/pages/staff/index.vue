<template>
<el-dialog  :visible.sync="showDialog"  width="640px" title="绑定客户" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
<div>
  <el-form size="small"  ref="formRef" :model="form" label-position="left">
    <glp-card>
      <el-row>
        <el-col :span="24" :class="[$style.marginBottom20]">您好，{{user.name}},请选择您代理的客户</el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <el-form-item label="关联客户" prop="customerId" :rules="[{ required: true, message: '必填', trigger: 'blur'}]">
            <el-select v-model="form.customerId" clearable filterable placeholder="请输入关键字查询" remote :remote-method="remoteMethod" >
              <el-option
                v-for="(item, index) in relationOptions"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :class="[$style.marginBottom20]"><el-link type="primary">若需要切换客户，请注销后，重新登录</el-link></el-col>
      </el-row>
      <el-row>
        <el-col><p><el-checkbox v-model="isChecked"></el-checkbox><span :class="[$style.padding10]">我保证代理的客户填写的信息真实有效并对因信息填写导致的损失承担赔偿责任</span></p></el-col>
      </el-row>
    </glp-card>
  </el-form>
</div>
  <div slot="footer" class="text-center">
    <el-button type="primary" @click="onConfirm" :disabled="!isChecked">确 定</el-button>
  </div>
</el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, PropSync, Emit, Watch, Ref } from 'vue-property-decorator'
import { getRemoteCustomerName, submitRelevanceCustomer } from '@/api/systemSet'

@Component
export default class Staff extends Vue {
  $style!: any

  @Ref() formRef!: any

  customerObj: Record<string|number, any> = {}

  relationOptions: Array<any> = []

  showDialog = true

  userInfo: any = ''

  user: any = ''

  formTitle: any = ''

  isChecked: any = true

  form: any = {
    customerId: ''
  }

  onConfirm () {
    this.formRef.validate().then((valid: boolean) => {
      if (!valid) {
        return false
      } else {
        Object.assign(this.form, {
          accountType: this.user.userType,
          accountName: this.user.loginName,
          userId: this.userInfo.userId,
          userNo: this.userInfo.userNo
        })
        return submitRelevanceCustomer(this.form).then((data) => {
          this.$message({
            message: '关联客户成功',
            type: 'success',
            onClose: () => {
              this.$router.push('/')
            },
            duration: 1500
          })
        }).catch(() => {})
      }
    })
  }

  remoteMethod (query: any) {
    getRemoteCustomerName({ name: query }).then((data) => {
      this.relationOptions = data
    })
  }

  mounted () {
    this.userInfo = this.$auth?.principle?.user?.userInfo
    this.user = this.$auth?.principle?.user
    console.log(this.$auth)
  }
}
</script>

<style lang="scss" module>
.width100{
  width: 100%;
}
.marginBottom20 {
  margin-bottom: 20px;
}
.dialogFooter {
  text-align: center;
  margin: 0 auto;
}
.padding10 {
  padding: 0 10px;
}
</style>
