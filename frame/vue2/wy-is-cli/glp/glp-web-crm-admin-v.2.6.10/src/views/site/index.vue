<template>
  <div class="content site">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="0">
            <el-col :span="8">
              <el-form-item :span="12" label="地址类型" prop="addressType">
                <el-select v-model="serachParm.addressType" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in SelectionOptions.ADDRESS_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :span="12" label="客户名称" prop="customerName">
                <el-input class="form-item" v-model.trim="serachParm.customerName" placeholder="请输入客户名称"></el-input>
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
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'地址信息列表'">
        <template v-slot:btns>
          <el-button @click="toDeletedFun" v-if="Utils.btnAuthority('CRM_SITE_BATCH_DEL')" size="small" :disabled="multiBool" type="primary" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" v-if="Utils.btnAuthority('CRM_SITE_ADD')" size="small" type="primary" class="btn-button">新增</el-button>
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
import DataApi from "@/api/siteService";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  components: {},
  data() {
    let self = this;
    return {
      Utils: Utils,
      deleteVisible: false,
      batch: false, //批量
      batchTotal: 0, //批量条数
      SelectionOptions,
      multipleSelection: [],
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
        { checked: true, key: "customerName", val: "客户名称" },
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
        addressType: null, //地址类型
        customerName: null //客户名称
      },
      dictTable: null, //字典表
      getListUrl: "/glp-crm/customer/address/query", //地址信息列表数据地址
      detailPath: "/more/siteIndex/detail", //详情页路由地址
      addPath: "/more/siteIndex/add", //新增页路由地址
      editPath: "/more/siteIndex/edit" //修改页路由地址
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
    setBtnItems() {
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
    submitSearch() {
      localStorage.setItem("serachParm", JSON.stringify(this.serachParm));
      this.toSearch();
    },
    clearData(formName) {
      //重置
      this.$refs[formName].resetFields();
      localStorage.removeItem("serachParm");
      this.serachParm = {
        addressType: null, //地址类型
        customerName: null //客户名称
      };
    },
    toDeletedFun() {
      this.deleteVisible = true;
      this.batch = true;
      this.dialogTxt = "确认批量删除选中数据？";
      this.batchTotal = this.multipleSelection.length;
    },
    deleteFunc(item) {
      this.deleteVisible = true;
      this.batch = false;
      this.dialogTxt = `确认删除选中地址信息？`;
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
    setMultipleSelection(val) {
      this.multipleSelection = val && val.map(item => item.id);
    },
    addFunc() {
      this.$router.push({
        path: "/more/siteIndex/add"
      });
    },
    editFunc(item) {
      this.$router.push({
        path: "/more/siteIndex/edit",
        query: {
          flag: "edit",
          siteId: item.id
        }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: "/more/siteIndex/detail",
        query: {
          flag: "detail",
          siteId: item.id
        }
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
.site {
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