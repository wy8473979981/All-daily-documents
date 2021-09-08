<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-tooltip :disabled="!$attrs.hasTip" :content="form[$attrs.prop]||$attrs.placeholder" placement="top" effect="dark">
    <el-input
      v-bind="$attrs"
      :ref="'form-item-'+$attrs.prop"
      v-model="form[$attrs.prop]"
      v-onlyNumber="{
        model: ['form', $attrs.prop],
        use: $attrs.inputType === 'Number',
        ...$attrs.numberConfig
      }"
      :placeholder="$attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请输入'"
      resize="none"
      class="ysn-input"
      @keyup.native="changeAmount"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <i v-if="$attrs.isSearch" slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ItemInput',
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {
      }
    }
  },
  methods: {
    changeAmount() {
      if (this.$attrs.type === 'int') {
        this.form[this.$attrs.prop] = this.form[this.$attrs.prop].replace(/[^\d]/g, '')
      }
    },
    handleFocus(val) {
      this.$attrs.focus && this.$attrs.focus(val)
    },
    handleBlur(val) {
      this.$attrs.blur && this.$attrs.blur(val)
    },
    handleInput(val) {
      this.$attrs.change && this.$attrs.change(val)
    }
  }
}
</script>
