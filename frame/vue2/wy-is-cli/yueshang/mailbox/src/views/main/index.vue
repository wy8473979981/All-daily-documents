<template>
  <!-- 首页列表模板 -->
  <div class="app-page-main">
    <app-ysn-nav-bar title="联席总裁信箱" :left-arrow="false" @clickRight="changeUser">
      <template #right>
        <span>{{userType===1?'使用者':'总裁'}}</span>
      </template>
    </app-ysn-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="selectNoReadCount" style="height: 90%;">
      <van-row type="flex" v-if="2 === userType">
        <van-col span="24" @click="openSearch">
          <app-ysn-search :search="query.search" :disabled="true" ></app-ysn-search>
        </van-col>
      </van-row>
      <div class="van-hairline--bottom"></div>
      <app-ysn-list :list="userType===1?staticItems:(userType===2?staticItems2:[])" @callback="showPop"></app-ysn-list>
    </van-pull-refresh>
    <app-ysn-popup-write :show="showPopup" sindex="0" :pageType="pageType" setBottom @hidePop="hidePop"></app-ysn-popup-write>
  </div>
</template>
<script>
import iconWrite from "../../assets/images/icon-write.png";
import iconFile from "../../assets/images/icon-file.png";
import iconEmail from "../../assets/images/icon-email.png";
import iconSent from "../../assets/images/icon-sent.png";
import iconDeleted from "../../assets/images/icon-deleted.png";
import iconFiles from "../../assets/images/icon-files.png";
import iconClose from "../../assets/images/icon-close.png";

export default {
  data() {
    return {
      pageType: 99,
      staticItems: [
        {title: '写信', icon: iconWrite, url: '', call: true,num: null},
        {title: '草稿箱', icon: iconFile, url: '/draftBox',num: null},
        {title: '收件箱', icon: iconEmail, url: '/getEmail',num: 0},
        {title: '已发送', icon: iconSent, url: '/sentEmail',num: null},
        {title: '已删除', icon: iconDeleted, url: '/delEmail',num: null}
      ],
      staticItems2: [
        {title: '收件箱', icon: iconEmail, url: '/getEmail',num: 0},
        {title: '已发送', icon: iconSent, url: '/sentEmail',num: null},
        {title: '已删除', icon: iconDeleted, url: '/delEmail',num: null}
      ],
      showPopup: false, // 写信弹窗
      query: {
        duty: null, // popup duty value
        desc: null,
        content: null
      },
      title: '请选择',
      iconFiles: iconFiles,
      iconClose: iconClose,
      userType: this.$store?this.$store.state.userType:null,
      refreshing: false,
    };
  },
  watch: {
    '$store.state.userInfo'(n) {
      if(n) {
        this.selectNoReadCount()
      }
    }
  },
  created() {
    this.selectNoReadCount()
  },
  methods: {
    async selectNoReadCount() {
      if(!this.$store || !this.$store.state.userInfo) {
        return
      }
      const {uiid, userName} = this.$store.state.userInfo
      await this.$axios.common.selectNoReadCount({userId: uiid,userName},null, false).then(res => {
        this.refreshing = false
        console.log('获取未读消息数：', res)
        if(res && res.code === '1'){
          this.staticItems[2].num = res.data || 0
          this.staticItems2[0].num = res.data || 0
          this.$forceUpdate()
        }
      }).catch(e => {
        this.refreshing = false
      })
    },
    goToTop() {
      let dom = document.querySelector(this.querySelect);
      dom.scrollTop = 0;
    },
    showPop(data) {
      console.log('data=',data)
      this.showPopup = true
    },
    hidePop() {
      this.showPopup = false
    },
    changeUser() {
      this.userType = this.$store.state.userType
      this.userType = this.userType === 1?2:1
      this.$store.commit('setUserType',this.userType)

      setTimeout(() => {
        this.getUserInfo()
      },200)
      // this.getUserInfo() // 获取用户信息
      // this.mailBoxEnum() // 数据字典
    },
    openSearch() {
      console.log('打开搜索页面')
      this.$router.push({path: '/searchEmail'})
    },
    async getUserInfo() {
      const {uiid, token} = this.$store.state.user
      await this.$axios.common.getUserInfo({uiid, token, queryUiid: uiid}, null, false).then(res => {
        // console.log('获取用户信息：', res)
        if(res && res.data) {
          res.data.uiid = uiid
          if(!this.$store || !this.$store.state.userInfo){
            this.$store.commit('setUserInfo', res.data)
            // this.$router.go(0)
          }else{
            this.$store.commit('setUserInfo', res.data)
          }
          if(this.$store && this.$store.state.opList) {
            const user = this.$store.state.opList.admin[uiid]
            if(user) {
              this.userType = 2
              this.$store.commit('setUserType', 2)
            }else{
              this.userType = 1
              this.$store.commit('setUserType', 1)
            }
          }
        }
      }).catch(error => {
        this.refreshCode()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.app-page-main {
  background-color: #FFFFFF;
  height: 100%;
}

</style>
