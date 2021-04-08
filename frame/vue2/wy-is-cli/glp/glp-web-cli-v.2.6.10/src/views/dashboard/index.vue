<template>
  <div class="dashboard-container">
   <div class="dashboard-editor-container">
    普洛斯金融-vue脚手架项目
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
 
export default {
  name: "Dashboard",
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
   
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>

