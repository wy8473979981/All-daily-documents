<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 选择弹窗层
-->
<template>
  <!-- 弹窗 -->
  <el-popover
    v-model="dialogVisible"
    placement="bottom-start"
    popper-class="popover"
    :visible-arrow="false"
  >
    <!-- 默认插槽 触发点击区域 -->
    <template slot="reference">
      <el-input
        v-bind="$attrs"
        :ref="'form-item-'+$attrs.prop"
        :placeholder="form[$attrs.prop].length===0?($attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请输入'):''"
        resize="none"
        @blur="$attrs.blur || ''"
      >
        <div slot="prefix" class="ml-8">
          <!-- 默认文字 -->
          <span v-if="form[$attrs.prop].length===0" />
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form[$attrs.prop].length>0" size="small" closable color="#1C4C7F" class="tag px-8 " disable-transitions @close="tagClose">
            <span class="text-truncate tag-text">
              {{ form[$attrs.prop][0]| getOptionsLabel($attrs.list) }}
            </span>
          </el-tag>

          <!-- 选中2个以上 -->
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form[$attrs.prop].length>1" size="small" color="#1C4C7F" class="tag px-8 " disable-transitions>
            +{{ form[$attrs.prop].length-1 }}
          </el-tag>
        </div>
      </el-input>

    </template>

    <!-- popover内容 -->
    <div class="position-relative">
      <div v-bind="$attrs" class="dialog">
        <!-- 弹窗容器 -->
        <div class="dialog-content">
          <!-- 顶部已选中 -->
          <div class="dialog-top">
            <!-- 搜索框 -->
            <el-input v-if="$attrs.list.length>=3" v-model="searchVal" class="select-search-input" size="small" placeholder="请输入搜索内容" @change="searchChange">
              <!-- <template #prefix>
                <div class="font-24 gray">
                  <svg-icon icon-class="menuSearch" />
                </div>
              </template> -->
              <i slot="prefix" class="el-input__icon el-icon-search" />

            </el-input>
            <!-- <p>
              <el-checkbox
                v-model="checkAllData"
                class="mt-12"
                v-bind="$attrs"
                :indeterminate="form[$attrs.prop].length>0&&form[$attrs.prop].length<$attrs.list.length"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
            </p> -->
          </div>

          <!-- 可选择内容 -->
          <div class="dialog-list my-12">
            <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
              <el-checkbox-group v-model="form[$attrs.prop]" v-bind="$attrs" @change="($attrs.change && $attrs.change(form)) || ''">
                <template v-for="(item, index) in $attrs.list">
                  <el-checkbox v-if="searchVal===''||searchVal.includes(item[$attrs.listName || 'label'])" :key="'checkbox' + index" :label="item[$attrs.listKey || 'value']" class="mb-12 checkbox-item text-left">
                    {{ item[$attrs.listName || 'label'] }}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
            </el-scrollbar>
          </div>

          <!-- 底部按钮 -->
          <p class="text-right">
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
  name: 'SelectDialog',
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
      checkAll: false,
      // 搜索输入
      searchVal: ''
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
      // eslint-disable-next-line vue/no-mutating-props
      this.form[this.$attrs.prop] = []
    },
    // 全选事件
    handleCheckAllChange(val) {
      const list = this.$attrs.list.map(item => item.value)
      // eslint-disable-next-line vue/no-mutating-props
      this.form[this.$attrs.prop] = val ? list : []
    },
    // tag关闭
    tagClose() {
      this.form[this.$attrs.prop].shift()
    },
    searchChange(val) {
      console.log(val)
    }

  }
}
</script>
<style lang="scss" scoped>
    .dialog{
        position: absolute;
        left: 0;
        width: 200px;
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
              color: #1C4C7F;
            }
          }
          .dialog-list{
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
          }

          .scrollbar{
            // max-height: 150px;
            .el-scrollbar__wrap {
              max-height: 150px; // 最大高度
              overflow-x: hidden; // 隐藏横向滚动栏
            }
          }
        }
    }
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .gray{
      color: #848382;
    }

    .set-select{
        width: 142px;
        height: 34px;
        background: #E5E2DE;
        border-radius: 16px;
        font-size: 14px;
        color: #848382;
        display: inline-block;
        box-sizing: border-box;
        line-height: 34px;
        cursor: pointer;
    }
    .checkbox-item{
        width: 100%;
        margin-right: 0;
    }

    .tag{
      color: #fff;
      border-radius: 20px;
      vertical-align: middle;
        ::v-deep .el-tag__close{
            display: inline-block;
            vertical-align: middle;
              color: #fff;
            transform:scale(1)
        }
    }
    .tag-text{
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;
    }
</style>
