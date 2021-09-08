<template>
  <el-container>
    <el-aside width="160px" class="hidden-sm-and-down">
      <div class="logo-box">
        <!-- <i class="logo" @click="goHomePage()" title="AMP"></i> -->
        宝龙网批系统后台
      </div>
      <nav-list/>
    </el-aside>
    <el-container>
      <el-header height="56px" style="justify-content: space-between;">
        <!-- <h1 class="yueworld">AMP<span></span></h1> -->
        <el-tabs v-model="routePath" @tab-click="subMenu">
          <el-tab-pane v-for="(list, i) in subMenuList" :key="i" :label="list.meta.title" :name="list.path"></el-tab-pane>
        </el-tabs>
        <div class="tool-bar">
          <span class="username">{{userInfo.username}}</span>
          <span class="login-out" @click="logout">退出</span>
<!--          <el-tooltip placement="bottom" content="退出">-->
<!--            <i class="btn-logout el-icon-switch-button pointer" @click="logout"></i>-->
<!--          </el-tooltip>-->
        </div>
      </el-header>
      <el-main ref="elMain">
        <!-- <el-breadcrumb separator=">" class="page-title"> -->
<!--          <el-breadcrumb-item :to="{ path: '/' }">{{matched.meta.title}}</el-breadcrumb-item>-->
          <!-- <el-breadcrumb-item v-show="!$route.meta.breadcrumb">{{$route.meta.title}}</el-breadcrumb-item>
          <el-breadcrumb-item v-show="$route.meta.breadcrumb">{{$route.meta.breadcrumb}}</el-breadcrumb-item> -->
        <!-- </el-breadcrumb> -->
<!--        <el-divider></el-divider>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navList from '../components/navList'
import { mapState, mapMutations } from "vuex"
import user from '../apis/apis/user'
import { fixed } from '../router/routes'

export default {
  data() {
    return {
      subMenuList: [],
      routePath: '', //2级路由path
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    matched () {
      const routes2 = [
        {
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
  watch:{
    $route:{
      handler(val,oldVal){
        // console.log(val, oldVal)
        this.routerMatch()
      },
      deep:true
    }
  },
  created() {
    this.routerMatch()
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.elMain)
    })
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    async logout() {
      // const res = await user.userLogout({token: localStorage.getItem('ys_contract_token')})
      // if (res.code === 200 || res.code === 999) {
      //   this.$timeoutRouter.push({name: 'login'})
      //   localStorage.removeItem('ys_contract_token')
      // }
      localStorage.removeItem('ys_contract_token');
      this.$timeoutRouter.push({name: 'login'})
    },
    goHomePage() {
      this.$router.push({
        path: '/'
      })
    },
    subMenu(tab, event) {
      this.$router.push(`/${this.$route.path.split("/")[1]}/${this.routePath}`);
    },
    routerMatch() {
      const pathArr = this.$route.path.split("/")
      let arr = fixed.find(item => {
        return item.path === `/${pathArr[1]}`
      })
      if(arr.children.length) {
        this.routePath = `${pathArr[2]}`;
        this.subMenuList = arr.children.filter(e => e.path == this.routePath);
      }
      console.log(this.routePath, this.$route)
    }
  },
  components: {
    navList
  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  background: #FFFFFF;
  overflow: hidden;
  .logo-box {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    background: #FFFFFF;
    i.logo{
      width: 106px;
      height: 38px;
      background: url('../../static/img/zj/zjdf_logo.png') no-repeat center center;
      background-size: contain;
      cursor: pointer;
    }
  }
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
.el-header {
  background: #FFFFFF;
  display: flex;
  justify-content: flex-end;
  .yueworld {
    position: absolute;
    left: 160px;
    height: 56px;
    line-height: 56px;
    font-weight: 400;
    font-size: 20px;
    color: #778CA2;
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
    >*:not(:first-child){
      margin-left: 10px;
    }
    .username, i.btn-logout{
      color: #333333;
        font-size: 14px;
    }
    .login-out{
        color: #D9E2EC;
        padding: 0 20px 0 20px;
        font-size: 14px;
        cursor:pointer;
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
  background: #F8FAFB;
  overflow-y: auto;
  /*min-height: calc(100vh - 56px);*/
}
.toLink {
  color: #0f96ff;
  cursor: pointer;
}
.page-title{
  color: #778CA2;
  margin-bottom: 14px;
}
::v-deep .el-tabs__nav-wrap::after{
  height: 0;
}
</style>
