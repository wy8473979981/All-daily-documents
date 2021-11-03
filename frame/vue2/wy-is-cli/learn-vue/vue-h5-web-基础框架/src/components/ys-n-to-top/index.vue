<template>
  <div class="app-to-top">
    <div class="to-top" @click="goToTop" v-show="toTopShow">
      <van-image round width="1rem" height="1rem" :src="topImg" />
    </div>
  </div>
</template>
<script>
import topImg from "../../assets/images/icon-totpo.png";
export default {
  data() {
    return {
      topImg,
      querySelect: "#app",
      toTopShow: false
    };
  },
  methods: {
    watchScroll() {
      let _thit = this
      document.querySelector("#app").onscroll = function () {
        // console.log(document.querySelector("#app").scrollTop)
        if (document.querySelector("#app").scrollTop + document.body.scrollTop > 200) {
          _thit.toTopShow = true
        } else {
          _thit.toTopShow = false
        }
      }
    },
    goToTop() {
      let dom = document.querySelector(this.querySelect);
      dom.scrollTop = 0;
    },
  },
  created() {
    this.watchScroll()
  },
};
</script>
<style lang="scss" scoped>
.to-top {
  width: 76px;
  height: 76px;
  position: fixed;
  right: 60px;
  bottom: 20px;
  z-index: 101;
}
</style>
