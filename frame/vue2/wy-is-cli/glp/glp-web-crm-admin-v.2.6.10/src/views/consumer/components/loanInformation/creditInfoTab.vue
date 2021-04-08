<template>
  <div class="creditInfoTab">
    <Card :title="'授信汇总'">
      <!-- 表格插件 -->
      <tableTemplate
        :thead-data="summaryThead"
        :table-data="summaryData"
        :selection="false"
        :checkbox="false"
      ></tableTemplate>
    </Card>
    <Card :title="'授信明细'">
      <!-- 表格插件 -->
      <tableTemplate
        :thead-data="detailThead"
        :table-data="detailData"
        :selection="false"
        :checkbox="false"
      ></tableTemplate>
    </Card>
    <Card :title="'授信审批明细'">
      <!-- 表格插件 -->
      <tableTemplate
        :thead-data="auditThead"
        :table-data="auditData"
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
      summaryThead: [
        { checked: true, key: "sumAmountValid", val: "累计授信金额-有效" },
        { checked: true, key: "sumAmountInvalid", val: "累计授信金额-失效" },
        { checked: true, key: "sumAmountEnd", val: "累计授信金额-终结" },
        { checked: true, key: "sumAmount", val: "累计申请授信金额" }
      ],
      detailThead: [
        { checked: true, key: "projectName", val: "项目名称" },
        { checked: true, key: "lendingChannel", val: "渠道" },
        { checked: true, key: "creditCode", val: "额度编码" },
        { checked: true, key: "amountValid", val: "授信金额-有效" },
        { checked: true, key: "amountInvalid", val: "授信金额-失效" },
        { checked: true, key: "amountEnd", val: "授信金额-终结" }
      ],

      auditThead: [
        { checked: true, key: "projectName", val: "项目名称" },
        { checked: true, key: "lendingChannel", val: "渠道" },
        { checked: true, key: "applyAmount", val: "申请授信金额" },
        { checked: true, key: "approver", val: "当前审批人" }
      ],
      summaryData: [],
      auditData: [],
      detailData: [],
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
      DataApi.consumerCredit(this.baseInfo.id).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.summaryData = ndata.summary;
            this.auditData = ndata.audit;
            this.detailData = ndata.detail;
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