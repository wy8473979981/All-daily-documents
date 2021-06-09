<template>
  <!-- 共享 -->
  <ui-main class="shared-box">
    <div class="shared-user">
      <h2>已共享给：</h2>
      <ul>
        <li v-for="(item, index) in selectUserList" :key="index">
          <span>{{ item.userName }}</span>
          <van-icon name="cross" @click="removeUser(item)" />
        </li>
        <li class="add-user" @click="showUserList">
          <van-icon name="plus" />
        </li>
      </ul>
    </div>
    <div class="shared-remark">
      <h2>请输入共享原因：</h2>
      <van-field
        v-model="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入共享原因"
        show-word-limit
      />
      <van-button type="info" @click="submit">确定</van-button>
      <van-button plain type="info" @click="$router.go(-1)">取消</van-button>
    </div>
    <!-- 组织架构 -->
    <search-user :open="fast" @close="closeFast"></search-user>
  </ui-main>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import approval from '@/apis/apis/approval'
import searchUser from './components/searchUser'
export default {
  data() {
    return {
      fast: false,
      content: null,
    }
  },
  computed: {
    ...mapState(['selectUserList', 'userInfo'])
  },
  components: {
    searchUser
  },
  created() {
    
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapMutations(['saveBlOrgTreeList']),
    // 获取宝龙机构人员树
    findBlOrgTree() {
      approval.findBlOrgTree().then(res => {
        if (res.code == 1) {
          this.saveBlOrgTreeList(res.data)
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    // 获取共享人员列表
    getList () {
      const param = {
        approveId: this.userInfo.approveId,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid
      }
      approval.sharedFindUserByApproveId(param).then(res => {
        if(res.code == 1){
          if (res.data) {
            this.$store.state.selectUserList = res.data
          } else {
            this.$store.state.selectUserList = []
          }
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    showUserList () {
      this.fast = true
      if (!this.$store.state.bljtOrgTreeList.text) {
        this.findBlOrgTree()
      }
    },
    closeFast (res) {
      this.fast = res.fast
    },
    removeUser (item) {
      for (let key in this.selectUserList) {
        if (item.userName == this.selectUserList[key].userName) {
          this.selectUserList.splice(key, 1)
        }
      }
    },
    submit () {
      if (!this.selectUserList[0]) return this.$toast.fail('请选择共享人')
      if (!this.content) return this.$toast.fail('请输入共享原因')
      const param = {
        content: this.content,
        createdUserCd: this.userInfo.userid,
        approveId: this.userInfo.approveId,
        msgType: 'S',
        userList: this.selectUserList.map(e => e.userCd),
        currApproveStepId: this.$route.query.currApproveStepId
      }
      approval.saveApproveMessage(param).then(res => {
        if(res.code == 1){
          this.$toast.success('共享成功')
          this.$router.push('/detail')
        } else {
          this.$toast.fail(res.message)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color-header: #257EE2;
$color: #26a2ff;

.shared-box {
  background-color: #FFFFFF;
  h2 {
    font-size: 14px;
    font-weight: 400;
  }
  .shared-user {
    padding: 5px 10px 20px;
    border-bottom: 10px solid #ECF0F2;
    ul {
      padding: 0;
      li {
        display: flex;
        justify-content: space-between;
        height: 33px;
        line-height: 33px;
        font-size: 14px;
        background-color: #F4F5F5;
        margin-bottom: 10px;
        padding: 0 10px;
        i {
          line-height: 33px;
        }
      }
      .add-user {
        justify-content: center;
        background-color: #FFFFFF;
        border: 1px solid #E6E6E6;
      }
    }
  }
  .shared-remark {
    padding: 10px;
  }
}
</style>
<style>
.shared-remark .van-button--info {
  width: 100%;
  margin-top: 30px;
}
.shared-remark .van-button--plain.van-button--info {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-top: 15px;
}
</style>
