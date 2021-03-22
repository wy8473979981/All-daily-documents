<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="1176px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="6">
            <h3>项目列表</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button v-if="permission.indexOf('xmfp_edit') > -1" type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <h3 class="min-title">关联项目</h3>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-min admin-box">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    @change="project_idChange"
                    :titles="['所有项目', '选中项目']"
                    filter-placeholder="请输入项目名称"
                    v-model="info.project_id"
                    :props="{
                      key: 'project_config_id',
                      label: 'project_name'
                    }"
                    :data="projectList">
                  </el-transfer>
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
import ProjectAllot from '@/apis/apis/projectAllot'
import TypeApi from '@/apis/apis/typeApi'
export default {
  name: 'Admin',
  props: ['open', 'id', 'name'],
  data() {
    return {
      // projectList: generateData(),
      projectList: [],
      info: {
        project_id: [], //已选
      },
      filterMethod(query, item) {
        return item.project_name.indexOf(query) > -1
      },
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  created() {
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    id(nv, v) {
      if(nv) {
        this.getList()
      }else{
        this.info = {
          project_id: [], //已选项目
        }
      }
    }
  },
  mounted() {
    this.getProList()
  },
  beforeDestroy() {

  },
  methods: {
    // 权限信息
    getList() {
      ProjectAllot.project_list({user_id: this.id}).then(res => {
        if(res.code === 200 && res.result){
          // 已选项目回显
          setTimeout(() => {
            for (let key in res.result) {
              this.info.project_id.push(res.result[key].project_id)
            }
          }, 200)
        }
      })
    },
    // 获取存量项目列表
    getProList() {
      TypeApi.projectDropDown({project_type: 1, is_check: true}).then(res => {
        if(res.code === 200 && res.result){
          // this.projectList = res.result
          // this.projectList = []
          for (let key in res.result) {
            this.projectList.push({
              project_name: res.result[key].project_name + '-' + res.result[key].project_label_name,
              project_label_name: res.result[key].project_label_name,
              project_config_id: res.result[key].project_config_id
            })
          }
        }
      })
    },
    project_idChange(val) {
      console.log(val)
      console.log(this.info.project_id)
    },
    resetData() {
      this.info = {
        project_id: [], //已选项目
      }
    },
    submit() {
      // if(!this.info.project_id[0]) return this.$message.error('请选择关联项目')
      const params = {
        project_ids: this.info.project_id,
        user_id: this.id,
        user_name: this.name
      }
      ProjectAllot.project_save(params).then(res => {
        if(res.code === 200){
          this.resetData()
          this.$emit('close', {
            fast: false,
            reload: true
          })
        }
      })
    },
    cancel() {
      // this.resetData()
      this.fast = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon{
  right: 1162px;
}
</style>
<style>
.admin-box .el-transfer-panel {
  width: 510px;
}
.admin-box .el-transfer-panel__body {
  height: 440px;
}
.admin-box .el-transfer-panel__list.is-filterable {
  height: 390px;
}
.admin-box .el-transfer-panel__item.el-checkbox .el-checkbox__label {
  width: 200px;
}
</style>
