<template>
  <div class="redress_error" @click="onClick" v-show="type !== 'dj'">
    <div>纠错</div>
    <img src="../../assets/images/icon-find-recovery.png" />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  watch: {},
  mounted() { },
  methods: {
    onClick() {
      this.$emit("onRecoveryClick");
    },
  },
};
</script>
<style lang="scss" scoped>
.redress_error {
  display: flex;
  margin: 0 0 0 20px;
  img {
    width: 36px;
    height: 36px;
    margin-left: 10px;
  }
}
</style>
