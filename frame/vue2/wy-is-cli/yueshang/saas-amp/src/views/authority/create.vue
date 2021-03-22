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
            <h3 v-show="!id">新增</h3>
            <h3 v-show="id">编辑</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <!-- <h3 class="min-title">存量资产</h3> -->
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-min">
                  <span>角色名称</span>
                  <el-input class="required" v-model="info.role_name" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="24">
                <div class="d-min">
                  <span>备注</span>
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入"
                    v-model="info.remark">
                  </el-input>
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
  name: 'Create',
  props: ['open', 'id', 'row'],
  data() {
    return {
      info: {
        role_name: null, //角色名称
        remark: null, //备注
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
        // this.getList()
      }else{
        this.info = {
          role_name: null, //角色名称
          remark: null, //备注
        }
      }
    },
    row(nv) {
      this.info = JSON.parse(JSON.stringify(nv))
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    resetData() {
      this.info = {
        role_name: null, //角色名称
        remark: null, //备注
      }
    },
    submit() {
      if(!this.info.role_name) return this.$message.error('请输入角色名称')
      if (!this.id) {
        Authority.add(this.info).then(res => {
          if(res.code === 200){
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      } else {
        Authority.update({roleId: this.id, ...this.info}).then(res => {
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
      this.resetData()
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
