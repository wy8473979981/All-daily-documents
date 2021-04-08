<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 16:00:25
 * @LastEditTime: 2020-07-19 17:12:04
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-5.vue
 -->
<template>
  <div class="child-5">
    <p>子组件</p>
    <p>{{ inputValue }}</p>
    <button @click="change">改变modal的值</button>
  </div>
</template>

<script>
export default {
  // props: {
  //   value: {
  //     type: String
  //   }
  // },
  model: {
    prop: "inputValue",
    event: "setValue"
  },
  props: {
    inputValue: {
      type: String,
      default: ""
    }
  },
  data () {
    return {};
  },
  methods: {
    change () {
      //   this.$emit("input", "hello");
      this.$emit("setValue", "hello");
    }
  }
};
</script>

<style></style>
