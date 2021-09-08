<template>
  <span @click.stop="clickStop">
    <slot />
    <el-dialog
      v-if="dialogVisible || isShowDialog"
      class="pmsdialog"
      v-bind="$attrs"
      append-to-body
      :visible="dialogVisible || isShowDialog"
      :top="top"
      :close-on-click-modal="false"
      :show-close="false"
      :width="width"
      destroy-on-close
      @close="onCancel"
    >
      <!-- 右上角关闭按钮 -->
      <span class="p-position" @click="onCancel">
        <svg-icon icon-class="close-grey-default" class="cursor-pointer" />
      </span>
      <slot v-if="dialogVisible || isShowDialog" name="contain" />
      <!-- 需要自带按钮 -->
      <template v-if="showFooter&&!$scopedSlots.btn">
        <div slot="footer" class="btn-selection">
          <!-- <divclass="determine" ></div> -->
          <ysn-btn v-if="isDetermine" class="mr-12" @click="ok">{{ determineTitle }}</ysn-btn>
          <ysn-btn
            v-if="isCancel"
            type="info"
            @click="onCancel"
          >{{ cancelTitle }}</ysn-btn>
        </div>
      </template>
      <!-- 不需要自带按钮 -->
      <template v-if="showFooter&&$scopedSlots.btn" slot="footer">
        <slot name="btn" />
      </template>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: 'YsnDialog',
  props: {
    isDetermine: { type: Boolean, default: true }, // 是否需要确定按钮
    isCancel: { type: Boolean, default: true }, // 是否需要取消按钮
    width: { type: String, default: '700px' }, // 弹窗宽度
    top: { type: String, default: '5%' }, // 弹窗距离顶部距离
    outClose: { type: [Boolean, String, Number], default: true },
    isShowDialog: { type: Boolean, default: false }, // 是否显示dialog external为true时生效
    external: { type: Boolean, default: false }, // 是否从外部控制dialog打开
    determineTitle: { type: String, default: '确认' }, // 保存按钮文字
    cancelTitle: { type: String, default: '取消' }, // 取消按钮文字
    showFooter: { type: Boolean, default: true }, // 是否显示按钮
    contentPaddingBottom: { type: String, default: '30px' } // 主要内容底边距
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  watch: {
    outClose() {
      this.onCancel()
    }
  },
  methods: {
    // 点击右上角关闭按钮
    onCancel() {
      this.dialogVisible = false
      this.$emit('cancel')
      // 如果不是slot点开插槽 关闭按钮外层控制
      if (this.external) {
        this.$emit('closeDialog')
      }
    },
    // 点击确定按钮
    ok() {
      this.dialogVisible = false
      this.$emit('ok')
    },
    // slot点开插槽
    clickStop() {
      this.$attrs.initData && this.$attrs.initData()
      this.$attrs['init-data'] && this.$attrs['init-data']()
      if (!this.external) {
        this.dialogVisible = true
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pmsdialog ::v-deep .el-dialog {
  background: #f6f5ee;
  border-radius: 20px;

  .el-dialog__body {
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 12px;
  }
}
.pmsdialog ::v-deep .el-dialog__header {
  padding: 0;
  padding-top: 24px;
  padding-bottom: 8px;
  margin-left: 20px;
  margin-right: 20px;
  min-height: 57px;
  //  margin-left:24px;
  //  margin-right: 24px;
  .el-dialog__headerbtn {
    //   margin-right:29px;
    right: 29px;
  }
}
.pmsdialog .p-position {
  position: absolute;
  right: 29px;
  top: 20px;
  .svg-icon {
    font-size: 28px;
  }
}
</style>
