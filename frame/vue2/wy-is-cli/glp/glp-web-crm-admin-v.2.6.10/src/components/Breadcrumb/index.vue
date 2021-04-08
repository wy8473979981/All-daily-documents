<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item,index) in levelList">
        <el-breadcrumb-item v-if="item.meta.title" :key="index">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ generateTitle(item.meta.title)}}</span>
          <router-link v-else :to="item.redirect||item.path">{{ generateTitle(item.meta.title)}}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const { params } = this.$route
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      // const first = matched[0]
      // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      //   matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      // }

      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() == 'site'.toLocaleLowerCase()) {
        matched = [{ path: '/more/siteIndex', meta: { level: 2, title: "地址信息" } }].concat(matched)
      } else if (first && first.name.trim().toLocaleLowerCase() == 'legalControl'.toLocaleLowerCase()) {
        matched = [{ path: '/more/legalControlIndex', meta: { level: 2, title: "法定代表及实控人" } }].concat(matched)
      } if (first && first.name.trim().toLocaleLowerCase() == 'operation'.toLocaleLowerCase()) {
        matched = [{ path: '/more/operationIndex', meta: { level: 2, title: "业务统计" } }].concat(matched)
      }


      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    cursor: text;
  }
}
</style>
