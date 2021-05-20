<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <div>
    <h2>欢迎光北海九号主题餐厅</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button v-for="(item, index) in girls" v-bind:key="index" @click="selectGirlFun(index)">
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】为你服务</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}

export default {
  name: "App",
  setup() {
    // const girls = ref(["小红", "小李", "小张"]);
    // const selectGirl = ref("");
    // const selectGirlFun = (index: number) => {
    //   selectGirl.value = girls.value[index];
    // };
    const data: DataProps = reactive({
      girls: ["小红", "小李", "小张"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>
