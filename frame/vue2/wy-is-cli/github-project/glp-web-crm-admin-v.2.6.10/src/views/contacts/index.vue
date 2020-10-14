<template>
  <div class="content contacts-index">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="0">
            <el-col :span="8">
              <el-form-item :span="12" label="联系人类型" prop="contactType">
                <el-select v-model="serachParm.contactType" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in dictTable.CONTACT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :span="12" label="客户名称" prop="customerName">
                <el-input class="form-item" v-model="serachParm.customerName" clearable placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="" :gutter="0">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'联系人列表'">
        <template v-slot:btns>
          <el-button @click="toDeletedFun" :disabled="multiBool" v-if="Utils.btnAuthority('CRM_CONTACTS_BATCH_DEL')" size="small" type="primary" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" v-if="Utils.btnAuthority('CRM_CONTACTS_ADD')" size="small" type="primary" class="btn-button">新增</el-button>
        </template>
        <!-- 表格插件 -->
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" @listenMultiEvent="setMultipleSelection" :selection="true" :checkbox="true"></tableTemplate>
        <!-- 分页插件 -->
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>

    <!-- 删除 -->
    <commonDialogTemplate class="body-center" v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
      <template v-slot:content>
        <template v-if="batch">
          <p>共计{{ batchTotal }}条</p>
        </template>
      </template>
    </commonDialogTemplate>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/contactsService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      SelectionOptions,
      deleteVisible: false,
      batch: false, //批量
      batchTotal: 0, //批量条数
      multipleSelection: [],
      theadData: [
        { checked: true, key: "contactName", val: "姓名" },
        { checked: true, key: "customerName", val: "客户名称" },
        { checked: true, key: "activityName", val: "所属市场活动" },
        { checked: true, key: "activityChannelName", val: "市场获客渠道" },
        {
          checked: true,
          key: "contactType",
          val: "联系人类型",
          isFormat: true,
          formatFn: (item, row) => {
            let current = null;
            let CONTACT_TYPE = Utils.dictTable("CONTACT_TYPE");
            CONTACT_TYPE.map(function (item, index, array) {
              if (item.key == row.contactType) {
                current = item;
              }
            });
            return (current && current.label) || "-";
          }
        },
        { checked: true, key: "contactMobile", val: "手机" },
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
          key: "updateTime",
          val: "最后修改时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.updateTime, 2);
          }
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: true, //是否对操作按钮权限做效验，true开启
          btnItems: this.setBtnItems(),
          width: "150px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],

      serachParm: {
        contactType: null, //联系人类型
        customerName: null //客户名称
      },
      dictTable: null, //字典表
      getListUrl: "/glp-crm/contact/queryContact", //列表数据地址
      delListUrl: "/warehouse/del", //删除数据地址
      detailPath: "/contacts/index/detail", //详情页路由地址
      addPath: "/contacts/index/add", //新增页路由地址
      editPath: "/contacts/index/edit" //修改页路由地址
    };
  },
  watch: {
    eleDateNew: {
      handler: function (nowVal, oldVal) {
        var $this = this;
        for (let i in nowVal) {
          if (nowVal[i] != oldVal[i]) {
            $this.isUserBatchBtn = true;
            break;
          } else {
            $this.isUserBatchBtn = false;
          }
        }
        console.log($this.isUserBatchBtn, '$this.isUserBatchBtn')
      },
      deep: true
    }
  },
  computed: {
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.serachParm))
    },
    multiBool: {
      get() {
        let multiLengthBool = this.multipleSelection.length > 0;
        if (this.isUserBatchBtn) {
          return true
        } else {
          return multiLengthBool ? false : true;
        }
      },
      set() { }
    }
  },
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = Object.assign({}, serachParm);
      }
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.getList();

    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    toDeletedFun() {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.batchTotal = this.multipleSelection.length;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.batch = false;
      this.dialogTxt = `确认删除选中联系人？<p>${item.contactName}</p>`;
      this.rowItem = item;
    },
    getDelItem(data) {
      if (data.type == true) {
        this.deleteVisible = false;
        let params;
        let message = "批量删除成功！";
        if (this.batch) {
          this.batch = false;
          params = { ids: this.multipleSelection };
        } else {
          params = { ids: [this.rowItem.id] };
          message = "删除成功！";
        }
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
    setMultipleSelection(val) {
      this.multipleSelection = val && val.map(item => item.id);
    },
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CONTACTS_QUERY") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CONTACTS_EDIT") && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_CONTACTS_DEL") && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    addFunc() {
      this.$router.push({
        path: this.addPath
      });
    },
    editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: { flag: "edit", contactsId: item.id }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: { flag: "detail", contactsId: item.id }
      });
    },
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.toSearch();
    },
    clearData(formName) {
      //重置
      this.$refs[formName].resetFields();
      localStorage.removeItem("serachParm");
      this.serachParm = {
        contactType: null, //联系人类型
        customerName: null //客户名称
      };
    },
    onRefresh() {
      this.pageInfo.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.search-section {
  .form-section {
  }

  .form-item-div {
    margin-bottom: 20px;
  }

  .search-btn-item {
    margin-bottom: 0px;
  }
}
.contacts-index {
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