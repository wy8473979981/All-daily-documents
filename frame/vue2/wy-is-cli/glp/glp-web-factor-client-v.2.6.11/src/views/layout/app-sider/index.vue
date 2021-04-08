<template>
<div :class="[$style.container]">
  <div :class="[$style.title]">首页</div>
  <app-menu :expand="expand"></app-menu>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppMenu from './app-menu/index.vue'
import { AppModule } from '@/store'
@Component({
  components: { AppMenu }
})
export default class AppSider extends Vue {
  @AppModule.State expand!: boolean

  title = process.env.VUE_APP_TITLE
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
  position: relative;
  // background-color: $menu-bg-color;
  min-height: 100%;
}

.title {
  line-height: 44px;
  padding-left: 20px;
  color: $text-heading-color;
  font-weight: 700;
  border-bottom: 1px solid $border-split-color;
}
</style>
