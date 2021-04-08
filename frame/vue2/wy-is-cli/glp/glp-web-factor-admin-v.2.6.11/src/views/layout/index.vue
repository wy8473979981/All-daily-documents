<template>
<el-container>
  <el-aside :class="[$style.aside]">
    <app-sider></app-sider>
  </el-aside>
  <el-container>
    <el-header :class="[$style.header]" class="bg-head">
      <app-header></app-header>
    </el-header>
    <el-main :class="[$style.main]" class="bg-body" ref="main">
      <menu-tabs :tabs="tabs" v-if="cached"></menu-tabs>
      <div :class="[$style.content, cachedCls]" class="app-content-page">
        <transition name="slide" mode="out-in" v-if="cached">
          <keep-alive>
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
        <transition name="slide" mode="out-in" v-else>
          <router-view></router-view>
        </transition>
      </div>
      <el-backtop target=".app-content-page"></el-backtop>
    </el-main>
  </el-container>
</el-container>
</template>

<script lang="ts">

import { Vue, Component, Provide, Watch, Ref } from 'vue-property-decorator'
import AppSider from './app-sider/index.vue'
import AppHeader from './app-header/index.vue'
import { AppModule } from '@/store'
@Component({
  components: { AppSider, AppHeader }
})
export default class Layout extends Vue {
  @AppModule.State cached!: boolean

  @Ref() main!: Vue

  tabs: any[] = []

  get cachedCls () {
    return this.cached ? this.$style.cached : ''
  }

  get path () {
    return this.$route.path
  }

  get key () {
    return this.$rp.current?.key || Date.now()
  }

  @Watch('path', { immediate: true }) pathChange () {
    this.$rp.add(this.$route)
  }

  created () {
    const clearFn = (items: any[]) => {
      if (!this.main) return
      items.forEach(v => {
        const target = this.main.$children.find(w => w.$vnode.key)
        if (target) target.$destroy()
      })
    }
    if (this.$rp) {
      this.$rp.$on('clear', clearFn)
    }
    this.$once('hook:beforeDestroy', () => {
      if (this.$rp) this.$rp.$off('clear', clearFn)
    })
  }

  $style!: any
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.aside {
  width: auto !important;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 0 auto;
}

.header {
  height: 48px !important;
}

.main {
  height: calc(100vh - 48px);
  padding: 0;
}

.content {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

.content.cached {
  height: calc(100% - 36px - 2px);
}
</style>
