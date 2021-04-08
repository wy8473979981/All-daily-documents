<template>
<div>
  <div :class="[$style.form]">
    <edit-form :def="formDefs" :form="form"></edit-form>
  </div>

  <div :class="[$style.card]" class="mt-6">
    <div :class="[$style.section]">
      <span class="ft-64 text-primary mr-3"><svg-icon icon="product"></svg-icon></span>
      <div :class="[$style.segment]">
        <div class="text-primary">¥2,477.65</div>
        <p>在期保理本金金额</p>
      </div>
    </div>

    <div :class="[$style.segment]">
      <div>¥123,000.00</div>
      <p>可用信额度</p>
    </div>

    <div :class="[$style.segment]">
      <div>12%</div>
      <p>融资利率</p>
    </div>

    <div :class="[$style.segment]">
      <div>0.8</div>
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
  @Prop(String) id!: string

  formDefs = formDefs

  loading = false

  form: Record<string, any> = {}
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
