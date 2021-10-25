<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 16:23:13
-->
<template>
  <el-container>
    <el-aside width="400px">
      <div id="nav">
        <router-link to="/">ref--reactive--toRefs--computed--watch用法</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/demo">Demo</router-link>
        <router-link to="/shallowRef">shallowRef和shallowReactive</router-link>
        <router-link to="/shallowReadonly">readonly和shallowReadonly</router-link>
        <router-link to="/markRaw">toRaw和markRaw</router-link>
        <router-link to="/toRef">toRef</router-link>
        <router-link to="/customRef">customRef</router-link>
        <router-link to="/provide">provide/inject</router-link>
        <router-link to="/isRef">isRef/isReactive/isReadonly/isProxy</router-link>
        <router-link to="/suspense">Suspense</router-link>
      </div>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: column;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}
</style>
