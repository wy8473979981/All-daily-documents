<template>
<div :class="[$style.container]">
  <ul :class="[$style.list]">
    <li :class="[$style.item, activeCls(row)]" v-for="row in items" :key="row.key" :title="row.title" @click="onSelect(row)">
      <span>{{resolveShortTitle(row.title)}}</span>
      <span :class="[$style.close]" @click.stop="onClose(row)"><i class="el-icon-error"></i></span>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator'

@Component
export default class MenuTabs extends Vue {
  activeCls (item: any) {
    const active = this.current === item
    return active ? this.$style.active : ''
  }

  get current () {
    return this.$rp.current
  }

  get items () {
    return this.$rp.items
  }

  resolveShortTitle (title = '') {
    const idx = title.lastIndexOf('/')
    return idx < 0 ? title : title.substr(idx + 1)
  }

  onSelect (row: any) {
    this.$rp.select(row)
  }

  onClose (row: any) {
    this.$rp.close(row)
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
  padding: 4px 0;
  margin: 0;
  display: flex;
}

.item {
  line-height: 26px;
  height: 26px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 0 24px 0 20px;
  color: $color-primary;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid $border-color;
  margin: 0 4px;

  &:hover {
    cursor: pointer;

    .close {
      opacity: 1;
    }
  }

  &::before {
    content: " ";
    position: absolute;
    left: 4px;
    height: 8px;
    width: 8px;
    background-color: #fff;
    border-radius: 4px;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
  }
}

.close {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 4px;
  font-size: 14px;
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

  &:before {
    visibility: visible;
  }
}
</style>
