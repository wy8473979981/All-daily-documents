<template>
  <div class="base-info-section">
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'商机阶段历史列表'">
      <!-- 表格插件 -->
      <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
      <!-- 分页插件 -->
      <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
    </Card>
  </div>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { Utils } from "@/utils";
import DataApi from "@/api/business";
export default {
  name: "stageHistoryTab",
  mixins: [listMixin],
  components: {},
  props: {
    baseInfo: {
      type: Object
    }
  },
  data: function () {
    return {
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      routeQuery: null,
      serachParm: {
        id: null
      },
      theadData: [
        {
          checked: true,
          key: "step",
          val: "商机阶段",
          isFormat: true,
          formatFn: this.step
        },
        {
          checked: true,
          key: "startDate",
          val: "开始时间",
          isFormat: true,
          formatFn: this.starttime
        },
        {
          checked: true,
          key: "endDate",
          val: "结束时间",
          isFormat: true,
          formatFn: this.endtime
        },
        { checked: true, key: "durationDays", val: "阶段持续天数" },
        {
          checked: true,
          key: "createTime",
          val: "信息创建",
          isFormat: true,
          formatFn: this.createtime
        },
        {
          checked: true,
          key: "updateTime",
          val: "最后修改",
          isFormat: true,
          formatFn: this.updatetime
        },
        // {
        //   checked: true,
        //   key: "isBtns",
        //   val: "操作",
        //   checkRight: true,
        //   btnItems: this.setBtnItems(),
        //   width: "150px"
        // }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],
      getListUrl: "/glp-crm/business/opportunity/step/listPage", //历史商机阶段
      Utils: Utils
    };
  },
  watch: {},
  computed: {},
  created() {
    this.serachParm = { id: this.baseInfo.id };
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.getList();
  },
  methods: {
    setBtnItems() {
      //设置有权限的按钮
      let items = [];
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_BUSINESS_STEP_DEL") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      return items;
    },
    deleteFunc(item) {
      console.log("del item", item);
      let params = item.id;
      DataApi.delete(params).then(res => {
        if (res.code == 200) {
          this.$message({ type: "success", message: "删除成功！" });
          this.getList();
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    starttime(p, d) {
      return Utils.timestampToTime(d.startDate, 2);
    },
    endtime(p, d) {
      return Utils.timestampToTime(d.endDate, 2);
    },
    createtime(p, d) {
      return Utils.timestampToTime(d.createTime, 2);
    },
    updatetime(p, d) {
      return Utils.timestampToTime(d.updateTime, 2);
    },
    step(p, d) {
      let arr = this.dictTable.BUSINESS_OPPORTUNITY_STEP;
      let curr;
      if (d.step && arr && arr.length > 0) {
        arr.map(item => {
          if (item.key == d.step) {
            curr = item.label;
          }
        });
      }
      return curr;
    },
    cancelFunc() {
      let activeName = this.routeQuery.activeName;
      if (activeName) {
        //客户详情跳转来的
        this.$router.push({
          path: "/consumer/index/detail",
          query: {
            flag: "detail",
            activeName: this.routeQuery.activeName,
            currConsumerId: this.routeQuery.currConsumerId,
            currConsumerType: this.routeQuery.currConsumerType,
            currConsumerName: this.routeQuery.currConsumerName
          }
        });
      } else {
        this.$router.push({
          path: "/business/index"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-info-section {
  label {
    font-weight: normal;
    color: #333;
  }
}
.row-item {
  font-size: 14px;
  margin-bottom: 20px;
  p {
    line-height: 24px;
    padding: 0 10px;
  }
  .el-col {
    display: flex;
    justify-content: left;
    .vm {
      vertical-align: middle;
      margin: 2px 5px 0 0;
    }
  }
  .align-center-item {
    align-items: center;
  }
  label {
    color: #3a3131;
    font-weight: normal;
    margin: 0 5px 15px 0;
    display: inline-block;
  }
  span {
    color: #888;
    word-break: break-all;
    line-height: 1.5em;
  }
}
.row-item:last-child {
  margin-bottom: 0px;
}
.green {
  color: #078e34;
}
.tc {
  text-align: center;
}
.base-info-section .row-item label {
  color: #3a3131;
  font-weight: normal;
  margin: 0 5px 15px 0;
  display: inline-block;
}
.base-info-section .row-item span {
  color: #888888;
}
</style>
