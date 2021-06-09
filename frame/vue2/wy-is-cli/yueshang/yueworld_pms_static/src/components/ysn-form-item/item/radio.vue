<template>
    <el-radio-group v-model="form[$attrs.prop]" v-bind="$attrs" @change="($attrs.change && $attrs.change(form)) || ''">
        <el-radio v-for="(item, index) in $attrs.list" :key="'radio' + index" :label="item[$attrs.listKey || 'value']">
            {{ item[$attrs.listName || 'label'] }}
        </el-radio>
    </el-radio-group>
</template>

<script>
export default {
  name: 'ItemRadio',
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
