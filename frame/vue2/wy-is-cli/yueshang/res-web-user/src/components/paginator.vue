<template>
  <section class="paginator-wrapper">
    <el-pagination
      size='mini'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10,20,50]"
      :page-size="pageInfo.rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.sum_num">
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
      if (val !== this.pageInfo.rows) {
        this.pageInfo.page = 1
      }
      this.$emit('handle_paginator', {rows: val, page: this.pageInfo.page})
    },
    handleCurrentChange (val) {
      this.$emit('handle_paginator', {rows: this.pageInfo.rows, page: val})
    }
  }
}
</script>

<style lang="scss" scoped>
.paginator-wrapper{
  text-align: right;
  margin-top: 20px;
}
</style>


