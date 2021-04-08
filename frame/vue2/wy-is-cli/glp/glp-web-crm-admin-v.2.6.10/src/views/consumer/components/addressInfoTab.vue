<template>
  <div class="addressInfoTab">
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'地址列表'">
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
import DataApi from "@/api/siteService";
import { Utils } from "@/utils";
import { SelectionOptions } from "@/js/common/consts";
export default {
  mixins: [listMixin],
  components: {},
  name: "addressInfoTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      SelectionOptions,
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
          key: "addressType",
          val: "地址类型",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let CUSTOMER_ADDRESS_TYPE = SelectionOptions.ADDRESS_TYPE;
            CUSTOMER_ADDRESS_TYPE.map(function (item, index, array) {
              if (item.key == row.addressType) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        {
          checked: true,
          key: "addressProvince",
          val: "省份",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let provinces = Utils.provinces;
            let provincesAry = [];
            Object.entries(provinces).forEach((k, v) => {
              let obj = {};
              obj["key"] = k[0];
              obj["label"] = k[1];
              provincesAry.push(obj);
            });
            provincesAry.map(function (item, index, array) {
              if (item.key == row.addressProvince) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        {
          checked: true,
          key: "addressCity",
          val: "城市",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let addressCityAry = [];
            let addressCity = Utils.getCities(row.addressProvince);
            Object.entries(addressCity).forEach((k, v) => {
              let obj = {};
              obj["key"] = k[0];
              obj["label"] = k[1];
              addressCityAry.push(obj);
            });
            addressCityAry.map(function (item, index, array) {
              if (item.key == row.addressCity) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        {
          checked: true,
          key: "createTime",
          val: "创建时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.createTime, 2);
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
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],

      deleteVisible: false,
      dictTable: null, //字典表
      routeQuery: null,
      serachParm: {
        customerId: null //客户ID
      },
      readOnly: false, //当前数据是否是只读，true只读
      getListUrl: "/glp-crm/customer/address/query" //地址信息列表数据地址
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.serachParm = { customerId: this.routeQuery.currConsumerId };
    this.readOnly = Utils.btnAuthority('CRM_SITE_ADD') && !this.baseInfo.readOnly;
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
          return Utils.btnAuthority("CRM_SITE_QUERY") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_SITE_EDIT") && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_SITE_DEL") && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.rowItem = item;
      this.dialogTxt = `确认选中删除地址信息？`;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let message = "删除成功！";
        let params = { ids: [this.rowItem.id] };
        DataApi.deleteSite(params).then(res => {
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
      // 跳转到地址信息新增
      this.$router.push({
        path: "/more/siteIndex/add",
        query: {
          flag: "add",
          activeName: "four",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    editFunc(row) {
      // 跳转到地址信息修改
      this.$router.push({
        path: "/more/siteIndex/edit",
        query: {
          flag: "edit",
          siteId: row.id,
          activeName: "four",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    detailFunc(row) {
      // 跳转到地址信息查看
      this.$router.push({
        path: "/more/siteIndex/detail",
        query: {
          flag: "detail",
          siteId: row.id,
          activeName: "four",
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
.addressInfoTab {
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