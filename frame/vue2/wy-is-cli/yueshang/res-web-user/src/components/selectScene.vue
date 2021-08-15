<!-- 审批单选择场景 -->
<template>
  <div v-if="isOpen">
    <el-dialog title="请选择场景"
               :visible.sync="isOpen"
               width="35%"
               @close="close">
      <el-tree :data="sceneList"
               :props="defaultProps"
               @node-click="selectScene"></el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"
                   @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'selectScene',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    plate: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      sceneList: [], //场景列表
      defaultProps: {
        children: 'childNode',
        label: 'sceneName'
      },
      selectKey: {} // 选中的节点
    }
  },
  computed: {
    isOpen: {
      get () {
        return this.open
      },
      set () {
        this.$emit('close')
      }
    }
  },
  created () {
    this.getSceneListData()
  },
  methods: {
    // 获取场景列表数据
    getSceneListData () {
      this.$approval.getSceneList({'plate': this.plate}).then(res => {
        if (res.code == 1) {
          this.sceneList = this.handleSceneData(res.data.childNode)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    close () {
      this.isOpen = false
    },
    selectScene (item) {
      if (item.subjectName) {
        this.selectKey = item
      } else {
        this.selectKey = {}
      }
    },
    // 监听确定按钮点击 
    save () {
      this.$emit('close', this.selectKey)
    },
    // 处理数据 去掉data结构层
    handleSceneData (data) {
      const newData = data.map(item => {
        return {
          childNode: item.childNode,
          ...item.data
        }
      })
      newData.forEach(item => {
        if (item.childNode) {
          item.childNode = item.childNode.map(val => {
            if (val.data) {
              return val = {
                childNode: val.childNode,
                ...val.data
              }
            }
          })

        }
      })
      return newData
    }


  },

}
</script>

<style lang='scss' scoped>

</style>
