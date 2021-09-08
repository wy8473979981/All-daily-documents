<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-input
    v-bind="$attrs"
    :ref="'form-item-'+$attrs.prop"
    v-model="form[$attrs.prop]"
    v-onlyNumber="{
      model: ['form', $attrs.prop],
      use: $attrs.inputType === 'Number',
      ...$attrs.numberConfig
    }"
    :placeholder="$attrs.placeholder || '请输入'"
    resize="none"
    :disabled="$attrs.disabled || form.disabled || false"
    @keyup.native="changeAmount"
    @input="input"
    @blur="blur"
    @focus="focus"
  >
    <i v-if="$attrs.isSearch" slot="prefix" class="el-input__icon el-icon-search" />
  </el-input>
</template>

<script>
export default {
  name: 'ItemInput',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {
      }
    },
    // 下标
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeAmount() {
      if (this.$attrs.type === 'int') {
        this.form[this.$attrs.prop] = this.form[this.$attrs.prop].replace(/[^\d]/g, '')
      }
    },
    input(val) {
      this.$attrs.listeners && this.$attrs.listeners.input && this.$attrs.listeners.input(this.form, this.index)
    },
    blur(val) {
      this.$attrs.listeners && this.$attrs.listeners.blur && this.$attrs.listeners.blur(this.form, this.index)
    },
    focus(val) {
      this.$attrs.listeners && this.$attrs.listeners.focus && this.$attrs.listeners.focus(this.form, this.index)
    }
  }
}
</script>
