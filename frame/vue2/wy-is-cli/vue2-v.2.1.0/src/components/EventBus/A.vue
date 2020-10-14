<template>
  <div>
    <p>接收兄弟组件props==={{msg}}</p>
    <p>A向B发送信息：<button @click="sendMsg()">发送到B</button></p>
  </div>
</template>

<script>
import { EventBus } from "./event-bus.js";
export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // B发送来的消息
      this.msg = msg;
    });
  },
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
};
</script>
