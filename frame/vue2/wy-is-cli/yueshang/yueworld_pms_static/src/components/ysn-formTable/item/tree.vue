<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 规划人员选择弹窗
-->
<template>
  <div class="item-box">
    <div class="title pb-12">{{ title }}</div>
    <div class="content" :class="border?'border':''">
      <el-tree
        ref="tree"
        v-model="currentValue"
        :check-on-click-node="true"
        :data="nodes"
        show-checkbox
        node-key="projectId"
        :accordion="true"
        :expand-on-click-node="false"
        @check-change="checboxChange"
      />

    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemTree',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },

    // 边框
    border: {
      type: Boolean,
      default: false
    },

    // 数据list
    nodes: {
      type: Array,
      default: () => []
    },

    // 展位提示语
    placeholder: {
      type: String,
      default: '请先选择'
    },

    // 是否最后一级, 如果hi最后一级 需要展示select框
    isLast: {
      type: Boolean,
      default: false
    },

    // 下一级数据key
    nextKey: {
      type: String,
      default: ''
    },

    // 是否有删除按钮
    hasClose: {
      type: Boolean,
      default: false
    },

    // 双向绑定数据
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeId: '', // 选中id
      currentValue: [] // 选中的数组
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        console.log('watch', val)
        this.currentValue = val
      }
    }
  },
  methods: {
    // 删除item
    removeItem(itemValue) {
      this.$emit('removeItem', itemValue)
    },
    // 选中时间
    checboxChange(val) {
      val = this.$refs.tree.getCheckedNodes()
      this.$emit('checkboxChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
    .item-box{
        height: 100%;
        width: 148px;
        display: flex;
        flex-direction: column;
    }

    .title{
      color: #848382;
      font-size: 14px;
      padding-left:16px;
    }

    .border{
        border-right: 1px solid #D6D0C8;
    }
    .noList{
        color:#848382;
        text-align: center;
        height: 100%;
        display: flex;
    }
    .content{
        flex: 1;
        height: 0;
        display: flex;
        flex-direction: column;
    }

    .item{
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        color: #050101;
        cursor: pointer;
        padding:0 16px;
        &:hover,&.active{
             background: #DBD6D1;
        }
    }

</style>
<style  lang="scss">
    .el-tree-node__content{
      &:hover{
        background-color: #DBD6D1;
      }
    }
    .el-tree-node.is-current > .el-tree-node__content{
        background-color: #DBD6D1;

    }
</style>
