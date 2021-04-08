<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 13:18:19
 * @LastEditTime: 2020-07-19 13:29:48
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-1.vue
 -->
<template>
  <div class="child-1">
    <p>{{ source }}</p>
    <button @click="goData">向父组件传递子组件数据</button>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: ""
    }
  },
  methods: {
    goData() {
      this.$emit("getChildData", "前端小丑的邮箱");
    }
  }
};
</script>

<style lang="scss" scoped></style>
