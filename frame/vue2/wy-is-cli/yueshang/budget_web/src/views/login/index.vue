<template>
  <auth-box>
    <div class="loginMain">
      <div class="form-box">
        <el-form :model='loginForm' ref="loginRef">
          <el-form-item style="margin-bottom: 15px!important;">
            <el-input class="account" textIndex="50" v-model="loginForm.admin_name" size='big' placeholder='请输入账号' maxlength="20"/>
          </el-form-item>
          <el-form-item style="margin-bottom: 15px!important;">
            <el-input class="password" type="password" v-model="loginForm.admin_password" size='big' placeholder='请输入密码' maxlength="20"/>
          </el-form-item>
          <div style="margin-right: 10px; width: 450px; display: flex; align-items: center;">
            <el-form-item style="margin-bottom: 0; margin-right: 15px;">
              <el-input
                class="code"
                v-model="loginForm.img_code"
                size='big'
                placeholder='请输入验证码'
                maxlength="4"
                style='width: 200px;'
                @keyup.enter.native='handleLogin'
              />
            </el-form-item>
            <img alt=""
              style="width: 85px; height: 40px;border: unset;"
              ref="kaptcha"
              @click="refreshKaptcha"
            >
          </div>
        </el-form>
        <el-button size='big' type='primary' style="background-color: #006ef2;" @click="handleLogin">登录</el-button>
      </div>
      <el-row type="flex" class="row-bg" style="margin-top: 20px;" align="right">
        <el-col  :span="6" :push="16">
          <el-checkbox v-model="checked">记住用户名</el-checkbox>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" style="margin-top: 20px;" align="right">
        <i class="logo-title" :class="size"></i>
      </el-row>
    </div>
  </auth-box>
</template>

<script>
import { mapMutations } from 'vuex'
import util from '@apis/util.js'
import user from '@apis/user.js'
import { regPassword } from '../../regMap/index'
import { dynamicRoutes } from '@/router/routes.js'
export default {
  name: 'auth',
  computed: {},
  data () {
    const validPass = (rule, value = '', cb) => {
      if (!regPassword.test(value)) {
        return cb(new Error('密码必须是8位，可以包含数字和字母'))
      }
      return cb()
    }
    const validPass2 = (rule, value, cb) => {
      if (value === '') {
        return cb(new Error('请在次输入密码'))
      } else if (value !== this.registerForm.password) {
        return cb(new Error('两次密码不一致'))
      }
      return cb()
    }
    return {
      loginForm: {
        admin_name: '',
        admin_password: '',
        img_code: ''
      },
      loginRule: {
        admin_name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        admin_password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        img_code: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false,
      size: {
        type: String,
        default: 'middle'
      }
    }
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    async refreshKaptcha () {
      const res = await util.getKaptcha({}, 'blob')
      const img = this.$refs.kaptcha
      img.src = window.URL.createObjectURL(res)
    },
    checkParam () {
      const { admin_name = '', admin_password = '', img_code = '' } = this.loginForm
      if (!admin_name.trim()) {
        this.$message.error('请输入账号')
        return false
      } else if (!admin_password.trim()) {
        this.$message.error('请输入密码')
        return false
      } else if (!img_code.trim()) {
        this.$message.error('请输入验证码')
        return false
      }
      return true
    },
    async handleLogin () {
      if (!this.checkParam()) return
      const res = await user.userLogin(this.loginForm)
      if (res.code === 200) {
        localStorage.setItem('ys_contract_token', res.result.token)
        const userInfo = { userid: res.result.admin_id, username: res.result.admin_truename }
        this.saveUserInfo(userInfo)
        this.$router.push({
          path: '/'
        })
      } else {
        this.refreshKaptcha()
      }
    }
  },
  mounted () {
    this.refreshKaptcha()
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.loginMain {
  background-color: rgba(255,255,255,1);
  padding: 0 30px 30px;
}
.logo-title{
  display: block;
  background: url('../../assets/images/login-title.png') no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  width: 100%;
  height: 28px;
  margin-top: 28px;
  vertical-align: middle;
}
.account{
  /deep/ input{
    text-indent: 20px!important;
  }
  &:before{
    content: '';
    background: url('../../assets/images/login-user.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 18px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
.password{
  /deep/ input{
    text-indent: 20px!important;
  }
  &:before{
    content: '';
    background: url('../../assets/images/login-lock.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 18px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
.code{
  /deep/ input{
    text-indent: 20px!important;
  }
  &:before{
    content: '';
    background: url('../../assets/images/login-code.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 18px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
