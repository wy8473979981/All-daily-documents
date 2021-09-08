<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-select
    v-model="form[$attrs.prop]"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请选择'"
    style="width: 100%"
    :clearable="false"
    :disabled="$attrs.disabled || form.disabled || false"
    @change="($attrs.change && $attrs.change(form)) || ''"
  >
    <div class="px-12 pb-4 " style="max-width:100%">
      <el-input v-if="$attrs.list&&$attrs.list.length>=3" v-model="searchVal" class="select-search-input" size="small" placeholder="请输入搜索内容">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
    </div>
    <template v-for="(item, index) in $attrs.list">
      <el-option
        v-if="searchVal===''||searchVal.includes(item[$attrs.listName || 'label'])"
        :key="'select' + index"
        :label="item[$attrs.listName || 'label']"
        :value="item[$attrs.listKey || 'value']"
      >
        <span class="float-left">{{ item[$attrs.listName || 'label'] }}</span>
        <span v-if="form[$attrs.prop] == item[$attrs.listKey || 'value']" class="float-right gouicon">
          <svg-icon icon-class="bluegou" class="icon" />
        </span>
      </el-option>
    </template>
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
  },
  data() {
    return {
      // 搜索输入
      searchVal: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .gouicon{
    font-size: 24px;
  }
</style>
