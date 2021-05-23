<template>
  <img :src="result && result.url" />
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    //promise 语法糖  返回之后也是promise对象
    const rawData = await axios.get(
      "/mock/454f99ba2d1c6fd0b1ed79a1ad0132de/api/getImage"
    );
    return { result: rawData.data.data };
  },
});
</script>