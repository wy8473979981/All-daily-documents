<template>
  <div class="loanInformationTab">
    <Btns :btnsProps="btnsProps" />
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="授信信息" name="first">
        <creditInfoTab :baseInfo="baseInfo"></creditInfoTab>
      </el-tab-pane>
      <el-tab-pane label="用信信息" name="second" :lazy="true">
        <creditUseTab :baseInfo="baseInfo"></creditUseTab>
      </el-tab-pane>

      <el-tab-pane label="逾期信息" name="third" :lazy="true">
        <overdueTab :baseInfo="baseInfo"></overdueTab>
      </el-tab-pane>
      <el-tab-pane label="担保人信息" name="four" :lazy="true">
        <guaranteeTab :baseInfo="baseInfo"></guaranteeTab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import creditInfoTab from "./loanInformation/creditInfoTab";
import creditUseTab from "./loanInformation/creditUseTab";
import guaranteeTab from "./loanInformation/guaranteeTab";
import overdueTab from "./loanInformation/overdueTab";

import listMixin from "@/js/mixins/listMixin";
import { Utils } from "@/utils";
import DataApi from "@/api/visitService";
export default {
  mixins: [listMixin],
  components: {
    creditInfoTab,
    creditUseTab,
    guaranteeTab,
    overdueTab
  },
  name: "loanInformationTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      activeName: "first",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      dictTable: null, //字典表
      routeQuery: null,
      serachParm: {
        customerId: null //客户ID
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.serachParm = { customerId: this.routeQuery.currConsumerId };
  },
  mounted() {},
  methods: {
    cancelFunc() {
      this.$router.push({
        path: "/consumer/index"
      });
    }
  }
};
</script>

<style lang="scss">
.loanInformationTab {
  .body-center {
    .el-dialog__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      p {
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>