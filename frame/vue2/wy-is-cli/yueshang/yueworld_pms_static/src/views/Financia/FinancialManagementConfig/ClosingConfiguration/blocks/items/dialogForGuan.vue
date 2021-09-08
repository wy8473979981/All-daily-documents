<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 关账后弹窗点击列表弹窗
-->
<template>
  <div>
    <ysn-dialog
      :title="'关账'"
      :out-close="outClose"
      :width="'294px'"
      :is-show-dialog="isShowDialog"
      :get-data="getData"
      :is-cancel="false"
      :external="isShowDialog"
      @closeDialog="closeDialog"
      @ok="enter_"
    >
      <template #contain>
        <div class="pb-16 ysn-confirm-text">
          <svg-icon icon-class="attention" class="ysn-confirm-icon mr-12 font-24" />
          {{ !getData ? '尚未到本月设定时间,' : '是否进行反关账?' }}
        </div>
        <div v-if="!getData" class="pb-16 ml-36 ysn-confirm-tip">是否提前进行关账？</div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    getData: { type: Number, default: 0 } // 外部数据
  },
  data() {
    return {
      outClose: true
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 确认按钮
    enter_() {
      this.$emit('closeDialog')
      if (!this.getData) {
        // 关账确认
        this.$emit('getFeedBack')
        return
      }
      // 反关账确认
      this.$emit('notFeedBack')
    }
  }
}
</script>
