<!--
 * @Author: fhj
 * @LastEditors: xza
 * @Description: 级联选择弹窗
-->
<template>
  <div>
    <el-popover
      v-model="isShowDialog"
      placement="bottom-start"
      popper-class="popover-dialog"
      :trigger="trigger"
      :width="width"
      :disabled="disabled"
      @show="show"
    >
      <!-- 触发区域 -->
      <span slot="reference">
        <slot />
      </span>

      <slot v-if="isShowDialog" name="content" />
    </el-popover>
  </div>
</template>
<script>

export default {
  name: 'YsnPopoverDialog',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    // 数据类型  show=>铺位  user=>人员
    dataType: {
      type: String,
      default: 'shop'
    },
    // 初始化数据
    initData: {
      type: Function
    },
    // trigger类型
    trigger: {
      type: String,
      default: 'click'
    },
    // width宽度
    width: {
      type: [Number, String],
      default: '700'
    }
  },
  data() {
    return {
      isShowDialog: false // 是否显示弹窗
    }
  },
  mounted() {
  },
  methods: {
    // slot点开插槽
    closePop() {
      this.isShowDialog = false
    },
    // 初始化数据
    show() {
      this.initData && this.initData()
    }
  }
}
</script>
