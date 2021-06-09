<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 10:04:04
 * @LastEditors: zhb
-->
<template>
  <div class="box">
    <Pinzhenglist />
  </div>
</template>
<script>
import Pinzhenglist from './components/pinzhengList/index'
export default {
  name: 'PinZhengGuanli',
  components: { Pinzhenglist },
  data() {
    return {
    }
  },
  watch: {},
  created() {},
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.box{
  width: 1112px;
  height: 900px;
  margin: 0 auto;
  background: #f6f5ee;
}
</style>
