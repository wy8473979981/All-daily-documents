<template>
  <el-dialog
    :visible="visible"
    :width="width"
    :close-on-click-modal='false'
    :show-close='false'
    :close-on-press-escape='false'
  >
    <slot></slot>
    <div slot='footer'>
      <el-button size="mini" type="success" @click="confirm" v-if="showConfirm">确定</el-button>
      <el-button size="mini" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showConfirm: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean
    },
    width: {
      type: String,
      default: '50%'
    },
    target: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm')
      this.cancel()
    },
    cancel () {
      this.$emit('toggle', { target: this.target, visible: false })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
