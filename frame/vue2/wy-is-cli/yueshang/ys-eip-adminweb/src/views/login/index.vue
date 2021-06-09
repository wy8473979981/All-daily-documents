<template>
  <ysNAuthBox>
    <div class="loginMain">
      <ysNLogo />
      <div class="form-box">
        <el-form :model='loginForm' :rules="loginRule" ref="loginRef">
          <el-form-item style="margin-bottom: 16px!important;" prop="loginUiid">
            <el-input class="account" textIndex="56" v-model="loginForm.loginUiid" size='big' placeholder='请输入账号' maxlength="20" />
            <ysNTooltip :show="nameError.show" :text="nameError.errorTip" :style="{left: '300px',top: '7px',}" />
          </el-form-item>
          <el-form-item style="margin-bottom: 9px!important;" prop="loginPwd">
            <el-input class="password" textIndex="56" :type="password" @keydown.enter.native="handleLogin" v-model="loginForm.loginPwd" size='big' placeholder='请输入密码' maxlength="20" />
            <span class="login-view" @click="showPwdFunc"></span>
            <ysNTooltip :show="pwdError.show" :text="pwdError.errorTip" :styleObj="{left: '300px',top: '7px',}" />
          </el-form-item>
          <!-- <div style="margin-right: 10px; width: 450px; display: flex; align-items: center;">
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
          </div> -->
        </el-form>
        <div class="rember-self">
          <el-checkbox v-model="checked" @change="checkboxFunc">记住我</el-checkbox>
          <span class="forget-pwd" @click="dialogVisible = true">忘记密码?</span>
        </div>
        <el-button size='big' type='primary' class="login-submit" @click="handleLogin">登录</el-button>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false" :close-on-click-modal="false" :center="true">
      <span>请联系系统管理员更改密码。</span>
      <span slot="footer" class="dialog-footer">
        <ysNButton :className="'button-bg-common'" @click="dialogVisible = false" :text="'关 闭'" />
      </span>
    </el-dialog>

  </ysNAuthBox>
</template>

<script>
import util from '@/apis/apis/util.js'
import { regPassword } from '../../regMap/index'
import baolRoutes from '@/router/baol/route_baol'
import menulist from '@/router/router-map'

// console.log(resetRouter)

export default {
  name: 'auth',
  computed: {},
  data () {
    const validName = (rule, value = '', cb) => {
      if (!value) {
        this.nameError = { show: true, errorTip: '没有此用户，请重新输入' }
        return cb(new Error('没有此用户，请重新输入'))
      }
      // if (!regPassword.test(value)) {
      //   this.pwdError = { show: true, errorTip: '密码必须是8位，可以包含数字和字母' }
      //   return cb(new Error('密码必须是8位，可以包含数字和字母'))
      // }
      this.nameError = { show: false, errorTip: '' }
      return cb()
    }
    const validPwd = (rule, value = '', cb) => {
      if (!value) {
        this.pwdError = { show: true, errorTip: '请输入密码' }
        return cb(new Error('请输入密码'))
      }
      // if (!regPassword.test(value)) {
      //   this.pwdError = { show: true, errorTip: '密码必须是8位，可以包含数字和字母' }
      //   return cb(new Error('密码必须是8位，可以包含数字和字母'))
      // }
      this.pwdError = { show: false, errorTip: '' }
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
      nameError: {
        show: false,
        errorTip: ''
      },
      pwdError: {
        show: false,
        errorTip: ''
      },
      password: 'password',
      loginForm: {
        loginUiid: 'quzy',
        loginPwd: 'asdfsdf',
        // img_code: '',
      },
      dialogVisible: false,
      loginRule: {
        loginUiid: [
          { validator: validName, trigger: ['blur', 'change'] }
        ],
        loginPwd: [
          { validator: validPwd, trigger: ['blur', 'change'] }
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
  // destroyed() {    
  //   location.reload();
  // },
  methods: {
    async refreshKaptcha () {
      const res = await util.getKaptcha({}, 'blob')
      let img = this.$refs.kaptcha
      img.src = window.URL.createObjectURL(res)
    },
    checkParam () {
      const { loginUiid = '', loginPwd = '', img_code = '' } = this.loginForm
      if (!loginUiid.trim()) {
        this.$message.error('请输入账号')
        return false
      } else if (!loginPwd.trim()) {
        this.$message.error('请输入密码')
        return false
      }
      // else if (!img_code.trim()) {
      //   this.$message.error('请输入验证码')
      //   return false
      // }
      return true
    },
    async handleLogin () {
      const params = this.loginForm;
      await this.$axios.loginServe.userLogin(params).then(res => {

        if (res.code == 200 && res.data) {
          const { data } = res

          // 1.存储用户信息
          const userInfo = {
            userid: res.data.uiid,
            username: res.data.userName,
            enterpriseId: res.data.enterpriseId,
            token: res.data.token
          }

          this.$store.commit('saveUserInfo', userInfo)
          this.$store.commit('saveSysInfo', data)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo));


          const menu = menulist;
          console.log('menu==>', menu)
          localStorage.setItem('spxt_menu', JSON.stringify(menu))

          let rout = this.fixRoutes(baolRoutes, menu);
          console.log('rout==>', rout)
          rout = rout.filter(e => e.children)
          localStorage.setItem('spxt_rout', JSON.stringify(rout));
          
          this.$router.options.routes = rout;
          console.log('rout[0].redirect==>', rout[0].redirect)
          this.$router.push(rout[0].redirect);

          // 2.获取用户所有菜单
          // this.findAllMenu({ userId: data.userId })
        } else {
          this.$message({
            message: res.message || '登录失败',
            type: 'error'
          });
        }
      })
    },
    async findAllMenu (param) {
      await this.$axios.loginServe.findAllMenu(param).then(res => {
        if (res.code == 200) {
          let menu = res.data;
          if (menu.length == 0) {
            this.$message.error('您的账号暂无菜单，请联系管理员配置')
            return
          }
          this.$message({ message: '登录成功', type: 'success' });
          localStorage.setItem('spxt_menu', JSON.stringify(menu))

          let rout = this.fixRoutes(baolRoutes, menu);

          rout = rout.filter(e => e.children.length > 0)

          localStorage.setItem('spxt_rout', JSON.stringify(rout));

          this.$router.options.routes = rout;

          this.$router.push(rout[0].path + '/' + rout[0].children[0].path);

        } else {
          this.$message({ message: res.message || '获取菜单失败，请重试', type: 'error' });
        }
      })
    },
    fixRoutes (routes, menulist) {
      return routes.filter(item => item.meta.visible).map(item => {
        const { component, children, ...rest } = item
        if (children && children.length > 0) {
          let fixedChildren = this.fixRoutes(children)
          if (menulist) {
            let fchildren = [];
            fixedChildren.forEach((e, i) => {
              var r = menulist.some(j => {
                return e.meta.title == j.menuName
              })
              if (r) {
                fchildren.push(e);
              }
            })
            return { children: fchildren, ...rest }
          } else {
            return { children: fixedChildren, ...rest }
          }
        } else {
          return item;
        }
      })
    },
    // directLogin () {
    //   let token = localStorage.getItem('ys_contract_token')
    //   if (token) {
    //     reference.getApproveStatus().then(res => {
    //       if (res.code == 1) {
    //         this.findAllMenu()
    //       }
    //     })
    //   }
    // },
    showPwdFunc () {
      this.password = this.password == 'password' ? 'text' : 'password'
    },
    checkboxFunc () { },
  },
  mounted () {
    // 获取验证码
    // this.refreshKaptcha()
    // this.directLogin()
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.loginMain {
  padding: 19px 32px 40px 32px;
  background-color: #ffffff;
  // background-color: rgba(255, 255, 255, 1);
  // padding: 0 30px 30px;
}
// .logo-title {
//   display: block;
//   background: url("../../assets/images/login-title.png") no-repeat center top;
//   background-size: auto 100%;
//   background-origin: content-box;
//   width: 100%;
//   height: 28px;
//   margin-top: 28px;
//   vertical-align: middle;
// }
.account {
  ::v-deep input {
    text-indent: 20px !important;
  }
  &:before {
    content: "";
    background: url("../../assets/images/login-img/login-user.png") no-repeat
      center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 20px;
    height: 24px;
    position: absolute;
    top: 7px;
    left: 22px;
  }
}
.password {
  ::v-deep input {
    text-indent: 20px !important;
  }
  &:before {
    content: "";
    background: url("../../assets/images/login-img/login-lock.png") no-repeat
      center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 20px;
    height: 24px;
    position: absolute;
    top: 7px;
    left: 22px;
  }
}
span.login-view {
  display: inline-block;
  width: 20px;
  height: 24px;
  position: absolute;
  top: 3px;
  right: 16px;
  padding: 5px;
  background: url("../../assets/images/login-img/login-view.png") no-repeat
    center top;
  background-size: auto 100%;
  background-origin: content-box;
  cursor: pointer;
}
.code {
  ::v-deep input {
    text-indent: 20px !important;
  }
  &:before {
    content: "";
    background: url("../../assets/images/login-code.png") no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 20px;
    height: 24px;
    position: absolute;
    top: 7px;
    left: 10px;
  }
}
.rember-self {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #4876ef;
  line-height: 24px;
  ::v-deep .el-checkbox__label {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #4876ef;
    line-height: 24px;
  }
  .forget-pwd {
    cursor: pointer;
  }
}
.login-submit {
  height: 40px;
  font-size: 18px;
  letter-spacing: 8px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #ffffff;
  border-radius: 0px;
  padding: 5px 0 7px;
  background-color: #4876ef;
}
::v-deep .el-form-item__error {
  display: none;
}
::v-deep .el-dialog {
  margin-top: 43vh !important;
  width: 400px !important;
  height: 128px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #000000;
    line-height: 32px;
    padding: 20px 109px;
  }
  .el-dialog__footer {
    padding: 0;
    .el-button--default {
      width: 80px;
      height: 36px;
      line-height: 36px;
      padding: 0;
      border: 1px solid #e0e5eb;
      border-radius: 0;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c1c1c;
    }
    .el-button:hover,
    .el-button:focus {
      color: #1c1c1c;
      border: 1px solid #e0e5eb;
      background: #ffffff;
    }
  }
}
</style>
