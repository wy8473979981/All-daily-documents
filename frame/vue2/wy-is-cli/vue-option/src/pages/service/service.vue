<template>
  <div class="service">
    <commonHeaderPc></commonHeaderPc>
    service
    <router-link to="/">/index</router-link>
  </div>
</template>

<script>
import commonHeaderPc from "@/components/common-header-pc/common-header-pc";
export default {
    name: "service",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    created: function() {
        this.$route.params;
        console.log(this.$route);
    },
    components: {
        commonHeaderPc
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
