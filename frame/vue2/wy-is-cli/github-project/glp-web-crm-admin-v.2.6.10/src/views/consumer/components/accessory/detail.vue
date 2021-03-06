<template>
  <div class="accessory-detail">
    <el-form class="form-section block-form" :model="ruleForm" ref="ruleForm" inline size="small">
      <Btns :btnsProps="btnsProps" />
      <Card :title="'附件信息'">
        <el-row class="row-item" :gutter="20">
          <!-- <el-col :span="8">
            <el-form-item label="附件名称" prop="name">
              <el-input v-model="ruleForm.name" disabled placeholder="请输入" class="form-input"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="ruleForm.customerName" disabled placeholder="" class="form-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="customerTypeName">
              <el-input v-model="ruleForm.customerTypeName" :disabled="true" placeholder="请输入客户类型" class="form-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-item" :gutter="20">
          <el-col :span="8">
            <el-form-item label="附件类型" prop="type">
              <el-select v-model="ruleForm.type" disabled clearable class="form-input" placeholder="">
                <el-option v-for="(item,index) in  MATERIAL_TYPE" :key="index" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="URL" prop="type">
              <el-link type="primary" :href="ruleForm.url" target="_blank">{{ruleForm.url}}</el-link>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item label="文件类型" prop="fileType">
              <el-input v-model="ruleForm.fileType" disabled placeholder="请输入" class="form-input"></el-input>
            </el-form-item>
          </el-col>-->
          <!-- <el-col :span="8">
            <el-form-item label="URL" prop="type">
              <el-link type="primary" :href="ruleForm.url" target="_blank">{{ruleForm.url}}</el-link>
            </el-form-item>
          </el-col> -->
        </el-row>
      </Card>
      <Card :title="'操作记录'">
        <el-row class="row-item" :gutter="20">
          <el-col :span="12">
            <label>信息创建:</label>
            <span class="mr">{{ruleForm.createUserName?ruleForm.createUserName:'-'}}</span>
            <span>{{ruleForm.createTime?ruleForm.createTime:'-'}}</span>
          </el-col>
          <el-col :span="12">
            <label>最后修改:</label>
            <span class="mr">{{ruleForm.updateUserName?ruleForm.updateUserName:'-'}}</span>
            <span>{{ruleForm.updateTime?ruleForm.updateTime:'-'}}</span>
          </el-col>
        </el-row>
      </Card>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/consumerService";
import { Utils } from "@/utils";
export default {
  components: {},
  name: "baseInfoTab",
  data: function () {
    return {
      Utils: Utils,
      SelectionOptions,
      routeQuery: null,
      MATERIAL_TYPE: null,
      dictTable: null, //字典表
      addPath: "/consumer/index/add",
      consumerDetailPath: "/consumer/index/detail",
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
      btnsProps: {
        cancel: {
          text: "返回",
          func: this.cancelFunc
        }
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.routeQuery = this.$route.query;
    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.getDetailById();
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
        // 新加坡公司商业注册证
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
          // let file = Utils.param2Obj(data.url);
          this.ruleForm = {
            ...data,
            // url: file.url,
            customerType: this.routeQuery.currConsumerType, //客户类型
            customerTypeName: this.routeQuery.currConsumerType == "ENTERPRISE" ? "企业客户" : "个人客户", //客户类型名称
            createTime: Utils.timestampToTime(data.createTime, 2),
            updateTime: Utils.timestampToTime(data.updateTime, 2)
          };
          this.ruleForm.type = Number(data.type); //附件类型


        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    cancelFunc() {
      // this.$router.push({
      //   path: this.consumerDetailPath,
      //   query: {
      //     currConsumerId: this.routeQuery.currConsumerId,
      //     activeName: "second",
      //     currConsumerType: this.routeQuery.currConsumerType
      //   }
      // });
      localStorage.setItem("activeName", this.routeQuery.activeName);
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss">
.accessory-detail {
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
  .row-item {
    font-size: 14px;
    margin-bottom: 20px;
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
}
</style>