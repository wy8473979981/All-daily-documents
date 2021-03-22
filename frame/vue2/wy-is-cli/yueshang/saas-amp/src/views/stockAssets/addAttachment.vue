<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="576px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="6">
            <h3>上传</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>类别</span>
                  <el-select placeholder="类别" size="mini" v-model="info.file_type" @change="importChange" filterable>
                    <el-option
                      v-for="item in attachmentUpload"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.type_config_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>备注</span>
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="500"
                    :autosize="{ minRows: 6, maxRows: 8}"
                    show-word-limit
                    v-model="info.message">
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>选择文件</span>
                  <el-upload
                    name="bl_file"
                    :data="info"
                    :action="uploadUrl"
                    :show-file-list="false"
                    accept=".xls, .xlsx, image/*,.pdf , .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess"
                    :on-false="handleFalse"
                    class="upload-box">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">上传文件，不超过100MB</div>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
export default {
  name: 'UpLoad',
  props: ['open', 'attachmentUpload', 'projectConfigId'],
  data() {
    return {
      info: {
        file_type: "66",
        message: null,
        project_id: null
      },
      projectList: [],
      uploadUrl: '',
      loadingService: null
    }
  },
  created() {
    this.uploadUrl = `../${this.$baseURL}/attachmentUpload/do_upload?token=` + localStorage.getItem('ys_contract_token')
  },
  computed: {
    fast: {
      get() {
        this.info.big_layout_type = this.downLayout
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    downLayout(nv) {
      this.info.big_layout_type = nv
    }
  },
  mounted() {
  },
  beforeDestroy() {

  },
  methods: {
    importChange() {

    },
    beforeAvatarUpload(file) {
      if(!this.info.file_type){
        this.$message.error('请选择类别')
        return false
      }
      if(!this.projectConfigId){
        this.$message.error('项目ID不存在')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 100
      if(!isLt2M){
        this.$message.error('上传模板大小不能超过 100MB')
        return false
      }
      this.loadingService = Loading.service({
        lock: true,
        text: '正在上传文件，请稍候...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.info.project_id = this.projectConfigId
    },
    // 导入数据
    handleSuccess(res, file, fileList) {
      try{
        this.loadingService.close()
      }catch(e){}
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$emit('close', {
          fast: false
        })
        this.resetData()
      } else {
        this.$message.error(res.msg)
      }
    },
    handleFalse() {
      try{
        this.loadingService.close()
      }catch(e){}
      this.$message.error("上传失败！")
    },
    resetData() {
      this.info = {
        file_type: "66",
        message: null,
        project_id: null
      }
    },
    cancel() {
      this.resetData()
      this.$emit('close', {
        add: false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon {
  right: 562px;
}
.upload-box {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: center;
    em {
      color: #409eff;
      font-style: normal;
    }
  }
  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }
}
</style>
