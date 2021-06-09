<template>
  <div id="app" class="h-100 flex-column">
    <div class="flex-1 relative">
      <router-view />
      <loading v-show="isLoading"></loading>
    </div>
    <bottombar></bottombar>
  </div>
</template>

<script>
import { mapState } from "vuex"
import loading from "@/components/loading"
import bottombar from "@/pages/rootMenu"
export default {
  name: "App",
  components: {
    loading,
    bottombar
  },
  computed: {
    ...mapState(['isLoading'])
  },
};
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  left: 0;
  top: 50%;
  position: fixed;
}
</style>
