<template>
  <div class="upload-section" v-loading="isLoading">
    <UploadList v-if="showFileList" :disabled="onlyView" :list-type="listType" @remove="onRemove" :files="filesList"></UploadList>

    <el-upload class="upload-ele" :class="hasLimit?'hidden-picture-card':''" ref="upload" action="#" :http-request="uploadFn" :list-type="listType" :multiple="multiple" :accept="accept" :limit="limit" :on-exceed="onExceed" :show-file-list="false" :before-upload="beforeUpload" :disabled="hasLimit" :on-change="onChange" :filename="filename" :file-list="filesList" :auto-upload="true">
      <template>
        <template v-if="listType==='picture-card'">
          <i slot="default" :disabled="hasLimit" class="el-icon-plus"></i>
        </template>
        <template v-else>
          <slot name="upload-btn">
            <div class="upload-btn-div">
              <el-button v-if="isButton" :disabled="hasLimit" size="small" type="primary">点击上传</el-button>
              <i v-else slot="default" class="el-icon-plus"></i>
            </div>
          </slot>
        </template>
      </template>
    </el-upload>
    <slot name="tip"></slot>
    <template v-if="!showFileList">
      <template v-if="fileLength>0">
        <span class="upload-tips-span">{{fileLength}}个文件已上传成功</span>
        <el-button size="small" type="primary" plain @click.stop="showFiles">管理文件</el-button>
      </template>

      <!-- 展示框 -->
      <UploadListTpl :dialog-visible="dialogVisible" :disabled="onlyView" :list-data="filesList" @eventDelete="onRemove" @eventClose="handleClose"></UploadListTpl>
    </template>
  </div>
</template>

<script type="text/javascript">
import UploadList from "./upload-list";
import UploadListTpl from "./UploadListTpl";
import CommonApi from "@/api/common";
import { Utils } from "@/utils";
import { mapGetters } from "vuex";
const OSS = require("ali-oss");
export default {
  name: "oss-upload",
  props: {
    onlyView: {
      //是否只查看
      type: Boolean,
      default: false
    },
    disabled: {
      //是否可用
      type: Boolean,
      default: false
    },
    showFileList: {
      //是否显示上传的文件列表
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: "text"
    },
    isButton: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ""
    },
    limit: {
      type: Number,
      default: 10
    },
    limitTxt: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: "uploadFile"
    },
    fileList: {
      type: Array
    },
    fileKey: {
      type: String
    },
    handleSuccess: {
      type: Function
    }
  },
  data() {
    return {
      client: null, //oss上传实例
      isRequestStsToken: false, //是否正在请求stsToken
      filesList: [], //前端显示的文件列表

      isClose: false, //是否锁定提示信息
      dialogVisible: false, //是否显示文件列表

      uploadFile: null, //当前上传的文件
      uploadFiles: [], //当前待上传的文件数组
      isLoading: false, //是否正在拉取stsToken

      imgRe: /image\/[a-z]{2,4}$/i,

      lastTime: 0 //上次执行上传时间---处理多个文件上传bug
    };
  },
  computed: {
    ...mapGetters(["stsToken"]),
    fileLength() {
      return this.filesList.length;
    },
    hasLimit() {
      if (this.disabled == true) {
        return true;
      } else {
        return this.filesList.length >= this.limit;
      }
    }
  },
  watch: {
    fileList: {
      handler(val, oldVal) {
        if (val) {
          this.filesList = [...this.fileList];
        }
      },
      deep: true
    }
  },
  components: {
    UploadList,
    UploadListTpl
  },

  created() {
    if (this.fileList) {
      this.filesList = [...this.fileList];
    }
  },
  mounted() { },

  methods: {
    getData(num) {
      //请求上传参数
      if (num > 3) {
        this.$message({
          type: "warning",
          message: "请求stsToken失败，请刷新重试或联系管理员！"
        });
        this.isLoading = false;
        return;
      }
      if (this.stsToken) {
        this.setOssOption(this.stsToken);
        this.isLoading = false;
      } else {
        num++;
        this.getStsToken(() => {
          this.getData(num);
        });
      }
    },
    setOssOption(options) {
      //定义oss对象
      try {
        this.client = new OSS(options); //配置公用上传参数-------上传不同路径的需求，需另做处理
        // 检测待上传数组
        if (this.uploadFiles.length > 0) {
          this.uploadFiles.forEach(item => {
            this.putFile(item);
          });
          this.uploadFiles = [];
        } else {
          this.putFile(this.uploadFile);
        }
      } catch (e) {
        console.warn("定义oss对象失败！");
      }
    },
    getDateAfter(str, n) {
      //获取将来n个月
      if (str) {
        let date = new Date(str.replace("/", "-"));
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let a = m + n * 1;
        let yy = Math.floor(a / 13);
        let mm = a > 12 ? a % 12 : a;
        return y + yy + "-" + mm + "-" + d;
      }

      return "";
    },
    handlePreview(file) {
      window.open(file.url);
    },
    beforeUpload(file) {
      //监听文件变化
      const isZip = file.type === "application/x-zip-compressed";
      const isLt2M = file.size / 1024 / 1024 < 20; //限制大小
      const isSize = file.size == 0; //限制大小
      if (!isLt2M) {
        this.$message.error("文件大小超过20MB");
      }
      if (isSize || isZip) {
        this.$message.error("文件格式不正确");
      }
      return !isZip && !isSize && isLt2M;
    },
    onChange(file, filesList) {
      //监听文件变化
    },
    uploadFn(obj) {
      //覆盖默认上传功能

      // 检测是否为一次性上传的文件组
      let nowTime = new Date().getTime();
      if (nowTime - this.lastTime <= 50 || this.lastTime == 0) {
        this.uploadFiles.push(obj);
      }
      this.lastTime = nowTime;

      // 检测oss上传对象
      if (this.client) {
        this.putFile(obj);
      } else {
        this.uploadFile = obj;
        this.isLoading = true;
        this.getData(0);
      }
    },
    putFile(obj) {
      //开始上传文件到oss
      let { file } = obj;
      // let uuid = Utils.GUID();                         //避免可能重复的uuid
      let suffix = Utils.getSuffix(file.name);
      let key = this.stsToken.path + "/crm-" + file.uid + "." + suffix;
      let self = this;

      // 格式化file对象
      let setParamsFn = (res, status) => {
        let fileItem = {
          status,
          url: res.url,
          // uuid:uuid,
          ossKey: key,
          path: self.stsToken.path,
          uid: file.uid,
          name: file.name,
          size: file.size,
          type: file.type,
          isImg: self.imgRe.test(file.type),
          suffix
        };
        return fileItem;
      };
      // 开始上传
      this.client.put(key, file).then(
        res => {
          self.onSuccess(setParamsFn(res, "success"));
        },
        err => {
          self.onError(setParamsFn(err, "error"), err);
        }
      );
    },

    getStsToken(callback) {
      //请求stsToken
      if (this.isRequestStsToken == true) {
        return;
      }
      this.isRequestStsToken = true;
      CommonApi.getStsToken().then(
        res => {
          this.isRequestStsToken = false;
          let ndata = res.data || {};
          let stsToken = {
            region: ndata.endPoint,
            accessKeyId: ndata.accessKeyId,
            accessKeySecret: ndata.accessKeySecret,
            stsToken: ndata.securityToken,
            bucket: ndata.bucketName,
            // endpoint:ndata.endPoint,
            path: ndata.path
          };

          this.$store.dispatch("setStsToken", stsToken);

          callback.call(this);
        },
        err => {
          this.isRequestStsToken = false;
          callback.call(this);
        }
      );
    },

    onSuccess(data) {
      //上传成功
      this.filesList.push(data);
      if (this.isClose == false) {
        this.isClose = true;
        this.$message({
          type: "success",
          message: "恭喜！上传成功！",
          onClose: () => {
            this.isClose = false;
          }
        });
      }
      if (this.handleSuccess) {
        this.handleSuccess(data, this.filesList, this.fileKey);
      }
    },

    onError(data, res) {
      //上传失败

      this.$message({
        type: "warning",
        message: "上传失败！请重新上传或联系管理员！"
      });
    },

    onExceed(files, fileList) {
      //超出上传上限

      this.$message({
        type: "warning",
        message: this.limitTxt
          ? this.limitTxt
          : "最多上传" + this.limit + "个文件！"
      });
    },
    onRemove(file) {
      //监听删除按钮

      let index = this.filesList.findIndex(item => {
        return item.uid === file.uid;
      });
      if (index != -1) {
        this.filesList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功！"
        });

        // 更新父级数据
        if (this.handleSuccess) {
          this.handleSuccess(file, this.filesList, this.fileKey);
        }
      }
    },
    showFiles() {
      //查看文件列表
      this.dialogVisible = true;
    },
    handelDeleteFile(item) {
      //监听弹出列表删除文件
      this.filesList.findIndex();
    },
    handleClose() {
      //监听弹出列表关闭
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-ele {
  display: inline;
}
.upload-btn-div {
  margin-top: 20px;
}
.el-upload-list {
  margin-bottom: 20px;
}
.upload-section {
  margin-top: 8px;
  .upload-btn-div {
    margin-top: 0;
  }
}
.upload-tips-span {
  margin: 0px 20px;
  color: #ff902a;
}
</style>