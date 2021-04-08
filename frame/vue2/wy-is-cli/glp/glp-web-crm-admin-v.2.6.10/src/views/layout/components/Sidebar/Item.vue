<template>
  <div @click="currentClick">
    <svg-icon v-if="icon" :icon-class="icon"></svg-icon>
    <!-- <span :class="icon" class="fsw-iconfont"></span> -->
    <span>{{title}}</span>
    <span v-if="title=='业务审批'" class="todo-approval">
      <span>({{todoApproval}})</span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      todoNo: 0,
    };
  },
  methods: {
    currentClick() {
      localStorage.removeItem("activeName");
      localStorage.removeItem("serachParm");
    }
  },
  computed: {
    ...mapGetters(["todoApproval"]),
  },
  created() {
  },
  // render(h, context) {
  //   const { icon, title } = context.props;
  //   const vnodes = [];

  //   if (icon) {
  //     vnodes.push(<svg-icon icon-class={icon}/>);
  //   }

  //   if (title) {
  //     vnodes.push(<span>{title}</span>)
  // }

  //   return vnodes;
  // }
}
</script>
<style lang="scss">
.todo-approval {
  display: inline-block;
  width: 40px;
  height: 40px;
  // vertical-align: middle;
  .todo-circle {
    display: inline-block;
    background: red;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
</style>
