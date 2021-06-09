<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页-地图模式-选择弹窗层
-->
<template>
  <!-- 弹窗 -->
  <el-popover
    v-model="dialogVisible"
    placement="right-start"
    popper-class="popover"
    :visible-arrow="false"
    @after-enter="$emit('open')"
  >
    <!-- 默认插槽 触发点击区域 -->
    <template slot="reference">
      <slot />
    </template>
    <!-- popover内容 -->
    <div class="position-relative contain" :style="{width:width,height:height,marginTop:offsetTop}">
      <i class="el-icon-close close" @click.stop="dialogVisible = false" />
      <slot name="contain" />
    </div>
  </el-popover>

</template>

<script>
export default {
  name: 'YsnRadioDiaglog',
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    offsetTop: {
      type: String,
      default: '0px'
    },
    width: {
      type: String,
      default: '386px'
    },
    height: {
      type: String,
      default: '254px'
    }
  },
  data() {
    return {
      // 显示内容
      dialogVisible: false,
      // 是否全选
      checkAll: false
    }
  },
  methods: {
    // 点击确认
    onConfirm() {
      this.dialogVisible = false
    },
    // 清除
    onClean() {
      this.dialogVisible = false
      setTimeout(() => {
        // eslint-disable-next-line vue/no-mutating-props
        this.form[this.$attrs.prop] = ''
      }, 300)
    }

  }
}
</script>
<style lang="scss" scoped>

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .popover{
      background: none;
      margin: 0;
      padding: 0;
      border: none;
      box-shadow: none;
      height: 0;
      width: 0;
    }

    .contain{
        // width: 386px;
        // height: 254px;
        background: rgba(224,231,231,.7);
        border-radius: 20px;
        // opacity: 0.7;
        border: 1px solid #004948;
        box-sizing: border-box;
        padding: 30px;
    }

    .close{
        position: absolute;
        right: 14px;
        top: 14px;
        font-size: 15px;
        cursor: pointer;
    }
</style>
