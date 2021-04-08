<template>
  <div class="content shareProfitSet">
    <div class="section search-section">
      <Card :show-header="false">
        <el-form class="form-section" ref="searchForm" :model="serachParm" :inline="true" size="small" label-width="100px">
          <el-row class :gutter="20">
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="生效状态" prop="effectiveStatus">
                <el-select v-model="serachParm.effectiveStatus" clearable placeholder="全部状态">
                  <el-option v-for="(item,index) in dictTable.SHARE_PROFIT_STATUS" :key="index" :label="item.label" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item class="form-item-div form-item-date margin-r-0" label="截止日期" prop="startExpireDate">
                <el-date-picker :picker-options="startPickerOptions" type="date" placeholder="选择开始日期" :value-format="dateTypeString" v-model="serachParm.startExpireDate" class="form-input"></el-date-picker>
                <span>至</span>
              </el-form-item>
              <el-form-item class="form-item-div form-item-date" prop="endExpireDate">
                <el-date-picker :picker-options="endPickerOptions" type="date" placeholder="选择结束日期" :value-format="dateTypeString" v-model="serachParm.endExpireDate" @change="endDateChange" class="form-input"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" :lg="12" :xl="8">
              <el-form-item :span="12" label="客户名称" prop="customerName">
                <el-input class="form-item" v-model.trim="serachParm.customerName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class :gutter="0">
            <el-col :span="24" align="center">
              <el-button type="primary" @click="submitSearch" size="small" class="btn-twofont">查询</el-button>
              <el-button @click="clearData('searchForm')" class="btn-twofont" size="small">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </Card>
    </div>

    <div class="section table-section">
      <Card :el-icon-class="'el-icon-plus'" @setTheadItem="getTheadItem" :checkbox-data="theadData" :table-list-name="tableListName" :num="this.pageInfo.total" :title="'分润设置列表'">
        <template v-slot:btns>
          <el-button @click="addFunc" v-if="addBtn" size="small" type="primary" class="btn-button">新增</el-button>
        </template>
        <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
        <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      </Card>
    </div>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/legalControlService";
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
export default {
  mixins: [listMixin],
  data() {
    let self = this;
    return {
      Utils: Utils,
      SelectionOptions,
      dateTypeString: "yyyy-MM-dd", //时间格式
      dictTable: null, //字典表
      theadData: [
        { checked: true, key: "customerName", val: "客户名称" },
        {
          checked: true, key: "effectiveStatus", val: "生效状态",
          isFormat: true,
          formatFn: (item, row) => {
            try {
              let current = null;
              let SHARE_PROFIT_STATUS = this.dictTable.SHARE_PROFIT_STATUS;
              SHARE_PROFIT_STATUS.map(function (item, index, array) {
                if (item.key == row.effectiveStatus) {
                  current = item;
                }
              });
              return (current && current.label) || "-";
            } catch (e) {
              console.log(e);
            }
          }
        },
        { checked: true, key: "createUserName", val: "创建人" },
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
          key: "expireDate",
          val: "截止时间",
          isFormat: true,
          formatFn: (item, row) => {
            return Utils.timestampToTime(row.expireDate, 1);
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
        customerName: null, //客户名称 
        effectiveStatus: null, //生效状态 
        startExpireDate: null, //截止日期
        endExpireDate: null, //截止日期
      },
      dateTypeString: "yyyy-MM-dd", //时间格式
      startPickerOptions: {
        disabledDate(time) {
          let endDate = self.serachParm.endExpireDate || "";
          if (endDate) {
            let sdTime = new Date(endDate).getTime();
            return time.getTime() > sdTime;
          }
        }
      },
      endPickerOptions: {
        disabledDate(time) {
          let startDate = self.serachParm.startExpireDate || "";
          if (startDate) {
            let sdTime = new Date(startDate).getTime();
            return time.getTime() + 24 * 3600 * 1000 < sdTime;
          }
        }
      },
      role: null,
      userInfo: null,
      getListUrl: "/glp-crm/share/profit/listPage", //列表数据地址
      detailPath: "/more/shareProfitSet/detail", //详情页路由地址
      addPath: "/more/shareProfitSet/add", //新增页路由地址
      editPath: "/more/shareProfitSet/edit" //修改页路由地址
    };
  },
  components: {},
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
    ...mapGetters(["roles"]),
    eleDateNew() {
      return JSON.parse(JSON.stringify(this.serachParm))
    },
    addBtn: {//新增
      get() {
        let roleCode = this.role.code;
        let isAddBol = Utils.btnAuthority('SHARE_PROFIT_SET_ADD');
        if (roleCode == "CRM_BD" && isAddBol) {
          return true;
        } else {
          return false
        }
      },
      set() { }
    },
  },
  created() {
    try {
      let serachParm = JSON.parse(localStorage.getItem("serachParm"));
      if (serachParm) {
        this.serachParm = Object.assign({}, serachParm);
      }
      this.role = this.roles[0];//获取角色
      this.userInfo = JSON.parse(localStorage.getItem("global_user_info"));
      this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
      this.getList();

    } catch (e) {
      console.log(e)
    }
  },
  mounted() {

  },
  methods: {
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc,
        checkFunc: row => {
          let roleCode = this.role.code;
          return Utils.btnAuthority("SHARE_PROFIT_SET_QUERY") && (roleCode == "CRM_BD" || roleCode == "CRM_ADMIN" || roleCode == "CRM_LEADER" || roleCode == "CRM_BD_LEADER");
        }
      });
      items.push({
        name: "修改",
        type: "text",
        func: this.editFunc,
        checkFunc: row => {
          // approvalStatus：40驳回，effectiveStatus：2 未生效
          let btnAuthority = Utils.btnAuthority("SHARE_PROFIT_SET_DEIT");
          let roleBD = this.role.code == "CRM_BD" ? true : false;
          let isCreateUser = row.createUserNo == this.userInfo.userNo ? true : false;
          let rejected = row.approvalStatus == 40 ? true : false;
          let notEffect = row.effectiveStatus == 2 ? true : false;

          return btnAuthority && roleBD && isCreateUser && rejected && notEffect;
        }
      });
      return items;
    },
    endDateChange() {
      this.serachParm = {
        ...this.serachParm,
        endExpireDate: `${this.serachParm.endExpireDate}T23:59:59`
      };
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
        customerName: null, //客户名称 
        effectiveStatus: null, //生效状态 
        startExpireDate: null, //截止日期
        endExpireDate: null, //截止日期
      };
    },
    addFunc() {
      this.$router.push({
        path: "/more/shareProfitSet/add"
      });
    },
    editFunc(item) {
      this.$router.push({
        path: "/more/shareProfitSet/edit",
        query: { flag: "edit", shareProfitSetId: item.id }
      });
    },
    detailFunc(item) {
      this.$router.push({
        path: "/more/shareProfitSet/detail",
        query: { flag: "detail", shareProfitSetId: item.id }
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
  #app .main-container-no-siderbar {
    padding-top: 0px;
  }
  .header-container {
    display: none;
  }

  .form-item-div {
    margin-bottom: 20px;
  }

  .search-btn-item {
    margin-bottom: 0px;
  }
}
.shareProfitSet {
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