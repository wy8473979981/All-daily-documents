<template>
  <div class="card-header">
    <span class="icon iconfont icon-eduguanli title">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped >
.card-header {
  color: #000;
  height: 30px;
  line-height: 30px;
  background-color: #fafafa;
  font-size: 14px;
  padding-left: 10px;
  border-left: 5px solid #078e34;
  border-top-left-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-top-right-radius: 5px;
}
.title{
    line-height: 30px
}
</style>
