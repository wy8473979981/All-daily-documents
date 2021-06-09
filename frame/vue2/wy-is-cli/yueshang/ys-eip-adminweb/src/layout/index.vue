<template>
  <el-container>
    <el-header height="48px" style="justify-content: space-between;">
      <div class="logo-box">
        <i class="logo" @click="goHomePage()" title="AMP"></i>
      </div>
      <div class="system-text">交互中台管理系统</div>
      <div class="tool-bar">
        <span class="username">{{userInfo.username}}</span>
        <span class="login-out" @click="logout">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="189px" class="hidden-sm-and-down">
        <ysNNavList />
      </el-aside>
      <el-main ref="elMain">
        <div class="sub-menu-title" v-if="subMenuList.length == 0">{{ subMenuTitle}}</div>
        <el-tabs v-model="routePath" @tab-click="subMenu">
          <el-tab-pane class="sub-menu-title" v-for="(list, i) in subMenuList" :key="i" :label="list.meta.title" :name="list.path">
          </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  mapState,
  mapMutations
} from "vuex"
import user from '../apis/apis/user'
import {
  fixed
} from '../router/routes'

export default {
  data () {
    return {
      subMenuTitle: '',
      subMenuList: [],
      routePath: '', //2级路由path
    };
  },
  computed: {
    ...mapState(["userInfo", 'sysInfo']),
    matched () {
      const routes2 = [{
        path: '/base',
        meta: {
          title: '基础信息',
          icon: 'el-icon-coin',
          visible: true
        }
      },
      {
        path: '/appraisal',
        meta: {
          title: '价值评估',
          icon: 'el-icon-edit-outline',
          visible: true
        }
      }
      ]
      const parentPath = `/${this.$route.path.split('/')[1]}`
      return routes2.find(item => {
        return item.path === parentPath
      })
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        // console.log(val, oldVal)
        this.routerMatch()
      },
      deep: true
    }
  },
  created () {
    this.routerMatch()
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$refs.elMain)
    })
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    async logout () {
      try {
        let ysContractToken = JSON.parse(localStorage.getItem('ys_contract_token'))
        let token = ysContractToken && ysContractToken.token
        const res = await this.$axios.loginServe.loginOut({ token: token })
        if (res.code == 200 || res.code == 511) {
          localStorage.removeItem('ys_contract_token');
          this.$timeoutRouter.push({ name: 'login' })
          this.$message.success('退出成功')
        } else {
          this.$message.error('退出失败')
        }
      } catch (e) {
        console.log(e)
      }
    },
    goHomePage () {
      this.$router.push({
        path: '/'
      })
    },
    subMenu (tab, event) {
      this.$router.push(`/${this.$route.path.split("/")[1]}/${this.routePath}`);
    },
    routerMatch () {
      const pathArr = this.$route.path.split("/")
      let arr = fixed.find(item => {
        return item.path === `/${pathArr[1]}` || item.redirect == `/${pathArr[1]}`
      })
      // console.log(fixed, arr, pathArr, 'sdsdsds')
      if (arr) {
        if (arr.children.length) {
          this.routePath = `${pathArr[2]}`;
          this.subMenuList = arr.children.filter(e => e.path == this.routePath);
          //this.subMenuList = arr.children;
        } else {
          this.subMenuList = []
        }
        this.subMenuTitle = arr.meta.title;
        // console.log(this.routePath, this.$route)
      }

    }
  },
  components: {

  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  background: #ffffff;
  overflow: hidden;
  border-right: 1px solid #f0f2f7;

  ul.el-menu {
    li {
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.logo-box {
  width: 165px;
  height: 48px;
  display: flex;
  align-items: center;
  background: #ffffff;
  color: #ffffff;

  i.logo {
    width: 82px;
    height: 29px;
    background: url("../assets/images/logo.png") no-repeat center center;
    background-size: contain;
    cursor: pointer;
  }
}

.system-text {
  flex: 1;
  padding-left: 20px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #1c1c1c;
  line-height: 36px;
}

.el-header {
  background: #ffffff;
  box-shadow: 0px 8px 7px 0px rgba(224, 229, 235, 0.25);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  padding: 0 20px 0 24px;

  .yueworld {
    position: absolute;
    left: 160px;
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 20px;
    color: #778ca2;

    span {
      position: absolute;
      top: -10px;
      left: 206px;
      font-weight: 100;
      font-size: 10px;
      color: #fff;
    }
  }

  .tool-bar {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;

    > *:not(:first-child) {
      margin-left: 10px;
    }

    .username,
    i.btn-logout {
      color: #333333;
      font-size: 14px;
    }

    .login-out {
      color: #333333;
      padding: 0 0px 0 20px;
      font-size: 14px;
      cursor: pointer;
    }

    img {
      width: 40px;
      height: 40px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      border-radius: 50%;
      border: 0;
    }
  }
}

.el-main {
  padding: 0 20px 10px;
  background: #fff;
  overflow-y: auto;
  /*min-height: calc(100vh - 56px);*/
}

.toLink {
  color: #0f96ff;
  cursor: pointer;
}

.page-title {
  color: #778ca2;
  margin-bottom: 14px;
}
::v-deep .el-tabs {
  margin-bottom: 10px;
  .el-tabs__header {
    margin: 0px;
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      position: relative;
      height: 36px;
      line-height: 36px;
      padding-left: 0px;
      padding-right: 21px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c1c1c;
      &.is-active {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #1c1c1c;
      }
      &:hover {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: #4876ef;
      }
      &::after {
        // position: absolute;
        // right: 3px;
        // top: 13px;
        // content: "";
        // font-size: 0;
        // padding: 10px 3px 1px;
        // margin-left: 6px;
        // border-left: 1px solid #f0f2f7;
      }
    }
  }
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
.sub-menu-title {
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #1c1c1c;
  line-height: 36px;
}
</style>
