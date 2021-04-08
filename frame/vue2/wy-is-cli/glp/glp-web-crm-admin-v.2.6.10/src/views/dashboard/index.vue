<template>
  <div class="dashboard-container">
   <div class="dashboard-editor-container">
    客户管理系统
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

