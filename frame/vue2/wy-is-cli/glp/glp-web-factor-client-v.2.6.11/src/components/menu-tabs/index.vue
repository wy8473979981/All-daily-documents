<template>
<div :class="[$style.container]">
  <ul :class="[$style.list]">
    <li :class="[$style.item, activeCls(row)]" v-for="(row, i) in items" :key="i" :title="row.title" @click="onGo(row)">
      <span>{{row.title}}</span>
      <span :class="[$style.close]" @click.stop="onClose(i)"><i class="el-icon-close"></i></span>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator'

interface Item {
  name: string;

  title: string;
}

@Component
export default class MenuTabs extends Vue {
  @PropSync('tabs', { type: Array }) items!: Item[]

  get path () {
    return this.$route.path
  }

  activeCls (item: Item) {
    const active = item.name === this.path
    return active ? this.$style.active : ''
  }

  addItem () {
    const path = this.$route.path
    if (this.hasItem(path)) return
    const breadcrumb = this.$route?.meta?.breadcrumb || []
    if (breadcrumb.length < 1) return
    const title = normalizeTitle(breadcrumb.map((v: any) => v.title).join(' - '), this.$route.params)
    this.items.push({ name: path, title })

    function normalizeTitle (title = '', params: Record<string, string> = {}) {
      const regex = /\{(\w+)\}/g
      return title.replace(regex, (_, c) => {
        return params[c] || ''
      })
    }
  }

  hasItem (name: string) {
    return this.items.map(v => v.name).includes(name)
  }

  onGo (row: any) {
    if (this.path === row.name) return
    this.$router.push(row.name)
  }

  onClose (i: number) {
    this.items.splice(i, 1)
    if (this.items.length < 0) {
      this.$router.push('/')
      return
    }
    const n = (i - 1) < 0 ? 0 : (i - 1)
    this.$router.push(this.items[n]?.name)
  }

  @Watch('path', { immediate: true }) pathChange () {
    this.addItem()
  }

  $style!: any
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

$height: 36px;

.container {
  background-color: $bg-color;
  border-bottom: 1px solid $border-split-color;
  border-top: 1px solid $border-split-color;
  height: $height;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.item {
  line-height: $height;
  height: $height;
  font-size: 14px;
  padding: 0 20px;
  color: $color-primary;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    cursor: pointer;

    .close {
      opacity: 1;
    }
  }
}

.close {
  position: absolute;
  top: calc(-50% + 6px);
  right: 2px;
  font-size: 12px;
  color: $text-secondary-color;
  cursor: pointer;
  opacity: 0;
  transition: opacity .35s ease;
}

.active.item {
  background-color: $color-primary;
  color: #fff;

  & .close {
    color: #fff;
  }
}
</style>
