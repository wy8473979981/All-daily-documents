<template>
  <auth-box>
    <div class="form-box">
      <section>
        <h5>悦商科技</h5>
        <!-- <router-link to="/login">去登录</router-link> -->
      </section>
      <!-- <el-form :model='loginForm' :rules='loginRule' ref="loginRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" size='mini' placeholder='请输入用户名' maxlength="10"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" size='mini' placeholder='请输入用密码' maxlength="8"/>
        </el-form-item>
      </el-form> -->
    </div>
  </auth-box>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { regPassword } from '../../regMap/index'
export default {
  name: 'auth',
  computed: {
    ...mapState(['isAuth'])
  },
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
      /**
       * john 11111111
       */
      showBox: true,
      activeName: 'register',
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  }
}
</script>
