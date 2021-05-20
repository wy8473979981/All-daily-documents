<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">+
    <div>
      <h2>欢迎光北海九号主题餐厅</h2>
      <div>请选择一位美女为你服务{{selectGirl}}</div>
    </div>
    <div>
      <button v-for="(item,index) in girls" v-bind:key="index" @click="selectGirlFun(index)">
        {{index}}:{{item}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const girls = ref(["小红", "小李", "小张"]);
    const selectGirl = ref("");
    const selectGirlFun = (index: number) => {
      selectGirl.value = girls.value[index];
    };
    //因为在模板中这些变量和方法都需要调用，所以需要return出去。
    return {
      girls,
      selectGirl,
      selectGirlFun,
    };
  },
});
</script>
