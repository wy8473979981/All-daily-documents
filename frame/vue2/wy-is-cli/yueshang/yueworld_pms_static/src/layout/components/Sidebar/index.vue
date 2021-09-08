<template>
  <div :class="{'has-logo':showLogo}">
    <!-- logo -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 搜索 -->
    <search-input @change="searchChange" />
    <!-- 菜单 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-openeds="defaultOpeneds"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in showRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SearchInput from './SearchInput'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SearchInput, SidebarItem, Logo },
  data() {
    return {
      // 搜索框val
      searchVal: '',
      // 默认展开
      defaultOpeneds: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // 首页及待办--数据概览的详情，就选中数据概览
      if (meta.parentName === 'HomeData') return '/Home/HomeData'
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      // 指定父级name
      if (meta.parentName) {
        return this.getRouterPathToName(meta.parentName, this.permission_routes)
      }

      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    showRoutes() {
      const newRouters = JSON.parse(JSON.stringify(this.permission_routes))
      const routersList = this.returnRouters(this.searchVal, newRouters)
      let defaultOpeneds = [...this.getDefaultOpends(routersList)]

      if (this.searchVal === '') {
        const p = this.$route.fullPath.split('/').filter(item => item)
        const pList = []
        p.reduce((preValue, curValue) => {
          pList.push('/' + preValue)
          return preValue + '/' + curValue
        })
        defaultOpeneds = [...pList, this.$route.fullPath]
      }

      this.defaultOpeneds = defaultOpeneds
      return routersList
    }
  },
  // mounted() {
  //   console.log(this.showRoutes)
  // },
  methods: {
    // 搜索框事件
    searchChange(val) {
      this.searchVal = val
    },
    /*
      @type  routers:路由列表
    * @description 递归查询需要展开的路由
    */
    getDefaultOpends(routers) {
      const that = this
      let newRouter = []
      routers.forEach(item => {
        // 如果是hideen的菜单不处理
        if (item.hidden) {
          return
        }

        // path的注入
        newRouter.push(item.path)

        // 有children 继续处理
        if (item.children && item.children.length > 0) {
          newRouter = newRouter.concat(that.getDefaultOpends(item.children))
        }
      })
      return newRouter
    },
    // 通过name获取路由path
    getRouterPathToName(name, routers) {
      let path = ''
      routers.map(item => {
        if (item.name === name) path = item.path

        // 子级递归
        if (item.children && item.children.length > 0 && path === '') {
          path = this.getRouterPathToName(name, item.children)
        }
      })
      return path
    },
    /* @type  str:需要过滤的，routers路由列表
   * @description 递归查询需要展示的路由
   */
    returnRouters(str, routers) {
      const that = this
      const newRouter = []
      routers.forEach(item => {
        // 如果是hideen的菜单不处理
        if (item.hidden) {
          newRouter.push(item)
          return
        }

        // 匹配str的注入
        if (item.meta && item.meta.title.indexOf(str) !== -1) {
          newRouter.push(item)
          return
        }

        // 有children 继续处理
        if (item.children && item.children.length > 0) {
          item.children = [...that.returnRouters(str, item.children)]
          if (item.children.length > 0) {
            newRouter.push(item)
          }
          return
        }
      })
      return newRouter
    }
  }
}
</script>

<style lang="scss">
.menu-search{
  width: 242px;
  height: 32px;

  ::v-deep.el-input--medium .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
}
</style>
