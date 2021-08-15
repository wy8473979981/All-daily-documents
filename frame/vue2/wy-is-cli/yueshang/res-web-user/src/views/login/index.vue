<template>
  <auth-box v-show="loginssoShow">
    <div class="loginMain">
      <div class="form-box">
        <el-form :model='loginForm' ref="loginRef">
          <el-form-item style="margin-bottom: 15px!important;">
            <el-input class="account" textIndex="50" v-model="loginForm.loginUiid" size='big' placeholder='请输入账号' maxlength="20"/>
          </el-form-item>
          <el-form-item style="margin-bottom: 15px!important;">
            <el-input @keydown.enter.native="handleLogin" class="password" type="password" v-model="loginForm.loginPwd" size='big' placeholder='请输入密码' maxlength="20"/>
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
        <el-button size='big' type='primary' style="background-color: #006ef2;" @click="handleLogin" v-dis-dbclick v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
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
import Vue from 'vue';
import { mapMutations } from 'vuex'
import util from '@/apis/apis/util.js'
import user from '../../apis/apis/user'
import { regPassword } from '../../regMap/index'
import { dynamicRoutes } from '@/router/routes.js'
import login from '@/apis/apis/login.js'
import reference from '@/apis/apis/reference';
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
      loginssoShow: true,
      fullscreenLoading: false,
      loginForm: {
        loginUiid: '',
        loginPwd: '',
        img_code: '',
      },
      loginRule: {
        loginUiid: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        loginPwd: [
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
  mounted () {
    if (this.getQueryString('loginName') != null && this.getQueryString('enterpriseId') != null && this.getQueryString('ticket') != null && this.getQueryString('timestamp') != null) {
      this.loginssoShow = false
      this.getLoginSSO()
    } else if(this.$route.query.type == 'ssoLogin') {
      this.loginssoShow = false
      this.parseTokenToUser()
    } else {
      this.directLogin()
    }
    // 获取验证码
    // this.refreshKaptcha()
  },
  methods: {
    ...mapMutations(['saveUserInfo','saveSysInfo']),
    async refreshKaptcha () {
      const res = await util.getKaptcha({}, 'blob')
      let img = this.$refs.kaptcha
      img.src = window.URL.createObjectURL(res)
    },
    checkParam () {
      const {loginUiid = '', loginPwd = '', img_code = ''} = this.loginForm
      this.$message.closeAll()
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
    async handleLogin() {
      if (!this.checkParam()) return;
      const params = this.loginForm;
      await login.userLogin(params).then(res => {
        if(res.data){
          this.$message.closeAll()
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          const userInfo = {
            username: res.data.userInfo.userName,
            userid: res.data.userInfo.uiid,
            userCd: res.data.userInfo.userCd,
            centerOrgName: res.data.userInfo.centerOrgName,
            centerOrgCd: res.data.userInfo.centerOrgCd,
            orgName: res.data.userInfo.orgName,
            orgCd: res.data.userInfo.orgCd,
            positionName: res.data.userInfo.positionName,
            positionCd: res.data.userInfo.positionCd,
            enterpriseId: res.data.userInfo.enterpriseId,
            token: res.data.userInfo.token,
            permissionLevelName: res.data.userInfo.permissionLevelName,
            attendWorkDate: res.data.userInfo.attendWorkDate,
            // 过期时间12小时
            overTime: Date.now() + 12*60*60*1000
          }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          const sysInfo = {...res.data}
          this.saveSysInfo(sysInfo)
          // 动态更改icon和title
          document.title = sysInfo.frontDeskTitle;
          // var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          // link.type = 'image/x-icon';
          // link.rel = 'shortcut icon';
          // link.href = sysInfo.logoUrl;
          // document.getElementsByTagName('head')[0].appendChild(link);
          this.$router.push({
            path: '/form/list'
          })
        } else {
          this.$message.closeAll()
          this.$message({
            message: '用户名或密码错误',
            type: 'error'
          });
        }
      })
    },
    // 获取地址参数
    getQueryString(name) {
      let href = window.location.href
      let reg = new RegExp(name + "=([^&]+)")
      let march = reg.exec(href)
      if(march != null){
        return march[1]
      }
      return null
    },
     // 免授权单点登录
    parseTokenToUser() {
      const params = {
        approveId: this.getQueryString('approveId'),
        processId: this.getQueryString('processId'),
        openType: this.getQueryString('openType'),
        templateContentId: this.getQueryString('templateContentId')
      }
      const tempToken = this.getQueryString('token');
      const tempUserInfo = {token:tempToken};
      localStorage.setItem('ys_contract_token', JSON.stringify(tempUserInfo));
      login.parseTokenToUser().then(res => {
        if (res.code == 1) {
           const userInfo = {
            username: res.data.userInfo.userName,
            userid: res.data.userInfo.uiid,
            userCd: res.data.userInfo.userCd,
            centerOrgName: res.data.userInfo.centerOrgName,
            centerOrgCd: res.data.userInfo.centerOrgCd,
            orgName: res.data.userInfo.orgName,
            orgCd: res.data.userInfo.orgCd,
            positionName: res.data.userInfo.positionName,
            positionCd: res.data.userInfo.positionCd,
            enterpriseId: res.data.userInfo.enterpriseId,
            token: res.data.userInfo.token,
            permissionLevelName: res.data.userInfo.permissionLevelName,
            attendWorkDate: res.data.userInfo.attendWorkDate,
          }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          const sysInfo = {...res.data}
          this.saveSysInfo(sysInfo)
          if (params.openType == 'D') {
            // 跳转详情
            this.$router.push({path:'/form/detail',query: {id: params.approveId, processId: params.processId, source: 'pd', costBxSceneConfigId: this.getQueryString('costBxSceneConfigId')}})
          } else if (params.openType == 'C') {
            // 跳转新增
            this.$router.push({path:'/form/detail',query: {type: 'create', templateContentId: params.templateContentId, processId: params.processId, source: 'pd', costBxSceneConfigId: this.getQueryString('costBxSceneConfigId')}})
          } else {
            // 跳转登录页
            this.$router.push({path:'/login'})
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 单点登录
    getLoginSSO() {
      const paramsSSO = {
        loginName: this.getQueryString('loginName'),
        enterpriseId: this.getQueryString('enterpriseId'),
        ticket: this.getQueryString('ticket'),
        timestamp: this.getQueryString('timestamp'),
        approveId: this.getQueryString('approveId'),
        processCode: this.getQueryString('processCode'),
        openType: this.getQueryString('openType'),
      }
      login.getUserinfo(paramsSSO).then(res => {
        if (res.code == 1) {
          const userInfo = {
            userid: res.data.loginName,
            username: res.data.name,
            enterpriseId: res.data.enterpriseId,
            // pmTemplateId: res.data.pmTemplateId,
            templateContentId: res.data.templateContentId,
            processId: res.data.processId,
            centerOrgName: decodeURI(this.getQueryString('centerOrgName')),
            centerOrgCd: this.getQueryString('centerOrgCd'),
            orgName: decodeURI(this.getQueryString('orgName')),
            orgCd: this.getQueryString('orgCd'),
            positionName: decodeURI(this.getQueryString('positionName')),
            permissionLevelName: res.data.permissionLevelName,
            positionCd: this.getQueryString('positionCd'),
            token: res.data.token,
            // 过期时间12小时
            overTime: Date.now() + 12*60*60*1000,
          }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          const sysInfo = {...res.data}
          this.saveSysInfo(sysInfo)
          // this.fullscreenLoading = true
          // setTimeout(() => {
          //   this.fullscreenLoading = false
          // }, 1500)
          if (paramsSSO.openType == 'D') {
            // 跳转详情
            this.$router.push({path:'/form/detail',query: {id: paramsSSO.approveId, processId: userInfo.processId, source: 'pd', costBxSceneConfigId: this.getQueryString('costBxSceneConfigId')}})
          } else if (paramsSSO.openType == 'C') {
            // 跳转新增
            this.$router.push({path:'/form/detail',query: {type: 'create', templateContentId: userInfo.templateContentId, processId: userInfo.processId, source: 'pd', costBxSceneConfigId: this.getQueryString('costBxSceneConfigId')}})
          } else {
            // 跳转登录页
            this.$router.push({path:'/login'})
          }
          // window.location.href = window.location.href.split('#')[0]
        } else {
          this.$message.error(res.message)
        }
      })
    },
    directLogin() {
      let token = localStorage.getItem('ys_contract_token')
      if (token) {
        reference.getApproveStatus().then(res => {
          if (res.code == 1) {
            this.$router.push({path: '/form/list'})
          }
        })
      }
    }
  },
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
  // vertical-align: middle;
}
.account{
  ::v-deep input{
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
  ::v-deep input{
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
  ::v-deep input{
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
