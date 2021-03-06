<template>
  <div class="creditInfoTab">
    <Card :title="'用信审批'">
      <!-- 表格插件 -->
      <tableTemplate
        :thead-data="guaranteeThead"
        :table-data="guaranteeData"
        :selection="false"
        :checkbox="false"
      ></tableTemplate>
    </Card>
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
      guaranteeThead: [
        { checked: true, key: "projectName", val: "项目名称" },
        { checked: true, key: "channel", val: "渠道" },
        { checked: true, key: "guaranteeCustomerName", val: "为我担保方" },
      ],
      guaranteeData: [],
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
      DataApi.consumerGuarantee(this.baseInfo.id).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.guaranteeData = ndata;
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