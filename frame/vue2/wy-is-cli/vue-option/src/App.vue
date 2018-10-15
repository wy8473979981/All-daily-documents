<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
#app {
    width: 1200px;
    margin: 0 auto;
    padding-top: 80px;
    font-family: "dengxian","Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #eeeded !important;
}
</style>
