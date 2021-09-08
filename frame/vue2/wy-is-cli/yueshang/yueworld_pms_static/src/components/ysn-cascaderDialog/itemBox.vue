<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 级联选择弹窗
-->
<template>
  <div class="item-box">
    <div class="title pb-12">{{ title }}</div>
    <div class="content" :class="border?'border':''">
      <!-- 无数据展示 -->
      <div v-if="nodes.length===0" class="noList flex-ju-al-center">{{ placeholder }}</div>
      <!-- 选择展示 -->
      <el-checkbox-group v-else v-model="currentValue" @change="checboxChange">
        <div v-for="(item,index) in nodes" :key="index" class="item" :class="[activeId===item.value?'active':'',hasClose?'flex-ju-al-between':'']" @click="chooseItem(item)">
          <!-- 最后一级才出现checbox -->
          <el-checkbox v-if="isLast" :label="item.value">{{ item.label }}</el-checkbox>
          <span v-else>{{ item.label }}</span>
          <i v-if="hasClose" class="el-icon-close flot-right" @click="removeItem(item.value)" />
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemBox',
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
      immediate: true,
      handler(val) {
        console.log('watch', val)
        this.currentValue = val
      }
    }
  },
  methods: {
    // 选择item
    chooseItem(item) {
      // 选中效果
      if (!this.isLast) {
        this.activeId = item.value
      }
      this.$emit('choose', { item: item, isLast: this.isLast, nextKey: this.nextKey })
    },
    // 删除item
    removeItem(itemValue) {
      this.$emit('removeItem', itemValue)
    },
    // 选中时间
    checboxChange(val) {
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
