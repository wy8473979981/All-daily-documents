<template>
  <div class="content consumerTab">
    <div class="section">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'列表'" :num="this.pageInfo.total">
        <template v-slot:btns>
          <el-button @click="relevanceFunc" v-if="readOnly" size="small" type="primary" class="btn-button">添加</el-button>
        </template>
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>
    <!-- 删除插件 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
    <!-- 查询客户 -->
    <clientComponent :show.sync="clientVisible" v-if="clientVisible" @listenEvent="setClientValue"></clientComponent>
    <!-- 查询活动渠道 -->
    <channelModal :show.sync="channelVisible" v-if="channelVisible" :btnType="true" :marketActiveData="marketActiveData" @listenEvent="setChannelTableRow"></channelModal>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import clientComponent from "@/components/UX/clientComponent";
import DataApi from "@/api/marketService";
import channelModal from "@/components/UX/channelComponent";
import { Utils } from "@/utils";
export default {
  name: "consumerTab",
  mixins: [listMixin],
  components: { clientComponent, channelModal },
  props: {
    baseInfo: {
      type: Object
    }
  },
  data() {
    return {
      Utils: Utils,
      deleteVisible: false,
      clientVisible: false,
      channelVisible: false,
      clientValue: {},
      pageInfo: {
        total: 0,
        size: 10,
        page: 1
      },
      serachParm: {
        activityId: null
      },
      marketActiveData: null,
      tableData: [],
      theadData: [
        { checked: true, key: "customerName", val: "客户名称" },
        {
          checked: true,
          key: "customerType",
          val: "客户类型",
          isFormat: true,
          formatFn: (item, row) => {
            return row.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";
          }
        },
        { checked: true, key: "activityName", val: "所属市场活动" },
        { checked: true, key: "channelName", val: "市场活动渠道" },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true,
          btnItems: this.setClientBtnItems(),
          width: "200px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      readOnly: false, //当前数据是否是只读，true只读
      activeChannelData: null, //已选的市场活动渠道
      ListPath: "/market/index", //列表路由地址
      editPath: "/market/index/edit", //列表路由地址
      consumerDetailPath: "/consumer/index/detail", //客户详情页路由地址
      getListUrl: "/glp-crm/activity/queryCustomerRelated" //市场活动-相关客户-分页列表
    };
  },
  computed: {},
  created() {
    this.serachParm = { activityId: this.baseInfo.id };
    this.readOnly = Utils.btnAuthority("CRM_MARKET_CUSTOMER_ADD") && !this.baseInfo.readOnly;
    this.getList();
  },
  mounted() { },
  methods: {
    setClientBtnItems() {
      let items = [];
      items.push({
        name: "查看", type: "text", func: this.channelDetailFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_CUSTOMER_QUERY") && Utils.permissionsButtonFunc(row, "CRM_MARKET_QUERY"));
        }
      });
      items.push({
        name: "移除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_CUSTOMER_DEL") && Utils.permissionsButtonFunc(row, "CRM_MARKET_DEL"));
        }
      });
      return items;
    },
    channelDetailFunc(row) {
      this.$router.push({
        path: "/consumer/index/detail",
        query: {
          from: "consumerTab",
          activityActiveName: "third",
          activityId: this.baseInfo.id, //活动ID
          currConsumerId: row.customerId,
          currConsumerType: row.customerType,
          currConsumerName: row.customerName
        }
      });
    },
    setChannelTableRow(data) {
      this.activeChannelData = data; //已选的市场活动渠道
      this.clientVisible = true;
    },
    setClientValue(data) {
      let req = {
        activityId: this.baseInfo.id, //活动ID
        customerId: data.customerId, //客户ID
        activityChannelId: this.activeChannelData.id // 市场活动渠道ID
      };
      DataApi.createCustomer(req).then(res => {
        if (res.code == 200) {
          this.$message({ type: "success", message: "关联成功！" });
          this.onRefresh();
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    relevanceFunc() {
      this.marketActiveData = { id: this.baseInfo.id };
      this.channelVisible = true;
    },
    deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = `确定移除选中相关客户？<p>${item.customerName}</p>`;
      this.rowItem = item;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params = {
          customerId: this.rowItem.customerId,
          activityId: this.baseInfo.id, //活动id
          activityChannelId: this.rowItem.activityChannelId
        };
        DataApi.deleteRelatedCustomer(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: "删除成功！" });
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
    cancelFunc() {
      //返回
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

<style lang="scss" >
.consumerTab {
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