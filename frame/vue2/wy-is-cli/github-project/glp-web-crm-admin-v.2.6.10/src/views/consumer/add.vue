<template>
  <div class="content" v-if="isLoading">
    <div class="section">
      <template v-if="currConsumerType=='ENTERPRISE'">
        <corporateClient :baseInfo="baseInfo"></corporateClient>
      </template>
      <template v-else>
        <individualClient :baseInfo="baseInfo"></individualClient>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
import corporateClient from "./components/corporateClient";
import individualClient from "./components/individualClient";
import DataApi from "@/api/consumerService";
export default {
  components: {
    corporateClient,
    individualClient
  },
  data() {
    return {
      routeQuery: null,
      currConsumerId: null,
      isLoading: false, //是否正在加载
      baseInfo: null
    };
  },
  computed: {},

  created() {
    this.routeQuery = this.$route.query;
    this.currConsumerType = this.routeQuery.currConsumerType;
    if (this.routeQuery.flag == "edit") {
      this.getDetailById();
    } else {
      this.isLoading = true;
    }
  },
  mounted() {},
  methods: {
    getDetailById(data) {
      DataApi.consumerDetailById(this.routeQuery.currConsumerId).then(res => {
        if (res.code == 200) {
          let { data } = res;
          this.baseInfo = data;
          this.isLoading = true;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  margin-left: 10px;
}
</style>