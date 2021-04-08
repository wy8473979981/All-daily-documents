<template>
  <div>
    <Btns :btnsProps="btnsProps" />
    <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'商机列表'">
      <template v-slot:btns>
        <el-button @click="addFunc" v-if="readOnly" size="small" type="primary" class="btn-button">新增</el-button>
      </template>
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
export default {
  mixins: [listMixin],
  components: {},
  name: "businessTab",
  props: {
    baseInfo: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      addPath: "/consumer/index/add",
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      theadData: [
        { checked: true, key: "name", val: "商机名称" },
        {
          checked: true,
          key: "step",
          val: "商机阶段",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let BUSINESS_OPPORTUNITY_STEP = Utils.dictTable(
              "BUSINESS_OPPORTUNITY_STEP"
            );
            BUSINESS_OPPORTUNITY_STEP.map(function (item, index, array) {
              if (item.key == row.step) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        { checked: true, key: "durationDays", val: "阶段持续天数" },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true,
          btnItems: this.setBtnItems(),
          width: "150px"
        }
      ],

      serachParm: {
        customerId: null //客户ID
      },
      routeQuery: null,
      dictTable: null,
      readOnly: false, //当前数据是否是只读，true只读
      getListUrl: "/glp-crm/business/opportunity/listPage" //列表数据地址
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.serachParm = { customerId: this.routeQuery.currConsumerId };
    this.readOnly = Utils.btnAuthority('CRM_BUSINESS_ADD') && !this.baseInfo.readOnly;
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
          return Utils.btnAuthority('CRM_BUSINESS_QUERY') && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_BUSINESS_EDIT') && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority('CRM_BUSINESS_DEL') && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.rowItem = item;
      this.dialogTxt = `确认删除地址信息？<p>${item.customerName}</p>`;
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
      // 跳转到商机新增
      this.$router.push({
        path: "/business/index/add",
        query: {
          flag: "add",
          activeName: "six",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    editFunc(row) {
      // 跳转到商机修改
      this.$router.push({
        path: "/business/index/edit",
        query: {
          flag: "edit",
          businessId: row.id,
          activeName: "six",
          currConsumerId: this.baseInfo.id, //客户ID
          currConsumerName: this.baseInfo.name, //客户名称
          currConsumerType: this.baseInfo.customerType //客户类型
        }
      });
    },
    detailFunc(row) {
      // 跳转到商机查看
      this.$router.push({
        path: "/business/index/detail",
        query: {
          flag: "detail",
          businessId: row.id,
          activeName: "six",
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

<style lang="scss" scoped>
</style>