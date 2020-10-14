<template>
  <div class="creditInfoTab">
    <Card :title="'逾期信息'">
      <!-- 表格插件 -->
      <tableTemplate
        :thead-data="overdueThead"
        :table-data="overdueData"
        :selection="false"
        :checkbox="false"
      ></tableTemplate>
    </Card>
  </div>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { Utils } from "@/utils";
import DataApi from "@/api/consumerService";
export default {
  mixins: [listMixin],
  components: {},
  name: "visitTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      deleteVisible: false,
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      overdueThead: [
        { checked: true, key: "operationLineCode ", val: "业务类型" },
        { checked: true, key: "overdateInterestAmt", val: "本金" },
        { checked: true, key: "overdatePrincipalAmt", val: "利息" },
      ],
      overdueData: [],
      dictTable: null, //字典表
      routeQuery: null,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      DataApi.consumerOverdue(this.baseInfo.id).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.overdueData = ndata;
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        },
        err => {}
      );
    },

    cancelFunc() {
      this.$router.push({
        path: "/consumer/index"
      });
    },
    onRefresh() {
      this.pageInfo.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.visitTab {
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