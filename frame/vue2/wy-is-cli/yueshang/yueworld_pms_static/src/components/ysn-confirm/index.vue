<template>
  <span class="ysn-confirm-container cursor-pointer" @click="handleVisible">
    <slot />
    <ysn-dialog
      external
      :title="title"
      :width="width"
      :top="top"
      :is-show-dialog="visible"
      @closeDialog="handleVisible"
    >
      <div slot="btn" class="ysn-confirm-footer flex-ju-end">
        <template v-if="showBtn">
          <div class="ysn-confirm-cancel flex-ju-al-center" @click="handleCancel">{{ cancelText }}</div>
          <div class="ysn-confirm-confirm flex-ju-al-center" @click="handleConfirm">{{ confirmText }}</div>
        </template>
        <template v-else>
          <slot name="btn" />
        </template>
      </div>
      <div slot="contain">
        <div class="ysn-confirm-content">
          <svg-icon icon-class="attention" class="ysn-confirm-icon mr-12 font-24" />
          <div>
            <div class="pb-16 ysn-confirm-text" v-html="content" />
            <div class="ysn-confirm-tip">{{ tip }}</div>
          </div>
        </div>
      </div>
    </ysn-dialog>
  </span>
</template>

<script>
export default {
  name: 'YsnConfirm',
  props: {
    // 二次确认弹窗标题
    title: {
      type: String,
      default: ''
    },
    // 二次确认弹窗宽度
    width: {
      type: String,
      default: '484px'
    },
    // 二次确认弹窗上边距
    top: {
      type: String,
      default: '120px'
    },
    // 二次确认弹窗内容
    content: {
      type: String,
      default: ''
    },
    // 二次确认弹窗提示
    tip: {
      type: String,
      default: ''
    },
    // 是否禁止打开弹窗
    disabled: {
      type: Boolean,
      default: false
    },
    // 取消文字
    cancelText: {
      type: String,
      default: '暂不删除'
    },
    // 确认文字
    confirmText: {
      type: String,
      default: '确认删除'
    },
    // 是否显示底部默认按钮
    showBtn: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      // 二次确认弹窗是否展示
      visible: false
    }
  },
  mounted() {},
  methods: {
    // 二次确认弹窗操作 展示 隐藏
    handleVisible() {
      if (this.disabled) {
        return
      }
      this.visible = !this.visible
    },
    // 二次确认弹窗 取消操作
    handleCancel() {
      this.handleVisible()
      this.$emit('cancel')
    },
    // 二次确认弹窗 确认操作
    handleConfirm() {
      this.handleVisible()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss">
.ysn-confirm {
  &-button {
    width: 86px;
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    &:first-child {
      margin-right: 8px;
    }
  }
  &-content {
    display: flex;
    justify-content: start;
    font-size: 14px;
    color: #050101;
  }
  &-confirm {
    @extend .ysn-confirm-button;
    background: #e5e2de;
    color: #848382;
  }
  &-cancel {
    @extend .ysn-confirm-button;
    background: #1c4c7f;
    color: #ffffff;
  }
  &-tip {
    font-size: 12px;
    color: #6f120c;
  }
  &-icon {
    width:50px;
    height:50px;
  }
  &-text{
    line-height: 24px;
    font-weight: bold;
  }
}
</style>
