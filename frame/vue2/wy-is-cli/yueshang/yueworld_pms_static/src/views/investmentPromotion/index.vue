<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 10:04:04
 * @LastEditors: zhb
-->
<template>
  <div class="app-page-main">
    <Speedofprogress />
  </div>
</template>
<script>
import Speedofprogress from './components/speedOfProgress/index.vue'
export default {
  name: 'InvestmentPromotion',
  components: {
    Speedofprogress
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.app-page-main {
  width: 1112px;
  height: 900px;
  background: #f6f5ee;

}
</style>
