<template>
  <div class="x-dialog--alert">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width">
      <div class="x-dialog--alert-content">
        <div>{{content}}</div>
        <slot name="content"></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-for="(item, index) in buttonConfig" :key="index" :type="item.type || 'default'" size="mini" @click="handleClick(item.action)">{{item.text}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'XDialogAlert',

    model: {
      prop: 'visible',
      event: 'close'
    },

    props: {
      visible: Boolean,

      width: {
        type: String,
        default: '30%'
      },

      title: {
        type: String,
        default: '提示'
      },

      content: String,

      buttonConfig: {
        type: Array,
        default: () => [
          { text: '确 定', type: 'primary', action: 'success'},
          { text: '取 消', type: '', action: 'close'},
        ]
      }
    },

    data() {
      return {
        dialogVisible: false
      };
    },

    methods: {
      handleClick(action) {
        this.dialogVisible = false;
        this.$emit('change', action);
      }
    },

    watch: {
      dialogVisible(val) {
        this.$emit('close', val)
      },

      visible: {
        handler(val) {
          this.dialogVisible = val
        },
        immediate: true,
      }
    }
  };
</script>

<style lang="scss" scoped>
.x-dialog--alert {
  :global(.el-dialog) {
    border-radius: 20px;
  }

  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    color: $font-word-color;
    padding-left: 20px;

    &:before {
      content: '';
      display: block;
      height: 20px;
      width: 20px;
      background-image: url(~assets/icons/attention.png);
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

::v-deep.x-dialog--alert .el-dialog {
  border-radius: 20px;
  background: $mainColor;

  .el-dialog__title {
    color: $font-word-color;
  }

  .el-dialog__header {
    position: relative;
    padding: 24px 24px 8px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 20px;
      left: 20px;
      height: 1px;
      background: $subMenuBg;
    }
  }

  .el-dialog__body {
    padding: 10px 24px 24px;
  }
}
</style>