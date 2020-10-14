<template>
  <div class="content">
    <div class="section search-section">
      <Card :show-header="false">
        <el-row class="" :gutter="20">
          <el-col :span="3" v-if="activity">
            <el-button type="primary" @click="activityFunc">活动统计</el-button>
          </el-col>
          <el-col :span="3" v-if="visit">
            <el-button type="primary" @click="visitFunc">拜访统计</el-button>
          </el-col>
          <el-col :span="3" v-if="business">
            <el-button type="primary" @click="businessFunc">商机统计</el-button>
          </el-col>
        </el-row>
      </Card>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
import commonFn from "@/js/common/methods";
export default {
  data() {
    return {
      Utils: Utils,
      activity: false, //活动统计
      visit: false, //拜访统计
      business: false, //商机统计
      mainMenu: [], //路由对象
      activityPath: "/more/operationIndex/activity", //活动统计页路由地址
      visitPath: "/more/operationIndex/visit", //拜访统计页路由地址
      businessPath: "/more/operationIndex/busines" //商机统计页路由地址
    };
  },
  components: {},
  computed: {
    ...mapGetters(["menuData"])
  },
  created() {
    // 取菜单
    this.mainMenu = commonFn.deepClone(this.menuData);
    this.activity = Utils.filterRouterFunc(this.mainMenu, "/more/operationIndex/activity"); //活动统计
    this.visit = Utils.filterRouterFunc(this.mainMenu, "/more/operationIndex/visit"); //拜访统计
    this.business = Utils.filterRouterFunc(this.mainMenu, "/more/operationIndex/busines"); //商机统计
    localStorage.removeItem("serachParm");
  },
  mounted() {

  },
  methods: {
    activityFunc() {
      this.$router.push({
        path: this.activityPath
      });
    },
    visitFunc() {
      this.$router.push({
        path: this.visitPath
      });
    },
    businessFunc() {
      this.$router.push({
        path: this.businessPath
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button--medium {
  font-size: 20px;
  margin-bottom: 40px;
}
</style>