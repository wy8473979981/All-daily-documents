<template>
  <p>count: {{ count }}</p>
  <p>倍数： {{ multiple }}</p>
  <div>
    <button @click="increase()">加1</button>
    <button @click="decrease()">减一</button>
  </div>
</template>

<script lang="ts">
import useCount from "../hooks/useCount";
export default {
  name: "App",
  setup() {
    const { count, multiple, increase, decrease } = useCount(10);
    return {
      count,
      multiple,
      increase,
      decrease,
    };
  },
};
</script>