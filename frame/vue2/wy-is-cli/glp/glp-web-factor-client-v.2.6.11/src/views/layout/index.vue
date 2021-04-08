<template>
<div :class="[$style.container]">
<el-container :class="[$style.content]">
  <el-aside :class="[$style.aside]">
    <app-sider></app-sider>
  </el-aside>
  <el-main :class="[$style.main]">
    <router-view></router-view>
  </el-main>
</el-container>
</div>
</template>

<script lang="ts">

import { Vue, Component, Provide } from 'vue-property-decorator'
import AppSider from './app-sider/index.vue'
import { AppModule } from '@/store'
@Component({
  components: { AppSider }
})
export default class Layout extends Vue {
  @AppModule.State cached!: boolean

  $style!: any
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  padding: 14px 84px 0;
  background-color: $bg-body-color;
}

.content {
  background-color: #fff;
  border-radius: 2px;
}

.aside {
  width: auto !important;
  min-height: calc(100vh - 28px - 68px - 14px - 128px);
  overflow-y: auto;
  overflow-x: hidden;
  flex: 0 0 auto;
  background-color: #fff;
  box-shadow: 2px 0 10px rgba(0,0,0,.05);
  border-radius: 2px;
  position: relative;
  z-index: 1;
}

.main {
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0 20px;
  min-height: calc(100vh - 28px - 68px - 14px - 128px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 20px;
}

</style>
