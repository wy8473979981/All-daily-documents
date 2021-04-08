<template>
  <div class="layout">
    <x-menu/>

    <div class="right-side">
      <top-bar/>

      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import XMenu from './components/menu'
import TopBar from './components/topbar'
export default {
  name: 'Layout',

  components: { XMenu, TopBar }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;

  .right-side {
    flex: 1;
    width: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    height: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>