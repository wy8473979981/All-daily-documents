<template>
  <section class="paginator-wrapper">
    <el-pagination
      size='mini'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[10,20,50]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
  </section>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object
    }
  },
  methods: {
    handleSizeChange (val, oval) {
      if (val !== this.pageInfo.pageSize) {
        this.pageInfo.pageNum = 1
      }
      this.$emit('handle_paginator', { pageSize: val, pageNum: this.pageInfo.pageNum })
    },
    handleCurrentChange (val) {
      this.$emit('handle_paginator', { pageSize: this.pageInfo.pageSize, pageNum: val })
    }
  }
}
</script>

<style lang="scss" scoped>
.paginator-wrapper{
  text-align: right;
  margin-top: 10px;
}
</style>
