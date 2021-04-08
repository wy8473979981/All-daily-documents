<template>
<div :class="[$style.container]">
  <div :class="[$style.box]">
    <el-form :model="form" :rules="rules" ref="fm" @keyup.enter="onLogin">
      <el-form-item class="mb-6" prop="username">
        <el-input name="username" prefix-icon="el-icon-user" v-model.trim="form.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item class="mb-6" prop="password">
        <el-input name="password" prefix-icon="el-icon-lock" type="password" v-model.trim="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="onLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
@Component
export default class Login extends Vue {
  @Ref() fm!: any

  form = {
    username: '',
    password: ''
  }

  rules = {
    username: [{ required: true, message: '请输入账号' }],
    password: [{ required: true, message: '请输入密码' }]
  }

  onLogin () {
    this.fm.validate((valid: boolean) => {
      if (valid) {
        this.$auth.login(this.form).then(() => {
          const backUrl = (this.$route.query.backUrl) as string || '/'
          this.$router.push(backUrl)
        })
      }
    })
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-primary;
}

.box {
  height: 240px;
  width: 410px;
  border-radius: 4px;
  background-color: $bg-color;
  padding: 56px 36px;
}
</style>
