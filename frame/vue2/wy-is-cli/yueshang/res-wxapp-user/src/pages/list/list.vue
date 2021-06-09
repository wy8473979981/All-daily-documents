<template>
  <ui-main v-if="false">
    <van-row class="search-box">
      <van-col span="11">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="10" class="col2-box">
        <van-field v-model="text" right-icon="search" />
      </van-col>
      <van-col span="3" class="col3-box">
        <van-icon name="replay" />
      </van-col>
    </van-row>
    <div class="list-box">
      <van-swipe-cell>
        <van-card
          num="07-22"
          currency=""
          price="朱伟峰 | 电商中心"
          desc="3801638 设计变更审批表"
          title="一层增加钢结构下挂梁变更"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <div style="padding: 20px 12px;">
      <van-button type="info" @click="$router.push('/detail')" style="width: 100%;">详情</van-button>
    </div>
  </ui-main>
</template>
<script>
import { mapMutations } from 'vuex'
import login from '@/apis/apis/login'
export default {
  data() {
    return {
      value1: 1,
      value2: 1,
      text: null,
      option1: [
        {
          text: '我的待办',
          value: 1
        },
        {
          text: '我的已办',
          value: 2
        }
      ],
      option2: [
        {
          text: '新增',
          value: 1
        },
        {
          text: '审批中',
          value: 2
        }
      ],
      fast: false,
    }
  },
  components: {

  },
  created() {
    console.log(this.getQueryString('type'),this.$route.query)
  },
  mounted() {
    console.log(this.getQueryString('type'),this.$route.query)
    if (this.getQueryString('loginName') != null && this.getQueryString('enterpriseId') != null && this.getQueryString('ticket') != null && this.getQueryString('timestamp') != null) {
      this.getLoginSSO()
    } else if(this.getQueryString('type') == 'ssoLogin') {
      console.log('进入单点登录')
      this.parseTokenToUser()
    }
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    // 获取地址参数
    getQueryString(name) {
      let href = window.location.href
      let reg = new RegExp(name + "=([^&]+)")
      let march = reg.exec(href)
      if(march != null){
          return march[1]
      }
      return null
    },
     // 免授权单点登录
    parseTokenToUser() {
      const params = {
        approveId: this.getQueryString('approveId'),
        processId: this.getQueryString('processId'),
      }
      const tempToken = this.getQueryString('token');
      const tempUserInfo = {token:tempToken};
      localStorage.setItem('ys_contract_token', JSON.stringify(tempUserInfo));
      login.parseTokenToUser().then(res => {
        if (res.code == 1) {
          const userInfo = {
            username: res.data.userInfo.userName,
            userid: res.data.userInfo.uiid,
            userCd: res.data.userInfo.userCd,
            centerOrgName: res.data.userInfo.centerOrgName,
            centerOrgCd: res.data.userInfo.centerOrgCd,
            orgName: res.data.userInfo.orgName,
            orgCd: res.data.userInfo.orgCd,
            positionName: res.data.userInfo.positionName,
            positionCd: res.data.userInfo.positionCd,
            enterpriseId: res.data.userInfo.enterpriseId,
            token: res.data.userInfo.token,
            permissionLevelName: res.data.userInfo.permissionLevelName,
            processId: params.processId,
            approveId: params.approveId,
          }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          this.$router.push('/detail')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 单点登录
    getLoginSSO() {
      const paramsSSO = {
        loginName: this.getQueryString('loginName'),
        enterpriseId: this.getQueryString('enterpriseId'),
        ticket: this.getQueryString('ticket'),
        timestamp: this.getQueryString('timestamp'),
        approveId: this.getQueryString('approveId'),
        processCode: this.getQueryString('processCode'),
        openType: this.getQueryString('openType'),
      }
      login.getUserinfo(paramsSSO).then(res => {
        if (res.code == 1) {
          const userInfo = {
            userid: res.data.loginName,
            username: res.data.name,
            enterpriseId: res.data.enterpriseId,
            pmTemplateId: res.data.pmTemplateId,
            processId: res.data.processId,
            approveId: paramsSSO.approveId,
            token: res.data.token,
          }
          this.saveUserInfo(userInfo)
          localStorage.setItem('ys_contract_token', JSON.stringify(userInfo))
          this.$router.push('/detail')
          // window.location.href = window.location.href.split('#')[0]
        } else {
          this.$message.error(res.message)
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

.search-box {
  background-color: $color-header;
  .col2-box {
    padding: 9px 0;
  }
  .col3-box {
    padding: 9px 0;
    text-align: center;
  }
}
</style>
<style>
.search-box .van-dropdown-menu__bar {
  background-color: #257EE2;
}
.search-box .van-dropdown-menu__title {
  color: #FFFFFF;
}
.search-box .van-field {
  padding: 2px 5px;
  background-color: #257EE2;
  border: 1px solid #FFFFFF;
}
.search-box .van-field__control {
 color: #FFFFFF;
}
.search-box .van-icon-search {
  color: #FFFFFF;
  font-size: 22px;
}
.search-box .van-icon-replay {
  color: #FFFFFF;
  font-size: 26px;
  line-height: 28px;
}
.list-box .delete-button {
  height: 100%;
}
</style>
