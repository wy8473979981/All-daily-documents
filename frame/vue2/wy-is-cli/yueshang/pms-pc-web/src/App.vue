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
  color: #2c3e50;
  height: 100%;
}
</style>
