<template>
<el-card :body-style="{ padding: '0px' }">
  <div :class="[$style.header]" :style="[bgColorStyle]">
    <div :class="[$style.icon]" :style="[colorStyle]"><span> <svg-icon :icon="icon"></svg-icon> </span></div>
    <div :class="[$style.title]">{{title}}</div>
  </div>
  <div :class="[$style.body]">
    <slot></slot>
  </div>
</el-card>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop } from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ type: String, default: '#3AC082' }) color!: string

  @Prop(String) icon!: string

  @Prop(String) title!: string

  loading = false

  get bgColorStyle () {
    return {
      backgroundColor: this.color
    }
  }

  get colorStyle () {
    return {
      color: this.color
    }
  }
}
</script>

<style lang="scss" module>

.header {
  border-radius: 2px;
  padding: 16px 12px;
  text-align: center;
  color: #fff;
}

.icon {
  height: 36px;
  width: 36px;
  line-height: 36px;
  font-size: 28px;
  border-radius: 100px;
  background-color: #fff;
  margin: auto;
}

.title {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
}

.body {
  padding: 20px 16px;
}
</style>
