<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :width="boxWidth" :before-close="cancelDialog" :lock-scroll="true"
    :top="top" :close-on-click-modal="false">

    <div class="content">

      <slot name="content" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" size="mini" v-if="footerBtnOne">{{footerBtnOne}}</el-button>
      <el-button type="success" size="mini" @click="sure" v-if="footerBtnTwo">{{footerBtnTwo}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      footerBtnOne: {
        type: String
      },
      footerBtnTwo: {
        type: String
      },
      boxWidth: {
        type: String
      },
      top: {
        type: String
      }
    },
    methods: {
      cancelDialog() {
        this.$emit('update:dialogVisible', false)
      },
      handleClose() {
        this.dialogVisible = false
      },
      cancel() {
        this.$emit('footerFunOne', 'hello')
      },
      sure() {
        this.$emit('footerFunTwo', 'hello')
      }
    }
  }
</script>

<style scoped>
  .content {
    max-height: 400px;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .content::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    background: #999;
  }

  .content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
   /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 5px;
    background: #EDEDED;
  }
</style>
