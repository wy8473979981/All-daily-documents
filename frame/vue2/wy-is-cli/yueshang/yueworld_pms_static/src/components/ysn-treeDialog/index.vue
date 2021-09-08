<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 树级选择弹窗层
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
      <slot />
    </template>

    <!-- popover内容 -->
    <div class="position-relative">
      <div v-bind="$attrs" class="dialog">
        <!-- 弹窗容器 -->
        <div class="dialog-content">
          <div class="dialog-top">
            <!-- 搜索框 -->
            <el-input v-model="searchVal" class="select-search-input" size="small" placeholder="请输入搜索内容">
              <template #prefix>
                <div class="font-24 gray">
                  <svg-icon icon-class="menuSearch" />
                </div>
              </template>
            </el-input>
          </div>
          <!-- 可选择内容 -->
          <div class="dialog-list my-12">
            <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
              <el-tree
                ref="tree"
                :data="$attrs.list"
                class="ysn-tree"
                node-key="value"
                default-expand-all
                :show-checkbox="$attrs.multipleChoice"
                :check-strictly="true"
                :filter-node-method="filterNode"
                :default-checked-keys="typeof form[$attrs.prop]==='string'?[form[$attrs.prop]]:form[$attrs.prop]"
                @node-click="handleNodeClick"
                @check-change="checkChange"
              >
              <span class="el-tree-node__label" slot-scope="{ node, data }">
                <el-radio v-model="editCheckId" :label="data.value" v-if="!$attrs.multipleChoice && !data.children">{{ node.label }}</el-radio>
                <span v-else>{{ node.label }}</span>
              </span>
              </el-tree>
            </el-scrollbar>
          </div>

          <!-- 底部按钮 -->
          <p class="px-16 text-right">
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
  name: 'YsnTreeDialog',
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
      // 筛选inputval
      searchVal: '',
      editCheckId: ''
    }
  },
  mounted() {
    if (!this.$attrs.multipleChoice) {
      this.editCheckId = this.form[this.$attrs.prop][0]
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
  watch: {
    searchVal(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 点击确认
    onConfirm() {
      this.dialogVisible = false
      this.$emit('ok', this.form[this.$attrs.prop])
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onClean() {
      this.form[this.$attrs.prop] = []
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([])
      })
    },
    // 设置item
    setItem(item) {
      this.$refs.tree.setCheckedKeys([item.value])
      this.form[this.$attrs.prop] = [item.value]
    },
    // 选中事件
    handleNodeClick(item, node, self) { // 自己定义的editCheckId，防止单选出现混乱
      if (this.$attrs.multipleChoice) {
        // 多选
        node.checked = !node.checked
        this.form[this.$attrs.prop] = this.$refs.tree.getCheckedKeys()
      } else {
        // 单选
        this.editCheckId = item.value
        this.setItem(item)
      }
    },
    // checkchange
    checkChange(item, node, self) {
      if (this.$attrs.multipleChoice) {
        this.form[this.$attrs.prop] = this.$refs.tree.getCheckedKeys()
      } else {
        if (node === true) {
          this.editCheckId = item.value
          this.setItem(item)
          return
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .dialog{
        position: absolute;
        left: 0;
        width:200px;
        max-height: 280px;
        z-index: 99;
        .dialog-content{
          width: 100%;
          max-height: 280px;
          position: relative;
          border-radius: 15px;
          background: #EFEDEA;
          box-sizing: border-box;
          padding: 16px 0;
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
            padding: 0 16px;
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

    .ysn-tree{
        ::v-deep.el-tree-node__expand-icon{
            position :absolute;
            right: 2%;
        }
        ::v-deep.el-checkbox{
            margin-left: 16px;
        }
        ::v-deep.el-tree-node__label{
            padding:0 10px 0 16px;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .el-radio__label {
              padding-left: 24px;
            }
        }
        ::v-deep.el-tree-node{
            .is-leaf + .el-checkbox{
                display: inline-block;
            }
            .el-checkbox{
                display: none;
            }
        }
        ::v-deep.el-tree-node:focus > .el-tree-node__content,::v-deep.el-tree-node__content:hover{
            background: #E5E2DE;
        }
    }

    .search-input{
       ::v-deep input{
           border-radius: 16px;
           background: #E5E2DE;
       }
    }
</style>
