<template>
<div>
  <div :class="[$style.form]">
    <edit-form :def="formDefs" :form="form" :span="8" :xl="8"></edit-form>
  </div>

  <div :class="[$style.card]" class="mt-6">
    <div :class="[$style.section]">
      <span class="ft-64 text-primary mr-3"><svg-icon icon="product"></svg-icon></span>
      <div :class="[$style.segment]">
        <div class="text-primary">{{p.balance | currency}}</div>
        <p>在期保理本金金额</p>
      </div>
    </div>

    <div :class="[$style.segment]">
      <div>{{p.availAmount | currency}}</div>
      <p>可用信额度</p>
    </div>

    <div :class="[$style.segment]">
      <div>{{p.roi | percent}}</div>
      <p>融资利率</p>
    </div>

    <div :class="[$style.segment]">
      <div>{{p.discount | number}}</div>
      <p>折扣率</p>
    </div>

  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class EditAccount extends Vue {
  @Prop() project!: any

  @Prop() form!: any

  formDefs = formDefs

  loading = false

  get p () {
    return this.project || {}
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/vars.scss";
.form {
  background-color: #F2FAF5;
  border-radius: 2px;
  padding: 12px 20px 0;
}

.card {
  height: 92px;
  border-radius: 2px;
  border: 1px solid $color-primary;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 16%;
}

.section {
  display: flex;
  align-items: center;
}

.segment {
  padding: 12px 0;
  &>div {
    font-size: 18px;
    font-weight: 600;
    color: $text-heading-color;
  }
  &>p {
    font-size: 14px;
    color: $text-regular-color;
    margin: 4px 0;
  }
}
</style>
