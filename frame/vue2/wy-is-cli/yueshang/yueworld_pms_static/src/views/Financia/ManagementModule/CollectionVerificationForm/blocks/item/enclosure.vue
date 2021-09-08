<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 找不到商家/企业 弹窗
-->
<template>
  <div>
    <ysn-dialog
      class="ysn-accessory-dialog"
      :width="'400px'"
      :is-determine="false"
      :is-show-dialog="isShowDialog"
      :is-cancel="false"
      :show-footer="false"
      :external="true"
      @closeDialog="closeDialog"
    >
      <slot />
      <!-- 弹窗表格 -->
      <template #contain>
        <el-form ref="ruleForm" size="small" class="content">
          <div class="text">该笔收款可以暂时存放在临时账户中，是否存放?</div>
          <div class="btn">
            <ysn-btn @click="btnClick('yes')">确认</ysn-btn>
            <ysn-btn @click="btnClick('no')">取消</ysn-btn>
          </div>
        </el-form>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExamineDialog',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    notfind: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      outClose: true
    }
  },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.$emit('closeDialog')
    },
    btnClick(val) {
      if (val === 'yes') {
        this.notfind.tenantName = '临时商户'
      }
      this.$emit('closeDialog')
    }
  }
}
</script>
<style scoped lang="scss">
 .content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
.btn{
  width: 240px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}
</style>
