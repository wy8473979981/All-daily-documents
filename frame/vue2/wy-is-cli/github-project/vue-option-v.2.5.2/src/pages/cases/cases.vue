<template>
  <div class="cases">
    <commonHeaderPc></commonHeaderPc>
    cases
    <router-link to="/">/index</router-link>
  </div>
</template>

<script>
import commonHeaderPc from "@/components/common-header-pc/common-header-pc";
export default {
    name: "cases",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    created: function() {
        this.$route.params;
    },
    components: {
        commonHeaderPc
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.service {
    width: 100%;
    height: 200px;
    color: #fff;
    background: red;
}
</style>
