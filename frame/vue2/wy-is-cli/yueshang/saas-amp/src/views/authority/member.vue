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
            <h3>成员列表</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <el-collapse-transition>
          <div v-show="selectShow">
            <h3 class="min-title">选择成员</h3>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <el-select v-model="info.user_id" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="item in user_id_list"
                      :key="item.admin_id"
                      :label="item.admin_truename"
                      :value="item.admin_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" align="middle" style="margin-top:15px;">
              <el-col style="text-align: center;">
                <el-button @click="submit" size="mini" type="success">确认</el-button>
                <el-button @click="cancelUser" size="mini" type="info" plain>取消</el-button>
              </el-col>
            </el-row>
          </div>
          </el-collapse-transition>
          <div>
            <h3 class="min-title">成员列表</h3>
            <el-row type="flex" justify="space-between" align="middle">
              <el-col style="text-align: right;">
                <el-button @click="selectShow = !selectShow" size="mini" type="success">新增</el-button>
                <el-button @click="memberDel" size="mini" type="info" plain>批量删除</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <el-table ref="table" :data="tableDataUser" size="mini" header-row-class-name="table-header" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="60" fixed />
                    <el-table-column min-width="120" label="成员" prop="admin_truename" />
                    <el-table-column min-width="120" label="岗位" prop="created_at" />
                    <el-table-column min-width="120" label="部门" prop="type11" />
                  </el-table>
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
export default {
  name: 'Member',
  props: ['open', 'id'],
  data() {
    return {
      selectShow: false,
      info: {
        user_id: [], //角色名称
      },
      user_id_list: [],
      tableDataUser: []
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
        this.getDown()
      }else{
        this.info = {
          user_id: [], //角色名称
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    // 成员列表
    async getList() {
      await Authority.findUser({role_id: this.id}).then(res => {
        if(res.code === 200 && res.result){
          this.tableDataUser = res.result
        }
      })
    },
    // 成员下拉
    async getDown() {
      await Authority.findDown().then(res => {
        if(res.code === 200 && res.result){
          this.user_id_list = res.result
        }
      })
    },
    resetData() {
      this.info = {
        user_id: null, //角色名称
      }
    },
    submit() {
      if(!this.info.user_id) return this.$message.error('请选择成员')
      Authority.addUser({role_id: this.id, ...this.info}).then(res => {
        if(res.code === 200){
          this.getList()
          this.resetData()
          this.selectShow = false
        }
      })
    },
    cancel() {
      this.resetData()
      this.fast = false
    },
    cancelUser() {
      this.resetData()
      this.selectShow = false
    },
    // 选中序号
    handleSelectionChange(val) {
      this.idArr = val.map(item => Number(item.relationId))
    },
    // 批量删除
    memberDel() {
      this.$confirm(`确认要删除吗？`).then(() => {
        Authority.delUserList({relationId: this.idArr}).then(res => {
          if(res.code === 200){
            this.getList()
          }
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon{
  right: 562px;
}
</style>
