<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 自定义表头组件
-->
<template>
  <ysn-dialog title="自定义显示字段" class="dialog" @ok="ok">
    <!-- 默认slot点击时打开弹窗 -->
    <svg-icon
      icon-class="setting"
      class="ml-12 icon  cursor-pointer"
    />
    <!-- <div class="ml-12 el-icon-setting font-size-18 cursor-pointer" /> -->
    <!-- 弹窗表格 -->
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
            <div
              v-for="(item, index) in currentConfig"
              :key="index"
              class="item"
              :class="
                item.tableList && item.tableList.length > 0 ? '' : 'mr-8 mb-16'
              "
            >
              <!-- 暂时只支持二级表头 不考虑递归 后续需求来了再增加 -->
              <div v-if="item.tableList && item.tableList.length > 0">
                <p class="title mt-24 mb-16">
                  {{ item[Object.keys(item)[0]] }}
                </p>
                <div>
                  <Item
                    v-for="(_item, _index) in item.tableList"
                    :key="_index"
                    class="mr-8 mb-16"
                    :item="_item"
                    @chooseItem="chooseItem"
                  />
                </div>
              </div>
              <!-- 一级 -->
              <Item v-else :item="item" @chooseItem="chooseItem" />
            </div>
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
              :data="treeConfig"
              :allow-drop="collapse"
              :expand-on-click-node="false"
              :props="{ children: 'tableList' }"
              class="ysn-tree"
              node-key="configId"
              draggable
              default-expand-all
            >
              <div
                v-show="!data.showFixed"
                slot-scope="{ data }"
                class="custom-tree-node flex-ju-al-center"
              >
                <el-tooltip
                  :content="data[Object.keys(data)[0]]"
                  placement="top"
                  effect="dark"
                  :disabled="data[Object.keys(data)[0]].length<=6"
                >
                  <span class="text-truncate">{{
                    data[Object.keys(data)[0]]
                  }}</span>
                </el-tooltip>

                <i
                  v-if="!data.showFixed"
                  class="el-icon-close"
                  @click="() => removeItem(data.configId)"
                />
              </div>
            </el-tree>
          </div>
        </div>
      </div>
    </template>
  </ysn-dialog>
</template>

<script>
// 注: 因下标会变,所以必须增加id后通过id去找寻对应的item改变
import Item from './item.vue'
export default {
  name: 'YsnStatusSearch',
  components: { Item },
  props: {
    // 表头配置项
    config: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentConfig: this.getCurrentConfig(this.config.concat()),
      treeConfig: [] // 树状config
    }
  },
  mounted() {
    // 初始化树形数据
    this.treeConfig = this.setTreeConfig(this.currentConfig.concat())
  },
  methods: {
    // 设置树型config
    setTreeConfig(config) {
      const newConfig = config.filter((item) => {
        if (item.tableList) {
          item.tableList = this.setTreeConfig(item.tableList)
        }
        if (item.tableList && item.tableList.length > 0) {
          return true
        }
        return item.showFixed || item.isShow
      })
      return newConfig
    },
    // config 排序
    getCurrentConfig(config) {
      // 根据二级表头排序
      let newConfig = config.sort((a, b) => {
        const aNum = a.tableList ? a.tableList.length : 0
        const bNum = b.tableList ? b.tableList.length : 0
        return aNum - bNum
      })

      // 为每个config配置id
      newConfig = this.setConfigId(newConfig)
      return newConfig
    },
    // 设置configId
    setConfigId(config, parentId) {
      const newConfig = config.map((item) => {
        const newItem = { ...item }
        if (parentId) {
          newItem.parentId = parentId
        }
        newItem.configId = this.getString(20)
        if (newItem.tableList) {
          newItem.tableList = this.setConfigId(
            newItem.tableList,
            newItem.configId
          )
        }
        return newItem
      })
      return newConfig
    },

    // 随机字符串
    getString(e) {
      e = e || 32
      const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const a = t.length
      let n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    // 全选
    chooseAll() {
      const newConfig = this.currentConfig.map((item) => {
        if (item.tableList && item.tableList.length > 0) {
          item.tableList = item.tableList.map((_item) => {
            _item.isShow = true
            return _item
          })
          return item
        }
        item.isShow = true
        return item
      })
      this.currentConfig = newConfig.concat()
      this.treeConfig = this.setTreeConfig(newConfig.concat())
    },
    // 选中的Item
    chooseItem(item) {
      const newItem = { ...item }
      newItem.isShow = !newItem.isShow
      this.currentConfig = this.setItem(newItem, this.currentConfig).concat()
      if (newItem.isShow) {
        // 如果为选中 去判断添加到哪里
        // 一级直接push
        if (!item.parentId) {
          this.treeConfig.push(newItem)

          return
        }
        // 二级
        const findItem = this.treeConfig.find(
          (_item) => _item.configId === item.parentId
        )
        if (findItem) {
          // treeConfig有的情况下在tableList下面push
          const findItemIndex = this.treeConfig.findIndex(
            (_item) => _item.configId === item.parentId
          )
          const treeConfig = this.treeConfig.concat()
          treeConfig[findItemIndex].tableList.push(newItem)
          this.treeConfig = treeConfig

          return
        }
        // treeConfig未添加二级情况下push一个新的
        const newConfigItem = this.currentConfig.find(
          (_item) => _item.configId === item.parentId
        )
        const _newCOnfigItem = newConfigItem.concat()
        _newCOnfigItem.tableList = [newItem]
        this.treeConfig.push(_newCOnfigItem)

        return
      }
      // 删除逻辑
      this.removeItem(item.configId)
    },

    // 设置item 返回新的config
    setItem(chooseItem, currentConfig) {
      return currentConfig.map((item) => {
        if (item.configId === chooseItem.configId) {
          return chooseItem
        }
        if (item.tableList) {
          item.tableList = this.setItem(chooseItem, item.tableList)
        }
        return item
      })
    },

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

    // 删除
    removeItem(configId) {
      this.treeConfig = this.removeConfig(this.treeConfig, configId)
      this.currentConfig = this.removeLeftConfig(this.currentConfig, configId)
    },
    // 清空选择
    resetConfig() {
      this.treeConfig = this.removeConfig(this.treeConfig, '')
      this.currentConfig = this.removeLeftConfig(this.currentConfig, '')
    },
    // 左边数据做删除处理
    removeLeftConfig(config, configId) {
      let newConfig = config.map((item) => {
        // 一级删除
        // configId等于空代表清除功能
        if (
          item.configId === configId ||
          (configId === '' && !item.showFixed)
        ) {
          item.isShow = false
        }

        // 二级删除
        if (item.tableList) {
          item.tableList = this.removeLeftConfig(item.tableList, configId)
        }
        return item
      })
      newConfig = newConfig.filter((item) => item)
      return newConfig
    },
    // 删除树型数据
    removeConfig(config, configId) {
      let newConfig = config.map((item) => {
        // 一级删除
        if (
          item.configId === configId ||
          (configId === '' && !item.showFixed)
        ) {
          return null
        }

        // 二级删除
        if (item.tableList) {
          item.tableList = this.removeConfig(item.tableList, configId)
        }
        if (item.tableList && item.tableList.length === 0) {
          return null
        }
        return item
      })
      newConfig = newConfig.filter((item) => item)
      return newConfig
    },
    ok() {
      this.$emit('change', this.treeConfig)
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
.left-content {
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
  ::v-deep .el-tree-node{
    padding-left: 16px;
  }
  ::v-deep .el-tree-node__content {
    min-height: 1px;
    height: auto;
    &:hover {
      background: #efedea;
    }
    .el-icon-caret-right{
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
</style>
