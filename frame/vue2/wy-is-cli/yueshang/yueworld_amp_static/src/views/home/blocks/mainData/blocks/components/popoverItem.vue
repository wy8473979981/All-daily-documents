<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP首页-中间进度条数据模块-进度条组件-鼠标移入popover组件
-->

<template>
  <!-- 弹窗 -->
  <el-popover
    v-model="dialogVisible"
    placement="right-end"
    popper-class="popover"
    :visible-arrow="false"
  >
    <!-- 默认插槽 触发点击区域 -->
    <template slot="reference">
      <slot />
    </template>

    <!-- 弹窗 -->
    <div class="popover-box position-relative" :style="'background:'+color+'F2'">
      <div class="popover-content">
        <!-- 箭头 -->
        <div class="popover-content-jt" :style="'border-bottom: 14px solid '+color+'F2'" />
        <!-- switch -->
        <div class="flex-ju-al-between mb-20">
          <span>来自:</span>
          <el-switch
            v-model="from.isSwitch"
            active-color="#13ce66"
            inactive-color="#848382"
            @change="switchChange"
          />
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" class="scrollbar">
          <p v-for="(item,index) in from.list" :key="index" class="list-item">{{ item }}</p>
        </el-scrollbar>
      </div>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'ProgressItem',

  props: {
    // 背景色
    color: {
      type: String,
      default: ''
    },
    // 弹窗数据
    from: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 显示内容
      dialogVisible: false
    }
  },
  mounted() {
  },
  methods: {
    switchChange(val) {
      this.$emit('switchChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
    .popover-box{
        width: 180px;
        height: 300px;
        border-radius: 15px;
        top:0;
        box-sizing: border-box;
        box-shadow: #fff;
        left:10px
    }
    .popover-content{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        color: #fff;
        .popover-content-jt{
             position: absolute;
            left: -30px;
            top: 6px;
            border-right: 17px solid transparent;
            border-left: 27px solid transparent;
            // border-bottom: 14px solid rgba(0, 56, 55, 0.95);
            transform: rotate(51deg)
        }
    }
    .popover{
      background: none;
      margin: 0;
      padding: 0;
      border: none;
      box-shadow: none;
        height: 0;
      width: 0;
    }
    .scrollbar{
        height: 230px;
    }
    .list-item{
        padding: 5px 0;
    }
</style>
