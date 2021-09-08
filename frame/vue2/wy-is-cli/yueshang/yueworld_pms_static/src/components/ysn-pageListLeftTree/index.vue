<!--
 * @Author: fhj
 * @LastEditors: xza
 * @Description: 列表左侧菜单树
-->
<template>
  <div>
    <!-- 顶部标题 按钮 -->
    <div class="flex-ju-al-between mb-16 mt-6 p-2">
      <div class="page-left-title">{{ config.title }}<span class="text-12">{{ config.subTitle }}</span></div>
      <Dialog :parent-tree-data="config.dataList" :parent-choose-data="activedList" @ok="leftOk">
        <ysn-btn v-if="config.topBtn" type="text">进阶配置</ysn-btn>
      </Dialog>
    </div>

    <div>
      <!-- 全部 -->
      <Item
        :all-text="config.title"
        :actived="activedList.length === config.dataList.length"
        @click.native="chooseAll"
      />
      <!-- 其他列表 -->
      <Item
        v-for="(item,index) in config.dataList"
        :key="index"
        :actived="activedList.includes(item.value)&&activedList.length !== config.dataList.length"
        :item="item"
        @click.native="chooseItem(item)"
      />
    </div>
  </div>
</template>

<script>
import Item from './blocks/item'
import Dialog from './blocks/dialog'
export default {
  name: 'YsnPageListLeftTree',
  components: { Item, Dialog },
  props: {
    //  配置项
    config: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      // 选中列表 全选就全部加入进去 为空表示不选择
      activedList: []
    }
  },
  mounted() {

  },
  methods: {
    // 单个选择
    chooseItem(item) {
      // 全选状态下情况
      if (this.activedList.length > 1) {
        this.activedList = []
      }

      // 单选状态下判断是否是当前的 是的话视为取消选择
      if (this.activedList[0] === item.value) {
        this.activedList = []
        this.change()
        return
      }
      this.activedList = [item.value]
      this.change()
    },
    // 选择全部
    chooseAll() {
      this.activedList = this.config.dataList.map(item => item.value)
      this.change()
    },
    leftOk(val) {
      const { leaseAreaId, programId } = val
      this.activedList = programId
      console.log(this.activedList)
      this.leaseAreaId = leaseAreaId
      this.change()
    },
    // change事件
    change() {
      this.$emit('change', {
        programId: this.activedList,
        leaseAreaId: this.leaseAreaId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .page-left-title{
      color: $menuDefaultColor;
    }
</style>
