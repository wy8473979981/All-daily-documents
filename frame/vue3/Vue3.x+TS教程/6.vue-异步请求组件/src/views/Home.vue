<template>
  <div>
    <Suspense>
      <template #default>
        <!-- <AsyncShow /> -->
        <GirlShow />
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import AsyncShow from "../components/AsyncShow.vue";
import GirlShow from "../components/GirlShow.vue";

const app = {
  name: "App",
  components: { AsyncShow, GirlShow },
  setup() {
    return {};
  },
};
export default app;
</script>