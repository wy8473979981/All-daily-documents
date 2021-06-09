<template>
  <el-menu :default-active="levelPath" class="el-menu-vertical" :collapse="false" background-color="#ffffff" text-color="#1C1C1C" active-text-color="#4876EF" :router='true'>
    <div v-for="item in $router.options.routes" :key="item.path">

      <el-submenu :index='item.path' v-if="item.children && item.children.length>0">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>

        <div v-if="item.children && item.children.length>0">
          <el-menu-item v-for="innerItem in item.children" :index="item.path + '/' + innerItem.path" :key="innerItem.path">
            <el-tooltip class="item" effect="dark" :content="innerItem.meta.title" placement="right" :disabled="innerItem.meta.title.length<10">
              <span>{{innerItem.meta.title}}</span>
            </el-tooltip>
          </el-menu-item>
        </div>
      </el-submenu>

      <el-menu-item :index="item.redirect" v-else class="el-submenu__title-home">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>

    </div>
  </el-menu>
</template>

<script>
import { fixed } from '../../router/routes'
export default {
  name: 'navBar',
  data () {
    return {
      routes: fixed,
      asyncRoutes: [],
      isCollapse: true,
    }
  },
  created () {
    // console.log(this.$router.options.routes, 'this.$router.options.routes')
  },
  computed: {
    levelPath () {
      let path = this.$route.path
      path = path.split('/')
      return `/${path[1]}/${path[2]}`
    }
  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
ul.el-menu-vertical:not(.el-menu--collapse) {
  height: calc(100% - 56px);
  // height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  > div {
    li.el-submenu {
      ul.el-menu {
        padding-left: 20px;
        li {
          // padding-left: 40px !important;
          // height: 31px;
          // line-height: 31px;

          min-width: 189px;
          padding-left: 44px !important;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #1c1c1c !important;
        }
      }
      li.el-menu-item {
        height: 36px;
        display: flex;
        align-items: center;
        &:hover,
        &:focus {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          color: #4876ef !important;
          background-color: #e1e9ff !important;
        }
        &.is-active {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #4876ef !important;
          border-right: 4px solid #4876ef;
          background-color: #e1e9ff !important;
        }
      }
    }
  }
}
.el-menu {
  border: 0;
}
.el-menu--collapse {
  width: 50px;
}

::v-deep .el-submenu__title {
  height: 36px;
  line-height: 36px;
  padding-left: 24px !important;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #1c1c1c !important;
  &:hover,
  &:focus {
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    color: #4876ef !important;
    background-color: #e1e9ff !important;
  }
}
.el-submenu__title-home {
  height: 36px;
  line-height: 36px;
  padding-left: 24px !important;
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #1c1c1c !important;
  &:hover,
  &:focus {
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    color: #4876ef !important;
    background-color: #e1e9ff !important;
  }
  &.is-active {
    font-size: 14px;
    font-weight: bold;
    color: #4876ef !important;
    border-right: 4px solid #4876ef;
    background-color: #e1e9ff !important;
  }
}
::v-deep .el-submenu .el-menu-item {
  padding-right: 20px;
  span {
    height: 100%;
    line-height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
