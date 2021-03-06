<template>
  <div class="content visit">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="拜访类型" prop="type">
                <el-select v-model="serachParm.type" clearable placeholder="全部类型">
                  <el-option v-for="(item,index) in dictTable.VISIT_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item label="客户名称" prop="customerName">
                <el-input class="form-item" v-model.trim="serachParm.customerName" clearable placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="拜访日期" prop="visitStartTime">
                <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.visitStartTime" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="visitEndTime">
                <el-date-picker :picker-options="endPickerOptions" type="date" @change="visitEndTimeChange" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.visitEndTime" class="form-input"></el-date-picker>
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
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'拜访列表'">
        <template v-slot:btns>
          <el-button @click="toDeletedFun" size="small" :disabled="multiBool" v-if="Utils.btnAuthority('CRM_VISIT_BATCH_DEL')" type="primary" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" v-if="Utils.btnAuthority('CRM_VISIT_ADD')" size="small" type="primary" class="btn-button">新增</el-button>
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
import DataApi from "@/api/visitService";
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
      dictTable: null, //字典表
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
        { checked: true, key: "customerName", val: "客户名称" },
        {
          checked: true,
          key: "firstFlag",
          val: "是否初次拜访",
          isFormat: true,
          formatFn: (item, row) => {
            return row.firstFlag == 0 ? "否" : "是";
          }
        },
        { checked: true, key: "ownerUserName", val: "拥有人" },
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
          checkRight: true, //是否对操作按钮权限做效验，true开启
          btnItems: this.setBtnItems(),
          width: "150px"
        }
      ],
      serachParm: {
        type: null, //拜访类型
        customerName: null, //客户名称
        visitStartTime: null, //拜访开始时间
        visitEndTime: null //拜访结束时间
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.visitEndTime || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.visitStartTime || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      getListUrl: "/glp-crm/customer/visit/listPage", //拜访列表数据地址
      detailPath: "/visit/index/detail", //详情页路由地址
      addPath: "/visit/index/add", //新增页路由地址
      editPath: "/visit/index/edit" //修改页路由地址
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
  components: {},
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
          return Utils.btnAuthority("CRM_VISIT_QUERY") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_VISIT_EDIT") && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_VISIT_DEL") && Utils.permissionsButtonFunc(row, "CRM_DEL");
        }
      });
      return items;
    },
    visitEndTimeChange() {
      this.serachParm = {
        ...this.serachParm,
        visitEndTime: `${this.serachParm.visitEndTime}T23:59:59`
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
      this.dialogTxt = `确认删除拜访记录？`;
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
    setMultipleSelection(val) {
      this.multipleSelection = val && val.map(item => item.id);
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
        type: null, //拜访类型
        customerName: null, //客户名称
        visitStartTime: null, //拜访开始时间
        visitEndTime: null //拜访结束时间
      };
    },
    addFunc() {
      this.$router.push({ path: this.addPath, query: { flag: "add" } });
    },
    editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: { flag: "edit", visitId: item.id }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: { flag: "edit", visitId: item.id }
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
.visit {
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
  .form-item-date {
    .el-date-editor--date {
      width: 150px;
      .el-input__inner {
        width: 150px;
      }
    }
  }
}
</style>