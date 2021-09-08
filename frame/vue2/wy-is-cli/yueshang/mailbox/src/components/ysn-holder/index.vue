<template>
  <!-- 首页列表模板 -->
  <div class="ysn-holder" :style="{height: height? (height+'px'):'10px'}">

  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  props: {
    height: { //
      type: [String, Number],
      default: ''
    }
  },
  methods: {

  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.ysn-holder {
  background-color: #F2F2F2;
  width: 100%;
  height: 10px;
}
</style>
