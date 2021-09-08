<template>
  <!-- 问责 -->
  <div class="accountable-box">
    <el-dialog
      title="问责"
      :visible.sync="fast"
      width="450"
      v-dialogDrag
      >
      <el-row :gutter="24" class="accountable-row">
        <el-col :span="5" class="accountable-col">
          <span>责任人</span>
        </el-col>
        <el-col :span="19" class="accountable-col">
          <el-input v-model="info.principal" @focus="showSearchUser = true" readonly placeholder="请选择"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="accountable-row">
        <el-col :span="5" class="accountable-col">
          <span>反馈时间</span>
        </el-col>
        <el-col :span="19" class="accountable-col">
          <el-date-picker
            v-model="info.targetDate"
            value-format="yyyy-MM-dd"
            clearable
            placeholder="请选择"
            style="width: 100%;">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="accountable-row">
        <el-col :span="5" class="accountable-col">
          <span>问责内容</span>
        </el-col>
        <el-col :span="19" class="accountable-col">
          <el-input v-model="info.message" type="textarea" :rows="3" placeholder="请输入"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
    <search-user :open="showSearchUser" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Approval from '@/apis/apis/approval';

export default {
  name: 'accountable',
  props: ['open'],
  data() {
    return {
      showSearchUser: false,
      info: {
        applyTypeCd: 2, //审批方式
        principal: null, //被问责人
        userCd: null, //被问责人cd
        targetDate: null, //问责时间
        message: null, //问责内容
      }
    }
  },
  created() {
  },
  computed: {
    ...mapState(['userInfo', 'approveDetail']),
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  mounted() {

  },
  methods: {
    closeSearhUser(val) {
      if (val) {
        this.info.principal = val.userName
        this.info.userCd = val.userCd
      }
      this.showSearchUser = false
    },
    resetData() {
      this.info = {
        principal: null, //被问责人
        userCd: null, //被问责人cd
        targetDate: null, //问责时间
        message: null, //问责内容
      }
    },
    submit() {
      this.$message.closeAll()
      if (!this.info.principal) return this.$message.error('请选择问责人')
      if (!this.info.targetDate) return this.$message.error('请选择反馈时间')
      if (!this.info.message) return this.$message.error('请输入问责内容')
      const params = {
        ...this.info,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid,
        approveId: this.$route.query.id,
        displayNo: this.approveDetail.pmApprove.approveNo
      }
      Approval.insertCenter(params).then(res => {
        if(res.code == 1){
          this.resetData()
          this.$message.success('操作成功')
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
.accountable-box {
  .accountable-row {
    margin-top: 5px;
    .accountable-col {
      span {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
