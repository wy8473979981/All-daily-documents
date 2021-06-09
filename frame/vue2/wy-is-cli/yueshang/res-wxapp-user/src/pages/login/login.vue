<template>
  <ui-main>
    <div class="flex col-center row-center h-100">
      <div class="bg" ref="bg"></div>
      <div class="form">
        <div class="form-item">
          <label>账号</label>
          <input v-model="loginForm.loginUiid" type="text" placeholder="输入用户名" />
          <i class="line"></i>
        </div>
        <div class="form-item">
          <label>密码</label>
          <input v-model="loginForm.loginPwd" type="password" placeholder="输入登录密码" />
          <i class="line"></i>
        </div>
        <div class="form-item">
          <van-button @click="handleLogin" size="large" type class="login-btn">登录</van-button>
          <van-button @click="goDetail" size="large" type class="login-btn">详情</van-button>
        </div>
      </div>
    </div>
  </ui-main>
</template>
<script>
import login from '@/apis/apis/login.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isDevelopment: process.env.NODE_ENV === "development", //开发模式
      form: {
        username: "",
        password: ""
      },
      loginForm: {
        loginUiid: '',
        loginPwd: '',
      },
    };
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    login() {
      if (window.innerWidth > 800) {
        this.$router.replace("/home"); //pc查看 home
      } else {
        this.$router.replace("/me"); //手机只看 me
      }
    },
     checkParam () {
      const {loginUiid = '', loginPwd = ''} = this.loginForm
      if (!loginUiid.trim()) {
        this.$toast('请输入账号')
        return false
      } else if (!loginPwd.trim()) {
        this.$toast('请输入密码')
        return false
      } 
      return true
    },
    async handleLogin() {
      if (!this.checkParam()) return;
      const params = this.loginForm;
      await login.userLogin(params).then(res => {
        if(res.data){
         this.$toast('登录成功')
         const userInfo = {
           userid: res.data.uiid,
           username: res.data.userName,
           enterpriseId: res.data.enterpriseId
         }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          this.$router.push('/templist')
        } else {
          if(res.message) {
            this.$toast(res.message)
          }
        }
      })
    },
    goDetail() {
      this.$router.push('/detail')
    }
  } 
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #26a2ff;

.form-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 0.7rem;
  position: relative;
  border-bottom: 1px solid rgba(black, 0.05);
  label {
    white-space: nowrap;
    color: rgba(black, 0.5);
    &::after {
      content: ":";
    }
  }
  input {
    outline: none;
    font-size: inherit;
    flex: 1;
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    &:focus {
      & + .line {
        transform: scale3d(1, 1, 1);
      }
    }
  }
  .line {
    height: 1px;
    width: 100%;
    background-color: rgba($color, 0.6);
    position: absolute;
    bottom: -1px;
    left: 0;
    transition: 1s;
    transform: scale3d(0, 1, 1);
  }
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("./login-bg.jpg") no-repeat center;
  background-size: cover;
  filter: blur(5px);
}

.form {
  width: 80%;
  z-index: 1;
  margin-top: -3rem;
}

.login-btn {
  background-color: rgba($color, 0.6);
  color: #fff;
  border: none;
}
</style>
