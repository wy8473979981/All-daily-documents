/*
*author: ly
*date： 2021-08-20
*desc： 翻页封装
*/

<template>
  <section class="pagination-box">
    <el-pagination
      size='mini'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10,20,50]"
      :page-size="pageInfo.rows"
      layout="total, sizes, prev, pager, next"
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
.pagination-box{
  text-align: right;
  margin-top: 20px;
}
</style>
<style lang="scss">
.pagination-box .el-pagination .el-select .el-input .el-input__inner {
  height: 28px;
  padding-right: 8px;
  background-color: #F6F5EE;
}
.pagination-box .el-pagination button:disabled {
  background-color: #F6F5EE;
  color: #848382;
}
.pagination-box .el-pagination .btn-prev, .el-pagination .btn-next {
  background-color: #F6F5EE;
}
.pagination-box .el-pager li {
  min-width: 28px;
  color: #848382;
  background-color: #F6F5EE;
}
.pagination-box .el-pager li.active {
  color: #1C4C7F;
  font-size: 14px;
  font-weight: bold;
}
.pagination-box .el-pagination .btn-prev {
  padding-right: 0;
}
.pagination-box .el-pagination .btn-next {
  padding-left: 0;
}
.pagination-box .el-pagination span:not([class*=suffix]), .el-pagination button {
  min-width: 22px;
}
.pagination-box .el-pagination__total {
  float: left;
  color: #848382;
}
.el-pagination__sizes {
  border-right: 1px solid #E5E2DE;
}
</style>
