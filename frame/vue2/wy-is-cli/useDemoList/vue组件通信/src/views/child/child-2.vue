<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 14:36:09
 * @LastEditTime: 2020-07-19 14:52:56
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-2.vue
 -->
<template>
  <div class="child-2">
    <p>子组件2</p>
    <b>data:{{ child2Data }}</b>
    <child-2-1></child-2-1>
  </div>
</template>

<script>
import child from "./child-2-1";
import { bus } from "@/utils/bus";
export default {
  data() {
    return {
      child2Data: "child2"
    };
  },
  mounted() {
    bus.$on("goSend", data => {
      this.child2Data = data;
    });
  },
  components: {
    "child-2-1": child
  }
};
</script>

<style></style>
