<template>
  <div class="content consumerImport">
    <div class="section">
      <el-form class="form-section block-form" :model="ruleForm" :rules="rules" ref="ruleForm" inline size="small">
        <Card :title="'导入步骤说明'">
          <p>
            1. 按照模版要求整理要导入的数据，
            <!-- 测试环境 -->
            <el-link type="primary" href="https://glp-crm-test.oss-cn-shanghai.aliyuncs.com/tmp/市场部导入企业客户模板.xlsx">点击下载模版</el-link>
            <!-- 生产环境 -->
            <!-- <el-link type="primary" href="https://glp-crm.oss-cn-shanghai-finance-1-pub.aliyuncs.com/tmp/市场部导入企业客户模板.xlsx">点击下载模版</el-link> -->
          </p>
          <p>2. 查询并选择需要关联的市场活动、来源渠道（可以留空，导入后需逐个关联）</p>
          <p>3. 点击选择文件，选择要导入的文件(注意： 只支持xls格式的文件)</p>
          <p>4. 单击“开始导入”按钮，完成数据导入</p>
          <el-divider></el-divider>
          <el-row class="row-item" :gutter="20">
            <el-col :span="24">
              <el-form-item prop="activityName" label="所属市场活动" class="btn-box">
                <el-input v-model="ruleForm.activityName" clearable disabled class="form-input" placeholder="请查询并选择所属市场活动"></el-input>
                <el-button type="primary" @click="searchActionFun">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="activityChannelName" label="市场活动渠道" class="btn-box">
                <el-input v-model="ruleForm.activityChannelName" clearable disabled placeholder="请查询并选择市场活动渠道" class="form-input"></el-input>
                <el-button type="primary" :disabled="isCanUserSearchChannel" @click="searchChannelFun">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="选择需要导入的数据文件：" prop="name">
                <el-upload class="upload-demo" ref="upload" accept=".xlsx" :action="url" :with-credentials="true" :file-list="fileList" :auto-upload="false" :on-success="uploadOnSuccess" :on-error="uploadOnError" :on-remove="handleRemove" :on-change="fileChange" :before-upload="beforeUpload">
                  <el-button slot="trigger" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip" v-if="fileList.length==0">未选择任何文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" @click="submitUploadList">开始导入</el-button>
              <el-button type="primary" @click="clearFilesListFunc">清空文件</el-button>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
    <!-- 查询市场活动 -->
    <actionModal :show.sync="actionVisible" v-if="actionVisible" :activeChannelData="activeChannelData" @listenEvent="setActionTableRow"></actionModal>

    <!-- 查询活动渠道 -->
    <channelModal :show.sync="channelVisible" v-if="channelVisible" :marketActiveData="marketActiveData" @listenEvent="setChannelTableRow"></channelModal>

    <el-dialog title="客户导入结果" :visible.sync="Visible" class="body-center" :width="'420px'">
      <p>创建成功：{{succeed}}条，失败：{{failed}}条</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeModal">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import actionModal from "@/components/UX/actionComponent";
import channelModal from "@/components/UX/channelComponent";
import DataApi from "@/api/consumerImportService";
export default {
  mixins: [listMixin],
  components: {
    actionModal,
    channelModal
  },
  data() {
    let self = this;
    return {
      succeed: 0,
      failed: 0,
      limit: 1,
      fileList: [],
      file: [],
      Visible: false,
      marketActiveData: null, //已选的市场活动
      activeChannelData: null, //已选的活动渠道
      uploadUrl: null, //上传路径
      actionVisible: false,
      channelVisible: false,
      operateOption: {
        className: "el-icon-plus",
        name: "新增",
        func: this.addFunc
      },
      ruleForm: {
        activityName: null,
        activityId: null, //市场活动渠道
        activityChannelName: null,
        activityChannelId: null,
        activityChannelType: 3 //渠道类型 1：官网，2：扫码，3：文件导入
      },
      rules: {}
    };
  },
  computed: {
    url: {
      get() {
        let activityId = this.ruleForm.activityId || null;
        let activityChannelId = this.ruleForm.activityChannelId || null;
        let origin = window.location.origin || null;
        let uploadUrl;
        if (activityId && activityChannelId) {
          uploadUrl = `${origin}/glp-crm/intention/import?activityId=${activityId}&activityChannelId=${activityChannelId}`;
        } else {
          if (activityId) {
            uploadUrl = `${origin}/glp-crm/intention/import?activityId=${activityId}`;
          } else if (activityChannelId) {
            uploadUrl = `${origin}/glp-crm/intention/import?activityChannelId=${activityChannelId}`;
          } else {
            uploadUrl = `${origin}/glp-crm/intention/import`;
          }
        }
        return uploadUrl;
      },
      set() { }
    },
    isCanUserSearchChannel: {
      get() {
        return this.ruleForm.activityName == null;
      },
      set() { }
    }
  },
  created() {
    let origin = window.location.origin;
    this.uploadUrl = `${origin}/glp-crm/intention/import`;
  },
  methods: {
    setActionTableRow(data) {
      this.marketActiveData = data; //已选的市场活动
      // 新增/修改客户，所属活动和渠道不为空时，切换所属活动，市场活动渠道要求清空，重新选择该活动下的渠道
      this.activeChannelData = null; //已选的市场活动渠道
      this.ruleForm = {
        ...this.ruleForm,
        activityId: data.id, //所属市场活动
        activityName: data.name, //所属市场活动名称
        activityChannelId: null, //市场活动渠道
        activityChannelName: null, //市场活动渠道名称
      }
    },
    setChannelTableRow(data) {
      this.ruleForm.activityChannelId = data.id; //市场活动渠道
      this.ruleForm.activityChannelName = data.name; //市场活动渠道名称
      this.activeChannelData = data; //已选的市场活动渠道
    },
    searchChannelFun() {
      this.channelVisible = true;
    },
    searchActionFun() {
      this.actionVisible = true;
    },
    submitUploadList() {
      if (this.fileList.length == 0) {
        this.$message({ type: "warning", message: "请选择上传文件" });
        return true;
      }
      this.$refs.upload.submit();
    },
    beforeUpload(file) { },

    uploadOnError() {
      this.$message({ type: "warning", message: "上传出错！" });
    },
    uploadOnSuccess(response, file, fileList) {
      if (response.code == 200) {
        const { data } = response;
        this.fileList = fileList;
        this.Visible = true;
        this.succeed = data.succeed;
        this.failed = data.failed;
        this.fileList.map(item => {
          item.percentage = 0
          item.status = 'ready'
        })
      } else {
        this.fileList.map(item => {
          item.percentage = 0
          item.status = 'ready'
        })
        this.$message({
          type: "warning",
          message: response.message
            ? response.message
            : "系统异常请联系管理员！"
        });

      }
    },
    handleRemove(file, fileList) {
      this.fileList = [];
    },
    fileChange(file, fileList) {
      if (fileList.length == 0) {
        return true
      }
      //监听上传对象赋值
      this.fileList = [file];
    },
    closeModal() {
      this.Visible = false;
    },
    clearFilesListFunc() {
      this.fileList = [];

    }
  }
};
</script>

<style lang="scss" >
.consumerImport {
  .btn-box {
    .el-form-item__content {
      display: flex;
    }
    .el-button {
      margin-left: 5px;
    }
  }
  .body-center {
    .el-dialog__body {
      padding: 40px 0;
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