<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页-顶部指标卡-指标卡组件
-->
<template>
  <div class="card-content">
    <p class="title">
      <!-- 标题 -->
      {{ title }}
      <!-- 副标题 -->
      <span v-if="lastTitle">{{ lastTitle }}</span>
    </p>
    <p v-if="text!==''" class="text">
      {{ text }}<span>{{ company }}</span>
    </p>

    <p v-else class="default-text">
      {{ defaultText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 单位
    company: {
      type: String,
      default: ''
    },
    // 副标题
    lastTitle: {
      type: String,
      default: ''
    },
    // 默认文字
    defaultText: {
      type: String,
      default: '未选'
    },
    // 内容文字
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card-content{
    min-width:120px;
    box-sizing: border-box;

    .title{
        font-size: 14px;
        color: #004948;
        padding-bottom:4px;
        font-weight: 400;
        span{
            color:#816203;
            padding-left:8px;
            font-weight: 500;
        }
    }

    .text{
        font-weight: 400;
        color: #816203;
        font-size: 28px;
        span{
            font-size: 16px;
        }
    }

    .default-text{
        font-size: 24px;
        font-weight: 400;
        color: #BFBFBF;
    }
}
</style>
