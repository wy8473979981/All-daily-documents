/* eslint-disable vue/no-template-shadow */
<template>
  <div>
    <ysn-dialog
      external
      :title="'自定义'"
      width="610px"
      :is-show-dialog.sync="show"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <div class="content d-flex">
          <!-- 左侧checkbox -->
          <div class="left-content px-12">
            <!-- 左侧表述和操作按钮 -->
            <div class="flex-ju-al-between mb-16">
              <span class="text">选择需要显示的字段</span>
              <div>
                <ysn-btn
                  type="text"
                  class="mr-16"
                  @click="chooseAll"
                >全选</ysn-btn>
                <ysn-btn type="reset" @click="resetConfig">清除</ysn-btn>
              </div>
            </div>

            <!-- 配置区域 -->
            <div class="item-content">
              <el-tree
                ref="leftTree"
                highlight-current
                :class="'left-tree'"
                node-key="path"
                :data="leftTreeData"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                :show-checkbox="true"
                default-expand-all
                :default-checked-keys="defaultCheckedkeys"
                :props="defaultProps"
                @node-click="handleNodeClick"
              />
            </div>
          </div>
          <!-- 右侧已选中 -->
          <div class="right-content pr-20 max-area">
            <div class="right-title pl-20">
              拖拽字段调整顺序
            </div>
            <div class="right-main">
              <el-tree
                ref="tree"
                :data="rightTreeData"
                :allow-drop="collapse"
                :expand-on-click-node="false"
                :props="{ children: 'tableList' }"
                class="ysn-tree"
                node-key="configId"
                draggable
                default-expand-all
              >
                <div
                  slot-scope="{ data }"
                  class="custom-tree-node flex-ju-al-center"
                >
                  <el-tooltip
                    :content="data.title"
                    placement="top"
                    effect="dark"
                    :disabled="data[Object.keys(data)[0]].length <= 6"
                  >
                    <span class="text-truncate">{{ data.title }}</span>
                  </el-tooltip>
                  <i class="el-icon-close" @click="() => removeItem(data)" />
                </div>
              </el-tree>
            </div>
          </div>
        </div>
      </template>
      <template #btn>
        <ysn-btn @click="saveClick">保存</ysn-btn>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BlDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // 表头配置项
    config: {
      type: Array,
      default: () => []
    },
    optionsMenuData: {
      type: Array,
      default: () => []
    },
    defaultCheckedkeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      show: false,
      confirmVisiable: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      leftTreeData: [],
      rightTreeData: []
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar'])
  },
  watch: {
    visible: {
      handler: function(newValue) {
        this.show = newValue
        this.leftTreeData = this.showRoutes()
      },
      immediate: true,
      deep: true
    },
    optionsMenuData: {
      handler: function(newValue) {
        this.rightTreeData = JSON.parse(JSON.stringify(newValue))
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {
    // 初始化树形数据
    this.leftTreeData = this.showRoutes()
  },
  methods: {
    // 拖拽
    collapse(moveNode, inNode, type) {
      if (type === 'inner') return
      // 禁止非同级拖拽
      if (moveNode.parent.id !== inNode.parent.id) return
      // 固定字段禁止排序 也不允许拖拽到固定字段之前
      if (moveNode.data.showFixed || inNode.data.showFixed) return
      // 拖拽
      if (moveNode.nextSibling === undefined) {
        return type === 'prev'
      } else if (inNode.nextSibling === undefined) {
        return type === 'next'
      } else if (moveNode.nextSibling.id !== inNode.id) {
        return type === 'prev'
      } else {
        return type === 'next'
      }
    },
    handleVisibleClose() {
      // 初始化数据
      this.$emit('cancelOptionsMenu')
    },
    /**
     * @method:saveClick
     * @desc:保存事件
     */
    saveClick() {
      this.$emit('saveOptionsMenu', this.rightTreeData)
    },
    // 全选
    chooseAll() {
      const listData = this.treeToList(this.leftTreeData)
      this.$refs.leftTree.setCheckedNodes(listData)
      this.rightTreeData = this.getFilterSelectNode(listData)
    },
    removeItem(data) {
      this.rightTreeData.map((item, index) => {
        if (item.path === data.path) {
          this.rightTreeData.splice(index, 1)
        }
      })
      this.$refs.leftTree.setCheckedNodes(this.rightTreeData)
    },
    // 清空选择
    resetConfig() {
      this.$refs.leftTree.setCheckedKeys([])
      this.rightTreeData = []
    },
    treeToList(tree, result = [], level = 0) {
      tree.forEach((node) => {
        result.push(node)
        node.level = level + 1
        node.children && this.treeToList(node.children, result, level + 1)
      })
      return result
    },
    showRoutes() {
      const searchVal = ''
      const newRouters = JSON.parse(JSON.stringify(this.permission_routes))
      const routersList = this.returnRouters(searchVal, newRouters)
      let defaultOpeneds = [...this.getDefaultOpends(routersList)] // 默认展开项

      if (searchVal === '') {
        const p = this.$route.fullPath.split('/').filter((item) => item)
        const pList = []
        p.reduce((preValue, curValue) => {
          pList.push('/' + preValue)
          return preValue + '/' + curValue
        })
        defaultOpeneds = [...pList, this.$route.fullPath]
      }

      this.defaultOpeneds = defaultOpeneds

      const result = this.treeFilter(routersList, (node) => {
        return node.hidden != null && !node.hidden
      })
      return result
    },
    treeFilter(tree, func) {
      // 使用map复制一下节点，避免修改到原树
      return tree
        .map((node) => ({ ...node }))
        .filter((node) => {
          node.children = node.children && this.treeFilter(node.children, func)
          return func(node) || (node.children && node.children.length)
        })
    },
    /* @type  str:需要过滤的，routers路由列表
     * @description 递归查询需要展示的路由
     */
    returnRouters(str, routers) {
      const that = this
      const newRouter = []
      routers.forEach((item) => {
        // 如果是hideen的菜单不处理
        if (item.hidden) {
          newRouter.push(item)
          return
        }

        // 匹配str的注入
        if (item.meta && item.meta.title.indexOf(str) !== -1) {
          newRouter.push(item)
          return
        }

        // 有children 继续处理
        if (item.children && item.children.length > 0) {
          item.children = [...that.returnRouters(str, item.children)]
          if (item.children.length > 0) {
            newRouter.push(item)
          }
          return
        }
      })
      return newRouter
    },
    /*
      @type  routers:路由列表
    * @description 递归查询需要展开的路由
    */
    getDefaultOpends(routers) {
      const that = this
      let newRouter = []
      routers.forEach((item) => {
        // 如果是hideen的菜单不处理
        if (item.hidden) {
          return
        }
        // path的注入
        newRouter.push(item.path)
        // 有children 继续处理
        if (item.children && item.children.length > 0) {
          newRouter = newRouter.concat(that.getDefaultOpends(item.children))
        }
      })
      return newRouter
    },
    handleNodeClick(data) {
      const selectNodes = this.$refs.leftTree.getCheckedNodes()

      this.rightTreeData = this.getFilterSelectNode(selectNodes)
    },
    getFilterSelectNode(data) {
      const result = []
      data &&
        data.map((item, index) => {
          if (!item.children) {
            // let { title, path } = item;
            // let obj = { title: title, path: path };
            result.push(item)
          }
        })
      // console.log('getFilterSelectNode', result);
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  max-height: 300px;
}
.right-content {
  width: 200px;
  border-left: 1px solid #e5e2de;
  box-sizing: border-box;

  .right-title {
    line-height: 32px;
    color: #848382;
    font-size: 14px;
  }
  .right-main {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.text {
  color: #848382;
  font-size: 14px;
}
::v-deep .left-content {
  flex: 1;
  box-sizing: border-box;
  .item {
    display: inline-block;
  }
  .item-content {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #050101;
      line-height: 22px;
    }
    .left-tree {
      .el-tree-node__label {
        background: #e5e2de;
        border-radius: 12px;
        padding: 4px 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
      }
      .el-tree-node__content {
        margin-bottom: 16px;
        label.el-checkbox {
          display: none;
        }
        .el-tree-node__label {
          width: 217px;
          height: 24px;
        }
      }
      .el-tree-node__children {
        label.el-checkbox {
          display: none;
        }
        .el-tree-node__label {
          width: 193px;
          height: 24px;
        }
      }
      .is-checked {
        .el-tree-node__label {
          position: relative;
          background: #1c4c7f;
          color: #ffffff;
          &::after {
            content: "";
            position: absolute;
            right: 10px;
            top: 50%;
            width: 12px;
            height: 12px;
            border-radius: 12px;
            background-color: #fff;
            margin-top: -6px;
          }
        }
      }
    }
  }
}

.custom-tree-node {
  position: relative;
  height: 36px;
  cursor: move;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABiUlEQVRIDe1UsU7DMBD1JSkbQzuxIBYKU2GgM+rIhuAPGJCQkGCAiZgOiU2oxMTMF2SgqmBg4SNgonSBkQUGFqQ0MT7ooSQiQZHCAKql07vz+Z59Z90xlrUAHcJ1FIBxlnWo8D4SYtCREAeFg8sI0A94Ih6DlBHWUvZvmFQA5EZduO5F/B4rbnzqcEl7Bhi2WVFdsstBKd09YjoWYrnT6UyS/S9R1/0VBZPzPGcp/iflJCyEWEUhNimcc9IJEz8NLNoeOXqe51XDYbBGB8tB/YQBCrKdCDHzXdKJhqgoWEHBgH3OHxkYu6iPV7EKfAzSrBAhHMkU22HATjlv23TO9/2Jwf2d7nxoKgYbnPMe+dKY+LW080/YuSWSwn1WSlUB4MXmh19DWkq5oKLwBjMEYF2bt9ezss0tUX1ufsq0WBMxTmDb9q1pVWpgmIt55BiTe8FDvz8dRdBCjF+AOoRhQ2fX+mnoJqZFmiQAdaUiNhsA29K+Ovmxz99UdK1taxgEDY2b5Btj4Qq8A85ugTo0pnF7AAAAAElFTkSuQmCC)
    no-repeat left center;
  background-size: 24px;
  padding-left: 24px;
  box-sizing: border-box;
  > span {
    color: #050101;
    display: inline-block;
    margin-left: 12px;
    width: 90px;
  }
  > i {
    color: #848382;
    font-size: 12px;
    cursor: pointer;
  }
}
.ysn-tree {
  ::v-deep .el-tree-node {
    padding-left: 16px;
  }
  ::v-deep .el-tree-node__content {
    min-height: 1px;
    height: auto;
    &:hover {
      background: #efedea;
    }
    .el-icon-caret-right {
      display: none;
    }
  }
}

.el-icon-close {
  height: 12px;
  display: inline-block;
}
.icon {
  width: 24px;
  height: 24px;
}
.left-content {
  flex: 1;
  box-sizing: border-box;
}
.right-content {
  width: 200px;
  border-left: 1px solid #e5e2de;
  box-sizing: border-box;
  .right-title {
    line-height: 32px;
    color: #848382;
    font-size: 14px;
  }
}
</style>
