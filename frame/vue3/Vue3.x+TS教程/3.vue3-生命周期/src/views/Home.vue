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
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
} from "vue";

interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}

export default {
  name: "App",
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data: DataProps = reactive({
      girls: ["小红", "小李", "小张"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    });

    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted()");
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前-----onBeforeUpdate()");
    });

    onUpdated(() => {
      console.log("5-组件更新之后-----onUpdated()");
    });

    // onRenderTracked((event) => {
    //   console.log("状态跟踪组件----------->");
    //   console.log(event);
    // });

    onRenderTriggered((event) => {
      console.log("状态触发组件--------------->");
      console.log(event);
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
</script>
