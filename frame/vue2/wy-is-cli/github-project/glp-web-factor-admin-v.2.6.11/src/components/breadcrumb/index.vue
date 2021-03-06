<template>
<div :class="[$style.container]">
  <el-breadcrumb :class="[$style.breadcrumb]">
    <el-breadcrumb-item v-for="(item, i) in items" :key="i" :to="to(item, i)">{{normalizeTitle(item.title)}}</el-breadcrumb-item>
  </el-breadcrumb>
  <slot></slot>
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

  to (item: any, i: number) {
    if (i === this.items.length - 1 || !item.active) return undefined
    return item.path
  }

  normalizeTitle (title = '') {
    const params = Object.assign({}, this.$route.query || {}, this.$route.params || {})
    const regex = /\{(\w+)\}/g
    return title.replace(regex, (_, c) => {
      return params[c] || ''
    })
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
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
</style>
