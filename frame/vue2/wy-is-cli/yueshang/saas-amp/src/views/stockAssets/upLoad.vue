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
            <h3>导入数据</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <!-- <h3 class="min-title">存量资产</h3> -->
            <el-row :gutter="20" v-if="info.big_layout_type == 1">
              <el-col :span="24">
                <div class="d-min">
                  <span>选择业态</span>
                  <el-radio-group v-model="info.small_layout" @change="importChange">
                    <el-radio label="Mall"></el-radio>
                    <el-radio label="商业街"></el-radio>
                    <el-radio label="地下商业"></el-radio>
                    <el-radio label="底商"></el-radio>
                    <el-radio label="其他"></el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>选择项目</span>
                  <el-select class="required" v-model="info.project_config_id" @change="projectNameChange" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in projectList"
                      :key="item.project_config_id"
                      :label="item.project_name + '-' +item.project_label_name"
                      :value="item.project_config_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>报表时间</span>
                  <el-date-picker
                    class="required"
                    v-model="info.report_time"
                    @change="importChange"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="请选择">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>选择文件</span>
                  <el-upload
                    name="fileName"
                    :data="info"
                    :action="uploadUrl"
                    :show-file-list="false"
                    accept=".xls, .xlsx"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess"
                    class="upload-box">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xls或xlsx文件，且不超过100MB</div>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>条线审核人</span>
                  <p>马总</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>资管审核人</span>
                  <p>马总</p>
                </div>
              </el-col>
            </el-row> -->
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import TypeApi from '@/apis/apis/typeApi'
import StockAssets from '@/apis/apis/stockAssets'
export default {
  name: 'UpLoad',
  props: ['open', 'downLayout'],
  data () {
    return {
      info: {
        big_layout_type: 1,
        small_layout: 'Mall',
        project_config_id: null, // 存量项目id
        project_name: null, // 存量项目名称
        report_time: null // 报表时间
      },
      projectList: [],
      uploadUrl: ''
    }
  },
  created () {
    this.uploadUrl = `../${this.$baseURL}projectDetail/import?token=` + localStorage.getItem('ys_contract_token')
  },
  computed: {
    fast: {
      get () {
        this.info.big_layout_type = this.downLayout
        return this.open
      },
      set (val) {
        this.$emit('close', { fast: false })
      }
    }
  },
  watch: {
    downLayout (nv) {
      this.info.big_layout_type = nv
    }
  },
  mounted () {
    this.getProList()
  },
  beforeDestroy () {

  },
  methods: {
    // 获取存量项目列表
    getProList () {
      TypeApi.projectDropDown({ project_type: 1, layout: this.info.big_layout_type }).then(res => {
        if (res.code === 200 && res.result) {
          this.projectList = res.result
        }
      })
    },
    // 获取项目名称
    projectNameChange (val) {
      const obj = this.projectList.find(item => item.project_config_id == val)
      if (obj) {
        this.info.project_name = obj.project_name
      }
      this.importChange()
    },
    importChange () {
      if (this.info.small_layout && this.info.project_config_id && this.info.report_time) {
        if (this.info.big_layout_type != 1) {
          this.info.small_layout = null
        }
        StockAssets.importJudgeOldData(this.info).then(res => {
          if (res.code === 2002) {
            this.$confirm('当前存在旧数据，是否重新导入？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message.success('点击上传导入数据')
            }).catch(() => {
              this.cancel()
            })
          } else if (res.code === 200) {
            this.$message.success('不存在旧数据可以重新导入')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    beforeAvatarUpload (file) {
      if (!this.info.project_config_id) {
        this.$message.error('请选择项目')
        return false
      }
      if (!this.info.report_time) {
        this.$message.error('请选择报表时间')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message.error('上传模板大小不能超过 100MB')
        return false
      }
    },
    // 导入数据
    handleSuccess (res, file, fileList) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$emit('close', {
          fast: false,
          reload: true,
          // small_layout: this.info.small_layout,
          project_config_id: this.info.project_config_id,
          report_time: this.info.report_time
        })
        this.resetData()
      } else {
        this.$message.error(res.msg)
      }
    },
    resetData () {
      this.info.small_layout = 'Mall'
      this.info.project_config_id = null
      this.info.project_name = null
      this.info.report_time = null
    },
    cancel () {
      this.resetData()
      this.fast = false
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
