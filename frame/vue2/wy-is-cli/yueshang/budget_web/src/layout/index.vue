<template>
  <el-container>
    <el-aside v-if="!isShowContent" :width="isCollapse ? '50px' : '160px'" class="hidden-sm-and-down" :class="{'smlogo':isCollapse}">
      <div class="logo-box">
        <i class="logo" :style="{'background-image': isCollapse ? 'url(' + require('../../static/img/bl/bl_amp_logo_small.png') + ')' : 'url(' + require('../../static/img/bl/bl_amp_logo.png') + ')'}" @click="goHomePage()" title="AMP"></i>
      </div>
      <transition name="el-zoom-in-center">
        <nav-list :collapse="isCollapse" />
      </transition>
    </el-aside>
    <el-container style="width: 90%;width: calc(100vw - 160px);">
      <el-header v-if="!isShowContent" height="44px" style="justify-content: space-between;">
        <!-- <h1 class="yueworld">AMP<span></span></h1> -->
        <div class="tool-collapse" :style="{'left': isCollapse ? '71px' : '181px'}" @click="collapseShow">
          <!-- <i :class="isCollapse ? 'el-icon-more-outline' : 'el-icon-more'"></i> -->
          <img v-if="!isCollapse" src="@images/collapseBack.png" alt="">
          <img v-if="isCollapse" src="@images/collapseShow.png" alt="">
        </div>
        <el-tabs v-model="routePath" type="card" @tab-click="subMenu">
          <el-tab-pane v-for="(list, i) in subMenuList" :key="i" :label="list.meta.title" :name="list.path"></el-tab-pane>
        </el-tabs>
        <div class="tool-bar" style="padding-bottom: 0!important;">
          <!--          <screenfull id="screenfull" class="right-menu-item hover-effect" :isFullscreen="true" />-->
          <span class="username">{{userInfo.username}}</span>
          <span class="login-out" @click="logout">退出</span>
          <!--          <el-tooltip placement="bottom" content="退出">-->
          <!--            <i class="btn-logout el-icon-switch-button pointer" @click="logout"></i>-->
          <!--          </el-tooltip>-->
        </div>
      </el-header>
      <el-main>
        <!--        <el-breadcrumb separator="" class="page-title">-->
        <!--&lt;!&ndash;          <el-breadcrumb-item :to="{ path: '/' }">{{matched.meta.title}}</el-breadcrumb-item>&ndash;&gt;-->
        <!--          <el-breadcrumb-item v-show="!$route.meta.breadcrumb">{{$route.meta.title}}</el-breadcrumb-item>-->
        <!--          <el-breadcrumb-item v-show="$route.meta.breadcrumb">{{$route.meta.breadcrumb}}</el-breadcrumb-item>-->
        <!--        </el-breadcrumb>-->
        <el-breadcrumb class="app-breadcrumb" separator=">">
          <transition-group name="breadcrumb">
            <template v-for="(item,index) in levelList">
              <el-breadcrumb-item v-if="item.meta.title && item.meta.visible && !item.meta.breadcrumbVisible" :key="index">
                <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ generateTitle(item,item.redirect||item.path)}}</span>
                <router-link v-else :to="{path:item.redirect||item.path,query:routerQuery}">{{ generateTitle(item,item.redirect||item.path)}}</router-link>
              </el-breadcrumb-item>
            </template>
          </transition-group>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navList from '@comps/navList'
import sideBar from './sideBar'
import { mapState, mapMutations, mapGetters } from 'vuex'
import user from '@apis/user'
import { fixed } from '../router/routes'
import Screenfull from '@comps/Screenfull'

export default {
  components: {
    sideBar, navList, Screenfull
  },
  data() {
    return {
      routerQuery: null,
      subMenuList: [],
      routePath: '', // 2级路由path
      isCollapse: false,
      isShowContent: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['companyName']),
    matched() {
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
  watch: {
    // $route: {
    //   handler(val, oldVal) {
    //     // console.log(val, oldVal)
    //     this.routerMatch()
    //   },
    //   deep: true
    // },
    $route() {
      this.getBreadcrumb()

    }
  },
  created() {
    this.isShowContent = this.$store.state.isShowContent

    this.routerMatch()
    this.getBreadcrumb()
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    async logout() {
      const res = await user.userLogout({ token: localStorage.getItem('ys_contract_token') })
      if (res.code === 200 || res.code === 999) {
        this.$timeoutRouter.push({ name: 'login' })
        // localStorage.removeItem('ys_contract_token')
        // localStorage.removeItem('ys_contract_permission')
        // localStorage.removeItem('ys_contract_layout')
        localStorage.clear()
      }
    },
    generateTitle(item, path) {
      let title = item.meta.title;
      return (title != '收入' && title != '费用支出' && title != '汇总'&& title != '利润表') ? title : (item.path != '/management/plait/income' && item.path != '/management/plait/disburse' && item.path != '/management/plait/summary'&&item.path != '/management/budgetView/income' && item.path != '/management/budgetView/disburse' && item.path != '/management/budgetView/summary'&& item.path != '/management/budgetView/profit') ? title : `${this.companyName||''}${item.meta.title}`
    },
    goHomePage() {
      this.$router.push({
        path: '/'
      })
    },
    subMenu(tab, event) {
      if (this.$route.path.split('/')[1] === 'plan' && this.routePath === 'planShow') {
        window.open(location.origin + '/#' + `/${this.routePath}`)
        window.location.reload()
      } else {
        this.$router.push(`/${this.$route.path.split('/')[1]}/${this.routePath}`)
      }
    },
    getBreadcrumb() {
      const { params } = this.$route
      this.routerQuery = this.$route.query;
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
      })
      // if (this.$route.path.includes('/management/plait/feeSchedule')) {
      //   if (!this.routerQuery.proplan) {
      //     matched.splice(1, 1);
      //   }
      // }
      // if (this.$route.path.includes('/management/plait/otherIncome')) {
      //   if (!this.routerQuery.mandate) {
      //     matched.splice(1, 1);
      //   }
      // }
      this.levelList = matched
    },
    routerMatch() {
      const pathArr = this.$route.path.split('/')
      const arr = fixed.find(item => {
        return item.path === `/${pathArr[1]}`
      })
      if (arr.children.length) {
        this.subMenuList = arr.children
        this.routePath = `${pathArr[2]}`
      }
    },
    collapseShow() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang='scss' scoped>
.el-aside {
  background: #333f4f;
  overflow: hidden;
  .logo-box {
    // width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    background: #333f4f;
    i.logo {
      width: 106px;
      height: 38px;
      // background: url('../../static/img/bl/bl_amp_logo.png') no-repeat center center;
      background-repeat: no-repeat;
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
  padding-left: 60px;
  background: #e3e7e9;
  display: flex;
  justify-content: flex-end;
  .yueworld {
    position: absolute;
    left: 160px;
    height: 44px;
    line-height: 44px;
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
  .tool-collapse {
    position: absolute;
    height: 44px;
    line-height: 44px;
    font-size: 24px;
    color: #4a90e2;
    cursor: pointer;
  }
  .tool-bar {
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #e3e7e9;
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
      padding: 0 20px 0 20px;
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
    .right-menu-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
.el-main {
  background: #fff;
  overflow-y: auto;
  padding-bottom: 0px;
  padding: 0;
}
.toLink {
  color: #0f96ff;
  cursor: pointer;
}
.page-title {
  color: #778ca2;
  margin-bottom: 14px;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
.el-breadcrumb {
  padding: 20px 20px 0;
}
/* change tabs*/
/deep/ .el-tabs__header {
  margin: 0;
  border: none;
}
/deep/ .el-tabs__header,
/deep/ .el-tabs__nav-wrap,
/deep/ .el-tabs__nav-scroll,
/deep/ .el-tabs__nav {
  height: 100%;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav,
/deep/ .el-tabs__item {
  border: none !important;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border: none !important;
  background-color: #ffffff;
  height: 100%;
}
::v-deep .smlogo {
  .logo-box {
    padding-left: 10px;
    .logo {
      background-size: 30px !important;
    }
  }
  .el-tooltip {
    padding: 0 18px !important;
  }
}
</style>
