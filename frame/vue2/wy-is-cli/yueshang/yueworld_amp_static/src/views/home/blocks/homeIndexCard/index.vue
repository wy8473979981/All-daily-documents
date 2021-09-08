<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:  AMP-首页-顶部指标卡模块
-->
<template>
  <div class="block-main mb-26">
    <div class="d-inline-block block-left">
      <!-- 指标卡：暂定6个 -->
      <div v-for="(item,index) in cardData" :key="index+'b'" class="card-block">
        <card
          :title="item.title"
          :company="item.company"
          :last-title="item.lastTitle"
          :text="item.text"
        /></card>
      </div>

      <!-- 指标卡：进度条 -->
      <div v-for="(item,index) in cardRightData" :key="index" class="card-block ">
        <div v-for="(_item,_index) in item" :key="_index+'a'" class="card-text-block">
          <span>{{ _item.title }}:</span>{{ _item.value }}
        </div>
      </div>
    </div>
    <div class="d-inline-block ml-14">
      <DatePicker @selectDateResult="chooseDate" />
    </div>
  </div>
</template>

<script>
import card from './blocks/card'
export default {
  name: 'HomeIndexCard',
  components: { card },
  props: {
    // 指标卡数据
    cardData: {
      type: Array,
      default: () => []
    },
    // 进度条数据
    cardRightData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    chooseDate(date) {
      console.log('date', date)
      this.$emit('chooseDate', date)
    }
  }
}
</script>

<style lang="scss" scoped>
    .block-main{
        font-size: 0;
    }
    .block-left{
        width:600px;
    }
    .card-block{
        display: inline-block;
        margin-right: 18px;
        min-height: 73px;
        vertical-align: middle;
    }
    .card-text-block{
        width: 131px;
        height: 20px;
        background: #B5B18B;
        border-radius: 18px;
        margin-bottom: 1px;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        box-sizing: border-box;
        padding-left: 14px;
        span{
            color: #050101;
            display: inline-block;
            min-width: 54px;
            vertical-align: middle;
        }
    }
</style>
