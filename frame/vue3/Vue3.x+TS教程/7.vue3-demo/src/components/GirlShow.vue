<template>
  <img :src="result && result.url" height="500" width="500"/>
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    //promise 语法糖  返回之后也是promise对象
    const rawData = await axios.get(
      "/api/getImage"
    );
    return { result: rawData.data.data };
  },
});
</script>