<template>
  <el-select
    v-model="form[$attrs.prop]"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择'"
    style="width: 100%"
    @change="($attrs.change && $attrs.change(form)) || ''">
      <el-option
        v-for="(item, index) in $attrs.list"
        :key="'select' + index"
        :label="item[$attrs.listName || 'label']"
        :value="item[$attrs.listKey || 'value']"
        :disabled="item.disabled"
      >
        <span class="float-left">{{ item[$attrs.listName] }}</span>
        <span class="float-right gouicon" v-if="form[$attrs.prop] == item[$attrs.listKey || 'value']">
          <svg-icon icon-class="bluegou" class="icon" />
        </span>
      </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ItemSelect',
  inheritAttrs: false,
  props: {
    form: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
  .gouicon{
    font-size: 24px;
  }
</style>
