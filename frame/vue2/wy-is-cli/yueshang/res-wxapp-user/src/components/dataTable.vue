/*
*author: wjh
*date： 2020-11-23
*desc： 基于element-ui的table组件二次封装
*/

<template>
    <el-table
      :data="data"
      style="width: 100%"
      >
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          align="center">
        </el-table-column>
      </template>
    </el-table>
</template>

<script>
  export default {
    name: "dataTable",
    props: ['data', 'columns']
  }
</script>

<style lang='scss' scoped>
</style>