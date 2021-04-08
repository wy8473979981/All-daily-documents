<template>
  <div :class="[$style.content]">
    <div :class="[$style.pageTop] ">
      <div class="mr-5">{{formTitle}}</div>
      <div>
        <el-button type="primary" size="small">{{ realnameStatus === 1 ? '已实名' : '未实名'}}</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div :class="[$style.box]">
      <el-form
        ref="companyFormRef"
        :model="companyForm"
        label-position="left"
        v-if="type === 'ENTERPRISE'"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="营业执照">{{companyForm.certId}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人">{{companyForm.lawPersonName}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人身份证号">{{companyForm.lawPersonCertId}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法人手机号">{{companyForm.mobileNumber}}</el-form-item>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="24" :class="[$style.agree]">
            <el-checkbox v-model="agreeFlag" @change="onChangeCheck">
              <el-link :underline="false" class="mr-2">我已阅读并同意&nbsp;</el-link>
              <el-button type="text" @click="onAuthorClick">用户信息授权书</el-button>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        ref="individFormRef"
        :model="individForm"
        label-position="left"
        v-if="type === 'INDIVIDUAL'"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="身份证号">{{individForm.certId}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">{{individForm.mobileNumber}}</el-form-item>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="24" :class="[$style.agree]">
            <el-checkbox v-model="agreeFlag" @change="onChangeCheck">
              <el-link :underline="false" class="mr-2">我已阅读并同意&nbsp;</el-link>
              <el-button type="text" @click="onAuthorClick">用户信息授权书</el-button>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-form>
      <el-row justify="center">
        <el-col :span="24" :class="[$style.textC]">
          <el-button type="primary" @click="onLogin" :disabled="disabledFlag === '0'">登录系统</el-button>
        </el-col>
      </el-row>
    </div>
    <modal :before-confirm='beforeConfirmFn' confirm-text='确定' cancel-text='取消' ref='modal' title='用户信息授权书'>
      <document></document>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { loginSystem } from '@/api/systemSet'
import Document from './document.vue'

@Component({
  components: {
    Document
  }
})
export default class Onlogin extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() companyFormRef!: any

  @Ref() individFormRef!: any

   @Ref() modal!: any

  companyForm: Record<string | number, any> = {}

  individForm: Record<string | number, any> = {}

  formTitle = ''

  agreeFlag = false

  disabledFlag = '0'

  type = 'ENTERPRISE' // 0 默认企业， 1 个人

  realnameStatus = ''

  userInfo: Record<string | number, any> = {}

  onChangeCheck (value: boolean) {
    this.agreeFlag = value
    this.disabledFlag = value ? '1' : '0'
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onLogin () {
    loginSystem(this.userInfo.id).then(data => {
      const u = this.$auth?.principle?.user
      if (u) u.ifReadAndAgree = 1
      this.$router.push('/dashboard')
    })
  }

  onAuthorClick () {
    this.modal.open()
  }

  beforeConfirmFn () {}

  mounted () {
    this.type = this.$auth?.principle?.user?.userInfo?.customerType
    this.userInfo = this.$auth?.principle?.user?.userInfo
    this.realnameStatus = this.$auth?.principle?.user?.realnameStatus
    if (this.type === 'ENTERPRISE') {
      this.companyForm = this.userInfo
    } else {
      this.individForm = this.userInfo
    }
    this.formTitle = this.userInfo.customerName
  }
}
</script>

<style lang="scss" module>
.content{
  width: 1200px;
  margin: auto;
  min-height: 697px;
}
.pageTop {
  @extend .flex;
  @extend .bold;
  @extend .alignCenter;
  @extend .margin24;
  @extend .padding10;
}
.box {
  @extend .margin24;
  @extend .inline-block;
  @extend .width100;
}
.agree {
  @extend .textC;
  margin: 100px 0;
}
.flex {
  display: flex;
}
.width100 {
  width: 100%;
}
.bold {
  font-weight: bold;
}
.alignCenter {
  align-items: center;
}
.padding10 {
  padding: 10px;
}
.margin24 {
  margin: 24px 0;
}
.inline-block {
  display: inline-block;
}
.textC {
  text-align: center;
}
</style>
