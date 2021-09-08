<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ resetTitle(item.meta.title,true) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ resetTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    // 如果query带id 重新设置title
    resetTitle(title, replace) {
      let newTitle = title
      if (replace) {
        const levelList = this.levelList
        newTitle = newTitle.replace(levelList[0].title, '')
      }
      if (this.$route.query && this.$route.query.id) {
        return newTitle.replace('新增', '编辑')
      }
      return newTitle
    },
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const currentMatched = matched[matched.length - 1]
      // this.levelList = matchedList.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      this.levelList = [this.getDataForName(this.$store.getters.permission_routes, currentMatched.meta.parentName), currentMatched]
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, name } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      console.log(name)
      this.$router.push({ name: name })
    },
    // 获取面包屑上级
    getDataForName(menuList, name) {
      let newObj = {}
      menuList.map(item => {
        if (item.name === name) {
          newObj = { ...item }
        }
        if (!newObj.name && item.children && item.children.length > 0) {
          newObj = this.getDataForName(item.children, name)
        }
      })
      return newObj
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 30px;
  margin-left: 8px;
  .no-redirect {
    color: #050101;
    cursor: text;
  }
}
</style>
