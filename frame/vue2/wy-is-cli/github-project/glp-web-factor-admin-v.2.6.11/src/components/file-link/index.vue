<template>
<div :class="[$style.container]">
  <el-breadcrumb :class="[$style.breadcrumb]">
    <el-breadcrumb-item v-for="(item, i) in items" :key="i" :to="to(item, i)">{{normalizeTitle(item.title)}}</el-breadcrumb-item>
  </el-breadcrumb>
  <slot></slot>
  <div :class="[$style.back]"><el-link :underline="false" type="primary" @click="onGoBack" v-if="canGoBack">返 回</el-link></div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: { }
})
export default class Breadcrumb extends Vue {
  get items () {
    return this.$route.meta?.breadcrumb || []
  }

  get canGoBack () {
    if (this.items.length < 2) return false
    return this.items[this.items.length - 2].active
  }

  to (item: any, i: number) {
    if (i === this.items.length - 1 || !item.active) return undefined
    return item.path
  }

  normalizeTitle (title = '') {
    const params = this.$route.params
    const regex = /\{(\w+)\}/g
    return title.replace(regex, (_, c) => {
      return params[c] || ''
    })
  }

  onGoBack () {
    const url = this.items[this.items.length - 2].path
    if (url) this.$router.push(url)
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";
.container {
  display: flex;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid $border-split-color;
  margin: 0 -20px;
  padding: 0 12px;
  position: relative;
}

.breadcrumb {
  margin-right: 32px;
  :global {
    .el-breadcrumb__item:last-child {
      &>.el-breadcrumb__inner {
        font-weight: 600 !important;
      }
    }
  }
}

.back {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
}
</style>
