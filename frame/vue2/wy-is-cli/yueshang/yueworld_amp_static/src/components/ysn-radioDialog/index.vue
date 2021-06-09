<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 单选选择弹窗层
-->
<template>
  <!-- 弹窗 -->
  <el-popover
    v-model="dialogVisible"
    placement="bottom"
    popper-class="popover"
    :visible-arrow="false"
  >
    <!-- 默认插槽 触发点击区域 -->
    <template slot="reference">
      <slot />
    </template>

    <!-- popover内容 -->
    <div class="position-relative ">
      <div v-bind="$attrs" class="dialog radio-content">
        <!-- 弹窗容器 -->
        <div class="dialog-content">
          <!-- 可选择内容 -->
          <div class="dialog-list my-12">
            <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
              <el-radio-group v-model="form[$attrs.prop]" v-bind="$attrs" @ @change="($attrs.change && $attrs.change(form)) || ''">
                <el-radio v-for="(item, index) in $attrs.list" :key="'radio' + index" :label="item[$attrs.listKey || 'value']" class="mb-12">
                  {{ item[$attrs.listName || 'label'] }}
                </el-radio>
              </el-radio-group>
            </el-scrollbar>
          </div>

          <!-- 底部按钮 -->
          <p>
            <el-button type="primary" size="mini" round class="left-btn" @click="onConfirm">
              <span class="font-12 px-4">确认</span>
            </el-button>
            <el-button type="text" size="mini" @click="onClean">
              <span class="gray">清除</span>
            </el-button>
          </p>
        </div>

      </div>
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
      this.$emit('ok')
    },
    // 清除
    onClean() {
      this.form[this.$attrs.prop] = ''
    }

  }
}
</script>
<style lang="scss">
    button{
        border:none;
        background: none;
        padding: 0;
        &:hover{
            background: none;
        }
    }
    .dialog.radio-content{
        position: absolute;
        left: 0;
        width: 100%;
        max-height: 240px;
        z-index: 99;
        .dialog-content{
          width: 100%;
          position: relative;
          border-radius: 15px;
          background: #EFEDEA;
          box-sizing: border-box;
          padding: 16px;
          color: #050101;
          font-size: 14px;
          text-align: left;
          &::after{
            content: '';
            border-bottom: 4px solid #EFEDEA;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            position: absolute;
            top: -4px;
            left:25px;
          }

          .dialog-list{
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .scrollbar{
            max-mheight: 150px;
          }
        }
    }
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .gray{
      color: #848382;
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
</style>
