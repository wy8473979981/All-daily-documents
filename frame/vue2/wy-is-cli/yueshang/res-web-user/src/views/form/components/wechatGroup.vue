<template>
  <div>
      <el-dialog
      title="发起企业微信群"
      :visible.sync="fast"
      width="450px"
      class="yjx"
      v-dialogDrag
      >
      <p style="margin-bottom:10px">企业微信群将有如下成员，请确认后发起：</p>
			<span v-for="i in userList" :key="i">{{i + ';'}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="createWeChat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import approval from '@/apis/apis/approval';
export default {
  name: 'Detail',
  props: ['showWechatDialog', 'id'],
  data() {
    return {
			userList: []
    }
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        return this.showWechatDialog
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    fast(val) {
      if(val) {
        this.getWeChatUserList();
      }
    }
  },
  methods: {
    cancel() {
      this.fast = false;
    },
    share() {

    },
    getWeChatUserList() {
      approval.getWeChatUserList(this.$route.query.id).then(res => {
        if (res.code == 1) {
          this.userList = res.data;
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    },
    createWeChat() {
      approval.createWeChat({approveId:this.$route.query.id,userId:this.userInfo.userid}).then(res => {
        if (res.code == 1) {
          this.$message.success('发起企业微信群成功')
          this.cancel();
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

</style>