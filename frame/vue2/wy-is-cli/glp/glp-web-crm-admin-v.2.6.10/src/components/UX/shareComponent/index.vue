<template>
  <div class="transferComponent">
    <el-dialog title="共享用户列表" :visible.sync="visible" @close="$emit('update:show', false)" width="700px" v-if="show">
      <el-row class>
        <el-col :span="24" class="col-create">
          <el-button type="primary" @click="createShare">添加</el-button>
        </el-col>
      </el-row>
      <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" :selection="false" :checkbox="false"></tableTemplate>
      <!-- 分页插件 -->
      <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查询用户" :visible.sync="userVisible" width="700px" v-if="userVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <!-- <transferComponent @listenEvent="setTransferValue" :data="transferData"></transferComponent> -->
            <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入姓名" v-model="value" :data="transferData" class="transferComponent" @change="handleChange"></el-transfer>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="权限设置" prop="type">
              <el-select v-model="ruleForm.type" clearable class="form-input" placeholder="请选择权限">
                <el-option v-for="(item,index) in SelectionOptions.PermissionSetting" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12" :offset="6">
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
              <el-button @click="userVisibleClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除插件 -->
    <commonDialogTemplate v-on:eventDelItem="getDelItem" :appendToBody="false" :show-width="showWidth" :dialog-visible="deleteVisible" :dialog-title="dialogTitle" :dialog-txt="dialogTxt"></commonDialogTemplate>
  </div>
</template>

<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import listMixin from "@/js/mixins/listMixin";
import DataApi from "@/api/marketService";
import commonDataApi from "@/api/common";
export default {
  mixins: [listMixin],
  components: {},
  name: "shareComponent",
  data: function () {
    return {
      visible: this.show,
      userVisible: false,
      deleteVisible: false,
      SelectionOptions,
      searchForm: {
        userName: ""
      },
      ruleForm: {
        type: ""
      },
      rules: {
        type: [
          { required: true, message: "请选择权限", trigger: ["blur", "change"] }
        ]
      },
      rowItem: null,
      theadData: [
        { checked: true, key: "shareToUserName", val: "用户姓名" },
        {
          checked: true,
          key: "accessType",
          val: "访问权限",
          isFormat: true,
          formatFn: this.accessType
        },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: false,
          btnItems: this.setBtnItems(),
          width: "200px"
        }
        //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
      ],
      getPersonurl: "/fbs-app/user/getPersonList", //fbs查用户列表
      transferAry: [],
      value: [],
      transferData: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    shareId: {
      type: Number
    },
    dataType: {
      type: String,
      default: ""
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  computed: {
    isShow: {
      get() {
        return this.visible;
      },
      set() { }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    deleteFunc(item) {
      //获取删除对象
      this.deleteVisible = true;
      this.dialogTxt = `确定要删除用户 “${item.shareToUserName}” 吗？`;
      this.rowItem = item;
    },
    accessType(item, row) {
      return row.accessType == "ALL" ? "查看和修改" : "查看";
    },
    createShare() {
      this.userVisible = true;
      this.getPersonList();
    },
    getList() {
      let params = {
        shareId: this.shareId,
        dataType: this.dataType,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      };
      DataApi.shareMarket(params).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.tableData = ndata.items || [];
          this.pageInfo.total = ndata.totalNum || 0;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },

    setBtnItems() {
      //设置有权限的按钮
      let items = [];
      items.push({
        name: "移除",
        type: "text",
        className: "delete-btn",
        func: this.deleteFunc,
        checkFunc: row => {
          return true;
        }
      });
      return items;
    },
    getDelItem(data) {
      this.deleteVisible = false;
      if (data.type == true) {
        let req = {
          id: this.rowItem.id,
          shareId: this.shareId,
          dataType: this.dataType
        };
        DataApi.shareDeleteMarket(req).then(res => {
          if (res.code == 200) {
            this.$message({ type: "success", message: "删除成功！" });
            this.getList();
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
        });
      }
    },
    userVisibleClose() {
      this.userVisible = false;
      this.searchForm = { userName: null };
      this.ruleForm = { type: null };
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let share = [];
          if (this.transferAry.length == 0) {
            this.$message({
              type: "warning",
              message: "未选择用户"
            });
            return true;
          }
          this.transferAry.map((item, index) => {
            let obj = { accessType: this.ruleForm.type, shareToUserNo: item };
            share.push(obj);
          });
          const params = {
            shareId: this.shareId,
            dataType: this.dataType,
            share: share
          };

          DataApi.shareCreateMarket(params).then(res => {
            if (res.code == 200) {
              this.$message({ type: "success", message: "新建共享成功！" });
              this.userVisible = false;
              this.searchForm = { userName: null };
              this.ruleForm = { type: null };
              this.value = [];
              this.getList();
            } else {
              this.$message({
                type: "warning",
                message: res.message ? res.message : "系统异常请联系管理员！"
              });
            }
          });
        }
      });
    },
    onSearchSubmit() {
      this.getPersonList();
    },
    getPersonList() {
      let params = {
        appId: process.env.APP_ID,
        type: "00",
        lockingStatus: "00",
      };
      commonDataApi.getUserListNoPage(params).then(res => {
        if (res.code == 200) {
          this.transferData = [];
          let ndata = res.data || {};
          ndata.map((item, index) => {
            this.transferData.push({
              key: item.userNo,
              label: item.userName
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    handleChange(value, direction, movedKeys) {
      this.transferAry = value;
      this.value = value;
    },
    filterMethod(query, item) {
      return item.label.match(query);
    },
    setTransferValue(data) {
      this.transferAry = data;
    }
  }
};
</script>

<style lang="scss">
.transferComponent {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .col-create {
    text-align: right;
    margin-bottom: 5px;
  }
  .el-input--small .el-input__inner {
    width: 100%;
  }
  .el-transfer-panel:last-child {
    height: 263px;
  }
  .el-transfer-panel:last-child
    .el-transfer-panel__body
    .el-transfer-panel__filter {
    visibility: hidden;
  }
  .el-transfer-panel__list.is-filterable {
    display: flex;
    flex-direction: column;
  }
  .el-transfer-panel .el-transfer-panel__header {
    display: none;
  }
  .el-checkbox:last-of-type {
    margin-right: 30px;
  }
}
</style>