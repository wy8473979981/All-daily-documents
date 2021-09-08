<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
<template>
  <div id="app">
    <layout v-if="isTest"/>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Layout from '@/layout/index'
export default {
  name: 'App',

  components: { Layout },

  data() {
    return {
      isTest: false,
    }
  },

  created() {
    this.isTest = window.location.hash.includes('env=localhost') || window.location.host.includes('localhost')

    let currentHref = window.location.href
    // "http://pms.powerlong.com/pc_static/?type=pd&_stk_=AA3DFDF2930B490286A6983075314718#/rp-rental-platform-main"
    const firstIndex = currentHref.indexOf('/pc_static/?')
    // const firstIndex = currentHref.indexOf('8888/?')
    if (firstIndex !== -1) {
      const len = 11
      // const len = 4
      const lastIndex = currentHref.indexOf('#/')
      const queryString = currentHref.substring(firstIndex + len, lastIndex)

      const newHref = currentHref.substring(0, firstIndex + len) + currentHref.substring(lastIndex) + queryString
      window.location.href = newHref
      // window.location.reload()
    }
    if (this.$route?.query?._stk_) {
      const _stk_ = this.$route?.query?._stk_
      document.cookie = "_stk_=" + _stk_ + "; "
    }
  },

  methods: {
    ...mapActions({ 'getToken': 'base/getToken', })
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  background: #fff;
}
#app {
  font-family: 'PingFangSC-Regular, PingFang SC, Avenir, Helvetica, Arial, sans-serif';
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #050101;
  height: 100%;
}
</style>
