<template>
  <van-popup
    class="close-popup"
    v-model="open"
    position="bottom"
    :style="{ minHeight: height }">
    <div class="confirm-dialog">
      <div class="close" @click="open = false">
        <van-icon class="icon" name="cross" />
      </div>
      <slot></slot>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '22%'
    }
  },
  data() {
    return {
      // open: false
    }
  },
  computed: {
    open: {
      get (val) {
        return this.show
      },
      set(val) {
        this.$emit('close', {show: false})
      }
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
// 确定框
.close-popup {
  overflow-y: unset;
}
.confirm-dialog {
  position: relative;
  padding: 20px 20px;
  z-index: 2003;
  .close {
    position: absolute;
    z-index: 9999 !important;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    .icon {
      vertical-align: middle;
      color: #000;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
