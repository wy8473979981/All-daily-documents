<template>
  <div class="contactPersonTab">
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'联系人列表'">
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
import DataApi from "@/api/contactsService";
export default {
  mixins: [listMixin],
  components: {},
  name: "contactPersonTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      addPath: "/consumer/index/add",
      deleteVisible: false,
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [
        { checked: true, key: "contactName", val: "姓名" },
        { checked: true, key: "contactMobile", val: "手机" },
        { checked: true, key: "contactEmail", val: "邮箱" },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true,
          btnItems: this.setBtnItems(),
          width: "150px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],

      dictTable: null, //字典表
      routeQuery: null,
      getListUrl: "/glp-crm/contact/queryContact", //联系人数据地址
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
    this.readOnly = Utils.btnAuthority('CRM_CONTACTS_ADD') && !this.baseInfo.readOnly;
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
          return Utils.btnAuthority('CRM_CONTACTS_QUERY') && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_CONTACTS_EDIT') && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_CONTACTS_DEL') && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.rowItem = item;
      this.dialogTxt = `确认删除联系人？<p>${item.contactName}</p>`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params = { ids: [this.rowItem.id] };
        let message = "删除成功！";

        DataApi.deleteContacts(params).then(res => {
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
      // 跳转到联系人新增
      this.$router.push({
        path: "/contacts/index/add",
        query: {
          flag: "add",
          activeName: "third",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType, //客户类型
          currActivityId: this.baseInfo.activityId, //所属市场活动
          currActivityName: this.baseInfo.activityName, //所属市场活动名称
          currActivityChannelId: this.baseInfo.activityChannelId, //市场活动渠道
          currActivityChannelName: this.baseInfo.activityChannelName //市场活动渠道名称
        }
      });
    },
    editFunc(row) {
      // 跳转到联系人修改
      this.$router.push({
        path: "/contacts/index/edit",
        query: {
          flag: "edit",
          contactsId: row.id,
          activeName: "third",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType, //客户类型
          currActivityId: this.baseInfo.activityId, //所属市场活动
          currActivityName: this.baseInfo.activityName, //所属市场活动名称
          currActivityChannelId: this.baseInfo.activityChannelId, //市场活动渠道
          currActivityChannelName: this.baseInfo.activityChannelName //市场活动渠道名称
        }
      });
    },
    detailFunc(row) {
      // 跳转到联系人修改
      this.$router.push({
        path: "/contacts/index/detail",
        query: {
          flag: "detail",
          contactsId: row.id,
          activeName: "third",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType, //客户类型
          currActivityId: this.baseInfo.activityId, //所属市场活动
          currActivityName: this.baseInfo.activityName, //所属市场活动名称
          currActivityChannelId: this.baseInfo.activityChannelId, //市场活动渠道
          currActivityChannelName: this.baseInfo.activityChannelName //市场活动渠道名称
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
.contactPersonTab {
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