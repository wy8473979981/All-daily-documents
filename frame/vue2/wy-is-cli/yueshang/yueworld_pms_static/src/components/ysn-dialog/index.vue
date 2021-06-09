<template>
    <span @click.stop="dialogVisible = true">
        <slot></slot>
        <el-dialog 
           class="pmsdialog"
           v-if="dialogVisible" 
           v-bind="$attrs" 
           append-to-body 
           :visible="true" 
           :top="top" 
           @close="onCancel"
           :close-on-click-modal="false"
           :show-close="false"
           :width="width"
        >
          <!-- 右上角关闭按钮 -->
            <span class="p-position" @click="onCancel">
                <svg-icon icon-class="close-grey-default"></svg-icon>
            </span>
            <slot v-if="dialogVisible" name="contain" ></slot>
                <!-- 需要自带按钮 -->
            <template  v-if="!$scopedSlots.btn">
              <div class="btn-selection">
                  <div class="determine"  v-if="isdetermine" @click="determine">确定</div>
                  <div class="cancel" v-if="iscancel" @click="pmscancel">取消</div>
              </div>
            </template>
                <!-- 不需要自带按钮 -->
            <template v-if="$scopedSlots.btn">
                 <slot name="btn"></slot>
            </template>
        </el-dialog>
    </span>

</template>

<script>
export default {
    props: {
        isdetermine:{ type: Boolean, default: true }, //是否需要确定按钮
        iscancel:{ type: Boolean, default: true },//是否需要取消按钮
        width:{type: String, default: '700px'}, //弹窗宽度
        top: {type: String, default: '5%'}, //弹窗距离顶部距离
        // footer: { type: Boolean, default: false },
        cancel: { type: Boolean, default: true },
        // ok: { type: Boolean, default: true },
        // single: { type: Boolean, default: false },
        outClose: { type: [Boolean, String, Number], default: true }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    watch: {
        outClose() {
            this.onCancel();
        }
    },
    methods: {
        // 点击右上角关闭按钮
        onCancel() {
            this.dialogVisible = false;
            this.$emit('cancel');
        },
        // 点击确定按钮
        determine() {
            this.dialogVisible = false;
            this.$emit('determine');
        },
        // 点击取消按钮
        pmscancel() {
            this.dialogVisible = false;
            this.$emit('pmscancel');
        },
    }
};
</script>

<style scoped lang="scss">
 .pmsdialog ::v-deep .el-dialog{
      background: #FDFCFA;
      border-radius: 20px;

  }
   .pmsdialog ::v-deep .el-dialog__header{
         padding:0;
         padding-top:24px;
         padding-bottom: 8px;
         margin-left:24px;
         margin-right:24px;
         min-height: 57px;
        //  margin-left:24px;
        //  margin-right: 24px;
      .el-dialog__headerbtn{
        //   margin-right:29px;
          right:29px;
       }
   }
  .pmsdialog .p-position{
      position:absolute;
      right:29px;
      top:20px;
      .svg-icon{
          font-size:28px;
      }
  }
  .pmsdialog .btn-selection{
      display: flex;
      flex-direction:row-reverse;
      .cancel{
          width: 86px;
          height: 32px;
          line-height: 32px;
          background: #E5E2DE;
          border-radius: 16px;
          color: #848382;
          font-size: 14px;
          text-align: center;
          margin-right: 8px;
      }
      .determine{
          width: 86px;
          height: 32px;
          background: #1C4C7F;
          border-radius: 16px;
          color:#FFFFFF;
          text-align: center;
          line-height: 32px;
          font-size:14px;
      }
  }
   
</style>
