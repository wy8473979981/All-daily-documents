<template>
  <section class="paginator-wrapper">
    <el-pagination
      size='mini'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10,20,50,100,150,200]"
      :page-size="pageInfo.page_size"
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
      if (val !== this.pageInfo.page_size) {
        this.pageInfo.page = 1
      }
      this.$emit('handlePaginator', { page_size: val, page: this.pageInfo.page })
    },
    handleCurrentChange (val) {
      this.$emit('handlePaginator', { page_size: this.pageInfo.page_size, page: val })
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
