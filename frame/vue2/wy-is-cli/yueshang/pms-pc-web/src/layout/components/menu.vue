<template>
  <div class="menu">
    <el-menu
      :default-active="activeMenu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="(menu, index) in menus">
        <el-submenu :key="index" :index="menu.title" class="sub-menu__m">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{menu.title}}</span>
          </template>
          <template v-for="(parent, idx) in menu.children">
            <el-submenu :index="parent.title" :key="idx">
              <template slot="title">
                <i class="el-icon-document-checked"></i>
                <span>{{parent.title}}</span>
              </template>
              <template v-for="item in parent.children">
                <el-menu-item :index="item.path" :key="item.sortIndex" class="one-ellipsis">{{item.title}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routers from '@/router/router'
export default {
  name: 'LayoutMenu',

  data() {
    return {
      activeMenu: ''
    }
  },

  computed: {
    menus() {
      return routers.map(p => {
        return Object.assign(p, { children: p.children.map(s => {
          return Object.assign(s, { children: s.children.filter(s => {
            return !s.hidden === true
          })})
        })})
      })
    }
  },

  created() {
    this.activeMenu = this.$route.path.split('/')[1] || ''
  },

  methods: {
    handleOpen() {},

    handleClose() {},

    handleSelect(index) {

      this.$router.push({path: index})
    }
  },

  watch: {
    '$route': {
      handler: function() {
        this.activeMenu = this.$route.path.split('/')[1] || ''
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  min-width: 240px;
  width: 240px;
  height: 100%;
  text-align: left;
  background-color: rgb(84, 92, 100);
  color: #fff;
  border-right: solid 1px #e6e6e6;
  overflow-y: auto;


  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2);
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }

  .sub-menu__m .el-submenu__title{
    padding: 0;
  }
}
</style>
