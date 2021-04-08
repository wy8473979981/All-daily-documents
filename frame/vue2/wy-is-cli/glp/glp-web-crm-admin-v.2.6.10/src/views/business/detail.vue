<template>
  <div class="content">
    <div class="section" v-if="loading">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <baseInfoTab :baseInfo="baseInfo"></baseInfoTab>
        </el-tab-pane>
        <el-tab-pane label="阶段历史" name="second" :lazy="true">
          <stageHistoryTab :baseInfo="baseInfo"></stageHistoryTab>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import baseInfoTab from "./components/baseInfoTab";
import DataApi from "@/api/business";
import stageHistoryTab from "./components/stageHistoryTab";

export default {
  mixins: [listMixin],
  components: {
    baseInfoTab,
    stageHistoryTab
  },
  data() {
    return {
      loading: false,
      activeName: "first",
      baseInfo: null,
      routeQuery: null
    };
  },
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.getDetail();
  },
  mounted() {},
  methods: {
    getDetail() {
      DataApi.getDetail(this.routeQuery.businessId).then(res => {
        if (res.code == 200) {
          this.baseInfo = res.data;
          this.loading = true;
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
</style>
