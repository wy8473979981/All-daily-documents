<template>
  <el-dialog :title="title" :visible.sync="centerDialogVisible" :width="width" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
    <slot name="content"></slot>
    <span slot="footer" class="dialog-footer">
      <ysNButton v-for="(item,index) in buttonList" :key="index" @click="operate(item.function)" :class="item.className" :text="item.name" :styleObject="{'padding':item.padding}"></ysNButton>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    buttonList: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
    operate (fc) {
      this.$emit(fc)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .table {
  margin-top: 0px;
}
::v-deep .el-dialog {
  .el-dialog__header {
    padding: 19px 20px 0 20px;
    line-height: 36px;
    .el-dialog__title {
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #1c1c1c;
    }
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .el-dialog__footer {
    padding: 20px 20px;
  }
  .el-button {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #1c1c1c;
    height: 36px;
    padding: 0 26px;
    border: 1px solid #e0e5eb;
    border-radius: 0;
  }
}
</style>
