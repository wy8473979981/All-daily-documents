<template>
  <el-menu
    :default-active="levelPath"
    class="el-menu-vertical"
    :collapse="collapse"
    background-color="#333F4F"
    text-color="#778CA2"
    active-text-color="#468CEB"
    @select="selectMenu"
    >
    <!-- <div v-for="item in routes" :key="item.path">
      <el-submenu :index='item.path' v-if="item.children && item.children.length>0">
        <template slot="title">
          <img v-if="$route.path.indexOf(item.path) >= 0" :src="item.meta.iconActive" width="15" style="margin-right: 11px;">
          <img v-else :src="item.meta.icon" width="15" style="margin-right: 11px;">
          <span slot="title" style="color: #778CA2;">{{item.meta.title}}</span>
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
        <img v-if="$route.path.indexOf(item.path) >= 0" :src="item.meta.iconActive" width="15" style="margin-right: 11px;">
        <img v-else :src="item.meta.icon" width="15" style="margin-right: 11px;">
        <span slot="title" style="color: #778CA2;">{{item.meta.title}}</span>
      </el-menu-item>
    </div> -->
    <div v-for="item in routes" :key="item.path">
      <el-menu-item :index="item.path">
        <!-- <img v-if="$route.path.indexOf(item.path) >= 0" :src="item.meta.iconActive" width="14" style="margin-right: 11px;">
        <img v-else :src="item.meta.icon" width="14" style="margin-right: 11px;"> -->
        <img :src="item.meta.icon" width="14" style="margin-right: 11px;vertical-align: middle;">
        <span slot="title" style="color: #fff;">{{item.meta.title}}</span>
      </el-menu-item>
    </div>
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
  props: ['collapse'],
  data() {
    return {
      routes: fixed,
      asyncRoutes: [],
      isCollapse: false,
    }
  },
  created() {

  },
  computed: {
    levelPath(){
      let path = this.$route.path
      path = path.split('/')
      // return `/${path[1]}/${path[2]}`
      return `/${path[1]}`
    }
  },
  methods: {
    selectMenu(index, indexPath) {
      this.$store.commit("saveTableHeight",null)
      console.log(index, indexPath, this.$router)
      // if(index === '/show' || index === '/planShow' ){
      if(index === '/planShow' ){
        window.open(location.origin + '/#' + index)
        window.location.reload()
      }else{
        this.$router.push(index)
      }
    }
  }
};
</script>

<style lang='scss' scoped>
ul.el-menu-vertical:not(.el-menu--collapse) {
  // width: 160px;
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
          height: 31px;
          line-height: 31px;
        }
      }
    }
    li.el-menu-item {
        height: 36px;
        // line-height: 36px;
        display: flex;
        align-items: center;
        &.is-active {
        // border-left: 2px solid #ceb367;
        background-color: #468CEB!important;
      }
    }
  }
}
</style>
<style>
.el-menu {
  border: 0;
}
.el-menu--collapse {
  width: 50px;
}
</style>
