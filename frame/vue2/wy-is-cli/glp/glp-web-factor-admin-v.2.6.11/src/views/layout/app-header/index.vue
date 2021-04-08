<template>
<div :class="[$style.container]">
  <div :class="[$style.left]">
    <el-link :underline="false" class="ft-24" @click.native="onToggleMenu">
      <i class="el-icon-s-fold" v-if="expand"></i>
      <i class="el-icon-s-unfold" v-else></i>
    </el-link>
    <breadcrumb :class="[$style.breadcrumb]"></breadcrumb>
  </div>
  <el-dropdown>
      <el-link :underline="false">
        <span :class="[$style.profile]">
          <img :class="[$style.avatar]" src="@/assets/avatar.png"/>
          <span>{{name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </el-link>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="setCached(!cached)">
          <i class="el-icon-open"></i>
          <span v-if="!cached">后台模式</span>
          <span v-else>普通模式</span>
        </el-dropdown-item>
        <el-dropdown-item @click.native="onInvalid"> <i class="el-icon-scissors"></i> 请求失效</el-dropdown-item>
        <el-dropdown-item @click.native="onLogout"> <i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { AppModule } from '@/store'

@Component({
  components: { }
})
export default class AppHeader extends Vue {
  @AppModule.State expand!: boolean

  @AppModule.State cached!: boolean

  @AppModule.Mutation setExpand!: (expand: boolean) => void

  @AppModule.Mutation setCached!: (cached: boolean) => void

  get name () {
    return this.$auth.cname
  }

  onToggleMenu () {
    this.setExpand(!this.expand)
  }

  onLogout () {
    this.$auth.logout()
  }

  onInvalid () {
    this.$http.get('/401')
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
}

.breadcrumb {
  margin-left: 20px;
}

.profile {
  display: flex;
  align-items: center;
  color: $color-primary;
}

.avatar {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}
</style>
