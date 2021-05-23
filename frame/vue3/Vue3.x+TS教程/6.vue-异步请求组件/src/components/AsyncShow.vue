<template>
  <h1>{{ result }}</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({ result: "mybj123.com" });
      }, 2000);
    });
  },
});
</script>