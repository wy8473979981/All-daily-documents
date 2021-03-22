<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="80%">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="6">
            <h3>附件</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button size="mini" plain @click="openAddd"><i class="el-icon-upload"></i>上传文件</el-button>
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <el-table ref="table" :data="tableData" size="mini" border header-row-class-name="table-header" :max-height="this.$store.state.tableHeight">
            <el-table-column min-width="120" label="类别" prop="file_type_name" align="center">
            </el-table-column>
            <el-table-column min-width="150" label="附件名称" show-overflow-tooltip prop="" align="left">
              <template slot-scope="scope">
                <a @click="downFile(scope.row.file_address)" style="color: #1890FF;cursor: pointer;"><i class="el-icon-folder-opened"></i><span>{{scope.row.file_name}}</span></a>
              </template>
            </el-table-column>
            <el-table-column min-width="100" label="上传用户" prop="admin_name" align="left">
            </el-table-column>
            <el-table-column min-width="110" label="上传时间" prop="create_time" align="left">
              <template slot-scope="scope">
                <span>{{scope.row.create_time?scope.row.create_time.substr(0,16): ''}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100" label="备注1234" show-overflow-tooltip align="left">
              <template slot-scope="scope">
                <span>{{(scope.row.message && scope.row.message !== 'null')?scope.row.message : ''}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100" label="操作" prop="rent_contract_end" align="center" v-if="permission.indexOf('clzcdr_fj_del') > -1" >
              <template slot-scope="scope">
                <el-button size="mini" type="info" plain @click="deleteFile(scope.row.id,scope.row.file_temp_name)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
    <div>
      <!-- 附件-新增 -->
      <AddAttachment :open="add" :downLayout="false" :projectConfigId="projectConfigId" :attachmentUpload="attachmentUpload" @close="closeAttach"></AddAttachment>
    </div>
  </div>
</template>

<script>
import TypeApi from '@/apis/apis/typeApi'
import AddAttachment from '@views/stockAssets/addAttachment'
export default {
  name: 'UpLoad',
  props: ['open', 'attachmentUpload', 'projectConfigId'],
  components: {
    AddAttachment
  },
  data() {
    return {
      info: {
        big_layout_type: 1,
        small_layout: 'Mall',
        project_config_id: null, //存量项目id
        project_name: null, //存量项目名称
        report_time: null, //报表时间
      },
      projectList: [],
      uploadUrl: '',
      add: false,
      tableData: [],
      permission: `${localStorage.getItem('ys_contract_permission')}`,
    }
  },
  created() {
    this.getList()
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
    open(nv) {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  beforeDestroy() {

  },
  methods: {
    openAddd() {
      this.add = true
    },
    closeAttach() {
      this.add = false
      this.getList()
    },
    // 获取
    getList() {
      TypeApi.attachmentList({project_id: this.projectConfigId}).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result
        }
      })
    },
    resetData() {
      // this.info.small_layout = 'Mall'
      // this.info.project_config_id = null
      // this.info.project_name = null
      // this.info.report_time = null
      this.tableData = []
    },
    cancel() {
      this.resetData()
      this.$emit('close', {
        attachment: false
      })
    },
    downFile(url) {
      const token = localStorage.getItem('ys_contract_token')
      if(token && url) {
        const form = url.split(".")
        const formType = ['png','pdf','jpg','jpeg']
        if(form && form.length === 2 && formType.indexOf(form[1]) > -1) {
          window.open(`../${this.$baseURL}/${url}?token=${token}`)
        } else {
          window.location.href = `../${this.$baseURL}/${url}?token=${token}`
        }
      }
    },
    deleteFile(file_id, file_temp_name) {
      try {
        this.$confirm(`确认要删除吗？`).then(() => {
          TypeApi.deleteAttachment({file_id: file_id,file_temp_name: file_temp_name}).then(res => {
            if(res.code === 200){
              this.getList()
            }
          })
        }).catch(() => {

        })
        // this.handelConfirm(id)
      } catch (error) {
        console.log(error, '----[取消删除 start]----')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon {
  right: 79.3%;
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
