<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 级联选择弹窗
-->
<template>
  <div class="item-box">
    <div class="title pb-12">{{ title }}</div>
    <div class="content">
      <!-- 无数据展示 -->
      <div v-if="nodes.length===0" class="noList flex-ju-al-center">{{ placeholder }}</div>
      <!-- 选择展示 -->
      <template  v-else >
        <div class="item" v-if="!hasClose">
          <el-checkbox
            v-model="checkAllData"
            v-bind="$attrs"
            :indeterminate="currentValue.length>0&&currentValue.length<nodes.length"
            @change="handleCheckAllChange">
            全选
          </el-checkbox>
        </div>
       
        <el-checkbox-group v-model="currentValue" @change="checboxChange" class="content checkbox-content">
            <template v-for="(item,index) in nodes" >
              <div v-if="filterValue===''||item.label.indexOf(filterValue)!=-1" :key="index" class="item" :class="[hasClose?'flex-ju-al-between':'']">
                  <!-- 最后一级才出现checbox -->
                    <el-checkbox v-if="!hasClose" :label="item.value">{{ item.label }}</el-checkbox>
                    <span v-else>{{ item.label }}</span>
                    <i v-if="hasClose" class="el-icon-close flot-right" @click="removeItem(item.value)" />
              </div>
            </template>
        </el-checkbox-group>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemBox',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
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

    // 过滤
    filterValue:{
      type:String,
      default:''
    },

    // 选中的数据
    checkList:{
      type:Array,
      default:()=>[]
    },

    // 数据key
    dataKey:{
      type:String,
      default:''
    }
   
  },
  data() {
    return {
      currentValue: [], // 选中的数组
      checkAll: false //是否全选
    }
  },
  watch:{
    checkList:{
      deep:true,
      immediate: true,
      handler(val) {
        this.currentValue=val
      }
    }
  },
  computed: {
    checkAllData: {
      get() {
        // 监听是否权限
        if (this.currentValue.length === this.nodes.length) {
          return true
        }
        if (this.currentValue.length === 0) {
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
    // 全选
    handleCheckAllChange(val) {
      const list = this.nodes.map(item => item.value)
      this.currentValue= val ? list : []
      this.choose()
    },
    // 删除item
    removeItem(itemValue) {
      this.$emit('removeItem', itemValue)
    },
    // 选中
    checboxChange(val) {
      this.currentValue = val
      this.choose()
    },
    choose(){
      if(this.isLast){
        const list = this.nodes.filter(item => this.currentValue.includes(item.value))
        this.$emit('checkboxChange',list)
        return ;
      }
      this.$emit('choose', { item: this.currentValue, isLast: this.isLast, nextKey: this.nextKey,nodes:this.nodes,dataKey:this.dataKey })
    }
  }
}
</script>
<style lang="scss" scoped>
    .item-box{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .title{
      color: #848382;
      font-size: 14px;
      padding-left:16px;
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
        width: 100%;
        &:hover{
             background: #DBD6D1;
        }
    }
    .checkbox-content{
      overflow-x: hidden;
      overflow-y: auto;
    }
</style>
