<template>
  <div class="visitTab">
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'拜访列表'">
      <template v-slot:btns>
        <el-button @click="addFunc" v-if="readOnly" size="small" type="primary" class="btn-button">新增</el-button>
      </template>
      <!-- 表格插件 -->
      <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
      <!-- 分页插件 -->
      <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
    </Card>
    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { Utils } from "@/utils";
import DataApi from "@/api/visitService";
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
  data: function () {
    return {
      deleteVisible: false,
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [
        {
          checked: true,
          key: "type",
          val: "拜访类型",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let VISIT_TYPE = Utils.dictTable("VISIT_TYPE");
            VISIT_TYPE.map(function (item, index, array) {
              if (item.key == row.type) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        {
          checked: true,
          key: "firstFlag",
          val: "是否初次拜访",
          isFormat: true,
          formatFn: (item, row) => {
            return row.firstFlag == 0 ? "否" : "是";
          }
        },
        {
          checked: true,
          key: "visitTime",
          val: "拜访时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.visitTime, 2);
          }
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true,
          btnItems: this.setBtnItems(),
          width: "150px"
        }
      ],

      dictTable: null, //字典表
      routeQuery: null,
      getListUrl: "/glp-crm/customer/visit/listPage", //拜访列表数据地址
      addPath: "/visit/index/add", //新增页路由地址
      readOnly: false, //当前数据是否是只读，true只读
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
    this.readOnly = Utils.btnAuthority('CRM_VISIT_ADD') && !this.baseInfo.readOnly;
  },
  mounted() {
    this.getList();
  },
  methods: {
    setBtnItems() {
      //设置有权限的按钮
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_VISIT_QUERY') && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_VISIT_EDIT') && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_VISIT_DEL') && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除拜访客户？<p>${item.customerName}</p>`;
      this.rowItem = item;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params = { ids: [this.rowItem.id] };
        let message = "删除成功！";
        DataApi.deleteVisit(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.onRefresh();
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      } else {
        this.deleteVisible = false;
      }
    },
    addFunc() {
      // 跳转到拜访新增
      this.$router.push({
        path: this.addPath,
        query: {
          flag: "add",
          activeName: "seven",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    editFunc(row) {
      // 跳转到拜访修改
      this.$router.push({
        path: "/visit/index/edit",
        query: {
          flag: "edit",
          visitId: row.id,
          activeName: "seven",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    detailFunc(row) {
      // 跳转到拜访查看
      this.$router.push({
        path: "/visit/index/detail",
        query: {
          flag: "detail",
          visitId: row.id,
          activeName: "seven",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
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