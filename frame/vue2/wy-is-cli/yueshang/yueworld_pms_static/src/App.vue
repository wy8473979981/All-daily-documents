<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <!-- <div id="app" class="app-nomenu"> -->
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    const zoom = window.innerWidth < 1440 ? window.innerWidth / 1440 : 1
    document.getElementById('app').style.zoom = zoom
    // document.getElementsByTagName('html')[0].style.zoom = zoom
    // document.getElementsByTagName('html')[0].style.transformOrigin = `top left`
    // document.getElementsByTagName('html')[0].style.transform = `scale(${zoom})`
    // document.querySelector('#app').style.zoom = 1
    // document.querySelector('#app').style.transformOrigin = `top left`
    // document.querySelector('#app').style.transform = `scale(${zoom})`
  }
}
</script>
<style lang="scss">
  #app {
    width: 1440px;
    height: 100%;
    margin: 0 auto  !important;
  }
  #nprogress{
    z-index: 10010;
    position: relative;
  }
</style>
