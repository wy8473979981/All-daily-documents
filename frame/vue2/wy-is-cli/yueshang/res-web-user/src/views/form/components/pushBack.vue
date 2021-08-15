// 推送退回组件
<template>
  <div>
    <el-dialog
      class="yjx"
      title="推送退回"
      :visible.sync="fast"
      width="450px"
      v-dialogDrag
      >
      <span class="yjx-title">请输入退回原因</span>
      <el-input v-model="backMsg" type="textarea" :rows="3"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fast = false">取 消</el-button>
        <el-button type="primary" @click="doPushBack">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import approval from '@/apis/apis/approval';
export default {
  name: 'Detail',
  props: ['showPushBackDialog'],
  data() {
    return {
      backMsg: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        return this.showPushBackDialog
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  methods: {
    cancel() {
      this.fast = false;
    },
    doPushBack() {
      this.$message.closeAll()
      if(!this.backMsg) {
        this.$message.error('退回原因不能为空')
        return 
      }
      const param = {
        approveId: this.$route.query.id,
        backMsg: this.backMsg,
        userId: this.userInfo.userid
      }
      approval.doPushBack(param).then(res => {
        if (res.code == 1) {
          this.$message.success('推送退回成功');
          this.$emit('confirm', {fast: false});
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .yjx-title {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>