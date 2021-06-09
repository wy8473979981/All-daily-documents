<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 选择弹窗层
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
    <div class="position-relative">
      <div v-bind="$attrs" class="dialog">
        <!-- 弹窗容器 -->
        <div class="dialog-content">
          <!-- 顶部已选中 -->
          <div class="dialog-top">
            已选中<span>({{ form[$attrs.prop].length }})</span>个
            <p>
              <el-checkbox
                v-model="checkAllData"
                class="mt-12"
                v-bind="$attrs"
                :indeterminate="form[$attrs.prop].length>0&&form[$attrs.prop].length<$attrs.list.length"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
            </p>
          </div>

          <!-- 可选择内容 -->
          <div class="dialog-list my-12">
            <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
              <el-checkbox-group v-model="form[$attrs.prop]" v-bind="$attrs" @change="($attrs.change && $attrs.change(form)) || ''">
                <el-checkbox v-for="(item, index) in $attrs.list" :key="'checkbox' + index" :label="item[$attrs.listKey || 'value']" class="mb-12">
                  {{ item[$attrs.listName || 'label'] }}
                </el-checkbox>
              </el-checkbox-group>
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
  name: 'YsnSelectDiaglog',
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
  computed: {
    checkAllData: {
      get() {
        // 监听是否权限
        if (this.form[this.$attrs.prop].length === this.$attrs.list.length) {
          return true
        }
        if (this.form[this.$attrs.prop].length === 0) {
          return false
        }
        return this.checkAll
      },
      set(value) {
        this.checkAll = value
      }
    }
  },
  methods: {
    // 点击确认
    onConfirm() {
      this.dialogVisible = false
    },
    // 清除
    onClean() {
      this.form[this.$attrs.prop] = []
    },
    // 全选事件
    handleCheckAllChange(val) {
      const list = this.$attrs.list.map(item => item.value)
      this.form[this.$attrs.prop] = val ? list : []
    }

  }
}
</script>
<style lang="scss" >
    button{
        border:none;
        background: none;
        padding: 0;
        &:hover{
            background: none;
        }
    }
    .dialog{
        position: absolute;
        left: 0;
        width: 100%;
        max-height: 280px;
        z-index: 99;
        .dialog-content{
          width: 100%;
          max-height: 280px;
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

          .dialog-top{
            &>span{
              color: #004948;
            }
          }
          .dialog-list{
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .scrollbar{
            max-height: 150px;
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
