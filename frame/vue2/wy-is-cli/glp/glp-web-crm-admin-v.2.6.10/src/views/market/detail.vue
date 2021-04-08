<template>
  <div class="content">
    <div class="section" v-if="loading">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="活动信息" class="base-info-section" name="first">
          <baseInfoTab :baseInfo="baseInfo"></baseInfoTab>
        </el-tab-pane>

        <el-tab-pane label="活动渠道" name="second" :lazy="true">
          <channelTab :baseInfo="baseInfo"></channelTab>
        </el-tab-pane>

        <el-tab-pane label="相关客户" name="third" :lazy="true">
          <consumerTab :baseInfo="baseInfo"></consumerTab>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script type="text/javascript">
import baseInfoTab from "./components/baseInfoTab";
import channelTab from "./components/channelTab";
import consumerTab from "./components/consumerTab";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  components: {
    baseInfoTab,
    channelTab,
    consumerTab
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
    this.getMarketDetail();
    if (this.routeQuery.activeName) {
      this.activeName = this.routeQuery.activeName;
    }
  },
  mounted() { },
  methods: {
    getMarketDetail() {
      DataApi.getMarketDetail(this.routeQuery.activityId).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.baseInfo = {
            ...ndata,
            name: ndata.name,
            ownerUserNo: ndata.ownerUserNo,
            ownerUserName: ndata.ownerUserName,
            type: ndata.type,
            startDate: Utils.timestampToTime(ndata.startDate, 1),
            endDate: Utils.timestampToTime(ndata.endDate, 1),
            createTime: Utils.timestampToTime(ndata.createTime, 2),
            updateTime: Utils.timestampToTime(ndata.updateTime, 2),
            location: ndata.location,
            note: ndata.note,
            plan: ndata.plan
          };
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