<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="676px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="6">
            <h3>审批历史</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <!-- <h3 class="min-title">存量资产</h3> -->
            <el-row :gutter="20" type="flex" justify="space-between" align="middle">
              <el-col :span="24" style="text-align: left;">
                <div class="d-min" v-for="(item, index) in tableData" :key="index">
                  <div class="history-status">
                    <span v-if="item.status == 1">上报</span>
                    <span v-if="item.status == 2">条线</span>
                    <span v-if="item.status == 3">驳回</span>
                    <span v-if="item.status == 4">资管</span>
                    <span v-if="item.status == 5">完成</span>
                    <span v-if="item.status == 9">撤回</span>
                  </div>
                  <div class="history-con">
                    <p>
                      <span v-if="item.status == 1 || item.status == 9">姓名：{{ item.admin_name }}</span>
                      <span v-if="item.status == 2">姓名：{{ item.admin_name }}</span>
                      <span v-if="item.status == 3">姓名：{{ item.admin_name }}</span>
                      <span v-if="item.status == 4">姓名：{{ item.admin_name }}</span>
                      <span v-if="item.status == 5">审核通过</span>
                    </p>
                    <p>
                      <span v-if="item.status == 1">备注：</span>
                      <span v-if="item.status == 2 || item.status == 4">备注：</span>
                      <span v-if="item.status == 3">备注：</span>
                      <span v-if="item.status == 5">备注：</span>
                      <span v-if="item.status == 9">备注：</span>
                      <span>{{ item.message }}</span>
                    </p>
                    <p>
                      <span v-if="item.status == 1">时间：</span>
                      <span v-if="item.status == 2 || item.status == 4">时间：</span>
                      <span v-if="item.status == 3">时间：</span>
                      <span v-if="item.status == 5">时间：</span>
                      <span v-if="item.status == 9">时间：</span>
                      <span>{{ item.create_time }}</span>
                    </p>
                  </div>
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
import Audit from '@/apis/apis/audit'
export default {
  name: 'History',
  props: ['open', 'id'],
  data() {
    return {
      info: {
        project_name: null, //角色名称
        project_beizhu: null, //备注
      },
      tableData: []
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
          project_name: null, //角色名称
          project_beizhu: null, //备注
        }
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    // 审批历史
    async getList() {
      await Audit.history({project_verify_id: this.id}).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          if (this.tableData[0].status == '4') {
            this.tableData.unshift({
              admin_name: this.tableData[0].admin_name,
              create_time: this.tableData[0].create_time,
              message: this.tableData[0].message,
              status: 5
            })
          }
        }
      })
    },
    resetData() {
      this.info = {
        project_name: null, //角色名称
        project_beizhu: null, //备注
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
.dialog-close-icon {
  right: 662px;
}
.d-min {
  width: 100%;
  display: inline-flex;
  margin-bottom: 60px;
  position: relative;
  .history-status {
    width: 60px;
    height: 60px;
    line-height: 60px;
    /*border-radius: 50%;*/
    text-align: center;
    color: #fff;
    background-color: #468CEB;
  }
  .history-con {
    padding-left: 20px;
    text-align: left;
    p {
      // width: 550px;
      padding-bottom: 5px;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
  }
}
.d-min::before {
  content: "";
  width: 2px;
  height: 60px;
  background-color: #c0c4cc;
  position: absolute;
  top: 60px;
  left: 29px;
}
.d-min:last-child::before {
  content: "";
  width: 0;
  height: 0;
}
</style>
