<template>
  <div>
    <p>接收兄弟组件props==={{msg}}</p>
    <p>B向A发送信息：<button @click="sendMsg()">发送到A</button></p>
  </div>
</template>

<script>
import {
  EventBus
} from "./event-bus.js";
export default {
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  },
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自B页面的消息');
    }
  }
};
</script>
