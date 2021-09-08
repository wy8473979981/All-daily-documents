<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div
    class="flex-ju-al-between"
    style="padding-right: 60px"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseout"
  >
    <div><i class="el-icon-document mr-4" />{{ item.name }}</div>
    <template v-if="type!=='text' && canOperate">
      <i
        v-if="closeIconShow"
        class="el-icon-close cursor-pointer"
        @mouseover.stop="handleCloseMouseover"
        @mouseout.stop="handleCloseMouseout"
        @click="handleDelFile"
      />
      <i v-else class="el-icon-check color-1C4C7F" />
    </template>

  </div>
</template>

<script>
export default {
  name: 'FileListItem',
  props: {
    item: {
      type: Object, default: () => {
      }
    },
    // 类型
    type: {
      type: String,
      default: 'file'
    },
    // 是否可编辑
    canOperate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      closeIconShow: false
    }
  },
  methods: {
    handleDelFile() {
      this.$confirm('确定删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('handleDelFile', this.item)
      }).catch(() => {
        console.log('取消')
      })
    },
    handleCloseMouseover() {
      this.closeIconShow = true
      this.mouserOverClose = true
    },
    handleCloseMouseout() {
      this.mouserOverClose = false
    },
    handleMouseover() {
      if (this.canOperate) {
        this.closeIconShow = true
      }
    },
    handleMouseout() {
      if (this.mouserOverClose) {
        return
      }
      this.closeIconShow = false
    }
  }
}
</script>

<style scoped>

</style>
