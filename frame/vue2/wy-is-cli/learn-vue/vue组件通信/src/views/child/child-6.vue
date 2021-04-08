<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 17:18:41
 * @LastEditTime: 2020-07-19 17:29:47
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\child\child-6.vue
 -->
<template>
  <div class="child-6">
    <p>{{ childData }}</p>
    <p>父组件数据：{{ data }}</p>
    <button @click="send">调用父组件方法</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childData: "@163.com"
    };
  },
  props: {
    data: {
      type: String
    }
  },
  methods: {
    childChange(data) {
      console.log(data)
      this.childData += data;
    },
    send() {
      this.$parent.change(this.childData);
    }
  }
};
</script>

<style></style>
