<template>
  <div class="accessory-edit">
    <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'附件信息'">
        <el-row class :gutter="20">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model.trim="ruleForm.customerName" disabled placeholder="请输入客户名称" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="customerTypeName">
              <el-input v-model="ruleForm.customerTypeName" :disabled="true" placeholder="请输入客户类型" class="form-input"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="附件类型" prop="type">
              <el-select v-model="ruleForm.type" clearable class="form-input" placeholder="请选择附件类型">
                <el-option v-for="(item,index) in  MATERIAL_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="filesRequire">
            <span class="flag">*</span>
            <el-form-item label="附件链接">
              <UploadTpl class="upload-tpl" :accept="'image/jpeg,image/gif,image/png,.doc,.txt,.pdf,.xls,.docx,.xlsx'" :listType="'text'" :showFileList="true" :handle-success="handleSuccess" :on-exceed="onExceed" :file-list="fileList">
                <!-- 改变上传按钮 -->
                <el-button slot="upload-btn" type="primary">选择文件</el-button>
                <div slot="tip">请选择图片或文档，并确保文件清晰,单个文件大小不超过20MB</div>
              </UploadTpl>
            </el-form-item>
          </el-col>
        </el-row>
      </Card>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import UploadTpl from "@/components/Upload/index";
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
export default {
  components: { UploadTpl },
  name: "baseInfo",
  data: function () {
    return {
      Utils: Utils,
      fileList: [],
      isDownload: false,
      limit: 1,
      addPath: "/consumer/index/add",
      SelectionOptions,
      activeName: "first",
      routeQuery: null,
      dictTable: null, //字典表
      MATERIAL_TYPE: null,
      consumerDetailPath: "/consumer/index/detail",
      btnsProps: {
        submit: {
          text: "保存",
          func: this.submitFunc
        },
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      },
      ruleForm: {
        id: null,
        customerId: null, //客户ID
        customerName: null, //客户名称
        customerType: null, //客户类型
        customerTypeName: null, //客户类型名称
        type: null, //附件类型
        name: null, // 附件名称
        url: null,
        ossData: "" //oss返回的数据
      },
      rules: {
        name: [
          { required: true, message: "请输入附件名称", trigger: "blur" },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            message: "请选择附件类型",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    if (this.routeQuery.flag == "edit") {
      this.getDetailById();
    } else {
      this.ruleForm.customerId = this.routeQuery.currConsumerId; //客户ID
      this.ruleForm.customerName = this.routeQuery.currCustomerName; //客户名称
      this.ruleForm.customerType = this.routeQuery.currConsumerType; //客户类型
      this.ruleForm.customerTypeName = this.routeQuery.currConsumerType == "ENTERPRISE" ? "企业客户" : "个人客户"; //客户类型名称
    }

    if (this.routeQuery.currConsumerType == "ENTERPRISE") {

      let currCertificateType = this.routeQuery.currCertificateType;//当前客户 证件类型
      let legalCertificateType = this.routeQuery.currLegalCertificateType;//法定代表  证件类型
      let actualCertificateType = this.routeQuery.currActualCertificateType;//实控人 证件类型

      if (currCertificateType == 3) {//营业执照
        if (legalCertificateType) {// 法定代表
          if (legalCertificateType == 1) {// 身份证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE2;
          } else if (legalCertificateType == 2) { // 护照
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE3;
          } else if (legalCertificateType == 5) {// 港澳居民来往内地通行证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE4;
          } else if (legalCertificateType == 13) {// 香港身份证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE5;
          }
        } else {
          this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE1;
        }
      } else if (currCertificateType == 4) {// CI证书
        if (actualCertificateType) {// 实控人
          if (actualCertificateType == 1) {// 身份证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE6;
          } else if (actualCertificateType == 2) { // 护照
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE7;
          } else if (actualCertificateType == 5) {// 港澳居民来往内地通行证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE8;
          } else if (actualCertificateType == 13) {// 香港身份证
            this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE9;
          }
        } else {
          this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE10;
        }
      } else {
        // 6 新加坡公司商业注册证
        this.MATERIAL_TYPE = SelectionOptions.ENTERPRISE_MATERIAL_TYPE11;
      }
    } else {
      if (this.routeQuery.currCertificateType == 1) {
        this.MATERIAL_TYPE = SelectionOptions.INDIVIDUAL_MATERIAL_TYPE1;
      } else if (this.routeQuery.currCertificateType == 2) {
        this.MATERIAL_TYPE = SelectionOptions.INDIVIDUAL_MATERIAL_TYPE2;
      } else if (this.routeQuery.currCertificateType == 5) {
        this.MATERIAL_TYPE = SelectionOptions.INDIVIDUAL_MATERIAL_TYPE3;
      } else if (this.routeQuery.currCertificateType == 13) {
        this.MATERIAL_TYPE = SelectionOptions.INDIVIDUAL_MATERIAL_TYPE4;
      }
    }
  },
  methods: {
    getDetailById(data) {
      DataApi.consumerFilesUploadDetail(this.routeQuery.filesId).then(res => {
        if (res.code == 200) {
          let { data } = res;
          this.ruleForm = data;
          this.ruleForm = {
            id: data.id,
            customerId: data.customerId, //客户ID
            customerName: data.customerName, //客户名称
            customerType: this.routeQuery.currConsumerType, //客户类型
            customerTypeName: this.routeQuery.currConsumerType == "ENTERPRISE" ? "企业客户" : "个人客户", //客户类型名称
            type: Number(data.type), //附件类型
            name: data.name, // 附件名称
            url: data.url
          };
          let file = {
            url: data.url,
            name: data.url,
            // originType: 1,
            status: "success",
            uid: Math.random()
          }

          this.fileList.push(file);
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    submitFunc() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.fileList.length == 0) {
            this.$message({
              type: "warning",
              message: "请上传附件！"
            });
            return true;
          }
          // let url = `url?name=${this.fileList[0].name}&url=${this.fileList[0].url}&uid=${this.fileList[0].uid}`;
          //监听上传对象赋值
          this.ruleForm = {
            ...this.ruleForm,
            url: this.fileList[0].url
          };
          if (this.routeQuery.flag == "edit") {
            DataApi.consumerFilesUploadUpdate(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "更新成功！" });
                this.cancelFunc();
              } else {
                this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          } else {
            DataApi.consumerFilesUploadCreate(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({ type: "success", message: "新建成功！" });
                this.cancelFunc();
              } else {
                this.$message({
                  type: "warning",
                  message: res.message ? res.message : "系统异常请联系管理员！"
                });
              }
            });
          }
        }
      });
    },
    handleSuccess(data, files, key) {
      if (files.length == 0) {
        return true
      }
      //监听上传对象赋值
      let obj = {
        ...data,
        // originType: 1,
        name: data.url
      }

      this.fileList = [obj];
    },
    onExceed(files, fileList) {
      //监听超出限制
      this.$message({
        type: "warning",
        message: `最多可以上传 ${this.limit} 个文件`
      });
    },
    cancelFunc() {
      // let viewType = this.routeQuery.viewType;
      // if (viewType == "detail") {
      //   this.$router.push({
      //     path: this.detailPath,
      //     query: {
      //       filesId: this.ruleForm.id, //附件id
      //       currConsumerId: this.routeQuery.currConsumerId,
      //       currConsumerType: this.routeQuery.currConsumerType
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     path: this.consumerDetailPath,
      //     query: {
      //       currConsumerId: this.routeQuery.currConsumerId,
      //       activeName: "second",
      //       currConsumerType: this.routeQuery.currConsumerType
      //     }
      //   });
      // }
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.accessory-edit {
  label {
    font-weight: normal;
    color: #333;
  }
  .filesRequire {
    position: relative;
    .el-form-item {
      width: 100%;
      .el-form-item__content {
        width: 100%;
      }
    }
    .flag {
      position: absolute;
      left: 56px;
      top: 9px;
      color: #f56c6c;
      font-size: 12px;
    }
    .upload-section {
      margin-top: 0px;
      position: relative;
      .el-upload-list {
        position: absolute;
        top: -40px;
        left: 70px;
      }
      .el-upload-list__item-status-label {
        right: -20px;
      }
      .el-icon-close {
        right: -20px;
      }
    }
    .el-upload-list {
      margin-bottom: 0px;
    }
  }
}
</style>