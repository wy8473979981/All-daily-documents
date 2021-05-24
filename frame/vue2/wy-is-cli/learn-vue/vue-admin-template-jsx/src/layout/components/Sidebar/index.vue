<template>
  <div :class="{'has-logo':showLogo}">
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-input
        v-model="input"
        placeholder="搜索"
        class="search-icon"
        @input="menuSearchFunc"
      ></el-input>
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routesOptions"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      input: '',
      routesOptions: this.$router.options.routes,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    },
  },
  methods: {
    menuSearchFunc (value) {
      let tree = this.$router.options.routes
      let result = this.treeFilter(tree, node => { let re = new RegExp(value); return node.meta && node.meta.title.match(re) })

      this.routesOptions = result

      console.log(this.routesOptions, 'this.routesOptions')
    },
    treeFilter (tree, func) {
      // 使用map复制一下节点，避免修改到原树
      return tree.map(node => ({ ...node })).filter(node => {
        node.children = node.children && this.treeFilter(node.children, func)
        if (func(node) && (node.children)) {
          let res = this.treeFind(tree, func)
          node.children = res.children
        }
        return func(node) || (node.children && node.children.length)
      })
    },
    treeFind (tree, func) {
      for (const data of tree) {
        if (func(data)) return data
        if (data.children) {
          const res = this.treeFind(data.children, func)
          if (res) return res
        }
      }
      return null
    },

  }
}
</script>
<style lang="scss" scoped>
.search-icon:before {
  content: "";
  background: url("../../../assets/images/search.png") no-repeat center top;
  background-size: auto 100%;
  background-origin: content-box;
  width: 20px;
  height: 24px;
  position: absolute;
  top: 4px;
  left: 14px;
  z-index: 100;
}
::v-deep .search-icon {
  margin-bottom: 16px;
  .el-input__inner {
    padding: 4px 10px 4px 40px;
    height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #848382;
    background: #efedea;
    border-radius: 18px;
    border: none;
  }
}
</style>
