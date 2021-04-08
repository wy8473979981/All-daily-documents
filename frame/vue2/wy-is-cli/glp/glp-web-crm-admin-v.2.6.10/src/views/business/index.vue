<template>
  <div class="content business">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item class="form-item-div" label="商机阶段" prop="step">
                <el-select v-model="serachParm.step" clearable placeholder="全部阶段">
                  <el-option v-for="(item,index) in dictTable.BUSINESS_OPPORTUNITY_STEP" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="商机名称" prop="name">
                <el-input class="form-item" clearable v-model="serachParm.name" placeholder="请输入商机名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="form-item-div" label="客户名称" prop="customerName">
                <el-input class="form-item" clearable v-model="serachParm.customerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="" :gutter="20">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'商机列表'">
        <template v-slot:btns>
          <el-button @click="toDeletedFun" size="small" :disabled="multiBool" v-if="Utils.btnAuthority('CRM_BUSINESS_BATCH_DEL')" type="primary" class="btn-button">批量删除</el-button>
          <el-button @click="addFunc" v-if="Utils.btnAuthority('CRM_BUSINESS_ADD')" size="small" type="primary" class="btn-button">新增</el-button>
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
import DataApi from "@/api/business";
import { Utils } from "@/utils";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      deleteVisible: false,
      batch: false, //批量
      batchTotal: 0, //批量条数
      multipleSelection: [],
      dictTable: null, //字典表
      theadData: [
        { checked: true, key: "name", val: "商机名称" },
        { checked: true, key: "customerName", val: "客户名称" },
        {
          checked: true,
          key: "step",
          val: "商机阶段",
          isFormat: true,
          formatFn: this.step
        },
        {
          checked: true,
          key: "durationDays",
          val: "阶段持续天数"
        },
        { checked: true, key: "ownerUserName", val: "拥有人" },
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
        //查询参数
        step: null, //商机阶段
        customerName: null, //客户名称
        name: null //商机名称
      },
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      getListUrl: "/glp-crm/business/opportunity/listPage", //列表数据地址
      detailPath: "/business/index/detail", //详情页路由地址
      addPath: "/business/index/add", //新增页路由地址
      editPath: "/business/index/edit" //修改页路由地址
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
      //设置有权限的按钮
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_BUSINESS_QUERY") && Utils.permissionsButtonFunc(row, "CRM_QUERY");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_BUSINESS_EDIT") && Utils.permissionsButtonFunc(row, "CRM_EDIT");
        }
      });
      items.push({
        name: "删除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return Utils.btnAuthority("CRM_BUSINESS_DEL") && Utils.permissionsButtonFunc(row, "CRM_DEL");
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
        step: null, //商机阶段
        customerName: null, //客户名称
        name: null //商机名称
      };
    },
    formatFn(item) {
      return item;
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
      this.dialogTxt = `确认删除选中商机？<p>${item.name}</p>`;
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
        DataApi.deleteList(params).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: message });
            this.getList();
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
    step(p, d) {
      let arr = this.dictTable.BUSINESS_OPPORTUNITY_STEP;
      let curr;
      if (d.step && arr && arr.length > 0) {
        arr.map(item => {
          if (item.key == d.step) {
            curr = item.label;
          }
        });
      }
      return curr;
    },
    addFunc() {
      this.$router.push({
        path: this.addPath
      });
    },
    editFunc(item) {
      this.$router.push({
        path: this.editPath,
        query: { flag: "edit", businessId: item.id }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: this.detailPath,
        query: { flag: "detail", businessId: item.id }
      });
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
.business {
  .body-center {
    .el-dialog__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      p,
      .liberum {
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>
