<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 14:43:00
 * @LastEditTime: 2020-07-19 14:54:52
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-2-1.vue
 -->
<template>
  <div class="child-2-1">
    <p>子组件2的子组件</p>
    <b>data:{{ child21Data }}</b>
  </div>
</template>

<script>
import { bus } from "@/utils/bus";
export default {
  data() {
    return {
      child21Data: "child21"
    };
  },
  mounted() {
    bus.$on("goSend", data => {
      this.child21Data = data;
    });
  }
};
</script>

<style></style>
