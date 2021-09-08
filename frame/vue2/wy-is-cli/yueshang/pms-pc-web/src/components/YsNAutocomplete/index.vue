<template>
  <el-autocomplete
      v-model="currentValue"
      value-key="key"
      label="label"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-autocomplete>
</template>


<script>
export default {
  name: 'YsNAutocomplete',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: [String, Array],
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  watch: {
    value: {
      handler() {
        this.currentValue = this.value
      },
      deep: true
    },
    currentValue: {
      handler() {
        this.$emit('input', this.currentValue)
      },
      deep: true
    }
  }
}
</script>
