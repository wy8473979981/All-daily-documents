<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="navbar" :class="!!showBreadcrumb?'':'hideBread'">
    <div class="title">
      {{ titleName }}
    </div>

    <!-- 面包屑 -->
    <breadcrumb v-if="showBreadcrumb" id="breadcrumb-container" class="breadcrumb-container" />

    <!-- 右侧设置/用户信息 -->
    <div class="right-menu">
      <ysn-navSetting />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    titleName() {
      if (this.$route.query && this.$route.query.id) {
        return this.$route.meta.title.replace('新增', '').replace('编辑', '').replace('详情', '')
      }
      return this.$route.meta.title.replace('新增', '')
    },
    // 隐藏navbar
    showBreadcrumb() {
      return this.$route.meta.showBread
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  .title{
    font-size: 18px;
    padding-top: 40px;
    margin-left: 8px;
    font-weight: bold;
  }
  &.hideBread{
    height: 70px;
  }
  height: 100px;
  overflow: hidden;
  position: relative;
  background:#F6F5EE;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding-left: 16px;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    position: absolute;
    right: 24px;
    top: 0;
    bottom: 0;
    display: flex;
    box-sizing: border-box;
    padding-top: 30px;
  }
}
</style>
