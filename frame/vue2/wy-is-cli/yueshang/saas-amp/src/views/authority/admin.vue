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
            <h3>权限</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <h3 class="min-title">功能权限</h3>
            <el-row
              :gutter="20"
              style="margin-bottom: 15px;"
              v-for="(item, index) in tableDataUser" :key="index">
              <el-col :span="24">
                <div class="d-min">
                  <span>{{ item.menu_name }}</span>
                  <el-checkbox
                    v-model="itemm.is_check"
                    v-for="(itemm, indexx) in item.children" 
                    :key="indexx"
                    @change="is_checkChange"
                    true-label="true"
                    false-label="false">{{ itemm.menu_name }}
                  </el-checkbox>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3 class="min-title">关联项目</h3>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-min">
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
import Authority from '@/apis/apis/authority'
import TypeApi from '@/apis/apis/typeApi'
export default {
  name: 'Admin',
  props: ['open', 'id'],
  data() {
    const generateData = _ => {
      const data = []
      cities.forEach((city, index) => {
        data.push({
          project_name: city,
          project_config_id: index
        })
      })
      return data
    }
    return {
      // projectList: generateData(),
      projectList: [],
      info: {
        project_id: [], //已选
      },
      tableDataUser: [],
      filterMethod(query, item) {
        console.log(111222)
        return item.project_name.indexOf(query) > -1
      }
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
        this.getProList()
      }else{
        this.info = {
          project_id: [], //已选项目
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    // 权限信息
    async getList() {
      await Authority.permission({role_id: this.id}).then(res => {
        if(res.code === 200 && res.result){
          this.tableDataUser = res.result.menu_tree
          // 已选项目回显
          for (let key in res.result.projects) {
            this.info.project_id.push(res.result.projects[key].project_id)
          }
        }
      })
    },
    // 获取存量项目列表
    getProList() {
      TypeApi.projectDropDown({project_type: 1}).then(res => {
        if(res.code === 200 && res.result){
          this.projectList = res.result
        }
      })
    },
    project_idChange(val) {
      console.log(val)
      console.log(this.info.project_id)
    },
    is_checkChange(val) {
      console.log(val)
      console.log(this.tableDataUser)
    },
    resetData() {
      this.info = {
        project_id: [], //已选项目
      }
    },
    submit() {
      if(!this.info.project_name) return this.$message.error('请输入角色名称')
      // const params = { 
      //   post_data: JSON.stringify({
      //     json_data: {
      //       info: this.info
      //     }
      //   })
      // }
      if (!this.id) {
        TypeApi.add(this.info).then(res => {
          if(res.code === 200){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      } else {
        TypeApi.edit({id: this.id, ...this.info}).then(res => {
          if(res.code === 200){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      }
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
  right: 562px;
}
</style>
