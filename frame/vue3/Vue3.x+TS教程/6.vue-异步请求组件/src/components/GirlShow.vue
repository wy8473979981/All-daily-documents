<template>
  <img :src="result && result.url" />
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  async setup() {
    //promise 语法糖  返回之后也是promise对象
    // const rawData = await axios.get(
    //   "/mock/454f99ba2d1c6fd0b1ed79a1ad0132de/api/getImage"
    // );
    // return { result: rawData.data.data };

    const rawData = await axios.get(
      "/port/client_json.php?callback=jQuery112202895177500750623_1641264281614&transactionType=10001001&lotteryId=1&issueCount=1000&startIssue=&endIssue=&startDate=&endDate=&type=0&pageNum=1&pageSize=30&tt=0.44772270963871397&_=1641264281618"
    );
    return { result: rawData.data.data };
  },
});
</script>