<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP首页-中间进度条数据模块-进度条组件-汇总模式
-->

<template>
  <!-- //汇总模式 -->
  <div>
    <div class="position-relative box ">
      <div class="d-inline-block box-item text-nowrap">
        <div
          v-for="(item,index) in progList.list"
          :key="'bg'+index"
          class="color-list-box d-inline-block"
          :class="index>=progList.list.length-1?'b-r':''"
          :style="[{'background-color':item.color},{'width':getWidth(item.num,max)+'%'}]"
        >
          <popoverItem v-if="item.from" :color="item.color" :from="item.from" @switchChange="switchChange">
            <div
              class="cursor-pointer"
              style="height:36px;width:100%"
            />
          </popoverItem>
        </div>
        <div class="model-text">
          {{ progList.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popoverItem from './popoverItem'
export default {
  name: 'ProgressItem',
  components: { popoverItem },
  props: {
    // 进度条数据
    progList: {
      type: Object,
      default: () => {}
    },
    // 默认最大值
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    //   求和
    getNum(arr) {
      return arr.reduce(function(prev, curr, idx, arr) {
        return prev + curr
      })
    },
    // 返回宽度百分比
    getWidth(num, max) {
      return (num / max * 100).toFixed(2)
    },
    // 传递switch
    switchChange(e) {
      this.$emit('switchChange', e)
    }
  }
}
</script>

<style lang="scss" scoped>
    .box-item{
        width: calc(100% - 150px);
        height:36px;
        vertical-align: middle;
    }
    .box{
        height: 36px;
        font-size: 0;
        line-height: 36px;
        .color-list-box:first-child{
            border-top-left-radius: 18px;
            border-bottom-left-radius: 18px;
        }
    }
    .b-r{
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
    }
    .color-list-box{
        font-size: 14px;
        height: 36px;
        vertical-align: middle;
        transition: all 1s;

    }
    .model-text{
        line-height: 36px;
        padding-left: 10px;
        font-size: 24px;
        vertical-align: middle;
        display: inline-block;
        width:150px;
        text-align: left;
    }
</style>
