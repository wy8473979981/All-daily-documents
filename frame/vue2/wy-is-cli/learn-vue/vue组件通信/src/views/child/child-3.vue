<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 14:36:16
 * @LastEditTime: 2020-07-19 14:54:08
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-3.vue
 -->
<template>
  <div class="child-3">
    <p>子组件3</p>
    <b>data:{{ child3Data }}</b>
  </div>
</template>

<script>
import { bus } from "@/utils/bus";
export default {
  data() {
    return {
      child3Data: "child3"
    };
  },
  mounted() {
    bus.$on("goSend", data => {
      this.child3Data = data;
    });
  }
};
</script>

<style></style>
