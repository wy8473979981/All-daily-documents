<template>
  <div class="define-dialog-container">
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      :width="width"
      :before-close="handleClose">
      <span class="close-container" @click="handleClose()"><svg-icon icon-class="close-grey-hover" class="close-grey-default" /></span>
      <slot name="dailogContent"></slot>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    width: String,
    tableData: Array,
    tableColumn: Array
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleClose() {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss">
  .define-dialog-container{
    /*.el-table__body-wrapper{*/
    /*  background: #FDFCFA;*/
    /*}*/
  }
</style>
<style lang="scss">
.close-container {
    position: absolute;
    top: 24px;
    right: 18px;
    cursor: pointer;
    .close-grey-default {
        font-size: 24px;
    }
}
</style>
