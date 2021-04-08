<template>
  <div class="filesTab">
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'附件列表'">
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
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
import { SelectionOptions } from "@/js/common/consts";
export default {
  mixins: [listMixin],
  components: {},
  name: "accessoryTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      readOnly: false, //当前数据是否是只读，true只读
      SelectionOptions,
      deleteVisible: false,
      addPath: "/consumer/index/add",
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
          val: "附件类型",
          isFormat: true,
          formatFn: (item, row) => {
            let MATERIAL_TYPE = SelectionOptions.ALL_MATERIAL_TYPE;
            let current = { label: "-" };
            MATERIAL_TYPE.map(function (item, index, array) {
              if (item.key == row.type) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true, //是否对操作按钮权限做效验，true开启
          btnItems: this.setBtnItems(),
          width: "300px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],
      dictTable: null, //字典表
      routeQuery: null,
      getListUrl: "/glp-crm/material/queryList",
      accessoryAddPath: "/consumer/index/accessoryAdd",
      accessoryEditPath: "/consumer/index/accessoryEdit",
      accessoryDetailPath: "/consumer/index/accessoryDetail",
      ListPath: "/consumer/index", //列表路由地址
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
    this.readOnly = Utils.btnAuthority("CRM_CUSTOMER_FILE_ADD") && !this.baseInfo.readOnly;
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
          return Utils.btnAuthority("CRM_CUSTOMER_FILE_QUERY") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_FILE_EDIT") && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CUSTOMER_FILE_DEL") && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },

    deleteFunc(item) {
      this.deleteVisible = true;
      this.dialogTxt = `确认删除附件？`;
      this.rowItem = item;
    },
    getDelItem(data) {
      //删除事件
      this.deleteVisible = false;
      let message = "删除成功！";
      if (data.type == true) {
        DataApi.consumerFilesUploadDetele(this.rowItem.id).then(res => {
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
      }
    },
    addFunc() {
      this.$router.push({
        path: this.accessoryAddPath,
        query: {
          flag: "add",
          currConsumerType: this.routeQuery.currConsumerType,
          currConsumerId: this.baseInfo.id,
          currCustomerName: this.baseInfo.name,
          currCertificateType: this.baseInfo.certificateType,
          currLegalCertificateType: this.baseInfo.legalCertificateType,//法定代表  证件类型
          currActualCertificateType: this.baseInfo.actualCertificateType,//实控人 证件类型
          activeName: "second"
        }
      });
    },
    editFunc(row) {
      this.$router.push({
        path: this.accessoryEditPath,
        query: {
          flag: "edit",
          filesId: row.id, //附件id
          currConsumerType: this.routeQuery.currConsumerType,
          currConsumerId: this.baseInfo.id,
          currCustomerName: this.baseInfo.name,
          currCertificateType: this.baseInfo.certificateType,
          currLegalCertificateType: this.baseInfo.legalCertificateType,//法定代表  证件类型
          currActualCertificateType: this.baseInfo.actualCertificateType,//实控人 证件类型
          activeName: "second"
        }
      });
    },
    detailFunc(row) {
      this.$router.push({
        path: this.accessoryDetailPath,
        query: {
          flag: "detail",
          filesId: row.id, //附件id
          currConsumerType: this.routeQuery.currConsumerType,
          currConsumerId: this.baseInfo.id,
          currCustomerName: this.baseInfo.name,
          currCertificateType: this.baseInfo.certificateType,
          currLegalCertificateType: this.baseInfo.legalCertificateType,//法定代表  证件类型
          currActualCertificateType: this.baseInfo.actualCertificateType,//实控人 证件类型
          activeName: "second"
        }
      });
    },
    cancelFunc() {
      this.$router.push({
        path: this.ListPath
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
.filesTab {
  .body-center {
    .el-dialog__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>