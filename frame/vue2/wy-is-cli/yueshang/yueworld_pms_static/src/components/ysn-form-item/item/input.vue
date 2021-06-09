<template>
  <el-input
    v-model="form[$attrs.prop]"
    :placeholder="$attrs.placeholder || '请输入'"
    v-bind="$attrs"
    @keyup.native="changeAmount"
    @change="$attrs.change || ''"
    @blur="$attrs.blur || ''"
    :ref="'form-item-'+$attrs.prop"></el-input>
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
    }
  }
}
</script>
