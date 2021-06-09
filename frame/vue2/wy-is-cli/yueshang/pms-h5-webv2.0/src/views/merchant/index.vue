<template>
  <!-- 入口 -->
  <div class="merchant-index">
    <div>{{$route.path}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerParams: this.$route.query,
    };
  },
  created () {
    this.$Dialog({ message: '2222' });
    // this.$router.push({ path: '/merchant/sjgl', query: this.routerParams })
  },
  mounted () {

  },
  methods: {

  }
};
</script>
<style>
</style>
