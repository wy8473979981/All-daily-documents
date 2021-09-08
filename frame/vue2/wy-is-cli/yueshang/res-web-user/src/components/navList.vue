<template>
  <el-menu
    :default-active="levelPath"
    class="el-menu-vertical"
    :collapse="false"
    background-color="#FFFFFF"
    text-color="#778CA2"
    active-text-color="#5AB46E"
    :router='true'>
    <div v-for="item in routes" :key="item.path">
      <el-submenu :index='item.path' v-if="item.children && item.children.length>0">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title" style="color: #333;">{{item.meta.title}}</span>
        </template>
        <div v-if="item.children && item.children.length>0">
          <el-menu-item
            v-for="innerItem in item.children"
            :index="item.path + '/' + innerItem.path"
            :key="innerItem.path"
          >{{innerItem.meta.title}}</el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item :index="item.redirect" v-else>
        <i :class="item.meta.icon"></i>
        <span slot="title" style="color: #778CA2;">{{item.meta.title}}</span>
      </el-menu-item>
    </div>
    <!-- <div v-for="item in routes" :key="item.path">
      <el-menu-item :index="item.path" >
        <img v-if="$route.path.indexOf(item.path) >= 0" :src="item.meta.iconActive" width="15">
        <img v-else :src="item.meta.icon" width="15">
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </div> -->
    <!-- <div>
      <el-menu-item v-for="item in routes2" :key="item.path" :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title" style="color: #dad0b4;">{{item.meta.title}}</span>
      </el-menu-item>
    </div> -->
  </el-menu>
</template>

<script>
import { fixed } from '../router/routes'
// console.log(fixed, '---fixed routes')
export default {
  name: 'navBar',
  data() {
    return {
      routes: fixed,
      asyncRoutes: [],
      isCollapse: true,
    }
  },
  created() {
    console.log(this.routes)
  },
  computed: {
    levelPath(){
      let path = this.$route.path
      path = path.split('/')
      return `/${path[1]}/${path[2]}`
      // return `/${path[1]}`
    }
  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
ul.el-menu-vertical:not(.el-menu--collapse) {
  width: 160px;
  // min-height: 400px;
  height: calc(100% - 56px);
  overflow-y: auto;
  overflow-x: hidden;
  >div{
    li.el-submenu {
      ul.el-menu {
        padding-left: 20px;
        li{
          padding-left: 40px !important;
          height: 38px;
          line-height: 38px;
        }
      }
    }
    li.el-menu-item {
        &.is-active {
        border-left: 2px solid #ceb367;
        background-color: #F8FAFB!important;
      }
    }
  }
}
::v-deep ul.el-menu-vertical .el-menu-item span {
  color: #778CA2;
}
::v-deep ul.el-menu-vertical .el-menu-item.is-active span {
  color: #44A159;
}
</style>
