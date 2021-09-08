<template>
  <el-cascader v-model="currentValue" v-bind="$attrs" v-on="$listeners" :options="currentOptions"></el-cascader>
</template>

<script>
import isFunction from 'lodash/isFunction'
export default {
  name: 'YsNCascader',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: [String, Array],

    options: [Array, Function]
  },

  data() {
    return {
      currentValue: this.value,
    }
  },

  computed: {
     currentOptions() {
      return isFunction(this.options) ? this.options() : this.options
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
