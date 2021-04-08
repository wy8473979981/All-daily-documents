<template>
  <div class="content market">
    <div class="section">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'列表'" :num="this.pageInfo.total">
        <template v-slot:btns>
          <el-button @click="channelAddFunc" v-if="readOnly" size="small" type="primary" class="btn-button">新增</el-button>
        </template>
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>
    <!-- 删除插件 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import DataApi from "@/api/marketService";
import { Utils } from "@/utils";
export default {
  name: "channelTab",
  mixins: [listMixin],
  components: {},
  props: {
    baseInfo: {
      type: Object
    }
  },
  data() {
    return {
      Utils: Utils,
      detailInfo: null,
      deleteVisible: false,
      theadData: [
        { checked: true, key: "name", val: "渠道名称" },
        {
          checked: true,
          key: "qrcodeUrl",
          val: "渠道二维码",
          isFormat: true,
          formatFn: this.qrcodeUrlToImg
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true,
          btnItems: this.setBtnItems(),
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
      serachParm: {
        activityId: null
      },
      getListUrl: "/glp-crm/marketActivity/channel/listPage", //市场活动-渠道-分页列表-接口地址
      readOnly: false, //当前数据是否是只读，true只读
      ListPath: "/market/index", //市场活动列表路由地址
      channelDetailPath: "/market/index/channelDetail", //渠道详情路由地址
      channelAddPath: "/market/index/channelRedactAdd", //渠道新增路由地址
      channelEditPath: "/market/index/channelRedactEdit" //渠道修改路由地址
    };
  },
  computed: {},
  created() {
    this.serachParm = { activityId: this.baseInfo.id }; //当前活动ID
    this.readOnly = Utils.btnAuthority("CRM_MARKET_CHANNEL_ADD") && !this.baseInfo.readOnly;
    this.getList();
  },
  mounted() { },
  methods: {
    qrcodeUrlToImg(item, row) {
      return `<a href="${row.qrcodeUrl}"><img width="100" src="${row.qrcodeUrl}"/></a>`;
    },
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看", type: "text", func: this.channelDetailFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_CHANNEL_QUERY") && Utils.permissionsButtonFunc(row, "CRM_MARKET_QUERY"));
        }
      });
      items.push({
        name: "修改", type: "text", func: this.channelEditFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_CHANNEL_EDIT") && Utils.permissionsButtonFunc(row, "CRM_MARKET_EDIT"));
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return (Utils.btnAuthority("CRM_MARKET_CHANNEL_DEL") && Utils.permissionsButtonFunc(row, "CRM_MARKET_DEL"));
        }
      });
      return items;
    },

    deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = `确认删除选中活动渠道？<p>${item.name}</p>`;
      this.rowItem = item;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params = this.rowItem.id;
        DataApi.deleteChannel(params).then(res => {
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
    channelAddFunc() {
      this.$router.push({
        path: this.channelAddPath,
        query: {
          flag: "add",
          activityId: this.baseInfo.id, //当前活动ID
          activityName: this.baseInfo.name
        }
      });
      // this.$router.push({
      //   name: "channelRedactAdd",
      //   params: {
      //     flag: "add",
      //     activityId: this.baseInfo.id, //当前活动ID
      //     activityName: this.baseInfo.name
      //   }
      // });
    },
    channelEditFunc(row) {
      this.$router.push({
        path: this.channelEditPath,
        query: {
          flag: "edit",
          channelId: row.id,
          activityId: this.baseInfo.id,
          activityName: this.baseInfo.name
        }
      });
      // this.$router.push({
      //   name: "channelRedactEdit",
      //   params: {
      //     flag: "edit",
      //     channelId: row.id,
      //     activityId: this.baseInfo.id,
      //     activityName: this.baseInfo.name
      //   }
      // });
    },
    channelDetailFunc(row) {
      this.$router.push({
        path: this.channelDetailPath,
        query: {
          flag: "detail",
          channelId: row.id,
          activityId: this.baseInfo.id,
          activityName: this.baseInfo.name
        }
      });
      // this.$router.push({
      //   name: "channelDetail",
      //   params: {
      //     flag: "detail",
      //     channelId: row.id,
      //     activityId: this.baseInfo.id,
      //     activityName: this.baseInfo.name
      //   }
      // });
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
.market {
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