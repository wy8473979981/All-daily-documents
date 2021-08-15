<template>
  <!-- 延期申请 -->
  <div class="delay-box">
    <el-dialog
      title="申请延期"
      :visible.sync="fast"
      width="500px"
      v-dialogDrag
      >
      <p class="waring">友情提示：请联系“发起中心总经理”进行处理</p>
      <el-row :gutter="24" class="delay-row">
        <el-col :span="5" class="delay-col">
          <span>延期时间</span>
        </el-col>
        <el-col :span="9" class="delay-col">
          <el-input v-model="info.delayTime" v-filter-check-input2 maxlength="2" placeholder="请输入"></el-input>
        </el-col>
        <el-col :span="10" class="delay-col">
          <span>小时（最多24小时）</span>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="delay-row">
        <el-col :span="5" class="delay-col">
          <span>审批方式</span>
        </el-col>
        <el-col :span="19" class="delay-col delay-checkbox">
          <!-- <el-checkbox v-model="info.applyTypeCd">表单发起人</el-checkbox> -->
          <el-radio v-model="info.applyTypeCd" :label="2">表单发起人</el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="delay-row">
        <el-col :span="5" class="delay-col">
          <span>申请原因</span>
        </el-col>
        <el-col :span="19" class="delay-col delay-checkbox">
          <el-input v-model="info.applyRemark" type="textarea" :rows="3" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Approval from '@/apis/apis/approval';

export default {
  name: 'Delay',
  props: ['open'],
  data() {
    return {
      projectList: [],
      info: {
        delayTime: null, //延期时间
        applyTypeCd: 2, //审批方式
        applyRemark: null, //申请原因
      }
    }
  },
  created() {
    // this.getProList()
  },
  computed: {
    ...mapState(['userInfo']),
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
    'info.delayTime'(val) {
      if (val > 24) {
        this.info.delayTime = 24
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
        }
      })
    },
    resetData() {
      this.info = {
        delayTime: null, //延期申请
        applyTypeCd: 2, //审批方式
        applyRemark: null, //申请原因
      }
    },
    submit() {
      this.$message.closeAll()
      if (!this.info.delayTime) return this.$message.error('请填写延期时间')
      if (!this.info.applyRemark) return this.$message.error('请填写申请原因')
      const params = {
        ...this.info,
        applyUserId: this.userInfo.userid,
        applyUserName: this.userInfo.username,
        approveId: this.$route.query.id
      }
      Approval.savePmApproveDelay(params).then(res => {
        if(res.code == 1){
          this.resetData()
          this.$message.success('申请成功')
          this.$emit('close', {
            fast: false,
            reload: true
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel() {
      this.resetData()
      this.fast = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.delay-box {
  .waring {
    color: #F5A623;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .delay-row {
    margin-top: 5px;
    .delay-col {
      span {
        height: 30px;
        line-height: 30px;
      }
    }
    .delay-checkbox {
      line-height: 30px;
    }
  }
}
</style>
